import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
import { useLanguage } from '../context/LanguageContext';
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
  const { L, money } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-purple-950 to-rose-950 p-3 overflow-hidden border border-rose-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/30 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-rose-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          {L('TIKTOK LIVE • EN VIVO', 'TIKTOK LIVE • ON AIR')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono text-[9px] font-bold border border-rose-500/30">
          {L('Stock Inmediato', 'Instant Stock')}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 my-1">
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">👗</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">@marielos</span>
          <span className="text-[8px] text-rose-300 font-mono">{money(320)}</span>
        </div>
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">👖</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">@karla_gt</span>
          <span className="text-[8px] text-amber-300 font-mono">{money(210)}</span>
        </div>
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">🧥</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">@sofi_outfits</span>
          <span className="text-[8px] text-emerald-300 font-mono">{money(215)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span className="truncate">{L('3 Canastas • 5 Prendas Apartadas', '3 Baskets • 5 Reserved Items')}</span>
        <span className="text-amber-400 font-bold flex items-center gap-0.5">
          <Flame className="w-2.5 h-2.5 fill-current" /> {L('Remates Activos', 'Active Flash Sales')}
        </span>
      </div>
    </div>
  );
}

function SaaSWallWidget() {
  const { L, isEn, currencySymbol } = useLanguage();
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
          ARR {isEn ? `${currencySymbol}24,500` : `${currencySymbol} 24,500`}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 my-1">
        <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-lg p-1.5 border border-white/10 text-center transition-colors">
          <span className="text-[10px] block">🚗</span>
          <span className="text-[9px] font-bold text-white block leading-tight truncate">RutaFuel</span>
          <span className="text-[8px] text-emerald-300 font-mono">{L('365d Anual', '365d Annual')}</span>
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
        <span className="truncate">{L('3 Suscripciones próximas a corte', '3 Subscriptions due soon')}</span>
        <span className="text-emerald-400 font-bold flex items-center gap-0.5">
          <TrendingUp className="w-2.5 h-2.5" /> +18% MoM
        </span>
      </div>
    </div>
  );
}

function PosScannerWidget() {
  const { L, money } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-3 overflow-hidden border border-emerald-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {L('CAJA #01 • ACTIVA', 'REGISTER #01 • ACTIVE')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30">
          {L('ESCANER LISTO', 'SCANNER READY')}
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
          <span className="text-[9px] text-slate-400 block font-mono">{L('Último Ticket', 'Last Receipt')}</span>
          <span className="text-xs font-black text-emerald-300 font-mono">{money(150)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span className="truncate">{L('Cobro rápido: Efectivo, Tarjeta POS, QR', 'Fast checkout: Cash, Card POS, QR')}</span>
        <span className="text-emerald-400 font-bold">{L('18 ventas hoy', '18 sales today')}</span>
      </div>
    </div>
  );
}

function InventoryGaugeWidget({ isTech = false }: { isTech?: boolean }) {
  const { L } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-3 overflow-hidden border border-amber-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          {isTech ? 'HARDWARE TECH' : L('STOCK EN BODEGA', 'WAREHOUSE STOCK')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold border border-amber-500/30">
          2,555 ITEMS
        </span>
      </div>

      <div className="my-1 space-y-1.5">
        <div className="flex items-center justify-between text-[9px] text-slate-300">
          <span>{L('Nivel de Existencias', 'Stock Level')}</span>
          <span className="font-bold text-amber-300 font-mono">{L('88% Óptimo', '88% Optimal')}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-400 w-[88%]" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span className="flex items-center gap-1 text-emerald-400">
          <Check className="w-3 h-3" /> {L('Bodega Central OK', 'Main Warehouse OK')}
        </span>
        <span className="text-amber-400 font-bold flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-amber-400" /> {L('14 bajo mínimo', '14 below min')}
        </span>
      </div>
    </div>
  );
}

function FelInvoiceWidget() {
  const { L } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-3 overflow-hidden border border-blue-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          {L('SAT DTE CERTIFICADO', 'CERTIFIED E-INVOICE')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono text-[9px] font-bold border border-blue-500/30">
          {L('INFILE GT', 'E-INVOICE')}
        </span>
      </div>

      <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[9px] text-slate-300 font-mono block">{L('DTE: Serie 4A9B • #1842', 'INV: Series 4A9B • #1842')}</span>
          <span className="text-[8px] text-slate-400 font-mono truncate block max-w-[130px]">
            UUID: e4b2-91f0-410a...
          </span>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          {L('FIRMADO', 'SIGNED')}
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span className="truncate">{L('Libro de Ventas Fiscal SAT', 'Tax Sales Ledger')}</span>
        <span className="text-blue-300 font-bold">{L('100% Electrónico', '100% Electronic')}</span>
      </div>
    </div>
  );
}

function AnalyticsChartWidget() {
  const { L } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-3 overflow-hidden border border-rose-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-rose-400">
          <Activity className="w-3 h-3 text-rose-400 animate-pulse" />
          {L('TELEMETRÍA 2026', 'TELEMETRY 2026')}
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
        <span>{L('Comparativa 2025 vs 2026', '2025 vs 2026 Comparison')}</span>
        <span className="text-rose-300 font-bold">{L('12 meses analizados', '12 months analyzed')}</span>
      </div>
    </div>
  );
}

function ClientsRosterWidget({ isB2B = false }: { isB2B?: boolean }) {
  const { L, money } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-3 overflow-hidden border border-cyan-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-cyan-400">
          <Users className="w-3 h-3 text-cyan-400" />
          {isB2B ? L('CLIENTES & FLOTAS B2B', 'B2B CLIENTS & FLEETS') : L('CARTERA DE CLIENTES', 'CLIENT PORTFOLIO')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-[9px] font-bold border border-cyan-500/30">
          {L('142 ACTIVOS', '142 ACTIVE')}
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
          <span className="text-[8px] text-slate-400 block font-mono">{L('Crédito Concedido', 'Credit Extended')}</span>
          <span className="text-[10px] font-bold text-cyan-300 font-mono">{money(42500)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>{L('Cuentas por cobrar al día', 'Accounts receivable up to date')}</span>
        <span className="text-cyan-300 font-bold">{L('Límites protegidos', 'Limits protected')}</span>
      </div>
    </div>
  );
}

function LogisticsFleetWidget() {
  const { L } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-3 overflow-hidden border border-violet-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-violet-400">
          <Truck className="w-3 h-3 text-violet-400" />
          {L('COMPRAS & PROVEEDORES', 'PURCHASES & SUPPLIERS')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 font-mono text-[9px] font-bold border border-violet-500/30">
          {L('LOGÍSTICA', 'LOGISTICS')}
        </span>
      </div>

      <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between text-[9px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          <span className="text-slate-300">{L('Proveedor', 'Supplier')}</span>
          <div className="w-8 border-t border-dashed border-violet-400" />
          <Truck className="w-3.5 h-3.5 text-violet-300 animate-bounce" />
          <div className="w-8 border-t border-dashed border-violet-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-emerald-300">{L('Bodega', 'Warehouse')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>{L('Crédito Fiscal 12% SAT', '12% VAT Tax Credit')}</span>
        <span className="text-violet-300 font-bold">{L('3 pedidos en camino', '3 orders in transit')}</span>
      </div>
    </div>
  );
}

function FiscalLedgerWidget() {
  const { L, money } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-3 overflow-hidden border border-emerald-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-emerald-400">
          <Landmark className="w-3 h-3 text-emerald-400" />
          {L('LIBRO DIARIO & SAT', 'GENERAL JOURNAL & TAX')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30">
          {L('CUADRADO 100%', '100% BALANCED')}
        </span>
      </div>

      <div className="my-1 bg-black/40 rounded-lg p-1.5 border border-emerald-500/20 grid grid-cols-2 gap-2 text-center">
        <div className="border-r border-white/10 pr-1">
          <span className="text-[8px] text-slate-400 block font-mono">{L('DEBE TOTAL', 'TOTAL DEBIT')}</span>
          <span className="text-[10px] font-bold text-emerald-300 font-mono">{money(118450)}</span>
        </div>
        <div className="pl-1">
          <span className="text-[8px] text-slate-400 block font-mono">{L('HABER TOTAL', 'TOTAL CREDIT')}</span>
          <span className="text-[10px] font-bold text-emerald-300 font-mono">{money(118450)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>{L('Partida Doble Auditada', 'Audited Double-Entry')}</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> {L('Sin descuadres', 'Balanced')}
        </span>
      </div>
    </div>
  );
}

function HrTeamWidget() {
  const { L } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-3 overflow-hidden border border-teal-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-teal-400">
          <UserCheck className="w-3 h-3 text-teal-400" />
          {L('PLANILLA & PERSONAL', 'PAYROLL & STAFF')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-mono text-[9px] font-bold border border-teal-500/30">
          {L('8 COLABORADORES', '8 EMPLOYEES')}
        </span>
      </div>

      <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between text-[9px]">
        <span className="text-slate-300">{L('Cuota Laboral IGSS (4.83%)', 'Social Security Withholding (4.83%)')}</span>
        <span className="font-bold text-teal-300 font-mono">{L('Al Día', 'Up to Date')}</span>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>{L('Expedientes con DPI', 'ID Files & Contracts')}</span>
        <span className="text-teal-300 font-bold">{L('Nómina Activa', 'Active Payroll')}</span>
      </div>
    </div>
  );
}

function AttendanceKioskWidget() {
  const { L } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-3 overflow-hidden border border-indigo-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-indigo-400">
          <Clock3 className="w-3 h-3 text-indigo-400" />
          {L('KIOSCO RELOJ CHECADOR', 'TIME CLOCK KIOSK')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[9px] font-bold border border-indigo-500/30">
          {L('PIN SEGURO', 'SECURE PIN')}
        </span>
      </div>

      <div className="my-1 bg-black/50 rounded-lg p-1.5 border border-indigo-500/30 flex items-center justify-around font-mono">
        <span className="text-xs font-black text-indigo-300 tracking-wider">
          ● ● ● ●
        </span>
        <div className="flex items-center gap-1 text-[9px] text-slate-400">
          <KeyRound className="w-3 h-3 text-indigo-400" />
          <span>{L('Marcaje Rápido', 'Quick Clock-In')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>{L('Turnos & Horas Extras', 'Shifts & Overtime')}</span>
        <span className="text-indigo-400 font-bold">100% Digital</span>
      </div>
    </div>
  );
}

function BranchesNetWidget() {
  const { L } = useLanguage();
  return (
    <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-3 overflow-hidden border border-blue-500/30 flex flex-col justify-between shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 font-bold text-blue-400">
          <Store className="w-3 h-3 text-blue-400" />
          {L('RED MULTI-SUCURSAL', 'MULTI-BRANCH NETWORK')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono text-[9px] font-bold border border-blue-500/30">
          {L('3 SEDES', '3 BRANCHES')}
        </span>
      </div>

      <div className="my-1 flex items-center justify-between bg-white/10 rounded-lg p-1.5 border border-white/10 text-[9px] text-slate-300">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {L('Central', 'Main')}</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> {L('Norte', 'North')}</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> {L('Sur', 'South')}</span>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>{L('Cajas asignadas por sede', 'Registers assigned per branch')}</span>
        <span className="text-blue-300 font-bold">{L('Interconectadas', 'Connected')}</span>
      </div>
    </div>
  );
}

function SecuritySystemWidget({ isInformal = false }: { isInformal?: boolean }) {
  const { L } = useLanguage();
  if (isInformal) {
    return (
      <div className="relative h-28 rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-3 overflow-hidden border border-indigo-500/30 flex flex-col justify-between shadow-inner">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

        <div className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5 font-bold text-indigo-300">
            <Store className="w-3 h-3 text-indigo-400" />
            {L('DATOS DE MI TIENDA', 'MY STORE INFO')}
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[9px] font-bold border border-indigo-500/30">
            BOUTIQUE LIVE
          </span>
        </div>

        <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between text-[9px]">
          <span className="text-slate-300">{L('Cuentas Bancarias & Envíos', 'Bank Accounts & Shipping')}</span>
          <span className="font-bold text-emerald-400 flex items-center gap-1">
            <Check className="w-3 h-3" /> {L('BI • Banrural • BAC', 'Banks Ready')}
          </span>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
          <span>{L('WhatsApp de Cobro', 'WhatsApp Billing')}</span>
          <span className="text-indigo-300 font-bold">{L('Resúmenes Listos', 'Summaries Ready')}</span>
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
          {L('CONFIGURACIÓN GLOBAL', 'GLOBAL SETTINGS')}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[9px] font-bold border border-slate-700">
          {L('SAT & FEL', 'TAX & E-INV')}
        </span>
      </div>

      <div className="my-1 bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center justify-between text-[9px]">
        <span className="text-slate-300">{L('Certificados Digitales', 'Digital Certificates')}</span>
        <span className="font-bold text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> SSL 256-Bit
        </span>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/10 pt-1">
        <span>{L('Régimen Tributario & Logo', 'Tax Regime & Logo')}</span>
        <span className="text-slate-300 font-bold">{L('Parámetros OK', 'Parameters OK')}</span>
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
  const { lang, isEn, L, money, currencySymbol, locale, trPayment, trRegime, trClient } = useLanguage();

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
  const effectiveRegimen = trRegime(formatRegimenLabel(rawReg));
  const tipoRegimen = getTipoRegimenSAT(rawReg);
  const isPequeno = tipoRegimen === 'pequeno_contribuyente';
  const isInformal = tipoRegimen === 'exento' || isLiveOnlyCompany;

  // 1. Datos Operativos Dinámicos de Últimas Ventas
  const recentSales = useMemo(() => {
    if (isFortexa) {
      return [
        { id: 'FAC-B2B-108', cliente: 'Trans-Guatemala S.A.', total: money(6500), metodo: trPayment('Transferencia'), hora: '11:45', status: 'Completado', desc: L('RutaFuel Pro Flotas (10 Vehículos Anual)', 'RutaFuel Pro Fleets (10 Vehicles Annual)') },
        { id: 'LIC-QTM-204', cliente: 'Abarrotes La Bendición', total: money(499), metodo: L('Tarjeta POS', 'Card POS'), hora: '10:20', status: 'Completado', desc: L('Quantum Store POS Licencia Perpetua', 'Quantum Store POS Lifetime License') },
        { id: 'FAC-B2B-109', cliente: 'Transportes Rápidos del Norte', total: money(3850), metodo: L('Crédito B2B', 'B2B Credit'), hora: '09:15', status: 'Pendiente', desc: L('Hardware Sensores GPS Teltonika 4G', 'Teltonika 4G GPS Sensor Hardware') },
        { id: 'SUB-PRO-012', cliente: L('Carlos M. Morales (Conductor)', 'Carlos M. Morales (Driver)'), total: money(590), metodo: 'Hotmart Pay', hora: '08:40', status: 'Completado', desc: L('RutaFuel Pro Individual (Anual)', 'RutaFuel Pro Individual (Annual)') },
        { id: 'LIC-QTM-205', cliente: 'Farmacia & Droguería Central', total: money(999), metodo: trPayment('Transferencia'), hora: '08:10', status: 'Completado', desc: L('Quantum Store Red 5 PCs', 'Quantum Store 5-PC Network') },
      ];
    }
    if (isDemoCompany) {
      return [
        { id: 'TKT-DEMO-001', cliente: L('Cliente Mostrador Demo', 'Demo Counter Customer'), total: money(450), metodo: L('Tarjeta POS', 'Card POS'), hora: '10:30', status: 'Completado', desc: 'Smart Watch Pro Series 8 Waterproof' },
        { id: 'TKT-DEMO-002', cliente: L('Distribuidora Central Demo', 'Central Distributor Demo'), total: money(220), metodo: trPayment('Efectivo'), hora: '09:45', status: 'Completado', desc: L('Audífonos Inalámbricos TWS Pro', 'TWS Pro Wireless Earbuds') },
        { id: 'TKT-DEMO-003', cliente: trClient('Consumidor Final'), total: money(110), metodo: trPayment('Transferencia'), hora: '09:10', status: 'Completado', desc: L('Termo Inteligente Acero LED 500ml', 'Smart LED Steel Thermos 500ml') },
      ];
    }
    if (!isFashionStyles) {
      return [];
    }
    return REAL_SALES.slice(0, 5).map(s => ({
      id: s.id,
      cliente: trClient(s.cliente),
      total: money(s.total),
      metodo: trPayment(s.metodoPago),
      hora: s.fecha.split(' ')[1] || s.fecha,
      status: s.estado === 'Completada' ? 'Completado' : s.estado === 'Crédito' ? 'Pendiente' : 'Anulado',
      desc: s.productos.map(p => p.nombre).slice(0, 2).join(', ')
    }));
  }, [isFortexa, isDemoCompany, isFashionStyles, lang]);

  // 2. Datos Operativos de Cuentas por Cobrar & Vencimientos
  const { receivables, totalCartera } = useMemo(() => {
    if (isFortexa) {
      const recs = [
        { id: 'FAC-B2B-104', cliente: 'Transportes Rápidos S.A.', saldo: 14500, fecha_venc: '20/11/2026', dias: L('En 3 días', 'In 3 days'), urgencia: 'urgente' },
        { id: 'FAC-B2B-098', cliente: 'Trans-Guatemala Flotas', saldo: 8200, fecha_venc: '24/11/2026', dias: L('En 7 días', 'In 7 days'), urgencia: 'alerta' },
        { id: 'LIC-ENT-041', cliente: 'Distribuidora Logística Central', saldo: 6500, fecha_venc: '28/11/2026', dias: L('En 11 días', 'In 11 days'), urgencia: 'normal' },
        { id: 'CON-COR-015', cliente: 'Agro-Industrias del Sur', saldo: 4900, fecha_venc: '02/12/2026', dias: L('En 15 días', 'In 15 days'), urgencia: 'normal' },
      ];
      return { receivables: recs, totalCartera: 34100 };
    }
    if (isDemoCompany) {
      const recs = [
        { id: 'FAC-DEMO-101', cliente: L('Distribuidora Central Demo', 'Central Distributor Demo'), saldo: 1850, fecha_venc: '25/11/2026', dias: L('En 5 días', 'In 5 days'), total: 3500, urgencia: 'normal' as const },
        { id: 'FAC-DEMO-102', cliente: 'Tech Store Guatemala Demo', saldo: 3200, fecha_venc: '22/11/2026', dias: L('En 2 días', 'In 2 days'), total: 3200, urgencia: 'alerta' as const }
      ];
      return { receivables: recs, totalCartera: 5050 };
    }
    if (!isFashionStyles) {
      return { receivables: [], totalCartera: 0 };
    }
    const recs = REAL_CLIENTS.filter(c => c.saldo_actual > 0).slice(0, 5).map((c, i) => ({
      id: `CLI-${c.id_cliente}`,
      cliente: trClient(c.nombre_completo),
      fecha_venc: '30/11/2026',
      dias: i === 0 ? L('En 3 días', 'In 3 days') : i === 1 ? L('En 5 días', 'In 5 days') : L('En 8 días', 'In 8 days'),
      total: c.saldo_actual,
      saldo: c.saldo_actual,
      urgencia: (c.saldo_actual > 4500 ? 'urgente' : c.saldo_actual > 3000 ? 'alerta' : 'normal') as 'urgente' | 'alerta' | 'normal'
    }));
    const total = REAL_CLIENTS.reduce((acc, c) => acc + c.saldo_actual, 0);
    return { receivables: recs, totalCartera: total };
  }, [isFortexa, isDemoCompany, isFashionStyles, lang]);

  // 3. Datos de Demanda en Pre-Ventas & Déficit de Stock
  const demandProducts = useMemo(() => {
    if (isFortexa) {
      return [
        { id: 1, nombre: 'Teltonika GPS Tracker 4G IoT', sku: 'GPS-4G-TEL', solicitado: 50, stock: 12, deficit: 38, clientes: ['Transportes Rápidos', 'Flotas Pacífico'] },
        { id: 2, nombre: L('Sensor de Flujo Digital Combustible', 'Digital Fuel Flow Sensor'), sku: 'SEN-FLUX-01', solicitado: 25, stock: 5, deficit: 20, clientes: ['Trans-Guatemala'] },
        { id: 3, nombre: L('Gateway OBD2 Telemetría Pro', 'OBD2 Telemetry Pro Gateway'), sku: 'GTW-OBD2-PRO', solicitado: 15, stock: 2, deficit: 13, clientes: ['Logística Central'] },
      ];
    }
    if (isDemoCompany) {
      return [
        { id: 1, nombre: 'Smart Watch Pro Series 8 Waterproof', sku: 'WCH-DEMO-01', solicitado: 15, stock: 3, deficit: 12, clientes: ['Cliente Demo Corporativo'] },
        { id: 2, nombre: L('Audífonos Inalámbricos TWS Pro', 'TWS Pro Wireless Earbuds'), sku: 'TWS-PRO-02', solicitado: 20, stock: 4, deficit: 16, clientes: ['Distribuidora Central Demo'] },
        { id: 3, nombre: L('Termo Inteligente Acero LED 500ml', 'Smart LED Steel Thermos 500ml'), sku: 'TRM-LED-03', solicitado: 10, stock: 2, deficit: 8, clientes: ['Tech Store Demo'] }
      ];
    }
    if (!isFashionStyles) {
      return [];
    }
    return [
      { id: 4155, nombre: L('Serum Facial & Contorno de Ojos', 'Facial & Eye Contour Serum'), sku: 'CDD-0000003', solicitado: 25, stock: 1, deficit: 24, clientes: ['Clientas Boutique VIP', 'Venta en Tienda'] },
      { id: 2908, nombre: L('Juego Completo Depilación & Exfoliante', 'Complete Waxing & Exfoliating Kit'), sku: 'GNR-0000446', solicitado: 30, stock: 10, deficit: 20, clientes: ['Clientas Frecuentes', 'Venta Mostrador'] },
      { id: 2841, nombre: L('Aceite Labial Hidratante Gloss', 'Hydrating Lip Gloss Oil'), sku: 'BLL-0000064', solicitado: 25, stock: 6, deficit: 19, clientes: ['Compradoras Live', 'Venta en Caja'] },
    ];
  }, [isFortexa, isDemoCompany, isFashionStyles, lang]);

  // Definición de Tarjetas adaptadas con sus Widgets
  const allCards: HubCard[] = useMemo(() => {
    const cards: HubCard[] = [];

    // 1. Módulos de Operaciones Comerciales
    if (isFortexa) {
      cards.push({
        id: 'fortexa_apps',
        title: L('Suscripciones & Apps Fortexa', 'Fortexa Subscriptions & Apps'),
        subtitle: 'RutaFuel Pro, Quantum POS & IntegraPro',
        description: L(
          'Gestión central de suscripciones anuales, cortes automáticos, pagos en Hotmart y licencias perpetuas.',
          'Centralized management of annual subscriptions, automatic billing cutoffs, Hotmart payments, and lifetime licenses.'
        ),
        icon: Cpu,
        gradient: 'from-indigo-600 via-indigo-700 to-purple-800',
        glowColor: 'from-indigo-600/40 to-purple-600/40',
        badge: { text: 'SaaS / Hotmart', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' },
        metric: L(`11 Licencias Activas • ${currencySymbol} 24,500 ARR`, `11 Active Licenses • ${currencySymbol}24,500 ARR`),
        category: 'operaciones',
        highlight: true,
        widgetType: 'fortexa_saas'
      });
      cards.push({
        id: 'ventas',
        title: L('Ventas & Facturación (FEL B2B)', 'Sales & E-Invoicing (B2B)'),
        subtitle: L('DTEs Electrónicos SAT y Cotizaciones', 'Electronic Invoices & Quotes'),
        description: L(
          'Facturación en línea FEL con firma electrónica DTE, cotizaciones para flotas y contratos B2B.',
          'Online electronic invoicing with digital signature, fleet quotes, and B2B service contracts.'
        ),
        icon: ReceiptText,
        gradient: 'from-blue-600 to-indigo-700',
        glowColor: 'from-blue-600/40 to-indigo-600/40',
        badge: { text: L('FEL SAT Oficial', 'Certified E-Invoice'), color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
        metric: L('Certificación Infile SAT', 'Tax Compliance Certified'),
        category: 'operaciones',
        widgetType: 'fel_invoice'
      });
      cards.push({
        id: 'inventario',
        title: L('Hardware & Equipos', 'Hardware & Equipment'),
        subtitle: L('Dispositivos GPS, Sensores y Servidores', 'GPS Devices, Sensors & Servers'),
        description: L(
          'Control de inventario de equipos tecnológicos, sensores de combustible y stock disponible en bodega.',
          'Inventory control for tech hardware, fuel sensors, and available warehouse stock.'
        ),
        icon: Boxes,
        gradient: 'from-amber-500 to-orange-600',
        glowColor: 'from-amber-500/40 to-orange-500/40',
        badge: { text: 'Tech Inventory', color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
        metric: L('Stock en Bodega Central', 'Main Warehouse Stock'),
        category: 'operaciones',
        widgetType: 'inventory_gauge'
      });
      cards.push({
        id: 'clientes',
        title: L('Clientes & Flotas B2B', 'B2B Clients & Fleets'),
        subtitle: L('Empresas de Transporte & Conductores', 'Transport Companies & Drivers'),
        description: L(
          'Directorio de clientes corporativos, expedientes de flotas, saldos y contratos de servicio.',
          'Corporate client directory, fleet records, account balances, and service contracts.'
        ),
        icon: Users,
        gradient: 'from-cyan-600 to-blue-700',
        glowColor: 'from-cyan-600/40 to-blue-600/40',
        badge: { text: L('Cartera B2B', 'B2B Portfolio'), color: 'bg-cyan-500/10 text-cyan-700 border-cyan-200' },
        metric: L('Directorio Empresarial', 'Corporate Directory'),
        category: 'operaciones',
        widgetType: 'clients_roster'
      });
    } else {
      const hasPosModule = selectedEmpresa?.modules?.pos !== false;
      if (hasPosModule) {
        cards.push({
          id: 'pos',
          title: L('Punto de Venta (POS Rápido)', 'Point of Sale (Quick POS)'),
          subtitle: L('Caja, Escaneo de Código y Tickets', 'Register, Barcode Scanning & Receipts'),
          description: L(
            'Venta rápida de mostrador, cobro con tarjeta, efectivo, cálculo de cambio y cierre de caja.',
            'Fast counter checkout, card & cash payments, automatic change calculation, and register closing.'
          ),
          icon: Zap,
          gradient: 'from-emerald-500 via-teal-600 to-emerald-700',
          glowColor: 'from-emerald-500/40 to-teal-500/40',
          badge: { text: L('Caja Activa', 'Active Register'), color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
          metric: L('Caja Lista para Facturar', 'Register Ready for Checkout'),
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
          title: L('TikTok Live & Canastas', 'TikTok Live & Baskets'),
          subtitle: L('Ventas en Vivo, Apartados & Remates', 'Live Sales, Reservations & Flash Deals'),
          description: L(
            'Apartado de prendas en tiempo real con descuento inmediato de inventario, remates relámpago y cobros unificados por WhatsApp.',
            'Real-time item reservations with instant inventory deduction, flash deals, and unified WhatsApp billing.'
          ),
          icon: Video,
          gradient: 'from-rose-500 via-pink-600 to-purple-700',
          glowColor: 'from-rose-500/40 to-purple-600/40',
          badge: { text: 'Social Commerce', color: 'bg-rose-500/10 text-rose-700 border-rose-200' },
          metric: L('Canastas Abiertas en Vivo', 'Open Live Baskets'),
          category: 'operaciones',
          widgetType: 'live_stream'
        });
      }

      cards.push({
        id: 'inventario',
        title: L('Inventario & Bodega', 'Inventory & Warehouse'),
        subtitle: L('Catálogo de Productos y Existencias', 'Product Catalog & Stock Levels'),
        description: L(
          'Control de stock físico, precios de compra y venta, alertas de stock mínimo y código de barras.',
          'Physical stock control, purchase & sale prices, low-stock alerts, and barcode generation.'
        ),
        icon: Boxes,
        gradient: 'from-amber-500 to-orange-600',
        glowColor: 'from-amber-500/40 to-orange-500/40',
        badge: { text: L('Stock en Tiempo Real', 'Real-Time Stock'), color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
        metric: L('Catálogo con Alertas de Mínimo', 'Catalog with Low-Stock Alerts'),
        category: 'operaciones',
        widgetType: 'inventory_gauge'
      });
      cards.push({
        id: 'ventas',
        title: L('Ventas & Facturación (FEL)', 'Sales & E-Invoicing'),
        subtitle: L('Historial de Ventas, DTEs y Clientes', 'Sales History, E-Invoices & Clients'),
        description: L(
          'Emisión de Facturas Electrónicas SAT (DTE), cotizaciones, notas de crédito y reportes de corte.',
          'Issue certified electronic invoices, quotes, credit notes, and daily closing reports.'
        ),
        icon: ReceiptText,
        gradient: 'from-blue-600 to-indigo-700',
        glowColor: 'from-blue-600/40 to-indigo-600/40',
        badge: { text: L('FEL SAT', 'E-Invoice'), color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
        metric: L('Libro de Ventas Fiscal', 'Tax Sales Ledger'),
        category: 'operaciones',
        widgetType: 'fel_invoice'
      });
      cards.push({
        id: 'clientes',
        title: L('Clientes & Créditos', 'Clients & Credit'),
        subtitle: L('Cartera de Clientes y Cobranza', 'Client Portfolio & Collections'),
        description: L(
          'Registro de clientes, asignación de límites de crédito, saldos pendientes y estado de cuenta.',
          'Customer profiles, credit limits, pending balances, and account statements.'
        ),
        icon: Users,
        gradient: 'from-cyan-600 to-blue-700',
        glowColor: 'from-cyan-600/40 to-blue-600/40',
        badge: { text: L('Cartera', 'Portfolio'), color: 'bg-cyan-500/10 text-cyan-700 border-cyan-200' },
        metric: L('Cuentas por Cobrar', 'Accounts Receivable'),
        category: 'operaciones',
        widgetType: 'clients_roster'
      });
    }

    // 2. Módulos de Finanzas & Compras
    cards.push({
      id: 'compras',
      title: L('Compras & Proveedores', 'Purchases & Suppliers'),
      subtitle: L('Órdenes de Compra y Cuentas por Pagar', 'Purchase Orders & Accounts Payable'),
      description: L(
        'Gestión de proveedores, registro de facturas de compra para crédito fiscal SAT y control de pagos.',
        'Supplier management, purchase invoice logging for VAT credit, and payment tracking.'
      ),
      icon: Truck,
      gradient: 'from-violet-600 to-purple-700',
      glowColor: 'from-violet-600/40 to-purple-600/40',
      badge: { text: L('Proveedores', 'Suppliers'), color: 'bg-violet-500/10 text-violet-700 border-violet-200' },
      metric: L('Gestión de Abastecimiento', 'Procurement Management'),
      category: 'finanzas',
      widgetType: 'logistics_fleet'
    });

    cards.push({
      id: 'contabilidad',
      title: L('Contabilidad & SAT Fiscal', 'Accounting & Tax Compliance'),
      subtitle: L('Libro Diario, IVA e Impuestos', 'General Journal, VAT & Taxes'),
      description: L(
        'Generación de Libro Diario, Balance de Saldos, cálculo de IVA general (12%) y Pequeño Contribuyente (5%).',
        'Generate General Journal, Trial Balance, standard VAT (12%), and small business tax (5%) calculations.'
      ),
      icon: Landmark,
      gradient: 'from-emerald-600 to-teal-800',
      glowColor: 'from-emerald-600/40 to-teal-600/40',
      badge: { text: L('Cumplimiento SAT', 'Tax Compliance'), color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
      metric: L('Plan de Cuentas & DTEs', 'Chart of Accounts & E-Invoices'),
      category: 'finanzas',
      widgetType: 'fiscal_ledger'
    });

    cards.push({
      id: 'dashboard',
      title: L('Métricas & Dashboard Ejecutivo', 'Metrics & Executive Dashboard'),
      subtitle: L('Gráficas de Ventas, KPIs y Flujo de Caja', 'Sales Charts, KPIs & Cash Flow'),
      description: L(
        'Centro integral de analítica visual, comparativa de ventas 2025 vs 2026, demanda y cuentas por cobrar.',
        'Visual analytics hub, 2025 vs 2026 sales comparison, demand forecasting, and accounts receivable.'
      ),
      icon: Activity,
      gradient: 'from-rose-500 to-pink-700',
      glowColor: 'from-rose-500/40 to-pink-500/40',
      badge: { text: L('Analítica en Vivo', 'Live Analytics'), color: 'bg-rose-500/10 text-rose-700 border-rose-200' },
      metric: L('Gráficas & Proyección Anual', 'Charts & Annual Forecast'),
      category: 'finanzas',
      widgetType: 'analytics_chart'
    });

    // 3. Módulos de Gestión, Talento y Sistema
    cards.push({
      id: 'rrhh',
      title: L('Recursos Humanos & Planillas', 'Human Resources & Payroll'),
      subtitle: L('Colaboradores, Nómina y Expedientes', 'Employees, Payroll & Records'),
      description: L(
        'Gestión del personal, puestos de trabajo, cálculo de salarios, descuentos del IGSS y contratos.',
        'Staff management, job roles, salary calculations, social security deductions, and contracts.'
      ),
      icon: UserCheck,
      gradient: 'from-teal-600 to-emerald-700',
      glowColor: 'from-teal-600/40 to-emerald-600/40',
      badge: { text: L('Planilla IGSS', 'Payroll Suite'), color: 'bg-teal-500/10 text-teal-700 border-teal-200' },
      metric: L('Directorio de Personal', 'Staff Directory'),
      category: 'gestion',
      widgetType: 'hr_team'
    });

    cards.push({
      id: 'asistencia',
      title: L('Reloj Checador (Kiosco Asistencia)', 'Time Clock (Attendance Kiosk)'),
      subtitle: L('Control de Asistencia con Código PIN', 'PIN-Based Attendance Tracking'),
      description: L(
        'Pantalla kiosco táctil para que los colaboradores marquen entradas, salidas y turnos con su PIN de seguridad.',
        'Touchscreen kiosk for employees to clock in, clock out, and track shifts with their security PIN.'
      ),
      icon: Clock3,
      gradient: 'from-indigo-500 to-blue-700',
      glowColor: 'from-indigo-500/40 to-blue-500/40',
      badge: { text: L('Kiosco con PIN', 'PIN Kiosk'), color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' },
      metric: L('Marcaje en Tiempo Real', 'Real-Time Clock In/Out'),
      category: 'gestion',
      widgetType: 'attendance_kiosk'
    });

    cards.push({
      id: 'sucursales',
      title: L('Red de Sucursales & Cajas', 'Branch Network & Registers'),
      subtitle: L('Ubicaciones Físicas y Asignaciones', 'Physical Locations & Assignments'),
      description: L(
        'Administración de sedes, bodegas satélite y asignación de cajas registradoras para cada sucursal.',
        'Manage locations, satellite warehouses, and cash register assignments per branch.'
      ),
      icon: Store,
      gradient: 'from-blue-500 to-cyan-600',
      glowColor: 'from-blue-500/40 to-cyan-500/40',
      badge: { text: L('Multi-Sede', 'Multi-Branch'), color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
      metric: L('Gestión Multi-Sucursal', 'Multi-Branch Management'),
      category: 'gestion',
      widgetType: 'branches_net'
    });

    cards.push({
      id: 'configuracion',
      title: isInformal
        ? L('Datos & Perfil de Mi Tienda', 'My Store Info & Profile')
        : L('Configuración de Empresa & SAT', 'Company & Tax Settings'),
      subtitle: isInformal
        ? L('Identidad de Boutique, WhatsApp y Cuentas', 'Boutique Identity, WhatsApp & Accounts')
        : L('Datos Fiscales, FEL, Logo y Sistema', 'Tax Info, E-Invoice, Logo & System'),
      description: isInformal
        ? L(
            'Configura el nombre de tu boutique, teléfono de WhatsApp para cobros, cuentas bancarias BI/Banrural y tarifas de envío.',
            'Configure your boutique name, WhatsApp billing number, bank accounts, and shipping rates.'
          )
        : L(
            'Ajuste de régimen tributario (General, Pequeño, Exento), credenciales DTE de Infile, logo y usuarios.',
            'Configure tax regime (Standard, Small Business, Exempt), E-Invoice credentials, logo, and users.'
          ),
      icon: isInformal ? Store : Settings,
      gradient: isInformal ? 'from-indigo-600 to-purple-800' : 'from-slate-600 to-slate-800',
      glowColor: isInformal ? 'from-indigo-600/40 to-purple-600/40' : 'from-slate-600/40 to-slate-800/40',
      badge: isInformal
        ? { text: L('Perfil de Tienda', 'Store Profile'), color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' }
        : { text: L('Ajustes del Sistema', 'System Settings'), color: 'bg-slate-500/10 text-slate-700 border-slate-200' },
      metric: isInformal ? L('Cuentas Bancarias & Envíos', 'Bank Accounts & Shipping') : L('Configuración Global', 'Global Settings'),
      category: 'gestion',
      widgetType: 'security_system'
    });

    cards.push({
      id: 'token_scraper',
      title: L('Token Scraper Chrome', 'Chrome Scraper Token'),
      subtitle: L('Extensión para Shein, Temu & AliExpress', 'Extension for Shein, Temu & AliExpress'),
      description: L(
        'Genera y administra tu clave de API personal para conectar la extensión de Chrome y extraer productos en 1 clic.',
        'Generate and manage your personal API key to connect the Chrome extension and import products in 1 click.'
      ),
      icon: KeyRound,
      gradient: 'from-amber-500 to-indigo-700',
      glowColor: 'from-amber-500/40 to-indigo-500/40',
      badge: { text: L('API Extensión', 'Extension API'), color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
      metric: L('Extracción Automatizada', 'Automated Import'),
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
  }, [isFortexa, isLiveOnlyCompany, isInformal, selectedEmpresa?.id, selectedEmpresa?.modules, selectedEmpresa?.plan, lang, currencySymbol]);

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
    <div className="space-y-8 pb-16">
      {/* 1. Hero Banner Principal */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-xl border bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-slate-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{L('Centro de Operaciones • Bento Grid 3D', 'Operations Center • 3D Bento Grid')}</span>
            </div>

            <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
                <span>{L('Hola,', 'Hello,')} {user.name.split(' ')[0]}</span>
                <span className="text-xl">👋</span>
              </h1>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
                  title={L('Cerrar sesión en este dispositivo', 'Sign out on this device')}
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>{L('Cerrar Sesión', 'Sign Out')}</span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isFortexa
                ? L(
                    'Consola tecnológica para gestionar RutaFuel Pro, licencias de software, contratos y cortes automáticos.',
                    'Technology console to manage RutaFuel Pro, software licenses, contracts, and automatic billing cutoffs.'
                  )
                : selectedEmpresa?.id === 99
                  ? L(
                      'Panel Live Express para vendedoras de TikTok Live: canastas abiertas, catálogo de prendas, remates en vivo y cobros por WhatsApp.',
                      'Live Express hub for TikTok Live sellers: open baskets, item catalog, live flash deals, and WhatsApp billing.'
                    )
                  : L(
                      'Punto de venta y gestión comercial para retail, catálogo de productos y facturación en caja.',
                      'Point of sale and commercial management for retail, product catalog, and counter invoicing.'
                    )}
            </p>

            {/* Indicador o Selector de Empresa en el Hero */}
            {empresas && onSelectEmpresa && empresas.length > 1 && (user.role === 'SuperAdmin' || user.email === 'admin@integrapro.com' || user.email === 'admin@admin.com') ? (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">{L('Empresa activa:', 'Active company:')}</span>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 hover:bg-white/20 transition-colors rounded-xl border border-white/20 backdrop-blur-sm">
                  <Building2 className="w-3.5 h-3.5 text-indigo-300" />
                  <select
                    value={selectedEmpresa?.id ?? user.empresa_id}
                    onChange={(e) => onSelectEmpresa(Number(e.target.value))}
                    className="bg-transparent text-white font-bold cursor-pointer focus:outline-none"
                  >
                    {empresas.map((emp) => (
                      <option key={emp.id} value={emp.id} className="text-slate-900 bg-white">
                        {emp.nombre} ({trRegime(emp.regimen)})
                      </option>
                    ))}
                  </select>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {selectedEmpresa?.nombre === 'Fortexa Technologies'
                    ? L('Modo B2B Tech', 'B2B Tech Mode')
                    : L('Modo Tienda POS', 'Retail POS Mode')}
                </span>
              </div>
            ) : (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">{L('Empresa activa:', 'Active company:')}</span>
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
                    {L('Entorno Demo Aislado', 'Isolated Demo Sandbox')}
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {selectedEmpresa?.nombre === 'Fortexa Technologies'
                    ? L('Modo B2B Tech', 'B2B Tech Mode')
                    : L('Modo Tienda POS', 'Retail POS Mode')}
                </span>
              </div>
            )}
          </div>

          {/* Mini-Panel de Telemetría Global */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                {isFortexa ? L('SaaS Activas', 'Active SaaS') : L('Caja POS', 'POS Register')}
              </span>
              <span className="text-base sm:text-lg font-black text-white block mt-0.5">
                {isFortexa ? L('11 Licencias', '11 Licenses') : L('Disponible', 'Available')}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isFortexa ? 'RutaFuel & Quantum' : L('Caja #01 Lista', 'Register #01 Ready')}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                {isFortexa ? L('ARR Recurrente', 'Recurring ARR') : isInformal ? L('Comprobantes', 'Receipts') : L('Facturas FEL', 'E-Invoices')}
              </span>
              <span className="text-base sm:text-lg font-black text-white block mt-0.5">
                {isFortexa
                  ? (isEn ? `${currencySymbol}24,500` : `${currencySymbol} 24,500`)
                  : isFashionStyles
                    ? (isInformal ? L('951 emitidos', '951 issued') : L('951 emitidas', '951 issued'))
                    : L('3 emitidas', '3 issued')}
              </span>
              <span className="text-[10px] text-indigo-300 font-medium block mt-0.5">
                {isFortexa
                  ? L('Anualizado', 'Annualized')
                  : isFashionStyles
                    ? L(`${currencySymbol} 179.4k facturados`, `${currencySymbol}179.4k billed`)
                    : L('Modo Demo', 'Demo Mode')}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                {isInformal || isPequeno ? L('Régimen Fiscal', 'Tax Regime') : L('Servicio SAT', 'Tax Service')}
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-400 block mt-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {isInformal
                  ? L('Exento / Informal', 'Tax-Exempt')
                  : isPequeno
                    ? L('Pequeño Contribuyente', 'Small Business (5%)')
                    : L('Online FEL (12%)', 'Online E-Inv (12%)')}
              </span>
              <span className="text-[10px] text-slate-300 font-medium block mt-0.5">
                {isInformal
                  ? L('0% IVA (Negocio no factura)', '0% VAT (No Tax Invoicing)')
                  : isPequeno
                    ? L('5% Monotributo SAT', '5% Flat Tax Rate')
                    : L('DTE Infile GT', 'Certified E-Invoicing')}
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
            placeholder={L("Buscar módulo (ej. 'Inventario', 'FEL', 'Caja')...", "Search module (e.g. 'Inventory', 'Invoice', 'POS')...")}
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
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${activeCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {L('Todos', 'All')} ({filteredCards.length})
          </button>
          <button
            onClick={() => setActiveCategory('operaciones')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${activeCategory === 'operaciones'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {L('Operaciones Comerciales', 'Commercial Operations')}
          </button>
          <button
            onClick={() => setActiveCategory('finanzas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${activeCategory === 'finanzas'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {L('Finanzas & Compras', 'Finance & Purchases')}
          </button>
          <button
            onClick={() => setActiveCategory('gestion')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${activeCategory === 'gestion'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {L('Gestión & Talento', 'Management & Talent')}
          </button>
        </div>
      </div>

      {/* 3. Cuadrícula Bento Grid 3D de Módulos con física Spring (Framer Motion) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* TARJETA HERO DOBLE (Punto de Venta en Fashion Styles o Suscripciones en Fortexa o Live en Live Seller) */}
        {heroCard && (
          <motion.div
            initial={false}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            onClick={() => {
              if (heroCard.isLocked) {
                setSelectedUpgradeCard(heroCard);
              } else {
                onNavigate(heroCard.id);
              }
            }}
            className={`group relative md:col-span-2 rounded-3xl p-5 border shadow-[0_15px_35px_-5px_rgba(79,70,229,0.12),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] transition-shadow duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${heroCard.isLocked
                ? 'bg-gradient-to-br from-white via-slate-50 to-amber-50/40 border-amber-300/80 hover:border-amber-400'
                : 'bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 border-indigo-200/90'
              }`}
          >
            {/* Bisel de luz superior reflectiva */}
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${heroCard.isLocked ? 'from-transparent via-amber-400 to-transparent' : 'from-transparent via-indigo-500 to-transparent'
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
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${heroCard.isLocked
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20'
                        }`}>
                        {heroCard.isLocked
                          ? L('🔒 Módulo Pro', '🔒 Pro Module')
                          : isFortexa
                            ? L('Módulo Principal SaaS', 'Main SaaS Module')
                            : heroCard.id === 'live_sales'
                              ? 'TikTok Live Commerce'
                              : L('Caja Principal POS', 'Main POS Register')}
                      </span>
                      {!heroCard.isLocked && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {L('En línea', 'Online')}
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
                  {heroCard.isLocked ? L('Requiere Upgrade', 'Upgrade Required') : L('Módulo Destacado', 'Featured Module')}
                </span>
              </div>

              {/* Widget Interactivo con Reflejo OLED */}
              <div className={`my-1 oled-visor-sheen rounded-2xl ${heroCard.isLocked ? 'opacity-70 saturate-50 pointer-events-none' : ''}`}>
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
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-white font-bold text-xs shadow-md group-hover:translate-x-1 transition-all shrink-0 ${heroCard.isLocked
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                  }`}
              >
                <span>
                  {heroCard.isLocked
                    ? L('Conocer Módulo', 'Learn More')
                    : isFortexa
                      ? L('Gestionar Suscripciones', 'Manage Subscriptions')
                      : heroCard.id === 'live_sales'
                        ? L('Abrir Pantalla Live', 'Open Live Screen')
                        : L('Abrir Terminal POS', 'Open POS Terminal')}
                </span>
                {heroCard.isLocked ? <Lock className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </motion.div>
        )}

        {/* TARJETA ALTA (Inventario & Bodega / Hardware) — Alineada con el mismo ritmo vertical */}
        {tallCard && (
          <motion.div
            initial={false}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            onClick={() => {
              if (tallCard.isLocked) {
                setSelectedUpgradeCard(tallCard);
              } else {
                onNavigate(tallCard.id);
              }
            }}
            className="group relative md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-amber-400 transition-shadow duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
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

              <div className={`my-1 oled-visor-sheen rounded-2xl ${tallCard.isLocked ? 'opacity-70 saturate-50 pointer-events-none' : ''}`}>
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
                  <><span>{L('Conocer', 'Explore')}</span> <Lock className="w-3.5 h-3.5 text-amber-600" /></>
                ) : (
                  <><span>{L('Abrir', 'Open')}</span> <ArrowRight className="w-3.5 h-3.5" /></>
                )}
              </span>
            </div>
          </motion.div>
        )}

        {/* TARJETAS MEDIANAS & COMPACTAS EN BENTO GRID — Misma estructura vertical alineada */}
        {otherBentoCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={false}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              onClick={() => {
                if (card.isLocked) {
                  setSelectedUpgradeCard(card);
                } else {
                  onNavigate(card.id);
                }
              }}
              className={`group relative bg-white rounded-3xl p-5 border shadow-[0_8px_20px_-5px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${card.isLocked
                  ? 'border-amber-200/80 bg-gradient-to-b from-white via-slate-50/40 to-amber-50/25 hover:border-amber-400'
                  : 'border-slate-200/90 hover:border-indigo-400'
                }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.isLocked
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

                <div className={`my-1 oled-visor-sheen rounded-2xl ${card.isLocked ? 'opacity-70 saturate-50 pointer-events-none' : ''}`}>
                  {renderCardWidget(card)}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2 min-h-[36px]">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs min-h-[40px]">
                <span className="text-[11px] font-bold text-slate-500 truncate max-w-[155px]">{card.metric}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-all shrink-0 ${card.isLocked ? 'text-amber-800' : 'text-indigo-600'
                  }`}>
                  {card.isLocked ? (
                    <>
                      <span>{L('Conocer', 'Explore')}</span>
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                    </>
                  ) : (
                    <>
                      <span>{L('Ingresar', 'Enter')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </span>
              </div>
            </motion.div>
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
                {L('Pulso Operativo del Negocio en Vivo', 'Live Business Operational Pulse')}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {L(
                'Monitoreo activo de transacciones recientes, cobranza pendiente y compras urgentes por déficit de stock.',
                'Active monitoring of recent transactions, pending receivables, and urgent restocking needs.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200 shrink-0 self-start sm:self-auto">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>{L('Telemetría en Tiempo Real', 'Real-Time Telemetry')}</span>
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
                    <h3 className="font-bold text-slate-900 text-sm">{L('Últimas Ventas & Facturas', 'Recent Sales & Invoices')}</h3>
                    <p className="text-[10px] text-slate-400">{L('Transacciones de hoy en cajas y FEL', "Today's POS & E-Invoice transactions")}</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                  {recentSales.length} {L('Recientes', 'Recent')}
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
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {L('Facturación Activa', 'Invoicing Active')}
              </span>
              <button
                type="button"
                onClick={() => onNavigate(isFortexa ? 'ventas' : 'ventas')}
                className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                <span>{L('Ver historial completo', 'View full history')}</span>
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
                    <h3 className="font-bold text-slate-900 text-sm">{L('Cuentas por Cobrar', 'Accounts Receivable')}</h3>
                    <p className="text-[10px] text-slate-400">{L('Próximos vencimientos de crédito', 'Upcoming credit due dates')}</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold text-[10px]">
                  {isEn ? `${currencySymbol}${totalCartera.toLocaleString(locale, { minimumFractionDigits: 0 })}` : `${currencySymbol} ${totalCartera.toLocaleString(locale, { minimumFractionDigits: 0 })}`} Total
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
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{rec.id} • {L('Vence:', 'Due:')} {rec.fecha_venc}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-slate-900 block font-mono">
                        {money(rec.saldo)}
                      </span>
                      <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold ${rec.urgencia === 'urgente'
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
                {L('Cartera al día', 'Portfolio up to date')}
              </span>
              <button
                type="button"
                onClick={() => onNavigate('clientes')}
                className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                <span>{L('Gestionar cartera', 'Manage portfolio')}</span>
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
                    <h3 className="font-bold text-slate-900 text-sm">{L('Déficit en Pre-Ventas', 'Pre-Sale Stock Deficit')}</h3>
                    <p className="text-[10px] text-slate-400">{L('Cotizaciones con falta de stock', 'Quotes with insufficient stock')}</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px]">
                  {demandProducts.length} {L('Ítems Faltantes', 'Shortfall Items')}
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
                        SKU: {p.sku} • Stock: {p.stock} {L('unid', 'units')}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-black text-xs font-mono block">
                        -{p.deficit} {L('unid', 'units')}
                      </span>
                      <span className="text-[9px] text-amber-600 font-semibold block mt-0.5">
                        {L('Pidieron', 'Requested')} {p.solicitado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> {L('Reabastecer stock', 'Restock inventory')}
              </span>
              <button
                type="button"
                onClick={() => onNavigate('compras')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs transition-colors cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                <span>{L('Pedir a Compras', 'Order via Purchases')}</span>
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
                      <Lock className="w-3 h-3" /> {L('Módulo Pro / Enterprise', 'Pro / Enterprise Module')}
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
                  {L('¿Para qué sirve este módulo en tu negocio?', 'How does this module help your business?')}
                </h4>
                <p className="text-slate-700 leading-relaxed text-[13px]">
                  {selectedUpgradeCard.description}
                </p>
              </div>

              {/* Beneficios de Expandir con Fortexa */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <span className="text-[11px] font-black text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  {L('Beneficios al Activar este Módulo en tu Cuenta:', 'Benefits of Enabling This Module on Your Account:')}
                </span>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>{L('Activación Inmediata en la Nube:', 'Instant Cloud Activation:')}</strong>{' '}
                      {L(
                        'Fortexa Technologies enciende este módulo en tu base de datos en menos de 15 minutos sin reinstalaciones.',
                        'Fortexa Technologies activates this module on your workspace in under 15 minutes with zero reinstalls.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>{L('Capacitación & Soporte Incluido:', 'Training & Support Included:')}</strong>{' '}
                      {L(
                        'Te acompañamos paso a paso para que tu equipo aprenda a usarlo desde el primer día.',
                        'We guide your team step by step so everyone is productive from day one.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>{L('Facturación Mensual Flexible:', 'Flexible Monthly Billing:')}</strong>{' '}
                      {L(
                        'Agrégalo como un add-on adicional a tu suscripción actual.',
                        'Add it as a flexible add-on to your current subscription.'
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Banner de Precios Estimados */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
                <div>
                  <p className="text-[10px] font-bold text-indigo-900 uppercase">{L('Planes Comerciales Disponibles', 'Available Commercial Plans')}</p>
                  <p className="text-xs text-indigo-700 font-semibold">{L('Incluido en IntegraPro Comercial o Add-on', 'Included in IntegraPro Business or Add-on')}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-indigo-900 font-mono">{L('Desde Q 99 / mes', 'From $15 / mo')}</span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href={`https://api.whatsapp.com/send?phone=50223349000&text=${encodeURIComponent(
                    isEn
                      ? `Hello Fortexa Technologies, I am from "${selectedEmpresa?.nombre || 'My Company'}" and I would like to quote and activate the "${selectedUpgradeCard.title}" module.`
                      : `Hola Fortexa Technologies, soy de la empresa "${selectedEmpresa?.nombre || 'Mi Empresa'}" y me interesa cotizar y activar el módulo de "${selectedUpgradeCard.title}".`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{L('Solicitar Activación por WhatsApp', 'Request Activation via WhatsApp')}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedUpgradeCard(null)}
                  className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  {L('Volver al Menú', 'Back to Menu')}
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
          <h3 className="font-bold text-slate-800 text-base">{L('No se encontraron módulos', 'No modules found')}</h3>
          <p className="text-xs text-slate-500 mt-1">
            {L('No hay ningún módulo que coincida con ', 'No module matches ')}
            "<span className="font-semibold text-slate-700">{searchTerm}</span>".
          </p>
          <button
            onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
          >
            {L('Restablecer búsqueda', 'Reset search')}
          </button>
        </div>
      )}
    </div>
  );
}
