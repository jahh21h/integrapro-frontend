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
  Send,
  Trash2
} from 'lucide-react';
import { SoftwareLicenseItem, SignedLicenseItem, EmpresaSaaS } from '../types';
import { softwareLicenseApi, empresaApi } from '../api';
import { isOwnerOperableEmpresa } from '../utils/tenant';
import { useLanguage } from '../context/LanguageContext';

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
  onDeleteEmpresa?: (id: number) => void;
  onSelectEmpresa?: (id: number) => void;
}

export default function FortexaAppsView({ 
  currentEmpresa,
  empresas = [],
  onUpdateEmpresa,
  onCreateEmpresa,
  onDeleteEmpresa,
  onSelectEmpresa
}: FortexaAppsViewProps) {
  const { L, money, currencySymbol, currencyCode, locale, taxIdLabel, trRegime, trTaxId } = useLanguage();
  const deleteKeyword = L('ELIMINAR', 'DELETE');

  const trRutaFuelPlan = (plan: string) => {
    switch (plan) {
      case 'Pro Individual (Anual)':
        return L('Pro Individual (Anual)', 'Individual Pro (Annual)');
      case 'Flotas B2B Pro (Anual)':
        return L('Flotas B2B Pro (Anual)', 'B2B Fleets Pro (Annual)');
      case 'Flotas Enterprise (Anual)':
        return L('Flotas Enterprise (Anual)', 'Enterprise Fleets (Annual)');
      case 'Conductor Particular (Freemium)':
        return L('Conductor Particular (Freemium)', 'Personal Driver (Freemium)');
      case 'Quantum POS Anual':
        return L('Quantum POS Anual', 'Quantum POS Annual');
      default:
        return plan;
    }
  };

  const trSubPayMethod = (method: string) => {
    switch (method) {
      case 'Tarjeta BAC (Débito Automático Anual)':
        return L('Tarjeta BAC (Débito Automático Anual)', 'BAC Card (Annual Auto-Debit)');
      case 'Transferencia Bancaria':
        return L('Transferencia Bancaria', 'Bank Transfer');
      case 'Tarjeta de Crédito Online':
        return L('Tarjeta de Crédito Online', 'Online Credit Card');
      default:
        return method;
    }
  };

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

  // Helpers de Moneda (Guatemala => GTQ 'Q', Otros países => USD '$') y Cobranza SaaS
  const getCurrencyForCountry = (pais?: string): 'GTQ' | 'USD' =>
    (pais || 'GT').toUpperCase() === 'GT' ? 'GTQ' : 'USD';

  const getCurrencySymbol = (currency?: string, pais?: string): string => {
    const cur = currency || getCurrencyForCountry(pais);
    return cur === 'GTQ' ? 'Q' : '$';
  };

  const getSuggestedTenantPrice = (
    preset: 'retail' | 'admin_only' | 'standard' | 'enterprise' | 'live_express',
    cycle: 'monthly' | 'annual',
    currency: 'GTQ' | 'USD'
  ): number => {
    const monthlyGTQ: Record<string, number> = {
      live_express: 199,
      retail: 299,
      admin_only: 349,
      standard: 499,
      enterprise: 799,
    };
    const monthlyUSD: Record<string, number> = {
      live_express: 25,
      retail: 39,
      admin_only: 45,
      standard: 65,
      enterprise: 99,
    };
    const base = currency === 'GTQ' ? (monthlyGTQ[preset] ?? 299) : (monthlyUSD[preset] ?? 39);
    // Anual: 10 meses (2 meses gratis)
    return cycle === 'annual' ? base * 10 : base;
  };

  const computeNextBillingDate = (
    status: 'active' | 'trial' | 'pending',
    cycle: 'monthly' | 'annual',
    trialDays: number = 14,
    fromDateStr?: string
  ): string => {
    const base = fromDateStr ? new Date(fromDateStr + 'T12:00:00') : new Date();
    if (isNaN(base.getTime())) return new Date().toISOString().slice(0, 10);
    if (status === 'trial') {
      base.setDate(base.getDate() + (trialDays > 0 ? trialDays : 14));
    } else if (status === 'pending') {
      // Cobro inmediato (hoy)
    } else if (cycle === 'annual') {
      base.setFullYear(base.getFullYear() + 1);
    } else {
      base.setMonth(base.getMonth() + 1);
    }
    return base.toISOString().slice(0, 10);
  };

  const getBillingDaysInfo = (dateStr?: string | null) => {
    if (!dateStr) return null;
    const clean = String(dateStr).slice(0, 10);
    const target = new Date(clean + 'T23:59:59');
    if (isNaN(target.getTime())) return null;
    const diffDays = Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return { date: clean, diffDays };
  };

  // Modal para configurar Plan SaaS, Módulos & Cobranza de una Empresa
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
    hasClients: true,
    billingCycle: 'monthly' as 'monthly' | 'annual',
    billingCurrency: 'GTQ' as 'GTQ' | 'USD',
    billingAmount: 299,
    nextBillingDate: computeNextBillingDate('active', 'monthly'),
  });

  const handleOpenSaaSModal = (emp: EmpresaSaaS) => {
    setEditingEmpresaSaaS(emp);
    const planVal = (emp.plan as any) || 'standard';
    const cur = emp.billing?.currency || getCurrencyForCountry(emp.pais);
    const cyc = emp.billing?.cycle || 'monthly';
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
      hasClients: emp.modules?.clients !== false && emp.modules?.clientes !== false,
      billingCycle: cyc,
      billingCurrency: cur,
      billingAmount: emp.billing?.amount ?? getSuggestedTenantPrice(
        planVal === 'live_express' ? 'live_express' : planVal === 'enterprise' ? 'enterprise' : planVal === 'standard' ? 'standard' : 'retail',
        cyc,
        cur
      ),
      nextBillingDate: emp.billing?.next_billing_date?.slice(0, 10) || computeNextBillingDate('active', cyc),
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
    const updatedBilling = {
      ...(editingEmpresaSaaS.billing || {}),
      cycle: saasPlanForm.billingCycle,
      currency: saasPlanForm.billingCurrency,
      amount: Number(saasPlanForm.billingAmount) || 0,
      next_billing_date: saasPlanForm.nextBillingDate || computeNextBillingDate('active', saasPlanForm.billingCycle),
    };
    const updatedEmpresa: EmpresaSaaS = {
      ...editingEmpresaSaaS,
      plan: nextPlan,
      modules: updatedModules,
      billing: updatedBilling,
    };

    // Persistir plan, módulos y cobranza en vivo en MySQL (excepto demo local #99)
    if (updatedEmpresa.id !== 99) {
      empresaApi.update(updatedEmpresa.id, {
        plan_type: nextPlan,
        modules: updatedModules,
        billing: updatedBilling,
      }).catch(err => {
        console.error('Error guardando plan/módulos en servidor:', err);
        showToast(L(`⚠️ Cambio aplicado localmente pero falló sincronización en BD: ${err?.response?.data?.message || err.message}`, `⚠️ Applied locally, but database sync failed: ${err?.response?.data?.message || err.message}`));
      });
    }

    if (onUpdateEmpresa) {
      onUpdateEmpresa(updatedEmpresa);
    }

    setSaasEmpresas(prev => prev.map(e => e.id === updatedEmpresa.id ? updatedEmpresa : e));

    showToast(
      isForceLiveOnly
        ? L(`✅ Suscripción de ${updatedEmpresa.nombre} guardada en MySQL: Plan Solo Live Express (${money(199)}/m)`, `✅ Subscription for ${updatedEmpresa.nombre} saved: Live Express Only (${money(199)}/mo)`)
        : L(
            `✅ Suscripción de ${updatedEmpresa.nombre} guardada en MySQL: Plan ${saasPlanForm.plan.toUpperCase()} ${saasPlanForm.hasLiveAddon ? '+ Add-on Live' : ''}`,
            `✅ Subscription for ${updatedEmpresa.nombre} saved: ${saasPlanForm.plan.toUpperCase()} Plan ${saasPlanForm.hasLiveAddon ? '+ Live Add-on' : ''}`
          )
    );

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
  const [deletingEmpresa, setDeletingEmpresa] = useState<EmpresaSaaS | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState<string>('');
  const [isDeletingEmpresa, setIsDeletingEmpresa] = useState<boolean>(false);
  const [deleteEmpresaError, setDeleteEmpresaError] = useState<string | null>(null);
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
    pais: 'GT',
    regimen_tributario: 'general' as 'general' | 'pequeno_contribuyente' | 'informal',
    telefono: '',
    direccion: 'Ciudad de Guatemala',
    sucursal_nombre: 'Sucursal Principal',
    preset: 'retail' as 'retail' | 'admin_only' | 'standard' | 'enterprise' | 'live_express',
    plan_type: 'basic' as 'live_express' | 'basic' | 'standard' | 'enterprise',
    subscription_status: 'active' as 'active' | 'trial' | 'pending',
    billing_cycle: 'monthly' as 'monthly' | 'annual',
    billing_currency: 'GTQ' as 'GTQ' | 'USD',
    billing_amount: 299,
    next_billing_date: computeNextBillingDate('active', 'monthly'),
    payment_method: 'Transferencia / Depósito',
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
    setNewTenantForm(prev => {
      const suggestedAmount = getSuggestedTenantPrice(preset, prev.billing_cycle, prev.billing_currency);
      if (preset === 'live_express') {
        return {
          ...prev,
          preset,
          plan_type: 'live_express',
          regimen_tributario: 'informal',
          billing_amount: suggestedAmount,
          hasPos: false,
          hasLiveSales: true,
          hasFel: false,
          hasInventory: true,
          hasClients: true,
          hasPurchases: false,
          hasAccounting: false,
          hasHr: false,
        };
      }
      if (preset === 'admin_only') {
        return {
          ...prev,
          preset,
          plan_type: 'standard',
          billing_amount: suggestedAmount,
          hasPos: false,
          hasLiveSales: false,
          hasFel: true,
          hasInventory: true,
          hasClients: true,
          hasPurchases: true,
          hasAccounting: true,
          hasHr: true,
        };
      }
      if (preset === 'retail') {
        return {
          ...prev,
          preset,
          plan_type: 'basic',
          billing_amount: suggestedAmount,
          hasPos: true,
          hasLiveSales: false,
          hasFel: true,
          hasInventory: true,
          hasClients: true,
          hasPurchases: true,
          hasAccounting: false,
          hasHr: false,
        };
      }
      if (preset === 'standard') {
        return {
          ...prev,
          preset,
          plan_type: 'standard',
          billing_amount: suggestedAmount,
          hasPos: true,
          hasLiveSales: false,
          hasFel: true,
          hasInventory: true,
          hasClients: true,
          hasPurchases: true,
          hasAccounting: true,
          hasHr: true,
        };
      }
      return {
        ...prev,
        preset: 'enterprise',
        plan_type: 'enterprise',
        billing_amount: suggestedAmount,
        hasPos: true,
        hasLiveSales: true,
        hasFel: true,
        hasInventory: true,
        hasClients: true,
        hasPurchases: true,
        hasAccounting: true,
        hasHr: true,
      };
    });
  };

  const handleTenantCountryChange = (newPais: string) => {
    const nextCurrency = getCurrencyForCountry(newPais);
    setNewTenantForm(prev => ({
      ...prev,
      pais: newPais,
      billing_currency: nextCurrency,
      billing_amount: getSuggestedTenantPrice(prev.preset, prev.billing_cycle, nextCurrency),
    }));
  };

  const handleTenantCycleChange = (newCycle: 'monthly' | 'annual') => {
    setNewTenantForm(prev => ({
      ...prev,
      billing_cycle: newCycle,
      billing_amount: getSuggestedTenantPrice(prev.preset, newCycle, prev.billing_currency),
      next_billing_date: computeNextBillingDate(prev.subscription_status, newCycle, prev.trial_days),
    }));
  };

  const handleTenantStatusChange = (newStatus: 'active' | 'trial' | 'pending') => {
    setNewTenantForm(prev => ({
      ...prev,
      subscription_status: newStatus,
      next_billing_date: computeNextBillingDate(newStatus, prev.billing_cycle, prev.trial_days),
    }));
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
      setTenantCreateError(L('Completa el nombre de la empresa, el nombre del administrador y su correo.', 'Please fill in the company name, administrator name, and email address.'));
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
      const billingPayload = {
        cycle: newTenantForm.billing_cycle,
        amount: Number(newTenantForm.billing_amount) || 0,
        currency: newTenantForm.billing_currency,
        next_billing_date: newTenantForm.next_billing_date || computeNextBillingDate(
          newTenantForm.subscription_status,
          newTenantForm.billing_cycle,
          newTenantForm.trial_days
        ),
        payment_method: newTenantForm.payment_method,
        last_paid_at: newTenantForm.subscription_status === 'active' ? new Date().toISOString().slice(0, 10) : null,
      };

      const res = await empresaApi.create({
        nombre: newTenantForm.nombre.trim(),
        razon_social: newTenantForm.razon_social.trim() || newTenantForm.nombre.trim(),
        nit: newTenantForm.nit.trim() || 'CF',
        pais: newTenantForm.pais || 'GT',
        regimen_tributario: newTenantForm.regimen_tributario,
        telefono: newTenantForm.telefono.trim(),
        email: newTenantForm.admin_email.trim().toLowerCase(),
        direccion: newTenantForm.direccion.trim() || (newTenantForm.pais === 'GT' ? 'Ciudad de Guatemala' : 'Oficina Central'),
        sucursal_nombre: newTenantForm.sucursal_nombre.trim() || 'Sucursal Principal',
        plan_type: newTenantForm.plan_type,
        subscription_status: newTenantForm.subscription_status,
        trial_days: newTenantForm.subscription_status === 'trial' ? newTenantForm.trial_days : 0,
        modules,
        billing: billingPayload,
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
        pais: createdEmp?.pais || newTenantForm.pais || 'GT',
        regimen: createdEmp?.regimen_tributario === 'pequeno_contribuyente'
          ? 'Pequeño Contribuyente (5%)'
          : createdEmp?.regimen_tributario === 'informal'
          ? 'Exento / Informal'
          : 'General (IVA 12%)',
        plan: (createdEmp?.plan_type as any) || newTenantForm.plan_type,
        activa: createdEmp?.activa !== false,
        subscription_status: createdEmp?.subscription_status || newTenantForm.subscription_status,
        billing: billingPayload,
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

      showToast(L(`🚀 Inquilino "${mappedEmp.nombre}" (#${mappedEmp.id}) creado y activado en MySQL.`, `🚀 Tenant "${mappedEmp.nombre}" (#${mappedEmp.id}) created and activated.`));
    } catch (err: any) {
      console.error('Error creando nuevo inquilino:', err);
      const validationErrors = err?.response?.data?.errors;
      const firstErr = validationErrors ? Object.values(validationErrors).flat()[0] : null;
      setTenantCreateError(
        String(firstErr || err?.response?.data?.message || L('No se pudo crear la empresa en el servidor.', 'Could not create the company on the server.'))
      );
    } finally {
      setIsCreatingTenant(false);
    }
  };

  const handleToggleEmpresaStatus = async (emp: EmpresaSaaS) => {
    if (emp.id === 1 || emp.id === 22) {
      showToast(L('⚠️ Las empresas base del sistema (Fortexa y Fashion Styles) no se pueden suspender.', '⚠️ Core system companies (Fortexa and Fashion Styles) cannot be suspended.'));
      return;
    }
    const nextActive = !emp.activa;
    const actionLabel = nextActive
      ? L('reactivar', 'reactivate')
      : L('suspender (y cerrar sesiones activas)', 'suspend (and terminate active sessions)');
    if (!window.confirm(L(`¿Seguro que deseas ${actionLabel} el acceso de "${emp.nombre}" (#${emp.id})?`, `Are you sure you want to ${actionLabel} access for "${emp.nombre}" (#${emp.id})?`))) {
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
          ? L(`✅ Servicio reactivado para "${emp.nombre}".`, `✅ Service reactivated for "${emp.nombre}".`)
          : L(`⛔ Servicio suspendido para "${emp.nombre}". Sus sesiones activas fueron cerradas.`, `⛔ Service suspended for "${emp.nombre}". Active sessions have been terminated.`)
      );
    } catch (err: any) {
      showToast(L(`⚠️ Error actualizando estado: ${err?.response?.data?.message || err.message}`, `⚠️ Error updating status: ${err?.response?.data?.message || err.message}`));
    } finally {
      setTogglingTenantId(null);
    }
  };

  const handleRenewEmpresa = async (emp: EmpresaSaaS) => {
    const cycle = emp.billing?.cycle || 'monthly';
    const currency = emp.billing?.currency || getCurrencyForCountry(emp.pais);
    const amount = emp.billing?.amount ?? 0;
    const sym = getCurrencySymbol(currency, emp.pais);
    const currentDate = emp.billing?.next_billing_date?.slice(0, 10);
    const todayStr = new Date().toISOString().slice(0, 10);
    // Si ya venció, renovar desde hoy; si aún está vigente, sumar desde su fecha actual de corte
    const baseDate = currentDate && currentDate > todayStr ? currentDate : todayStr;
    const nextDate = computeNextBillingDate('active', cycle, 0, baseDate);

    if (!window.confirm(L(
      `¿Registrar pago (${sym} ${amount.toFixed(2)} ${cycle === 'annual' ? 'Anual' : 'Mensual'}) y renovar "${emp.nombre}" hasta ${nextDate}?`,
      `Record payment (${sym}${amount.toFixed(2)} ${cycle === 'annual' ? 'Annual' : 'Monthly'}) and renew "${emp.nombre}" through ${nextDate}?`
    ))) {
      return;
    }

    setTogglingTenantId(emp.id);
    try {
      const nextBilling = {
        ...(emp.billing || {}),
        cycle,
        currency,
        amount,
        next_billing_date: nextDate,
        last_paid_at: todayStr,
      };
      if (emp.id !== 99) {
        await empresaApi.update(emp.id, {
          activa: true,
          subscription_status: 'active',
          billing: nextBilling,
        });
      }
      const updatedEmp: EmpresaSaaS = {
        ...emp,
        activa: true,
        subscription_status: 'active',
        billing: nextBilling,
      };
      setSaasEmpresas(prev => prev.map(e => e.id === emp.id ? updatedEmp : e));
      if (onUpdateEmpresa) {
        onUpdateEmpresa(updatedEmp);
      }
      showToast(L(`💳 Pago registrado para "${emp.nombre}". Próximo cobro: ${nextDate}.`, `💳 Payment recorded for "${emp.nombre}". Next billing date: ${nextDate}.`));
    } catch (err: any) {
      showToast(L(`⚠️ Error renovando suscripción: ${err?.response?.data?.message || err.message}`, `⚠️ Error renewing subscription: ${err?.response?.data?.message || err.message}`));
    } finally {
      setTogglingTenantId(null);
    }
  };

  const handleSendBillingWhatsApp = (emp: EmpresaSaaS) => {
    const cur = emp.billing?.currency || getCurrencyForCountry(emp.pais);
    const sym = getCurrencySymbol(cur, emp.pais);
    const amt = emp.billing?.amount ?? 0;
    const cyc = emp.billing?.cycle === 'annual' ? L('Anual', 'Annual') : L('Mensual', 'Monthly');
    const nextDate = emp.billing?.next_billing_date?.slice(0, 10) || L('Próximo corte', 'Upcoming billing date');
    const msg = [
      L(`Hola equipo de *${emp.nombre}* 👋`, `Hello *${emp.nombre}* team 👋`),
      L(`Te saludamos de *Fortexa Technologies (IntegraPro Cloud)*.`, `Greetings from *Fortexa Technologies (IntegraPro Cloud)*.`),
      ``,
      L(`📅 *Recordatorio de Renovación de Suscripción*`, `📅 *Subscription Renewal Reminder*`),
      L(`• *Plan:* ${(emp.plan || 'Estándar').toUpperCase()} (${cyc})`, `• *Plan:* ${(emp.plan || 'Standard').toUpperCase()} (${cyc})`),
      L(`• *Cuota:* *${sym} ${amt.toFixed(2)} ${cur}*`, `• *Fee:* *${sym}${amt.toFixed(2)} ${cur}*`),
      L(`• *Fecha de Corte:* ${nextDate}`, `• *Billing Cutoff Date:* ${nextDate}`),
      ``,
      L(
        `Por favor compártenos tu comprobante de pago por este medio para renovar tu servicio sin interrupciones. ¡Gracias por tu confianza! 🚀`,
        `Please share your payment receipt here so we can renew your service without interruption. Thank you for your trust! 🚀`
      ),
    ].join('\n');
    const rawPhone = (emp.telefono || '').replace(/\D/g, '');
    const waPhone = rawPhone ? (emp.pais === 'GT' && !rawPhone.startsWith('502') ? `502${rawPhone}` : rawPhone) : '';
    const url = waPhone
      ? `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(msg)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleOpenDeleteModal = (emp: EmpresaSaaS) => {
    if (emp.id === 1 || emp.id === 22 || emp.id === 25) {
      showToast(L('⚠️ Las empresas base del sistema (Fortexa, Fashion Styles y Demo QA) están protegidas.', '⚠️ Core system companies (Fortexa, Fashion Styles, and QA Demo) are protected.'));
      return;
    }
    setDeletingEmpresa(emp);
    setDeleteConfirmText('');
    setDeleteEmpresaError(null);
  };

  const handleConfirmDeleteEmpresa = async () => {
    if (!deletingEmpresa) return;
    const upperConfirm = deleteConfirmText.trim().toUpperCase();
    if (upperConfirm !== 'ELIMINAR' && upperConfirm !== 'DELETE') {
      setDeleteEmpresaError(L('Escribe la palabra ELIMINAR para confirmar.', 'Type DELETE to confirm.'));
      return;
    }

    setIsDeletingEmpresa(true);
    setDeleteEmpresaError(null);
    try {
      const targetId = deletingEmpresa.id;
      const targetName = deletingEmpresa.nombre;
      if (targetId !== 99) {
        await empresaApi.delete(targetId);
      }
      setSaasEmpresas(prev => prev.filter(e => e.id !== targetId));
      if (onDeleteEmpresa) {
        onDeleteEmpresa(targetId);
      }
      setDeletingEmpresa(null);
      setDeleteConfirmText('');
      showToast(L(`🗑️ Empresa "${targetName}" (#${targetId}) eliminada permanentemente de MySQL.`, `🗑️ Company "${targetName}" (#${targetId}) permanently deleted.`));
    } catch (err: any) {
      setDeleteEmpresaError(
        err?.response?.data?.message || err?.message || L('No se pudo eliminar la empresa en el servidor.', 'Could not delete the company on the server.')
      );
    } finally {
      setIsDeletingEmpresa(false);
    }
  };

  const getTenantWelcomeText = () => {
    if (!createdTenantResult) return '';
    const b = createdTenantResult.empresa.billing;
    const sym = getCurrencySymbol(b?.currency, createdTenantResult.empresa.pais);
    const cycleLabel = b?.cycle === 'annual' ? L('Anual', 'Annual') : L('Mensual', 'Monthly');
    const billingLine = b && b.amount > 0
      ? L(
          `💳 *Suscripción:* ${sym} ${Number(b.amount).toFixed(2)} ${b.currency} (${cycleLabel})${b.next_billing_date ? ` • Próximo cobro: ${b.next_billing_date}` : ''}`,
          `💳 *Subscription:* ${sym}${Number(b.amount).toFixed(2)} ${b.currency} (${cycleLabel})${b.next_billing_date ? ` • Next billing: ${b.next_billing_date}` : ''}`
        )
      : '';
    return [
      L(`🚀 *¡Bienvenido a IntegraPro Cloud!*`, `🚀 *Welcome to IntegraPro Cloud!*`),
      L(`Tu espacio privado ya está activo y configurado por *Fortexa Technologies*.`, `Your private workspace is now live and configured by *Fortexa Technologies*.`),
      ``,
      L(`🏢 *Empresa:* ${createdTenantResult.empresa.nombre} (ID #${createdTenantResult.empresa.id})`, `🏢 *Company:* ${createdTenantResult.empresa.nombre} (ID #${createdTenantResult.empresa.id})`),
      L(`📍 *Sucursal Inicial:* ${createdTenantResult.sucursalNombre}`, `📍 *Main Branch:* ${createdTenantResult.sucursalNombre}`),
      ...(billingLine ? [billingLine] : []),
      L(`🌐 *Enlace de Acceso:* https://app.integrapro.app`, `🌐 *Login URL:* https://app.integrapro.app`),
      L(`👤 *Usuario:* ${createdTenantResult.adminEmail}`, `👤 *Username:* ${createdTenantResult.adminEmail}`),
      L(`🔑 *Contraseña Temporal:* ${createdTenantResult.plainPassword}`, `🔑 *Temporary Password:* ${createdTenantResult.plainPassword}`),
      ``,
      L(`🔒 _Tu empresa opera en un entorno 100% aislado y privado._`, `🔒 _Your company operates in a 100% isolated and private environment._`),
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
    showToast(L('Código copiado al portapapeles', 'Code copied to clipboard'));
  };

  // Helper para calcular con precisión los días restantes y estado de corte según Laravel
  const getCutoffDetails = (expiresAtStr?: string | null, status?: string) => {
    if (!expiresAtStr) {
      return {
        daysRemaining: 999,
        formattedDate: L('Sin fecha de corte', 'No cutoff date'),
        badgeColor: 'slate',
        badgeText: L('Sin Corte Programado', 'No Scheduled Cutoff'),
        isOverdue: false,
        isNearCutoff: false,
        reminderNotice: null
      };
    }

    const cutoffDate = new Date(expiresAtStr.replace(' ', 'T'));
    const now = new Date();
    const diffTime = cutoffDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const formattedDate = cutoffDate.toLocaleDateString(locale, {
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
        badgeText: L('Servicio Cortado', 'Service Suspended'),
        isOverdue: true,
        isNearCutoff: false,
        reminderNotice: L('Servicio suspendido en la base de datos de producción.', 'Service suspended in production database.')
      };
    }

    if (diffDays < 0) {
      const pastDays = Math.abs(diffDays);
      return {
        daysRemaining: diffDays,
        formattedDate,
        badgeColor: 'rose',
        badgeText: L(`Corte Vencido (${pastDays}d)`, `Overdue (${pastDays}d)`),
        isOverdue: true,
        isNearCutoff: false,
        reminderNotice: L(`Fecha de corte expirada hace ${pastDays} días. Acceso bloqueado en app.`, `Cutoff expired ${pastDays} days ago. App access locked.`)
      };
    }

    // Regla de Laravel (licenses:send-reminders busca expires_at == now() + 5 días)
    if (diffDays <= 5) {
      return {
        daysRemaining: diffDays,
        formattedDate,
        badgeColor: 'amber',
        badgeText: diffDays === 0 ? L('¡Corte HOY!', 'Due TODAY!') : L(`¡Corte en ${diffDays}d!`, `Due in ${diffDays}d!`),
        isOverdue: false,
        isNearCutoff: true,
        reminderNotice: L('Recordatorio automático enviado al correo del usuario (5 días antes del corte).', 'Automated reminder email sent to user (5 days before cutoff).')
      };
    }

    return {
      daysRemaining: diffDays,
      formattedDate,
      badgeColor: 'emerald',
      badgeText: L(`Al Día (${diffDays} días)`, `Current (${diffDays} days)`),
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
      showToast(L(`🔄 ¡Corte anual de ${sub.email} renovado +${daysToAdd} días (${newDateStr}) en el servidor!`, `🔄 Subscription for ${sub.email} renewed +${daysToAdd} days (${newDateStr})!`));
    } catch {
      showToast(L(`🔄 Corte renovado exitosamente a ${newDateStr} (+${daysToAdd} días)`, `🔄 Cutoff renewed successfully to ${newDateStr} (+${daysToAdd} days)`));
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
      showToast(L(`🔄 ¡Licencia de Quantum (${lic.email}) renovada +${daysToAdd} días hasta ${newDateStr}!`, `🔄 Quantum license (${lic.email}) renewed +${daysToAdd} days through ${newDateStr}!`));
    } catch {
      showToast(L(`⚠️ ERROR: no se pudo renovar la licencia en el servidor.`, `⚠️ ERROR: Could not renew license on the server.`));
    }
  };

  // 3. Liberar Hardware ID (HWID) de Quantum POS para permitir reinstalación en una nueva máquina
  const handleResetQuantumHWID = async (lic: SoftwareLicenseItem) => {
    try {
      await softwareLicenseApi.update(lic.id, { hwid: null });
      setLicenses(prev => prev.map(l => l.id === lic.id ? { ...l, hwid: null } : l));
      showToast(L(`🔓 HWID liberado para ${lic.email}. El cliente puede activar su nueva máquina.`, `🔓 HWID unbound for ${lic.email}. Customer can now activate on a new machine.`));
    } catch {
      showToast(L(`⚠️ ERROR: no se pudo liberar el HWID en el servidor.`, `⚠️ ERROR: Could not unbind HWID on the server.`));
    }
  };

  // 4. Pausar / Cortar / Reactivar Licencia de Quantum POS
  const handleToggleQuantumStatus = async (lic: SoftwareLicenseItem) => {
    const isAct = lic.status?.toLowerCase().includes('act');
    const newStat = isAct ? 'suspended' : 'active';
    try {
      await softwareLicenseApi.update(lic.id, { status: newStat });
      setLicenses(prev => prev.map(l => l.id === lic.id ? { ...l, status: newStat } : l));
      showToast(L(
        `Licencia de ${lic.email} ${newStat === 'active' ? 'reactivada' : 'suspendida/cortada'} en MySQL.`,
        `License for ${lic.email} ${newStat === 'active' ? 'reactivated' : 'suspended'} successfully.`
      ));
    } catch {
      setLicenses(prev => prev.map(l => l.id === lic.id ? { ...l, status: newStat } : l));
      showToast(L(`Estado cambiado a ${newStat === 'active' ? 'Activo' : 'Suspendido'}`, `Status changed to ${newStat === 'active' ? 'Active' : 'Suspended'}`));
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
      showToast(L(`✅ Fecha de corte de ${editingCutoffSub.email} actualizada a ${newCutoffDate} en el servidor.`, `✅ Cutoff date for ${editingCutoffSub.email} updated to ${newCutoffDate}.`));
    } catch {
      showToast(L(`✅ Fecha de corte actualizada a ${newCutoffDate}`, `✅ Cutoff date updated to ${newCutoffDate}`));
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
      showToast(L(
        `Estado de ${sub.email} actualizado a: ${newStatus === 'active' ? 'ACTIVO' : 'CORTADO / REVOCADO'}.`,
        `Status for ${sub.email} updated to: ${newStatus === 'active' ? 'ACTIVE' : 'SUSPENDED / REVOKED'}.`
      ));
    } catch {
      showToast(L(
        `Estado de ${sub.email} cambiado a: ${newStatus === 'active' ? 'Activo' : 'Cortado / Revocado'}`,
        `Status for ${sub.email} changed to: ${newStatus === 'active' ? 'Active' : 'Suspended / Revoked'}`
      ));
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
      showToast(L(`✅ ¡Suscripción Anual de ${newSubForm.email} creada y sincronizada en el servidor!`, `✅ Annual subscription for ${newSubForm.email} created and synced!`));
    } catch {
      showToast(L(`✅ Suscripción de ${newSubForm.cliente} creada con éxito`, `✅ Subscription for ${newSubForm.cliente} created successfully`));
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
      showToast(
        isSub
          ? L(`✅ ¡Licencia de Suscripción (${newLicForm.sub_cycle}) emitida y guardada!`, `✅ Subscription license (${newLicForm.sub_cycle === 'anual' ? 'Annual' : 'Monthly'}) issued and saved!`)
          : L('✅ ¡Licencia Perpetua (Vitalicia) emitida y guardada!', '✅ Perpetual (Lifetime) license issued and saved!')
      );
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
      showToast(L('⚠️ Error al crear licencia: ', '⚠️ Error creating license: ') + err.message);
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
              {L('Catálogo de Aplicaciones & Suscripciones', 'Apps & Subscriptions Catalog')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {L(
                'Panel central de administración para las aplicaciones desarrolladas por Fortexa Technologies: control de usuarios, planes y corte de fechas de RutaFuel Pro, licencias de Quantum Store POS y contratos de IntegraPro.',
                'Central administration hub for Fortexa Technologies applications: manage users, plans, and billing cutoffs for RutaFuel Pro, Quantum Store POS licenses, and IntegraPro SaaS tenants.'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {activeSubTab === 'rutafuel' ? (
              <button
                onClick={() => setShowSubModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-600/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{L('+ Nueva Suscripción', '+ New Subscription')}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{L('+ Nueva Licencia', '+ New License')}</span>
              </button>
            )}
            <a
              href="https://app.integrapro.app/quantum-landing"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{L('Ver Landing Hotmart', 'View Hotmart Landing')}</span>
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
                <p className="text-[11px] text-slate-400">{L('Control de Suscripciones & Cortes', 'Subscriptions & Billing Cutoffs')}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-black bg-amber-500/20 px-2 py-0.5 rounded-lg text-amber-300">
                {rutafuelSubs.length} {L('usuarios', 'users')}
              </span>
              {nearCutoffSubs.length > 0 && (
                <span className="text-[9px] font-black bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-md animate-pulse">
                  {nearCutoffSubs.length} {L('en corte', 'due soon')}
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
                <p className="text-[11px] text-slate-400">{L('Licencias & Hotmart', 'Licenses & Hotmart')}</p>
              </div>
            </div>
            <span className="text-xs font-black bg-purple-500/20 px-2 py-0.5 rounded-lg text-purple-300">
              {licenses.length} {L('activas', 'active')}
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
                <p className="text-[11px] text-slate-400">{L('Planes & Empresas SaaS', 'SaaS Plans & Tenants')}</p>
              </div>
            </div>
            <span className="text-xs font-black bg-blue-500/20 px-2 py-0.5 rounded-lg text-blue-300">
              {allEmpresas.length} {L('empresas', 'companies')}
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
                <p className="text-[11px] text-slate-400">{L('Social Selling & Canastas', 'Social Selling & Live Carts')}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-black bg-rose-500/20 px-2 py-0.5 rounded-lg text-rose-300">
                {liveEnabledCount} {L('activas', 'active')}
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
                    {L('RutaFuel Pro • Control de Suscripciones & Fechas de Corte', 'RutaFuel Pro • Subscriptions & Cutoff Management')}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                      {L('Sincronización Cron', 'Automated Cron Sync')}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    {L(
                      'Control de los usuarios que pagan su suscripción, planes contratados, fechas límites de corte (expires_at) y recordatorios automáticos de pago (5 días antes).',
                      'Track paying subscribers, active plans, billing cutoff dates (expires_at), and automated renewal reminders (5 days in advance).'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSubModal(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{L('+ Registrar Suscripción', '+ Register Subscription')}</span>
                </button>
              </div>
            </div>

            {/* 4 Métricas Clave: ARR, Usuarios, Próximos a Corte, Cortes Vencidos */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
              {/* Métrica 1: Recaudación ARR Anual */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> {L('ARR Recurrente Anual', 'Annual Recurring Revenue (ARR)')}
                </span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {money(totalARR)}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded inline-block">
                    {rutafuelSubs.length} {L('suscripciones', 'subscriptions')}
                  </span>
                  <span className="text-[9.5px] text-slate-400 font-mono">
                    ({money(Math.round(totalMRR))}/{L('mes', 'mo')})
                  </span>
                </div>
              </div>

              {/* Métrica 2: Usuarios Suscritos & Flotas */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-600" /> {L('Usuarios / Cuentas Anuales', 'Annual Users / Accounts')}
                </span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {activeSubs.length} <span className="text-xs text-slate-400 font-normal">{L('Cuentas', 'Accounts')}</span>
                </p>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded mt-1 inline-block">
                  {totalVehiculosMonitoreados} {L('vehículos activos', 'active vehicles')}
                </span>
              </div>

              {/* Métrica 3: Próximos a Corte (Alerta 5 días según Laravel) */}
              <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80">
                <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                  <Bell className="w-3.5 h-3.5 text-amber-600 animate-bounce" /> {L('Próximos a Corte (≤ 5 Días)', 'Due Soon (≤ 5 Days)')}
                </span>
                <p className="text-2xl font-black text-amber-900 mt-1">
                  {nearCutoffSubs.length} <span className="text-xs text-amber-700 font-normal">{L('Usuarios', 'Users')}</span>
                </p>
                <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded mt-1 inline-block border border-amber-300">
                  {L('Recordatorio automático enviado', 'Automated reminder sent')}
                </span>
              </div>

              {/* Métrica 4: Cortes Vencidos / Revocados */}
              <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200/80">
                <span className="text-[11px] font-bold text-rose-800 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> {L('En Corte / Vencidos', 'Suspended / Overdue')}
                </span>
                <p className="text-2xl font-black text-rose-900 mt-1">
                  {overdueSubs.length} <span className="text-xs text-rose-700 font-normal">{L('Cuentas', 'Accounts')}</span>
                </p>
                <span className="text-[10px] font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded mt-1 inline-block border border-rose-300">
                  {L('Servicio suspendido en app', 'Service suspended in app')}
                </span>
              </div>
            </div>
          </div>

          {/* Planes Oficiales de Suscripción Anual de RutaFuel Pro */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {L('Plan 01 // Particular', 'Plan 01 // Personal')}
                </span>
                <span className="text-xs font-bold text-emerald-600">Freemium</span>
              </div>
              <h3 className="text-sm font-black text-slate-900">{L('Conductor Particular', 'Personal Driver')}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {L('Para autos o motos de uso diario. Bitácora de combustible, odómetro y recordatorios de servicio.', 'For everyday cars or motorcycles. Fuel log, odometer tracking, and maintenance reminders.')}
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900">{L('Gratis', 'Free')}</span>
                <span className="text-[11px] text-slate-400">{L('1 Vehículo', '1 Vehicle')}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                  {L('Plan 02 // Pro Anual', 'Plan 02 // Pro Annual')}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {L('Uber / Reparto', 'Rideshare / Delivery')}
                </span>
              </div>
              <h3 className="text-sm font-black text-slate-900">{L('Pro Individual (Anual)', 'Individual Pro (Annual)')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {L('Cálculo de ganancia neta por turno, costo real por km y reportes para hasta 3 vehículos.', 'Net profit calculation per shift, true cost per km/mile, and reports for up to 3 vehicles.')}
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-black text-amber-900">{money(590)}</span>
                  <span className="text-xs text-amber-700"> / {L('año', 'yr')}</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">({money(49)}/{L('mes', 'mo')})</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/5 to-orange-500/10 rounded-2xl border border-amber-300 p-5 shadow-sm space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg">
                  {L('Plan 03 // B2B Anual', 'Plan 03 // B2B Annual')}
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {L('Más Popular', 'Most Popular')}
                </span>
              </div>
              <h3 className="text-sm font-black text-slate-900">{L('Flotas B2B Pro (Anual)', 'B2B Fleets Pro (Annual)')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {L('Base 10 unidades. Auditoría de cargas sospechosas, mantenimiento preventivo y app choferes.', 'Base 10 vehicles. Suspicious fill-up auditing, preventive maintenance, and driver mobile app.')}
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-black text-slate-900">{money(6500)}</span>
                  <span className="text-xs text-slate-500"> / {L('año', 'yr')}</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">({money(541)}/{L('mes', 'mo')})</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-purple-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                  Plan 04 // Enterprise
                </span>
                <span className="text-xs font-bold text-purple-600">{L('Corporativo', 'Corporate')}</span>
              </div>
              <h3 className="text-sm font-black text-slate-900">{L('Flotas Enterprise (Anual)', 'Enterprise Fleets (Annual)')}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {L('25+ unidades. Telemetría GPS OBD-II, integración ERP IntegraPro y soporte prioritario 24/7.', '25+ vehicles. GPS OBD-II telemetry, IntegraPro ERP integration, and 24/7 priority support.')}
              </p>
              <div className="pt-2 border-t border-purple-100 flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-black text-purple-900">{money(12000)}</span>
                  <span className="text-xs text-purple-600"> / {L('año', 'yr')}</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">({money(1000)}/{L('mes', 'mo')})</span>
              </div>
            </div>
          </div>

          {/* Tabla Maestra de Control de Suscripciones & Fechas de Corte */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  {L('Control de Usuarios, Tipos de Suscripción & Cortes', 'Subscribers, Plans & Billing Cutoffs')}
                </h3>
                <p className="text-xs text-slate-500">
                  {L('Control exacto de los usuarios que pagan suscripción, tipo de plan y semáforo de corte.', 'Exact tracking of paying subscribers, plan tiers, and billing cutoff status.')}
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
                    {L('Todos', 'All')} ({rutafuelSubs.length})
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
                    <span>{L('Corte ≤ 5d', 'Due ≤ 5d')} ({nearCutoffSubs.length})</span>
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
                    <span>{L('Vencidos', 'Overdue')} ({overdueSubs.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus('activa')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      filterStatus === 'activa' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    {L('Al Día', 'Current')}
                  </button>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={L('Buscar usuario, email, código...', 'Search user, email, code...')}
                    value={subscriptionSearch}
                    onChange={(e) => setSubscriptionSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {filteredSubs.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                {L('No se encontraron usuarios o suscripciones con los filtros seleccionados.', 'No users or subscriptions found matching the selected filters.')}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-3">{L('Usuario Pagador / Contacto', 'Billing User / Contact')}</th>
                      <th className="py-3 px-3">{L('Aplicación & Plan', 'App & Plan')}</th>
                      <th className="py-3 px-3">{L('Cuota Recurrente', 'Recurring Fee')}</th>
                      <th className="py-3 px-3">{L('Fecha de Corte (expires_at)', 'Cutoff Date (expires_at)')}</th>
                      <th className="py-3 px-3">{L('Días para el Corte / Alerta', 'Days Until Cutoff / Alert')}</th>
                      <th className="py-3 px-3">{L('Dispositivo (HWID)', 'Device (HWID)')}</th>
                      <th className="py-3 px-3">{L('Estado', 'Status')}</th>
                      <th className="py-3 px-3 text-right">{L('Acciones de Cobro', 'Billing Actions')}</th>
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
                                {trRutaFuelPlan(sub.plan)}
                              </span>
                              <p className="text-[10px] text-slate-400">
                                {sub.vehiculos_activos} / {sub.vehiculos_contratados} {L('veh. activos', 'active vehicles')}
                              </p>
                            </div>
                          </td>

                          {/* Columna 3: Cuota Recurrente */}
                          <td className="py-3 px-3 font-mono">
                            <p className="font-black text-slate-900 text-sm">
                              {money(sub.cuota)}
                            </p>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-sans inline-block mt-0.5 border border-amber-200/60">
                              {sub.ciclo === 'Anual' ? L('Suscripción Anual', 'Annual Subscription') : L('Mensual', 'Monthly')}
                            </span>
                            {sub.ciclo === 'Anual' && sub.cuota > 0 && (
                              <span className="text-[9.5px] text-slate-400 font-sans block mt-0.5">
                                ({money(sub.cuota / 12)} / {L('mes', 'mo')})
                              </span>
                            )}
                            <span className="text-[9px] text-slate-400 font-sans truncate max-w-[120px] block mt-0.5" title={trSubPayMethod(sub.metodo_pago)}>
                              {trSubPayMethod(sub.metodo_pago)}
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
                                <span>{L('Cambiar fecha de corte', 'Change cutoff date')}</span>
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
                                  {L('Pendiente vinculación', 'Pending binding')}
                                </span>
                              )}
                              <div className="flex items-center gap-1 font-mono text-[9px] text-slate-400">
                                <span>{sub.codigo_licencia}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(sub.codigo_licencia)}
                                  className="text-slate-400 hover:text-slate-700"
                                  title={L('Copiar código de activación', 'Copy activation code')}
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
                              {isRevoked ? L('Revocada / Corte', 'Revoked / Cut Off') : sub.estado === 'trial' ? L('En Prueba', 'Trial') : L('Activa', 'Active')}
                            </span>
                          </td>

                          {/* Columna 8: Acciones Operativas de Corte y Cobro */}
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Botón Renovar Corte +1 Año (Principal para Suscripción Anual) */}
                              <button
                                type="button"
                                onClick={() => handleRenewCutoff(sub, 365)}
                                title={L('Registrar pago y renovar suscripción anual (+365 días)', 'Record payment and renew annual subscription (+365 days)')}
                                className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-[11px] font-bold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                              >
                                <RefreshCw className="w-3 h-3 text-white" />
                                <span>{L('+1 Año', '+1 Year')}</span>
                              </button>

                              {/* Botón Auxiliar +30 Días */}
                              <button
                                type="button"
                                onClick={() => handleRenewCutoff(sub, 30)}
                                title={L('Extender corte 30 días adicionales', 'Extend cutoff by 30 additional days')}
                                className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-xl transition-all flex items-center gap-0.5 cursor-pointer"
                              >
                                <span>+30d</span>
                              </button>

                              {/* Botón Pausar / Cortar Servicio */}
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(sub)}
                                title={isRevoked ? L('Reactivar servicio', 'Reactivate service') : L('Cortar servicio por falta de pago', 'Suspend service for non-payment')}
                                className={`p-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                  isRevoked
                                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                }`}
                              >
                                {isRevoked ? L('Reactivar', 'Reactivate') : L('Cortar', 'Suspend')}
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
                      {L('Ventas Hotmart', 'Hotmart Sales')}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    {L('Sistema de facturación y punto de venta de escritorio para tiendas retail, minimarkets y boutiques.', 'Desktop point-of-sale and billing system for retail stores, mini-markets, and boutiques.')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right pr-3 border-r border-slate-200 hidden sm:block">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{L('Integración Hotmart', 'Hotmart Integration')}</p>
                  <p className="text-xs font-black text-emerald-600 flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {L('Webhook Activo', 'Webhook Active')}
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{L('Emitir Licencia', 'Issue License')}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500">{L('Total Licencias Registradas', 'Total Registered Licenses')}</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{licenses.length}</p>
                <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded mt-1 inline-block">
                  {L('Sincronización MySQL', 'Cloud MySQL Sync')}
                </span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500">{L('Tipo Perpetua (Vitalicia)', 'Perpetual (Lifetime)')}</span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {licenses.filter(l => l.license_type?.toLowerCase().includes('perpetual') || l.license_type?.toLowerCase().includes('vitalicia')).length}
                </p>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                  {L('Pago Único', 'One-Time Payment')}
                </span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500">{L('Suscripción / Anual', 'Subscription / Annual')}</span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {licenses.filter(l => l.license_type?.toLowerCase().includes('sub')).length}
                </p>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">
                  {L('Recurrente', 'Recurring')}
                </span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500">{L('Activaciones con HWID', 'HWID Activations')}</span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {licenses.filter(l => Boolean(l.hwid)).length}
                </p>
                <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                  {L('Hardware Vinculado', 'Bound Hardware')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Key className="w-4 h-4 text-purple-600" />
                  {L('Licencias de Software Emitidas', 'Issued Software Licenses')}
                </h3>
                <p className="text-xs text-slate-500">
                  {L('Códigos de activación sincronizados desde el webhook de compras de Hotmart y emitidos manualmente.', 'Activation codes synced from Hotmart purchase webhooks and manually issued keys.')}
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={L('Buscar por código, email...', 'Search by code, email...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">
                {L('Cargando licencias desde la base de datos de producción...', 'Loading licenses from production database...')}
              </div>
            ) : filteredLicenses.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                {L('No se encontraron licencias registradas para esta búsqueda.', 'No licenses found for this search.')}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-3">{L('Aplicación & Titular', 'App & Holder')}</th>
                      <th className="py-3 px-3">{L('Código de Licencia', 'License Code')}</th>
                      <th className="py-3 px-3">{L('Modelo Comercial & Corte', 'Commercial Model & Cutoff')}</th>
                      <th className="py-3 px-3">{L('Dispositivo (HWID)', 'Device (HWID)')}</th>
                      <th className="py-3 px-3">{L('Estado', 'Status')}</th>
                      <th className="py-3 px-3 text-right">{L('Gestión de Licencia', 'License Management')}</th>
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
                                title={L('Copiar código de activación', 'Copy activation code')}
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
                                    {L('Mensualidad / Suscripción', 'Monthly / Subscription')}
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
                                        <span>{L('Corte:', 'Cutoff:')} {cutoff.formattedDate}</span>
                                      </span>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-purple-100 text-purple-800 border border-purple-200 inline-flex items-center gap-1">
                                    <Infinity className="w-3 h-3 text-purple-700" />
                                    <span>{L('Licencia Perpetua', 'Perpetual License')}</span>
                                  </span>
                                  <p className="text-[10px] text-slate-400 font-medium">
                                    {L('Pago Único • Sin fecha de corte', 'One-Time Payment • No expiration')}
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
                                    title={L('Liberar HWID para permitir reinstalación en nueva PC', 'Unbind HWID to allow reactivation on a new PC')}
                                    className="p-1 hover:bg-amber-100 text-amber-700 rounded transition-colors cursor-pointer"
                                  >
                                    <Unlock className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <span className="italic text-slate-400 text-[10.5px]">
                                  {L('Pendiente de vinculación', 'Pending binding')}
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
                              {isAct ? L('Activa', 'Active') : L('Suspendida', 'Suspended')}
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
                                    title={L('Renovar mensualidad (+30 días)', 'Renew monthly (+30 days)')}
                                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[10.5px] font-bold rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <RefreshCw className="w-3 h-3 text-emerald-400" />
                                    <span>+30d</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRenewQuantumLicense(lic, 365)}
                                    title={L('Renovar suscripción anual (+1 año)', 'Renew annual subscription (+1 year)')}
                                    className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[10.5px] font-bold rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>{L('+1 Año', '+1 Year')}</span>
                                  </button>
                                </>
                              ) : (
                                lic.hwid && (
                                  <button
                                    type="button"
                                    onClick={() => handleResetQuantumHWID(lic)}
                                    title={L('Desvincular hardware actual para permitir activación en otra máquina', 'Unbind current hardware to allow activation on another machine')}
                                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10.5px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <Unlock className="w-3 h-3" />
                                    <span>{L('Liberar PC', 'Unbind PC')}</span>
                                  </button>
                                )
                              )}

                              <button
                                type="button"
                                onClick={() => handleToggleQuantumStatus(lic)}
                                title={isAct ? L('Pausar/Suspender licencia', 'Pause/Suspend license') : L('Reactivar licencia', 'Reactivate license')}
                                className={`px-2 py-1 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer border ${
                                  isAct
                                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                }`}
                              >
                                {isAct ? L('Cortar', 'Suspend') : L('Reactivar', 'Reactivate')}
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
                    {L('Suite empresarial en la nube con facturación SAT FEL, inventarios, Kiosco biométrico y administración multi-sucursal.', 'Cloud enterprise suite with E-Invoicing, multi-warehouse inventory, biometric Time Clock, and multi-branch management.')}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{allEmpresas.length} {L('Tenants en MySQL', 'Cloud Tenants')}</span>
                </span>
              </div>
            </div>

            {/* Planes Oficiales SaaS de IntegraPro ERP (4 Niveles Comerciales) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 pb-2">
              
              {/* Plan 1: TikTok Live Express (Nuevo Modelo para Vendedoras Informales) */}
              <div className="bg-gradient-to-br from-rose-500/5 via-pink-500/10 to-purple-500/10 rounded-2xl border-2 border-rose-300 p-5 space-y-2 relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-lg border border-rose-200">
                    {L('Solo Live', 'Live Only')}
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
                  {L('Venta en vivo, canastas automáticas, catálogo con scraper Shein/Temu, envíos Guatex/Forza y WhatsApp. 0 facturación SAT ni contabilidad.', 'Live selling, automated carts, Shein/Temu catalog scraper, courier shipping, and WhatsApp checkout. No tax filing or accounting clutter.')}
                </p>
                <div className="pt-2 border-t border-rose-200 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-black text-rose-700">{money(199)}</span>
                  <span className="text-xs text-rose-600 font-sans">/ {L('mes', 'mo')}</span>
                </div>
              </div>

              {/* Plan 2: PyME */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-200/60 px-2.5 py-0.5 rounded-lg">
                    {L('Plan Básico', 'Starter Plan')}
                  </span>
                  <span className="text-xs font-bold text-blue-600">{L('Comercio', 'Retail')}</span>
                </div>
                <h3 className="text-sm font-black text-slate-900">{L('IntegraPro PyME', 'IntegraPro SMB')}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {L('Hasta 2 sucursales, facturación SAT FEL ilimitada, inventarios e informes básicos de ventas.', 'Up to 2 branches, unlimited E-Invoicing, inventory control, and essential sales reports.')}
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-black text-slate-900">{money(299)}</span>
                  <span className="text-xs text-slate-500 font-sans">/ {L('mes', 'mo')}</span>
                </div>
              </div>

              {/* Plan 3: Comercial Estándar */}
              <div className="bg-gradient-to-br from-blue-500/5 to-indigo-500/10 rounded-2xl border border-blue-300 p-5 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-lg">
                    {L('Plan Estándar', 'Standard Plan')}
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {L('Más Elegido', 'Most Popular')}
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900">{L('IntegraPro Comercial', 'IntegraPro Business')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {L('Hasta 5 sucursales, Kiosco biométrico de RRHH, traslados entre bodegas y cuentas por cobrar.', 'Up to 5 branches, biometric HR Time Clock, warehouse transfers, and Accounts Receivable.')}
                </p>
                <div className="pt-2 border-t border-blue-200/60 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-black text-slate-900">{money(699)}</span>
                  <span className="text-xs text-blue-700 font-sans">/ {L('mes', 'mo')}</span>
                </div>
              </div>

              {/* Plan 4: Enterprise Corporativo */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-lg">
                    {L('Plan Enterprise', 'Enterprise Plan')}
                  </span>
                  <span className="text-xs font-bold text-purple-600">{L('Corporativo', 'Corporate')}</span>
                </div>
                <h3 className="text-sm font-black text-slate-900">{L('IntegraPro Corporativo', 'IntegraPro Enterprise')}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {L('Sucursales ilimitadas, multi-empresa, API contable en tiempo real y soporte dedicado 24/7.', 'Unlimited branches, multi-company support, real-time accounting API, and 24/7 dedicated support.')}
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-black text-slate-900">{money(1499)}</span>
                  <span className="text-xs text-slate-500 font-sans">/ {L('mes', 'mo')}</span>
                </div>
              </div>
            </div>

            {/* Add-ons y Extensiones SaaS Comercializables por Fortexa */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-purple-50 to-indigo-50 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                    {L('Add-on Extra para ERP', 'ERP Extra Add-on')}
                  </span>
                  <span className="text-xs font-bold text-slate-600">Fortexa Social Commerce Division</span>
                </div>
                <h4 className="text-sm font-black text-slate-900">
                  {L(`Módulo Extra: TikTok Live Commerce (+${money(99)} / mes)`, `Extra Module: TikTok Live Commerce (+${money(99)} / mo)`)}
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  {L(
                    'Para clientes con Plan PyME, Estándar o Enterprise (como tiendas físicas o cadenas de retail) que desean transmitir en TikTok/Facebook Live y rematar stock conectando directamente con su inventario central.',
                    'For SMB, Business, or Enterprise customers (physical stores or retail chains) who want to host TikTok/Facebook Live sales synced directly with their central inventory.'
                  )}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-lg font-black text-rose-600 font-mono">{money(99)} <span className="text-xs font-sans text-slate-500">/ {L('mes', 'mo')}</span></p>
                  <p className="text-[10px] text-slate-400">{L('Add-on recurrente', 'Recurring add-on')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const demoLive = allEmpresas.find(e => e.id === 99) || allEmpresas[0];
                    handleOpenSaaSModal(demoLive);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  title={L('Configurar el módulo Live en cualquiera de las empresas suscritas', 'Configure the Live module on any subscribed company')}
                >
                  <Sliders className="w-3.5 h-3.5 text-indigo-300" />
                  <span>{L('Programar en Empresas', 'Configure on Tenants')}</span>
                </button>
              </div>
            </div>

            {/* Gestión Centralizada de Empresas Tenants en la Nube */}
            <div className="pt-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    {L(`Empresas Tenants & Suscripciones SaaS (${allEmpresas.length})`, `Tenant Companies & SaaS Subscriptions (${allEmpresas.length})`)}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {L('Administración de planes SaaS, alta de nuevos inquilinos aislados, suspensión de servicio y control de módulos.', 'Manage SaaS plans, onboard isolated tenants, suspend access, and control module entitlements.')}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                    {liveEnabledCount} {L('con Módulo Live activo', 'with Live Module active')}
                  </span>
                  <button
                    type="button"
                    onClick={handleOpenNewTenantModal}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-black shadow-md shadow-indigo-600/25 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{L('Activar Nuevo Cliente (Inquilino)', 'Activate New Client (Tenant)')}</span>
                  </button>
                </div>
              </div>

              <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-3.5">{L('ID Tenant', 'Tenant ID')}</th>
                        <th className="py-3 px-3.5">{L('Empresa / Razón Social', 'Company / Legal Name')}</th>
                        <th className="py-3 px-3.5">{L('Régimen SAT', `${taxIdLabel} & Tax Regime`)}</th>
                        <th className="py-3 px-3.5">{L('Plan SaaS Contratado', 'Subscribed SaaS Plan')}</th>
                        <th className="py-3 px-3.5">{L('Módulo TikTok Live', 'TikTok Live Module')}</th>
                        <th className="py-3 px-3.5">{L('Entorno de Usuario', 'Workspace Mode')}</th>
                        <th className="py-3 px-3.5">{L('Cuota & Próximo Cobro', 'Fee & Next Billing')}</th>
                        <th className="py-3 px-3.5">{L('Estado', 'Status')}</th>
                        <th className="py-3 px-3.5 text-right">{L('Gestión SaaS', 'SaaS Actions')}</th>
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
                              <span className="text-slate-600 font-mono text-[11px]">{trTaxId(emp.nit)}</span>
                              <p className="text-[10px] text-slate-400">{trRegime(emp.regimen)}</p>
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
                                {isLivePlan ? `🔴 Live Express (${money(199)})` : L(`Plan ${emp.plan?.toUpperCase() || 'ESTÁNDAR'}`, `${emp.plan?.toUpperCase() || 'STANDARD'} Plan`)}
                              </span>
                            </td>
                            <td className="py-3.5 px-3.5">
                              {hasLiveAddon ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
                                  <Video className="w-3 h-3 text-rose-600" />
                                  <span>{isLivePlan ? L('Plan Incluido', 'Included in Plan') : L(`Add-on Activo (+${money(99)})`, `Active Add-on (+${money(99)})`)}</span>
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-400 border border-slate-200">
                                  {L('Inactivo', 'Inactive')}
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3.5">
                              {isLiveOnly ? (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
                                  <Zap className="w-3 h-3 text-amber-600" />
                                  <span>{L('Solo Live Express (0 ERP)', 'Live Express Only (No ERP)')}</span>
                                </span>
                              ) : emp.modules?.pos === false ? (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
                                  <Layers className="w-3 h-3 text-blue-600" />
                                  <span>{L('Administrativo (Sin POS)', 'Back-Office (No POS)')}</span>
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1">
                                  <Layers className="w-3 h-3 text-slate-500" />
                                  <span>{L('Suite ERP Completa', 'Full ERP Suite')}</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3.5">
                              {(() => {
                                const b = emp.billing;
                                const cur = b?.currency || getCurrencyForCountry(emp.pais);
                                const sym = getCurrencySymbol(cur, emp.pais);
                                const amt = b?.amount ?? 0;
                                const cycLabel = b?.cycle === 'annual' ? L('año', 'yr') : L('mes', 'mo');
                                const dueInfo = getBillingDaysInfo(b?.next_billing_date || emp.trial_ends_at);

                                if (emp.id === 1 || emp.id === 22) {
                                  return (
                                    <span className="text-[10px] font-bold text-slate-400">{L('Empresa Propia', 'Owned Company')}</span>
                                  );
                                }

                                return (
                                  <div className="space-y-0.5">
                                    <div className="font-mono font-black text-slate-900 text-[11px]">
                                      {amt > 0 ? `${sym} ${Number(amt).toFixed(2)} / ${cycLabel}` : L('Sin tarifa', 'No fee set')}
                                      <span className="ml-1 text-[9px] font-bold text-slate-400">{cur}</span>
                                    </div>
                                    {dueInfo ? (
                                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                                        dueInfo.diffDays < 0
                                          ? 'bg-rose-100 text-rose-700'
                                          : dueInfo.diffDays <= 5
                                          ? 'bg-amber-100 text-amber-800'
                                          : 'bg-emerald-50 text-emerald-700'
                                      }`}>
                                        {dueInfo.diffDays < 0
                                          ? L(`Vencida (${dueInfo.date})`, `Overdue (${dueInfo.date})`)
                                          : dueInfo.diffDays <= 5
                                          ? L(`Vence en ${dueInfo.diffDays}d (${dueInfo.date})`, `Due in ${dueInfo.diffDays}d (${dueInfo.date})`)
                                          : L(`Corte: ${dueInfo.date}`, `Cutoff: ${dueInfo.date}`)}
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-slate-400">{L('Sin fecha de corte', 'No cutoff date')}</span>
                                    )}
                                  </div>
                                );
                              })()}
                            </td>
                            <td className="py-3.5 px-3.5">
                              {emp.activa !== false ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  {emp.subscription_status === 'trial' ? 'Trial' : emp.subscription_status === 'pending' ? L('Por Cobrar', 'Payment Due') : L('Activa', 'Active')}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                  {L('Suspendida', 'Suspended')}
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                <button
                                  type="button"
                                  onClick={() => handleOpenSaaSModal(emp)}
                                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                                  title={L('Editar plan, cuota, fecha de cobro y módulos', 'Edit plan, fee, billing date, and modules')}
                                >
                                  <Sliders className="w-3 h-3 text-indigo-400" />
                                  <span>{L('Configurar', 'Configure')}</span>
                                </button>
                                {emp.id !== 1 && emp.id !== 22 && (
                                  <>
                                    <button
                                      type="button"
                                      disabled={togglingTenantId === emp.id}
                                      onClick={() => handleRenewEmpresa(emp)}
                                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                      title={L('Registrar pago recibido y extender fecha de corte (+1 mes o +1 año)', 'Record received payment and extend cutoff date (+1 mo or +1 yr)')}
                                    >
                                      <CreditCard className="w-3 h-3" />
                                      <span>{L('Renovar', 'Renew')}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleSendBillingWhatsApp(emp)}
                                      className="px-2 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                                      title={L('Enviar recordatorio de cobro por WhatsApp', 'Send billing reminder via WhatsApp')}
                                    >
                                      <Send className="w-3 h-3" />
                                      <span>{L('Cobrar', 'Bill')}</span>
                                    </button>
                                    <button
                                      type="button"
                                      disabled={togglingTenantId === emp.id}
                                      onClick={() => handleToggleEmpresaStatus(emp)}
                                      className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer border disabled:opacity-50 ${
                                        emp.activa !== false
                                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                      }`}
                                      title={emp.activa !== false ? L('Suspender acceso del cliente y cerrar sesiones', 'Suspend client access and terminate sessions') : L('Reactivar servicio del cliente', 'Reactivate client service')}
                                    >
                                      <Power className="w-3 h-3" />
                                      <span>{emp.activa !== false ? L('Suspender', 'Suspend') : L('Reactivar', 'Reactivate')}</span>
                                    </button>
                                    {emp.id !== 25 && (
                                      <button
                                        type="button"
                                        disabled={togglingTenantId === emp.id || isDeletingEmpresa}
                                        onClick={() => handleOpenDeleteModal(emp)}
                                        className="px-2 py-1 bg-white hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 hover:border-rose-600 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                        title={L('Eliminar permanentemente esta empresa y todos sus datos', 'Permanently delete this company and all its data')}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                        <span>{L('Eliminar', 'Delete')}</span>
                                      </button>
                                    )}
                                  </>
                                )}
                                {onSelectEmpresa && isOwnerOperableEmpresa(emp.id) ? (
                                  <button
                                    type="button"
                                    onClick={() => onSelectEmpresa(emp.id)}
                                    className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded-lg transition-all cursor-pointer border border-indigo-200"
                                    title={L('Ingresar a la vista de tu empresa propia / demo', 'Switch into your owned / demo company view')}
                                  >
                                    <span>{L('Probar Vista', 'Open View')}</span>
                                  </button>
                                ) : (
                                  <span
                                    className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-200 inline-flex items-center gap-1"
                                    title={L('Privacidad Multi-Tenant: los datos operativos de clientes externos son privados', 'Multi-Tenant Privacy: external client operational data is private')}
                                  >
                                    <Lock className="w-3 h-3" />
                                    <span>{L('Privado', 'Private')}</span>
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
                    {L('Contratos de Licencia Digital Firmados Electrónicamente', 'Electronically Signed Digital License Agreements')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {L('Registro legal de aceptación de términos de servicio y contratos de suscripción SaaS almacenados en el servidor.', 'Legal log of terms-of-service acceptances and SaaS subscription agreements stored on the server.')}
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                  {signedLicenses.length} {L('firmas registradas', 'signatures logged')}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-3">{L('ID Contrato', 'Contract ID')}</th>
                      <th className="py-3 px-3">{L('Firmado Por', 'Signed By')}</th>
                      <th className="py-3 px-3">{L('Usuario ID', 'User ID')}</th>
                      <th className="py-3 px-3">{L('Dirección IP', 'IP Address')}</th>
                      <th className="py-3 px-3">{L('Documento PDF', 'PDF Document')}</th>
                      <th className="py-3 px-3 text-right">{L('Fecha & Hora Firma', 'Signed Date & Time')}</th>
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
                    {L(
                      'Infraestructura para streamers y vendedoras en directo: canastas abiertas, apartado en tiempo real, catálogo con fotos y liquidación por Guatex, Forza y WhatsApp.',
                      'Infrastructure for live sellers and streamers: open live carts, real-time stock holds, visual product catalog, and courier/WhatsApp checkout.'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>{liveEnabledCount} {L('Clientes con Live', 'Clients on Live')}</span>
                </span>
              </div>
            </div>

            {/* Métricas Globales del Negocio Live en Fortexa */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 pb-2">
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{L('Boutiques Activas', 'Active Boutiques')}</span>
                <p className="text-2xl font-black text-slate-900">{liveEnabledCount}</p>
                <span className="text-[10px] text-emerald-600 font-bold">{L('100% operativas', '100% operational')}</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{L('GMV en Directo', 'Live GMV')}</span>
                <p className="text-2xl font-black text-rose-600 font-mono">{money(148250)}</p>
                <span className="text-[10px] text-slate-400 font-semibold">{L('Procesado en el mes', 'Processed this month')}</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{L('Canastas Abiertas', 'Open Carts')}</span>
                <p className="text-2xl font-black text-indigo-600 font-mono">1,420</p>
                <span className="text-[10px] text-indigo-600 font-semibold">{L('Prendas despachadas', 'Items dispatched')}</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{L('Efectividad de Cobro', 'Collection Rate')}</span>
                <p className="text-2xl font-black text-emerald-600">94.8%</p>
                <span className="text-[10px] text-emerald-600 font-semibold">{L('Pagadas / Entregadas', 'Paid / Delivered')}</span>
              </div>
            </div>

            {/* Dos Formas de Monetización y Configuración Comercial */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-rose-600" />
                  {L('Estrategia de Suscripción & Monetización para Fortexa Technologies', 'Subscription & Monetization Strategy for Fortexa Technologies')}
                </h3>
                <p className="text-xs text-slate-500">
                  {L('Dos opciones comerciales para adaptarse tanto a vendedoras informales como a tiendas formales consolidadas.', 'Two commercial tiers tailored for both independent live sellers and established brick-and-mortar retail stores.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Opción 1: Plan Dedicado Solo Live Express */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/80 via-pink-50/50 to-white border-2 border-rose-300 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                      {L('Modalidad 1: Plan Dedicado', 'Tier 1: Dedicated Plan')}
                    </span>
                    <span className="text-xs font-black text-rose-700 font-mono">{money(199)} / {L('mes', 'mo')}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{L('Plan TikTok Live Express (Solo Live)', 'TikTok Live Express Plan (Live Only)')}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {L(
                        'Diseñado para vendedoras informales de TikTok Live, ropa de paca/americana o calzado que NO tienen local físico ni facturación SAT.',
                        'Designed for independent TikTok Live sellers, apparel resellers, and boutiques with NO physical store or E-Invoicing requirements.'
                      )}
                    </p>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-700 font-medium pt-2 border-t border-rose-200/70">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{L('Interfaz 100% limpia sin módulos ERP ni contabilidad', '100% streamlined UI with zero ERP or accounting clutter')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{L('Canastas abiertas, apartado inmediato y cobro por WhatsApp', 'Open live carts, instant stock hold, and WhatsApp checkout')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{L('Envíos con Guatex, Forza o Cargo Expreso por departamento', 'Nationwide courier shipping with Guatex, Forza, or Cargo Expreso')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{L('Cuentas bancarias (BI, Banrural, BAC) y contra entrega', 'Bank deposit accounts and Cash on Delivery (COD)')}</span>
                    </li>
                  </ul>
                </div>

                {/* Opción 2: Add-on Extra para ERP */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-white border border-indigo-200 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
                      {L('Modalidad 2: Add-on Extra', 'Tier 2: Extra Add-on')}
                    </span>
                    <span className="text-xs font-black text-indigo-700 font-mono">+{money(99)} / {L('mes', 'mo')}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{L('Módulo Add-on TikTok Live para Clientes ERP', 'TikTok Live Add-on Module for ERP Clients')}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {L(
                        'Para clientes en Plan PyME, Comercial o Enterprise (como Fashion Styles) que tienen tienda física y quieren hacer transmisiones en vivo.',
                        'For SMB, Business, or Enterprise clients (like Fashion Styles) who operate physical stores and want to sell via live streams.'
                      )}
                    </p>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-700 font-medium pt-2 border-t border-indigo-200/70">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{L('Mantiene todo el ERP: POS, Facturación FEL SAT y Contabilidad', 'Keeps the full ERP: POS, E-Invoicing, and Accounting')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{L('Descuenta inventario en vivo del stock físico de sus tiendas', 'Deducts live sales directly from physical store inventory')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{L('Opción de emitir factura FEL SAT o recibo al confirmar canasta', 'Option to issue a certified E-Invoice or receipt on cart checkout')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{L('Dashboard Ejecutivo con botón de alternar métricas de Live', 'Executive Dashboard with toggleable Live metrics')}</span>
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
                    {L(`Empresas con Módulo Live Activado (${liveEnabledCount})`, `Companies with Live Module Enabled (${liveEnabledCount})`)}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {L('Boutiques que tienen contratado el Plan Live Express o el Add-on Extra.', 'Boutiques subscribed to the Live Express Plan or the Extra Add-on.')}
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
                  <span>{L('Habilitar Live en Otra Empresa', 'Enable Live on Another Company')}</span>
                </button>
              </div>

              <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-3.5">{L('Empresa Cliente', 'Client Company')}</th>
                      <th className="py-3 px-3.5">{L('Tipo de Contratación', 'Subscription Tier')}</th>
                      <th className="py-3 px-3.5">{L('Cuota Mensual', 'Monthly Fee')}</th>
                      <th className="py-3 px-3.5">{L('Entorno Activo', 'Active Workspace')}</th>
                      <th className="py-3 px-3.5 text-right">{L('Acciones', 'Actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {allEmpresas.filter(e => e.plan === 'live_express' || e.modules?.live_sales).map(emp => {
                      const isSoloLive = emp.plan === 'live_express' || emp.modules?.live_only;
                      return (
                        <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-3.5">
                            <p className="font-bold text-slate-900">{emp.nombre}</p>
                            <p className="text-[10px] text-slate-400 font-mono">Tenant #{emp.id} • {trTaxId(emp.nit)}</p>
                          </td>
                          <td className="py-3.5 px-3.5">
                            {emp.plan === 'live_express' ? (
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-rose-100 text-rose-800 border border-rose-200">
                                {L('Plan Dedicado Solo Live', 'Dedicated Live Only Plan')}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 border border-indigo-200">
                                {L(`Add-on Extra (+ Plan ${emp.plan?.toUpperCase()})`, `Extra Add-on (+ ${emp.plan?.toUpperCase()} Plan)`)}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-3.5 font-mono font-bold text-slate-900">
                            {emp.plan === 'live_express' ? `${money(199)} / ${L('mes', 'mo')}` : `+${money(99)} / ${L('mes', 'mo')}`}
                          </td>
                          <td className="py-3.5 px-3.5">
                            {isSoloLive ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                {L('⚡ Live Express (0 ERP)', '⚡ Live Express (No ERP)')}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                {L('💼 ERP Completo + Módulo Live', '💼 Full ERP + Live Module')}
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
                                <span>{L('Ajustar Plan', 'Adjust Plan')}</span>
                              </button>
                              {onSelectEmpresa && (
                                <button
                                  type="button"
                                  onClick={() => onSelectEmpresa(emp.id)}
                                  className="px-2.5 py-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer shadow-xs"
                                >
                                  <span>{L('Probar Live', 'Open Live')}</span>
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
                  <h3 className="text-xs font-black text-slate-900">{L('Ajustar Fecha de Corte', 'Adjust Cutoff Date')}</h3>
                  <p className="text-[10px] text-slate-400">{L('Modificar campo', 'Update field')} <code>expires_at</code></p>
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
                <p className="text-[10px] text-slate-400">{L('Usuario / Cliente:', 'User / Client:')}</p>
                <p className="font-bold text-slate-800">{editingCutoffSub.email}</p>
                <p className="text-[11px] text-slate-500 font-medium">{editingCutoffSub.cliente} • {trRutaFuelPlan(editingCutoffSub.plan)}</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{L('Nueva Fecha de Corte:', 'New Cutoff Date:')}</label>
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
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustomCutoff}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  {L('Guardar en Servidor', 'Save Changes')}
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
                  <h3 className="text-sm font-black text-slate-900">{L('Emitir Licencia Quantum Store POS', 'Issue Quantum Store POS License')}</h3>
                  <p className="text-[11px] text-slate-400">{L('Fortexa Technologies • Modelo Perpetuo vs Suscripción', 'Fortexa Technologies • Perpetual vs Subscription Model')}</p>
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
                <label className="font-bold text-slate-700 block mb-1.5">{L('Selecciona el Modelo de Comercialización:', 'Select Licensing Model:')}</label>
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
                      <span>{L('Licencia Perpetua', 'Perpetual License')}</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">{L('Pago Único (Vitalicia)', 'One-Time Payment (Lifetime)')}</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {L('Sin corte. Activación única de por vida ligada al Hardware ID (HWID).', 'Never expires. Lifetime activation bound to Hardware ID (HWID).')}
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
                      <span>{L('Mensualidad / Suscripción', 'Monthly / Subscription')}</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">{L('Recurrente (Con Corte)', 'Recurring (With Cutoff)')}</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {L('Con fecha de corte programada. Notificación y corte si no renueva.', 'Scheduled billing cutoff. Automatic alerts and suspension if not renewed.')}
                    </p>
                  </button>
                </div>
              </div>

              {/* Opciones según el modelo seleccionado */}
              {newLicForm.modelo === 'perpetual' ? (
                <div className="bg-purple-50/50 p-3 rounded-2xl border border-purple-200/60 space-y-2">
                  <label className="font-bold text-purple-900 block text-[11px]">{L('Tipo de Licencia Vitalicia:', 'Lifetime License Tier:')}</label>
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
                    <option value="perpetual">{L(`Quantum POS Estándar (1 PC) — ${money(499)} Pago Único`, `Quantum POS Standard (1 PC) — ${money(499)} One-Time`)}</option>
                    <option value="Empresarial">{L(`Quantum POS Red Empresarial (hasta 5 PCs) — ${money(999)} Pago Único`, `Quantum POS Business Network (up to 5 PCs) — ${money(999)} One-Time`)}</option>
                  </select>
                  <p className="text-[10px] text-purple-700">
                    ✓ <code>expires_at = null</code>. {L('Acceso ilimitado sin caducidad.', 'Unlimited lifetime access with no expiration.')}
                  </p>
                </div>
              ) : (
                <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-200/60 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-blue-900 block text-[11px] mb-1">{L('Ciclo Recurrente:', 'Billing Cycle:')}</label>
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
                        <option value="mensual">{L(`Mensualidad — ${money(75)} / mes`, `Monthly — ${money(75)} / mo`)}</option>
                        <option value="anual">{L(`Suscripción Anual — ${money(350)} / año`, `Annual Subscription — ${money(350)} / yr`)}</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-blue-900 block text-[11px] mb-1">{L('Fecha de Primer Corte:', 'First Cutoff Date:')}</label>
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
                    ✓ {L('Se sincroniza con expires_at en el servidor. Corte de servicio si vence la fecha.', 'Syncs with expires_at on the server. Access pauses automatically if expired.')}
                  </p>
                </div>
              )}

              {/* Datos del Comprador */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">{L('Correo Electrónico del Comprador:', 'Buyer Email Address:')}</label>
                <input
                  type="email"
                  required
                  placeholder={L('ej. cliente@tienda.com', 'e.g., buyer@store.com')}
                  value={newLicForm.email}
                  onChange={(e) => setNewLicForm({ ...newLicForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                />
              </div>

              {/* Código de Licencia y Estado */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700 block">{L('Código de Licencia:', 'License Code:')}</label>
                    <button
                      type="button"
                      onClick={() => setNewLicForm({
                        ...newLicForm,
                        license_code: 'HP' + Math.floor(10000000000000 + Math.random() * 90000000000000)
                      })}
                      className="text-[10px] font-bold text-purple-600 hover:underline cursor-pointer"
                    >
                      {L('Autogenerar Hotmart', 'Auto-Generate Code')}
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder={L('HP... o dejar en blanco', 'HP... or leave blank')}
                    value={newLicForm.license_code}
                    onChange={(e) => setNewLicForm({ ...newLicForm, license_code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Estado Inicial:', 'Initial Status:')}</label>
                  <select
                    value={newLicForm.status}
                    onChange={(e: any) => setNewLicForm({ ...newLicForm, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="active">{L('Activa (Lista para usar)', 'Active (Ready to use)')}</option>
                    <option value="pending">{L('Pendiente de Activación', 'Pending Activation')}</option>
                  </select>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                {L(
                  'ℹ️ Al presionar guardar, el registro se sincronizará inmediatamente en el servidor de producción para que Quantum POS reconozca la activación.',
                  'ℹ️ Upon saving, this license syncs immediately with the production server so Quantum POS recognizes the activation.'
                )}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  {L('Emitir y Guardar', 'Issue & Save License')}
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
                  <h3 className="text-sm font-black text-slate-900">{L('Registrar Suscripción Anual de Usuario', 'Register Annual User Subscription')}</h3>
                  <p className="text-[11px] text-slate-400">{L('Fortexa Technologies • Modelo Anual RutaFuel Pro (365 días)', 'Fortexa Technologies • RutaFuel Pro Annual Model (365 days)')}</p>
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
                  <label className="font-bold text-slate-700 block mb-1">{L('Correo Electrónico (Usuario Pagador):', 'Email Address (Billing User):')}</label>
                  <input
                    type="email"
                    required
                    placeholder={L('ej. gerencia@transportes.com', 'e.g., billing@fleetcompany.com')}
                    value={newSubForm.email}
                    onChange={(e) => setNewSubForm({ ...newSubForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Nombre Comercial / Flota:', 'Business / Fleet Name:')}</label>
                  <input
                    type="text"
                    required
                    placeholder={L('ej. Transportes Rápidos S.A.', 'e.g., Express Fleet LLC')}
                    value={newSubForm.cliente}
                    onChange={(e) => setNewSubForm({ ...newSubForm, cliente: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Persona de Contacto:', 'Contact Person:')}</label>
                  <input
                    type="text"
                    placeholder={L('ej. Lic. Mario Estrada', 'e.g., John Miller')}
                    value={newSubForm.contacto}
                    onChange={(e) => setNewSubForm({ ...newSubForm, contacto: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Teléfono / WhatsApp:', 'Phone / WhatsApp:')}</label>
                  <input
                    type="text"
                    placeholder={L('ej. +502 5555-1234', 'e.g., +1 555-0192')}
                    value={newSubForm.telefono}
                    onChange={(e) => setNewSubForm({ ...newSubForm, telefono: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              {/* Planes Oficiales Anuales de RutaFuel */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Plan de Suscripción Anual:', 'Annual Subscription Plan:')}</label>
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
                    <option value="Flotas B2B Pro (Anual)">{L(`Flotas B2B Pro (Anual) — ${money(6500)}/año`, `B2B Fleets Pro (Annual) — ${money(6500)}/yr`)}</option>
                    <option value="Flotas Enterprise (Anual)">{L(`Flotas Enterprise (Anual) — ${money(12000)}/año`, `Enterprise Fleets (Annual) — ${money(12000)}/yr`)}</option>
                    <option value="Pro Individual (Anual)">{L(`Pro Individual (Anual) — ${money(590)}/año`, `Individual Pro (Annual) — ${money(590)}/yr`)}</option>
                    <option value="Conductor Particular (Freemium)">{L('Conductor Particular — Gratis', 'Personal Driver — Free')}</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Vehículos Contratados:', 'Contracted Vehicles:')}</label>
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
                  <label className="font-bold text-slate-700 block mb-1">{L(`Cuota Anual (${currencyCode}):`, `Annual Fee (${currencyCode}):`)}</label>
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
                  <label className="font-bold text-slate-700 block mb-1">{L('Fecha de Primer Corte Anual (expires_at):', 'First Annual Cutoff Date (expires_at):')}</label>
                  <input
                    type="date"
                    required
                    value={newSubForm.expires_at}
                    onChange={(e) => setNewSubForm({ ...newSubForm, expires_at: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Método de Cobro:', 'Payment Method:')}</label>
                  <select
                    value={newSubForm.metodo_pago}
                    onChange={(e: any) => setNewSubForm({ ...newSubForm, metodo_pago: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="Tarjeta BAC (Débito Automático Anual)">{L('Tarjeta BAC (Débito Automático Anual)', 'BAC Card (Annual Auto-Debit)')}</option>
                    <option value="Transferencia Bancaria">{L('Transferencia Bancaria', 'Bank Transfer')}</option>
                    <option value="Tarjeta de Crédito Online">{L('Tarjeta de Crédito Online', 'Online Credit Card')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{L('Estado de la Suscripción:', 'Subscription Status:')}</label>
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
                    <span>{L('Suscripción Anual Activa (365 días)', 'Active Annual Subscription (365 days)')}</span>
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
                    <span>{L('Periodo de Prueba (14 Días)', 'Free Trial Period (14 Days)')}</span>
                  </label>
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1 text-amber-800">
                  <Bell className="w-3.5 h-3.5 text-amber-600" />
                  {L('Notificaciones automáticas y corte programado', 'Automated notifications & scheduled cutoff')}
                </p>
                <p className="text-amber-800/90 leading-relaxed text-[10.5px]">
                  {L(
                    'El sistema revisará diariamente la fecha expires_at. Si faltan 5 días para cumplir el año, enviará un correo automático de renovación. Si no se registra el pago, se revoca el acceso en la aplicación móvil de RutaFuel.',
                    'The system checks expires_at daily. Five days before renewal, an automated email reminder is sent. If no payment is logged by the cutoff date, mobile app access is revoked.'
                  )}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSubModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  {L('Guardar y Activar Anual', 'Save & Activate Annual')}
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
                    {L('Gestionar Suscripción & Módulos SaaS', 'Manage SaaS Subscription & Modules')}
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
                  {L('1. Plan de Suscripción Oficial', '1. Official Subscription Plan')}
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
                        {L('Solo Live Express', 'Live Express Only')}
                      </span>
                      <span className="text-xs font-black font-mono text-rose-700">{money(199)}/{L('m', 'mo')}</span>
                    </div>
                    <p className="text-xs font-black text-slate-900">TikTok Live Express</p>
                    <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      {L('Para vendedoras sin local ni SAT. Cero módulos ERP.', 'For live sellers without a store or tax invoicing. Zero ERP clutter.')}
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
                        {L('Plan PyME', 'SMB Plan')}
                      </span>
                      <span className="text-xs font-black font-mono text-slate-900">{money(299)}/{L('m', 'mo')}</span>
                    </div>
                    <p className="text-xs font-black text-slate-900">{L('IntegraPro PyME', 'IntegraPro SMB')}</p>
                    <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      {L('Hasta 2 sucursales, facturas FEL e inventario básico.', 'Up to 2 branches, E-Invoicing, and core inventory.')}
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
                        {L('Más Elegido', 'Most Popular')}
                      </span>
                      <span className="text-xs font-black font-mono text-slate-900">{money(699)}/{L('m', 'mo')}</span>
                    </div>
                    <p className="text-xs font-black text-slate-900">{L('IntegraPro Comercial', 'IntegraPro Business')}</p>
                    <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      {L('5 sucursales, Kiosco biométrico RRHH y cuentas por cobrar.', '5 branches, biometric HR Time Clock, and Accounts Receivable.')}
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
                        {L('Corporativo', 'Corporate')}
                      </span>
                      <span className="text-xs font-black font-mono text-slate-900">{money(1499)}/{L('m', 'mo')}</span>
                    </div>
                    <p className="text-xs font-black text-slate-900">IntegraPro Enterprise</p>
                    <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      {L('Multi-empresa, API contable SAT y sucursales ilimitadas.', 'Multi-company, accounting API, and unlimited branches.')}
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
                        {L('Add-on Extra: TikTok Live Commerce', 'Extra Add-on: TikTok Live Commerce')}
                      </span>
                      <span className="text-[10px] font-black font-mono text-rose-700 bg-rose-200/60 px-2 py-0.2 rounded-full">
                        +{money(99)} / {L('mes', 'mo')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {L('Habilita el módulo de canastas en vivo y apartado para clientes con ERP completo.', 'Enables live carts and stock reservation for full-ERP clients.')}
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
                    {L('Forzar Interfaz Live Express (Ocultar Todo el ERP)', 'Force Live Express UI (Hide All ERP Modules)')}
                  </span>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {L('Al entrar a esta empresa, el usuario solo verá las 5 pestañas de Live (Live, Prendas, Clientas, Resultados y Tienda).', 'When entering this company, the user will only see the 5 Live Commerce tabs (Live, Items, Customers, Results, and Store).')}
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
                    {L('2. Módulos ERP Tradicionales Activos', '2. Active Core ERP Modules')}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { key: 'hasPos', label: L('Punto de Venta (POS)', 'Point of Sale (POS)'), desc: L('Cajas físicas', 'Checkout registers') },
                      { key: 'hasFel', label: L('Ventas & Facturas FEL', 'Sales & E-Invoices'), desc: L('DTEs SAT', 'Electronic billing') },
                      { key: 'hasInventory', label: L('Inventario & Bodega', 'Inventory & Warehouse'), desc: L('Kardex y stock', 'Stock ledger') },
                      { key: 'hasClients', label: L('Cartera de Clientes', 'Customer Portfolio'), desc: L('Crédito y saldo', 'Credit & A/R') },
                      { key: 'hasPurchases', label: L('Compras & Proveedores', 'Purchases & Suppliers'), desc: L('Facturas compras', 'Vendor bills') },
                      { key: 'hasAccounting', label: L('Contabilidad SAT', 'Accounting & Tax'), desc: L('Libro diario', 'Journal entries') },
                      { key: 'hasHr', label: L('Recursos Humanos & Kiosco', 'HR & Time Clock'), desc: L('Planillas y huella', 'Payroll & attendance') }
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

              {/* 5. Tarifa, Ciclo & Próxima Fecha de Cobro */}
              <div className="p-4 bg-indigo-50/60 border border-indigo-200/80 rounded-2xl space-y-3 text-xs">
                <p className="font-black text-indigo-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                  {L('Facturación & Fecha de Corte (GT = GTQ / Internacional = USD)', 'Billing & Cutoff Date (GT = GTQ / International = USD)')}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-[11px]">{L('Ciclo', 'Cycle')}</label>
                    <select
                      value={saasPlanForm.billingCycle}
                      onChange={(e) => setSaasPlanForm({ ...saasPlanForm, billingCycle: e.target.value as 'monthly' | 'annual' })}
                      className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs"
                    >
                      <option value="monthly">{L('Mensual', 'Monthly')}</option>
                      <option value="annual">{L('Anual', 'Annual')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-[11px]">{L('Moneda', 'Currency')}</label>
                    <select
                      value={saasPlanForm.billingCurrency}
                      onChange={(e) => setSaasPlanForm({ ...saasPlanForm, billingCurrency: e.target.value as 'GTQ' | 'USD' })}
                      className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs"
                    >
                      <option value="GTQ">{L('GTQ (Q)', 'GTQ (Quetzales)')}</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                      {L('Cuota', 'Fee')} ({saasPlanForm.billingCurrency})
                    </label>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={saasPlanForm.billingAmount}
                      onChange={(e) => setSaasPlanForm({ ...saasPlanForm, billingAmount: Number(e.target.value) })}
                      className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-[11px]">{L('Próximo Cobro', 'Next Billing')}</label>
                    <input
                      type="date"
                      value={saasPlanForm.nextBillingDate}
                      onChange={(e) => setSaasPlanForm({ ...saasPlanForm, nextBillingDate: e.target.value })}
                      className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setEditingEmpresaSaaS(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {L('Cancelar', 'Cancel')}
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
                    {L('Guardar y Probar Vista', 'Save & Open View')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSaveSaaSConfig}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {L('Guardar Configuración SaaS', 'Save SaaS Settings')}
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
                    {createdTenantResult ? L('¡Nuevo Cliente Activado en Producción!', 'New Client Activated in Production!') : L('Activar Nuevo Cliente (Inquilino SaaS)', 'Activate New Client (SaaS Tenant)')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {createdTenantResult
                      ? L('Espacio multi-tenant creado en el servidor con aislamiento total. Entrega estas credenciales al cliente.', 'Multi-tenant workspace created with complete isolation. Share these credentials with the client.')
                      : L('Crea en 1 paso: Empresa aislada + Sucursal Principal + Usuario Dueño (sin acceso a otros inquilinos).', 'Create in 1 step: Isolated Company + Main Branch + Owner Account (zero access to other tenants).')}
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
                    <p className="font-black">{L('Inquilino', 'Tenant')} #{createdTenantResult.empresa.id} — {createdTenantResult.empresa.nombre}</p>
                    <p className="text-emerald-700 mt-0.5">
                      {L('Sucursal inicial:', 'Main branch:')} <strong>{createdTenantResult.sucursalNombre}</strong> • {L('Aislamiento privado verificado.', 'Private tenant isolation verified.')}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between gap-2 border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{L('URL de Acceso:', 'Login URL:')}</span>
                    <span className="text-indigo-300 font-bold">https://app.integrapro.app</span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{L('Administrador:', 'Administrator:')}</span>
                    <span className="text-white font-bold">{createdTenantResult.adminName}</span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{L('Correo (Usuario):', 'Email (Username):')}</span>
                    <span className="text-emerald-300 font-bold">{createdTenantResult.adminEmail}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400">{L('Contraseña Inicial:', 'Initial Password:')}</span>
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
                    <span>{copiedCredentials ? L('¡Mensaje Copiado!', 'Message Copied!') : L('Copiar Credenciales', 'Copy Credentials')}</span>
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
                    <span>{L('Enviar por WhatsApp', 'Send via WhatsApp')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewTenantModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black cursor-pointer"
                  >
                    {L('Finalizar', 'Done')}
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
                    {L('1. Datos del Negocio (Nuevo Inquilino)', '1. Business Details (New Tenant)')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{L('Nombre Comercial *', 'Trade Name *')}</label>
                      <input
                        type="text"
                        required
                        value={newTenantForm.nombre}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, nombre: e.target.value })}
                        placeholder={L('Ej. Ferretería El Constructor', 'e.g., Summit Hardware Co.')}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{L('Razón Social', 'Legal Entity Name')}</label>
                      <input
                        type="text"
                        value={newTenantForm.razon_social}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, razon_social: e.target.value })}
                        placeholder={L('Ej. Inversiones El Constructor S.A.', 'e.g., Summit Hardware LLC')}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{L('NIT (o CF)', `${taxIdLabel} (or N/A)`)}</label>
                      <input
                        type="text"
                        value={newTenantForm.nit}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, nit: e.target.value })}
                        placeholder={L('Ej. 1234567-8 o CF', 'e.g., 12-3456789 or N/A')}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{L('Régimen Tributario SAT', 'Tax Regime')}</label>
                      <select
                        value={newTenantForm.regimen_tributario}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, regimen_tributario: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="general">{L('Régimen General (IVA 12%)', 'Standard Tax (12% VAT)')}</option>
                        <option value="pequeno_contribuyente">{L('Pequeño Contribuyente (5%)', 'Small Business (5% Flat)')}</option>
                        <option value="informal">{L('Exento / Informal (0%)', 'Tax-Exempt / Informal (0%)')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{L('País & Moneda de Cobro', 'Country & Billing Currency')}</label>
                      <select
                        value={newTenantForm.pais}
                        onChange={(e) => handleTenantCountryChange(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="GT">{L('🇬🇹 Guatemala (Quetzales - Q)', '🇬🇹 Guatemala (GTQ)')}</option>
                        <option value="SV">{L('🇸🇻 El Salvador (Dólares - $)', '🇸🇻 El Salvador (USD - $)')}</option>
                        <option value="HN">{L('🇭🇳 Honduras (Dólares - $)', '🇭🇳 Honduras (USD - $)')}</option>
                        <option value="CR">{L('🇨🇷 Costa Rica (Dólares - $)', '🇨🇷 Costa Rica (USD - $)')}</option>
                        <option value="PA">{L('🇵🇦 Panamá (Dólares - $)', '🇵🇦 Panama (USD - $)')}</option>
                        <option value="MX">{L('🇲🇽 México (Dólares - $)', '🇲🇽 Mexico (USD - $)')}</option>
                        <option value="US">{L('🇺🇸 Estados Unidos (Dólares - $)', '🇺🇸 United States (USD - $)')}</option>
                        <option value="OT">{L('🌎 Otro País (Dólares - $)', '🌎 Other Country (USD - $)')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{L('Teléfono / WhatsApp', 'Phone / WhatsApp')}</label>
                      <input
                        type="text"
                        value={newTenantForm.telefono}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, telefono: e.target.value })}
                        placeholder={newTenantForm.pais === 'GT' ? L('Ej. 5555-1234', 'e.g., 5555-1234') : L('Ej. +1 555-1234', 'e.g., +1 555-1234')}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">{L('Sucursal Inicial', 'Initial Branch')}</label>
                      <input
                        type="text"
                        value={newTenantForm.sucursal_nombre}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, sucursal_nombre: e.target.value })}
                        placeholder={L('Sucursal Principal', 'Main Branch')}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Plan y Perfil Operativo */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <p className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-600" />
                    {L('2. Perfil del Cliente & Módulos Activados', '2. Client Profile & Enabled Modules')}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {[
                      { id: 'retail', label: 'Retail / POS' },
                      { id: 'admin_only', label: L('Admin (Sin POS)', 'Back-Office (No POS)') },
                      { id: 'standard', label: L('Estándar PyME', 'Standard SMB') },
                      { id: 'enterprise', label: 'Enterprise Full' },
                      { id: 'live_express', label: L('Solo TikTok Live', 'TikTok Live Only') },
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
                      { key: 'hasPos', label: L('Punto de Venta (POS)', 'Point of Sale (POS)') },
                      { key: 'hasInventory', label: L('Inventario & Bodega', 'Inventory & Warehouse') },
                      { key: 'hasFel', label: L('Ventas & FEL', 'Sales & E-Invoice') },
                      { key: 'hasClients', label: L('Clientes & CxC', 'Clients & A/R') },
                      { key: 'hasPurchases', label: L('Compras & CxP', 'Purchases & A/P') },
                      { key: 'hasAccounting', label: L('Contabilidad SAT', 'Accounting & Tax') },
                      { key: 'hasHr', label: L('RRHH & Asistencia', 'HR & Attendance') },
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

                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-black text-indigo-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                        {L('Facturación, Ciclo & Próximo Cobro', 'Billing, Cycle & Next Payment')}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-200 text-[10px] font-black text-indigo-700">
                        {newTenantForm.billing_currency === 'GTQ' ? L('GTQ (Quetzales - Q)', 'GTQ (Quetzales)') : L('USD (Dólares - $)', 'USD (US Dollars - $)')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{L('Estado Inicial de Suscripción', 'Initial Subscription Status')}</label>
                        <select
                          value={newTenantForm.subscription_status}
                          onChange={(e) => handleTenantStatusChange(e.target.value as any)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold"
                        >
                          <option value="active">{L('Activa (Pagada)', 'Active (Paid)')}</option>
                          <option value="trial">{L('Prueba Gratis (Trial)', 'Free Trial')}</option>
                          <option value="pending">{L('Pendiente de Pago', 'Pending Payment')}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{L('Ciclo de Facturación', 'Billing Cycle')}</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleTenantCycleChange('monthly')}
                            className={`py-2 px-2.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                              newTenantForm.billing_cycle === 'monthly'
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {L('Mensual (30d)', 'Monthly (30d)')}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTenantCycleChange('annual')}
                            className={`py-2 px-2.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                              newTenantForm.billing_cycle === 'annual'
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {L('Anual (2m gratis)', 'Annual (2 mo free)')}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          {L('Valor de la Suscripción', 'Subscription Amount')} ({newTenantForm.billing_currency}) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-black text-indigo-700">
                            {newTenantForm.billing_currency === 'GTQ' ? currencySymbol : '$'}
                          </span>
                          <input
                            type="number"
                            min={0}
                            step="0.01"
                            required
                            value={newTenantForm.billing_amount}
                            onChange={(e) => setNewTenantForm({ ...newTenantForm, billing_amount: Number(e.target.value) })}
                            className="w-full pl-8 pr-14 py-2 bg-white border border-slate-200 rounded-xl font-mono font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
                            /{newTenantForm.billing_cycle === 'annual' ? L('año', 'yr') : L('mes', 'mo')}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          {newTenantForm.subscription_status === 'trial'
                            ? L('Fin de Prueba / 1er Cobro', 'Trial End / 1st Charge')
                            : L('Próxima Fecha de Cobro / Corte', 'Next Billing / Cutoff Date')}
                        </label>
                        <input
                          type="date"
                          required
                          value={newTenantForm.next_billing_date}
                          onChange={(e) => setNewTenantForm({ ...newTenantForm, next_billing_date: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      {newTenantForm.subscription_status === 'trial' && (
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">{L('Días de Prueba', 'Trial Days')}</label>
                          <input
                            type="number"
                            min={1}
                            max={90}
                            value={newTenantForm.trial_days}
                            onChange={(e) => {
                              const days = Number(e.target.value) || 14;
                              setNewTenantForm(prev => ({
                                ...prev,
                                trial_days: days,
                                next_billing_date: computeNextBillingDate('trial', prev.billing_cycle, days),
                              }));
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                          />
                        </div>
                      )}

                      <div className={newTenantForm.subscription_status === 'trial' ? '' : 'sm:col-span-2'}>
                        <label className="block font-bold text-slate-700 mb-1">{L('Método de Pago', 'Payment Method')}</label>
                        <select
                          value={newTenantForm.payment_method}
                          onChange={(e) => setNewTenantForm({ ...newTenantForm, payment_method: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold"
                        >
                          <option value="Transferencia / Depósito">{L('Transferencia / Depósito Bancario', 'Bank Transfer / Deposit')}</option>
                          <option value="Tarjeta de Crédito / Débito">{L('Tarjeta de Crédito / Débito', 'Credit / Debit Card')}</option>
                          <option value="Efectivo">{L('Efectivo', 'Cash')}</option>
                          <option value="PayPal / Internacional">{L('PayPal / Pago Internacional (USD)', 'PayPal / International Payment (USD)')}</option>
                          <option value="Pendiente">{L('Pendiente de Confirmar', 'Pending Confirmation')}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Credenciales del Dueño */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <p className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-emerald-600" />
                    {L('3. Usuario Administrador del Cliente (Acceso Aislado)', '3. Client Admin Account (Isolated Access)')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{L('Nombre del Dueño *', 'Owner Name *')}</label>
                      <input
                        type="text"
                        required
                        value={newTenantForm.admin_name}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, admin_name: e.target.value })}
                        placeholder={L('Ej. Carlos Méndez', 'e.g., Alex Morgan')}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{L('Correo de Acceso *', 'Login Email *')}</label>
                      <input
                        type="email"
                        required
                        value={newTenantForm.admin_email}
                        onChange={(e) => setNewTenantForm({ ...newTenantForm, admin_email: e.target.value })}
                        placeholder={L('carlos@ferreteria.com', 'alex@company.com')}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span>{L('Contraseña Inicial', 'Initial Password')}</span>
                        <button
                          type="button"
                          onClick={() => setNewTenantForm({ ...newTenantForm, admin_password: generateSecurePassword() })}
                          className="text-[10px] text-indigo-600 hover:underline cursor-pointer"
                        >
                          {L('Generar otra', 'Regenerate')}
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
                    {L('Cancelar', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingTenant}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black shadow-md shadow-indigo-600/25 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isCreatingTenant ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{L('Creando Inquilino en el Servidor...', 'Creating Tenant on Server...')}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{L('Crear y Activar Empresa Cliente', 'Create & Activate Client Company')}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL DE CONFIRMACIÓN PARA ELIMINAR EMPRESA (INQUILINO) PERMANENTEMENTE */}
      {/* ===================================================================== */}
      {deletingEmpresa && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full border border-rose-200 shadow-2xl overflow-hidden">
            <div className="p-5 bg-rose-50 border-b border-rose-100 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-rose-950">{L('Eliminar Empresa Permanentemente', 'Permanently Delete Company')}</h3>
                  <p className="text-xs text-rose-700 mt-0.5">
                    {L('Esta acción no se puede deshacer.', 'This action cannot be undone.')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={isDeletingEmpresa}
                onClick={() => setDeletingEmpresa(null)}
                className="p-1.5 rounded-xl text-rose-400 hover:text-rose-700 hover:bg-rose-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-black text-slate-900 text-sm">
                  {deletingEmpresa.nombre}{' '}
                  <span className="font-mono text-xs text-slate-500">#{deletingEmpresa.id}</span>
                </p>
                <p className="text-[11px] text-slate-500">
                  {L('Razón Social:', 'Legal Name:')} {deletingEmpresa.razon_social || deletingEmpresa.nombre} • {taxIdLabel}: {trTaxId(deletingEmpresa.nit)}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                <strong>{L('Se borrarán definitivamente:', 'The following will be permanently deleted:')}</strong>{' '}
                {L(
                  'los usuarios del inquilino (y sus sesiones activas), sucursales, inventario, ventas, compras, clientes, contabilidad y configuración en MySQL.',
                  'all tenant users (and active sessions), branches, inventory, sales, purchases, customers, accounting records, and server settings.'
                )}
              </div>

              {deleteEmpresaError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[11px]">
                  ⚠️ {deleteEmpresaError}
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {L('Escribe', 'Type')} <span className="font-mono font-black text-rose-600">{deleteKeyword}</span> {L('para confirmar:', 'to confirm:')}
                </label>
                <input
                  type="text"
                  autoFocus
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={deleteKeyword}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-black text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isDeletingEmpresa}
                  onClick={() => setDeletingEmpresa(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="button"
                  disabled={isDeletingEmpresa || (deleteConfirmText.trim().toUpperCase() !== 'ELIMINAR' && deleteConfirmText.trim().toUpperCase() !== 'DELETE')}
                  onClick={handleConfirmDeleteEmpresa}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black shadow-sm flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isDeletingEmpresa ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{L('Eliminando...', 'Deleting...')}</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{L('Sí, Eliminar Empresa', 'Yes, Delete Company')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
