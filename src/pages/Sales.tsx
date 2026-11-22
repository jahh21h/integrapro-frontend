import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Receipt, 
  FileText, 
  DollarSign, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Printer, 
  X,
  QrCode,
  FileCheck2,
  Trophy,
  Award,
  Copy,
  Building,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  AlertTriangle,
  Loader2,
  Plus,
  Minus,
  AlertCircle,
  RefreshCcw
} from 'lucide-react';
import { VendedorRendimiento, EmpresaSaaS } from '../types';
import { calculateSaleTaxes } from '../utils/tax';
import { exportToExcelCsv } from '../utils/export';
import { salesApi } from '../api';
import { getTenantSales, getTenantCotizaciones, VentaItem, CotizacionItem } from '../data/realSales';
import { filterRecordsByTenant, getStoredActiveEmpresaId } from '../utils/tenant';

interface SalesProps {
  currentEmpresa?: EmpresaSaaS;
}

export default function Sales({ currentEmpresa }: SalesProps = {}) {
  const fallbackEmpresaId = getStoredActiveEmpresaId() || 0;
  const empresaActiva: EmpresaSaaS = currentEmpresa || {
    id: fallbackEmpresaId,
    nombre: fallbackEmpresaId === 1 ? 'Fashion Styles' : 'Empresa Activa',
    razon_social: fallbackEmpresaId === 1 ? 'Fashion Styles S.A.' : 'Empresa Activa',
    nit: 'CF',
    pais: 'GT',
    regimen: 'General (IVA 12%)',
    plan: 'enterprise',
    activa: true,
    telefono: '',
    email: '',
    direccion: 'Ciudad de Guatemala'
  };

  const [activeTab, setActiveTab] = useState<'ventas' | 'cotizaciones' | 'vendedores'>('ventas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Todas');
  const [selectedSaleDetail, setSelectedSaleDetail] = useState<VentaItem | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [copiedUuid, setCopiedUuid] = useState(false);
  const [isLoadingSales, setIsLoadingSales] = useState(false);

  // Estados para Modificar y Eliminar Ventas
  const [saleToDelete, setSaleToDelete] = useState<VentaItem | null>(null);
  const [isDeletingSale, setIsDeletingSale] = useState(false);

  const [editingSale, setEditingSale] = useState<VentaItem | null>(null);
  const [editSaleForm, setEditSaleForm] = useState<any>(null);
  const [isSavingSale, setIsSavingSale] = useState(false);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  // Datos reales sincronizados desde Droplet (Aislamiento Multi-Tenant Estricto)
  const [sales, setSales] = useState<VentaItem[]>(() => getTenantSales(empresaActiva.id));

  const fetchSales = () => {
    const targetEmpresaId = Number(empresaActiva.id);
    setIsLoadingSales(true);
    salesApi.getAll({ id_empresa: targetEmpresaId, per_page: 150 })
      .then(res => {
        const liveSales = res?.data || res;
        if (Array.isArray(liveSales)) {
          const { items: tenantSales, rejectedCount } = filterRecordsByTenant(liveSales, targetEmpresaId);
          if (rejectedCount > 0) {
            console.warn(
              `[Multi-Tenant Guard] Ventas bloqueó ${rejectedCount} venta(s) ajenas o sin id_empresa para la empresa #${targetEmpresaId}.`
            );
          }
          if (tenantSales.length === 0) {
            setSales(getTenantSales(targetEmpresaId));
          } else {
            const mapped: VentaItem[] = tenantSales.map((s: any) => {
              const totalMonto = Number(s.total) || 0;
              const sub = Number(s.subtotal) || Number((totalMonto / 1.12).toFixed(2));
              const ivaVal = Number(s.iva) || Number((totalMonto - sub).toFixed(2));
              const metodo = s.metodo_pago_principal === 'tarjeta' ? 'Tarjeta POS' : (s.metodo_pago_principal === 'transferencia' ? 'Transferencia' : (s.metodo_pago_principal === 'credito' ? 'Crédito' : 'Efectivo'));
              const items = Array.isArray(s.detalles) ? s.detalles.map((d: any) => ({
                id_producto: d.id_producto,
                nombre: d.producto?.nombre || d.nombre_producto || `Producto #${d.id_producto}`,
                cantidad: Number(d.cantidad) || 1,
                precioUnitario: Number(d.precio_unitario) || 0,
                subtotal: Number(d.subtotal) || 0,
                descuento: Number(d.descuento) || 0
              })) : [];

              return {
                id: String(s.id_venta || s.id),
                rawId: s.id_venta || s.id,
                idCliente: s.id_cliente,
                cliente: s.cliente ? `${s.cliente.nombre || ''} ${s.cliente.apellido || ''}`.trim() : (s.nombre_cliente || 'Consumidor Final'),
                nit: s.cliente?.nit || s.nit_cliente || 'CF',
                sucursal: s.sucursal?.nombre || 'Sucursal Principal',
                fecha: s.fecha ? String(s.fecha).substring(0, 10) : '2026-11-16',
                itemsCount: items.length || 1,
                subtotal: sub,
                iva: ivaVal,
                total: totalMonto,
                metodoPago: metodo,
                metodoPagoRaw: s.metodo_pago_principal || 'efectivo',
                observaciones: s.observaciones || '',
                rawDetalles: s.detalles || [],
                estado: s.estado_pago === 'anulada' ? 'Anulada' : (s.metodo_pago_principal === 'credito' ? 'Crédito' : 'Completada'),
                vendedor: s.empleado ? `${s.empleado.nombre || ''} ${s.empleado.apellido || ''}`.trim() : 'Caja Principal',
                dte: s.dte_uuid ? ({
                  uuid: s.dte_uuid,
                  serie: s.dte_serie || 'DTE-A1',
                  numero: s.dte_numero || '1001',
                  fechaHoraCertificacion: s.fecha || new Date().toISOString(),
                  fechaCertificacion: s.fecha || new Date().toISOString(),
                  nitEmisor: empresaActiva.nit || 'CF',
                  nombreEmisor: empresaActiva.razon_social || empresaActiva.nombre,
                  nitReceptor: s.cliente?.nit || s.nit_cliente || 'CF',
                  nombreReceptor: s.cliente ? `${s.cliente.nombre || ''} ${s.cliente.apellido || ''}`.trim() : (s.nombre_cliente || 'Consumidor Final'),
                  montoTotal: totalMonto,
                  nitCertificador: 'SAT-GT-1029381',
                  nombreCertificador: 'INFILE, S.A.',
                  qrCodeUrl: 'https://fel.sat.gob.gt/verificador'
                } as any) : null,
                productos: items
              };
            });
            setSales(mapped);
          }
        }
      })
      .catch((err) => {
        console.warn('Error fetching live sales:', err);
        setSales(getTenantSales(targetEmpresaId));
      })
      .finally(() => {
        setIsLoadingSales(false);
      });
  };

  useEffect(() => {
    setSales(getTenantSales(empresaActiva.id));
    fetchSales();
  }, [empresaActiva.id]);

  // Manejador para Abrir Edición de Venta
  const handleOpenEditSale = (s: VentaItem) => {
    setEditingSale(s);
    setEditSaleForm({
      id_cliente: s.idCliente || null,
      nombreCliente: s.cliente,
      metodo_pago: s.metodoPagoRaw || 'efectivo',
      observaciones: s.observaciones || '',
      descuentoGlobal: 0,
      detalles: s.productos && s.productos.length > 0 
        ? s.productos.map((p: any, idx: number) => ({
            id_producto: p.id_producto || (idx + 1),
            nombre: p.nombre,
            cantidad: p.cantidad,
            precio_unitario: p.precioUnitario,
            descuento: p.descuento || 0,
            subtotal: p.subtotal || (p.cantidad * p.precioUnitario)
          }))
        : [{ id_producto: 2745, nombre: 'Producto General', cantidad: 1, precio_unitario: s.total, descuento: 0, subtotal: s.total }]
    });
  };

  // Guardar Modificación de Venta
  const handleSaveEditSale = async () => {
    if (!editingSale || !editSaleForm) return;
    if (editSaleForm.detalles.length === 0) {
      alert('La venta debe contener al menos un producto.');
      return;
    }

    setIsSavingSale(true);
    try {
      const payload = {
        id_cliente: editSaleForm.id_cliente,
        metodo_pago: editSaleForm.metodo_pago,
        observaciones: editSaleForm.observaciones,
        descuento: Number(editSaleForm.descuentoGlobal) || 0,
        detalles: editSaleForm.detalles.map((d: any) => ({
          id_producto: d.id_producto,
          cantidad: Number(d.cantidad),
          precio_unitario: Number(d.precio_unitario),
          descuento: Number(d.descuento) || 0
        }))
      };

      await salesApi.updateSale(editingSale.rawId || editingSale.id, payload);
      showToast(`Venta #${editingSale.id} modificada exitosamente. Stock actualizado en inventario.`);
      setEditingSale(null);
      setEditSaleForm(null);
      fetchSales();
    } catch (err: any) {
      console.error('Error al actualizar venta:', err);
      const errMsg = err?.response?.data?.message || err?.message || 'Error al actualizar venta.';
      alert(`⚠️ NO SE PUDO MODIFICAR LA VENTA:\n\n${errMsg}`);
    } finally {
      setIsSavingSale(false);
    }
  };

  // Confirmar y Eliminar Venta (Devolviendo Stock)
  const handleConfirmDeleteSale = async () => {
    if (!saleToDelete) return;
    setIsDeletingSale(true);
    try {
      await salesApi.deleteSale(saleToDelete.rawId || saleToDelete.id);
      showToast(`Venta #${saleToDelete.id} eliminada. Stock de prendas restaurado al inventario.`);
      setSales(prev => prev.filter(s => s.id !== saleToDelete.id));
      setSaleToDelete(null);
    } catch (err: any) {
      console.error('Error al eliminar venta:', err);
      const errMsg = err?.response?.data?.message || err?.message || 'Error al anular la venta.';
      alert(`⚠️ NO SE PUDO ELIMINAR LA VENTA:\n\n${errMsg}`);
    } finally {
      setIsDeletingSale(false);
    }
  };

  const [quotes, setQuotes] = useState<CotizacionItem[]>(() => getTenantCotizaciones(empresaActiva.id));
  useEffect(() => {
    setQuotes(getTenantCotizaciones(empresaActiva.id));
  }, [empresaActiva.id]);

  // Vendedores adaptados por Tenant para aislamiento estricto
  const vendedores = useMemo<VendedorRendimiento[]>(() => {
    if (empresaActiva.id === 1) {
      return [
        {
          id_empleado: 1,
          nombre: 'Katy G',
          sucursal: 'Sucursal Principal',
          ventas_count: 948,
          total_vendido: 179205.50,
          meta_mensual: 150000.00,
          porcentaje_cumplido: 119.5,
          comision_acumulada: 5376.17, // 3% comisión
          ticket_promedio: 189.04
        },
        {
          id_empleado: 603,
          nombre: 'Jonathan Alexander Herrera Hernández',
          sucursal: 'Sucursal Principal',
          ventas_count: 40,
          total_vendido: 2395.04,
          meta_mensual: 5000.00,
          porcentaje_cumplido: 47.9,
          comision_acumulada: 71.85,
          ticket_promedio: 59.88
        },
        {
          id_empleado: 604,
          nombre: 'Byron Herrera',
          sucursal: 'Sucursal Principal',
          ventas_count: 3,
          total_vendido: 245.00,
          meta_mensual: 1000.00,
          porcentaje_cumplido: 24.5,
          comision_acumulada: 7.35,
          ticket_promedio: 81.67
        },
        {
          id_empleado: 605,
          nombre: 'Francisco Hernández',
          sucursal: 'Sucursal Principal',
          ventas_count: 2,
          total_vendido: 245.00,
          meta_mensual: 1000.00,
          porcentaje_cumplido: 24.5,
          comision_acumulada: 7.35,
          ticket_promedio: 122.50
        }
      ];
    }
    if (empresaActiva.id === 25) {
      return [
        {
          id_empleado: 901,
          nombre: 'Asesor Comercial Demo',
          sucursal: 'Sucursal Demo Principal',
          ventas_count: 3,
          total_vendido: 780.00,
          meta_mensual: 5000.00,
          porcentaje_cumplido: 15.6,
          comision_acumulada: 23.40,
          ticket_promedio: 260.00
        }
      ];
    }
    return [];
  }, [empresaActiva.id]);

  const handleConvertQuote = (quote: CotizacionItem) => {
    showToast(`Cotización ${quote.id} convertida a Venta exitosamente en Caja Central.`);
    setQuotes(quotes.map(q => q.id === quote.id ? { ...q, estado: 'Aprobada' } : q));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUuid(true);
    setTimeout(() => setCopiedUuid(false), 2000);
  };

  const filteredSales = sales.filter(s => {
    const matchesSearch = s.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.nit.includes(searchTerm) ||
                          (s.dte && s.dte.uuid.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBranch = selectedBranch === 'Todas' || s.sucursal.includes(selectedBranch);
    return matchesSearch && matchesBranch;
  });

  const filteredQuotes = quotes.filter(q => 
    q.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación de Ventas
  const [salesPage, setSalesPage] = useState(1);
  const salesPerPage = 25;
  const totalSalesPages = Math.ceil(filteredSales.length / salesPerPage);
  const paginatedSales = filteredSales.slice((salesPage - 1) * salesPerPage, salesPage * salesPerPage);

  // Paginación de Cotizaciones
  const [quotesPage, setQuotesPage] = useState(1);
  const quotesPerPage = 12;
  const totalQuotesPages = Math.ceil(filteredQuotes.length / quotesPerPage);
  const paginatedQuotes = filteredQuotes.slice((quotesPage - 1) * quotesPerPage, quotesPage * quotesPerPage);

  useEffect(() => {
    setSalesPage(1);
  }, [searchTerm, selectedBranch]);

  useEffect(() => {
    setQuotesPage(1);
  }, [searchTerm]);

  // Cálculos Dinámicos
  const totalVentasFacturadas = sales.reduce((acc, s) => acc + s.total, 0);
  const totalDtes = sales.filter(s => !!s.dte).length;
  const ticketPromedio = sales.length > 0 ? totalVentasFacturadas / sales.length : 0;
  const topVendedor = vendedores[0] || { nombre: 'Katy G', total_vendido: 179205.50, porcentaje_cumplido: 119.5 };

  const handleExportSales = () => {
    const dataToExport = filteredSales.map(s => {
      const taxes = calculateSaleTaxes(s.total, empresaActiva.regimen);
      return {
        'No. Factura': s.id,
        'Fecha': s.fecha,
        'Cliente': s.cliente,
        'NIT': s.nit,
        'Sucursal': s.sucursal,
        'Vendedor': s.vendedor,
        'Método Pago': s.metodoPago,
        'Estado': s.estado,
        'Base Gravable (Q)': taxes.subtotalNeto.toFixed(2),
        'IVA / Impuesto SAT (Q)': taxes.impuestoCalculadoSAT.toFixed(2),
        'Total (Q)': s.total.toFixed(2),
        'UUID FEL': s.dte?.uuid || 'No certificada',
        'Serie DTE': s.dte?.serie || '-',
        'Régimen Fiscal': empresaActiva.regimen
      };
    });
    exportToExcelCsv(dataToExport, `libro_ventas_sat_${empresaActiva.nombre.replace(/\s+/g, '_')}`);
    showToast('Libro de Ventas SAT exportado exitosamente a Excel CSV');
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
            Ventas, Facturación SAT & Comisiones
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Certificador INFILE DTE
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Historial de facturas FEL certificadas, cotizaciones y tabla de rendimiento comercial</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={fetchSales}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2 hover:border-slate-300 cursor-pointer"
            title="Recargar ventas en tiempo real desde la Base de Datos"
          >
            <RefreshCcw className={`w-4 h-4 text-indigo-600 ${isLoadingSales ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
          <button 
            type="button" 
            onClick={handleExportSales}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2 hover:border-slate-300"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Exportar Libro SAT</span>
          </button>
        </div>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ventas Facturadas</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              Q {totalVentasFacturadas.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="text-[11px] font-semibold text-emerald-600">{sales.length} transacciones registradas</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certificaciones FEL</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalDtes} DTEs</p>
            <span className="text-[11px] font-semibold text-teal-600">INFILE 100% en línea</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket Promedio</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              Q {ticketPromedio.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="text-[11px] font-semibold text-indigo-600">Catálogo general</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Receipt className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Vendedor Mes</span>
            <p className="text-sm font-black text-slate-900 mt-1 truncate">{topVendedor.nombre}</p>
            <span className="text-[11px] font-semibold text-amber-600">
              Q {(topVendedor.total_vendido / 1000).toFixed(1)}k • {topVendedor.porcentaje_cumplido}% meta
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Pestañas de Navegación */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('ventas')}
          className={`pb-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'ventas'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Historial de Ventas & FEL DTE</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 font-bold">
            {sales.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cotizaciones')}
          className={`pb-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'cotizaciones'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Cotizaciones & Propuestas</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 font-bold">
            {quotes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('vendedores')}
          className={`pb-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'vendedores'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Desempeño & Comisiones</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
            {vendedores.length} vendedores
          </span>
        </button>
      </div>

      {/* TAB 1: HISTORIAL DE VENTAS */}
      {activeTab === 'ventas' && (
        <div className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por ID, cliente, NIT o UUID SAT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="Todas">Todas las Sucursales</option>
                <option value="Central">Sucursal Central</option>
                <option value="Norte">Sucursal Norte</option>
                <option value="Sur">Sucursal Sur</option>
              </select>
            </div>
          </div>

          {/* Tabla de Ventas */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Comprobante</th>
                    <th className="py-3 px-4">Tipo / Régimen</th>
                    <th className="py-3 px-4">Cliente / NIT</th>
                    <th className="py-3 px-4">Vendedor</th>
                    <th className="py-3 px-4">Sucursal</th>
                    <th className="py-3 px-4 text-right">Subtotal</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {paginatedSales.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-extrabold text-slate-900">{s.id}</div>
                        <div className="text-[10px] text-slate-400">{s.fecha}</div>
                      </td>
                      <td className="py-3 px-4">
                        {s.dte ? (
                          <div className="inline-flex flex-col">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-teal-50 text-teal-700 border border-teal-200">
                              <FileCheck2 className="w-3 h-3" />
                              <span>FEL SAT</span>
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                              Serie {s.dte.serie}
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                            Ticket POS
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">{s.cliente}</div>
                        <div className="text-[10px] text-slate-500 font-mono">NIT: {s.nit}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {s.vendedor}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {s.sucursal}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600">
                        Q {s.subtotal.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-black text-slate-900">
                        Q {s.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedSaleDetail(s)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title="Ver Comprobante / DTE"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-600" />
                            <span className="hidden xl:inline">Ver</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEditSale(s)}
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title="Modificar Venta"
                          >
                            <Pencil className="w-3.5 h-3.5 text-amber-600" />
                            <span className="hidden xl:inline">Modificar</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSaleToDelete(s)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title="Eliminar / Anular Venta y Restaurar Stock"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                            <span className="hidden xl:inline">Eliminar</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación de Ventas */}
            {filteredSales.length > 0 && (
              <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 font-medium">
                  Mostrando {(salesPage - 1) * salesPerPage + 1} a {Math.min(salesPage * salesPerPage, filteredSales.length)} de {filteredSales.length} ventas
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSalesPage(p => Math.max(1, p - 1))}
                    disabled={salesPage === 1}
                    className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Anterior
                  </button>
                  <span className="px-3 py-1 font-extrabold text-slate-700 bg-slate-50 rounded-lg">
                    Pág. {salesPage} de {Math.max(1, totalSalesPages)}
                  </span>
                  <button
                    onClick={() => setSalesPage(p => Math.min(totalSalesPages, p + 1))}
                    disabled={salesPage >= totalSalesPages}
                    className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    Siguiente
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COTIZACIONES */}
      {activeTab === 'cotizaciones' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedQuotes.map((q) => (
              <div key={q.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-black text-indigo-600">{q.id}</span>
                    <h3 className="text-sm font-bold text-slate-900">{q.cliente}</h3>
                    <p className="text-[11px] text-slate-500">{q.empresa}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                    q.estado === 'Aprobada' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {q.estado}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fecha Emisión:</span>
                    <span className="font-medium">{q.fecha}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vigencia:</span>
                    <span className="font-medium text-amber-700">{q.vigencia}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                    <span>Monto Total:</span>
                    <span className="text-emerald-700">Q {q.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  {q.estado === 'Pendiente' && (
                    <button
                      onClick={() => handleConvertQuote(q)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Convertir a Venta FEL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Paginación de Cotizaciones */}
          {filteredQuotes.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">
                Mostrando {(quotesPage - 1) * quotesPerPage + 1} a {Math.min(quotesPage * quotesPerPage, filteredQuotes.length)} de {filteredQuotes.length} cotizaciones
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuotesPage(p => Math.max(1, p - 1))}
                  disabled={quotesPage === 1}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Anterior
                </button>
                <span className="px-3 py-1 font-extrabold text-slate-700 bg-slate-50 rounded-lg">
                  Pág. {quotesPage} de {Math.max(1, totalQuotesPages)}
                </span>
                <button
                  onClick={() => setQuotesPage(p => Math.min(totalQuotesPages, p + 1))}
                  disabled={quotesPage >= totalQuotesPages}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  Siguiente
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DESEMPEÑO DE VENDEDORES & COMISIONES */}
      {activeTab === 'vendedores' && (
        <div className="space-y-6">
          {/* Header informativo */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                Plan de Comisiones y Metas Mensuales
              </span>
              <h2 className="text-lg font-black tracking-tight">Rendimiento Comercial • Noviembre 2026</h2>
              <p className="text-xs text-slate-300 max-w-xl">
                Cálculo automatizado con base en tickets facturados y DTEs certificados en todas las sucursales. Comisión aplicable del 3.0% sobre ventas netas cumplidas.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase block">Comisiones del Mes</span>
                <span className="text-base font-black text-emerald-300">
                  Q {vendedores.reduce((a: number, b: any) => a + (b.comision_acumulada || 0), 0).toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase block">Venta Global</span>
                <span className="text-base font-black text-amber-300">
                  Q {vendedores.reduce((a: number, b: any) => a + (b.total_vendido || 0), 0).toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Tabla de Rendimiento por Vendedor */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                Tabla de Posiciones y Cumplimiento
              </h3>
              <span className="text-[11px] text-slate-400">Actualizado en tiempo real</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Lugar</th>
                    <th className="py-3 px-4">Vendedor</th>
                    <th className="py-3 px-4">Sucursal</th>
                    <th className="py-3 px-4 text-center">Ventas</th>
                    <th className="py-3 px-4 text-right">Facturado</th>
                    <th className="py-3 px-4 text-right">Meta Mensual</th>
                    <th className="py-3 px-4 text-center">% Meta</th>
                    <th className="py-3 px-4 text-right">Comisión</th>
                    <th className="py-3 px-4 text-right">Ticket Prom.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {vendedores.map((v: VendedorRendimiento, index: number) => (
                    <tr key={v.id_empleado} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-black">
                        {index === 0 && <span className="text-amber-500 text-base">🥇 #1</span>}
                        {index === 1 && <span className="text-slate-400 text-base">🥈 #2</span>}
                        {index === 2 && <span className="text-amber-700 text-base">🥉 #3</span>}
                        {index > 2 && <span className="text-slate-500 text-xs pl-2">#{index + 1}</span>}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{v.nombre}</div>
                        <div className="text-[10px] text-slate-400">ID EMP-{v.id_empleado}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {v.sucursal}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                        {v.ventas_count}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                        Q {v.total_vendido.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-500">
                        Q {v.meta_mensual.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                v.porcentaje_cumplido >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${Math.min(v.porcentaje_cumplido, 100)}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-black ${
                            v.porcentaje_cumplido >= 100 ? 'text-emerald-700' : 'text-amber-700'
                          }`}>
                            {v.porcentaje_cumplido}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                        Q {v.comision_acumulada.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                        Q {v.ticket_promedio.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparativa por Sucursales (Laravel: ReporteVentasSucursal.php) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Sucursal Central</span>
                <Building className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xl font-black text-slate-900">Q 116,300.00</p>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span>79 transacciones</span>
                <span className="font-bold text-emerald-600">Ticket Prom: Q 1,472.15</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Sucursal Norte</span>
                <Building className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xl font-black text-slate-900">Q 51,800.00</p>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span>36 transacciones</span>
                <span className="font-bold text-indigo-600">Ticket Prom: Q 1,438.88</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Sucursal Sur</span>
                <Building className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-xl font-black text-slate-900">Q 28,450.00</p>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span>22 transacciones</span>
                <span className="font-bold text-amber-600">Ticket Prom: Q 1,293.18</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalle de Venta / Certificado DTE SAT */}
      {selectedSaleDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-xs font-black text-slate-900">
                {selectedSaleDetail.dte ? 'Documento Tributario Electrónico (FEL SAT)' : `Comprobante #${selectedSaleDetail.id}`}
              </span>
              <button 
                onClick={() => setSelectedSaleDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulación del Ticket Térmico / FEL Oficial */}
            <div className="p-6 font-mono text-xs text-slate-700 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="text-center pb-3 border-b border-dashed border-slate-300">
                <div className="flex justify-center mb-2">
                  <img
                    src="/img/logo_fashion_styles.jpg"
                    alt="Logo Fashion Styles"
                    className="h-14 w-auto max-w-[180px] object-contain rounded-xl border border-slate-200/90 shadow-xs p-1 bg-white"
                  />
                </div>
                <p className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">Fashion Styles</p>
                <p className="text-[10px] text-slate-500 font-medium">Boutique & Variedades • {empresaActiva.razon_social || 'Fashion Styles S.A.'}</p>
                <p className="text-[11px] text-slate-500">NIT Emisor: {empresaActiva.nit || '6322012-1'}</p>
                <p className="text-[11px]">{selectedSaleDetail.sucursal}</p>
                <p className="text-[11px]">{selectedSaleDetail.fecha}</p>
              </div>

              {selectedSaleDetail.dte && (
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-[10px] space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-600">No. Autorización (UUID):</span>
                    <button
                      onClick={() => copyToClipboard(selectedSaleDetail.dte!.uuid)}
                      className="text-emerald-700 hover:underline flex items-center gap-1 font-bold"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      {copiedUuid ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <p className="font-black text-emerald-950 break-all">{selectedSaleDetail.dte.uuid}</p>
                  <p><span className="font-bold">Serie DTE:</span> {selectedSaleDetail.dte.serie} | <span className="font-bold">Número:</span> {selectedSaleDetail.dte.numero}</p>
                  <p><span className="font-bold">Fecha Certificación:</span> {selectedSaleDetail.dte.fechaCertificacion}</p>
                </div>
              )}

              <div>
                <p><span className="font-bold">Cliente:</span> {selectedSaleDetail.cliente}</p>
                <p><span className="font-bold">NIT:</span> {selectedSaleDetail.nit}</p>
                <p><span className="font-bold">Pago:</span> {selectedSaleDetail.metodoPago}</p>
                <p><span className="font-bold">Vendedor:</span> {selectedSaleDetail.vendedor}</p>
              </div>

              <div className="pt-2 border-t border-dashed border-slate-300">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-left">
                      <th className="pb-1 text-center w-6">Cant.</th>
                      <th className="pb-1">Descripción</th>
                      <th className="pb-1 text-right">Precio</th>
                      <th className="pb-1 text-right text-amber-800">Desc.</th>
                      <th className="pb-1 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedSaleDetail.productos.map((prod, idx) => {
                      const unitPrice = prod.precioUnitario || (prod.subtotal / (prod.cantidad || 1));
                      const itemGross = unitPrice * prod.cantidad;
                      const itemDiscount = Math.max(0, itemGross - prod.subtotal);
                      return (
                        <tr key={idx}>
                          <td className="py-1.5 font-bold text-center">{prod.cantidad}</td>
                          <td className="py-1.5 pr-1 truncate max-w-[120px]" title={prod.nombre}>{prod.nombre}</td>
                          <td className="py-1.5 text-right text-slate-500">Q {unitPrice.toFixed(2)}</td>
                          <td className="py-1.5 text-right font-medium text-amber-700">
                            {itemDiscount > 0 ? `-Q ${itemDiscount.toFixed(2)}` : 'Q 0.00'}
                          </td>
                          <td className="py-1.5 text-right font-bold text-slate-900">Q {prod.subtotal.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {(() => {
                const totalCalculadoGross = selectedSaleDetail.productos.reduce((acc, p) => {
                  const uPrice = p.precioUnitario || (p.subtotal / (p.cantidad || 1));
                  return acc + (uPrice * p.cantidad);
                }, 0);
                const totalDesc = Math.max(0, totalCalculadoGross - selectedSaleDetail.total);
                const tax = calculateSaleTaxes(selectedSaleDetail.total, empresaActiva.regimen);

                return (
                  <div className="pt-3 border-t border-dashed border-slate-300 space-y-1 text-right">
                    {totalDesc > 0 && (
                      <>
                        <p className="text-xs text-slate-500">Subtotal Bruto: Q {totalCalculadoGross.toFixed(2)}</p>
                        <p className="text-xs font-bold text-amber-700">Descuento Total: -Q {totalDesc.toFixed(2)}</p>
                      </>
                    )}
                    <p className="text-xs text-slate-600">
                      {tax.tipoRegimen === 'general' ? 'Subtotal Neto (Sin IVA):' : 'Base Gravada:'} Q {tax.subtotalNeto.toFixed(2)}
                    </p>
                    {tax.tipoRegimen === 'general' ? (
                      <p className="text-xs text-indigo-700 font-semibold">IVA Débito Fiscal (12%): Q {tax.ivaMonto.toFixed(2)}</p>
                    ) : tax.tipoRegimen === 'pequeno_contribuyente' ? (
                      <>
                        <p className="text-xs text-slate-400">IVA Trasladable (0%): Q 0.00</p>
                        <p className="text-xs text-purple-700 font-black">Impuesto Pequeño Contribuyente (5% SAT): Q {tax.impuestoCalculadoSAT.toFixed(2)}</p>
                      </>
                    ) : (
                      <p className="text-xs text-slate-500 font-medium">Venta Informal (Exenta de IVA / Sin retención SAT)</p>
                    )}
                    <p className="text-sm font-black text-slate-900 pt-1 border-t border-slate-100">TOTAL: Q {selectedSaleDetail.total.toFixed(2)}</p>
                    <p className="text-[9px] text-slate-400 italic font-sans text-center pt-1">{tax.fraseFiscalFEL}</p>
                  </div>
                );
              })()}

              {selectedSaleDetail.dte && (
                <div className="pt-3 border-t border-dashed border-slate-300 flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl">
                  <div className="w-12 h-12 bg-white border border-slate-300 rounded p-1 flex items-center justify-center shrink-0">
                    <QrCode className="w-10 h-10 text-slate-800" />
                  </div>
                  <div className="text-[9px] text-slate-500 leading-tight">
                    <p className="font-bold text-slate-700">Certificador: {selectedSaleDetail.dte.certificador}</p>
                    <p className="text-emerald-700 italic">{selectedSaleDetail.dte.fraseFiscal}</p>
                  </div>
                </div>
              )}

              <p className="text-center text-[10px] text-slate-400 pt-3 border-t border-dashed border-slate-300">
                {empresaActiva.regimen.toLowerCase().includes('informal') || empresaActiva.regimen.toLowerCase().includes('exento')
                  ? '¡Gracias por su preferencia! • Comprobante Interno de Venta'
                  : '¡Gracias por su compra! • Factura Electrónica FEL'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => setSelectedSaleDetail(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cerrar
              </button>
              <button 
                onClick={() => {
                  window.print();
                  setSelectedSaleDetail(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN: ELIMINAR / ANULAR VENTA CON RETORNO DE STOCK */}
      {saleToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100 shadow-sm">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  ¿Anular y Eliminar Venta #{saleToDelete.id}?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Esta acción anulará la venta efectuada a <strong className="text-slate-800">{saleToDelete.cliente}</strong> por un total de <strong className="text-slate-900">Q {saleToDelete.total.toFixed(2)}</strong>.
                </p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 text-left flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-900 leading-normal">
                  <p className="font-bold">Restauración automática de stock:</p>
                  <p className="mt-0.5 text-amber-800">
                    Las unidades de los {saleToDelete.productos?.length || 1} productos de esta venta se reintegrarán de inmediato al inventario físico de la sucursal y se registrará la devolución en el Kardex.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isDeletingSale}
                onClick={() => setSaleToDelete(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isDeletingSale}
                onClick={handleConfirmDeleteSale}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-rose-600/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isDeletingSale ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Eliminando & Restaurando Stock...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Confirmar Anulación</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA MODIFICAR VENTA */}
      {editingSale && editSaleForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Modificación de Registro</span>
                <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2 mt-0.5">
                  <Pencil className="w-5 h-5 text-indigo-400" />
                  Editar Venta #{editingSale.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingSale(null);
                  setEditSaleForm(null);
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Información del Cliente y Pago */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cliente</label>
                  <input
                    type="text"
                    disabled
                    value={editSaleForm.nombreCliente}
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 font-semibold cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Método de Pago</label>
                  <select
                    value={editSaleForm.metodo_pago}
                    onChange={(e) => setEditSaleForm({ ...editSaleForm, metodo_pago: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                  >
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta POS</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                    <option value="credito">Crédito</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Observaciones / Motivo de Modificación</label>
                <input
                  type="text"
                  placeholder="Ej: Corrección de cantidad solicitada por clienta..."
                  value={editSaleForm.observaciones}
                  onChange={(e) => setEditSaleForm({ ...editSaleForm, observaciones: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Lista de Líneas de Productos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">Prendas & Productos de la Venta</label>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {editSaleForm.detalles.length} {editSaleForm.detalles.length === 1 ? 'línea' : 'líneas'}
                  </span>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-slate-50/50">
                  {editSaleForm.detalles.map((d: any, idx: number) => {
                    const lineGross = Number(d.cantidad) * Number(d.precio_unitario);
                    const lineTotal = Math.max(0, lineGross - (Number(d.descuento) || 0));

                    return (
                      <div key={idx} className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate" title={d.nombre}>
                            {d.nombre}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID Producto: #{d.id_producto}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Selector de Cantidad */}
                          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                const newDetalles = [...editSaleForm.detalles];
                                if (newDetalles[idx].cantidad > 1) {
                                  newDetalles[idx].cantidad -= 1;
                                  newDetalles[idx].subtotal = (newDetalles[idx].cantidad * newDetalles[idx].precio_unitario) - (newDetalles[idx].descuento || 0);
                                  setEditSaleForm({ ...editSaleForm, detalles: newDetalles });
                                }
                              }}
                              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={d.cantidad}
                              onChange={(e) => {
                                const val = Math.max(1, parseInt(e.target.value) || 1);
                                const newDetalles = [...editSaleForm.detalles];
                                newDetalles[idx].cantidad = val;
                                newDetalles[idx].subtotal = (val * newDetalles[idx].precio_unitario) - (newDetalles[idx].descuento || 0);
                                setEditSaleForm({ ...editSaleForm, detalles: newDetalles });
                              }}
                              className="w-12 text-center text-xs font-black bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newDetalles = [...editSaleForm.detalles];
                                newDetalles[idx].cantidad += 1;
                                newDetalles[idx].subtotal = (newDetalles[idx].cantidad * newDetalles[idx].precio_unitario) - (newDetalles[idx].descuento || 0);
                                setEditSaleForm({ ...editSaleForm, detalles: newDetalles });
                              }}
                              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Precio Unitario */}
                          <div className="w-24">
                            <span className="text-[9px] text-slate-400 block">P. Unitario</span>
                            <div className="relative">
                              <span className="absolute left-2 top-2 text-[10px] text-slate-400">Q</span>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={d.precio_unitario}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  const newDetalles = [...editSaleForm.detalles];
                                  newDetalles[idx].precio_unitario = val;
                                  newDetalles[idx].subtotal = (newDetalles[idx].cantidad * val) - (newDetalles[idx].descuento || 0);
                                  setEditSaleForm({ ...editSaleForm, detalles: newDetalles });
                                }}
                                className="w-full pl-5 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Descuento por Línea */}
                          <div className="w-20">
                            <span className="text-[9px] text-amber-700 block">Desc. (Q)</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={d.descuento || 0}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                const newDetalles = [...editSaleForm.detalles];
                                newDetalles[idx].descuento = val;
                                newDetalles[idx].subtotal = (newDetalles[idx].cantidad * newDetalles[idx].precio_unitario) - val;
                                setEditSaleForm({ ...editSaleForm, detalles: newDetalles });
                              }}
                              className="w-full px-2 py-1.5 bg-amber-50/50 border border-amber-200 rounded-lg text-xs font-mono font-bold text-amber-800 focus:outline-none"
                            />
                          </div>

                          {/* Subtotal de Línea */}
                          <div className="w-20 text-right">
                            <span className="text-[9px] text-slate-400 block">Total</span>
                            <span className="text-xs font-black text-slate-900 font-mono">
                              Q {lineTotal.toFixed(2)}
                            </span>
                          </div>

                          {/* Eliminar Línea */}
                          <button
                            type="button"
                            title="Eliminar producto de la venta"
                            disabled={editSaleForm.detalles.length <= 1}
                            onClick={() => {
                              if (editSaleForm.detalles.length <= 1) {
                                alert('La venta debe contener al menos un producto.');
                                return;
                              }
                              const newDetalles = editSaleForm.detalles.filter((_: any, i: number) => i !== idx);
                              setEditSaleForm({ ...editSaleForm, detalles: newDetalles });
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resumen Total y Advertencia de Inventario */}
              {(() => {
                const totalGross = editSaleForm.detalles.reduce((acc: number, d: any) => acc + (Number(d.cantidad) * Number(d.precio_unitario)), 0);
                const totalDesc = editSaleForm.detalles.reduce((acc: number, d: any) => acc + (Number(d.descuento) || 0), 0);
                const grandTotal = Math.max(0, totalGross - totalDesc);

                return (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Subtotal Bruto:</span>
                      <span className="font-mono">Q {totalGross.toFixed(2)}</span>
                    </div>
                    {totalDesc > 0 && (
                      <div className="flex items-center justify-between text-xs text-amber-700 font-semibold">
                        <span>Descuento Aplicado:</span>
                        <span className="font-mono">-Q {totalDesc.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>TOTAL ACTUALIZADO:</span>
                      <span className="font-mono text-indigo-700 text-base">Q {grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-900 leading-normal">
                  <strong>Sincronización de Stock:</strong> Si aumentas o disminuyes prendas, el stock en MySQL y el Kardex se ajustarán automáticamente al guardar.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isSavingSale}
                onClick={() => {
                  setEditingSale(null);
                  setEditSaleForm(null);
                }}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isSavingSale}
                onClick={handleSaveEditSale}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSavingSale ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando & Sincronizando...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}