import React, { useState, useEffect } from 'react';
import { NavigationTab, User, EmpresaSaaS } from '../types';
import { 
  LayoutDashboard, 
  Boxes, 
  Zap, 
  ReceiptText, 
  UserCheck, 
  Store, 
  RefreshCw, 
  Truck, 
  Landmark, 
  Users, 
  Clock3,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Settings,
  Cpu,
  LayoutGrid,
  Key,
  X,
  Video,
  ShieldCheck,
  ExternalLink,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  user: User;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  hasUpdate?: boolean;
  onApplyUpdate?: () => void;
  currentEmpresaId?: number;
  currentEmpresa?: EmpresaSaaS;
  onClose?: () => void;
  onLogout?: () => void;
}

interface MenuItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: {
    text: string;
    variant?: 'neutral' | 'indigo' | 'amber' | 'emerald';
  };
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function Sidebar({ 
  user, 
  activeTab, 
  onTabChange, 
  hasUpdate = true, 
  onApplyUpdate,
  currentEmpresaId,
  currentEmpresa,
  onClose,
  onLogout
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('integrapro_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('integrapro_sidebar_collapsed', String(isCollapsed));
    } catch {
      // ignore
    }
  }, [isCollapsed]);

  const toggleCollapsed = () => {
    setIsCollapsed(prev => !prev);
  };

  const activeEmpresaId = currentEmpresaId ?? user.empresa_id;
  const isFortexa = activeEmpresaId === 22;
  const hasPosEnabled = !isFortexa && currentEmpresa?.modules?.pos !== false;
  const hasLiveEnabled = !isFortexa && (currentEmpresa?.modules?.live_sales ?? activeEmpresaId === 1);

  const commercialItems: MenuItem[] = isFortexa ? [
    { 
      id: 'fortexa_apps', 
      label: 'Suscripciones & Apps', 
      icon: Cpu,
      badge: { text: 'SaaS / Cortes', variant: 'indigo' }
    },
    { 
      id: 'ventas', 
      label: 'Ventas & Facturación (FEL)', 
      icon: ReceiptText,
      badge: { text: 'B2B', variant: 'emerald' }
    },
    { 
      id: 'clientes', 
      label: 'Clientes & Flotas', 
      icon: Users,
    },
    { 
      id: 'inventario', 
      label: 'Hardware & Equipos', 
      icon: Boxes,
      badge: { text: 'Tech', variant: 'amber' }
    },
    { 
      id: 'asistencia', 
      label: 'Kiosco de Asistencia', 
      icon: Clock3,
    },
  ] : [
    ...(hasPosEnabled ? [{ 
      id: 'pos' as NavigationTab, 
      label: 'Punto de Venta (POS)', 
      icon: Zap,
      badge: { text: 'Caja', variant: 'emerald' as const }
    }] : []),
    ...(hasLiveEnabled ? [{ 
      id: 'live_sales' as NavigationTab, 
      label: 'TikTok Live Commerce', 
      icon: Video,
      badge: { text: 'Live', variant: 'emerald' as const }
    }] : []),
    { 
      id: 'inventario', 
      label: 'Inventario & Bodega', 
      icon: Boxes,
      badge: { text: 'Stock', variant: 'amber' }
    },
    { 
      id: 'ventas', 
      label: 'Ventas & Facturación', 
      icon: ReceiptText,
    },
    { 
      id: 'clientes', 
      label: 'Clientes & Créditos', 
      icon: Users,
    },
    { 
      id: 'asistencia', 
      label: 'Kiosco de Asistencia', 
      icon: Clock3,
    },
  ];

  const systemItems: MenuItem[] = [
    { 
      id: 'rrhh', 
      label: 'Recursos Humanos', 
      icon: UserCheck,
    },
    { 
      id: 'sucursales', 
      label: 'Red de Sucursales', 
      icon: Store,
    },
    { 
      id: 'token_scraper', 
      label: 'Token Scraper Chrome', 
      icon: Key,
      badge: { text: 'API', variant: 'indigo' }
    },
    { 
      id: 'configuracion', 
      label: 'Configuración Global', 
      icon: Settings,
    },
  ];

  const rawMenuSections: MenuSection[] = [
    {
      title: 'Principal',
      items: [
        { 
          id: 'hub', 
          label: 'Menú de Módulos (Inicio)', 
          icon: LayoutGrid,
          badge: { text: 'Tarjetas', variant: 'indigo' }
        },
        { 
          id: 'dashboard', 
          label: 'Dashboard Ejecutivo', 
          icon: LayoutDashboard,
        },
      ]
    },
    {
      title: 'Operaciones Comerciales',
      items: commercialItems
    },
    {
      title: 'Finanzas & Compras',
      items: [
        { 
          id: 'compras', 
          label: 'Compras & Proveedores', 
          icon: Truck,
        },
        { 
          id: 'contabilidad', 
          label: 'Contabilidad & SAT', 
          icon: Landmark,
          badge: { text: 'FEL', variant: 'indigo' }
        },
      ]
    },
    {
      title: 'Empresa & Sistema',
      items: systemItems
    }
  ];

  const isLiveOnlyCompany = !isFortexa && (
    currentEmpresa?.plan === 'live_express' ||
    currentEmpresa?.modules?.live_only === true ||
    currentEmpresa?.id === 99 ||
    (currentEmpresa?.modules?.pos === false && currentEmpresa?.modules?.live_sales === true)
  );

  const isItemLocked = (id: NavigationTab): boolean => {
    if (isFortexa) return false;
    if (id === 'hub') return false;
    if (isLiveOnlyCompany) {
      return !['live_sales', 'inventario', 'dashboard', 'clientes', 'configuracion'].includes(id);
    }
    if (currentEmpresa?.modules && currentEmpresa.modules[id] === false) {
      return true;
    }
    return false;
  };

  const menuSections: MenuSection[] = rawMenuSections.map(sec => ({
    ...sec,
    items: sec.items.map(item => {
      const locked = isItemLocked(item.id);
      const isStoreConfig = item.id === 'configuracion' && isLiveOnlyCompany;
      return {
        ...item,
        label: isStoreConfig ? 'Datos de Mi Tienda' : item.label,
        icon: isStoreConfig ? Store : item.icon,
        badge: locked ? { text: '🔒 Pro', variant: 'amber' as const } : item.badge
      };
    })
  }));

  const getBadgeClass = (variant?: 'neutral' | 'indigo' | 'amber' | 'emerald') => {
    switch (variant) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'indigo':
        return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border border-slate-700';
    }
  };

  return (
    <aside 
      className={`relative z-20 flex flex-col shrink-0 bg-[#0B0F19] border-r border-slate-800/80 text-slate-300 transition-all duration-300 ease-in-out select-none ${
        isCollapsed ? 'w-[76px]' : 'w-64'
      }`}
    >
      {/* Sutil resplandor de iluminación ambiental superior */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-500/[0.07] to-transparent" />

      {/* 1. Header con Brand Logo y Toggle de Colapso */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/60 relative">
        <div className={`flex items-center gap-3 overflow-hidden transition-all duration-200 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          {/* Logo Monograma Elegante */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-600/30 border border-indigo-400/30 shrink-0">
            <span className="tracking-tighter font-mono">IP</span>
          </div>

          {!isCollapsed && (
            <div className="min-w-0 flex-1 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-sm tracking-tight truncate">
                  Integra<span className="text-indigo-400 font-black">Pro</span>
                </span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  ERP
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium truncate flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">{user.empresa_nombre || 'Corporación IntegraPro'}</span>
              </p>
            </div>
          )}
        </div>

        {/* Botones de Colapso / Cerrar Drawer */}
        <div className="flex items-center gap-1">
          {!isCollapsed && (
            <button
              type="button"
              onClick={toggleCollapsed}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors border border-transparent hover:border-slate-700/60"
              title="Colapsar menú lateral"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors"
              title="Cerrar panel lateral"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Botón flotante para expandir cuando está colapsado */}
      {isCollapsed && (
        <div className="px-3 pt-2">
          <button
            type="button"
            onClick={toggleCollapsed}
            className="w-full py-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors border border-slate-800 flex items-center justify-center"
            title="Expandir menú lateral"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Menú de Navegación Streamlined & Minimalista */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {/* Título de Sección */}
            {!isCollapsed ? (
              <div className="px-2.5 pt-2 pb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500/90 font-mono">
                  {section.title}
                </span>
              </div>
            ) : (
              <div className="w-full border-t border-slate-800/60 my-2" />
            )}

            {/* Ítems del Menú */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <div key={item.id} className="relative group">
                    <button
                      type="button"
                      onClick={() => {
                        if (isItemLocked(item.id)) {
                          alert(`🔒 Módulo "${item.label}" no incluido en tu plan actual.\n\nPara activarlo en tu cuenta de IntegraPro, solicítalo a Fortexa Technologies desde el Menú Principal.`);
                          onTabChange('hub');
                        } else {
                          onTabChange(item.id);
                        }
                      }}
                      className={`w-full flex items-center rounded-xl text-xs transition-all duration-150 relative ${
                        isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                      } ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600/20 via-indigo-600/10 to-transparent text-white font-semibold border border-indigo-500/30 shadow-sm shadow-indigo-950/40'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent'
                      }`}
                    >
                      {/* Línea indicadora vertical para el ítem activo */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-indigo-500 shadow-sm shadow-indigo-400" />
                      )}

                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive 
                            ? 'text-indigo-400' 
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`} />

                        {!isCollapsed && (
                          <span className="truncate tracking-tight font-medium">
                            {item.label}
                          </span>
                        )}
                      </div>

                      {/* Badge minimalista */}
                      {!isCollapsed && item.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${getBadgeClass(item.badge.variant)}`}>
                          {item.badge.text}
                        </span>
                      )}
                    </button>

                    {/* Tooltip flotante en modo colapsado */}
                    {isCollapsed && (
                      <div className="fixed left-[84px] ml-1 px-2.5 py-1 bg-slate-900/95 text-white text-[11px] font-semibold rounded-lg shadow-2xl border border-slate-700/80 whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1.5">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded ${getBadgeClass(item.badge.variant)}`}>
                            {item.badge.text}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. Notificación de Actualización / Estado Zero-Downtime */}
      {hasUpdate && !isCollapsed && (
        <div className="p-3 mx-3 mb-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              v2.1 Disponible
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Nuevas mejoras listas para aplicar.
          </p>
          <button
            type="button"
            onClick={onApplyUpdate}
            className="mt-2 w-full py-1 px-2 bg-indigo-600/80 hover:bg-indigo-600 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Actualizar Sistema</span>
          </button>
        </div>
      )}

      {/* 4. Footer Perfil de Usuario Elegante y Compacto */}
      <div className="p-3 border-t border-slate-800/70 bg-[#080B12]">
        {!isCollapsed ? (
          <a
            href="/admin"
            className="flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-medium text-slate-400 hover:text-indigo-300 hover:bg-slate-800/60 rounded-lg transition-colors border border-slate-800/60 mb-2.5"
            title="Abrir Panel Filament ERP"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">Panel Filament Admin</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-70 shrink-0" />
          </a>
        ) : (
          <a
            href="/admin"
            className="flex items-center justify-center p-1.5 text-slate-400 hover:text-indigo-300 hover:bg-slate-800/60 rounded-lg transition-colors border border-slate-800/60 mb-2.5"
            title="Panel Filament Admin"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </a>
        )}

        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-2.5`}>
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Avatar Minimalista con Status */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 text-white font-bold text-xs flex items-center justify-center">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#080B12]" />
            </div>

            {!isCollapsed && (
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-slate-200 truncate leading-snug">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-400 font-medium truncate leading-tight">
                  {user.role}
                </p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="text-[9px] font-mono text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded">
              ONLINE
            </div>
          )}
        </div>

        {/* Botón Cerrar Sesión en Drawer */}
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all shadow-sm cursor-pointer ${
              isCollapsed ? 'p-2' : ''
            }`}
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            {!isCollapsed && <span>Cerrar Sesión</span>}
          </button>
        )}
      </div>
    </aside>
  );
}
