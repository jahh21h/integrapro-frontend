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
      const res = await salesApi.getClients({ id_empresa: effectiveEmpresaId, per_page: 250 });
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
      showToast(`Cliente "${creado.nombre_completo}" registrado en MySQL.`);
    } catch (err: any) {
      alert(`No se pudo guardar el cliente: ${err?.response?.data?.message || err?.message || 'Error de servidor'}`);
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
      setAbonoError('Ingresa un monto de abono mayor a Q 0.00.');
      return;
    }
    if (abono > selectedCredit.saldo_pendiente + 0.01) {
      setAbonoError(`El abono no puede exceder el saldo pendiente (Q ${selectedCredit.saldo_pendiente.toFixed(2)}).`);
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
          ? `Abono de Q ${abono.toFixed(2)} registrado. Venta #${saleId} liquidada completamente.`
          : `Abono parcial de Q ${abono.toFixed(2)} registrado en Venta #${saleId}. Nuevo saldo: Q ${nuevoSaldo.toFixed(2)}.`,
        saleId
      );
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Error al registrar el abono en MySQL.';
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
      alert(`No se pudo generar el PDF de la venta #${saleId}: ${err?.response?.data?.message || err?.message}`);
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
              <span>Ver PDF</span>
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
              Clientes & Cuentas por Cobrar (CXC)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Directorio de clientes, control de ventas al crédito, registro de abonos parciales en vivo y estados de cuenta PDF.
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
            title="Sincronizar clientes y cuentas por cobrar desde MySQL"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingCredits ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
          <button
            type="button"
            onClick={() => setShowNewClienteModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Registrar Nuevo Cliente
          </button>
        </div>
      </div>

      {/* 2. Tarjetas de Resumen de Cartera */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Clientes Registrados</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{clientes.length}</p>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Aislados en {currentEmpresa?.nombre || 'tu empresa'}
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Saldo Pendiente por Cobrar (CXC)</p>
            <p className="text-2xl font-black text-amber-600 mt-1">
              Q {totalCarteraCredito.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </p>
            <span className="text-[11px] text-amber-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" /> {creditSales.length} venta(s) pendiente(s) o con abono parcial
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Abonos Parciales Recibidos</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">
              Q {totalRecuperadoEnCurso.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </p>
            <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
              En cuentas activas de cartera
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
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'directorio'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Directorio de Clientes ({clientes.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('cxc')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'cxc'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          Cuentas por Cobrar & Abonos ({creditSales.length})
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
                placeholder="Buscar cliente por nombre, NIT o teléfono..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Segmentación comercial por tipo de cliente
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Cliente / Razón Social</th>
                  <th className="py-3 px-4">NIT</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Contacto & Teléfono</th>
                  <th className="py-3 px-4">Crédito Concedido</th>
                  <th className="py-3 px-4 text-right">Saldo Pendiente</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedDirectorio.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="font-semibold text-slate-600">No se encontraron clientes</p>
                      <p className="text-xs text-slate-400 mt-1">Prueba cambiando el término de búsqueda o registra uno nuevo.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedDirectorio.map((cliente) => {
                    const saldoReal = saldoByClientId[cliente.id_cliente] ?? cliente.saldo_actual;
                    return (
                      <tr key={cliente.id_cliente} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{cliente.nombre_completo}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate max-w-xs">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            {cliente.direccion}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{cliente.nit}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              cliente.tipo_cliente === 'vip'
                                ? 'bg-purple-100 text-purple-700'
                                : cliente.tipo_cliente === 'mayorista'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {cliente.tipo_cliente} ({cliente.descuento_aplicable}% desc.)
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
                            Q {cliente.limite_credito.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {cliente.dias_credito > 0 ? `${cliente.dias_credito} días de plazo` : 'Solo Contado'}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-sm">
                          {saldoReal > 0 ? (
                            <span className="text-amber-600">
                              Q {saldoReal.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                            </span>
                          ) : (
                            <span className="text-emerald-600">Al Día (Q 0.00)</span>
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
                              Ver Créditos
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
                placeholder="Buscar por cliente, NIT o # de venta..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              Saldo Total Adeudado: Q {totalCarteraCredito.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Venta / Fecha</th>
                  <th className="py-3 px-4">Cliente / NIT</th>
                  <th className="py-3 px-4 text-right">Total Venta</th>
                  <th className="py-3 px-4 text-right">Abonado</th>
                  <th className="py-3 px-4 text-right">Saldo Pendiente</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones (Abono / PDF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loadingCredits ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Loader2 className="w-8 h-8 mx-auto mb-2 text-indigo-500 animate-spin" />
                      <p className="font-semibold text-slate-600">Cargando cuentas por cobrar desde MySQL...</p>
                    </td>
                  </tr>
                ) : paginatedCredits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Clock className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="font-semibold text-slate-600">No hay cuentas por cobrar pendientes</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Cuando registres una venta al Crédito desde el Punto de Venta, aparecerá aquí para controlar sus abonos parciales y generar su PDF.
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
                            <div className="font-bold text-slate-800">{credit.cliente.nombre_completo}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              NIT: {credit.cliente.nit}
                              {credit.cliente.telefono ? ` • Tel: ${credit.cliente.telefono}` : ''}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-700">
                            Q {credit.total.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="font-mono font-bold text-emerald-700">
                              Q {credit.pagado.toFixed(2)}
                            </div>
                            <div className="w-20 ml-auto bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${progressPct}%` }} />
                            </div>
                            <div className="text-[9.5px] text-slate-400 mt-0.5">
                              {credit.pagos.length} abono(s) • {progressPct}%
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-black text-rose-600 text-sm">
                            Q {credit.saldo_pendiente.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {credit.estado_pago === 'parcial' || credit.pagado > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-800 border border-amber-200">
                                Abono Parcial
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200">
                                Pendiente
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
                                <span>Registrar Abono</span>
                              </button>

                              <button
                                type="button"
                                disabled={downloadingPdfId === credit.id}
                                onClick={() => handleDownloadPdf(credit.id)}
                                className="px-2.5 py-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                title="Descargar PDF elegante con productos, abonos y saldo pendiente"
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
                                title="Ver historial de abonos parciales"
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
                                    Historial de Abonos Registrados — {credit.codigo}
                                  </span>
                                  <span className="text-[11px] text-slate-500">
                                    Total: <strong>Q {credit.total.toFixed(2)}</strong> • Pagado: <strong className="text-emerald-700">Q {credit.pagado.toFixed(2)}</strong> • Pendiente: <strong className="text-rose-600">Q {credit.saldo_pendiente.toFixed(2)}</strong>
                                  </span>
                                </div>
                                {credit.pagos.length === 0 ? (
                                  <p className="text-[11px] text-slate-400 italic">
                                    Aún no se han registrado abonos para esta cuenta. Usa &quot;Registrar Abono&quot; para ingresar un pago parcial o total.
                                  </p>
                                ) : (
                                  <table className="w-full text-[11px]">
                                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px]">
                                      <tr>
                                        <th className="py-1.5 px-3 text-left">Fecha</th>
                                        <th className="py-1.5 px-3 text-left">Forma de Pago</th>
                                        <th className="py-1.5 px-3 text-left">Referencia / Recibo</th>
                                        <th className="py-1.5 px-3 text-right">Monto Abonado</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {credit.pagos.map((p) => (
                                        <tr key={p.id_pago}>
                                          <td className="py-1.5 px-3 font-mono text-slate-600">{p.fecha_pago}</td>
                                          <td className="py-1.5 px-3 capitalize font-semibold text-slate-700">{p.metodo_pago}</td>
                                          <td className="py-1.5 px-3 font-mono text-slate-500">{p.referencia_interna || '—'}</td>
                                          <td className="py-1.5 px-3 text-right font-mono font-black text-emerald-700">
                                            + Q {p.monto.toFixed(2)}
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
            Mostrando <strong className="text-slate-800">{currentTotalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> a{' '}
            <strong className="text-slate-800">{Math.min(currentPage * itemsPerPage, currentTotalCount)}</strong> de{' '}
            <strong className="text-slate-800">{currentTotalCount.toLocaleString()}</strong> registros
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Anterior
            </button>
            <span className="px-3 py-1.5 font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg">
              Pág. {currentPage} de {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              Siguiente <ChevronRight className="w-3.5 h-3.5" />
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
                  Registrar Abono (Parcial o Total)
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {selectedCredit.codigo} • {selectedCredit.cliente.nombre_completo}
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
                  <span className="text-[10px] text-slate-400 font-bold block">Total Venta</span>
                  <span className="font-mono font-black text-slate-800">Q {selectedCredit.total.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Ya Abonado</span>
                  <span className="font-mono font-black text-emerald-700">Q {selectedCredit.pagado.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Saldo Pendiente</span>
                  <span className="font-mono font-black text-rose-600">Q {selectedCredit.saldo_pendiente.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">Monto a Abonar Hoy (Q):</label>
                  <div className="flex items-center gap-1">
                    {[
                      { label: '25%', mult: 0.25 },
                      { label: '50%', mult: 0.5 },
                      { label: 'Todo (100%)', mult: 1 }
                    ].map((opt) => (
                      <button
                        key={opt.label}
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
                    className={`mt-2 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-between ${
                      nuevoSaldoPreview <= 0.01
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    <span>
                      {nuevoSaldoPreview <= 0.01 ? '✅ Quedará PAGADA COMPLETAMENTE' : '📌 Abono Parcial — Nuevo saldo:'}
                    </span>
                    <span className="font-mono font-black">Q {nuevoSaldoPreview.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Forma de Pago del Abono:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'efectivo' as const, label: 'Efectivo' },
                    { id: 'tarjeta' as const, label: 'Tarjeta' },
                    { id: 'transferencia' as const, label: 'Transferencia' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMetodoAbono(m.id)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        metodoAbono === m.id
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
                <label className="block font-bold text-slate-700 mb-1">No. de Recibo / Boleta / Referencia (opcional):</label>
                <input
                  type="text"
                  placeholder="Ej. REC-0045, Boleta BI #88291..."
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingAbono}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSavingAbono ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Guardar Abono</span>
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
                Registrar Nuevo Cliente
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
                  <label className="block font-semibold text-slate-700 mb-1">Nombre / Razón Social:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Comercial Los Ángeles"
                    value={newCliente.nombre}
                    onChange={(e) => setNewCliente({ ...newCliente, nombre: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Apellido / Tipo Sociedad:</label>
                  <input
                    type="text"
                    placeholder="Ej. S.A. o de Martínez"
                    value={newCliente.apellido}
                    onChange={(e) => setNewCliente({ ...newCliente, apellido: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIT Tributario:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 1234567-8 o CF"
                    value={newCliente.nit}
                    onChange={(e) => setNewCliente({ ...newCliente, nit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Cliente:</label>
                  <select
                    value={newCliente.tipo_cliente}
                    onChange={(e) => setNewCliente({ ...newCliente, tipo_cliente: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="normal">Normal</option>
                    <option value="mayorista">Mayorista</option>
                    <option value="vip">Especial / Corporativo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teléfono:</label>
                  <input
                    type="text"
                    placeholder="+502 2000-0000"
                    value={newCliente.telefono}
                    onChange={(e) => setNewCliente({ ...newCliente, telefono: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Correo Electrónico:</label>
                  <input
                    type="email"
                    placeholder="cliente@correo.com"
                    value={newCliente.email}
                    onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Días de Crédito:</label>
                  <input
                    type="number"
                    min="0"
                    value={newCliente.dias_credito}
                    onChange={(e) => setNewCliente({ ...newCliente, dias_credito: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Descuento (%):</label>
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
                  <label className="block font-semibold text-slate-700 mb-1">Límite Crédito (Q):</label>
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
                <label className="block font-semibold text-slate-700 mb-1">Dirección de Entrega / Facturación:</label>
                <input
                  type="text"
                  placeholder="Zona, Dirección completa..."
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingCliente}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSavingCliente ? 'Guardando...' : 'Guardar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
