import { REAL_PRODUCTS, REAL_CATEGORIES, RealProductItem } from './realProducts';

export interface TenantProductCatalog {
  products: RealProductItem[];
  categories: string[];
}

export const FORTEXA_PRODUCTS: RealProductItem[] = [
  {
    id: 9001,
    sku: 'FT-QPOS-LIC',
    codigoBarras: '740100090011',
    nombre: 'Quantum Store POS - Licencia Vitalicia (Hotmart)',
    categoria: 'Software & Licencias',
    proveedor: 'Fortexa Technologies Software Division',
    precioCompra: 120.00,
    precioVenta: 499.00,
    stockTotal: 999,
    stockMinimo: 10,
    stockPorSucursal: { central: 500, norte: 250, sur: 249 },
    imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9002,
    sku: 'FT-QPOS-SUB',
    codigoBarras: '740100090028',
    nombre: 'Quantum Store POS - Suscripción Anual con Nube',
    categoria: 'Software & Licencias',
    proveedor: 'Fortexa Technologies Software Division',
    precioCompra: 90.00,
    precioVenta: 350.00,
    stockTotal: 999,
    stockMinimo: 10,
    stockPorSucursal: { central: 500, norte: 250, sur: 249 },
    imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9003,
    sku: 'FT-RF-INDIV',
    codigoBarras: '740100090035',
    nombre: 'RutaFuel Pro - Suscripción Mensual Individual (1-3 Vehículos)',
    categoria: 'SaaS & Suscripciones',
    proveedor: 'Fortexa Technologies Cloud Division',
    precioCompra: 15.00,
    precioVenta: 59.00,
    stockTotal: 999,
    stockMinimo: 10,
    stockPorSucursal: { central: 500, norte: 250, sur: 249 },
    imagen: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9004,
    sku: 'FT-RF-B2B',
    codigoBarras: '740100090042',
    nombre: 'RutaFuel Pro - Plan Flotas B2B Mensual (Base 10 Unidades)',
    categoria: 'SaaS & Suscripciones',
    proveedor: 'Fortexa Technologies Cloud Division',
    precioCompra: 120.00,
    precioVenta: 650.00,
    stockTotal: 999,
    stockMinimo: 5,
    stockPorSucursal: { central: 500, norte: 250, sur: 249 },
    imagen: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9005,
    sku: 'FT-RF-ENTERP',
    codigoBarras: '740100090059',
    nombre: 'RutaFuel Pro - Plan Enterprise Flotas (+20 Vehículos)',
    categoria: 'SaaS & Suscripciones',
    proveedor: 'Fortexa Technologies Cloud Division',
    precioCompra: 250.00,
    precioVenta: 1200.00,
    stockTotal: 999,
    stockMinimo: 5,
    stockPorSucursal: { central: 500, norte: 250, sur: 249 },
    imagen: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9006,
    sku: 'FT-HW-TERM80',
    codigoBarras: '740100090066',
    nombre: 'Terminal POS Todo-en-Uno Touchscreen 15" con Impresora 80mm',
    categoria: 'Hardware POS & Terminales',
    proveedor: 'Fortexa Hardware Import S.A.',
    precioCompra: 1650.00,
    precioVenta: 2450.00,
    stockTotal: 18,
    stockMinimo: 3,
    stockPorSucursal: { central: 10, norte: 5, sur: 3 },
    imagen: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9007,
    sku: 'FT-HW-PRINTER',
    codigoBarras: '740100090073',
    nombre: 'Impresora Térmica de Recibos 80mm USB / Ethernet / Bluetooth',
    categoria: 'Hardware POS & Terminales',
    proveedor: 'Fortexa Hardware Import S.A.',
    precioCompra: 310.00,
    precioVenta: 480.00,
    stockTotal: 35,
    stockMinimo: 5,
    stockPorSucursal: { central: 20, norte: 10, sur: 5 },
    imagen: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9008,
    sku: 'FT-HW-SCANNER',
    codigoBarras: '740100090080',
    nombre: 'Lector Láser de Código de Barras 1D / 2D QR con Base Manos Libres',
    categoria: 'Hardware POS & Terminales',
    proveedor: 'Fortexa Hardware Import S.A.',
    precioCompra: 195.00,
    precioVenta: 320.00,
    stockTotal: 42,
    stockMinimo: 8,
    stockPorSucursal: { central: 25, norte: 10, sur: 7 },
    imagen: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9009,
    sku: 'FT-GPS-OBD2',
    codigoBarras: '740100090097',
    nombre: 'Dispositivo GPS Rastreo OBD-II 4G LTE Plug & Play RutaFuel',
    categoria: 'Dispositivos GPS & Flotas',
    proveedor: 'Fortexa Telematics Corp.',
    precioCompra: 220.00,
    precioVenta: 380.00,
    stockTotal: 60,
    stockMinimo: 10,
    stockPorSucursal: { central: 35, norte: 15, sur: 10 },
    imagen: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9010,
    sku: 'FT-MOB-POS',
    codigoBarras: '740100090103',
    nombre: 'Licencia IntegraPro Mobile POS (Dispositivo Móvil Android/iOS)',
    categoria: 'Software & Licencias',
    proveedor: 'Fortexa Technologies Software Division',
    precioCompra: 60.00,
    precioVenta: 250.00,
    stockTotal: 999,
    stockMinimo: 10,
    stockPorSucursal: { central: 500, norte: 250, sur: 249 },
    imagen: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&auto=format&fit=crop&q=80'
  }
];

export const FORTEXA_CATEGORIES = [
  'Todas',
  'Software & Licencias',
  'SaaS & Suscripciones',
  'Hardware POS & Terminales',
  'Dispositivos GPS & Flotas'
];

export const ACEITERA_PINULA_PRODUCTS: RealProductItem[] = [
  {
    id: 3052,
    sku: 'ACE-SH-20W50',
    codigoBarras: '740100030520',
    nombre: 'Aceite Shell Helix 20W-50 (Galón)',
    categoria: 'Aceites y Lubricantes',
    proveedor: 'Distribuidora Shell Guatemala',
    precioCompra: 175.00,
    precioVenta: 225.00,
    stockTotal: 48,
    stockMinimo: 10,
    stockPorSucursal: { central: 30, norte: 10, sur: 8 },
    imagen: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 3053,
    sku: 'BAT-LTH-24R',
    codigoBarras: '740100030537',
    nombre: 'Batería LTH Grupo 24R (600 CCA)',
    categoria: 'Baterías',
    proveedor: 'LTH Acumuladores de Guatemala',
    precioCompra: 520.00,
    precioVenta: 675.00,
    stockTotal: 15,
    stockMinimo: 3,
    stockPorSucursal: { central: 8, norte: 4, sur: 3 },
    imagen: 'https://images.unsplash.com/photo-1558441719-8d48980f89a6?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 3054,
    sku: 'ACE-CAS-10W30',
    codigoBarras: '740100030544',
    nombre: 'Aceite Castrol GTX 10W-30 (Cuarto)',
    categoria: 'Aceites y Lubricantes',
    proveedor: 'Castrol Guatemala',
    precioCompra: 38.00,
    precioVenta: 55.00,
    stockTotal: 60,
    stockMinimo: 12,
    stockPorSucursal: { central: 40, norte: 10, sur: 10 },
    imagen: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 3055,
    sku: 'FILT-FRAM-PH',
    codigoBarras: '740100030551',
    nombre: 'Filtro de Aceite Fram Blindado PH3593A',
    categoria: 'Filtros',
    proveedor: 'Repuestos Automotrices del Sur',
    precioCompra: 28.00,
    precioVenta: 45.00,
    stockTotal: 30,
    stockMinimo: 6,
    stockPorSucursal: { central: 18, norte: 6, sur: 6 },
    imagen: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80'
  }
];

export const ACEITERA_PINULA_CATEGORIES = [
  'Todas',
  'Aceites y Lubricantes',
  'Baterías',
  'Filtros',
  'Fluidos'
];

export const TRANSPORTES_HERRERA_PRODUCTS: RealProductItem[] = [
  {
    id: 4001,
    sku: 'LLAN-MICH-295',
    codigoBarras: '740100040010',
    nombre: 'Llanta 295/80R22.5 Michelin X MultiWay Tracción',
    categoria: 'Llantas Pesadas',
    proveedor: 'Michelin Distribuidora Centroamérica',
    precioCompra: 2350.00,
    precioVenta: 2850.00,
    stockTotal: 24,
    stockMinimo: 4,
    stockPorSucursal: { central: 16, norte: 4, sur: 4 },
    imagen: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 4002,
    sku: 'FILT-RACOR-1000',
    codigoBarras: '740100040027',
    nombre: 'Filtro de Combustible Separador de Agua Racor 1000FH',
    categoria: 'Filtros Diésel',
    proveedor: 'Parker Hannifin Guatemala',
    precioCompra: 135.00,
    precioVenta: 185.00,
    stockTotal: 30,
    stockMinimo: 6,
    stockPorSucursal: { central: 20, norte: 5, sur: 5 },
    imagen: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 4003,
    sku: 'ACE-MOB-15W40',
    codigoBarras: '740100040034',
    nombre: 'Aceite Mobil Delvac 15W-40 (Cubeta 5 Galones Diésel)',
    categoria: 'Lubricantes Flota',
    proveedor: 'ExxonMobil Distribución GT',
    precioCompra: 490.00,
    precioVenta: 620.00,
    stockTotal: 18,
    stockMinimo: 3,
    stockPorSucursal: { central: 12, norte: 3, sur: 3 },
    imagen: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80'
  }
];

export const TRANSPORTES_HERRERA_CATEGORIES = [
  'Todas',
  'Llantas Pesadas',
  'Filtros Diésel',
  'Lubricantes Flota',
  'Frenos & Suspensión'
];

export function getTenantCatalog(empresaId?: number | string): TenantProductCatalog {
  const id = Number(empresaId);

  // Fortexa Technologies (Tenant 22)
  if (id === 22) {
    return {
      products: FORTEXA_PRODUCTS,
      categories: FORTEXA_CATEGORIES
    };
  }

  // Aceitera Pinula (Tenant 18)
  if (id === 18) {
    return {
      products: ACEITERA_PINULA_PRODUCTS,
      categories: ACEITERA_PINULA_CATEGORIES
    };
  }

  // Transportes Herrera (Tenant 36)
  if (id === 36) {
    return {
      products: TRANSPORTES_HERRERA_PRODUCTS,
      categories: TRANSPORTES_HERRERA_CATEGORIES
    };
  }

  // IntegraPro Admin (Tenant 2)
  if (id === 2) {
    return {
      products: [
        {
          id: 5001,
          sku: 'INT-ERP-STD',
          codigoBarras: '740100050019',
          nombre: 'IntegraPro Cloud ERP - Plan Standard Multi-Sucursal',
          categoria: 'SaaS Cloud',
          proveedor: 'IntegraPro Cloud Services',
          precioCompra: 200.00,
          precioVenta: 750.00,
          stockTotal: 999,
          stockMinimo: 10,
          stockPorSucursal: { central: 500, norte: 250, sur: 249 },
          imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80'
        }
      ],
      categories: ['Todas', 'SaaS Cloud', 'Soporte & Consultoría', 'Módulos Adicionales']
    };
  }

  // Por defecto (Empresa 1 - Fashion Styles y otras tiendas de retail / boutique)
  return {
    products: REAL_PRODUCTS,
    categories: ['Todas', ...REAL_CATEGORIES]
  };
}
