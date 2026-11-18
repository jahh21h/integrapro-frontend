import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  AlertTriangle, 
  ArrowUpRight, 
  PlusCircle, 
  Receipt, 
  Download,
  Building2,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Calculator,
  Calendar,
  Layers,
  Store,
  PieChart as PieChartIcon,
  BarChart3,
  LineChart as LineChartIcon,
  Video
} from 'lucide-react';
import LiveDashboardTab from '../components/LiveDashboardTab';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { EmpresaSaaS } from '../types';
import TimeFormatToggle from '../components/TimeFormatToggle';
import { getTipoRegimenSAT } from '../utils/tax';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const defaultEmpresasList: EmpresaSaaS[] = [
  {
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
  },
  {
    id: 2,
    nombre: 'Importadora y Distribuidora Los Andes',
    razon_social: 'Distribuidora Comercial Los Andes S.A.',
    nit: '8841920-5',
    pais: 'GT',
    regimen: 'Pequeño Contribuyente (5%)',
    plan: 'basic',
    activa: true,
    telefono: '+502 7832-1100',
    email: 'ventas@losandesgt.com',
    direccion: 'Calzada Roosevelt 14-20 Zona 11, Guatemala'
  },
  {
    id: 3,
    nombre: 'Farmacia & Droguería Central de Occidente',
    razon_social: 'Farmacéutica Central S.A.',
    nit: '3419024-1',
    pais: 'GT',
    regimen: 'General (IVA 12%)',
    plan: 'enterprise',
    activa: true,
    telefono: '+502 7765-4300',
    email: 'contacto@farmaciacentral.gt',
    direccion: '4a Calle 10-22 Zona 1, Quetzaltenango'
  }
];

const MESES = [
  { idx: 0, nombre: 'Enero', abrv: 'Ene' },
  { idx: 1, nombre: 'Febrero', abrv: 'Feb' },
  { idx: 2, nombre: 'Marzo', abrv: 'Mar' },
  { idx: 3, nombre: 'Abril', abrv: 'Abr' },
  { idx: 4, nombre: 'Mayo', abrv: 'May' },
  { idx: 5, nombre: 'Junio', abrv: 'Jun' },
  { idx: 6, nombre: 'Julio', abrv: 'Jul' },
  { idx: 7, nombre: 'Agosto', abrv: 'Ago' },
  { idx: 8, nombre: 'Septiembre', abrv: 'Sep' },
  { idx: 9, nombre: 'Octubre', abrv: 'Oct' },
  { idx: 10, nombre: 'Noviembre', abrv: 'Nov' },
  { idx: 11, nombre: 'Diciembre', abrv: 'Dic' },
];

interface DashboardProps {
  empresas?: EmpresaSaaS[];
  selectedEmpresaId?: number;
  onSelectEmpresa?: (id: number) => void;
}

export default function Dashboard({
  empresas = defaultEmpresasList,
  selectedEmpresaId = 1,
  onSelectEmpresa
}: DashboardProps) {
  const [activeEmpresaId, setActiveEmpresaId] = useState<number>(selectedEmpresaId);
  // Permite simular interactivamente el caso de tener solo 1 empresa configurada vs varias empresas
  const [singleCompanyMode, setSingleCompanyMode] = useState<boolean>(false);

  // Lista efectiva según si está en modo 1 empresa o multi-empresa
  const effectiveEmpresas = singleCompanyMode ? [empresas[0]] : empresas;
  const currentEmpresa = effectiveEmpresas.find(e => e.id === activeEmpresaId) || effectiveEmpresas[0];

  const isLiveSeller = currentEmpresa.id !== 22 && (
    currentEmpresa.id === 99 ||
    currentEmpresa.plan === 'live_express' ||
    currentEmpresa.modules?.live_only === true ||
    (currentEmpresa.modules?.pos === false && currentEmpresa.modules?.live_sales === true)
  );
  const hasLiveAddon = Boolean(currentEmpresa.modules?.live_sales);

  const [dashboardMode, setDashboardMode] = useState<'live' | 'erp'>(isLiveSeller ? 'live' : 'erp');

  useEffect(() => {
    if (isLiveSeller) {
      setDashboardMode('live');
    } else {
      setDashboardMode('erp');
    }
  }, [activeEmpresaId, isLiveSeller]);

  const handleEmpresaChange = (id: number) => {
    setActiveEmpresaId(id);
    if (onSelectEmpresa) {
      onSelectEmpresa(id);
    }
  };

  // Filtro de Fechas del Dashboard (Filament: FiltersForm con DatePicker startDate y endDate)
  const [dateRange, setDateRange] = useState({
    preset: 'mes_actual',
    startDate: '2026-11-01',
    endDate: '2026-11-30'
  });

  // Base de Datos Dinámica por Empresa (Sincronizada con base de datos SQLite y modelos Eloquent de Laravel)
  const companyLedgers: Record<number, {
    monthlySales2026: number[];
    monthlySales2025: number[];
    monthlyOrders2026: number[];
    efectivoCaja: number;
    stockCritico: number;
    sucursales: { nombre: string; stock: number; valorCosto: number }[];
    demandProducts: {
      id: number;
      nombre: string;
      sku: string;
      foto: string;
      clientes: string[];
      cantidad_solicitada: number;
      stock_actual: number;
      deficit: number;
    }[];
    receivables: {
      id: string;
      cliente: string;
      fecha: string;
      fecha_vencimiento: string;
      dias_restantes: string;
      total: number;
      saldo: number;
      urgencia: 'urgente' | 'alerta' | 'normal';
    }[];
  }> = {
    1: {
      // Empresa 1: Corporación Comercial IntegraPro S.A. (Régimen General 12%)
      monthlySales2026: [42000, 48000, 56000, 52000, 68000, 74000, 81000, 79000, 89000, 94000, 118450, 128000],
      monthlySales2025: [35000, 39000, 44000, 46000, 51000, 58000, 62000, 64000, 70000, 76000, 82000, 91000],
      monthlyOrders2026: [456, 520, 610, 580, 740, 810, 880, 860, 970, 1020, 1284, 1390],
      efectivoCaja: 18920.00,
      stockCritico: 3,
      sucursales: [
        { nombre: 'Sucursal Central - Ciudad', stock: 1240, valorCosto: 45800 },
        { nombre: 'Sucursal Norte - Atlántico', stock: 890, valorCosto: 28400 },
        { nombre: 'Sucursal Sur - Villa Nueva', stock: 650, valorCosto: 19200 }
      ],
      demandProducts: [
        {
          id: 1,
          nombre: 'Aceite Vegetal 800ml (Caja x 12 unidades)',
          sku: 'ACE-080',
          foto: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&auto=format&fit=crop&q=80',
          clientes: ['Distribuidora San José', 'Tienda La Bendición'],
          cantidad_solicitada: 35,
          stock_actual: 4,
          deficit: 31
        },
        {
          id: 2,
          nombre: 'Azúcar Blanca Fortificada 2.5kg (Fardo x 10)',
          sku: 'AZU-250',
          foto: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=150&auto=format&fit=crop&q=80',
          clientes: ['Supermercado Los Pinos'],
          cantidad_solicitada: 20,
          stock_actual: 2,
          deficit: 18
        },
        {
          id: 3,
          nombre: 'Café Tostado y Molido Tradicional 400g',
          sku: 'CAF-400',
          foto: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&auto=format&fit=crop&q=80',
          clientes: ['Hotel & Restaurante Posada Real', 'Cafetería El Portal'],
          cantidad_solicitada: 15,
          stock_actual: 1,
          deficit: 14
        }
      ],
      receivables: [
        {
          id: 'FAC-1040',
          cliente: 'Supermercado Los Pinos S.A.',
          fecha: '2026-11-10',
          fecha_vencimiento: '2026-11-20',
          dias_restantes: 'En 4 días',
          total: 12120.00,
          saldo: 12120.00,
          urgencia: 'alerta'
        },
        {
          id: 'FAC-1028',
          cliente: 'Abarrotería El Esfuerzo',
          fecha: '2026-11-04',
          fecha_vencimiento: '2026-11-25',
          dias_restantes: 'En 9 días',
          total: 4350.00,
          saldo: 2350.00,
          urgencia: 'normal'
        },
        {
          id: 'FAC-1015',
          cliente: 'Comercializadora del Sur Ltda.',
          fecha: '2026-10-28',
          fecha_vencimiento: '2026-11-18',
          dias_restantes: 'En 2 días',
          total: 8900.00,
          saldo: 8900.00,
          urgencia: 'urgente'
        }
      ]
    },
    2: {
      // Empresa 2: Importadora y Distribuidora Los Andes (Régimen Pequeño Contribuyente 5%)
      monthlySales2026: [22000, 26000, 31000, 29000, 38000, 42000, 46000, 44000, 51000, 55000, 64200, 72000],
      monthlySales2025: [18000, 21000, 24000, 23000, 29000, 33000, 36000, 35000, 41000, 44000, 50000, 58000],
      monthlyOrders2026: [240, 280, 330, 310, 410, 450, 490, 470, 540, 580, 690, 770],
      efectivoCaja: 9450.00,
      stockCritico: 2,
      sucursales: [
        { nombre: 'Sucursal Roosevelt - Zona 11', stock: 1050, valorCosto: 32500 },
        { nombre: 'Sucursal Altiplano - Chimaltenango', stock: 620, valorCosto: 18900 }
      ],
      demandProducts: [
        {
          id: 4,
          nombre: 'Cereal Integral Fortificado 500g',
          sku: 'CER-500',
          foto: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=150&auto=format&fit=crop&q=80',
          clientes: ['Minisuper Las Palmeras'],
          cantidad_solicitada: 25,
          stock_actual: 3,
          deficit: 22
        }
      ],
      receivables: [
        {
          id: 'FAC-0892',
          cliente: 'Minisuper El Trébol',
          fecha: '2026-11-08',
          fecha_vencimiento: '2026-11-22',
          dias_restantes: 'En 6 días',
          total: 5400.00,
          saldo: 5400.00,
          urgencia: 'alerta'
        }
      ]
    },
    3: {
      // Empresa 3: Farmacia & Droguería Central de Occidente (Régimen General 12%)
      monthlySales2026: [31000, 36000, 41000, 39000, 48000, 53000, 59000, 57000, 66000, 71000, 89300, 98000],
      monthlySales2025: [25000, 29000, 33000, 31000, 38000, 42000, 47000, 45000, 52000, 57000, 71000, 79000],
      monthlyOrders2026: [380, 420, 490, 460, 570, 620, 690, 670, 780, 830, 1040, 1150],
      efectivoCaja: 14200.00,
      stockCritico: 4,
      sucursales: [
        { nombre: 'Sucursal Quetzaltenango - Parque Central', stock: 1480, valorCosto: 58200 },
        { nombre: 'Sucursal San Marcos - Zona 1', stock: 720, valorCosto: 24600 }
      ],
      demandProducts: [
        {
          id: 5,
          nombre: 'Suero Oral Electrolítico 500ml',
          sku: 'SUE-500',
          foto: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&auto=format&fit=crop&q=80',
          clientes: ['Clínica Médica Los Ángeles'],
          cantidad_solicitada: 50,
          stock_actual: 5,
          deficit: 45
        }
      ],
      receivables: [
        {
          id: 'FAC-2019',
          cliente: 'Sanatorio La Merced',
          fecha: '2026-11-05',
          fecha_vencimiento: '2026-11-19',
          dias_restantes: 'En 3 días',
          total: 15800.00,
          saldo: 8800.00,
          urgencia: 'urgente'
        }
      ]
    }
  };

  const currentLedger = companyLedgers[activeEmpresaId] || companyLedgers[1];

  // DETERMINACIÓN DINÁMICA DE LOS MESES SEGÚN EL FILTRO TEMPORAL
  // Índices: 0: Ene, 1: Feb ... 10: Nov, 11: Dic
  let monthIndices = [10]; // Por defecto Noviembre 2026 (mes actual en curso)
  let periodTitle = 'Mes de Noviembre 2026';

  if (dateRange.preset.startsWith('mes_') && dateRange.preset !== 'mes_actual') {
    const mIdx = parseInt(dateRange.preset.replace('mes_', ''), 10);
    if (!isNaN(mIdx) && mIdx >= 0 && mIdx <= 11) {
      monthIndices = [mIdx];
      periodTitle = `Mes de ${MESES[mIdx].nombre} 2026`;
    }
  } else if (dateRange.preset === 'mes_actual') {
    monthIndices = [10];
    periodTitle = 'Mes de Noviembre 2026';
  } else if (dateRange.preset === 'trimestre') {
    monthIndices = [8, 9, 10]; // Septiembre, Octubre, Noviembre
    periodTitle = 'Último Trimestre (Septiembre - Noviembre 2026)';
  } else if (dateRange.preset === 'semestre') {
    monthIndices = [5, 6, 7, 8, 9, 10]; // Junio a Noviembre
    periodTitle = 'Semestre Anterior (Junio - Noviembre 2026)';
  } else if (dateRange.preset === 'anio') {
    monthIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    periodTitle = 'Año Fiscal Completo 2026';
  } else if (dateRange.preset === 'custom') {
    const startM = new Date(dateRange.startDate).getMonth();
    const endM = new Date(dateRange.endDate).getMonth();
    monthIndices = [];
    const minM = Math.min(startM, endM);
    const maxM = Math.max(startM, endM);
    for (let i = minM; i <= maxM; i++) {
      monthIndices.push(i);
    }
    periodTitle = `Rango Filtrado (${dateRange.startDate} al ${dateRange.endDate})`;
  }

  // CÁLCULOS DINÁMICOS ACUMULADOS EN BASE AL FILTRO Y EMPRESA SELECCIONADA
  const activeVentas = monthIndices.reduce((sum, idx) => sum + (currentLedger.monthlySales2026[idx] || 0), 0);
  const activeOrdenes = monthIndices.reduce((sum, idx) => sum + (currentLedger.monthlyOrders2026[idx] || 0), 0);
  const activeTicketPromedio = activeOrdenes > 0 ? (activeVentas / activeOrdenes) : 0;

  // Comparativa con el período equivalente del año anterior (2025)
  const pastYearVentas = monthIndices.reduce((sum, idx) => sum + (currentLedger.monthlySales2025[idx] || 0), 0);
  const pastYearOrders = monthIndices.reduce((sum, idx) => sum + Math.round((currentLedger.monthlySales2025[idx] || 0) / 78), 0);
  const crecimientoPorcentaje = pastYearVentas > 0 ? (((activeVentas - pastYearVentas) / pastYearVentas) * 100).toFixed(1) : '12.5';
  const crecimientoOrdenesPct = pastYearOrders > 0 ? (((activeOrdenes - pastYearOrders) / pastYearOrders) * 100).toFixed(1) : '8.2';

  // Impuestos Dinámicos según Régimen Tributario de la Empresa (ImpuestosStatsWidget)
  const tipoRegimen = getTipoRegimenSAT(currentEmpresa.regimen);
  const esGeneral = tipoRegimen === 'general';
  const esPequeno = tipoRegimen === 'pequeno_contribuyente';
  const baseImponible = esGeneral ? (activeVentas / 1.12) : activeVentas;
  const debitoFiscal = esGeneral ? (baseImponible * 0.12) : esPequeno ? (activeVentas * 0.05) : 0; // 12%, 5% o 0% si es informal/exento
  const retencionesIva = esGeneral ? (debitoFiscal * 0.145) : 0; // Retenciones aplicadas solo en general
  const impuestoNetoSat = Math.max(0, debitoFiscal - retencionesIva);

  // Inventario Dinámico según Sucursales de la Empresa
  const totalStockUnidades = currentLedger.sucursales.reduce((acc, s) => acc + s.stock, 0);
  const totalValorCosto = currentLedger.sucursales.reduce((acc, s) => acc + s.valorCosto, 0);

  // Promedios Semestrales de Referencia (Para comparar Mes vs Semestre)
  const semesterSliceSales = currentLedger.monthlySales2026.slice(5, 11);
  const semesterSliceOrders = currentLedger.monthlyOrders2026.slice(5, 11);
  const semesterAvgSales = semesterSliceSales.reduce((a, b) => a + b, 0) / 6;
  const semesterAvgOrders = semesterSliceOrders.reduce((a, b) => a + b, 0) / 6;

  // 1. Gráfica de Ventas Mensuales (VentasMensualesChartWidget / PruebaVentasChart)
  const lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        fill: true,
        label: `Ventas 2026 (Q) • ${currentEmpresa.nombre.split(' ')[0]}`,
        data: currentLedger.monthlySales2026,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.12)',
        tension: 0.35,
        borderWidth: 2.5,
        pointBackgroundColor: currentLedger.monthlySales2026.map((_, i) => monthIndices.includes(i) ? '#ec4899' : '#4f46e5'),
        pointRadius: currentLedger.monthlySales2026.map((_, i) => monthIndices.includes(i) ? 6 : 3),
        pointHoverRadius: currentLedger.monthlySales2026.map((_, i) => monthIndices.includes(i) ? 9 : 6),
      },
      {
        fill: false,
        label: 'Año Anterior 2025 (Q)',
        data: currentLedger.monthlySales2025,
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        tension: 0.35,
        borderWidth: 2,
        pointRadius: 0,
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { boxWidth: 12, usePointStyle: true, font: { size: 11, weight: 600 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 12,
        titleFont: { size: 12, weight: 700 },
        bodyFont: { size: 12 },
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.6)' },
        ticks: { callback: (value: any) => `Q${Number(value) / 1000}k`, font: { size: 10 } }
      },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  };

  // 2. Gráfica Comparativa Período Seleccionado vs Promedio Semestral (ComparacionMesVsSemestreWidget)
  const comparisonBarData = {
    labels: ['Promedio Semestre Anterior', `${periodTitle.split('(')[0]}`],
    datasets: [
      {
        label: 'Número de Ventas / Transacciones',
        data: [Math.round(semesterAvgOrders), activeOrdenes],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1.5,
        borderRadius: 8,
        yAxisID: 'y'
      },
      {
        label: 'Ingresos Totales (Miles de Quetzales)',
        data: [
          parseFloat((semesterAvgSales / 1000).toFixed(2)),
          parseFloat((activeVentas / 1000).toFixed(2))
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1.5,
        borderRadius: 8,
        yAxisID: 'y1'
      }
    ]
  };

  const comparisonBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { boxWidth: 12, usePointStyle: true, font: { size: 11, weight: 600 } } },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            if (context.datasetIndex === 1) {
              return `Ingresos: Q ${(context.raw * 1000).toLocaleString('es-GT', { minimumFractionDigits: 2 })}`;
            }
            return `Transacciones: ${context.raw} ventas`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        grid: { color: 'rgba(226, 232, 240, 0.6)' },
        ticks: { font: { size: 10 } },
        title: { display: true, text: 'Ventas', font: { size: 10, weight: 700 } }
      },
      y1: {
        type: 'linear' as const,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { callback: (v: any) => `Q${v}k`, font: { size: 10 } },
        title: { display: true, text: 'Miles Q', font: { size: 10, weight: 700 } }
      },
      x: { grid: { display: false }, ticks: { font: { size: 10, weight: 600 } } }
    }
  };

  // 3. Gráfica Circular de Distribución Período vs Semestre (ComparacionCircularMesSemestreWidget)
  const totalVolumeCompare = semesterAvgOrders + activeOrdenes;
  const pctSelected = totalVolumeCompare > 0 ? ((activeOrdenes / totalVolumeCompare) * 100).toFixed(1) : '50.0';
  const pctSemester = totalVolumeCompare > 0 ? ((semesterAvgOrders / totalVolumeCompare) * 100).toFixed(1) : '50.0';

  const doughnutData = {
    labels: [
      `Promedio Semestral (${Math.round(semesterAvgOrders)} ventas • ${pctSemester}%)`,
      `Período Seleccionado (${activeOrdenes} ventas • ${pctSelected}%)`
    ],
    datasets: [
      {
        data: [Math.round(semesterAvgOrders), activeOrdenes],
        backgroundColor: [
          'rgba(59, 130, 246, 0.85)',
          'rgba(236, 72, 153, 0.85)'
        ],
        borderColor: ['#2563eb', '#db2777'],
        borderWidth: 2,
        hoverOffset: 6
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 12, usePointStyle: true, font: { size: 10, weight: 600 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 10,
        cornerRadius: 8
      }
    }
  };

  // 4. Gráfica de Inventario por Sucursal Dinámico (InventarioPorSucursalChartWidget)
  const branchInventoryBarData = {
    labels: currentLedger.sucursales.map(s => `${s.nombre.split('-')[0].trim()} (${s.stock} unid • Q${(s.valorCosto / 1000).toFixed(1)}k)`),
    datasets: [
      {
        label: 'Stock Físico (Unidades)',
        data: currentLedger.sucursales.map(s => s.stock),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1.5,
        borderRadius: 8
      },
      {
        label: 'Valor en Quetzales (Costo / 100)',
        data: currentLedger.sucursales.map(s => Math.round(s.valorCosto / 100)),
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 1.5,
        borderRadius: 8
      }
    ]
  };

  const branchInventoryBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { boxWidth: 12, usePointStyle: true, font: { size: 11, weight: 600 } } },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            if (context.datasetIndex === 1) {
              return `Valor Costo: Q ${(context.raw * 100).toLocaleString('es-GT', { minimumFractionDigits: 2 })}`;
            }
            return `Stock: ${context.raw} unidades`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(226, 232, 240, 0.6)' },
        ticks: { font: { size: 10 } }
      },
      x: { grid: { display: false }, ticks: { font: { size: 10, weight: 600 } } }
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. SECCIÓN SUPERIOR: Indicador / Selector de Empresa Activa (Multi-Tenant Header) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 transition-all">
        {effectiveEmpresas.length > 1 ? (
          // CASO A: Hay MÁS de una empresa -> Muestra listado desplegable
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    Empresa Seleccionada
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En Operación
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    ({effectiveEmpresas.length} empresas disponibles)
                  </span>
                </div>
                <h2 className="text-base font-black text-slate-900 mt-0.5">
                  {currentEmpresa.nombre}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Razón Social: <span className="text-slate-700">{currentEmpresa.razon_social}</span> • NIT: <span className="font-mono font-bold text-slate-700">{currentEmpresa.nit}</span> • {currentEmpresa.regimen}
                </p>
              </div>
            </div>

            {/* Listado Desplegable para cambiar entre empresas */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Seleccionar Empresa Activa:
                </label>
                <div className="relative">
                  <select
                    value={activeEmpresaId}
                    onChange={(e) => handleEmpresaChange(Number(e.target.value))}
                    className="w-full sm:w-80 appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl pl-3.5 pr-9 py-2.5 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
                  >
                    {effectiveEmpresas.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.nombre} (NIT: {emp.nit})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Botón de Test para probar el comportamiento cuando solo hay una empresa */}
              <button
                type="button"
                onClick={() => setSingleCompanyMode(true)}
                title="Probar comportamiento cuando el sistema solo tiene 1 empresa registrada"
                className="self-end sm:self-auto mt-auto sm:mt-5 px-2.5 py-2 text-[10px] font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <span>Probar: 1 sola empresa</span>
              </button>
            </div>
          </div>
        ) : (
          // CASO B: Hay SOLO UNA empresa (o caso contrario) -> Solo aparece el nombre de la que está activa
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Empresa Activa
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Única Empresa Configurada
                  </span>
                </div>
                <h2 className="text-base font-black text-slate-900 mt-0.5">
                  {currentEmpresa.nombre}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Razón Social: <span className="text-slate-700">{currentEmpresa.razon_social}</span> • NIT: <span className="font-mono font-bold text-slate-700">{currentEmpresa.nit}</span> • {currentEmpresa.regimen}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                NIT: {currentEmpresa.nit}
              </span>
              {/* Botón para volver a modo multi-empresa */}
              {singleCompanyMode && (
                <button
                  type="button"
                  onClick={() => setSingleCompanyMode(false)}
                  className="px-2.5 py-1.5 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors border border-indigo-200 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Restaurar multi-empresa (3)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Barra de Título, Filtros por Fecha (Filament: FiltersForm con DatePicker) y Acciones */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Dashboard Ejecutivo & Inteligencia de Negocios
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Consolidación en tiempo real • {effectiveEmpresas.length} empresa(s) • Todas las sucursales
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {!isLiveSeller && hasLiveAddon && (
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setDashboardMode('live')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dashboardMode === 'live'
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Ventas TikTok Live</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDashboardMode('erp')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dashboardMode === 'erp'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Analítica General ERP</span>
                </button>
              </div>
            )}
            {isLiveSeller && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 border border-rose-300 rounded-xl text-rose-800 text-xs font-black shadow-xs">
                <Video className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                <span>Resultados de Venta en Vivo & Canastas</span>
              </div>
            )}
            <TimeFormatToggle variant="badge" />
            <button 
              type="button" 
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Exportar PDF</span>
            </button>
            <button 
              type="button" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nueva Venta Rápida</span>
            </button>
          </div>
        </div>

        {/* Filtro de Rango de Fechas (Filament: DatePicker startDate / endDate) */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Período:
            </span>
            <button
              type="button"
              onClick={() => setDateRange({ preset: 'mes_actual', startDate: '2026-11-01', endDate: '2026-11-30' })}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                dateRange.preset === 'mes_actual'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Mes Actual (Nov)
            </button>
            <button
              type="button"
              onClick={() => setDateRange({ preset: 'trimestre', startDate: '2026-09-01', endDate: '2026-11-30' })}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                dateRange.preset === 'trimestre'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Último Trimestre
            </button>
            <button
              type="button"
              onClick={() => setDateRange({ preset: 'semestre', startDate: '2026-05-01', endDate: '2026-11-30' })}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                dateRange.preset === 'semestre'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semestre Anterior
            </button>
            <button
              type="button"
              onClick={() => setDateRange({ preset: 'anio', startDate: '2026-01-01', endDate: '2026-12-31' })}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                dateRange.preset === 'anio'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Año Completo 2026
            </button>

            {/* Selector Dinámico de Cualquier Mes Individual */}
            <div className="relative">
              <select
                value={dateRange.preset.startsWith('mes_') && dateRange.preset !== 'mes_actual' ? dateRange.preset : ''}
                onChange={(e) => {
                  if (e.target.value) {
                    const idx = parseInt(e.target.value.replace('mes_', ''), 10);
                    const mNum = String(idx + 1).padStart(2, '0');
                    setDateRange({
                      preset: e.target.value,
                      startDate: `2026-${mNum}-01`,
                      endDate: `2026-${mNum}-28`
                    });
                  }
                }}
                className={`text-[11px] font-bold rounded-lg pl-2.5 pr-6 py-1 border transition-all cursor-pointer focus:outline-none appearance-none ${
                  dateRange.preset.startsWith('mes_') && dateRange.preset !== 'mes_actual'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                <option value="" className="bg-white text-slate-800">
                  {dateRange.preset.startsWith('mes_') && dateRange.preset !== 'mes_actual' ? periodTitle : 'Explorar Mes Individual...'}
                </option>
                {MESES.map((m) => (
                  <option key={m.idx} value={`mes_${m.idx}`} className="bg-white text-slate-800">
                    Mes: {m.nombre} 2026
                  </option>
                ))}
              </select>
              <ChevronDown className={`w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${
                dateRange.preset.startsWith('mes_') && dateRange.preset !== 'mes_actual' ? 'text-white' : 'text-slate-500'
              }`} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold">Desde:</span>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ preset: 'custom', startDate: e.target.value, endDate: dateRange.endDate })}
                className="bg-transparent font-mono text-[11px] font-semibold text-slate-700 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold">Hasta:</span>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ preset: 'custom', startDate: dateRange.startDate, endDate: e.target.value })}
                className="bg-transparent font-mono text-[11px] font-semibold text-slate-700 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Indicador Informativo del Período Calculado en Tiempo Real */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-50">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
              Datos Calculados: {periodTitle}
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Consolidación dinámica de {monthIndices.length} {monthIndices.length === 1 ? 'mes' : 'meses'} para {currentEmpresa.nombre}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Régimen: <strong className="text-slate-700">{currentEmpresa.regimen}</strong>
          </span>
        </div>
      </div>

      {dashboardMode === 'live' ? (
        <LiveDashboardTab empresa={currentEmpresa} />
      ) : (
        <>
          {/* 3. BLOQUE 1 DE MÉTRICAS: Resumen Comercial & Ventas (PruebaStatsWidget / SaasOverviewStats) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Ventas del Mes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {dateRange.preset.startsWith('mes_') || dateRange.preset === 'mes_actual' ? 'Ventas del Mes' : 'Ventas del Período'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              Q {activeVentas.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
              Number(crecimientoPorcentaje) >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> {Number(crecimientoPorcentaje) >= 0 ? `+${crecimientoPorcentaje}%` : `${crecimientoPorcentaje}%`}
            </span>
            <span className="text-slate-400 text-[11px] font-normal">vs. mismo período 2025</span>
          </div>
        </div>

        {/* KPI 2: Transacciones / Órdenes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Órdenes Realizadas</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {activeOrdenes.toLocaleString('es-GT')}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
              Number(crecimientoOrdenesPct) >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> {Number(crecimientoOrdenesPct) >= 0 ? `+${crecimientoOrdenesPct}%` : `${crecimientoOrdenesPct}%`}
            </span>
            <span className="text-slate-400 text-[11px] font-normal">ticket prom. Q{activeTicketPromedio.toFixed(2)}</span>
          </div>
        </div>

        {/* KPI 3: Stock Crítico / Alertas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Crítico</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">
              {currentLedger.demandProducts.length} Ítems
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px]">
              Déficit total: {currentLedger.demandProducts.reduce((a, b) => a + b.deficit, 0)} unidades
            </span>
          </div>
        </div>

        {/* KPI 4: Efectivo en Caja General */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Caja General Activa</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              Q {currentLedger.efectivoCaja.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span className="text-slate-700 font-semibold">{currentLedger.sucursales.length} sucursales</span> operando
          </div>
        </div>
      </div>

      {/* 4. BLOQUE 2 DE MÉTRICAS: Estrategia Fiscal SAT Guatemala (ImpuestosStatsWidget de Laravel) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Facturado ({periodTitle.split('(')[0].trim()})</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            Q {activeVentas.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Base imponible cálculo tributario: <strong className="text-slate-700">Q {baseImponible.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</strong>
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Régimen Tributario SAT</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 mt-2 truncate">{currentEmpresa.regimen}</p>
          <p className="text-xs text-slate-400 mt-1">
            Configurado en perfil fiscal de <strong className="text-slate-700">{currentEmpresa.nombre.split(' ')[0]}</strong>
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-rose-50/40 p-5 rounded-2xl border border-rose-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Impuesto Neto SAT a Enterar</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-700 mt-2">
            Q {impuestoNetoSat.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-rose-600/90 mt-1">
            {esGeneral 
              ? `12% Débito (Q ${(debitoFiscal).toLocaleString('es-GT', { minimumFractionDigits: 2 })}) - Retenciones (Q ${(retencionesIva).toLocaleString('es-GT', { minimumFractionDigits: 2 })})` 
              : esPequeno
              ? `5% Pequeño Contribuyente (Q ${debitoFiscal.toLocaleString('es-GT', { minimumFractionDigits: 2 })})`
              : 'Régimen Informal (Exento de IVA / Sin Débito SAT)'
            }
          </p>
        </div>
      </div>

      {/* 5. BLOQUE 3 DE MÉTRICAS: Inventario & Sucursales (InventarioSucursalesStatsWidget de Laravel) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sucursales Activas</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{currentLedger.sucursales.length} Puntos de Venta</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {currentLedger.sucursales.map(s => s.nombre.split('-')[0].trim()).join(', ')} operando
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Valor Costo Inventario</span>
            <p className="text-2xl font-black text-indigo-700 mt-1">
              Q {totalValorCosto.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-slate-400 mt-1">Inversión total a costo de compra</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Productos en Stock</span>
            <p className="text-2xl font-black text-cyan-700 mt-1">
              {totalStockUnidades.toLocaleString('es-GT')} Unidades
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Distribuidas en {currentLedger.sucursales.length} sucursales activas
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 6. SUITE DE 4 GRÁFICAS DE INTELIGENCIA COMERCIAL (Laravel Filament Charts) */}
      <div className="space-y-6">
        {/* Fila 1 de Gráficas: Evolución Mensual (Línea) + Distribución Mes vs Semestre (Dona) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfica 1: VentasMensualesChartWidget / PruebaVentasChart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <LineChartIcon className="w-4 h-4 text-indigo-600" />
                  Evolución Mensual de Ingresos y Proyección (VentasMensualesChartWidget)
                </h2>
                <p className="text-xs text-slate-400">Comparativa mensual 2026 vs año fiscal anterior 2025</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                Año 2026
              </span>
            </div>
            <div className="h-72 w-full">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          {/* Gráfica 2: ComparacionCircularMesSemestreWidget (Doughnut Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="mb-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-pink-600" />
                Distribución: Mes Actual vs Semestre Anterior
              </h2>
              <p className="text-xs text-slate-400">
                ComparacionCircularMesSemestreWidget (Filament)
              </p>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>{periodTitle.split('(')[0].trim()}:</span>
              <span className="font-bold text-pink-600">{pctSelected}% del volumen</span>
            </div>
          </div>
        </div>

        {/* Fila 2 de Gráficas: Comparativa Mes vs Semestre (Barras) + Inventario por Sucursal (Barras) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfica 3: ComparacionMesVsSemestreWidget (Bar Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-sky-600" />
                  Rendimiento: {periodTitle.split('(')[0].trim()} vs Promedio Semestral
                </h2>
                <p className="text-xs text-slate-400">
                  ComparacionMesVsSemestreWidget • Transacciones e Ingresos
                </p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                Number(crecimientoPorcentaje) >= 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {Number(crecimientoPorcentaje) >= 0 ? `+${crecimientoPorcentaje}% vs 2025` : `${crecimientoPorcentaje}% vs 2025`}
              </span>
            </div>
            <div className="h-64 w-full">
              <Bar data={comparisonBarData} options={comparisonBarOptions} />
            </div>
          </div>

          {/* Gráfica 4: InventarioPorSucursalChartWidget (Bar Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Store className="w-4 h-4 text-indigo-600" />
                  Inventario por Sucursal (InventarioPorSucursalChartWidget)
                </h2>
                <p className="text-xs text-slate-400">
                  Stock físico en unidades y valoración en Quetzales (Costo)
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {currentLedger.sucursales.length} Sucursales
              </span>
            </div>
            <div className="h-64 w-full">
              <Bar data={branchInventoryBarData} options={branchInventoryBarOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* 7. Banner Informativo: Operaciones Centralizadas en Menú Principal */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Pulso Operativo en Tiempo Real Centralizado
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Las tablas de <strong className="text-white">Últimas Ventas</strong>, <strong className="text-white">Cuentas por Cobrar</strong> y <strong className="text-white">Déficit de Demanda en Pre-Ventas</strong> ahora están activas directamente en el <span className="text-indigo-300 font-bold">Menú Principal (Bento Grid)</span> para acceso inmediato de apertura de turno.
          </p>
        </div>
        <div className="shrink-0">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-indigo-200 border border-white/20 text-xs font-bold font-mono">
            Dashboard Analítico Limpio ✓
          </span>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
