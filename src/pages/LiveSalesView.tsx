import React, { useState, useMemo } from 'react';
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
  X
} from 'lucide-react';
import { useLiveSales } from '../context/LiveSalesContext';
import { EmpresaSaaS } from '../types';
import { getTenantCatalog } from '../data/tenantProducts';

interface LiveSalesViewProps {
  currentEmpresa?: EmpresaSaaS;
}

export default function LiveSalesView({ currentEmpresa }: LiveSalesViewProps) {
  const {
    isLiveActive,
    currentSession,
    bags,
    startLiveSession,
    endLiveSession,
    createBag,
    addItemToBag,
    updateItemPrice,
    removeItemFromBag,
    updateShippingCost,
    updateBagStatus,
    cancelBag,
    sendWhatsAppSummary,
    getStockReservationCount
  } = useLiveSales();

  // Estados locales
  const [filterTab, setFilterTab] = useState<'todas' | 'abierta' | 'pendiente_pago' | 'despachada' | 'liquidada'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [activeBagId, setActiveBagId] = useState<string | null>(bags[0]?.id || null);

  // Modales
  const [showNewBagModal, setShowNewBagModal] = useState(false);
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

  // Catálogo de productos de la empresa
  const catalog = useMemo(() => {
    return getTenantCatalog(currentEmpresa?.id || 1);
  }, [currentEmpresa?.id]);

  const filteredProducts = useMemo(() => {
    return catalog.products.filter(p => {
      const matchCat = selectedCategory === 'Todas' || p.categoria === selectedCategory;
      const matchSearch = p.nombre.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.sku.toLowerCase().includes(productSearch.toLowerCase());
      return matchCat && matchSearch;
    }).slice(0, 18);
  }, [catalog, selectedCategory, productSearch]);

  const filteredBags = useMemo(() => {
    return bags.filter(b => {
      const matchStatus = filterTab === 'todas' || b.estado === filterTab;
      const matchQuery = b.cliente_nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.usuario_tiktok?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.telefono_whatsapp.includes(searchQuery);
      return matchStatus && matchQuery;
    });
  }, [bags, filterTab, searchQuery]);

  // Canasta activa actual
  const currentActiveBag = useMemo(() => {
    return bags.find(b => b.id === activeBagId) || filteredBags[0] || null;
  }, [bags, activeBagId, filteredBags]);

  // Métricas del Live
  const metrics = useMemo(() => {
    const totalApartadas = bags
      .filter(b => b.estado !== 'cancelada')
      .reduce((acc, b) => acc + b.items.reduce((s, it) => s + it.cantidad, 0), 0);
    
    const totalVentas = bags
      .filter(b => b.estado !== 'cancelada')
      .reduce((acc, b) => acc + b.total, 0);

    const totalAhorradoEnRemates = bags
      .filter(b => b.estado !== 'cancelada')
      .reduce((acc, b) => acc + b.items.reduce((s, it) => s + (it.descuento * it.cantidad), 0), 0);

    const canastasAbiertas = bags.filter(b => b.estado === 'abierta').length;

    return { totalApartadas, totalVentas, totalAhorradoEnRemates, canastasAbiertas };
  }, [bags]);

  const handleCreateBagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBagForm.cliente_nombre || !newBagForm.telefono_whatsapp) return;

    const created = createBag(
      newBagForm.cliente_nombre,
      newBagForm.usuario_tiktok,
      newBagForm.telefono_whatsapp,
      newBagForm.direccion_envio,
      currentEmpresa?.id || 1
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
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      
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
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white">
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

          <div className="flex flex-wrap items-center gap-3">
            {isLiveActive ? (
              <button
                onClick={endLiveSession}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Square className="w-4 h-4 fill-current" />
                Finalizar Live
              </button>
            ) : (
              <button
                onClick={() => setShowStartLiveModal(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Iniciar Nuevo Live
              </button>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" /> Ahorrado en Remates
            </span>
            <p className="text-xl font-black text-amber-300 mt-0.5">Q {metrics.totalAhorradoEnRemates.toFixed(2)}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-400" /> Total Cartera Live
            </span>
            <p className="text-xl font-black text-emerald-400 mt-0.5 font-mono">Q {metrics.totalVentas.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* 2. AREA DE TRABAJO EN VIVO (2 COLUMNAS: CATÁLOGO RÁPIDO & CANASTA ACTIVA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: CATÁLOGO DE PRENDAS PARA APARTAR (5 COLUMNAS) */}
        <div className="lg:col-span-5 space-y-4">
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
            </div>

            {/* BUSCADOR DE PRENDAS */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar prenda o escanear SKU..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            {/* CATEGORÍAS */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {['Todas', 'Blusas y Tops', 'Vestidos', 'Pantalones', 'Calzado', 'Accesorios'].map(cat => (
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredProducts.map(prod => {
                const reservedCount = getStockReservationCount(prod.id);
                const availableStock = Math.max(0, prod.stockTotal - reservedCount);
                const isOutOfStock = availableStock <= 0;

                return (
                  <div
                    key={prod.id}
                    onClick={() => {
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
                    className={`group bg-slate-50 hover:bg-purple-50/60 border rounded-2xl p-2.5 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                      isOutOfStock 
                        ? 'opacity-60 border-rose-200 hover:border-rose-300' 
                        : 'border-slate-200/80 hover:border-purple-300'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="w-full h-24 rounded-xl bg-slate-200 overflow-hidden relative">
                        <img 
                          src={prod.imagen || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'} 
                          alt={prod.nombre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
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
                      <span className={`p-1 rounded-lg text-white transition-colors shadow-sm ${
                        isOutOfStock ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600 group-hover:bg-purple-700'
                      }`}>
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: CANASTA ACTIVA & GESTIÓN DE CLIENTA (7 COLUMNAS) */}
        <div className="lg:col-span-7 space-y-4">

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
                  <button
                    key={b.id}
                    onClick={() => setActiveBagId(b.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      activeBagId === b.id
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{b.cliente_nombre.split(' ')[0]}</span>
                    <span className="text-[10px] opacity-80 font-mono">({b.items.length})</span>
                    {b.items.some(i => i.es_remate) && <Flame className="w-3 h-3 text-amber-300 fill-current" />}
                  </button>
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

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${
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

              {/* GESTIÓN DE ENVÍO & FORMA DE PAGO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-purple-600" />
                    Paquetería / Envío:
                  </label>
                  <select
                    value={currentActiveBag.empresa_envio || 'Guatex'}
                    onChange={(e) => {
                      const courier = e.target.value as any;
                      const cost = courier === 'Recoge en Tienda' ? 0 : 35.00;
                      updateShippingCost(currentActiveBag.id, cost, courier);
                    }}
                    className="w-full text-xs font-semibold p-2 bg-white rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="Guatex">Guatex Express (Q 35.00)</option>
                    <option value="Forza Delivery">Forza Delivery Express (Q 35.00)</option>
                    <option value="Cargo Expreso">Cargo Expreso (Q 35.00)</option>
                    <option value="Mensajero Local">Mensajero Local Capital (Q 25.00)</option>
                    <option value="Recoge en Tienda">Recoge en Tienda (Gratis / Q 0.00)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Modalidad de Pago:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updateBagStatus(currentActiveBag.id, currentActiveBag.estado, 'transferencia')}
                      className={`p-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                        currentActiveBag.metodo_pago === 'transferencia'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      🏦 Transferencia
                    </button>
                    <button
                      type="button"
                      onClick={() => updateBagStatus(currentActiveBag.id, currentActiveBag.estado, 'contra_entrega')}
                      className={`p-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                        currentActiveBag.metodo_pago === 'contra_entrega'
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      📦 Contra Entrega
                    </button>
                  </div>
                </div>
              </div>

              {/* TOTAL CONSOLIDADO */}
              <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-slate-400">Total Unificado de la Canasta:</p>
                  <p className="text-[11px] text-slate-500">
                    Prendas: Q {currentActiveBag.subtotal.toFixed(2)} + Envío: Q {currentActiveBag.costo_envio.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                    Q {currentActiveBag.total.toFixed(2)}
                  </span>
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

                {/* BOTÓN SALVAVIDAS: CANCELAR Y DEVOLVER STOCK */}
                <button
                  onClick={() => {
                    if (window.confirm(`¿Seguro que deseas cancelar la canasta de ${currentActiveBag.cliente_nombre}? Todas las prendas se devolverán inmediatamente al inventario disponible.`)) {
                      cancelBag(currentActiveBag.id);
                    }
                  }}
                  className="py-3 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Devolver prendas inmediatamente al stock físico"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>Cancelar Canasta (Devolver Stock)</span>
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
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
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
              <label className="text-[11px] font-bold text-slate-700">O ingresar precio final exacto (Q):</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">Q</span>
                <input
                  type="number"
                  step="0.01"
                  value={customPriceInput}
                  onChange={(e) => setCustomPriceInput(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingItemPrice(null)}
                className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleApplyDiscount(parseFloat(customPriceInput) || 0)}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
              >
                Aplicar Precio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: CREAR NUEVA CLIENTA EN EL LIVE */}
      {showNewBagModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateBagSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Nueva Clienta de TikTok Live</h3>
                  <p className="text-[11px] text-slate-400">Crea su canasta de apartado al vuelo</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowNewBagModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sofia Méndez"
                  value={newBagForm.cliente_nombre}
                  onChange={(e) => setNewBagForm({ ...newBagForm, cliente_nombre: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Usuario TikTok</label>
                  <input
                    type="text"
                    placeholder="@sofia_gt"
                    value={newBagForm.usuario_tiktok}
                    onChange={(e) => setNewBagForm({ ...newBagForm, usuario_tiktok: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="55443322"
                    value={newBagForm.telefono_whatsapp}
                    onChange={(e) => setNewBagForm({ ...newBagForm, telefono_whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Dirección de Envío (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. Colonia San Cristóbal Zona 8 de Mixco"
                  value={newBagForm.direccion_envio}
                  onChange={(e) => setNewBagForm({ ...newBagForm, direccion_envio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowNewBagModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 cursor-pointer"
              >
                Crear Canasta
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. MODAL: INICIAR NUEVO LIVE */}
      {showStartLiveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Iniciar Transmisión Live</h3>
                <p className="text-[11px] text-slate-400">Activa el contador y métricas en vivo</p>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Título de la Transmisión</label>
              <input
                type="text"
                value={newLiveTitle}
                onChange={(e) => setNewLiveTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowStartLiveModal(false)}
                className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  startLiveSession(newLiveTitle, currentEmpresa?.id || 1);
                  setShowStartLiveModal(false);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20 cursor-pointer"
              >
                ¡Comenzar Live!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
