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
import { getLiveCache, setLiveCache } from '../utils/liveCache';
import { useLanguage } from '../context/LanguageContext';

interface SalesProps {
  currentEmpresa?: EmpresaSaaS;
}

export default function Sales({ currentEmpresa }: SalesProps = {}) {
  const {
    L,
    isEn,
    money,
    currencySymbol,
    taxIdLabel,
    trPayment,
    trStatus,
    trRegime,
    trClient,
    trTaxId,
  } = useLanguage();

  const trBranch = (raw?: string | null) => {
    const s = String(raw || '');
    if (s === 'Sucursal Principal') return L('Sucursal Principal', 'Main Branch');
    if (s === 'Sucursal Central') return L('Sucursal Central', 'Central Branch');
    if (s === 'Sucursal Norte') return L('Sucursal Norte', 'North Branch');
    if (s === 'Sucursal Sur') return L('Sucursal Sur', 'South Branch');
    if (s === 'Sucursal Demo Principal') return L('Sucursal Demo Principal', 'Main Demo Branch');
    return isEn ? s.replace(/^Sucursal\b/i, 'Branch') : s;
  };

  const trSeller = (raw?: string | null) => {
    const s = String(raw || '');
    if (s === 'Caja Principal') return L('Caja Principal', 'Main Register');
    if (s === 'Asesor Comercial Demo') return L('Asesor Comercial Demo', 'Demo Sales Advisor');
    return s;
  };

  const trProdName = (raw?: string | null) => {
    const s = String(raw || '');
    if (s === 'Producto General') return L('Producto General', 'General Product');
    if (isEn && /^Producto #/i.test(s)) return s.replace(/^Producto #/i, 'Product #');
    return s;
  };

  const fallbackEmpresaId = getStoredActiveEmpresaId() || 0;
  const empresaActiva: EmpresaSaaS = currentEmpresa || {
    id: fallbackEmpresaId,
    nombre: fallbackEmpresaId === 1 ? 'Fashion Styles' : L('Empresa Activa', 'Active Company'),
    razon_social: fallbackEmpresaId === 1 ? 'Fashion Styles S.A.' : L('Empresa Activa', 'Active Company'),
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

  // Visor de PDF del Comprobante de Venta
  const [loadingPdfSaleId, setLoadingPdfSaleId] = useState<number | null>(null);
  const [pdfViewer, setPdfViewer] = useState<{ saleId: number; label: string; cliente: string; url: string } | null>(null);

  const parseSaleNumericId = (sale: VentaItem): number | null => {
    if (sale.rawId && Number(sale.rawId) > 0) return Number(sale.rawId);
    const match = String(sale.id || '').match(/(\d+)/);
    return match ? Number(match[1]) : null;
  };

  const handleClosePdfViewer = () => {
    if (pdfViewer?.url) {
      try { window.URL.revokeObjectURL(pdfViewer.url); } catch {}
    }
    setPdfViewer(null);
  };

  const handleOpenSalePdf = async (sale: VentaItem) => {
    const numericId = parseSaleNumericId(sale);
    if (!numericId) {
      showToast(L('⚠️ Esta venta no tiene un ID numérico válido en la base de datos.', '⚠️ This sale does not have a valid numeric ID in the database.'));
      return;
    }
    if (loadingPdfSaleId === numericId) return;
    setLoadingPdfSaleId(numericId);
    try {
      const blobUrl = await salesApi.fetchSalePdfBlobUrl(numericId);
      if (pdfViewer?.url) {
        try { window.URL.revokeObjectURL(pdfViewer.url); } catch {}
      }
      setPdfViewer({
        saleId: numericId,
        label: sale.id,
        cliente: sale.cliente,
        url: blobUrl
      });
    } catch (err: any) {
      const status = err?.response?.status;
      showToast(
        status === 404
          ? L(
              `⚠️ La venta #${numericId} no existe en MySQL para ${empresaActiva.nombre}.`,
              `⚠️ Sale #${numericId} does not exist in MySQL for ${empresaActiva.nombre}.`
            )
          : L(
              `⚠️ No se pudo cargar el PDF de la venta #${numericId}: ${err?.response?.data?.message || err?.message || 'Error de conexión'}`,
              `⚠️ Could not load PDF for sale #${numericId}: ${err?.response?.data?.message || err?.message || 'Connection error'}`
            )
      );
    } finally {
      setLoadingPdfSaleId(null);
    }
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  // Datos reales sincronizados desde Droplet (Aislamiento Multi-Tenant Estricto + Caché en vivo)
  const [sales, setSales] = useState<VentaItem[]>(() => {
    return getLiveCache<VentaItem[]>(empresaActiva.id, 'sales') ?? getTenantSales(empresaActiva.id);
  });

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
            setLiveCache(targetEmpresaId, 'sales', mapped);
            setSales(mapped);
          }
        }
      })
      .catch((err) => {
        console.warn('Error fetching live sales:', err);
        if (!getLiveCache<VentaItem[]>(targetEmpresaId, 'sales')) {
          setSales(getTenantSales(targetEmpresaId));
        }
      })
      .finally(() => {
        setIsLoadingSales(false);
      });
  };

  useEffect(() => {
    const cached = getLiveCache<VentaItem[]>(empresaActiva.id, 'sales');
    setSales(cached ?? getTenantSales(empresaActiva.id));
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
      alert(L('La venta debe contener al menos un producto.', 'The sale must contain at least one product.'));
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
      showToast(
        L(
          `Venta #${editingSale.id} modificada exitosamente. Stock actualizado en inventario.`,
          `Sale #${editingSale.id} updated successfully. Inventory stock synced.`
        )
      );
      setEditingSale(null);
      setEditSaleForm(null);
      fetchSales();
    } catch (err: any) {
      console.error('Error al actualizar venta:', err);
      const errMsg = err?.response?.data?.message || err?.message || L('Error al actualizar venta.', 'Error updating sale.');
      alert(L(`⚠️ NO SE PUDO MODIFICAR LA VENTA:\n\n${errMsg}`, `⚠️ COULD NOT UPDATE SALE:\n\n${errMsg}`));
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
      showToast(
        L(
          `Venta #${saleToDelete.id} eliminada. Stock de prendas restaurado al inventario.`,
          `Sale #${saleToDelete.id} voided. Item stock restored to inventory.`
        )
      );
      setSales(prev => prev.filter(s => s.id !== saleToDelete.id));
      setSaleToDelete(null);
    } catch (err: any) {
      console.error('Error al eliminar venta:', err);
      const errMsg = err?.response?.data?.message || err?.message || L('Error al anular la venta.', 'Error voiding sale.');
      alert(L(`⚠️ NO SE PUDO ELIMINAR LA VENTA:\n\n${errMsg}`, `⚠️ COULD NOT VOID SALE:\n\n${errMsg}`));
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
    showToast(
      L(
        `Cotización ${quote.id} convertida a Venta exitosamente en Caja Central.`,
        `Quote ${quote.id} successfully converted to a Sale at Main Register.`
      )
    );
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
        [L('No. Factura', 'Invoice #')]: s.id,
        [L('Fecha', 'Date')]: s.fecha,
        [L('Cliente', 'Customer')]: trClient(s.cliente),
        [taxIdLabel]: trTaxId(s.nit),
        [L('Sucursal', 'Branch')]: trBranch(s.sucursal),
        [L('Vendedor', 'Salesperson')]: trSeller(s.vendedor),
        [L('Método Pago', 'Payment Method')]: trPayment(s.metodoPago),
        [L('Estado', 'Status')]: trStatus(s.estado),
        [L(`Base Gravable (${currencySymbol})`, `Taxable Base (${currencySymbol})`)]: taxes.subtotalNeto.toFixed(2),
        [L(`IVA / Impuesto SAT (${currencySymbol})`, `VAT / Tax (${currencySymbol})`)]: taxes.impuestoCalculadoSAT.toFixed(2),
        [L(`Total (${currencySymbol})`, `Total (${currencySymbol})`)]: s.total.toFixed(2),
        [L('UUID FEL', 'E-Invoice UUID')]: s.dte?.uuid || L('No certificada', 'Not certified'),
        [L('Serie DTE', 'E-Invoice Series')]: s.dte?.serie || '-',
        [L('Régimen Fiscal', 'Tax Regime')]: trRegime(empresaActiva.regimen)
      };
    });
    exportToExcelCsv(dataToExport, `${L('libro_ventas_sat_', 'sales_tax_ledger_')}${empresaActiva.nombre.replace(/\s+/g, '_')}`);
    showToast(L('Libro de Ventas SAT exportado exitosamente a Excel CSV', 'Sales Tax Ledger exported successfully to Excel CSV'));
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
            {L('Ventas, Facturación SAT & Comisiones', 'Sales, E-Invoicing & Commissions')}
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {L('Certificador INFILE DTE', 'E-Invoice Certifier (INFILE)')}
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {L(
              'Historial de facturas FEL certificadas, cotizaciones y tabla de rendimiento comercial',
              'Certified electronic invoices history, quotes, and sales performance leaderboard'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchSales}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2 hover:border-slate-300 cursor-pointer"
            title={L('Recargar ventas en tiempo real desde la Base de Datos', 'Reload real-time sales from the database')}
          >
            <RefreshCcw className={`w-4 h-4 text-indigo-600 ${isLoadingSales ? 'animate-spin' : ''}`} />
            <span>{L('Actualizar', 'Refresh')}</span>
          </button>
          <button
            type="button"
            onClick={handleExportSales}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2 hover:border-slate-300"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>{L('Exportar Libro SAT', 'Export Tax Ledger')}</span>
          </button>
        </div>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{L('Ventas Facturadas', 'Invoiced Sales')}</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {money(totalVentasFacturadas)}
            </p>
            <span className="text-[11px] font-semibold text-emerald-600">
              {sales.length} {L('transacciones registradas', 'recorded transactions')}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{L('Certificaciones FEL', 'Certified E-Invoices')}</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalDtes} {L('DTEs', 'E-Invoices')}</p>
            <span className="text-[11px] font-semibold text-teal-600">{L('INFILE 100% en línea', 'INFILE 100% online')}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{L('Ticket Promedio', 'Average Ticket')}</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {money(ticketPromedio)}
            </p>
            <span className="text-[11px] font-semibold text-indigo-600">{L('Catálogo general', 'General catalog')}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Receipt className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{L('Top Vendedor Mes', 'Top Seller (Month)')}</span>
            <p className="text-sm font-black text-slate-900 mt-1 truncate">{trSeller(topVendedor.nombre)}</p>
            <span className="text-[11px] font-semibold text-amber-600">
              {isEn ? '$' : 'Q '}{(topVendedor.total_vendido / 1000).toFixed(1)}k • {topVendedor.porcentaje_cumplido}% {L('meta', 'goal')}
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
          className={`pb-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'ventas'
            ? 'border-emerald-600 text-emerald-600'
            : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          <Receipt className="w-4 h-4" />
          <span>{L('Historial de Ventas & FEL DTE', 'Sales History & E-Invoices')}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 font-bold">
            {sales.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cotizaciones')}
          className={`pb-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'cotizaciones'
            ? 'border-emerald-600 text-emerald-600'
            : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          <FileText className="w-4 h-4" />
          <span>{L('Cotizaciones & Propuestas', 'Quotes & Proposals')}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 font-bold">
            {quotes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('vendedores')}
          className={`pb-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'vendedores'
            ? 'border-emerald-600 text-emerald-600'
            : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          <Trophy className="w-4 h-4" />
          <span>{L('Desempeño & Comisiones', 'Performance & Commissions')}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
            {vendedores.length} {L('vendedores', 'sellers')}
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
                placeholder={L('Buscar por ID, cliente, NIT o UUID SAT...', 'Search by ID, customer, Tax ID or E-Invoice UUID...')}
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
                <option value="Todas">{L('Todas las Sucursales', 'All Branches')}</option>
                <option value="Central">{L('Sucursal Central', 'Central Branch')}</option>
                <option value="Norte">{L('Sucursal Norte', 'North Branch')}</option>
                <option value="Sur">{L('Sucursal Sur', 'South Branch')}</option>
              </select>
            </div>
          </div>

          {/* Tabla de Ventas */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">{L('Comprobante', 'Receipt')}</th>
                    <th className="py-3 px-4">{L('Tipo / Régimen', 'Type / Regime')}</th>
                    <th className="py-3 px-4">{L('Cliente', 'Customer')} / {taxIdLabel}</th>
                    <th className="py-3 px-4">{L('Vendedor', 'Salesperson')}</th>
                    <th className="py-3 px-4">{L('Sucursal', 'Branch')}</th>
                    <th className="py-3 px-4 text-right">{L('Subtotal', 'Subtotal')}</th>
                    <th className="py-3 px-4 text-right">{L('Total', 'Total')}</th>
                    <th className="py-3 px-4 text-center">{L('Acciones', 'Actions')}</th>
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
                              <span>{L('FEL SAT', 'E-Invoice')}</span>
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                              {L('Serie', 'Series')} {s.dte.serie}
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                            {L('Ticket POS', 'POS Receipt')}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">{trClient(s.cliente)}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{taxIdLabel}: {trTaxId(s.nit)}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {trSeller(s.vendedor)}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {trBranch(s.sucursal)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600">
                        {money(s.subtotal)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-black text-slate-900">
                        {money(s.total)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedSaleDetail(s)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title={L('Ver Comprobante / DTE', 'View Receipt / E-Invoice')}
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-600" />
                            <span className="hidden xl:inline">{L('Ver', 'View')}</span>
                          </button>

                          <button
                            type="button"
                            disabled={loadingPdfSaleId !== null && loadingPdfSaleId === parseSaleNumericId(s)}
                            onClick={() => handleOpenSalePdf(s)}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            title={L('Mostrar Comprobante de Venta en PDF', 'View Sales Receipt PDF')}
                          >
                            {loadingPdfSaleId !== null && loadingPdfSaleId === parseSaleNumericId(s) ? (
                              <Loader2 className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                            ) : (
                              <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                            <span className="hidden xl:inline">PDF</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEditSale(s)}
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title={L('Modificar Venta', 'Edit Sale')}
                          >
                            <Pencil className="w-3.5 h-3.5 text-amber-600" />
                            <span className="hidden xl:inline">{L('Modificar', 'Edit')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSaleToDelete(s)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title={L('Eliminar / Anular Venta y Restaurar Stock', 'Void Sale & Restore Stock')}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                            <span className="hidden xl:inline">{L('Eliminar', 'Delete')}</span>
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
                  {L(
                    `Mostrando ${(salesPage - 1) * salesPerPage + 1} a ${Math.min(salesPage * salesPerPage, filteredSales.length)} de ${filteredSales.length} ventas`,
                    `Showing ${(salesPage - 1) * salesPerPage + 1} to ${Math.min(salesPage * salesPerPage, filteredSales.length)} of ${filteredSales.length} sales`
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSalesPage(p => Math.max(1, p - 1))}
                    disabled={salesPage === 1}
                    className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    {L('Anterior', 'Previous')}
                  </button>
                  <span className="px-3 py-1 font-extrabold text-slate-700 bg-slate-50 rounded-lg">
                    {L(`Pág. ${salesPage} de ${Math.max(1, totalSalesPages)}`, `Page ${salesPage} of ${Math.max(1, totalSalesPages)}`)}
                  </span>
                  <button
                    onClick={() => setSalesPage(p => Math.min(totalSalesPages, p + 1))}
                    disabled={salesPage >= totalSalesPages}
                    className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    {L('Siguiente', 'Next')}
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
                    <h3 className="text-sm font-bold text-slate-900">{trClient(q.cliente)}</h3>
                    <p className="text-[11px] text-slate-500">{q.empresa}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${q.estado === 'Aprobada'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                    {trStatus(q.estado)}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{L('Fecha Emisión:', 'Issue Date:')}</span>
                    <span className="font-medium">{q.fecha}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{L('Vigencia:', 'Valid Until:')}</span>
                    <span className="font-medium text-amber-700">{q.vigencia}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                    <span>{L('Monto Total:', 'Total Amount:')}</span>
                    <span className="text-emerald-700">{money(q.total)}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  {q.estado === 'Pendiente' && (
                    <button
                      onClick={() => handleConvertQuote(q)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{L('Convertir a Venta FEL', 'Convert to E-Invoice Sale')}</span>
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
                {L(
                  `Mostrando ${(quotesPage - 1) * quotesPerPage + 1} a ${Math.min(quotesPage * quotesPerPage, filteredQuotes.length)} de ${filteredQuotes.length} cotizaciones`,
                  `Showing ${(quotesPage - 1) * quotesPerPage + 1} to ${Math.min(quotesPage * quotesPerPage, filteredQuotes.length)} of ${filteredQuotes.length} quotes`
                )}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuotesPage(p => Math.max(1, p - 1))}
                  disabled={quotesPage === 1}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  {L('Anterior', 'Previous')}
                </button>
                <span className="px-3 py-1 font-extrabold text-slate-700 bg-slate-50 rounded-lg">
                  {L(`Pág. ${quotesPage} de ${Math.max(1, totalQuotesPages)}`, `Page ${quotesPage} of ${Math.max(1, totalQuotesPages)}`)}
                </span>
                <button
                  onClick={() => setQuotesPage(p => Math.min(totalQuotesPages, p + 1))}
                  disabled={quotesPage >= totalQuotesPages}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {L('Siguiente', 'Next')}
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
                {L('Plan de Comisiones y Metas Mensuales', 'Commission Plan & Monthly Goals')}
              </span>
              <h2 className="text-lg font-black tracking-tight">{L('Rendimiento Comercial • Noviembre 2026', 'Sales Performance • November 2026')}</h2>
              <p className="text-xs text-slate-300 max-w-xl">
                {L(
                  'Cálculo automatizado con base en tickets facturados y DTEs certificados en todas las sucursales. Comisión aplicable del 3.0% sobre ventas netas cumplidas.',
                  'Automated calculation based on invoiced receipts and certified E-Invoices across all branches. 3.0% commission applied on net sales achieved.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase block">{L('Comisiones del Mes', 'Monthly Commissions')}</span>
                <span className="text-base font-black text-emerald-300">
                  {money(vendedores.reduce((a: number, b: any) => a + (b.comision_acumulada || 0), 0))}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase block">{L('Venta Global', 'Total Sales')}</span>
                <span className="text-base font-black text-amber-300">
                  {money(vendedores.reduce((a: number, b: any) => a + (b.total_vendido || 0), 0))}
                </span>
              </div>
            </div>
          </div>

          {/* Tabla de Rendimiento por Vendedor */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                {L('Tabla de Posiciones y Cumplimiento', 'Leaderboard & Goal Attainment')}
              </h3>
              <span className="text-[11px] text-slate-400">{L('Actualizado en tiempo real', 'Updated in real time')}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">{L('Lugar', 'Rank')}</th>
                    <th className="py-3 px-4">{L('Vendedor', 'Salesperson')}</th>
                    <th className="py-3 px-4">{L('Sucursal', 'Branch')}</th>
                    <th className="py-3 px-4 text-center">{L('Ventas', 'Sales')}</th>
                    <th className="py-3 px-4 text-right">{L('Facturado', 'Invoiced')}</th>
                    <th className="py-3 px-4 text-right">{L('Meta Mensual', 'Monthly Goal')}</th>
                    <th className="py-3 px-4 text-center">{L('% Meta', '% Goal')}</th>
                    <th className="py-3 px-4 text-right">{L('Comisión', 'Commission')}</th>
                    <th className="py-3 px-4 text-right">{L('Ticket Prom.', 'Avg. Ticket')}</th>
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
                        <div className="font-bold text-slate-900">{trSeller(v.nombre)}</div>
                        <div className="text-[10px] text-slate-400">ID EMP-{v.id_empleado}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {trBranch(v.sucursal)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                        {v.ventas_count}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                        {money(v.total_vendido)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-500">
                        {money(v.meta_mensual)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${v.porcentaje_cumplido >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}
                              style={{ width: `${Math.min(v.porcentaje_cumplido, 100)}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-black ${v.porcentaje_cumplido >= 100 ? 'text-emerald-700' : 'text-amber-700'
                            }`}>
                            {v.porcentaje_cumplido}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                        {money(v.comision_acumulada)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                        {money(v.ticket_promedio)}
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
                <span className="text-xs font-bold text-slate-400 uppercase">{L('Sucursal Central', 'Central Branch')}</span>
                <Building className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xl font-black text-slate-900">{money(116300)}</p>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span>79 {L('transacciones', 'transactions')}</span>
                <span className="font-bold text-emerald-600">{L('Ticket Prom:', 'Avg. Ticket:')} {money(1472.15)}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">{L('Sucursal Norte', 'North Branch')}</span>
                <Building className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xl font-black text-slate-900">{money(51800)}</p>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span>36 {L('transacciones', 'transactions')}</span>
                <span className="font-bold text-indigo-600">{L('Ticket Prom:', 'Avg. Ticket:')} {money(1438.88)}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">{L('Sucursal Sur', 'South Branch')}</span>
                <Building className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-xl font-black text-slate-900">{money(28450)}</p>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span>22 {L('transacciones', 'transactions')}</span>
                <span className="font-bold text-amber-600">{L('Ticket Prom:', 'Avg. Ticket:')} {money(1293.18)}</span>
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
                {selectedSaleDetail.dte
                  ? L('Documento Tributario Electrónico (FEL SAT)', 'Electronic Tax Document (E-Invoice)')
                  : L(`Comprobante #${selectedSaleDetail.id}`, `Receipt #${selectedSaleDetail.id}`)}
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
                {empresaActiva.id === 1 && (
                  <div className="flex justify-center mb-2">
                    <img
                      src="/img/logo_fashion_styles.jpg"
                      alt={`Logo ${empresaActiva.nombre}`}
                      className="h-14 w-auto max-w-[180px] object-contain rounded-xl border border-slate-200/90 shadow-xs p-1 bg-white"
                    />
                  </div>
                )}
                <p className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">{empresaActiva.nombre}</p>
                <p className="text-[10px] text-slate-500 font-medium">{empresaActiva.razon_social || empresaActiva.nombre}</p>
                <p className="text-[11px] text-slate-500">{L('NIT Emisor:', 'Issuer Tax ID:')} {trTaxId(empresaActiva.nit)}</p>
                <p className="text-[11px]">{trBranch(selectedSaleDetail.sucursal)}</p>
                <p className="text-[11px]">{selectedSaleDetail.fecha}</p>
              </div>

              {selectedSaleDetail.dte && (
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-[10px] space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-600">{L('No. Autorización (UUID):', 'Authorization # (UUID):')}</span>
                    <button
                      onClick={() => copyToClipboard(selectedSaleDetail.dte!.uuid)}
                      className="text-emerald-700 hover:underline flex items-center gap-1 font-bold"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      {copiedUuid ? L('Copiado!', 'Copied!') : L('Copiar', 'Copy')}
                    </button>
                  </div>
                  <p className="font-black text-emerald-950 break-all">{selectedSaleDetail.dte.uuid}</p>
                  <p><span className="font-bold">{L('Serie DTE:', 'E-Invoice Series:')}</span> {selectedSaleDetail.dte.serie} | <span className="font-bold">{L('Número:', 'Number:')}</span> {selectedSaleDetail.dte.numero}</p>
                  <p><span className="font-bold">{L('Fecha Certificación:', 'Certification Date:')}</span> {selectedSaleDetail.dte.fechaCertificacion}</p>
                </div>
              )}

              <div>
                <p><span className="font-bold">{L('Cliente:', 'Customer:')}</span> {trClient(selectedSaleDetail.cliente)}</p>
                <p><span className="font-bold">{taxIdLabel}:</span> {trTaxId(selectedSaleDetail.nit)}</p>
                <p><span className="font-bold">{L('Pago:', 'Payment:')}</span> {trPayment(selectedSaleDetail.metodoPago)}</p>
                <p><span className="font-bold">{L('Vendedor:', 'Salesperson:')}</span> {trSeller(selectedSaleDetail.vendedor)}</p>
              </div>

              <div className="pt-2 border-t border-dashed border-slate-300">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-left">
                      <th className="pb-1 text-center w-6">{L('Cant.', 'Qty')}</th>
                      <th className="pb-1">{L('Descripción', 'Description')}</th>
                      <th className="pb-1 text-right">{L('Precio', 'Price')}</th>
                      <th className="pb-1 text-right text-amber-800">{L('Desc.', 'Disc.')}</th>
                      <th className="pb-1 text-right">{L('Total', 'Total')}</th>
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
                          <td className="py-1.5 pr-1 truncate max-w-[120px]" title={trProdName(prod.nombre)}>{trProdName(prod.nombre)}</td>
                          <td className="py-1.5 text-right text-slate-500">{money(unitPrice)}</td>
                          <td className="py-1.5 text-right font-medium text-amber-700">
                            {itemDiscount > 0 ? `-${money(itemDiscount)}` : money(0)}
                          </td>
                          <td className="py-1.5 text-right font-bold text-slate-900">{money(prod.subtotal)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total limpio al cliente (sin desglose de IVA ni descuento global; el descuento es individual por producto) */}
              <div className="pt-3 border-t border-dashed border-slate-300 space-y-1 text-right">
                <p className="text-sm font-black text-slate-900">
                  {L('TOTAL A PAGAR:', 'TOTAL DUE:')} {money(selectedSaleDetail.total)}
                </p>
                {selectedSaleDetail.estado === 'Crédito' && (
                  <p className="text-[10px] font-bold text-amber-700">
                    {L(
                      'Venta al Crédito — Ver detalle de abonos y saldo en PDF Elegante o Cuentas por Cobrar',
                      'Credit Sale — View payment history and balance in Formal PDF or Accounts Receivable'
                    )}
                  </p>
                )}
              </div>

              {selectedSaleDetail.dte && (
                <div className="pt-3 border-t border-dashed border-slate-300 flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl">
                  <div className="w-12 h-12 bg-white border border-slate-300 rounded p-1 flex items-center justify-center shrink-0">
                    <QrCode className="w-10 h-10 text-slate-800" />
                  </div>
                  <div className="text-[9px] text-slate-500 leading-tight">
                    <p className="font-bold text-slate-700">{L('Certificador:', 'Certifier:')} {selectedSaleDetail.dte.certificador}</p>
                    <p className="text-emerald-700 italic">{selectedSaleDetail.dte.fraseFiscal}</p>
                  </div>
                </div>
              )}

              <p className="text-center text-[10px] text-slate-400 pt-3 border-t border-dashed border-slate-300">
                {empresaActiva.regimen.toLowerCase().includes('informal') || empresaActiva.regimen.toLowerCase().includes('exento')
                  ? L('¡Gracias por su preferencia! • Comprobante Interno de Venta', 'Thank you for your business! • Internal Sales Receipt')
                  : L('¡Gracias por su compra! • Factura Electrónica FEL', 'Thank you for your purchase! • Electronic Invoice')}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedSaleDetail(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                {L('Cerrar', 'Close')}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={loadingPdfSaleId !== null && loadingPdfSaleId === parseSaleNumericId(selectedSaleDetail)}
                  onClick={() => handleOpenSalePdf(selectedSaleDetail)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {loadingPdfSaleId !== null && loadingPdfSaleId === parseSaleNumericId(selectedSaleDetail) ? (
                    <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span>{L('Ver PDF Elegante', 'View Formal PDF')}</span>
                </button>
                <button
                  onClick={() => {
                    window.print();
                    setSelectedSaleDetail(null);
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{L('Ticket', 'Receipt')}</span>
                </button>
              </div>
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
                  {L(`¿Anular y Eliminar Venta #${saleToDelete.id}?`, `Void and Delete Sale #${saleToDelete.id}?`)}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isEn ? (
                    <>
                      This action will void the sale made to <strong className="text-slate-800">{trClient(saleToDelete.cliente)}</strong> for a total of <strong className="text-slate-900">{money(saleToDelete.total)}</strong>.
                    </>
                  ) : (
                    <>
                      Esta acción anulará la venta efectuada a <strong className="text-slate-800">{trClient(saleToDelete.cliente)}</strong> por un total de <strong className="text-slate-900">{money(saleToDelete.total)}</strong>.
                    </>
                  )}
                </p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 text-left flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-900 leading-normal">
                  <p className="font-bold">{L('Restauración automática de stock:', 'Automatic stock restoration:')}</p>
                  <p className="mt-0.5 text-amber-800">
                    {L(
                      `Las unidades de los ${saleToDelete.productos?.length || 1} productos de esta venta se reintegrarán de inmediato al inventario físico de la sucursal y se registrará la devolución en el Kardex.`,
                      `The units for the ${saleToDelete.productos?.length || 1} item(s) in this sale will be immediately returned to branch physical inventory and recorded in the stock ledger.`
                    )}
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
                {L('Cancelar', 'Cancel')}
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
                    <span>{L('Eliminando & Restaurando Stock...', 'Voiding & Restoring Stock...')}</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>{L('Confirmar Anulación', 'Confirm Void')}</span>
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">{L('Modificación de Registro', 'Record Modification')}</span>
                <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2 mt-0.5">
                  <Pencil className="w-5 h-5 text-indigo-400" />
                  {L(`Editar Venta #${editingSale.id}`, `Edit Sale #${editingSale.id}`)}
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">{L('Cliente', 'Customer')}</label>
                  <input
                    type="text"
                    disabled
                    value={trClient(editSaleForm.nombreCliente)}
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 font-semibold cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{L('Método de Pago', 'Payment Method')}</label>
                  <select
                    value={editSaleForm.metodo_pago}
                    onChange={(e) => setEditSaleForm({ ...editSaleForm, metodo_pago: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                  >
                    <option value="efectivo">{L('Efectivo', 'Cash')}</option>
                    <option value="tarjeta">{L('Tarjeta POS', 'POS Card')}</option>
                    <option value="transferencia">{L('Transferencia Bancaria', 'Bank Transfer')}</option>
                    <option value="credito">{L('Crédito', 'Credit')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{L('Observaciones / Motivo de Modificación', 'Notes / Reason for Modification')}</label>
                <input
                  type="text"
                  placeholder={L('Ej: Corrección de cantidad solicitada por clienta...', 'e.g., Quantity correction requested by customer...')}
                  value={editSaleForm.observaciones}
                  onChange={(e) => setEditSaleForm({ ...editSaleForm, observaciones: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Lista de Líneas de Productos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">{L('Prendas & Productos de la Venta', 'Sale Items & Products')}</label>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {editSaleForm.detalles.length} {editSaleForm.detalles.length === 1 ? L('línea', 'line') : L('líneas', 'lines')}
                  </span>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-slate-50/50">
                  {editSaleForm.detalles.map((d: any, idx: number) => {
                    const lineGross = Number(d.cantidad) * Number(d.precio_unitario);
                    const lineTotal = Math.max(0, lineGross - (Number(d.descuento) || 0));

                    return (
                      <div key={idx} className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate" title={trProdName(d.nombre)}>
                            {trProdName(d.nombre)}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{L('ID Producto:', 'Product ID:')} #{d.id_producto}</p>
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
                            <span className="text-[9px] text-slate-400 block">{L('P. Unitario', 'Unit Price')}</span>
                            <div className="relative">
                              <span className="absolute left-2 top-2 text-[10px] text-slate-400">{currencySymbol}</span>
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
                            <span className="text-[9px] text-amber-700 block">{L('Desc.', 'Disc.')} ({currencySymbol})</span>
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
                            <span className="text-[9px] text-slate-400 block">{L('Total', 'Total')}</span>
                            <span className="text-xs font-black text-slate-900 font-mono">
                              {money(lineTotal)}
                            </span>
                          </div>

                          {/* Eliminar Línea */}
                          <button
                            type="button"
                            title={L('Eliminar producto de la venta', 'Remove product from sale')}
                            disabled={editSaleForm.detalles.length <= 1}
                            onClick={() => {
                              if (editSaleForm.detalles.length <= 1) {
                                alert(L('La venta debe contener al menos un producto.', 'The sale must contain at least one product.'));
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
                      <span>{L('Subtotal Bruto:', 'Gross Subtotal:')}</span>
                      <span className="font-mono">{money(totalGross)}</span>
                    </div>
                    {totalDesc > 0 && (
                      <div className="flex items-center justify-between text-xs text-amber-700 font-semibold">
                        <span>{L('Descuento Aplicado:', 'Discount Applied:')}</span>
                        <span className="font-mono">-{money(totalDesc)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>{L('TOTAL ACTUALIZADO:', 'UPDATED TOTAL:')}</span>
                      <span className="font-mono text-indigo-700 text-base">{money(grandTotal)}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-900 leading-normal">
                  <strong>{L('Sincronización de Stock:', 'Stock Synchronization:')}</strong>{' '}
                  {L(
                    'Si aumentas o disminuyes prendas, el stock en MySQL y el Kardex se ajustarán automáticamente al guardar.',
                    'If you increase or decrease item quantities, MySQL stock and the inventory ledger will automatically adjust upon saving.'
                  )}
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
                {L('Cancelar', 'Cancel')}
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
                    <span>{L('Guardando & Sincronizando...', 'Saving & Syncing...')}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{L('Guardar Cambios', 'Save Changes')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VISOR DE COMPROBANTE PDF DE VENTA */}
      {pdfViewer && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
          onClick={handleClosePdfViewer}
        >
          <div
            className="bg-white w-full max-w-5xl h-[92vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-black truncate">
                    {L('Comprobante de Venta PDF —', 'Sales Receipt PDF —')} {pdfViewer.label}
                  </h3>
                  <p className="text-[11px] text-slate-300 truncate">{trClient(pdfViewer.cliente)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdfViewer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors hidden sm:inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{L('Abrir en Pestaña', 'Open in Tab')}</span>
                </a>
                <a
                  href={pdfViewer.url}
                  download={L(`comprobante-venta-${pdfViewer.saleId}.pdf`, `sales-receipt-${pdfViewer.saleId}.pdf`)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{L('Descargar PDF', 'Download PDF')}</span>
                </a>
                <button
                  type="button"
                  onClick={handleClosePdfViewer}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500/80 text-white transition-colors cursor-pointer"
                  title={L('Cerrar visor PDF', 'Close PDF viewer')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-100">
              <iframe
                src={`${pdfViewer.url}#view=FitH&navpanes=0`}
                title={L(`Comprobante PDF Venta #${pdfViewer.saleId}`, `Sales Receipt PDF #${pdfViewer.saleId}`)}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}