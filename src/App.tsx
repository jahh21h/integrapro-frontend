import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { User, NavigationTab, EmpresaSaaS } from './types';
import FloatingGlassDock from './components/FloatingGlassDock';
import { authApi, empresaApi } from './api';
import { formatRegimenLabel } from './utils/tax';
import { isPlatformAdminEmail, isOwnerOperableEmpresa } from './utils/tenant';
import { clearLiveCache } from './utils/liveCache';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PosTerminal from './pages/PosTerminal';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Clients from './pages/Clients';
import Purchases from './pages/Purchases';
import Accounting from './pages/Accounting';
import HumanResources from './pages/HumanResources';
import AttendanceKiosk from './pages/AttendanceKiosk';
import Branches from './pages/Branches';
import SettingsView from './pages/SettingsView';
import FortexaAppsView from './pages/FortexaAppsView';
import LiveSalesView from './pages/LiveSalesView';
import LaunchpadHub from './components/LaunchpadHub';
import LiveExpressShell from './components/LiveExpressShell';
import TokenExtensionScraper from './components/TokenExtensionScraper';
import { LiveSalesProvider } from './context/LiveSalesContext';
import { useLanguage } from './context/LanguageContext';
import { 
  Package, 
  ShoppingCart, 
  Search, 
  X, 
  Sparkles,
  Truck,
  Landmark,
  Users,
  Clock3,
  Building2,
  Cpu,
  LayoutGrid
} from 'lucide-react';

// Empresas base propias de la plataforma (NO incluye datos de clientes externos en el bundle público)
const DEFAULT_EMPRESAS_LIST: EmpresaSaaS[] = [
  {
    id: 1,
    nombre: 'Fashion Styles',
    razon_social: 'Fashion Styles S.A.',
    nit: '6322012-1',
    pais: 'GT',
    regimen: 'General (IVA 12%)',
    plan: 'enterprise',
    activa: true,
    telefono: '',
    email: '',
    direccion: 'Ciudad de Guatemala',
    modules: {
      live_sales: true,
      pos: true,
      inventory: true,
      inventario: true,
      sales: true,
      ventas: true,
      sat_fel: true,
      clients: true,
      clientes: true,
      purchases: true,
      compras: true,
      accounting: true,
      contabilidad: true,
      hr: true,
      rrhh: true,
      asistencia: true,
      sucursales: true,
      configuracion: true,
      dashboard: true
    }
  },
  {
    id: 22,
    nombre: 'Fortexa Technologies',
    razon_social: 'Fortexa Technologies S.A.',
    nit: 'FORTEXA-001',
    pais: 'GT',
    regimen: 'Pequeño Contribuyente (5%)',
    plan: 'enterprise',
    activa: true,
    telefono: '+502 2334-9000',
    email: 'soporte@fortexa.com',
    direccion: 'Ciudad de Guatemala'
  },
  {
    id: 25,
    nombre: '[QA-EMPRESA] IntegraPro Test',
    razon_social: 'Empresa Demo S.A.',
    nit: '000000-1',
    pais: 'GT',
    regimen: 'General (IVA 12%)',
    plan: 'enterprise',
    activa: true,
    telefono: '',
    email: '',
    direccion: 'Ciudad de Guatemala'
  },
  {
    id: 99,
    nombre: 'Boutique Chic Live (Demo TikTok)',
    razon_social: 'Boutique Chic Live (Demo)',
    nit: 'CF',
    pais: 'GT',
    regimen: 'Exento / Informal',
    plan: 'live_express',
    activa: true,
    telefono: '',
    email: '',
    direccion: 'Guatemala',
    modules: {
      live_sales: true,
      live_only: true,
      inventario: true,
      clientes: true,
      configuracion: true,
      dashboard: true,
      pos: false,
      ventas: false,
      compras: false,
      contabilidad: false,
      rrhh: false,
      asistencia: false,
      sucursales: false,
      fortexa_apps: false
    }
  }
];

export default function App() {
  const { L, isEn } = useLanguage();
  // Seguridad: Iniciar desautenticado por defecto para obligar siempre a pasar por el Login
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const token = localStorage.getItem('integrapro_token');
      if (!token || token.startsWith('1010|') || token.startsWith('1008|')) {
        localStorage.removeItem('integrapro_token');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  });
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState<string | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedActive = localStorage.getItem('integrapro_active_empresa');
    if (savedActive) {
      try {
        const emp = JSON.parse(savedActive);
        if (emp.id !== 2 && !emp.nombre?.includes('IntegraPro Admin')) {
          return {
            id: 8,
            name: 'JONATHAN HERRERA',
            email: 'admin@integrapro.com',
            role: 'Administrador',
            empresa_id: Number(emp.id) || 1,
            empresa_nombre: emp.nombre || 'Fashion Styles',
            empresa_regimen: formatRegimenLabel(emp.regimen),
            sucursal_id: 1,
            sucursal_nombre: 'Sucursal Central - Ciudad'
          };
        }
      } catch {}
    }
    return {
      id: 8,
      name: 'JONATHAN HERRERA',
      email: 'admin@integrapro.com',
      role: 'Administrador',
      empresa_id: 1,
      empresa_nombre: 'Fashion Styles',
      empresa_regimen: 'General (IVA 12%)',
      sucursal_id: 1,
      sucursal_nombre: 'Sucursal Central - Ciudad'
    };
  });
  const [activeTab, setActiveTab] = useState<NavigationTab>('hub');
  const mainScrollRef = useRef<HTMLElement>(null);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    try {
      return localStorage.getItem('integrapro_web_theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('oled-dark', 'dark');
    } else {
      root.classList.remove('oled-dark', 'dark');
    }
    try {
      localStorage.setItem('integrapro_web_theme', themeMode);
    } catch {}
  }, [themeMode]);

  const toggleThemeMode = () => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [newVersionAvailable, setNewVersionAvailable] = useState<boolean>(false);

  // Detector de nueva versión: compara el hash del bundle en ejecución contra el
  // index.html servido. Si difieren, hay un deploy nuevo y se ofrece recargar.
  useEffect(() => {
    const runningMatch = document.querySelector<HTMLScriptElement>('script[type="module"][src*="/assets/index-"]')
      ?.src?.match(/index-([A-Za-z0-9_-]+)\.js/);
    const runningHash = runningMatch ? runningMatch[1] : null;
    if (!runningHash) return;

    let stopped = false;
    const checkForNewVersion = async () => {
      try {
        const res = await fetch('/', { cache: 'no-store', headers: { Accept: 'text/html' } });
        const html = await res.text();
        const servedMatch = html.match(/index-([A-Za-z0-9_-]+)\.js/);
        if (!stopped && servedMatch && servedMatch[1] !== runningHash) {
          setNewVersionAvailable(true);
        }
      } catch {
        // Sin conexión: se reintenta en el próximo ciclo
      }
    };

    checkForNewVersion();
    const intervalId = setInterval(checkForNewVersion, 5 * 60 * 1000);
    window.addEventListener('focus', checkForNewVersion);
    return () => {
      stopped = true;
      clearInterval(intervalId);
      window.removeEventListener('focus', checkForNewVersion);
    };
  }, []);

  const newVersionBanner = newVersionAvailable ? (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] bg-slate-900 text-white pl-4 pr-2 py-2 rounded-2xl shadow-2xl border border-indigo-500/50 flex items-center gap-3">
      <span className="text-xs font-bold">{L('🚀 Nueva versión disponible', '🚀 New version available')}</span>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-extrabold transition-colors cursor-pointer"
      >
        {L('Actualizar ahora', 'Update now')}
      </button>
    </div>
  ) : null;

  const getModuleName = (tab: NavigationTab, empresaId?: number): string => {
    const isFortexa = empresaId === 22;
    switch (tab) {
      case 'hub':
        return L('Menú Principal (Tarjetas)', 'Main Menu (Cards)');
      case 'pos':
        return L('Punto de Venta (POS Rápido)', 'Point of Sale (Quick POS)');
      case 'inventario':
        return isFortexa
          ? L('Hardware & Equipos Tecnológicos', 'Hardware & Tech Equipment')
          : L('Inventario & Bodega', 'Inventory & Warehouse');
      case 'ventas':
        return isFortexa
          ? L('Ventas & Facturación (FEL B2B)', 'Sales & E-Invoicing (B2B)')
          : L('Ventas & Facturación (FEL SAT)', 'Sales & E-Invoicing (Tax Compliance)');
      case 'fortexa_apps':
        return L('Suscripciones & Apps Fortexa (RutaFuel, Quantum & SaaS)', 'Fortexa Subscriptions & Apps (RutaFuel, Quantum & SaaS)');
      case 'clientes':
        return isFortexa
          ? L('Clientes Corporativos & Flotas B2B', 'Corporate Clients & B2B Fleets')
          : L('Cartera de Clientes & Créditos', 'Clients & Credit Accounts');
      case 'compras':
        return L('Compras & Proveedores', 'Purchases & Suppliers');
      case 'contabilidad':
        return L('Contabilidad & Cumplimiento SAT (Libro Diario)', 'Accounting & Tax Compliance (General Journal)');
      case 'dashboard':
        return L('Métricas & Dashboard Ejecutivo', 'Metrics & Executive Dashboard');
      case 'rrhh':
        return L('Recursos Humanos & Planillas', 'Human Resources & Payroll');
      case 'asistencia':
        return L('Reloj Checador (Kiosco Asistencia)', 'Time Clock (Attendance Kiosk)');
      case 'sucursales':
        return L('Red de Sucursales & Cajas', 'Branch Network & Registers');
      case 'configuracion':
        return L('Configuración Global de Empresa & SAT', 'Global Company & Tax Settings');
      case 'token_scraper':
        return L('Token & API para Extensión Scraper Chrome', 'Chrome Scraper Extension API & Token');
      case 'live_sales':
        return L('TikTok Live & Canastas Abiertas (Social Commerce)', 'TikTok Live & Open Baskets (Social Commerce)');
      default:
        return L('Módulo', 'Module');
    }
  };

  useEffect(() => {
    // Purga de seguridad: si existe el antiguo token demo hardcoded, eliminarlo inmediatamente
    try {
      const currentToken = localStorage.getItem('integrapro_token');
      if (currentToken && (currentToken.startsWith('1008|') || currentToken.startsWith('1010|'))) {
        localStorage.removeItem('integrapro_token');
        setIsAuthenticated(false);
        return;
      }
    } catch {}

    if (!isAuthenticated) return;

    // Sincronizar directorio de empresas en vivo desde la base de datos del Droplet (requiere sesión)
    empresaApi.getAll().then((data: any[]) => {
      if (Array.isArray(data) && data.length > 0) {
        // Filtrar empresas inactivas y el antiguo registro técnico de IntegraPro Admin (ID: 2)
        const validCompanies = data.filter((e: any) => {
          const empId = e.id_empresa || e.id;
          const name = e.nombre || '';
          return empId !== 2 && !name.includes('IntegraPro Admin');
        });

        const mapped: EmpresaSaaS[] = validCompanies.map((e: any) => {
          const empId = e.id_empresa || e.id;
          const defaultMatch = DEFAULT_EMPRESAS_LIST.find(d => d.id === empId);
          const cfgObj = typeof e.configuracion === 'string'
            ? (() => { try { return JSON.parse(e.configuracion); } catch { return {}; } })()
            : (e.configuracion || {});
          const serverModules = cfgObj?.modules && typeof cfgObj.modules === 'object' ? cfgObj.modules : null;
          const serverBilling = cfgObj?.billing && typeof cfgObj.billing === 'object' ? cfgObj.billing : undefined;
          return {
            id: empId,
            nombre: e.nombre || 'Empresa Sin Nombre',
            razon_social: e.razon_social || e.nombre || 'Sin Razón Social',
            nit: e.nit || 'CF',
            pais: e.pais || 'GT',
            regimen: formatRegimenLabel(e.regimen_tributario || e.regimen),
            plan: (e.plan_type as any) || defaultMatch?.plan || 'enterprise',
            activa: Boolean(e.activa !== false),
            subscription_status: e.subscription_status || (e.activa === false ? 'suspended' : 'active'),
            trial_ends_at: e.trial_ends_at || null,
            billing: serverBilling,
            telefono: e.telefono || '',
            email: e.email || '',
            direccion: e.direccion || '',
            modules: serverModules || defaultMatch?.modules || {
              live_sales: empId === 1,
              pos: true,
              inventory: true,
              clients: true
            }
          };
        });

        // Solo el administrador de plataforma recibe las empresas demo locales adicionales si no vinieron de la API
        if (isPlatformAdminEmail(currentUser.email)) {
          DEFAULT_EMPRESAS_LIST.forEach(def => {
            if (!mapped.some(m => m.id === def.id)) {
              mapped.push(def);
            }
          });
        }

        setEmpresasList(mapped);
        localStorage.setItem('integrapro_empresas_list', JSON.stringify(mapped));

        // Sincronizar inmediatamente la empresa activa con su régimen real del servidor
        const currentActive = mapped.find(m => Number(m.id) === Number(selectedEmpresaId)) || mapped[0];
        if (currentActive) {
          setCurrentUser(prev => ({
            ...prev,
            empresa_id: currentActive.id,
            empresa_nombre: currentActive.nombre,
            empresa_regimen: currentActive.regimen
          }));
          localStorage.setItem('integrapro_active_empresa', JSON.stringify(currentActive));
        }
      }
    }).catch(err => {
      console.warn('Error fetching live empresas from Droplet:', err);
    });
  }, [isAuthenticated, currentUser.email]);

  const [empresasList, setEmpresasList] = useState<EmpresaSaaS[]>(() => {
    const saved = localStorage.getItem('integrapro_empresas_list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((e: any) => (e.id !== 2 && e.id_empresa !== 2 && !e.nombre?.includes('IntegraPro Admin')));
          // Asegurar que las empresas base (Fashion Styles, Fortexa y Boutique Chic Live) estén en la lista
          DEFAULT_EMPRESAS_LIST.forEach(def => {
            if (!filtered.some(e => e.id === def.id)) {
              filtered.push(def);
            }
          });
          return filtered.map(e => ({
            ...e,
            regimen: formatRegimenLabel(e.regimen)
          }));
        }
      } catch {}
    }
    return DEFAULT_EMPRESAS_LIST;
  });

  const [selectedEmpresaId, setSelectedEmpresaId] = useState<number>(() => {
    const saved = localStorage.getItem('integrapro_active_empresa_id');
    const idNum = saved ? Number(saved) : 1;
    return idNum === 2 ? 22 : idNum;
  });

  // Reiniciar scroll del contenedor principal antes del pintado al cambiar de módulo
  useLayoutEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [activeTab, selectedEmpresaId]);

  const [isLiveOnlyMode, setIsLiveOnlyMode] = useState<boolean>(() => {
    const savedActive = localStorage.getItem('integrapro_active_empresa_id');
    return savedActive === '99' && localStorage.getItem('integrapro_mode_live_only') === 'true';
  });

  const selectedEmpresa = empresasList.find((e) => Number(e.id) === Number(selectedEmpresaId)) || empresasList[0];

  // Control Multi-Tenant Estricto (Privacidad Zero-Access sobre inquilinos externos):
  // - Solo las cuentas de plataforma Fortexa son SuperAdmin (NUNCA un rol 'Administrador' de una empresa cliente).
  // - Incluso el dueño de plataforma solo puede operar sus empresas propias/demo (Fortexa #22, Fashion Styles #1, Demo QA #25, Demo Live #99),
  //   NUNCA entrar a ver datos operativos de clientes externos.
  const isSuperAdmin = isPlatformAdminEmail(currentUser.email);
  const ownerOperableEmpresas = empresasList.filter((e) => isOwnerOperableEmpresa(e.id));
  const tenantEmpresas = empresasList.filter((e) => Number(e.id) === Number(currentUser.empresa_id));
  const effectiveUserEmpresas = isSuperAdmin
    ? (ownerOperableEmpresas.length > 0 ? ownerOperableEmpresas : DEFAULT_EMPRESAS_LIST)
    : (tenantEmpresas.length > 0
        ? tenantEmpresas
        : (selectedEmpresa ? [selectedEmpresa] : [{
            id: currentUser.empresa_id,
            nombre: currentUser.empresa_nombre || 'Mi Empresa',
            razon_social: currentUser.empresa_nombre || 'Mi Empresa',
            nit: 'CF',
            pais: 'GT',
            regimen: currentUser.empresa_regimen || 'General (IVA 12%)',
            plan: 'enterprise',
            activa: true,
            telefono: '',
            email: currentUser.email,
            direccion: ''
          }]));

  // Determinar si la empresa activa opera en Modo Solo Live (para CUALQUIER empresa, no solo la 99)
  const isCompanyLiveOnly = selectedEmpresaId !== 22 && (
    selectedEmpresa?.plan === 'live_express' || 
    selectedEmpresa?.modules?.live_only === true || 
    (selectedEmpresa?.modules?.pos === false && selectedEmpresa?.modules?.live_sales === true) ||
    isLiveOnlyMode
  );

  const handleSelectEmpresa = (id: number) => {
    // Seguridad: solo admin de plataforma puede cambiar de espacio, y únicamente entre empresas propias/demo
    if (!isSuperAdmin) return;
    if (!isOwnerOperableEmpresa(id)) {
      console.warn(`[Privacidad Multi-Tenant] Bloqueado acceso operativo a empresa cliente externa #${id}.`);
      return;
    }

    setSelectedEmpresaId(id);
    localStorage.setItem('integrapro_active_empresa_id', id.toString());
    const currentList: EmpresaSaaS[] = (() => {
      try {
        const stored = localStorage.getItem('integrapro_empresas_list');
        return stored ? JSON.parse(stored) : empresasList;
      } catch {
        return empresasList;
      }
    })();
    const found = currentList.find((e) => Number(e.id) === Number(id)) || empresasList.find((e) => Number(e.id) === Number(id));
    if (found) {
      setCurrentUser((prev) => ({
        ...prev,
        empresa_id: found.id,
        empresa_nombre: found.nombre,
        empresa_regimen: found.regimen
      }));
      localStorage.setItem('integrapro_active_empresa', JSON.stringify(found));

      // Si es una empresa con plan live_express o modo solo live forzado
      const shouldBeLiveOnly = id !== 22 && (
        found.plan === 'live_express' || 
        found.modules?.live_only === true || 
        found.id === 99 ||
        (found.modules?.pos === false && found.modules?.live_sales === true)
      );
      setIsLiveOnlyMode(shouldBeLiveOnly);
      localStorage.setItem('integrapro_mode_live_only', shouldBeLiveOnly ? 'true' : 'false');
      if (shouldBeLiveOnly) {
        setActiveTab('live_sales');
      } else if (id !== 22) {
        const hasPos = found.modules?.pos !== false;
        const hasLive = found.modules?.live_sales ?? id === 1;
        if (
          activeTab === 'fortexa_apps' ||
          (activeTab === 'pos' && !hasPos) ||
          (activeTab === 'live_sales' && !hasLive)
        ) {
          setActiveTab('hub');
        }
      }
    } else if (id !== 22 && activeTab === 'fortexa_apps') {
      setActiveTab('hub');
    }
    // Si se selecciona Fortexa Technologies, navegar directamente a su panel de software y apps
    if (id === 22) {
      setIsLiveOnlyMode(false);
      localStorage.setItem('integrapro_mode_live_only', 'false');
      setActiveTab('fortexa_apps');
    }
  };

  // Protección automática de pestañas exclusivas al cambiar de empresa
  useEffect(() => {
    if (activeTab === 'fortexa_apps' && selectedEmpresaId !== 22) {
      setActiveTab('hub');
      return;
    }
    if (activeTab === 'pos') {
      if (selectedEmpresaId === 22) {
        setActiveTab('fortexa_apps');
      } else if (selectedEmpresa?.modules?.pos === false) {
        setActiveTab('hub');
      }
      return;
    }
    if (activeTab === 'live_sales') {
      const hasLive = selectedEmpresaId !== 22 && (selectedEmpresa?.modules?.live_sales ?? selectedEmpresaId === 1);
      if (!hasLive) {
        setActiveTab('hub');
      }
    }
  }, [selectedEmpresaId, selectedEmpresa?.modules?.pos, selectedEmpresa?.modules?.live_sales, activeTab]);

  const handleCreateEmpresa = (newEmp: EmpresaSaaS) => {
    const formattedEmp: EmpresaSaaS = {
      ...newEmp,
      id: Number(newEmp.id),
      regimen: formatRegimenLabel(newEmp.regimen)
    };
    setEmpresasList(prev => {
      const exists = prev.some(e => Number(e.id) === Number(formattedEmp.id));
      const updated = exists
        ? prev.map(e => Number(e.id) === Number(formattedEmp.id) ? formattedEmp : e)
        : [formattedEmp, ...prev];
      localStorage.setItem('integrapro_empresas_list', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteEmpresa = (deletedId: number) => {
    const idNum = Number(deletedId);
    setEmpresasList(prev => {
      const updated = prev.filter(e => Number(e.id) !== idNum);
      localStorage.setItem('integrapro_empresas_list', JSON.stringify(updated));
      return updated;
    });
    try {
      localStorage.removeItem(`integrapro_read_notifs_${idNum}`);
    } catch {}
  };

  const handleUpdateEmpresa = (updatedEmp: EmpresaSaaS) => {
    const formattedEmp: EmpresaSaaS = {
      ...updatedEmp,
      id: Number(updatedEmp.id),
      regimen: formatRegimenLabel(updatedEmp.regimen)
    };

    setEmpresasList(prev => {
      const updated = prev.map(e => Number(e.id) === Number(formattedEmp.id) ? formattedEmp : e);
      localStorage.setItem('integrapro_empresas_list', JSON.stringify(updated));
      return updated;
    });

    if (Number(selectedEmpresaId) === Number(formattedEmp.id) || Number(currentUser.empresa_id) === Number(formattedEmp.id)) {
      setCurrentUser(prev => ({
        ...prev,
        empresa_id: formattedEmp.id,
        empresa_nombre: formattedEmp.nombre,
        empresa_regimen: formattedEmp.regimen
      }));
      localStorage.setItem('integrapro_active_empresa', JSON.stringify(formattedEmp));

      try {
        const storedUser = localStorage.getItem('integrapro_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          parsedUser.empresa_regimen = formattedEmp.regimen;
          parsedUser.empresa_nombre = formattedEmp.nombre;
          parsedUser.empresa_id = formattedEmp.id;
          localStorage.setItem('integrapro_user', JSON.stringify(parsedUser));
        }
      } catch {}

      // Actualizar inmediatamente el modo live para que surta efecto al instante en pantalla
      const isLiveOnly = updatedEmp.id !== 22 && (
        updatedEmp.plan === 'live_express' ||
        updatedEmp.modules?.live_only === true ||
        (updatedEmp.modules?.pos === false && updatedEmp.modules?.live_sales === true)
      );
      setIsLiveOnlyMode(isLiveOnly);
      localStorage.setItem('integrapro_mode_live_only', isLiveOnly ? 'true' : 'false');
      if (isLiveOnly) {
        setActiveTab('live_sales');
      }
    }
  };

  // Atajo de teclado global Ctrl + K y verificación de sesión Sanctum
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Verificación de token Sanctum existente
    const token = localStorage.getItem('integrapro_token');
    if (token) {
      if (token.startsWith('1010|') || token.startsWith('1008|')) {
        localStorage.removeItem('integrapro_token');
        setIsAuthenticated(false);
      } else {
        authApi.getMe()
          .then((res) => {
            if (res?.data || res?.user) {
              const u = res.data || res.user;
              const rawUserEmpId = Number(u.id_empresa || (u.empresa && u.empresa.id) || 1);
              const userEmpId = rawUserEmpId === 2 ? 22 : rawUserEmpId;
              const isUserPlatformAdmin = isPlatformAdminEmail(u.email);
              const savedEmpId = Number(localStorage.getItem('integrapro_active_empresa_id') || '0');
              // Solo admin de plataforma puede mantener seleccionada otra empresa propia/demo; inquilinos quedan bloqueados a su empresa
              const targetEmpId =
                isUserPlatformAdmin && isOwnerOperableEmpresa(savedEmpId) ? savedEmpId : userEmpId;
              const matchedSavedEmp = empresasList.find(e => Number(e.id) === targetEmpId);
              const empInfo = targetEmpId === userEmpId
                ? (res.empresa || res.data?.empresa || u.empresa || matchedSavedEmp)
                : (matchedSavedEmp || res.empresa || res.data?.empresa || u.empresa);
              const rawReg = empInfo?.regimen_tributario || empInfo?.regimen || '';
              const mappedReg = formatRegimenLabel(rawReg);

              const targetEmpNombre = empInfo?.nombre || (targetEmpId === 25 ? '[QA-EMPRESA] IntegraPro Test' : (targetEmpId === 22 ? 'Fortexa Technologies' : targetEmpId === 1 ? 'Fashion Styles' : `Empresa #${targetEmpId}`));
              setCurrentUser((prev) => ({
                ...prev,
                id: u.id || prev.id,
                name: u.name || prev.name,
                email: u.email || prev.email,
                role: u.role || prev.role,
                empresa_id: targetEmpId,
                empresa_nombre: targetEmpNombre,
                empresa_regimen: mappedReg
              }));
              setSelectedEmpresaId(targetEmpId);
              localStorage.setItem('integrapro_active_empresa_id', targetEmpId.toString());
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem('integrapro_token');
              setIsAuthenticated(false);
            }
          })
          .catch(() => {
            // Si el token es inválido o expiró, cerrar sesión inmediatamente
            localStorage.removeItem('integrapro_token');
            setIsAuthenticated(false);
          });
      }
    } else {
      setIsAuthenticated(false);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Control global de inactividad: Cierre automático de sesión tras 5 minutos sin interacción
  useEffect(() => {
    if (!isAuthenticated) return;

    const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutos de inactividad

    // Inicializar timestamp de última actividad
    const initialTime = Date.now();
    lastActivityRef.current = initialTime;
    try {
      localStorage.setItem('integrapro_last_activity', initialTime.toString());
    } catch {}

    const triggerInactivityLogout = async () => {
      try {
        await authApi.logout();
      } catch {
        localStorage.removeItem('integrapro_token');
      }
      setSessionExpiredNotice('Tu sesión se cerró automáticamente por inactividad durante 5 minutos.');
      setIsAuthenticated(false);
    };

    // Eventos que indican actividad del usuario
    const userEvents = [
      'mousedown',
      'mousemove',
      'keydown',
      'touchstart',
      'touchmove',
      'wheel',
      'scroll',
      'click'
    ];

    const registerActivity = () => {
      const now = Date.now();
      // Throttle de 1 segundo para no saturar operaciones
      if (now - lastActivityRef.current > 1000) {
        lastActivityRef.current = now;
        try {
          localStorage.setItem('integrapro_last_activity', now.toString());
        } catch {}
      }
    };

    userEvents.forEach((event) => {
      window.addEventListener(event, registerActivity, { passive: true });
    });

    // Sincronizar actividad entre diferentes pestañas abiertas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'integrapro_last_activity' && e.newValue) {
        const remoteTime = parseInt(e.newValue, 10);
        if (!isNaN(remoteTime) && remoteTime > lastActivityRef.current) {
          lastActivityRef.current = remoteTime;
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Verificación periódica cada 5 segundos
    const intervalId = setInterval(() => {
      let lastAct = lastActivityRef.current;
      try {
        const stored = localStorage.getItem('integrapro_last_activity');
        if (stored) {
          const parsed = parseInt(stored, 10);
          if (!isNaN(parsed) && parsed > lastAct) {
            lastAct = parsed;
            lastActivityRef.current = parsed;
          }
        }
      } catch {}

      const elapsed = Date.now() - lastAct;
      if (elapsed >= INACTIVITY_TIMEOUT_MS) {
        triggerInactivityLogout();
      }
    }, 5000);

    // Verificación al volver a la pestaña (si la computadora se suspendió o el navegador estuvo en segundo plano)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        let lastAct = lastActivityRef.current;
        try {
          const stored = localStorage.getItem('integrapro_last_activity');
          if (stored) {
            const parsed = parseInt(stored, 10);
            if (!isNaN(parsed) && parsed > lastAct) {
              lastAct = parsed;
              lastActivityRef.current = parsed;
            }
          }
        } catch {}

        if (Date.now() - lastAct >= INACTIVITY_TIMEOUT_MS) {
          triggerInactivityLogout();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      userEvents.forEach((event) => {
        window.removeEventListener(event, registerActivity);
      });
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [isAuthenticated]);

  const handleLogin = (user: User, empresaObj?: EmpresaSaaS) => {
    setSessionExpiredNotice(null);
    lastActivityRef.current = Date.now();
    try {
      localStorage.setItem('integrapro_last_activity', Date.now().toString());
      localStorage.setItem('integrapro_active_empresa_id', user.empresa_id.toString());
      if (empresaObj) {
        setEmpresasList(prev => {
          const exists = prev.some(e => Number(e.id) === Number(empresaObj.id));
          const updated = exists
            ? prev.map(e => Number(e.id) === Number(empresaObj.id) ? empresaObj : e)
            : [empresaObj, ...prev];
          localStorage.setItem('integrapro_empresas_list', JSON.stringify(updated));
          return updated;
        });
        localStorage.setItem('integrapro_active_empresa', JSON.stringify(empresaObj));
      } else {
        const empMatch = empresasList.find(e => e.id === user.empresa_id);
        if (empMatch) {
          localStorage.setItem('integrapro_active_empresa', JSON.stringify(empMatch));
        }
      }
    } catch {}
    setSelectedEmpresaId(user.empresa_id);
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActiveTab(user.empresa_id === 22 ? 'fortexa_apps' : 'hub');
  };

  const handleLogout = async () => {
    setSessionExpiredNotice(null);
    try {
      await authApi.logout();
    } catch {
      localStorage.removeItem('integrapro_token');
    }
    try {
      localStorage.removeItem('integrapro_token');
      localStorage.removeItem('integrapro_active_empresa_id');
      localStorage.removeItem('integrapro_active_empresa');
      localStorage.removeItem('integrapro_empresas_list');
      localStorage.removeItem('integrapro_last_activity');
    } catch {}
    clearLiveCache();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Login
          onLogin={handleLogin}
          inactivityNotice={
            sessionExpiredNotice
              ? L(
                  'Tu sesión se cerró automáticamente por inactividad durante 5 minutos.',
                  'Your session was automatically signed out after 5 minutes of inactivity.'
                )
              : null
          }
        />
        {newVersionBanner}
      </>
    );
  }

  return (
    <LiveSalesProvider>
      {/* Si está en Modo Solo Live Express (cualquier empresa configurada con plan live_express o solo live), mostrar la interfaz exclusiva sin ERP */}
      {isCompanyLiveOnly ? (
        <LiveExpressShell
          empresa={selectedEmpresa}
          empresas={effectiveUserEmpresas}
          isPlatformAdmin={isSuperAdmin}
          onSelectEmpresa={isSuperAdmin ? handleSelectEmpresa : undefined}
          onExitLiveMode={() => {
            setIsLiveOnlyMode(false);
            localStorage.setItem('integrapro_mode_live_only', 'false');
            setActiveTab('hub');
          }}
          onLogout={handleLogout}
        />
      ) : (
        <div className="h-screen overflow-hidden flex web-shell-light web-oled-scope text-slate-800 antialiased font-sans transition-colors duration-300">
        {/* Área Central de Contenido (Shell fijo 100vh: Navbar inmóvil + scroll exclusivo en <main> sin saltos) */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Navbar 
            user={currentUser} 
            selectedEmpresa={selectedEmpresa}
            onLogout={handleLogout} 
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            empresas={effectiveUserEmpresas}
            allEmpresas={empresasList}
            isPlatformAdmin={isSuperAdmin}
            selectedEmpresaId={selectedEmpresaId}
            onSelectEmpresa={isSuperAdmin ? handleSelectEmpresa : undefined}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            onEnterLiveMode={() => {
              setIsLiveOnlyMode(true);
              localStorage.setItem('integrapro_mode_live_only', 'true');
            }}
            themeMode={themeMode}
            onToggleTheme={toggleThemeMode}
          />

        <main ref={mainScrollRef} className="flex-1 overflow-y-scroll p-2.5 sm:p-6 lg:p-8 pb-24 md:pb-8 md:pl-24" style={{ scrollbarGutter: 'stable' }}>
          <div className="max-w-7xl mx-auto w-full">
            {/* Banner de Recordatorio de Pago (5 días antes del vencimiento Mensual/Anual) o Prueba Gratis 14 Días */}
            {selectedEmpresa && selectedEmpresa.id !== 1 && selectedEmpresa.id !== 22 && selectedEmpresa.id !== 99 && (() => {
              const dueStr = selectedEmpresa.billing?.next_billing_date || selectedEmpresa.trial_ends_at;
              if (!dueStr) return null;
              const cleanDate = String(dueStr).slice(0, 10);
              const target = new Date(cleanDate + 'T23:59:59');
              if (isNaN(target.getTime())) return null;
              const diffDays = Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const isTrial = selectedEmpresa.subscription_status === 'trial';
              if (!isTrial && diffDays > 5) return null;

              const cur = isEn ? 'USD' : (selectedEmpresa.billing?.currency || (selectedEmpresa.pais === 'GT' ? 'GTQ' : 'USD'));
              const sym = cur === 'GTQ' ? 'Q' : '$';
              const amt = selectedEmpresa.billing?.amount ?? 0;
              const cyc = selectedEmpresa.billing?.cycle === 'annual' ? L('Anual', 'Annual') : L('Mensual', 'Monthly');
              const isUrgent = diffDays <= 5;
              const isOverdue = diffDays < 0;

              const openWhatsApp = () => {
                const msg = isEn
                  ? `Hello Fortexa Technologies, I am from *${selectedEmpresa.nombre}* (ID #${selectedEmpresa.id}). I would like to ${isTrial ? 'activate my plan' : 'renew my subscription'} (${cyc})${amt > 0 ? ` (${sym}${Number(amt).toFixed(2)} ${cur})` : ''}.`
                  : `Hola Fortexa Technologies, soy de *${selectedEmpresa.nombre}* (ID #${selectedEmpresa.id}). Deseo ${isTrial ? 'activar mi plan' : 'renovar mi suscripción'} ${cyc}${amt > 0 ? ` (${sym} ${Number(amt).toFixed(2)} ${cur})` : ''}.`;
                window.open(`https://api.whatsapp.com/send?phone=50235692070&text=${encodeURIComponent(msg)}`, '_blank');
              };

              return (
                <div
                  className={`mb-4 px-4 py-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs shadow-xs ${
                    isOverdue
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : isUrgent
                      ? 'bg-amber-50 border-amber-200 text-amber-950'
                      : 'bg-indigo-50 border-indigo-200 text-indigo-950'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className={`w-4 h-4 shrink-0 ${isOverdue ? 'text-rose-600' : isUrgent ? 'text-amber-600' : 'text-indigo-600'}`} />
                    <p className="font-semibold leading-snug">
                      {isTrial ? (
                        <>
                          <strong>{L('Prueba gratuita de 14 días:', '14-Day Free Trial:')}</strong>{' '}
                          {L('te quedan', 'you have')} <strong>{Math.max(diffDays, 0)} {L('día(s)', 'day(s)')}</strong>{' '}
                          ({L('vence el', 'ends on')} <span className="font-mono font-bold">{cleanDate}</span>).
                          {amt > 0 && <> {L('Plan', 'Plan')} {cyc}: <strong>{sym} {Number(amt).toFixed(2)} {cur}</strong>.</>}
                        </>
                      ) : isOverdue ? (
                        <>
                          <strong>{L('Recordatorio urgente:', 'Urgent reminder:')}</strong>{' '}
                          {L('tu suscripción', 'your subscription')} {cyc}
                          {amt > 0 ? ` (${sym} ${Number(amt).toFixed(2)} ${cur})` : ''}{' '}
                          {L('venció el', 'expired on')} <span className="font-mono font-bold">{cleanDate}</span>.{' '}
                          {L('Reporta tu pago para evitar suspensión.', 'Report your payment to avoid suspension.')}
                        </>
                      ) : (
                        <>
                          <strong>{L('Recordatorio de pago:', 'Payment reminder:')}</strong>{' '}
                          {L('tu suscripción', 'your subscription')} {cyc}
                          {amt > 0 ? ` ${L('de', 'of')} ${sym} ${Number(amt).toFixed(2)} ${cur}` : ''}{' '}
                          {L('vence', 'is due')} {diffDays === 0 ? L('HOY', 'TODAY') : L(`en ${diffDays} día(s)`, `in ${diffDays} day(s)`)} (<span className="font-mono font-bold">{cleanDate}</span>).
                        </>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className={`px-3.5 py-1.5 rounded-xl font-black text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      isOverdue
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : isUrgent
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isTrial ? L('Activar Plan por WhatsApp', 'Activate Plan via WhatsApp') : L('Reportar Pago (WhatsApp)', 'Report Payment (WhatsApp)')}
                  </button>
                </div>
              );
            })()}
            {/* Encabezado persistente de módulo (nunca parpadea ni se remonta al cambiar entre módulos) */}
            {activeTab !== 'hub' && (
              <div className="mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-white px-4 py-2.5 sm:py-3 rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.55)] shrink-0" />
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-tight">
                    {getModuleName(activeTab, selectedEmpresaId)}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {selectedEmpresa?.nombre}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{L('100% Ancho Libre', '100% Full Width')}</span>
                </div>
              </div>
            )}

            {/* Vistas según pestaña activa: cambio instantáneo sin parpadeo en blanco ni saltos de layout */}
            <div className="w-full">
            {activeTab === 'hub' && (
              <LaunchpadHub
                key={selectedEmpresaId}
                user={currentUser}
                selectedEmpresa={selectedEmpresa}
                onNavigate={(tab) => setActiveTab(tab)}
                empresas={effectiveUserEmpresas}
                onSelectEmpresa={isSuperAdmin ? handleSelectEmpresa : undefined}
                onLogout={handleLogout}
              />
            )}
            {activeTab === 'dashboard' && (
              <Dashboard
                key={selectedEmpresaId}
                empresas={effectiveUserEmpresas}
                currentEmpresa={selectedEmpresa}
                selectedEmpresaId={selectedEmpresaId}
                onSelectEmpresa={isSuperAdmin ? handleSelectEmpresa : undefined}
              />
            )}
            {activeTab === 'inventario' && <Inventory key={selectedEmpresaId} currentEmpresa={selectedEmpresa} />}
            {activeTab === 'pos' && <PosTerminal key={selectedEmpresaId} currentEmpresa={selectedEmpresa} />}
            {activeTab === 'ventas' && <Sales key={selectedEmpresaId} currentEmpresa={selectedEmpresa} />}
            {activeTab === 'clientes' && <Clients key={selectedEmpresaId} currentEmpresa={selectedEmpresa} />}
            {activeTab === 'compras' && <Purchases key={selectedEmpresaId} currentEmpresa={selectedEmpresa} />}
            {activeTab === 'contabilidad' && <Accounting key={selectedEmpresaId} currentEmpresa={selectedEmpresa} />}
            {activeTab === 'rrhh' && <HumanResources key={selectedEmpresaId} />}
            {activeTab === 'asistencia' && <AttendanceKiosk key={selectedEmpresaId} />}
            {activeTab === 'sucursales' && <Branches key={selectedEmpresaId} currentEmpresa={selectedEmpresa} />}
            {activeTab === 'fortexa_apps' && isSuperAdmin && selectedEmpresaId === 22 && (
              <FortexaAppsView
                key={selectedEmpresaId}
                currentEmpresa={selectedEmpresa} 
                empresas={empresasList}
                onUpdateEmpresa={handleUpdateEmpresa}
                onCreateEmpresa={handleCreateEmpresa}
                onDeleteEmpresa={handleDeleteEmpresa}
                onSelectEmpresa={handleSelectEmpresa}
              />
            )}
            {activeTab === 'live_sales' && (
              <LiveSalesView key={selectedEmpresaId} currentEmpresa={selectedEmpresa} />
            )}
            {activeTab === 'configuracion' && (
              <SettingsView
                key={selectedEmpresaId}
                currentEmpresa={selectedEmpresa} 
                empresas={effectiveUserEmpresas}
                isPlatformAdmin={isSuperAdmin}
                onUpdateEmpresa={handleUpdateEmpresa}
                onSelectEmpresa={isSuperAdmin ? handleSelectEmpresa : undefined}
              />
            )}
            {activeTab === 'token_scraper' && (
              <TokenExtensionScraper />
            )}
            </div>
          </div>
        </main>

        {/* Floating Glass Dock (mismo lenguaje visual OLED + Spring que Mobile V2) */}
        <FloatingGlassDock
          activeTab={activeTab}
          onSelect={(tab) => setActiveTab(tab)}
          selectedEmpresa={selectedEmpresa}
          selectedEmpresaId={selectedEmpresaId}
        />
      </div>

      {/* Modal Paleta de Comandos (Ctrl + K) */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
          <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={L("Escribe un comando o busca algo (ej. 'POS', 'Stock', 'Aceite')...", "Type a command or search (e.g. 'POS', 'Stock', 'Invoice')...")} 
                autoFocus
                className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button 
                type="button" 
                onClick={() => setCommandPaletteOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 max-h-72 overflow-y-auto text-xs">
              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{L('Acciones Rápidas', 'Quick Actions')}</p>
              <button 
                type="button"
                onClick={() => { setActiveTab('hub'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-indigo-600" /> {L('Ir al Menú Principal (Tarjetas)', 'Go to Main Menu (Cards)')}</span>
                <span className="text-[10px] text-slate-400">{L('Inicio', 'Home')}</span>
              </button>
              {selectedEmpresaId !== 22 ? (
                selectedEmpresa?.modules?.pos !== false && (
                  <button 
                    type="button"
                    onClick={() => { setActiveTab('pos'); setCommandPaletteOpen(false); }}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
                  >
                    <span className="flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-indigo-600" /> {L('Ir a Punto de Venta (POS)', 'Go to Point of Sale (POS)')}</span>
                    <span className="text-[10px] text-slate-400">{L('Atajo', 'Shortcut')}</span>
                  </button>
                )
              ) : (
                <button 
                  type="button"
                  onClick={() => { setActiveTab('fortexa_apps'); setCommandPaletteOpen(false); }}
                  className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
                >
                  <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-purple-600" /> {L('Suscripciones & Apps Fortexa', 'Fortexa Subscriptions & Apps')}</span>
                  <span className="text-[10px] text-slate-400">{L('Atajo', 'Shortcut')}</span>
                </button>
              )}
              <button 
                type="button"
                onClick={() => { setActiveTab('inventario'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Package className="w-4 h-4 text-emerald-600" /> {L('Consultar Stock de Inventario', 'Check Inventory Stock')}</span>
                <span className="text-[10px] text-slate-400">{L('Atajo', 'Shortcut')}</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('compras'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-violet-600" /> {L('Facturas de Compra & Proveedores', 'Purchase Invoices & Suppliers')}</span>
                <span className="text-[10px] text-slate-400">{L('Atajo', 'Shortcut')}</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('contabilidad'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Landmark className="w-4 h-4 text-emerald-600" /> {L('Libro Diario & Fiscalidad SAT', 'General Journal & Tax Compliance')}</span>
                <span className="text-[10px] text-slate-400">{L('Atajo', 'Shortcut')}</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('clientes'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-teal-600" /> {L('Cartera de Clientes & Créditos', 'Clients & Credit Accounts')}</span>
                <span className="text-[10px] text-slate-400">{L('Atajo', 'Shortcut')}</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('dashboard'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /> {L('Ver Métricas del Dashboard', 'View Dashboard Metrics')}</span>
                <span className="text-[10px] text-slate-400">{L('Atajo', 'Shortcut')}</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('asistencia'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-purple-600" /> {L('Reloj Checador (Kiosco Asistencia)', 'Time Clock (Attendance Kiosk)')}</span>
                <span className="text-[10px] text-slate-400">{L('Atajo', 'Shortcut')}</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('configuracion'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-indigo-600" /> {L('Configuración de Empresa (SAT & FEL)', 'Company Settings (Tax & E-Invoice)')}</span>
                <span className="text-[10px] text-slate-400">{L('Atajo', 'Shortcut')}</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('token_scraper'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /> {L('🔑 Token para Extensión Scraper Chrome', '🔑 Chrome Scraper Extension Token')}</span>
                <span className="text-[10px] text-slate-400">API</span>
              </button>
            </div>
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{L('Navega con flechas y presiona Enter', 'Navigate with arrow keys and press Enter')}</span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">{L('ESC para cerrar', 'ESC to close')}</kbd>
            </div>
          </div>
        </div>
      )}
      </div>
      )}
      {newVersionBanner}
    </LiveSalesProvider>
  );
}
