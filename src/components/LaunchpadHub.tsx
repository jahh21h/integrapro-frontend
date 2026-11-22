import React, { useState, useMemo } from 'react';
import { NavigationTab, User, EmpresaSaaS } from '../types';
import { 
  Boxes, 
  Zap, 
  ReceiptText, 
  UserCheck, 
  Store, 
  Truck, 
  Landmark, 
  Users, 
  Clock3, 
  Sparkles, 
  Settings, 
  Cpu, 
  Search, 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  KeyRound, 
  ShieldAlert, 
  Check, 
  Maximize2,
  ShoppingCart,
  Clock,
  AlertTriangle,
  Video,
  Flame,
  Lock,
  ExternalLink,
  X,
  LogOut
} from 'lucide-react';
import { REAL_SALES } from '../data/realSales';
import { REAL_CLIENTS } from '../data/realClients';
import { useTimeFormat } from '../context/TimeFormatContext';
import { formatRegimenLabel, getTipoRegimenSAT } from '../utils/tax';

interface LaunchpadHubProps {
  user: User;
  selectedEmpresa?: EmpresaSaaS;
  onNavigate: (tab: NavigationTab) => void;
  empresas?: EmpresaSaaS[];
  onSelectEmpresa?: (id: number) => void;
  onLogout?: () => void;
}

interface HubCard {
  id: NavigationTab;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
  badge: {
    text: string;
    color: string;
  };
  metric?: string;
  category: 'operaciones' | 'finanzas' | 'gestion';
  highlight?: boolean;
  widgetType: 
    | 'fortexa_saas'
    | 'pos_terminal'
    | 'inventory_gauge'
    | 'fel_invoice'
    | 'analytics_chart'
    | 'clients_roster'
    | 'logistics_fleet'
    | 'fiscal_ledger'
    | 'hr_team'
    | 'attendance_kiosk'
    | 'branches_net'
    | 'security_system'
    | 'live_stream';
  isLocked?: boolean;
}

// -------------------------------------------------------------
// Componentes de Widgets Animados Especializados por Módulo
// -------------------------------------------------------------

function LiveStreamWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-purple-950 to-rose-950 p-3 overflow-hidden border border-rose-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/30 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-rose-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          TIKTOK LIVE • EN VIVO
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono text-[9px] font-bold border border-rose-500/30">
          Stock Inmediato
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 my-1">
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">👗</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">@marielos</span>
          <span className="text-[8px] text-rose-300 font-mono">Q 320.00</span>
        </div>
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">👖</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">@karla_gt</span>
          <span className="text-[8px] text-amber-300 font-mono">Q 210.00</span>
        </div>
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">🧥</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">@sofi_outfits</span>
          <span className="text-[8px] text-emerald-300 font-mono">Q 215.00</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span className="truncate">3 Canastas • 5 Prendas Apartadas</span>
        <span className="text-amber-400 font-bold flex items-center gap-0.5">
          <Flame className="w-2.5 h-2.5 fill-current" /> Remates Activos
        </span>
      </div>
    </div>
  );
}

function SaaSWallWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-3 overflow-hidden border border-indigo-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/30 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          HOTMART SYNC • LIVE
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[9px] font-bold border border-indigo-500/30">
          ARR Q 24,500
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 my-1">
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">🚗</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">RutaFuel</span>
          <span className="text-[8px] text-emerald-300 font-mono">365d Anual</span>
        </div>
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">💻</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">Quantum</span>
          <span className="text-[8px] text-indigo-300 font-mono">HWID OK</span>
        </div>
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">☁️</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">IntegraPro</span>
          <span className="text-[8px] text-purple-300 font-mono">Cloud ERP</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span className="truncate">3 Suscripciones próximas a corte</span>
        <span className="text-emerald-400 font-bold flex items-center gap-0.5">
          <TrendingUp className="w-2.5 h-2.5" /> +18% MoM
        </span>
      </div>
    </div>
  );
}

function PosScannerWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-3 overflow-hidden border border-emerald-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          CAJA #01 • ACTIVA
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30">
          ESCANER LISTO
        </span>
      </div>

      <div className="relative my-1 bg-black/40 rounded-lg p-2 border border-emerald-500/20 flex items-center justify-between overflow-hidden">
        <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#10b981] animate-laser pointer-events-none" />

        <div className="flex items-center gap-1 h-5 opacity-70">
          <div className="w-1 h-full bg-white/80" />
          <div className="w-0.5 h-full bg-white/50" />
          <div className="w-1.5 h-full bg-white/90" />
          <div className="w-0.5 h-full bg-white/40" />
          <div className="w-1 h-full bg-white/70" />
          <div className="w-2 h-full bg-white/90" />
          <div className="w-0.5 h-full bg-white/60" />
          <div className="w-1 h-full bg-white/80" />
        </div>

        <div className="text-right">
          <span className="text-[9px] text-slate-400 block font-mono">Último Ticket</span>
          <span className="text-xs font-black text-emerald-300 font-mono">Q 150.00</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span className="truncate">Cobro rápido: Efectivo, Tarjeta POS, QR</span>
        <span className="text-emerald-400 font-bold">18 ventas hoy</span>
      </div>
    </div>
  );
}

function InventoryGaugeWidget({ isTech = false }: { isTech?: boolean }) {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-3 overflow-hidden border border-amber-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          {isTech ? 'HARDWARE TECH' : 'STOCK EN BODEGA'}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold border border-amber-500/30">
          2,555 ITEMS
        </span>
      </div>

      <div className="my-1 space-y-1.5">
        <div className="flex items-center justify-between text-[9px] text-slate-300">
          <span>Nivel de Existencias</span>
          <span className="font-bold text-amber-300 font-mono">88% Óptimo</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-400 w-[88%]" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span className="flex items-center gap-1 text-emerald-400">
          <Check className="w-3 h-3" /> Bodega Central OK
        </span>
        <span className="text-amber-400 font-bold flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-amber-400" /> 14 bajo mínimo
        </span>
      </div>
    </div>
  );
}

function FelInvoiceWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-3 overflow-hidden border border-blue-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          SAT DTE CERTIFICADO
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono text-[9px] font-bold border border-blue-500/30">
          INFILE GT
        </span>
      </div>

      <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[9px] text-slate-300 font-mono block">DTE: Serie 4A9B • #1842</span>
          <span className="text-[8px] text-slate-400 font-mono truncate block max-w-[130px]">
            UUID: e4b2-91f0-410a...
          </span>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          FIRMADO
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span className="truncate">Libro de Ventas Fiscal SAT</span>
        <span className="text-blue-300 font-bold">100% Electrónico</span>
      </div>
    </div>
  );
}

function AnalyticsChartWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-3 overflow-hidden border border-rose-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-rose-400">
          <Activity className="w-3 h-3 text-rose-400 animate-pulse" />
          TELEMETRÍA 2026
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono text-[9px] font-bold border border-rose-500/30">
          +24.8% YoY
        </span>
      </div>

      <div className="my-1 h-8 flex items-end justify-between gap-1.5 px-2 bg-black/30 rounded-lg p-1 border border-rose-500/20">
        <div className="flex-1 bg-rose-500/40 rounded-t-sm animate-wave-1" />
        <div className="flex-1 bg-rose-500/60 rounded-t-sm animate-wave-2" />
        <div className="flex-1 bg-rose-400/70 rounded-t-sm animate-wave-3" />
        <div className="flex-1 bg-rose-400 rounded-t-sm animate-wave-4" />
        <div className="flex-1 bg-rose-500/50 rounded-t-sm animate-wave-2" />
        <div className="flex-1 bg-gradient-to-t from-rose-500 to-pink-300 rounded-t-sm animate-wave-3" />
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>Comparativa 2025 vs 2026</span>
        <span className="text-rose-300 font-bold">12 meses analizados</span>
      </div>
    </div>
  );
}

function ClientsRosterWidget({ isB2B = false }: { isB2B?: boolean }) {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-3 overflow-hidden border border-cyan-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-cyan-400">
          <Users className="w-3 h-3 text-cyan-400" />
          {isB2B ? 'CLIENTES & FLOTAS B2B' : 'CARTERA DE CLIENTES'}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-[9px] font-bold border border-cyan-500/30">
          142 ACTIVOS
        </span>
      </div>

      <div className="my-1 flex items-center justify-between bg-white/10 rounded-lg p-1.5 border border-white/10">
        <div className="flex -space-x-1.5 overflow-hidden">
          <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-indigo-600 text-[9px] font-bold text-white text-center leading-6">FS</div>
          <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-emerald-600 text-[9px] font-bold text-white text-center leading-6">TC</div>
          <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-amber-600 text-[9px] font-bold text-white text-center leading-6">LA</div>
          <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-purple-600 text-[9px] font-bold text-white text-center leading-6">+</div>
        </div>

        <div className="text-right">
          <span className="text-[8px] text-slate-400 block font-mono">Crédito Concedido</span>
          <span className="text-[10px] font-bold text-cyan-300 font-mono">Q 42,500.00</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>Cuentas por cobrar al día</span>
        <span className="text-cyan-300 font-bold">Límites protegidos</span>
      </div>
    </div>
  );
}

function LogisticsFleetWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-3 overflow-hidden border border-violet-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-violet-400">
          <Truck className="w-3 h-3 text-violet-400" />
          COMPRAS & PROVEEDORES
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 font-mono text-[9px] font-bold border border-violet-500/30">
          LOGÍSTICA
        </span>
      </div>

      <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between text-[9px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          <span className="text-slate-300">Proveedor</span>
          <div className="w-8 border-t border-dashed border-violet-400" />
          <Truck className="w-3.5 h-3.5 text-violet-300 animate-bounce" />
          <div className="w-8 border-t border-dashed border-violet-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-emerald-300">Bodega</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>Crédito Fiscal 12% SAT</span>
        <span className="text-violet-300 font-bold">3 pedidos en camino</span>
      </div>
    </div>
  );
}

function FiscalLedgerWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-3 overflow-hidden border border-emerald-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-emerald-400">
          <Landmark className="w-3 h-3 text-emerald-400" />
          LIBRO DIARIO & SAT
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30">
          CUADRADO 100%
        </span>
      </div>

      <div className="my-1 bg-black/40 rounded-lg p-1.5 border border-emerald-500/20 grid grid-cols-2 gap-2 text-center">
        <div className="border-r border-white/10 pr-1">
          <span className="text-[8px] text-slate-400 block font-mono">DEBE TOTAL</span>
          <span className="text-[10px] font-bold text-emerald-300 font-mono">Q 118,450.00</span>
        </div>
        <div className="pl-1">
          <span className="text-[8px] text-slate-400 block font-mono">HABER TOTAL</span>
          <span className="text-[10px] font-bold text-emerald-300 font-mono">Q 118,450.00</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>Partida Doble Auditada</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Sin descuadres
        </span>
      </div>
    </div>
  );
}

function HrTeamWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-3 overflow-hidden border border-teal-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-teal-400">
          <UserCheck className="w-3 h-3 text-teal-400" />
          PLANILLA & PERSONAL
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-mono text-[9px] font-bold border border-teal-500/30">
          8 COLABORADORES
        </span>
      </div>

      <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between text-[9px]">
        <span className="text-slate-300">Cuota Laboral IGSS (4.83%)</span>
        <span className="font-bold text-teal-300 font-mono">Al Día</span>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>Expedientes con DPI</span>
        <span className="text-teal-300 font-bold">Nómina Activa</span>
      </div>
    </div>
  );
}

function AttendanceKioskWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-3 overflow-hidden border border-indigo-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-indigo-400">
          <Clock3 className="w-3 h-3 text-indigo-400" />
          KIOSCO RELOJ CHECADOR
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[9px] font-bold border border-indigo-500/30">
          PIN SEGURO
        </span>
      </div>

      <div className="my-1 bg-black/50 rounded-lg p-1.5 border border-indigo-500/30 flex items-center justify-around font-mono">
        <span className="text-xs font-black text-indigo-300 tracking-wider">
          ● ● ● ●
        </span>
        <div className="flex items-center gap-1 text-[9px] text-slate-400">
          <KeyRound className="w-3 h-3 text-indigo-400" />
          <span>Marcaje Rápido</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>Turnos & Horas Extras</span>
        <span className="text-indigo-400 font-bold">100% Digital</span>
      </div>
    </div>
  );
}

function BranchesNetWidget() {
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-3 overflow-hidden border border-blue-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-blue-400">
          <Store className="w-3 h-3 text-blue-400" />
          RED MULTI-SUCURSAL
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono text-[9px] font-bold border border-blue-500/30">
          3 SEDES
        </span>
      </div>

      <div className="my-1 flex items-center justify-between bg-white/10 rounded-lg p-1.5 border border-white/10 text-[9px] text-slate-300">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Central</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Norte</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Sur</span>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>Cajas asignadas por sede</span>
        <span className="text-blue-300 font-bold">Interconectadas</span>
      </div>
    </div>
  );
}

function SecuritySystemWidget({ isInformal = false }: { isInformal?: boolean }) {
  if (isInformal) {
    return (
      <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-3 overflow-hidden border border-indigo-500/30 flex flex-col justify-between shadow-inner">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
        
        <div className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5 font-bold text-indigo-300">
            <Store className="w-3 h-3 text-indigo-400" />
            DATOS DE MI TIENDA
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[9px] font-bold border border-indigo-500/30">
            BOUTIQUE LIVE
          </span>
        </div>

        <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between text-[9px]">
          <span className="text-slate-300">Cuentas Bancarias & Envíos</span>
          <span className="font-bold text-emerald-400 flex items-center gap-1">
            <Check className="w-3 h-3" /> BI • Banrural • BAC
          </span>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
          <span>WhatsApp de Cobro</span>
          <span className="text-indigo-300 font-bold">Resúmenes Listos</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-3 overflow-hidden border border-slate-700 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-slate-300">
          <Settings className="w-3 h-3 text-slate-400" />
          CONFIGURACIÓN GLOBAL
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[9px] font-bold border border-slate-700">
          SAT & FEL
        </span>
      </div>

      <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between text-[9px]">
        <span className="text-slate-300">Certificados Digitales</span>
        <span className="font-bold text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> SSL 256-Bit
        </span>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>Régimen Tributario & Logo</span>
        <span className="text-slate-300 font-bold">Parámetros OK</span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Componente Principal: LaunchpadHub Bento Grid 3D Definitivo
// -------------------------------------------------------------

export default function LaunchpadHub({
  user,
  selectedEmpresa,
  onNavigate,
  empresas,
  onSelectEmpresa,
  onLogout
}: LaunchpadHubProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'operaciones' | 'finanzas' | 'gestion'>('all');
  const [selectedUpgradeCard, setSelectedUpgradeCard] = useState<HubCard | null>(null);
  const { formatTime } = useTimeFormat();

  const currentEmpId = Number(selectedEmpresa?.id ?? user.empresa_id);
  const isFortexa = currentEmpId === 22;
  const isFashionStyles = currentEmpId === 1;
  const isDemoCompany = currentEmpId === 25;
  const isLiveOnlyCompany = !isFortexa && (
    selectedEmpresa?.plan === 'live_express' ||
    selectedEmpresa?.modules?.live_only === true ||
    selectedEmpresa?.id === 99 ||
    (selectedEmpresa?.modules?.pos === false && selectedEmpresa?.modules?.live_sales === true)
  );
  const rawReg = selectedEmpresa?.regimen || user.empresa_regimen || '';
  const effectiveRegimen = formatRegimenLabel(rawReg);
  const tipoRegimen = getTipoRegimenSAT(rawReg);
  const isPequeno = tipoRegimen === 'pequeno_contribuyente';
  const isInformal = tipoRegimen === 'exento' || isLiveOnlyCompany;

  // 1. Datos Operativos Dinámicos de Últimas Ventas
  const recentSales = useMemo(() => {
    if (isFortexa) {
      return [
        { id: 'FAC-B2B-108', cliente: 'Trans-Guatemala S.A.', total: 'Q 6,500.00', metodo: 'Transferencia', hora: '11:45', status: 'Completado', desc: 'RutaFuel Pro Flotas (10 Vehículos Anual)' },
        { id: 'LIC-QTM-204', cliente: 'Abarrotes La Bendición', total: 'Q 499.00', metodo: 'Tarjeta POS', hora: '10:20', status: 'Completado', desc: 'Quantum Store POS Licencia Perpetua' },
        { id: 'FAC-B2B-109', cliente: 'Transportes Rápidos del Norte', total: 'Q 3,850.00', metodo: 'Crédito B2B', hora: '09:15', status: 'Pendiente', desc: 'Hardware Sensores GPS Teltonika 4G' },
        { id: 'SUB-PRO-012', cliente: 'Carlos M. Morales (Conductor)', total: 'Q 590.00', metodo: 'Hotmart Pay', hora: '08:40', status: 'Completado', desc: 'RutaFuel Pro Individual (Anual)' },
        { id: 'LIC-QTM-205', cliente: 'Farmacia & Droguería Central', total: 'Q 999.00', metodo: 'Transferencia', hora: '08:10', status: 'Completado', desc: 'Quantum Store Red 5 PCs' },
      ];
    }
    if (isDemoCompany) {
      return [
        { id: 'TKT-DEMO-001', cliente: 'Cliente Mostrador Demo', total: 'Q 450.00', metodo: 'Tarjeta POS', hora: '10:30', status: 'Completado', desc: 'Smart Watch Pro Serie 8 Waterproof' },
        { id: 'TKT-DEMO-002', cliente: 'Distribuidora Central Demo', total: 'Q 220.00', metodo: 'Efectivo', hora: '09:45', status: 'Completado', desc: 'Audífonos Inalámbricos TWS Pro' },
        { id: 'TKT-DEMO-003', cliente: 'Consumidor Final', total: 'Q 110.00', metodo: 'Transferencia', hora: '09:10', status: 'Completado', desc: 'Termo Inteligente Acero LED 500ml' },
      ];
    }
    if (!isFashionStyles) {
      return [];
    }
    return REAL_SALES.slice(0, 5).map(s => ({
      id: s.id,
      cliente: s.cliente,
      total: `Q ${s.total.toFixed(2)}`,
      metodo: s.metodoPago,
      hora: s.fecha.split(' ')[1] || s.fecha,
      status: s.estado === 'Completada' ? 'Completado' : s.estado === 'Crédito' ? 'Pendiente' : 'Anulado',
      desc: s.productos.map(p => p.nombre).slice(0, 2).join(', ')
    }));
  }, [isFortexa, isDemoCompany, isFashionStyles]);

  // 2. Datos Operativos de Cuentas por Cobrar & Vencimientos
  const { receivables, totalCartera } = useMemo(() => {
    if (isFortexa) {
      const recs = [
        { id: 'FAC-B2B-104', cliente: 'Transportes Rápidos S.A.', saldo: 14500, fecha_venc: '20/11/2026', dias: 'En 3 días', urgencia: 'urgente' },
        { id: 'FAC-B2B-098', cliente: 'Trans-Guatemala Flotas', saldo: 8200, fecha_venc: '24/11/2026', dias: 'En 7 días', urgencia: 'alerta' },
        { id: 'LIC-ENT-041', cliente: 'Distribuidora Logística Central', saldo: 6500, fecha_venc: '28/11/2026', dias: 'En 11 días', urgencia: 'normal' },
        { id: 'CON-COR-015', cliente: 'Agro-Industrias del Sur', saldo: 4900, fecha_venc: '02/12/2026', dias: 'En 15 días', urgencia: 'normal' },
      ];
      return { receivables: recs, totalCartera: 34100 };
    }
    if (isDemoCompany) {
      const recs = [
        { id: 'FAC-DEMO-101', cliente: 'Distribuidora Central Demo', saldo: 1850, fecha_venc: '25/11/2026', dias: 'En 5 días', total: 3500, urgencia: 'normal' as const },
        { id: 'FAC-DEMO-102', cliente: 'Tech Store Guatemala Demo', saldo: 3200, fecha_venc: '22/11/2026', dias: 'En 2 días', total: 3200, urgencia: 'alerta' as const }
      ];
      return { receivables: recs, totalCartera: 5050 };
    }
    if (!isFashionStyles) {
      return { receivables: [], totalCartera: 0 };
    }
    const recs = REAL_CLIENTS.filter(c => c.saldo_actual > 0).slice(0, 5).map((c, i) => ({
      id: `CLI-${c.id_cliente}`,
      cliente: c.nombre_completo,
      fecha_venc: '30/11/2026',
      dias: i === 0 ? 'En 3 días' : i === 1 ? 'En 5 días' : 'En 8 días',
      total: c.saldo_actual,
      saldo: c.saldo_actual,
      urgencia: (c.saldo_actual > 4500 ? 'urgente' : c.saldo_actual > 3000 ? 'alerta' : 'normal') as 'urgente' | 'alerta' | 'normal'
    }));
    const total = REAL_CLIENTS.reduce((acc, c) => acc + c.saldo_actual, 0);
    return { receivables: recs, totalCartera: total };
  }, [isFortexa, isDemoCompany, isFashionStyles]);

  // 3. Datos de Demanda en Pre-Ventas & Déficit de Stock
  const demandProducts = useMemo(() => {
    if (isFortexa) {
      return [
        { id: 1, nombre: 'Teltonika GPS Tracker 4G IoT', sku: 'GPS-4G-TEL', solicitado: 50, stock: 12, deficit: 38, clientes: ['Transportes Rápidos', 'Flotas Pacífico'] },
        { id: 2, nombre: 'Sensor de Flujo Digital Combustible', sku: 'SEN-FLUX-01', solicitado: 25, stock: 5, deficit: 20, clientes: ['Trans-Guatemala'] },
        { id: 3, nombre: 'Gateway OBD2 Telemetría Pro', sku: 'GTW-OBD2-PRO', solicitado: 15, stock: 2, deficit: 13, clientes: ['Logística Central'] },
      ];
    }
    if (isDemoCompany) {
      return [
        { id: 1, nombre: 'Smart Watch Pro Serie 8 Waterproof', sku: 'WCH-DEMO-01', solicitado: 15, stock: 3, deficit: 12, clientes: ['Cliente Demo Corporativo'] },
        { id: 2, nombre: 'Audífonos Inalámbricos TWS Pro', sku: 'TWS-PRO-02', solicitado: 20, stock: 4, deficit: 16, clientes: ['Distribuidora Central Demo'] },
        { id: 3, nombre: 'Termo Inteligente Acero LED 500ml', sku: 'TRM-LED-03', solicitado: 10, stock: 2, deficit: 8, clientes: ['Tech Store Demo'] }
      ];
    }
    if (!isFashionStyles) {
      return [];
    }
    return [
      { id: 4155, nombre: 'Serum Facial & Contorno de Ojos', sku: 'CDD-0000003', solicitado: 25, stock: 1, deficit: 24, clientes: ['Clientas Boutique VIP', 'Venta en Tienda'] },
      { id: 2908, nombre: 'Juego Completo Depilación & Exfoliante', sku: 'GNR-0000446', solicitado: 30, stock: 10, deficit: 20, clientes: ['Clientas Frecuentes', 'Venta Mostrador'] },
      { id: 2841, nombre: 'Aceite Labial Hidratante Gloss', sku: 'BLL-0000064', solicitado: 25, stock: 6, deficit: 19, clientes: ['Compradoras Live', 'Venta en Caja'] },
    ];
  }, [isFortexa, isDemoCompany, isFashionStyles]);

  // Definición de Tarjetas adaptadas con sus Widgets
  const allCards: HubCard[] = useMemo(() => {
    const cards: HubCard[] = [];

    // 1. Módulos de Operaciones Comerciales
    if (isFortexa) {
      cards.push({
        id: 'fortexa_apps',
        title: 'Suscripciones & Apps Fortexa',
        subtitle: 'RutaFuel Pro, Quantum POS & IntegraPro',
        description: 'Gestión central de suscripciones anuales, cortes automáticos, pagos en Hotmart y licencias perpetuas.',
        icon: Cpu,
        gradient: 'from-indigo-600 via-indigo-700 to-purple-800',
        glowColor: 'from-indigo-600/40 to-purple-600/40',
        badge: { text: 'SaaS / Hotmart', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' },
        metric: '11 Licencias Activas • Q 24,500 ARR',
        category: 'operaciones',
        highlight: true,
        widgetType: 'fortexa_saas'
      });
      cards.push({
        id: 'ventas',
        title: 'Ventas & Facturación (FEL B2B)',
        subtitle: 'DTEs Electrónicos SAT y Cotizaciones',
        description: 'Facturación en línea FEL con firma electrónica DTE, cotizaciones para flotas y contratos B2B.',
        icon: ReceiptText,
        gradient: 'from-blue-600 to-indigo-700',
        glowColor: 'from-blue-600/40 to-indigo-600/40',
        badge: { text: 'FEL SAT Oficial', color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
        metric: 'Certificación Infile SAT',
        category: 'operaciones',
        widgetType: 'fel_invoice'
      });
      cards.push({
        id: 'inventario',
        title: 'Hardware & Equipos',
        subtitle: 'Dispositivos GPS, Sensores y Servidores',
        description: 'Control de inventario de equipos tecnológicos, sensores de combustible y stock disponible en bodega.',
        icon: Boxes,
        gradient: 'from-amber-500 to-orange-600',
        glowColor: 'from-amber-500/40 to-orange-500/40',
        badge: { text: 'Tech Inventory', color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
        metric: 'Stock en Bodega Central',
        category: 'operaciones',
        widgetType: 'inventory_gauge'
      });
      cards.push({
        id: 'clientes',
        title: 'Clientes & Flotas B2B',
        subtitle: 'Empresas de Transporte & Conductores',
        description: 'Directorio de clientes corporativos, expedientes de flotas, saldos y contratos de servicio.',
        icon: Users,
        gradient: 'from-cyan-600 to-blue-700',
        glowColor: 'from-cyan-600/40 to-blue-600/40',
        badge: { text: 'Cartera B2B', color: 'bg-cyan-500/10 text-cyan-700 border-cyan-200' },
        metric: 'Directorio Empresarial',
        category: 'operaciones',
        widgetType: 'clients_roster'
      });
    } else {
      const hasPosModule = selectedEmpresa?.modules?.pos !== false;
      if (hasPosModule) {
        cards.push({
          id: 'pos',
          title: 'Punto de Venta (POS Rápido)',
          subtitle: 'Caja, Escaneo de Código y Tickets',
          description: 'Venta rápida de mostrador, cobro con tarjeta, efectivo, cálculo de cambio y cierre de caja.',
          icon: Zap,
          gradient: 'from-emerald-500 via-teal-600 to-emerald-700',
          glowColor: 'from-emerald-500/40 to-teal-500/40',
          badge: { text: 'Caja Activa', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
          metric: 'Caja Lista para Facturar',
          category: 'operaciones',
          highlight: true,
          widgetType: 'pos_terminal'
        });
      }

      // Módulo de TikTok Live Commerce (Habilitado para Fashion Styles y clientes que contraten el Add-on)
      const hasLiveSales = selectedEmpresa?.modules?.live_sales ?? (selectedEmpresa?.id === 1);
      if (hasLiveSales) {
        cards.push({
          id: 'live_sales',
          title: 'TikTok Live & Canastas',
          subtitle: 'Ventas en Vivo, Apartados & Remates',
          description: 'Apartado de prendas en tiempo real con descuento inmediato de inventario, remates relámpago y cobros unificados por WhatsApp.',
          icon: Video,
          gradient: 'from-rose-500 via-pink-600 to-purple-700',
          glowColor: 'from-rose-500/40 to-purple-600/40',
          badge: { text: 'Social Commerce', color: 'bg-rose-500/10 text-rose-700 border-rose-200' },
          metric: 'Canastas Abiertas en Vivo',
          category: 'operaciones',
          widgetType: 'live_stream'
        });
      }

      cards.push({
        id: 'inventario',
        title: 'Inventario & Bodega',
        subtitle: 'Catálogo de Productos y Existencias',
        description: 'Control de stock físico, precios de compra y venta, alertas de stock mínimo y código de barras.',
        icon: Boxes,
        gradient: 'from-amber-500 to-orange-600',
        glowColor: 'from-amber-500/40 to-orange-500/40',
        badge: { text: 'Stock en Tiempo Real', color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
        metric: 'Catálogo con Alertas de Mínimo',
        category: 'operaciones',
        widgetType: 'inventory_gauge'
      });
      cards.push({
        id: 'ventas',
        title: 'Ventas & Facturación (FEL)',
        subtitle: 'Historial de Ventas, DTEs y Clientes',
        description: 'Emisión de Facturas Electrónicas SAT (DTE), cotizaciones, notas de crédito y reportes de corte.',
        icon: ReceiptText,
        gradient: 'from-blue-600 to-indigo-700',
        glowColor: 'from-blue-600/40 to-indigo-600/40',
        badge: { text: 'FEL SAT', color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
        metric: 'Libro de Ventas Fiscal',
        category: 'operaciones',
        widgetType: 'fel_invoice'
      });
      cards.push({
        id: 'clientes',
        title: 'Clientes & Créditos',
        subtitle: 'Cartera de Clientes y Cobranza',
        description: 'Registro de clientes, asignación de límites de crédito, saldos pendientes y estado de cuenta.',
        icon: Users,
        gradient: 'from-cyan-600 to-blue-700',
        glowColor: 'from-cyan-600/40 to-blue-600/40',
        badge: { text: 'Cartera', color: 'bg-cyan-500/10 text-cyan-700 border-cyan-200' },
        metric: 'Cuentas por Cobrar',
        category: 'operaciones',
        widgetType: 'clients_roster'
      });
    }

    // 2. Módulos de Finanzas & Compras
    cards.push({
      id: 'compras',
      title: 'Compras & Proveedores',
      subtitle: 'Órdenes de Compra y Cuentas por Pagar',
      description: 'Gestión de proveedores, registro de facturas de compra para crédito fiscal SAT y control de pagos.',
      icon: Truck,
      gradient: 'from-violet-600 to-purple-700',
      glowColor: 'from-violet-600/40 to-purple-600/40',
      badge: { text: 'Proveedores', color: 'bg-violet-500/10 text-violet-700 border-violet-200' },
      metric: 'Gestión de Abastecimiento',
      category: 'finanzas',
      widgetType: 'logistics_fleet'
    });

    cards.push({
      id: 'contabilidad',
      title: 'Contabilidad & SAT Fiscal',
      subtitle: 'Libro Diario, IVA e Impuestos',
      description: 'Generación de Libro Diario, Balance de Saldos, cálculo de IVA general (12%) y Pequeño Contribuyente (5%).',
      icon: Landmark,
      gradient: 'from-emerald-600 to-teal-800',
      glowColor: 'from-emerald-600/40 to-teal-600/40',
      badge: { text: 'Cumplimiento SAT', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
      metric: 'Plan de Cuentas & DTEs',
      category: 'finanzas',
      widgetType: 'fiscal_ledger'
    });

    cards.push({
      id: 'dashboard',
      title: 'Métricas & Dashboard Ejecutivo',
      subtitle: 'Gráficas de Ventas, KPIs y Flujo de Caja',
      description: 'Centro integral de analítica visual, comparativa de ventas 2025 vs 2026, demanda y cuentas por cobrar.',
      icon: Activity,
      gradient: 'from-rose-500 to-pink-700',
      glowColor: 'from-rose-500/40 to-pink-500/40',
      badge: { text: 'Analítica en Vivo', color: 'bg-rose-500/10 text-rose-700 border-rose-200' },
      metric: 'Gráficas & Proyección Anual',
      category: 'finanzas',
      widgetType: 'analytics_chart'
    });

    // 3. Módulos de Gestión, Talento y Sistema
    cards.push({
      id: 'rrhh',
      title: 'Recursos Humanos & Planillas',
      subtitle: 'Colaboradores, Nómina y Expedientes',
      description: 'Gestión del personal, puestos de trabajo, cálculo de salarios, descuentos del IGSS y contratos.',
      icon: UserCheck,
      gradient: 'from-teal-600 to-emerald-700',
      glowColor: 'from-teal-600/40 to-emerald-600/40',
      badge: { text: 'Planilla IGSS', color: 'bg-teal-500/10 text-teal-700 border-teal-200' },
      metric: 'Directorio de Personal',
      category: 'gestion',
      widgetType: 'hr_team'
    });

    cards.push({
      id: 'asistencia',
      title: 'Reloj Checador (Kiosco Asistencia)',
      subtitle: 'Control de Asistencia con Código PIN',
      description: 'Pantalla kiosco táctil para que los colaboradores marquen entradas, salidas y turnos con su PIN de seguridad.',
      icon: Clock3,
      gradient: 'from-indigo-500 to-blue-700',
      glowColor: 'from-indigo-500/40 to-blue-500/40',
      badge: { text: 'Kiosco con PIN', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' },
      metric: 'Marcaje en Tiempo Real',
      category: 'gestion',
      widgetType: 'attendance_kiosk'
    });

    cards.push({
      id: 'sucursales',
      title: 'Red de Sucursales & Cajas',
      subtitle: 'Ubicaciones Físicas y Asignaciones',
      description: 'Administración de sedes, bodegas satélite y asignación de cajas registradoras para cada sucursal.',
      icon: Store,
      gradient: 'from-blue-500 to-cyan-600',
      glowColor: 'from-blue-500/40 to-cyan-500/40',
      badge: { text: 'Multi-Sede', color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
      metric: 'Gestión Multi-Sucursal',
      category: 'gestion',
      widgetType: 'branches_net'
    });

    cards.push({
      id: 'configuracion',
      title: isInformal ? 'Datos & Perfil de Mi Tienda' : 'Configuración de Empresa & SAT',
      subtitle: isInformal ? 'Identidad de Boutique, WhatsApp y Cuentas' : 'Datos Fiscales, FEL, Logo y Sistema',
      description: isInformal
        ? 'Configura el nombre de tu boutique, teléfono de WhatsApp para cobros, cuentas bancarias BI/Banrural y tarifas de envío.'
        : 'Ajuste de régimen tributario (General, Pequeño, Exento), credenciales DTE de Infile, logo y usuarios.',
      icon: isInformal ? Store : Settings,
      gradient: isInformal ? 'from-indigo-600 to-purple-800' : 'from-slate-600 to-slate-800',
      glowColor: isInformal ? 'from-indigo-600/40 to-purple-600/40' : 'from-slate-600/40 to-slate-800/40',
      badge: isInformal 
        ? { text: 'Perfil de Tienda', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' }
        : { text: 'Ajustes del Sistema', color: 'bg-slate-500/10 text-slate-700 border-slate-200' },
      metric: isInformal ? 'Cuentas Bancarias & Envíos' : 'Configuración Global',
      category: 'gestion',
      widgetType: 'security_system'
    });

    cards.push({
      id: 'token_scraper',
      title: 'Token Scraper Chrome',
      subtitle: 'Extensión para Shein, Temu & AliExpress',
      description: 'Genera y administra tu clave de API personal para conectar la extensión de Chrome y extraer productos en 1 clic.',
      icon: KeyRound,
      gradient: 'from-amber-500 to-indigo-700',
      glowColor: 'from-amber-500/40 to-indigo-500/40',
      badge: { text: 'API Extensión', color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
      metric: 'Extracción Automatizada',
      category: 'gestion',
      widgetType: 'security_system'
    });

    return cards.map(c => {
      let isLocked = false;

      if (!isFortexa) {
        if (isLiveOnlyCompany) {
          // Si la empresa está en Modo Solo Live Express:
          // Solo están activos: TikTok Live & Canastas, Inventario (Prendas), Clientes y Dashboard (Resultados)
          // Todos los módulos ERP tradicionales (POS, FEL, Compras, Contabilidad, RRHH, Reloj, Sucursales) se bloquean
          isLocked = !['live_sales', 'inventario', 'dashboard', 'clientes', 'configuracion'].includes(c.id);
        } else if (selectedEmpresa?.modules && (selectedEmpresa.modules[c.id] === false || (c.id === 'live_sales' && !selectedEmpresa.modules.live_sales))) {
          isLocked = true;
        }
      }

      return {
        ...c,
        isLocked
      };
    });
  }, [isFortexa, isLiveOnlyCompany, selectedEmpresa?.id, selectedEmpresa?.modules, selectedEmpresa?.plan]);

  // Filtrado de tarjetas por búsqueda y categoría
  const filteredCards = useMemo(() => {
    return allCards.filter(card => {
      const matchesSearch = 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.badge.text.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = activeCategory === 'all' || card.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allCards, searchTerm, activeCategory]);

  const renderCardWidget = (card: HubCard) => {
    switch (card.widgetType) {
      case 'fortexa_saas':
        return <SaaSWallWidget />;
      case 'pos_terminal':
        return <PosScannerWidget />;
      case 'inventory_gauge':
        return <InventoryGaugeWidget isTech={isFortexa} />;
      case 'fel_invoice':
        return <FelInvoiceWidget />;
      case 'analytics_chart':
        return <AnalyticsChartWidget />;
      case 'clients_roster':
        return <ClientsRosterWidget isB2B={isFortexa} />;
      case 'logistics_fleet':
        return <LogisticsFleetWidget />;
      case 'fiscal_ledger':
        return <FiscalLedgerWidget />;
      case 'hr_team':
        return <HrTeamWidget />;
      case 'attendance_kiosk':
        return <AttendanceKioskWidget />;
      case 'branches_net':
        return <BranchesNetWidget />;
      case 'security_system':
        return <SecuritySystemWidget isInformal={isInformal} />;
      case 'live_stream':
        return <LiveStreamWidget />;
      default:
        return null;
    }
  };

  // Identificar tarjeta Hero y Tall para el Bento Grid
  const heroCardId = isFortexa 
    ? 'fortexa_apps' 
    : isInformal && (selectedEmpresa?.modules?.live_sales ?? selectedEmpresa?.id === 1)
    ? 'live_sales' 
    : selectedEmpresa?.modules?.pos === false
    ? 'ventas'
    : 'pos';
  const heroCard = filteredCards.find(c => c.id === heroCardId);
  const tallCard = filteredCards.find(c => c.id === 'inventario');
  const otherBentoCards = filteredCards.filter(c => c.id !== heroCard?.id && c.id !== tallCard?.id);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* 1. Hero Banner Principal */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-xl border bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-slate-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Centro de Operaciones • Bento Grid 3D</span>
            </div>
            
            <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
                <span>Hola, {user.name.split(' ')[0]}</span>
                <span className="text-xl">👋</span>
              </h1>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
                  title="Cerrar sesión en este dispositivo"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Cerrar Sesión</span>
                </button>
              )}
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isFortexa 
                ? 'Consola tecnológica para gestionar RutaFuel Pro, licencias de software, contratos y cortes automáticos.' 
                : selectedEmpresa?.id === 99
                ? 'Panel Live Express para vendedoras de TikTok Live: canastas abiertas, catálogo de prendas, remates en vivo y cobros por WhatsApp.'
                : 'Punto de venta y gestión comercial para retail, catálogo de productos y facturación en caja.'}
            </p>

            {/* Indicador o Selector de Empresa en el Hero */}
            {empresas && onSelectEmpresa && empresas.length > 1 && (user.role === 'SuperAdmin' || user.email === 'admin@integrapro.com' || user.email === 'admin@admin.com') ? (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Empresa activa:</span>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 hover:bg-white/20 transition-colors rounded-xl border border-white/20 backdrop-blur-sm">
                  <Building2 className="w-3.5 h-3.5 text-indigo-300" />
                  <select
                    value={selectedEmpresa?.id ?? user.empresa_id}
                    onChange={(e) => onSelectEmpresa(Number(e.target.value))}
                    className="bg-transparent text-white font-bold cursor-pointer focus:outline-none"
                  >
                    {empresas.map((emp) => (
                      <option key={emp.id} value={emp.id} className="text-slate-900 bg-white">
                        {emp.nombre} ({emp.regimen})
                      </option>
                    ))}
                  </select>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {selectedEmpresa?.nombre === 'Fortexa Technologies' ? 'Modo B2B Tech' : 'Modo Tienda POS'}
                </span>
              </div>
            ) : (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Empresa activa:</span>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-xl border border-white/20 backdrop-blur-sm">
                  <Building2 className="w-3.5 h-3.5 text-indigo-300" />
                  <span className="text-white font-bold">
                    {selectedEmpresa?.nombre || user.empresa_nombre}
                  </span>
                  <span className="text-[11px] text-slate-300 font-normal">
                    ({effectiveRegimen})
                  </span>
                </div>

                {isDemoCompany && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 font-bold text-[11px]">
                    <Sparkles className="w-3 h-3 text-indigo-300" />
                    Entorno Demo Aislado
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {selectedEmpresa?.nombre === 'Fortexa Technologies' ? 'Modo B2B Tech' : 'Modo Tienda POS'}
                </span>
              </div>
            )}
          </div>

          {/* Mini-Panel de Telemetría Global */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                {isFortexa ? 'SaaS Activas' : 'Caja POS'}
              </span>
              <span className="text-base sm:text-lg font-black text-white block mt-0.5">
                {isFortexa ? '11 Licencias' : 'Disponible'}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isFortexa ? 'RutaFuel & Quantum' : 'Caja #01 Lista'}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                {isFortexa ? 'ARR Recurrente' : isInformal ? 'Comprobantes' : 'Facturas FEL'}
              </span>
              <span className="text-base sm:text-lg font-black text-white block mt-0.5">
                {isFortexa ? 'Q 24,500' : isFashionStyles ? (isInformal ? '951 emitidos' : '951 emitidas') : '3 emitidas'}
              </span>
              <span className="text-[10px] text-indigo-300 font-medium block mt-0.5">
                {isFortexa ? 'Anualizado' : isFashionStyles ? 'Q 179.4k facturados' : 'Modo Demo'}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                {isInformal ? 'Régimen Fiscal' : isPequeno ? 'Régimen Fiscal' : 'Servicio SAT'}
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-400 block mt-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {isInformal ? 'Exento / Informal' : isPequeno ? 'Pequeño Contribuyente' : 'Online FEL (12%)'}
              </span>
              <span className="text-[10px] text-slate-300 font-medium block mt-0.5">
                {isInformal ? '0% IVA (Negocio no factura)' : isPequeno ? '5% Monotributo SAT' : 'DTE Infile GT'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Barra de Búsqueda y Filtros de Categoría */}
      <div className="p-3.5 rounded-2xl border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border-slate-200/80">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar módulo (ej. 'Inventario', 'FEL', 'Caja')..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({filteredCards.length})
          </button>
          <button
            onClick={() => setActiveCategory('operaciones')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeCategory === 'operaciones'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Operaciones Comerciales
          </button>
          <button
            onClick={() => setActiveCategory('finanzas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeCategory === 'finanzas'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Finanzas & Compras
          </button>
          <button
            onClick={() => setActiveCategory('gestion')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeCategory === 'gestion'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Gestión & Talento
          </button>
        </div>
      </div>

      {/* 3. Cuadrícula Bento Grid 3D de Módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* TARJETA HERO DOBLE (Punto de Venta en Fashion Styles o Suscripciones en Fortexa o Live en Live Seller) */}
        {heroCard && (
          <div
            onClick={() => {
              if (heroCard.isLocked) {
                setSelectedUpgradeCard(heroCard);
              } else {
                onNavigate(heroCard.id);
              }
            }}
            className={`group relative md:col-span-2 rounded-3xl p-5 border shadow-[0_15px_35px_-5px_rgba(79,70,229,0.12),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
              heroCard.isLocked
                ? 'bg-gradient-to-br from-white via-slate-50 to-amber-50/40 border-amber-300/80 hover:border-amber-400'
                : 'bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 border-indigo-200/90'
            }`}
          >
            {/* Bisel de luz superior reflectiva */}
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
              heroCard.isLocked ? 'from-transparent via-amber-400 to-transparent' : 'from-transparent via-indigo-500 to-transparent'
            } opacity-80`} />
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-3 min-h-[52px] mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${heroCard.gradient} flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform shrink-0`}>
                    {isFortexa ? <Cpu className="w-5 h-5" /> : (heroCard.id === 'live_sales' ? <Video className="w-5 h-5" /> : <Zap className="w-5 h-5" />)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                        heroCard.isLocked 
                          ? 'bg-amber-100 text-amber-900 border-amber-300' 
                          : 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20'
                      }`}>
                        {heroCard.isLocked ? '🔒 Módulo Pro' : isFortexa ? 'Módulo Principal SaaS' : heroCard.id === 'live_sales' ? 'TikTok Live Commerce' : 'Caja Principal POS'}
                      </span>
                      {!heroCard.isLocked && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          En línea
                        </span>
                      )}
                    </div>
                    <h3 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-indigo-600 transition-colors mt-0.5 truncate">
                      {heroCard.title}
                    </h3>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs shrink-0">
                  {heroCard.isLocked ? <Lock className="w-3.5 h-3.5 text-amber-600" /> : <Maximize2 className="w-3.5 h-3.5 text-indigo-600" />}
                  {heroCard.isLocked ? 'Requiere Upgrade' : 'Módulo Destacado'}
                </span>
              </div>

              {/* Widget Interactivo */}
              <div className={`my-1 ${heroCard.isLocked ? 'opacity-70 saturate-50 pointer-events-none' : ''}`}>
                {renderCardWidget(heroCard)}
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2 min-h-[36px]">
                {heroCard.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between min-h-[40px]">
              <span className="text-xs font-extrabold text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="truncate">{heroCard.metric}</span>
              </span>

              <button
                type="button"
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-white font-bold text-xs shadow-md group-hover:translate-x-1 transition-all shrink-0 ${
                  heroCard.isLocked 
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30' 
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                }`}
              >
                <span>{heroCard.isLocked ? 'Conocer Módulo' : isFortexa ? 'Gestionar Suscripciones' : heroCard.id === 'live_sales' ? 'Abrir Pantalla Live' : 'Abrir Terminal POS'}</span>
                {heroCard.isLocked ? <Lock className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* TARJETA ALTA (Inventario & Bodega / Hardware) — Alineada con el mismo ritmo vertical */}
        {tallCard && (
          <div
            onClick={() => {
              if (tallCard.isLocked) {
                setSelectedUpgradeCard(tallCard);
              } else {
                onNavigate(tallCard.id);
              }
            }}
            className="group relative md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="absolute -inset-1 rounded-3xl bg-amber-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2.5 min-h-[52px] mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors leading-tight truncate">
                      {tallCard.title}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                      {tallCard.subtitle}
                    </p>
                  </div>
                </div>
                <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap ${tallCard.badge.color}`}>
                  {tallCard.badge.text}
                </span>
              </div>

              <div className={`my-1 ${tallCard.isLocked ? 'opacity-70 saturate-50 pointer-events-none' : ''}`}>
                {renderCardWidget(tallCard)}
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2 min-h-[36px]">
                {tallCard.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs min-h-[40px]">
              <span className="text-[11px] font-bold text-amber-700 truncate max-w-[160px]">{tallCard.metric}</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-all shrink-0">
                {tallCard.isLocked ? (
                  <><span>Conocer</span> <Lock className="w-3.5 h-3.5 text-amber-600" /></>
                ) : (
                  <><span>Abrir</span> <ArrowRight className="w-3.5 h-3.5" /></>
                )}
              </span>
            </div>
          </div>
        )}

        {/* TARJETAS MEDIANAS & COMPACTAS EN BENTO GRID — Misma estructura vertical alineada */}
        {otherBentoCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => {
                if (card.isLocked) {
                  setSelectedUpgradeCard(card);
                } else {
                  onNavigate(card.id);
                }
              }}
              className={`group relative bg-white rounded-3xl p-5 border shadow-[0_8px_20px_-5px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                card.isLocked
                  ? 'border-amber-200/80 bg-gradient-to-b from-white via-slate-50/40 to-amber-50/25 hover:border-amber-400'
                  : 'border-slate-200/90 hover:border-indigo-400'
              }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                card.isLocked 
                  ? 'from-transparent via-amber-400 to-transparent' 
                  : 'from-transparent via-slate-200 to-transparent group-hover:via-indigo-400'
              } transition-all`} />
              
              <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${card.glowColor} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none -z-10`} />

              <div>
                <div className="flex items-center justify-between gap-2.5 min-h-[52px] mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors leading-tight truncate">
                        {card.title}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                  {card.isLocked ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-[9.5px] font-black shrink-0 whitespace-nowrap">
                      <Lock className="w-2.5 h-2.5 text-amber-700" />
                      <span>Pro</span>
                    </span>
                  ) : (
                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap ${card.badge.color}`}>
                      {card.badge.text}
                    </span>
                  )}
                </div>

                <div className={`my-1 ${card.isLocked ? 'opacity-70 saturate-50 pointer-events-none' : ''}`}>
                  {renderCardWidget(card)}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2 min-h-[36px]">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs min-h-[40px]">
                <span className="text-[11px] font-bold text-slate-500 truncate max-w-[155px]">{card.metric}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-all shrink-0 ${
                  card.isLocked ? 'text-amber-800' : 'text-indigo-600'
                }`}>
                  {card.isLocked ? (
                    <>
                      <span>Conocer</span>
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                    </>
                  ) : (
                    <>
                      <span>Ingresar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 4. SECCIÓN PULSO OPERATIVO DEL NEGOCIO (BENTO LIVE TELEMETRY)  */}
      {/* ============================================================== */}
      <div className="pt-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <h2 className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-2">
                Pulso Operativo del Negocio en Vivo
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoreo activo de transacciones recientes, cobranza pendiente y compras urgentes por déficit de stock.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200 shrink-0 self-start sm:self-auto">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>Telemetría en Tiempo Real</span>
          </div>
        </div>

        {/* Cuadrícula de 3 Tarjetas Operativas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* TARJETA 1: ÚLTIMAS VENTAS Y FACTURAS */}
          <div className="group relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
            <div className="absolute -inset-1 rounded-3xl bg-emerald-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                    <ReceiptText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Últimas Ventas & Facturas</h3>
                    <p className="text-[10px] text-slate-400">Transacciones de hoy en cajas y FEL</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                  {recentSales.length} Recientes
                </span>
              </div>

              {/* Lista de Ventas */}
              <div className="divide-y divide-slate-100">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="py-2.5 flex items-center justify-between gap-2 hover:bg-slate-50/80 px-1 rounded-xl transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-indigo-600 text-xs">{sale.id}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-600 font-medium truncate">
                          {sale.metodo}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">{sale.cliente}</p>
                      <p className="text-[10px] text-slate-400 truncate">{sale.desc}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-slate-900 block font-mono">{sale.total}</span>
                      <span className="text-[10px] text-slate-400 font-mono block">{sale.hora.includes(':') ? formatTime(sale.hora) : sale.hora}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Facturación Activa
              </span>
              <button
                type="button"
                onClick={() => onNavigate(isFortexa ? 'ventas' : 'ventas')}
                className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                <span>Ver historial completo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* TARJETA 2: CUENTAS POR COBRAR & VENCIMIENTOS */}
          <div className="group relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <div className="absolute -inset-1 rounded-3xl bg-cyan-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Cuentas por Cobrar</h3>
                    <p className="text-[10px] text-slate-400">Próximos vencimientos de crédito</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold text-[10px]">
                  Q {totalCartera.toLocaleString('es-GT', { minimumFractionDigits: 0 })} Total
                </span>
              </div>

              {/* Lista de Cobranza */}
              <div className="divide-y divide-slate-100">
                {receivables.map((rec) => (
                  <div key={rec.id} className="py-2.5 flex items-center justify-between gap-2 hover:bg-slate-50/80 px-1 rounded-xl transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800 text-xs truncate">{rec.cliente}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{rec.id} • Vence: {rec.fecha_venc}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-slate-900 block font-mono">
                        Q{rec.saldo.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                      </span>
                      <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        rec.urgencia === 'urgente'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : rec.urgencia === 'alerta'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {rec.dias}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-500">
                Cartera al día
              </span>
              <button
                type="button"
                onClick={() => onNavigate('clientes')}
                className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                <span>Gestionar cartera</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* TARJETA 3: DEMANDA EN PRE-VENTA & DÉFICIT DE STOCK */}
          <div className="group relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="absolute -inset-1 rounded-3xl bg-amber-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Déficit en Pre-Ventas</h3>
                    <p className="text-[10px] text-slate-400">Cotizaciones con falta de stock</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px]">
                  {demandProducts.length} Ítems Faltantes
                </span>
              </div>

              {/* Lista de Déficit */}
              <div className="divide-y divide-slate-100">
                {demandProducts.map((p) => (
                  <div key={p.id} className="py-2.5 flex items-center justify-between gap-2 hover:bg-slate-50/80 px-1 rounded-xl transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800 text-xs truncate">{p.nombre}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        SKU: {p.sku} • Stock: {p.stock} unid
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-black text-xs font-mono block">
                        -{p.deficit} unid
                      </span>
                      <span className="text-[9px] text-amber-600 font-semibold block mt-0.5">
                        Pidieron {p.solicitado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Reabastecer stock
              </span>
              <button
                type="button"
                onClick={() => onNavigate('compras')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs transition-colors cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                <span>Pedir a Compras</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL DE UPGRADE / DESBLOQUEO COMERCIAL SAAS (FORTEXA TECHNOLOGIES) */}
      {selectedUpgradeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Encabezado con degradado y luz */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedUpgradeCard.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <selectedUpgradeCard.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs flex items-center gap-1 w-fit mb-1">
                      <Lock className="w-3 h-3" /> Módulo Pro / Enterprise
                    </span>
                    <h3 className="text-lg font-black tracking-tight text-white">
                      {selectedUpgradeCard.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      {selectedUpgradeCard.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedUpgradeCard(null)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  ¿Para qué sirve este módulo en tu negocio?
                </h4>
                <p className="text-slate-700 leading-relaxed text-[13px]">
                  {selectedUpgradeCard.description}
                </p>
              </div>

              {/* Beneficios de Expandir con Fortexa */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <span className="text-[11px] font-black text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Beneficios al Activar este Módulo en tu Cuenta:
                </span>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Activación Inmediata en la Nube:</strong> Fortexa Technologies enciende este módulo en tu base de datos en menos de 15 minutos sin reinstalaciones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Capacitación & Soporte Incluido:</strong> Te acompañamos paso a paso para que tu equipo aprenda a usarlo desde el primer día.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Facturación Mensual Flexible:</strong> Agrégalo como un add-on adicional a tu suscripción actual.</span>
                  </li>
                </ul>
              </div>

              {/* Banner de Precios Estimados */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
                <div>
                  <p className="text-[10px] font-bold text-indigo-900 uppercase">Planes Comerciales Disponibles</p>
                  <p className="text-xs text-indigo-700 font-semibold">Incluido en IntegraPro Comercial o Add-on</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-indigo-900 font-mono">Desde Q 99 / mes</span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href={`https://api.whatsapp.com/send?phone=50223349000&text=${encodeURIComponent(
                    `Hola Fortexa Technologies, soy de la empresa "${selectedEmpresa?.nombre || 'Mi Empresa'}" y me interesa cotizar y activar el módulo de "${selectedUpgradeCard.title}".`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Solicitar Activación por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedUpgradeCard(null)}
                  className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Volver al Menú
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Si no hay resultados de búsqueda */}
      {filteredCards.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">No se encontraron módulos</h3>
          <p className="text-xs text-slate-500 mt-1">
            No hay ningún módulo que coincida con "<span className="font-semibold text-slate-700">{searchTerm}</span>".
          </p>
          <button
            onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
          >
            Restablecer búsqueda
          </button>
        </div>
      )}
    </div>
  );
}
