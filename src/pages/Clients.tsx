import { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Plus,
  Search,
  CreditCard,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Loader2,
  Banknote,
  Receipt
} from 'lucide-react';
import { Cliente, EmpresaSaaS } from '../types';
import { getTenantClients } from '../data/realClients';
import { salesApi } from '../api';
import { filterRecordsByTenant, getStoredActiveEmpresaId } from '../utils/tenant';
import { getLiveCache, setLiveCache } from '../utils/liveCache';
import { useLanguage } from '../context/LanguageContext';

interface ClientsProps {
  currentEmpresa?: EmpresaSaaS;
}

interface CreditPagoItem {
  id_pago: number;
  fecha_pago: string;
  metodo_pago: string;
  referencia_interna?: string | null;
  monto: number;
}

interface CreditSaleItem {
  id: number;
  codigo: string;
  fecha: string;
  total: number;
  pagado: number;
  saldo_pendiente: number;
  estado_pago: 'pendiente' | 'parcial' | 'pagado' | string;
  items_count: number;
  cliente: {
    id_cliente?: number;
    nombre?: string;
    apellido?: string;
    nombre_completo: string;
    nit: string;
    telefono?: string;
    dias_credito?: number;
  };
  pagos: CreditPagoItem[];
}

export default function Clients({ currentEmpresa }: ClientsProps) {
  const {
    L,
    isEn,
    money,
    currencySymbol,
    locale,
    taxIdLabel,
    trPayment,
    trStatus,
    trClient,
    trTaxId,
  } = useLanguage();

  const formatClient = (raw?: string | null) => {
    const clean = String(raw || '').trim();
    if (clean === 'Cliente') return L('Cliente', 'Customer');
    return trClient(clean);
  };

  const trClientType = (raw?: string | null) => {
    const low = String(raw || '').toLowerCase();
    if (low === 'vip') return 'VIP';
    if (low === 'mayorista') return L('Mayorista', 'Wholesale');
    if (low === 'especial') return L('Especial', 'Special');
    if (low === 'normal') return L('Normal', 'Standard');
    return String(raw || '');
  };

  const trAddress = (raw?: string | null) => {
    const clean = String(raw || '').trim();
    if (!clean || clean === 'Ciudad') return L('Ciudad', 'City');
    return clean;
  };

  const [activeTab, setActiveTab] = useState<'directorio' | 'cxc'>('directorio');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewClienteModal, setShowNewClienteModal] = useState(false);
  const [isSavingCliente, setIsSavingCliente] = useState(false);

  // Modal de Abono Parcial / Total (CxC Real en MySQL)
  const [showAbonoModal, setShowAbonoModal] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<CreditSaleItem | null>(null);
  const [montoAbono, setMontoAbono] = useState('');
  const [metodoAbono, setMetodoAbono] = useState<'efectivo' | 'tarjeta' | 'transferencia'>('efectivo');
  const [referenciaAbono, setReferenciaAbono] = useState('');
  const [isSavingAbono, setIsSavingAbono] = useState(false);
  const [abonoError, setAbonoError] = useState<string | null>(null);

  // Historial desplegable de abonos por venta
  const [expandedCreditId, setExpandedCreditId] = useState<number | null>(null);
  const [downloadingPdfId, setDownloadingPdfId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ text: string; pdfSaleId?: number } | null>(null);

  const effectiveEmpresaId = Number(currentEmpresa?.id ?? getStoredActiveEmpresaId() ?? 0);

  // Clientes y Créditos aislados por empresa (con caché en vivo para evitar saltos al navegar)
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    return getLiveCache<Cliente[]>(effectiveEmpresaId, 'clients') ?? getTenantClients(effectiveEmpresaId);
  });
  const [creditSales, setCreditSales] = useState<CreditSaleItem[]>(() => {
    return getLiveCache<CreditSaleItem[]>(effectiveEmpresaId, 'credits') ?? [];
  });
  const [loadingCredits, setLoadingCredits] = useState(false);

  const showToast = (text: string, pdfSaleId?: number) => {
    setToast({ text, pdfSaleId });
    setTimeout(() => setToast(null), 6500);
  };

  const fetchClientsLive = useCallback(async () => {
    try {
      const res = await salesApi.getClients({ id_empresa: effectiveEmpresaId, per_page: 1000 });
      const rawList = res?.data || res;
      if (Array.isArray(rawList)) {
        const { items: tenantClients } = filterRecordsByTenant(rawList, effectiveEmpresaId);
        if (tenantClients.length > 0) {
          const mapped: Cliente[] = tenantClients.map((c: any) => ({
            id_cliente: Number(c.id_cliente || c.id),
            nombre: c.nombre || '',
            apellido: c.apellido || '',
            nombre_completo: c.nombre_completo || `${c.nombre || ''} ${c.apellido || ''}`.trim() || 'Cliente',
            nit: c.nit || 'CF',
            telefono: c.telefono || 'N/A',
            email: c.email || 'N/A',
            direccion: c.direccion || 'Ciudad',
            tipo_cliente: (c.tipo_cliente || 'normal') as any,
            descuento_aplicable: Number(c.descuento_aplicable) || 0,
            dias_credito: Number(c.dias_credito) || 0,
            saldo_actual: Number(c.saldo_actual) || 0,
            limite_credito: Number(c.limite_credito) || 5000
          }));
          setLiveCache(effectiveEmpresaId, 'clients', mapped);
          setClientes(mapped);
          return;
        }
      }
      if (!getLiveCache<Cliente[]>(effectiveEmpresaId, 'clients')) {
        setClientes(getTenantClients(effectiveEmpresaId));
      }
    } catch {
      if (!getLiveCache<Cliente[]>(effectiveEmpresaId, 'clients')) {
        setClientes(getTenantClients(effectiveEmpresaId));
      }
    }
  }, [effectiveEmpresaId]);

  const fetchCreditsLive = useCallback(async () => {
    setLoadingCredits(true);
    try {
      const res = await salesApi.getCredits({ id_empresa: effectiveEmpresaId });
      const rawList = res?.data || res;
      if (Array.isArray(rawList)) {
        const mapped: CreditSaleItem[] = rawList.map((item: any) => {
          const total = Number(item.total) || 0;
          const pagado = Number(item.pagado ?? item.total_pagado) || 0;
          const saldo = item.saldo_pendiente !== undefined ? Number(item.saldo_pendiente) : Math.max(0, total - pagado);
          const cli = item.cliente || {};
          const fullName =
            cli.nombre_completo ||
            `${cli.nombre || ''} ${cli.apellido && cli.apellido !== 'C/F' ? cli.apellido : ''}`.trim() ||
            'Cliente';
          const pagosArr: CreditPagoItem[] = Array.isArray(item.pagos)
            ? item.pagos.map((p: any) => ({
              id_pago: Number(p.id_pago || p.id || 0),
              fecha_pago: String(p.fecha_pago || p.created_at || '').slice(0, 16).replace('T', ' '),
              metodo_pago: String(p.metodo_pago || 'efectivo'),
              referencia_interna: p.referencia_interna || p.transaction_id || null,
              monto: Number(p.monto) || 0
            }))
            : [];

          return {
            id: Number(item.id || item.id_venta),
            codigo: item.codigo || `VTA-${item.id || item.id_venta}`,
            fecha: String(item.fecha || '').slice(0, 10),
            total,
            pagado,
            saldo_pendiente: Math.max(0, Number(saldo.toFixed(2))),
            estado_pago: item.estado_pago || (pagado > 0 ? 'parcial' : 'pendiente'),
            items_count: Number(item.items_count) || 0,
            cliente: {
              id_cliente: cli.id_cliente,
              nombre: cli.nombre,
              apellido: cli.apellido,
              nombre_completo: fullName,
              nit: cli.nit || 'CF',
              telefono: cli.telefono || '',
              dias_credito: Number(cli.dias_credito) || 30
            },
            pagos: pagosArr
          };
        });
        setLiveCache(effectiveEmpresaId, 'credits', mapped);
        setCreditSales(mapped);
      } else {
        setLiveCache(effectiveEmpresaId, 'credits', []);
        setCreditSales([]);
      }
    } catch (err) {
      console.warn('Error cargando cuentas por cobrar:', err);
      if (!getLiveCache<CreditSaleItem[]>(effectiveEmpresaId, 'credits')) {
        setCreditSales([]);
      }
    } finally {
      setLoadingCredits(false);
    }
  }, [effectiveEmpresaId]);

  useEffect(() => {
    setClientes(getLiveCache<Cliente[]>(effectiveEmpresaId, 'clients') ?? getTenantClients(effectiveEmpresaId));
    setCreditSales(getLiveCache<CreditSaleItem[]>(effectiveEmpresaId, 'credits') ?? []);
    setExpandedCreditId(null);
    fetchClientsLive();
    fetchCreditsLive();
  }, [effectiveEmpresaId, fetchClientsLive, fetchCreditsLive]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  // Formulario nuevo cliente
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    apellido: '',
    nit: '',
    telefono: '',
    email: '',
    direccion: '',
    tipo_cliente: 'normal' as const,
    descuento_aplicable: 0,
    dias_credito: 30,
    limite_credito: 5000
  });

  // Calcular saldo real por cliente a partir de las ventas pendientes/parciales de MySQL
  const saldoByClientId = creditSales.reduce<Record<number, number>>((acc, cr) => {
    const cid = Number(cr.cliente?.id_cliente || 0);
    if (cid > 0) {
      acc[cid] = (acc[cid] || 0) + cr.saldo_pendiente;
    }
    return acc;
  }, {});

  const totalCarteraCredito = creditSales.reduce((acc, c) => acc + c.saldo_pendiente, 0);
  const totalRecuperadoEnCurso = creditSales.reduce((acc, c) => acc + c.pagado, 0);

  const filteredDirectorio = clientes.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.nombre_completo.toLowerCase().includes(q) ||
      c.nit.toLowerCase().includes(q) ||
      c.telefono.includes(searchTerm)
    );
  });

  const filteredCredits = creditSales.filter((cr) => {
    const q = searchTerm.toLowerCase();
    return (
      cr.cliente.nombre_completo.toLowerCase().includes(q) ||
      cr.cliente.nit.toLowerCase().includes(q) ||
      cr.codigo.toLowerCase().includes(q) ||
      String(cr.id).includes(q)
    );
  });

  const currentTotalCount = activeTab === 'directorio' ? filteredDirectorio.length : filteredCredits.length;
  const totalPages = Math.ceil(currentTotalCount / itemsPerPage) || 1;
  const paginatedDirectorio = filteredDirectorio.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedCredits = filteredCredits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSaveCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCliente.nombre || !newCliente.nit || isSavingCliente) return;
    setIsSavingCliente(true);
    try {
      const fullName = `${newCliente.nombre.trim()} ${newCliente.apellido.trim()}`.trim();
      const res = await salesApi.createClient({
        nombre: fullName,
        nit: newCliente.nit.trim().toUpperCase(),
        telefono: newCliente.telefono.trim() || null,
        email: newCliente.email.trim() || null,
        direccion: newCliente.direccion.trim() || 'Ciudad',
        tipo_cliente: newCliente.tipo_cliente === 'normal' || newCliente.tipo_cliente === 'mayorista' ? newCliente.tipo_cliente : 'especial',
        dias_credito: Number(newCliente.dias_credito) || 0,
        descuento_aplicable: Number(newCliente.descuento_aplicable) || 0,
        id_empresa: effectiveEmpresaId
      });
      const created = res?.cliente || res;
      const creado: Cliente = {
        id_cliente: Number(created?.id_cliente || Date.now()),
        nombre: created?.nombre || newCliente.nombre.trim(),
        apellido: created?.apellido || newCliente.apellido.trim(),
        nombre_completo: fullName,
        nit: created?.nit || newCliente.nit.trim().toUpperCase(),
        telefono: created?.telefono || newCliente.telefono || 'N/A',
        email: created?.email || newCliente.email || 'N/A',
        direccion: created?.direccion || newCliente.direccion || 'Ciudad',
        tipo_cliente: newCliente.tipo_cliente,
        descuento_aplicable: Number(newCliente.descuento_aplicable),
        dias_credito: Number(newCliente.dias_credito),
        saldo_actual: 0,
        limite_credito: Number(newCliente.limite_credito)
      };
      setClientes((prev) => [creado, ...prev]);
      setShowNewClienteModal(false);
      setNewCliente({
        nombre: '',
        apellido: '',
        nit: '',
        telefono: '',
        email: '',
        direccion: '',
        tipo_cliente: 'normal',
        descuento_aplicable: 0,
        dias_credito: 30,
        limite_credito: 5000
      });
      showToast(
        L(
          `Cliente "${creado.nombre_completo}" registrado en MySQL.`,
          `Customer "${creado.nombre_completo}" registered in MySQL.`
        )
      );
    } catch (err: any) {
      alert(
        L(
          `No se pudo guardar el cliente: ${err?.response?.data?.message || err?.message || 'Error de servidor'}`,
          `Could not save customer: ${err?.response?.data?.message || err?.message || 'Server error'}`
        )
      );
    } finally {
      setIsSavingCliente(false);
    }
  };

  const handleOpenAbonoModal = (credit: CreditSaleItem) => {
    setSelectedCredit(credit);
    setMontoAbono(credit.saldo_pendiente.toFixed(2));
    setMetodoAbono('efectivo');
    setReferenciaAbono('');
    setAbonoError(null);
    setShowAbonoModal(true);
  };

  const handleApplyAbono = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCredit || isSavingAbono) return;
    const abono = parseFloat(montoAbono);
    if (isNaN(abono) || abono <= 0) {
      setAbonoError(
        L(
          `Ingresa un monto de abono mayor a ${money(0)}.`,
          `Enter a payment amount greater than ${money(0)}.`
        )
      );
      return;
    }
    if (abono > selectedCredit.saldo_pendiente + 0.01) {
      setAbonoError(
        L(
          `El abono no puede exceder el saldo pendiente (${money(selectedCredit.saldo_pendiente)}).`,
          `Payment cannot exceed the pending balance (${money(selectedCredit.saldo_pendiente)}).`
        )
      );
      return;
    }

    setIsSavingAbono(true);
    setAbonoError(null);
    try {
      const res = await salesApi.addPayment(selectedCredit.id, {
        monto: Number(abono.toFixed(2)),
        metodo_pago: metodoAbono,
        referencia: referenciaAbono.trim() || undefined
      });
      const nuevoSaldo = Number(res?.nuevo_saldo_pendiente ?? Math.max(0, selectedCredit.saldo_pendiente - abono));
      const saleId = selectedCredit.id;
      setShowAbonoModal(false);
      setSelectedCredit(null);
      setMontoAbono('');
      setReferenciaAbono('');
      await fetchCreditsLive();
      showToast(
        nuevoSaldo <= 0.01
          ? L(
              `Abono de ${money(abono)} registrado. Venta #${saleId} liquidada completamente.`,
              `Payment of ${money(abono)} recorded. Sale #${saleId} paid in full.`
            )
          : L(
              `Abono parcial de ${money(abono)} registrado en Venta #${saleId}. Nuevo saldo: ${money(nuevoSaldo)}.`,
              `Partial payment of ${money(abono)} recorded on Sale #${saleId}. New balance: ${money(nuevoSaldo)}.`
            ),
        saleId
      );
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || L('Error al registrar el abono en MySQL.', 'Error recording payment in MySQL.');
      setAbonoError(msg);
    } finally {
      setIsSavingAbono(false);
    }
  };

  const handleDownloadPdf = async (saleId: number) => {
    if (downloadingPdfId === saleId) return;
    setDownloadingPdfId(saleId);
    try {
      await salesApi.downloadSalePdf(saleId);
    } catch (err: any) {
      alert(
        L(
          `No se pudo generar el PDF de la venta #${saleId}: ${err?.response?.data?.message || err?.message}`,
          `Could not generate PDF for sale #${saleId}: ${err?.response?.data?.message || err?.message}`
        )
      );
    } finally {
      setDownloadingPdfId(null);
    }
  };

  const abonoNum = parseFloat(montoAbono) || 0;
  const nuevoSaldoPreview = selectedCredit ? Math.max(0, selectedCredit.saldo_pendiente - abonoNum) : 0;

  return (
    <div className="space-y-6">
      {/* Toast flotante con acceso rápido al PDF actualizado */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 max-w-md animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-bold leading-snug flex-1">{toast.text}</p>
          {toast.pdfSaleId && (
            <button
              type="button"
              onClick={() => handleDownloadPdf(toast.pdfSaleId!)}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{L('Ver PDF', 'View PDF')}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              {L('Clientes & Cuentas por Cobrar (CXC)', 'Customers & Accounts Receivable (A/R)')}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {L(
              'Directorio de clientes, control de ventas al crédito, registro de abonos parciales en vivo y estados de cuenta PDF.',
              'Customer directory, credit sales tracking, live partial payments, and PDF account statements.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              fetchClientsLive();
              fetchCreditsLive();
            }}
            className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            title={L('Sincronizar clientes y cuentas por cobrar desde MySQL', 'Sync customers and accounts receivable from MySQL')}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingCredits ? 'animate-spin' : ''}`} />
            <span>{L('Actualizar', 'Refresh')}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowNewClienteModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {L('Registrar Nuevo Cliente', 'Register New Customer')}
          </button>
        </div>
      </div>

      {/* 2. Tarjetas de Resumen de Cartera */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">{L('Total Clientes Registrados', 'Total Registered Customers')}</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{clientes.length}</p>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {L('Aislados en', 'Scoped to')} {currentEmpresa?.nombre || L('tu empresa', 'your company')}
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">{L('Saldo Pendiente por Cobrar (CXC)', 'Pending Receivable Balance (A/R)')}</p>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {money(totalCarteraCredito)}
            </p>
            <span className="text-[11px] text-amber-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" /> {creditSales.length} {L('venta(s) pendiente(s) o con abono parcial', 'pending or partially paid sale(s)')}
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">{L('Abonos Parciales Recibidos', 'Partial Payments Received')}</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">
              {money(totalRecuperadoEnCurso)}
            </p>
            <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
              {L('En cuentas activas de cartera', 'Across active receivable accounts')}
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Banknote className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Selector de Pestañas */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-2xl">
        <button
          type="button"
          onClick={() => setActiveTab('directorio')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'directorio'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          <Users className="w-4 h-4" />
          {L('Directorio de Clientes', 'Customer Directory')} ({clientes.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('cxc')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'cxc'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          <Clock className="w-4 h-4" />
          {L('Cuentas por Cobrar & Abonos', 'Accounts Receivable & Payments')} ({creditSales.length})
        </button>
      </div>

      {/* 4. Contenido de Directorio */}
      {activeTab === 'directorio' && (
        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={L('Buscar cliente por nombre, NIT o teléfono...', 'Search customer by name, Tax ID, or phone...')}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {L('Segmentación comercial por tipo de cliente', 'Commercial segmentation by customer type')}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{L('Cliente / Razón Social', 'Customer / Legal Name')}</th>
                  <th className="py-3 px-4">{taxIdLabel}</th>
                  <th className="py-3 px-4">{L('Categoría', 'Category')}</th>
                  <th className="py-3 px-4">{L('Contacto & Teléfono', 'Contact & Phone')}</th>
                  <th className="py-3 px-4">{L('Crédito Concedido', 'Credit Limit')}</th>
                  <th className="py-3 px-4 text-right">{L('Saldo Pendiente', 'Pending Balance')}</th>
                  <th className="py-3 px-4 text-center">{L('Acciones', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedDirectorio.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="font-semibold text-slate-600">{L('No se encontraron clientes', 'No customers found')}</p>
                      <p className="text-xs text-slate-400 mt-1">{L('Prueba cambiando el término de búsqueda o registra uno nuevo.', 'Try changing your search term or register a new customer.')}</p>
                    </td>
                  </tr>
                ) : (
                  paginatedDirectorio.map((cliente) => {
                    const saldoReal = saldoByClientId[cliente.id_cliente] ?? cliente.saldo_actual;
                    return (
                      <tr key={cliente.id_cliente} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{formatClient(cliente.nombre_completo)}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate max-w-xs">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            {trAddress(cliente.direccion)}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{trTaxId(cliente.nit)}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${cliente.tipo_cliente === 'vip'
                                ? 'bg-purple-100 text-purple-700'
                                : cliente.tipo_cliente === 'mayorista'
                                  ? 'bg-indigo-100 text-indigo-700'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                          >
                            {trClientType(cliente.tipo_cliente)} ({cliente.descuento_aplicable}% {L('desc.', 'off')})
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1 text-slate-700">
                            <Phone className="w-3 h-3 text-slate-400" /> {cliente.telefono}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                            <Mail className="w-3 h-3 text-slate-400" /> {cliente.email}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-700">
                            {money(cliente.limite_credito)}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {cliente.dias_credito > 0
                              ? L(`${cliente.dias_credito} días de plazo`, `${cliente.dias_credito}-day terms`)
                              : L('Solo Contado', 'Cash Only')}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-sm">
                          {saldoReal > 0 ? (
                            <span className="text-amber-600">
                              {money(saldoReal)}
                            </span>
                          ) : (
                            <span className="text-emerald-600">{L(`Al Día (${money(0)})`, `Current (${money(0)})`)}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {saldoReal > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setSearchTerm(cliente.nombre_completo);
                                setActiveTab('cxc');
                              }}
                              className="px-2.5 py-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer"
                            >
                              {L('Ver Créditos', 'View Credits')}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Contenido de CXC (Ventas al Crédito Reales + Abonos Parciales + PDF Elegante) */}
      {activeTab === 'cxc' && (
        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={L('Buscar por cliente, NIT o # de venta...', 'Search by customer, Tax ID, or sale #...')}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              {L('Saldo Total Adeudado:', 'Total Balance Due:')} {money(totalCarteraCredito)}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{L('Venta / Fecha', 'Sale / Date')}</th>
                  <th className="py-3 px-4">{L('Cliente', 'Customer')} / {taxIdLabel}</th>
                  <th className="py-3 px-4 text-right">{L('Total Venta', 'Sale Total')}</th>
                  <th className="py-3 px-4 text-right">{L('Abonado', 'Paid')}</th>
                  <th className="py-3 px-4 text-right">{L('Saldo Pendiente', 'Pending Balance')}</th>
                  <th className="py-3 px-4 text-center">{L('Estado', 'Status')}</th>
                  <th className="py-3 px-4 text-right">{L('Acciones (Abono / PDF)', 'Actions (Payment / PDF)')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loadingCredits ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Loader2 className="w-8 h-8 mx-auto mb-2 text-indigo-500 animate-spin" />
                      <p className="font-semibold text-slate-600">{L('Cargando cuentas por cobrar desde MySQL...', 'Loading accounts receivable from MySQL...')}</p>
                    </td>
                  </tr>
                ) : paginatedCredits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Clock className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="font-semibold text-slate-600">{L('No hay cuentas por cobrar pendientes', 'No pending accounts receivable')}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {L(
                          'Cuando registres una venta al Crédito desde el Punto de Venta, aparecerá aquí para controlar sus abonos parciales y generar su PDF.',
                          'When you record a Credit sale in the POS, it will appear here to track partial payments and generate PDF statements.'
                        )}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedCredits.map((credit) => {
                    const isExpanded = expandedCreditId === credit.id;
                    const progressPct = credit.total > 0 ? Math.min(100, Math.round((credit.pagado / credit.total) * 100)) : 0;

                    return (
                      <>
                        <tr key={credit.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-mono font-black text-slate-900">{credit.codigo}</div>
                            <div className="text-[10px] text-slate-400">{credit.fecha}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{formatClient(credit.cliente.nombre_completo)}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {taxIdLabel}: {trTaxId(credit.cliente.nit)}
                              {credit.cliente.telefono ? ` • ${L('Tel', 'Phone')}: ${credit.cliente.telefono}` : ''}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-700">
                            {money(credit.total)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="font-mono font-bold text-emerald-700">
                              {money(credit.pagado)}
                            </div>
                            <div className="w-20 ml-auto bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${progressPct}%` }} />
                            </div>
                            <div className="text-[9.5px] text-slate-400 mt-0.5">
                              {credit.pagos.length} {L('abono(s)', 'payment(s)')} • {progressPct}%
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-black text-rose-600 text-sm">
                            {money(credit.saldo_pendiente)}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {credit.estado_pago === 'parcial' || credit.pagado > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-800 border border-amber-200">
                                {L('Abono Parcial', 'Partial Payment')}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200">
                                {trStatus('pendiente')}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5 flex-wrap">
                              <button
                                type="button"
                                onClick={() => handleOpenAbonoModal(credit)}
                                className="px-3 py-1.5 text-[11px] font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs inline-flex items-center gap-1 cursor-pointer"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>{L('Registrar Abono', 'Record Payment')}</span>
                              </button>

                              <button
                                type="button"
                                disabled={downloadingPdfId === credit.id}
                                onClick={() => handleDownloadPdf(credit.id)}
                                className="px-2.5 py-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                title={L('Descargar PDF elegante con productos, abonos y saldo pendiente', 'Download formal PDF with items, payments, and pending balance')}
                              >
                                {downloadingPdfId === credit.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                                )}
                                <span>PDF</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setExpandedCreditId(isExpanded ? null : credit.id)}
                                className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                                title={L('Ver historial de abonos parciales', 'View partial payment history')}
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </div>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr key={`${credit.id}-history`} className="bg-slate-50/80">
                            <td colSpan={7} className="px-6 py-4">
                              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                                    <Receipt className="w-4 h-4 text-emerald-600" />
                                    {L('Historial de Abonos Registrados —', 'Recorded Payment History —')} {credit.codigo}
                                  </span>
                                  <span className="text-[11px] text-slate-500">
                                    {L('Total:', 'Total:')} <strong>{money(credit.total)}</strong> • {L('Pagado:', 'Paid:')} <strong className="text-emerald-700">{money(credit.pagado)}</strong> • {L('Pendiente:', 'Pending:')} <strong className="text-rose-600">{money(credit.saldo_pendiente)}</strong>
                                  </span>
                                </div>
                                {credit.pagos.length === 0 ? (
                                  <p className="text-[11px] text-slate-400 italic">
                                    {L(
                                      'Aún no se han registrado abonos para esta cuenta. Usa "Registrar Abono" para ingresar un pago parcial o total.',
                                      'No payments have been recorded for this account yet. Use "Record Payment" to log a partial or full payment.'
                                    )}
                                  </p>
                                ) : (
                                  <table className="w-full text-[11px]">
                                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px]">
                                      <tr>
                                        <th className="py-1.5 px-3 text-left">{L('Fecha', 'Date')}</th>
                                        <th className="py-1.5 px-3 text-left">{L('Forma de Pago', 'Payment Method')}</th>
                                        <th className="py-1.5 px-3 text-left">{L('Referencia / Recibo', 'Reference / Receipt')}</th>
                                        <th className="py-1.5 px-3 text-right">{L('Monto Abonado', 'Amount Paid')}</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {credit.pagos.map((p) => (
                                        <tr key={p.id_pago}>
                                          <td className="py-1.5 px-3 font-mono text-slate-600">{p.fecha_pago}</td>
                                          <td className="py-1.5 px-3 capitalize font-semibold text-slate-700">{trPayment(p.metodo_pago)}</td>
                                          <td className="py-1.5 px-3 font-mono text-slate-500">{p.referencia_interna || '—'}</td>
                                          <td className="py-1.5 px-3 text-right font-mono font-black text-emerald-700">
                                            + {money(p.monto)}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Paginación compartida */}
      {totalPages > 1 && (
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-medium">
            {isEn ? (
              <>
                Showing <strong className="text-slate-800">{currentTotalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
                <strong className="text-slate-800">{Math.min(currentPage * itemsPerPage, currentTotalCount)}</strong> of{' '}
                <strong className="text-slate-800">{currentTotalCount.toLocaleString(locale)}</strong> records
              </>
            ) : (
              <>
                Mostrando <strong className="text-slate-800">{currentTotalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> a{' '}
                <strong className="text-slate-800">{Math.min(currentPage * itemsPerPage, currentTotalCount)}</strong> de{' '}
                <strong className="text-slate-800">{currentTotalCount.toLocaleString(locale)}</strong> registros
              </>
            )}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> {L('Anterior', 'Previous')}
            </button>
            <span className="px-3 py-1.5 font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg">
              {L(`Pág. ${currentPage} de ${totalPages}`, `Page ${currentPage} of ${totalPages}`)}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              {L('Siguiente', 'Next')} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 6. Modal Registrar Abono Parcial o Total */}
      {showAbonoModal && selectedCredit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  {L('Registrar Abono (Parcial o Total)', 'Record Payment (Partial or Full)')}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {selectedCredit.codigo} • {formatClient(selectedCredit.cliente.nombre_completo)}
                </p>
              </div>
              <button
                type="button"
                disabled={isSavingAbono}
                onClick={() => setShowAbonoModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyAbono} className="p-5 space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{L('Total Venta', 'Sale Total')}</span>
                  <span className="font-mono font-black text-slate-800">{money(selectedCredit.total)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{L('Ya Abonado', 'Already Paid')}</span>
                  <span className="font-mono font-black text-emerald-700">{money(selectedCredit.pagado)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{L('Saldo Pendiente', 'Pending Balance')}</span>
                  <span className="font-mono font-black text-rose-600">{money(selectedCredit.saldo_pendiente)}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">{L('Monto a Abonar Hoy', 'Amount to Pay Today')} ({currencySymbol}):</label>
                  <div className="flex items-center gap-1">
                    {[
                      { label: '25%', mult: 0.25 },
                      { label: '50%', mult: 0.5 },
                      { label: L('Todo (100%)', 'Full (100%)'), mult: 1 }
                    ].map((opt) => (
                      <button
                        key={opt.mult}
                        type="button"
                        onClick={() => setMontoAbono((selectedCredit.saldo_pendiente * opt.mult).toFixed(2))}
                        className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md text-[10px] font-black cursor-pointer"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={selectedCredit.saldo_pendiente}
                  required
                  autoFocus
                  value={montoAbono}
                  onChange={(e) => setMontoAbono(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-base font-mono font-black text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {abonoNum > 0 && abonoNum <= selectedCredit.saldo_pendiente + 0.01 && (
                  <div
                    className={`mt-2 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-between ${nuevoSaldoPreview <= 0.01
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                  >
                    <span>
                      {nuevoSaldoPreview <= 0.01
                        ? L('✅ Quedará PAGADA COMPLETAMENTE', '✅ Will be PAID IN FULL')
                        : L('📌 Abono Parcial — Nuevo saldo:', '📌 Partial Payment — New balance:')}
                    </span>
                    <span className="font-mono font-black">{money(nuevoSaldoPreview)}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">{L('Forma de Pago del Abono:', 'Payment Method:')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'efectivo' as const, label: L('Efectivo', 'Cash') },
                    { id: 'tarjeta' as const, label: L('Tarjeta', 'Card') },
                    { id: 'transferencia' as const, label: L('Transferencia', 'Bank Transfer') }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMetodoAbono(m.id)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${metodoAbono === m.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{L('No. de Recibo / Boleta / Referencia (opcional):', 'Receipt / Deposit / Reference # (optional):')}</label>
                <input
                  type="text"
                  placeholder={L('Ej. REC-0045, Boleta BI #88291...', 'e.g., REC-0045, Wire Ref #88291...')}
                  value={referenciaAbono}
                  onChange={(e) => setReferenciaAbono(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {abonoError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[11px]">
                  ⚠️ {abonoError}
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  disabled={isSavingAbono}
                  onClick={() => setShowAbonoModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl cursor-pointer"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSavingAbono}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSavingAbono ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{L('Guardando...', 'Saving...')}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{L('Guardar Abono', 'Save Payment')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Modal Nuevo Cliente */}
      {showNewClienteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                {L('Registrar Nuevo Cliente', 'Register New Customer')}
              </h3>
              <button
                type="button"
                onClick={() => setShowNewClienteModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCliente} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{L('Nombre / Razón Social:', 'First Name / Company Name:')}</label>
                  <input
                    type="text"
                    required
                    placeholder={L('Ej. Comercial Los Ángeles', 'e.g., Acme Retail Corp.')}
                    value={newCliente.nombre}
                    onChange={(e) => setNewCliente({ ...newCliente, nombre: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{L('Apellido / Tipo Sociedad:', 'Last Name / Entity Type:')}</label>
                  <input
                    type="text"
                    placeholder={L('Ej. S.A. o de Martínez', 'e.g., LLC or Smith')}
                    value={newCliente.apellido}
                    onChange={(e) => setNewCliente({ ...newCliente, apellido: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{L('NIT Tributario:', 'Tax ID:')}</label>
                  <input
                    type="text"
                    required
                    placeholder={L('Ej. 1234567-8 o CF', 'e.g., 12-3456789 or N/A')}
                    value={newCliente.nit}
                    onChange={(e) => setNewCliente({ ...newCliente, nit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{L('Tipo de Cliente:', 'Customer Type:')}</label>
                  <select
                    value={newCliente.tipo_cliente}
                    onChange={(e) => setNewCliente({ ...newCliente, tipo_cliente: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="normal">{L('Normal', 'Standard')}</option>
                    <option value="mayorista">{L('Mayorista', 'Wholesale')}</option>
                    <option value="vip">{L('Especial / Corporativo', 'Special / Corporate')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{L('Teléfono:', 'Phone:')}</label>
                  <input
                    type="text"
                    placeholder={L('+502 2000-0000', '+1 (555) 000-0000')}
                    value={newCliente.telefono}
                    onChange={(e) => setNewCliente({ ...newCliente, telefono: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{L('Correo Electrónico:', 'Email Address:')}</label>
                  <input
                    type="email"
                    placeholder={L('cliente@correo.com', 'customer@email.com')}
                    value={newCliente.email}
                    onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{L('Días de Crédito:', 'Credit Days:')}</label>
                  <input
                    type="number"
                    min="0"
                    value={newCliente.dias_credito}
                    onChange={(e) => setNewCliente({ ...newCliente, dias_credito: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{L('Descuento (%):', 'Discount (%):')}</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="100"
                    value={newCliente.descuento_aplicable}
                    onChange={(e) => setNewCliente({ ...newCliente, descuento_aplicable: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{L('Límite Crédito', 'Credit Limit')} ({currencySymbol}):</label>
                  <input
                    type="number"
                    step="100"
                    min="0"
                    value={newCliente.limite_credito}
                    onChange={(e) => setNewCliente({ ...newCliente, limite_credito: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{L('Dirección de Entrega / Facturación:', 'Shipping / Billing Address:')}</label>
                <input
                  type="text"
                  placeholder={L('Zona, Dirección completa...', 'Street, City, State / Zip...')}
                  value={newCliente.direccion}
                  onChange={(e) => setNewCliente({ ...newCliente, direccion: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  disabled={isSavingCliente}
                  onClick={() => setShowNewClienteModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl cursor-pointer"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSavingCliente}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSavingCliente ? L('Guardando...', 'Saving...') : L('Guardar Cliente', 'Save Customer')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
