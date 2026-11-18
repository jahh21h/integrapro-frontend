import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users, 
  CheckCircle2, 
  Clock, 
  ShoppingBag, 
  Truck, 
  Landmark, 
  Flame
} from 'lucide-react';
import { useLiveSales } from '../context/LiveSalesContext';
import { EmpresaSaaS } from '../types';

interface LiveDashboardTabProps {
  empresa: EmpresaSaaS;
}

export default function LiveDashboardTab({ empresa }: LiveDashboardTabProps) {
  const { bags } = useLiveSales();

  // Filtrar canastas para la empresa actual
  const tenantBags = bags.filter(b => !b.empresa_id || b.empresa_id === empresa.id);

  // Cálculos de métricas reales
  const validBags = tenantBags.filter(b => b.estado !== 'cancelada');
  const totalVentas = validBags.reduce((acc, b) => acc + b.total, 0);
  
  const totalPrendas = validBags.reduce(
    (acc, b) => acc + b.items.reduce((s, it) => s + it.cantidad, 0), 
    0
  );

  const canastasPagadas = tenantBags.filter(b => b.estado === 'liquidada' || b.estado === 'despachada');
  const canastasPendientes = tenantBags.filter(b => b.estado === 'abierta' || b.estado === 'pendiente_pago');
  const canastasCanceladas = tenantBags.filter(b => b.estado === 'cancelada');

  const efectividadCobro = tenantBags.length > 0 
    ? Math.round((canastasPagadas.length / (tenantBags.length - canastasCanceladas.length || 1)) * 100)
    : 100;

  const ticketPromedio = validBags.length > 0 ? (totalVentas / validBags.length) : 0;

  // Desglose por método de pago
  const totalTransferencias = validBags
    .filter(b => b.metodo_pago === 'transferencia' || !b.metodo_pago)
    .reduce((acc, b) => acc + b.total, 0);

  const totalContraEntrega = validBags
    .filter(b => b.metodo_pago === 'contra_entrega')
    .reduce((acc, b) => acc + b.total, 0);

  // Desglose por courier
  const courierCounts = validBags.reduce((acc: Record<string, number>, b) => {
    const courier = b.empresa_envio || 'Guatex';
    acc[courier] = (acc[courier] || 0) + 1;
    return acc;
  }, {});

  // Total de prendas en remate vendidas y ahorro generado a clientas
  const rematesVendidos = validBags.reduce(
    (acc, b) => acc + b.items.filter(it => it.es_remate).reduce((s, it) => s + it.cantidad, 0),
    0
  );
  const totalAhorroRemates = validBags.reduce(
    (acc, b) => acc + b.items.filter(it => it.es_remate).reduce((s, it) => s + it.descuento, 0),
    0
  );

  return (
    <div className="space-y-6">
      
      {/* 1. HERO BANNER DE RESULTADOS DEL LIVE */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-7 rounded-3xl text-white shadow-xl border border-indigo-900/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-rose-300">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Resultados Financieros • TikTok Live Express</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Métricas de {empresa.nombre}</span>
            </h2>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Monitoreo en vivo de ventas recaudadas, canastas apartadas, efectividad de cobranza por WhatsApp y pedidos para paquetería.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
                Total Recaudado en Vivo
              </span>
              <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
                Q {totalVentas.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TARJETAS DE KPIS PRINCIPALES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Prendas Vendidas */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Prendas Apartadas</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
              {totalPrendas}
            </span>
            <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 mt-1">
              <ShoppingBag className="w-3 h-3" /> Catálogo en Vivo
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Canastas Totales */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Canastas Clientes</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
              {validBags.length}
            </span>
            <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 mt-1">
              <Users className="w-3 h-3" /> Compradoras
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Ticket Promedio */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Ticket Promedio</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
              Q {ticketPromedio.toFixed(2)}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Por Canasta
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4: Efectividad de Cobro */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Tasa de Cobro</span>
            <span className="text-2xl font-black text-purple-600 font-mono mt-1 block">
              {efectividadCobro}%
            </span>
            <span className="text-[10px] font-bold text-purple-600 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> WhatsApp OK
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 3. DOS COLUMNAS: ESTATUS DE COBRANZA Y CANALES DE PAGO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Columna Izquierda: Estatus de las Canastas */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Estatus de Cobranza de Canastas
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {tenantBags.length} canastas registradas
            </span>
          </div>

          <div className="space-y-3">
            {/* Canastas Pagadas / Verificadas */}
            <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-emerald-950 block">Pagadas & Verificadas</span>
                  <span className="text-[10px] text-emerald-700">Comprobante recibido por WhatsApp</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-emerald-700 font-mono">
                  {canastasPagadas.length}
                </span>
                <span className="text-[10px] text-emerald-600 block">
                  Q {canastasPagadas.reduce((a, b) => a + b.total, 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Canastas Pendientes de Depósito */}
            <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-amber-950 block">Pendientes de Pago</span>
                  <span className="text-[10px] text-amber-700">Canastas abiertas con prendas reservadas</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-amber-700 font-mono">
                  {canastasPendientes.length}
                </span>
                <span className="text-[10px] text-amber-600 block">
                  Q {canastasPendientes.reduce((a, b) => a + b.total, 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Canastas Canceladas / Stock Devuelto */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-400 text-white flex items-center justify-center font-bold">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-700 block">Canceladas (Prendas Devueltas)</span>
                  <span className="text-[10px] text-slate-500">Stock liberado de nuevo al inventario</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-slate-600 font-mono">
                  {canastasCanceladas.length}
                </span>
                <span className="text-[10px] text-slate-400 block">0 pérdidas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Canales de Cobro & Logística */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-blue-600" />
              Canales de Cobro & Logística
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Transferencias + Contra Entrega
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-700">
                <Landmark className="w-4 h-4" />
                <span className="text-xs font-extrabold">Transferencias</span>
              </div>
              <span className="text-lg font-black text-blue-950 font-mono block">
                Q {totalTransferencias.toFixed(2)}
              </span>
              <span className="text-[10px] text-blue-600 block">BI • Banrural • BAC</span>
            </div>

            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-700">
                <Truck className="w-4 h-4" />
                <span className="text-xs font-extrabold">Contra Entrega</span>
              </div>
              <span className="text-lg font-black text-purple-950 font-mono block">
                Q {totalContraEntrega.toFixed(2)}
              </span>
              <span className="text-[10px] text-purple-600 block">Cobro al entregar paquete</span>
            </div>
          </div>

          {/* Resumen de Paqueterías */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-700 block">Despachos por Paquetería:</span>
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(courierCounts).length > 0 ? (
                Object.entries(courierCounts).map(([courier, count]) => (
                  <span key={courier} className="px-2.5 py-1 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-sm">
                    <Truck className="w-3 h-3 text-indigo-600" />
                    <span>{courier}:</span>
                    <strong className="text-indigo-600 font-mono">{count}</strong>
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">Sin despachos aún</span>
              )}
            </div>
          </div>

          {/* Banner Remates Live */}
          {rematesVendidos > 0 && (
            <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                {rematesVendidos} prendas vendidas en remates en vivo
              </span>
              <span className="font-mono font-bold text-orange-700">
                Ahorro: Q {totalAhorroRemates.toFixed(2)}
              </span>
            </div>
          )}
        </div>

      </div>

      {/* 4. LISTADO DE COMPRADORAS DEL LIVE (CLIENTAS ACTIVAS) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Detalle de Compradoras en la Transmisión
            </h3>
            <p className="text-xs text-slate-500">Canastas abiertas y estatus de cada clienta del Live</p>
          </div>
          <span className="text-xs font-bold text-indigo-600">
            {validBags.length} canastas activas
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {validBags.map((bag) => (
            <div key={bag.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                  {bag.cliente_nombre.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{bag.cliente_nombre}</span>
                    {bag.usuario_tiktok && (
                      <span className="text-[11px] font-semibold text-rose-500 font-mono">
                        {bag.usuario_tiktok}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {bag.items.length} prendas • {bag.items.map(it => it.nombre).slice(0, 2).join(', ')}
                    {bag.items.length > 2 ? ` (+${bag.items.length - 2} más)` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-auto w-full sm:w-auto">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  bag.estado === 'liquidada' || bag.estado === 'despachada'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {bag.estado === 'liquidada' ? 'Pagada / Liquidada' : bag.estado === 'despachada' ? 'Despachada' : 'Pendiente Pago'}
                </span>

                <span className="text-sm font-black text-slate-900 font-mono">
                  Q {bag.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}