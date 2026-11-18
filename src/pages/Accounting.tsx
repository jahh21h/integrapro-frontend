import { useState } from 'react';
import { 
  Landmark, 
  BookOpen, 
  FileSpreadsheet, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  X, 
  PieChart, 
  Calendar, 
  Layers, 
  Printer, 
  Download 
} from 'lucide-react';
import { CuentaContable, Partida, DeclaracionFiscalSAT, RetencionSAT, EmpresaSaaS } from '../types';
import { calculateMonthlyTaxSettlement, getTipoRegimenSAT } from '../utils/tax';
import { exportToExcelCsv } from '../utils/export';

interface AccountingProps {
  currentEmpresa?: EmpresaSaaS;
}

export default function Accounting({ currentEmpresa }: AccountingProps = {}) {
  const empresaActiva: EmpresaSaaS = currentEmpresa || {
    id: 1,
    nombre: 'Corporación Comercial IntegraPro S.A.',
    razon_social: 'IntegraPro Soluciones Empresariales Sociedad Anónima',
    nit: '10429182-3',
    pais: 'GT',
    regimen: 'General (IVA 12%)',
    plan: 'standard',
    activa: true,
    telefono: '+502 2334-9000',
    email: 'facturacion@integrapro.com',
    direccion: '7a Avenida 12-45 Zona 9, Guatemala'
  };

  const tipoRegimen = getTipoRegimenSAT(empresaActiva.regimen);
  const liquidacionActual = calculateMonthlyTaxSettlement(106800.00, 37200.00, 850.00, empresaActiva.regimen);

  const [activeTab, setActiveTab] = useState<'catalogo' | 'partidas' | 'sat' | 'retenciones' | 'reportes'>('catalogo');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPartidaModal, setShowNewPartidaModal] = useState(false);
  const [showNewCuentaModal, setShowNewCuentaModal] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState<Partida | null>(null);

  // Catálogo de Cuentas Contables conforme al modelo CuentaContable de Laravel
  const [cuentas, setCuentas] = useState<CuentaContable[]>([
    { id_cuenta: 1, codigo: '1.1.01', nombre: 'Caja General y Sucursales', tipo: 'activo', id_padre: null, nivel: 3, activa: true, saldo: 45890.00 },
    { id_cuenta: 2, codigo: '1.1.02', nombre: 'Bancos del Sistema (Cuentas Monetarias)', tipo: 'activo', id_padre: null, nivel: 3, activa: true, saldo: 128450.50 },
    { id_cuenta: 3, codigo: '1.1.05', nombre: 'Clientes / Cuentas por Cobrar Comerciales', tipo: 'activo', id_padre: null, nivel: 3, activa: true, saldo: 34200.00 },
    { id_cuenta: 4, codigo: '1.1.08', nombre: 'Inventario de Mercaderías para la Venta', tipo: 'activo', id_padre: null, nivel: 3, activa: true, saldo: 84320.00 },
    { id_cuenta: 5, codigo: '1.1.09', nombre: 'IVA por Cobrar (Crédito Fiscal 12%)', tipo: 'activo', id_padre: null, nivel: 3, activa: true, saldo: 3985.71 },
    { id_cuenta: 6, codigo: '2.1.01', nombre: 'Proveedores Locales (Cuentas por Pagar)', tipo: 'pasivo', id_padre: null, nivel: 3, activa: true, saldo: 27650.00 },
    { id_cuenta: 7, codigo: '2.1.02', nombre: 'IVA por Pagar (Débito Fiscal 12%)', tipo: 'pasivo', id_padre: null, nivel: 3, activa: true, saldo: 11442.86 },
    { id_cuenta: 8, codigo: '2.1.04', nombre: 'Retenciones Tributarias por Enterar SAT', tipo: 'pasivo', id_padre: null, nivel: 3, activa: true, saldo: 1450.00 },
    { id_cuenta: 9, codigo: '2.1.05', nombre: 'Cuotas Patronales y Laborales IGSS por Pagar', tipo: 'pasivo', id_padre: null, nivel: 3, activa: true, saldo: 2890.00 },
    { id_cuenta: 10, codigo: '3.1.01', nombre: 'Capital Social Suscrito y Pagado', tipo: 'capital', id_padre: null, nivel: 2, activa: true, saldo: 150000.00 },
    { id_cuenta: 11, codigo: '4.1.01', nombre: 'Ingresos por Ventas de Mercaderías', tipo: 'ingreso', id_padre: null, nivel: 3, activa: true, saldo: 95357.14 },
    { id_cuenta: 12, codigo: '5.1.01', nombre: 'Costo de Ventas y Mercadería Adquirida', tipo: 'costo', id_padre: null, nivel: 3, activa: true, saldo: 54100.00 },
    { id_cuenta: 13, codigo: '6.1.01', nombre: 'Sueldos y Salarios Administrativos', tipo: 'gasto', id_padre: null, nivel: 3, activa: true, saldo: 18500.00 },
    { id_cuenta: 14, codigo: '6.1.02', nombre: 'Bonificación Incentivo Dcto. 78-89', tipo: 'gasto', id_padre: null, nivel: 3, activa: true, saldo: 1250.00 },
  ]);

  // Libro Diario / Partidas sincronizado con modelo Partida y PartidaDetalle de Laravel
  const [partidas, setPartidas] = useState<Partida[]>([
    {
      id_partida: 1,
      numero: 145,
      fecha: '2026-11-15',
      concepto: 'Registro de ventas globales del día según corte Z del sistema POS',
      referencia_tipo: 'Venta',
      referencia_id: 894,
      total_debe: 12500.00,
      total_haber: 12500.00,
      detalles: [
        { id_cuenta: 1, cuenta_codigo: '1.1.01', cuenta_nombre: 'Caja General y Sucursales', debe: 12500.00, haber: 0.00, glosa: 'Ingreso en efectivo y tarjeta' },
        { id_cuenta: 11, cuenta_codigo: '4.1.01', cuenta_nombre: 'Ingresos por Ventas de Mercaderías', debe: 0.00, haber: 11160.71, glosa: 'Ventas brutas sin IVA' },
        { id_cuenta: 7, cuenta_codigo: '2.1.02', cuenta_nombre: 'IVA por Pagar (Débito Fiscal 12%)', debe: 0.00, haber: 1339.29, glosa: 'IVA fiscal devengado 12%' },
      ]
    },
    {
      id_partida: 2,
      numero: 144,
      fecha: '2026-11-14',
      concepto: 'Compra de inventario al crédito a Distribuidora Central de Alimentos S.A.',
      referencia_tipo: 'Compra',
      referencia_id: 101,
      total_debe: 18500.00,
      total_haber: 18500.00,
      detalles: [
        { id_cuenta: 4, cuenta_codigo: '1.1.08', cuenta_nombre: 'Inventario de Mercaderías para la Venta', debe: 16517.86, haber: 0.00, glosa: 'Costo de mercadería ingresada' },
        { id_cuenta: 5, cuenta_codigo: '1.1.09', cuenta_nombre: 'IVA por Cobrar (Crédito Fiscal 12%)', debe: 1982.14, haber: 0.00, glosa: 'IVA crédito fiscal 12%' },
        { id_cuenta: 6, cuenta_codigo: '2.1.01', cuenta_nombre: 'Proveedores Locales (Cuentas por Pagar)', debe: 0.00, haber: 18500.00, glosa: 'Factura crédito por pagar' },
      ]
    },
    {
      id_partida: 3,
      numero: 143,
      fecha: '2026-11-10',
      concepto: 'Pago de planilla de sueldos correspondiente a la primera quincena',
      referencia_tipo: 'Nomina',
      referencia_id: 52,
      total_debe: 19750.00,
      total_haber: 19750.00,
      detalles: [
        { id_cuenta: 13, cuenta_codigo: '6.1.01', cuenta_nombre: 'Sueldos y Salarios Administrativos', debe: 18500.00, haber: 0.00, glosa: 'Sueldo ordinario base' },
        { id_cuenta: 14, cuenta_codigo: '6.1.02', cuenta_nombre: 'Bonificación Incentivo Dcto. 78-89', debe: 1250.00, haber: 0.00, glosa: 'Bonificación legal' },
        { id_cuenta: 9, cuenta_codigo: '2.1.05', cuenta_nombre: 'Cuotas Patronales y Laborales IGSS por Pagar', debe: 0.00, haber: 893.55, glosa: 'Descuento laboral 4.83%' },
        { id_cuenta: 2, cuenta_codigo: '1.1.02', cuenta_nombre: 'Bancos del Sistema (Cuentas Monetarias)', debe: 0.00, haber: 18856.45, glosa: 'Pago electrónico de nómina' },
      ]
    }
  ]);

  // Declaraciones Fiscales SAT (sincronizado con DeclaracionFiscal.php)
  const [declaraciones] = useState<DeclaracionFiscalSAT[]>([
    {
      id_declaracion: 1,
      mes: 10,
      anio: 2026,
      ventas_totales: 106800.00,
      base_imponible_ventas: 95357.14,
      iva_debito_fiscal: 11442.86,
      compras_totales: 37200.00,
      base_imponible_compras: 33214.29,
      iva_credito_fiscal: 3985.71,
      total_retenciones_iva: 850.00,
      impuesto_a_pagar: 6607.15,
      remanente_credito: 0.00,
      estado: 'pagada',
      fecha_pago: '2026-11-05',
      numero_formulario_sat: 'SAT-2046-8812903'
    },
    {
      id_declaracion: 2,
      mes: 9,
      anio: 2026,
      ventas_totales: 98500.00,
      base_imponible_ventas: 87946.43,
      iva_debito_fiscal: 10553.57,
      compras_totales: 42100.00,
      base_imponible_compras: 37589.29,
      iva_credito_fiscal: 4510.71,
      total_retenciones_iva: 920.00,
      impuesto_a_pagar: 5122.86,
      remanente_credito: 0.00,
      estado: 'pagada',
      fecha_pago: '2026-10-06',
      numero_formulario_sat: 'SAT-2046-7734109'
    }
  ]);

  // Retenciones SAT (sincronizado con Retencion.php)
  const [retenciones] = useState<RetencionSAT[]>([
    {
      id_retencion: 1,
      tipo: 'iva_recibida',
      entidad_nombre: 'Banco Industrial S.A. (Agente de Retención)',
      numero_documento: 'RET-IVA-89234',
      fecha: '2026-11-14',
      mes: 11,
      anio: 2026,
      monto: 340.50,
      descripcion: 'Retención de IVA por cobros POS tarjeta crédito'
    },
    {
      id_retencion: 2,
      tipo: 'isr_opcional',
      entidad_nombre: 'Importaciones y Bebidas del Caribe Ltda.',
      numero_documento: 'SAT-1911-55214',
      fecha: '2026-11-12',
      mes: 11,
      anio: 2026,
      monto: 437.50,
      descripcion: 'Constancia Retención ISR Factura Especial 5%'
    },
    {
      id_retencion: 3,
      tipo: 'isr_asalariado',
      entidad_nombre: 'Carlos Mendoza (Gerente Comercial)',
      numero_documento: 'NOMINA-52-ISR',
      fecha: '2026-11-10',
      mes: 11,
      anio: 2026,
      monto: 215.00,
      descripcion: 'Retención ISR relación de dependencia mensual'
    }
  ]);

  // Formulario nueva partida manual
  const [newPartida, setNewPartida] = useState({
    fecha: new Date().toISOString().split('T')[0],
    concepto: '',
    detalles: [
      { id_cuenta: 1, debe: 0, haber: 0, glosa: '' },
      { id_cuenta: 11, debe: 0, haber: 0, glosa: '' }
    ]
  });

  // Formulario nueva cuenta contable
  const [newCuenta, setNewCuenta] = useState({
    codigo: '',
    nombre: '',
    tipo: 'activo' as const,
    nivel: 3
  });

  const handleDetalleChange = (index: number, field: string, value: any) => {
    const updated = [...newPartida.detalles];
    updated[index] = { ...updated[index], [field]: value };
    setNewPartida({ ...newPartida, detalles: updated });
  };

  const addDetalleRow = () => {
    setNewPartida({
      ...newPartida,
      detalles: [...newPartida.detalles, { id_cuenta: 1, debe: 0, haber: 0, glosa: '' }]
    });
  };

  const removeDetalleRow = (index: number) => {
    if (newPartida.detalles.length <= 2) return;
    setNewPartida({
      ...newPartida,
      detalles: newPartida.detalles.filter((_, i) => i !== index)
    });
  };

  const totalDebeNuevo = newPartida.detalles.reduce((acc, d) => acc + (parseFloat(d.debe as any) || 0), 0);
  const totalHaberNuevo = newPartida.detalles.reduce((acc, d) => acc + (parseFloat(d.haber as any) || 0), 0);
  const estaCuadrada = Math.abs(totalDebeNuevo - totalHaberNuevo) < 0.01 && totalDebeNuevo > 0;

  const handleSavePartida = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estaCuadrada) {
      alert('Error: La partida contable debe estar cuadrada. El Total Debe debe ser igual al Total Haber.');
      return;
    }

    const partidaCreada: Partida = {
      id_partida: Date.now(),
      numero: partidas.length + 146,
      fecha: newPartida.fecha,
      concepto: newPartida.concepto || 'Asiento de ajuste contable manual',
      total_debe: totalDebeNuevo,
      total_haber: totalHaberNuevo,
      detalles: newPartida.detalles.map(d => {
        const cta = cuentas.find(c => c.id_cuenta === Number(d.id_cuenta));
        return {
          id_cuenta: Number(d.id_cuenta),
          cuenta_codigo: cta?.codigo || '0.0.00',
          cuenta_nombre: cta?.nombre || 'Cuenta',
          debe: parseFloat(d.debe as any) || 0,
          haber: parseFloat(d.haber as any) || 0,
          glosa: d.glosa || newPartida.concepto
        };
      })
    };

    setPartidas([partidaCreada, ...partidas]);
    setShowNewPartidaModal(false);
    setNewPartida({
      fecha: new Date().toISOString().split('T')[0],
      concepto: '',
      detalles: [
        { id_cuenta: 1, debe: 0, haber: 0, glosa: '' },
        { id_cuenta: 11, debe: 0, haber: 0, glosa: '' }
      ]
    });
  };

  const handleSaveCuenta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCuenta.codigo || !newCuenta.nombre) return;
    const creada: CuentaContable = {
      id_cuenta: Date.now(),
      codigo: newCuenta.codigo,
      nombre: newCuenta.nombre,
      tipo: newCuenta.tipo,
      id_padre: null,
      nivel: newCuenta.nivel,
      activa: true,
      saldo: 0.00
    };
    setCuentas([...cuentas, creada].sort((a, b) => a.codigo.localeCompare(b.codigo)));
    setShowNewCuentaModal(false);
    setNewCuenta({
      codigo: '',
      nombre: '',
      tipo: 'activo',
      nivel: 3
    });
  };

  const handleExportAccounting = () => {
    if (activeTab === 'partidas') {
      const data = partidas.map(p => ({
        'No. Partida': p.numero,
        'Fecha': p.fecha,
        'Concepto': p.concepto,
        'Referencia': p.referencia_tipo || 'Manual',
        'Total Debe (Q)': p.total_debe.toFixed(2),
        'Total Haber (Q)': p.total_haber.toFixed(2),
        'Cuadrada': Math.abs(p.total_debe - p.total_haber) < 0.01 ? 'SÍ' : 'NO'
      }));
      exportToExcelCsv(data, `libro_diario_${empresaActiva.nombre.replace(/\s+/g, '_')}`);
    } else {
      const data = cuentas.map(c => ({
        'Código': c.codigo,
        'Nombre': c.nombre,
        'Clasificación': c.tipo.toUpperCase(),
        'Nivel': c.nivel,
        'Estado': c.activa ? 'Activa' : 'Inactiva',
        'Saldo Actual (Q)': (c.saldo || 0).toFixed(2)
      }));
      exportToExcelCsv(data, `nomenclatura_contable_${empresaActiva.nombre.replace(/\s+/g, '_')}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header con métricas contables y fiscales */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Landmark className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Contabilidad General & Fiscalidad SAT
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Nomenclatura contable de Guatemala, Libro Diario con cuadratura estricta Debe/Haber y cálculo fiscal SAT (IVA 12% / Retenciones).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleExportAccounting}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors border border-slate-200 shadow-sm"
            title="Exportar datos contables a Excel CSV"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Exportar Excel</span>
          </button>
          <button 
            type="button"
            onClick={() => setShowNewCuentaModal(true)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors border border-slate-200"
          >
            <Plus className="w-4 h-4 text-slate-600" />
            Nueva Cuenta
          </button>
          <button 
            type="button"
            onClick={() => setShowNewPartidaModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Registrar Partida Diario
          </button>
        </div>
      </div>

      {/* 2. Tarjetas de Resumen Contable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Activo Circulante</p>
            <p className="text-2xl font-black text-slate-800 mt-1">
              Q296,846.21
            </p>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Caja, Bancos e Inventario
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Landmark className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Pasivo Exigible</p>
            <p className="text-2xl font-black text-amber-600 mt-1">
              Q43,432.86
            </p>
            <span className="text-[11px] text-slate-500 font-medium mt-1">
              Proveedores + IVA Débito SAT
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">IVA a Pagar SAT (Mes)</p>
            <p className="text-2xl font-black text-rose-600 mt-1">
              Q7,457.15
            </p>
            <span className="text-[11px] text-rose-500 font-medium flex items-center gap-1 mt-1">
              Débito Q11.4k - Crédito Q3.9k
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Partidas Cuadradas</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              100%
            </p>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              Balance General en Cero
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Selector de Pestañas */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-2xl overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('catalogo')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'catalogo'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          Nomenclatura Contable ({cuentas.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('partidas')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'partidas'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Libro Diario / Partidas ({partidas.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sat')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'sat'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Declaraciones Fiscales SAT (IVA)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('retenciones')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'retenciones'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Retenciones SAT ({retenciones.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reportes')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'reportes'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <PieChart className="w-4 h-4" />
          Estados Financieros
        </button>
      </div>

      {/* 4. Contenido de las pestañas */}
      {activeTab === 'catalogo' && (
        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por código o nombre de cuenta..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Estructura Oficial del Plan de Cuentas (Guatemala)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Código</th>
                  <th className="py-3 px-4">Nombre de la Cuenta</th>
                  <th className="py-3 px-4">Clasificación / Tipo</th>
                  <th className="py-3 px-4 text-center">Nivel</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                  <th className="py-3 px-4 text-right">Saldo Actual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {cuentas
                  .filter(c => 
                    c.codigo.includes(searchTerm) || 
                    c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((cuenta) => (
                    <tr key={cuenta.id_cuenta} className="hover:bg-slate-50/80 font-sans">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        {cuenta.codigo}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {cuenta.nombre}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          cuenta.tipo === 'activo' ? 'bg-emerald-100 text-emerald-800' :
                          cuenta.tipo === 'pasivo' ? 'bg-amber-100 text-amber-800' :
                          cuenta.tipo === 'capital' ? 'bg-blue-100 text-blue-800' :
                          cuenta.tipo === 'ingreso' ? 'bg-indigo-100 text-indigo-800' :
                          cuenta.tipo === 'costo' ? 'bg-purple-100 text-purple-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {cuenta.tipo}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-500 font-mono">
                        Nivel {cuenta.nivel}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                          Activa
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-slate-900 text-sm">
                        Q{(cuenta.saldo || 0).toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'partidas' && (
        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Libro Diario General (Asientos Contables)</h2>
            <span className="text-xs text-slate-500">{partidas.length} Partidas Registradas</span>
          </div>

          <div className="divide-y divide-slate-200">
            {partidas.map((partida) => (
              <div key={partida.id_partida} className="p-5 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-mono font-bold rounded-lg text-xs border border-indigo-200/60">
                      Partida No. {partida.numero}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {partida.fecha}
                    </div>
                    {partida.referencia_tipo && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                        Ref: {partida.referencia_tipo} #{partida.referencia_id}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Cuadrada: Q{partida.total_debe.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedPartida(partida)}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg"
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-700 font-medium mb-3">
                  <span className="text-slate-400 font-semibold">Concepto: </span>
                  {partida.concepto}
                </p>

                {/* Subtabla de Detalles de la Partida */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[10px] uppercase">
                      <tr>
                        <th className="py-2 px-3">Código</th>
                        <th className="py-2 px-3">Cuenta Contable</th>
                        <th className="py-2 px-3">Glosa</th>
                        <th className="py-2 px-3 text-right">Debe (Q)</th>
                        <th className="py-2 px-3 text-right">Haber (Q)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {partida.detalles.map((det, i) => (
                        <tr key={i} className="hover:bg-slate-50/80">
                          <td className="py-2 px-3 font-mono text-slate-500">{det.cuenta_codigo}</td>
                          <td className="py-2 px-3 font-medium text-slate-800">{det.cuenta_nombre}</td>
                          <td className="py-2 px-3 text-slate-500 italic text-[11px]">{det.glosa}</td>
                          <td className="py-2 px-3 text-right font-bold text-slate-800">
                            {det.debe > 0 ? `Q${det.debe.toFixed(2)}` : '-'}
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-slate-800">
                            {det.haber > 0 ? `Q${det.haber.toFixed(2)}` : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100/80 font-bold border-t border-slate-200 text-xs text-slate-900">
                      <tr>
                        <td colSpan={3} className="py-2 px-3 text-right">Sumas Iguales:</td>
                        <td className="py-2 px-3 text-right text-indigo-700 font-black">Q{partida.total_debe.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right text-indigo-700 font-black">Q{partida.total_haber.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sat' && (
        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm overflow-hidden p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-black px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-lg">
                  {liquidacionActual.codigoFormulario}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  • Empresa: <strong className="text-slate-700">{empresaActiva.nombre}</strong>
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-800">
                {tipoRegimen === 'general' 
                  ? 'Liquidación Mensual de IVA General (SAT-2046)' 
                  : tipoRegimen === 'pequeno_contribuyente'
                  ? 'Liquidación Mensual de Pequeño Contribuyente (SAT-2047)'
                  : 'Régimen Informal / Exento de IVA (Sin Declaración Mensual)'}
              </h2>
              <p className="text-xs text-slate-500">
                {tipoRegimen === 'general'
                  ? 'Cálculo de Débito Fiscal contra Crédito Fiscal y aplicación de retenciones.'
                  : tipoRegimen === 'pequeno_contribuyente'
                  ? 'Cálculo directo del 5% sobre ventas brutas facturadas (Art. 47 al 50 Decreto 27-92 SAT).'
                  : 'Los negocios en régimen informal/exento no generan débito fiscal ni declaran formularios SAT-2046/2047.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 font-black text-xs rounded-xl border ${
                tipoRegimen === 'general'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : tipoRegimen === 'pequeno_contribuyente'
                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {empresaActiva.regimen}
              </span>
            </div>
          </div>

          {tipoRegimen === 'exento' && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
              <div>
                <p className="font-bold">Régimen Informal / No Emisor de Factura Electrónica FEL</p>
                <p className="mt-0.5 text-amber-700">Esta empresa opera en modalidad exenta / informal. Las operaciones en caja generan comprobantes internos y el impuesto a enterar ante SAT es Q 0.00.</p>
              </div>
            </div>
          )}

          {/* Simulador / Estado del Mes Actual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                1. Ventas & Débito Fiscal / Impuesto Bruto
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Ventas Brutas Facturadas:</span>
                  <span className="font-bold text-slate-900">Q {liquidacionActual.ventasBrutas.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Base Imponible Ventas:</span>
                  <span className="font-medium text-slate-700">Q {liquidacionActual.baseImponibleVentas.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-indigo-700 font-bold border-t border-slate-200 pt-2 text-sm">
                  <span>
                    {tipoRegimen === 'general' 
                      ? 'Débito Fiscal Generado (12%):' 
                      : tipoRegimen === 'pequeno_contribuyente'
                      ? 'Impuesto Determinado (5% SAT):'
                      : 'Impuesto Determinado (0% Exento):'}
                  </span>
                  <span>Q {liquidacionActual.impuestoDeterminado.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${tipoRegimen === 'general' ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                2. Compras & Crédito Fiscal
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Compras y Gastos del Mes:</span>
                  <span className="font-bold text-slate-900">Q {liquidacionActual.comprasBrutas.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Base Imponible Compras:</span>
                  <span className="font-medium text-slate-700">Q {liquidacionActual.baseImponibleCompras.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className={`flex justify-between font-bold border-t border-slate-200 pt-2 text-sm ${
                  tipoRegimen === 'general' ? 'text-emerald-700' : 'text-slate-400'
                }`}>
                  <span>Crédito Fiscal Deducible:</span>
                  <span>Q {liquidacionActual.creditoFiscal.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</span>
                </div>
                {tipoRegimen === 'pequeno_contribuyente' && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 leading-tight">
                    ⚠️ {liquidacionActual.creditoFiscalExplicacion}
                  </p>
                )}
                {tipoRegimen === 'exento' && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 leading-tight">
                    ℹ️ Régimen no afecto a IVA. No aplica deducción de crédito fiscal en compras.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Liquidación Final */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            tipoRegimen === 'general' 
              ? 'bg-indigo-50/50 border-indigo-100' 
              : tipoRegimen === 'pequeno_contribuyente'
              ? 'bg-purple-50/50 border-purple-100'
              : 'bg-amber-50/50 border-amber-100'
          }`}>
            <div>
              <p className="text-xs font-semibold text-slate-500">Impuesto Neto Determinado:</p>
              <p className="text-xs text-slate-600 mt-0.5">
                {tipoRegimen === 'general'
                  ? `Débito (Q${liquidacionActual.debitoFiscal.toFixed(2)}) - Crédito (Q${liquidacionActual.creditoFiscal.toFixed(2)}) - Retenciones IVA (Q${liquidacionActual.retencionesIvaRecibidas.toFixed(2)})`
                  : tipoRegimen === 'pequeno_contribuyente'
                  ? `Impuesto 5% (Q${liquidacionActual.impuestoDeterminado.toFixed(2)}) - Retenciones IVA Recibidas (Q${liquidacionActual.retencionesIvaRecibidas.toFixed(2)})`
                  : 'Régimen Informal: 0.00% de Impuesto SAT (Exento de IVA)'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {tipoRegimen === 'exento' ? 'Total Tributario:' : `Total a Enterar a SAT (${liquidacionActual.codigoFormulario.split(' ')[0]}):`}
              </span>
              <p className="text-2xl font-black text-indigo-700">Q {liquidacionActual.totalAPagarSAT.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          {/* Historial de Declaraciones Presentadas */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Historial de Formularios Presentados ante SAT
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Período Fiscal</th>
                    <th className="py-2.5 px-3">No. Formulario SAT</th>
                    <th className="py-2.5 px-3 text-right">Débito Fiscal</th>
                    <th className="py-2.5 px-3 text-right">Crédito Fiscal</th>
                    <th className="py-2.5 px-3 text-right">Impuesto Pagado</th>
                    <th className="py-2.5 px-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {declaraciones.map((dec) => (
                    <tr key={dec.id_declaracion} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">
                        Mes {dec.mes} / {dec.anio}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">{dec.numero_formulario_sat}</td>
                      <td className="py-2.5 px-3 text-right text-slate-700 font-medium">Q{dec.iva_debito_fiscal.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right text-emerald-600 font-medium">Q{dec.iva_credito_fiscal.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right font-black text-indigo-700">Q{dec.impuesto_a_pagar.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                          Pagada SAT
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'retenciones' && (
        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Constancias de Retención SAT (IVA & ISR)</h2>
            <span className="text-xs text-slate-500">{retenciones.length} Constancias Registradas</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">No. Constancia / Documento</th>
                  <th className="py-3 px-4">Tipo Retención</th>
                  <th className="py-3 px-4">Entidad Retenedora / Colaborador</th>
                  <th className="py-3 px-4">Concepto</th>
                  <th className="py-3 px-4 text-right">Monto Retenido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {retenciones.map((ret) => (
                  <tr key={ret.id_retencion} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{ret.fecha}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{ret.numero_documento}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        ret.tipo === 'iva_recibida' ? 'bg-indigo-100 text-indigo-700' :
                        ret.tipo === 'isr_opcional' ? 'bg-purple-100 text-purple-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {ret.tipo === 'iva_recibida' ? 'Retención IVA Recibida' :
                         ret.tipo === 'isr_opcional' ? 'Retención ISR 5%' : 'ISR Asalariados'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{ret.entidad_nombre}</td>
                    <td className="py-3.5 px-4 text-slate-500">{ret.descripcion}</td>
                    <td className="py-3.5 px-4 text-right font-black text-slate-900 text-sm">
                      Q{ret.monto.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reportes' && (
        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Estados Financieros Ejecutivos</h2>
              <p className="text-xs text-slate-500">Balance General y Estado de Resultados consolidado.</p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Imprimir Balance
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Balance General Sintético */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Landmark className="w-4 h-4 text-indigo-600" />
                Balance General (Situación Financiera)
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>ACTIVO TOTAL:</span>
                  <span>Q296,846.21</span>
                </div>
                <div className="pl-3 space-y-1 text-slate-600 text-[11px]">
                  <div className="flex justify-between">
                    <span>• Disponible (Caja y Bancos):</span>
                    <span>Q174,340.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Exigible (Clientes y Cuentas por Cobrar):</span>
                    <span>Q34,200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Realizable (Inventario):</span>
                    <span>Q84,320.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Crédito Fiscal IVA:</span>
                    <span>Q3,985.71</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-slate-800 border-t border-slate-200 pt-2">
                  <span>PASIVO TOTAL:</span>
                  <span>Q43,432.86</span>
                </div>
                <div className="pl-3 space-y-1 text-slate-600 text-[11px]">
                  <div className="flex justify-between">
                    <span>• Proveedores Comerciales:</span>
                    <span>Q27,650.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Obligaciones Fiscales SAT:</span>
                    <span>Q12,892.86</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Cuotas Laborales IGSS:</span>
                    <span>Q2,890.00</span>
                  </div>
                </div>

                <div className="flex justify-between font-black text-indigo-700 border-t border-slate-300 pt-2 text-sm">
                  <span>PATRIMONIO / CAPITAL CONTABLE:</span>
                  <span>Q253,413.35</span>
                </div>
              </div>
            </div>

            {/* Estado de Resultados */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                Estado de Resultados (Pérdidas y Ganancias)
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Ingresos por Ventas Netas:</span>
                  <span className="text-emerald-700">Q95,357.14</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>(-) Costo de Mercadería Vendida:</span>
                  <span className="text-rose-600 font-semibold">(Q54,100.00)</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800 border-t border-slate-200 pt-1.5">
                  <span>Utilidad Bruta en Ventas:</span>
                  <span className="font-extrabold text-slate-900">Q41,257.14</span>
                </div>

                <div className="flex justify-between text-slate-600 pt-1">
                  <span>(-) Gastos de Operación y Sueldos:</span>
                  <span className="text-rose-600 font-semibold">(Q19,750.00)</span>
                </div>
                <div className="flex justify-between font-black text-emerald-700 border-t border-slate-300 pt-2 text-sm">
                  <span>UTILIDAD OPERACIONAL NETA:</span>
                  <span>Q21,507.14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Nueva Partida Contable */}
      {showNewPartidaModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Crear Asiento Contable (Libro Diario)
              </h3>
              <button
                type="button"
                onClick={() => setShowNewPartidaModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePartida} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fecha Asiento:</label>
                  <input
                    type="date"
                    required
                    value={newPartida.fecha}
                    onChange={(e) => setNewPartida({ ...newPartida, fecha: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Concepto General de la Partida:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Registro de ajuste contable por depreciaciones..."
                    value={newPartida.concepto}
                    onChange={(e) => setNewPartida({ ...newPartida, concepto: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Líneas Debe / Haber */}
              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800">Cuentas Contables y Movimientos</h4>
                  <button
                    type="button"
                    onClick={addDetalleRow}
                    className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Agregar Cuenta
                  </button>
                </div>

                <div className="space-y-2">
                  {newPartida.detalles.map((det, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="flex-1">
                        <select
                          value={det.id_cuenta}
                          onChange={(e) => handleDetalleChange(idx, 'id_cuenta', Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        >
                          {cuentas.map(c => (
                            <option key={c.id_cuenta} value={c.id_cuenta}>
                              {c.codigo} - {c.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-32">
                        <input
                          type="text"
                          placeholder="Glosa específica"
                          value={det.glosa}
                          onChange={(e) => handleDetalleChange(idx, 'glosa', e.target.value)}
                          className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div className="w-28">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Debe (Q)"
                          value={det.debe || ''}
                          onChange={(e) => handleDetalleChange(idx, 'debe', e.target.value)}
                          className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-right font-medium"
                        />
                      </div>
                      <div className="w-28">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Haber (Q)"
                          value={det.haber || ''}
                          onChange={(e) => handleDetalleChange(idx, 'haber', e.target.value)}
                          className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-right font-medium"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDetalleRow(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verificación de Cuadratura */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                estaCuadrada ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
              }`}>
                <div className="flex items-center gap-2">
                  {estaCuadrada ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                  )}
                  <div>
                    <span className={`font-bold block ${estaCuadrada ? 'text-emerald-800' : 'text-rose-800'}`}>
                      {estaCuadrada ? '¡Partida Balanceada y Cuadrada!' : 'Partida Descuadrada'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Diferencia: Q{Math.abs(totalDebeNuevo - totalHaberNuevo).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Debe</span>
                    <span className="text-base font-black text-slate-800">Q{totalDebeNuevo.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Haber</span>
                    <span className="text-base font-black text-slate-800">Q{totalHaberNuevo.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewPartidaModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!estaCuadrada}
                  className={`px-5 py-2 font-bold rounded-xl shadow-sm text-white ${
                    estaCuadrada ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-400 cursor-not-allowed'
                  }`}
                >
                  Registrar en Libro Diario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal Nueva Cuenta Contable */}
      {showNewCuentaModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-indigo-600" />
                Agregar Cuenta al Catálogo Contable
              </h3>
              <button
                type="button"
                onClick={() => setShowNewCuentaModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCuenta} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Código de Cuenta:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 1.1.10 o 6.1.05"
                  value={newCuenta.codigo}
                  onChange={(e) => setNewCuenta({ ...newCuenta, codigo: e.target.value })}
                  className="w-full px-3 py-2 font-mono font-bold text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre de la Cuenta:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Gastos de Combustible y Transporte"
                  value={newCuenta.nombre}
                  onChange={(e) => setNewCuenta({ ...newCuenta, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo / Naturaleza:</label>
                  <select
                    value={newCuenta.tipo}
                    onChange={(e) => setNewCuenta({ ...newCuenta, tipo: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="activo">1. Activo</option>
                    <option value="pasivo">2. Pasivo</option>
                    <option value="capital">3. Capital</option>
                    <option value="ingreso">4. Ingresos</option>
                    <option value="costo">5. Costos</option>
                    <option value="gasto">6. Gastos</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nivel Jerárquico:</label>
                  <select
                    value={newCuenta.nivel}
                    onChange={(e) => setNewCuenta({ ...newCuenta, nivel: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value={1}>Nivel 1 (Mayor General)</option>
                    <option value={2}>Nivel 2 (Sub-rubro)</option>
                    <option value={3}>Nivel 3 (Detalle Operativo)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewCuentaModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Guardar Cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Modal Ver Detalle de Partida */}
      {selectedPartida && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Partida Contable No. {selectedPartida.numero}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedPartida(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Fecha: {selectedPartida.fecha}</span>
                  {selectedPartida.referencia_tipo && <span>Ref: {selectedPartida.referencia_tipo} #{selectedPartida.referencia_id}</span>}
                </div>
                <div className="font-semibold text-slate-800">{selectedPartida.concepto}</div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-semibold text-slate-700">
                    <tr>
                      <th className="py-2 px-3">Cuenta</th>
                      <th className="py-2 px-3 text-right">Debe</th>
                      <th className="py-2 px-3 text-right">Haber</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedPartida.detalles.map((d, i) => (
                      <tr key={i}>
                        <td className="py-2 px-3">
                          <span className="font-mono text-slate-500 block text-[10px]">{d.cuenta_codigo}</span>
                          <span className="font-bold text-slate-800">{d.cuenta_nombre}</span>
                        </td>
                        <td className="py-2 px-3 text-right font-medium">{d.debe > 0 ? `Q${d.debe.toFixed(2)}` : '-'}</td>
                        <td className="py-2 px-3 text-right font-medium">{d.haber > 0 ? `Q${d.haber.toFixed(2)}` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-xs text-slate-900">
                    <tr>
                      <td className="py-2 px-3 text-right">Totales:</td>
                      <td className="py-2 px-3 text-right text-indigo-700 font-black">Q{selectedPartida.total_debe.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right text-indigo-700 font-black">Q{selectedPartida.total_haber.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Imprimir Partida
              </button>
              <button
                type="button"
                onClick={() => setSelectedPartida(null)}
                className="px-4 py-2 bg-slate-800 text-white font-semibold text-xs rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
