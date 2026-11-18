import { useState, useEffect } from 'react';
import { User, NavigationTab, EmpresaSaaS } from './types';
import { authApi, empresaApi } from './api';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
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
import { LiveSalesProvider } from './context/LiveSalesContext';
import { 
  Package, 
  ShoppingCart, 
  Search, 
  X, 
  CheckCircle2, 
  Sparkles,
  Truck,
  Landmark,
  Users,
  Clock3,
  Building2,
  Cpu,
  LayoutGrid,
  ArrowLeft
} from 'lucide-react';

// Directorio de Empresas Multi-Tenant sincronizado con la base de datos real (Fortexa Technologies como Cerebro SaaS)
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
    telefono: '59440491',
    email: 'integrapro@admin.com',
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
    direccion: 'Diagonal 6 10-01 Zona 10, Edificio Las Margaritas, Torre II, Nivel 12, Ciudad de Guatemala'
  },
  {
    id: 18,
    nombre: 'Aceitera Pinula',
    razon_social: 'Aceitera Pinula, S.A.',
    nit: '9999999-9',
    pais: 'GT',
    regimen: 'General (IVA 12%)',
    plan: 'basic',
    activa: true,
    telefono: '1234-5678',
    email: 'info@aceiterapinula.com',
    direccion: 'San José Pinula, Guatemala'
  },
  {
    id: 36,
    nombre: 'Transpores Herrera',
    razon_social: 'Trans Herrera S.A.',
    nit: '581713-7',
    pais: 'GT',
    regimen: 'Pequeño Contribuyente (5%)',
    plan: 'enterprise',
    activa: true,
    telefono: '35692070',
    email: 'jahh21.jh@gmail.com',
    direccion: '10 Avenida 1-46 Zona 2 Santa Catarina Pinula, Guatemala'
  },
  {
    id: 20,
    nombre: 'Las Delicias',
    razon_social: 'Las Delicias',
    nit: 'CF',
    pais: 'GT',
    regimen: 'Exento / Informal',
    plan: 'basic',
    activa: true,
    telefono: '0',
    email: 'admin@lasdelicias.com',
    direccion: 'Ciudad'
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
    telefono: '35692079',
    email: 'jahh21.jh@gmail.com',
    direccion: '10 Avenida 1-46 Zona 2, Guatemala'
  },
  {
    id: 99,
    nombre: 'Boutique Chic Live (Demo TikTok)',
    razon_social: 'Boutique Chic Live / Maritza Gómez',
    nit: 'CF',
    pais: 'GT',
    regimen: 'Exento / Informal',
    plan: 'live_express',
    activa: true,
    telefono: '+502 4589-1234',
    email: 'maritza.live@tiktokboutique.gt',
    direccion: 'Calzada Roosevelt, Mixco, Guatemala',
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
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
            empresa_id: emp.id || 1,
            empresa_nombre: emp.nombre || 'Fashion Styles',
            empresa_regimen: emp.regimen || 'General (IVA 12%)',
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
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [hasUpdate, setHasUpdate] = useState<boolean>(true);
  const [updateNotificationToast, setUpdateNotificationToast] = useState<string | null>(null);

  const getModuleName = (tab: NavigationTab, empresaId?: number): string => {
    const isFortexa = empresaId === 22;
    switch (tab) {
      case 'hub':
        return 'Menú Principal (Tarjetas)';
      case 'pos':
        return 'Punto de Venta (POS Rápido)';
      case 'inventario':
        return isFortexa ? 'Hardware & Equipos Tecnológicos' : 'Inventario & Bodega';
      case 'ventas':
        return isFortexa ? 'Ventas & Facturación (FEL B2B)' : 'Ventas & Facturación (FEL SAT)';
      case 'fortexa_apps':
        return 'Suscripciones & Apps Fortexa (RutaFuel, Quantum & SaaS)';
      case 'clientes':
        return isFortexa ? 'Clientes Corporativos & Flotas B2B' : 'Cartera de Clientes & Créditos';
      case 'compras':
        return 'Compras & Proveedores';
      case 'contabilidad':
        return 'Contabilidad & Cumplimiento SAT (Libro Diario)';
      case 'dashboard':
        return 'Métricas & Dashboard Ejecutivo';
      case 'rrhh':
        return 'Recursos Humanos & Planillas';
      case 'asistencia':
        return 'Reloj Checador (Kiosco Asistencia)';
      case 'sucursales':
        return 'Red de Sucursales & Cajas';
      case 'configuracion':
        return 'Configuración Global de Empresa & SAT';
      case 'live_sales':
        return 'TikTok Live & Canastas Abiertas (Social Commerce)';
      default:
        return 'Módulo';
    }
  };

  useEffect(() => {
    // Token de sesión activa conectado en vivo con el Droplet de producción
    const currentToken = localStorage.getItem('integrapro_token');
    if (!currentToken || currentToken.startsWith('1008|')) {
      localStorage.setItem('integrapro_token', '1010|9ggVi6lr0qdKDfB6ICqrGsQU5au5XmRUUuxiwFgfb6e323c2');
    }

    // Sincronizar directorio de empresas en vivo desde la base de datos del Droplet
    empresaApi.getAll().then((data: any[]) => {
      if (Array.isArray(data) && data.length > 0) {
        // Filtrar empresas inactivas y el antiguo registro técnico de IntegraPro Admin (ID: 2)
        const validCompanies = data.filter((e: any) => {
          const empId = e.id_empresa || e.id;
          const name = e.nombre || '';
          return empId !== 2 && !name.includes('IntegraPro Admin') && (e.activa === undefined || Boolean(e.activa));
        });

        const mapped: EmpresaSaaS[] = validCompanies.map((e: any) => {
          const empId = e.id_empresa || e.id;
          const defaultMatch = DEFAULT_EMPRESAS_LIST.find(d => d.id === empId);
          return {
            id: empId,
            nombre: e.nombre || 'Empresa Sin Nombre',
            razon_social: e.razon_social || e.nombre || 'Sin Razón Social',
            nit: e.nit || 'CF',
            pais: e.pais || 'GT',
            regimen: e.regimen_tributario === 'informal' 
              ? 'Exento / Informal' 
              : (e.regimen_tributario === 'pequeno_contribuyente' 
                ? 'Pequeño Contribuyente (5%)' 
                : 'General (IVA 12%)'),
            plan: (e.plan_type as any) || defaultMatch?.plan || 'enterprise',
            activa: Boolean(e.activa !== false),
            telefono: e.telefono || '',
            email: e.email || '',
            direccion: e.direccion || '',
            modules: defaultMatch?.modules || {
              live_sales: empId === 1,
              pos: true,
              inventory: true,
              clients: true
            }
          };
        });

        // Asegurar que las empresas base siempre estén en la lista si no vinieron de la API
        DEFAULT_EMPRESAS_LIST.forEach(def => {
          if (!mapped.some(m => m.id === def.id)) {
            mapped.push(def);
          }
        });

        setEmpresasList(mapped);
        localStorage.setItem('integrapro_empresas_list', JSON.stringify(mapped));
      }
    }).catch(err => {
      console.warn('Error fetching live empresas from Droplet:', err);
    });
  }, []);

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
          return filtered;
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

  const [isLiveOnlyMode, setIsLiveOnlyMode] = useState<boolean>(() => {
    const savedActive = localStorage.getItem('integrapro_active_empresa_id');
    return savedActive === '99' && localStorage.getItem('integrapro_mode_live_only') === 'true';
  });

  const selectedEmpresa = empresasList.find((e) => e.id === selectedEmpresaId) || empresasList[0];

  // Determinar si la empresa activa opera en Modo Solo Live (para CUALQUIER empresa, no solo la 99)
  const isCompanyLiveOnly = selectedEmpresaId !== 22 && (
    selectedEmpresa?.plan === 'live_express' || 
    selectedEmpresa?.modules?.live_only === true || 
    (selectedEmpresa?.modules?.pos === false && selectedEmpresa?.modules?.live_sales === true) ||
    isLiveOnlyMode
  );

  const handleSelectEmpresa = (id: number) => {
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
    const found = currentList.find((e) => e.id === id) || empresasList.find((e) => e.id === id);
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
      }
    }
    // Si se selecciona Fortexa Technologies, navegar directamente a su panel de software y apps
    if (id === 22) {
      setIsLiveOnlyMode(false);
      localStorage.setItem('integrapro_mode_live_only', 'false');
      setActiveTab('fortexa_apps');
    }
  };

  // Protección: En Fortexa Technologies no aplica Punto de Venta (POS)
  useEffect(() => {
    if (selectedEmpresaId === 22 && activeTab === 'pos') {
      setActiveTab('fortexa_apps');
    }
  }, [selectedEmpresaId, activeTab]);

  const handleUpdateEmpresa = (updatedEmp: EmpresaSaaS) => {
    setEmpresasList(prev => {
      const updated = prev.map(e => e.id === updatedEmp.id ? updatedEmp : e);
      localStorage.setItem('integrapro_empresas_list', JSON.stringify(updated));
      return updated;
    });

    if (selectedEmpresaId === updatedEmp.id) {
      setCurrentUser(prev => ({
        ...prev,
        empresa_id: updatedEmp.id,
        empresa_nombre: updatedEmp.nombre,
        empresa_regimen: updatedEmp.regimen
      }));
      localStorage.setItem('integrapro_active_empresa', JSON.stringify(updatedEmp));

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
      authApi.getMe()
        .then((res) => {
          if (res?.data || res?.user) {
            const u = res.data || res.user;
            setCurrentUser((prev) => ({
              ...prev,
              id: u.id || prev.id,
              name: u.name || prev.name,
              email: u.email || prev.email,
              role: u.role || prev.role,
              empresa_id: u.id_empresa || prev.empresa_id,
              empresa_nombre: u.empresa?.nombre || prev.empresa_nombre
            }));
            setIsAuthenticated(true);
          }
        })
        .catch(() => {
          // Si el token expira o el backend está offline, conservamos la sesión local
        });
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      localStorage.removeItem('integrapro_token');
    }
    setIsAuthenticated(false);
  };

  const handleApplyUpdate = () => {
    setUpdateNotificationToast('¡Sistema actualizado a v2.1 exitosamente sin interrumpir tu sesión!');
    setHasUpdate(false);
    setTimeout(() => {
      setUpdateNotificationToast(null);
    }, 4000);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <LiveSalesProvider>
      {/* Si está en Modo Solo Live Express (cualquier empresa configurada con plan live_express o solo live), mostrar la interfaz exclusiva sin ERP */}
      {isCompanyLiveOnly ? (
        <LiveExpressShell
          empresa={selectedEmpresa}
          empresas={empresasList}
          onSelectEmpresa={handleSelectEmpresa}
          onExitLiveMode={() => {
            setIsLiveOnlyMode(false);
            localStorage.setItem('integrapro_mode_live_only', 'false');
            setActiveTab('hub');
          }}
        />
      ) : (
        <div className="min-h-screen flex bg-slate-100 text-slate-800 antialiased font-sans">
        {/* Toast Flotante de Actualización */}
        {updateNotificationToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold">{updateNotificationToast}</span>
          </div>
        )}

        {/* Drawer Lateral Deslizante (Opcional, accesible desde el botón de la barra superior) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop con desenfoque suave */}
            <div 
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Panel Lateral Drawer */}
            <div className="relative z-50 flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-200">
              <Sidebar 
                user={currentUser} 
                activeTab={activeTab} 
                onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }} 
                hasUpdate={hasUpdate}
                onApplyUpdate={handleApplyUpdate}
                currentEmpresaId={selectedEmpresaId}
                currentEmpresa={selectedEmpresa}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Área Central de Contenido (Aprovecha el 100% del ancho de pantalla sin estorbos laterales) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Navbar 
            user={currentUser} 
            onLogout={handleLogout} 
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            empresas={empresasList}
            selectedEmpresaId={selectedEmpresaId}
            onSelectEmpresa={handleSelectEmpresa}
            activeTab={activeTab}
            onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
            onEnterLiveMode={() => {
              setIsLiveOnlyMode(true);
              localStorage.setItem('integrapro_mode_live_only', 'true');
            }}
          />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Si está dentro de un módulo específico, muestra el encabezado con botón de regreso */}
            {activeTab !== 'hub' && (
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200/90 shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('hub')}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-bold text-xs border border-slate-200 hover:border-indigo-200 transition-all shadow-2xs group cursor-pointer"
                    title="Regresar a la pantalla de tarjetas principales"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-indigo-600" />
                    <span>Volver al Menú Principal</span>
                  </button>

                  <span className="text-slate-300 font-light">/</span>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                      {getModuleName(activeTab, selectedEmpresaId)}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {selectedEmpresa?.nombre}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">100% Ancho Libre</span>
                </div>
              </div>
            )}

            {/* Vistas según pestaña activa */}
            {activeTab === 'hub' && (
              <LaunchpadHub 
                user={currentUser}
                selectedEmpresa={selectedEmpresa}
                onNavigate={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
                empresas={empresasList}
                onSelectEmpresa={handleSelectEmpresa}
              />
            )}
            {activeTab === 'dashboard' && (
              <Dashboard 
                empresas={empresasList}
                selectedEmpresaId={selectedEmpresaId}
                onSelectEmpresa={handleSelectEmpresa}
              />
            )}
            {activeTab === 'inventario' && <Inventory currentEmpresa={selectedEmpresa} />}
            {activeTab === 'pos' && <PosTerminal currentEmpresa={selectedEmpresa} />}
            {activeTab === 'ventas' && <Sales currentEmpresa={selectedEmpresa} />}
            {activeTab === 'clientes' && <Clients />}
            {activeTab === 'compras' && <Purchases />}
            {activeTab === 'contabilidad' && <Accounting currentEmpresa={selectedEmpresa} />}
            {activeTab === 'rrhh' && <HumanResources />}
            {activeTab === 'asistencia' && <AttendanceKiosk />}
            {activeTab === 'sucursales' && <Branches />}
            {activeTab === 'fortexa_apps' && (
              <FortexaAppsView 
                currentEmpresa={selectedEmpresa} 
                empresas={empresasList}
                onUpdateEmpresa={handleUpdateEmpresa}
                onSelectEmpresa={handleSelectEmpresa}
              />
            )}
            {activeTab === 'live_sales' && (
              <LiveSalesView currentEmpresa={selectedEmpresa} />
            )}
            {activeTab === 'configuracion' && (
              <SettingsView 
                currentEmpresa={selectedEmpresa} 
                onUpdateEmpresa={handleUpdateEmpresa} 
              />
            )}
          </div>
        </main>
      </div>

      {/* Modal Paleta de Comandos (Ctrl + K) */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
          <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Escribe un comando o busca algo (ej. 'POS', 'Stock', 'Aceite')..." 
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
              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Acciones Rápidas</p>
              <button 
                type="button"
                onClick={() => { setActiveTab('hub'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-indigo-600" /> Ir al Menú Principal (Tarjetas)</span>
                <span className="text-[10px] text-slate-400">Inicio</span>
              </button>
              {selectedEmpresaId !== 22 ? (
                <button 
                  type="button"
                  onClick={() => { setActiveTab('pos'); setCommandPaletteOpen(false); }}
                  className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
                >
                  <span className="flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-indigo-600" /> Ir a Punto de Venta (POS)</span>
                  <span className="text-[10px] text-slate-400">Atajo</span>
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => { setActiveTab('fortexa_apps'); setCommandPaletteOpen(false); }}
                  className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
                >
                  <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-purple-600" /> Suscripciones & Apps Fortexa</span>
                  <span className="text-[10px] text-slate-400">Atajo</span>
                </button>
              )}
              <button 
                type="button"
                onClick={() => { setActiveTab('inventario'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Package className="w-4 h-4 text-emerald-600" /> Consultar Stock de Inventario</span>
                <span className="text-[10px] text-slate-400">Atajo</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('compras'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-violet-600" /> Facturas de Compra & Proveedores</span>
                <span className="text-[10px] text-slate-400">Atajo</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('contabilidad'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Landmark className="w-4 h-4 text-emerald-600" /> Libro Diario & Fiscalidad SAT</span>
                <span className="text-[10px] text-slate-400">Atajo</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('clientes'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-teal-600" /> Cartera de Clientes & Créditos</span>
                <span className="text-[10px] text-slate-400">Atajo</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('dashboard'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /> Ver Métricas del Dashboard</span>
                <span className="text-[10px] text-slate-400">Atajo</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('asistencia'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-purple-600" /> Reloj Checador (Kiosco Asistencia)</span>
                <span className="text-[10px] text-slate-400">Atajo</span>
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('configuracion'); setCommandPaletteOpen(false); }}
                className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium"
              >
                <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-indigo-600" /> Configuración de Empresa (SAT & FEL)</span>
                <span className="text-[10px] text-slate-400">Atajo</span>
              </button>
            </div>
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Navega con flechas y presiona Enter</span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">ESC para cerrar</kbd>
            </div>
          </div>
        </div>
      )}
      </div>
      )}
    </LiveSalesProvider>
  );
}
