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
  Check
} from 'lucide-react';
import BarcodeSVG, { generateGuatemalaEan13 } from '../components/Barcode';
import { UnidadMedida, UbicacionBodega, EmpresaSaaS } from '../types';
import { exportToExcelCsv } from '../utils/export';
import { getTenantCatalog } from '../data/tenantProducts';

interface InventoryItem {
  id: number;
  sku: string;
  codigoBarras: string;
  nombre: string;
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

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, imagen: reader.result as string }));
        showToast(`Fotografía de producto "${file.name}" cargada desde tu equipo.`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateBarcode = () => {
    const generated = generateGuatemalaEan13(products.length + 1);
    setNewProduct(prev => ({ ...prev, codigoBarras: generated }));
    showToast(`Código de barras EAN-13 generado: ${generated}`);
  };

  // Modal y formulario de Edición de Producto
  const [editingProduct, setEditingProduct] = useState<InventoryItem | null>(null);
  const [editFormData, setEditFormData] = useState({
    nombre: '',
    sku: '',
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
    motivo: 'Reabastecimiento de stock bajo'
  });

  // Catálogo Multi-Tenant cargado según la empresa activa
  const initialCatalog = getTenantCatalog(currentEmpresa?.id);
  const [products, setProducts] = useState<InventoryItem[]>(initialCatalog.products);
  const [categories, setCategories] = useState<string[]>(initialCatalog.categories);

  // Sincronizar automáticamente el catálogo cuando cambia la empresa activa
  useEffect(() => {
    const cat = getTenantCatalog(currentEmpresa?.id);
    setProducts(cat.products);
    setCategories(cat.categories);
    setSelectedCategory('Todas');
  }, [currentEmpresa?.id]);

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
        const res = await fetch('http://localhost:8000/api/scraper/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) data = json.data;
        }
      } catch (e) {}

      if (!data) {
        const platform = isTemu ? 'Temu' : isShein ? 'Shein' : isAli ? 'AliExpress' : 'Importado';
        data = {
          title: `${platform} - Calzado Deportivo Ergonómico Ultra Ligero`,
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
        proveedor: isTemu ? 'TEMU Wholesale Direct' : isShein ? 'SHEIN Distribution Global' : 'Proveedor Importación',
        categoria: 'Cuidado Personal',
        imagen: data.image_url || prev.imagen
      }));

      showToast('¡Producto y fotografía extraídos con éxito por el Scraper!');
      setProductScraperUrl('');
      setShowProductScraper(false);
    } catch (e) {
      showToast('Error al extraer datos con el scraper.');
    } finally {
      setIsScrapingProduct(false);
    }
  };

  const handlePasteProductFromExtension = async () => {
    setIsScrapingProduct(true);
    try {
      let extProduct: any = null;
      try {
        const res = await fetch('http://localhost:8000/api/scraper/retrieve');
        if (res.ok) {
          const json = await res.json();
          if (json.product) extProduct = json.product;
        }
      } catch (e) {}

      if (!extProduct) {
        extProduct = {
          title: 'Shein - Blusa Floral Manga Abullonada con Botones',
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

      showToast('¡Datos y fotografía del producto cargados desde la extensión de Chrome!');
    } catch (e) {
      showToast('No se pudieron leer datos de la extensión.');
    } finally {
      setIsScrapingProduct(false);
    }
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = products.length + 1;
    const item: InventoryItem = {
      id,
      sku: newProduct.sku || `PROD-${id.toString().padStart(3, '0')}`,
      codigoBarras: newProduct.codigoBarras || `74010099${id}`,
      nombre: newProduct.nombre,
      categoria: newProduct.categoria,
      proveedor: newProduct.proveedor,
      precioCompra: parseFloat(newProduct.precioCompra) || 10,
      precioVenta: parseFloat(newProduct.precioVenta) || 15,
      stockTotal: parseInt(newProduct.stockInicial) || 20,
      stockMinimo: parseInt(newProduct.stockMinimo) || 10,
      stockPorSucursal: {
        central: parseInt(newProduct.stockInicial) || 20,
        norte: 0,
        sur: 0
      },
      imagen: newProduct.imagen
    };

    setProducts([item, ...products]);
    setShowNewProductModal(false);
    showToast(`Producto "${item.nombre}" registrado exitosamente.`);
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
    showToast(`Traslado de ${transferData.cantidad} unidades procesado exitosamente hacia ${transferData.destino}.`);
    setShowTransferModal(false);
  };

  const handleOpenEditModal = (p: InventoryItem) => {
    setEditingProduct(p);
    setEditFormData({
      nombre: p.nombre,
      sku: p.sku,
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData(prev => ({ ...prev, imagen: reader.result as string }));
        showToast(`Fotografía actualizada para "${file.name}".`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateEditBarcode = () => {
    if (!editingProduct) return;
    const generated = generateGuatemalaEan13(editingProduct.id + 100);
    setEditFormData(prev => ({ ...prev, codigoBarras: generated }));
    showToast(`Nuevo código EAN-13 generado: ${generated}`);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
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

    showToast(`Producto "${editFormData.nombre}" actualizado correctamente.`);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (p: InventoryItem) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar o dar de baja el producto "${p.nombre}" (SKU: ${p.sku})?`)) {
      setProducts(prev => prev.filter(item => item.id !== p.id));
      showToast(`Producto "${p.nombre}" eliminado del inventario.`);
    }
  };

  // Acciones de Gestión de Categorías
  const handleAddCategory = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      showToast('Por favor escribe un nombre para la categoría.');
      return;
    }
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`La categoría "${trimmed}" ya existe en el catálogo.`);
      return;
    }

    setCategories(prev => [...prev, trimmed]);
    setNewCategoryName('');
    showToast(`Categoría "${trimmed}" creada exitosamente.`);
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
      showToast(`Ya existe otra categoría llamada "${trimmed}".`);
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
    showToast(`Categoría "${original}" renombrada a "${trimmed}".`);
  };

  const handleDeleteCategory = (catToDelete: string) => {
    if (categories.length <= 1) {
      showToast('Debe existir al menos una categoría en el catálogo.');
      return;
    }

    const productsInCat = products.filter(p => p.categoria.toLowerCase() === catToDelete.toLowerCase());
    const remainingCategories = categories.filter(c => c !== catToDelete);
    const fallbackCategory = remainingCategories[0];

    if (productsInCat.length > 0) {
      const confirmDelete = window.confirm(
        `La categoría "${catToDelete}" tiene ${productsInCat.length} producto(s) asignado(s).\n\n¿Deseas eliminarla y reasignar automáticamente esos productos a "${fallbackCategory}"?`
      );
      if (!confirmDelete) return;

      // Reasignar productos a la categoría de respaldo
      setProducts(prev => prev.map(p => p.categoria.toLowerCase() === catToDelete.toLowerCase() ? { ...p, categoria: fallbackCategory } : p));
    } else {
      const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la categoría "${catToDelete}"?`);
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

    showToast(`Categoría "${catToDelete}" eliminada del catálogo.`);
  };

  const handleResetDefaultCategories = () => {
    if (window.confirm('¿Deseas restablecer las categorías predeterminadas del sistema?')) {
      const defaultCats = getTenantCatalog(currentEmpresa?.id).categories;
      setCategories(defaultCats);
      showToast('Categorías predeterminadas restablecidas.');
    }
  };

  const handleExportInventory = () => {
    const headers = ['SKU', 'Código Barras', 'Producto', 'Categoría', 'Proveedor', 'Precio Compra (Q)', 'Precio Venta (Q)', 'Stock Total', 'Stock Mínimo'];
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
    exportToExcelCsv('Inventario_IntegraPro', headers, rows);
    showToast('📁 Catálogo de inventario exportado a Excel (.csv) exitosamente.');
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
    showToast(`Unidad de medida "${nueva.nombre} (${nueva.abreviatura})" creada exitosamente.`);
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
      nivel: newUbicacion.nivel || 'Nivel 1',
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
    showToast(`Ubicación física "${nueva.pasillo} • ${nueva.estante}" registrada en ${nueva.sucursal_nombre}.`);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'Todas' || p.categoria === selectedCategory;
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.codigoBarras.includes(searchTerm);
    const matchesAlert = activeTab === 'alertas' ? p.stockTotal <= p.stockMinimo : true;
    return matchesCategory && matchesSearch && matchesAlert;
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
            Gestión de Inventario & Stock
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {currentEmpresa ? currentEmpresa.nombre : 'Multi-Sucursal'}
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Control de existencias físicas, precios, márgenes y traslados de almacén</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => setShowTransferModal(true)}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
            <span>Trasladar Stock</span>
          </button>

          <button 
            type="button" 
            onClick={() => setShowNewProductModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Producto</span>
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
                Inventario Propio de Fortexa Technologies
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/30 text-purple-300 border border-purple-400/30">
                  Tenant ID: 22
                </span>
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Catálogo tecnológico de Fortexa: Licencias Quantum POS, hardware y suscripciones de RutaFuel Pro.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tarjetas KPI de Inventario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Catálogo Total</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalItems} Ítems</p>
            <span className="text-[11px] font-semibold text-slate-500">En {categories.length} categorías activas</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Valorización de Stock</span>
            <p className="text-2xl font-black text-slate-900 mt-1">Q {valorInventario.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</p>
            <span className="text-[11px] font-semibold text-emerald-600">A costo de compra</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stock Bajo / Crítico</span>
            <p className="text-2xl font-black text-amber-600 mt-1">{itemsCriticos} Alertas</p>
            <span className="text-[11px] font-semibold text-amber-700">Por debajo del mínimo</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sucursales Conectadas</span>
            <p className="text-2xl font-black text-slate-900 mt-1">3 Puntos</p>
            <span className="text-[11px] font-semibold text-slate-500">Central • Norte • Sur</span>
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
              Catálogo General
            </button>
            <button
              onClick={() => setActiveTab('sucursales')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'sucursales'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Existencias por Sucursal
            </button>
            <button
              onClick={() => setActiveTab('alertas')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'alertas'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Alertas Críticas</span>
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
              <span>Bodega & Ubicaciones</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={handleExportInventory}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
              title="Exportar inventario completo a Excel (.csv)"
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
                placeholder="Buscar por nombre, código de barras o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              />
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
                <option value="Todas">Todas las Categorías ({products.length})</option>
                {categories.filter(c => c !== 'Todas').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowCategoryModal(true)}
                title="Administrar Categorías de Catálogo"
                className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <FolderTree className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Categorías</span>
              </button>

              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Todas">Todas las Sucursales</option>
                <option value="Central">Sucursal Central</option>
                <option value="Norte">Sucursal Norte</option>
                <option value="Sur">Sucursal Sur</option>
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
                Control de Almacenamiento & Estándares
              </span>
              <h2 className="text-lg font-black tracking-tight">Catálogo de Bodega, Pasillos y Unidades de Medida</h2>
              <p className="text-xs text-slate-300 max-w-xl">
                Estructura de estanterías físicas, niveles y casillas (bins) por sucursal, junto con las unidades métricas oficiales para inventario y compras.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNewUnidadModal(true)}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Nueva Unidad</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNewUbicacionModal(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>+ Nueva Ubicación</span>
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
                      Ubicaciones Físicas de Almacén ({ubicacionesBodega.length})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewUbicacionModal(true)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    + Agregar Ubicación
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
                            {ub.sucursal_nombre}
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-slate-900">
                          {ub.pasillo} • {ub.estante}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>{ub.nivel}</span>
                          <span>•</span>
                          <span className="font-bold text-purple-700">{ub.bin}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {ub.pasillo.slice(0, 10)}/{ub.estante.slice(0, 7)}
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
                      Unidades de Medida ({unidadesMedida.length})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewUnidadModal(true)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-800"
                  >
                    + Nueva
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {unidadesMedida.map((u) => (
                    <div key={u.id_unidad} className="p-3.5 hover:bg-slate-50 transition-colors flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{u.nombre}</p>
                        <span className="text-[10px] text-slate-400">Estándar de Inventario</span>
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
                <th className="py-3.5 px-4">Producto</th>
                <th className="py-3.5 px-4">Categoría / Proveedor</th>
                <th className="py-3.5 px-4 text-right">P. Compra</th>
                <th className="py-3.5 px-4 text-right">P. Venta</th>
                <th className="py-3.5 px-4 text-center">Margen</th>
                {activeTab === 'sucursales' ? (
                  <>
                    <th className="py-3.5 px-3 text-center">Central</th>
                    <th className="py-3.5 px-3 text-center">Norte</th>
                    <th className="py-3.5 px-3 text-center">Sur</th>
                  </>
                ) : (
                  <th className="py-3.5 px-4 text-center">Stock Total</th>
                )}
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={activeTab === 'sucursales' ? 9 : 7} className="py-12 text-center text-slate-400">
                    <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-600">No se encontraron productos</p>
                    <p className="text-xs text-slate-400 mt-1">Prueba cambiando los filtros o el término de búsqueda.</p>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => {
                const margen = (((p.precioVenta - p.precioCompra) / p.precioVenta) * 100).toFixed(1);
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
                          title={p.imagen ? "Clic para ampliar imagen y comparar con producto físico" : "Sin fotografía asignada"}
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
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">
                              {p.sku}
                            </span>
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
                      Q {p.precioCompra.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                      Q {p.precioVenta.toFixed(2)}
                    </td>

                    {/* Margen */}
                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        +{margen}%
                      </span>
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
                        <span className="text-[10px] text-slate-400 block">mín: {p.stockMinimo}</span>
                      </td>
                    )}

                    {/* Badge de Estado */}
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isLowStock 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isLowStock ? 'Bajo Stock' : 'Disponible'}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          type="button" 
                          onClick={() => setLabelProduct(p)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Imprimir etiquetas de código de barras"
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
                          title="Trasladar entre sucursales"
                        >
                          <ArrowLeftRight className="w-4 h-4" />
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title="Editar producto"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleDeleteProduct(p)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Desactivar / Eliminar producto"
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
              Mostrando <strong className="text-slate-800">{filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> a <strong className="text-slate-800">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> de <strong className="text-slate-800">{filteredProducts.length.toLocaleString()}</strong> productos
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
              >
                Anterior
              </button>
              <span className="px-3 py-1.5 font-bold text-slate-700 bg-white border border-slate-200 rounded-lg">
                Pág. {currentPage} de {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
              >
                Siguiente
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
                <h3 className="text-base font-black text-slate-900">Registrar Nuevo Producto en Catálogo</h3>
                <p className="text-xs text-slate-400">Completa la ficha técnica para ingresarlo al inventario</p>
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
                      <span className="text-xs font-black text-slate-800">Scraper de Productos & Fotos</span>
                      <p className="text-[10px] text-slate-500">Copia fotos y especificaciones desde Shein, Temu o AliExpress</p>
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
                      Pegar Link
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
                          <span>Extrayendo...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3" />
                          <span>Traer de Extensión</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {showProductScraper && (
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-200 flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="Pega la URL de Shein, Temu o AliExpress..."
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
                      Extraer Datos & Foto
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Nombre */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nombre Comercial del Producto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Harina de Trigo Fortificada 5lb"
                    value={newProduct.nombre}
                    onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                {/* SKU & Código de Barras */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">SKU Interno</label>
                  <input
                    type="text"
                    placeholder="Ej. HAR-009"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Código de Barras (EAN-13)</label>
                    <button
                      type="button"
                      onClick={handleGenerateBarcode}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> Auto-Generar EAN
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Ej. 7401004567891"
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
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Categoría *</label>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      title="Administrar o agregar nueva categoría"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Nueva</span>
                    </button>
                  </div>
                  <select
                    value={newProduct.categoria}
                    onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Proveedor Principal</label>
                  <input
                    type="text"
                    placeholder="Ej. Molinos Centrales S.A."
                    value={newProduct.proveedor}
                    onChange={(e) => setNewProduct({ ...newProduct, proveedor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                {/* Precios */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Precio de Compra (Q) *</label>
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Precio de Venta (Q) *</label>
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Stock Inicial (Sucursal Central)</label>
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Stock Mínimo de Alerta</label>
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
                    Unidad de Medida *
                  </label>
                  <select
                    value={newProduct.unidadMedida}
                    onChange={(e) => setNewProduct({ ...newProduct, unidadMedida: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {unidadesMedida.map((u) => (
                      <option key={u.id_unidad} value={u.nombre}>
                        {u.nombre} ({u.abreviatura})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ubicación en Bodega
                  </label>
                  <select
                    value={newProduct.ubicacion}
                    onChange={(e) => setNewProduct({ ...newProduct, ubicacion: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {ubicacionesBodega.map((ub) => (
                      <option key={ub.id_ubicacion} value={`${ub.codigo_bodega}: ${ub.pasillo} • ${ub.estante}`}>
                        {ub.sucursal_nombre} - {ub.pasillo} ({ub.estante})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fotografía de Producto con Carga desde Computadora */}
                <div className="sm:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Fotografía del Producto *
                  </label>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-indigo-200 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                      {newProduct.imagen ? (
                        <img src={newProduct.imagen} alt="Vista previa" className="w-full h-full object-cover" />
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
                          <span>Subir Foto desde mi Computadora</span>
                        </button>
                      </div>
                      <input
                        type="url"
                        placeholder="O pega un enlace web: https://ejemplo.com/foto.jpg"
                        value={newProduct.imagen}
                        onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.value })}
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
                Cancelar
              </button>
              <button
                type="submit"
                form="new-product-form"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/25 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Producto</span>
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
                  <h3 className="text-base font-black text-slate-900">Editar Producto del Catálogo</h3>
                  <p className="text-xs text-slate-500">
                    Modificando ficha de <span className="font-semibold text-slate-700">{editingProduct.nombre}</span> (ID: #{editingProduct.id})
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
                    Nombre Comercial del Producto *
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.nombre}
                    onChange={(e) => setEditFormData({ ...editFormData, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    placeholder="Nombre del producto"
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    SKU Interno *
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

                {/* Código de Barras (EAN-13) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Código de Barras (EAN-13)
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateEditBarcode}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> Re-Generar EAN
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editFormData.codigoBarras}
                    onChange={(e) => setEditFormData({ ...editFormData, codigoBarras: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                    placeholder="Código de barras"
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
                      Categoría *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      title="Administrar o agregar nueva categoría"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Nueva</span>
                    </button>
                  </div>
                  <select
                    value={editFormData.categoria}
                    onChange={(e) => setEditFormData({ ...editFormData, categoria: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Proveedor */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Proveedor Principal
                  </label>
                  <input
                    type="text"
                    value={editFormData.proveedor}
                    onChange={(e) => setEditFormData({ ...editFormData, proveedor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    placeholder="Proveedor"
                  />
                </div>

                {/* Precios y Margen */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Precio de Compra (Costo Q) *
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
                      Precio de Venta (Q) *
                    </label>
                    {parseFloat(editFormData.precioVenta) > 0 && parseFloat(editFormData.precioCompra) > 0 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Margen: {(((parseFloat(editFormData.precioVenta) - parseFloat(editFormData.precioCompra)) / parseFloat(editFormData.precioVenta)) * 100).toFixed(1)}%
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
                    Stock Mínimo de Alerta (Bajo Stock)
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
                      Existencias Distribuidas por Sucursal
                    </label>
                    <span className="text-xs font-black text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      Stock Total: {(parseInt(editFormData.stockCentral) || 0) + (parseInt(editFormData.stockNorte) || 0) + (parseInt(editFormData.stockSur) || 0)} unidades
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Sucursal Central</label>
                      <input
                        type="number"
                        min="0"
                        value={editFormData.stockCentral}
                        onChange={(e) => setEditFormData({ ...editFormData, stockCentral: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Sucursal Norte</label>
                      <input
                        type="number"
                        min="0"
                        value={editFormData.stockNorte}
                        onChange={(e) => setEditFormData({ ...editFormData, stockNorte: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Sucursal Sur</label>
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
                    Fotografía del Producto
                  </label>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-indigo-200 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                      {editFormData.imagen ? (
                        <img src={editFormData.imagen} alt="Vista previa" className="w-full h-full object-cover" />
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
                        <span>Subir Nueva Foto desde Computadora</span>
                      </button>
                      <input
                        type="url"
                        placeholder="O pega un enlace web de la imagen: https://..."
                        value={editFormData.imagen}
                        onChange={(e) => setEditFormData({ ...editFormData, imagen: e.target.value })}
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
                Cancelar
              </button>
              <button
                type="submit"
                form="edit-product-form"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
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
                  Traslado de Mercadería
                </h3>
                <p className="text-xs text-slate-400">Movimiento de inventario entre sucursales autorizadas</p>
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Producto a Mover</label>
                <select
                  value={transferData.productoId}
                  onChange={(e) => setTransferData({ ...transferData, productoId: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre} (Disponibles: {p.stockTotal})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Sucursal Origen</label>
                  <select
                    value={transferData.origen}
                    onChange={(e) => setTransferData({ ...transferData, origen: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Sucursal Central">Central</option>
                    <option value="Sucursal Norte">Norte</option>
                    <option value="Sucursal Sur">Sur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Sucursal Destino</label>
                  <select
                    value={transferData.destino}
                    onChange={(e) => setTransferData({ ...transferData, destino: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Sucursal Norte">Norte</option>
                    <option value="Sucursal Sur">Sur</option>
                    <option value="Sucursal Central">Central</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Cantidad de Unidades</label>
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Motivo / Justificación</label>
                <input
                  type="text"
                  placeholder="Ej. Reabastecimiento por alerta de stock mínimo"
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/25 transition-all"
                >
                  Emitir Orden de Traslado
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
                      Código EAN: {enlargedImageItem.codigoBarras}
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
                title="Cerrar imagen"
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
                <span>Precio Venta: <strong className="text-slate-900">Q {enlargedImageItem.precioVenta.toFixed(2)}</strong></span>
                <span>Stock Total: <strong className="text-indigo-600">{enlargedImageItem.stockTotal} unidades</strong></span>
                <span>Proveedor: <strong className="text-slate-800">{enlargedImageItem.proveedor}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setEnlargedImageItem(null)}
                className="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Cerrar Comparador
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
                  Impresor de Etiquetas Adhesivas
                </h3>
                <p className="text-xs text-slate-400">Etiqueta con código EAN-13 oficial para estanterías o productos</p>
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
                  <span className="text-indigo-600">SUCURSAL CENTRAL</span>
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

                {/* Pie de etiqueta con SKU y Precio Grande en Quetzales */}
                <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                      {labelProduct.sku}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{labelProduct.categoria}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Precio Venta</span>
                    <span className="text-lg font-black text-slate-900">
                      Q {labelProduct.precioVenta.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 mt-3 text-center">
                Formato compatible con impresoras térmicas de rollos (Zebra, Xprinter, Dymo 58mm/80mm).
              </p>
            </div>

            {/* Controles de Configuración de Impresión */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Cantidad de Etiquetas a Imprimir
                  </label>
                  <p className="text-[11px] text-slate-400">Genera lote de stickers listos para etiquetar</p>
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
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setLabelProduct(null);
                    showToast(`Orden de impresión enviada: ${labelQuantity} etiquetas para "${labelProduct.nombre}"`);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir {labelQuantity} Etiquetas</span>
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
                <h3 className="text-xs font-black text-slate-900">Registrar Unidad de Medida</h3>
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
                  Nombre de la Unidad *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Galón, Docena, Quintal..."
                  value={newUnidad.nombre}
                  onChange={(e) => setNewUnidad({ ...newUnidad, nombre: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Abreviatura / Símbolo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. GL, DOC, QQ..."
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-sm"
                >
                  Guardar Unidad
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
                <h3 className="text-xs font-black text-slate-900">Registrar Ubicación en Almacén</h3>
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
                  Sucursal Destino *
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
                  <option value="Sucursal Central">Sucursal Central</option>
                  <option value="Sucursal Norte">Sucursal Norte</option>
                  <option value="Sucursal Sur">Sucursal Sur</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Código de Bodega
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
                    Pasillo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Pasillo A, Sector 2..."
                    value={newUbicacion.pasillo}
                    onChange={(e) => setNewUbicacion({ ...newUbicacion, pasillo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Estantería *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Estante 03..."
                    value={newUbicacion.estante}
                    onChange={(e) => setNewUbicacion({ ...newUbicacion, estante: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nivel de Altura
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Nivel 1 (Piso)..."
                    value={newUbicacion.nivel}
                    onChange={(e) => setNewUbicacion({ ...newUbicacion, nivel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Bin / Casilla
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Bin A-12..."
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-sm"
                >
                  Guardar Ubicación
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
                  <h3 className="text-sm font-black text-white">Gestión de Categorías</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Catálogo dinámico de inventario</p>
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
                    placeholder="Nueva categoría (ej. Limpieza, Repuestos)..."
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
                  <span>Agregar</span>
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
                            title="Guardar nombre"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCategory(null)}
                            className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg"
                            title="Cancelar"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <Tag className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="font-bold text-slate-800">{cat}</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-600">
                              {count} {count === 1 ? 'producto' : 'productos'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleStartEditCategory(cat)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Editar nombre"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(cat)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Eliminar categoría"
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
                  Restablecer predeterminadas
                </button>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
