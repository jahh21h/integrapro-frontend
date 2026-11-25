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
import { getTipoRegimenSAT, formatRegimenLabel } from '../utils/tax';
import { dashboardApi, salesApi, inventoryApi, branchesApi } from '../api';
import { useLanguage } from '../context/LanguageContext';

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
    nombre: 'Fashion Styles',
    razon_social: 'Fashion Styles S.A.',
    nit: '6322012-1',
    pais: 'GT',
    regimen: 'General (IVA 12%)',
    plan: 'enterprise',
    activa: true,
    telefono: '+502 4589-1234',
    email: 'contacto@fashionstyles.gt',
    direccion: 'Calzada Roosevelt, Mixco, Guatemala'
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
  { idx: 0, nombre: 'Enero', nombreEn: 'January', abrv: 'Ene', abrvEn: 'Jan' },
  { idx: 1, nombre: 'Febrero', nombreEn: 'February', abrv: 'Feb', abrvEn: 'Feb' },
  { idx: 2, nombre: 'Marzo', nombreEn: 'March', abrv: 'Mar', abrvEn: 'Mar' },
  { idx: 3, nombre: 'Abril', nombreEn: 'April', abrv: 'Abr', abrvEn: 'Apr' },
  { idx: 4, nombre: 'Mayo', nombreEn: 'May', abrv: 'May', abrvEn: 'May' },
  { idx: 5, nombre: 'Junio', nombreEn: 'June', abrv: 'Jun', abrvEn: 'Jun' },
  { idx: 6, nombre: 'Julio', nombreEn: 'July', abrv: 'Jul', abrvEn: 'Jul' },
  { idx: 7, nombre: 'Agosto', nombreEn: 'August', abrv: 'Ago', abrvEn: 'Aug' },
  { idx: 8, nombre: 'Septiembre', nombreEn: 'September', abrv: 'Sep', abrvEn: 'Sep' },
  { idx: 9, nombre: 'Octubre', nombreEn: 'October', abrv: 'Oct', abrvEn: 'Oct' },
  { idx: 10, nombre: 'Noviembre', nombreEn: 'November', abrv: 'Nov', abrvEn: 'Nov' },
  { idx: 11, nombre: 'Diciembre', nombreEn: 'December', abrv: 'Dic', abrvEn: 'Dec' },
];

interface DashboardProps {
  empresas?: EmpresaSaaS[];
  currentEmpresa?: EmpresaSaaS;
  selectedEmpresaId?: number;
  onSelectEmpresa?: (id: number) => void;
}

export default function Dashboard({
  empresas = defaultEmpresasList,
  currentEmpresa: propCurrentEmpresa,
  selectedEmpresaId = 1,
  onSelectEmpresa
}: DashboardProps) {
  const {
    L,
    isEn,
    money,
    currencySymbol,
    currencyCode,
    locale,
    taxIdLabel,
    trRegime,
    trTaxId,
  } = useLanguage();

  const trBranchName = (raw?: string | null) => {
    const s = String(raw || '');
    if (s === 'Sucursal Principal - Tienda & Bodega Central') {
      return L('Sucursal Principal - Tienda & Bodega Central', 'Main Branch - Store & Central Warehouse');
    }
    if (s === 'Sucursal Principal') return L('Sucursal Principal', 'Main Branch');
    if (s === 'Sucursal Demo Principal') return L('Sucursal Demo Principal', 'Main Demo Branch');
    return isEn ? s.replace(/^Sucursal\b/i, 'Branch') : s;
  };

  const [activeEmpresaId, setActiveEmpresaId] = useState<number>(selectedEmpresaId);
  // Permite simular interactivamente el caso de tener solo 1 empresa configurada vs varias empresas
  const [singleCompanyMode, setSingleCompanyMode] = useState<boolean>(false);

  useEffect(() => {
    setActiveEmpresaId(selectedEmpresaId);
  }, [selectedEmpresaId]);

  // Lista efectiva según si está en modo 1 empresa o multi-empresa
  const effectiveEmpresas = singleCompanyMode ? [empresas[0]] : empresas;
  const currentEmpresa = propCurrentEmpresa || effectiveEmpresas.find(e => Number(e.id) === Number(activeEmpresaId)) || effectiveEmpresas[0];

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
    preset: 'anio',
    startDate: '2026-01-01',
    endDate: '2026-12-31'
  });

  // Base de Datos Dinámica por Empresa (Sincronizada con base de datos real del Droplet)
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
      // Empresa 1: Fashion Styles (Métricas Reales Extraídas de la Base de Datos Droplet)
      // Total 2026: 951 órdenes y Q 179,475.50 facturados
      monthlySales2026: [3828.00, 0, 35722.50, 0, 17435.00, 15669.00, 20538.00, 24330.00, 37093.00, 23285.00, 1575.00, 0],
      monthlySales2025: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      monthlyOrders2026: [70, 0, 168, 0, 62, 77, 117, 145, 125, 150, 37, 0],
      efectivoCaja: 1860.00,
      stockCritico: 8,
      sucursales: [
        { nombre: 'Sucursal Principal - Tienda & Bodega Central', stock: 3474, valorCosto: 142791.46 }
      ],
      demandProducts: [
        {
          id: 4155,
          nombre: 'Serum Facial & Contorno de Ojos',
          sku: 'CDD-0000003',
          foto: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&auto=format&fit=crop&q=80',
          clientes: ['Clientas Boutique VIP', 'Venta en Tienda'],
          cantidad_solicitada: 25,
          stock_actual: 1,
          deficit: 24
        },
        {
          id: 2908,
          nombre: 'Juego Completo Depilación & Exfoliante 60g / Aceite 90ml',
          sku: 'GNR-0000446',
          foto: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&auto=format&fit=crop&q=80',
          clientes: ['Clientas Frecuentes', 'Venta Mostrador'],
          cantidad_solicitada: 30,
          stock_actual: 10,
          deficit: 20
        },
        {
          id: 2841,
          nombre: 'Aceite Labial Hidratante Gloss',
          sku: 'BLL-0000064',
          foto: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=150&auto=format&fit=crop&q=80',
          clientes: ['Compradoras Live', 'Venta en Caja'],
          cantidad_solicitada: 25,
          stock_actual: 6,
          deficit: 19
        },
        {
          id: 4161,
          nombre: 'Taza Cerámica de Colección',
          sku: 'GNR-0000581',
          foto: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80',
          clientes: ['Detalles & Regalos'],
          cantidad_solicitada: 20,
          stock_actual: 6,
          deficit: 14
        },
        {
          id: 4127,
          nombre: 'Mascarilla Capilar Tratamiento Intensivo',
          sku: 'BLL-0000162',
          foto: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=150&auto=format&fit=crop&q=80',
          clientes: ['Cuidado Personal'],
          cantidad_solicitada: 20,
          stock_actual: 1,
          deficit: 19
        }
      ],
      receivables: [
        {
          id: 'FAC-2423',
          cliente: 'Darlyn Pinula',
          fecha: '2026-05-15',
          fecha_vencimiento: '2026-11-25',
          dias_restantes: 'En 6 días',
          total: 1310.00,
          saldo: 1310.00,
          urgencia: 'urgente'
        },
        {
          id: 'FAC-2426',
          cliente: 'Any Pueblito',
          fecha: '2026-05-16',
          fecha_vencimiento: '2026-11-28',
          dias_restantes: 'En 9 días',
          total: 580.00,
          saldo: 580.00,
          urgencia: 'alerta'
        },
        {
          id: 'FAC-2424',
          cliente: 'Alejandra amiga Yesica',
          fecha: '2026-05-15',
          fecha_vencimiento: '2026-12-02',
          dias_restantes: 'En 13 días',
          total: 565.00,
          saldo: 565.00,
          urgencia: 'alerta'
        },
        {
          id: 'FAC-2425',
          cliente: 'Fabiola Tahuite (funeraria)',
          fecha: '2026-05-15',
          fecha_vencimiento: '2026-12-05',
          dias_restantes: 'En 16 días',
          total: 560.00,
          saldo: 560.00,
          urgencia: 'normal'
        },
        {
          id: 'FAC-2422',
          cliente: 'Kyara Santa Barbara',
          fecha: '2026-05-15',
          fecha_vencimiento: '2026-12-10',
          dias_restantes: 'En 21 días',
          total: 550.00,
          saldo: 550.00,
          urgencia: 'normal'
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
    },
    25: {
      // Empresa 25: [QA-EMPRESA] IntegraPro Test (Entorno Demo Aislado)
      monthlySales2026: [12000, 15000, 18000, 17000, 22000, 26000, 29000, 27000, 31000, 34000, 42500, 48000],
      monthlySales2025: [10000, 11000, 14000, 15000, 17000, 19000, 22000, 21000, 25000, 27000, 32000, 36000],
      monthlyOrders2026: [120, 145, 170, 160, 210, 240, 280, 265, 305, 330, 410, 460],
      efectivoCaja: 5400.00,
      stockCritico: 2,
      sucursales: [
        { nombre: 'Sucursal Demo Principal', stock: 350, valorCosto: 14500 }
      ],
      demandProducts: [
        {
          id: 1,
          nombre: 'Smart Watch Pro Serie 8 Waterproof',
          sku: 'WCH-DEMO-01',
          foto: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=80',
          clientes: ['Cliente Demo Corporativo'],
          cantidad_solicitada: 15,
          stock_actual: 3,
          deficit: 12
        }
      ],
      receivables: [
        {
          id: 'FAC-DEMO-101',
          cliente: 'Distribuidora Central Demo',
          fecha: '2026-11-10',
          fecha_vencimiento: '2026-11-25',
          dias_restantes: 'En 5 días',
          total: 3500.00,
          saldo: 1850.00,
          urgencia: 'normal'
        }
      ]
    }
  };

  // Sincronización EN TIEMPO REAL con el servidor MySQL (compartido con IntegraPro Mobile V2)
  const [liveLedger, setLiveLedger] = useState<typeof companyLedgers[number] | null>(null);
  const [liveSyncing, setLiveSyncing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchLiveDashboard = async () => {
      setLiveSyncing(true);
      try {
        const empId = Number(activeEmpresaId) || 1;
        const [dashRes, salesRes, credRes, invRes, braRes] = await Promise.allSettled([
          dashboardApi.getKPIs(),
          salesApi.getAll({ id_empresa: empId, per_page: 500 }),
          salesApi.getCredits({ id_empresa: empId }),
          inventoryApi.getAll({ id_empresa: empId, per_page: 250 }),
          branchesApi.getAll(),
        ]);

        if (cancelled) return;

        const filterTenant = (arr: any[]) =>
          arr.filter((rec) => {
            const raw = rec?.id_empresa ?? rec?.empresa_id ?? rec?.empresa?.id_empresa ?? rec?.empresa?.id;
            if (raw === undefined || raw === null || raw === '') return true;
            return Number(raw) === empId;
          });

        const monthlySales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const monthlyOrders = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const todayIso = new Date().toISOString().slice(0, 10);
        let ventasHoyCalc = 0;

        if (salesRes.status === 'fulfilled') {
          const rawS = salesRes.value?.data || salesRes.value || [];
          const scopedS = filterTenant(Array.isArray(rawS) ? rawS : []);
          scopedS.forEach((s: any) => {
            const dateStr = String(s.fecha || s.created_at || '').slice(0, 10);
            const tot = Number(s.total) || 0;
            if (dateStr.startsWith(todayIso)) ventasHoyCalc += tot;
            if (dateStr.length >= 7) {
              const mIdx = parseInt(dateStr.slice(5, 7), 10) - 1;
              if (mIdx >= 0 && mIdx <= 11) {
                monthlySales[mIdx] += tot;
                monthlyOrders[mIdx] += 1;
              }
            }
          });
        }

        let efectivoCaja = ventasHoyCalc;
        let stockCritico = 0;
        if (dashRes.status === 'fulfilled' && dashRes.value) {
          const r = dashRes.value?.resumen || dashRes.value?.data || dashRes.value;
          if (r?.ventas_hoy !== undefined) {
            efectivoCaja = Math.max(Number(r.ventas_hoy) || 0, ventasHoyCalc);
          }
          if (r?.productos_stock_bajo !== undefined) {
            stockCritico = Number(r.productos_stock_bajo) || 0;
          }
        }

        let totalStock = 0;
        let totalCostVal = 0;
        const lowStockList: typeof companyLedgers[number]['demandProducts'] = [];
        if (invRes.status === 'fulfilled') {
          const rawI = invRes.value?.data || invRes.value || [];
          const scopedI = filterTenant(Array.isArray(rawI) ? rawI : []);
          scopedI.forEach((p: any) => {
            const st = Math.max(0, Number(p.stock ?? 0));
            const minSt = Number(p.stock_minimo ?? 3);
            const cost = Number(p.precio_compra) || Number(p.precio_venta) || 0;
            totalStock += st;
            totalCostVal += st * cost;
            if (st <= minSt && lowStockList.length < 6) {
              const rawImg = p.foto || p.foto_url || '';
              lowStockList.push({
                id: Number(p.id_producto || p.id),
                nombre: String(p.nombre || 'Producto'),
                sku: String(p.sku || `SKU-${p.id_producto || p.id}`),
                foto: rawImg
                  ? String(rawImg).startsWith('http')
                    ? String(rawImg)
                    : `https://app.integrapro.app/storage/${rawImg}`
                  : '',
                clientes: [String(p.categoria?.nombre || 'Bodega Central')],
                cantidad_solicitada: Math.max(minSt, 5),
                stock_actual: st,
                deficit: Math.max(0, Math.max(minSt, 5) - st),
              });
            }
          });
          if (stockCritico === 0) {
            stockCritico = scopedI.filter((p: any) => Number(p.stock ?? 0) <= Number(p.stock_minimo ?? 3)).length;
          }
        }

        let branchName = 'Sucursal Principal - Tienda & Bodega Central';
        if (braRes.status === 'fulfilled') {
          const rawB = braRes.value?.data || braRes.value || [];
          const scopedB = filterTenant(Array.isArray(rawB) ? rawB : []);
          if (scopedB.length > 0 && scopedB[0]?.nombre) {
            branchName = String(scopedB[0].nombre);
          }
        }

        const liveReceivables: typeof companyLedgers[number]['receivables'] = [];
        if (credRes.status === 'fulfilled') {
          const rawC = credRes.value?.data || credRes.value || [];
          const scopedC = filterTenant(Array.isArray(rawC) ? rawC : []);
          scopedC.slice(0, 8).forEach((c: any) => {
            const tot = Number(c.total) || 0;
            const pag = Number(c.pagado ?? c.total_pagado) || 0;
            const sal = c.saldo_pendiente !== undefined ? Number(c.saldo_pendiente) : Math.max(0, tot - pag);
            if (sal <= 0) return;
            const fecha = String(c.fecha || c.created_at || '').slice(0, 10);
            const clienteNombre =
              c.cliente?.nombre_completo ||
              `${c.cliente?.nombre || ''} ${c.cliente?.apellido || ''}`.trim() ||
              'Cliente';
            liveReceivables.push({
              id: c.codigo || `VTA-${c.id_venta ?? c.id}`,
              cliente: clienteNombre,
              fecha,
              fecha_vencimiento: fecha,
              dias_restantes: 'Pendiente',
              total: tot,
              saldo: sal,
              urgencia: sal >= 500 ? 'urgente' : 'alerta',
            });
          });
        }

        setLiveLedger({
          monthlySales2026: monthlySales,
          monthlySales2025: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          monthlyOrders2026: monthlyOrders,
          efectivoCaja,
          stockCritico,
          sucursales: [{ nombre: branchName, stock: totalStock, valorCosto: Number(totalCostVal.toFixed(2)) }],
          demandProducts: lowStockList,
          receivables: liveReceivables,
        });
      } catch {
        // Mantiene fallback en caso de error de red
      } finally {
        if (!cancelled) setLiveSyncing(false);
      }
    };

    fetchLiveDashboard();
    const timer = window.setInterval(fetchLiveDashboard, 30000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [activeEmpresaId]);

  const currentLedger = liveLedger || {
    monthlySales2026: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    monthlySales2025: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    monthlyOrders2026: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    efectivoCaja: 0,
    stockCritico: 0,
    sucursales: [{ nombre: 'Sucursal Principal', stock: 0, valorCosto: 0 }],
    demandProducts: [],
    receivables: [],
  };
  void liveSyncing;

  // DETERMINACIÓN DINÁMICA DE LOS MESES SEGÚN EL FILTRO TEMPORAL
  // Índices: 0: Ene, 1: Feb ... 10: Nov, 11: Dic
  let monthIndices = [10]; // Por defecto Noviembre 2026 (mes actual en curso)
  let periodTitle = L('Mes de Noviembre 2026', 'November 2026');

  if (dateRange.preset.startsWith('mes_') && dateRange.preset !== 'mes_actual') {
    const mIdx = parseInt(dateRange.preset.replace('mes_', ''), 10);
    if (!isNaN(mIdx) && mIdx >= 0 && mIdx <= 11) {
      monthIndices = [mIdx];
      periodTitle = L(`Mes de ${MESES[mIdx].nombre} 2026`, `${MESES[mIdx].nombreEn} 2026`);
    }
  } else if (dateRange.preset === 'mes_actual') {
    monthIndices = [10];
    periodTitle = L('Mes de Noviembre 2026', 'November 2026');
  } else if (dateRange.preset === 'trimestre') {
    monthIndices = [8, 9, 10]; // Septiembre, Octubre, Noviembre
    periodTitle = L('Último Trimestre (Septiembre - Noviembre 2026)', 'Last Quarter (September - November 2026)');
  } else if (dateRange.preset === 'semestre') {
    monthIndices = [5, 6, 7, 8, 9, 10]; // Junio a Noviembre
    periodTitle = L('Semestre Anterior (Junio - Noviembre 2026)', 'Previous Semester (June - November 2026)');
  } else if (dateRange.preset === 'anio') {
    monthIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    periodTitle = L('Año Fiscal Completo 2026', 'Full Fiscal Year 2026');
  } else if (dateRange.preset === 'custom') {
    const startM = new Date(dateRange.startDate).getMonth();
    const endM = new Date(dateRange.endDate).getMonth();
    monthIndices = [];
    const minM = Math.min(startM, endM);
    const maxM = Math.max(startM, endM);
    for (let i = minM; i <= maxM; i++) {
      monthIndices.push(i);
    }
    periodTitle = L(
      `Rango Filtrado (${dateRange.startDate} al ${dateRange.endDate})`,
      `Filtered Range (${dateRange.startDate} to ${dateRange.endDate})`
    );
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
  const regimenDisplay = isEn ? trRegime(currentEmpresa.regimen) : formatRegimenLabel(currentEmpresa.regimen);
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
    labels: MESES.map((m) => (isEn ? m.abrvEn : m.abrv)),
    datasets: [
      {
        fill: true,
        label: L(
          `Ventas 2026 (${currencySymbol}) • ${currentEmpresa.nombre.split(' ')[0]}`,
          `2026 Sales (${currencySymbol}) • ${currentEmpresa.nombre.split(' ')[0]}`
        ),
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
        label: L(`Año Anterior 2025 (${currencySymbol})`, `Prior Year 2025 (${currencySymbol})`),
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
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${money(Number(context.raw) || 0)}`
        }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.6)' },
        ticks: { callback: (value: any) => `${currencySymbol}${Number(value) / 1000}k`, font: { size: 10 } }
      },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  };

  // 2. Gráfica Comparativa Período Seleccionado vs Promedio Semestral (ComparacionMesVsSemestreWidget)
  const comparisonBarData = {
    labels: [L('Promedio Semestre Anterior', 'Prior Semester Avg.'), `${periodTitle.split('(')[0].trim()}`],
    datasets: [
      {
        label: L('Número de Ventas / Transacciones', 'Number of Sales / Transactions'),
        data: [Math.round(semesterAvgOrders), activeOrdenes],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1.5,
        borderRadius: 8,
        yAxisID: 'y'
      },
      {
        label: L('Ingresos Totales (Miles de Quetzales)', `Total Revenue (Thousands ${currencyCode})`),
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
              return `${L('Ingresos:', 'Revenue:')} ${money((Number(context.raw) || 0) * 1000)}`;
            }
            return `${L('Transacciones:', 'Transactions:')} ${context.raw} ${L('ventas', 'sales')}`;
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
        title: { display: true, text: L('Ventas', 'Sales'), font: { size: 10, weight: 700 } }
      },
      y1: {
        type: 'linear' as const,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { callback: (v: any) => `${currencySymbol}${v}k`, font: { size: 10 } },
        title: { display: true, text: L('Miles Q', `Thousands ${currencySymbol}`), font: { size: 10, weight: 700 } }
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
      L(
        `Promedio Semestral (${Math.round(semesterAvgOrders)} ventas • ${pctSemester}%)`,
        `Semester Avg. (${Math.round(semesterAvgOrders)} sales • ${pctSemester}%)`
      ),
      L(
        `Período Seleccionado (${activeOrdenes} ventas • ${pctSelected}%)`,
        `Selected Period (${activeOrdenes} sales • ${pctSelected}%)`
      )
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
    labels: currentLedger.sucursales.map(s => `${trBranchName(s.nombre).split('-')[0].trim()} (${s.stock} ${L('unid', 'units')} • ${currencySymbol}${(s.valorCosto / 1000).toFixed(1)}k)`),
    datasets: [
      {
        label: L('Stock Físico (Unidades)', 'Physical Stock (Units)'),
        data: currentLedger.sucursales.map(s => s.stock),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1.5,
        borderRadius: 8
      },
      {
        label: L('Valor en Quetzales (Costo / 100)', `Value in ${currencyCode} (Cost / 100)`),
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
              return `${L('Valor Costo:', 'Cost Value:')} ${money((Number(context.raw) || 0) * 100)}`;
            }
            return `${L('Stock:', 'Stock:')} ${context.raw} ${L('unidades', 'units')}`;
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
                    {L('Empresa Seleccionada', 'Selected Company')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {L('En Operación', 'Active')}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    ({effectiveEmpresas.length} {L('empresas disponibles', 'companies available')})
                  </span>
                </div>
                <h2 className="text-base font-black text-slate-900 mt-0.5">
                  {currentEmpresa.nombre}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {L('Razón Social:', 'Legal Name:')} <span className="text-slate-700">{currentEmpresa.razon_social}</span> • {taxIdLabel}: <span className="font-mono font-bold text-slate-700">{trTaxId(currentEmpresa.nit)}</span> • {regimenDisplay}
                </p>
              </div>
            </div>

            {/* Listado Desplegable para cambiar entre empresas */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {L('Seleccionar Empresa Activa:', 'Select Active Company:')}
                </label>
                <div className="relative">
                  <select
                    value={activeEmpresaId}
                    onChange={(e) => handleEmpresaChange(Number(e.target.value))}
                    className="w-full sm:w-80 appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl pl-3.5 pr-9 py-2.5 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
                  >
                    {effectiveEmpresas.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.nombre} ({taxIdLabel}: {trTaxId(emp.nit)})
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
                title={L('Probar comportamiento cuando el sistema solo tiene 1 empresa registrada', 'Preview single-company workspace behavior')}
                className="self-end sm:self-auto mt-auto sm:mt-5 px-2.5 py-2 text-[10px] font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <span>{L('Probar: 1 sola empresa', 'Preview: Single company')}</span>
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
                    {L('Empresa Activa', 'Active Company')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {L('Única Empresa Configurada', 'Single Configured Company')}
                  </span>
                </div>
                <h2 className="text-base font-black text-slate-900 mt-0.5">
                  {currentEmpresa.nombre}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {L('Razón Social:', 'Legal Name:')} <span className="text-slate-700">{currentEmpresa.razon_social}</span> • {taxIdLabel}: <span className="font-mono font-bold text-slate-700">{trTaxId(currentEmpresa.nit)}</span> • {regimenDisplay}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                {taxIdLabel}: {trTaxId(currentEmpresa.nit)}
              </span>
              {/* Botón para volver a modo multi-empresa */}
              {singleCompanyMode && (
                <button
                  type="button"
                  onClick={() => setSingleCompanyMode(false)}
                  className="px-2.5 py-1.5 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors border border-indigo-200 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{L('Restaurar multi-empresa (3)', 'Restore multi-company (3)')}</span>
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
              {L('Dashboard Ejecutivo & Inteligencia de Negocios', 'Executive Dashboard & Business Intelligence')}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {L(
                `Consolidación en tiempo real • ${effectiveEmpresas.length} empresa(s) • Todas las sucursales`,
                `Real-time consolidation • ${effectiveEmpresas.length} company(ies) • All branches`
              )}
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
                  <span>{L('Ventas TikTok Live', 'TikTok Live Sales')}</span>
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
                  <span>{L('Analítica General ERP', 'General ERP Analytics')}</span>
                </button>
              </div>
            )}
            {isLiveSeller && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 border border-rose-300 rounded-xl text-rose-800 text-xs font-black shadow-xs">
                <Video className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                <span>{L('Resultados de Venta en Vivo & Canastas', 'Live Sales & Carts Results')}</span>
              </div>
            )}
            <TimeFormatToggle variant="badge" />
            <button 
              type="button" 
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>{L('Exportar PDF', 'Export PDF')}</span>
            </button>
            <button 
              type="button" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{L('Nueva Venta Rápida', 'Quick New Sale')}</span>
            </button>
          </div>
        </div>

        {/* Filtro de Rango de Fechas (Filament: DatePicker startDate / endDate) */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" /> {L('Período:', 'Period:')}
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
              {L('Mes Actual (Nov)', 'Current Month (Nov)')}
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
              {L('Último Trimestre', 'Last Quarter')}
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
              {L('Semestre Anterior', 'Prior Semester')}
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
              {L('Año Completo 2026', 'Full Year 2026')}
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
                  {dateRange.preset.startsWith('mes_') && dateRange.preset !== 'mes_actual'
                    ? periodTitle
                    : L('Explorar Mes Individual...', 'Explore Individual Month...')}
                </option>
                {MESES.map((m) => (
                  <option key={m.idx} value={`mes_${m.idx}`} className="bg-white text-slate-800">
                    {L(`Mes: ${m.nombre} 2026`, `Month: ${m.nombreEn} 2026`)}
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
              <span className="text-[10px] text-slate-400 font-bold">{L('Desde:', 'From:')}</span>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ preset: 'custom', startDate: e.target.value, endDate: dateRange.endDate })}
                className="bg-transparent font-mono text-[11px] font-semibold text-slate-700 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold">{L('Hasta:', 'To:')}</span>
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
              {L('Datos Calculados:', 'Calculated Data:')} {periodTitle}
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              {L(
                `Consolidación dinámica de ${monthIndices.length} ${monthIndices.length === 1 ? 'mes' : 'meses'} para ${currentEmpresa.nombre}`,
                `Dynamic consolidation of ${monthIndices.length} ${monthIndices.length === 1 ? 'month' : 'months'} for ${currentEmpresa.nombre}`
              )}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {L('Régimen:', 'Tax Regime:')} <strong className="text-slate-700">{regimenDisplay}</strong>
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
              {dateRange.preset.startsWith('mes_') || dateRange.preset === 'mes_actual'
                ? L('Ventas del Mes', 'Monthly Sales')
                : L('Ventas del Período', 'Period Sales')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {money(activeVentas)}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
              Number(crecimientoPorcentaje) >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> {Number(crecimientoPorcentaje) >= 0 ? `+${crecimientoPorcentaje}%` : `${crecimientoPorcentaje}%`}
            </span>
            <span className="text-slate-400 text-[11px] font-normal">{L('vs. mismo período 2025', 'vs. same period 2025')}</span>
          </div>
        </div>

        {/* KPI 2: Transacciones / Órdenes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{L('Órdenes Realizadas', 'Orders Completed')}</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {activeOrdenes.toLocaleString(locale)}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
              Number(crecimientoOrdenesPct) >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> {Number(crecimientoOrdenesPct) >= 0 ? `+${crecimientoOrdenesPct}%` : `${crecimientoOrdenesPct}%`}
            </span>
            <span className="text-slate-400 text-[11px] font-normal">{L('ticket prom.', 'avg. ticket')} {money(activeTicketPromedio)}</span>
          </div>
        </div>

        {/* KPI 3: Stock Crítico / Alertas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{L('Stock Crítico', 'Critical Stock')}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">
              {currentLedger.demandProducts.length} {L('Ítems', 'Items')}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px]">
              {L('Déficit total:', 'Total deficit:')} {currentLedger.demandProducts.reduce((a, b) => a + b.deficit, 0)} {L('unidades', 'units')}
            </span>
          </div>
        </div>

        {/* KPI 4: Efectivo en Caja General */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{L('Caja General Activa', 'Active Cash Register')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {money(currentLedger.efectivoCaja)}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span className="text-slate-700 font-semibold">{currentLedger.sucursales.length} {L('sucursales', 'branches')}</span> {L('operando', 'operating')}
          </div>
        </div>
      </div>

      {/* 4. BLOQUE 2 DE MÉTRICAS: Estrategia Fiscal SAT Guatemala (ImpuestosStatsWidget de Laravel) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{L('Total Facturado', 'Total Invoiced')} ({periodTitle.split('(')[0].trim()})</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {money(activeVentas)}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {L('Base imponible cálculo tributario:', 'Taxable base for calculation:')} <strong className="text-slate-700">{money(baseImponible)}</strong>
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{L('Régimen Tributario SAT', 'Tax Regime')}</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 mt-2 truncate">{regimenDisplay}</p>
          <p className="text-xs text-slate-400 mt-1">
            {L('Configurado en perfil fiscal de', 'Configured in tax profile of')} <strong className="text-slate-700">{currentEmpresa.nombre.split(' ')[0]}</strong>
          </p>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          !esGeneral && !esPequeno
            ? 'bg-gradient-to-br from-white to-amber-50/50 border-amber-200'
            : esPequeno
            ? 'bg-gradient-to-br from-white to-purple-50/40 border-purple-200'
            : 'bg-gradient-to-br from-white to-rose-50/40 border-rose-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              !esGeneral && !esPequeno ? 'text-amber-800' : esPequeno ? 'text-purple-700' : 'text-rose-700'
            }`}>
              {!esGeneral && !esPequeno
                ? L('Régimen Informal (Sin IVA)', 'Tax-Exempt Regime (0% VAT)')
                : esPequeno
                ? L('Monotributo SAT (5%)', 'Flat Small Business Tax (5%)')
                : L('Impuesto Neto SAT a Enterar', 'Net Tax Payable')}
            </span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              !esGeneral && !esPequeno ? 'bg-amber-100 text-amber-700' : esPequeno ? 'bg-purple-100 text-purple-700' : 'bg-rose-100 text-rose-700'
            }`}>
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <p className={`text-2xl font-black mt-2 ${
            !esGeneral && !esPequeno ? 'text-amber-900' : esPequeno ? 'text-purple-700' : 'text-rose-700'
          }`}>
            {money(impuestoNetoSat)}
          </p>
          <p className={`text-xs mt-1 ${
            !esGeneral && !esPequeno ? 'text-amber-700 font-medium' : esPequeno ? 'text-purple-600/90' : 'text-rose-600/90'
          }`}>
            {esGeneral 
              ? L(
                  `12% Débito (${money(debitoFiscal)}) - Retenciones (${money(retencionesIva)})`,
                  `12% VAT Output (${money(debitoFiscal)}) - Withholdings (${money(retencionesIva)})`
                )
              : esPequeno
              ? L(
                  `5% Pequeño Contribuyente (${money(debitoFiscal)})`,
                  `5% Small Business Flat Tax (${money(debitoFiscal)})`
                )
              : L(
                  'Negocio Informal • 0% IVA (Sin obligación de Débito Fiscal SAT)',
                  'Tax-Exempt Business • 0% VAT (No VAT output liability)'
                )
            }
          </p>
        </div>
      </div>

      {/* 5. BLOQUE 3 DE MÉTRICAS: Inventario & Sucursales (InventarioSucursalesStatsWidget de Laravel) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{L('Sucursales Activas', 'Active Branches')}</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{currentLedger.sucursales.length} {L('Puntos de Venta', 'Points of Sale')}</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {currentLedger.sucursales.map(s => trBranchName(s.nombre).split('-')[0].trim()).join(', ')} {L('operando', 'operating')}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{L('Valor Costo Inventario', 'Inventory Cost Value')}</span>
            <p className="text-2xl font-black text-indigo-700 mt-1">
              {money(totalValorCosto)}
            </p>
            <p className="text-xs text-slate-400 mt-1">{L('Inversión total a costo de compra', 'Total investment at purchase cost')}</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{L('Productos en Stock', 'Products in Stock')}</span>
            <p className="text-2xl font-black text-cyan-700 mt-1">
              {totalStockUnidades.toLocaleString(locale)} {L('Unidades', 'Units')}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {L('Distribuidas en', 'Distributed across')} {currentLedger.sucursales.length} {L('sucursales activas', 'active branches')}
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
                  {L('Evolución Mensual de Ingresos y Proyección (VentasMensualesChartWidget)', 'Monthly Revenue Trend & Forecast')}
                </h2>
                <p className="text-xs text-slate-400">{L('Comparativa mensual 2026 vs año fiscal anterior 2025', 'Monthly comparison: 2026 vs. prior fiscal year 2025')}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                {L('Año 2026', 'Year 2026')}
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
                {L('Distribución: Mes Actual vs Semestre Anterior', 'Distribution: Selected Period vs. Prior Semester')}
              </h2>
              <p className="text-xs text-slate-400">
                {L('ComparacionCircularMesSemestreWidget (Filament)', 'Period Share Breakdown')}
              </p>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>{periodTitle.split('(')[0].trim()}:</span>
              <span className="font-bold text-pink-600">{pctSelected}% {L('del volumen', 'of volume')}</span>
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
                  {L('Rendimiento:', 'Performance:')} {periodTitle.split('(')[0].trim()} {L('vs Promedio Semestral', 'vs. Semester Avg.')}
                </h2>
                <p className="text-xs text-slate-400">
                  {L('ComparacionMesVsSemestreWidget • Transacciones e Ingresos', 'Transactions & Revenue Comparison')}
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
                  {L('Inventario por Sucursal (InventarioPorSucursalChartWidget)', 'Inventory by Branch')}
                </h2>
                <p className="text-xs text-slate-400">
                  {L(
                    'Stock físico en unidades y valoración en Quetzales (Costo)',
                    `Physical stock in units and valuation in ${currencyCode} (Cost)`
                  )}
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {currentLedger.sucursales.length} {L('Sucursales', 'Branches')}
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
              {L('Pulso Operativo en Tiempo Real Centralizado', 'Centralized Real-Time Operations Pulse')}
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            {isEn ? (
              <>
                The <strong className="text-white">Latest Sales</strong>, <strong className="text-white">Accounts Receivable</strong>, and <strong className="text-white">Pre-Sale Demand Deficit</strong> tables are now live directly on the <span className="text-indigo-300 font-bold">Main Menu (Bento Grid)</span> for instant shift-opening visibility.
              </>
            ) : (
              <>
                Las tablas de <strong className="text-white">Últimas Ventas</strong>, <strong className="text-white">Cuentas por Cobrar</strong> y <strong className="text-white">Déficit de Demanda en Pre-Ventas</strong> ahora están activas directamente en el <span className="text-indigo-300 font-bold">Menú Principal (Bento Grid)</span> para acceso inmediato de apertura de turno.
              </>
            )}
          </p>
        </div>
        <div className="shrink-0">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-indigo-200 border border-white/20 text-xs font-bold font-mono">
            {L('Dashboard Analítico Limpio ✓', 'Clean Analytics Dashboard ✓')}
          </span>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
