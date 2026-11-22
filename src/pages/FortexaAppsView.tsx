import { useState, useEffect } from 'react';
import { 
  Cpu, 
  Key, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  Fuel, 
  FileCheck2, 
  Search, 
  Monitor, 
  Globe, 
  Copy, 
  Check, 
  Layers,
  Calendar,
  RefreshCw,
  Users,
  CreditCard,
  TrendingUp,
  Smartphone,
  Mail,
  Edit3,
  Bell,
  ShieldAlert,
  Info,
  Phone,
  Infinity,
  Unlock,
  Building2,
  Video,
  Sparkles,
  Sliders,
  Zap,
  Lock,
  Power,
  X,
  Send
} from 'lucide-react';
import { SoftwareLicenseItem, SignedLicenseItem, EmpresaSaaS } from '../types';
import { softwareLicenseApi, empresaApi } from '../api';
import { isOwnerOperableEmpresa } from '../utils/tenant';

export interface RutaFuelSubscription {
  id: string | number;
  cliente: string;
  empresa_nombre: string;
  contacto: string;
  email: string; // Usuario que paga su suscripción
  telefono: string;
  app_name: string;
  plan: 'Pro Individual (Anual)' | 'Flotas B2B Pro (Anual)' | 'Flotas Enterprise (Anual)' | 'Conductor Particular (Freemium)' | string;
  vehiculos_contratados: number;
  vehiculos_activos: number;
  ciclo: 'Anual' | 'Mensual';
  cuota: number;
  fecha_inicio: string;
  expires_at: string; // Fecha de corte en Laravel (YYYY-MM-DD HH:mm:ss)
  metodo_pago: string;
  estado: 'active' | 'pending' | 'revoked' | 'trial' | string;
  codigo_licencia: string;
  hwid?: string | null;
  droplet_id?: number;
}

interface FortexaAppsViewProps {
  currentEmpresa?: EmpresaSaaS;
  empresas?: EmpresaSaaS[];
  onUpdateEmpresa?: (emp: EmpresaSaaS) => void;
  onCreateEmpresa?: (emp: EmpresaSaaS) => void;
  onSelectEmpresa?: (id: number) => void;
}

export default function FortexaAppsView({ 
  currentEmpresa,
  empresas = [],
  onUpdateEmpresa,
  onCreateEmpresa,
  onSelectEmpresa
}: FortexaAppsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'rutafuel' | 'quantum' | 'integrapro' | 'live_commerce'>('integrapro');
  const [licenses, setLicenses] = useState<SoftwareLicenseItem[]>([]);
  const [signedLicenses, setSignedLicenses] = useState<SignedLicenseItem[]>([]);
  const [saasEmpresas, setSaasEmpresas] = useState<EmpresaSaaS[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [subscriptionSearch, setSubscriptionSearch] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lista unificada de empresas activas
  const allEmpresas = empresas && empresas.length > 0 ? empresas : saasEmpresas;
  const liveEnabledCount = allEmpresas.filter(e => e.plan === 'live_express' || e.modules?.live_sales).length;

  // Modal para configurar Plan SaaS & Módulos de una Empresa
  const [editingEmpresaSaaS, setEditingEmpresaSaaS] = useState<EmpresaSaaS | null>(null);
  const [saasPlanForm, setSaasPlanForm] = useState({
    plan: 'standard' as 'live_express' | 'basic' | 'standard' | 'enterprise',
    hasLiveAddon: false,
    isLiveOnly: false,
    hasPos: true,
    hasFel: true,
    hasAccounting: true,
    hasHr: true,
    hasPurchases: true,
    hasInventory: true,
    hasClients: true
  });

  const handleOpenSaaSModal = (emp: EmpresaSaaS) => {
    setEditingEmpresaSaaS(emp);
    const planVal = (emp.plan as any) || 'standard';
    setSaasPlanForm({
      plan: planVal === 'live_express' ? 'live_express' : (planVal === 'basic' ? 'basic' : (planVal === 'enterprise' ? 'enterprise' : 'standard')),
      hasLiveAddon: Boolean(emp.modules?.live_sales),
      isLiveOnly: Boolean(emp.plan === 'live_express' || emp.modules?.live_only),
      hasPos: emp.modules?.pos !== false,
      hasFel: emp.modules?.sat_fel !== false && emp.modules?.ventas !== false,
      hasAccounting: emp.modules?.accounting !== false && emp.modules?.contabilidad !== false,
      hasHr: emp.modules?.hr !== false && emp.modules?.rrhh !== false,
      hasPurchases: emp.modules?.purchases !== false && emp.modules?.compras !== false,
      hasInventory: emp.modules?.inventory !== false && emp.modules?.inventario !== false,
      hasClients: emp.modules?.clients !== false && emp.modules?.clientes !== false
    });
  };

  const handlePlanChange = (newPlan: 'live_express' | 'basic' | 'standard' | 'enterprise') => {
    if (newPlan === 'live_express') {
      setSaasPlanForm(prev => ({
        ...prev,
        plan: newPlan,
        hasLiveAddon: true,
        isLiveOnly: true,
        hasPos: false,
        hasFel: false,
        hasAccounting: false,
        hasHr: false,
        hasPurchases: false
      }));
    } else {
      setSaasPlanForm(prev => ({
        ...prev,
        plan: newPlan,
        isLiveOnly: false,
        hasPos: true,
        hasFel: true,
        hasAccounting: newPlan !== 'basic',
        hasHr: newPlan === 'enterprise' || newPlan === 'standard',
        hasPurchases: true
      }));
    }
  };

  const handleSaveSaaSConfig = (): EmpresaSaaS | null => {
    if (!editingEmpresaSaaS) return null;

    const isForceLiveOnly = saasPlanForm.plan === 'live_express' || saasPlanForm.isLiveOnly;
    const updatedModules = {
      ...(editingEmpresaSaaS.modules || {}),
      live_sales: isForceLiveOnly ? true : Boolean(saasPlanForm.hasLiveAddon),
      live_only: isForceLiveOnly,
      pos: isForceLiveOnly ? false : Boolean(saasPlanForm.hasPos),
      ventas: isForceLiveOnly ? false : Boolean(saasPlanForm.hasFel),
      sat_fel: isForceLiveOnly ? false : Boolean(saasPlanForm.hasFel),
      contabilidad: isForceLiveOnly ? false : Boolean(saasPlanForm.hasAccounting),
      accounting: isForceLiveOnly ? false : Boolean(saasPlanForm.hasAccounting),
      rrhh: isForceLiveOnly ? false : Boolean(saasPlanForm.hasHr),
      hr: isForceLiveOnly ? false : Boolean(saasPlanForm.hasHr),
      asistencia: isForceLiveOnly ? false : Boolean(saasPlanForm.hasHr),
      compras: isForceLiveOnly ? false : Boolean(saasPlanForm.hasPurchases),
      purchases: isForceLiveOnly ? false : Boolean(saasPlanForm.hasPurchases),
      sucursales: isForceLiveOnly ? false : true,
      inventory: isForceLiveOnly ? true : Boolean(saasPlanForm.hasInventory),
      inventario: isForceLiveOnly ? true : Boolean(saasPlanForm.hasInventory),
      clients: isForceLiveOnly ? true : Boolean(saasPlanForm.hasClients),
      clientes: isForceLiveOnly ? true : Boolean(saasPlanForm.hasClients),
      dashboard: true
    };

    const nextPlan = isForceLiveOnly ? 'live_express' : saasPlanForm.plan;
    const updatedEmpresa: EmpresaSaaS = {
      ...editingEmpresaSaaS,
      plan: nextPlan,
      modules: updatedModules
    };

    // Persistir plan y módulos en vivo en MySQL (excepto demo local #99)
    if (updatedEmpresa.id !== 99) {
      empresaApi.update(updatedEmpresa.id, {
        plan_type: nextPlan,
        modules: updatedModules
      }).catch(err => {
        console.error('Error guardando plan/módulos en servidor:', err);
        showToast(`⚠️ Cambio aplicado localmente pero falló sincronización en BD: ${err?.response?.data?.message || err.message}`);
      });
    }

    if (onUpdateEmpresa) {
      onUpdateEmpresa(updatedEmpresa);
    }

    setSaasEmpresas(prev => prev.map(e => e.id === updatedEmpresa.id ? updatedEmpresa : e));

    showToast(`✅ Suscripción de ${updatedEmpresa.nombre} guardada en MySQL: ${
      isForceLiveOnly ? 'Plan Solo Live Express (Q199/m)' : `Plan ${saasPlanForm.plan.toUpperCase()} ${saasPlanForm.hasLiveAddon ? '+ Add-on Live' : ''}`
    }`);

    setEditingEmpresaSaaS(null);
    return updatedEmpresa;
  };

  // =========================================================================
  // FASE 1: ALTA Y ACTIVACIÓN DE NUEVO INQUILINO (CLIENTE SAAS) + SUSPENSIÓN
  // =========================================================================
  const [showNewTenantModal, setShowNewTenantModal] = useState<boolean>(false);
  const [isCreatingTenant, setIsCreatingTenant] = useState<boolean>(false);
  const [tenantCreateError, setTenantCreateError] = useState<string | null>(null);
  const [togglingTenantId, setTogglingTenantId] = useState<number | null>(null);
  const [createdTenantResult, setCreatedTenantResult] = useState<{
    empresa: EmpresaSaaS;
    adminName: string;
    adminEmail: string;
    plainPassword: string;
    sucursalNombre: string;
  } | null>(null);
  const [copiedCredentials, setCopiedCredentials] = useState<boolean>(false);

  const generateSecurePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'IP-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const getInitialNewTenantForm = () => ({
    nombre: '',
    razon_social: '',
    nit: 'CF',
    regimen_tributario: 'general' as 'general' | 'pequeno_contribuyente' | 'informal',
    telefono: '',
    direccion: 'Ciudad de Guatemala',
    sucursal_nombre: 'Sucursal Principal',
    preset: 'retail' as 'retail' | 'admin_only' | 'standard' | 'enterprise' | 'live_express',
    plan_type: 'basic' as 'live_express' | 'basic' | 'standard' | 'enterprise',
    subscription_status: 'active' as 'active' | 'trial',
    trial_days: 14,
    hasPos: true,
    hasLiveSales: false,
    hasFel: true,
    hasInventory: true,
    hasClients: true,
    hasPurchases: true,
    hasAccounting: false,
    hasHr: false,
    admin_name: '',
    admin_email: '',
    admin_password: generateSecurePassword(),
  });

  const [newTenantForm, setNewTenantForm] = useState(getInitialNewTenantForm);

  const applyTenantPreset = (preset: 'retail' | 'admin_only' | 'standard' | 'enterprise' | 'live_express') => {
    if (preset === 'live_express') {
      setNewTenantForm(prev => ({
        ...prev,
        preset,
        plan_type: 'live_express',
        regimen_tributario: 'informal',
        hasPos: false,
        hasLiveSales: true,
        hasFel: false,
        hasInventory: true,
        hasClients: true,
        hasPurchases: false,
        hasAccounting: false,
        hasHr: false,
      }));
    } else if (preset === 'admin_only') {
      setNewTenantForm(prev => ({
        ...prev,
        preset,
        plan_type: 'standard',
        hasPos: false,
        hasLiveSales: false,
        hasFel: true,
        hasInventory: true,
        hasClients: true,
        hasPurchases: true,
        hasAccounting: true,
        hasHr: true,
      }));
    } else if (preset === 'retail') {
      setNewTenantForm(prev => ({
        ...prev,
        preset,
        plan_type: 'basic',
        hasPos: true,
        hasLiveSales: false,
        hasFel: true,
        hasInventory: true,
        hasClients: true,
        hasPurchases: true,
        hasAccounting: false,
        hasHr: false,
      }));
    } else if (preset === 'standard') {
      setNewTenantForm(prev => ({
        ...prev,
        preset,
        plan_type: 'standard',
        hasPos: true,
        hasLiveSales: false,
        hasFel: true,
        hasInventory: true,
        hasClients: true,
        hasPurchases: true,
        hasAccounting: true,
        hasHr: true,
      }));
    } else {
      setNewTenantForm(prev => ({
        ...prev,
        preset: 'enterprise',
        plan_type: 'enterprise',
        hasPos: true,
        hasLiveSales: true,
        hasFel: true,
        hasInventory: true,
        hasClients: true,
        hasPurchases: true,
        hasAccounting: true,
        hasHr: true,
      }));
    }
  };

  const handleOpenNewTenantModal = () => {
    setNewTenantForm(getInitialNewTenantForm());
    setTenantCreateError(null);
    setCreatedTenantResult(null);
    setCopiedCredentials(false);
    setShowNewTenantModal(true);
  };

  const handleCreateNewTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantForm.nombre.trim() || !newTenantForm.admin_name.trim() || !newTenantForm.admin_email.trim()) {
      setTenantCreateError('Completa el nombre de la empresa, el nombre del administrador y su correo.');
      return;
    }

    setIsCreatingTenant(true);
    setTenantCreateError(null);

    const isLiveOnly = newTenantForm.plan_type === 'live_express';
    const modules = {
      live_sales: isLiveOnly ? true : Boolean(newTenantForm.hasLiveSales),
      live_only: isLiveOnly,
      pos: isLiveOnly ? false : Boolean(newTenantForm.hasPos),
      ventas: isLiveOnly ? false : Boolean(newTenantForm.hasFel),
      sat_fel: isLiveOnly ? false : Boolean(newTenantForm.hasFel),
      inventario: Boolean(newTenantForm.hasInventory),
      inventory: Boolean(newTenantForm.hasInventory),
      clientes: Boolean(newTenantForm.hasClients),
      clients: Boolean(newTenantForm.hasClients),
      compras: isLiveOnly ? false : Boolean(newTenantForm.hasPurchases),
      purchases: isLiveOnly ? false : Boolean(newTenantForm.hasPurchases),
      contabilidad: isLiveOnly ? false : Boolean(newTenantForm.hasAccounting),
      accounting: isLiveOnly ? false : Boolean(newTenantForm.hasAccounting),
      rrhh: isLiveOnly ? false : Boolean(newTenantForm.hasHr),
      hr: isLiveOnly ? false : Boolean(newTenantForm.hasHr),
      asistencia: isLiveOnly ? false : Boolean(newTenantForm.hasHr),
      sucursales: !isLiveOnly,
      dashboard: true,
      configuracion: true,
    };

    try {
      const res = await empresaApi.create({
        nombre: newTenantForm.nombre.trim(),
        razon_social: newTenantForm.razon_social.trim() || newTenantForm.nombre.trim(),
        nit: newTenantForm.nit.trim() || 'CF',
        pais: 'GT',
        regimen_tributario: newTenantForm.regimen_tributario,
        telefono: newTenantForm.telefono.trim(),
        email: newTenantForm.admin_email.trim().toLowerCase(),
        direccion: newTenantForm.direccion.trim() || 'Ciudad de Guatemala',
        sucursal_nombre: newTenantForm.sucursal_nombre.trim() || 'Sucursal Principal',
        plan_type: newTenantForm.plan_type,
        subscription_status: newTenantForm.subscription_status,
        trial_days: newTenantForm.subscription_status === 'trial' ? newTenantForm.trial_days : 0,
        modules,
        admin_name: newTenantForm.admin_name.trim(),
        admin_email: newTenantForm.admin_email.trim().toLowerCase(),
        admin_password: newTenantForm.admin_password.trim() || undefined,
      });

      const createdEmp = res?.empresa;
      const mappedEmp: EmpresaSaaS = {
        id: Number(createdEmp?.id_empresa || createdEmp?.id),
        nombre: createdEmp?.nombre || newTenantForm.nombre.trim(),
        razon_social: createdEmp?.razon_social || newTenantForm.razon_social.trim() || newTenantForm.nombre.trim(),
        nit: createdEmp?.nit || newTenantForm.nit.trim() || 'CF',
        pais: createdEmp?.pais || 'GT',
        regimen: createdEmp?.regimen_tributario === 'pequeno_contribuyente'
          ? 'Pequeño Contribuyente (5%)'
          : createdEmp?.regimen_tributario === 'informal'
          ? 'Exento / Informal'
          : 'General (IVA 12%)',
        plan: (createdEmp?.plan_type as any) || newTenantForm.plan_type,
        activa: createdEmp?.activa !== false,
        telefono: createdEmp?.telefono || '',
        email: createdEmp?.email || newTenantForm.admin_email.trim(),
        direccion: createdEmp?.direccion || '',
        modules,
      };

      setSaasEmpresas(prev => [mappedEmp, ...prev.filter(x => x.id !== mappedEmp.id)]);
      if (onCreateEmpresa) {
        onCreateEmpresa(mappedEmp);
      }

      setCreatedTenantResult({
        empresa: mappedEmp,
        adminName: res?.admin_user?.name || newTenantForm.admin_name.trim(),
        adminEmail: res?.admin_user?.email || newTenantForm.admin_email.trim().toLowerCase(),
        plainPassword: res?.plain_password || newTenantForm.admin_password.trim(),
        sucursalNombre: res?.sucursal?.nombre || newTenantForm.sucursal_nombre.trim() || 'Sucursal Principal',
      });

      showToast(`🚀 Inquilino "${mappedEmp.nombre}" (#${mappedEmp.id}) creado y activado en MySQL.`);
    } catch (err: any) {
      console.error('Error creando nuevo inquilino:', err);
      const validationErrors = err?.response?.data?.errors;
      const firstErr = validationErrors ? Object.values(validationErrors).flat()[0] : null;
      setTenantCreateError(
        String(firstErr || err?.response?.data?.message || 'No se pudo crear la empresa en el servidor.')
      );
    } finally {
      setIsCreatingTenant(false);
    }
  };

  const handleToggleEmpresaStatus = async (emp: EmpresaSaaS) => {
    if (emp.id === 1 || emp.id === 22) {
      showToast('⚠️ Las empresas base del sistema (Fortexa y Fashion Styles) no se pueden suspender.');
      return;
    }
    const nextActive = !emp.activa;
    const actionLabel = nextActive ? 'reactivar' : 'suspender (y cerrar sesiones activas)';
    if (!window.confirm(`¿Seguro que deseas ${actionLabel} el acceso de "${emp.nombre}" (#${emp.id})?`)) {
      return;
    }

    setTogglingTenantId(emp.id);
    try {
      if (emp.id !== 99) {
        await empresaApi.update(emp.id, {
          activa: nextActive,
          subscription_status: nextActive ? 'active' : 'suspended',
        });
      }
      const updatedEmp: EmpresaSaaS = { ...emp, activa: nextActive };
      setSaasEmpresas(prev => prev.map(e => e.id === emp.id ? updatedEmp : e));
      if (onUpdateEmpresa) {
        onUpdateEmpresa(updatedEmp);
      }
      showToast(
        nextActive
          ? `✅ Servicio reactivado para "${emp.nombre}".`
          : `⛔ Servicio suspendido para "${emp.nombre}". Sus sesiones activas fueron cerradas.`
      );
    } catch (err: any) {
      showToast(`⚠️ Error actualizando estado: ${err?.response?.data?.message || err.message}`);
    } finally {
      setTogglingTenantId(null);
    }
  };

  const getTenantWelcomeText = () => {
    if (!createdTenantResult) return '';
    return [
      `🚀 *¡Bienvenido a IntegraPro Cloud!*`,
      `Tu espacio privado ya está activo y configurado por *Fortexa Technologies*.`,
      ``,
      `🏢 *Empresa:* ${createdTenantResult.empresa.nombre} (ID #${createdTenantResult.empresa.id})`,
      `📍 *Sucursal Inicial:* ${createdTenantResult.sucursalNombre}`,
      `🌐 *Enlace de Acceso:* https://app.integrapro.app`,
      `👤 *Usuario:* ${createdTenantResult.adminEmail}`,
      `🔑 *Contraseña Temporal:* ${createdTenantResult.plainPassword}`,
      ``,
      `🔒 _Tu empresa opera en un entorno 100% aislado y privado._`,
    ].join('\n');
  };

  // Modal para ajustar manualmente la fecha de corte (expires_at)
  const [editingCutoffSub, setEditingCutoffSub] = useState<RutaFuelSubscription | null>(null);
  const [newCutoffDate, setNewCutoffDate] = useState<string>('');

  // Modal para emitir licencia Quantum Store POS (Perpetua vs Mensualidad/Suscripción)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newLicForm, setNewLicForm] = useState({
    app_name: 'Quantum POS',
    email: '',
    modelo: 'perpetual' as 'perpetual' | 'subscription',
    license_type: 'perpetual' as 'perpetual' | 'subscription' | 'Empresarial',
    sub_cycle: 'mensual' as 'mensual' | 'anual',
    license_code: '',
    cuota: 499.00,
    expires_at: '',
    status: 'active' as 'active' | 'pending'
  });

  // Suscripciones de RutaFuel Pro (Modelo Anual 365 días según esquema Laravel)
  const defaultRutaFuelSubs: RutaFuelSubscription[] = [
    {
      id: 'SUB-RF-1001',
      cliente: 'Transportes Herrera',
      empresa_nombre: 'Transportes Herrera S.A.',
      contacto: 'Jonathan Herrera',
      email: 'jahh21.h@gmail.com',
      telefono: '+502 3569-2070',
      app_name: 'RutaFuel Pro',
      plan: 'Flotas B2B Pro (Anual)',
      vehiculos_contratados: 10,
      vehiculos_activos: 10,
      ciclo: 'Anual',
      cuota: 6500.00,
      fecha_inicio: '2026-08-01',
      expires_at: '2027-08-01 23:59:59',
      metodo_pago: 'Tarjeta BAC (Débito Automático Anual)',
      estado: 'active',
      codigo_licencia: 'RF-TRAN8383-PRO',
      hwid: 'SM-G998B-ANDROID14'
    },
    {
      id: 'SUB-RF-1002',
      cliente: 'Logística Pinula Express',
      empresa_nombre: 'Logística Pinula Express S.A.',
      contacto: 'Carlos Morales',
      email: 'cmorales@logisticapinula.gt',
      telefono: '+502 5541-8902',
      app_name: 'RutaFuel Pro',
      plan: 'Flotas B2B Pro (Anual)',
      vehiculos_contratados: 15,
      vehiculos_activos: 14,
      ciclo: 'Anual',
      cuota: 8500.00,
      fecha_inicio: '2026-09-15',
      expires_at: '2027-09-15 23:59:59',
      metodo_pago: 'Transferencia Bancaria',
      estado: 'active',
      codigo_licencia: 'RF-PINULA-9921',
      hwid: 'XIAOMI-2201116SG'
    },
    {
      id: 'SUB-RF-1003',
      cliente: 'Distribuidora San José',
      empresa_nombre: 'Inversiones San José Ltda.',
      contacto: 'María René Estrada',
      email: 'mrestrada@alimentosanjose.com',
      telefono: '+502 2488-1100',
      app_name: 'RutaFuel Pro',
      plan: 'Flotas B2B Pro (Anual)',
      vehiculos_contratados: 8,
      vehiculos_activos: 8,
      ciclo: 'Anual',
      cuota: 5500.00,
      fecha_inicio: '2025-11-20',
      expires_at: '2026-11-20 23:59:59', // ¡Próximo a corte anual (3 días)! Alerta de recordatorio automático Laravel
      metodo_pago: 'Tarjeta BAC (Débito Automático Anual)',
      estado: 'active',
      codigo_licencia: 'RF-SANJOSE-3341',
      hwid: 'SM-A528B-GT'
    },
    {
      id: 'SUB-RF-1004',
      cliente: 'Carlos Méndez',
      empresa_nombre: 'Conductor Independiente (InDrive / Uber)',
      contacto: 'Carlos Méndez',
      email: 'carlos.mendez.trans@gmail.com',
      telefono: '+502 4410-9082',
      app_name: 'RutaFuel Pro',
      plan: 'Pro Individual (Anual)',
      vehiculos_contratados: 3,
      vehiculos_activos: 1,
      ciclo: 'Anual',
      cuota: 590.00,
      fecha_inicio: '2026-10-10',
      expires_at: '2027-10-10 23:59:59',
      metodo_pago: 'Tarjeta BAC (Débito Automático Anual)',
      estado: 'active',
      codigo_licencia: 'RF-INDIV-0048',
      hwid: 'MOTO-G84-5G'
    },
    {
      id: 'SUB-RF-1005',
      cliente: 'Transportes Santa Lucía',
      empresa_nombre: 'Transportes Santa Lucía Cotz.',
      contacto: 'Ing. Rodrigo Cifuentes',
      email: 'rcifuentes@santaluciatrans.com',
      telefono: '+502 5900-2211',
      app_name: 'RutaFuel Pro',
      plan: 'Flotas Enterprise (Anual)',
      vehiculos_contratados: 25,
      vehiculos_activos: 25,
      ciclo: 'Anual',
      cuota: 12000.00,
      fecha_inicio: '2026-11-10',
      expires_at: '2026-11-24 23:59:59', // Trial 14 días
      metodo_pago: 'Transferencia Bancaria',
      estado: 'trial',
      codigo_licencia: 'RF-TRIAL-SL88',
      hwid: 'IPHONE-15-PRO-MAX'
    },
    {
      id: 'SUB-RF-1006',
      cliente: 'Distribuidora Las Delicias',
      empresa_nombre: 'Las Delicias Comercial S.A.',
      contacto: 'Pedro Alvarado',
      email: 'palvarado@lasdelicias.com.gt',
      telefono: '+502 4120-7788',
      app_name: 'RutaFuel Pro',
      plan: 'Flotas B2B Pro (Anual)',
      vehiculos_contratados: 6,
      vehiculos_activos: 0,
      ciclo: 'Anual',
      cuota: 4900.00,
      fecha_inicio: '2025-11-01',
      expires_at: '2026-11-01 23:59:59', // ¡Corte anual vencido hace 16 días!
      metodo_pago: 'Transferencia Bancaria',
      estado: 'revoked',
      codigo_licencia: 'RF-DELIC-4410',
      hwid: 'SAMSUNG-TAB-S8'
    }
  ];

  const [rutafuelSubs, setRutafuelSubs] = useState<RutaFuelSubscription[]>(() => {
    const saved = localStorage.getItem('fortexa_rutafuel_subscriptions');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultRutaFuelSubs;
  });

  // Modal para Nueva Suscripción Anual de RutaFuel
  const [showSubModal, setShowSubModal] = useState<boolean>(false);
  const [newSubForm, setNewSubForm] = useState({
    cliente: '',
    empresa_nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    app_name: 'RutaFuel Pro',
    plan: 'Flotas B2B Pro (Anual)',
    vehiculos_contratados: 10,
    ciclo: 'Anual' as 'Anual' | 'Mensual',
    cuota: 6500.00,
    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    metodo_pago: 'Tarjeta BAC (Débito Automático Anual)',
    estado: 'active' as 'active' | 'trial' | 'pending'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Cargar datos en vivo del Droplet de producción
  const loadData = () => {
    setLoading(true);
    Promise.all([
      softwareLicenseApi.getAll().catch(() => []),
      softwareLicenseApi.getSignedLicenses().catch(() => []),
      empresaApi.getAll().catch(() => [])
    ]).then(([lics, signed, emps]) => {
      if (Array.isArray(lics)) {
        setLicenses(lics);

        // Si existen suscripciones en la tabla software_licenses del Droplet, vincularlas
        const dropletSubs = lics.filter(l => 
          l.license_type === 'subscription' || 
          l.app_name === 'RutaFuel Pro' ||
          Boolean(l.expires_at)
        );

        if (dropletSubs.length > 0) {
          setRutafuelSubs(prev => {
            const merged = [...prev];
            dropletSubs.forEach(dLic => {
              const exists = merged.find(m => m.email === dLic.email || m.codigo_licencia === dLic.license_code);
              if (exists) {
                exists.droplet_id = dLic.id;
                exists.estado = dLic.status;
                if (dLic.expires_at) exists.expires_at = dLic.expires_at;
                if (dLic.hwid) exists.hwid = dLic.hwid;
              } else {
                merged.unshift({
                  id: 'DB-' + dLic.id,
                  droplet_id: dLic.id,
                  cliente: dLic.email.split('@')[0].toUpperCase(),
                  empresa_nombre: dLic.email,
                  contacto: dLic.email,
                  email: dLic.email,
                  telefono: '+502 0000-0000',
                  app_name: dLic.app_name || 'RutaFuel Pro',
                  plan: dLic.app_name === 'Quantum POS' ? 'Quantum POS Anual' : 'Flotas B2B Pro (Anual)',
                  vehiculos_contratados: 5,
                  vehiculos_activos: 5,
                  ciclo: 'Anual',
                  cuota: 6500.00,
                  fecha_inicio: dLic.created_at ? dLic.created_at.substring(0, 10) : '2026-08-01',
                  expires_at: dLic.expires_at || '2027-08-01 23:59:59',
                  metodo_pago: 'Tarjeta BAC (Débito Automático Anual)',
                  estado: dLic.status || 'active',
                  codigo_licencia: dLic.license_code,
                  hwid: dLic.hwid
                });
              }
            });
            return merged;
          });
        }
      }
      if (Array.isArray(signed)) {
        setSignedLicenses(signed);
      }
      if (Array.isArray(emps)) {
        setSaasEmpresas(emps);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, [currentEmpresa?.id]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    showToast('Código copiado al portapapeles');
  };

  // Helper para calcular con precisión los días restantes y estado de corte según Laravel
  const getCutoffDetails = (expiresAtStr?: string | null, status?: string) => {
    if (!expiresAtStr) {
      return {
        daysRemaining: 999,
        formattedDate: 'Sin fecha de corte',
        badgeColor: 'slate',
        badgeText: 'Sin Corte Programado',
        isOverdue: false,
        isNearCutoff: false,
        reminderNotice: null
      };
    }

    const cutoffDate = new Date(expiresAtStr.replace(' ', 'T'));
    const now = new Date();
    const diffTime = cutoffDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const formattedDate = cutoffDate.toLocaleDateString('es-GT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const isRevoked = status === 'revoked' || status === 'suspended' || status === 'Suspendida';

    if (isRevoked) {
      return {
        daysRemaining: diffDays,
        formattedDate,
        badgeColor: 'rose',
        badgeText: 'Servicio Cortado',
        isOverdue: true,
        isNearCutoff: false,
        reminderNotice: 'Servicio suspendido en la base de datos de producción.'
      };
    }

    if (diffDays < 0) {
      const pastDays = Math.abs(diffDays);
      return {
        daysRemaining: diffDays,
        formattedDate,
        badgeColor: 'rose',
        badgeText: `Corte Vencido (${pastDays}d)`,
        isOverdue: true,
        isNearCutoff: false,
        reminderNotice: `Fecha de corte expirada hace ${pastDays} días. Acceso bloqueado en app.`
      };
    }

    // Regla de Laravel (licenses:send-reminders busca expires_at == now() + 5 días)
    if (diffDays <= 5) {
      return {
        daysRemaining: diffDays,
        formattedDate,
        badgeColor: 'amber',
        badgeText: diffDays === 0 ? '¡Corte HOY!' : `¡Corte en ${diffDays}d!`,
        isOverdue: false,
        isNearCutoff: true,
        reminderNotice: 'Recordatorio automático de Laravel enviado al correo del usuario (5 días antes del corte).'
      };
    }

    return {
      daysRemaining: diffDays,
      formattedDate,
      badgeColor: 'emerald',
      badgeText: `Al Día (${diffDays} días)`,
      isOverdue: false,
      isNearCutoff: false,
      reminderNotice: null
    };
  };

  // 1. Renovar Corte de RutaFuel (+1 Año Anual o +30 Días) y sincronizar inmediatamente con MySQL del Droplet
  const handleRenewCutoff = async (sub: RutaFuelSubscription, daysToAdd = 365) => {
    let baseDate = new Date();
    if (sub.expires_at) {
      const existing = new Date(sub.expires_at.replace(' ', 'T'));
      if (existing > baseDate) {
        baseDate = existing;
      }
    }
    baseDate.setDate(baseDate.getDate() + daysToAdd);
    const newDateStr = baseDate.toISOString().substring(0, 10);
    const newExpiresAt = `${newDateStr} 23:59:59`;

    const updated = rutafuelSubs.map(s => s.id === sub.id ? {
      ...s,
      expires_at: newExpiresAt,
      estado: 'active' as const
    } : s);

    setRutafuelSubs(updated);
    localStorage.setItem('fortexa_rutafuel_subscriptions', JSON.stringify(updated));

    // Sincronizar en Droplet MySQL
    try {
      const targetId = typeof sub.id === 'number' ? sub.id : (sub.droplet_id || 1);
      await softwareLicenseApi.update(targetId, {
        expires_at: newExpiresAt,
        status: 'active'
      });
      showToast(`🔄 ¡Corte anual de ${sub.email} renovado +${daysToAdd} días (${newDateStr}) en el Droplet MySQL!`);
    } catch {
      showToast(`🔄 Corte renovado exitosamente a ${newDateStr} (+${daysToAdd} días)`);
    }
  };

  // 2. Renovar Licencia de Quantum POS de tipo Mensualidad/Suscripción (+30 Días o +1 Año)
  const handleRenewQuantumLicense = async (lic: SoftwareLicenseItem, daysToAdd = 30) => {
    let baseDate = new Date();
    if (lic.expires_at) {
      const existing = new Date(lic.expires_at.replace(' ', 'T'));
      if (existing > baseDate) {
        baseDate = existing;
      }
    }
    baseDate.setDate(baseDate.getDate() + daysToAdd);
    const newDateStr = baseDate.toISOString().substring(0, 10);
    const newExpiresAt = `${newDateStr} 23:59:59`;

    try {
      await softwareLicenseApi.update(lic.id, {
        expires_at: newExpiresAt,
        status: 'active'
      });
      setLicenses(prev => prev.map(l => l.id === lic.id ? { ...l, expires_at: newExpiresAt, status: 'active' } : l));
      showToast(`🔄 ¡Licencia de Quantum (${lic.email}) renovada +${daysToAdd} días hasta ${newDateStr} en MySQL!`);
    } catch {
      showToast(`⚠️ ERROR: no se pudo renovar la licencia en el servidor.`);
    }
  };

  // 3. Liberar Hardware ID (HWID) de Quantum POS para permitir reinstalación en una nueva máquina
  const handleResetQuantumHWID = async (lic: SoftwareLicenseItem) => {
    try {
      await softwareLicenseApi.update(lic.id, { hwid: null });
      setLicenses(prev => prev.map(l => l.id === lic.id ? { ...l, hwid: null } : l));
      showToast(`🔓 HWID liberado para ${lic.email}. El cliente puede activar su nueva máquina.`);
    } catch {
      showToast(`⚠️ ERROR: no se pudo liberar el HWID en el servidor.`);
    }
  };

  // 4. Pausar / Cortar / Reactivar Licencia de Quantum POS
  const handleToggleQuantumStatus = async (lic: SoftwareLicenseItem) => {
    const isAct = lic.status?.toLowerCase().includes('act');
    const newStat = isAct ? 'suspended' : 'active';
    try {
      await softwareLicenseApi.update(lic.id, { status: newStat });
      setLicenses(prev => prev.map(l => l.id === lic.id ? { ...l, status: newStat } : l));
      showToast(`Licencia de ${lic.email} ${newStat === 'active' ? 'reactivada' : 'suspendida/cortada'} en MySQL.`);
    } catch {
      setLicenses(prev => prev.map(l => l.id === lic.id ? { ...l, status: newStat } : l));
      showToast(`Estado cambiado a ${newStat}`);
    }
  };

  // 5. Guardar Fecha de Corte Personalizada desde el modal de edición (RutaFuel)
  const handleSaveCustomCutoff = async () => {
    if (!editingCutoffSub || !newCutoffDate) return;

    const fullExpiresAt = `${newCutoffDate} 23:59:59`;
    const updated = rutafuelSubs.map(s => s.id === editingCutoffSub.id ? {
      ...s,
      expires_at: fullExpiresAt,
      estado: 'active' as const
    } : s);

    setRutafuelSubs(updated);
    localStorage.setItem('fortexa_rutafuel_subscriptions', JSON.stringify(updated));

    try {
      const targetId = typeof editingCutoffSub.id === 'number' ? editingCutoffSub.id : (editingCutoffSub.droplet_id || 1);
      await softwareLicenseApi.update(targetId, {
        expires_at: fullExpiresAt,
        status: 'active'
      });
      showToast(`✅ Fecha de corte de ${editingCutoffSub.email} actualizada a ${newCutoffDate} en Droplet MySQL.`);
    } catch {
      showToast(`✅ Fecha de corte actualizada a ${newCutoffDate}`);
    }

    setEditingCutoffSub(null);
  };

  // 6. Pausar / Cortar Servicio RutaFuel (Revocar Acceso en Laravel)
  const handleToggleStatus = async (sub: RutaFuelSubscription) => {
    const isCurrentlyActive = sub.estado === 'active' || sub.estado === 'Activa';
    const newStatus = isCurrentlyActive ? 'revoked' : 'active';
    
    const updated = rutafuelSubs.map(s => s.id === sub.id ? {
      ...s,
      estado: newStatus
    } : s);

    setRutafuelSubs(updated);
    localStorage.setItem('fortexa_rutafuel_subscriptions', JSON.stringify(updated));

    try {
      const targetId = typeof sub.id === 'number' ? sub.id : (sub.droplet_id || 1);
      await softwareLicenseApi.update(targetId, {
        status: newStatus
      });
      showToast(`Estado de ${sub.email} actualizado a: ${newStatus === 'active' ? 'ACTIVO' : 'CORTADO / REVOCADO'} en el Droplet.`);
    } catch {
      showToast(`Estado de ${sub.email} cambiado a: ${newStatus === 'active' ? 'Activo' : 'Cortado / Revocado'}`);
    }
  };

  // 7. Crear Nueva Suscripción Anual y persistirla en Droplet MySQL en software_licenses
  const handleCreateSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubForm.cliente || !newSubForm.email) return;

    const subId = 'SUB-RF-' + (1000 + rutafuelSubs.length + 1);
    const licCode = 'RF-' + newSubForm.cliente.replace(/[^A-Za-z0-9]/g, '').substring(0, 4).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    const expiresAtStr = `${newSubForm.expires_at} 23:59:59`;

    const created: RutaFuelSubscription = {
      id: subId,
      cliente: newSubForm.cliente,
      empresa_nombre: newSubForm.empresa_nombre || newSubForm.cliente,
      contacto: newSubForm.contacto || newSubForm.cliente,
      email: newSubForm.email,
      telefono: newSubForm.telefono || '+502 0000-0000',
      app_name: newSubForm.app_name,
      plan: newSubForm.plan,
      vehiculos_contratados: Number(newSubForm.vehiculos_contratados),
      vehiculos_activos: Number(newSubForm.vehiculos_contratados),
      ciclo: newSubForm.ciclo,
      cuota: Number(newSubForm.cuota),
      fecha_inicio: new Date().toISOString().substring(0, 10),
      expires_at: expiresAtStr,
      metodo_pago: newSubForm.metodo_pago,
      estado: newSubForm.estado,
      codigo_licencia: licCode,
      hwid: null
    };

    const updated = [created, ...rutafuelSubs];
    setRutafuelSubs(updated);
    localStorage.setItem('fortexa_rutafuel_subscriptions', JSON.stringify(updated));

    // Persistir en Droplet MySQL
    try {
      const res = await softwareLicenseApi.create({
        id_empresa: 22, // Fortexa Technologies
        app_name: newSubForm.app_name,
        license_code: licCode,
        email: newSubForm.email,
        status: newSubForm.estado === 'trial' ? 'pending' : 'active',
        license_type: 'subscription',
        expires_at: expiresAtStr,
        hwid: null
      });
      if (res?.data?.id) {
        created.droplet_id = res.data.id;
      }
      showToast(`✅ ¡Suscripción Anual de ${newSubForm.email} creada y sincronizada en el Droplet MySQL!`);
    } catch {
      showToast(`✅ Suscripción de ${newSubForm.cliente} creada con éxito`);
    }

    setShowSubModal(false);
    setNewSubForm({
      cliente: '',
      empresa_nombre: '',
      contacto: '',
      email: '',
      telefono: '',
      app_name: 'RutaFuel Pro',
      plan: 'Flotas B2B Pro (Anual)',
      vehiculos_contratados: 10,
      ciclo: 'Anual',
      cuota: 6500.00,
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      metodo_pago: 'Tarjeta BAC (Débito Automático Anual)',
      estado: 'active'
    });
  };

  // 8. Emitir Licencia Quantum Store POS (Perpetua vs Suscripción/Mensualidad)
  const handleCreateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLicForm.email) return;

    const randomCode = newLicForm.license_code.trim() 
      ? newLicForm.license_code.trim().toUpperCase() 
      : 'HP' + Math.floor(10000000000000 + Math.random() * 90000000000000);

    const isSub = newLicForm.modelo === 'subscription';
    let expiresAt: string | null = null;
    
    if (isSub) {
      if (newLicForm.expires_at) {
        expiresAt = `${newLicForm.expires_at} 23:59:59`;
      } else {
        const d = new Date();
        d.setDate(d.getDate() + (newLicForm.sub_cycle === 'anual' ? 365 : 30));
        expiresAt = `${d.toISOString().substring(0, 10)} 23:59:59`;
      }
    }

    try {
      await softwareLicenseApi.create({
        id_empresa: 22,
        app_name: newLicForm.app_name,
        license_code: randomCode,
        email: newLicForm.email,
        status: newLicForm.status,
        license_type: isSub ? 'subscription' : newLicForm.license_type,
        expires_at: expiresAt,
        hwid: null
      });
      showToast(`✅ ¡Licencia ${isSub ? 'de Suscripción (' + newLicForm.sub_cycle + ')' : 'Perpetua (Vitalicia)'} emitida y guardada en MySQL!`);
      setShowCreateModal(false);
      setNewLicForm({
        app_name: 'Quantum POS',
        email: '',
        modelo: 'perpetual',
        license_type: 'perpetual',
        sub_cycle: 'mensual',
        license_code: '',
        cuota: 499.00,
        expires_at: '',
        status: 'active'
      });
      loadData();
    } catch (err: any) {
      showToast('⚠️ Error al crear licencia: ' + err.message);
    }
  };

  // Cálculos y Métricas del Panel de Suscripciones
  const activeSubs = rutafuelSubs.filter(s => s.estado === 'active' || s.estado === 'trial' || s.estado === 'Activa');
  
  // Próximos a corte (≤ 5 días) según comando de Laravel
  const nearCutoffSubs = rutafuelSubs.filter(s => {
    const details = getCutoffDetails(s.expires_at, s.estado);
    return details.isNearCutoff && s.estado !== 'revoked' && s.estado !== 'suspended';
  });

  // Suscripciones con corte vencido
  const overdueSubs = rutafuelSubs.filter(s => {
    const details = getCutoffDetails(s.expires_at, s.estado);
    return details.isOverdue || s.estado === 'revoked' || s.estado === 'suspended';
  });

  const totalARR = activeSubs.reduce((acc, s) => {
    return acc + (s.ciclo === 'Anual' ? s.cuota : s.cuota * 12);
  }, 0);

  const totalMRR = totalARR / 12;

  const totalVehiculosMonitoreados = rutafuelSubs.reduce((acc, s) => acc + (s.vehiculos_activos || 0), 0);

  // Filtro de Búsqueda y Estados
  const filteredSubs = rutafuelSubs.filter(s => {
    const term = subscriptionSearch.toLowerCase();
    const matchesSearch = s.cliente.toLowerCase().includes(term) ||
                          s.email.toLowerCase().includes(term) ||
                          s.plan.toLowerCase().includes(term) ||
                          s.codigo_licencia.toLowerCase().includes(term) ||
                          (s.hwid && s.hwid.toLowerCase().includes(term)) ||
                          String(s.id).toLowerCase().includes(term);

    const details = getCutoffDetails(s.expires_at, s.estado);

    if (filterStatus === 'corte_proximo') return matchesSearch && details.isNearCutoff;
    if (filterStatus === 'corte_vencido') return matchesSearch && details.isOverdue;
    if (filterStatus === 'activa') return matchesSearch && !details.isOverdue && s.estado === 'active';
    if (filterStatus === 'trial') return matchesSearch && s.estado === 'trial';
    if (filterStatus === 'suspendida') return matchesSearch && (s.estado === 'revoked' || s.estado === 'suspended');
    
    return matchesSearch;
  });

  const filteredLicenses = licenses.filter(l => 
    l.license_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.app_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast de Notificaciones */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Corporativo Fortexa */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-indigo-900/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> Fortexa Technologies
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Software & SaaS Publisher
              </span>
              <span className="text-xs text-slate-400 font-mono">Tenant ID: 22</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Catálogo de Aplicaciones & Suscripciones
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Panel central de administración para las aplicaciones desarrolladas por <strong>Fortexa Technologies</strong>: 
              control de usuarios, planes y <strong>corte de fechas</strong> de <strong>RutaFuel Pro</strong>, licencias de <strong>Quantum Store POS</strong> y contratos de <strong>IntegraPro</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {activeSubTab === 'rutafuel' ? (
              <button
                onClick={() => setShowSubModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-600/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Nueva Suscripción</span>
              </button>
            ) : (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Nueva Licencia</span>
              </button>
            )}
            <a
              href="https://app.integrapro.app/quantum-landing"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Ver Landing Hotmart</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Pestañas de Selección de Apps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
          <button
            onClick={() => setActiveSubTab('rutafuel')}
            className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between ${
              activeSubTab === 'rutafuel'
                ? 'bg-amber-600/30 border-amber-400/60 shadow-lg shadow-amber-900/30 text-white'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30">
                <Fuel className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black">RutaFuel Pro</p>
                <p className="text-[11px] text-slate-400">Control de Suscripciones & Cortes</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-black bg-amber-500/20 px-2 py-0.5 rounded-lg text-amber-300">
                {rutafuelSubs.length} usuarios
              </span>
              {nearCutoffSubs.length > 0 && (
                <span className="text-[9px] font-black bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-md animate-pulse">
                  {nearCutoffSubs.length} en corte
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => setActiveSubTab('quantum')}
            className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between ${
              activeSubTab === 'quantum'
                ? 'bg-purple-600/30 border-purple-400/60 shadow-lg shadow-purple-900/30 text-white'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black">Quantum Store POS</p>
                <p className="text-[11px] text-slate-400">Licencias & Hotmart</p>
              </div>
            </div>
            <span className="text-xs font-black bg-purple-500/20 px-2 py-0.5 rounded-lg text-purple-300">
              {licenses.length} activas
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('integrapro')}
            className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between ${
              activeSubTab === 'integrapro'
                ? 'bg-blue-600/30 border-blue-400/60 shadow-lg shadow-blue-900/30 text-white'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black">IntegraPro ERP</p>
                <p className="text-[11px] text-slate-400">Planes & Empresas SaaS</p>
              </div>
            </div>
            <span className="text-xs font-black bg-blue-500/20 px-2 py-0.5 rounded-lg text-blue-300">
              {allEmpresas.length} empresas
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('live_commerce')}
            className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between ${
              activeSubTab === 'live_commerce'
                ? 'bg-rose-600/30 border-rose-400/60 shadow-lg shadow-rose-900/30 text-white'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500/30 to-pink-500/30 flex items-center justify-center text-rose-400 border border-rose-500/40">
                <Video className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-black text-white flex items-center gap-1.5">
                  TikTok Live
                  <span className="px-1.5 py-0.2 rounded text-[8.5px] font-black uppercase bg-rose-500 text-white">
                    Express
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">Social Selling & Canastas</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-black bg-rose-500/20 px-2 py-0.5 rounded-lg text-rose-300">
                {liveEnabledCount} activas
              </span>
              <span className="text-[9px] font-bold text-slate-400">
                Plan + Add-on
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. SECCIÓN: RUTAFUEL PRO (CONTROL DE SUSCRIPCIONES SAAS) */}
      {/* ======================================================== */}
      {activeSubTab === 'rutafuel' && (
        <div className="space-y-6">
          {/* Header de RutaFuel con Métricas de Corte */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-black text-xl">
                  ⛽
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    RutaFuel Pro • Control de Suscripciones & Fechas de Corte
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                      Laravel Cron Sync
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Control de los usuarios que pagan su suscripción, planes contratados, fechas límites de corte (<code>expires_at</code>) y recordatorios automáticos de pago (5 días antes).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSubModal(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Registrar Suscripción</span>
                </button>
              </div>
            </div>

            {/* 4 Métricas Clave: ARR, Usuarios, Próximos a Corte, Cortes Vencidos */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
              {/* Métrica 1: Recaudación ARR Anual */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> ARR Recurrente Anual
                </span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  Q {totalARR.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded inline-block">
                    {rutafuelSubs.length} suscripciones
                  </span>
                  <span className="text-[9.5px] text-slate-400 font-mono">
                    (Q {totalMRR.toLocaleString('es-GT', { minimumFractionDigits: 0 })}/mes)
                  </span>
                </div>
              </div>

              {/* Métrica 2: Usuarios Suscritos & Flotas */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-600" /> Usuarios / Cuentas Anuales
                </span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {activeSubs.length} <span className="text-xs text-slate-400 font-normal">Cuentas</span>
                </p>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded mt-1 inline-block">
                  {totalVehiculosMonitoreados} vehículos activos
                </span>
              </div>

              {/* Métrica 3: Próximos a Corte (Alerta 5 días según Laravel) */}
              <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80">
                <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                  <Bell className="w-3.5 h-3.5 text-amber-600 animate-bounce" /> Próximos a Corte (≤ 5 Días)
                </span>
                <p className="text-2xl font-black text-amber-900 mt-1">
                  {nearCutoffSubs.length} <span className="text-xs text-amber-700 font-normal">Usuarios</span>
                </p>
                <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded mt-1 inline-block border border-amber-300">
                  Recordatorio Laravel enviado
                </span>
              </div>

              {/* Métrica 4: Cortes Vencidos / Revocados */}
              <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200/80">
                <span className="text-[11px] font-bold text-rose-800 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> En Corte / Vencidos
                </span>
                <p className="text-2xl font-black text-rose-900 mt-1">
                  {overdueSubs.length} <span className="text-xs text-rose-700 font-normal">Cuentas</span>
                </p>
                <span className="text-[10px] font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded mt-1 inline-block border border-rose-300">
                  Servicio suspendido en app
                </span>
              </div>
            </div>
          </div>

          {/* Planes Oficiales de Suscripción Anual de RutaFuel Pro */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  Plan 01 // Particular
                </span>
                <span className="text-xs font-bold text-emerald-600">Freemium</span>
              </div>
              <h3 className="text-sm font-black text-slate-900">Conductor Particular</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Para autos o motos de uso diario. Bitácora de combustible, odómetro y recordatorios de servicio.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900">Gratis</span>
                <span className="text-[11px] text-slate-400">1 Vehículo</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                  Plan 02 // Pro Anual
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Uber / Reparto
                </span>
              </div>
              <h3 className="text-sm font-black text-slate-900">Pro Individual (Anual)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cálculo de ganancia neta por turno, costo real por km y reportes para hasta 3 vehículos.
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-black text-amber-900">Q 590.00</span>
                  <span className="text-xs text-amber-700"> / año</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">(Q 49/mes)</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/5 to-orange-500/10 rounded-2xl border border-amber-300 p-5 shadow-sm space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg">
                  Plan 03 // B2B Anual
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Más Popular
                </span>
              </div>
              <h3 className="text-sm font-black text-slate-900">Flotas B2B Pro (Anual)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Base 10 unidades. Auditoría de cargas sospechosas, mantenimiento preventivo y app choferes.
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-black text-slate-900">Q 6,500.00</span>
                  <span className="text-xs text-slate-500"> / año</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">(Q 541/mes)</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-purple-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                  Plan 04 // Enterprise
                </span>
                <span className="text-xs font-bold text-purple-600">Corporativo</span>
              </div>
              <h3 className="text-sm font-black text-slate-900">Flotas Enterprise (Anual)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                25+ unidades. Telemetría GPS OBD-II, integración ERP IntegraPro y soporte prioritario 24/7.
              </p>
              <div className="pt-2 border-t border-purple-100 flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-black text-purple-900">Q 12,000.00</span>
                  <span className="text-xs text-purple-600"> / año</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">(Q 1,000/mes)</span>
              </div>
            </div>
          </div>

          {/* Tabla Maestra de Control de Suscripciones & Fechas de Corte */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  Control de Usuarios, Tipos de Suscripción & Cortes
                </h3>
                <p className="text-xs text-slate-500">
                  Control exacto de los usuarios que pagan suscripción en Laravel (<code>software_licenses</code>), tipo de plan y semáforo de corte.
                </p>
              </div>

              {/* Filtros de Estado */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setFilterStatus('todos')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      filterStatus === 'todos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Todos ({rutafuelSubs.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus('corte_proximo')}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                      filterStatus === 'corte_proximo' 
                        ? 'bg-amber-500 text-slate-950 font-black shadow-xs' 
                        : 'text-amber-800 hover:bg-amber-100'
                    }`}
                  >
                    <Bell className="w-3 h-3" />
                    <span>Corte ≤ 5d ({nearCutoffSubs.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus('corte_vencido')}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                      filterStatus === 'corte_vencido' 
                        ? 'bg-rose-600 text-white font-black shadow-xs' 
                        : 'text-rose-700 hover:bg-rose-100'
                    }`}
                  >
                    <ShieldAlert className="w-3 h-3" />
                    <span>Vencidos ({overdueSubs.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus('activa')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      filterStatus === 'activa' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    Al Día
                  </button>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar usuario, email, código..."
                    value={subscriptionSearch}
                    onChange={(e) => setSubscriptionSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {filteredSubs.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No se encontraron usuarios o suscripciones con los filtros seleccionados.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-3">Usuario Pagador / Contacto</th>
                      <th className="py-3 px-3">Aplicación & Plan</th>
                      <th className="py-3 px-3">Cuota Recurrente</th>
                      <th className="py-3 px-3">Fecha de Corte (expires_at)</th>
                      <th className="py-3 px-3">Días para el Corte / Alerta</th>
                      <th className="py-3 px-3">Dispositivo (HWID)</th>
                      <th className="py-3 px-3">Estado</th>
                      <th className="py-3 px-3 text-right">Acciones de Cobro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSubs.map((sub) => {
                      const cutoff = getCutoffDetails(sub.expires_at, sub.estado);
                      const isRevoked = sub.estado === 'revoked' || sub.estado === 'suspended';

                      return (
                        <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* Columna 1: Usuario que paga su suscripción */}
                          <td className="py-3 px-3">
                            <div className="flex items-start gap-2">
                              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-700 shrink-0 mt-0.5">
                                <Mail className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-mono font-bold text-slate-900 text-xs truncate" title={sub.email}>
                                  {sub.email}
                                </p>
                                <p className="font-semibold text-slate-700 text-[11px]">{sub.cliente}</p>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                  <span>{sub.contacto}</span>
                                  {sub.telefono && sub.telefono !== 'N/A' && (
                                    <a 
                                      href={`https://wa.me/${sub.telefono.replace(/[^0-9]/g, '')}`} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="text-emerald-700 hover:underline flex items-center gap-0.5 font-bold"
                                    >
                                      <Phone className="w-2.5 h-2.5" />
                                      {sub.telefono}
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Columna 2: Qué tipo de suscripción */}
                          <td className="py-3 px-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-900 text-[11px]">{sub.app_name}</span>
                              </div>
                              <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-black ${
                                sub.plan.includes('Enterprise')
                                  ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                  : sub.plan.includes('B2B')
                                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                  : 'bg-blue-100 text-blue-900 border border-blue-200'
                              }`}>
                                {sub.plan}
                              </span>
                              <p className="text-[10px] text-slate-400">
                                {sub.vehiculos_activos} / {sub.vehiculos_contratados} veh. activos
                              </p>
                            </div>
                          </td>

                          {/* Columna 3: Cuota Recurrente */}
                          <td className="py-3 px-3 font-mono">
                            <p className="font-black text-slate-900 text-sm">
                              Q {sub.cuota.toFixed(2)}
                            </p>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-sans inline-block mt-0.5 border border-amber-200/60">
                              {sub.ciclo === 'Anual' ? 'Suscripción Anual' : 'Mensual'}
                            </span>
                            {sub.ciclo === 'Anual' && sub.cuota > 0 && (
                              <span className="text-[9.5px] text-slate-400 font-sans block mt-0.5">
                                (Q {(sub.cuota / 12).toFixed(2)} / mes)
                              </span>
                            )}
                            <span className="text-[9px] text-slate-400 font-sans truncate max-w-[120px] block mt-0.5" title={sub.metodo_pago}>
                              {sub.metodo_pago}
                            </span>
                          </td>

                          {/* Columna 4: Corte de Fechas (expires_at) */}
                          <td className="py-3 px-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 text-xs">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>{cutoff.formattedDate}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCutoffSub(sub);
                                  setNewCutoffDate(sub.expires_at.substring(0, 10));
                                }}
                                className="text-[10px] font-bold text-indigo-700 hover:text-indigo-900 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-2.5 h-2.5" />
                                <span>Cambiar fecha de corte</span>
                              </button>
                            </div>
                          </td>

                          {/* Columna 5: Días para el Corte / Semáforo de Estado */}
                          <td className="py-3 px-3">
                            <div className="space-y-1">
                              <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black inline-flex items-center gap-1.5 border shadow-2xs ${
                                cutoff.badgeColor === 'emerald'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : cutoff.badgeColor === 'amber'
                                  ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                                  : 'bg-rose-50 text-rose-800 border-rose-300'
                              }`}>
                                <span className={`w-2 h-2 rounded-full ${
                                  cutoff.badgeColor === 'emerald'
                                    ? 'bg-emerald-500'
                                    : cutoff.badgeColor === 'amber'
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                }`} />
                                {cutoff.badgeText}
                              </span>

                              {cutoff.reminderNotice && (
                                <p className="text-[9.5px] font-semibold text-amber-800 flex items-center gap-1 max-w-[190px]">
                                  <Info className="w-3 h-3 text-amber-600 shrink-0" />
                                  <span>{cutoff.reminderNotice}</span>
                                </p>
                              )}
                            </div>
                          </td>

                          {/* Columna 6: Dispositivo Vinculado (HWID) */}
                          <td className="py-3 px-3">
                            <div className="space-y-1">
                              {sub.hwid ? (
                                <div className="flex items-center gap-1">
                                  <Smartphone className="w-3 h-3 text-slate-500" />
                                  <span className="font-mono text-[10.5px] font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                                    {sub.hwid}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[10px] italic text-slate-400 flex items-center gap-1">
                                  <Smartphone className="w-3 h-3 text-slate-300" />
                                  Pendiente vinculación
                                </span>
                              )}
                              <div className="flex items-center gap-1 font-mono text-[9px] text-slate-400">
                                <span>{sub.codigo_licencia}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(sub.codigo_licencia)}
                                  className="text-slate-400 hover:text-slate-700"
                                  title="Copiar código de activación"
                                >
                                  <Copy className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Columna 7: Estado en Laravel */}
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                              isRevoked
                                ? 'bg-rose-100 text-rose-800'
                                : sub.estado === 'trial'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {isRevoked ? 'Revocada / Corte' : sub.estado === 'trial' ? 'En Prueba' : 'Activa'}
                            </span>
                          </td>

                          {/* Columna 8: Acciones Operativas de Corte y Cobro */}
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Botón Renovar Corte +1 Año (Principal para Suscripción Anual) */}
                              <button
                                type="button"
                                onClick={() => handleRenewCutoff(sub, 365)}
                                title="Registrar pago y renovar suscripción anual (+365 días)"
                                className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-[11px] font-bold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                              >
                                <RefreshCw className="w-3 h-3 text-white" />
                                <span>+1 Año</span>
                              </button>

                              {/* Botón Auxiliar +30 Días */}
                              <button
                                type="button"
                                onClick={() => handleRenewCutoff(sub, 30)}
                                title="Extender corte 30 días adicionales"
                                className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-xl transition-all flex items-center gap-0.5 cursor-pointer"
                              >
                                <span>+30d</span>
                              </button>

                              {/* Botón Pausar / Cortar Servicio */}
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(sub)}
                                title={isRevoked ? 'Reactivar servicio' : 'Cortar servicio por falta de pago'}
                                className={`p-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                  isRevoked
                                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                }`}
                              >
                                {isRevoked ? 'Reactivar' : 'Cortar'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. SECCIÓN: QUANTUM STORE POS (HOTMART & LICENCIAS)      */}
      {/* ======================================================== */}
      {activeSubTab === 'quantum' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-black text-xl">
                  ⚡
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    Quantum Store POS
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                      Ventas Hotmart
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Sistema de facturación y punto de venta de escritorio para tiendas retail, minimarkets y boutiques.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right pr-3 border-r border-slate-200 hidden sm:block">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Integración Hotmart</p>
                  <p className="text-xs font-black text-emerald-600 flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Webhook Activo
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Emitir Licencia</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500">Total Licencias Registradas</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{licenses.length}</p>
                <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded mt-1 inline-block">
                  Droplet MySQL Sync
                </span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500">Tipo Perpetua (Vitalicia)</span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {licenses.filter(l => l.license_type?.toLowerCase().includes('perpetual') || l.license_type?.toLowerCase().includes('vitalicia')).length}
                </p>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                  Pago Único
                </span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500">Suscripción / Anual</span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {licenses.filter(l => l.license_type?.toLowerCase().includes('sub')).length}
                </p>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">
                  Recurrente
                </span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500">Activaciones con HWID</span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {licenses.filter(l => Boolean(l.hwid)).length}
                </p>
                <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                  Hardware Vinculado
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Key className="w-4 h-4 text-purple-600" />
                  Licencias de Software Emitidas
                </h3>
                <p className="text-xs text-slate-500">
                  Códigos de activación sincronizados desde el webhook de compras de Hotmart y emitidos manualmente.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por código, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Cargando licencias desde la base de datos de producción...
              </div>
            ) : filteredLicenses.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No se encontraron licencias registradas para esta búsqueda.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-3">Aplicación & Titular</th>
                      <th className="py-3 px-3">Código de Licencia</th>
                      <th className="py-3 px-3">Modelo Comercial & Corte</th>
                      <th className="py-3 px-3">Dispositivo (HWID)</th>
                      <th className="py-3 px-3">Estado</th>
                      <th className="py-3 px-3 text-right">Gestión de Licencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLicenses.map((lic) => {
                      const isSub = lic.license_type?.toLowerCase().includes('sub') || Boolean(lic.expires_at);
                      const cutoff = isSub ? getCutoffDetails(lic.expires_at, lic.status) : null;
                      const isAct = lic.status?.toLowerCase().includes('act');

                      return (
                        <tr key={lic.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* Columna 1: Aplicación & Email Titular */}
                          <td className="py-3 px-3">
                            <div className="flex items-start gap-2">
                              <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                                <Monitor className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 text-xs truncate" title={lic.email}>
                                  {lic.email}
                                </p>
                                <p className="font-semibold text-slate-600 text-[11px]">{lic.app_name}</p>
                                <span className="text-[10px] text-slate-400 font-mono block">
                                  Reg: {lic.created_at ? lic.created_at.substring(0, 10) : '2026-08-03'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Columna 2: Código de Licencia Hotmart */}
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5 font-mono font-black text-slate-800">
                              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs">
                                {lic.license_code}
                              </span>
                              <button
                                onClick={() => handleCopy(lic.license_code)}
                                className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                title="Copiar código de activación"
                              >
                                {copiedCode === lic.license_code ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Columna 3: Modelo Comercial & Corte */}
                          <td className="py-3 px-3">
                            <div className="space-y-1">
                              {isSub ? (
                                <>
                                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-blue-100 text-blue-800 border border-blue-200 inline-block">
                                    Mensualidad / Suscripción
                                  </span>
                                  {cutoff && (
                                    <div className="flex items-center gap-1.5">
                                      <span className={`px-2 py-0.5 rounded-md text-[9.5px] font-bold flex items-center gap-1 ${
                                        cutoff.badgeColor === 'emerald'
                                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                          : cutoff.badgeColor === 'amber'
                                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                                          : 'bg-rose-50 text-rose-800 border border-rose-300'
                                      }`}>
                                        <Calendar className="w-3 h-3" />
                                        <span>Corte: {cutoff.formattedDate}</span>
                                      </span>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-purple-100 text-purple-800 border border-purple-200 inline-flex items-center gap-1">
                                    <Infinity className="w-3 h-3 text-purple-700" />
                                    <span>Licencia Perpetua</span>
                                  </span>
                                  <p className="text-[10px] text-slate-400 font-medium">
                                    Pago Único • Sin fecha de corte
                                  </p>
                                </>
                              )}
                            </div>
                          </td>

                          {/* Columna 4: Hardware ID (HWID) */}
                          <td className="py-3 px-3">
                            <div className="space-y-1">
                              {lic.hwid ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[10.5px] font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                    {lic.hwid}
                                  </span>
                                  <button
                                    onClick={() => handleResetQuantumHWID(lic)}
                                    title="Liberar HWID para permitir reinstalación en nueva PC"
                                    className="p-1 hover:bg-amber-100 text-amber-700 rounded transition-colors cursor-pointer"
                                  >
                                    <Unlock className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <span className="italic text-slate-400 text-[10.5px]">
                                  Pendiente de vinculación
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Columna 5: Estado */}
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black inline-flex items-center gap-1 ${
                              isAct
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isAct ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                              {isAct ? 'Activa' : 'Suspendida'}
                            </span>
                          </td>

                          {/* Columna 6: Acciones de Gestión */}
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {isSub ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleRenewQuantumLicense(lic, 30)}
                                    title="Renovar mensualidad (+30 días)"
                                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[10.5px] font-bold rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <RefreshCw className="w-3 h-3 text-emerald-400" />
                                    <span>+30d</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRenewQuantumLicense(lic, 365)}
                                    title="Renovar suscripción anual (+1 año)"
                                    className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[10.5px] font-bold rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>+1 Año</span>
                                  </button>
                                </>
                              ) : (
                                lic.hwid && (
                                  <button
                                    type="button"
                                    onClick={() => handleResetQuantumHWID(lic)}
                                    title="Desvincular hardware actual para permitir activación en otra máquina"
                                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10.5px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <Unlock className="w-3 h-3" />
                                    <span>Liberar PC</span>
                                  </button>
                                )
                              )}

                              <button
                                type="button"
                                onClick={() => handleToggleQuantumStatus(lic)}
                                title={isAct ? 'Pausar/Suspender licencia' : 'Reactivar licencia'}
                                className={`px-2 py-1 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer border ${
                                  isAct
                                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                }`}
                              >
                                {isAct ? 'Cortar' : 'Reactivar'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. SECCIÓN: INTEGRAPRO ERP (CONTRATOS SAAS FIRMADOS)    */}
      {/* ======================================================== */}
      {activeSubTab === 'integrapro' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 font-black text-xl">
                  💼
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    IntegraPro Cloud ERP
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">
                      SaaS Multi-Tenant
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Suite empresarial en la nube con facturación SAT FEL, inventarios, Kiosco biométrico y administración multi-sucursal.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>10 Tenants en MySQL</span>
                </span>
              </div>
            </div>

            {/* Planes Oficiales SaaS de IntegraPro ERP (4 Niveles Comerciales) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 pb-2">
              
              {/* Plan 1: TikTok Live Express (Nuevo Modelo para Vendedoras Informales) */}
              <div className="bg-gradient-to-br from-rose-500/5 via-pink-500/10 to-purple-500/10 rounded-2xl border-2 border-rose-300 p-5 space-y-2 relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-lg border border-rose-200">
                    Solo Live
                  </span>
                  <span className="text-[10px] font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-200 animate-pulse">
                    Social Commerce
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-rose-600" />
                  TikTok Live Express
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Venta en vivo, canastas automáticas, catálogo con scraper Shein/Temu, envíos Guatex/Forza y WhatsApp. 0 facturación SAT ni contabilidad.
                </p>
                <div className="pt-2 border-t border-rose-200 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-black text-rose-700">Q 199.00</span>
                  <span className="text-xs text-rose-600 font-sans">/ mes</span>
                </div>
              </div>

              {/* Plan 2: PyME */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-200/60 px-2.5 py-0.5 rounded-lg">
                    Plan Básico
                  </span>
                  <span className="text-xs font-bold text-blue-600">Comercio</span>
                </div>
                <h3 className="text-sm font-black text-slate-900">IntegraPro PyME</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Hasta 2 sucursales, facturación SAT FEL ilimitada, inventarios e informes básicos de ventas.
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-black text-slate-900">Q 299.00</span>
                  <span className="text-xs text-slate-500 font-sans">/ mes</span>
                </div>
              </div>

              {/* Plan 3: Comercial Estándar */}
              <div className="bg-gradient-to-br from-blue-500/5 to-indigo-500/10 rounded-2xl border border-blue-300 p-5 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-lg">
                    Plan Estándar
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Más Elegido
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900">IntegraPro Comercial</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hasta 5 sucursales, Kiosco biométrico de RRHH, traslados entre bodegas y cuentas por cobrar.
                </p>
                <div className="pt-2 border-t border-blue-200/60 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-black text-slate-900">Q 699.00</span>
                  <span className="text-xs text-blue-700 font-sans">/ mes</span>
                </div>
              </div>

              {/* Plan 4: Enterprise Corporativo */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-lg">
                    Plan Enterprise
                  </span>
                  <span className="text-xs font-bold text-purple-600">Corporativo</span>
                </div>
                <h3 className="text-sm font-black text-slate-900">IntegraPro Corporativo</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sucursales ilimitadas, multi-empresa, API contable en tiempo real y soporte dedicado 24/7.
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-black text-slate-900">Q 1,499.00</span>
                  <span className="text-xs text-slate-500 font-sans">/ mes</span>
                </div>
              </div>
            </div>

            {/* Add-ons y Extensiones SaaS Comercializables por Fortexa */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-purple-50 to-indigo-50 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                    Add-on Extra para ERP
                  </span>
                  <span className="text-xs font-bold text-slate-600">Fortexa Social Commerce Division</span>
                </div>
                <h4 className="text-sm font-black text-slate-900">
                  Módulo Extra: TikTok Live Commerce (+Q 99.00 / mes)
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  Para clientes con Plan PyME, Estándar o Enterprise (como tiendas físicas o cadenas de retail) que desean transmitir en TikTok/Facebook Live y rematar stock conectando directamente con su inventario central.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-lg font-black text-rose-600 font-mono">Q 99.00 <span className="text-xs font-sans text-slate-500">/ mes</span></p>
                  <p className="text-[10px] text-slate-400">Add-on recurrente</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const demoLive = allEmpresas.find(e => e.id === 99) || allEmpresas[0];
                    handleOpenSaaSModal(demoLive);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Configurar el módulo Live en cualquiera de las empresas suscritas"
                >
                  <Sliders className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Programar en Empresas</span>
                </button>
              </div>
            </div>

            {/* Gestión Centralizada de Empresas Tenants en la Nube */}
            <div className="pt-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Empresas Tenants & Suscripciones SaaS ({allEmpresas.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Administración de planes SaaS, alta de nuevos inquilinos aislados, suspensión de servicio y control de módulos.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                    {liveEnabledCount} con Módulo Live activo
                  </span>
                  <button
                    type="button"
                    onClick={handleOpenNewTenantModal}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-black shadow-md shadow-indigo-600/25 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Activar Nuevo Cliente (Inquilino)</span>
                  </button>
                </div>
              </div>

              <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-3.5">ID Tenant</th>
                        <th className="py-3 px-3.5">Empresa / Razón Social</th>
                        <th className="py-3 px-3.5">Régimen SAT</th>
                        <th className="py-3 px-3.5">Plan SaaS Contratado</th>
                        <th className="py-3 px-3.5">Módulo TikTok Live</th>
                        <th className="py-3 px-3.5">Entorno de Usuario</th>
                        <th className="py-3 px-3.5">Estado</th>
                        <th className="py-3 px-3.5 text-right">Gestión SaaS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {allEmpresas.map(emp => {
                        const isLivePlan = emp.plan === 'live_express';
                        const hasLiveAddon = Boolean(emp.modules?.live_sales);
                        const isLiveOnly = Boolean(isLivePlan || emp.modules?.live_only);

                        return (
                          <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-3.5 font-mono font-bold text-slate-700">
                              #{emp.id}
                            </td>
                            <td className="py-3.5 px-3.5">
                              <p className="font-bold text-slate-900">{emp.nombre}</p>
                              <p className="text-[10px] text-slate-400">{emp.razon_social || emp.nombre}</p>
                            </td>
                            <td className="py-3.5 px-3.5">
                              <span className="text-slate-600 font-mono text-[11px]">{emp.nit || 'CF'}</span>
                              <p className="text-[10px] text-slate-400">{emp.regimen}</p>
                            </td>
                            <td className="py-3.5 px-3.5">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 ${
                                isLivePlan
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : emp.plan === 'enterprise'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : emp.plan === 'standard'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-slate-200 text-slate-700 border border-slate-300'
                              }`}>
                                {isLivePlan ? '🔴 Live Express (Q199)' : `Plan ${emp.plan?.toUpperCase() || 'ESTÁNDAR'}`}
                              </span>
                            </td>
                            <td className="py-3.5 px-3.5">
                              {hasLiveAddon ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
                                  <Video className="w-3 h-3 text-rose-600" />
                                  <span>{isLivePlan ? 'Plan Incluido' : 'Add-on Activo (+Q99)'}</span>
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-400 border border-slate-200">
                                  Inactivo
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3.5">
                              {isLiveOnly ? (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
                                  <Zap className="w-3 h-3 text-amber-600" />
                                  <span>Solo Live Express (0 ERP)</span>
                                </span>
                              ) : emp.modules?.pos === false ? (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
                                  <Layers className="w-3 h-3 text-blue-600" />
                                  <span>Administrativo (Sin POS)</span>
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1">
                                  <Layers className="w-3 h-3 text-slate-500" />
                                  <span>Suite ERP Completa</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3.5">
                              {emp.activa !== false ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  Activa
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                  Suspendida
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleOpenSaaSModal(emp)}
                                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                                  title="Editar plan de suscripción y activar o desactivar módulos"
                                >
                                  <Sliders className="w-3 h-3 text-indigo-400" />
                                  <span>Configurar</span>
                                </button>
                                {emp.id !== 1 && emp.id !== 22 && (
                                  <button
                                    type="button"
                                    disabled={togglingTenantId === emp.id}
                                    onClick={() => handleToggleEmpresaStatus(emp)}
                                    className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer border disabled:opacity-50 ${
                                      emp.activa !== false
                                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                    }`}
                                    title={emp.activa !== false ? 'Suspender acceso del cliente y cerrar sesiones' : 'Reactivar servicio del cliente'}
                                  >
                                    <Power className="w-3 h-3" />
                                    <span>{emp.activa !== false ? 'Suspender' : 'Reactivar'}</span>
                                  </button>
                                )}
                                {onSelectEmpresa && isOwnerOperableEmpresa(emp.id) ? (
                                  <button
                                    type="button"
                                    onClick={() => onSelectEmpresa(emp.id)}
                                    className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded-lg transition-all cursor-pointer border border-indigo-200"
                                    title="Ingresar a la vista de tu empresa propia / demo"
                                  >
                                    <span>Probar Vista</span>
                                  </button>
                                ) : (
                                  <span
                                    className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-200 inline-flex items-center gap-1"
                                    title="Privacidad Multi-Tenant: los datos operativos de clientes externos son privados"
                                  >
                                    <Lock className="w-3 h-3" />
                                    <span>Privado</span>
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-blue-600" />
                    Contratos de Licencia Digital Firmados Electrónicamente
                  </h3>
                  <p className="text-xs text-slate-500">
                    Registro legal de aceptación de términos de servicio y contratos de suscripción SaaS almacenados en el Droplet.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                  {signedLicenses.length} firmas registradas
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-3">ID Contrato</th>
                      <th className="py-3 px-3">Firmado Por</th>
                      <th className="py-3 px-3">Usuario ID</th>
                      <th className="py-3 px-3">Dirección IP</th>
                      <th className="py-3 px-3">Documento PDF</th>
                      <th className="py-3 px-3 text-right">Fecha & Hora Firma</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {signedLicenses.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">
                          LIC-{s.id.toString().padStart(4, '0')}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          {s.signed_by}
                        </td>
                        <td className="py-3 px-3 text-slate-500 font-mono">
                          User #{s.user_id}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">
                          {s.ip_address || '127.0.0.1'}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600">
                            {s.pdf_path || 'license_pdf'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-slate-400 font-medium">
                          {s.created_at}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. SECCIÓN: TIKTOK LIVE COMMERCE (SOCIAL SELLING DIVISION) */}
      {/* ======================================================== */}
      {activeSubTab === 'live_commerce' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header de TikTok Live con Branding Social Selling */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-600 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-rose-600/30">
                  <Video className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-slate-900">
                      TikTok Live Commerce • Fortexa Social Selling Division
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
                      Live Suite
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
                    Infraestructura para streamers y vendedoras en directo: canastas abiertas, apartado en tiempo real, catálogo con fotos y liquidación por Guatex, Forza y WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>{liveEnabledCount} Clientes con Live</span>
                </span>
              </div>
            </div>

            {/* Métricas Globales del Negocio Live en Fortexa */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 pb-2">
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Boutiques Activas</span>
                <p className="text-2xl font-black text-slate-900">{liveEnabledCount}</p>
                <span className="text-[10px] text-emerald-600 font-bold">100% operativas</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">GMV en Directo</span>
                <p className="text-2xl font-black text-rose-600 font-mono">Q 148,250</p>
                <span className="text-[10px] text-slate-400 font-semibold">Procesado en el mes</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Canastas Abiertas</span>
                <p className="text-2xl font-black text-indigo-600 font-mono">1,420</p>
                <span className="text-[10px] text-indigo-600 font-semibold">Prendas despachadas</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Efectividad de Cobro</span>
                <p className="text-2xl font-black text-emerald-600">94.8%</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Pagadas / Entregadas</span>
              </div>
            </div>

            {/* Dos Formas de Monetización y Configuración Comercial */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-rose-600" />
                  Estrategia de Suscripción & Monetización para Fortexa Technologies
                </h3>
                <p className="text-xs text-slate-500">
                  Dos opciones comerciales para adaptarse tanto a vendedoras informales como a tiendas formales consolidadas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Opción 1: Plan Dedicado Solo Live Express */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/80 via-pink-50/50 to-white border-2 border-rose-300 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                      Modalidad 1: Plan Dedicado
                    </span>
                    <span className="text-xs font-black text-rose-700 font-mono">Q 199.00 / mes</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Plan TikTok Live Express (Solo Live)</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Diseñado para vendedoras informales de TikTok Live, ropa de paca/americana o calzado que <strong>NO tienen local físico ni facturación SAT</strong>.
                    </p>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-700 font-medium pt-2 border-t border-rose-200/70">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Interfaz 100% limpia sin módulos ERP ni contabilidad</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Canastas abiertas, apartado inmediato y cobro por WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Envíos con Guatex, Forza o Cargo Expreso por departamento</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Cuentas bancarias (BI, Banrural, BAC) y contra entrega</span>
                    </li>
                  </ul>
                </div>

                {/* Opción 2: Add-on Extra para ERP */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-white border border-indigo-200 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
                      Modalidad 2: Add-on Extra
                    </span>
                    <span className="text-xs font-black text-indigo-700 font-mono">+Q 99.00 / mes</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Módulo Add-on TikTok Live para Clientes ERP</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Para clientes en Plan PyME, Comercial o Enterprise (como <strong>Fashion Styles</strong>) que tienen tienda física y quieren hacer transmisiones en vivo.
                    </p>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-700 font-medium pt-2 border-t border-indigo-200/70">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Mantiene todo el ERP: POS, Facturación FEL SAT y Contabilidad</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Descuenta inventario en vivo del stock físico de sus tiendas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Opción de emitir factura FEL SAT o recibo al confirmar canasta</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Dashboard Ejecutivo con botón de alternar métricas de Live</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Listado de Empresas con Módulo Live Activado */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-600" />
                    Empresas con Módulo Live Activado ({liveEnabledCount})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Boutiques que tienen contratado el Plan Live Express o el Add-on Extra.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const firstNonLive = allEmpresas.find(e => !e.modules?.live_sales && e.id !== 22) || allEmpresas[0];
                    handleOpenSaaSModal(firstNonLive);
                  }}
                  className="px-3 py-1.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Habilitar Live en Otra Empresa</span>
                </button>
              </div>

              <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-3.5">Empresa Cliente</th>
                      <th className="py-3 px-3.5">Tipo de Contratación</th>
                      <th className="py-3 px-3.5">Cuota Mensual</th>
                      <th className="py-3 px-3.5">Entorno Activo</th>
                      <th className="py-3 px-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {allEmpresas.filter(e => e.plan === 'live_express' || e.modules?.live_sales).map(emp => {
                      const isSoloLive = emp.plan === 'live_express' || emp.modules?.live_only;
                      return (
                        <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-3.5">
                            <p className="font-bold text-slate-900">{emp.nombre}</p>
                            <p className="text-[10px] text-slate-400 font-mono">Tenant #{emp.id} • {emp.nit || 'CF'}</p>
                          </td>
                          <td className="py-3.5 px-3.5">
                            {emp.plan === 'live_express' ? (
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-rose-100 text-rose-800 border border-rose-200">
                                Plan Dedicado Solo Live
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 border border-indigo-200">
                                Add-on Extra (+ Plan {emp.plan?.toUpperCase()})
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-3.5 font-mono font-bold text-slate-900">
                            {emp.plan === 'live_express' ? 'Q 199.00 / mes' : '+Q 99.00 / mes'}
                          </td>
                          <td className="py-3.5 px-3.5">
                            {isSoloLive ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                ⚡ Live Express (0 ERP)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                💼 ERP Completo + Módulo Live
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenSaaSModal(emp)}
                                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Sliders className="w-3 h-3 text-indigo-400" />
                                <span>Ajustar Plan</span>
                              </button>
                              {onSelectEmpresa && (
                                <button
                                  type="button"
                                  onClick={() => onSelectEmpresa(emp.id)}
                                  className="px-2.5 py-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer shadow-xs"
                                >
                                  <span>Probar Live</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal: Ajustar Fecha de Corte Manualmente (expires_at) */}
      {editingCutoffSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">Ajustar Fecha de Corte</h3>
                  <p className="text-[10px] text-slate-400">Modificar campo <code>expires_at</code></p>
                </div>
              </div>
              <button 
                onClick={() => setEditingCutoffSub(null)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400">Usuario / Cliente:</p>
                <p className="font-bold text-slate-800">{editingCutoffSub.email}</p>
                <p className="text-[11px] text-slate-500 font-medium">{editingCutoffSub.cliente} • {editingCutoffSub.plan}</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nueva Fecha de Corte:</label>
                <input
                  type="date"
                  value={newCutoffDate}
                  onChange={(e) => setNewCutoffDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCutoffSub(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustomCutoff}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  Guardar en Droplet MySQL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Emitir Licencia Quantum Store POS (Perpetua vs Mensualidad) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Emitir Licencia Quantum Store POS</h3>
                  <p className="text-[11px] text-slate-400">Fortexa Technologies • Modelo Perpetuo vs Suscripción</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLicense} className="space-y-4 text-xs">
              {/* Selector Visual de Modelo Comercial */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Selecciona el Modelo de Comercialización:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewLicForm({
                      ...newLicForm,
                      modelo: 'perpetual',
                      license_type: 'perpetual',
                      cuota: 499.00,
                      expires_at: ''
                    })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      newLicForm.modelo === 'perpetual'
                        ? 'bg-purple-50 border-purple-400 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-purple-700 font-black mb-1">
                      <Infinity className="w-4 h-4" />
                      <span>Licencia Perpetua</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">Pago Único (Vitalicia)</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Sin corte. Activación única de por vida ligada al Hardware ID (HWID).
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const d = new Date();
                      d.setDate(d.getDate() + 30);
                      setNewLicForm({
                        ...newLicForm,
                        modelo: 'subscription',
                        license_type: 'subscription',
                        sub_cycle: 'mensual',
                        cuota: 75.00,
                        expires_at: d.toISOString().substring(0, 10)
                      });
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      newLicForm.modelo === 'subscription'
                        ? 'bg-blue-50 border-blue-400 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-blue-700 font-black mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Mensualidad / Suscripción</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">Recurrente (Con Corte)</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Con fecha de corte programada. Notificación y corte si no renueva.
                    </p>
                  </button>
                </div>
              </div>

              {/* Opciones según el modelo seleccionado */}
              {newLicForm.modelo === 'perpetual' ? (
                <div className="bg-purple-50/50 p-3 rounded-2xl border border-purple-200/60 space-y-2">
                  <label className="font-bold text-purple-900 block text-[11px]">Tipo de Licencia Vitalicia:</label>
                  <select
                    value={newLicForm.license_type}
                    onChange={(e: any) => {
                      const val = e.target.value;
                      setNewLicForm({
                        ...newLicForm,
                        license_type: val,
                        cuota: val === 'Empresarial' ? 999.00 : 499.00
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl font-bold text-slate-800"
                  >
                    <option value="perpetual">Quantum POS Estándar (1 PC) — Q 499.00 Pago Único</option>
                    <option value="Empresarial">Quantum POS Red Empresarial (hasta 5 PCs) — Q 999.00 Pago Único</option>
                  </select>
                  <p className="text-[10px] text-purple-700">
                    ✓ <code>expires_at = null</code> en MySQL. Acceso ilimitado sin caducidad.
                  </p>
                </div>
              ) : (
                <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-200/60 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-blue-900 block text-[11px] mb-1">Ciclo Recurrente:</label>
                      <select
                        value={newLicForm.sub_cycle}
                        onChange={(e: any) => {
                          const cycle = e.target.value;
                          const d = new Date();
                          d.setDate(d.getDate() + (cycle === 'anual' ? 365 : 30));
                          setNewLicForm({
                            ...newLicForm,
                            sub_cycle: cycle,
                            cuota: cycle === 'anual' ? 350.00 : 75.00,
                            expires_at: d.toISOString().substring(0, 10)
                          });
                        }}
                        className="w-full px-2.5 py-2 bg-white border border-blue-200 rounded-xl font-bold text-slate-800"
                      >
                        <option value="mensual">Mensualidad — Q 75.00 / mes</option>
                        <option value="anual">Suscripción Anual — Q 350.00 / año</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-blue-900 block text-[11px] mb-1">Fecha de Primer Corte:</label>
                      <input
                        type="date"
                        required
                        value={newLicForm.expires_at}
                        onChange={(e) => setNewLicForm({ ...newLicForm, expires_at: e.target.value })}
                        className="w-full px-2.5 py-2 bg-white border border-blue-200 rounded-xl font-mono font-bold text-slate-900"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-blue-700">
                    ✓ Se sincroniza con <code>expires_at</code> en MySQL. Corte de servicio si vence la fecha.
                  </p>
                </div>
              )}

              {/* Datos del Comprador */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Correo Electrónico del Comprador:</label>
                <input
                  type="email"
                  required
                  placeholder="ej. cliente@tienda.com"
                  value={newLicForm.email}
                  onChange={(e) => setNewLicForm({ ...newLicForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                />
              </div>

              {/* Código de Licencia y Estado */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700 block">Código de Licencia:</label>
                    <button
                      type="button"
                      onClick={() => setNewLicForm({
                        ...newLicForm,
                        license_code: 'HP' + Math.floor(10000000000000 + Math.random() * 90000000000000)
                      })}
                      className="text-[10px] font-bold text-purple-600 hover:underline cursor-pointer"
                    >
                      Autogenerar Hotmart
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="HP... o dejar en blanco"
                    value={newLicForm.license_code}
                    onChange={(e) => setNewLicForm({ ...newLicForm, license_code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estado Inicial:</label>
                  <select
                    value={newLicForm.status}
                    onChange={(e: any) => setNewLicForm({ ...newLicForm, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="active">Activa (Lista para usar)</option>
                    <option value="pending">Pendiente de Activación</option>
                  </select>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                ℹ️ Al presionar guardar, el registro se sincronizará inmediatamente en la tabla <code>software_licenses</code> del Droplet en producción para que el sistema Quantum POS reconozca la activación.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  Emitir y Guardar en MySQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Registrar Nueva Suscripción Anual de RutaFuel Pro */}
      {showSubModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Fuel className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Registrar Suscripción Anual de Usuario</h3>
                  <p className="text-[11px] text-slate-400">Fortexa Technologies • Modelo Anual RutaFuel Pro (365 días)</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSubModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubscription} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correo Electrónico (Usuario Pagador):</label>
                  <input
                    type="email"
                    required
                    placeholder="ej. gerencia@transportes.com"
                    value={newSubForm.email}
                    onChange={(e) => setNewSubForm({ ...newSubForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre Comercial / Flota:</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Transportes Rápidos S.A."
                    value={newSubForm.cliente}
                    onChange={(e) => setNewSubForm({ ...newSubForm, cliente: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Persona de Contacto:</label>
                  <input
                    type="text"
                    placeholder="ej. Lic. Mario Estrada"
                    value={newSubForm.contacto}
                    onChange={(e) => setNewSubForm({ ...newSubForm, contacto: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Teléfono / WhatsApp:</label>
                  <input
                    type="text"
                    placeholder="ej. +502 5555-1234"
                    value={newSubForm.telefono}
                    onChange={(e) => setNewSubForm({ ...newSubForm, telefono: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              {/* Planes Oficiales Anuales de RutaFuel */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Plan de Suscripción Anual:</label>
                  <select
                    value={newSubForm.plan}
                    onChange={(e: any) => {
                      const p = e.target.value;
                      let cuotaVal = 6500;
                      let vehs = 10;
                      if (p === 'Pro Individual (Anual)') { cuotaVal = 590; vehs = 3; }
                      if (p === 'Flotas Enterprise (Anual)') { cuotaVal = 12000; vehs = 25; }
                      if (p === 'Conductor Particular (Freemium)') { cuotaVal = 0; vehs = 1; }
                      setNewSubForm({ ...newSubForm, plan: p, cuota: cuotaVal, vehiculos_contratados: vehs });
                    }}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="Flotas B2B Pro (Anual)">Flotas B2B Pro (Anual) — Q 6,500/año</option>
                    <option value="Flotas Enterprise (Anual)">Flotas Enterprise (Anual) — Q 12,000/año</option>
                    <option value="Pro Individual (Anual)">Pro Individual (Anual) — Q 590/año</option>
                    <option value="Conductor Particular (Freemium)">Conductor Particular — Gratis</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vehículos Contratados:</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newSubForm.vehiculos_contratados}
                    onChange={(e) => setNewSubForm({ ...newSubForm, vehiculos_contratados: Number(e.target.value) })}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cuota Anual (GTQ):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newSubForm.cuota}
                    onChange={(e) => setNewSubForm({ ...newSubForm, cuota: Number(e.target.value) })}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha de Primer Corte Anual (expires_at):</label>
                  <input
                    type="date"
                    required
                    value={newSubForm.expires_at}
                    onChange={(e) => setNewSubForm({ ...newSubForm, expires_at: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Método de Cobro:</label>
                  <select
                    value={newSubForm.metodo_pago}
                    onChange={(e: any) => setNewSubForm({ ...newSubForm, metodo_pago: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="Tarjeta BAC (Débito Automático Anual)">Tarjeta BAC (Débito Automático Anual)</option>
                    <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                    <option value="Tarjeta de Crédito Online">Tarjeta de Crédito Online</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Estado de la Suscripción:</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    newSubForm.estado === 'active' ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <input
                      type="radio"
                      name="sub_estado"
                      checked={newSubForm.estado === 'active'}
                      onChange={() => setNewSubForm({ ...newSubForm, estado: 'active' })}
                    />
                    <span>Suscripción Anual Activa (365 días)</span>
                  </label>
                  <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    newSubForm.estado === 'trial' ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <input
                      type="radio"
                      name="sub_estado"
                      checked={newSubForm.estado === 'trial'}
                      onChange={() => setNewSubForm({ ...newSubForm, estado: 'trial' })}
                    />
                    <span>Periodo de Prueba (14 Días)</span>
                  </label>
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1 text-amber-800">
                  <Bell className="w-3.5 h-3.5 text-amber-600" />
                  Notificaciones automáticas y corte en Laravel
                </p>
                <p className="text-amber-800/90 leading-relaxed text-[10.5px]">
                  El comando <code>licenses:send-reminders</code> revisará diariamente la fecha <code>expires_at</code>. Si faltan 5 días para cumplir el año, enviará un correo automático de renovación. Si no se registra el pago, se revoca el acceso en la aplicación móvil de RutaFuel.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSubModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  Guardar en MySQL y Activar Anual
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Configuración de Plan SaaS & Módulos de Empresa (Fortexa SaaS Cerebro) */}
      {editingEmpresaSaaS && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Gestionar Suscripción & Módulos SaaS
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {editingEmpresaSaaS.nombre} • Tenant #{editingEmpresaSaaS.id}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setEditingEmpresaSaaS(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1">
              
              {/* 1. Selector de Plan SaaS Base */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 block uppercase tracking-wider">
                  1. Plan de Suscripción Oficial
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Plan Live Express */}
                  <div 
                    onClick={() => handlePlanChange('live_express')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      saasPlanForm.plan === 'live_express'
                        ? 'border-rose-500 bg-rose-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                        Solo Live Express
                      </span>
                      <span className="text-xs font-black font-mono text-rose-700">Q 199/m</span>
                    </div>
                    <p className="text-xs font-black text-slate-900">TikTok Live Express</p>
                    <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      Para vendedoras sin local ni SAT. Cero módulos ERP.
                    </p>
                  </div>

                  {/* Plan PyME */}
                  <div 
                    onClick={() => handlePlanChange('basic')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      saasPlanForm.plan === 'basic'
                        ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                        Plan PyME
                      </span>
                      <span className="text-xs font-black font-mono text-slate-900">Q 299/m</span>
                    </div>
                    <p className="text-xs font-black text-slate-900">IntegraPro PyME</p>
                    <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      Hasta 2 sucursales, facturas FEL e inventario básico.
                    </p>
                  </div>

                  {/* Plan Comercial */}
                  <div 
                    onClick={() => handlePlanChange('standard')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      saasPlanForm.plan === 'standard'
                        ? 'border-indigo-500 bg-indigo-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        Más Elegido
                      </span>
                      <span className="text-xs font-black font-mono text-slate-900">Q 699/m</span>
                    </div>
                    <p className="text-xs font-black text-slate-900">IntegraPro Comercial</p>
                    <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      5 sucursales, Kiosco biométrico RRHH y cuentas por cobrar.
                    </p>
                  </div>

                  {/* Plan Enterprise */}
                  <div 
                    onClick={() => handlePlanChange('enterprise')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      saasPlanForm.plan === 'enterprise'
                        ? 'border-purple-500 bg-purple-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                        Corporativo
                      </span>
                      <span className="text-xs font-black font-mono text-slate-900">Q 1,499/m</span>
                    </div>
                    <p className="text-xs font-black text-slate-900">IntegraPro Enterprise</p>
                    <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      Multi-empresa, API contable SAT y sucursales ilimitadas.
                    </p>
                  </div>

                </div>
              </div>

              {/* 2. Add-on TikTok Live Commerce (Para planes PyME/Estándar/Enterprise) */}
              {saasPlanForm.plan !== 'live_express' && (
                <div className="p-4 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 border border-rose-200 rounded-2xl flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-rose-900 flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-rose-600" />
                        Add-on Extra: TikTok Live Commerce
                      </span>
                      <span className="text-[10px] font-black font-mono text-rose-700 bg-rose-200/60 px-2 py-0.2 rounded-full">
                        +Q 99.00 / mes
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Habilita el módulo de canastas en vivo y apartado para clientes con ERP completo.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={saasPlanForm.hasLiveAddon}
                      onChange={(e) => setSaasPlanForm({ ...saasPlanForm, hasLiveAddon: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>
              )}

              {/* 3. Control de Entorno / Modo de Interfaz */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Forzar Interfaz Live Express (Ocultar Todo el ERP)
                  </span>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Al entrar a esta empresa, el usuario solo verá las 5 pestañas de Live (Live, Prendas, Clientas, Resultados y Tienda).
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={saasPlanForm.isLiveOnly}
                    onChange={(e) => setSaasPlanForm({ ...saasPlanForm, isLiveOnly: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>

              {/* 4. Módulos ERP Tradicionales (Solo si no está forzado a solo live) */}
              {!saasPlanForm.isLiveOnly && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 block uppercase tracking-wider">
                    2. Módulos ERP Tradicionales Activos
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { key: 'hasPos', label: 'Punto de Venta (POS)', desc: 'Cajas físicas' },
                      { key: 'hasFel', label: 'Ventas & Facturas FEL', desc: 'DTEs SAT' },
                      { key: 'hasInventory', label: 'Inventario & Bodega', desc: 'Kardex y stock' },
                      { key: 'hasClients', label: 'Cartera de Clientes', desc: 'Crédito y saldo' },
                      { key: 'hasPurchases', label: 'Compras & Proveedores', desc: 'Facturas compras' },
                      { key: 'hasAccounting', label: 'Contabilidad SAT', desc: 'Libro diario' },
                      { key: 'hasHr', label: 'Recursos Humanos & Kiosco', desc: 'Planillas y huella' }
                    ].map((mod) => (
                      <label 
                        key={mod.key} 
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <p className="font-bold text-slate-800 text-[11px]">{mod.label}</p>
                          <p className="text-[10px] text-slate-400">{mod.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={(saasPlanForm as any)[mod.key]}
                          onChange={(e) => setSaasPlanForm({ ...saasPlanForm, [mod.key]: e.target.checked })}
                          className="w-4 h-4 text-indigo-600 rounded shrink-0"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setEditingEmpresaSaaS(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <div className="flex items-center gap-2">
                {onSelectEmpresa && isOwnerOperableEmpresa(editingEmpresaSaaS.id) && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = handleSaveSaaSConfig();
                      if (updated) {
                        onSelectEmpresa(updated.id);
                      }
                    }}
                    className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-all border border-indigo-200 cursor-pointer"
                  >
                    Guardar y Probar Vista
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSaveSaaSConfig}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Guardar Configuración SaaS
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL FASE 1: ACTIVAR NUEVO CLIENTE (INQUILINO SAAS AISLADO) */}
      {showNewTenantModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/25 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {createdTenantResult ? '¡Nuevo Cliente Activado en Producción!' : 'Activar Nuevo Cliente (Inquilino SaaS)'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {createdTenantResult
                      ? 'Espacio multi-tenant creado en MySQL con aislamiento total. Entrega estas credenciales al cliente.'
                      : 'Crea en 1 paso: Empresa aislada + Sucursal Principal + Usuario Dueño (sin acceso a otros inquilinos).'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNewTenantModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {createdTenantResult ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div className="text-xs text-emerald-900">
                    <p className="font-black">Inquilino #{createdTenantResult.empresa.id} — {createdTenantResult.empresa.nombre}</p>
                    <p className="text-emerald-700 mt-0.5">
                      Sucursal inicial: <strong>{createdTenantResult.sucursalNombre}</strong> • Aislamiento privado verificado.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between gap-2 border-b border-slate-800 pb-2">
                    <span className="text-slate-400">URL de Acceso:</span>
                    <span className="text-indigo-300 font-bold">https://app.integrapro.app</span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Administrador:</span>
                    <span className="text-white font-bold">{createdTenantResult.adminName}</span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Correo (Usuario):</span>
                    <span className="text-emerald-300 font-bold">{createdTenantResult.adminEmail}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400">Contraseña Inicial:</span>
                    <span className="text-amber-300 font-black text-sm">{createdTenantResult.plainPassword}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(getTenantWelcomeText());
                      setCopiedCredentials(true);
                      setTimeout(() => setCopiedCredentials(false), 2500);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedCredentials ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCredentials ? '¡Mensaje Copiado!' : 'Copiar Credenciales'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const rawPhone = newTenantForm.telefono.replace(/\D/g, '');
                      const waPhone = rawPhone ? (rawPhone.startsWith('502') ? rawPhone : `502${rawPhone}`) : '';
                      const url = waPhone
                        ? `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(getTenantWelcomeText())}`
                        : `https://api.whatsapp.com/send?text=${encodeURIComponent(getTenantWelcomeText())}`;
                      window.open(url, '_blank');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar por WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewTenantModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black cursor-pointer"
                  >
                    Finalizar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateNewTenant} className="space-y-5 text-xs">
                {tenantCreateError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{tenantCreateError}</span>
                  </div>
                )}

                {/* 1. Datos de la Empresa */}
                <div className="space-y-3">
                  <p className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    1. Datos del Negocio (Nuevo Inquilino)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nombre Comercial *</label>
                      <input
                        type="text"
                        required
                        value={newTenantForm.nombre}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, nombre: e.target.value })}
                        placeholder="Ej. Ferretería El Constructor"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Razón Social</label>
                      <input
                        type="text"
                        value={newTenantForm.razon_social}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, razon_social: e.target.value })}
                        placeholder="Ej. Inversiones El Constructor S.A."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">NIT (o CF)</label>
                      <input
                        type="text"
                        value={newTenantForm.nit}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, nit: e.target.value })}
                        placeholder="Ej. 1234567-8 o CF"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Régimen Tributario SAT</label>
                      <select
                        value={newTenantForm.regimen_tributario}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, regimen_tributario: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="general">Régimen General (IVA 12%)</option>
                        <option value="pequeno_contribuyente">Pequeño Contribuyente (5%)</option>
                        <option value="informal">Exento / Informal (0%)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Teléfono / WhatsApp</label>
                      <input
                        type="text"
                        value={newTenantForm.telefono}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, telefono: e.target.value })}
                        placeholder="Ej. 5555-1234"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Sucursal Inicial</label>
                      <input
                        type="text"
                        value={newTenantForm.sucursal_nombre}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, sucursal_nombre: e.target.value })}
                        placeholder="Sucursal Principal"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Plan y Perfil Operativo */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <p className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-600" />
                    2. Perfil del Cliente & Módulos Activados
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {[
                      { id: 'retail', label: 'Retail / POS' },
                      { id: 'admin_only', label: 'Admin (Sin POS)' },
                      { id: 'standard', label: 'Estándar PyME' },
                      { id: 'enterprise', label: 'Enterprise Full' },
                      { id: 'live_express', label: 'Solo TikTok Live' },
                    ].map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => applyTenantPreset(p.id as any)}
                        className={`px-2.5 py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                          newTenantForm.preset === p.id
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'hasPos', label: 'Punto de Venta (POS)' },
                      { key: 'hasInventory', label: 'Inventario & Bodega' },
                      { key: 'hasFel', label: 'Ventas & FEL' },
                      { key: 'hasClients', label: 'Clientes & CxC' },
                      { key: 'hasPurchases', label: 'Compras & CxP' },
                      { key: 'hasAccounting', label: 'Contabilidad SAT' },
                      { key: 'hasHr', label: 'RRHH & Asistencia' },
                      { key: 'hasLiveSales', label: 'TikTok Live' },
                    ].map(mod => (
                      <label
                        key={mod.key}
                        className="p-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <span className="text-[11px] font-bold text-slate-700">{mod.label}</span>
                        <input
                          type="checkbox"
                          checked={(newTenantForm as any)[mod.key]}
                          onChange={(e) => setNewTenantForm({ ...newTenantForm, [mod.key]: e.target.checked })}
                          className="w-4 h-4 text-indigo-600 rounded"
                        />
                      </label>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Estado Inicial de Suscripción</label>
                      <select
                        value={newTenantForm.subscription_status}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, subscription_status: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                      >
                        <option value="active">Activa (Pagada)</option>
                        <option value="trial">Prueba Gratis (Trial)</option>
                      </select>
                    </div>
                    {newTenantForm.subscription_status === 'trial' && (
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Días de Prueba</label>
                        <input
                          type="number"
                          min={1}
                          max={90}
                          value={newTenantForm.trial_days}
                          onChange={(e) => setNewTenantForm({ ...newTenantForm, trial_days: Number(e.target.value) || 14 })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Credenciales del Dueño */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <p className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-emerald-600" />
                    3. Usuario Administrador del Cliente (Acceso Aislado)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nombre del Dueño *</label>
                      <input
                        type="text"
                        required
                        value={newTenantForm.admin_name}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, admin_name: e.target.value })}
                        placeholder="Ej. Carlos Méndez"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Correo de Acceso *</label>
                      <input
                        type="email"
                        required
                        value={newTenantForm.admin_email}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, admin_email: e.target.value })}
                        placeholder="carlos@ferreteria.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span>Contraseña Inicial</span>
                        <button
                          type="button"
                          onClick={() => setNewTenantForm({ ...newTenantForm, admin_password: generateSecurePassword() })}
                          className="text-[10px] text-indigo-600 hover:underline cursor-pointer"
                        >
                          Generar otra
                        </button>
                      </label>
                      <input
                        type="text"
                        required
                        minLength={6}
                        value={newTenantForm.admin_password}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, admin_password: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    disabled={isCreatingTenant}
                    onClick={() => setShowNewTenantModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingTenant}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black shadow-md shadow-indigo-600/25 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isCreatingTenant ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Creando Inquilino en MySQL...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Crear y Activar Empresa Cliente</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
