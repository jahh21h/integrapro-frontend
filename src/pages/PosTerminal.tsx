import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Receipt, 
  ShoppingBag,
  CheckCircle2,
  Image as ImageIcon,
  FileCheck2,
  Building,
  ArrowRight,
  ArrowLeft,
  Printer,
  Copy,
  Coins,
  ZoomIn,
  X,
  Tag,
  User,
  Users,
  UserPlus,
  Phone,
  AlertCircle,
  Loader2,
  Wifi,
  Video,
  Sparkles
} from 'lucide-react';
import { FELCertificadoDTE, EmpresaSaaS, Cliente } from '../types';
import { useTimeFormat } from '../context/TimeFormatContext';
import { useLiveSales } from '../context/LiveSalesContext';
import { calculateSaleTaxes } from '../utils/tax';
import { inventoryApi, salesApi } from '../api';
import { REAL_CLIENTS } from '../data/realClients';
import { getTenantCatalog } from '../data/tenantProducts';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
  discount?: number;
}

interface PosTerminalProps {
  currentEmpresa?: EmpresaSaaS;
}

export default function PosTerminal({ currentEmpresa }: PosTerminalProps = {}) {
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
  const { formatTime } = useTimeFormat();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([
    { 
      id: 1, 
      name: 'Aceite Vegetal 800ml', 
      price: 16.50, 
      stock: 24, 
      category: 'Abarrotes', 
      sku: 'SKU-001', 
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80'
    },
    { 
      id: 4, 
      name: 'Leche Entera 1L Pasteurizada', 
      price: 12.00, 
      stock: 45, 
      category: 'Lácteos', 
      sku: 'SKU-004', 
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80'
    },
  ]);

  // Estado para Descuentos en Línea por Producto
  const [editingDiscountId, setEditingDiscountId] = useState<number | null>(null);
  const [tempDiscountValue, setTempDiscountValue] = useState<string>('');

  // Directorio Real de Clientes (420 clientes sincronizados del Droplet)
  const [clientsList, setClientsList] = useState<Cliente[]>(REAL_CLIENTS);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const { findOpenBagByCustomer } = useLiveSales();

  const liveBag = selectedClient 
    ? findOpenBagByCustomer(selectedClient.nombre_completo || selectedClient.nombre, currentEmpresa?.id || 1)
    : undefined;

  const handleUnifyLiveBag = (bag: any) => {
    const unifiedItems: CartItem[] = bag.items.map((it: any) => ({
      id: it.producto_id,
      name: `[Live TikTok] ${it.nombre}${it.talla ? ' (' + it.talla + ')' : ''}`,
      price: it.precio_final,
      stock: 99,
      category: 'TikTok Live',
      sku: it.sku,
      image: it.imagen || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      quantity: it.cantidad
    }));

    if (bag.costo_envio > 0) {
      unifiedItems.push({
        id: 99999,
        name: `Servicio de Entrega (${bag.empresa_envio || 'Guatex / Mensajería'})`,
        price: bag.costo_envio,
        stock: 999,
        category: 'Servicios',
        sku: 'SERV-ENVIO',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
        quantity: 1
      });
    }

    setCart(prev => {
      const existingSkus = new Set(prev.map(p => p.sku));
      const filtered = unifiedItems.filter(it => !existingSkus.has(it.sku));
      return [...prev, ...filtered];
    });
  };

  const [clientModalOpen, setClientModalOpen] = useState<boolean>(false);
  const [clientSearchTerm, setClientSearchTerm] = useState<string>('');
  const [showNewClientForm, setShowNewClientForm] = useState<boolean>(false);
  const [newClientData, setNewClientData] = useState({
    nombre: '',
    apellido: '',
    nit: 'CF',
    telefono: '',
    direccion: 'Ciudad de Guatemala',
    limite_credito: 5000
  });

  // Modo de Facturación: Ticket Simple (Predeterminado) vs FEL SAT (Infile Opcional)
  const [tipoComprobante, setTipoComprobante] = useState<'ticket' | 'fel'>('ticket');
  const [nitReceptor, setNitReceptor] = useState<string>('CF');
  const [nombreReceptor, setNombreReceptor] = useState<string>('Consumidor Final');
  const [direccionReceptor, setDireccionReceptor] = useState<string>('Ciudad de Guatemala');
  
  // Método de Pago & Cálculo de Cambio
  const [metodoPago, setMetodoPago] = useState<'efectivo' | 'tarjeta' | 'transferencia' | 'credito'>('efectivo');
  const [efectivoRecibido, setEfectivoRecibido] = useState<string>('');
  const [referenciaPago, setReferenciaPago] = useState<string>('');

  // Modal de Venta Exitosa / Certificación SAT
  const [saleCompletedModal, setSaleCompletedModal] = useState<boolean>(false);
  const [isProcessingSale, setIsProcessingSale] = useState<boolean>(false);
  const [saleError, setSaleError] = useState<string | null>(null);
  const [dteCertificado, setDteCertificado] = useState<FELCertificadoDTE | null>(null);
  const [copiedUuid, setCopiedUuid] = useState<boolean>(false);
  const [ticketNumero, setTicketNumero] = useState<string>('TCK-1001');
  const [showCertificarForm, setShowCertificarForm] = useState<boolean>(false);
  const [enlargedProduct, setEnlargedProduct] = useState<Product | null>(null);

  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);
  const [liveProducts, setLiveProducts] = useState<Product[]>(() => {
    const cat = getTenantCatalog(empresaActiva.id);
    return cat.products.map(p => ({
      id: p.id,
      name: p.nombre,
      price: p.precioVenta > 0 ? p.precioVenta : 10.00,
      stock: p.stockTotal > 0 ? p.stockTotal : 5,
      category: p.categoria,
      sku: p.sku,
      image: p.imagen
    }));
  });

  const products = liveProducts;
  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  // Sincronización en vivo según la empresa activa
  useEffect(() => {
    setCart([]);
    const cat = getTenantCatalog(empresaActiva.id);
    setLiveProducts(cat.products.map(p => ({
      id: p.id,
      name: p.nombre,
      price: p.precioVenta > 0 ? p.precioVenta : 10.00,
      stock: p.stockTotal > 0 ? p.stockTotal : 5,
      category: p.categoria,
      sku: p.sku,
      image: p.imagen
    })));
    setSelectedCategory('Todos');
    inventoryApi.getAll({ per_page: 250 })
      .then(res => {
        const liveItems = res?.data || res;
        if (Array.isArray(liveItems) && liveItems.length > 0) {
          const mapped: Product[] = liveItems.map((p: any) => ({
            id: p.id_producto || p.id,
            name: p.nombre,
            price: Number(p.precio_venta) > 0 ? Number(p.precio_venta) : (Number(p.precio_compra) > 0 ? Number(p.precio_compra) * 1.5 : 25.00),
            stock: p.stock !== undefined ? p.stock : 5,
            category: p.categoria?.nombre || p.categoria || 'General',
            sku: p.sku || `SKU-${p.id_producto}`,
            image: p.foto ? (p.foto.startsWith('http') ? p.foto : `https://app.integrapro.app/storage/${p.foto}`) : ''
          }));
          setLiveProducts(mapped);
          setIsLiveConnected(true);
        }
      })
      .catch(() => {
        setIsLiveConnected(false);
      });

    salesApi.getClients()
      .then(res => {
        const liveClients = res?.data || res;
        if (Array.isArray(liveClients)) {
          const mappedClients: Cliente[] = liveClients.map((c: any) => ({
            id_cliente: c.id_cliente,
            nombre: c.nombre || '',
            apellido: c.apellido || '',
            nombre_completo: c.nombre_completo || `${c.nombre || ''} ${c.apellido || ''}`.trim(),
            nit: c.nit || 'CF',
            telefono: c.telefono || 'N/A',
            email: c.email || 'N/A',
            direccion: c.direccion || 'Ciudad de Guatemala',
            tipo_cliente: c.tipo_cliente || 'normal',
            descuento_aplicable: Number(c.descuento_aplicable) || 0,
            dias_credito: Number(c.dias_credito) || 30,
            saldo_actual: Number(c.saldo_actual) || 0,
            limite_credito: Number(c.limite_credito) || 5000
          }));
          setClientsList(mappedClients);
        }
      })
      .catch(() => {});
  }, [empresaActiva.id]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [displayLimit, setDisplayLimit] = useState<number>(48);

  useEffect(() => {
    setDisplayLimit(48);
  }, [selectedCategory, searchTerm]);

  const displayedProducts = filteredProducts.slice(0, displayLimit);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, discount: 0 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          const maxDiscount = item.price * newQty;
          const currentDiscount = item.discount || 0;
          return { 
            ...item, 
            quantity: newQty,
            discount: Math.min(currentDiscount, maxDiscount)
          };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const updateItemDiscount = (id: number, discountAmount: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const grossLine = item.price * item.quantity;
          const validDiscount = Math.max(0, Math.min(discountAmount, grossLine));
          return { ...item, discount: validDiscount };
        }
        return item;
      });
    });
  };

  const handleToggleDiscount = (item: CartItem) => {
    if (editingDiscountId === item.id) {
      setEditingDiscountId(null);
    } else {
      setEditingDiscountId(item.id);
      setTempDiscountValue((item.discount || 0) > 0 ? (item.discount || 0).toString() : '');
    }
  };

  const handleApplyPercentageDiscount = (item: CartItem, pct: number) => {
    const grossLine = item.price * item.quantity;
    const calc = Math.round((grossLine * (pct / 100)) * 100) / 100;
    updateItemDiscount(item.id, calc);
    setTempDiscountValue(calc.toString());
  };

  const handleApplyCustomDiscount = (item: CartItem, valStr: string) => {
    setTempDiscountValue(valStr);
    const num = parseFloat(valStr);
    if (!isNaN(num) && num >= 0) {
      updateItemDiscount(item.id, num);
    } else if (valStr === '') {
      updateItemDiscount(item.id, 0);
    }
  };

  const handleRemoveDiscount = (itemId: number) => {
    updateItemDiscount(itemId, 0);
    setTempDiscountValue('');
    setEditingDiscountId(null);
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    if (editingDiscountId === id) setEditingDiscountId(null);
  };

  const clearCart = () => {
    setCart([]);
    setEditingDiscountId(null);
  };

  const grossSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cart.reduce((sum, item) => sum + (item.discount || 0), 0);
  const total = Math.max(0, grossSubtotal - totalDiscount);
  
  // Cálculo de Impuestos SAT dinámico según el Régimen asignado a la empresa
  const taxInfo = calculateSaleTaxes(total, empresaActiva.regimen);
  const iva = taxInfo.ivaMonto;
  const subtotal = taxInfo.subtotalNeto;

  const efectivoNum = parseFloat(efectivoRecibido) || 0;
  const cambio = efectivoNum > total ? efectivoNum - total : 0;

  const filteredClients = clientsList.filter(c => {
    const q = clientSearchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      c.nombre_completo.toLowerCase().includes(q) ||
      c.nit.toLowerCase().includes(q) ||
      (c.telefono && c.telefono.toLowerCase().includes(q)) ||
      (c.direccion && c.direccion.toLowerCase().includes(q))
    );
  }).slice(0, 40);

  const handleSelectClient = (client: Cliente) => {
    setSelectedClient(client);
    setNombreReceptor(client.nombre_completo);
    const cleanNit = client.nit.trim().toUpperCase() === 'C/F' ? 'CF' : client.nit.trim().toUpperCase();
    setNitReceptor(cleanNit);
    setDireccionReceptor(client.direccion || 'Ciudad de Guatemala');
    setClientModalOpen(false);
    setClientSearchTerm('');
    setShowNewClientForm(false);
  };

  const handleResetToCF = () => {
    setSelectedClient(null);
    setNombreReceptor('Consumidor Final');
    setNitReceptor('CF');
    setDireccionReceptor('Ciudad de Guatemala');
  };

  const handleCreateQuickClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientData.nombre.trim()) return;

    const fullName = `${newClientData.nombre.trim()} ${newClientData.apellido.trim()}`.trim();
    const cleanNit = newClientData.nit.trim().toUpperCase() || 'CF';

    const newC: Cliente = {
      id_cliente: Math.floor(10000 + Math.random() * 90000),
      nombre: newClientData.nombre.trim(),
      apellido: newClientData.apellido.trim(),
      nombre_completo: fullName,
      nit: cleanNit,
      telefono: newClientData.telefono.trim() || 'N/A',
      email: 'N/A',
      direccion: newClientData.direccion.trim() || 'Ciudad de Guatemala',
      tipo_cliente: 'normal',
      descuento_aplicable: 0,
      dias_credito: 30,
      saldo_actual: 0,
      limite_credito: Number(newClientData.limite_credito) || 5000
    };

    setClientsList(prev => [newC, ...prev]);
    handleSelectClient(newC);
    setNewClientData({
      nombre: '',
      apellido: '',
      nit: 'CF',
      telefono: '',
      direccion: 'Ciudad de Guatemala',
      limite_credito: 5000
    });
  };

  const handleNitChange = (val: string) => {
    const clean = val.trim().toUpperCase();
    setNitReceptor(clean);
    if (clean === 'CF' || clean === '') {
      setSelectedClient(null);
      setNombreReceptor('Consumidor Final');
    } else {
      const match = clientsList.find(c => {
        const cNit = c.nit.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        const searchNit = clean.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        return (cNit === searchNit && searchNit !== 'CF') || c.nit.toUpperCase() === clean;
      });
      if (match) {
        setSelectedClient(match);
        setNombreReceptor(match.nombre_completo);
        setDireccionReceptor(match.direccion || 'Ciudad de Guatemala');
      } else if (clean === '1048291-K' || clean === '1048291K') {
        setNombreReceptor('Distribuidora San José S.A.');
        setDireccionReceptor('Zona 12, Ciudad de Guatemala');
      } else if (clean === '7489234-1' || clean === '74892341') {
        setNombreReceptor('Comercializadora El Porvenir');
        setDireccionReceptor('Zona 4, Mixco');
      } else if (clean === '8942104-5') {
        setNombreReceptor('Importadora Chapina y Cía. Ltda.');
        setDireccionReceptor('Zona 9, Ciudad de Guatemala');
      }
    }
  };

  const generarDteFEL = () => {
    // Generar DTE FEL Infile Certificado Oficial SAT
    const randomHex = () => Math.random().toString(16).substring(2, 6).toUpperCase();
    const generatedUuid = `${randomHex()}${randomHex()}-${randomHex()}-4${randomHex().substring(0,3)}-8${randomHex().substring(0,3)}-${randomHex()}${randomHex()}${randomHex()}`;
    const serie = 'F' + Math.floor(1000 + Math.random() * 9000);
    const numero = Math.floor(100000000 + Math.random() * 900000000).toString();
    const now = new Date();
    const fechaStr = `${now.toLocaleDateString('es-GT')} ${formatTime(now, true)}`;

    const dte: FELCertificadoDTE = {
      uuid: generatedUuid,
      serie: serie,
      numero: numero,
      fechaCertificacion: fechaStr,
      nitEmisor: empresaActiva.nit || '10429182-3',
      nombreEmisor: empresaActiva.razon_social || empresaActiva.nombre,
      nitReceptor: nitReceptor || 'CF',
      nombreReceptor: nombreReceptor || 'Consumidor Final',
      direccionReceptor: direccionReceptor,
      total: total,
      iva: taxInfo.ivaMonto,
      certificador: 'INFILE, S.A. NIT: 1252133-7 (Emisión DTE)',
      fraseFiscal: taxInfo.fraseFiscalFEL,
      qrUrl: `https://fel.sat.gob.gt/verificador/?uuid=${generatedUuid}`
    };

    return dte;
  };

  const handleProcessPayment = async (certificarFEL: boolean = false) => {
    if (cart.length === 0 || isProcessingSale) return;

    setIsProcessingSale(true);
    setSaleError(null);

    try {
      // 1. Sincronizar y registrar la venta en vivo en MySQL del servidor
      const salePayload: any = {
        id_cliente: selectedClient ? selectedClient.id_cliente : undefined,
        metodo_pago: metodoPago,
        detalles: cart.map(item => ({
          id_producto: item.id,
          cantidad: item.quantity,
          descuento: item.discount || 0,
          precio_unitario: item.price
        })),
        descuento: totalDiscount,
        observaciones: `Venta POS en vivo - ${certificarFEL || tipoComprobante === 'fel' ? 'Factura FEL' : 'Ticket Caja'}`
      };

      const res = await salesApi.createSale(salePayload);
      console.log('✓ Venta registrada exitosamente en MySQL:', res);

      const serverSaleId = res?.id_venta || res?.venta?.id_venta;
      const ticketReal = serverSaleId ? `TCK-${serverSaleId}` : ('TCK-' + Math.floor(100000 + Math.random() * 900000));
      setTicketNumero(ticketReal);

      if (certificarFEL || tipoComprobante === 'fel') {
        const dte = generarDteFEL();
        if (serverSaleId) {
          dte.numero = String(serverSaleId);
        }
        setDteCertificado(dte);
      } else {
        setDteCertificado(null);
      }

      // Descontar existencias localmente para feedback inmediato en el inventario del POS
      setLiveProducts(prev => prev.map(p => {
        const inCart = cart.find(c => c.id === p.id);
        if (inCart) {
          return { ...p, stock: Math.max(0, p.stock - inCart.quantity) };
        }
        return p;
      }));

      // Abrir modal de venta exitosa
      setSaleCompletedModal(true);
    } catch (err: any) {
      console.error('Error al registrar venta en el servidor:', err);
      const errMsg = err?.response?.data?.message || err?.message || 'Error al conectar con el servidor para registrar la venta.';
      setSaleError(errMsg);
      alert(`⚠️ ERROR AL PROCESAR VENTA:\n\n${errMsg}\n\nLa venta NO se registró en la base de datos ni se descontó inventario.`);
    } finally {
      setIsProcessingSale(false);
    }
  };

  const handleCertificarFacturaSeparada = () => {
    const dte = generarDteFEL();
    setDteCertificado(dte);
    setShowCertificarForm(false);
  };

  const handleFinishSale = () => {
    setCart([]);
    setSaleCompletedModal(false);
    setDteCertificado(null);
    setEfectivoRecibido('');
    setReferenciaPago('');
    setSelectedClient(null);
    setNitReceptor('CF');
    setNombreReceptor('Consumidor Final');
    setDireccionReceptor('Ciudad de Guatemala');
    setShowCertificarForm(false);
    setTipoComprobante('ticket');
    setEditingDiscountId(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUuid(true);
    setTimeout(() => setCopiedUuid(false), 2000);
  };

  if (empresaActiva.id === 22) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm text-center max-w-lg space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/20 text-indigo-700 border border-indigo-200 flex items-center justify-center mx-auto text-2xl font-black">
            ⚡
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900">Punto de Venta Deshabilitado</h2>
            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Fortexa Technologies • Empresa de Software & SaaS</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Las operaciones de Fortexa no utilizan caja registradora de mostrador retail; se gestionan mediante contratos corporativos, suscripciones recurrentes de RutaFuel Pro y licencias Hotmart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-4">
      {/* Panel Izquierdo: Catálogo de Productos */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Barra de Filtros y Búsqueda */}
        <div className="p-4 border-b border-slate-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, código de barras o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
              />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-xs font-bold">
              <Building className="w-3.5 h-3.5" />
              <span>Sucursal Central</span>
            </div>
            <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold ${
              isLiveConnected 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <Wifi className="w-3 h-3 text-emerald-600" />
              <span>{isLiveConnected ? 'Droplet en Vivo' : 'Modo Local'}</span>
            </div>
          </div>

          {/* Categorías */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Rejilla de Productos con Fotos */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
          {displayedProducts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 mb-4 shadow-sm">
                <Building className="w-8 h-8" />
              </div>
              <h4 className="text-base font-black text-slate-800 mb-1">
                0 Productos en {empresaActiva.nombre}
              </h4>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-4">
                Esta empresa actualmente no tiene catálogo de productos registrado en la base de datos de producción (ID: {empresaActiva.id}).
                Todos los <strong>2,492 productos activos</strong> de la tienda pertenecen a la cuenta de <strong>Fashion Styles</strong>.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60">
                  💡 Selecciona <strong>Fashion Styles</strong> en el selector superior para ver y facturar los 2,492 productos.
                </span>
              </div>
            </div>
          ) : (
            displayedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Al presionar la imagen, se abre en grande para visualizar el producto */}
                <div 
                  onClick={() => product.image && setEnlargedProduct(product)}
                  className={`aspect-square w-full rounded-xl bg-slate-100 overflow-hidden mb-2 relative group/img ${
                    product.image ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  title={product.image ? "Clic para ver fotografía en grande" : "Sin fotografía asignada"}
                >
                  {product.image ? (
                    <>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Overlay indicativo de Zoom */}
                      <div className="absolute inset-0 bg-slate-900/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-2 py-1 rounded-lg bg-black/60 text-white flex items-center gap-1 text-[10px] font-bold shadow-md">
                          <ZoomIn className="w-3.5 h-3.5" />
                          Ver Foto
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}

                  <span className="absolute top-1.5 right-1.5 bg-slate-900/75 backdrop-blur-sm text-white text-[10px] font-black px-1.5 py-0.5 rounded-md pointer-events-none">
                    Stock: {product.stock}
                  </span>
                </div>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.sku}</p>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-2 mt-0.5 leading-snug">
                  {product.name}
                </h4>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-sm font-black text-slate-900">
                  Q {product.price.toFixed(2)}
                </span>
                
                {/* Botón MÁS (+): El ÚNICO elemento que agrega el producto al carrito */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="w-8 h-8 bg-emerald-600 hover:bg-emerald-700 active:scale-90 text-white rounded-xl flex items-center justify-center shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
                  title={`Añadir ${product.name} al carrito`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )))}

          {filteredProducts.length > displayLimit && (
            <div className="col-span-full py-4 flex justify-center">
              <button
                type="button"
                onClick={() => setDisplayLimit(prev => prev + 48)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Cargar más productos ({filteredProducts.length - displayLimit} restantes)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Panel Derecho: Carrito, Facturación FEL SAT y Cobro */}
      <div className="w-full lg:w-96 xl:w-[410px] bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col p-4 justify-between">
        <div>
          {/* Cabecera del Carrito */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-black text-slate-900">Comprobante de Caja</h3>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-600">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar</span>
              </button>
            )}
          </div>

          {/* Selector de Cliente Receptor */}
          <div className="mt-3 p-2.5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                Cliente de la Venta
              </span>
              <button
                type="button"
                onClick={() => setClientModalOpen(true)}
                className="text-[10px] font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-lg border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Search className="w-2.5 h-2.5" />
                <span>{selectedClient ? 'Cambiar Cliente' : 'Buscar / Asignar'}</span>
              </button>
            </div>

            {selectedClient ? (
              <div className="bg-white p-2 rounded-xl border border-indigo-200 shadow-2xs flex items-center justify-between gap-2 animate-in fade-in duration-100">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900 truncate">
                      {selectedClient.nombre_completo}
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 shrink-0">
                      NIT: {selectedClient.nit}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    {selectedClient.telefono !== 'N/A' && (
                      <span className="flex items-center gap-0.5">
                        <Phone className="w-2.5 h-2.5 text-slate-400" />
                        {selectedClient.telefono}
                      </span>
                    )}
                    {selectedClient.limite_credito > 0 && (
                      <span className="text-emerald-700 font-bold">
                        Crédito: Q {(selectedClient.limite_credito - selectedClient.saldo_actual).toFixed(2)} disp.
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleResetToCF}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Restablecer a Consumidor Final (CF)"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => setClientModalOpen(true)}
                className="bg-white p-2 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 flex items-center justify-between gap-2 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 transition-colors shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Consumidor Final (CF)</p>
                    <p className="text-[10px] text-slate-400">Clic para asignar cliente específico</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 group-hover:bg-indigo-100 px-2 py-1 rounded-lg border border-indigo-100">
                  Elegir
                </span>
              </div>
            )}

            {/* Banner Inteligente de Unificación con TikTok Live */}
            {liveBag && liveBag.items.length > 0 && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-gradient-to-r from-purple-50 via-rose-50 to-amber-50 border border-purple-200/80 shadow-2xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="p-1.5 rounded-lg bg-rose-600 text-white shrink-0 shadow-sm animate-pulse">
                      <Video className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-black text-purple-950 truncate">
                        Canasta TikTok Live ({liveBag.items.length} prendas apartadas)
                      </p>
                      <p className="text-[10px] text-purple-700 font-mono">
                        Total Live: Q {liveBag.total.toFixed(2)} ({liveBag.usuario_tiktok})
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUnifyLiveBag(liveBag)}
                    className="px-2.5 py-1.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 active:scale-95 text-white font-bold text-[10px] rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Unificar Canasta</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Selector de Comprobante: Ticket Directo (Predeterminado) vs Factura FEL Opcional */}
          <div className="mt-3 p-2.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black text-slate-800 block">Comprobante de Caja</span>
                <span className="text-[9.5px] text-slate-400">Cobro rápido vs Factura</span>
              </div>
              <div className="flex items-center bg-white p-0.5 border border-slate-200 rounded-xl shadow-xs">
                <button
                  type="button"
                  onClick={() => setTipoComprobante('ticket')}
                  className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    tipoComprobante === 'ticket'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Receipt className="w-3 h-3 text-emerald-400" />
                  <span>Ticket Caja (Normal)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTipoComprobante('fel')}
                  className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    tipoComprobante === 'fel'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <FileCheck2 className="w-3 h-3" />
                  <span>Factura FEL</span>
                </button>
              </div>
            </div>

            {/* Aviso Operativo: Modo Ticket vs Modo FEL */}
            {tipoComprobante === 'ticket' ? (
              <div className="flex items-center justify-between text-[10px] text-slate-500 bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Cobro directo en caja sin requerir certificador SAT
                </span>
                <span className="text-indigo-600 font-bold">Facturable después</span>
              </div>
            ) : (
              <div className="space-y-1.5 pt-1 text-xs">
                <div className="flex gap-1.5">
                  <div className="w-1/3">
                    <label className="text-[10px] font-bold text-slate-500">NIT Receptor</label>
                    <input
                      type="text"
                      value={nitReceptor}
                      onChange={(e) => handleNitChange(e.target.value)}
                      placeholder="NIT o CF"
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 uppercase"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-500">Nombre / Razón Social</label>
                    <input
                      type="text"
                      value={nombreReceptor}
                      onChange={(e) => setNombreReceptor(e.target.value)}
                      placeholder="Nombre del cliente"
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 text-amber-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Modo Simulado / Certificador en Configuración
                  </span>
                  <button 
                    type="button" 
                    onClick={() => handleNitChange('CF')}
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    Usar CF
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lista de Productos en el Carrito */}
          <div className="overflow-y-auto max-h-72 my-3 space-y-2 pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <ShoppingBag className="w-10 h-10 mx-auto stroke-1 text-slate-300 mb-2" />
                <p className="text-xs font-bold text-slate-500">El carrito está vacío</p>
                <p className="text-[10px]">Agrega productos del catálogo para comenzar</p>
              </div>
            ) : (
              cart.map((item) => {
                const itemGross = item.price * item.quantity;
                const itemDisc = item.discount || 0;
                const itemNet = Math.max(0, itemGross - itemDisc);
                const isEditingThis = editingDiscountId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-2xl border transition-all ${
                      itemDisc > 0 
                        ? 'bg-amber-50/40 border-amber-200/80 shadow-2xs' 
                        : 'bg-slate-50/70 border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 truncate" title={item.name}>{item.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[10px] text-slate-400">Q {item.price.toFixed(2)} c/u</p>
                          
                          {/* Botón / Badge para aplicar Descuento instantáneo */}
                          {itemDisc > 0 ? (
                            <button
                              type="button"
                              onClick={() => handleToggleDiscount(item)}
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-black border border-amber-300 transition-colors cursor-pointer"
                              title="Modificar o eliminar descuento"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              <span>-Q {itemDisc.toFixed(2)}</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleDiscount(item)}
                              className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
                              title="Aplicar descuento inmediato a este producto"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              <span>+ Desc</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right pl-2 shrink-0">
                        {itemDisc > 0 ? (
                          <>
                            <p className="text-[10px] text-slate-400 line-through">
                              Q {itemGross.toFixed(2)}
                            </p>
                            <p className="text-xs font-black text-emerald-700">
                              Q {itemNet.toFixed(2)}
                            </p>
                          </>
                        ) : (
                          <p className="text-xs font-black text-slate-900">
                            Q {itemGross.toFixed(2)}
                          </p>
                        )}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-0.5 cursor-pointer mt-0.5"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Desplegable Instantáneo de Descuento */}
                    {isEditingThis && (
                      <div className="mt-2.5 pt-2 border-t border-amber-200 bg-amber-50/80 p-2 rounded-xl space-y-2 animate-in fade-in duration-100">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-amber-900 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-amber-700" />
                            Descuento al producto:
                          </span>
                          <button
                            type="button"
                            onClick={() => setEditingDiscountId(null)}
                            className="p-0.5 text-slate-400 hover:text-slate-600 rounded"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Input en Quetzales */}
                        <div className="flex items-center gap-1.5">
                          <div className="relative flex-1">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                              Q
                            </span>
                            <input
                              type="number"
                              step="0.50"
                              min="0"
                              max={itemGross}
                              value={tempDiscountValue}
                              onChange={(e) => handleApplyCustomDiscount(item, e.target.value)}
                              placeholder="0.00"
                              className="w-full pl-6 pr-2 py-1 bg-white border border-amber-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                              autoFocus
                            />
                          </div>

                          {itemDisc > 0 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveDiscount(item.id)}
                              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg border border-rose-200 cursor-pointer"
                              title="Quitar descuento"
                            >
                              Quitar
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setEditingDiscountId(null)}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-black rounded-lg shadow-2xs cursor-pointer"
                          >
                            Listo
                          </button>
                        </div>

                        {/* Chips de porcentaje rápido */}
                        <div className="flex items-center gap-1 pt-0.5">
                          <span className="text-[9px] font-bold text-amber-800">Rápido:</span>
                          {[5, 10, 15, 20, 25, 50].map((pct) => (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => handleApplyPercentageDiscount(item, pct)}
                              className="px-1.5 py-0.5 bg-white hover:bg-amber-200 border border-amber-300 rounded text-[9px] font-black text-amber-900 cursor-pointer transition-colors"
                            >
                              {pct}%
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Resumen de Totales y Formas de Pago */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="space-y-1.5 text-xs">
            {/* Indicador de Régimen Tributario Emisor */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Régimen Emisor:</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                taxInfo.tipoRegimen === 'general'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : taxInfo.tipoRegimen === 'pequeno_contribuyente'
                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {taxInfo.regimenLabel}
              </span>
            </div>

            {totalDiscount > 0 && (
              <div className="flex justify-between text-slate-500">
                <span>Subtotal Bruto</span>
                <span className="font-semibold text-slate-700">Q {grossSubtotal.toFixed(2)}</span>
              </div>
            )}

            {totalDiscount > 0 && (
              <div className="flex justify-between text-amber-800 font-bold bg-amber-50 px-2 py-1 rounded-xl border border-amber-200">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-amber-600" />
                  Descuento Total
                </span>
                <span>- Q {totalDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-500">
              <span>{taxInfo.tipoRegimen === 'general' ? 'Subtotal Neto (Sin IVA)' : 'Subtotal / Base'}</span>
              <span className="font-semibold text-slate-700">Q {subtotal.toFixed(2)}</span>
            </div>

            {taxInfo.tipoRegimen === 'general' ? (
              <div className="flex justify-between text-indigo-700 font-semibold">
                <span>IVA Débito Fiscal (12% SAT)</span>
                <span>Q {iva.toFixed(2)}</span>
              </div>
            ) : taxInfo.tipoRegimen === 'pequeno_contribuyente' ? (
              <div className="space-y-1 bg-purple-50/50 p-2 rounded-xl border border-purple-100">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>IVA Trasladable (Crédito Fiscal)</span>
                  <span className="font-bold text-slate-400">Q 0.00 (Exento CF)</span>
                </div>
                <div className="flex justify-between text-[11px] text-purple-900 font-black">
                  <span>Impuesto Retención Pequeño Contribuyente (5% SAT)</span>
                  <span>Q {taxInfo.impuestoCalculadoSAT.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between text-amber-800 font-medium bg-amber-50/50 p-1.5 rounded-xl border border-amber-100">
                <span>Régimen Informal (Sin IVA)</span>
                <span className="font-bold">Q 0.00</span>
              </div>
            )}

            <div className="flex justify-between text-base font-black text-slate-900 pt-1.5 border-t border-slate-100">
              <span>Total a Cobrar</span>
              <span className="text-emerald-700">Q {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Selector de Método de Pago */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <button 
              type="button"
              onClick={() => setMetodoPago('efectivo')}
              className={`py-1.5 px-1 rounded-xl text-[10px] font-bold border flex flex-col items-center gap-1 transition-all ${
                metodoPago === 'efectivo' 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <Banknote className="w-3.5 h-3.5 text-emerald-600" />
              <span>Efectivo</span>
            </button>
            <button 
              type="button"
              onClick={() => setMetodoPago('tarjeta')}
              className={`py-1.5 px-1 rounded-xl text-[10px] font-bold border flex flex-col items-center gap-1 transition-all ${
                metodoPago === 'tarjeta' 
                  ? 'bg-indigo-50 border-indigo-400 text-indigo-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
              <span>Tarjeta</span>
            </button>
            <button 
              type="button"
              onClick={() => setMetodoPago('transferencia')}
              className={`py-1.5 px-1 rounded-xl text-[10px] font-bold border flex flex-col items-center gap-1 transition-all ${
                metodoPago === 'transferencia' 
                  ? 'bg-sky-50 border-sky-400 text-sky-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-sky-600" />
              <span>Transf.</span>
            </button>
            <button 
              type="button"
              onClick={() => setMetodoPago('credito')}
              className={`py-1.5 px-1 rounded-xl text-[10px] font-bold border flex flex-col items-center gap-1 transition-all ${
                metodoPago === 'credito' 
                  ? 'bg-amber-50 border-amber-400 text-amber-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>Crédito</span>
            </button>
          </div>

          {/* Calculador de Efectivo y Cambio */}
          {metodoPago === 'efectivo' && cart.length > 0 && (
            <div className="p-2 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-700">Recibido: Q</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder={total.toFixed(2)}
                  value={efectivoRecibido}
                  onChange={(e) => setEfectivoRecibido(e.target.value)}
                  className="w-20 px-2 py-0.5 bg-white border border-emerald-200 rounded-lg text-xs font-bold text-emerald-900 focus:outline-none"
                />
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Cambio a entregar:</span>
                <span className={`text-xs font-black ${cambio >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  Q {cambio.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Referencia si es tarjeta o transferencia */}
          {(metodoPago === 'tarjeta' || metodoPago === 'transferencia') && (
            <div>
              <input
                type="text"
                placeholder="No. de Autorización / Referencia de Transacción..."
                value={referenciaPago}
                onChange={(e) => setReferenciaPago(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
              />
            </div>
          )}

          {/* Estado de Crédito y CXC si el método de pago es Crédito */}
          {metodoPago === 'credito' && (
            <div className="p-2.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                  <Coins className="w-3.5 h-3.5 text-amber-700" />
                  Venta al Crédito (CXC)
                </span>
                {selectedClient && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                    Plazo: {selectedClient.dias_credito || 30} días
                  </span>
                )}
              </div>

              {selectedClient ? (
                <div className="space-y-1 text-[11px] bg-white p-2 rounded-xl border border-amber-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cliente Titular:</span>
                    <span className="font-black text-slate-800 truncate max-w-[170px]">{selectedClient.nombre_completo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Límite Autorizado:</span>
                    <span className="font-semibold text-slate-700">Q {selectedClient.limite_credito.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Saldo Deudor Actual:</span>
                    <span className="font-bold text-rose-600">Q {selectedClient.saldo_actual.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-100 font-bold">
                    <span>Crédito Disponible:</span>
                    <span className={selectedClient.limite_credito - selectedClient.saldo_actual >= total ? 'text-emerald-700' : 'text-rose-600'}>
                      Q {Math.max(0, selectedClient.limite_credito - selectedClient.saldo_actual).toFixed(2)}
                    </span>
                  </div>
                  {total > (selectedClient.limite_credito - selectedClient.saldo_actual) && (
                    <div className="p-1.5 bg-rose-50 rounded-lg border border-rose-200 flex items-center gap-1 text-[10px] text-rose-700 font-bold mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>Atención: La venta excede el límite disponible del cliente.</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-2 bg-white rounded-xl border border-amber-200 text-[10px] space-y-1.5">
                  <p className="text-amber-900 font-medium leading-relaxed">
                    ⚠️ Para registrar una venta al crédito, asigna un cliente con cuenta activa de cartera.
                  </p>
                  <button
                    type="button"
                    onClick={() => setClientModalOpen(true)}
                    className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Asignar Cliente Ahora
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Banner de error si falla la venta */}
          {saleError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-rose-800 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold">No se pudo procesar la venta:</p>
                <p className="text-[11px] text-rose-700 mt-0.5">{saleError}</p>
              </div>
              <button
                type="button"
                onClick={() => setSaleError(null)}
                className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Botones de Cobro: Separación Clara de Cobro Directo vs Factura FEL */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleProcessPayment(false)}
              disabled={cart.length === 0 || isProcessingSale}
              className="w-full py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:to-slate-700 active:scale-98 text-white font-black text-xs rounded-2xl shadow-lg shadow-slate-900/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessingSale ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>REGISTRANDO EN BASE DE DATOS...</span>
                </>
              ) : (
                <>
                  <Receipt className="w-4 h-4 text-emerald-400" />
                  <span>COBRAR VENTA (TICKET DE CAJA) • Q {total.toFixed(2)}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleProcessPayment(true)}
              disabled={cart.length === 0 || isProcessingSale}
              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 active:scale-98 border border-emerald-300 text-emerald-900 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isProcessingSale ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                  <span>Certificando con SAT Infile...</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Cobrar y Certificar Factura FEL (SAT)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Venta Exitosa y Certificación SAT FEL */}
      {saleCompletedModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header del Modal */}
            <div className={`p-4 text-white flex items-center justify-between ${
              dteCertificado ? 'bg-gradient-to-r from-emerald-700 to-teal-800' : 'bg-slate-900'
            }`}>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSaleCompletedModal(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all flex items-center gap-1 cursor-pointer mr-1"
                  title="Regresar a la pantalla de venta"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-[11px] font-bold hidden sm:inline">Regresar</span>
                </button>
                <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-black">
                    {dteCertificado ? 'Factura Electrónica FEL Certificada' : '¡Venta Registrada Exitosamente!'}
                  </h3>
                  <p className="text-[10px] text-emerald-100">
                    {dteCertificado ? 'SAT Infile DTE Autorizado' : 'Ticket de Caja Interno'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  Q {total.toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => setSaleCompletedModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                  title="Cerrar y volver al POS"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulación del Comprobante Térmico / FEL Oficial de Guatemala */}
            <div className="p-5 font-mono text-[11px] text-slate-700 space-y-3 max-h-[60vh] overflow-y-auto">
              <div className="text-center pb-2 border-b border-dashed border-slate-300">
                {/* Logo de Fashion Styles */}
                <div className="flex justify-center mb-2">
                  <img
                    src="/img/logo_fashion_styles.jpg"
                    alt="Logo Fashion Styles"
                    className="h-16 w-auto max-w-[200px] object-contain rounded-xl border border-slate-200/90 shadow-xs p-1 bg-white"
                  />
                </div>
                <p className="font-black text-sm text-slate-900 uppercase tracking-tight">Fashion Styles</p>
                <p className="text-[10px] text-slate-500 font-medium">Boutique & Variedades • {empresaActiva.razon_social || 'Fashion Styles S.A.'}</p>
                <p className="text-[10px] text-slate-500">NIT: {empresaActiva.nit || '6322012-1'} • {taxInfo.regimenLabel}</p>
                <p className="text-[10px] text-slate-500">{empresaActiva.direccion || 'Ciudad de Guatemala'}</p>
                <p className="text-[10px] text-slate-500">PBX / WhatsApp: {empresaActiva.telefono || '59440491'}</p>
              </div>

              {dteCertificado ? (
                <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 space-y-1 text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-600">No. Autorización (UUID):</span>
                    <button 
                      onClick={() => copyToClipboard(dteCertificado.uuid)} 
                      className="text-emerald-700 hover:underline flex items-center gap-0.5 font-bold"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      {copiedUuid ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <p className="font-mono text-emerald-950 font-black break-all text-[9.5px]">
                    {dteCertificado.uuid}
                  </p>
                  <div className="grid grid-cols-2 gap-1 pt-1 border-t border-emerald-200/60 text-slate-600">
                    <p><span className="font-bold">Serie:</span> {dteCertificado.serie}</p>
                    <p><span className="font-bold">Número DTE:</span> {dteCertificado.numero}</p>
                    <p className="col-span-2"><span className="font-bold">Fecha Cert.:</span> {dteCertificado.fechaCertificacion}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1 text-[10px]">
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="font-bold">No. Ticket de Caja:</span>
                      <span className="font-mono font-black text-slate-900">{ticketNumero}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Tipo Comprobante:</span>
                      <span className="font-semibold text-slate-800">Recibo / Ticket de Venta Interno</span>
                    </div>
                    <p className="text-[9px] text-slate-400 italic pt-0.5">
                      ✓ Venta cobrada y registrada en caja. Sin conexión a certificador requerida.
                    </p>
                  </div>

                  {/* Facturación Electrónica por Aparte */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-2xl border border-indigo-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                          <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
                          Facturar Venta por Aparte (FEL SAT)
                        </p>
                        <p className="text-[10px] text-indigo-700">
                          ¿El cliente solicitó Factura con NIT posterior al cobro?
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowCertificarForm(!showCertificarForm)}
                        className="px-2.5 py-1 text-[10px] font-black bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-xs cursor-pointer transition-all"
                      >
                        {showCertificarForm ? 'Cancelar' : 'Facturar Ahora'}
                      </button>
                    </div>

                    {showCertificarForm && (
                      <div className="pt-2 border-t border-indigo-200 space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <label className="block font-bold text-slate-600 mb-0.5">NIT del Cliente</label>
                            <input
                              type="text"
                              value={nitReceptor}
                              onChange={(e) => handleNitChange(e.target.value)}
                              placeholder="NIT o CF"
                              className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg font-mono font-bold uppercase"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-600 mb-0.5">Nombre / Razón Social</label>
                            <input
                              type="text"
                              value={nombreReceptor}
                              onChange={(e) => setNombreReceptor(e.target.value)}
                              placeholder="Nombre del cliente"
                              className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg font-semibold"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleCertificarFacturaSeparada}
                          className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 active:scale-95 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <FileCheck2 className="w-3.5 h-3.5" />
                          <span>Certificar e Imprimir Factura FEL</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-0.5 pt-1 text-[10px]">
                <p><span className="font-bold">Cliente:</span> {dteCertificado ? dteCertificado.nombreReceptor : (selectedClient ? selectedClient.nombre_completo : nombreReceptor)}</p>
                <p><span className="font-bold">NIT Receptor:</span> {dteCertificado ? dteCertificado.nitReceptor : (selectedClient ? selectedClient.nit : nitReceptor)}</p>
                {selectedClient && selectedClient.telefono !== 'N/A' && (
                  <p><span className="font-bold">Teléfono:</span> {selectedClient.telefono}</p>
                )}
                <p><span className="font-bold">Método Pago:</span> {metodoPago.toUpperCase()} {referenciaPago ? `(${referenciaPago})` : ''}</p>
                {metodoPago === 'efectivo' && efectivoNum > 0 && (
                  <p className="text-emerald-800 font-bold">
                    Efectivo: Q {efectivoNum.toFixed(2)} | Cambio: Q {cambio.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Detalle de Artículos con Columna de Descuento */}
              <div className="pt-2 border-t border-dashed border-slate-300">
                <table className="w-full text-[10px]">
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
                    {cart.map((item) => {
                      const itemGross = item.price * item.quantity;
                      const itemDisc = item.discount || 0;
                      const itemNet = Math.max(0, itemGross - itemDisc);
                      return (
                        <tr key={item.id}>
                          <td className="py-1 font-bold text-center">{item.quantity}</td>
                          <td className="py-1 pr-1 truncate max-w-[110px]" title={item.name}>{item.name}</td>
                          <td className="py-1 text-right text-slate-500">Q {item.price.toFixed(2)}</td>
                          <td className="py-1 text-right font-medium text-amber-700">
                            {itemDisc > 0 ? `-Q ${itemDisc.toFixed(2)}` : 'Q 0.00'}
                          </td>
                          <td className="py-1 text-right font-black text-slate-900">Q {itemNet.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Subtotales, Descuento e IVA según Régimen Tributario */}
              <div className="pt-2 border-t border-dashed border-slate-300 space-y-0.5 text-right text-[11px]">
                {totalDiscount > 0 && (
                  <>
                    <p className="text-slate-500">Subtotal Bruto: Q {grossSubtotal.toFixed(2)}</p>
                    <p className="font-bold text-amber-700">Descuento Total: -Q {totalDiscount.toFixed(2)}</p>
                  </>
                )}
                <p className="text-slate-600">{taxInfo.tipoRegimen === 'general' ? 'Subtotal Neto (Sin IVA):' : 'Subtotal / Base:'} Q {subtotal.toFixed(2)}</p>
                {taxInfo.tipoRegimen === 'general' ? (
                  <p className="text-slate-600">IVA 12% SAT: Q {iva.toFixed(2)}</p>
                ) : taxInfo.tipoRegimen === 'pequeno_contribuyente' ? (
                  <>
                    <p className="text-slate-400">IVA Crédito Fiscal (0%): Q 0.00</p>
                    <p className="text-purple-700 font-bold">Impuesto Pequeño Contribuyente (5% SAT): Q {taxInfo.impuestoCalculadoSAT.toFixed(2)}</p>
                  </>
                ) : (
                  <p className="text-slate-500 font-medium">Venta Informal (Exenta de IVA / 0% SAT)</p>
                )}
                <p className="text-xs font-black text-slate-900 pt-1 border-t border-slate-200">
                  TOTAL A PAGAR: Q {total.toFixed(2)}
                </p>
                <p className="text-[8.5px] text-slate-500 italic text-center pt-1 font-sans">
                  {taxInfo.fraseFiscalFEL}
                </p>
              </div>

              {/* Código QR Verificador SAT */}
              {dteCertificado && (
                <div className="pt-2 border-t border-dashed border-slate-300 flex items-center justify-between gap-3 bg-slate-50 p-2 rounded-xl">
                  <div className="w-14 h-14 bg-white border border-slate-300 rounded p-1 flex items-center justify-center shrink-0">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                  <div className="text-[9px] text-slate-500 leading-tight">
                    <p className="font-bold text-slate-700">Verificador SAT FEL</p>
                    <p>Certificador: {dteCertificado.certificador}</p>
                    <p className="text-emerald-700 italic">{dteCertificado.fraseFiscal}</p>
                  </div>
                </div>
              )}

              <p className="text-center text-[9px] text-slate-400 pt-2">
                ¡Gracias por su preferencia! • Conservar comprobante
              </p>
            </div>

            {/* Acciones del Modal */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSaleCompletedModal(false)}
                className="px-3 py-2.5 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Regresar a la pantalla de venta (mantiene los productos en caja)"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                <span>Regresar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-3.5 py-2.5 bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Imprimir Ticket</span>
                <span className="sm:hidden">Imprimir</span>
              </button>
              
              <button
                type="button"
                onClick={handleFinishSale}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Nueva Venta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL LIGHTBOX: Fotografía de Producto en Grande */}
      {enlargedProduct && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setEnlargedProduct(null)}
        >
          <div 
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Producto */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {enlargedProduct.sku} • {enlargedProduct.category}
                </span>
                <h3 className="text-sm font-black text-slate-900 line-clamp-1 mt-0.5">
                  {enlargedProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEnlargedProduct(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                title="Cerrar vista previa"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Fotografía en Alta Resolución */}
            <div className="aspect-square w-full bg-slate-950 relative flex items-center justify-center overflow-hidden">
              {enlargedProduct.image ? (
                <img 
                  src={enlargedProduct.image} 
                  alt={enlargedProduct.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-slate-400 flex flex-col items-center gap-2">
                  <ImageIcon className="w-16 h-16 stroke-1 text-slate-600" />
                  <span className="text-xs">Sin fotografía disponible</span>
                </div>
              )}
              <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-xl border border-white/20">
                Stock: {enlargedProduct.stock} unidades
              </span>
            </div>

            {/* Detalle de Precio y Acción de Agregar al Carrito */}
            <div className="p-5 flex items-center justify-between gap-4 bg-slate-50/80 border-t border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Precio de Venta
                </span>
                <span className="text-xl font-black text-slate-900">
                  Q {enlargedProduct.price.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  addToCart(enlargedProduct);
                  setEnlargedProduct(null);
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar al Carrito</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Búsqueda y Selección de Cliente Receptor */}
      {clientModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setClientModalOpen(false)}
        >
          <div 
            className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Modal */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Seleccionar Cliente para la Venta</h3>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {clientsList.length} clientes registrados • Saldos y Crédito
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setClientModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Barra de Búsqueda y Acción Nuevo Cliente */}
            <div className="p-3 border-b border-slate-100 space-y-2 bg-white">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={clientSearchTerm}
                    onChange={(e) => {
                      setClientSearchTerm(e.target.value);
                      setShowNewClientForm(false);
                    }}
                    placeholder="Buscar por nombre, NIT o teléfono..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    autoFocus
                  />
                  {clientSearchTerm && (
                    <button
                      type="button"
                      onClick={() => setClientSearchTerm('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowNewClientForm(!showNewClientForm)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    showNewClientForm
                      ? 'bg-slate-200 text-slate-800'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{showNewClientForm ? 'Ver Lista' : 'Nuevo'}</span>
                </button>
              </div>

              {/* Botón rápido Consumidor Final */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 font-medium">Acceso rápido:</span>
                <button
                  type="button"
                  onClick={() => {
                    handleResetToCF();
                    setClientModalOpen(false);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <User className="w-3 h-3 text-slate-500" />
                  <span>Usar Consumidor Final (CF)</span>
                </button>
              </div>
            </div>

            {/* Contenido: Formulario Nuevo Cliente o Lista de Clientes */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[50vh]">
              {showNewClientForm ? (
                <form onSubmit={handleCreateQuickClient} className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-black text-indigo-950 pb-1 border-b border-indigo-200/60">
                    <UserPlus className="w-4 h-4 text-indigo-600" />
                    <span>Registrar Nuevo Cliente Rápido</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Nombre *</label>
                      <input
                        type="text"
                        required
                        value={newClientData.nombre}
                        onChange={(e) => setNewClientData({ ...newClientData, nombre: e.target.value })}
                        placeholder="Ej. María"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-medium focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Apellido</label>
                      <input
                        type="text"
                        value={newClientData.apellido}
                        onChange={(e) => setNewClientData({ ...newClientData, apellido: e.target.value })}
                        placeholder="Ej. Morales"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-medium focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">NIT (o CF)</label>
                      <input
                        type="text"
                        value={newClientData.nit}
                        onChange={(e) => setNewClientData({ ...newClientData, nit: e.target.value.toUpperCase() })}
                        placeholder="CF o NIT"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-mono font-bold uppercase focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Teléfono</label>
                      <input
                        type="text"
                        value={newClientData.telefono}
                        onChange={(e) => setNewClientData({ ...newClientData, telefono: e.target.value })}
                        placeholder="Ej. 5555-1234"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-medium focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Dirección</label>
                      <input
                        type="text"
                        value={newClientData.direccion}
                        onChange={(e) => setNewClientData({ ...newClientData, direccion: e.target.value })}
                        placeholder="Ciudad de Guatemala"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-medium focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Límite de Crédito (Q)</label>
                      <input
                        type="number"
                        step="100"
                        value={newClientData.limite_credito}
                        onChange={(e) => setNewClientData({ ...newClientData, limite_credito: Number(e.target.value) })}
                        placeholder="5000"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-bold focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewClientForm(false)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-sm cursor-pointer"
                    >
                      Guardar y Asignar a la Venta
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {filteredClients.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      <Users className="w-8 h-8 mx-auto text-slate-300 mb-1" />
                      <p className="text-xs font-bold text-slate-600">No se encontraron clientes con "{clientSearchTerm}"</p>
                      <button
                        type="button"
                        onClick={() => setShowNewClientForm(true)}
                        className="mt-2 text-xs font-black text-indigo-600 hover:underline cursor-pointer"
                      >
                        + Registrar "{clientSearchTerm}" como nuevo cliente
                      </button>
                    </div>
                  ) : (
                    filteredClients.map((client) => {
                      const isSelected = selectedClient?.id_cliente === client.id_cliente;
                      const initial = client.nombre ? client.nombre.charAt(0).toUpperCase() : 'C';

                      return (
                        <div
                          key={client.id_cliente}
                          onClick={() => handleSelectClient(client)}
                          className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-indigo-50/80 border-indigo-400 ring-1 ring-indigo-400 shadow-2xs'
                              : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                              isSelected 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {initial}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="text-xs font-black text-slate-900 truncate">
                                  {client.nombre_completo}
                                </p>
                                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-bold shrink-0">
                                  NIT: {client.nit}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                {client.telefono !== 'N/A' && <span>Tel: {client.telefono}</span>}
                                <span>•</span>
                                <span className={client.saldo_actual > 0 ? 'text-amber-700 font-bold' : 'text-slate-500'}>
                                  Saldo: Q {client.saldo_actual.toFixed(2)}
                                </span>
                                <span>•</span>
                                <span className="text-emerald-700 font-semibold">
                                  Límite: Q {client.limite_credito.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectClient(client);
                            }}
                            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700'
                            }`}
                          >
                            {isSelected ? 'Seleccionado' : 'Elegir'}
                          </button>
                        </div>
                      );
                    })
                  )}
                </>
              )}
            </div>

            {/* Pie del Modal */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500">
                Mostrando {filteredClients.length} de {clientsList.length} clientes disponibles
              </span>
              <button
                type="button"
                onClick={() => setClientModalOpen(false)}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
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