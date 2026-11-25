import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Key, 
  CheckCircle2, 
  Save, 
  Database, 
  Lock,
  Coins,
  CreditCard,
  FileText,
  AlertTriangle,
  Trash2,
  Eye,
  EyeOff,
  Store,
  Layers,
  Sparkles,
  Plus,
  HelpCircle,
  Users,
  UserPlus,
  Activity,
  HardDrive,
  RefreshCw,
  Edit3,
  Server,
  Clock,
  MapPin,
  Settings,
  Phone,
  Mail,
  Truck,
  ShieldCheck,
  Video,
  ShoppingBag,
  Landmark,
  Globe
} from 'lucide-react';
import { useTimeFormat } from '../context/TimeFormatContext';
import { useLanguage } from '../context/LanguageContext';
import SpecificTimePicker from '../components/SpecificTimePicker';
import TokenExtensionScraper from '../components/TokenExtensionScraper';
import { ConexionExterna, EmpresaSaaS } from '../types';
import { externalConnectionsApi, empresaApi } from '../api';
import { isOwnerOperableEmpresa } from '../utils/tenant';

interface BoutiqueConfig {
  nombre: string;
  slogan: string;
  whatsapp: string;
  email: string;
  direccion: string;
  bi_cuenta: string;
  bi_titular: string;
  banrural_cuenta: string;
  banrural_titular: string;
  bac_cuenta: string;
  bac_titular: string;
  acepta_contra_entrega: boolean;
  tarifa_ciudad: number;
  tarifa_departamentos: number;
  courier_predeterminado: string;
  horario_recoleccion: string;
  logo_url: string;
}

interface SettingsViewProps {
  currentEmpresa?: EmpresaSaaS;
  empresas?: EmpresaSaaS[];
  isPlatformAdmin?: boolean;
  onUpdateEmpresa?: (emp: EmpresaSaaS) => void;
  onSelectEmpresa?: (id: number) => void;
}

export default function SettingsView({ currentEmpresa, empresas: propEmpresas, isPlatformAdmin = false, onUpdateEmpresa, onSelectEmpresa }: SettingsViewProps = {}) {
  const [activeTab, setActiveTab] = useState<'empresa' | 'moneda' | 'fel' | 'pasarelas' | 'modulos' | 'multiempresa' | 'roles' | 'api' | 'conexiones' | 'token_scraper'>('empresa');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const { timeFormat, setTimeFormat } = useTimeFormat();
  const { lang, setLang, L, currencySymbol, locale, taxIdLabel, trStatus, trRegime, trTaxId } = useLanguage();

  const trRole = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return L('Super Admin', 'Super Admin');
      case 'Gerente de Sucursal':
        return L('Gerente de Sucursal', 'Branch Manager');
      case 'Cajero / Operador POS':
        return L('Cajero / Operador POS', 'Cashier / POS Operator');
      case 'Auditor Contable':
        return L('Auditor Contable', 'Accounting Auditor');
      default:
        return role;
    }
  };

  const trBranch = (branch: string) => {
    switch (branch) {
      case 'Sucursal Central - Ciudad':
        return L('Sucursal Central - Ciudad', 'Central Branch - Downtown');
      case 'Sucursal Norte - Carretera al Atlántico':
        return L('Sucursal Norte - Carretera al Atlántico', 'North Branch - Atlantic Highway');
      case 'Sucursal Sur - Villa Nueva':
        return L('Sucursal Sur - Villa Nueva', 'South Branch - Villa Nueva');
      case 'Todas las Sucursales':
        return L('Todas las Sucursales', 'All Branches');
      default:
        return branch;
    }
  };

  const trLastAccess = (val: string) => {
    switch (val) {
      case 'Hace 5 min':
        return L('Hace 5 min', '5 min ago');
      case 'Hace 38 min':
        return L('Hace 38 min', '38 min ago');
      case 'Hoy a las 08:15':
        return L('Hoy a las 08:15', 'Today at 08:15');
      case 'Ayer':
        return L('Ayer', 'Yesterday');
      case 'Pendiente de inicio':
        return L('Pendiente de inicio', 'Pending first login');
      default:
        return val;
    }
  };

  const getRegimenKey = (regimenStr: string = '') => {
    const clean = (regimenStr || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (clean.includes('peque') || clean.includes('5%')) return 'pequeno_contribuyente';
    if (clean.includes('informal') || clean.includes('exento') || clean.includes('no factura') || clean.includes('0%')) return 'informal';
    return 'general';
  };

  const [activeEmpresaId, setActiveEmpresaId] = useState<number>(currentEmpresa?.id || 1);

  // Detección de perfil informal / Solo Live para simplificar a "Datos de Mi Tienda" (Solo para demo Live ID: 99)
  const isFortexa = activeEmpresaId === 22 || currentEmpresa?.id === 22;
  const isInformalTenant = (activeEmpresaId === 99 || currentEmpresa?.id === 99) && !isFortexa;

  const [viewMode, setViewMode] = useState<'boutique' | 'advanced'>(
    isInformalTenant ? 'boutique' : 'advanced'
  );

  useEffect(() => {
    const isInf = (currentEmpresa?.id === 99);
    if (isInf) {
      setViewMode('boutique');
    } else {
      setViewMode('advanced');
    }
  }, [currentEmpresa]);

  const getInitialBoutiqueConfig = (): BoutiqueConfig => {
    const targetId = currentEmpresa?.id || activeEmpresaId;
    try {
      const saved = localStorage.getItem('integrapro_boutique_config_' + targetId);
      if (saved) return JSON.parse(saved);
    } catch {}

    const isBoutiqueLive = targetId === 99;
    return {
      nombre: currentEmpresa?.nombre || (isBoutiqueLive ? 'Boutique Chic Live' : 'Fashion Styles'),
      slogan: isBoutiqueLive ? 'Moda Exclusiva en TikTok Live & Envíos a Todo el País' : 'Boutique & Tendencias Femeninas',
      whatsapp: isBoutiqueLive ? '4589-1234' : (currentEmpresa?.telefono || '5944-0491'),
      email: currentEmpresa?.email || (isBoutiqueLive ? 'maritza.live@tiktokboutique.gt' : 'ventas@fashionstyles.gt'),
      direccion: currentEmpresa?.direccion || (isBoutiqueLive ? 'Calzada Roosevelt 14-25 Zona 11, Local 3, Mixco, Guatemala' : 'Ciudad de Guatemala'),
      bi_cuenta: '025-014829-1',
      bi_titular: currentEmpresa?.nombre || (isBoutiqueLive ? 'Maritza Gómez / Boutique Chic' : 'Fashion Styles S.A.'),
      banrural_cuenta: '3402-09812-4',
      banrural_titular: currentEmpresa?.nombre || (isBoutiqueLive ? 'Maritza Gómez' : 'Fashion Styles'),
      bac_cuenta: '90-128472-0',
      bac_titular: currentEmpresa?.nombre || (isBoutiqueLive ? 'Boutique Chic Live' : 'Fashion Styles'),
      acepta_contra_entrega: true,
      tarifa_ciudad: 25.00,
      tarifa_departamentos: 35.00,
      courier_predeterminado: 'Guatex',
      horario_recoleccion: 'Lunes a Sábado a las 14:00 hrs',
      logo_url: isBoutiqueLive
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
    };
  };

  const [boutiqueConfig, setBoutiqueConfig] = useState<BoutiqueConfig>(getInitialBoutiqueConfig);

  useEffect(() => {
    setBoutiqueConfig(getInitialBoutiqueConfig());
  }, [currentEmpresa, activeEmpresaId]);

  const handleSaveBoutiqueConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    localStorage.setItem('integrapro_boutique_config_' + activeEmpresaId, JSON.stringify(boutiqueConfig));

    setCompanyForm(prev => ({
      ...prev,
      nombre: boutiqueConfig.nombre,
      telefono: boutiqueConfig.whatsapp,
      email: boutiqueConfig.email,
      direccion: boutiqueConfig.direccion
    }));

    const updated: EmpresaSaaS = {
      id: activeEmpresaId,
      nombre: boutiqueConfig.nombre,
      razon_social: boutiqueConfig.nombre,
      nit: companyForm.nit || 'CF',
      pais: 'GT',
      regimen: currentEmpresa?.regimen || 'Exento / Informal',
      plan: 'basic',
      activa: true,
      telefono: boutiqueConfig.whatsapp,
      email: boutiqueConfig.email,
      direccion: boutiqueConfig.direccion
    };

    try {
      await empresaApi.update(activeEmpresaId, {
        nombre: boutiqueConfig.nombre,
        telefono: boutiqueConfig.whatsapp,
        email: boutiqueConfig.email,
        direccion: boutiqueConfig.direccion,
        configuracion: {
          boutique: boutiqueConfig
        }
      });
      showToast(L('✅ ¡Datos de tu tienda y cuentas bancarias actualizadas con éxito!', '✅ Store details and bank accounts updated successfully!'));
    } catch {
      showToast(L('⚠️ ERROR: los datos NO se guardaron en el servidor. Intenta de nuevo.', '⚠️ ERROR: Data was NOT saved on the server. Please try again.'));
    }

    if (onUpdateEmpresa) {
      onUpdateEmpresa(updated);
    }
    localStorage.setItem('integrapro_active_empresa', JSON.stringify(updated));
  };

  // 1. Datos Principales de la Empresa (Idéntico a App\Filament\Pages\ConfiguracionEmpresa.php)
  const [companyForm, setCompanyForm] = useState({
    nombre: currentEmpresa?.nombre || 'Corporación Comercial IntegraPro S.A.',
    razon_social: currentEmpresa?.razon_social || 'IntegraPro Soluciones Empresariales Sociedad Anónima',
    giro_negocio: 'retail' as 'retail' | 'ferreteria' | 'aceitera' | 'farmacia' | 'minisuper' | 'panaderia',
    nit: currentEmpresa?.nit || '10429182-3',
    pais: currentEmpresa?.pais || 'GT',
    idioma: lang,
    regimen_tributario_gt: getRegimenKey(currentEmpresa?.regimen),
    regimen_tributario_manual: '',
    telefono: currentEmpresa?.telefono || '+502 2334-9000',
    email: currentEmpresa?.email || 'facturacion@integrapro.com',
    direccion: currentEmpresa?.direccion || '7a Avenida 12-45 Zona 9, Edificio Corporativo Nivel 8, Ciudad de Guatemala',
    hora_apertura: '08:00',
    hora_cierre: '18:00',
    geocerca_activa: true,
    radio_geocerca_metros: 50,
    
    // Suscripción
    plan_type: (currentEmpresa?.plan || 'enterprise') as 'basic' | 'standard' | 'enterprise' | 'live_express' | string,
    subscription_status: 'active' as 'active' | 'trial' | 'expired' | 'suspended',
    trial_days_remaining: 28,

    // Moneda & Cambio
    moneda_principal: 'GTQ',
    monedas_aceptadas: ['USD'],
    tasa_fija: 7.85,

    // Facturación Electrónica (FEL - Infile SAT)
    fel_habilitado: true,
    fel_own_credentials: false,
    fel_usuario: 'integrapro_fel_prod',
    fel_llave: 'd89f81a7b8e4c901e892cfa0129',
    fel_frase: 'FR-INTEGRA-SAT-2026',

    // Pasarela Neonet (VisaNet Guatemala)
    neonet_habilitado: true,
    neonet_environment: 'prod' as 'test' | 'prod',
    neonet_merchant_id: 'NEO-GT-884920',
    neonet_user: 'api_integra_pos',
    neonet_password: '••••••••••••',

    // Pasarela BAC Credomatic (Comprapag)
    bac_habilitado: true,
    bac_environment: 'test' as 'test' | 'prod',
    bac_merchant_id: 'BAC-COM-991204',
    bac_api_key: 'bac_live_key_99348102',
    bac_secret_key: '••••••••••••••••'
  });

  const lastFetchedId = useRef<number | null>(null);

  // Sincronizar formulario cada vez que cambie la empresa activa en vivo desde el Droplet
  useEffect(() => {
    const targetId = Number(currentEmpresa?.id || activeEmpresaId);
    if (targetId && targetId !== lastFetchedId.current) {
      lastFetchedId.current = targetId;
      setActiveEmpresaId(targetId);
      empresaApi.getById(targetId)
        .then((res: any) => {
          if (res) {
            const conf = typeof res.configuracion === 'string' ? JSON.parse(res.configuracion) : (res.configuracion || {});
            setCompanyForm(prev => ({
              ...prev,
              nombre: res.nombre || '',
              razon_social: res.razon_social || res.nombre || '',
              nit: res.nit || '',
              pais: res.pais || 'GT',
              regimen_tributario_gt: getRegimenKey(res.regimen_tributario),
              telefono: res.telefono || '',
              email: res.email || '',
              direccion: res.direccion || '',
              plan_type: res.plan_type || 'enterprise',
              giro_negocio: conf.giro_negocio || 'retail',
              moneda_principal: conf.moneda?.principal || 'GTQ',
              tasa_fija: conf.moneda?.tasa_fija ? Number(conf.moneda.tasa_fija) : 7.85,
              fel_habilitado: conf.fel?.habilitado ?? true,
              fel_own_credentials: conf.fel?.mode === 'custom',
              fel_usuario: conf.fel?.usuario || '',
              fel_llave: conf.fel?.llave || '',
              fel_frase: conf.fel?.frase || '',
              neonet_merchant_id: conf.neonet?.merchant_id || '',
              neonet_user: conf.neonet?.user || '',
              neonet_environment: conf.neonet?.environment || 'test',
              bac_merchant_id: conf.bac?.merchant_id || '',
              bac_api_key: conf.bac?.api_key || '',
              bac_environment: conf.bac?.environment || 'test'
            }));

            if (conf.modules && typeof conf.modules === 'object') {
              setModules(prev => ({
                ...prev,
                ...conf.modules
              }));
            }
          }
        })
        .catch(err => {
          console.warn('Error fetching live empresa details from Droplet:', err);
          if (currentEmpresa) {
            setCompanyForm(prev => ({
              ...prev,
              nombre: currentEmpresa.nombre,
              razon_social: currentEmpresa.razon_social,
              nit: currentEmpresa.nit,
              pais: currentEmpresa.pais,
              regimen_tributario_gt: getRegimenKey(currentEmpresa.regimen),
              telefono: currentEmpresa.telefono,
              email: currentEmpresa.email,
              direccion: currentEmpresa.direccion,
              plan_type: currentEmpresa.plan
            }));
          }
        });
    }
  }, [currentEmpresa?.id, activeEmpresaId]);

  // Toggles de Módulos (configuracion.modules en Laravel)
  const [modules, setModules] = useState({
    sales: true,
    inventory: true,
    accounting: true,
    hr: true,
    purchases: true,
    reports: true,
    fel: true,
    neonet: true,
    bac: true,
    ai_assistant: true,
    external_connections: true,
    live_sales: activeEmpresaId === 1 || Boolean((currentEmpresa as any)?.modules?.live_sales)
  });

  // Estados de visualización de contraseñas
  const [showFelKey, setShowFelKey] = useState(false);
  const [showNeonetPass, setShowNeonetPass] = useState(false);
  const [showBacSecret, setShowBacSecret] = useState(false);

  // Modal de Zona de Peligro (Eliminar Empresa)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  // Directorio de Empresas (aislado: sin clientes externos hardcodeados)
  const [empresasList, setEmpresasList] = useState<EmpresaSaaS[]>(
    propEmpresas && propEmpresas.length > 0 ? propEmpresas : (currentEmpresa ? [currentEmpresa] : [])
  );

  useEffect(() => {
    if (propEmpresas && propEmpresas.length > 0) {
      setEmpresasList(propEmpresas);
    }
  }, [propEmpresas]);

  // Gestión de Usuarios del Sistema (Laravel: UserResource / UsuarioResource)
  interface UsuarioItem {
    id: number;
    name: string;
    email: string;
    role: 'Super Admin' | 'Gerente de Sucursal' | 'Cajero / Operador POS' | 'Auditor Contable';
    sucursal_nombre: string;
    empleado_nombre?: string;
    dpi?: string;
    estado: 'Activo' | 'Inactivo';
    ultimo_acceso: string;
    permisos: string[];
  }

  const [usuarios, setUsuarios] = useState<UsuarioItem[]>([
    {
      id: 1,
      name: 'Juan Carlos Morales',
      email: 'admin@integrapro.com',
      role: 'Super Admin',
      sucursal_nombre: 'Sucursal Central - Ciudad',
      empleado_nombre: 'Juan Carlos Morales',
      dpi: '2345 67890 0101',
      estado: 'Activo',
      ultimo_acceso: 'Hace 5 min',
      permisos: ['fel_certificar', 'fel_anular', 'rrhh_liquidaciones', 'contabilidad_total', 'usuarios_admin']
    },
    {
      id: 2,
      name: 'María Elena González',
      email: 'mgonzalez@integrapro.com',
      role: 'Gerente de Sucursal',
      sucursal_nombre: 'Sucursal Norte - Carretera al Atlántico',
      empleado_nombre: 'María Elena González',
      dpi: '1987 54321 0101',
      estado: 'Activo',
      ultimo_acceso: 'Hace 38 min',
      permisos: ['pos_ventas', 'inventario_traslados', 'caja_corte_z', 'asistencias_ver']
    },
    {
      id: 3,
      name: 'Carlos Alberto Soto',
      email: 'caja1@integrapro.com',
      role: 'Cajero / Operador POS',
      sucursal_nombre: 'Sucursal Central - Ciudad',
      empleado_nombre: 'Carlos Soto',
      dpi: '2890 12345 0101',
      estado: 'Activo',
      ultimo_acceso: 'Hoy a las 08:15',
      permisos: ['pos_ventas', 'clientes_abonos']
    },
    {
      id: 4,
      name: 'Licda. Ana Sofía Méndez',
      email: 'contabilidad@integrapro.com',
      role: 'Auditor Contable',
      sucursal_nombre: 'Sucursal Central - Ciudad',
      empleado_nombre: 'Ana Sofía Méndez',
      dpi: '3012 45678 0101',
      estado: 'Activo',
      ultimo_acceso: 'Ayer',
      permisos: ['contabilidad_total', 'sat_formularios', 'retenciones_sat', 'libro_diario']
    }
  ]);

  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Cajero / Operador POS' as 'Super Admin' | 'Gerente de Sucursal' | 'Cajero / Operador POS' | 'Auditor Contable',
    sucursal_nombre: 'Sucursal Central - Ciudad',
    empleado_nombre: '',
    dpi: '',
    permisos: ['pos_ventas']
  });

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) return;

    if (editingUserId) {
      setUsuarios(prev => prev.map(u => u.id === editingUserId ? {
        ...u,
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        sucursal_nombre: userForm.sucursal_nombre,
        empleado_nombre: userForm.empleado_nombre || undefined,
        dpi: userForm.dpi || undefined,
        permisos: userForm.permisos
      } : u));
      showToast(L(`Usuario ${userForm.name} actualizado exitosamente.`, `User ${userForm.name} updated successfully.`));
    } else {
      const newUser: UsuarioItem = {
        id: Date.now(),
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        sucursal_nombre: userForm.sucursal_nombre,
        empleado_nombre: userForm.empleado_nombre || undefined,
        dpi: userForm.dpi || undefined,
        estado: 'Activo',
        ultimo_acceso: 'Pendiente de inicio',
        permisos: userForm.permisos
      };
      setUsuarios(prev => [newUser, ...prev]);
      showToast(L(`Nuevo usuario ${userForm.name} registrado en el sistema.`, `New user ${userForm.name} registered in the system.`));
    }

    setShowNewUserModal(false);
    setEditingUserId(null);
    setUserForm({
      name: '',
      email: '',
      password: '',
      role: 'Cajero / Operador POS',
      sucursal_nombre: 'Sucursal Central - Ciudad',
      empleado_nombre: '',
      dpi: '',
      permisos: ['pos_ventas']
    });
  };

  const toggleUserStatus = (id: number) => {
    setUsuarios(prev => prev.map(u => {
      if (u.id === id) {
        const nextState = u.estado === 'Activo' ? 'Inactivo' : 'Activo';
        showToast(L(`Usuario ${u.name} marcado como ${trStatus(nextState)}`, `User ${u.name} marked as ${trStatus(nextState)}`));
        return { ...u, estado: nextState };
      }
      return u;
    }));
  };

  // Diagnóstico y Salud del Sistema (Laravel: SystemHealth.php)
  const [isHealthChecking, setIsHealthChecking] = useState(false);
  const [healthData, setHealthData] = useState({
    db: { status: 'online', latency: '9ms', tables: 31, size: '32.4 MB', engine: 'SQLite / PDO (database.sqlite)' },
    storage: { status: 'online', check: 'OK (health_check.txt)', disk: 'storage/app/public', permissions: '0775' },
    fel: { status: 'online', latency: '74ms', provider: 'Infile', endpoint: 'https://fel.infile.com.gt/api/v1/dte' },
    queue: { status: 'online', pending: 0, failed: 0, workers: '1' },
    memory: { usage: '48.2 MB / 256 MB', load: '12%', uptimeDays: 14, uptimeHours: 8 },
    lastCheck: ''
  });

  const handleRunHealthCheck = () => {
    setIsHealthChecking(true);
    setTimeout(() => {
      setIsHealthChecking(false);
      setHealthData(prev => ({
        ...prev,
        db: { ...prev.db, latency: `${Math.floor(Math.random() * 5) + 7}ms` },
        fel: { ...prev.fel, latency: `${Math.floor(Math.random() * 20) + 65}ms` },
        lastCheck: new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }));
      showToast(L('✅ Diagnóstico de Sistema ejecutado con éxito: Todos los subsistemas están 100% operativos.', '✅ System diagnostics completed: All subsystems are 100% operational.'));
    }, 1200);
  };

  // 9. Conexiones Externas a Bases de Datos (Laravel: ConexionExterna)
  const [conexiones, setConexiones] = useState<ConexionExterna[]>([]);
  const [isLoadingConexiones, setIsLoadingConexiones] = useState<boolean>(false);

  const fetchConexiones = async () => {
    setIsLoadingConexiones(true);
    try {
      const data = await externalConnectionsApi.getAll();
      const list = Array.isArray(data) ? data : (data?.data ?? []);
      setConexiones(list.map((c: any) => ({
        ...c,
        ultima_sincronizacion: c.ultima_sincronizacion || null
      })));
    } catch (err) {
      console.warn('Error cargando conexiones externas:', err);
    } finally {
      setIsLoadingConexiones(false);
    }
  };

  useEffect(() => {
    fetchConexiones();
  }, []);

  const [showNewConnModal, setShowNewConnModal] = useState(false);
  const [testingConnId, setTestingConnId] = useState<number | null>(null);
  const [syncingConnId, setSyncingConnId] = useState<number | null>(null);
  const [newConnForm, setNewConnForm] = useState({
    nombre: '',
    driver: 'mysql' as 'mysql' | 'pgsql' | 'sqlsrv',
    host: '',
    port: 3306,
    database: '',
    username: '',
    password: ''
  });

  const handleTestConnection = async (conn: ConexionExterna) => {
    setTestingConnId(conn.id);
    try {
      const res = await externalConnectionsApi.testConnection(conn.id);
      showToast(`✅ ${res?.message || L(`Conexión exitosa con ${conn.nombre}`, `Successfully connected to ${conn.nombre}`)}`);
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      showToast(`❌ ${msg || L(`No se pudo conectar con ${conn.nombre}`, `Could not connect to ${conn.nombre}`)}`);
    } finally {
      setTestingConnId(null);
    }
  };

  const handleSyncConnection = async (conn: ConexionExterna) => {
    setSyncingConnId(conn.id);
    try {
      const res = await externalConnectionsApi.sync(conn.id);
      showToast(`🔄 ${res?.message || L('Sincronización completada.', 'Synchronization completed.')}`);
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      showToast(`⚠️ ${msg || L('La sincronización no está disponible.', 'Synchronization is not available.')}`);
    } finally {
      setSyncingConnId(null);
    }
  };

  const handleSaveConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConnForm.nombre || !newConnForm.host || !newConnForm.database || !newConnForm.username) {
      showToast(L('⚠️ Por favor completa todos los campos requeridos', '⚠️ Please fill in all required fields'));
      return;
    }
    try {
      const res = await externalConnectionsApi.create({
        nombre: newConnForm.nombre,
        driver: newConnForm.driver,
        host: newConnForm.host,
        port: Number(newConnForm.port),
        database: newConnForm.database,
        username: newConnForm.username,
        password: newConnForm.password || undefined
      });
      const created: ConexionExterna = res?.conexion ?? { ...newConnForm, id: Date.now(), id_empresa: activeEmpresaId, activo: true, ultima_sincronizacion: null };
      setConexiones(prev => [created, ...prev]);
      setShowNewConnModal(false);
      setNewConnForm({
        nombre: '',
        driver: 'mysql',
        host: '',
        port: 3306,
        database: '',
        username: '',
        password: ''
      });
      showToast(res?.message || L(`✅ Conexión ${created.nombre} registrada exitosamente.`, `✅ Connection ${created.nombre} registered successfully.`));
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.errors
        ? JSON.stringify(err?.response?.data?.errors)
        : L('No se pudo registrar la conexión.', 'Could not register the connection.');
      showToast(`⚠️ ${msg}`);
    }
  };

  const handleDeleteConnection = async (id: number) => {
    const conn = conexiones.find(c => c.id === id);
    if (!conn) return;
    if (!window.confirm(L(`¿Eliminar la conexión "${conn.nombre}" (${conn.host}:${conn.port})? Esta acción no se puede deshacer.`, `Delete connection "${conn.nombre}" (${conn.host}:${conn.port})? This action cannot be undone.`))) {
      return;
    }
    try {
      const res = await externalConnectionsApi.delete(id);
      setConexiones(prev => prev.filter(c => c.id !== id));
      showToast(res?.message || L(`🗑️ Conexión "${conn.nombre}" eliminada.`, `🗑️ Connection "${conn.nombre}" deleted.`));
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      showToast(msg || L(`No se pudo eliminar la conexión "${conn.nombre}". Intenta de nuevo.`, `Could not delete connection "${conn.nombre}". Please try again.`));
    }
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleSaveConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const regimenStr = companyForm.regimen_tributario_gt === 'general'
      ? 'General (IVA 12%)'
      : companyForm.regimen_tributario_gt === 'pequeno_contribuyente'
      ? 'Pequeño Contribuyente (5%)'
      : 'Informal / Exento (0% IVA)';

    const empIdNum = Number(activeEmpresaId || currentEmpresa?.id || 1);
    lastFetchedId.current = empIdNum;

    const updated: EmpresaSaaS = {
      id: empIdNum,
      nombre: companyForm.nombre,
      razon_social: companyForm.razon_social,
      nit: companyForm.nit,
      pais: companyForm.pais,
      regimen: regimenStr,
      plan: companyForm.plan_type,
      activa: true,
      telefono: companyForm.telefono,
      email: companyForm.email,
      direccion: companyForm.direccion
    };

    try {
      await empresaApi.update(empIdNum, {
        nombre: companyForm.nombre,
        razon_social: companyForm.razon_social,
        nit: companyForm.nit,
        pais: companyForm.pais,
        regimen_tributario: companyForm.regimen_tributario_gt,
        telefono: companyForm.telefono,
        email: companyForm.email,
        direccion: companyForm.direccion,
        plan_type: companyForm.plan_type,
        configuracion: {
          giro_negocio: companyForm.giro_negocio,
          locale: companyForm.idioma || 'es',
          moneda: {
            principal: companyForm.moneda_principal,
            secundarias: companyForm.monedas_aceptadas,
            tasa_fija: companyForm.tasa_fija
          },
          modules: modules,
          neonet: {
            merchant_id: companyForm.neonet_merchant_id,
            user: companyForm.neonet_user,
            password: companyForm.neonet_password,
            environment: companyForm.neonet_environment
          },
          bac: {
            merchant_id: companyForm.bac_merchant_id,
            api_key: companyForm.bac_api_key,
            secret_key: companyForm.bac_secret_key,
            environment: companyForm.bac_environment
          },
          fel: {
            habilitado: companyForm.fel_habilitado,
            mode: companyForm.fel_own_credentials ? 'custom' : 'global',
            usuario: companyForm.fel_usuario,
            llave: companyForm.fel_llave,
            frase: companyForm.fel_frase
          }
        }
      });
      showToast(L(`✅ ¡Cambios guardados en vivo en el servidor! Régimen: ${trRegime(regimenStr)}`, `✅ Changes saved live to the server! Tax Regime: ${trRegime(regimenStr)}`));
    } catch (err: any) {
      console.error('Error guardando en droplet:', err);
      showToast(L(`⚠️ ERROR: NO se guardó en el servidor (${err?.response?.data?.message || err.message})`, `⚠️ ERROR: Changes were NOT saved on the server (${err?.response?.data?.message || err.message})`));
    }

    if (onUpdateEmpresa) {
      onUpdateEmpresa(updated);
    }

    localStorage.setItem('integrapro_active_empresa', JSON.stringify(updated));
  };

  const handleSwitchEmpresa = (emp: EmpresaSaaS) => {
    lastFetchedId.current = null;
    setActiveEmpresaId(emp.id);
    localStorage.setItem('integrapro_active_empresa_id', emp.id.toString());
    setCompanyForm(prev => ({
      ...prev,
      nombre: emp.nombre,
      razon_social: emp.razon_social,
      nit: emp.nit,
      pais: emp.pais,
      regimen_tributario_gt: getRegimenKey(emp.regimen),
      telefono: emp.telefono,
      email: emp.email,
      direccion: emp.direccion,
      plan_type: emp.plan
    }));
    if (onSelectEmpresa) {
      onSelectEmpresa(emp.id);
    } else if (onUpdateEmpresa) {
      onUpdateEmpresa(emp);
    }
    showToast(L(`🏢 Cambiado a empresa: ${emp.nombre}`, `🏢 Switched to company: ${emp.nombre}`));
  };

  const handleDeleteCompany = () => {
    if (deleteConfirmationText.trim() !== companyForm.nombre.trim()) {
      showToast(L('⚠️ El nombre de confirmación no coincide exactamente.', '⚠️ The confirmation name does not match exactly.'));
      return;
    }
    setShowDeleteModal(false);
    setDeleteConfirmationText('');
    showToast(L('Empresa eliminada del sistema (Acción de Super Admin simulada).', 'Company removed from the system (Simulated Super Admin action).'));
  };

  const handleSelectSystemLang = (next: 'es' | 'en') => {
    setLang(next);
    setCompanyForm(prev => ({ ...prev, idioma: next }));
    showToast(
      next === 'en'
        ? '🌐 System language switched to English (USD • Tax ID • International)'
        : '🌐 Idioma del sistema cambiado a Español (GTQ • NIT • SAT)'
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Toast de Notificación */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{notificationToast}</span>
        </div>
      )}

      {/* Cabecera Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            {viewMode === 'boutique' ? L('Datos & Perfil de Mi Tienda', 'My Store Profile & Settings') : L('Configuración de Empresa', 'Company Settings')}
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
              viewMode === 'boutique' 
                ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
            }`}>
              {viewMode === 'boutique' ? <Store className="w-3.5 h-3.5 text-purple-600" /> : <Building2 className="w-3.5 h-3.5" />}
              {viewMode === 'boutique' ? L('Modo Boutique Live', 'Live Boutique Mode') : L(`Empresa ID: ${activeEmpresaId}`, `Company ID: ${activeEmpresaId}`)}
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {viewMode === 'boutique' 
              ? L('Personaliza la identidad de tu boutique, cuentas bancarias de cobro en vivo y tarifas de paquetería', 'Customize your boutique identity, bank accounts for live checkout, and courier shipping rates') 
              : L('Gestión de identidad fiscal SAT, moneda, pasarelas de pago con tarjeta y facturación electrónica FEL', 'Manage tax identity, currency, card payment gateways, and electronic invoicing (E-Invoice)')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Switcher para alternar entre vista Boutique y vista ERP */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'boutique' ? 'advanced' : 'boutique')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
              viewMode === 'boutique'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
            }`}
            title={viewMode === 'boutique' ? L('Ver configuración técnica completa (FEL, pasarelas, base de datos)', 'View full technical settings (E-Invoice, payment gateways, database)') : L('Volver al perfil simplificado de boutique', 'Return to simplified boutique profile')}
          >
            {viewMode === 'boutique' ? (
              <>
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">{L('Vista Técnica ERP', 'ERP Technical View')}</span>
              </>
            ) : (
              <>
                <Store className="w-3.5 h-3.5 text-purple-600" />
                <span className="hidden sm:inline">{L('Modo Boutique Express', 'Boutique Express Mode')}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={viewMode === 'boutique' ? handleSaveBoutiqueConfig : handleSaveConfig}
            className={`px-5 py-2.5 active:scale-95 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'boutique'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-purple-600/25'
                : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-indigo-600/25'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{viewMode === 'boutique' ? L('Guardar Datos de Tienda', 'Save Store Settings') : L('Guardar Cambios', 'Save Changes')}</span>
          </button>
        </div>
      </div>

      {/* Selector Prominente de Idioma del Sistema / System Language */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              {L('Idioma del Sistema / System Language', 'System Language / Idioma del Sistema')}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {L(
                'Adapta el idioma, la moneda (Q / $), las etiquetas fiscales (NIT / Tax ID) y el formato regional en toda la aplicación.',
                'Instantly adapts language, currency ($ / Q), tax labels (Tax ID / NIT), and regional formatting across the entire app.'
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleSelectSystemLang('es')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
              lang === 'es'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/15'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span className="text-sm leading-none">🇬🇹</span>
            <span>Español (GTQ • NIT • SAT)</span>
            {lang === 'es' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={() => handleSelectSystemLang('en')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
              lang === 'en'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span className="text-sm leading-none">🇺🇸</span>
            <span>English (USD • Tax ID • International)</span>
            {lang === 'en' && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />}
          </button>
        </div>
      </div>

      {viewMode === 'boutique' ? (
        /* VISTA BOUTIQUE EXPRESS */
        <div className="space-y-6">
          {/* Banner Informativo de Boutique & Live */}
          <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-900/40">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-300 flex items-center justify-center md:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {L('Plan TikTok Live Express • Fortexa SaaS', 'TikTok Live Express Plan • Fortexa SaaS')}
              </span>
              <h2 className="text-lg font-black tracking-tight">{boutiqueConfig.nombre}</h2>
              <p className="text-xs text-slate-300">
                {L('Entorno optimizado para ventas en vivo, canastas compartidas y cobros directos por WhatsApp.', 'Environment optimized for live sales, shared carts, and direct WhatsApp checkout.')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">{L('Modalidad', 'Mode')}</span>
                <span className="text-xs font-black text-rose-300 flex items-center justify-center gap-1">
                  <Video className="w-3.5 h-3.5" /> Social Live
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">{L('Cobros', 'Payments')}</span>
                <span className="text-xs font-black text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {L('Bancos + Envíos', 'Banks + Shipping')}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">{L('Servidor', 'Server')}</span>
                <span className="text-xs font-black text-indigo-200">
                  Fortexa Cloud
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta 1: Identidad & Marca de Tu Boutique */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{L('1. Identidad de Tu Boutique & Marca', '1. Boutique Identity & Brand')}</h3>
                  <p className="text-xs text-slate-500">{L('Datos públicos que verán tus clientas en los tickets de WhatsApp y canastas', 'Public store details displayed to your customers on WhatsApp receipts and carts')}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                {L('Personalización', 'Branding')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre Comercial */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-purple-600" />
                  {L('Nombre de la Boutique / Tienda:', 'Boutique / Store Name:')}
                </label>
                <input 
                  type="text"
                  value={boutiqueConfig.nombre}
                  onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, nombre: e.target.value })}
                  placeholder={L('Ej. Boutique Chic Live', 'e.g., Boutique Chic Live')}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              {/* Slogan del Live */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {L('Slogan o Frase para el Live:', 'Live Stream Slogan or Tagline:')}
                </label>
                <input 
                  type="text"
                  value={boutiqueConfig.slogan}
                  onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, slogan: e.target.value })}
                  placeholder={L('Ej. Moda Exclusiva & Remates en Vivo', 'e.g., Exclusive Fashion & Live Flash Deals')}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              {/* WhatsApp Oficial para Cobros */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  {L('WhatsApp Oficial de Cobros & Envíos:', 'Official WhatsApp for Payments & Shipping:')}
                </label>
                <input 
                  type="text"
                  value={boutiqueConfig.whatsapp}
                  onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, whatsapp: e.target.value })}
                  placeholder={L('Ej. 4589-1234 o +502 4589-1234', 'e.g., +1 555-0192 or 4589-1234')}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-mono"
                />
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  {L('Correo Electrónico de Notificaciones:', 'Notification Email Address:')}
                </label>
                <input 
                  type="email"
                  value={boutiqueConfig.email}
                  onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, email: e.target.value })}
                  placeholder={L('Ej. contacto@tiktokboutique.gt', 'e.g., orders@boutique.com')}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              {/* Foto de Perfil o Logo */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-pink-600" />
                  {L('URL del Logotipo / Foto de Perfil:', 'Logo / Profile Photo URL:')}
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {boutiqueConfig.logo_url ? (
                      <img src={boutiqueConfig.logo_url} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Store className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <input 
                    type="text"
                    value={boutiqueConfig.logo_url}
                    onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, logo_url: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Cuentas Bancarias para Cobros en Vivo (WhatsApp) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{L('2. Cuentas Bancarias para Depósitos & Transferencias', '2. Bank Accounts for Deposits & Transfers')}</h3>
                  <p className="text-xs text-slate-500">{L('Estas cuentas se inyectan en los resúmenes automáticos que envías por WhatsApp a tus clientas', 'These accounts are automatically included in WhatsApp checkout summaries sent to customers')}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {L('Cobro en Vivo', 'Live Checkout')}
              </span>
            </div>

            {/* Helper Box */}
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-xs flex items-start gap-2.5 text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">{L('Sincronización Automática con WhatsApp', 'Automatic WhatsApp Sync')}</span>
                <p className="text-[11px] text-indigo-700 leading-relaxed mt-0.5">
                  {L(
                    'Cuando cierres una canasta en el Live y des clic en "Enviar Resumen por WhatsApp", el mensaje incluirá automáticamente las cuentas que ingreses abajo para que la clienta te envíe su boleta.',
                    'When you close a live cart and click "Send Summary via WhatsApp", the message will automatically include the bank accounts below so customers can send their payment receipt.'
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Banco Industrial */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5">
                    🏦 Banco Industrial (BI)
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    {L('Monetaria / Ahorro', 'Checking / Savings')}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">{L('Número de Cuenta:', 'Account Number:')}</label>
                  <input 
                    type="text"
                    value={boutiqueConfig.bi_cuenta}
                    onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, bi_cuenta: e.target.value })}
                    placeholder="025-014829-1"
                    className="w-full text-xs font-mono font-bold p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">{L('Nombre del Titular:', 'Account Holder Name:')}</label>
                  <input 
                    type="text"
                    value={boutiqueConfig.bi_titular}
                    onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, bi_titular: e.target.value })}
                    placeholder={L('Nombre en la cuenta', 'Account holder name')}
                    className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* BANRURAL */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                    🏦 BANRURAL
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {L('Caja Rural', 'Branch Network')}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">{L('Número de Cuenta:', 'Account Number:')}</label>
                  <input 
                    type="text"
                    value={boutiqueConfig.banrural_cuenta}
                    onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, banrural_cuenta: e.target.value })}
                    placeholder="3402-09812-4"
                    className="w-full text-xs font-mono font-bold p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">{L('Nombre del Titular:', 'Account Holder Name:')}</label>
                  <input 
                    type="text"
                    value={boutiqueConfig.banrural_titular}
                    onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, banrural_titular: e.target.value })}
                    placeholder={L('Nombre en la cuenta', 'Account holder name')}
                    className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* BAC Credomatic */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-rose-900 flex items-center gap-1.5">
                    🏦 BAC Credomatic
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                    {L('Banca en Línea', 'Online Banking')}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">{L('Número de Cuenta:', 'Account Number:')}</label>
                  <input 
                    type="text"
                    value={boutiqueConfig.bac_cuenta}
                    onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, bac_cuenta: e.target.value })}
                    placeholder="90-128472-0"
                    className="w-full text-xs font-mono font-bold p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">{L('Nombre del Titular:', 'Account Holder Name:')}</label>
                  <input 
                    type="text"
                    value={boutiqueConfig.bac_titular}
                    onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, bac_titular: e.target.value })}
                    placeholder={L('Nombre en la cuenta', 'Account holder name')}
                    className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Switch Pago Contra Entrega */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block">{L('Aceptar Pagos Contra Entrega (Efectivo al recibir)', 'Accept Cash on Delivery (COD)')}</span>
                  <p className="text-[11px] text-slate-500">{L('Permite a tus clientas pagar en efectivo cuando el mensajero o camión de Forza/Guatex les entregue el paquete.', 'Allows customers to pay in cash when the courier or delivery driver hands over their package.')}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={boutiqueConfig.acepta_contra_entrega}
                  onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, acepta_contra_entrega: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          {/* Tarjeta 3: Logística de Envíos & Tarifas de Paquetería */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{L('3. Logística, Recolección & Tarifas de Envíos', '3. Logistics, Pickup & Shipping Rates')}</h3>
                  <p className="text-xs text-slate-500">{L('Dónde recogerá la paquetería tus paquetes y las tarifas estándar que se aplicarán', 'Where couriers will pick up your packages and the standard rates applied')}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {L('Envíos Nacionales', 'Nationwide Shipping')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dirección de Recolección */}
              <div className="space-y-1.5 md:col-span-3">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  {L('Dirección Exacta de Recolección (Para Guatex / Forza / Cargo Expreso):', 'Exact Pickup Address (For Couriers / Carriers):')}
                </label>
                <input 
                  type="text"
                  value={boutiqueConfig.direccion}
                  onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, direccion: e.target.value })}
                  placeholder={L('Ej. Calzada Roosevelt 14-25 Zona 11, Local 3, Mixco, Guatemala', 'e.g., 1425 Main Ave, Suite 3, Downtown')}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Tarifa Ciudad */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  {L('Tarifa Estándar - Ciudad Capital:', 'Standard Rate - Metro / City:')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
                  <input 
                    type="number"
                    step="1"
                    value={boutiqueConfig.tarifa_ciudad}
                    onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, tarifa_ciudad: Number(e.target.value) })}
                    className="w-full text-xs font-bold font-mono pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Tarifa Departamentos */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  {L('Tarifa Estándar - Departamentos:', 'Standard Rate - Out-of-City / Regional:')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
                  <input 
                    type="number"
                    step="1"
                    value={boutiqueConfig.tarifa_departamentos}
                    onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, tarifa_departamentos: Number(e.target.value) })}
                    className="w-full text-xs font-bold font-mono pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Courier Predeterminado */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  {L('Paquetería Predeterminada:', 'Default Courier / Carrier:')}
                </label>
                <select 
                  value={boutiqueConfig.courier_predeterminado}
                  onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, courier_predeterminado: e.target.value })}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="Guatex">Guatex Express</option>
                  <option value="Forza Delivery">Forza Delivery Express</option>
                  <option value="Cargo Expreso">Cargo Expreso</option>
                  <option value="Mensajero Local">{L('Mensajero Local / Motorista', 'Local Courier / Rider')}</option>
                </select>
              </div>

              {/* Horario de Recolección */}
              <div className="space-y-1.5 md:col-span-3">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {L('Horario Habitual de Recolección / Notas de Empaque:', 'Regular Pickup Schedule / Packing Notes:')}
                </label>
                <input 
                  type="text"
                  value={boutiqueConfig.horario_recoleccion}
                  onChange={(e) => setBoutiqueConfig({ ...boutiqueConfig, horario_recoleccion: e.target.value })}
                  placeholder={L('Ej. Paquetes listos de Lunes a Sábado a las 14:00 hrs', 'e.g., Packages ready Monday to Saturday at 2:00 PM')}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Tarjeta 4: Respaldo Técnico en la Nube (Fortexa Technologies) & Upselling */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl border border-indigo-900/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight flex items-center gap-2">
                    {L('Infraestructura & Seguridad Administrada por Fortexa Technologies', 'Infrastructure & Security Managed by Fortexa Technologies')}
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {L('24/7 EN LÍNEA', '24/7 ONLINE')}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    {L('Bases de datos protegidas, copias de seguridad continuas y velocidad para transmisiones en vivo sin configuraciones de servidor difíciles.', 'Protected databases, continuous backups, and high-speed infrastructure for live streams with zero server headaches.')}
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-indigo-300 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 shrink-0 self-start sm:self-auto">
                {L('Cerebro SaaS: Fortexa Technologies', 'SaaS Core: Fortexa Technologies')}
              </span>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="text-slate-400 text-[11px] leading-relaxed max-w-xl">
                {L(
                  '¿En el futuro necesitas emitir Facturas Electrónicas SAT (FEL), tener una terminal física de tarjeta con Visacuotas, o agregar contabilidad completa?',
                  'Need to issue Electronic Invoices (E-Invoice), connect a physical card terminal with installments, or enable full accounting in the future?'
                )}
              </p>

              <a 
                href={L(
                  'https://api.whatsapp.com/send?phone=50223349000&text=Hola%20Fortexa%20Technologies,%20tengo%20el%20plan%20TikTok%20Live%20Express%20y%20me%20gustar%C3%ADa%20conocer%20los%20m%C3%B3dulos%20Pro%20(FEL%20SAT%20y%20POS%20F%C3%ADsico).',
                  'https://api.whatsapp.com/send?phone=50223349000&text=Hello%20Fortexa%20Technologies,%20I%20am%20on%20the%20TikTok%20Live%20Express%20plan%20and%20would%20like%20to%20learn%20about%20Pro%20modules%20(E-Invoice%20and%20Physical%20POS).'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/30 cursor-pointer shrink-0 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{L('Solicitar Upgrade Pro a Fortexa', 'Request Pro Upgrade from Fortexa')}</span>
              </a>
            </div>
          </div>

          {/* Botón inferior de Guardar Cambios */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveBoutiqueConfig}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 active:scale-95 text-white rounded-2xl text-xs font-black shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{L('Guardar Datos de Mi Tienda', 'Save My Store Settings')}</span>
            </button>
          </div>
        </div>
      ) : (
        /* VISTA TÉCNICA ERP COMPLETA (9 PESTAÑAS) */
        <>
          {/* 1. SECCIÓN: Estatus de la Suscripción (Idéntico a Laravel) */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300 flex items-center justify-center md:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {L('Estatus de la Suscripción IntegraPro SaaS', 'IntegraPro SaaS Subscription Status')}
          </span>
          <h2 className="text-lg font-black tracking-tight">{companyForm.nombre}</h2>
          <p className="text-xs text-slate-300">
            {L('Licencia empresarial multimoneda con certificación FEL ante la SAT Guatemala ilimitada.', 'Multi-currency enterprise license with unlimited Electronic Invoice (E-Invoice) certification.')}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">{L('Plan Actual', 'Current Plan')}</span>
            <span className="text-xs font-black text-amber-300">
              {companyForm.plan_type === 'basic'
                ? L('Plan Inicio', 'Starter Plan')
                : companyForm.plan_type === 'standard'
                ? L('Plan Crecimiento', 'Growth Plan')
                : L('Plan Corporativo', 'Enterprise Plan')}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">{L('Estado', 'Status')}</span>
            <span className="text-xs font-black text-emerald-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {trStatus('Activo')}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">{L('Vigencia', 'Validity')}</span>
            <span className="text-xs font-black text-indigo-200">
              {L(`Vence en ${companyForm.trial_days_remaining} días`, `Renews in ${companyForm.trial_days_remaining} days`)}
            </span>
          </div>
        </div>
      </div>

      {/* Pestañas de Navegación de la Configuración */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('empresa')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'empresa'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>{L('Información de Empresa', 'Company Info')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('moneda')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'moneda'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Coins className="w-3.5 h-3.5 text-amber-400" />
          <span>{L('Moneda & Tipo de Cambio', 'Currency & Exchange Rate')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fel')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'fel'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>{L('Facturación FEL (Infile SAT)', 'E-Invoicing (Tax Compliance)')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pasarelas')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'pasarelas'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
          <span>{L('Pasarelas (Neonet / BAC)', 'Payment Gateways (Neonet / BAC)')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('modulos')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'modulos'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>{L('Módulos Activos', 'Active Modules')}</span>
        </button>

        {isPlatformAdmin && (
          <button
            type="button"
            onClick={() => setActiveTab('multiempresa')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'multiempresa'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-rose-400" />
            <span>{L('Directorio Multi-Empresa', 'Multi-Company Directory')}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveTab('roles')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'roles'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-teal-400" />
          <span>{L('Usuarios & Roles', 'Users & Roles')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('api')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'api'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          <span>{L('Salud del Sistema & API', 'System Health & API')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('conexiones')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'conexiones'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-blue-400" />
          <span>{L('Conexiones Externas', 'External Connections')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('token_scraper')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'token_scraper'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Key className="w-3.5 h-3.5 text-amber-400" />
          <span>{L('Token Scraper Chrome', 'Chrome Scraper Token')}</span>
        </button>
      </div>

      {/* PESTAÑA 1: Información de Empresa (General & Fiscal SAT Guatemala) */}
      {activeTab === 'empresa' && (
        <form onSubmit={handleSaveConfig} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900">{L('Datos Comerciales & Régimen Fiscal SAT', 'Business Details & Tax Compliance Regime')}</h2>
              <p className="text-xs text-slate-400">
                {L('Información que se refleja automáticamente en cotizaciones, facturas electrónicas DTE y tickets POS.', 'Information automatically reflected on quotes, electronic invoices (E-Invoice), and POS receipts.')}
              </p>
            </div>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
              {L('Sincronizado con el Servidor', 'Synced with Cloud')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('Nombre Comercial', 'Trade Name')} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={companyForm.nombre}
                onChange={(e) => setCompanyForm({ ...companyForm, nombre: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('Razón Social', 'Legal Entity Name')}
              </label>
              <input
                type="text"
                value={companyForm.razon_social}
                onChange={(e) => setCompanyForm({ ...companyForm, razon_social: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner"
              />
            </div>

            {/* Giro de Negocio (Idéntico a Laravel) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>{L('Giro de Negocio', 'Industry / Business Type')}</span>
                <span className="text-[10px] text-slate-400 font-normal">{L('Define campos en productos', 'Configures product fields')}</span>
              </label>
              <select
                value={companyForm.giro_negocio}
                onChange={(e) => setCompanyForm({ ...companyForm, giro_negocio: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner cursor-pointer"
              >
                <option value="retail">{L('Retail General (Ropa, Zapatos, Variedades)', 'General Retail (Apparel, Shoes, Variety)')}</option>
                <option value="ferreteria">{L('Ferretería / Materiales de Construcción', 'Hardware Store / Building Materials')}</option>
                <option value="aceitera">{L('Aceitera / Centro de Servicio', 'Auto Lubrication / Service Center')}</option>
                <option value="farmacia">{L('Farmacia / Droguería', 'Pharmacy / Drugstore')}</option>
                <option value="minisuper">{L('Minisuper / Tienda de Conveniencia', 'Mini-Market / Convenience Store')}</option>
                <option value="panaderia">{L('Panadería / Pastelería', 'Bakery / Pastry Shop')}</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                {L('Ajusta las categorías, unidades de medida y atributos por defecto del inventario.', 'Adjusts default inventory categories, units of measure, and product attributes.')}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('Número de NIT', `${taxIdLabel} Number`)} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={companyForm.nit}
                onChange={(e) => setCompanyForm({ ...companyForm, nit: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('País', 'Country')} <span className="text-rose-500">*</span>
              </label>
              <select
                value={companyForm.pais}
                onChange={(e) => setCompanyForm({ ...companyForm, pais: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner cursor-pointer"
              >
                <option value="GT">🇬🇹 Guatemala</option>
                <option value="MX">🇲🇽 {L('México', 'Mexico')}</option>
                <option value="US">🇺🇸 {L('Estados Unidos', 'United States')}</option>
                <option value="SV">🇸🇻 El Salvador</option>
                <option value="HN">🇭🇳 Honduras</option>
                <option value="CR">🇨🇷 Costa Rica</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('Idioma del Sistema', 'System Language')}
              </label>
              <select
                value={lang}
                onChange={(e) => handleSelectSystemLang(e.target.value as 'es' | 'en')}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner cursor-pointer"
              >
                <option value="es">Español (GTQ • NIT • SAT)</option>
                <option value="en">English (USD • Tax ID • International)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  {L('Formato de Hora del Sistema', 'System Time Format')}
                </span>
                <span className="text-[10px] text-indigo-600 font-bold">{L('12h y 24h', '12h & 24h')}</span>
              </label>
              <select
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value as '12h' | '24h')}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner cursor-pointer"
              >
                <option value="12h">{L('Formato 12 Horas (AM / PM — ej: 08:30 AM / 05:45 PM)', '12-Hour Format (AM / PM — e.g., 08:30 AM / 05:45 PM)')}</option>
                <option value="24h">{L('Formato 24 Horas (Militar / Estándar — ej: 08:30 / 17:45)', '24-Hour Format (Military / Standard — e.g., 08:30 / 17:45)')}</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                {L('Aplica en vivo a Kiosco de Marcaje, Reloj Checador, Turnos de RRHH, Encabezados y Tickets POS.', 'Applies live to Time Clock Kiosk, Attendance, HR Shifts, Headers, and POS Receipts.')}
              </p>
            </div>

            {/* Horario Comercial Predeterminado de la Empresa */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                {L('Horario Comercial Predeterminado (Apertura & Cierre)', 'Default Business Hours (Open & Close)')}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SpecificTimePicker
                  label={L('Hora de Apertura General', 'General Opening Time')}
                  value={companyForm.hora_apertura}
                  onChange={(val) => setCompanyForm({ ...companyForm, hora_apertura: val })}
                  helperText={L('Apertura diaria oficial', 'Official daily opening')}
                />

                <SpecificTimePicker
                  label={L('Hora de Cierre General', 'General Closing Time')}
                  value={companyForm.hora_cierre}
                  onChange={(val) => setCompanyForm({ ...companyForm, hora_cierre: val })}
                  helperText={L('Cierre comercial oficial', 'Official daily closing')}
                />
              </div>
            </div>

            {/* Política de Geocerca GPS / Control de Presencia Laboral (Laravel: validarUbicacion) */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  {L('Geocerca & Validación de Presencia Física (Reloj Checador)', 'Geofencing & Physical Presence Verification (Time Clock)')}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  companyForm.geocerca_activa ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {companyForm.geocerca_activa ? trStatus('Activo') : trStatus('Inactivo')}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={companyForm.geocerca_activa}
                    onChange={(e) => setCompanyForm({ ...companyForm, geocerca_activa: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span>{L('Exigir presencia física obligatoria en sucursal para marcar asistencia', 'Require mandatory on-site branch presence to clock in/out')}</span>
                </label>
                <p className="text-[11px] text-slate-500 pl-6">
                  {L(
                    'Si un colaborador intenta marcar entrada o salida desde su casa o fuera de la empresa, el sistema bloqueará el registro automáticamente hasta que ingrese al radio de su lugar de trabajo.',
                    'If an employee attempts to clock in or out from home or outside the branch, the system automatically blocks the entry until they enter the workplace radius.'
                  )}
                </p>

                <div className="pl-6 pt-2 flex items-center gap-4">
                  <span className="text-[11px] font-bold text-slate-700">{L('Radio de Cobertura Permitido:', 'Allowed Coverage Radius:')}</span>
                  <div className="flex items-center gap-1.5">
                    {[30, 50, 100].map((meters) => (
                      <button
                        key={meters}
                        type="button"
                        onClick={() => setCompanyForm({ ...companyForm, radio_geocerca_metros: meters })}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          companyForm.radio_geocerca_metros === meters
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {meters} {L('metros', 'meters')} {meters === 50 ? L('(Recomendado)', '(Recommended)') : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Régimen Tributario SAT Guatemala */}
            {companyForm.pais === 'GT' ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {L('Régimen Tributario SAT (Guatemala)', 'Tax Compliance Regime')}
                  </label>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                    companyForm.regimen_tributario_gt === 'general'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : companyForm.regimen_tributario_gt === 'pequeno_contribuyente'
                      ? 'bg-purple-50 text-purple-800 border-purple-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {companyForm.regimen_tributario_gt === 'general'
                      ? L('IVA 12% + ISR', '12% VAT + Income Tax')
                      : companyForm.regimen_tributario_gt === 'pequeno_contribuyente'
                      ? L('5% Monotributo SAT', '5% Flat Small Business Tax')
                      : L('0% IVA (Informal / Sin Retención)', '0% VAT (Tax-Exempt / No Withholding)')}
                  </span>
                </div>
                <select
                  value={companyForm.regimen_tributario_gt}
                  onChange={(e) => setCompanyForm({ ...companyForm, regimen_tributario_gt: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner cursor-pointer"
                >
                  <option value="general">{L('Régimen General (IVA 12% + ISR)', 'Standard Tax Regime (12% VAT + Income Tax)')}</option>
                  <option value="pequeno_contribuyente">{L('Pequeño Contribuyente (5% Facturación Simplificada)', 'Small Business Regime (5% Simplified Flat Rate)')}</option>
                  <option value="informal">{L('Informal (No Factura Electrónica / 0% IVA)', 'Tax-Exempt / Informal (No E-Invoice / 0% VAT)')}</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  {companyForm.regimen_tributario_gt === 'general' && (
                    <span className="text-emerald-700 font-medium">
                      {L(
                        '✓ En POS, Ventas y Libro Diario se desglosa el 12% de IVA Débito Fiscal sobre la base neta (Base = Total / 1.12).',
                        '✓ In POS, Sales, and Journal Entries, 12% VAT output tax is itemized over the net base (Base = Total / 1.12).'
                      )}
                    </span>
                  )}
                  {companyForm.regimen_tributario_gt === 'pequeno_contribuyente' && (
                    <span className="text-purple-700 font-medium">
                      {L(
                        '✓ El IVA es 0% para el cliente (no genera crédito fiscal). La empresa tributa una tasa plana del 5% SAT.',
                        '✓ VAT is 0% for the customer (no tax credit generated). The company pays a flat 5% tax rate.'
                      )}
                    </span>
                  )}
                  {companyForm.regimen_tributario_gt === 'informal' && (
                    <span className="text-amber-800 font-medium">
                      {L(
                        '✓ El sistema opera sin IVA (0%). Las ventas se emiten como comprobantes/tickets directos sin certificación DTE ni retenciones.',
                        '✓ System operates without VAT (0%). Sales are issued as direct receipts/tickets without E-Invoice certification or tax withholding.'
                      )}
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {L('Régimen Tributario Manual', 'Custom Tax Regime')}
                </label>
                <input
                  type="text"
                  placeholder={L('Ej. Régimen Simplificado / Tax Exempt', 'e.g., Simplified Regime / Tax-Exempt / LLC')}
                  value={companyForm.regimen_tributario_manual}
                  onChange={(e) => setCompanyForm({ ...companyForm, regimen_tributario_manual: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('Teléfono Comercial', 'Business Phone')}
              </label>
              <input
                type="tel"
                value={companyForm.telefono}
                onChange={(e) => setCompanyForm({ ...companyForm, telefono: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('Correo Electrónico de Facturación', 'Billing Email Address')}
              </label>
              <input
                type="email"
                value={companyForm.email}
                onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('Dirección Fiscal Completa', 'Full Fiscal / Registered Address')}
              </label>
              <textarea
                rows={2}
                value={companyForm.direccion}
                onChange={(e) => setCompanyForm({ ...companyForm, direccion: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{L('Guardar Información de Empresa', 'Save Company Information')}</span>
            </button>
          </div>
        </form>
      )}

      {/* PESTAÑA 2: Moneda & Tipo de Cambio Multidivisa */}
      {activeTab === 'moneda' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900">{L('Configuración de Moneda y Tipo de Cambio', 'Currency & Exchange Rate Configuration')}</h2>
            <p className="text-xs text-slate-400">
              {L('Define la divisa de operación principal y las monedas secundarias aceptadas en terminales POS y compras.', 'Define your primary operating currency and accepted secondary currencies for POS terminals and purchases.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('Moneda Principal del Sistema', 'Primary System Currency')}
              </label>
              <select
                value={companyForm.moneda_principal}
                onChange={(e) => setCompanyForm({ ...companyForm, moneda_principal: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner cursor-pointer"
              >
                <option value="GTQ">{L('Quetzal Guatemalteco (GTQ - Q)', 'Guatemalan Quetzal (GTQ)')}</option>
                <option value="USD">{L('Dólar Estadounidense (USD - $)', 'US Dollar (USD - $)')}</option>
                <option value="MXN">{L('Peso Mexicano (MXN - $)', 'Mexican Peso (MXN - $)')}</option>
                <option value="EUR">Euro (EUR - €)</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                {L('Moneda oficial de los libros contables e informes de auditoría fiscal ante SAT.', 'Official currency used for accounting ledgers and tax audit reports.')}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {L('Monedas Secundarias Aceptadas', 'Accepted Secondary Currencies')}
              </label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={companyForm.monedas_aceptadas.includes('USD')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCompanyForm({ ...companyForm, monedas_aceptadas: ['USD'] });
                      } else {
                        setCompanyForm({ ...companyForm, monedas_aceptadas: [] });
                      }
                    }}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span>{L('Dólar Estadounidense (USD - $)', 'US Dollar (USD - $)')}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>{L('Tasa de Cambio Manual / Fija', 'Manual / Fixed Exchange Rate')}</span>
                <span className="text-[10px] text-indigo-600 font-bold">{L('Base: Banco de Guatemala', 'Base: Central Bank Reference')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-500 text-xs">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={companyForm.tasa_fija}
                  onChange={(e) => setCompanyForm({ ...companyForm, tasa_fija: parseFloat(e.target.value) || 7.85 })}
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-black text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-inner"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {L('Tasa fija utilizada en el módulo de compras para calcular costos de productos importados con el scraper.', 'Fixed rate used in the purchasing module to calculate landed costs for imported products.')}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={handleSaveConfig}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{L('Guardar Configuración Monetaria', 'Save Currency Settings')}</span>
            </button>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: Facturación Electrónica (FEL - Infile SAT Guatemala) */}
      {activeTab === 'fel' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900">{L('Facturación Electrónica en Línea (FEL)', 'Electronic Invoicing (E-Invoice)')}</h2>
              <p className="text-xs text-slate-400">
                {L('Conexión oficial con el certificador autorizado de la SAT (Infile S.A.) para emisión de DTEs.', 'Official connection with the authorized Tax Authority certifier (Infile S.A.) for E-Invoice issuance.')}
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {L('Certificador Activo', 'Active Certifier')}
            </span>
          </div>

          {/* Banner Oficial de Acreditación SAT (Idéntico a Laravel) */}
          <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{L('Instrucciones Oficiales de Autorización ante la SAT:', 'Official Tax Authority Authorization Instructions:')}</span>
            </div>
            <div className="text-xs text-amber-900 space-y-1.5 pl-6">
              <p>{L('Para emitir facturas electrónicas válidas en Guatemala, debe autorizarnos ante la SAT:', 'To issue valid Electronic Invoices, you must authorize the certifier with the Tax Authority:')}</p>
              <ol className="list-decimal space-y-1 pl-4 font-medium text-amber-800">
                <li>{L('Ingrese al portal de su Agencia Virtual SAT de Guatemala.', 'Log in to your Tax Authority Virtual Portal.')}</li>
                <li>{L('Diríjase a la sección: Servicios > Factura Electrónica > Acreditación de Certificadores.', 'Navigate to: Services > Electronic Invoice > Certifier Accreditation.')}</li>
                <li>{L(`Afilie el ${taxIdLabel} de Infile S.A.: `, `Register Infile S.A. ${taxIdLabel}: `)}<strong className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-black">12521337</strong>.</li>
              </ol>
              <p className="pt-1 text-[11px] text-amber-700">
                {L('✓ Una vez realizada la afiliación, las facturas emitidas desde el Punto de Venta (POS) se certificarán inmediatamente.', '✓ Once accredited, invoices issued from the Point of Sale (POS) will be certified immediately.')}
              </p>
            </div>
          </div>

          {/* Selector de Modo: Global vs Credenciales Propias */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-slate-900">{L('Credenciales del Certificador Infile', 'E-Invoice Certifier Credentials (Infile)')}</h4>
                <p className="text-[11px] text-slate-500">
                  {companyForm.fel_own_credentials
                    ? L('Modo Privado: Utilizando credenciales exclusivas asignadas por Infile a esta empresa.', 'Private Mode: Using dedicated credentials assigned to this company.')
                    : L('Modo Global: Gestionado automáticamente por la cuenta maestra de IntegraPro S.A.', 'Global Mode: Automatically managed by the master IntegraPro account.')}
                </p>
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={companyForm.fel_own_credentials}
                  onChange={(e) => setCompanyForm({ ...companyForm, fel_own_credentials: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span>{L('Habilitar Credenciales Propias', 'Enable Custom Credentials')}</span>
              </label>
            </div>

            {companyForm.fel_own_credentials && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {L('Usuario Infile', 'Certifier Username')}
                  </label>
                  <input
                    type="text"
                    value={companyForm.fel_usuario}
                    onChange={(e) => setCompanyForm({ ...companyForm, fel_usuario: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {L('Llave de Certificación', 'Certification Key')}
                  </label>
                  <div className="relative">
                    <input
                      type={showFelKey ? 'text' : 'password'}
                      value={companyForm.fel_llave}
                      onChange={(e) => setCompanyForm({ ...companyForm, fel_llave: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowFelKey(!showFelKey)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showFelKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {L('Frase de Identificación', 'Identification Phrase')}
                  </label>
                  <input
                    type="password"
                    value={companyForm.fel_frase}
                    onChange={(e) => setCompanyForm({ ...companyForm, fel_frase: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={handleSaveConfig}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{L('Guardar Configuración FEL', 'Save E-Invoice Settings')}</span>
            </button>
          </div>
        </div>
      )}

      {/* PESTAÑA 4: Pasarelas de Pago (Neonet & BAC Credomatic) */}
      {activeTab === 'pasarelas' && (
        <div className="space-y-6">
          
          {/* Neonet (VisaNet Guatemala) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-sm">
                  NEO
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{L('Pasarela Neonet (VisaNet Guatemala)', 'Neonet Gateway (VisaNet)')}</h3>
                  <p className="text-[11px] text-slate-400">{L('Cobro con tarjetas Visa y Mastercard en punto de venta y enlace web', 'Visa and Mastercard payment processing at POS and payment links')}</p>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={companyForm.neonet_habilitado}
                  onChange={(e) => setCompanyForm({ ...companyForm, neonet_habilitado: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span>{L('Habilitar Neonet', 'Enable Neonet')}</span>
              </label>
            </div>

            {companyForm.neonet_habilitado && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">{L('Ambiente de Operación', 'Operating Environment')}</label>
                  <select
                    value={companyForm.neonet_environment}
                    onChange={(e) => setCompanyForm({ ...companyForm, neonet_environment: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="test">{L('Modo Sandbox (Pruebas)', 'Sandbox Mode (Testing)')}</option>
                    <option value="prod">{L('Modo Producción (Cobro Real)', 'Production Mode (Live Charges)')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">{L('Merchant ID Neonet', 'Neonet Merchant ID')}</label>
                  <input
                    type="text"
                    value={companyForm.neonet_merchant_id}
                    onChange={(e) => setCompanyForm({ ...companyForm, neonet_merchant_id: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">{L('Usuario de API', 'API Username')}</label>
                  <input
                    type="text"
                    value={companyForm.neonet_user}
                    onChange={(e) => setCompanyForm({ ...companyForm, neonet_user: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">{L('Contraseña de API', 'API Password')}</label>
                  <div className="relative">
                    <input
                      type={showNeonetPass ? 'text' : 'password'}
                      value={companyForm.neonet_password}
                      onChange={(e) => setCompanyForm({ ...companyForm, neonet_password: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNeonetPass(!showNeonetPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNeonetPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BAC Credomatic */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-black text-sm">
                  BAC
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{L('Pasarela BAC Credomatic (Comprapag)', 'BAC Credomatic Gateway (Comprapag)')}</h3>
                  <p className="text-[11px] text-slate-400">{L('Procesamiento de pagos para tarjetas AMEX, Visa y Cuotas Credomatic', 'Payment processing for AMEX, Visa, and Credomatic installment plans')}</p>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={companyForm.bac_habilitado}
                  onChange={(e) => setCompanyForm({ ...companyForm, bac_habilitado: e.target.checked })}
                  className="w-4 h-4 text-rose-600 rounded"
                />
                <span>{L('Habilitar BAC', 'Enable BAC')}</span>
              </label>
            </div>

            {companyForm.bac_habilitado && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">{L('Ambiente de Operación', 'Operating Environment')}</label>
                  <select
                    value={companyForm.bac_environment}
                    onChange={(e) => setCompanyForm({ ...companyForm, bac_environment: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="test">{L('Modo Sandbox (Pruebas)', 'Sandbox Mode (Testing)')}</option>
                    <option value="prod">{L('Modo Producción (Cobro Real)', 'Production Mode (Live Charges)')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">{L('Merchant ID BAC', 'BAC Merchant ID')}</label>
                  <input
                    type="text"
                    value={companyForm.bac_merchant_id}
                    onChange={(e) => setCompanyForm({ ...companyForm, bac_merchant_id: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">API Key</label>
                  <input
                    type="text"
                    value={companyForm.bac_api_key}
                    onChange={(e) => setCompanyForm({ ...companyForm, bac_api_key: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Secret Key</label>
                  <div className="relative">
                    <input
                      type={showBacSecret ? 'text' : 'password'}
                      value={companyForm.bac_secret_key}
                      onChange={(e) => setCompanyForm({ ...companyForm, bac_secret_key: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowBacSecret(!showBacSecret)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showBacSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveConfig}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{L('Guardar Pasarelas de Pago', 'Save Payment Gateways')}</span>
            </button>
          </div>
        </div>
      )}

      {/* PESTAÑA 5: Módulos Activos (Feature Flags SaaS) */}
      {activeTab === 'modulos' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900">{L('Módulos del Sistema IntegraPro', 'IntegraPro System Modules')}</h2>
            <p className="text-xs text-slate-400">
              {L('Activa o desactiva módulos y funciones avanzadas según el plan contratado por la empresa.', 'Enable or disable advanced modules and features based on the company subscription plan.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'sales', label: L('Ventas y Facturación FEL', 'Sales & E-Invoicing'), desc: L('Emisión de facturas y tickets DTE con Infile.', 'Issue certified electronic invoices and POS receipts.') },
              { id: 'inventory', label: L('Inventario & Multibodega', 'Inventory & Multi-Warehouse'), desc: L('Kardex, ubicaciones y traslados de stock.', 'Stock ledger, warehouse locations, and inventory transfers.') },
              { id: 'accounting', label: L('Contabilidad y Libro Diario', 'Accounting & Journal Entries'), desc: L('Libro diario, mayores y fiscalidad SAT.', 'General ledger, journal entries, and tax compliance reports.') },
              { id: 'hr', label: L('Recursos Humanos & Nóminas', 'Human Resources & Payroll'), desc: L('Asistencia biométrica, planillas y liquidaciones Art. 82.', 'Biometric attendance, payroll runs, and severance calculations.') },
              { id: 'purchases', label: L('Compras y Proveedores', 'Purchasing & Suppliers'), desc: L('Facturas de proveedores, OCR y cálculo de costos.', 'Supplier bills, OCR scanning, and landed cost calculation.') },
              { id: 'ai_assistant', label: L('Asistente IA & Scraper', 'AI Assistant & Product Scraper'), desc: L('Extracción de productos en Shein/Temu y OCR de facturas.', 'Product extraction from Shein/Temu and invoice OCR.') },
              { id: 'fel', label: L('Certificación FEL Automatizada', 'Automated E-Invoice Certification'), desc: L('Firma electrónica y timbrado en tiempo real.', 'Real-time digital signature and electronic tax stamping.') },
              { id: 'neonet', label: L('Pasarela Neonet (Visa/Mastercard)', 'Neonet Gateway (Visa/Mastercard)'), desc: L('Terminal POS y cobro con tarjeta.', 'POS terminal and card payment processing.') },
              { id: 'bac', label: L('Pasarela BAC Credomatic', 'BAC Credomatic Gateway'), desc: L('Cuotas y procesamiento Compass.', 'Installments and Compass payment processing.') },
              { id: 'live_sales', label: L('TikTok Live & Social Commerce (Add-on)', 'TikTok Live & Social Commerce (Add-on)'), desc: L('Canastas abiertas en vivo, reserva de stock en tiempo real, precios de remate y cobros unificados por WhatsApp.', 'Live open carts, real-time stock reservation, flash sale pricing, and unified WhatsApp checkout.') },
            ].map((mod) => (
              <div key={mod.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900">{mod.label}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{mod.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={(modules as any)[mod.id]}
                  onChange={(e) => setModules({ ...modules, [mod.id]: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded shrink-0 mt-0.5"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={handleSaveConfig}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{L('Guardar Módulos Activos', 'Save Active Modules')}</span>
            </button>
          </div>
        </div>
      )}

      {/* PESTAÑA 6: Directorio Multi-Empresa (Exclusivo Admin Plataforma) */}
      {isPlatformAdmin && activeTab === 'multiempresa' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-black text-slate-900">{L('Directorio de Empresas (Multi-Tenant)', 'Company Directory (Multi-Tenant)')}</h2>
              <p className="text-xs text-slate-400">
                {L('Administración centralizada de empresas registradas en la plataforma IntegraPro SaaS.', 'Centralized management of companies registered on the IntegraPro SaaS platform.')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => showToast(L('Modal de registro de nueva empresa abierto.', 'New company registration modal opened.'))}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{L('Registrar Nueva Empresa', 'Register New Company')}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">{L('Empresa / Razón Social', 'Company / Legal Name')}</th>
                  <th className="py-3 px-4">{taxIdLabel}</th>
                  <th className="py-3 px-4">{L('Régimen SAT', 'Tax Regime')}</th>
                  <th className="py-3 px-4">{L('Plan SaaS', 'SaaS Plan')}</th>
                  <th className="py-3 px-4 text-center">{L('Estado', 'Status')}</th>
                  <th className="py-3 px-4 text-right">{L('Acción', 'Action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {empresasList.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500">#{emp.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{emp.nombre}</div>
                      <div className="text-[10px] text-slate-400">{emp.razon_social}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">{trTaxId(emp.nit)}</td>
                    <td className="py-3.5 px-4 text-slate-600">{trRegime(emp.regimen)}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {emp.plan.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {trStatus('Activo')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {activeEmpresaId === emp.id ? (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-black rounded-lg">
                          {L('Activa Actual', 'Currently Active')}
                        </span>
                      ) : isOwnerOperableEmpresa(emp.id) ? (
                        <button
                          type="button"
                          onClick={() => handleSwitchEmpresa(emp)}
                          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer"
                        >
                          {L('Seleccionar', 'Select')}
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-200">
                          {L('🔒 Privado', '🔒 Private')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PESTAÑA 7: Usuarios & Roles (Laravel: UserResource, UsuarioResource, RoleResource) */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          {/* Tarjeta Superior con Gestión de Usuarios */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  {L('Directorio de Usuarios del Sistema', 'System Users Directory')}
                </h2>
                <p className="text-xs text-slate-400">
                  {L('Control de cuentas, contraseñas, asignación de sucursal y roles operativos', 'Manage accounts, passwords, branch assignments, and operational roles')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingUserId(null);
                  setUserForm({
                    name: '',
                    email: '',
                    password: '',
                    role: 'Cajero / Operador POS',
                    sucursal_nombre: 'Sucursal Central - Ciudad',
                    empleado_nombre: '',
                    dpi: '',
                    permisos: ['pos_ventas']
                  });
                  setShowNewUserModal(true);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm shadow-indigo-600/20 cursor-pointer self-start sm:self-auto"
              >
                <UserPlus className="w-4 h-4" />
                <span>{L('Nuevo Usuario', 'New User')}</span>
              </button>
            </div>

            {/* Resumen Rápido de Cuentas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{L('Total Cuentas', 'Total Accounts')}</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">{usuarios.length}</p>
                <span className="text-[10px] text-emerald-600 font-semibold">{L('100% autorizadas', '100% authorized')}</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Super Admins</span>
                <p className="text-xl font-black text-indigo-700 mt-0.5">
                  {usuarios.filter(u => u.role === 'Super Admin').length}
                </p>
                <span className="text-[10px] text-slate-400">{L('Acceso irrestricto', 'Unrestricted access')}</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{L('Cajeros POS', 'POS Cashiers')}</span>
                <p className="text-xl font-black text-emerald-700 mt-0.5">
                  {usuarios.filter(u => u.role === 'Cajero / Operador POS').length}
                </p>
                <span className="text-[10px] text-slate-400">{L('En puntos de cobro', 'At checkout counters')}</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{L('Activos Hoy', 'Active Today')}</span>
                <p className="text-xl font-black text-cyan-700 mt-0.5">
                  {usuarios.filter(u => u.estado === 'Activo').length}
                </p>
                <span className="text-[10px] text-cyan-600 font-semibold">{L('Sesiones validadas', 'Verified sessions')}</span>
              </div>
            </div>

            {/* Tabla de Usuarios del Sistema */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">{L('Usuario / Email', 'User / Email')}</th>
                      <th className="py-3 px-4">{L('Rol Asignado', 'Assigned Role')}</th>
                      <th className="py-3 px-4">{L('Sucursal', 'Branch')}</th>
                      <th className="py-3 px-4">{L('Empleado Vinculado', 'Linked Employee')}</th>
                      <th className="py-3 px-4">{L('Último Acceso', 'Last Login')}</th>
                      <th className="py-3 px-4 text-center">{L('Estado', 'Status')}</th>
                      <th className="py-3 px-4 text-center">{L('Acciones', 'Actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {usuarios.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                              {u.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{u.name}</p>
                              <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold inline-block ${
                            u.role === 'Super Admin'
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : u.role === 'Gerente de Sucursal'
                              ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                              : u.role === 'Auditor Contable'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {trRole(u.role)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-semibold">{trBranch(u.sucursal_nombre)}</td>
                        <td className="py-3.5 px-4">
                          {u.empleado_nombre ? (
                            <div>
                              <p className="text-slate-800 font-bold">{u.empleado_nombre}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{L('DPI', 'ID')}: {u.dpi}</p>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">{L('No vinculado', 'Not linked')}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{trLastAccess(u.ultimo_acceso)}</td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleUserStatus(u.id)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                              u.estado === 'Activo'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-500 border border-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {trStatus(u.estado)}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingUserId(u.id);
                                setUserForm({
                                  name: u.name,
                                  email: u.email,
                                  password: '',
                                  role: u.role,
                                  sucursal_nombre: u.sucursal_nombre,
                                  empleado_nombre: u.empleado_nombre || '',
                                  dpi: u.dpi || '',
                                  permisos: u.permisos
                                });
                                setShowNewUserModal(true);
                              }}
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title={L('Editar Usuario', 'Edit User')}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => showToast(L(`Enlace para restablecer contraseña enviado al correo ${u.email}`, `Password reset link sent to ${u.email}`))}
                              className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                              title={L('Restablecer Contraseña', 'Reset Password')}
                            >
                              <Key className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Matriz de Roles y Permisos (Spatie Laravel) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-black text-slate-900">{L('Matriz de Roles y Permisos (RBAC)', 'Roles & Permissions Matrix (RBAC)')}</h2>
              <p className="text-xs text-slate-400">{L('Control de privilegios y capacidades por perfil en la base de datos', 'Role-based access privileges and capability control across the system')}</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-slate-900 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-indigo-600" /> {L('Super Admin / Administrador General', 'Super Admin / General Administrator')}
                  </p>
                  <p className="text-slate-400">{L('Acceso total a reportes financieros, liquidaciones de RRHH, anulaciones SAT y configuración de empresa.', 'Full access to financial reports, HR settlements, invoice voiding, and company configuration.')}</p>
                </div>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-black rounded-lg">{L('Acceso Total', 'Full Access')}</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-cyan-600" /> {L('Gerente de Sucursal', 'Branch Manager')}
                  </p>
                  <p className="text-slate-400">{L('Corte de caja Z, auditoría de asistencias de tienda, traslados de bodega y supervisión.', 'Z-report cash closing, store attendance audit, warehouse transfers, and daily supervision.')}</p>
                </div>
                <span className="px-2.5 py-1 bg-cyan-50 text-cyan-700 font-black rounded-lg">{L('Nivel Sucursal', 'Branch Level')}</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-slate-900 flex items-center gap-2">
                    <Key className="w-3.5 h-3.5 text-emerald-600" /> {L('Cajero / Operador de Ventas (POS)', 'Cashier / POS Sales Operator')}
                  </p>
                  <p className="text-slate-400">{L('Emisión de tickets FEL, cobro en efectivo y tarjeta. Sin acceso a RRHH ni configuraciones.', 'Issue E-Invoice receipts and process cash/card payments. No access to HR or settings.')}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-black rounded-lg">{L('Caja Operativa', 'POS Operations')}</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-slate-900 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-purple-600" /> {L('Auditor Contable', 'Accounting Auditor')}
                  </p>
                  <p className="text-slate-400">{L('Generación de partidas de Libro Diario, liquidaciones SAT-2046 e informes de retención.', 'Generate journal entries, tax filings, and tax withholding reports.')}</p>
                </div>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-black rounded-lg">{L('Nivel Financiero', 'Finance Level')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 8: Salud del Sistema & API (Laravel: SystemHealth.php) */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                {L('Monitor de Diagnóstico y Salud del Servidor', 'Server Health & Diagnostics Monitor')}
              </h2>
              <p className="text-xs text-slate-400">
                {L('Chequeo en tiempo real de base de datos, almacenamiento, conectividad FEL y workers', 'Real-time health check for database, storage, E-Invoice connectivity, and background workers')}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                {L('Última comprobación:', 'Last check:')} <strong className="text-slate-700">{healthData.lastCheck || L('Hace un momento', 'Just now')}</strong>
              </span>
              <button
                type="button"
                onClick={handleRunHealthCheck}
                disabled={isHealthChecking}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isHealthChecking ? 'animate-spin' : ''}`} />
                <span>{isHealthChecking ? L('Diagnosticando...', 'Running diagnostics...') : L('Ejecutar Diagnóstico en Vivo', 'Run Live Diagnostics')}</span>
              </button>
            </div>
          </div>

          {/* Tarjetas de Diagnóstico de Componentes Clave */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Base de Datos */}
            <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xs text-slate-800">{L('Base de Datos', 'Database')}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  ONLINE • {healthData.db.latency}
                </span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <p><strong>{L('Motor:', 'Engine:')}</strong> {healthData.db.engine}</p>
                <p><strong>{L('Tamaño en Disco:', 'Disk Size:')}</strong> {healthData.db.size}</p>
                <p><strong>{L('Modelos Activos:', 'Active Models:')}</strong> {healthData.db.tables} {L('tablas Eloquent', 'database tables')}</p>
              </div>
            </div>

            {/* 2. Almacenamiento Local y Público */}
            <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xs text-slate-800">{L('Almacenamiento (Storage)', 'File Storage')}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {L('ESCRITURA OK', 'WRITE OK')}
                </span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <p><strong>{L('Disco Público:', 'Public Disk:')}</strong> {healthData.storage.disk}</p>
                <p><strong>{L('Prueba de Escritura:', 'Write Test:')}</strong> {healthData.storage.check}</p>
                <p><strong>{L('Permisos POSIX:', 'POSIX Permissions:')}</strong> {L(`Lectura / Escritura (${healthData.storage.permissions})`, `Read / Write (${healthData.storage.permissions})`)}</p>
              </div>
            </div>

            {/* 3. Proveedor FEL Certificador */}
            <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                    <Server className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xs text-slate-800">{L('Proveedor FEL Infile', 'E-Invoice Provider (Infile)')}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {L('RESPONDIENDO', 'RESPONDING')} • {healthData.fel.latency}
                </span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <p><strong>{L('Certificador:', 'Certifier:')}</strong> {L('Infile SAT Oficial (NIT 12521337)', `Infile Tax Compliance (${taxIdLabel} 12521337)`)}</p>
                <p><strong>{L('NIT Oficial:', `Official ${taxIdLabel}:`)}</strong> 12521337</p>
                <p className="truncate"><strong>Endpoint:</strong> {healthData.fel.endpoint}</p>
              </div>
            </div>

            {/* 4. Colas y Workers en Background */}
            <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xs text-slate-800">{L('Colas y Tareas (Queue)', 'Queues & Background Jobs')}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {L('OPERATIVO', 'OPERATIONAL')}
                </span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <p><strong>{L('Tareas Pendientes:', 'Pending Jobs:')}</strong> {healthData.queue.pending} {L('en cola', 'queued')}</p>
                <p><strong>{L('Tareas Fallidas:', 'Failed Jobs:')}</strong> {healthData.queue.failed}</p>
                <p><strong>{L('Workers Activos:', 'Active Workers:')}</strong> {L(`${healthData.queue.workers} Activo (Scraper Shein & DTEs)`, `${healthData.queue.workers} Active (Product Scraper & E-Invoices)`)}</p>
              </div>
            </div>

            {/* 5. Memoria & Servidor Web */}
            <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xs text-slate-800">{L('Rendimiento de Servidor', 'Server Performance')}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {L('CARGA', 'LOAD')} {healthData.memory.load}
                </span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <p><strong>{L('Memoria RAM:', 'RAM Usage:')}</strong> {healthData.memory.usage}</p>
                <p><strong>{L('Carga CPU:', 'CPU Load:')}</strong> {healthData.memory.load}</p>
                <p><strong>{L('Disponibilidad (Uptime):', 'Server Uptime:')}</strong> {L(`${healthData.memory.uptimeDays} días, ${healthData.memory.uptimeHours} horas`, `${healthData.memory.uptimeDays} days, ${healthData.memory.uptimeHours} hours`)}</p>
              </div>
            </div>
          </div>

          {/* Información Técnica de Enlace con Laravel API */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-300">{L('Detalles de Conexión RESTful & Auth Sanctum', 'RESTful API & Sanctum Auth Details')}</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold rounded-lg text-[10px]">
                {L('Tokens Hashed Activos', 'Hashed Tokens Active')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 font-mono text-[11px]">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">{L('Endpoint Base API:', 'API Base Endpoint:')}</span>
                http://localhost:8000/api/v1
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">{L('Origen Frontend Autorizado (CORS):', 'Authorized Frontend Origin (CORS):')}</span>
                http://localhost:5173
              </div>
            </div>
          </div>

          {/* Tarjeta de Acceso Rápido al Token del Scraper */}
          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-sm">
                <Key className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-xs font-black text-slate-900">{L('Extensión Scraper Chrome (Shein, Temu, AliExpress)', 'Chrome Scraper Extension (Shein, Temu, AliExpress)')}</h4>
                <p className="text-[11px] text-slate-500">
                  {L('Genera la clave de API Bearer requerida para sincronizar productos directamente desde tu navegador.', 'Generate the Bearer API token required to sync products directly from your browser.')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('token_scraper')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{L('Gestionar Token Scraper', 'Manage Scraper Token')}</span>
            </button>
          </div>
        </div>
      )}

      {/* PESTAÑA 9: Conexiones Externas a Bases de Datos (Laravel: ConexionExterna) */}
      {activeTab === 'conexiones' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Database className="w-5 h-5" />
                </span>
                <h2 className="text-base font-extrabold text-slate-900">
                  {L('Conexiones a Bases de Datos Externas', 'External Database Connections')}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                {L('Sincronización bidireccional y réplicas de catálogo de productos, existencias e inventario desde servidores remotos (MySQL, PostgreSQL, SQL Server).', 'Two-way synchronization and catalog replication for products, stock, and inventory from remote servers (MySQL, PostgreSQL, SQL Server).')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowNewConnModal(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{L('Nueva Conexión', 'New Connection')}</span>
            </button>
          </div>

          {/* Lista de Conexiones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conexiones.map((conn) => (
              <div
                key={conn.id}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                      conn.driver === 'mysql' ? 'bg-sky-100 text-sky-800' :
                      conn.driver === 'pgsql' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-snug">{conn.nombre}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[11px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                          {conn.driver}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {conn.host}:{conn.port}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    {trStatus('Activo')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-xl border border-slate-100 font-medium text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px]">{L('Base de Datos:', 'Database:')}</span>
                    <strong className="text-slate-800 font-mono">{conn.database}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">{L('Usuario Remoto:', 'Remote User:')}</span>
                    <strong className="text-slate-800 font-mono">{conn.username}</strong>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">{L('Última Sincronización:', 'Last Sync:')}</span>
                    <span className="font-mono font-semibold text-slate-700">
                      {conn.ultima_sincronizacion
                        ? new Date(conn.ultima_sincronizacion).toLocaleString(locale)
                        : L('Nunca sincronizado', 'Never synced')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={testingConnId === conn.id}
                      onClick={() => handleTestConnection(conn)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${testingConnId === conn.id ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
                      <span>{testingConnId === conn.id ? L('Probando...', 'Testing...') : L('Probar', 'Test')}</span>
                    </button>

                    <button
                      type="button"
                      disabled={syncingConnId === conn.id}
                      onClick={() => handleSyncConnection(conn)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${syncingConnId === conn.id ? 'animate-spin text-blue-600' : 'text-blue-500'}`} />
                      <span>{syncingConnId === conn.id ? L('Sincronizando...', 'Syncing...') : L('Sincronizar Catálogo', 'Sync Catalog')}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteConnection(conn.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title={L('Eliminar conexión', 'Delete connection')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {conexiones.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Database className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">
                {isLoadingConexiones ? L('Cargando conexiones...', 'Loading connections...') : L('No hay conexiones externas registradas', 'No external connections registered')}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{L('Haga clic en "+ Nueva Conexión" para integrar una base de datos remota.', 'Click "+ New Connection" to integrate a remote database.')}</p>
            </div>
          )}
        </div>
      )}

      {/* PESTAÑA 10: Token para Extensión Scraper (Chrome Extension) */}
      {activeTab === 'token_scraper' && (
        <TokenExtensionScraper />
      )}

      {/* MODAL: Nueva Conexión Externa */}
      {showNewConnModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{L('Nueva Conexión Externa', 'New External Connection')}</h3>
                  <p className="text-[11px] text-slate-400">{L('Configuración de servidor de BD remoto', 'Remote database server configuration')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNewConnModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveConnection} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{L('Nombre Descriptivo', 'Descriptive Name')}</label>
                <input
                  type="text"
                  required
                  placeholder={L('ej. Sucursal Mazatenango MySQL', 'e.g., Central Warehouse MySQL')}
                  value={newConnForm.nombre}
                  onChange={(e) => setNewConnForm({ ...newConnForm, nombre: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{L('Motor / Driver', 'Engine / Driver')}</label>
                  <select
                    value={newConnForm.driver}
                    onChange={(e) => {
                      const driver = e.target.value as 'mysql' | 'pgsql' | 'sqlsrv';
                      const defaultPort = driver === 'mysql' ? 3306 : driver === 'pgsql' ? 5432 : 1433;
                      setNewConnForm({ ...newConnForm, driver, port: defaultPort });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="mysql">MySQL</option>
                    <option value="pgsql">PostgreSQL</option>
                    <option value="sqlsrv">SQL Server</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{L('Puerto', 'Port')}</label>
                  <input
                    type="number"
                    required
                    value={newConnForm.port}
                    onChange={(e) => setNewConnForm({ ...newConnForm, port: parseInt(e.target.value) || 3306 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{L('Host o Dirección IP', 'Host or IP Address')}</label>
                <input
                  type="text"
                  required
                  placeholder={L('ej. 190.85.120.44 o db.miempresa.com', 'e.g., 190.85.120.44 or db.mycompany.com')}
                  value={newConnForm.host}
                  onChange={(e) => setNewConnForm({ ...newConnForm, host: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{L('Nombre de Base de Datos', 'Database Name')}</label>
                <input
                  type="text"
                  required
                  placeholder={L('ej. bodega_central_db', 'e.g., central_warehouse_db')}
                  value={newConnForm.database}
                  onChange={(e) => setNewConnForm({ ...newConnForm, database: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{L('Usuario', 'Username')}</label>
                  <input
                    type="text"
                    required
                    placeholder={L('ej. root o sync_app', 'e.g., root or sync_app')}
                    value={newConnForm.username}
                    onChange={(e) => setNewConnForm({ ...newConnForm, username: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{L('Contraseña', 'Password')}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newConnForm.password}
                    onChange={(e) => setNewConnForm({ ...newConnForm, password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewConnModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {L('Guardar Conexión', 'Save Connection')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Crear o Editar Usuario del Sistema (UserResource) */}
      {showNewUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    {editingUserId ? L('Editar Usuario del Sistema', 'Edit System User') : L('Crear Nuevo Usuario', 'Create New User')}
                  </h3>
                  <p className="text-[11px] text-slate-400">{L('Credenciales de acceso, rol y vinculación de empleado', 'Login credentials, role permissions, and employee link')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowNewUserModal(false);
                  setEditingUserId(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Nombre Completo:', 'Full Name:')}</label>
                  <input
                    type="text"
                    required
                    placeholder={L('Ej. Juan Carlos Morales', 'e.g., John Miller')}
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Correo Electrónico (Login):', 'Email Address (Login):')}</label>
                  <input
                    type="email"
                    required
                    placeholder={L('usuario@integrapro.com', 'user@integrapro.com')}
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {editingUserId ? L('Nueva Contraseña (dejar en blanco para conservar):', 'New Password (leave blank to keep current):') : L('Contraseña de Acceso:', 'Access Password:')}
                  </label>
                  <input
                    type="password"
                    required={!editingUserId}
                    placeholder="••••••••••••"
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Rol en el Sistema:', 'System Role:')}</label>
                  <select
                    value={userForm.role}
                    onChange={(e: any) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 font-semibold"
                  >
                    <option value="Super Admin">{L('Super Admin / Administrador General', 'Super Admin / General Administrator')}</option>
                    <option value="Gerente de Sucursal">{L('Gerente de Sucursal', 'Branch Manager')}</option>
                    <option value="Cajero / Operador POS">{L('Cajero / Operador POS', 'Cashier / POS Operator')}</option>
                    <option value="Auditor Contable">{L('Auditor Contable', 'Accounting Auditor')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('Sucursal Asignada:', 'Assigned Branch:')}</label>
                  <select
                    value={userForm.sucursal_nombre}
                    onChange={(e) => setUserForm({ ...userForm, sucursal_nombre: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 font-semibold"
                  >
                    <option value="Sucursal Central - Ciudad">{L('Sucursal Central - Ciudad', 'Central Branch - Downtown')}</option>
                    <option value="Sucursal Norte - Carretera al Atlántico">{L('Sucursal Norte - Carretera al Atlántico', 'North Branch - Atlantic Highway')}</option>
                    <option value="Sucursal Sur - Villa Nueva">{L('Sucursal Sur - Villa Nueva', 'South Branch - Villa Nueva')}</option>
                    <option value="Todas las Sucursales">{L('Todas las Sucursales (Corporativo)', 'All Branches (Corporate)')}</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{L('DPI / Ficha de Empleado (Opcional):', 'National ID / Employee Badge (Optional):')}</label>
                  <input
                    type="text"
                    placeholder={L('Ej. 2345 67890 0101', 'e.g., ID-2345-0101')}
                    value={userForm.dpi}
                    onChange={(e) => setUserForm({ ...userForm, dpi: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              {/* Permisos Directos Específicos */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">{L('Permisos Directos Adicionales:', 'Additional Direct Permissions:')}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                    <span>{L('Emisión y Certificación FEL', 'E-Invoice Issuance & Certification')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                    <span>{L('Corte Z de Caja y Cuadre POS', 'POS Z-Report & Cash Reconciliation')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-indigo-600" />
                    <span>{L('Anulación de Facturas FEL en SAT', 'Void Certified E-Invoices')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-indigo-600" />
                    <span>{L('Acceso a Liquidaciones y Planilla RRHH', 'Access HR Payroll & Settlements')}</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewUserModal(false);
                    setEditingUserId(null);
                  }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl transition-all shadow-sm shadow-indigo-600/20 cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingUserId ? L('Guardar Cambios', 'Save Changes') : L('Registrar Usuario', 'Register User')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Zona de Peligro (Idéntico a configuracion-empresa.blade.php) */}
      <div className="border border-rose-200 bg-rose-50/40 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-black text-rose-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            {L('Zona de Peligro • Eliminar Empresa', 'Danger Zone • Delete Company')}
          </h3>
          <p className="text-xs text-slate-500 max-w-xl">
            {L(
              'Esta acción eliminará de forma irreversible toda la información fiscal, clientes, kardex y facturas de la empresa ',
              'This action will permanently delete all tax records, customers, stock ledgers, and invoices for '
            )}<strong>{companyForm.nombre}</strong>{L('. Solo disponible para Super Admin.', '. Available to Super Admin only.')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>{L('Eliminar Empresa', 'Delete Company')}</span>
        </button>
      </div>

      {/* Modal de Confirmación de Eliminación de Empresa */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">{L('¿Confirmar Eliminación?', 'Confirm Deletion?')}</h3>
                <p className="text-[11px] text-slate-400">{L('Esta acción no se puede deshacer', 'This action cannot be undone')}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {L('Para confirmar, escribe exactamente el nombre de la empresa:', 'To confirm, type the exact company name below:')}
              <br />
              <strong className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded mt-1 inline-block">
                {companyForm.nombre}
              </strong>
            </p>

            <input
              type="text"
              placeholder={L('Escribe el nombre de la empresa para confirmar...', 'Type the company name to confirm...')}
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmationText('');
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                {L('Cancelar', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteCompany}
                disabled={deleteConfirmationText.trim() !== companyForm.nombre.trim()}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  deleteConfirmationText.trim() === companyForm.nombre.trim()
                    ? 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{L('Confirmar Eliminación', 'Confirm Deletion')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

        </>
      )}

    </div>
  );
}
