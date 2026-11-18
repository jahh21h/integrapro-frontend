import React, { useState, useEffect, useRef } from 'react';
import { User, EmpresaSaaS, NavigationTab } from '../types';
import { 
  Search, 
  Bell, 
  LogOut, 
  Store, 
  ShieldCheck, 
  ChevronDown, 
  Clock, 
  Building2,
  LayoutGrid,
  ArrowLeft,
  Menu,
  X,
  Boxes,
  Zap,
  ReceiptText,
  UserCheck,
  Truck,
  Landmark,
  Users,
  Clock3,
  BarChart3,
  Settings,
  Cpu,
  Video
} from 'lucide-react';
import { useTimeFormat } from '../context/TimeFormatContext';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onOpenCommandPalette?: () => void;
  empresas?: EmpresaSaaS[];
  selectedEmpresaId?: number;
  onSelectEmpresa?: (id: number) => void;
  activeTab?: NavigationTab;
  onTabChange?: (tab: NavigationTab) => void;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  onEnterLiveMode?: () => void;
}

export default function Navbar({ 
  user, 
  onLogout, 
  onOpenCommandPalette,
  empresas,
  selectedEmpresaId,
  onSelectEmpresa,
  activeTab = 'hub',
  onTabChange,
  onToggleSidebar,
  sidebarOpen = false,
  onEnterLiveMode
}: NavbarProps) {
  const [navTime, setNavTime] = useState(new Date());
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const { timeFormat, toggleTimeFormat, formatTime } = useTimeFormat();

  useEffect(() => {
    const timer = setInterval(() => setNavTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cerrar popover de aplicaciones al hacer clic afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setAppSwitcherOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isFortexa = (selectedEmpresaId ?? user.empresa_id) === 22;

  // Lista de aplicaciones para el App Switcher rápido (9 puntos)
  const quickApps: { id: NavigationTab; label: string; icon: React.ElementType; color: string; badge?: string }[] = isFortexa ? [
    { id: 'hub', label: 'Menú Principal', icon: LayoutGrid, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'fortexa_apps', label: 'Suscripciones & SaaS', icon: Cpu, color: 'text-purple-600 bg-purple-50', badge: 'SaaS' },
    { id: 'ventas', label: 'Ventas FEL (B2B)', icon: ReceiptText, color: 'text-blue-600 bg-blue-50' },
    { id: 'inventario', label: 'Hardware & Equipos', icon: Boxes, color: 'text-amber-600 bg-amber-50' },
    { id: 'clientes', label: 'Clientes & Flotas', icon: Users, color: 'text-cyan-600 bg-cyan-50' },
    { id: 'compras', label: 'Compras & Proveedores', icon: Truck, color: 'text-violet-600 bg-violet-50' },
    { id: 'contabilidad', label: 'Contabilidad SAT', icon: Landmark, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'dashboard', label: 'Dashboard Métricas', icon: BarChart3, color: 'text-rose-600 bg-rose-50' },
    { id: 'rrhh', label: 'Recursos Humanos', icon: UserCheck, color: 'text-teal-600 bg-teal-50' },
    { id: 'asistencia', label: 'Reloj Checador', icon: Clock3, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'sucursales', label: 'Sucursales', icon: Store, color: 'text-blue-600 bg-blue-50' },
    { id: 'configuracion', label: 'Configuración', icon: Settings, color: 'text-slate-600 bg-slate-100' },
  ] : [
    { id: 'hub', label: 'Menú Principal', icon: LayoutGrid, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'pos', label: 'Punto de Venta (POS)', icon: Zap, color: 'text-emerald-600 bg-emerald-50', badge: 'Caja' },
    { id: 'live_sales', label: 'TikTok Live', icon: Video, color: 'text-rose-600 bg-rose-50', badge: 'Live' },
    { id: 'inventario', label: 'Inventario & Bodega', icon: Boxes, color: 'text-amber-600 bg-amber-50' },
    { id: 'ventas', label: 'Ventas & Facturación', icon: ReceiptText, color: 'text-blue-600 bg-blue-50' },
    { id: 'clientes', label: 'Clientes & Créditos', icon: Users, color: 'text-cyan-600 bg-cyan-50' },
    { id: 'compras', label: 'Compras & Proveedores', icon: Truck, color: 'text-violet-600 bg-violet-50' },
    { id: 'contabilidad', label: 'Contabilidad SAT', icon: Landmark, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'dashboard', label: 'Dashboard Métricas', icon: BarChart3, color: 'text-rose-600 bg-rose-50' },
    { id: 'rrhh', label: 'Recursos Humanos', icon: UserCheck, color: 'text-teal-600 bg-teal-50' },
    { id: 'asistencia', label: 'Reloj Checador', icon: Clock3, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'configuracion', label: 'Configuración', icon: Settings, color: 'text-slate-600 bg-slate-100' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-3 sm:px-6 flex items-center justify-between gap-3 shadow-xs">
      {/* Izquierda: Botón de Regreso a Menú Principal / App Switcher / Brand */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Toggle para Drawer Lateral Opcional */}
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors"
            title={sidebarOpen ? "Ocultar Menú Lateral" : "Abrir Menú Lateral"}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        {/* Si NO está en el Hub: Botón Destacado "← Menú Principal" */}
        {activeTab !== 'hub' ? (
          <button
            type="button"
            onClick={() => onTabChange?.('hub')}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md group"
            title="Volver a la pantalla principal con las tarjetas"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Menú Principal</span>
            <span className="sm:hidden">Inicio</span>
          </button>
        ) : (
          /* Si está en el Hub: Logo Monograma Elegante */
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-black text-xs shadow-md shadow-indigo-600/20">
              IP
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-black text-slate-900 tracking-tight block">IntegraPro</span>
              <span className="text-[10px] text-slate-400 font-semibold block -mt-0.5">Cloud ERP</span>
            </div>
          </div>
        )}

        {/* App Switcher de 9 Puntos (Lanzador Rápido Flotante) */}
        <div className="relative" ref={switcherRef}>
          <button
            type="button"
            onClick={() => setAppSwitcherOpen(!appSwitcherOpen)}
            className={`p-2 rounded-xl transition-all ${
              appSwitcherOpen 
                ? 'bg-indigo-50 text-indigo-600 ring-2 ring-indigo-500/20' 
                : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-100'
            }`}
            title="Matriz de Aplicaciones Rápidas"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Menú Flotante de Aplicaciones (9 puntos) */}
          {appSwitcherOpen && (
            <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
                  Módulos de IntegraPro
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Salto rápido</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 max-h-80 overflow-y-auto p-0.5">
                {quickApps.filter(app => {
                  if (app.id === 'hub') return true;
                  const curEmp = empresas?.find(e => e.id === (selectedEmpresaId ?? user.empresa_id));
                  if (curEmp?.modules) {
                    return curEmp.modules[app.id] !== false;
                  }
                  return true;
                }).map(app => {
                  const Icon = app.icon;
                  const isCurrent = activeTab === app.id;
                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => {
                        onTabChange?.(app.id);
                        setAppSwitcherOpen(false);
                      }}
                      className={`flex items-center gap-2.5 p-2 rounded-xl text-left text-xs font-semibold transition-all ${
                        isCurrent 
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${app.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="truncate">{app.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Centro: Buscador / Paleta de Comandos Ctrl + K */}
      <div className="flex-1 max-w-xs sm:max-w-md hidden md:block">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/80 hover:bg-slate-100 text-slate-500 rounded-xl text-xs font-medium border border-slate-200/60 transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <span className="truncate">Buscar productos, clientes, folios...</span>
          </div>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 rounded shadow-xs">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Derecha: Empresa, Sucursal, Notificaciones, Perfil */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Selector de Empresa y Régimen Activo */}
        {empresas && onSelectEmpresa && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
            <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <select
              value={selectedEmpresaId || user.empresa_id}
              onChange={(e) => onSelectEmpresa(Number(e.target.value))}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer max-w-[130px] sm:max-w-[180px] truncate"
              title="Cambiar empresa asignada (Multi-Tenancy)"
            >
              {empresas.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre}
                </option>
              ))}
            </select>
            <span className={`hidden xl:inline-block text-[10px] font-black px-2 py-0.5 rounded-full border shrink-0 ${
              (user.empresa_regimen || '').toLowerCase().includes('peque') || (user.empresa_regimen || '').includes('5%')
                ? 'bg-purple-50 text-purple-800 border-purple-200'
                : (user.empresa_regimen || '').toLowerCase().includes('informal') || (user.empresa_regimen || '').toLowerCase().includes('exento')
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              {(user.empresa_regimen || '').toLowerCase().includes('peque') || (user.empresa_regimen || '').includes('5%')
                ? 'Pequeño Contribuyente (5%)'
                : (user.empresa_regimen || '').toLowerCase().includes('informal') || (user.empresa_regimen || '').toLowerCase().includes('exento')
                ? 'Informal / Exento (0% IVA)'
                : 'General (IVA 12%)'}
            </span>
          </div>
        )}

        {/* Botón para entrar al Modo Solo Live (Vendedora TikTok) */}
        {onEnterLiveMode && (
          <button
            type="button"
            onClick={onEnterLiveMode}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer animate-in fade-in"
            title="Alternar al entorno exclusivo de venta por TikTok Live (sin módulos del ERP)"
          >
            <Video className="w-3.5 h-3.5 animate-pulse text-white" />
            <span className="hidden sm:inline">Modo Solo Live</span>
            <span className="sm:hidden">Live</span>
          </button>
        )}

        {/* Selector de Sucursal Activa */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs font-semibold text-indigo-900">
          <Store className="w-3.5 h-3.5 text-indigo-600" />
          <span className="truncate max-w-[120px]">{user.sucursal_nombre}</span>
          <ChevronDown className="w-3 h-3 text-indigo-400" />
        </div>

        {/* Reloj en Vivo del Sistema con Toggle 12h / 24h */}
        <button
          type="button"
          onClick={toggleTimeFormat}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-mono font-bold border border-slate-200 transition-all cursor-pointer group shadow-xs"
          title={`Hora del sistema: ${formatTime(navTime, true)}. Clic para alternar a formato ${timeFormat === '12h' ? '24 Horas' : '12 Horas (AM/PM)'}`}
        >
          <Clock className="w-3.5 h-3.5 text-indigo-600 group-hover:rotate-45 transition-transform" />
          <span>{formatTime(navTime, false)}</span>
          <span className="text-[9px] font-sans px-1.5 py-0.2 bg-indigo-50 text-indigo-700 font-extrabold rounded-md border border-indigo-200 uppercase">
            {timeFormat}
          </span>
        </button>

        {/* Campana de Notificaciones con Badge */}
        <button 
          type="button" 
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          title="Notificaciones"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>

        {/* Separador vertical */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* Usuario y Rol */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
              {user.name.split(' ')[0]}
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
            </p>
            <p className="text-[10px] font-medium text-slate-400 leading-tight">
              {user.role}
            </p>
          </div>
        </div>

        {/* Botón Salir */}
        <button
          type="button"
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Cerrar Sesión"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
