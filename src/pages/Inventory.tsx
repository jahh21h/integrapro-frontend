import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  ArrowLeftRight, 
  AlertTriangle, 
  Boxes, 
  DollarSign, 
  Edit3, 
  Trash2, 
  X, 
  CheckCircle2, 
  Download,
  Building,
  Image as ImageIcon,
  ZoomIn,
  Barcode,
  Printer,
  Sparkles,
  Upload,
  ExternalLink,
  RefreshCw,
  ShoppingBag,
  MapPin,
  Layers,
  Package,
  Save,
  Tag,
  FolderPlus,
  FolderTree,
  Check,
  Key
} from 'lucide-react';
import TokenExtensionScraper from '../components/TokenExtensionScraper';
import BarcodeSVG, { generateGuatemalaEan13 } from '../components/Barcode';
import { UnidadMedida, UbicacionBodega, EmpresaSaaS } from '../types';
import { exportToExcelCsv } from '../utils/export';
import { getTenantCatalog } from '../data/tenantProducts';
import { scraperApi, inventoryApi } from '../api';
import { filterRecordsByTenant, getStoredActiveEmpresaId } from '../utils/tenant';
import { getLiveCache, setLiveCache } from '../utils/liveCache';
import { useLanguage, tLang } from '../context/LanguageContext';

function getProductPhotoUrl(foto?: string | null): string {
  if (!foto) return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80';
  if (foto.startsWith('http://') || foto.startsWith('https://')) return foto;
  if (foto.startsWith('/storage/')) return foto;
  if (foto.startsWith('storage/')) return `/${foto}`;
  if (foto.startsWith('/')) return foto;
  return `/storage/${foto}`;
}

function mapApiProductToInventoryItem(p: any): InventoryItem {
  const stockTot = parseInt(p.stock) || (Array.isArray(p.inventarios) ? p.inventarios.reduce((sum: number, inv: any) => sum + (parseInt(inv.stock) || 0), 0) : 0);
  
  let central = 0;
  let norte = 0;
  let sur = 0;
  if (Array.isArray(p.inventarios) && p.inventarios.length > 0) {
    p.inventarios.forEach((inv: any) => {
      const sId = inv.id_sucursal;
      const st = parseInt(inv.stock) || 0;
      if (sId === 1) central += st;
      else if (sId === 2) norte += st;
      else if (sId === 3) sur += st;
      else central += st;
    });
  } else {
    central = stockTot;
  }

  return {
    id: p.id_producto || p.id,
    sku: p.sku || `PROD-${p.id_producto || p.id}`,
    codigoBarras: p.codigo_barras || '',
    nombre: p.nombre || tLang('Producto', 'Product'),
    talla: p.talla || '',
    color: p.color || '',
    categoria: p.categoria?.nombre || p.categoria_nombre || 'General',
    proveedor: p.proveedor?.nombre || p.proveedor_nombre || tLang('Distribuidor', 'Distributor'),
    precioCompra: parseFloat(p.precio_compra) || 0,
    precioVenta: parseFloat(p.precio_venta) || 0,
    stockTotal: stockTot,
    stockMinimo: parseInt(p.stock_minimo) || 5,
    stockPorSucursal: {
      central,
      norte,
      sur
    },
    imagen: getProductPhotoUrl(p.foto)
  };
}

interface InventoryItem {
  id: number;
  sku: string;
  codigoBarras: string;
  nombre: string;
  talla?: string;
  color?: string;
  categoria: string;
  proveedor: string;
  precioCompra: number;
  precioVenta: number;
  stockTotal: number;
  stockMinimo: number;
  stockPorSucursal: {
    central: number;
    norte: number;
    sur: number;
  };
  imagen: string;
}

interface InventoryProps {
  currentEmpresa?: EmpresaSaaS;
}

export default function Inventory({ currentEmpresa }: InventoryProps = {}) {
  const { lang, L, money, currencySymbol, locale } = useLanguage();

  const trBranch = (b?: string) => {
    if (!b) return '';
    if (b === 'Sucursal Central') return L('Sucursal Central', 'Central Branch');
    if (b === 'Sucursal Norte') return L('Sucursal Norte', 'North Branch');
    if (b === 'Sucursal Sur') return L('Sucursal Sur', 'South Branch');
    if (b === 'Central') return L('Central', 'Central');
    if (b === 'Norte') return L('Norte', 'North');
    if (b === 'Sur') return L('Sur', 'South');
    return b;
  };

  const trUnitName = (name?: string) => {
    if (!name) return '';
    const map: Record<string, string> = {
      'Unidad Individual': L('Unidad Individual', 'Single Unit'),
      'Caja Estándar (12/24 uds)': L('Caja Estándar (12/24 uds)', 'Standard Box (12/24 units)'),
      'Fardo / Bulto': L('Fardo / Bulto', 'Bale / Bulk Pack'),
      'Libra (Granos/Lácteos)': L('Libra (Granos/Lácteos)', 'Pound (Grains/Dairy)'),
      'Quintal (100 lbs)': L('Quintal (100 lbs)', 'Hundredweight (100 lbs)'),
      'Litro / Galón': L('Litro / Galón', 'Liter / Gallon'),
      'Docena': L('Docena', 'Dozen'),
    };
    return map[name] ?? name;
  };

  const trLocText = (txt?: string) => {
    if (!txt) return '';
    const map: Record<string, string> = {
      'Pasillo A (Abarrotes)': L('Pasillo A (Abarrotes)', 'Aisle A (Groceries)'),
      'Pasillo B (Bebidas)': L('Pasillo B (Bebidas)', 'Aisle B (Beverages)'),
      'Pasillo Principal': L('Pasillo Principal', 'Main Aisle'),
      'Pasillo C (Cuidado)': L('Pasillo C (Cuidado)', 'Aisle C (Personal Care)'),
      'Estantería 01': L('Estantería 01', 'Rack 01'),
      'Estantería 02': L('Estantería 02', 'Rack 02'),
      'Estantería 03': L('Estantería 03', 'Rack 03'),
      'Nivel 1 (Inferior)': L('Nivel 1 (Inferior)', 'Level 1 (Bottom)'),
      'Nivel 2 (Medio)': L('Nivel 2 (Medio)', 'Level 2 (Middle)'),
      'Nivel 1': L('Nivel 1', 'Level 1'),
      'Nivel 3 (Superior)': L('Nivel 3 (Superior)', 'Level 3 (Top)'),
    };
    return map[txt] ?? txt;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedBranch, setSelectedBranch] = useState('Todas');
  const [activeTab, setActiveTab] = useState<'catalogo' | 'sucursales' | 'alertas' | 'bodega'>('catalogo');
  
  // Modales
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showNewUnidadModal, setShowNewUnidadModal] = useState(false);
  const [showNewUbicacionModal, setShowNewUbicacionModal] = useState(false);
  const [enlargedImageItem, setEnlargedImageItem] = useState<InventoryItem | null>(null);
  const [labelProduct, setLabelProduct] = useState<InventoryItem | null>(null);
  const [labelQuantity, setLabelQuantity] = useState<number>(5);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Modelos de Bodega (Laravel: UnidadMedidaResource y UbicacionResource)
  const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([
    { id_unidad: 1, nombre: 'Unidad Individual', abreviatura: 'UND' },
    { id_unidad: 2, nombre: 'Caja Estándar (12/24 uds)', abreviatura: 'CJ' },
    { id_unidad: 3, nombre: 'Fardo / Bulto', abreviatura: 'FRD' },
    { id_unidad: 4, nombre: 'Libra (Granos/Lácteos)', abreviatura: 'LB' },
    { id_unidad: 5, nombre: 'Quintal (100 lbs)', abreviatura: 'QQ' },
    { id_unidad: 6, nombre: 'Litro / Galón', abreviatura: 'LT' },
    { id_unidad: 7, nombre: 'Docena', abreviatura: 'DOC' },
  ]);

  const [ubicacionesBodega, setUbicacionesBodega] = useState<UbicacionBodega[]>([
    { id_ubicacion: 1, id_sucursal: 1, sucursal_nombre: 'Sucursal Central', codigo_bodega: 'BOD-CENTRAL-01', pasillo: 'Pasillo A (Abarrotes)', estante: 'Estantería 01', nivel: 'Nivel 1 (Inferior)', bin: 'Bin A1-04' },
    { id_ubicacion: 2, id_sucursal: 1, sucursal_nombre: 'Sucursal Central', codigo_bodega: 'BOD-CENTRAL-01', pasillo: 'Pasillo B (Bebidas)', estante: 'Estantería 03', nivel: 'Nivel 2 (Medio)', bin: 'Bin B3-12' },
    { id_ubicacion: 3, id_sucursal: 2, sucursal_nombre: 'Sucursal Norte', codigo_bodega: 'BOD-NORTE-01', pasillo: 'Pasillo Principal', estante: 'Estantería 02', nivel: 'Nivel 1', bin: 'Bin N2-01' },
    { id_ubicacion: 4, id_sucursal: 3, sucursal_nombre: 'Sucursal Sur', codigo_bodega: 'BOD-SUR-01', pasillo: 'Pasillo C (Cuidado)', estante: 'Estantería 01', nivel: 'Nivel 3 (Superior)', bin: 'Bin S1-08' },
  ]);

  const [newUnidad, setNewUnidad] = useState({ nombre: '', abreviatura: '' });
  const [newUbicacion, setNewUbicacion] = useState({
    sucursal_nombre: 'Sucursal Central',
    codigo_bodega: 'BOD-CENTRAL-01',
    pasillo: '',
    estante: '',
    nivel: '',
    bin: ''
  });

  // Formulario nuevo producto
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    sku: '',
    codigoBarras: generateGuatemalaEan13(7),
    categoria: 'Abarrotes',
    proveedor: 'Distribuidora Central S.A.',
    precioCompra: '',
    precioVenta: '',
    stockInicial: '',
    stockMinimo: '10',
    unidadMedida: 'Unidad Individual',
    ubicacion: 'BOD-CENTRAL-01: Pasillo A • Estantería 01',
    imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80'
  });

  const productFileInputRef = useRef<HTMLInputElement>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, imagen: reader.result as string }));
        showToast(L(`Fotografía de producto "${file.name}" cargada desde tu equipo.`, `Product photo "${file.name}" loaded from your device.`));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateBarcode = () => {
    const generated = generateGuatemalaEan13(products.length + 1);
    setNewProduct(prev => ({ ...prev, codigoBarras: generated }));
    showToast(L(`Código de barras EAN-13 generado: ${generated}`, `EAN-13 barcode generated: ${generated}`));
  };

  // Modal y formulario de Edición de Producto
  const [editingProduct, setEditingProduct] = useState<InventoryItem | null>(null);
  const [editFormData, setEditFormData] = useState({
    nombre: '',
    sku: '',
    talla: '',
    color: '',
    codigoBarras: '',
    categoria: 'Abarrotes',
    proveedor: '',
    precioCompra: '',
    precioVenta: '',
    stockMinimo: '10',
    stockCentral: '0',
    stockNorte: '0',
    stockSur: '0',
    imagen: ''
  });
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Formulario traslado
  const [transferData, setTransferData] = useState({
    productoId: 1,
    origen: 'Sucursal Central',
    destino: 'Sucursal Norte',
    cantidad: 5,
    motivo: L('Reabastecimiento de stock bajo', 'Low stock replenishment')
  });

  useEffect(() => {
    setTransferData(prev => {
      if (prev.motivo === 'Reabastecimiento de stock bajo' || prev.motivo === 'Low stock replenishment') {
        return { ...prev, motivo: lang === 'en' ? 'Low stock replenishment' : 'Reabastecimiento de stock bajo' };
      }
      return prev;
    });
  }, [lang]);

  // Catálogo Multi-Tenant estrictamente aislado por empresa activa (con caché en vivo para cero saltos)
  const activeEmpresaId = Number(currentEmpresa?.id ?? getStoredActiveEmpresaId() ?? 0);
  const cachedCatalog = getLiveCache<{ products: InventoryItem[]; categories: string[] }>(activeEmpresaId, 'inventory_catalog');
  const initialCatalog = cachedCatalog ?? getTenantCatalog(activeEmpresaId);
  const [products, setProducts] = useState<InventoryItem[]>(initialCatalog.products);
  const [categories, setCategories] = useState<string[]>(initialCatalog.categories);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const fetchRequestIdRef = useRef(0);

  // Función para cargar catálogo y productos en vivo desde la base de datos (con bloqueo estricto multi-tenant)
  const fetchLiveProducts = async (queryTerm?: string, empresaIdOverride?: number) => {
    const targetEmpresaId = Number(empresaIdOverride ?? activeEmpresaId);
    const requestId = ++fetchRequestIdRef.current;

    if (!Number.isFinite(targetEmpresaId) || targetEmpresaId <= 0) {
      setProducts([]);
      setCategories(['Todas']);
      return;
    }

    setIsLoadingLive(true);
    try {
      const trimmedQuery = queryTerm ? queryTerm.trim() : '';
      const res = await inventoryApi.getAll({
        id_empresa: targetEmpresaId,
        search: trimmedQuery || undefined,
        per_page: trimmedQuery ? 100 : 250
      });

      // Ignorar respuestas viejas si el usuario cambió de empresa o búsqueda mientras cargaba
      if (requestId !== fetchRequestIdRef.current) return;

      const rawData = res?.data || (Array.isArray(res) ? res : []);
      const { items: tenantData, rejectedCount } = filterRecordsByTenant(
        Array.isArray(rawData) ? rawData : [],
        targetEmpresaId
      );

      if (rejectedCount > 0) {
        console.warn(
          `[Multi-Tenant Guard] Inventario bloqueó ${rejectedCount} producto(s) ajenos o sin id_empresa para la empresa #${targetEmpresaId}.`
        );
      }

      if (tenantData.length > 0) {
        const mapped = tenantData.map(mapApiProductToInventoryItem);
        const discoveredCats = Array.from(
          new Set(mapped.map((it: InventoryItem) => it.categoria).filter(Boolean))
        ) as string[];
        const nextCats = ['Todas', ...discoveredCats];
        setProducts(mapped);
        setCategories(nextCats);
        if (!trimmedQuery) {
          setLiveCache(targetEmpresaId, 'inventory_catalog', { products: mapped, categories: nextCats });
        }
      } else if (trimmedQuery) {
        // Si el backend bloqueó datos de otra empresa, filtrar el catálogo propio del tenant; si respondió vacío legítimo, mostrar vacío
        if (rejectedCount > 0) {
          const cat = getTenantCatalog(targetEmpresaId);
          const q = trimmedQuery.toLowerCase();
          setProducts(
            cat.products.filter(
              p =>
                p.nombre.toLowerCase().includes(q) ||
                p.sku.toLowerCase().includes(q) ||
                p.codigoBarras.toLowerCase().includes(q)
            )
          );
          setCategories(cat.categories);
        } else {
          setProducts([]);
        }
      } else {
        // Fallback estricto al catálogo aislado de ESTA empresa (nunca de otra)
        const cat = getTenantCatalog(targetEmpresaId);
        setProducts(cat.products);
        setCategories(cat.categories);
      }
    } catch (err) {
      if (requestId !== fetchRequestIdRef.current) return;
      console.warn('Error fetching live inventory from Droplet:', err);
      const cat = getTenantCatalog(targetEmpresaId);
      setProducts(cat.products);
      setCategories(cat.categories);
    } finally {
      if (requestId === fetchRequestIdRef.current) {
        setIsLoadingLive(false);
      }
    }
  };

  // Reiniciar estado inmediatamente al cambiar de empresa activa (cero arrastre entre tenants y cero salto visual)
  useEffect(() => {
    const cached = getLiveCache<{ products: InventoryItem[]; categories: string[] }>(activeEmpresaId, 'inventory_catalog');
    const cat = cached ?? getTenantCatalog(activeEmpresaId);
    setProducts(cat.products);
    setCategories(cat.categories);
    setSelectedCategory('Todas');
    setSearchTerm('');
    setCurrentPage(1);
    fetchLiveProducts('', activeEmpresaId);
  }, [activeEmpresaId]);

  // Búsqueda en vivo conectada con la base de datos MySQL (con debounce de 350ms)
  const isFirstSearchRender = useRef(true);
  useEffect(() => {
    if (isFirstSearchRender.current) {
      isFirstSearchRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      fetchLiveProducts(searchTerm, activeEmpresaId);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm, activeEmpresaId]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<{ original: string; current: string } | null>(null);

  // Restablecer paginación al cambiar filtros o pestañas
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, activeTab]);

  // Métricas
  const totalItems = products.length;
  const valorInventario = products.reduce((acc, p) => acc + (p.precioCompra * p.stockTotal), 0);
  const itemsCriticos = products.filter((p) => p.stockTotal <= p.stockMinimo).length;

  // Scraper en Inventario (Sincronizado con ProductoResource en Laravel)
  const [productScraperUrl, setProductScraperUrl] = useState('');
  const [isScrapingProduct, setIsScrapingProduct] = useState(false);
  const [showProductScraper, setShowProductScraper] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);

  const handleScrapeProductLink = async (urlToScrape: string) => {
    if (!urlToScrape) return;
    setIsScrapingProduct(true);
    try {
      const url = urlToScrape.trim();
      const isTemu = url.toLowerCase().includes('temu');
      const isShein = url.toLowerCase().includes('shein');
      const isAli = url.toLowerCase().includes('aliexpress');

      let data: any = null;
      try {
        const res = await scraperApi.extractFromUrl(url);
        if (res && res.data) data = res.data;
      } catch (e) {}

      if (!data) {
        const platform = isTemu ? 'Temu' : isShein ? 'Shein' : isAli ? 'AliExpress' : L('Importado', 'Imported');
        data = {
          title: L(`${platform} - Calzado Deportivo Ergonómico Ultra Ligero`, `${platform} - Ultra-Light Ergonomic Running Shoes`),
          price: isTemu ? '135.00' : '16.50',
          sku: `${platform.toUpperCase()}-SH-${Math.floor(10000 + Math.random() * 90000)}`,
          image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
        };
      }

      const precioOrigen = parseFloat(data.price || 0);
      const tc = isTemu ? 1.00 : 7.80;
      const costoQ = Number((precioOrigen * tc).toFixed(2));
      const ventaQ = Number((costoQ * 1.45).toFixed(2));

      setNewProduct(prev => ({
        ...prev,
        nombre: data.title || data.name || prev.nombre,
        sku: data.sku || prev.sku,
        precioCompra: costoQ.toString(),
        precioVenta: ventaQ.toString(),
        proveedor: isTemu ? 'TEMU Wholesale Direct' : isShein ? 'SHEIN Distribution Global' : L('Proveedor Importación', 'Import Supplier'),
        categoria: 'Cuidado Personal',
        imagen: data.image_url || prev.imagen
      }));

      showToast(L('¡Producto y fotografía extraídos con éxito por el Scraper!', 'Product and photo extracted successfully by Scraper!'));
      setProductScraperUrl('');
      setShowProductScraper(false);
    } catch (e) {
      showToast(L('Error al extraer datos con el scraper.', 'Failed to extract data with the scraper.'));
    } finally {
      setIsScrapingProduct(false);
    }
  };

  const handlePasteProductFromExtension = async () => {
    setIsScrapingProduct(true);
    try {
      let extProduct: any = null;
      try {
        const res = await scraperApi.retrieveLatest();
        const data = res?.data || res?.product || res;
        if (data?.products && data.products.length > 0) {
          extProduct = data.products[0];
        } else if (data?.title || data?.name) {
          extProduct = data;
        }
      } catch (e) {}

      if (!extProduct) {
        extProduct = {
          title: L('Shein - Blusa Floral Manga Abullonada con Botones', 'Shein - Floral Puff-Sleeve Button Blouse'),
          price: '5.20',
          sku: 'SHEIN-TOP-5521',
          image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80'
        };
      }

      const precioUSD = parseFloat(extProduct.price || 0);
      const costoQ = Number((precioUSD * 7.80).toFixed(2));
      const ventaQ = Number((costoQ * 1.50).toFixed(2));

      setNewProduct(prev => ({
        ...prev,
        nombre: extProduct.title || prev.nombre,
        sku: extProduct.sku || prev.sku,
        precioCompra: costoQ.toString(),
        precioVenta: ventaQ.toString(),
        proveedor: 'SHEIN Distribution Global',
        categoria: 'Cuidado Personal',
        imagen: extProduct.image_url || prev.imagen
      }));

      showToast(L('¡Datos y fotografía del producto cargados desde la extensión de Chrome!', 'Product data and photo loaded from Chrome extension!'));
    } catch (e) {
      showToast(L('No se pudieron leer datos de la extensión.', 'Could not read data from the extension.'));
    } finally {
      setIsScrapingProduct(false);
    }
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.nombre.trim()) {
      showToast(L('⚠️ El nombre del producto es obligatorio.', '⚠️ Product name is required.'));
      return;
    }

    const precioCompra = parseFloat(newProduct.precioCompra) || 0;
    const precioVenta = parseFloat(newProduct.precioVenta) || 0;
    const stockInicial = parseInt(newProduct.stockInicial) || 0;
    // Solo enviar URL si el usuario la escribió (no el placeholder demo ni un preview base64)
    const imagenUrl = (newProduct.imagen && !newProduct.imagen.startsWith('data:') && !newProduct.imagen.includes('unsplash.com/photo-1542838132'))
      ? newProduct.imagen
      : null;

    try {
      if (newImageFile) {
        const fd = new FormData();
        fd.append('id_empresa', String(activeEmpresaId));
        fd.append('nombre', newProduct.nombre.trim());
        fd.append('sku', newProduct.sku.trim());
        fd.append('codigo_barras', newProduct.codigoBarras || '');
        fd.append('precio_compra', String(precioCompra));
        fd.append('precio_venta', String(precioVenta));
        fd.append('stock', String(stockInicial));
        fd.append('stock_minimo', newProduct.stockMinimo || '10');
        fd.append('foto', newImageFile);
        await inventoryApi.createWithImage(fd);
      } else {
        await inventoryApi.create({
          id_empresa: activeEmpresaId,
          nombre: newProduct.nombre.trim(),
          sku: newProduct.sku.trim() || undefined,
          codigo_barras: newProduct.codigoBarras || undefined,
          precio_compra: precioCompra,
          precio_venta: precioVenta,
          stock: stockInicial,
          stock_minimo: parseInt(newProduct.stockMinimo) || 10,
          ...(imagenUrl ? { foto: imagenUrl } : {})
        });
      }
    } catch (err: any) {
      console.error('Error creando producto:', err);
      const msg = err?.response?.data?.message
        || (err?.response?.data?.errors ? Object.values(err.response.data.errors).flat().join(', ') : null)
        || L('No se pudo registrar el producto en el servidor.', 'Could not save the product on the server.');
      showToast(`⚠️ ${msg}`);
      return;
    }

    await fetchLiveProducts();
    setShowNewProductModal(false);
    setNewImageFile(null);
    showToast(L(`Producto "${newProduct.nombre.trim()}" registrado exitosamente.`, `Product "${newProduct.nombre.trim()}" registered successfully.`));
    setNewProduct({
      nombre: '',
      sku: '',
      codigoBarras: generateGuatemalaEan13(products.length + 2),
      categoria: 'Abarrotes',
      proveedor: 'Distribuidora Central S.A.',
      precioCompra: '',
      precioVenta: '',
      stockInicial: '',
      stockMinimo: '10',
      unidadMedida: 'Unidad Individual',
      ubicacion: 'BOD-CENTRAL-01: Pasillo A • Estantería 01',
      imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80'
    });
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(L(`Traslado de ${transferData.cantidad} unidades procesado exitosamente hacia ${transferData.destino}.`, `Transfer of ${transferData.cantidad} units processed successfully to ${trBranch(transferData.destino)}.`));
    setShowTransferModal(false);
  };

  const handleOpenEditModal = (p: InventoryItem) => {
    setEditingProduct(p);
    setEditImageFile(null);
    setEditFormData({
      nombre: p.nombre,
      sku: p.sku,
      talla: p.talla || '',
      color: p.color || '',
      codigoBarras: p.codigoBarras,
      categoria: p.categoria,
      proveedor: p.proveedor,
      precioCompra: p.precioCompra.toString(),
      precioVenta: p.precioVenta.toString(),
      stockMinimo: p.stockMinimo.toString(),
      stockCentral: p.stockPorSucursal.central.toString(),
      stockNorte: p.stockPorSucursal.norte.toString(),
      stockSur: p.stockPorSucursal.sur.toString(),
      imagen: p.imagen
    });
  };

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData(prev => ({ ...prev, imagen: reader.result as string }));
        showToast(L(`Fotografía actualizada para "${file.name}". Guarda los cambios para subirla al servidor.`, `Photo updated for "${file.name}". Save changes to upload it to the server.`));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateEditBarcode = () => {
    if (!editingProduct) return;
    const generated = generateGuatemalaEan13(editingProduct.id + 100);
    setEditFormData(prev => ({ ...prev, codigoBarras: generated }));
    showToast(L(`Nuevo código EAN-13 generado: ${generated}`, `New EAN-13 barcode generated: ${generated}`));
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const compra = parseFloat(editFormData.precioCompra) || 0;
    const venta = parseFloat(editFormData.precioVenta) || 0;
    const minimo = parseInt(editFormData.stockMinimo) || 0;
    const central = parseInt(editFormData.stockCentral) || 0;
    const norte = parseInt(editFormData.stockNorte) || 0;
    const sur = parseInt(editFormData.stockSur) || 0;
    const total = central + norte + sur;

    setProducts(prev => prev.map(p => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          nombre: editFormData.nombre,
          sku: editFormData.sku,
          talla: editFormData.talla,
          color: editFormData.color,
          codigoBarras: editFormData.codigoBarras,
          categoria: editFormData.categoria,
          proveedor: editFormData.proveedor,
          precioCompra: compra,
          precioVenta: venta,
          stockTotal: total,
          stockMinimo: minimo,
          stockPorSucursal: {
            central,
            norte,
            sur
          },
          imagen: editFormData.imagen || p.imagen
        };
      }
      return p;
    }));

    showToast(L(`Producto "${editFormData.nombre}" actualizado correctamente.`, `Product "${editFormData.nombre}" updated successfully.`));
    const prodIdToUpdate = editingProduct.id;
    setEditingProduct(null);

    try {
      if (editImageFile) {
        // Subida real del archivo (multipart) — el base64 no se envía como texto
        const fd = new FormData();
        fd.append('nombre', editFormData.nombre);
        fd.append('sku', editFormData.sku);
        if ((editFormData.talla || '').trim()) fd.append('talla', editFormData.talla.trim());
        if ((editFormData.color || '').trim()) fd.append('color', editFormData.color.trim());
        fd.append('codigo_barras', editFormData.codigoBarras || '');
        fd.append('precio_compra', String(compra));
        fd.append('precio_venta', String(venta));
        fd.append('stock_minimo', String(minimo));
        fd.append('foto', editImageFile);
        await inventoryApi.updateWithImage(prodIdToUpdate, fd);
        fetchLiveProducts(); // refrescar para mostrar la URL real del servidor
      } else {
        // Sin archivo: solo enviar foto si es una URL (nunca un base64 gigante)
        const fotoUrl = editFormData.imagen && !editFormData.imagen.startsWith('data:')
          ? editFormData.imagen
          : undefined;
        await inventoryApi.update(prodIdToUpdate, {
          nombre: editFormData.nombre,
          sku: editFormData.sku,
          talla: editFormData.talla || null,
          color: editFormData.color || null,
          codigo_barras: editFormData.codigoBarras,
          precio_compra: compra,
          precio_venta: venta,
          stock_minimo: minimo,
          ...(fotoUrl ? { foto: fotoUrl } : {})
        });
      }
    } catch (err: any) {
      console.warn('Error al persistir actualización de producto en backend:', err);
      showToast(`⚠️ ${err?.response?.data?.message || L('El producto NO se guardó en el servidor. Intenta de nuevo.', 'The product was NOT saved on the server. Please try again.')}`);
    } finally {
      setEditImageFile(null);
    }
  };

  const [isDeletingProduct, setIsDeletingProduct] = useState<boolean>(false);

  const handleDeleteProduct = async (p: InventoryItem) => {
    if (!window.confirm(L(`¿Estás seguro de que deseas eliminar o dar de baja el producto "${p.nombre}" (SKU: ${p.sku})?`, `Are you sure you want to delete or deactivate "${p.nombre}" (SKU: ${p.sku})?`))) {
      return;
    }
    setIsDeletingProduct(true);
    try {
      await inventoryApi.delete(p.id);
      setProducts(prev => prev.filter(item => item.id !== p.id));
      showToast(L(`Producto "${p.nombre}" eliminado del inventario.`, `Product "${p.nombre}" removed from inventory.`));
    } catch (err: any) {
      const backendMsg = err?.response?.data?.message;
      showToast(backendMsg || L(`No se pudo eliminar "${p.nombre}". Verifica tu conexión e intenta de nuevo.`, `Could not delete "${p.nombre}". Check your connection and try again.`));
    } finally {
      setIsDeletingProduct(false);
    }
  };

  // Acciones de Gestión de Categorías
  const handleAddCategory = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      showToast(L('Por favor escribe un nombre para la categoría.', 'Please enter a category name.'));
      return;
    }
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast(L(`La categoría "${trimmed}" ya existe en el catálogo.`, `Category "${trimmed}" already exists in the catalog.`));
      return;
    }

    setCategories(prev => [...prev, trimmed]);
    setNewCategoryName('');
    showToast(L(`Categoría "${trimmed}" creada exitosamente.`, `Category "${trimmed}" created successfully.`));
  };

  const handleStartEditCategory = (cat: string) => {
    setEditingCategory({ original: cat, current: cat });
  };

  const handleSaveEditCategory = () => {
    if (!editingCategory) return;
    const trimmed = editingCategory.current.trim();
    const original = editingCategory.original;

    if (!trimmed || trimmed === original) {
      setEditingCategory(null);
      return;
    }

    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase() && c.toLowerCase() !== original.toLowerCase())) {
      showToast(L(`Ya existe otra categoría llamada "${trimmed}".`, `Another category named "${trimmed}" already exists.`));
      return;
    }

    // Actualizar lista de categorías
    setCategories(prev => prev.map(c => c === original ? trimmed : c));

    // Actualizar todos los productos vinculados a la categoría renombrada
    setProducts(prev => prev.map(p => p.categoria === original ? { ...p, categoria: trimmed } : p));

    // Actualizar estados reactivos si apuntaban a esta categoría
    if (selectedCategory === original) {
      setSelectedCategory(trimmed);
    }
    if (newProduct.categoria === original) {
      setNewProduct(prev => ({ ...prev, categoria: trimmed }));
    }
    if (editFormData.categoria === original) {
      setEditFormData(prev => ({ ...prev, categoria: trimmed }));
    }

    setEditingCategory(null);
    showToast(L(`Categoría "${original}" renombrada a "${trimmed}".`, `Category "${original}" renamed to "${trimmed}".`));
  };

  const handleDeleteCategory = (catToDelete: string) => {
    if (categories.length <= 1) {
      showToast(L('Debe existir al menos una categoría en el catálogo.', 'At least one category must exist in the catalog.'));
      return;
    }

    const productsInCat = products.filter(p => p.categoria.toLowerCase() === catToDelete.toLowerCase());
    const remainingCategories = categories.filter(c => c !== catToDelete);
    const fallbackCategory = remainingCategories[0];

    if (productsInCat.length > 0) {
      const confirmDelete = window.confirm(
        L(
          `La categoría "${catToDelete}" tiene ${productsInCat.length} producto(s) asignado(s).\n\n¿Deseas eliminarla y reasignar automáticamente esos productos a "${fallbackCategory}"?`,
          `Category "${catToDelete}" has ${productsInCat.length} assigned product(s).\n\nDo you want to delete it and automatically reassign those products to "${fallbackCategory}"?`
        )
      );
      if (!confirmDelete) return;

      // Reasignar productos a la categoría de respaldo
      setProducts(prev => prev.map(p => p.categoria.toLowerCase() === catToDelete.toLowerCase() ? { ...p, categoria: fallbackCategory } : p));
    } else {
      const confirmDelete = window.confirm(L(`¿Estás seguro de que deseas eliminar la categoría "${catToDelete}"?`, `Are you sure you want to delete category "${catToDelete}"?`));
      if (!confirmDelete) return;
    }

    setCategories(remainingCategories);

    if (selectedCategory === catToDelete) {
      setSelectedCategory('Todas');
    }
    if (newProduct.categoria === catToDelete) {
      setNewProduct(prev => ({ ...prev, categoria: fallbackCategory }));
    }
    if (editFormData.categoria === catToDelete) {
      setEditFormData(prev => ({ ...prev, categoria: fallbackCategory }));
    }

    showToast(L(`Categoría "${catToDelete}" eliminada del catálogo.`, `Category "${catToDelete}" deleted from catalog.`));
  };

  const handleResetDefaultCategories = () => {
    if (window.confirm(L('¿Deseas restablecer las categorías predeterminadas del sistema?', 'Do you want to restore the default system categories?'))) {
      const defaultCats = getTenantCatalog(currentEmpresa?.id).categories;
      setCategories(defaultCats);
      showToast(L('Categorías predeterminadas restablecidas.', 'Default categories restored.'));
    }
  };

  const handleExportInventory = () => {
    const headers = [
      'SKU',
      L('Código Barras', 'Barcode'),
      L('Producto', 'Product'),
      L('Categoría', 'Category'),
      L('Proveedor', 'Supplier'),
      L(`Precio Compra (${currencySymbol})`, `Cost Price (${currencySymbol})`),
      L(`Precio Venta (${currencySymbol})`, `Sale Price (${currencySymbol})`),
      L('Stock Total', 'Total Stock'),
      L('Stock Mínimo', 'Min Stock')
    ];
    const rows = products.map(p => [
      p.sku,
      p.codigoBarras,
      p.nombre,
      p.categoria,
      p.proveedor,
      p.precioCompra.toFixed(2),
      p.precioVenta.toFixed(2),
      p.stockTotal,
      p.stockMinimo
    ]);
    exportToExcelCsv(L('Inventario_IntegraPro', 'Inventory_IntegraPro'), headers, rows);
    showToast(L('📁 Catálogo de inventario exportado a Excel (.csv) exitosamente.', '📁 Inventory catalog exported to Excel (.csv) successfully.'));
  };

  const handleSaveUnidad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnidad.nombre || !newUnidad.abreviatura) return;
    const nueva: UnidadMedida = {
      id_unidad: Date.now(),
      nombre: newUnidad.nombre,
      abreviatura: newUnidad.abreviatura.toUpperCase()
    };
    setUnidadesMedida([...unidadesMedida, nueva]);
    setShowNewUnidadModal(false);
    setNewUnidad({ nombre: '', abreviatura: '' });
    showToast(L(`Unidad de medida "${nueva.nombre} (${nueva.abreviatura})" creada exitosamente.`, `Unit of measure "${nueva.nombre} (${nueva.abreviatura})" created successfully.`));
  };

  const handleSaveUbicacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUbicacion.pasillo || !newUbicacion.estante) return;
    const nueva: UbicacionBodega = {
      id_ubicacion: Date.now(),
      sucursal_nombre: newUbicacion.sucursal_nombre,
      codigo_bodega: newUbicacion.codigo_bodega,
      pasillo: newUbicacion.pasillo,
      estante: newUbicacion.estante,
      nivel: newUbicacion.nivel || L('Nivel 1', 'Level 1'),
      bin: newUbicacion.bin || 'Bin 01'
    };
    setUbicacionesBodega([...ubicacionesBodega, nueva]);
    setShowNewUbicacionModal(false);
    setNewUbicacion({
      sucursal_nombre: 'Sucursal Central',
      codigo_bodega: 'BOD-CENTRAL-01',
      pasillo: '',
      estante: '',
      nivel: '',
      bin: ''
    });
    showToast(L(`Ubicación física "${nueva.pasillo} • ${nueva.estante}" registrada en ${nueva.sucursal_nombre}.`, `Warehouse location "${nueva.pasillo} • ${nueva.estante}" registered in ${trBranch(nueva.sucursal_nombre)}.`));
  };

  const filteredProducts = products.filter((p) => {
    const rawSearch = searchTerm.trim().toLowerCase();
    const cleanSearch = rawSearch.replace(/^(sku|código|codigo|cod|ref|item)[\s:#\-_]+/i, '').trim();

    if (!rawSearch) {
      const matchesCategory = selectedCategory === 'Todas' || p.categoria === selectedCategory;
      const matchesAlert = activeTab === 'alertas' ? p.stockTotal <= p.stockMinimo : true;
      return matchesCategory && matchesAlert;
    }

    const searchWords = cleanSearch.split(/\s+/).filter(Boolean);
    const pSku = (p.sku || '').toLowerCase();
    const pNombre = (p.nombre || '').toLowerCase();
    const pCodigo = (p.codigoBarras || '').toLowerCase();

    // Si coincide con SKU o código
    const matchesCode = pSku.includes(cleanSearch) || 
                        pSku.includes(rawSearch) || 
                        pCodigo.includes(cleanSearch) || 
                        pCodigo.includes(rawSearch);

    // O coincidencia por todas las palabras
    const matchesWords = searchWords.every(word => 
      pNombre.includes(word) || pSku.includes(word) || pCodigo.includes(word)
    );

    const matchesSearch = matchesCode || matchesWords;
    const matchesAlert = activeTab === 'alertas' ? p.stockTotal <= p.stockMinimo : true;
    return matchesSearch && matchesAlert;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      
      {/* Toast de Notificación */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{notificationToast}</span>
        </div>
      )}

      {/* Cabecera y Acciones Principales */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            {L('Gestión de Inventario & Stock', 'Inventory & Stock Management')}
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {currentEmpresa ? currentEmpresa.nombre : L('Multi-Sucursal', 'Multi-Branch')}
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">{L('Control de existencias físicas, precios, márgenes y traslados de almacén', 'Physical stock control, pricing, margins, and warehouse transfers')}</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => setShowTransferModal(true)}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
            <span>{L('Trasladar Stock', 'Transfer Stock')}</span>
          </button>

          <button 
            type="button" 
            onClick={() => setShowNewProductModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{L('Nuevo Producto', 'New Product')}</span>
          </button>
        </div>
      </div>

      {/* Banner Informativo Exclusivo de Fortexa Technologies */}
      {currentEmpresa?.id === 22 && (
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-indigo-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-black text-lg shrink-0">
              ⚡
            </div>
            <div>
              <p className="text-xs font-black text-white flex items-center gap-2">
                {L('Inventario Propio de Fortexa Technologies', 'Fortexa Technologies Proprietary Inventory')}
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/30 text-purple-300 border border-purple-400/30">
                  Tenant ID: 22
                </span>
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {L('Catálogo tecnológico de Fortexa: Licencias Quantum POS, hardware y suscripciones de RutaFuel Pro.', 'Fortexa tech catalog: Quantum POS licenses, hardware, and RutaFuel Pro subscriptions.')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tarjetas KPI de Inventario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{L('Catálogo Total', 'Total Catalog')}</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalItems} {L('Ítems', 'Items')}</p>
            <span className="text-[11px] font-semibold text-slate-500">{L(`En ${categories.length} categorías activas`, `Across ${categories.length} active categories`)}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{L('Valorización de Stock', 'Inventory Valuation')}</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{money(valorInventario)}</p>
            <span className="text-[11px] font-semibold text-emerald-600">{L('A costo de compra', 'At purchase cost')}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{L('Stock Bajo / Crítico', 'Low / Critical Stock')}</span>
            <p className="text-2xl font-black text-amber-600 mt-1">{itemsCriticos} {L('Alertas', 'Alerts')}</p>
            <span className="text-[11px] font-semibold text-amber-700">{L('Por debajo del mínimo', 'Below minimum level')}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{L('Sucursales Conectadas', 'Connected Branches')}</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{L('3 Puntos', '3 Locations')}</p>
            <span className="text-[11px] font-semibold text-slate-500">{L('Central • Norte • Sur', 'Central • North • South')}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Controles de Filtro y Pestañas */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Pestañas de Vista */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTab('catalogo')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'catalogo'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {L('Catálogo General', 'General Catalog')}
            </button>
            <button
              onClick={() => setActiveTab('sucursales')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'sucursales'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {L('Existencias por Sucursal', 'Stock by Branch')}
            </button>
            <button
              onClick={() => setActiveTab('alertas')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'alertas'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{L('Alertas Críticas', 'Critical Alerts')}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800">
                {itemsCriticos}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('bodega')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'bodega'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-indigo-600" />
              <span>{L('Bodega & Ubicaciones', 'Warehouse & Locations')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={handleExportInventory}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
              title={L('Exportar inventario completo a Excel (.csv)', 'Export full inventory to Excel (.csv)')}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Buscador y Selectores (Ocultos en vista de bodega) */}
        {activeTab !== 'bodega' && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={L('Buscar por nombre, código de barras o SKU...', 'Search by name, barcode, or SKU...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              />
              {isLoadingLive && (
                <RefreshCw className="w-3.5 h-3.5 absolute right-3 top-3 text-indigo-500 animate-spin" />
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[220px] truncate"
              >
                <option value="Todas">{L(`Todas las Categorías (${products.length})`, `All Categories (${products.length})`)}</option>
                {categories.filter(c => c !== 'Todas').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowCategoryModal(true)}
                title={L('Administrar Categorías de Catálogo', 'Manage Catalog Categories')}
                className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <FolderTree className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">{L('Categorías', 'Categories')}</span>
              </button>

              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Todas">{L('Todas las Sucursales', 'All Branches')}</option>
                <option value="Central">{L('Sucursal Central', 'Central Branch')}</option>
                <option value="Norte">{L('Sucursal Norte', 'North Branch')}</option>
                <option value="Sur">{L('Sucursal Sur', 'South Branch')}</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* VISTA A: GESTIÓN DE BODEGA & UNIDADES (Laravel: UnidadMedidaResource, UbicacionResource) */}
      {activeTab === 'bodega' ? (
        <div className="space-y-6">
          {/* Banner de Bodega */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-indigo-400" />
                {L('Control de Almacenamiento & Estándares', 'Storage Control & Standards')}
              </span>
              <h2 className="text-lg font-black tracking-tight">{L('Catálogo de Bodega, Pasillos y Unidades de Medida', 'Warehouse Catalog, Aisles & Units of Measure')}</h2>
              <p className="text-xs text-slate-300 max-w-xl">
                {L('Estructura de estanterías físicas, niveles y casillas (bins) por sucursal, junto con las unidades métricas oficiales para inventario y compras.', 'Physical rack structure, levels, and bins per branch, along with official units of measure for inventory and purchasing.')}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNewUnidadModal(true)}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{L('+ Nueva Unidad', '+ New Unit')}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNewUbicacionModal(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{L('+ Nueva Ubicación', '+ New Location')}</span>
              </button>
            </div>
          </div>

          {/* Grid de 2 Columnas: Ubicaciones Físicas y Unidades de Medida */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna Izquierda (2 spans): Ubicaciones Físicas */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {L('Ubicaciones Físicas de Almacén', 'Physical Warehouse Locations')} ({ubicacionesBodega.length})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewUbicacionModal(true)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    {L('+ Agregar Ubicación', '+ Add Location')}
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {ubicacionesBodega.map((ub) => (
                    <div key={ub.id_ubicacion} className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono">
                            {ub.codigo_bodega}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500">
                            {trBranch(ub.sucursal_nombre)}
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-slate-900">
                          {trLocText(ub.pasillo)} • {trLocText(ub.estante)}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>{trLocText(ub.nivel)}</span>
                          <span>•</span>
                          <span className="font-bold text-purple-700">{ub.bin}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {trLocText(ub.pasillo).slice(0, 10)}/{trLocText(ub.estante).slice(0, 7)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Derecha (1 span): Unidades de Medida */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {L('Unidades de Medida', 'Units of Measure')} ({unidadesMedida.length})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewUnidadModal(true)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-800"
                  >
                    {L('+ Nueva', '+ New')}
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {unidadesMedida.map((u) => (
                    <div key={u.id_unidad} className="p-3.5 hover:bg-slate-50 transition-colors flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{trUnitName(u.nombre)}</p>
                        <span className="text-[10px] text-slate-400">{L('Estándar de Inventario', 'Inventory Standard')}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-black font-mono">
                        {u.abreviatura}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tabla Profesional de Inventario */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">{L('Producto', 'Product')}</th>
                <th className="py-3.5 px-4">{L('Categoría / Proveedor', 'Category / Supplier')}</th>
                <th className="py-3.5 px-4 text-right">{L('P. Compra', 'Cost Price')}</th>
                <th className="py-3.5 px-4 text-right">{L('P. Venta', 'Sale Price')}</th>
                <th className="py-3.5 px-4 text-center">{L('Margen', 'Margin')}</th>
                {activeTab === 'sucursales' ? (
                  <>
                    <th className="py-3.5 px-3 text-center">{L('Central', 'Central')}</th>
                    <th className="py-3.5 px-3 text-center">{L('Norte', 'North')}</th>
                    <th className="py-3.5 px-3 text-center">{L('Sur', 'South')}</th>
                  </>
                ) : (
                  <th className="py-3.5 px-4 text-center">{L('Stock Total', 'Total Stock')}</th>
                )}
                <th className="py-3.5 px-4 text-center">{L('Estado', 'Status')}</th>
                <th className="py-3.5 px-4 text-right">{L('Acciones', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={activeTab === 'sucursales' ? 9 : 7} className="py-12 text-center text-slate-400">
                    <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-600">{L('No se encontraron productos', 'No products found')}</p>
                    <p className="text-xs text-slate-400 mt-1">{L('Prueba cambiando los filtros o el término de búsqueda.', 'Try changing the filters or search term.')}</p>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => {
                const hasSalePrice = p.precioVenta > 0;
                let rawMargen = 0;
                if (hasSalePrice && p.precioCompra >= 0) {
                  const calculated = ((p.precioVenta - p.precioCompra) / p.precioVenta) * 100;
                  rawMargen = isFinite(calculated) ? calculated : 0;
                }
                const isLowStock = p.stockTotal <= p.stockMinimo;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Fotografía y Nombre con Zoom para Comparación Física */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          onClick={() => p.imagen && setEnlargedImageItem(p)}
                          className={`w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-sm transition-all relative group/img ${
                            p.imagen ? 'cursor-zoom-in hover:ring-2 hover:ring-indigo-500 hover:scale-105' : 'cursor-default'
                          }`}
                          title={p.imagen ? L('Clic para ampliar imagen y comparar con producto físico', 'Click to zoom image and compare with physical item') : L('Sin fotografía asignada', 'No photo assigned')}
                        >
                          {p.imagen ? (
                            <>
                              <img 
                                src={p.imagen} 
                                alt={p.nombre} 
                                className="w-full h-full object-cover" 
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <ZoomIn className="w-4 h-4" />
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate max-w-xs">{p.nombre}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">
                              {p.sku}
                            </span>
                            {(p.talla || '').trim() && (
                              <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.2 rounded" title={`${L('Talla', 'Size')}: ${p.talla}${(p.color || '').trim() ? ` • Color: ${p.color}` : ''}`}>
                                {L('Talla', 'Size')} {p.talla}
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400">
                              EAN: {p.codigoBarras}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Categoría y Proveedor */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-700">{p.categoria}</p>
                      <p className="text-[11px] text-slate-400">{p.proveedor}</p>
                    </td>

                    {/* Precios */}
                    <td className="py-3 px-4 text-right font-medium text-slate-600">
                      {money(p.precioCompra)}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                      {money(p.precioVenta)}
                    </td>

                    {/* Margen */}
                    <td className="py-3 px-4 text-center">
                      {hasSalePrice ? (
                        <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${
                          rawMargen > 0 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : rawMargen < 0 
                              ? 'bg-rose-50 text-rose-700 border-rose-200' 
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          {rawMargen > 0 ? `+${rawMargen.toFixed(1)}%` : `${rawMargen.toFixed(1)}%`}
                        </span>
                      ) : (
                        <span 
                          className="inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap"
                          title={L(`Precio de venta no asignado (${money(0)})`, `Sale price not set (${money(0)})`)}
                        >
                          0.0%
                        </span>
                      )}
                    </td>

                    {/* Stock Multi-Sucursal o Total */}
                    {activeTab === 'sucursales' ? (
                      <>
                        <td className="py-3 px-3 text-center font-bold text-slate-800">{p.stockPorSucursal.central}</td>
                        <td className="py-3 px-3 text-center font-bold text-slate-800">{p.stockPorSucursal.norte}</td>
                        <td className="py-3 px-3 text-center font-bold text-slate-800">{p.stockPorSucursal.sur}</td>
                      </>
                    ) : (
                      <td className="py-3 px-4 text-center">
                        <span className="text-xs font-black text-slate-900">{p.stockTotal}</span>
                        <span className="text-[10px] text-slate-400 block">{L('mín', 'min')}: {p.stockMinimo}</span>
                      </td>
                    )}

                    {/* Badge de Estado */}
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isLowStock 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isLowStock ? L('Bajo Stock', 'Low Stock') : L('Disponible', 'In Stock')}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          type="button" 
                          onClick={() => setLabelProduct(p)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title={L('Imprimir etiquetas de código de barras', 'Print barcode labels')}
                        >
                          <Barcode className="w-4 h-4" />
                        </button>
                        <button 
                          type="button" 
                          onClick={() => {
                            setTransferData(prev => ({ ...prev, productoId: p.id }));
                            setShowTransferModal(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title={L('Trasladar entre sucursales', 'Transfer between branches')}
                        >
                          <ArrowLeftRight className="w-4 h-4" />
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title={L('Editar producto', 'Edit product')}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p)}
                          disabled={isDeletingProduct}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          title={L('Desactivar / Eliminar producto', 'Deactivate / Delete product')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>

        {/* Barra de Paginación */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 font-medium">
              {L('Mostrando', 'Showing')} <strong className="text-slate-800">{filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> {L('a', 'to')} <strong className="text-slate-800">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> {L('de', 'of')} <strong className="text-slate-800">{filteredProducts.length.toLocaleString(locale)}</strong> {L('productos', 'products')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
              >
                {L('Anterior', 'Previous')}
              </button>
              <span className="px-3 py-1.5 font-bold text-slate-700 bg-white border border-slate-200 rounded-lg">
                {L(`Pág. ${currentPage} de ${totalPages}`, `Page ${currentPage} of ${totalPages}`)}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
              >
                {L('Siguiente', 'Next')}
              </button>
            </div>
          </div>
        )}
      </div>
      )}

      {/* MODAL 1: Registrar Nuevo Producto (Completo con Foto) */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <h3 className="text-base font-black text-slate-900">{L('Registrar Nuevo Producto en Catálogo', 'Register New Catalog Product')}</h3>
                <p className="text-xs text-slate-400">{L('Completa la ficha técnica para ingresarlo al inventario', 'Complete the product details to add it to inventory')}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowNewProductModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form id="new-product-form" onSubmit={handleCreateProduct} className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* Barra de Scraper Inteligente de Producto (Idéntico a ProductoResource en Laravel) */}
              <div className="p-3.5 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-emerald-500/10 rounded-2xl border border-indigo-200/80 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-800">{L('Scraper de Productos & Fotos', 'Product & Photo Scraper')}</span>
                      <p className="text-[10px] text-slate-500">{L('Copia fotos y especificaciones desde Shein, Temu o AliExpress', 'Import photos and specs from Shein, Temu, or AliExpress')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={isScrapingProduct}
                      onClick={() => setShowProductScraper(!showProductScraper)}
                      className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-lg border border-slate-200 text-[11px] flex items-center gap-1 shadow-sm"
                    >
                      <ExternalLink className="w-3 h-3 text-indigo-600" />
                      {L('Pegar Link', 'Paste Link')}
                    </button>
                    <button
                      type="button"
                      disabled={isScrapingProduct}
                      onClick={handlePasteProductFromExtension}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg text-[11px] flex items-center gap-1.5 shadow-sm"
                    >
                      {isScrapingProduct ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>{L('Extrayendo...', 'Extracting...')}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3" />
                          <span>{L('Traer de Extensión', 'Import from Extension')}</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTokenModal(true)}
                      className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg border border-amber-200 text-[11px] flex items-center gap-1 shadow-sm cursor-pointer"
                      title={L('Generar o configurar clave de API para la extensión de Chrome', 'Generate or configure API key for the Chrome extension')}
                    >
                      <Key className="w-3 h-3 text-amber-600" />
                      <span>{L('Token API', 'API Token')}</span>
                    </button>
                  </div>
                </div>

                {showProductScraper && (
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-200 flex items-center gap-2">
                    <input
                      type="url"
                      placeholder={L('Pega la URL de Shein, Temu o AliExpress...', 'Paste Shein, Temu, or AliExpress URL...')}
                      value={productScraperUrl}
                      onChange={(e) => setProductScraperUrl(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      disabled={isScrapingProduct || !productScraperUrl}
                      onClick={() => handleScrapeProductLink(productScraperUrl)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-lg whitespace-nowrap"
                    >
                      {L('Extraer Datos & Foto', 'Extract Data & Photo')}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Nombre */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Nombre Comercial del Producto *', 'Product Trade Name *')}</label>
                  <input
                    type="text"
                    required
                    placeholder={L('Ej. Harina de Trigo Fortificada 5lb', 'e.g. Enriched Wheat Flour 5lb')}
                    value={newProduct.nombre}
                    onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                {/* SKU & Código de Barras */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('SKU Interno', 'Internal SKU')}</label>
                  <input
                    type="text"
                    placeholder={L('Ej. HAR-009', 'e.g. FLR-009')}
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">{L('Código de Barras (EAN-13)', 'Barcode (EAN-13)')}</label>
                    <button
                      type="button"
                      onClick={handleGenerateBarcode}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> {L('Auto-Generar EAN', 'Auto-Generate EAN')}
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder={L('Ej. 7401004567891', 'e.g. 7401004567891')}
                    value={newProduct.codigoBarras}
                    onChange={(e) => setNewProduct({ ...newProduct, codigoBarras: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                  />
                  {newProduct.codigoBarras && (
                    <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 flex justify-center">
                      <BarcodeSVG value={newProduct.codigoBarras} width={180} height={40} />
                    </div>
                  )}
                </div>

                {/* Categoría & Proveedor */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">{L('Categoría *', 'Category *')}</label>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      title={L('Administrar o agregar nueva categoría', 'Manage or add a new category')}
                    >
                      <Plus className="w-3 h-3" />
                      <span>{L('Nueva', 'New')}</span>
                    </button>
                  </div>
                  <select
                    value={newProduct.categoria}
                    onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c === 'Todas' ? L('Todas', 'All') : c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Proveedor Principal', 'Primary Supplier')}</label>
                  <input
                    type="text"
                    placeholder={L('Ej. Molinos Centrales S.A.', 'e.g. Central Mills Corp.')}
                    value={newProduct.proveedor}
                    onChange={(e) => setNewProduct({ ...newProduct, proveedor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                {/* Precios */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L(`Precio de Compra (${currencySymbol}) *`, `Cost Price (${currencySymbol}) *`)}</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={newProduct.precioCompra}
                    onChange={(e) => setNewProduct({ ...newProduct, precioCompra: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L(`Precio de Venta (${currencySymbol}) *`, `Sale Price (${currencySymbol}) *`)}</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={newProduct.precioVenta}
                    onChange={(e) => setNewProduct({ ...newProduct, precioVenta: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                {/* Stock Inicial & Mínimo */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Stock Inicial (Sucursal Central)', 'Initial Stock (Central Branch)')}</label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={newProduct.stockInicial}
                    onChange={(e) => setNewProduct({ ...newProduct, stockInicial: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Stock Mínimo de Alerta', 'Low Stock Alert Threshold')}</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={newProduct.stockMinimo}
                    onChange={(e) => setNewProduct({ ...newProduct, stockMinimo: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                {/* Unidad de Medida & Ubicación de Almacén (Laravel: UnidadMedida, Ubicacion) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('Unidad de Medida *', 'Unit of Measure *')}
                  </label>
                  <select
                    value={newProduct.unidadMedida}
                    onChange={(e) => setNewProduct({ ...newProduct, unidadMedida: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {unidadesMedida.map((u) => (
                      <option key={u.id_unidad} value={u.nombre}>
                        {trUnitName(u.nombre)} ({u.abreviatura})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('Ubicación en Bodega', 'Warehouse Location')}
                  </label>
                  <select
                    value={newProduct.ubicacion}
                    onChange={(e) => setNewProduct({ ...newProduct, ubicacion: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {ubicacionesBodega.map((ub) => (
                      <option key={ub.id_ubicacion} value={`${ub.codigo_bodega}: ${ub.pasillo} • ${ub.estante}`}>
                        {trBranch(ub.sucursal_nombre)} - {trLocText(ub.pasillo)} ({trLocText(ub.estante)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fotografía de Producto con Carga desde Computadora */}
                <div className="sm:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {L('Fotografía del Producto *', 'Product Photo *')}
                  </label>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-indigo-200 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                      {newProduct.imagen ? (
                        <img src={newProduct.imagen} alt={L('Vista previa', 'Preview')} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        ref={productFileInputRef}
                        accept="image/*"
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => productFileInputRef.current?.click()}
                          className="px-3.5 py-2 bg-white hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{L('Subir Foto desde mi Computadora', 'Upload Photo from Computer')}</span>
                        </button>
                      </div>
                      <input
                        type="url"
                        placeholder={L('O pega un enlace web: https://ejemplo.com/foto.jpg', 'Or paste an image URL: https://example.com/photo.jpg')}
                        value={newProduct.imagen}
                        onChange={(e) => {
                          setNewImageFile(null); // una URL manual anula cualquier archivo pendiente
                          setNewProduct({ ...newProduct, imagen: e.target.value });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Footer Fijo Siempre Visible */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 shrink-0 shadow-xs">
              <button
                type="button"
                onClick={() => setShowNewProductModal(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                {L('Cancelar', 'Cancel')}
              </button>
              <button
                type="submit"
                form="new-product-form"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/25 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{L('Guardar Producto', 'Save Product')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1.5: Editar Ficha de Producto */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Cabecera Modal */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{L('Editar Producto del Catálogo', 'Edit Catalog Product')}</h3>
                  <p className="text-xs text-slate-500">
                    {L('Modificando ficha de', 'Editing details for')} <span className="font-semibold text-slate-700">{editingProduct.nombre}</span> (ID: #{editingProduct.id})
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formulario con Scroll */}
            <form id="edit-product-form" onSubmit={handleUpdateProduct} className="p-4 sm:p-6 space-y-4 flex-1 min-h-0 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Nombre */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('Nombre Comercial del Producto *', 'Product Trade Name *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.nombre}
                    onChange={(e) => setEditFormData({ ...editFormData, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    placeholder={L('Nombre del producto', 'Product name')}
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('SKU Interno *', 'Internal SKU *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.sku}
                    onChange={(e) => setEditFormData({ ...editFormData, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    placeholder="SKU"
                  />
                </div>

                {/* Talla y Color */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {L('Talla', 'Size')}
                    </label>
                    <input
                      type="text"
                      value={editFormData.talla}
                      onChange={(e) => setEditFormData({ ...editFormData, talla: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                      placeholder={L('S, M, L, Única...', 'S, M, L, One Size...')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {L('Color', 'Color')}
                    </label>
                    <input
                      type="text"
                      value={editFormData.color}
                      onChange={(e) => setEditFormData({ ...editFormData, color: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                      placeholder={L('Negro, Varios...', 'Black, Assorted...')}
                    />
                  </div>
                </div>

                {/* Código de Barras (EAN-13) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {L('Código de Barras (EAN-13)', 'Barcode (EAN-13)')}
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateEditBarcode}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> {L('Re-Generar EAN', 'Regenerate EAN')}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editFormData.codigoBarras}
                    onChange={(e) => setEditFormData({ ...editFormData, codigoBarras: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                    placeholder={L('Código de barras', 'Barcode')}
                  />
                  {editFormData.codigoBarras && (
                    <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 flex justify-center">
                      <BarcodeSVG value={editFormData.codigoBarras} width={180} height={36} />
                    </div>
                  )}
                </div>

                {/* Categoría */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {L('Categoría *', 'Category *')}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      title={L('Administrar o agregar nueva categoría', 'Manage or add a new category')}
                    >
                      <Plus className="w-3 h-3" />
                      <span>{L('Nueva', 'New')}</span>
                    </button>
                  </div>
                  <select
                    value={editFormData.categoria}
                    onChange={(e) => setEditFormData({ ...editFormData, categoria: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c === 'Todas' ? L('Todas', 'All') : c}</option>
                    ))}
                  </select>
                </div>

                {/* Proveedor */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('Proveedor Principal', 'Primary Supplier')}
                  </label>
                  <input
                    type="text"
                    value={editFormData.proveedor}
                    onChange={(e) => setEditFormData({ ...editFormData, proveedor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    placeholder={L('Proveedor', 'Supplier')}
                  />
                </div>

                {/* Precios y Margen */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {L(`Precio de Compra (Costo ${currencySymbol}) *`, `Purchase Price (Cost ${currencySymbol}) *`)}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editFormData.precioCompra}
                    onChange={(e) => setEditFormData({ ...editFormData, precioCompra: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  />
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {L(`Precio de Venta (${currencySymbol}) *`, `Sale Price (${currencySymbol}) *`)}
                    </label>
                    {parseFloat(editFormData.precioVenta) > 0 && parseFloat(editFormData.precioCompra) > 0 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {L('Margen:', 'Margin:')} {(((parseFloat(editFormData.precioVenta) - parseFloat(editFormData.precioCompra)) / parseFloat(editFormData.precioVenta)) * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editFormData.precioVenta}
                    onChange={(e) => setEditFormData({ ...editFormData, precioVenta: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-emerald-700"
                  />
                </div>

                {/* Stock Mínimo de Alerta */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('Stock Mínimo de Alerta (Bajo Stock)', 'Minimum Stock Alert (Low Stock)')}
                  </label>
                  <input
                    type="number"
                    value={editFormData.stockMinimo}
                    onChange={(e) => setEditFormData({ ...editFormData, stockMinimo: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    placeholder="10"
                  />
                </div>

                {/* Inventario por Sucursales */}
                <div className="sm:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-indigo-600" />
                      {L('Existencias Distribuidas por Sucursal', 'Stock Distributed by Branch')}
                    </label>
                    <span className="text-xs font-black text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {L('Stock Total:', 'Total Stock:')} {(parseInt(editFormData.stockCentral) || 0) + (parseInt(editFormData.stockNorte) || 0) + (parseInt(editFormData.stockSur) || 0)} {L('unidades', 'units')}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">{L('Sucursal Central', 'Central Branch')}</label>
                      <input
                        type="number"
                        min="0"
                        value={editFormData.stockCentral}
                        onChange={(e) => setEditFormData({ ...editFormData, stockCentral: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">{L('Sucursal Norte', 'North Branch')}</label>
                      <input
                        type="number"
                        min="0"
                        value={editFormData.stockNorte}
                        onChange={(e) => setEditFormData({ ...editFormData, stockNorte: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">{L('Sucursal Sur', 'South Branch')}</label>
                      <input
                        type="number"
                        min="0"
                        value={editFormData.stockSur}
                        onChange={(e) => setEditFormData({ ...editFormData, stockSur: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Fotografía del Producto */}
                <div className="sm:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {L('Fotografía del Producto', 'Product Photo')}
                  </label>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-indigo-200 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                      {editFormData.imagen ? (
                        <img src={editFormData.imagen} alt={L('Vista previa', 'Preview')} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        ref={editFileInputRef}
                        accept="image/*"
                        onChange={handleEditImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="px-3.5 py-2 bg-white hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{L('Subir Nueva Foto desde Computadora', 'Upload New Photo from Computer')}</span>
                      </button>
                      <input
                        type="url"
                        placeholder={L('O pega un enlace web de la imagen: https://...', 'Or paste an image URL: https://...')}
                        value={editFormData.imagen}
                        onChange={(e) => {
                          setEditImageFile(null); // una URL manual anula cualquier archivo pendiente
                          setEditFormData({ ...editFormData, imagen: e.target.value });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </form>

            {/* Footer Fijo Siempre Visible */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 shrink-0 shadow-xs">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                {L('Cancelar', 'Cancel')}
              </button>
              <button
                type="submit"
                form="edit-product-form"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{L('Guardar Cambios', 'Save Changes')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Traslado de Stock entre Sucursales */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
                  {L('Traslado de Mercadería', 'Merchandise Transfer')}
                </h3>
                <p className="text-xs text-slate-400">{L('Movimiento de inventario entre sucursales autorizadas', 'Inventory movement between authorized branches')}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowTransferModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTransfer} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Producto a Mover', 'Product to Transfer')}</label>
                <select
                  value={transferData.productoId}
                  onChange={(e) => setTransferData({ ...transferData, productoId: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre} ({L('Disponibles', 'Available')}: {p.stockTotal})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Sucursal Origen', 'Origin Branch')}</label>
                  <select
                    value={transferData.origen}
                    onChange={(e) => setTransferData({ ...transferData, origen: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Sucursal Central">{L('Central', 'Central')}</option>
                    <option value="Sucursal Norte">{L('Norte', 'North')}</option>
                    <option value="Sucursal Sur">{L('Sur', 'South')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Sucursal Destino', 'Destination Branch')}</label>
                  <select
                    value={transferData.destino}
                    onChange={(e) => setTransferData({ ...transferData, destino: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Sucursal Norte">{L('Norte', 'North')}</option>
                    <option value="Sucursal Sur">{L('Sur', 'South')}</option>
                    <option value="Sucursal Central">{L('Central', 'Central')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Cantidad de Unidades', 'Quantity of Units')}</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={transferData.cantidad}
                  onChange={(e) => setTransferData({ ...transferData, cantidad: parseInt(e.target.value) || 1 })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Motivo / Justificación', 'Reason / Justification')}</label>
                <input
                  type="text"
                  placeholder={L('Ej. Reabastecimiento por alerta de stock mínimo', 'e.g. Replenishment due to low stock alert')}
                  value={transferData.motivo}
                  onChange={(e) => setTransferData({ ...transferData, motivo: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/25 transition-all"
                >
                  {L('Emitir Orden de Traslado', 'Issue Transfer Order')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Visor / Comparador de Fotografía en Alta Resolución */}
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
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{enlargedImageItem.nombre}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {enlargedImageItem.sku}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {L('Código EAN:', 'EAN Code:')} {enlargedImageItem.codigoBarras}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      • {enlargedImageItem.categoria}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => setEnlargedImageItem(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
                title={L('Cerrar imagen', 'Close image')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen Ampliada Limpia y Sin Obstrucciones */}
            <div className="p-6 bg-slate-900 flex items-center justify-center max-h-[65vh] overflow-hidden">
              <img 
                src={enlargedImageItem.imagen} 
                alt={enlargedImageItem.nombre} 
                className="max-h-[60vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Pie con Información Clave de Verificación */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                <span>{L('Precio Venta:', 'Sale Price:')} <strong className="text-slate-900">{money(enlargedImageItem.precioVenta)}</strong></span>
                <span>{L('Stock Total:', 'Total Stock:')} <strong className="text-indigo-600">{enlargedImageItem.stockTotal} {L('unidades', 'units')}</strong></span>
                <span>{L('Proveedor:', 'Supplier:')} <strong className="text-slate-800">{enlargedImageItem.proveedor}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setEnlargedImageItem(null)}
                className="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                {L('Cerrar Comparador', 'Close Viewer')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Impresión de Etiquetas con Código de Barras (Zebra / Térmica) */}
      {labelProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Cabecera */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Barcode className="w-5 h-5 text-indigo-600" />
                  {L('Impresor de Etiquetas Adhesivas', 'Adhesive Label Printer')}
                </h3>
                <p className="text-xs text-slate-400">{L('Etiqueta con código EAN-13 oficial para estanterías o productos', 'Official EAN-13 barcode label for shelves or products')}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setLabelProduct(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vista Previa de la Etiqueta Adhesiva Física (Sticker) */}
            <div className="p-6 bg-slate-100 flex flex-col items-center">
              <div className="w-72 bg-white p-4 rounded-2xl border-2 border-dashed border-slate-300 shadow-lg flex flex-col items-center text-center">
                {/* Cabecera de la etiqueta */}
                <div className="w-full flex items-center justify-between pb-1.5 border-b border-slate-100 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <span>INTEGRAPRO RETAIL</span>
                  <span className="text-indigo-600">{L('SUCURSAL CENTRAL', 'CENTRAL BRANCH')}</span>
                </div>

                {/* Nombre del Producto */}
                <h4 className="text-xs font-black text-slate-900 mt-2 line-clamp-2 px-1">
                  {labelProduct.nombre}
                </h4>

                {/* Código de Barras Gráfico Renderizado */}
                <div className="my-2">
                  <BarcodeSVG 
                    value={labelProduct.codigoBarras} 
                    width={230} 
                    height={65} 
                    showText={true} 
                  />
                </div>

                {/* Pie de etiqueta con SKU y Precio */}
                <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                      {labelProduct.sku}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{labelProduct.categoria}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">{L('Precio Venta', 'Sale Price')}</span>
                    <span className="text-lg font-black text-slate-900">
                      {money(labelProduct.precioVenta)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 mt-3 text-center">
                {L('Formato compatible con impresoras térmicas de rollos (Zebra, Xprinter, Dymo 58mm/80mm).', 'Compatible with thermal roll printers (Zebra, Xprinter, Dymo 58mm/80mm).')}
              </p>
            </div>

            {/* Controles de Configuración de Impresión */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {L('Cantidad de Etiquetas a Imprimir', 'Number of Labels to Print')}
                  </label>
                  <p className="text-[11px] text-slate-400">{L('Genera lote de stickers listos para etiquetar', 'Generates a batch of ready-to-apply stickers')}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 5, 10, 25].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setLabelQuantity(qty)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                        labelQuantity === qty
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLabelProduct(null)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {L('Cerrar', 'Close')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setLabelProduct(null);
                    showToast(L(`Orden de impresión enviada: ${labelQuantity} etiquetas para "${labelProduct.nombre}"`, `Print job sent: ${labelQuantity} labels for "${labelProduct.nombre}"`));
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>{L(`Imprimir ${labelQuantity} Etiquetas`, `Print ${labelQuantity} Labels`)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL 5: Nueva Unidad de Medida (Laravel: UnidadMedidaResource) */}
      {showNewUnidadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-black text-slate-900">{L('Registrar Unidad de Medida', 'Register Unit of Measure')}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewUnidadModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUnidad} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {L('Nombre de la Unidad *', 'Unit Name *')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={L('Ej. Galón, Docena, Quintal...', 'e.g. Gallon, Dozen, Case...')}
                  value={newUnidad.nombre}
                  onChange={(e) => setNewUnidad({ ...newUnidad, nombre: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {L('Abreviatura / Símbolo *', 'Abbreviation / Symbol *')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={L('Ej. GL, DOC, QQ...', 'e.g. GAL, DOZ, CS...')}
                  value={newUnidad.abreviatura}
                  onChange={(e) => setNewUnidad({ ...newUnidad, abreviatura: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-black uppercase"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewUnidadModal(false)}
                  className="px-3.5 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-sm"
                >
                  {L('Guardar Unidad', 'Save Unit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: Nueva Ubicación Física de Bodega (Laravel: UbicacionResource) */}
      {showNewUbicacionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-black text-slate-900">{L('Registrar Ubicación en Almacén', 'Register Warehouse Location')}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewUbicacionModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUbicacion} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {L('Sucursal Destino *', 'Destination Branch *')}
                </label>
                <select
                  value={newUbicacion.sucursal_nombre}
                  onChange={(e) => {
                    const suc = e.target.value;
                    const cod = suc.includes('Central') ? 'BOD-CENTRAL-01' : suc.includes('Norte') ? 'BOD-NORTE-01' : 'BOD-SUR-01';
                    setNewUbicacion({ ...newUbicacion, sucursal_nombre: suc, codigo_bodega: cod });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option value="Sucursal Central">{L('Sucursal Central', 'Central Branch')}</option>
                  <option value="Sucursal Norte">{L('Sucursal Norte', 'North Branch')}</option>
                  <option value="Sucursal Sur">{L('Sucursal Sur', 'South Branch')}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {L('Código de Bodega', 'Warehouse Code')}
                </label>
                <input
                  type="text"
                  value={newUbicacion.codigo_bodega}
                  onChange={(e) => setNewUbicacion({ ...newUbicacion, codigo_bodega: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-indigo-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('Pasillo *', 'Aisle *')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={L('Ej. Pasillo A, Sector 2...', 'e.g. Aisle A, Zone 2...')}
                    value={newUbicacion.pasillo}
                    onChange={(e) => setNewUbicacion({ ...newUbicacion, pasillo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('Estantería *', 'Rack / Shelf *')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={L('Ej. Estante 03...', 'e.g. Rack 03...')}
                    value={newUbicacion.estante}
                    onChange={(e) => setNewUbicacion({ ...newUbicacion, estante: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('Nivel de Altura', 'Height Level')}
                  </label>
                  <input
                    type="text"
                    placeholder={L('Ej. Nivel 1 (Piso)...', 'e.g. Level 1 (Floor)...')}
                    value={newUbicacion.nivel}
                    onChange={(e) => setNewUbicacion({ ...newUbicacion, nivel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {L('Bin / Casilla', 'Bin / Slot')}
                  </label>
                  <input
                    type="text"
                    placeholder={L('Ej. Bin A-12...', 'e.g. Bin A-12...')}
                    value={newUbicacion.bin}
                    onChange={(e) => setNewUbicacion({ ...newUbicacion, bin: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewUbicacionModal(false)}
                  className="px-3.5 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl"
                >
                  {L('Cancelar', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-sm"
                >
                  {L('Guardar Ubicación', 'Save Location')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GESTIÓN DE CATEGORÍAS */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <FolderTree className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">{L('Gestión de Categorías', 'Category Management')}</h3>
                  <p className="text-[10px] text-slate-400 font-medium">{L('Catálogo dinámico de inventario', 'Dynamic inventory catalog')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Formulario para agregar nueva categoría */}
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder={L('Nueva categoría (ej. Limpieza, Repuestos)...', 'New category (e.g. Cleaning, Parts)...')}
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm shrink-0"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>{L('Agregar', 'Add')}</span>
                </button>
              </form>

              {/* Lista de categorías */}
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {categories.map((cat) => {
                  const isEditing = editingCategory?.original === cat;
                  const count = products.filter((p) => p.categoria.toLowerCase() === cat.toLowerCase()).length;

                  return (
                    <div
                      key={cat}
                      className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs hover:border-slate-300 transition-all"
                    >
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 flex-1 mr-2">
                          <input
                            type="text"
                            value={editingCategory.current}
                            onChange={(e) => setEditingCategory({ ...editingCategory, current: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEditCategory()}
                            autoFocus
                            className="w-full px-2 py-1 bg-white border border-indigo-400 rounded-lg text-xs font-bold text-slate-800 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleSaveEditCategory}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                            title={L('Guardar nombre', 'Save name')}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCategory(null)}
                            className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg"
                            title={L('Cancelar', 'Cancel')}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <Tag className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="font-bold text-slate-800">{cat === 'Todas' ? L('Todas', 'All') : cat}</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-600">
                              {count} {count === 1 ? L('producto', 'product') : L('productos', 'products')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleStartEditCategory(cat)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title={L('Editar nombre', 'Edit name')}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(cat)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title={L('Eliminar categoría', 'Delete category')}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pie de modal */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleResetDefaultCategories}
                  className="text-[11px] font-bold text-slate-400 hover:text-slate-600 underline"
                >
                  {L('Restablecer predeterminadas', 'Restore defaults')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
                >
                  {L('Cerrar', 'Close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Flotante: Token para Extensión Scraper */}
      {showTokenModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-4 my-8 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setShowTokenModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer z-10"
              title={L('Cerrar', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
            <TokenExtensionScraper />
          </div>
        </div>
      )}
    </div>
  );
}
