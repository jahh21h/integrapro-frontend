import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Video, 
  Plus, 
  Search, 
  Flame, 
  Send, 
  CheckCircle2, 
  Truck, 
  Trash2, 
  RefreshCcw, 
  DollarSign, 
  ShoppingBag, 
  Sparkles, 
  Smartphone, 
  Tag, 
  MapPin, 
  Play,
  Square,
  Loader2,
  X,
  ZoomIn,
  User,
  UserPlus,
  Phone,
  Calendar,
  AlertTriangle,
  Link2,
  FileText,
  Check,
  Copy,
  Settings
} from 'lucide-react';
import { useLiveSales, getLiveDueDate, BoutiqueLivePolicy } from '../context/LiveSalesContext';
import { EmpresaSaaS, LiveCustomerBag } from '../types';
import { getTenantCatalog } from '../data/tenantProducts';
import { inventoryApi } from '../api';
import { filterRecordsByTenant, getStoredActiveEmpresaId } from '../utils/tenant';

interface LiveProductItem {
  id: number;
  sku: string;
  codigoBarras: string;
  codigoInterno?: string;
  nombre: string;
  categoria: string;
  precioCompra: number;
  precioVenta: number;
  stockTotal: number;
  stockMinimo: number;
  talla?: string;
  color?: string;
  imagen: string;
}

function getProductPhotoUrl(foto?: string | null): string {
  if (!foto) return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80';
  if (foto.startsWith('http://') || foto.startsWith('https://')) return foto;
  if (foto.startsWith('/storage/')) return foto;
  if (foto.startsWith('storage/')) return `/${foto}`;
  if (foto.startsWith('/')) return foto;
  return `/storage/${foto}`;
}

function mapApiProductToLiveItem(p: any): LiveProductItem {
  const stockTot = parseInt(p.stock) || (Array.isArray(p.inventarios) ? p.inventarios.reduce((sum: number, inv: any) => sum + (parseInt(inv.stock) || 0), 0) : 0);
  const pVenta = parseFloat(p.precio_venta) > 0 ? parseFloat(p.precio_venta) : (parseFloat(p.precio_compra) > 0 ? parseFloat(p.precio_compra) * 1.4 : 25.00);

  const finalSku = p.sku || p.codigo_barras || p.codigo_interno || `SKU-${p.id_producto || p.id}`;

  return {
    id: p.id_producto || p.id,
    sku: finalSku,
    codigoBarras: p.codigo_barras || '',
    codigoInterno: p.codigo_interno || '',
    nombre: p.nombre || 'Prenda en Stock',
    categoria: p.categoria?.nombre || p.categoria_nombre || 'General',
    precioCompra: parseFloat(p.precio_compra) || 0,
    precioVenta: pVenta,
    stockTotal: stockTot,
    stockMinimo: parseInt(p.stock_minimo) || 0,
    talla: p.talla || '',
    color: p.color || '',
    imagen: getProductPhotoUrl(p.foto)
  };
}

interface LiveSalesViewProps {
  currentEmpresa?: EmpresaSaaS;
}

export default function LiveSalesView({ currentEmpresa }: LiveSalesViewProps) {
  const activeEmpresaId = Number(currentEmpresa?.id ?? getStoredActiveEmpresaId() ?? 0);

  const {
    isLiveActive: rawIsLiveActive,
    currentSession: rawCurrentSession,
    bags: allBags,
    startLiveSession,
    endLiveSession,
    createBag,
    addItemToBag,
    updateItemPrice,
    removeItemFromBag,
    updateShippingOptions,
    updateSheinUnification,
    updateBagDueDate,
    releaseExpiredBagsToStock,
    updateBagStatus,
    deleteBag,
    sendWhatsAppSummary,
    getStockReservationCount: getRawStockReservationCount
  } = useLiveSales();

  // Aislamiento estricto multi-tenant: solo canastas, sesión y reservas de ESTA empresa
  const bags = useMemo(
    () => allBags.filter(b => Number(b.empresa_id) === activeEmpresaId),
    [allBags, activeEmpresaId]
  );
  const currentSession = useMemo(
    () => (rawCurrentSession && Number(rawCurrentSession.empresa_id) === activeEmpresaId ? rawCurrentSession : null),
    [rawCurrentSession, activeEmpresaId]
  );
  const isLiveActive = Boolean(rawIsLiveActive && currentSession);
  const getStockReservationCount = (productId: number) => getRawStockReservationCount(productId, activeEmpresaId);

  // Configuración de política de cobro para esta boutique/empresa
  const [boutiquePolicy, setBoutiquePolicy] = useState<BoutiqueLivePolicy>(() => {
    try {
      const raw = localStorage.getItem('integrapro_boutique_config_' + activeEmpresaId);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.live_policy) return parsed.live_policy;
      }
    } catch {}
    return {
      tipo: 'quincenal',
      horas: 24,
      dias: 2,
      vende_shein: activeEmpresaId === 1
    };
  });

  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [tempPolicy, setTempPolicy] = useState<BoutiqueLivePolicy>(boutiquePolicy);

  // Guardar cambios en la política de la boutique
  const handleSavePolicy = () => {
    setBoutiquePolicy(tempPolicy);
    try {
      const key = 'integrapro_boutique_config_' + activeEmpresaId;
      const raw = localStorage.getItem(key);
      const current = raw ? JSON.parse(raw) : {};
      current.live_policy = tempPolicy;
      localStorage.setItem(key, JSON.stringify(current));
    } catch {}
    setShowPolicyModal(false);
  };

  // Estados locales
  const [filterTab, setFilterTab] = useState<'todas' | 'abierta' | 'pendiente_pago' | 'despachada' | 'liquidada'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [activeBagId, setActiveBagId] = useState<string | null>(bags[0]?.id || null);
  const [mobileViewTab, setMobileViewTab] = useState<'canasta' | 'catalogo'>('canasta');

  // Modales
  const [showNewBagModal, setShowNewBagModal] = useState(false);
  const [showEndLiveModal, setShowEndLiveModal] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [newBagForm, setNewBagForm] = useState({
    cliente_nombre: '',
    usuario_tiktok: '',
    telefono_whatsapp: '',
    direccion_envio: ''
  });

  const [editingItemPrice, setEditingItemPrice] = useState<{ bagId: string; itemId: string; currentPrice: number; originalPrice: number; nombre: string } | null>(null);
  const [customPriceInput, setCustomPriceInput] = useState('');

  const [showStartLiveModal, setShowStartLiveModal] = useState(false);
  const [newLiveTitle, setNewLiveTitle] = useState('TikTok Live - Noche de Moda & Remates');

  // Catálogo de prendas y productos estrictamente aislado por empresa
  const [liveProducts, setLiveProducts] = useState<LiveProductItem[]>(() => getTenantCatalog(activeEmpresaId).products);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [liveCategories, setLiveCategories] = useState<string[]>(() => getTenantCatalog(activeEmpresaId).categories);
  const [serverTotalStock, setServerTotalStock] = useState<number | null>(null);
  const [stockOnlyFilter, setStockOnlyFilter] = useState<boolean>(true);
  const [enlargedImageItem, setEnlargedImageItem] = useState<LiveProductItem | null>(null);
  const liveFetchIdRef = useRef(0);

  const fetchLiveProducts = async (search?: string, onlyStock: boolean = stockOnlyFilter) => {
    const requestId = ++liveFetchIdRef.current;
    setIsLoadingLive(true);
    try {
      const isSearching = !!search?.trim();
      const res = await inventoryApi.getAll({
        id_empresa: activeEmpresaId,
        search: search?.trim() || undefined,
        per_page: isSearching ? 50 : 250,
        order_by_stock: true,
        only_with_stock: isSearching ? undefined : (onlyStock ? true : undefined)
      });

      if (requestId !== liveFetchIdRef.current) return;

      const rawData = res?.data || (Array.isArray(res) ? res : []);
      const { items: tenantData, rejectedCount } = filterRecordsByTenant(
        Array.isArray(rawData) ? rawData : [],
        activeEmpresaId
      );

      if (rejectedCount > 0) {
        console.warn(
          `[Multi-Tenant Guard] LiveSales bloqueó ${rejectedCount} producto(s) ajenos o sin id_empresa para la empresa #${activeEmpresaId}.`
        );
      }

      if (rejectedCount === 0 && res?.total_stock !== undefined) {
        setServerTotalStock(Number(res.total_stock));
      } else {
        setServerTotalStock(null);
      }

      if (tenantData.length > 0) {
        const mapped = tenantData.map(mapApiProductToLiveItem);
        setLiveProducts(mapped);
        const discoveredCats = Array.from(new Set(mapped.map((p: LiveProductItem) => p.categoria).filter(Boolean))) as string[];
        setLiveCategories(['Todas', ...discoveredCats]);
      } else if (isSearching) {
        if (rejectedCount > 0) {
          const cat = getTenantCatalog(activeEmpresaId);
          setLiveProducts(cat.products);
          setLiveCategories(cat.categories);
        } else {
          setLiveProducts([]);
        }
      } else {
        const cat = getTenantCatalog(activeEmpresaId);
        setLiveProducts(cat.products);
        setLiveCategories(cat.categories);
      }
    } catch (err) {
      if (requestId !== liveFetchIdRef.current) return;
      console.warn('Error loading live catalog for LiveSalesView:', err);
      const cat = getTenantCatalog(activeEmpresaId);
      setLiveProducts(cat.products);
      setLiveCategories(cat.categories);
      setServerTotalStock(null);
    } finally {
      if (requestId === liveFetchIdRef.current) {
        setIsLoadingLive(false);
      }
    }
  };

  useEffect(() => {
    const cat = getTenantCatalog(activeEmpresaId);
    setLiveProducts(cat.products);
    setLiveCategories(cat.categories);
    setSelectedCategory('Todas');
    setServerTotalStock(null);
    fetchLiveProducts('', stockOnlyFilter);
  }, [activeEmpresaId, stockOnlyFilter]);

  // Búsqueda en vivo ultra rápida con debounce reducido a 100ms
  const isFirstLiveSearchRef = useRef(true);
  useEffect(() => {
    if (isFirstLiveSearchRef.current) {
      isFirstLiveSearchRef.current = false;
      return;
    }
    if (!productSearch.trim()) {
      fetchLiveProducts('', stockOnlyFilter);
      return;
    }
    const timer = setTimeout(() => {
      fetchLiveProducts(productSearch, stockOnlyFilter);
    }, 100);
    return () => clearTimeout(timer);
  }, [productSearch, activeEmpresaId]);

  const filteredProducts = useMemo(() => {
    const rawSearch = productSearch.trim().toLowerCase();
    if (!rawSearch) {
      return liveProducts.filter(p => selectedCategory === 'Todas' || p.categoria === selectedCategory);
    }

    const cleanSearch = rawSearch.replace(/^(sku|código|codigo|cod|ref|item)[\s:#\-_]+/i, '').trim();
    const searchWords = cleanSearch.split(/\s+/).filter(Boolean);

    return liveProducts.filter(p => {
      const pSku = (p.sku || '').toLowerCase();
      const pNombre = (p.nombre || '').toLowerCase();
      const pCodigo = (p.codigoBarras || '').toLowerCase();
      const pCodInterno = (p.codigoInterno || '').toLowerCase();

      // Coincidencia exacta o parcial por código / SKU
      if (
        pSku.includes(cleanSearch) || 
        pCodigo.includes(cleanSearch) || 
        pCodInterno.includes(cleanSearch) ||
        pSku.includes(rawSearch)
      ) {
        return true;
      }

      // Coincidencia por palabras (todas las palabras deben estar presentes)
      return searchWords.every(word => 
        pNombre.includes(word) || pSku.includes(word) || pCodigo.includes(word) || pCodInterno.includes(word)
      );
    });
  }, [liveProducts, selectedCategory, productSearch]);

  const totalPrendasEnStock = useMemo(() => {
    if (serverTotalStock !== null && serverTotalStock > 0) {
      return serverTotalStock;
    }
    return liveProducts.reduce((sum, p) => sum + (p.stockTotal || 0), 0);
  }, [liveProducts, serverTotalStock]);

  const filteredBags = useMemo(() => {
    return bags.filter(b => {
      const matchStatus = filterTab === 'todas' 
        ? b.estado !== 'cancelada'
        : b.estado === filterTab;
      const matchQuery = b.cliente_nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.usuario_tiktok?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.telefono_whatsapp.includes(searchQuery);
      return matchStatus && matchQuery;
    });
  }, [bags, filterTab, searchQuery]);

  const handleDeleteBag = (bag: LiveCustomerBag) => {
    const prendasAviso = bag.items.length > 0 
      ? `\n\n⚠️ Tiene ${bag.items.length} prenda(s) apartada(s) que se devolverán inmediatamente al inventario disponible.`
      : '';
    if (window.confirm(`¿Seguro que deseas eliminar la canasta de "${bag.cliente_nombre}"?${prendasAviso}`)) {
      deleteBag(bag.id);
      if (activeBagId === bag.id) {
        const remaining = bags.filter(b => b.id !== bag.id);
        setActiveBagId(remaining[0]?.id || null);
      }
    }
  };

  const expiredBags = useMemo(() => {
    return bags.filter(b => 
      (b.estado === 'abierta' || b.estado === 'pendiente_pago') &&
      b.items.length > 0 &&
      getLiveDueDate(b.creado_en, boutiquePolicy, b.fecha_vencimiento).isExpired
    );
  }, [bags, boutiquePolicy]);

  const handleReleaseExpiredBags = () => {
    if (expiredBags.length === 0) return;
    const totalPrendas = expiredBags.reduce((acc, b) => acc + b.items.length, 0);
    if (window.confirm(`¿Deseas devolver al inventario las prendas de ${expiredBags.length} canasta(s) vencidas (${totalPrendas} prendas en total)?\n\nEstas clientas no pagaron dentro del plazo de su apartado y sus prendas quedarán inmediatamente disponibles para volver a venderse.`)) {
      const count = releaseExpiredBagsToStock(boutiquePolicy);
      alert(`✅ Se liberaron ${count} canasta(s) vencidas. ${totalPrendas} prenda(s) volvieron al stock disponible.`);
    }
  };

  // Canasta activa actual
  const currentActiveBag = useMemo(() => {
    return bags.find(b => b.id === activeBagId) || filteredBags[0] || null;
  }, [bags, activeBagId, filteredBags]);

  // Métricas del Live
  const metrics = useMemo(() => {
    const activeBagsList = bags.filter(b => b.estado !== 'cancelada');

    const totalApartadas = activeBagsList
      .reduce((acc, b) => acc + b.items.reduce((s, it) => s + it.cantidad, 0), 0);
    
    const totalVentas = activeBagsList
      .reduce((acc, b) => acc + b.total, 0);

    const totalVentasLivePrendas = activeBagsList
      .reduce((acc, b) => acc + b.subtotal, 0);

    const totalVentasShein = activeBagsList
      .filter(b => b.es_unificada_shein)
      .reduce((acc, b) => acc + (b.monto_shein || 0), 0);

    const totalEnvios = activeBagsList
      .filter(b => b.incluye_envio !== false)
      .reduce((acc, b) => acc + b.costo_envio, 0);

    const canastasConEnvio = activeBagsList.filter(b => b.incluye_envio !== false && b.costo_envio > 0).length;
    const canastasEntregaPersonal = activeBagsList.filter(b => b.incluye_envio === false || b.costo_envio === 0).length;
    const canastasUnificadas = activeBagsList.filter(b => b.es_unificada_shein).length;

    const totalAhorradoEnRemates = activeBagsList
      .reduce((acc, b) => acc + b.items.reduce((s, it) => s + (it.descuento * it.cantidad), 0), 0);

    const canastasAbiertas = activeBagsList.filter(b => b.estado === 'abierta').length;

    return { 
      totalApartadas, 
      totalVentas, 
      totalVentasLivePrendas,
      totalVentasShein,
      totalEnvios,
      canastasConEnvio,
      canastasEntregaPersonal,
      canastasUnificadas,
      totalAhorradoEnRemates, 
      canastasAbiertas 
    };
  }, [bags]);

  const handleCreateBagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBagForm.cliente_nombre || !newBagForm.telefono_whatsapp) return;

    const created = createBag(
      newBagForm.cliente_nombre,
      newBagForm.usuario_tiktok,
      newBagForm.telefono_whatsapp,
      newBagForm.direccion_envio,
      activeEmpresaId
    );

    setActiveBagId(created.id);
    setShowNewBagModal(false);
    setNewBagForm({ cliente_nombre: '', usuario_tiktok: '', telefono_whatsapp: '', direccion_envio: '' });
  };

  const handleApplyDiscount = (newPrice: number) => {
    if (editingItemPrice) {
      updateItemPrice(editingItemPrice.bagId, editingItemPrice.itemId, Math.max(0, newPrice));
      setEditingItemPrice(null);
      setCustomPriceInput('');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* BANNER DE DEMOSTRACIÓN: CLIENTE LIVE EXPRESS */}
      {currentEmpresa?.id === 99 && (
        <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-indigo-50 border border-rose-300/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-600 text-white flex items-center justify-center font-black shadow-md shadow-rose-600/20">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 flex items-center gap-2">
                Modo Demostración: Cliente "Boutique Chic Live" (Vendedora Informal TikTok)
                <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-mono text-[9px] uppercase font-black">
                  Plan Live Express Q99/mes
                </span>
              </p>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Así es exactamente como ve su pantalla la persona a quien le vendes este módulo: solo tiene <strong>Ventas en Vivo</strong>, <strong>Prendas de Inventario</strong> y <strong>WhatsApp</strong>, sin módulos contables ni nóminas innecesarias.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem('integrapro_active_empresa_id', '22');
              window.location.reload();
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] whitespace-nowrap shadow-xs transition-all cursor-pointer"
          >
            ← Volver a Fortexa (Cerebro SaaS)
          </button>
        </div>
      )}

      {/* 1. HEADER PRINCIPAL Y ESTADO DEL LIVE */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-tr from-rose-500 to-purple-600 rounded-2xl shadow-lg shadow-purple-500/20 text-white flex items-center justify-center">
                <Video className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                    TikTok Live & Canastas Abiertas
                  </h1>
                  {isLiveActive ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white shadow-lg shadow-rose-500/30 animate-pulse uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      EN VIVO AHORA
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                      Transmisión Pausada
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {currentSession?.titulo || 'Sesión de Venta en Vivo'} • {currentEmpresa?.nombre || 'Fashion Styles'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Reglas de Cobro de la Boutique */}
            <button
              type="button"
              onClick={() => {
                setTempPolicy({ ...boutiquePolicy });
                setShowPolicyModal(true);
              }}
              className="px-3.5 py-2.5 bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Configurar política de cobro y vencimiento de apartados"
            >
              <Settings className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Reglas de Cobro</span>
            </button>

            {isLiveActive ? (
              <button
                onClick={() => setShowEndLiveModal(true)}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/30 transition-all flex items-center gap-2 cursor-pointer"
                title="Cerrar la transmisión y ver el corte de caja del Live"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>Finalizar Live (Ver Corte)</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEndLiveModal(true)}
                  className="px-3.5 py-2.5 bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Ver el reporte de ventas del Live"
                >
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Resumen del Live</span>
                </button>
                <button
                  onClick={() => setShowStartLiveModal(true)}
                  className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Iniciar Nuevo Live</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setShowNewBagModal(true)}
              className="px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              + Nueva Clienta en Live
            </button>
          </div>
        </div>

        {/* MÉTODOS Y METRICAS DEL LIVE EN TIEMPO REAL */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
              <ShoppingBag className="w-3 h-3 text-purple-400" /> Canastas Abiertas
            </span>
            <p className="text-xl font-black text-white mt-0.5">{metrics.canastasAbiertas} activas</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-rose-400" /> Prendas Apartadas
            </span>
            <p className="text-xl font-black text-rose-300 mt-0.5">{metrics.totalApartadas} piezas</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1">
              <RefreshCcw className={`w-3 h-3 text-sky-400 ${isLoadingLive ? 'animate-spin' : ''}`} /> Prendas en Stock
            </span>
            <p className="text-xl font-black text-white mt-0.5">{totalPrendasEnStock} piezas</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" /> Ahorrado en Remates
            </span>
            <p className="text-xl font-black text-amber-300 mt-0.5">Q {metrics.totalAhorradoEnRemates.toFixed(2)}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-400" /> Total Cartera Live
            </span>
            <p className="text-xl font-black text-emerald-400 mt-0.5 font-mono">Q {metrics.totalVentas.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* BANNER DE ALERTA: CANASTAS VENCIDAS SEGÚN POLÍTICA */}
      {expiredBags.length > 0 && (
        <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border-2 border-rose-300 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black shadow-md shadow-rose-600/25 shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm flex items-center gap-2">
                ¡Atención! Hay {expiredBags.length} canasta(s) con plazo vencido sin pagar
                <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-mono text-[9px] uppercase font-black">
                  {boutiquePolicy.tipo === 'quincenal' ? 'Corte Quincena / Mes' :
                   boutiquePolicy.tipo === '24_horas' ? 'Plazo 24 Horas' :
                   boutiquePolicy.tipo === 'dias' ? `Plazo ${boutiquePolicy.dias || 2} Días` :
                   `Plazo ${boutiquePolicy.horas || 24} Horas`}
                </span>
              </p>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                {boutiquePolicy.tipo === 'quincenal' 
                  ? 'Estas clientas no pagaron dentro de los 5 días de gracia tras la quincena o fin de mes. Puedes devolver sus prendas al stock con un solo clic.'
                  : 'Estas clientas no pagaron dentro del plazo de apartado configurado. Puedes devolver sus prendas al stock con un solo clic.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReleaseExpiredBags}
            className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-xs whitespace-nowrap shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Devolver {expiredBags.reduce((a, b) => a + b.items.length, 0)} Prendas al Inventario</span>
          </button>
        </div>
      )}

      {/* SELECTOR RESPONSIVO PARA MÓVILES (CANASTA ACTIVA VS CATÁLOGO) */}
      <div className="lg:hidden flex items-center bg-slate-200/90 p-1 rounded-2xl shadow-inner gap-1">
        <button
          type="button"
          onClick={() => setMobileViewTab('canasta')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileViewTab === 'canasta'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Canasta {currentActiveBag ? `(${currentActiveBag.cliente_nombre.split(' ')[0]})` : 'Activa'}</span>
          {currentActiveBag && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              mobileViewTab === 'canasta' ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-800'
            }`}>
              {currentActiveBag.items.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setMobileViewTab('catalogo')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileViewTab === 'catalogo'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Catálogo de Prendas</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
            mobileViewTab === 'catalogo' ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-800'
          }`}>
            {totalPrendasEnStock}
          </span>
        </button>
      </div>

      {/* 2. AREA DE TRABAJO EN VIVO (2 COLUMNAS: CATÁLOGO RÁPIDO & CANASTA ACTIVA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: CATÁLOGO DE PRENDAS PARA APARTAR (5 COLUMNAS) */}
        <div className={`lg:col-span-5 space-y-4 ${mobileViewTab === 'catalogo' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-600" />
                  Catálogo Rápido para el Live
                </h2>
                <p className="text-[11px] text-slate-400">
                  Toca una prenda para meterla a la canasta seleccionada (descuenta stock al instante)
                </p>
              </div>
              <button
                type="button"
                onClick={() => fetchLiveProducts(productSearch, stockOnlyFilter)}
                className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-all flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                title="Recargar existencias en tiempo real desde la Base de Datos"
              >
                <RefreshCcw className={`w-3.5 h-3.5 ${isLoadingLive ? 'animate-spin' : ''}`} />
                <span>Actualizar</span>
              </button>
            </div>

            {/* FILTRO DE DISPONIBILIDAD EN STOCK & BUSCADOR */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStockOnlyFilter(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  stockOnlyFilter 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prendas en Stock ({serverTotalStock ?? totalPrendasEnStock})</span>
              </button>
              <button
                type="button"
                onClick={() => setStockOnlyFilter(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  !stockOnlyFilter 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>Catálogo Completo</span>
              </button>
            </div>

            {/* BUSCADOR DE PRENDAS ULTRA RÁPIDO */}
            <div className="relative">
              {isLoadingLive ? (
                <Loader2 className="w-4 h-4 absolute left-3 top-2.5 text-purple-600 animate-spin" />
              ) : (
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              )}
              <input
                type="text"
                placeholder={stockOnlyFilter ? "Buscar por SKU (ej: sb240228...), nombre o código..." : "Buscar en todo el catálogo o escanear SKU..."}
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchLiveProducts(productSearch, false);
                  }
                }}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
              {productSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setProductSearch('');
                    fetchLiveProducts('', stockOnlyFilter);
                  }}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
                  title="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* CATEGORÍAS */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {liveCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* GRILLA DE PRENDAS TÁCTILES */}
            {isLoadingLive && liveProducts.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                <p className="text-xs font-semibold">Cargando inventario real de prendas...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-xs font-semibold">No se encontraron prendas para este filtro</p>
                <p className="text-[10px] mt-1">Verifica el nombre o código SKU</p>
              </div>
            ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredProducts.map(prod => {
                const reservedCount = getStockReservationCount(prod.id);
                const availableStock = Math.max(0, prod.stockTotal - reservedCount);
                const isOutOfStock = availableStock <= 0;

                return (
                  <div
                    key={prod.id}
                    className={`group bg-slate-50 hover:bg-white border rounded-2xl p-2.5 transition-all flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md ${
                      isOutOfStock 
                        ? 'opacity-70 border-rose-200' 
                        : 'border-slate-200/80 hover:border-purple-300'
                    }`}
                  >
                    <div className="space-y-1.5">
                      {/* Imagen con zoom al hacer clic */}
                      <div 
                        onClick={() => prod.imagen && setEnlargedImageItem(prod)}
                        className="w-full h-24 rounded-xl bg-slate-200 overflow-hidden relative cursor-zoom-in group/img select-none"
                        title="Clic en la imagen para ampliar foto"
                      >
                        <img 
                          src={prod.imagen || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'} 
                          alt={prod.nombre}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="p-1.5 bg-white/90 text-slate-800 rounded-full shadow-md">
                            <ZoomIn className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <span className={`absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold ${
                          isOutOfStock
                            ? 'bg-rose-600 text-white shadow-sm'
                            : reservedCount > 0
                            ? 'bg-amber-500 text-slate-900 shadow-sm'
                            : 'bg-slate-900/80 text-white'
                        }`}>
                          {isOutOfStock ? 'Agotado en Live' : reservedCount > 0 ? `Disp: ${availableStock} (Res: ${reservedCount})` : `Stock: ${availableStock}`}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-[11px] font-bold text-slate-900 line-clamp-2 leading-tight">
                          {prod.nombre}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{prod.sku}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 mt-2">
                      <span className="text-xs font-black text-purple-700 font-mono">
                        Q {prod.precioVenta.toFixed(2)}
                      </span>
                      {/* Botón "+" único responsable de agregar a la canasta */}
                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isOutOfStock) {
                            alert(`¡Atención! "${prod.nombre}" no tiene unidades disponibles en el Inventario General (están apartadas en canastas activas o con stock en cero).`);
                            return;
                          }
                          if (currentActiveBag) {
                            addItemToBag(currentActiveBag.id, prod);
                          } else {
                            setShowNewBagModal(true);
                          }
                        }}
                        className={`p-1.5 rounded-lg text-white transition-all shadow-sm cursor-pointer ${
                          isOutOfStock 
                            ? 'bg-slate-400 cursor-not-allowed opacity-50' 
                            : 'bg-purple-600 hover:bg-purple-700 active:scale-95 shadow-purple-500/20'
                        }`}
                        title={isOutOfStock ? 'Agotado' : 'Agregar a la canasta activa'}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: CANASTA ACTIVA & GESTIÓN DE CLIENTA (7 COLUMNAS) */}
        <div className={`lg:col-span-7 space-y-4 ${mobileViewTab === 'canasta' ? 'block' : 'hidden lg:block'}`}>

          {/* BARRA DE BÚSQUEDA Y FILTRO DE CANASTAS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar canasta por clienta, @TikTok o teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto w-full sm:w-auto">
              {(['todas', 'abierta', 'pendiente_pago', 'despachada'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize whitespace-nowrap cursor-pointer transition-all ${
                    filterTab === tab
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab === 'todas' ? 'Todas' : tab === 'abierta' ? 'En Vivo' : tab === 'pendiente_pago' ? 'Por Cobrar' : 'Despachadas'}
                </button>
              ))}
            </div>
          </div>
          
          {/* SELECTOR RÁPIDO DE CLIENTA / CANASTA */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-3 overflow-x-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Canastas:</span>
              <div className="flex items-center gap-1.5">
                {filteredBags.map(b => (
                  <div key={b.id} className="relative inline-flex items-center">
                    <button
                      onClick={() => setActiveBagId(b.id)}
                      className={`pl-3 pr-2 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                        activeBagId === b.id
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{b.cliente_nombre.split(' ')[0]}</span>
                      <span className="text-[10px] opacity-80 font-mono">({b.items.length})</span>
                      {b.items.some(i => i.es_remate) && <Flame className="w-3 h-3 text-amber-300 fill-current" />}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBag(b);
                        }}
                        className={`p-0.5 rounded-md transition-colors cursor-pointer ml-0.5 ${
                          activeBagId === b.id 
                            ? 'text-purple-200 hover:text-white hover:bg-purple-700' 
                            : 'text-slate-400 hover:text-rose-600 hover:bg-slate-300'
                        }`}
                        title={`Eliminar canasta de ${b.cliente_nombre}`}
                      >
                        <X className="w-3 h-3" />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowNewBagModal(true)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Clienta</span>
            </button>
          </div>

          {/* DETALLE COMPLETO DE LA CANASTA ACTIVA */}
          {currentActiveBag ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
              
              {/* CABECERA DE LA CLIENTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                    {currentActiveBag.cliente_nombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">{currentActiveBag.cliente_nombre}</h3>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-purple-50 text-purple-700 border border-purple-200">
                        {currentActiveBag.usuario_tiktok}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Smartphone className="w-3 h-3 text-emerald-600" />
                        {currentActiveBag.telefono_whatsapp}
                      </span>
                      {currentActiveBag.direccion_envio && (
                        <span className="flex items-center gap-1 truncate max-w-xs text-slate-400">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {currentActiveBag.direccion_envio}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Badge Fecha Límite & Prórroga según Política */}
                  {(() => {
                    const due = getLiveDueDate(currentActiveBag.creado_en, boutiquePolicy, currentActiveBag.fecha_vencimiento);
                    return (
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border ${
                          due.isExpired
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Vence: {due.formattedDate}</span>
                          {due.isExpired ? (
                            <span className="font-black text-rose-600">(Vencida)</span>
                          ) : (
                            <span className="font-mono text-[10px] text-indigo-600 font-black">({due.daysRemaining}d)</span>
                          )}
                        </span>

                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-600" title="Dar prórroga a esta clienta">
                          <span className="px-1 text-slate-400 uppercase font-semibold text-[9px]">Prórroga:</span>
                          <button
                            type="button"
                            onClick={() => {
                              const next = new Date(due.dueDate.getTime() + 24 * 60 * 60 * 1000);
                              updateBagDueDate(currentActiveBag.id, next.toISOString());
                            }}
                            className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 text-slate-700 transition cursor-pointer shadow-2xs"
                            title="Dar 1 día más de plazo a esta clienta"
                          >
                            +1d
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const next = new Date(due.dueDate.getTime() + 2 * 24 * 60 * 60 * 1000);
                              updateBagDueDate(currentActiveBag.id, next.toISOString());
                            }}
                            className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 text-slate-700 transition cursor-pointer shadow-2xs"
                            title="Dar 2 días más de plazo a esta clienta"
                          >
                            +2d
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    currentActiveBag.estado === 'abierta' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    currentActiveBag.estado === 'pendiente_pago' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    currentActiveBag.estado === 'despachada' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                    currentActiveBag.estado === 'liquidada' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {currentActiveBag.estado === 'abierta' ? '● Canasta Abierta' :
                     currentActiveBag.estado === 'pendiente_pago' ? '⏳ Esperando Pago' :
                     currentActiveBag.estado === 'despachada' ? '📦 Despachada' : '✅ Cobrada'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDeleteBag(currentActiveBag)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Eliminar esta canasta"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar Canasta</span>
                  </button>
                </div>
              </div>

              {/* LISTA DE PRENDAS APARTADAS EN ESTA CANASTA */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>Prendas Apartadas ({currentActiveBag.items.length})</span>
                  <span>Stock Descontado al Vuelo</span>
                </div>

                {currentActiveBag.items.length === 0 ? (
                  <div className="py-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 space-y-2">
                    <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-bold text-slate-600">Esta canasta aún no tiene prendas apartadas</p>
                    <p className="text-[11px] text-slate-400">Toca cualquier producto del catálogo izquierdo para apartarlo</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {currentActiveBag.items.map(item => (
                      <div key={item.id} className="py-3 flex items-center justify-between gap-3 group">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imagen || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'}
                            alt={item.nombre}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.nombre}</h4>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                              <span className="font-mono">{item.sku}</span>
                              {item.talla && <span className="bg-slate-100 px-1.5 py-0.2 rounded font-bold">Talla: {item.talla}</span>}
                              {item.color && <span>• {item.color}</span>}
                            </div>
                          </div>
                        </div>

                        {/* PRECIO CON DESCUENTO DE REMATE & ACCIONES */}
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            {item.es_remate ? (
                              <div className="space-y-0.5">
                                <span className="text-[10px] text-slate-400 line-through block font-mono">
                                  Q {item.precio_original.toFixed(2)}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Flame className="w-3 h-3 text-rose-500 fill-current" />
                                  <span className="text-xs font-black text-rose-600 font-mono">
                                    Q {item.precio_final.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs font-black text-slate-900 font-mono">
                                Q {item.precio_final.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* BOTÓN RÁPIDO: MODIFICAR PRECIO / REMATE RELÁMPAGO */}
                          <button
                            title="Precio Especial / Remate al Vuelo"
                            onClick={() => {
                              setEditingItemPrice({
                                bagId: currentActiveBag.id,
                                itemId: item.id,
                                currentPrice: item.precio_final,
                                originalPrice: item.precio_original,
                                nombre: item.nombre
                              });
                              setCustomPriceInput(item.precio_final.toString());
                            }}
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                          >
                            <Flame className="w-3 h-3" />
                            <span>Remate</span>
                          </button>

                          {/* BOTÓN QUITAR (DEVUELVE STOCK) */}
                          <button
                            title="Quitar prenda y devolver al stock"
                            onClick={() => removeItemFromBag(currentActiveBag.id, item.id)}
                            className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* UNIFICACIÓN CON PEDIDO SHEIN (ENTREGA CONJUNTA) - CONDICIONADO A POLÍTICA DE LA BOUTIQUE */}
              {boutiquePolicy.vende_shein !== false && (
                <div className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${
                  currentActiveBag.es_unificada_shein 
                    ? 'bg-purple-50/70 border-purple-300 shadow-xs' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(currentActiveBag.es_unificada_shein)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updateSheinUnification(
                            currentActiveBag.id, 
                            checked, 
                            currentActiveBag.monto_shein || 0, 
                            currentActiveBag.descripcion_shein || ''
                          );
                        }}
                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">🔗 Unificar con Pedido SHEIN</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-200 text-purple-900">
                          Entrega Conjunta
                        </span>
                      </div>
                    </label>

                    {currentActiveBag.es_unificada_shein && (
                      <span className="text-xs font-black text-purple-700 font-mono">
                        + Q {(currentActiveBag.monto_shein || 0).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {currentActiveBag.es_unificada_shein && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-purple-200 animate-in fade-in duration-200">
                      <div>
                        <label className="text-[11px] font-black text-slate-800 block mb-1">
                          Monto / Saldo Pedido SHEIN (Q) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-xs font-black text-slate-500">Q</span>
                          <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={currentActiveBag.monto_shein || ''}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              updateSheinUnification(currentActiveBag.id, true, val, currentActiveBag.descripcion_shein);
                            }}
                            style={{ color: '#090d16', WebkitTextFillColor: '#090d16' }}
                            className="w-full pl-8 pr-3.5 py-2.5 bg-white border-2 border-purple-300 focus:border-purple-600 rounded-xl text-xs font-mono font-bold text-slate-950 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-black text-slate-800 block mb-1">
                          Detalle / Nota Pedido SHEIN
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Pedido Quincena Ropa + Zapatos"
                          value={currentActiveBag.descripcion_shein || ''}
                          onChange={(e) => {
                            updateSheinUnification(currentActiveBag.id, true, currentActiveBag.monto_shein, e.target.value);
                          }}
                          style={{ color: '#090d16', WebkitTextFillColor: '#090d16' }}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-purple-300 focus:border-purple-600 rounded-xl text-xs font-medium text-slate-950 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* GESTIÓN DE ENVÍO & MODALIDAD DE PAGO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                {/* ENVÍO CON OPCIÓN DESMARCABLE / ENTREGA PERSONAL */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={currentActiveBag.incluye_envio !== false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updateShippingOptions(
                            currentActiveBag.id, 
                            checked, 
                            currentActiveBag.costo_envio || 35.00, 
                            currentActiveBag.empresa_envio || 'Guatex'
                          );
                        }}
                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <span className="text-xs font-black text-slate-900 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-purple-600" />
                        Cobrar Envío de Paquetería
                      </span>
                    </label>
                  </div>

                  {currentActiveBag.incluye_envio !== false ? (
                    <select
                      value={currentActiveBag.empresa_envio || 'Guatex'}
                      onChange={(e) => {
                        const courier = e.target.value as any;
                        const cost = courier === 'Mensajero Local' ? 25.00 : 35.00;
                        updateShippingOptions(currentActiveBag.id, true, cost, courier);
                      }}
                      className="w-full text-xs font-bold p-2.5 bg-white rounded-xl border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600 cursor-pointer"
                    >
                      <option value="Guatex">Guatex Express (Q 35.00)</option>
                      <option value="Forza Delivery">Forza Delivery Express (Q 35.00)</option>
                      <option value="Cargo Expreso">Cargo Expreso (Q 35.00)</option>
                      <option value="Mensajero Local">Mensajero Local Capital (Q 25.00)</option>
                    </select>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-xs font-bold">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Entrega Personal / Cercana (Sin costo de envío - Q 0.00)</span>
                    </div>
                  )}
                </div>

                {/* MODALIDAD DE PAGO */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Modalidad de Pago:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updateBagStatus(currentActiveBag.id, currentActiveBag.estado, 'transferencia')}
                      className={`p-2.5 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                        currentActiveBag.metodo_pago === 'transferencia'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <span>🏦 Transferencia</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateBagStatus(currentActiveBag.id, currentActiveBag.estado, 'contra_entrega')}
                      className={`p-2.5 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                        currentActiveBag.metodo_pago === 'contra_entrega'
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <span>📦 Contra Entrega</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* DESGLOSE Y TOTAL CONSOLIDADO */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                <div className="flex justify-between text-xs text-slate-600 font-bold">
                  <span>👗 Prendas TikTok Live ({currentActiveBag.items.length} piezas):</span>
                  <span className="font-mono text-slate-900 font-black">Q {currentActiveBag.subtotal.toFixed(2)}</span>
                </div>

                {boutiquePolicy.vende_shein !== false && currentActiveBag.es_unificada_shein && (
                  <div className="flex justify-between text-xs text-purple-700 font-bold">
                    <span>📦 Pedido SHEIN Consolidado:</span>
                    <span className="font-mono font-black">+ Q {(currentActiveBag.monto_shein || 0).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs text-slate-600 font-bold">
                  <span>
                    🚚 Envío ({currentActiveBag.incluye_envio === false ? 'Entrega Personal' : (currentActiveBag.empresa_envio || 'Guatex')}):
                  </span>
                  <span className={`font-mono font-black ${currentActiveBag.incluye_envio === false ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {currentActiveBag.incluye_envio === false ? 'GRATIS (Q 0.00)' : `Q ${currentActiveBag.costo_envio.toFixed(2)}`}
                  </span>
                </div>

                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                      {boutiquePolicy.vende_shein !== false && currentActiveBag.es_unificada_shein ? 'Gran Total Unificado:' : 'Total a Cobrar:'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      📅 Fecha límite: {getLiveDueDate(currentActiveBag.creado_en, boutiquePolicy, currentActiveBag.fecha_vencimiento).formattedDate}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-purple-700 font-mono tracking-tight">
                      Q {currentActiveBag.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN: WHATSAPP, CONFIRMAR Y SALVAVIDAS */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                
                {/* BOTÓN WHATSAPP (EL MÁS USADO) */}
                <button
                  onClick={() => sendWhatsAppSummary(currentActiveBag)}
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>📲 Enviar Cuenta por WhatsApp</span>
                </button>

                {/* BOTÓN ESTADO: PAGO O DESPACHO */}
                {currentActiveBag.metodo_pago === 'contra_entrega' ? (
                  <button
                    onClick={() => updateBagStatus(currentActiveBag.id, 'despachada')}
                    className="py-3 px-4 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Marcar Despachada (Contra Entrega)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => updateBagStatus(currentActiveBag.id, 'liquidada')}
                    className="py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmar Boleta / Liquidada</span>
                  </button>
                )}

                {/* BOTÓN SALVAVIDAS: ELIMINAR CANASTA */}
                <button
                  type="button"
                  onClick={() => handleDeleteBag(currentActiveBag)}
                  className="py-3 px-4 bg-rose-50 hover:bg-rose-600 border border-rose-200 text-rose-700 hover:text-white font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group"
                  title="Eliminar canasta y devolver prendas al stock físico"
                >
                  <Trash2 className="w-4 h-4 text-rose-600 group-hover:text-white transition-colors" />
                  <span>Eliminar Canasta</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">No hay canasta seleccionada</h3>
              <p className="text-xs text-slate-400">Crea una nueva clienta en el botón superior o selecciona una existente.</p>
            </div>
          )}

        </div>
      </div>

      {/* 3. MODAL: MODIFICAR PRECIO / REMATE RELÁMPAGO */}
      {editingItemPrice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Precio Remate Live</h3>
                  <p className="text-[11px] text-slate-400">Ajusta el precio especial al vuelo</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingItemPrice(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-800 line-clamp-1">{editingItemPrice.nombre}</p>
              <p className="text-[11px] text-slate-400">
                Precio Normal: <strong className="font-mono text-slate-700">Q {editingItemPrice.originalPrice.toFixed(2)}</strong>
              </p>
            </div>

            {/* BOTONES RÁPIDOS DE DESCUENTO TÁCTIL */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Botones Rápidos de Remate:</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleApplyDiscount(editingItemPrice.originalPrice - 10)}
                  className="py-1.5 bg-slate-100 hover:bg-amber-100 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
                >
                  - Q 10
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyDiscount(editingItemPrice.originalPrice - 20)}
                  className="py-1.5 bg-slate-100 hover:bg-amber-100 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
                >
                  - Q 20
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyDiscount(editingItemPrice.originalPrice - 50)}
                  className="py-1.5 bg-slate-100 hover:bg-amber-100 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
                >
                  - Q 50
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyDiscount(editingItemPrice.originalPrice * 0.70)}
                  className="py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors"
                >
                  - 30% Off
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyDiscount(editingItemPrice.originalPrice * 0.50)}
                  className="py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors"
                >
                  - 50% Mitad
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyDiscount(editingItemPrice.originalPrice)}
                  className="py-1.5 bg-slate-100 hover:bg-slate-200 font-bold text-[10px] rounded-xl border border-slate-200 transition-colors"
                >
                  Restablecer
                </button>
              </div>
            </div>

            {/* PRECIO PERSONALIZADO MANUAL */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-black text-slate-800">O ingresar precio final exacto (Q):</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-black text-slate-500">Q</span>
                <input
                  type="number"
                  step="0.01"
                  value={customPriceInput}
                  onChange={(e) => setCustomPriceInput(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border-2 border-slate-300 focus:border-amber-500 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/15 shadow-xs transition-all"
                />
              </div>
            </div>

            <div className="flex gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingItemPrice(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-black border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleApplyDiscount(parseFloat(customPriceInput) || 0)}
                className="flex-1 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 active:scale-98 transition-all cursor-pointer"
              >
                Aplicar Precio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: CREAR NUEVA CLIENTA EN EL LIVE */}
      {showNewBagModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateBagSubmit} className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center shadow-xs">
                  <UserPlus className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">Nueva Clienta de TikTok Live</h3>
                  <p className="text-xs text-slate-500 font-medium">Crea su canasta de apartado al vuelo</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowNewBagModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <User className="w-4 h-4 text-purple-600" />
                  <span>Nombre Completo</span>
                  <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sofía Méndez"
                  value={newBagForm.cliente_nombre}
                  onChange={(e) => setNewBagForm({ ...newBagForm, cliente_nombre: e.target.value })}
                  style={{ color: '#090d16', WebkitTextFillColor: '#090d16' }}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-400 focus:border-purple-600 rounded-xl text-sm font-black text-slate-950 placeholder:text-slate-500 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-purple-500/20 shadow-xs transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 text-xs font-black flex items-center justify-center">@</span>
                    <span>Usuario TikTok</span>
                  </label>
                  <input
                    type="text"
                    placeholder="@sofia_gt"
                    value={newBagForm.usuario_tiktok}
                    onChange={(e) => setNewBagForm({ ...newBagForm, usuario_tiktok: e.target.value })}
                    style={{ color: '#090d16', WebkitTextFillColor: '#090d16' }}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-400 focus:border-purple-600 rounded-xl text-sm font-mono font-black text-slate-950 placeholder:text-slate-500 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-purple-500/20 shadow-xs transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                    <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="55443322"
                    value={newBagForm.telefono_whatsapp}
                    onChange={(e) => setNewBagForm({ ...newBagForm, telefono_whatsapp: e.target.value })}
                    style={{ color: '#090d16', WebkitTextFillColor: '#090d16' }}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-400 focus:border-emerald-600 rounded-xl text-sm font-mono font-black text-slate-950 placeholder:text-slate-500 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/20 shadow-xs transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Dirección de Envío</span>
                  <span className="text-[11px] font-semibold text-slate-500 normal-case">(Opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. Colonia San Cristóbal Zona 8 de Mixco"
                  value={newBagForm.direccion_envio}
                  onChange={(e) => setNewBagForm({ ...newBagForm, direccion_envio: e.target.value })}
                  style={{ color: '#090d16', WebkitTextFillColor: '#090d16' }}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-400 focus:border-purple-600 rounded-xl text-sm font-black text-slate-950 placeholder:text-slate-500 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-purple-500/20 shadow-xs transition-all"
                />
              </div>
            </div>

            <div className="flex gap-2.5 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowNewBagModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-black border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Crear Canasta</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. MODAL: INICIAR NUEVO LIVE */}
      {showStartLiveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center shadow-xs">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 leading-tight">Iniciar Transmisión Live</h3>
                <p className="text-xs text-slate-500 font-medium">Activa el contador y métricas en vivo</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-slate-800 block mb-1.5">Título de la Transmisión *</label>
              <input
                type="text"
                placeholder="Ej. Liquidación de Ropa de Temporada"
                value={newLiveTitle}
                onChange={(e) => setNewLiveTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border-2 border-slate-300 focus:border-rose-500 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-rose-500/15 shadow-xs transition-all"
              />
            </div>

            <div className="flex gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowStartLiveModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-black border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  startLiveSession(newLiveTitle, currentEmpresa?.id || 1);
                  setShowStartLiveModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>¡Comenzar Live!</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: VISOR / COMPARADOR DE FOTOGRAFÍA EN ALTA RESOLUCIÓN */}
      {enlargedImageItem && (
        <div 
          onClick={() => setEnlargedImageItem(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Cabecera del Visor */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{enlargedImageItem.nombre}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded font-mono">
                      SKU: {enlargedImageItem.sku}
                    </span>
                    {enlargedImageItem.codigoBarras && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        EAN: {enlargedImageItem.codigoBarras}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-slate-500">
                      • {enlargedImageItem.categoria}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => setEnlargedImageItem(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
                title="Cerrar imagen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen Ampliada */}
            <div className="p-6 bg-slate-900 flex items-center justify-center max-h-[65vh] overflow-hidden">
              <img 
                src={enlargedImageItem.imagen} 
                alt={enlargedImageItem.nombre} 
                className="max-h-[60vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Pie con Información y Acción Directa */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                <span>Precio: <strong className="text-purple-700 font-mono text-sm">Q {enlargedImageItem.precioVenta.toFixed(2)}</strong></span>
                <span>Stock Disponible: <strong className="text-slate-900 font-mono">{enlargedImageItem.stockTotal} unidades</strong></span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setEnlargedImageItem(null)}
                  className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const reserved = getStockReservationCount(enlargedImageItem.id);
                    const avail = Math.max(0, enlargedImageItem.stockTotal - reserved);
                    if (avail <= 0) {
                      alert(`¡Atención! "${enlargedImageItem.nombre}" no tiene unidades disponibles.`);
                      return;
                    }
                    if (currentActiveBag) {
                      addItemToBag(currentActiveBag.id, enlargedImageItem);
                    } else {
                      setShowNewBagModal(true);
                    }
                    setEnlargedImageItem(null);
                  }}
                  className="flex-1 sm:flex-none px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar a Canasta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: CORTE DE CAJA & RESUMEN DEL LIVE */}
      {showEndLiveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200 my-auto max-h-[90vh] overflow-y-auto">
            {/* Cabecera */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    Corte de Caja & Resumen del Live
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {currentSession?.titulo || 'Transmisión TikTok Live'}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowEndLiveModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tarjetas de Métricas del Live */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Total Ventas Live
                </span>
                <p className="text-2xl font-black text-purple-900 font-mono mt-1">
                  Q {metrics.totalVentasLivePrendas.toFixed(2)}
                </p>
                <span className="text-[10px] text-purple-600 font-bold">
                  {metrics.totalApartadas} prendas vendidas
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> Gran Total Unificado
                </span>
                <p className="text-2xl font-black text-emerald-900 font-mono mt-1">
                  Q {metrics.totalVentas.toFixed(2)}
                </p>
                <span className="text-[10px] text-emerald-700 font-bold">
                  Live + SHEIN + Envíos
                </span>
              </div>
            </div>

            {/* Desglose Estadístico */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-purple-600" />
                  Total Canastas / Clientas:
                </span>
                <span className="font-mono text-slate-900 font-black">{bags.length} clientas</span>
              </div>

              <div className="flex justify-between font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-purple-600" />
                  Canastas Unificadas con SHEIN:
                </span>
                <span className="font-mono text-purple-700 font-black">
                  {metrics.canastasUnificadas} (Q {metrics.totalVentasShein.toFixed(2)})
                </span>
              </div>

              <div className="flex justify-between font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  Con Envío de Paquetería:
                </span>
                <span className="font-mono text-slate-900 font-black">
                  {metrics.canastasConEnvio} (Q {metrics.totalEnvios.toFixed(2)})
                </span>
              </div>

              <div className="flex justify-between font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Entregas Personales (Q 0.00):
                </span>
                <span className="font-mono text-emerald-700 font-black">
                  {metrics.canastasEntregaPersonal} clientas
                </span>
              </div>
            </div>

            {/* Listado Resumido de Clientas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-slate-900">
                <span>Detalle de Canastas del Live</span>
                <span className="text-slate-400 font-medium">({bags.length} registradas)</span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs">
                {bags.map(b => (
                  <div key={b.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-black text-slate-900">{b.cliente_nombre}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                        <span>{b.items.length} prenda(s) Live</span>
                        {b.es_unificada_shein && <span className="text-purple-600 font-bold">• + SHEIN</span>}
                        <span>• {b.incluye_envio === false ? 'Entrega Personal' : (b.empresa_envio || 'Guatex')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-black text-slate-900 text-xs">Q {b.total.toFixed(2)}</span>
                      <span className={`block text-[9px] font-black uppercase ${
                        b.estado === 'abierta' ? 'text-amber-600' :
                        b.estado === 'pendiente_pago' ? 'text-blue-600' :
                        b.estado === 'liquidada' ? 'text-emerald-600' : 'text-slate-500'
                      }`}>
                        {b.estado === 'abierta' ? 'Abierta' : b.estado === 'pendiente_pago' ? 'Por Cobrar' : b.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  let text = `📊 CORTE DE CAJA - ${currentSession?.titulo || 'TIKTOK LIVE'}\n`;
                  text += `📅 Fecha: ${new Date().toLocaleDateString('es-GT')}\n`;
                  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
                  text += `💰 Total Ventas Live (Prendas): Q ${metrics.totalVentasLivePrendas.toFixed(2)}\n`;
                  text += `👗 Total Prendas Vendidas: ${metrics.totalApartadas} piezas\n`;
                  text += `📦 Total Unificado SHEIN: Q ${metrics.totalVentasShein.toFixed(2)}\n`;
                  text += `🚚 Total Envíos: Q ${metrics.totalEnvios.toFixed(2)}\n`;
                  text += `💵 GRAN TOTAL GENERAL: Q ${metrics.totalVentas.toFixed(2)}\n`;
                  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
                  text += `🛍️ CLIENTAS (${bags.length}):\n`;
                  bags.forEach((b, i) => {
                    text += `${i + 1}. ${b.cliente_nombre} - Q ${b.total.toFixed(2)} (${b.items.length} prendas${b.es_unificada_shein ? ' + SHEIN' : ''})\n`;
                  });
                  navigator.clipboard.writeText(text);
                  setCopiedSummary(true);
                  setTimeout(() => setCopiedSummary(false), 2500);
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-black border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? '¡Reporte Copiado!' : 'Copiar Reporte'}</span>
              </button>

              {isLiveActive ? (
                <button
                  type="button"
                  onClick={() => {
                    endLiveSession();
                    setShowEndLiveModal(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 active:scale-95 text-white shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>Finalizar Transmisión Live</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowEndLiveModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-black bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Continuar a Cobranza</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL: CONFIGURACIÓN DE POLÍTICA Y REGLAS DE COBRO DE LA BOUTIQUE */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Cabecera */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center shadow-xs">
                  <Settings className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">Reglas de Cobro & Vencimiento</h3>
                  <p className="text-xs text-slate-500 font-medium">Ajusta los plazos de apartado para tu negocio</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowPolicyModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de Modalidad de Cobro */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                Modalidad de Plazo y Vencimiento:
              </label>

              {/* Opción 1: Quincenal & Fin de Mes (+5 días de gracia) */}
              <div 
                onClick={() => setTempPolicy({ ...tempPolicy, tipo: 'quincenal' })}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  tempPolicy.tipo === 'quincenal'
                    ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-2 ring-purple-600/10'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="policy_tipo"
                  checked={tempPolicy.tipo === 'quincenal'}
                  onChange={() => setTempPolicy({ ...tempPolicy, tipo: 'quincenal' })}
                  className="mt-1 w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">Ciclo Quincenal & Fin de Mes (+5 días de gracia)</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-purple-200 text-purple-900">
                      Recomendado SHEIN
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Compras del 1 al 15 vencen el <strong>20</strong>. Compras del 16 a fin de mes vencen el <strong>5</strong> del siguiente mes. Ideal para ventas al crédito y pedidos coordinados con salarios.
                  </p>
                </div>
              </div>

              {/* Opción 2: Cobro Rápido 24 Horas */}
              <div 
                onClick={() => setTempPolicy({ ...tempPolicy, tipo: '24_horas', horas: 24 })}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  tempPolicy.tipo === '24_horas'
                    ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-2 ring-purple-600/10'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="policy_tipo"
                  checked={tempPolicy.tipo === '24_horas'}
                  onChange={() => setTempPolicy({ ...tempPolicy, tipo: '24_horas', horas: 24 })}
                  className="mt-1 w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">Cobro Rápido / 24 Horas (Al día siguiente)</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-100 text-amber-900">
                      Venta Rápida
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    La clienta debe enviar boleta de pago dentro de 24 horas tras el Live. Si no cancela, la canasta se marca como vencida para devolver las prendas al inventario.
                  </p>
                </div>
              </div>

              {/* Opción 3: Días personalizados */}
              <div 
                onClick={() => setTempPolicy({ ...tempPolicy, tipo: 'dias', dias: tempPolicy.dias || 2 })}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  tempPolicy.tipo === 'dias'
                    ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-2 ring-purple-600/10'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="policy_tipo"
                  checked={tempPolicy.tipo === 'dias'}
                  onChange={() => setTempPolicy({ ...tempPolicy, tipo: 'dias', dias: tempPolicy.dias || 2 })}
                  className="mt-1 w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <div className="flex-1 space-y-2">
                  <span className="text-xs font-black text-slate-900 block">Plazo Personalizado en Días</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Establece cuántos días naturales tiene la clienta para pagar su apartado tras el Live.
                  </p>
                  {tempPolicy.tipo === 'dias' && (
                    <div className="flex items-center gap-3 pt-1">
                      <label className="text-xs font-bold text-slate-700">Días de plazo:</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={tempPolicy.dias || 2}
                        onChange={(e) => setTempPolicy({ ...tempPolicy, dias: parseInt(e.target.value) || 1 })}
                        style={{ color: '#090d16', WebkitTextFillColor: '#090d16' }}
                        className="w-20 px-3 py-1.5 bg-white border-2 border-purple-300 focus:border-purple-600 rounded-xl text-xs font-mono font-black text-slate-950 focus:outline-none"
                      />
                      <span className="text-xs font-medium text-slate-500">día(s) naturales</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Opción 4: Horas personalizadas */}
              <div 
                onClick={() => setTempPolicy({ ...tempPolicy, tipo: 'horas', horas: tempPolicy.horas || 12 })}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  tempPolicy.tipo === 'horas'
                    ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-2 ring-purple-600/10'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="policy_tipo"
                  checked={tempPolicy.tipo === 'horas'}
                  onChange={() => setTempPolicy({ ...tempPolicy, tipo: 'horas', horas: tempPolicy.horas || 12 })}
                  className="mt-1 w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <div className="flex-1 space-y-2">
                  <span className="text-xs font-black text-slate-900 block">Plazo Personalizado en Horas</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Para remates con límite estricto en horas (ej. 12 horas, 48 horas).
                  </p>
                  {tempPolicy.tipo === 'horas' && (
                    <div className="flex items-center gap-3 pt-1">
                      <label className="text-xs font-bold text-slate-700">Horas de plazo:</label>
                      <input
                        type="number"
                        min="1"
                        max="168"
                        value={tempPolicy.horas || 12}
                        onChange={(e) => setTempPolicy({ ...tempPolicy, horas: parseInt(e.target.value) || 1 })}
                        style={{ color: '#090d16', WebkitTextFillColor: '#090d16' }}
                        className="w-20 px-3 py-1.5 bg-white border-2 border-purple-300 focus:border-purple-600 rounded-xl text-xs font-mono font-black text-slate-950 focus:outline-none"
                      />
                      <span className="text-xs font-medium text-slate-500">hora(s) desde el Live</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Toggle SHEIN: ¿Vende pedidos SHEIN? */}
            <div className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2">
              <label className="flex items-center justify-between cursor-pointer select-none">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-purple-600" />
                    ¿Tu tienda vende pedidos o prendas de SHEIN?
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Permite consolidar saldos de SHEIN con prendas del Live en un solo paquete y enviar una sola cuenta de WhatsApp.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={tempPolicy.vende_shein !== false}
                  onChange={(e) => setTempPolicy({ ...tempPolicy, vende_shein: e.target.checked })}
                  className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 cursor-pointer shrink-0 ml-3"
                />
              </label>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2.5 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowPolicyModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-black border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSavePolicy}
                className="flex-1 py-2.5 rounded-xl text-xs font-black bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Guardar Reglas de Cobro</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
