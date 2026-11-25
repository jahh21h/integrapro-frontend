import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  LayoutGrid,
  Zap,
  Boxes,
  ReceiptText,
  Users,
  BarChart3,
  Cpu,
  Truck,
  Landmark,
  UserCheck,
  Clock3,
  Store,
  Settings,
  Video,
} from 'lucide-react';
import { EmpresaSaaS, NavigationTab } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FloatingGlassDockProps {
  activeTab: NavigationTab;
  onSelect: (tab: NavigationTab) => void;
  selectedEmpresa?: EmpresaSaaS;
  selectedEmpresaId: number;
}

interface DockModuleItem {
  id: NavigationTab;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}

/**
 * Floating Glass Dock Vertical Completo (todos los módulos habilitados de la empresa)
 * - Escritorio (md+): columna vertical fija a la izquierda debajo de la cabecera con scroll discreto y tooltip flotante fixed
 * - Móvil (< md): barra horizontal deslizable inferior
 */
export default function FloatingGlassDock({
  activeTab,
  onSelect,
  selectedEmpresa,
  selectedEmpresaId,
}: FloatingGlassDockProps) {
  const { L } = useLanguage();
  const [hoveredTip, setHoveredTip] = useState<{ label: string; top: number; left: number } | null>(null);
  const [isDimmed, setIsDimmed] = useState(false);
  const isDockHoveredRef = useRef(false);
  const idleTimerRef = useRef<number | null>(null);

  const scheduleDim = useCallback(() => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    setIsDimmed(false);
    if (!isDockHoveredRef.current) {
      idleTimerRef.current = window.setTimeout(() => {
        if (!isDockHoveredRef.current) {
          setIsDimmed(true);
        }
      }, 60_000);
    }
  }, []);

  useEffect(() => {
    scheduleDim();
    return () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [activeTab, selectedEmpresaId, scheduleDim]);

  const isFortexa = selectedEmpresaId === 22;
  const mods = selectedEmpresa?.modules;
  const posEnabled = !isFortexa && mods?.pos !== false;
  const liveEnabled = !isFortexa && (mods?.live_sales ?? selectedEmpresaId === 1);

  const rawItems: DockModuleItem[] = [
    { id: 'hub', label: L('Menú Principal', 'Main Menu'), shortLabel: L('Módulos', 'Modules'), icon: LayoutGrid },
    ...(isFortexa
      ? [{ id: 'fortexa_apps' as NavigationTab, label: L('Suscripciones & Apps Fortexa', 'Fortexa Subscriptions & Apps'), shortLabel: 'SaaS', icon: Cpu }]
      : []),
    ...(posEnabled
      ? [{ id: 'pos' as NavigationTab, label: L('Punto de Venta (POS Rápido)', 'Point of Sale (Quick POS)'), shortLabel: 'POS', icon: Zap }]
      : []),
    ...(liveEnabled
      ? [{ id: 'live_sales' as NavigationTab, label: L('TikTok Live & Canastas', 'TikTok Live & Baskets'), shortLabel: 'Live', icon: Video }]
      : []),
    {
      id: 'inventario',
      label: isFortexa ? L('Hardware & Equipos', 'Hardware & Equipment') : L('Inventario & Bodega', 'Inventory & Warehouse'),
      shortLabel: L('Bodega', 'Stock'),
      icon: Boxes,
    },
    { id: 'ventas', label: L('Ventas & Comprobantes PDF', 'Sales & PDF Receipts'), shortLabel: L('Ventas', 'Sales'), icon: ReceiptText },
    { id: 'clientes', label: L('Clientes & Créditos (CxC)', 'Clients & Credit (A/R)'), shortLabel: L('CxC', 'A/R'), icon: Users },
    { id: 'compras', label: L('Compras & Proveedores', 'Purchases & Suppliers'), shortLabel: L('Compras', 'Orders'), icon: Truck },
    { id: 'contabilidad', label: L('Contabilidad & Control SAT', 'Accounting & Tax Compliance'), shortLabel: L('SAT', 'Tax'), icon: Landmark },
    { id: 'dashboard', label: L('Métricas & Telemetría', 'Metrics & Telemetry'), shortLabel: L('Métricas', 'Metrics'), icon: BarChart3 },
    { id: 'rrhh', label: L('Recursos Humanos & Planillas', 'Human Resources & Payroll'), shortLabel: L('RRHH', 'HR'), icon: UserCheck },
    { id: 'asistencia', label: L('Reloj Checador (Asistencia)', 'Time Clock (Attendance)'), shortLabel: L('Reloj', 'Clock'), icon: Clock3 },
    { id: 'sucursales', label: L('Red de Sucursales', 'Branch Network'), shortLabel: L('Sedes', 'Branches'), icon: Store },
    { id: 'configuracion', label: L('Datos de Mi Tienda', 'My Store Info'), shortLabel: L('Tienda', 'Store'), icon: Settings },
  ];

  // Respetar módulos activos en la configuración de la empresa
  const items = rawItems.filter((item) => {
    if (item.id === 'hub' || item.id === 'fortexa_apps' || item.id === 'configuracion') return true;
    if (isFortexa) return true;
    if (mods && mods[item.id] === false) return false;
    return true;
  });

  return (
    <>
      <nav
        aria-label={L('Navegación Rápida IntegraPro', 'IntegraPro Quick Navigation')}
        onMouseEnter={() => {
          isDockHoveredRef.current = true;
          if (idleTimerRef.current !== null) {
            window.clearTimeout(idleTimerRef.current);
            idleTimerRef.current = null;
          }
          setIsDimmed(false);
        }}
        onMouseLeave={() => {
          isDockHoveredRef.current = false;
          setHoveredTip(null);
          scheduleDim();
        }}
        onPointerDown={() => scheduleDim()}
        onFocus={() => scheduleDim()}
        className={`fixed z-40 bottom-3 left-1/2 -translate-x-1/2 max-w-[95vw] md:bottom-auto md:left-3 md:top-[76px] md:translate-x-0 md:translate-y-0 transition-opacity ${
          isDimmed
            ? 'opacity-25 hover:opacity-100 duration-700'
            : 'opacity-100 duration-200'
        }`}
      >
        <div className="web-floating-dock no-scrollbar rounded-full md:rounded-3xl p-1.5 flex flex-row md:flex-col items-center gap-1 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto md:max-h-[calc(100vh-92px)]">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredTip({
                    label: item.label,
                    top: rect.top + rect.height / 2,
                    left: rect.right + 12,
                  });
                }}
                onMouseLeave={() => setHoveredTip(null)}
                title={item.label}
                className={`group relative w-12 h-11 md:w-[54px] md:h-[46px] shrink-0 rounded-full md:rounded-2xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold transition-all duration-150 cursor-pointer select-none border ${
                  active
                    ? 'bg-emerald-400/20 border-emerald-400/45 shadow-[0_0_20px_rgba(78,222,163,0.34)]'
                    : 'border-transparent hover:bg-white/5'
                }`}
              >
                {active && (
                  <span className="hidden md:block absolute -left-0.5 top-2 bottom-2 w-1 rounded-full bg-emerald-400 shadow-[0_0_10px_#4edea3]" />
                )}

                <Icon
                  className={`relative z-10 w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                    active ? 'text-emerald-300' : 'text-slate-400 group-hover:text-white'
                  }`}
                />
                <span
                  className={`relative z-10 text-[8.5px] leading-none tracking-tight transition-colors ${
                    active ? 'text-emerald-200 font-black' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tooltip flotante global en escritorio (nunca se recorta con scroll) */}
      {hoveredTip && (
        <div
          style={{ top: hoveredTip.top, left: hoveredTip.left }}
          className="hidden md:block fixed -translate-y-1/2 z-50 pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 text-slate-100 text-[11px] font-bold border border-emerald-400/25 shadow-2xl backdrop-blur-md"
        >
          {hoveredTip.label}
        </div>
      )}
    </>
  );
}
