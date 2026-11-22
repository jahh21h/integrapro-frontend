import { useState } from 'react';
import { 
  Video, 
  Boxes, 
  Users, 
  ArrowLeft, 
  Building2,
  Store,
  BarChart3,
  LogOut
} from 'lucide-react';
import { EmpresaSaaS } from '../types';
import LiveSalesView from '../pages/LiveSalesView';
import Inventory from '../pages/Inventory';
import Clients from '../pages/Clients';
import SettingsView from '../pages/SettingsView';
import LiveDashboardTab from './LiveDashboardTab';
import { useLiveSales } from '../context/LiveSalesContext';

interface LiveExpressShellProps {
  empresa: EmpresaSaaS;
  empresas?: EmpresaSaaS[];
  onSelectEmpresa?: (id: number) => void;
  onExitLiveMode: () => void;
  onLogout?: () => void;
}

export default function LiveExpressShell({
  empresa,
  empresas,
  onSelectEmpresa,
  onExitLiveMode,
  onLogout
}: LiveExpressShellProps) {
  const [activeTab, setActiveTab] = useState<'live_sales' | 'inventario' | 'clientes' | 'metricas' | 'ajustes'>('live_sales');
  const { isLiveActive: rawIsLiveActive, currentSession: rawCurrentSession, bags: allBags } = useLiveSales();

  // Aislamiento estricto por empresa activa
  const tenantBags = allBags.filter(b => Number(b.empresa_id) === Number(empresa.id));
  const currentSession = rawCurrentSession && Number(rawCurrentSession.empresa_id) === Number(empresa.id) ? rawCurrentSession : null;
  const isLiveActive = Boolean(rawIsLiveActive && currentSession);

  const totalRecaudado = tenantBags.reduce((acc, b) => acc + (b.estado !== 'cancelada' ? b.total : 0), 0);
  const totalApartadas = tenantBags.reduce((acc, b) => acc + b.items.reduce((s, it) => s + it.cantidad, 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* 1. BARRA SUPERIOR EXCLUSIVA PARA STREAMERS DE LIVE */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-purple-900/40 px-3 sm:px-6 py-2.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Lado Izquierdo: Branding y Estado en Vivo */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 shrink-0">
                <Video className="w-5 h-5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-black text-white tracking-tight truncate max-w-[130px] xs:max-w-[180px]">
                    {empresa.nombre}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  {isLiveActive ? (currentSession?.titulo || 'Transmisión en Directo') : 'Venta por TikTok Live & Redes'}
                </p>
              </div>
            </div>

            {/* Acciones Mobile: Selector de Empresa y Botón Salir */}
            <div className="flex items-center gap-1.5 shrink-0">
              {empresas && onSelectEmpresa && (
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:hidden">
                  <Building2 className="w-3 h-3 text-indigo-400" />
                  <select
                    value={empresa.id}
                    onChange={(e) => onSelectEmpresa(Number(e.target.value))}
                    className="bg-transparent text-[11px] font-bold text-white focus:outline-none max-w-[85px] truncate"
                  >
                    {empresas.map(e => (
                      <option key={e.id} value={e.id} className="bg-slate-900 text-white">
                        {e.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Salir</span>
                </button>
              )}
            </div>
          </div>

          {/* Centro: Pestañas ÚNICAS que necesita la vendedora (Totalmente Responsivo) */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60 shadow-inner w-full sm:w-auto overflow-x-auto scrollbar-none gap-1 max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab('live_sales')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'live_sales'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Venta en Vivo & Canastas</span>
              <span className="sm:hidden">Live</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inventario')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'inventario'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prendas en Stock</span>
              <span className="sm:hidden">Stock</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('clientes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'clientes'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mis Clientas</span>
              <span className="sm:hidden">Clientas</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('metricas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'metricas'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resultados del Live</span>
              <span className="sm:hidden">Métricas</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ajustes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'ajustes'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Datos de Mi Tienda</span>
              <span className="sm:hidden">Tienda</span>
            </button>
          </div>

          {/* Lado Derecho: Métricas, Selector de Empresa y Botón de Salir a ERP */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 justify-end">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-800/90 border border-slate-700/80 rounded-xl text-xs font-mono">
              <span className="text-rose-400 font-bold">Q {totalRecaudado.toFixed(2)}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{totalApartadas} prendas apartadas</span>
            </div>

            {empresas && onSelectEmpresa && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 border border-slate-700 rounded-xl text-xs">
                <Building2 className="w-3 h-3 text-indigo-400" />
                <select
                  value={empresa.id}
                  onChange={(e) => onSelectEmpresa(Number(e.target.value))}
                  className="bg-transparent text-[11px] font-bold text-white focus:outline-none cursor-pointer max-w-[120px] truncate"
                >
                  {empresas.map(e => (
                    <option key={e.id} value={e.id} className="bg-slate-900 text-white">
                      {e.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                onExitLiveMode();
                if (onSelectEmpresa) onSelectEmpresa(22);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-900/30 transition-all cursor-pointer"
              title="Volver a la consola maestra de Fortexa Technologies y ver todo el sistema"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-200" />
              <span className="hidden md:inline">Consola Fortexa</span>
              <span className="md:hidden">Fortexa</span>
            </button>

            <button
              type="button"
              onClick={onExitLiveMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer"
              title="Volver a la vista del ERP completo con todos los módulos empresariales"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Salir a ERP Completo</span>
              <span className="md:hidden">ERP</span>
            </button>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all cursor-pointer shadow-sm"
                title="Cerrar sesión en el sistema"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Cerrar Sesión</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL SEGÚN PESTAÑA */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6">
        {activeTab === 'live_sales' && (
          <LiveSalesView key={empresa.id} currentEmpresa={empresa} />
        )}

        {activeTab === 'inventario' && (
          <div className="bg-white rounded-3xl text-slate-900 p-2 sm:p-4 shadow-2xl">
            <div className="mb-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs flex items-center justify-between text-amber-900">
              <span className="font-bold flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-amber-600" />
                Catálogo de Prendas para Transmisión en Vivo
              </span>
              <span className="text-[11px] text-amber-700">
                Las prendas editadas aquí se sincronizan al instante en la pantalla del Live
              </span>
            </div>
            <Inventory key={empresa.id} currentEmpresa={empresa} />
          </div>
        )}

        {activeTab === 'clientes' && (
          <div className="bg-white rounded-3xl text-slate-900 p-2 sm:p-4 shadow-2xl">
            <div className="mb-4 p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs flex items-center justify-between text-blue-900">
              <span className="font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                Directorio de Clientas de TikTok y WhatsApp
              </span>
              <span className="text-[11px] text-blue-700">
                Registro de números para envío de recibos y direcciones de paquetería
              </span>
            </div>
            <Clients key={empresa.id} currentEmpresa={empresa} />
          </div>
        )}

        {activeTab === 'metricas' && (
          <LiveDashboardTab key={empresa.id} empresa={empresa} />
        )}

        {activeTab === 'ajustes' && (
          <div className="bg-white rounded-3xl text-slate-900 p-4 sm:p-6 shadow-2xl">
            <SettingsView key={empresa.id} currentEmpresa={empresa} onSelectEmpresa={onSelectEmpresa} />
          </div>
        )}
      </main>

    </div>
  );
}
