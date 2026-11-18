export type TimeFormat = '12h' | '24h';

export type UserRole = 
  | 'Administrador' 
  | 'Gerente de Sucursal' 
  | 'Cajero / Ventas' 
  | 'Encargado de Bodega' 
  | 'Recursos Humanos';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  empresa_id: number;
  empresa_nombre: string;
  empresa_regimen?: string;
  sucursal_id: number;
  sucursal_nombre: string;
}

export interface EmpresaSaaS {
  id: number;
  nombre: string;
  razon_social: string;
  nit: string;
  pais: string;
  regimen: string;
  plan: 'basic' | 'standard' | 'enterprise' | 'live_express' | string;
  activa: boolean;
  telefono: string;
  email: string;
  direccion: string;
  modules?: {
    live_sales?: boolean;
    live_only?: boolean;
    pos?: boolean;
    inventory?: boolean;
    accounting?: boolean;
    hr?: boolean;
    sat_fel?: boolean;
    purchases?: boolean;
    clients?: boolean;
    [key: string]: boolean | undefined;
  };
}

export interface UsuarioSistema {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Gerente de Sucursal' | 'Cajero / Operador POS' | 'Auditor Contable' | 'Encargado de Bodega';
  id_empresa: number;
  empresa_nombre: string;
  id_sucursal: number;
  sucursal_nombre: string;
  id_empleado?: number;
  empleado_nombre?: string;
  dpi?: string;
  estado: 'Activo' | 'Inactivo' | 'Bloqueado';
  ultimo_acceso?: string;
  permisos: string[];
}

export type NavigationTab = 
  | 'hub'
  | 'dashboard' 
  | 'pos'
  | 'asistencia'
  | 'inventario' 
  | 'ventas' 
  | 'clientes'
  | 'compras'
  | 'contabilidad'
  | 'rrhh' 
  | 'sucursales' 
  | 'configuracion'
  | 'fortexa_apps'
  | 'live_sales'
  | 'token_scraper';

export interface SoftwareLicenseItem {
  id: number;
  id_empresa: number;
  app_name: string;
  license_code: string;
  email: string;
  hwid?: string | null;
  status: 'active' | 'pending' | 'suspended' | 'Activa' | 'Pendiente' | string;
  license_type: 'perpetual' | 'subscription' | 'Básica' | 'Empresarial' | string;
  expires_at?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface SignedLicenseItem {
  id: number;
  user_id: number;
  signed_by: string;
  ip_address: string;
  created_at: string;
  pdf_path?: string;
}

export interface DashboardKPIs {
  ventasMes: number;
  crecimientoVentas: number;
  ordenesMes: number;
  crecimientoOrdenes: number;
  productosStockBajo: number;
  totalClientes: number;
  efectivoCaja: number;
}

// Modelos de Compras & Proveedores (Laravel: Compra, Proveedor, PagoProveedor)
export interface Proveedor {
  id_proveedor: number;
  nombre: string;
  nit: string;
  telefono: string;
  email: string;
  direccion: string;
  regimen_tributario: 'general' | 'pequeno_contribuyente' | 'opcional_simplificado' | 'informal';
  saldo_pendiente: number;
}

export interface DetalleCompraItem {
  id?: number;
  descripcion: string;
  nombre_producto?: string;
  sku?: string;
  cantidad: number;
  precio_unitario: number;
  precio_compra?: number;
  precio_origen?: number | null;
  costo_con_envio?: number | null;
  subtotal: number;
  foto?: string | null;
  image_url?: string;
  talla?: string;
  color?: string;
  url_manual?: string;
  categoria?: string;
  [key: string]: any;
}

export interface Compra {
  id_compra: number;
  id_proveedor: number;
  nombre_proveedor: string;
  nit_proveedor: string;
  fecha: string;
  tipo_documento: string;
  serie: string;
  numero_documento: string;
  monto_total: number;
  monto_exento: number;
  monto_iva: number; // IVA Crédito Fiscal 12%
  descripcion: string;
  tipo_compra: string;
  total_pagado: number;
  saldo_pendiente: number;
  estado_pago: 'pagado' | 'pendiente' | 'parcial' | 'anulado' | string;
  moneda_compra?: 'GTQ' | 'USD' | string;
  tipo_cambio?: number;
  detalles: DetalleCompraItem[];
  [key: string]: any;
}

export interface PagoProveedor {
  id_pago: number;
  id_compra: number;
  id_proveedor: number;
  fecha: string;
  monto: number;
  metodo_pago: 'Transferencia Bancaria' | 'Cheque' | 'Efectivo';
  referencia: string;
}

// Modelos de Contabilidad & Fiscalidad SAT (Laravel: CuentaContable, Partida, DeclaracionFiscal, Retencion)
export interface CuentaContable {
  id_cuenta: number;
  codigo: string;
  nombre: string;
  tipo: 'activo' | 'pasivo' | 'capital' | 'ingreso' | 'costo' | 'gasto';
  id_padre: number | null;
  nivel: number;
  activa: boolean;
  saldo?: number;
}

export interface PartidaDetalle {
  id_cuenta: number;
  cuenta_codigo: string;
  cuenta_nombre: string;
  debe: number;
  haber: number;
  glosa: string;
}

export interface Partida {
  id_partida: number;
  numero: number;
  fecha: string;
  concepto: string;
  referencia_tipo?: string;
  referencia_id?: number;
  total_debe: number;
  total_haber: number;
  detalles: PartidaDetalle[];
}

export interface DeclaracionFiscalSAT {
  id_declaracion: number;
  mes: number;
  anio: number;
  ventas_totales: number;
  base_imponible_ventas: number;
  iva_debito_fiscal: number; // 12% de ventas
  compras_totales: number;
  base_imponible_compras: number;
  iva_credito_fiscal: number; // 12% de compras
  total_retenciones_iva: number;
  impuesto_a_pagar: number;
  remanente_credito: number;
  estado: 'presentada' | 'pendiente' | 'pagada';
  fecha_pago?: string;
  numero_formulario_sat: string;
}

export interface RetencionSAT {
  id_retencion: number;
  tipo: 'iva_recibida' | 'iva_emitida' | 'isr_opcional' | 'isr_asalariado';
  id_cliente?: number;
  id_proveedor?: number;
  id_empleado?: number;
  entidad_nombre: string;
  numero_documento: string;
  fecha: string;
  mes: number;
  anio: number;
  monto: number;
  descripcion: string;
}

// Modelos de Clientes & Cuentas por Cobrar (Laravel: Cliente, Venta crédito)
export interface Cliente {
  id_cliente: number;
  nombre: string;
  apellido: string;
  nombre_completo: string;
  nit: string;
  telefono: string;
  email: string;
  direccion: string;
  tipo_cliente: 'normal' | 'mayorista' | 'vip';
  descuento_aplicable: number;
  dias_credito: number;
  saldo_actual: number;
  limite_credito: number;
}

// Modelos de RRHH ampliado (Laravel: PagoSalario, Suspension, Horario)
export interface PagoSalarioNomina {
  id_pago: number;
  id_empleado: number;
  empleado_nombre: string;
  puesto: string;
  periodo: string; // ej: "Primera Quincena Noviembre 2026"
  mes: number;
  anio: number;
  salario_base: number;
  bonificacion_incentivo: number; // Q250.00 Decreto 78-89
  comisiones_extras: number;
  total_devengado: number;
  descuento_igss: number; // 4.83%
  retencion_isr: number;
  anticipos_otros: number;
  total_deducciones: number;
  liquido_a_recibir: number;
  estado: 'pagado' | 'procesado' | 'borrador';
  fecha_pago: string;
}

export interface SuspensionEmpleado {
  id_suspension: number;
  id_empleado: number;
  empleado_nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  dias_suspension: number;
  motivo: 'IGSS Enfermedad Común' | 'IGSS Accidente' | 'IGSS Maternidad' | 'Sanción Disciplinaria' | 'Permiso sin goce de sueldo';
  descripcion: string;
  estado: 'activa' | 'finalizada' | 'cancelada';
}

export interface HorarioEmpleado {
  id_horario: number;
  nombre_turno: string;
  hora_entrada: string;
  hora_salida: string;
  dias_laborales: string; // ej: "Lunes a Viernes"
  horas_semanales: number;
  tolerancia_minutos?: number; // Tolerancia de entrada en minutos (ej: 10 min, Laravel: tolerancia_entrada)
  horas_diarias?: string; // ej: "8h 00m"
  empleados_asignados: number;
}

// Modelos de Bodega: Unidades de Medida y Ubicaciones Físicas (Laravel: UnidadMedida, Ubicacion)
export interface UnidadMedida {
  id_unidad: number;
  nombre: string;
  abreviatura: string;
}

export interface UbicacionBodega {
  id_ubicacion: number;
  id_sucursal?: number;
  sucursal_nombre?: string;
  codigo_bodega: string;
  pasillo: string;
  estante: string;
  nivel: string;
  bin: string;
}

// Asistencia en Kiosco (Laravel: Asistencia, MarcarAsistencia)
export interface AsistenciaRegistro {
  id_asistencia: number;
  id_empleado: number;
  empleado_nombre: string;
  dpi: string;
  foto_url?: string;
  fecha: string;
  hora_entrada: string | null;
  hora_salida: string | null;
  estado: 'Puntual' | 'Tardanza' | 'Falta' | 'Permiso';
  sucursal: string;
}

// Rendimiento y Comisiones de Vendedores (Laravel: RendimientoVentas, VentasPorEmpleado)
export interface VendedorRendimiento {
  id_empleado: number;
  nombre: string;
  sucursal: string;
  ventas_count: number;
  total_vendido: number;
  meta_mensual: number;
  porcentaje_cumplido: number;
  comision_acumulada: number;
  ticket_promedio: number;
}

// Certificación FEL SAT Guatemala (Infile DTE)
export interface FELCertificadoDTE {
  uuid: string; // 36 caracteres SAT
  serie: string;
  numero: string;
  fechaCertificacion: string;
  nitEmisor: string;
  nombreEmisor: string;
  nitReceptor: string;
  nombreReceptor: string;
  direccionReceptor?: string;
  total: number;
  iva: number;
  certificador: string;
  fraseFiscal: string;
  qrUrl: string;
}

// Conexión Externa a Bases de Datos Remotas (Laravel: ConexionExterna)
export interface ConexionExterna {
  id: number;
  id_empresa: number;
  nombre: string;
  driver: 'mysql' | 'pgsql' | 'sqlsrv';
  host: string;
  port: number;
  database: string;
  username: string;
  password?: string;
  activo: boolean;
  ultima_sincronizacion?: string | null;
}

// ==========================================
// MÓDULO: TIKTOK LIVE & SOCIAL COMMERCE
// ==========================================
export interface LiveCartItem {
  id: string;
  producto_id: number;
  nombre: string;
  sku: string;
  imagen?: string;
  precio_original: number;
  precio_final: number;
  descuento: number;
  es_remate: boolean;
  talla?: string;
  color?: string;
  cantidad: number;
  apartado_en: string; // ISO String
}

export interface LiveCustomerBag {
  id: string;
  cliente_id?: number;
  cliente_nombre: string;
  usuario_tiktok?: string;
  telefono_whatsapp: string;
  direccion_envio?: string;
  empresa_id: number;
  items: LiveCartItem[];
  subtotal: number;
  costo_envio: number;
  total: number;
  estado: 'abierta' | 'pendiente_pago' | 'despachada' | 'liquidada' | 'cancelada';
  metodo_pago?: 'transferencia' | 'contra_entrega' | 'efectivo' | 'tarjeta';
  boleta_comprobante?: string;
  empresa_envio?: 'Guatex' | 'Forza Delivery' | 'Cargo Expreso' | 'Mensajero Local' | 'Recoge en Tienda';
  notas?: string;
  creado_en: string;
  actualizado_en: string;
}

export interface LiveSession {
  id: string;
  titulo: string;
  empresa_id: number;
  iniciado_en: string;
  finalizado_en?: string;
  activa: boolean;
  total_canastas: number;
  total_recaudado: number;
  prendas_apartadas: number;
}
