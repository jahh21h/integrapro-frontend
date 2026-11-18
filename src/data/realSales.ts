import { FELCertificadoDTE } from '../types';

export interface VentaItem {
  id: string;
  cliente: string;
  nit: string;
  sucursal: string;
  fecha: string;
  itemsCount: number;
  subtotal: number;
  iva: number;
  total: number;
  metodoPago: 'Efectivo' | 'Tarjeta POS' | 'Transferencia' | 'Crédito';
  estado: 'Completada' | 'Anulada' | 'Crédito';
  vendedor: string;
  dte?: FELCertificadoDTE | null;
  productos: {
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
}

export interface CotizacionItem {
  id: string;
  cliente: string;
  empresa: string;
  fecha: string;
  vigencia: string;
  total: number;
  estado: 'Pendiente' | 'Aprobada' | 'Vencida';
  productos: {
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
}

/**
 * Catálogo Real de Ventas y Cotizaciones importadas del Droplet
 * Total: 993 ventas y 274 cotizaciones reales
 */
export const REAL_SALES: VentaItem[] = [
  {
    "id": "FAC-3213",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 11:38 PM",
    "itemsCount": 3,
    "subtotal": 312.5,
    "iva": 37.5,
    "total": 350.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "traje de niña talla 11",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "traje de niña crezas",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "playera negra estampada",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-3212",
    "cliente": "Yeimi Rodríguez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 10:22 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sérum para cabello",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3211",
    "cliente": "Madelyn zona 14",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 10:22 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sérum para cabello",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3210",
    "cliente": "Wendy campo",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 10:12 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sérum para cabello",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3209",
    "cliente": "Joselyn Barillas",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 09:19 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brazalete labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3208",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 09:04 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3207",
    "cliente": "kimberly vecina",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 03:30 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3206",
    "cliente": "Jaqueline Chacón",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 02:19 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3205",
    "cliente": "Ivón C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 02:11 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3204",
    "cliente": "Jenifer campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/11/2026 03:51 AM",
    "itemsCount": 1,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pulceras con reloj",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-3203",
    "cliente": "Ana Guzmán",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 03:26 PM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3202",
    "cliente": "Ana Guzmán",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 03:24 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3201",
    "cliente": "Ana Guzmán",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 03:23 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3200",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 03:19 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3199",
    "cliente": "Patty Chivichon",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 03:16 PM",
    "itemsCount": 3,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3198",
    "cliente": "Jazmin referida de Astrid",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 03:13 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pulceras con reloj",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-3197",
    "cliente": "Sonia Muxbal",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 03:12 PM",
    "itemsCount": 2,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3196",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 12:59 PM",
    "itemsCount": 2,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3195",
    "cliente": "Wendy Alvarez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 12:04 PM",
    "itemsCount": 2,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "pulceras con reloj",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-3194",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 12:02 PM",
    "itemsCount": 3,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "sérum para cabello",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3193",
    "cliente": "Jazmin referida de Astrid",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 11:55 AM",
    "itemsCount": 7,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "pulceras con reloj",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-3192",
    "cliente": "Rosario Concua",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 11:34 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3191",
    "cliente": "Estefani Tejax",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 11:32 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3190",
    "cliente": "hermana de Aby",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 11:27 AM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3189",
    "cliente": "Nancy Sanchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 11:25 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3188",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 12:18 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyeria",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3187",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 12:12 AM",
    "itemsCount": 2,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3186",
    "cliente": "Analí C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/11/2026 12:10 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3185",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/11/2026 11:42 PM",
    "itemsCount": 5,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyeria",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3184",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/11/2026 11:19 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3183",
    "cliente": "Weysi",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/11/2026 11:17 PM",
    "itemsCount": 2,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3182",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/11/2026 11:05 PM",
    "itemsCount": 4,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyeria",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyeria",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyeria",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3181",
    "cliente": "Mónica Cali",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/11/2026 11:01 PM",
    "itemsCount": 3,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyeria",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3180",
    "cliente": "Iraida Contreras",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/11/2026 10:54 PM",
    "itemsCount": 5,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brazalete labial",
        "cantidad": 5,
        "precioUnitario": 25.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-3179",
    "cliente": "Marlen Ramírez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/11/2026 10:52 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brazalete labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3178",
    "cliente": "Karina tia de Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/11/2026 10:50 PM",
    "itemsCount": 9,
    "subtotal": 147.32,
    "iva": 17.68,
    "total": 165.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyeria",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-3177",
    "cliente": "Karina López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 09:51 PM",
    "itemsCount": 2,
    "subtotal": 120.54,
    "iva": 14.46,
    "total": 135.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Mono casual negro con espalda abierta, mono minimalista de moda para uso diario",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3175",
    "cliente": "Nohemí López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 09:36 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa suéter",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3174",
    "cliente": "Gladys Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 09:34 PM",
    "itemsCount": 1,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa navideña",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-3173",
    "cliente": "Lupita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 07:13 PM",
    "itemsCount": 1,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolso",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-3172",
    "cliente": "Suzely C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 06:51 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Botas de nieve para pareja con forro polar de gamuza y parches, suela gruesa y forrada para uso inte",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-3171",
    "cliente": "Dayana ref Yoshi",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 06:39 PM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "licra negra líneas blancas",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-3170",
    "cliente": "Karen zona 21",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 06:28 PM",
    "itemsCount": 2,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "2 piezas/Set Camiseta de cuello redondo con diseño de bloques de color y patchwork para niños, cómod",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Conjunto de 2 piezas estilo gamer para niños, camiseta de cuello redondo de manga corta con estampad",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-3169",
    "cliente": "Julissa Hotel",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 06:25 PM",
    "itemsCount": 3,
    "subtotal": 209.82,
    "iva": 25.18,
    "total": 235.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Unity Camiseta con volantes y lazos de manga corta elegante y casual para mujer, primavera/ver",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Raffinéa Camiseta de manga corta asimétrica de verano para mujer, con parche de encaje, elegan",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "base mágica",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3168",
    "cliente": "Graciela García",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 06:14 PM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Camera On Spray Fijador Difuminador Resistente al Agua Marca Belleza Maquillaje Maquullaje C",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-3167",
    "cliente": "Jackelin Álvarez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 06:11 PM",
    "itemsCount": 3,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 12 piezas de brillo labial, tinte de labios mate hidratante que no se desvanece fácilmente, l",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "crema corporal",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3166",
    "cliente": "Ana Carin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 06:09 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Ximi Ruo Zapatillas planas casuales estilo coreano, color marrón, esencial para vacaciones, zapatos",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3165",
    "cliente": "Paola Rivera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:53 PM",
    "itemsCount": 5,
    "subtotal": 147.32,
    "iva": 17.68,
    "total": 165.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Aofeiqike 6 piezas de bragas de seda de hielo para mujer, ropa interior sexy de cintura media triang",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Aofeiqike 6 piezas de bragas de seda de hielo para mujer, ropa interior sexy de cintura media triang",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "hair wax stick",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "polvo de dientes",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "brillo de labios",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3164",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:52 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Aofeiqike 6 piezas de bragas de seda de hielo para mujer, ropa interior sexy de cintura media triang",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3163",
    "cliente": "katherin Alfaro",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:48 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3162",
    "cliente": "Ivón C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:47 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3161",
    "cliente": "Melany Rosales",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:44 PM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-3160",
    "cliente": "Yanet Viñas",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:42 PM",
    "itemsCount": 3,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 3,
        "precioUnitario": 20.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-3159",
    "cliente": "Carmen de García",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:40 PM",
    "itemsCount": 5,
    "subtotal": 218.75,
    "iva": 26.25,
    "total": 245.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Conjunto suelto de niña con estampado floral blanco de punto, flores negras & estampado de rayas neg",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Conjunto de 2 piezas de ropa casual para niñas: Blusa de manga corta con estampado de corazón y pant",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "nombre": "Conjunto de 2 piezas de ropa casual para niñas: Blusa de manga corta con estampado de corazón y pant",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3158",
    "cliente": "Glendy esposa Erick",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:33 PM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3157",
    "cliente": "Sonia Muxbal",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:23 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3156",
    "cliente": "Analí C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:19 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3155",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:19 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3154",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:15 PM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3153",
    "cliente": "Aury Salón San José",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:14 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-3152",
    "cliente": "Jaqueline Chacón",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 05:12 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3151",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 04:47 PM",
    "itemsCount": 2,
    "subtotal": 156.25,
    "iva": 18.75,
    "total": 175.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Rizador de pestañas simulado 450/570/600, set de pestañas individuales de racimo natural estilo anim",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-3150",
    "cliente": "Estefani Tejax",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 04:46 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3149",
    "cliente": "hermana de Aby",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 04:44 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3148",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 04:42 PM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3147",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 04:40 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3146",
    "cliente": "Gloría ref Faby",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 04:28 PM",
    "itemsCount": 2,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3145",
    "cliente": "Cindy hija Doña Paty",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 04:20 PM",
    "itemsCount": 3,
    "subtotal": 125.0,
    "iva": 15.0,
    "total": 140.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-3144",
    "cliente": "María Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 04:15 PM",
    "itemsCount": 4,
    "subtotal": 102.68,
    "iva": 12.32,
    "total": 115.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "Joyeria",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "suéter rosado",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-3143",
    "cliente": "Julissa Salazar",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 04:06 PM",
    "itemsCount": 3,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3142",
    "cliente": "Sandra Duarte",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 01:25 PM",
    "itemsCount": 3,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "suéter verde",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-3141",
    "cliente": "Kenia esposa Adin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 01:22 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3140",
    "cliente": "Lesvia Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 01:13 PM",
    "itemsCount": 3,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3139",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 01:04 PM",
    "itemsCount": 3,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3138",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 12:44 PM",
    "itemsCount": 3,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3137",
    "cliente": "Jeni Waleska Urbina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/10/2026 12:42 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3136",
    "cliente": "Nancy Sanchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 08:46 PM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 3 piezas: Camisa de manga larga de unicolor + Chaleco de peto de mezclilla a la moda + Pantal",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-3135",
    "cliente": "Liseth Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 08:42 PM",
    "itemsCount": 3,
    "subtotal": 312.5,
    "iva": 37.5,
    "total": 350.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 2 piezas para niños, otoño/invierno, marrón, minimalista, textura suave, a cuadros con r",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEIN Sudadera de manga larga con cuello y gráfico de letras en tela texturizada para niño bebé, cas",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Cristiano Ronaldo",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-3134",
    "cliente": "Fabiola Tahuite (funeraria)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 08:20 PM",
    "itemsCount": 2,
    "subtotal": 116.07,
    "iva": 13.93,
    "total": 130.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Chanclas con Rhinestones Talla Grande - Sandalias planas de mujer versátiles para vacaciones",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3133",
    "cliente": "Damaris Menendez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 08:12 PM",
    "itemsCount": 2,
    "subtotal": 392.86,
    "iva": 47.14,
    "total": 440.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Conjunto de 2 piezas de ropa de otoño para niñas preadolescentes: Chaqueta con cremallera de r",
        "cantidad": 1,
        "precioUnitario": 255.0,
        "subtotal": 255.0
      },
      {
        "nombre": "SHEIN Conjunto de dos piezas estilo preppy y lindo para niñas, hecho de tela de punto waffle, con to",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-3132",
    "cliente": "Odalis aceitera Pinula",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 08:07 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "GlowEve Vestido de ajuste holgado con patrón de rayas vintage, conjunto de falda de varias piezas mo",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-3131",
    "cliente": "kimberly vecina",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 08:01 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "GlowEve Vestido nuevo y elegante de mujer con estampado y cuello en V, vestido para uso diario, vest",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3130",
    "cliente": "Cintia Rodriguez, hermana de Jeni Waleska",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 07:37 PM",
    "itemsCount": 4,
    "subtotal": 620.54,
    "iva": 74.46,
    "total": 695.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Conjunto casual de 2 piezas para bebé niña con camiseta de manga corta acanalada roja y pantal",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Conjunto de 2 piezas para niño preadolescente, sudadera con capucha y cremallera, pantalones con cor",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Sweetra Conjunto de 3 piezas para mujer, top casual de primavera/verano para vacaciones, con diseño",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Set de 3 piezas: Camisa de manga larga de unicolor + Chaleco de peto de mezclilla a la moda + Pantal",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-3129",
    "cliente": "Dulce Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 07:31 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Camisa de diseño de moda vintage para mujer OrangeAC (sin cinturón) para todas las estaciones, citas",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-3128",
    "cliente": "Marlen Ramírez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 07:27 PM",
    "itemsCount": 2,
    "subtotal": 209.82,
    "iva": 25.18,
    "total": 235.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Rosurelle Vestido de unicolor marrón con cintura ceñida/Falda estilo camisa vintage de ajuste",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "falda café",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-3127",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 07:24 PM",
    "itemsCount": 1,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Chaqueta corta de motocicleta de cuero sintético marrón de otoño para Halloween, 1 pieza, elegante c",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-3126",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 07:21 PM",
    "itemsCount": 6,
    "subtotal": 343.75,
    "iva": 41.25,
    "total": 385.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Manfinity Homme Chaqueta de béisbol casual con cremallera y cuello bordado con letras para hombres",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "Bolso de mano tipo hobo con estampado geométrico, glamoroso, elegante y exquisito, con cremallera y",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "joyeria",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3125",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 07:17 PM",
    "itemsCount": 1,
    "subtotal": 227.68,
    "iva": 27.32,
    "total": 255.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 2 piezas de sudadera de cuello redondo y pantalones de manga larga cómodos y minimalista",
        "cantidad": 1,
        "precioUnitario": 255.0,
        "subtotal": 255.0
      }
    ]
  },
  {
    "id": "FAC-3124",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 07:07 PM",
    "itemsCount": 4,
    "subtotal": 714.29,
    "iva": 85.71,
    "total": 800.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Conjunto de 2 piezas para niña preadolescente con camiseta corta ajustada de estilo dulce, coo",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "SHEIN Conjunto de 2 piezas para niñas (grandes) con lazo, top de manga larga con cuello semi alto y",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      },
      {
        "nombre": "Conjunto de 2 piezas/set de camiseta de manga corta y pantalones cargo de moda casual para primavera",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      },
      {
        "nombre": "Genkimix Kids Conjunto de 2 piezas para niña pequeña con chaleco de punto en capas, top, pantalones",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      }
    ]
  },
  {
    "id": "FAC-3123",
    "cliente": "señora Sara",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 07:04 PM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "KOVSEE Conjunto deportivo de 2 piezas para hombre con camisa de manga corta y pantalones cortos con",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-3122",
    "cliente": "Úrsula C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 07:01 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sweetra Vestido negro para mujer de estilo romántico, sencillo, fantástico, casual y elegante, con c",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-3121",
    "cliente": "Astrid Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 06:59 PM",
    "itemsCount": 2,
    "subtotal": 169.64,
    "iva": 20.36,
    "total": 190.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Camisa de manga corta con cuello cuadrado pequeño de tela a rayas + pantalones largos blancos",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3120",
    "cliente": "Gaby El campo por el proyecto",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 06:56 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "4 piezas Sujetador inalámbrico lindo, adecuado para mujeres de busto pequeño, sujetador cómodo de ca",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-3119",
    "cliente": "Andrea Valencia",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 06:50 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Body de ballet clásico triangular de verano, estructura sin costuras, moldeador, cintura ceñ",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-3118",
    "cliente": "Cindy Alcantara",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 06:48 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Privé Top corto sexy con brillos y flecos para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3117",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 06:38 PM",
    "itemsCount": 4,
    "subtotal": 508.93,
    "iva": 61.07,
    "total": 570.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "EasyFave Set de 3 sujetadores inalámbricos para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla [Diseño Impreso] Camiseta de manga corta casual con bloques de color a rayas para mujer para",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "KOVSEE Conjunto deportivo casual para hombre, top de tela, atuendo de verano negro",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Conjunto de camiseta y pantalones cortos deportivos casuales para hombre, estilo minimalista de moda",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-3116",
    "cliente": "Merlín Barillas",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 06:29 PM",
    "itemsCount": 6,
    "subtotal": 312.5,
    "iva": 37.5,
    "total": 350.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Accesorio de hombreras de metal personalizado con borlas de cristal brillante dorado/plateado, braza",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "body",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-3115",
    "cliente": "Rosario Concua",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 06:26 PM",
    "itemsCount": 6,
    "subtotal": 633.93,
    "iva": 76.07,
    "total": 710.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "4 piezas/Set Nuevas Diademas Anchas de unicolor para Mujeres con Nudo Cruzado, Diadema Deportiva de",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "4 piezas/Set Diadema ancha de unicolor para mujeres,Diadema deportiva de yoga con nudo cruzado,Pañue",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Balaclava a prueba de viento y transpirable, máscara multifuncional integrada 360° transpirable, cap",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "1 pieza Pañuelo de unicolor para cubrir la cara para mujer, pañuelo interior para cubrir la barbilla",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Conjunto de lencería de 8 piezas para mujer, bralette sin costuras de color liso simple, sin aros, c",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Sweetra Conjunto de 3 piezas para mujer, top casual de primavera/verano para vacaciones, con diseño",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-3114",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 06:22 PM",
    "itemsCount": 3,
    "subtotal": 366.07,
    "iva": 43.93,
    "total": 410.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Conjunto de blusa sin mangas con nudo delantero y falda con volantes y dobladillo en capas,",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEIN Frenchy Abrigo casual con cremallera y sin mangas, acolchado, para mujer",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "joyeria",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3113",
    "cliente": "Andrea Agustin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/10/2026 06:20 PM",
    "itemsCount": 5,
    "subtotal": 633.93,
    "iva": 76.07,
    "total": 710.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bhchntiy Sudadera de unicolor con cuello polo y parche de oso en tela jacquard y pantalones largos d",
        "cantidad": 1,
        "precioUnitario": 135.0,
        "subtotal": 135.0
      },
      {
        "nombre": "Conjunto de 2 piezas de sudadera deportiva de cuello redondo y manga larga & pantalones de chándal c",
        "cantidad": 1,
        "precioUnitario": 135.0,
        "subtotal": 135.0
      },
      {
        "nombre": "Playful Pals 1 Conjunto de Camiseta de manga corta de cuello redondo con parche de cuadros y pantalo",
        "cantidad": 1,
        "precioUnitario": 135.0,
        "subtotal": 135.0
      },
      {
        "nombre": "Conjunto de 2 piezas de sudadera y pantalón de chándal casual y cómodo para niños, top de manga larg",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEIN Conjunto de 2 piezas para niño preadolescente con camiseta de cuello redondo de manga corta co",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-3112",
    "cliente": "Celeste Central Depot",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/10/2026 11:09 PM",
    "itemsCount": 2,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter chica súper poderosas",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "chaleco mostaza",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-3111",
    "cliente": "Damaris Menendez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/10/2026 02:02 AM",
    "itemsCount": 1,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter blanco",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-3110",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/10/2026 01:40 AM",
    "itemsCount": 2,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter naranja con negro",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "suéter celeste con gorro",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-3109",
    "cliente": "Glendy esposa Erick",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/10/2026 12:57 AM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vestido largo",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "blusa Corinta",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3108",
    "cliente": "Melany Rosales",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/10/2026 12:52 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa negra manga larga",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3107",
    "cliente": "Fabiola Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 07:00 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter blanco",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3106",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 06:19 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "labial color chocolate",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3105",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 05:21 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aretes dorados con negro triple argolla",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3104",
    "cliente": "Jeni Waleska Urbina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 05:14 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aretes de florecita con tono dorado",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3103",
    "cliente": "Les Hermana de Karen",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 04:54 PM",
    "itemsCount": 7,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aretes florecita Rosa",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "aretes dorados",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "Aretes florecita rosada",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "aretes florecita verde",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "aretes florecita dorada",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "aretes pétalos color fucsia",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "aretes de fresita",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3102",
    "cliente": "Merlín Barillas",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 04:49 PM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aretes de botita",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3101",
    "cliente": "Andrea Agustin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 04:47 PM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aretes de bolita blanca",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "aretes corazón blanco de bolitas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3100",
    "cliente": "Paola La Salvadora",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 04:44 PM",
    "itemsCount": 8,
    "subtotal": 191.96,
    "iva": 23.04,
    "total": 215.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aretes negros contorno dorado",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "aretes planos dorado con negro",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "aretes negros mitad flor",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "aretes florecita blanca",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "blusa fresita",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "blusa negra con diseño",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "blusa rosada de Winnie Pooh",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "blusa verde menta kuromi",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3099",
    "cliente": "Lesbia Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 04:37 PM",
    "itemsCount": 2,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aretes dorados",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "aretes florecita blanca",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3098",
    "cliente": "Ash Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 03:55 PM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "rubor",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-3097",
    "cliente": "Kimberly Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 12:26 PM",
    "itemsCount": 6,
    "subtotal": 174.11,
    "iva": 20.89,
    "total": 195.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body lotion",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "termo 800 ML",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 65.0
      },
      {
        "nombre": "suéter negro Cruz",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "playera gris de palmeras",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "pantalón verde",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "vestido negro de letras",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3096",
    "cliente": "Nicole Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 12:23 PM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body lotion",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "polvo de hada",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3095",
    "cliente": "Julissa Hotel",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 12:13 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "base mágica",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3094",
    "cliente": "Gaby hija de Aury",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 12:08 PM",
    "itemsCount": 5,
    "subtotal": 232.14,
    "iva": 27.86,
    "total": 260.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "base mágica",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "kit skin care",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 85.0
      },
      {
        "nombre": "suéter de Rugrats",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "pantaloneta de lona",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "vestido negro de letras",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3093",
    "cliente": "tía Mencha",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 11:59 AM",
    "itemsCount": 2,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "colágeno en crema",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "suéter negro con letras rojas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3092",
    "cliente": "Madelyn zona 14",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 11:58 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "colágeno en crema",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-3091",
    "cliente": "Monica Barillas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 11:54 AM",
    "itemsCount": 4,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "colágeno en crema",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "rubor",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "blusa negra gatita",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Set de 3 gafas de moda de verano, montura de metal ovalada retro decorativa, accesorio unisex para f",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3090",
    "cliente": "Angélica Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 11:45 AM",
    "itemsCount": 2,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "loción fascination las Vegas",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "suéter blanco",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3089",
    "cliente": "Dyna C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 11:23 AM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3088",
    "cliente": "Ivett C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/10/2026 12:45 AM",
    "itemsCount": 2,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "base mágica",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3087",
    "cliente": "Imelda Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/10/2026 02:30 AM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chaleco celeste",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-3086",
    "cliente": "Monica Amiga de Wendy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/10/2026 02:25 AM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": {
      "uuid": "e3658fdf-88a1-42fe-bd0f-185365d981f9",
      "serie": "MOCK-28US",
      "numero": "5785336",
      "fechaCertificacion": "2026-10-14 02:34:41",
      "nitEmisor": "10429182-3",
      "nombreEmisor": "INTEGRAPRO COMERCIAL S.A.",
      "nitReceptor": "CF",
      "nombreReceptor": "Monica Amiga de Wendy",
      "total": 30.0,
      "iva": 3.21,
      "certificador": "INFILE, S.A.",
      "fraseFiscal": "Sujeto a pagos trimestrales ISR",
      "qrUrl": "https://fel.sat.gob.gt/verificador/?uuid=e3658fdf-88a1-42fe-bd0f-185365d981f9"
    },
    "productos": [
      {
        "nombre": "playera celeste UXKR",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3085",
    "cliente": "Delmy hermana de Ivón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/10/2026 01:45 AM",
    "itemsCount": 2,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sudadero negro",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "suéter amarillo con figura de pera",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3084",
    "cliente": "Andrea Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 11:59 PM",
    "itemsCount": 4,
    "subtotal": 129.46,
    "iva": 15.54,
    "total": 145.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "playera Blanca chica súper poderosas",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "playera celeste pantera Rosa",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "suéter naranja conejito",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3083",
    "cliente": "Gladys Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 10:42 PM",
    "itemsCount": 3,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter amarillo con figura de pera",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "suéter beige",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "suéter blanco federation",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3082",
    "cliente": "Fernanda hija de Ana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 10:18 PM",
    "itemsCount": 6,
    "subtotal": 147.32,
    "iva": 17.68,
    "total": 165.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Selianne Camiseta sin mangas de mujer con contraste de color y lazo",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "body lotion",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Set de 3 gafas de moda de verano, montura de metal ovalada retro decorativa, accesorio unisex para f",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 20.0
      },
      {
        "nombre": "suéter café",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "vestido letras",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "Set de 3 gafas de moda de verano, montura de metal ovalada retro decorativa, accesorio unisex para f",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-3081",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 10:15 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Set de 2 piezas: Decoración de hebilla de metal para atuendo casual urbano, vibra juvenil,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3080",
    "cliente": "kimberly vecina",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 10:13 PM",
    "itemsCount": 3,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Vestido rosado",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "silky beauty spray",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      }
    ]
  },
  {
    "id": "FAC-3079",
    "cliente": "Masiel C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 09:26 PM",
    "itemsCount": 1,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter blanco coffe",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-3078",
    "cliente": "Odalis aceitera Pinula",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:55 PM",
    "itemsCount": 1,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SZ2308186516385065",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-3077",
    "cliente": "Jennifer Alfaro",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:50 PM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Camiseta T negra con patchwork de flores multicolor dulce para mujer, top casual de verano",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-3076",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:44 PM",
    "itemsCount": 6,
    "subtotal": 276.79,
    "iva": 33.21,
    "total": 310.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pantalón de lona negro Distefano",
        "cantidad": 1,
        "precioUnitario": 70.0,
        "subtotal": 70.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "jabón para rostro",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "body lotion",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "blusa manga larga",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "SHEGLAM Stardust Swipe Labial Líquido con Glitter-328 Red Giant Gloss Labial Brillo Glitter Instantá",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3075",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:40 PM",
    "itemsCount": 7,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pantalón negro de lona forever 21",
        "cantidad": 1,
        "precioUnitario": 70.0,
        "subtotal": 70.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      },
      {
        "nombre": "indian collection NRR207",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "sexy girl blush",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "suéter oscuro con diseño",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "playera obscura stitch",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3074",
    "cliente": "Wendy Alvarez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:37 PM",
    "itemsCount": 8,
    "subtotal": 236.61,
    "iva": 28.39,
    "total": 265.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusas suéter blanca",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "Franclia Camiseta de manga corta con cuello de solapa sexy y ajustada con empalme en blanco y negro  (XL, Blanco y Negro)",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "suéter negro con rosado",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "loción fascination las Vegas",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "aretes cerecitas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "suéter rojo wassup",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "nombre": "suéter negro cuello café con ziper",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "playera rosada con texto negro",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3073",
    "cliente": "Marlen Ramírez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:31 PM",
    "itemsCount": 3,
    "subtotal": 84.82,
    "iva": 10.18,
    "total": 95.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vestido negro con gorro",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "falda floreada",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "suéter morado con azul",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-3072",
    "cliente": "Dayanara C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:27 PM",
    "itemsCount": 3,
    "subtotal": 142.86,
    "iva": 17.14,
    "total": 160.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SpongeBob SquarePants | SHEIN Conjunto de pijama de camiseta de cuello redondo de manga corta y pant",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "Sandalias planas de punta cuadrada de unicolor para mujer, con decoración de lazo, elegantes y versá",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "playera beige texto negro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3071",
    "cliente": "Zoilita Osoy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:20 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "top negro argollas de metal",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3070",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:14 PM",
    "itemsCount": 4,
    "subtotal": 147.32,
    "iva": 17.68,
    "total": 165.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter corazón de colores",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "Franclia Set de 2 piezas: Decoración de hebilla de metal para atuendo casual urbano, vibra juvenil,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "aretes negro con blanco",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3069",
    "cliente": "Karina tia de Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/10/2026 08:10 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "top de cuero color  negro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3068",
    "cliente": "Gaby vecina de Wendy Monzón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 11:34 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pariaura Camiseta de mujer con estampado a rayas y decoración de lazo en la espalda (XL, amarillo ganso)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3067",
    "cliente": "Jacky Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 11:25 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM HAIR Suero de protección sin enjuague Hot Streak, 10 ml/0,3 onzas líquidas, spray protector  (Unitalla, transparente )",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-3066",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 11:18 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aretes flores amarillas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3065",
    "cliente": "Flor amiga de Katerin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 11:13 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Nuevo bolso de hombro versátil de moda, bolso de axila para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3064",
    "cliente": "Monica Ramírez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 11:10 PM",
    "itemsCount": 1,
    "subtotal": 120.54,
    "iva": 14.46,
    "total": 135.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 4 piezas de camisón de lunares sexy para mujer, lencería de malla transparente, camisón",
        "cantidad": 1,
        "precioUnitario": 135.0,
        "subtotal": 135.0
      }
    ]
  },
  {
    "id": "FAC-3063",
    "cliente": "Monica Ramírez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 11:08 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 4 piezas de camisón de lunares sexy para mujer, lencería de malla transparente, camisón",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-3062",
    "cliente": "Rosario Concua",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 11:01 PM",
    "itemsCount": 8,
    "subtotal": 361.61,
    "iva": 43.39,
    "total": 405.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Temptuelle 2 piezas Conjunto de lencería sexy para mujer, color negro, malla ultra delgada y transpi",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "SHEIN Body de mujer de moda versátil con rayas y volantes en contraste de color (XS, Blanco y Negro)",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      },
      {
        "nombre": "base mágica",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      },
      {
        "nombre": "falda deportiva negra",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "SHEGLAM Light Me Up Spray Fijador Luminoso",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 95.0
      }
    ]
  },
  {
    "id": "FAC-3061",
    "cliente": "Maricela C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:46 PM",
    "itemsCount": 1,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa cangurera",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-3060",
    "cliente": "Paola Rivera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:41 PM",
    "itemsCount": 1,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Funda protectora de teléfono con estilo de cerezo rosa, de TPU a prueba de golpes, con lazo, transpa",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-3059",
    "cliente": "Luci Grajeda",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:39 PM",
    "itemsCount": 2,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "4 piezas/Paquete Bragas triangulares cómodas y lindas de mujer con textura acanalada",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Insta-Wing Heart Delineador de Ojos con Sello Marca de Belleza Cosmética Maquillaje para Muj",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-3058",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:34 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Rizador de pestañas simulado 450/570/600, set de pestañas individuales de racimo natural estilo anim",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "blusa blanca stitch",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-3057",
    "cliente": "Úrsula C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:28 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Funda de teléfono con gradiente de arenado, soporte para tarjetas con lazo de lujo y minimal",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3056",
    "cliente": "Daniela hija de Karina",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:26 PM",
    "itemsCount": 2,
    "subtotal": 125.0,
    "iva": 15.0,
    "total": 140.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Bolso de hombro con cierre de cremallera de PU de color sólido en forma de media luna, retro",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "labiales",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-3055",
    "cliente": "Madelin Barillas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:19 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SNOOPY 1 pieza Funda de teléfono a prueba de golpes con patrón de dibujos animados y bloques de colo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3054",
    "cliente": "Majo De Jirón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:17 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Soft Haze Lip Blur-Just Smooches De 6 Colores, Resistente Al Agua, Tint",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3053",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:16 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Stardust Swipe Labial Líquido con Glitter-328 Red Giant Gloss Labial Brillo Glitter Instantá",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3052",
    "cliente": "Evelyn Amaya",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:13 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pantuflas de moda premium con decoración de corazón para mujer, suaves y cómodas, de suela blanda y",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3051",
    "cliente": "Gaby El campo por el proyecto",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:06 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias planas de mujer con puntera abierta y esponjosas, de piel sintética súper suave y cómoda,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3050",
    "cliente": "Jackelin Álvarez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 10:00 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pantuflas de mujer esponjosas y acogedoras, pantuflas de moda cálidas y suaves, pantuflas de casa, p",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-3049",
    "cliente": "Nohemí López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 09:58 PM",
    "itemsCount": 2,
    "subtotal": 227.68,
    "iva": 27.32,
    "total": 255.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Slaydiva Conjunto de dos piezas para mujer con top corto sin mangas con estampado de letra LA y shor",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Camisola elegante de mujer con lazo en la espalda, diseño envolvente, bajo con abertura, diseño de c",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3048",
    "cliente": "Aury Salón San José",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 08:12 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN MOD Vestido de mezclilla para mujer, vestido azul casual con tirantes tipo espagueti vintage",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3047",
    "cliente": "señora Sara",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 08:02 PM",
    "itemsCount": 5,
    "subtotal": 187.5,
    "iva": 22.5,
    "total": 210.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SweetSlumber Conjunto de pijama casual para mujer con camiseta de cuello redondo de manga corta esta",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "jabón para rostro",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "colágeno en crema",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "polvo de dientes",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3046",
    "cliente": "Cindy hija Doña Paty",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 08:01 PM",
    "itemsCount": 2,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Joudiya Top corto y ajustado de manga corta con malla transparente y floral, para salir durante el v",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "aretes de corazón 3D dorados",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-3045",
    "cliente": "Fabiola Tahuite (funeraria)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 07:55 PM",
    "itemsCount": 4,
    "subtotal": 415.18,
    "iva": 49.82,
    "total": 465.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "GlowEve CURVE Conjunto de top sin mangas de cuello en V y pantalones cortos de unicolor con bolsillo",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEGLAM Jelly Wow Aceite Labial Con Color-Pinky Swear Lip Combo Marca De Belleza CosméTica Maquillaj",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "SHEGLAM Mirror Kiss Labial Ultra Brillante-It Takes Guts Lip Combo Marca De Belleza CosméTica Maquil",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Pout Phresh Labial Cambia Color-Watermelon Lip Combo Marca De Belleza CosméTica Maquillaje P",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-3044",
    "cliente": "Karina López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 07:36 PM",
    "itemsCount": 3,
    "subtotal": 285.71,
    "iva": 34.29,
    "total": 320.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "ROMWE Kawaii Jersey sexy con cuello en V de encaje, tirantes caídos y decoración de lazo 3D",
        "cantidad": 1,
        "precioUnitario": 285.0,
        "subtotal": 285.0
      },
      {
        "nombre": "1 pieza Mono casual negro con espalda abierta, mono minimalista de moda para uso diario",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3043",
    "cliente": "Sara Córdova",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 07:31 PM",
    "itemsCount": 4,
    "subtotal": 446.43,
    "iva": 53.57,
    "total": 500.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Conjunto de 2 piezas de moda para mujer, de unicolor y textura, compuesto por un chaleco aju",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Elenzga Blusa casual y elegante de mujer con contraste de color negro y blanco, puños y decoración d",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "GlowEve Conjunto casual de 2 piezas para mujer con chaleco de un solo pecho y pantalones cortos con",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "GlowEve Camiseta de mujer con cuello, lunares y bloques de color - Verano, Vacaciones, Playa",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3042",
    "cliente": "Jazmin referida de Astrid",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 07:01 PM",
    "itemsCount": 3,
    "subtotal": 366.07,
    "iva": 43.93,
    "total": 410.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 2 piezas con top de cuello redondo y manga corta y pantalones acampanados, con estampado",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Pantuflas de mujer esponjosas y acogedoras, pantuflas de moda cálidas y suaves, pantuflas de casa, p",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Botas de nieve para pareja con forro polar de gamuza y parches, suela gruesa y forrada para uso inte",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-3041",
    "cliente": "Petro C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 06:52 PM",
    "itemsCount": 2,
    "subtotal": 142.86,
    "iva": 17.14,
    "total": 160.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Casual Underwear&Sleepwear 2 Unids/set Conjunto De Pijama Con Pantalones A Cuadros Y Top Con E",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "INAWLY Camiseta de mujer de cuello redondo y manga corta con estampado del paisaje de París en silue",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-3040",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 06:47 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Franclia Camiseta de mujer de moda casual, suelta, con cuello de contraste floral, versátil y  (S, Blanco )",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-3039",
    "cliente": "Yamali C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 06:41 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Camiseta de mujer con cuello en V y estampado de leopardo rosa, top de verano para salidas, c",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3038",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 06:38 PM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Blusa elegante de mujer de talla estándar para primavera/verano con decoración de cuentas, lazo cruz",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Amorya Camiseta elegante y casual de manga larga con cuello redondo, encaje y cintura de terciopelo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Blusa elegante de mujer con encaje, dobladillo asimétrico, cuello en V, mangas de satén con vo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3037",
    "cliente": "Darlyn Osoy",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 06:36 PM",
    "itemsCount": 4,
    "subtotal": 357.14,
    "iva": 42.86,
    "total": 400.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Genkimix Kids Conjunto de top de manga abullonada con cuello redondo y ribete de contraste con decor (5Y, Albaricoque )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta de punto casual de manga corta con cuello redondo y color contrastante elegante pa",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Conjunto de 2 piezas para niños pequeños con camiseta blanca de cuello redondo con estampado d",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Conjunto de 2 piezas con top de cuello redondo y manga corta y pantalones acampanados, con estampado",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3036",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 06:33 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN LUNE Nuevo conjunto de verano de 2 piezas para mujer con top corto con espalda descubierta y a",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-3035",
    "cliente": "hermana de Aby",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 06:31 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Muvela Camiseta elegante de mujer transparente con lunares blancos y negros, cuello mandarín, manga",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Franclia Top sexy de encaje con cuello en V, manga larga y transparente para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3034",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/10/2026 06:27 PM",
    "itemsCount": 5,
    "subtotal": 366.07,
    "iva": 43.93,
    "total": 410.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "DAZY Blusa de manga corta con estampado de lunares transparente para mujer, verano",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Franclia Camiseta de mujer de moda casual, suelta, con cuello de contraste floral, versátil y  (S, Blanco )",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Ximi Ruo Pantuflas planas de unicolor con pelaje esponjoso para mujer, uso casual en vacaciones, pla",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "2 piezas/Paquete Bragas de encaje de cintura alta con diseño cruzado para mujer, control de abdomen,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "aretes corazón moña negra",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3033",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "11/10/2026 05:53 PM",
    "itemsCount": 2,
    "subtotal": 156.25,
    "iva": 18.75,
    "total": 175.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Raffinéa Conjunto de top y falda de mujer de verano casual deportivo streetwear con bloques de",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "aretes de corazón con flor",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-3032",
    "cliente": "Jenifer Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "11/10/2026 05:46 PM",
    "itemsCount": 5,
    "subtotal": 477.68,
    "iva": 57.32,
    "total": 535.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Elladie kids Conjunto de verano de moda para niñas con top rojo de punto sin mangas y shorts p",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Set de 2 piezas de camisa polo de jacquard y pantalones cortos casuales para niños pequeños, para ve",
        "cantidad": 2,
        "precioUnitario": 125.0,
        "subtotal": 250.0
      },
      {
        "nombre": "Bhchntiy Set de 2 piezas de ropa casual de verano para niño bebé, con polo y pantalones cortos de un",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3031",
    "cliente": "Weysi",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "11/10/2026 05:44 PM",
    "itemsCount": 2,
    "subtotal": 245.54,
    "iva": 29.46,
    "total": 275.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Attitoon Mono de cuello alto blanco y negro para mujer, con pequeño logo de caballo, estilo universi",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "INAWLY Camiseta de mujer de cuello redondo y manga corta, sencilla y de moda, adecuada para el veran",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3030",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "11/10/2026 05:39 PM",
    "itemsCount": 3,
    "subtotal": 388.39,
    "iva": 46.61,
    "total": 435.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Slaydiva Conjunto de dos piezas para mujer con top corto sin mangas con estampado de letra LA y shor",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Camiseta de manga corta verde con cuello redondo, de estilo suelto y versátil, con estampado de boca",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Muchica Conjunto de 2 piezas de traje casual para mujer, top de manga corta con cuello polo gris cla",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-3029",
    "cliente": "Kenia esposa Adin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "11/10/2026 05:38 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Camiseta gráfica para mujer, nuevo diseño de verano, blanco con cereza roja, bordado de dient",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-3028",
    "cliente": "Liseth Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "11/10/2026 05:32 PM",
    "itemsCount": 4,
    "subtotal": 361.61,
    "iva": 43.39,
    "total": 405.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Raffinéa Conjunto de top y falda de mujer de verano casual deportivo streetwear con bloques de",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Conjunto de camisa de manga corta con cuello de camisa y pantalones cortos para niños, estilo casual",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "Conjunto de 2 piezas de top de manga corta y pantalones cortos con estampado de rayas, decoración de",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEIN Playful Pals Conjunto de 2 piezas de niño pequeño con camiseta de manga corta de cuello redond",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-3027",
    "cliente": "Liseth Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "11/10/2026 05:29 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 2 piezas de top de manga corta y pantalones cortos con estampado de rayas, decoración de",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-3026",
    "cliente": "Paola Rivera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 12:42 PM",
    "itemsCount": 1,
    "subtotal": 312.5,
    "iva": 37.5,
    "total": 350.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis champions celeste con blanco",
        "cantidad": 1,
        "precioUnitario": 350.0,
        "subtotal": 350.0
      }
    ]
  },
  {
    "id": "FAC-3025",
    "cliente": "Alejandra amiga Yesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 12:37 PM",
    "itemsCount": 3,
    "subtotal": 1147.32,
    "iva": 137.68,
    "total": 1285.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "termo Stanley color cafe",
        "cantidad": 1,
        "precioUnitario": 400.0,
        "subtotal": 400.0
      },
      {
        "nombre": "termo Stanley color beige",
        "cantidad": 1,
        "precioUnitario": 400.0,
        "subtotal": 400.0
      },
      {
        "nombre": "tenis Reebok",
        "cantidad": 1,
        "precioUnitario": 485.0,
        "subtotal": 485.0
      }
    ]
  },
  {
    "id": "FAC-3024",
    "cliente": "Andrea Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 12:30 PM",
    "itemsCount": 1,
    "subtotal": 491.07,
    "iva": 58.93,
    "total": 550.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Tenis Reebook negro con dorado",
        "cantidad": 1,
        "precioUnitario": 550.0,
        "subtotal": 550.0
      }
    ]
  },
  {
    "id": "FAC-3023",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 04:14 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Venta de Artículos Varios",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-3022",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 04:12 AM",
    "itemsCount": 1,
    "subtotal": 446.43,
    "iva": 53.57,
    "total": 500.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "plancha lila BabyLiss Pro",
        "cantidad": 1,
        "precioUnitario": 500.0,
        "subtotal": 500.0
      }
    ]
  },
  {
    "id": "FAC-3021",
    "cliente": "Wendy amiga de Tania",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 04:02 AM",
    "itemsCount": 1,
    "subtotal": 491.07,
    "iva": 58.93,
    "total": 550.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis puma negros",
        "cantidad": 1,
        "precioUnitario": 550.0,
        "subtotal": 550.0
      }
    ]
  },
  {
    "id": "FAC-3020",
    "cliente": "Jacky Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 03:57 AM",
    "itemsCount": 2,
    "subtotal": 937.5,
    "iva": 112.5,
    "total": 1050.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis reebook beige con rosado",
        "cantidad": 1,
        "precioUnitario": 550.0,
        "subtotal": 550.0
      },
      {
        "nombre": "plancha rosada BabyLiss Pro",
        "cantidad": 1,
        "precioUnitario": 500.0,
        "subtotal": 500.0
      }
    ]
  },
  {
    "id": "FAC-3019",
    "cliente": "Karina López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 03:49 AM",
    "itemsCount": 1,
    "subtotal": 522.32,
    "iva": 62.68,
    "total": 585.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis reebook beige con rosado",
        "cantidad": 1,
        "precioUnitario": 585.0,
        "subtotal": 585.0
      }
    ]
  },
  {
    "id": "FAC-3018",
    "cliente": "Rocsana / Mayra",
    "nit": "C F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 03:46 AM",
    "itemsCount": 1,
    "subtotal": 343.75,
    "iva": 41.25,
    "total": 385.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis polo negros",
        "cantidad": 1,
        "precioUnitario": 385.0,
        "subtotal": 385.0
      }
    ]
  },
  {
    "id": "FAC-3017",
    "cliente": "Sara Córdova",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 03:31 AM",
    "itemsCount": 1,
    "subtotal": 312.5,
    "iva": 37.5,
    "total": 350.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis champions celeste con blanco",
        "cantidad": 1,
        "precioUnitario": 350.0,
        "subtotal": 350.0
      }
    ]
  },
  {
    "id": "FAC-3016",
    "cliente": "Roselin Lainez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 03:25 AM",
    "itemsCount": 3,
    "subtotal": 1236.61,
    "iva": 148.39,
    "total": 1385.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sandalias puma verde menta",
        "cantidad": 1,
        "precioUnitario": 285.0,
        "subtotal": 285.0
      },
      {
        "nombre": "crossbody guess blanco",
        "cantidad": 1,
        "precioUnitario": 550.0,
        "subtotal": 550.0
      },
      {
        "nombre": "tenis blancos talla 36",
        "cantidad": 1,
        "precioUnitario": 550.0,
        "subtotal": 550.0
      }
    ]
  },
  {
    "id": "FAC-3015",
    "cliente": "Yamali C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 03:22 AM",
    "itemsCount": 1,
    "subtotal": 491.07,
    "iva": 58.93,
    "total": 550.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis puma animal print",
        "cantidad": 1,
        "precioUnitario": 550.0,
        "subtotal": 550.0
      }
    ]
  },
  {
    "id": "FAC-3014",
    "cliente": "Diana por los taxis",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 03:12 AM",
    "itemsCount": 1,
    "subtotal": 406.25,
    "iva": 48.75,
    "total": 455.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis new balance beige con verde",
        "cantidad": 1,
        "precioUnitario": 455.0,
        "subtotal": 455.0
      }
    ]
  },
  {
    "id": "FAC-3013",
    "cliente": "Gladys Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 03:03 AM",
    "itemsCount": 1,
    "subtotal": 401.79,
    "iva": 48.21,
    "total": 450.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis Polo blancos",
        "cantidad": 1,
        "precioUnitario": 450.0,
        "subtotal": 450.0
      }
    ]
  },
  {
    "id": "FAC-3012",
    "cliente": "Karina López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 02:57 AM",
    "itemsCount": 1,
    "subtotal": 491.07,
    "iva": 58.93,
    "total": 550.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolsa Guess",
        "cantidad": 1,
        "precioUnitario": 550.0,
        "subtotal": 550.0
      }
    ]
  },
  {
    "id": "FAC-3011",
    "cliente": "Brayka",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 02:52 AM",
    "itemsCount": 1,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "baby morado",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-3010",
    "cliente": "Fabiola Tahuite (funeraria)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 02:47 AM",
    "itemsCount": 2,
    "subtotal": 526.79,
    "iva": 63.21,
    "total": 590.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "crema cera Ve",
        "cantidad": 1,
        "precioUnitario": 235.0,
        "subtotal": 235.0
      },
      {
        "nombre": "chumpa palo rosa New Balance",
        "cantidad": 1,
        "precioUnitario": 355.0,
        "subtotal": 355.0
      }
    ]
  },
  {
    "id": "FAC-3009",
    "cliente": "Aury Salón San José",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 02:39 AM",
    "itemsCount": 1,
    "subtotal": 522.32,
    "iva": 62.68,
    "total": 585.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mochila negra",
        "cantidad": 1,
        "precioUnitario": 585.0,
        "subtotal": 585.0
      }
    ]
  },
  {
    "id": "FAC-3008",
    "cliente": "Emily Universidad Regional",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 02:24 AM",
    "itemsCount": 2,
    "subtotal": 803.57,
    "iva": 96.43,
    "total": 900.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "botas de frío",
        "cantidad": 1,
        "precioUnitario": 300.0,
        "subtotal": 300.0
      },
      {
        "nombre": "Tenis adidas blancos con rayas negras",
        "cantidad": 1,
        "precioUnitario": 600.0,
        "subtotal": 600.0
      }
    ]
  },
  {
    "id": "FAC-3007",
    "cliente": "Darlyn Pinula",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 02:19 AM",
    "itemsCount": 1,
    "subtotal": 343.75,
    "iva": 41.25,
    "total": 385.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "traje de nena 5 piezas",
        "cantidad": 1,
        "precioUnitario": 385.0,
        "subtotal": 385.0
      }
    ]
  },
  {
    "id": "FAC-3006",
    "cliente": "Rosario Concua",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 02:09 AM",
    "itemsCount": 6,
    "subtotal": 1205.36,
    "iva": 144.64,
    "total": 1350.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "calcetines obscuros nike",
        "cantidad": 1,
        "precioUnitario": 300.0,
        "subtotal": 300.0
      },
      {
        "nombre": "calcetines blancos Adidas",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      },
      {
        "nombre": "calcetas celeste y rosado Kalvin Klein",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "calceta multicolor new balance",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "calcetas adidas negras",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "calcetas skechers blancas",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-3005",
    "cliente": "Verónica Cuque",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 01:46 AM",
    "itemsCount": 3,
    "subtotal": 1058.04,
    "iva": 126.96,
    "total": 1185.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "traje bebe nike azul",
        "cantidad": 1,
        "precioUnitario": 400.0,
        "subtotal": 400.0
      },
      {
        "nombre": "traje bebe nike gris",
        "cantidad": 1,
        "precioUnitario": 400.0,
        "subtotal": 400.0
      },
      {
        "nombre": "traje bebe nike negro con naranja",
        "cantidad": 1,
        "precioUnitario": 385.0,
        "subtotal": 385.0
      }
    ]
  },
  {
    "id": "FAC-3004",
    "cliente": "Meli Lainez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 01:06 AM",
    "itemsCount": 4,
    "subtotal": 1294.64,
    "iva": 155.36,
    "total": 1450.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Tenis Reebook blancos",
        "cantidad": 1,
        "precioUnitario": 500.0,
        "subtotal": 500.0
      },
      {
        "nombre": "crossbody guess blanco",
        "cantidad": 1,
        "precioUnitario": 550.0,
        "subtotal": 550.0
      },
      {
        "nombre": "tenis reebook grises",
        "cantidad": 1,
        "precioUnitario": 500.0,
        "subtotal": 500.0
      },
      {
        "nombre": "tenis tommy blancos",
        "cantidad": 1,
        "precioUnitario": 450.0,
        "subtotal": 450.0
      }
    ]
  },
  {
    "id": "FAC-3003",
    "cliente": "Michelle Dávila",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/09/2026 12:35 AM",
    "itemsCount": 1,
    "subtotal": 491.07,
    "iva": 58.93,
    "total": 550.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Tenis Reebook negros",
        "cantidad": 1,
        "precioUnitario": 550.0,
        "subtotal": 550.0
      }
    ]
  },
  {
    "id": "FAC-3002",
    "cliente": "Gaby El campo por el proyecto",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/09/2026 07:41 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vaso térmico stitch",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-3001",
    "cliente": "Dyna vecina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/09/2026 07:33 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-3000",
    "cliente": "Meli Lainez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/09/2026 07:26 PM",
    "itemsCount": 2,
    "subtotal": 107.14,
    "iva": 12.86,
    "total": 120.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "elecciones carritos Minions",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2999",
    "cliente": "novio Gaby Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/09/2026 07:22 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "elecciones carritos Minions",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2998",
    "cliente": "Jonathan C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "25/09/2026 11:14 AM",
    "itemsCount": 13,
    "subtotal": 69.64,
    "iva": 8.36,
    "total": 78.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "agua cielo",
        "cantidad": 13,
        "precioUnitario": 6.0,
        "subtotal": 78.0
      }
    ]
  },
  {
    "id": "FAC-2997",
    "cliente": "Arenita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 10:02 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter beige con diseño",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2996",
    "cliente": "Kevin Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:55 PM",
    "itemsCount": 2,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "playera carro negra",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "suéter celeste Messi",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2995",
    "cliente": "Guzmán C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:51 PM",
    "itemsCount": 2,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "playera morada",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "Playera Negra",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2994",
    "cliente": "Paola central depot",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:51 PM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Body negro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "top rosado",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2993",
    "cliente": "Lorena C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:45 PM",
    "itemsCount": 4,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "playera negra",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "blusa aros",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "blusa negra manga larga",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Vestido rosado",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2992",
    "cliente": "Jenifer Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:45 PM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vestido blanco rayas",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2991",
    "cliente": "Imelda Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:41 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sudadero Blanco",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2990",
    "cliente": "Hana Mayen",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:39 PM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Blusa tipo suéter griss",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2989",
    "cliente": "Rosy C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:37 PM",
    "itemsCount": 2,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "dúo correctores",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "Playera huellas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2988",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:32 PM",
    "itemsCount": 4,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "monedero stitch",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "jabón para rostro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "playera negra Milano Italia",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "sudadero negro",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2987",
    "cliente": "Dulce Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:32 PM",
    "itemsCount": 2,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "2 labiales, 1 cejas",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "Blusa Rosada",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2983",
    "cliente": "Milvia De La Cruz (La Salvadora)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:25 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "playera amigos",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2982",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:23 PM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "playera rosada",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2981",
    "cliente": "Sandy E.",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:22 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vestido Rosado S",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2979",
    "cliente": "Ash Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:20 PM",
    "itemsCount": 1,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias de tacón grueso con punta redonda y correa para mujer, diapositivas de tacón bajo negro, p",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-2978",
    "cliente": "Nidia Pulex",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:19 PM",
    "itemsCount": 2,
    "subtotal": 107.14,
    "iva": 12.86,
    "total": 120.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sudadero negro",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "sudadero Hello K",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2977",
    "cliente": "señora Sara",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:14 PM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "vestido largo negro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2976",
    "cliente": "Eyla Duarte",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:13 PM",
    "itemsCount": 3,
    "subtotal": 84.82,
    "iva": 10.18,
    "total": 95.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "labial gloss",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "traje negro xl",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "chaleco Rojo",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2975",
    "cliente": "Maricela C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:05 PM",
    "itemsCount": 10,
    "subtotal": 276.79,
    "iva": 33.21,
    "total": 310.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "4 Labiales",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "bolso stich",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "camisa azul",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "camisa blanca",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "vestido negro con transparente",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "vestido negro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "chumpa negra",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "blusa verde",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "chumpa celeste",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "Pantalón Animalt print",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2974",
    "cliente": "Silvana C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 09:03 PM",
    "itemsCount": 3,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "falda pantalón",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "vestido de gatito",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "bolsa cangurera",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-2973",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 08:54 PM",
    "itemsCount": 4,
    "subtotal": 156.25,
    "iva": 18.75,
    "total": 175.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter gris Snoopy",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "playera negra París",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "suéter romantic",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "blusa rosada corazones",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2972",
    "cliente": "Rosario Concua",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 08:42 PM",
    "itemsCount": 12,
    "subtotal": 290.18,
    "iva": 34.82,
    "total": 325.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante sal y azucar",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      },
      {
        "nombre": "blusa suéter blanca",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "body Negro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "blsua morada",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "pantalón blanco",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "pantalón beige",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "pantalón negro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "licra negra",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "blusa Manga larga lila",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "Blusa Manga larga negra",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Blusa Gris",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2971",
    "cliente": "Karina López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 08:35 PM",
    "itemsCount": 9,
    "subtotal": 285.71,
    "iva": 34.29,
    "total": 320.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter navideño",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "playera gris",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Sandalias planas para mujer 2026 nuevo estilo de moda diseño simple de una tira con hebilla de metal",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "playera rosada",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "playera rosada",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "suéter gris",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "llavero stitch proyector",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2970",
    "cliente": "Liseth Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 08:15 PM",
    "itemsCount": 1,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter gym",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-2969",
    "cliente": "Lesly Delgado",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 08:12 PM",
    "itemsCount": 3,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sueter blusa gris",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial gloss",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "libro de Stitch",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2967",
    "cliente": "Nicole Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 08:01 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante corporal sugar scrub",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2966",
    "cliente": "Estefani Tejax",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 07:59 PM",
    "itemsCount": 3,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "playera negra",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Body Negro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2965",
    "cliente": "Majo De Jirón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 07:51 PM",
    "itemsCount": 3,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "decodance",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2963",
    "cliente": "Carla Monterroso",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 07:42 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vestido multicolor",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2962",
    "cliente": "Lupita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:46 PM",
    "itemsCount": 4,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "exfoliante sal y azucar",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "llavero stitch proyector",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "suéter verde con líneas blancas",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2961",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:38 PM",
    "itemsCount": 5,
    "subtotal": 160.71,
    "iva": 19.29,
    "total": 180.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolso stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "BB rice raw pulp",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "suéter tela blanco líneas negras",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "playera roja",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2960",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:35 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "llavero stitch grande",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2959",
    "cliente": "Andrea Valencia",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:30 PM",
    "itemsCount": 3,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "protector solar",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2958",
    "cliente": "Jaqueline Chacón",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:27 PM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Desmaquillante de arroz",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2957",
    "cliente": "Estela Galeano",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:23 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "protector solar",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2956",
    "cliente": "hermana de Aby",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:19 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante de sal y azúcar",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2955",
    "cliente": "Nohemí López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:17 PM",
    "itemsCount": 2,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante de sal y azúcar",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2954",
    "cliente": "Valery Blanco",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:12 PM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante de sal y azúcar",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2953",
    "cliente": "Damaris Menendez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 06:02 PM",
    "itemsCount": 4,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter cuadriculado",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "poncho beige",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "blusa roja",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "vestido negro con blanco",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2952",
    "cliente": "Sara Córdova",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/09/2026 05:58 PM",
    "itemsCount": 4,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolso stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "blusa",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "vaso térmico stitch",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2951",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "23/09/2026 12:27 AM",
    "itemsCount": 3,
    "subtotal": 388.39,
    "iva": 46.61,
    "total": 435.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pantalones rectos elásticos blancos para mujer - Ajuste, cintura elástica, poliéster, lavable a máqu",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Flirla Conjunto de pantalones anchos versátiles de verano color burdeos con tela texturizada, patchw (M, Burdeos )",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEGLAM Lashlighter Infinite Máscara Tubular pestañas Marca de Belleza Cosmética Maquillaje para Muj",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2950",
    "cliente": "Kimberly Marroquín",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "23/09/2026 12:20 AM",
    "itemsCount": 2,
    "subtotal": 330.36,
    "iva": 39.64,
    "total": 370.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM [2Pcs] Complexion Pro Matte Set Base y Corrector Marca de Belleza Cosmética Maquillaje para",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEGLAM [2Pcs] Complexion Pro Matte Set Base y Corrector Marca de Belleza Cosmética Maquillaje para",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2949",
    "cliente": "Lucky C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "23/09/2026 12:18 AM",
    "itemsCount": 1,
    "subtotal": 312.5,
    "iva": 37.5,
    "total": 350.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Basrey Elegante vestido de dama de honor sin mangas de unicolor con cola de sirena para boda, blanco",
        "cantidad": 1,
        "precioUnitario": 350.0,
        "subtotal": 350.0
      }
    ]
  },
  {
    "id": "FAC-2945",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 11:53 PM",
    "itemsCount": 3,
    "subtotal": 290.18,
    "iva": 34.82,
    "total": 325.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Insta-Ready Sunset Polvo Fijador Difuminador-13 Smooth Sand Marca de Belleza Cosmética Maqui",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Line to Shine Dúo Tinte Labial Peel-Off & Gloss-514 Brown Butter Combo 2 en 1 Larga Duración",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "CMAYOME Juego de 380 piezas de pestañas postizas, incluye 10D-150D, diámetro de 8-16mm, viene con pe",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2944",
    "cliente": "Wendy amiga de Tania",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 11:49 PM",
    "itemsCount": 3,
    "subtotal": 245.54,
    "iva": 29.46,
    "total": 275.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM The Everywhere Delineador en Lápiz 4 en 1 Marca de Belleza Cosmética Maquillaje para Mujeres",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Insta-Ready Ultra-Fine Difuminador & Lifting Polvo Fijador Dos en Uno-Bubblegum Marca de Bel (7g*2, Bubblegum )",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "vestido con letras blancas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2943",
    "cliente": "Flor amiga de Katerin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 11:37 PM",
    "itemsCount": 2,
    "subtotal": 276.79,
    "iva": 33.21,
    "total": 310.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Camera On Spray Fijador Difuminador Resistente al Agua Marca Belleza Maquillaje Maquullaje C",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEGLAM Insta-Ready Ultra-Fine Difuminador & Lifting Polvo Fijador Dos en Uno-Bubblegum Marca de Bel (7g*2, Bubblegum )",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2942",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 11:34 PM",
    "itemsCount": 3,
    "subtotal": 196.43,
    "iva": 23.57,
    "total": 220.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Franclia Body de camisola sexy de corte ajustado con estampado de encaje patchwork, conjunto d",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Conjunto de 3 piezas de mono lencería sexy sin costuras con cintura ceñida y efecto levantador de gl",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "BB rice raw pulp",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2941",
    "cliente": "Fernanda hija de Ana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 11:31 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Casual Underwear&Sleepwear 2 Unids/set Conjunto De Pijama Con Pantalones A Cuadros Y Top Con E",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2940",
    "cliente": "Marcela hija de Sonia",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 11:29 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "INAWLY Camiseta de mujer plisada en marrón (con estiramiento en 4 direcciones)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2939",
    "cliente": "Wendy salón",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 01:55 AM",
    "itemsCount": 2,
    "subtotal": 227.68,
    "iva": 27.32,
    "total": 255.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 2 piezas para bebé niño: camiseta de manga corta holgada, casual, deportiva, minimalista",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Sandalias/Pantuflas deportivas para mujer con perlas falsas y rhinestones, de punta abierta, de unic",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2938",
    "cliente": "Jesica Garcia (yeye)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 01:50 AM",
    "itemsCount": 2,
    "subtotal": 388.39,
    "iva": 46.61,
    "total": 435.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Conjunto de 2 piezas elegante negro para mujer, nuevo para el verano con top ajustado de man",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      },
      {
        "nombre": "SHEGLAM [2Pcs] Complexion Pro Matte Set Base y Corrector Marca de Belleza Cosmética Maquillaje para",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2937",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 01:48 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Shorts moldeadores sin costuras de cintura alta para mujer, faja con cierre de gancho y ojal, bragas",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2936",
    "cliente": "Kyrian Aguirre",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 01:45 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "LOONEY TUNES X SHEIN Conjunto de camiseta de manga corta y pantalones cortos con estampado de dibujo",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2935",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 01:42 AM",
    "itemsCount": 8,
    "subtotal": 433.04,
    "iva": 51.96,
    "total": 485.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Bolsa de almuerzo aislada estilo deportivo, accesorios de viaje Bolsa de almuerzo Bolsa de a",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "combo labiales",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "suéter stitch",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "suéter stitch",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "taza stitch",
        "cantidad": 3,
        "precioUnitario": 35.0,
        "subtotal": 105.0
      }
    ]
  },
  {
    "id": "FAC-2934",
    "cliente": "Weysi",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 01:32 AM",
    "itemsCount": 9,
    "subtotal": 892.86,
    "iva": 107.14,
    "total": 1000.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Lyxana Body de mujer de unicolor con cuello en V cruzado, mangas cortas y lazo en la cintura",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta de punto casual de manga corta con cuello redondo y color contrastante elegante pa",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN SXY Body sin mangas con ribete de contraste para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "INAWLY Set de 3 camisetas de verano para mujer, blanco, azul marino, estampado de rayas, estampado f",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "GlowEve Top sin mangas con cuello en V y bloques de color azul y blanco para mujer, ajuste ceñido, d",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Rafferiza Camiseta de manga corta con cuello de solapa, manga acampanada y abertura de media placa,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Franclia Body de mujer blanco de malla transparente con cuello alto y mangas ajustadas, conjun",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta casual de mujer con cuello redondo y manga corta con diseño de nudo en la cintura",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Selianne Blusa premium de mujer de nueva moda de verano, unicolor, patchwork de malla, hombros descu",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2933",
    "cliente": "Darlyn Pinula",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 01:08 AM",
    "itemsCount": 5,
    "subtotal": 700.89,
    "iva": 84.11,
    "total": 785.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "INAWLY Conjunto de 2 piezas con chaqueta corta de cuello mao con cremallera ajustada y pantalones ac",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Elladie kids Conjunto de pantalones casuales con estampado de volantes y lazo, con bajo asimétrico p",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Selianne Conjunto de 2 piezas para mujer: camiseta versátil y elegante para ir a trabajar & falda co (M, Blanco y Negro)",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "GlowEve Vestido de varias piezas de corte holgado con estampado de rayas vintage, estilo moderno min",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEIN Conjunto de 2 piezas para niñas jóvenes: top sin mangas y pantalones anchos de cintura elástic",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2932",
    "cliente": "Verónica Cuque",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 12:26 AM",
    "itemsCount": 2,
    "subtotal": 223.21,
    "iva": 26.79,
    "total": 250.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Snug Zone Set de lencería de 3 paquetes con pantalones cortos de encaje floral elegantes tallas gran",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 pieza Shorts moldeadores de cintura alta con control de abdomen para mujeres, moldeado de cintura,",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2931",
    "cliente": "Karina tia de Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 12:23 AM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "DAZY Blusa de mujer con flores, manga corta y transparencia, para salir, Tops de verano, Crop tops p",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "2026 Nueva Primavera/Verano Camiseta casual de manga corta con cuello alto, malla y estampado flocad",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2930",
    "cliente": "Yaneth C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 12:21 AM",
    "itemsCount": 4,
    "subtotal": 357.14,
    "iva": 42.86,
    "total": 400.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Rafferiza Camiseta de manga corta con cuello de solapa, manga acampanada y abertura de media placa,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Editum Camiseta casual y elegante de mujer con cuello en V, manga larga, textura de punto negro, enc",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Raffinéa Traje de baño de una pieza para mujer de malla transparente y parches negros, elegant",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "GlowEve Top sin mangas con cuello en V y bloques de color azul y blanco para mujer, ajuste ceñido, d",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2929",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/09/2026 12:02 AM",
    "itemsCount": 5,
    "subtotal": 558.04,
    "iva": 66.96,
    "total": 625.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 2 piezas con camiseta de manga corta y pantalones cortos para niña preadolescente, estil",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Maria Perezxox Camiseta blanca de mangas cortas con cuello redondo y diseño de encaje veraniego (2 e",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Conjunto de 2 piezas de camiseta de manga corta con cuello redondo y pantalones cortos con estampado",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Pantalones anchos y sueltos de unicolor de moda para mujer, elegantes y minimalistas en negro, de pr",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "SHEIN Explorewe Set de 2 piezas: Camiseta de manga corta con bloqueo de color cómoda y con estilo pa",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2928",
    "cliente": "Evelyn Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/09/2026 11:58 PM",
    "itemsCount": 1,
    "subtotal": 116.07,
    "iva": 13.93,
    "total": 130.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Qadelle Camisa larga con mangas de farol y adorno metálico para mujer, elegante y de moda",
        "cantidad": 1,
        "precioUnitario": 130.0,
        "subtotal": 130.0
      }
    ]
  },
  {
    "id": "FAC-2927",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/09/2026 11:54 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sweetra Vestido casual de fiesta para mujer, primavera-verano, estilo francés romántico años 70 y 20",
        "cantidad": 1,
        "precioUnitario": 180.0,
        "subtotal": 180.0
      },
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2926",
    "cliente": "Sofía vecina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/09/2026 11:50 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Coolqubz 1 Conjunto de Camiseta de Manga Corta y Pantalones Cortos con Estampado de Bloques de",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 Set Niñas Jóvenes Casual Lindo Dibujo Animado K-POP Teñido Anudado Impresión Manga Corta Cuello Re",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2925",
    "cliente": "Anthony Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/09/2026 11:42 PM",
    "itemsCount": 5,
    "subtotal": 799.11,
    "iva": 95.89,
    "total": 895.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Buzzelle Suéter de Navidad de mujer con estampado de renos y copos de nieve, de manga larga y tejido",
        "cantidad": 2,
        "precioUnitario": 250.0,
        "subtotal": 500.0
      },
      {
        "nombre": "PETSIN 1 pieza Suéter navideño para mascotas, patrón de jacquard geométrico de color albaricoque, di",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      },
      {
        "nombre": "1 pieza Mochila linda para perro, bolsa portátil para snacks para perros pequeños y medianos, diseño",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "1 pieza Conjunto de ropa de cuchillo para perro - Disfraz de mascota divertido con capucha y accesor",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2924",
    "cliente": "Luci Grajeda",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/09/2026 11:35 PM",
    "itemsCount": 5,
    "subtotal": 433.04,
    "iva": 51.96,
    "total": 485.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SweetSlumber Conjunto de pijama casual para mujer con camiseta de cuello redondo de manga corta esta",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Elyressa Camiseta de verano para mujer de nuevo estilo con abertura en los hombros y apliques de enc",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta casual de mujer con cuello redondo y manga corta con diseño de nudo en la cintura",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Selianne Blusa premium de mujer de nueva moda de verano, unicolor, patchwork de malla, hombros descu",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Mauve Mood Paleta de Sombras Marca de Belleza Cosmética Maquillaje para Mujeres y Niñas (7,6 g, Mauve Mood Palette)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2923",
    "cliente": "Flor amiga de Katerin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/09/2026 11:34 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Insta-Ready Ultra-Fine Difuminador & Lifting Polvo Fijador Dos en Uno-Bubblegum Marca de Bel (7g*2, Bubblegum )",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2918",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 08:32 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Air Plush Crema para Labios y Mejillas-029 Flit & Float Colorete Líquido y Labial Multiuso",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2917",
    "cliente": "Ivón C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 08:28 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM HAIR Suero de protección sin enjuague Hot Streak, 10 ml/0,3 onzas líquidas, spray protector  (Unitalla, transparente )",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2916",
    "cliente": "Graciela García",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 08:25 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM DúO HíBrido De Iluminador Y Rubor Glam 101: Paleta De Rubor St. Tropez, Iluminador En Polvo,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2915",
    "cliente": "Lupita Salón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 08:23 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 12 piezas de brillo labial, tinte de labios mate hidratante que no se desvanece fácilmente, l",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "beauty glazed Set de 12 lápices delineadores de labios mate nude - Delineadores de labios a prueba d (conjunto A)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2914",
    "cliente": "Fernanda hija de Ana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 08:20 PM",
    "itemsCount": 1,
    "subtotal": 200.89,
    "iva": 24.11,
    "total": 225.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Diseño de capa de gasa blanca romántica y elegante de primavera/verano, vestido maxi de ajuste ceñid (S, Blanco )",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      }
    ]
  },
  {
    "id": "FAC-2913",
    "cliente": "Martita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 08:12 PM",
    "itemsCount": 1,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Chaqueta con forro térmico, de moda, cálida, casual, adecuada para el uso diario y deportes al aire  (M, Negro )",
        "cantidad": 1,
        "precioUnitario": 300.0,
        "subtotal": 300.0
      }
    ]
  },
  {
    "id": "FAC-2912",
    "cliente": "Delmy Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 08:09 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Set de chaleco y pantalones casuales de bebé niña con estampado de cuadros y cerezas (2-3Y, Multicolor )",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2911",
    "cliente": "Majo De Jirón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 08:04 PM",
    "itemsCount": 2,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Lashlighter Up & Out Máscara de pestañas Marca Belleza Maquillaje Maquullaje Cosmética para",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "SHEGLAM Lashlighter Tratamiento de pestañas de fácil eliminación Marca Belleza Maquillaje Maquullaje",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-2910",
    "cliente": "Majo De Jirón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 08:01 PM",
    "itemsCount": 2,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Lashlighter Tratamiento de pestañas de fácil eliminación Marca Belleza Maquillaje Maquullaje",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Lashlighter Up & Out Máscara de pestañas Marca Belleza Maquillaje Maquullaje Cosmética para",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2909",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "13/09/2026 07:54 PM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Story & Sage Camiseta casual para mujer para casa y vacaciones, de primavera/verano, ajustada, con r (L, Blanco )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Genlund Camiseta de manga corta blanca con patchwork jacquard para hombre, casual de verano para vac (M, Multicolor )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Elenzya Camiseta casual y elegante de mujer con cuello redondo, manga corta, ribete de encaje,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2908",
    "cliente": "Lupita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/09/2026 11:28 PM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "playera negra con naranja Tokio",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2907",
    "cliente": "Monica Ramírez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/09/2026 11:15 PM",
    "itemsCount": 3,
    "subtotal": 129.46,
    "iva": 15.54,
    "total": 145.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sudadero negro serpiente",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "playera negra",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "la vie de scenabella",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2906",
    "cliente": "hermana Irene",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/09/2026 11:03 PM",
    "itemsCount": 1,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "conjunto gris",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2905",
    "cliente": "Jeny Delgado",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/09/2026 10:57 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de camiseta básica de manga corta y pantalones cortos para niños con estampado gráfico de e (8Y, Multicolor )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta de punto casual de manga corta con cuello redondo y color contrastante elegante pa (S, Azul Marino)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2904",
    "cliente": "Tania Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/09/2026 10:49 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de pijama con nudo delantero estampado a cuadros",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SweetSlumber Conjunto de pijama ajustado para mujer joven INS con estampado floral de corazón, bloqu (S, Multicolor )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2903",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/09/2026 10:45 PM",
    "itemsCount": 3,
    "subtotal": 401.79,
    "iva": 48.21,
    "total": 450.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Serisse Blusa elegante para mujer con decoración de lazo en blanco y negro, top de 100% algodón puro (M, Albaricoque)",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "GlowEve Camiseta casual dulce de manga corta y cuello redondo para mujer (M, Multicolor)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Zapatillas de mujer para verano, nuevas, de moda, versátiles, de tacón fino, estilo retro francés, z (CN38, Rosa )",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2902",
    "cliente": "Anely C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "12/09/2026 10:40 PM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Camiseta de manga corta de cuello redondo, ajuste ceñido, color blanco puro para adolescentes, (16Y, Blanco )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Set de 2 piezas de camiseta de manga corta de cuello redondo con estampado y pantalones cortos (5Y, Azul Marino)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Manfinity Homme Camiseta de manga corta casual de hombre de verano con estampado de cuadros y escote (M, Blanco )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2901",
    "cliente": "Wendy Alvarez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "12/09/2026 10:32 PM",
    "itemsCount": 2,
    "subtotal": 343.75,
    "iva": 41.25,
    "total": 385.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Elenzya Conjunto de 2 piezas para mujer en azul aqua y azul pizarra, elegante y sexy para vera (M, Azul )",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Vestido Camisa Elegante para Mujer-Vestido Camisa Negro con Cintura Ajustada-Cuello con Solapa y Bot (XL, Negro )",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2900",
    "cliente": "Julissa Hotel",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "03/09/2026 10:37 AM",
    "itemsCount": 8,
    "subtotal": 517.86,
    "iva": 62.14,
    "total": 580.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "top amarillo",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "blusa roja con manga larga traslucida",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "Selianne Camiseta de mujer de unicolor con cuello en V, manga corta y volantes en el ribete, para ve",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Franclia Camiseta casual de mujer de unicolor con botones de metal (L, Albaricoque )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "cartera horizontal con letra g",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "suéter romantic",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "suéter negro con verde",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "suéter believe",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2899",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "02/09/2026 01:12 PM",
    "itemsCount": 4,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Camiseta T negra con patchwork de flores multicolor dulce para mujer, top casual de verano",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Ritzy Row Top de satén sin mangas con encaje, dobladillo asimétrico y cuello drapeado (M, Negro)",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "exfoliante fresa",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "exfoliante de sal y azúcar",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2898",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 11:44 PM",
    "itemsCount": 2,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Camiseta T negra con patchwork de flores multicolor dulce para mujer, top casual de verano",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Ritzy Row Top de satén sin mangas con encaje, dobladillo asimétrico y cuello drapeado (M, Negro)",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2897",
    "cliente": "Jacky Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 08:15 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 par de guantes de portero de fútbol para niños, 8-14 años, guantes de fútbol para niños con palma  (8-12Y, Verde)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2896",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 08:13 PM",
    "itemsCount": 3,
    "subtotal": 357.14,
    "iva": 42.86,
    "total": 400.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Elenzya Camiseta casual y elegante de mujer con cuello redondo, manga corta, ribete de encaje,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "LOONEY TUNES X SHEIN Camiseta de mujer de manga corta con rayas y contraste de color",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEIN Blusa elegante de mujer con encaje, dobladillo asimétrico, cuello en V, mangas de satén con vo",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2895",
    "cliente": "Yeimi Rodríguez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 08:06 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Camiseta de manga corta con cuello redondo y estampado de abeja, casual de verano para mujer (L, Blanco)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de mujer de cuello redondo de manga corta minimalista y de moda con estampado digita (L, Blanco y negro)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2894",
    "cliente": "Astrid Celeste",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 08:00 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "EMERY ROSE Camiseta de manga corta de mujer con cuello redondo, patchwork y bloque de color, versáti (M, Multicolor )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2893",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 07:58 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Body de mujer con cuello halter y recorte cruzado, minimalista y versátil (XL, Negro )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2892",
    "cliente": "Kenia esposa Adin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 07:56 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Camiseta de mujer de moda casual con cuello redondo y hombros caídos, bordado de flores de cer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2891",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 07:51 PM",
    "itemsCount": 8,
    "subtotal": 1084.82,
    "iva": 130.18,
    "total": 1215.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Marshmallow Puff Pluma Difuminadora para Labios-330 Red Teddy",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM HAIR Bruma de purpurina para el cabello y el Body con efecto disco-Reina del baile Cumpleaño",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM HAIR Bruma de purpurina para el cabello y el Body con efecto disco twist - Azúcar de hada Cu",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "CATWOMAN™ | SHEGLAM I am not a Kitten Tinte de Labios Despegable-High Stakes",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Stardust Swipe Labial Líquido con Glitter-519 Mocha Meteor Gloss Labial Brillo Glitter Insta",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Conjunto de bikini de 4 piezas con estampado de leopardo para mujer, con cubierta de gasa y pañuelo",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Nuevo bolso de PU de alta gama con colgante de lazo, cierre de cremallera y cadena de metal, portáti",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "Swim SXY Conjunto de 4 piezas de bikini sexy para mujer: Top con tirantes finos y espalda descubiert",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      }
    ]
  },
  {
    "id": "FAC-2888",
    "cliente": "Rosario Concua",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 07:27 PM",
    "itemsCount": 5,
    "subtotal": 254.46,
    "iva": 30.54,
    "total": 285.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Diadema bohemia para mujer - Diadema elástica gruesa antideslizante, diseño de lazo y anillo, blanco",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 pieza Diadema casual de unicolor de poliéster, modelo de moda de otoño/invierno, accesorios para e",
        "cantidad": 4,
        "precioUnitario": 46.25,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2887",
    "cliente": "Mónica prima de RC",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "01/09/2026 07:10 PM",
    "itemsCount": 11,
    "subtotal": 910.71,
    "iva": 109.29,
    "total": 1020.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 6 piezas de lencería de diseño curvo de moda para mujer",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "12 piezas de bragas sin costuras de cintura baja en forma de V sexy para mujer, unicolor elegante, e",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "4 piezas/paquete - Tangas sin costuras de color negro sólido para mujer, tangas sin costuras a prueb",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "1 pieza Pañuelo cuadrado de algodón de 90x90cm con lunares verde oliva vintage, estilo francés multi",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "Pañuelo de seda con estampado vintage de 70cm, verde militar, pañuelo casual, perfecto para un viaje",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "1 pieza Pañuelo cuadrado de seda satinada estampado de estilo bohemio para mujer de 90*90cm, chal, p",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "1 pieza Pañuelo de seda con estampado de lunares negros y paisley de 90cm, pañuelo de satén para pla",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "1 pieza Pañuelo/Bandana con estampado floral vintage para mujer, nueva moda primaveral de diadema, a",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "1 pieza Pañuelo ligero azul marino para mujer, pañuelo casual de playa de verano, chal de protección",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "1 pieza Pañuelo cuadrado de mujer de estilo paisley, liviano, para playa y vacaciones de verano, reg",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "1 pieza Bufanda cuadrada grande de seda de 90 cm con estampado de letra naranja brillante, bufanda c",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2886",
    "cliente": "Yaneth C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/08/2026 06:34 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN LUNE Top sin mangas con cuello redondo y ribete en blanco y negro, blusa blanca ligera, camisa (L, Azul )",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Franclia Camiseta de mujer de cuello redondo, manga corta, decorativa con botones y acanalada,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2885",
    "cliente": "Esmeralda familiar de Davis",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/08/2026 06:07 PM",
    "itemsCount": 3,
    "subtotal": 433.04,
    "iva": 51.96,
    "total": 485.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "LOONEY TUNES X SHEIN Camiseta de manga corta de mujer con cuello redondo, estampado de letras de dib",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "UREREM Conjunto de 2 piezas de chaleco y falda de playa con rayas, color contrastante, casual elegan",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Rafferiza Body de mujer a rayas negras y blancas con cuello redondo, botones y manga corta,Verano,Ca",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2884",
    "cliente": "Evelyn Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/08/2026 05:54 PM",
    "itemsCount": 5,
    "subtotal": 553.57,
    "iva": 66.43,
    "total": 620.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Jeans de mezclilla azul, ajustado y elástico, para hombre",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Fenqiro Camiseta De Manga Corta Con Cuello Redondo De Color Sólido Para Hombre",
        "cantidad": 1,
        "precioUnitario": 90.0,
        "subtotal": 90.0
      },
      {
        "nombre": "Manfinity LEGND Camiseta Negra Holgada Para Hombre Con Impresión De Letras",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Manfinity Joysei Camiseta de manga corta con cuello redondo y estampado de letras en inglés para hom",
        "cantidad": 1,
        "precioUnitario": 105.0,
        "subtotal": 105.0
      },
      {
        "nombre": "Elenzga Vestido de largo medio de unicolor para mujer, vestido de tirantes, con diseño hueco, minima",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2883",
    "cliente": "Weysi",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/08/2026 05:43 PM",
    "itemsCount": 4,
    "subtotal": 580.36,
    "iva": 69.64,
    "total": 650.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SilkySpell Set de 3 piezas de camisón de encaje bordado sexy para mujer (XXl, Multicolor )",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SweetSlumber Conjunto de pijama para mujer con top de tirantes con patchwork de encaje y pantalones",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Rafferiza Conjunto de 2 piezas de blusa sin mangas con hombros asimétricos a rayas blancas y negras,",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "INAWLY Camiseta de mujer de cuello redondo y manga corta, sencilla y de moda, adecuada para el veran",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2882",
    "cliente": "Liseth Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/08/2026 05:38 PM",
    "itemsCount": 1,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "CMAYOME Juego de 380 piezas de pestañas postizas, incluye 10D-150D, diámetro de 8-16mm, viene con pe",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2881",
    "cliente": "María Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/08/2026 05:25 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "GlowEve CURVE Blusa de moda casual para mujer con patchwork, bloques de color, cuello asimétrico y m",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2880",
    "cliente": "Lupita Salón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/08/2026 05:16 PM",
    "itemsCount": 1,
    "subtotal": 147.32,
    "iva": 17.68,
    "total": 165.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Disney 2 piezas Conjunto de sudadera de manga larga y pantalones con efecto denim para bebé recién n (2-3Y, azul real)",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      }
    ]
  },
  {
    "id": "FAC-2879",
    "cliente": "Ana Pérez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:34 PM",
    "itemsCount": 6,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "arete Hot cake y brillo",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "jabón para acné",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "aretes doraditos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "cera para cejas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "BB rice raw pulp",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "anti-hair loss",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2878",
    "cliente": "Sofía vecina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:26 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "silky beauty spray",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2877",
    "cliente": "Carmen de García",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:23 PM",
    "itemsCount": 2,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "repelente de mosquitos",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2876",
    "cliente": "Janeth H. de Rocs",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:21 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "silky beauty spray",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2875",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:20 PM",
    "itemsCount": 2,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "jabón de arroz",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2874",
    "cliente": "Vivi por la despensa",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:19 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pink strips",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2873",
    "cliente": "Maybelin Central Depot",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:18 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "jabón para acné",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2872",
    "cliente": "hermana de wendy",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:17 PM",
    "itemsCount": 2,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "jabón de arroz",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2871",
    "cliente": "Sandra Duarte",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:15 PM",
    "itemsCount": 2,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "repelente de mosquitos",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2870",
    "cliente": "Ana Carin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:14 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "arete argolla",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2869",
    "cliente": "Majo De Jirón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:11 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pink strips",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2868",
    "cliente": "Mónica prima de RC",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:10 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "hair wax stick",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2867",
    "cliente": "Flor amiga de Katerin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:09 PM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "white strips",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "silky beauty spray",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2865",
    "cliente": "kimberly vecina",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:05 PM",
    "itemsCount": 2,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "silky beauty spray",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "shampoo cabello liso",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2864",
    "cliente": "Meli Lainez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:02 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "silky beauty spray",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2863",
    "cliente": "Alejandra amiga Yesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 10:00 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante sal y azucar",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2862",
    "cliente": "Mishel Beteta",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 09:58 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "jabón para acné",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2861",
    "cliente": "Monica Amiga de Wendy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 09:57 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "hair wax stick",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2860",
    "cliente": "Jazmin referida de Astrid",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 09:55 PM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "natural black",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "romantic pour femme",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2857",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 06:55 PM",
    "itemsCount": 12,
    "subtotal": 419.64,
    "iva": 50.36,
    "total": 470.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body negro translúcido",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "blusa blanca cuello en V manga larga",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "blusa azul marino cuello alto manga larga",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "SHEGLAM Light Me Up Spray Fijador Luminoso",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "cartera vertical",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 45.0
      },
      {
        "nombre": "perfume para hombre YLY288",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 30.0
      },
      {
        "nombre": "pin Mario Bross",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "aretes negros con dorado",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "lámpara 3D stitch",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 0.0
      },
      {
        "nombre": "billetera stitch pequeña",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 15.0
      },
      {
        "nombre": "Shining love",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      },
      {
        "nombre": "lápiz labial color chocolate",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2856",
    "cliente": "Gabriela Colindres",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 06:39 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vestido negro corto manga larga",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2855",
    "cliente": "Kyara Santa Barbara",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 05:54 PM",
    "itemsCount": 4,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "rubor capibara",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "pegamento para pestañas",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "pescador licra",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "blusa beige manga corta",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2854",
    "cliente": "Madelyn zona 14",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 05:35 PM",
    "itemsCount": 3,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suéter azul  con bolsas",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "repelente de mosquitos",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "silky beauty spray",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2853",
    "cliente": "Nohemí López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 05:12 PM",
    "itemsCount": 2,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa cafe manga larga",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 40.0
      },
      {
        "nombre": "blusa blanca con tirantes",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2852",
    "cliente": "Jenifer Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 05:04 PM",
    "itemsCount": 2,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "top color negro",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "top beige",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2851",
    "cliente": "Yanira Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 04:56 PM",
    "itemsCount": 3,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "traje palo rosa",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "jabón blanqueador",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 15.0
      },
      {
        "nombre": "exfoliante de arroz",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2850",
    "cliente": "katherin Alfaro",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 04:09 PM",
    "itemsCount": 2,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body con encaje negro translúcido",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "aretes dorados",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2849",
    "cliente": "Julissa Hotel",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 04:03 PM",
    "itemsCount": 2,
    "subtotal": 129.46,
    "iva": 15.54,
    "total": 145.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cartera horizontal con letra g",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "blusa amarilla sin mangas",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2848",
    "cliente": "Rosy C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 03:52 PM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa celeste con flores",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 40.0
      },
      {
        "nombre": "jabón de arroz",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2847",
    "cliente": "Daniel Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/08/2026 03:43 PM",
    "itemsCount": 1,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "playera California",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2846",
    "cliente": "Heidy C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 11:54 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pantuflas cocodrilo",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2844",
    "cliente": "Melany Rosales",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 11:49 PM",
    "itemsCount": 4,
    "subtotal": 191.96,
    "iva": 23.04,
    "total": 215.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa #77",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "bath and shower gel",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "shampoo rice raw pulp duo",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "natural black",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2843",
    "cliente": "Debora N.",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 11:21 PM",
    "itemsCount": 1,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa cipers manita",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2842",
    "cliente": "Rocsana / Mayra",
    "nit": "C F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 11:18 PM",
    "itemsCount": 2,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cepillo de dientes eléctrico",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "crema protector solar",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2841",
    "cliente": "Jacky Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 11:17 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2839",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 11:14 PM",
    "itemsCount": 4,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "white strips",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "brillo stich",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "cera para cejas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 20.0
      },
      {
        "nombre": "repelente de mosquitos",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2838",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 11:10 PM",
    "itemsCount": 2,
    "subtotal": 129.46,
    "iva": 15.54,
    "total": 145.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "kit de arroz",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "la vie de scenabella",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2837",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 11:04 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "kit de arroz",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2836",
    "cliente": "Fernanda hermana de Anely",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 10:58 PM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "hair wax stick",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "pink strips",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2834",
    "cliente": "hermana Valery",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 10:54 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante corporal limon",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2832",
    "cliente": "Andrea Valencia",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 10:48 PM",
    "itemsCount": 3,
    "subtotal": 107.14,
    "iva": 12.86,
    "total": 120.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vestido corto rosado",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 40.0
      },
      {
        "nombre": "falda corta marrón",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "top negro",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2831",
    "cliente": "Ruth Iguardia",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 10:45 PM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brillitos y perlas doradas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "hair wax stick",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2830",
    "cliente": "Estefani Tejax",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 10:42 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pack de 2",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2829",
    "cliente": "Cintia Rodriguez, hermana de Jeni Waleska",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 10:39 PM",
    "itemsCount": 4,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pegamento para pestañas",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "hair wax stick",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "aloe vera serum",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "pink strips",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2826",
    "cliente": "Iraida Contreras",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 10:34 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pack de 2",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2825",
    "cliente": "Dyna vecina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 10:32 PM",
    "itemsCount": 2,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "hair wax stick",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "cartera horizontal",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2823",
    "cliente": "Yamali C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 10:25 PM",
    "itemsCount": 6,
    "subtotal": 174.11,
    "iva": 20.89,
    "total": 195.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "termo 800 ML",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 80.0
      },
      {
        "nombre": "taza Donald",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 20.0
      },
      {
        "nombre": "repelente de mosquitos",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      },
      {
        "nombre": "silky beauty spray",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2821",
    "cliente": "Kimberly Marroquín",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 08:25 PM",
    "itemsCount": 3,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pack de 2",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "hair wax stick",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "anti-hair loss",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2820",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 08:24 PM",
    "itemsCount": 3,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "jabón blanqueador",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 15.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "serum para rostro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2819",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 08:19 PM",
    "itemsCount": 2,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "solf cloud",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "jabón blanqueador",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2818",
    "cliente": "Izi Fabiola",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 08:17 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "masajeador",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2817",
    "cliente": "Lupita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 08:16 PM",
    "itemsCount": 3,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante fresa",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "jabón blanqueador",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 15.0
      },
      {
        "nombre": "jabón para acné",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2815",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 08:10 PM",
    "itemsCount": 3,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "billetera stitch grande",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 30.0
      },
      {
        "nombre": "iluminador",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "fruita symphony",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2813",
    "cliente": "Luci Grajeda",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 08:02 PM",
    "itemsCount": 8,
    "subtotal": 196.43,
    "iva": 23.57,
    "total": 220.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brillos y perlas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 25.0
      },
      {
        "nombre": "exfoliante corporal body sugar scrub vitamina C",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 25.0
      },
      {
        "nombre": "repelente de mosquitos",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "silky beauty spray",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "exfoliante corporal limon",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "aloe vera serum",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "romantic pour femme",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2810",
    "cliente": "Milvia De La Cruz (La Salvadora)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:47 PM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "decodance",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "indian collection VDB124",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2809",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:42 PM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante de sal y azúcar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 25.0
      },
      {
        "nombre": "exfoliante fresa",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2808",
    "cliente": "Ericka Delgado",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:40 PM",
    "itemsCount": 5,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cera para cejas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 20.0
      },
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "tinta para labios",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial super star",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2805",
    "cliente": "Merlín Barillas",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:39 PM",
    "itemsCount": 3,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "corazón dorado",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "bollos y perlas doradas",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "pulsera fresita",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2804",
    "cliente": "Alejandra Beteta",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:30 PM",
    "itemsCount": 6,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pulsera fresita",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 20.0
      },
      {
        "nombre": "cera para cejas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "tinta para labios",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "brillo stich",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "brillo osito",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2802",
    "cliente": "señora Sara",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:23 PM",
    "itemsCount": 8,
    "subtotal": 129.46,
    "iva": 15.54,
    "total": 145.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 20.0
      },
      {
        "nombre": "repelente de mosquitos",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      },
      {
        "nombre": "crema protector solar",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "tinta para labios",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "jabón para rostro",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "billetera stitch grande",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2801",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:23 PM",
    "itemsCount": 5,
    "subtotal": 120.54,
    "iva": 14.46,
    "total": 135.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cartera rectangular",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 45.0
      },
      {
        "nombre": "serum para rostro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 15.0
      },
      {
        "nombre": "rectangulos",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "redondito",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "brillos y perlas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2800",
    "cliente": "Monica Barillas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:12 PM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cera para cejas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 20.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2798",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:08 PM",
    "itemsCount": 4,
    "subtotal": 120.54,
    "iva": 14.46,
    "total": 135.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cepillo de dientes eléctrico",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "polvo de hada",
        "cantidad": 2,
        "precioUnitario": 40.0,
        "subtotal": 50.0
      },
      {
        "nombre": "blusa azul traslucida",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2797",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 07:05 PM",
    "itemsCount": 11,
    "subtotal": 290.18,
    "iva": 34.82,
    "total": 325.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "billetera stitch pequeña",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 15.0
      },
      {
        "nombre": "cartera vertical",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 45.0
      },
      {
        "nombre": "indian collection NRR207",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "solf cloud",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "perfume para hombre EAS291",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 30.0
      },
      {
        "nombre": "paradise park",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "exfoliante body sugar scrub",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 30.0
      },
      {
        "nombre": "loción de bolsillo stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "fruita symphony",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "splash",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 25.0
      },
      {
        "nombre": "brillo stich",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2794",
    "cliente": "Jesica Galindo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 06:58 PM",
    "itemsCount": 4,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "perfume para niña",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 20.0
      },
      {
        "nombre": "perfume para hombre YLY288",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 30.0
      },
      {
        "nombre": "indian collection RLPB257",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2793",
    "cliente": "Sonia Muxbal",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 06:52 PM",
    "itemsCount": 4,
    "subtotal": 102.68,
    "iva": 12.32,
    "total": 115.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aretes dorados",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "aretes dorados",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "body deportivo",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "vestido blanco con encaje",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2792",
    "cliente": "Paola La Salvadora",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 06:42 PM",
    "itemsCount": 6,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pin bart",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "arete perla",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "cuadro y perla",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "pulsera fresita",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "loción de bolsillo",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "champoo cabello rubio",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2791",
    "cliente": "Darlyn Osoy",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 06:40 PM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "LuxeNights Conjunto de pijama de 3 piezas para mujer con recortes de color contrastante en un sólido",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 75.0
      },
      {
        "nombre": "jabón intimo de limpieza",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2790",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 06:30 PM",
    "itemsCount": 4,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "jabón de arroz",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "mio mask",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "champoo cabello rubio",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 25.0
      },
      {
        "nombre": "fragancia para el cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2789",
    "cliente": "Doña Gloria",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/08/2026 06:12 PM",
    "itemsCount": 8,
    "subtotal": 200.89,
    "iva": 24.11,
    "total": 225.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "aceite para masajes extracto de arroz",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "jabón blanqueador",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 30.0
      },
      {
        "nombre": "colágeno",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "Keratina",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 20.0
      },
      {
        "nombre": "crema protector solar",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2788",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/08/2026 01:06 AM",
    "itemsCount": 15,
    "subtotal": 549.11,
    "iva": 65.89,
    "total": 615.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolso tipo maleta",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "traje pantalon y blusa color negro",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "SHEIN PETITE Camiseta de manga corta para , de verano, sexy y chic, para salir de noche, con cuello asimétrico y elementos metálicos, ajuste petite, top casual ajustado",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "fragancia para el cabello",
        "cantidad": 3,
        "precioUnitario": 25.0,
        "subtotal": 75.0
      },
      {
        "nombre": "multi purpose bracket",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "cartera rectangular",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 45.0
      },
      {
        "nombre": "máscara de pestañas",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería J4",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "tinta para labios",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "serum para rostro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "gloss",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería 03",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2786",
    "cliente": "Nely amiga de Celeste",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/08/2026 02:15 AM",
    "itemsCount": 2,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vestido colores",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "pantalon negro acampanado",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2785",
    "cliente": "Astrid Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/08/2026 01:57 AM",
    "itemsCount": 7,
    "subtotal": 232.14,
    "iva": 27.86,
    "total": 260.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN MOD Blusa de manga farol con contraste de color estilo francés para mujer, ideal para Halloween, salir, otoño, gótico, concierto country, grunge, bohemio, estilo old money, western, vuelta al cole, ropa western, invierno, pirata, disfraz de pirata con corset y manga larga, blusas elegantes, blusas con corset",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Sweetra Pantalones de mujer con diseño recto, elegantes y holgados, de punto a rayas, de estilo casual para principios de otoño, con un toque de moda y estilizadores",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "top blanco manga larga",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "serum para rostro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "loción de bolsillo",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "loción stitch",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2784",
    "cliente": "Imelda Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/08/2026 01:40 AM",
    "itemsCount": 2,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "zacola con cuadros",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "vestido negro",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2783",
    "cliente": "Mónica prima de RC",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/08/2026 01:15 AM",
    "itemsCount": 6,
    "subtotal": 361.61,
    "iva": 43.39,
    "total": 405.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pantalones casuales de mujer, de corte ajustado, cómodos y versátiles",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "blusa blanca manga larga con zipper",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "SHEIN EZwear Camiseta de punto de mujeres con cuello redondo, teñida a la técnica Tie-Dye con parches de diferentes telas.",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "pantalón blanco acampanado con botones negros",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "lámpara stitch",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 0.0
      },
      {
        "nombre": "sheglam hair",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2782",
    "cliente": "Martita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 06:48 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "XB1008",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2781",
    "cliente": "Angélica Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 06:26 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "revitalizador de cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2780",
    "cliente": "Jaqui amiga de Maritza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 06:23 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "iluminador",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2779",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 06:12 PM",
    "itemsCount": 2,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "955",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 50.0
      },
      {
        "nombre": "XB1479C",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2778",
    "cliente": "Monica Amiga de Wendy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 06:10 PM",
    "itemsCount": 1,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "JIT17431829",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2777",
    "cliente": "Sara Córdova",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 06:08 PM",
    "itemsCount": 1,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "601",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2775",
    "cliente": "Paola Rivera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 06:01 PM",
    "itemsCount": 3,
    "subtotal": 196.43,
    "iva": 23.57,
    "total": 220.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "4042",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "blusa blanca",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "12 piezas DUNUF Regalo exquisito y amigable para principiantes, con vaso mate resistente al agua y f",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2774",
    "cliente": "Fabiola Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 05:46 PM",
    "itemsCount": 2,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pegamento para pestañas",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "XB1008",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2773",
    "cliente": "Ana Carin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 05:44 PM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "XB0877",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "XB0871",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2772",
    "cliente": "Lu Curan",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 05:42 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "JIT24651620",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2771",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 05:37 PM",
    "itemsCount": 1,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "JIT25419554",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2770",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 01:56 PM",
    "itemsCount": 3,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "XB1217",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "vestido corto rosado",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "428",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2769",
    "cliente": "Zoilita Osoy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 01:52 PM",
    "itemsCount": 2,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "JIT25333890",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 50.0
      },
      {
        "nombre": "26556966",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2768",
    "cliente": "Rocsana / Mayra",
    "nit": "C F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 01:43 PM",
    "itemsCount": 4,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "face wash",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 25.0
      },
      {
        "nombre": "jabón para rostro",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 25.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 15.0
      },
      {
        "nombre": "body wash mariposa mágica",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2767",
    "cliente": "Kimberly Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 01:30 PM",
    "itemsCount": 12,
    "subtotal": 433.04,
    "iva": 51.96,
    "total": 485.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa celeste",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "vestido negro corto manga larga",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "zacola",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "crosbody",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "9742",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "pantunflas W-11",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "jabón para rostro",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería 03",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería J4",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "mono",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "XB0890",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2766",
    "cliente": "Wendy Alvarez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 01:20 PM",
    "itemsCount": 38,
    "subtotal": 1428.57,
    "iva": 171.43,
    "total": 1600.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "6553",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "1330",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "JIT 1517",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "2065",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "crosbody",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "215",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "top forever",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "traje de oso",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "xb0871",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "JIT1539",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "SHEIN Camisón casual de mujer con tirantes finos y estampado de corazones en todo el diseño, bata de",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "JIT 6022",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "BH25",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "INAWLY Blusa casual de mujer a rayas con cuello, otoño",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Chaleco de mujer de cuello polo con estampado de rayas y bordado, para uso casual, deportivo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "traje",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "corrector",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 3,
        "precioUnitario": 25.0,
        "subtotal": 75.0
      },
      {
        "nombre": "cera para cejas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 2,
        "precioUnitario": 30.0,
        "subtotal": 60.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "gloss",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      },
      {
        "nombre": "joyería 01",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "joyería 02",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "joyería 03",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "joyería J4",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "joyería 05",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "JIT17242756",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "BH26234626",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2763",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:38 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "multi purpose bracket",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2762",
    "cliente": "Yanira Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:17 PM",
    "itemsCount": 2,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "black beige color",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "pantuflas cocodrilo",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2761",
    "cliente": "Delmy hermana de Ivón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:05 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Xb0871",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2760",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:02 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "fragancia para el cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2759",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 11:21 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "fragancia para el cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2758",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 11:20 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "fragancia para el cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2757",
    "cliente": "Ana Pérez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 11:13 AM",
    "itemsCount": 5,
    "subtotal": 316.96,
    "iva": 38.04,
    "total": 355.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "XB1327C",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "XB0945",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "BH25733877",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "4540",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "masajeador",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2756",
    "cliente": "Flor amiga de Katerin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 11:08 AM",
    "itemsCount": 2,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "561",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "BH18036468",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2755",
    "cliente": "Diana por los taxis",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 10:55 AM",
    "itemsCount": 1,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pantunflas W-11",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2754",
    "cliente": "Úrsula C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 04:31 AM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Precision Sculpt Dúo de contorno líquido-Brown Sugar",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Delineador De Labios Suave Glam De Los AñOs 90 Y DúO De Labios: Set De Labios Moody Taupe Ma",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM TríO De Sombras De Ojos LíQuidas Starry Wish-North Star-Juego De 3 Sombras De Ojos Con Acaba",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2753",
    "cliente": "Paola Rivera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 04:24 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "12 piezas DUNUF Regalo exquisito y amigable para principiantes, con vaso mate resistente al agua y f",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2752",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 04:15 AM",
    "itemsCount": 12,
    "subtotal": 500.0,
    "iva": 60.0,
    "total": 560.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Cheeky Color Jam- Sunset 6 Tonos Rubor En Crema Multiusos Crema Para Labios Rubor Altamente",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "sheglam hair",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEIN MOD Pantalones con pierna recta sólida, bolsillo con parche azul",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "blusa animal print",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "body deportivo",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "parche para acné",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "masajeador",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "pin tortuga",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "rubor",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "Desmaquillante de arroz",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 35.0
      },
      {
        "nombre": "joyería 02",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2751",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 04:13 AM",
    "itemsCount": 4,
    "subtotal": 357.14,
    "iva": 42.86,
    "total": 400.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM TríO De Sombras De Ojos LíQuidas Starry Wish-North Star-Juego De 3 Sombras De Ojos Con Acaba",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Glitter Whip Lápiz Labial Líquido-Antique",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Iluminador Corporal Sunkissed-Iluminador LíQuido Medusa Iluminador LíQuido De Larga DuracióN",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "CATWOMAN™ | SHEGLAM I am not a Kitten Tinte de Labios Despegable-High Stakes",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2750",
    "cliente": "Blanca comercial Eden",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 03:45 AM",
    "itemsCount": 18,
    "subtotal": 566.96,
    "iva": 68.04,
    "total": 635.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 4 piezas de camisón de lunares sexy para mujer, lencería de malla transparente, camisón",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "6 piezas Lápiz de sombra de ojos resaltador con brillo y purpurina, barra de sombra de ojos de doble",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "delineadores",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "vestido formal de fiesta",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "top palo rosa",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "vestido corto color negro",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "Maija 2026 Primavera & Verano Blusa de Manga Larga Ajustada con Cuello Alto y Calados, Adecuada para Bodas",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "rubor mágico",
        "cantidad": 3,
        "precioUnitario": 10.0,
        "subtotal": 30.0
      },
      {
        "nombre": "labial mega shine",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "joyería 03",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      },
      {
        "nombre": "joyería 02",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "lápiz labial color chocolate",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "jabón intimo de limpieza",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "indian collection RLPB257",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2749",
    "cliente": "Liseth Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 03:44 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "4piezas/Set Ropa con Estampado de Dinosaurio para Niño Joven, Ropa Infantil Linda, Conjunto Combinad",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2748",
    "cliente": "Jacky Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 03:29 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "2 piezas de ropa deportiva personalizada de manga larga de secado rápido para entrenamiento deportiv",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2747",
    "cliente": "Tere C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 03:23 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de body y vestido de malla con estampado de abeja energética para bebé niña de verano | Som",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2746",
    "cliente": "María Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 03:17 AM",
    "itemsCount": 2,
    "subtotal": 299.11,
    "iva": 35.89,
    "total": 335.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de pelele sin mangas con volantes y estampado de fresas, decorado con lazo, de doble capa d",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "HIMLAND Camisa de manga corta de unicolor de un solo pecho casual y versátil para uso diario para ho",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2745",
    "cliente": "Fernanda fam katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 01:21 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Set de 2 piezas: Decoración de hebilla de metal para atuendo casual urbano, vibra juvenil,",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2744",
    "cliente": "Adry Rosales",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 01:11 AM",
    "itemsCount": 11,
    "subtotal": 1227.68,
    "iva": 147.32,
    "total": 1375.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Blusa blanca ajustada y sexy con pliegues en la cintura, parches de malla, elegante para va",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Set de 3 gafas de moda de verano, montura de metal ovalada retro decorativa, accesorio unisex para f",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta corta elegante para mujer con cuello drapeado minimalista, plisado, decoración de",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Nueva camiseta de manga corta asimétrica y versátil de cintura, estilo elegante de lujo fra",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Blusa elegante de mujer con cuello redondo, decoración de perlas y mangas largas, de tela d",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Mori Grove Mori Grove Camiseta casual de mujer con parches de encaje y rayas, de manga corta y hombr",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Conjunto de 2 piezas para niños preadolescentes: Camiseta de manga corta de cuello redondo hol",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEIN Elenzya Top de camisola de encaje negro con escote en V profundo, tirantes finos retro, estilo",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEGLAM [3Pcs] Clean Girl Makeup Set Rubor, Iluminador y Gloss",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEGLAM [2Pcs] Wild Brows On Demand Set Lápiz y Gel para Cejas",
        "cantidad": 1,
        "precioUnitario": 145.0,
        "subtotal": 145.0
      },
      {
        "nombre": "SHEGLAM Dúo de Colorete Líquido y Bronceador Mate - Love Cake & Golden Sun",
        "cantidad": 1,
        "precioUnitario": 145.0,
        "subtotal": 145.0
      }
    ]
  },
  {
    "id": "FAC-2743",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 01:06 AM",
    "itemsCount": 1,
    "subtotal": 156.25,
    "iva": 18.75,
    "total": 175.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pantalones de cintura alta y pierna ancha para ejercicio al aire libre, leggings deportivos casuales",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      }
    ]
  },
  {
    "id": "FAC-2742",
    "cliente": "Alejandra amiga Yesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 01:01 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM [2 pcs] Lashlighter Up & Out Set de Máscara y Rizador de Pestañas",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2741",
    "cliente": "Graciela García",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:50 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Camera On Spray Fijador Difuminador Resistente al Agua Marca Belleza Maquillaje Maquullaje C",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2740",
    "cliente": "Anthony Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:36 AM",
    "itemsCount": 1,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Sudadera de manga larga de ajuste holgado con cuello de media cremallera, unicolor y ligera,",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2739",
    "cliente": "Elva Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:33 AM",
    "itemsCount": 3,
    "subtotal": 388.39,
    "iva": 46.61,
    "total": 435.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Tall Jeans ajustados de cintura elástica de unicolor para mujer, entrenamiento, negro, verano,",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "INAWLY Camiseta casual de mujer con cuello redondo y manga corta con estampado floral",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "INAWLY Camiseta de manga corta con cuello redondo de uso casual con estampado floral para mujer, de",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2738",
    "cliente": "Karina López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:32 AM",
    "itemsCount": 3,
    "subtotal": 245.54,
    "iva": 29.46,
    "total": 275.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Manfinity VCAY Camisa blanca de manga corta casual con botones delanteros y tejido liso para hombre,",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Conjunto de 4 piezas de camisón de lunares sexy para mujer, lencería de malla transparente, camisón",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "bolso tipo maleta",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2737",
    "cliente": "Ash Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:28 AM",
    "itemsCount": 3,
    "subtotal": 366.07,
    "iva": 43.93,
    "total": 410.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Chaqueta casual de mujer de unicolor, de manga larga, con cuello con cremallera y de piel sintética",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "sheglam hair",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "XB1540",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-2736",
    "cliente": "Iraida Contreras",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:15 AM",
    "itemsCount": 5,
    "subtotal": 281.25,
    "iva": 33.75,
    "total": 315.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Nueva camiseta de manga corta asimétrica y versátil de cintura, estilo elegante de lujo fra",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Top sin mangas con cuello redondo y ribete en contraste negro y blanco, blusa casual de ver",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Desmaquillante de arroz",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "fragancia para el cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2735",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:12 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Blusa de mujer de cuello redondo a rayas, versátil para uso diario, sin mangas, últimas en",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2734",
    "cliente": "Lupita Salón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:10 AM",
    "itemsCount": 2,
    "subtotal": 303.57,
    "iva": 36.43,
    "total": 340.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "GlowEve Blazer sin mangas de alta calidad para mujer, profesional para ir al trabajo",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Easowa Falda larga elegante de textura caqui para mujer, para otoño/invierno",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2733",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:05 AM",
    "itemsCount": 8,
    "subtotal": 687.5,
    "iva": 82.5,
    "total": 770.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "UREREM Conjunto de 2 piezas de chaleco y falda de rayas con contraste de color, casual, elegante y c",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Manfinity Mode Camisa de manga corta casual de calle para hombre, verano, formal, ceremonia",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Everyssa Vestido midi con hombros descubiertos, abertura lateral y estampado floral para mujer",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEIN MOD Vestido mini de línea A con cintura fruncida y hombros atados con estampado floral diminut",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "BH27979639",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "JIT19240955",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "BH26328503",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "top de cuero color  negro",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2732",
    "cliente": "Weysi",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:04 AM",
    "itemsCount": 5,
    "subtotal": 415.18,
    "iva": 49.82,
    "total": 465.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Camiseta de mujer casual de cuello redondo acanalada metálica blanca con fruncido, top de v",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Nueva camiseta de manga corta asimétrica y versátil de cintura, estilo elegante de lujo fra",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Blusa elegante de mujer con cuello redondo, decoración de perlas y mangas largas, de tela d",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta corta elegante para mujer con cuello drapeado minimalista, plisado, decoración de",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "XB1008",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2731",
    "cliente": "Fabiola Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/08/2026 12:01 AM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN PariChic Conjunto de 2 piezas de camiseta de manga corta y pantalones cortos con estampado de",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2730",
    "cliente": "María Fernanda",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/08/2026 11:58 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "GlowEve Camiseta de manga corta ajustada con cuello en V, decoración de lazo y dobladillo con volant",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta de punto de cuello redondo elegante, camiseta de punto de moda minimalista, nuevo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2729",
    "cliente": "Luci Grajeda",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/08/2026 11:53 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Blusa blanca ajustada y sexy con pliegues en la cintura, parches de malla, elegante para va",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta de mujer casual de cuello redondo acanalada metálica blanca con fruncido, top de v",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2728",
    "cliente": "Jesica Paola",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/08/2026 11:49 PM",
    "itemsCount": 3,
    "subtotal": 316.96,
    "iva": 38.04,
    "total": 355.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Paleta Afterglow De 15 Colores Con Brillo Dorado Mate, Sombras De Ojos En Tonos Neutros Y Fr",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM Air Plush Crema para Labios y Mejillas-029 Flit & Float Colorete Líquido y Labial Multiuso",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Hideaway Corrector de Cobertura Total-Pink Corrector de Color Iluminador y Resaltador",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2727",
    "cliente": "Damaris Menendez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/08/2026 11:38 PM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de top de manga corta con cuello redondo y pantalones con estampado de dibujos animados par",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2726",
    "cliente": "Mitzi Del Aguila",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/08/2026 04:26 PM",
    "itemsCount": 3,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sw2211026801866216",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "26037757",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "355",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2725",
    "cliente": "Mitzi Del Aguila",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/08/2026 04:24 PM",
    "itemsCount": 3,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sw2211026801866216",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "26037757",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "355",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2724",
    "cliente": "Nancy Sanchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/08/2026 12:40 PM",
    "itemsCount": 3,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Indian collection NRD61",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 30.0
      },
      {
        "nombre": "indian collection NRR207",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 30.0
      },
      {
        "nombre": "perfume de mujer FTS96",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2723",
    "cliente": "Darlyn Osoy",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "11/08/2026 08:23 PM",
    "itemsCount": 10,
    "subtotal": 531.25,
    "iva": 63.75,
    "total": 595.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "XB1634",
        "cantidad": 1,
        "precioUnitario": 70.0,
        "subtotal": 70.0
      },
      {
        "nombre": "4664",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "JIT15676628",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "1143",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "XQT440",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "18358624",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "BH22421003",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "TOM & JERRY X SHEIN GraphicGems Set de 2 piezas de camiseta y pantalones cortos con estampado de dib",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "SHEIN Conjunto de traje de baño de una pieza con estampado de mariposa y falda de malla para niña jo",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "nombre": "21960633",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2722",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "06/08/2026 11:18 PM",
    "itemsCount": 4,
    "subtotal": 160.71,
    "iva": 19.29,
    "total": 180.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "traje pantalon y blusa color negro",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "SHEIN PETITE Camiseta de manga corta para , de verano, sexy y chic, para salir de noche, con cuello asimétrico y elementos metálicos, ajuste petite, top casual ajustado",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "perfume",
        "cantidad": 2,
        "precioUnitario": 30.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2721",
    "cliente": "Glendy esposa Erick",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "06/08/2026 02:32 PM",
    "itemsCount": 1,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "25986454",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2720",
    "cliente": "Andrea amiga Baneza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "02/08/2026 05:08 AM",
    "itemsCount": 2,
    "subtotal": 227.68,
    "iva": 27.32,
    "total": 255.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "pedido de live",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2719",
    "cliente": "Irene C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "02/08/2026 05:03 AM",
    "itemsCount": 2,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "bolsita térmica stitch",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2718",
    "cliente": "Flor amiga de Katerin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "02/08/2026 04:40 AM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pedido de live",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "brochas",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2717",
    "cliente": "Esperanza C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "02/08/2026 04:35 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "máscara de pestañas",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2716",
    "cliente": "Kimberly Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "01/08/2026 02:06 AM",
    "itemsCount": 3,
    "subtotal": 107.14,
    "iva": 12.86,
    "total": 120.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "perfume de niño",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "Kim live 1",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2715",
    "cliente": "Adry Rosales",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 09:25 PM",
    "itemsCount": 2,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "máscara para cabello",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "pantuflas cocodrilo",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2714",
    "cliente": "Ivón C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 09:12 PM",
    "itemsCount": 3,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "perfume de niño",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "audífonos color rosa",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "mascarilla capilar 1000 ml",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2713",
    "cliente": "Valery Blanco",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 09:05 PM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Camiseta de manga corta con estampado de corazón de leopardo, camisetas informales de verano c",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2712",
    "cliente": "Sofía Gonzalez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:59 PM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "THE POWERPUFF GIRLS X SHEIN GraphicGems Vestido holgado de línea A con estampado de dibujos animados",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2711",
    "cliente": "Fernanda hija de Ana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:36 PM",
    "itemsCount": 1,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pestañas DIY lash extensión kit",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2710",
    "cliente": "Kenia esposa Adin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:31 PM",
    "itemsCount": 1,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Rovax Camiseta de manga corta de cuello redondo con estampado de animales, corazones y letras, de es",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-2708",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:27 PM",
    "itemsCount": 2,
    "subtotal": 199.11,
    "iva": 23.89,
    "total": 223.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 2 piezas SANRIO Hello Kitty (Bolsa de viaje con ruedas/Bolsa de cosméticos); Bolsa de vi",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "pedido live",
        "cantidad": 1,
        "precioUnitario": 73.0,
        "subtotal": 73.0
      }
    ]
  },
  {
    "id": "FAC-2707",
    "cliente": "Iris Burgos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:25 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Aofeiqike 6 piezas de ropa interior de mujer de seda de hielo sin costuras, bragas triangulares de c",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2706",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:23 PM",
    "itemsCount": 2,
    "subtotal": 245.54,
    "iva": 29.46,
    "total": 275.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Tropiscape Nuevas sandalias tipo chanclas de mujer de color marrón chocolate para primavera/verano,",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Conjunto de 2 piezas SANRIO Hello Kitty (Bolsa de viaje con ruedas/Bolsa de cosméticos); Bolsa de vi",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2705",
    "cliente": "Yamali C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:29 PM",
    "itemsCount": 3,
    "subtotal": 116.07,
    "iva": 13.93,
    "total": 130.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "taza donald",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "termo 800 ML",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "pedido live",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2704",
    "cliente": "Kyara Santa Barbara",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:06 PM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Camiseta casual de mujer de cuello redondo con parches, camiseta efecto denim, camiseta a r",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2703",
    "cliente": "Silvia Roldán",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:56 PM",
    "itemsCount": 2,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Lashlighter Up & Out Máscara de pestañas Marca Belleza Maquillaje Maquullaje Cosmética para",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Lashlighter Tratamiento de pestañas de fácil eliminación Marca Belleza Maquillaje Maquullaje",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2702",
    "cliente": "Tania Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:54 PM",
    "itemsCount": 3,
    "subtotal": 174.11,
    "iva": 20.89,
    "total": 195.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cartera rectangular",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "audífonos color rosa",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "pestañas",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2701",
    "cliente": "Monica Barillas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:49 PM",
    "itemsCount": 5,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "face wash",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "ganchos tipo hawaianos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "serum para rostro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "MC pedido live",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2699",
    "cliente": "Karina López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:44 PM",
    "itemsCount": 3,
    "subtotal": 232.14,
    "iva": 27.86,
    "total": 260.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "audífonos color rosa",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "happy Forever MT120",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "Conjunto de 2 piezas SANRIO Hello Kitty (Bolsa de viaje con ruedas/Bolsa de cosméticos); Bolsa de vi",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2698",
    "cliente": "Vicky C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:43 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2697",
    "cliente": "Fabiola Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:41 PM",
    "itemsCount": 6,
    "subtotal": 174.11,
    "iva": 20.89,
    "total": 195.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "polvo de hada",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "perfume de niño",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "perfume de niño",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "loción de bolsillo",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "lápiz labial color chocolate",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "pestañas",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2696",
    "cliente": "Jenifer Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:36 PM",
    "itemsCount": 2,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de 3 piezas para bebé niña: sudadera con capucha estampada con lazo en estilo casual americ",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "exfoliante de sal y azúcar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2695",
    "cliente": "Merlín Barillas",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:42 AM",
    "itemsCount": 6,
    "subtotal": 285.71,
    "iva": 34.29,
    "total": 320.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 6 piezas de botellas de spray de niebla, adecuado para maquillaje, peinado, juego de peines,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "aretes dorados",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "exfoliante de sal y azúcar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "exfoliante corporal body sugar scrub vitamina C",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "exfoliante body sugar scrub",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "kit skin care",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2694",
    "cliente": "Zoilita Osoy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:32 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "fragancia para el cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2693",
    "cliente": "Rocsana / Mayra",
    "nit": "C F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:31 AM",
    "itemsCount": 2,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "cepillo de dientes eléctrico",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2692",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:28 AM",
    "itemsCount": 2,
    "subtotal": 223.21,
    "iva": 26.79,
    "total": 250.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pegamento para pestañas",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "Carol pedido 1",
        "cantidad": 1,
        "precioUnitario": 240.0,
        "subtotal": 240.0
      }
    ]
  },
  {
    "id": "FAC-2691",
    "cliente": "Wendy salón",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:24 AM",
    "itemsCount": 2,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2690",
    "cliente": "Sandra Duarte",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:23 AM",
    "itemsCount": 4,
    "subtotal": 160.71,
    "iva": 19.29,
    "total": 180.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "indian collection MJD134",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "indian collection NRR207",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "cartera vertical",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "pedido de live",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2689",
    "cliente": "Astrid Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:22 AM",
    "itemsCount": 3,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "perfume de bolsillo",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "loción de bolsillo",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2688",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:18 AM",
    "itemsCount": 2,
    "subtotal": 142.86,
    "iva": 17.14,
    "total": 160.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "fragancia para el cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "bolso tipo maleta",
        "cantidad": 1,
        "precioUnitario": 145.0,
        "subtotal": 145.0
      }
    ]
  },
  {
    "id": "FAC-2687",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:14 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "jabón blanqueador",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2686",
    "cliente": "Abigail U",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:04 AM",
    "itemsCount": 2,
    "subtotal": 116.07,
    "iva": 13.93,
    "total": 130.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "audífonos color rosa",
        "cantidad": 2,
        "precioUnitario": 65.0,
        "subtotal": 130.0
      }
    ]
  },
  {
    "id": "FAC-2685",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 08:02 AM",
    "itemsCount": 2,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolso tipo maleta",
        "cantidad": 1,
        "precioUnitario": 145.0,
        "subtotal": 145.0
      },
      {
        "nombre": "ganchos tipo hawaianos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2684",
    "cliente": "Jessica C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:56 AM",
    "itemsCount": 2,
    "subtotal": 107.14,
    "iva": 12.86,
    "total": 120.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa cangurera",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      },
      {
        "nombre": "pedido live 1",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2683",
    "cliente": "Glendy esposa Erick",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:46 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa cangurera",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2682",
    "cliente": "Anita González",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:33 AM",
    "itemsCount": 4,
    "subtotal": 151.79,
    "iva": 18.21,
    "total": 170.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "audífonos color rosa",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "tasa cerámica",
        "cantidad": 3,
        "precioUnitario": 35.0,
        "subtotal": 105.0
      }
    ]
  },
  {
    "id": "FAC-2681",
    "cliente": "Rosy C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:31 AM",
    "itemsCount": 2,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body wash mariposa mágica",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "body wash nube soñador",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2680",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:29 AM",
    "itemsCount": 3,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "revitalizador de cabello",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2679",
    "cliente": "Masiel C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:27 AM",
    "itemsCount": 5,
    "subtotal": 174.11,
    "iva": 20.89,
    "total": 195.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "indian collection RLPB257",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "perfume de hombre LCB256",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "jabón de arroz",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2678",
    "cliente": "Cintia Rodriguez, hermana de Jeni Waleska",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:19 AM",
    "itemsCount": 4,
    "subtotal": 147.32,
    "iva": 17.68,
    "total": 165.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "cepillo de dientes eléctrico",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "audífonos color rosa",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2676",
    "cliente": "señora Sara",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:16 AM",
    "itemsCount": 2,
    "subtotal": 191.96,
    "iva": 23.04,
    "total": 215.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lápiz labial color chocolate",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "señora Sara pedido 1",
        "cantidad": 1,
        "precioUnitario": 205.0,
        "subtotal": 205.0
      }
    ]
  },
  {
    "id": "FAC-2675",
    "cliente": "Damaris clinica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:11 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2674",
    "cliente": "Yeimi Rodríguez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:10 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "revitalizador de cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2673",
    "cliente": "Jazmin referida de Astrid",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:08 AM",
    "itemsCount": 4,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para rostro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "indian collection NRR207",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2672",
    "cliente": "Tere C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 07:05 AM",
    "itemsCount": 2,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "loción de bolsillo",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "splash",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2671",
    "cliente": "Diana por los taxis",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:40 AM",
    "itemsCount": 5,
    "subtotal": 316.96,
    "iva": 38.04,
    "total": 355.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "audífonos color rosa",
        "cantidad": 2,
        "precioUnitario": 65.0,
        "subtotal": 130.0
      },
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "bolsa cangurera",
        "cantidad": 2,
        "precioUnitario": 95.0,
        "subtotal": 190.0
      }
    ]
  },
  {
    "id": "FAC-2668",
    "cliente": "Ana Pérez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:33 AM",
    "itemsCount": 6,
    "subtotal": 169.64,
    "iva": 20.36,
    "total": 190.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      },
      {
        "nombre": "aceite mantequilla de coca",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "jabón para rostro",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "duo splash y crema",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2667",
    "cliente": "Ana Carin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:30 AM",
    "itemsCount": 4,
    "subtotal": 196.43,
    "iva": 23.57,
    "total": 220.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "shampoo cabello liso",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "delineadores",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "joyería",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "pedido live",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2666",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:26 AM",
    "itemsCount": 2,
    "subtotal": 147.32,
    "iva": 17.68,
    "total": 165.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolso tipo maleta",
        "cantidad": 1,
        "precioUnitario": 145.0,
        "subtotal": 145.0
      },
      {
        "nombre": "ganchos tipo hawaianos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2665",
    "cliente": "Weysi",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:22 AM",
    "itemsCount": 6,
    "subtotal": 142.86,
    "iva": 17.14,
    "total": 160.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 2,
        "precioUnitario": 30.0,
        "subtotal": 60.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 3,
        "precioUnitario": 20.0,
        "subtotal": 60.0
      },
      {
        "nombre": "splash",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2664",
    "cliente": "Angélica Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:13 AM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "revitalizador de cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "pedido live",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2663",
    "cliente": "Wendy amiga de Tania",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:11 AM",
    "itemsCount": 6,
    "subtotal": 263.39,
    "iva": 31.61,
    "total": 295.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "audífonos color rosa",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "tasa cerámica",
        "cantidad": 3,
        "precioUnitario": 35.0,
        "subtotal": 105.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "pedido live",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2661",
    "cliente": "Fernanda fam katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:08 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "polvo de hada",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2660",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 06:03 AM",
    "itemsCount": 3,
    "subtotal": 120.54,
    "iva": 14.46,
    "total": 135.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "audífonos color rosa",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "taza Donald",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      }
    ]
  },
  {
    "id": "FAC-2659",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:58 AM",
    "itemsCount": 3,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cepillo de dientes eléctrico",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "pedido live",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-2658",
    "cliente": "Alejandra González",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:54 AM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2657",
    "cliente": "Lili Ramírez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:52 AM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2656",
    "cliente": "Jaqui amiga de Maritza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:52 AM",
    "itemsCount": 2,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "audífonos color rosa",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2655",
    "cliente": "Marlen Ramírez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:44 AM",
    "itemsCount": 2,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cepillo de dientes eléctrico",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "perfume para niña",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2654",
    "cliente": "Jesica Galindo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:44 AM",
    "itemsCount": 4,
    "subtotal": 187.5,
    "iva": 22.5,
    "total": 210.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cepillo de dientes eléctrico",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "J G pedido live",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      }
    ]
  },
  {
    "id": "FAC-2653",
    "cliente": "Aury Salón San José",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:42 AM",
    "itemsCount": 6,
    "subtotal": 187.5,
    "iva": 22.5,
    "total": 210.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tasa cerámica",
        "cantidad": 6,
        "precioUnitario": 35.0,
        "subtotal": 210.0
      }
    ]
  },
  {
    "id": "FAC-2651",
    "cliente": "Yanet Viñas",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:38 AM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cepillo de dientes eléctrico",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "indian collection NRR207",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2650",
    "cliente": "Jenifer campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:36 AM",
    "itemsCount": 2,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "exfoliante de sal y azúcar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2649",
    "cliente": "Meli Lainez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:33 AM",
    "itemsCount": 4,
    "subtotal": 129.46,
    "iva": 15.54,
    "total": 145.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "pestañas",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2648",
    "cliente": "Monica Amiga de Wendy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:31 AM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2647",
    "cliente": "Monica Amiga de Wendy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:30 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mascarilla de tratamiento capilar",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2646",
    "cliente": "María Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:29 AM",
    "itemsCount": 3,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "indian collection NRR207",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "indian collection RLPB257",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "pedido live",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2645",
    "cliente": "Mónica prima de RC",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:27 AM",
    "itemsCount": 7,
    "subtotal": 218.75,
    "iva": 26.25,
    "total": 245.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aceite mantequilla de coca",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "tasa cerámica",
        "cantidad": 6,
        "precioUnitario": 35.0,
        "subtotal": 210.0
      }
    ]
  },
  {
    "id": "FAC-2643",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:21 AM",
    "itemsCount": 2,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "aceite para masajes extracto de arroz",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2642",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 05:06 AM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "perfume de bolsillo",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2641",
    "cliente": "Majo De Jirón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:54 AM",
    "itemsCount": 2,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "perfume de hombre LCB256",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "exfoliante de sal y azúcar",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2640",
    "cliente": "Gabriela Colindres",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:53 AM",
    "itemsCount": 3,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "loción de bolsillo",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2638",
    "cliente": "Delmi hermana de Ibon",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:50 AM",
    "itemsCount": 3,
    "subtotal": 102.68,
    "iva": 12.32,
    "total": 115.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "champoo Silver blonde",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "perfume para niña",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2637",
    "cliente": "Gaby El campo por el proyecto",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:49 AM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2636",
    "cliente": "Gaby El campo por el proyecto",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:45 AM",
    "itemsCount": 2,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "champoo Silver blonde",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2634",
    "cliente": "Gaby El campo por el proyecto",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:41 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2633",
    "cliente": "Mandy campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:39 AM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "indian collection MJD134",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2632",
    "cliente": "Wendy Alvarez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:34 AM",
    "itemsCount": 5,
    "subtotal": 174.11,
    "iva": 20.89,
    "total": 195.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body wash nube soñador",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      },
      {
        "nombre": "body wash mariposa mágica",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "indian collection NRR207",
        "cantidad": 2,
        "precioUnitario": 50.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2631",
    "cliente": "Úrsula C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:30 AM",
    "itemsCount": 2,
    "subtotal": 200.89,
    "iva": 24.11,
    "total": 225.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "indian collection NRR207",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "Reloj inteligente unisex con llamadas inalámbricas y alertas de mensajes, podómetro, seguimiento de",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2630",
    "cliente": "Iraida Contreras",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:28 AM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Desmaquillante de arroz",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2629",
    "cliente": "hermana Valery",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:27 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "shampoo protección color",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2628",
    "cliente": "Lourdes clinica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:25 AM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "jabón para rostro",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2627",
    "cliente": "Vivi por la despensa",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:23 AM",
    "itemsCount": 5,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "revitalizador de cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "aceite para masajes extracto de arroz",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "happy Forever MT120",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2626",
    "cliente": "Ash Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:17 AM",
    "itemsCount": 2,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Desmaquillante de arroz",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "pedido live",
        "cantidad": 1,
        "precioUnitario": 80.0,
        "subtotal": 80.0
      }
    ]
  },
  {
    "id": "FAC-2625",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:16 AM",
    "itemsCount": 2,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "aceite para masajes extracto de arroz",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2624",
    "cliente": "Astrid Celeste",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:15 AM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante corporal body sugar scrub arroz",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2623",
    "cliente": "Janeth H. de Rocs",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:13 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2621",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:09 AM",
    "itemsCount": 3,
    "subtotal": 116.07,
    "iva": 13.93,
    "total": 130.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Celeste pedido 1",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "Celeste pedido 2",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2620",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:08 AM",
    "itemsCount": 6,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "jabón blanqueador",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      },
      {
        "nombre": "lámpara stitch con base",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "lámpara 3D stitch",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "loción de bolsillo stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2619",
    "cliente": "Marleny referida de Baneza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/07/2026 04:07 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "serum para ojos",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2618",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/07/2026 06:11 AM",
    "itemsCount": 6,
    "subtotal": 535.71,
    "iva": 64.29,
    "total": 600.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sudadero puma",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 pieza Bolso de hombro para mujer, bolso cruzado de moda casual, resistente al desgaste y . Con cre",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de mujer con cuello redondo, estampado digital y diseño de flor de perla con remache",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Blusa con estampado de flores, camiseta gráfica, ropa de verano, top para mujer, conjunto par",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "5 pares de calcetines invisibles de corte bajo con estampado gráfico de cerezas para mujeres, cómodo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "5 pares de calcetines tobilleros con estampado floral para mujer, calcetines invisibles cómodos, apt",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2617",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/07/2026 05:55 AM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Vestido elegante y romántico para mujer con cuello en V y línea A, hecho de tela de patchwor",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEGLAM HAIR Cepillo alisador térmico 3D elegante y elegante, cepillo alisador de cabello dorado de",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      }
    ]
  },
  {
    "id": "FAC-2616",
    "cliente": "Tere C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/07/2026 05:48 AM",
    "itemsCount": 5,
    "subtotal": 303.57,
    "iva": 36.43,
    "total": 340.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN BASICS Vestido casual de unicolor con cuello redondo, manga corta ajustada, para cena y citas,",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Set de 8 piezas de mini cajas de bento para condimentos, botellas para exprimir salsas, frascos para",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "loción de bolsillo",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "splash",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "pedido live",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2614",
    "cliente": "Fabiola Tahuite (funeraria)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/07/2026 05:31 AM",
    "itemsCount": 4,
    "subtotal": 379.46,
    "iva": 45.54,
    "total": 425.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "GlowEve CURVE Conjunto informal de verano de 2 piezas para mujer talla grande, top de cuello polo de",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      },
      {
        "nombre": "MAANGE Set de 1/13/16/18 piezas de brochas de maquillaje profesionales con caja de almacenamiento, q",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Pomada Boss Brow Waterproof-Crema para cejas marrón oscuro resistente al agua Maquillaje par",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "brochas",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2611",
    "cliente": "Ana Carin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/07/2026 05:12 AM",
    "itemsCount": 2,
    "subtotal": 343.75,
    "iva": 41.25,
    "total": 385.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "20 piezas Bolsas de regalo de plástico transparente reutilizables con asas y lazos, adecuadas para b",
        "cantidad": 1,
        "precioUnitario": 160.0,
        "subtotal": 160.0
      },
      {
        "nombre": "Souflis Souflis Camisa de manga corta para bebé con corbata de lazo y pantalones cortos de tirantes",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      }
    ]
  },
  {
    "id": "FAC-2610",
    "cliente": "Paola Rivera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/07/2026 05:03 AM",
    "itemsCount": 6,
    "subtotal": 625.0,
    "iva": 75.0,
    "total": 700.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Camiseta de manga corta de cuello redondo a rayas para uso diario y versátil de mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de mujer con cuello redondo, estampado digital y diseño de flor de perla con remache",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de cuello redondo con estampado de corazones y lunares para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de mujer de manga corta, cuello redondo y estampado de rayas, informal, para verano",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Nuevo bolso de hombro de moda clásico con estampado de payaso vintage, correa tejida, unicolor de ma",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "1 pieza Bolso bandolera de moda casual blanco estilo Y2K para mujer, bolso de hombro compacto de ver",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2609",
    "cliente": "Adry Rosales",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/07/2026 04:51 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Clasi Blusa negra casual de verano para mujer, blusa sexy con dobladillo asimétrico y encaje,",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2608",
    "cliente": "Yaneth C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/07/2026 04:42 AM",
    "itemsCount": 2,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SuriyaCove Blusas para mujer / Camisetas de moda de falso denim / Camisetas retro / Blusas de polo d",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEIN Elenzya Blusa con lazo plisado de satén sólido, elegante, con lunares en color albaricoque y d",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2607",
    "cliente": "Debora N.",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/07/2026 04:39 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias/chanclas deportivas de verano para mujer con decoración de rhinestones, punta abierta, pla",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2606",
    "cliente": "Andrea Agustin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/07/2026 07:31 AM",
    "itemsCount": 9,
    "subtotal": 1352.68,
    "iva": 162.32,
    "total": 1515.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SpongeBob SquarePants | SHEIN Set de 2 piezas de estilo casual: camiseta de tirantes y pantalones có",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SpongeBob SquarePants | SHEIN Conjunto de pijama de ajuste ceñido con camiseta de manga larga con gr",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SpongeBob SquarePants | SHEIN Conjunto de 2 piezas de sudadera de cuello redondo de manga larga y pa",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "SpongeBob SquarePants | SHEIN Conjunto de pijama de otoño/invierno con top de manga larga de cuello",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SpongeBob SquarePants | SHEIN Conjunto de pijama de top de tirantes y pantalones largos con estampad",
        "cantidad": 2,
        "precioUnitario": 165.0,
        "subtotal": 330.0
      },
      {
        "nombre": "Glamorique Kids Vestido de tul con mangas abullonadas de satén para niña, vestido de niña de las flo",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      },
      {
        "nombre": "SHEIN Elenzya Conjunto formal de mujer de rayas azul marino y blanco, diseño de cintura ceñida y lín",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      },
      {
        "nombre": "pulsera dorada",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      }
    ]
  },
  {
    "id": "FAC-2605",
    "cliente": "Paola La Salvadora",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/07/2026 05:56 AM",
    "itemsCount": 2,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 12 gafas de sol con forma de oso para niños, adecuadas para uso diario en verano, incluye est",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Selianne Blusa de verano para mujer, dobladillo asimétrico con adorno de encaje, top negro con decor",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2604",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "11/07/2026 05:47 AM",
    "itemsCount": 2,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Camiseta casual de mujer de cuello redondo y manga corta con decoración de lazo en la espald",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Gafas inteligentes inalámbricas multifunción con Bluetooth, con llamadas inalámbricas, reproducción",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2603",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "11/07/2026 12:22 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Blusa casual versátil de uso diario con cremallera delantera, en patchwork de rayas y bloques de col",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2602",
    "cliente": "Liria Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "11/07/2026 12:10 AM",
    "itemsCount": 7,
    "subtotal": 803.57,
    "iva": 96.43,
    "total": 900.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "EMERY ROSE Camiseta de manga corta con gráfico de letra \"PERFECTLY Imperfect\" para Mujeres",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Set de pijama informal de 3 piezas con diseño de corazón, compuesto por pantalones cortos y camiseta",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "MIYIN Billetera vintage de moda para mujer de gran capacidad y multifunción con bloqueo RFID, monede",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "Rovax Camiseta de manga corta de cuello redondo con estampado de animales, corazones y letras, de es",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Rovax Camiseta casual de mujer con cuello redondo y manga corta, con estampado floral, para el Día d",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Conjunto de pijama con camiseta de manga corta y pantalones cortos con estampado de perezoso",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Camiseta de manga corta con estampado de corazón de leopardo, camisetas informales de verano c",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2597",
    "cliente": "Elva Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 11:44 PM",
    "itemsCount": 9,
    "subtotal": 1008.93,
    "iva": 121.07,
    "total": 1130.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Tint Lock Tattoo Gel de Cejas Despegable-Auburn Marca Belleza Maquillaje Maquullaje Cosmétic",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "INAWLY Camiseta casual de mujer con cuello redondo y manga corta con estampado floral",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Clasi Blusa de mujer de manga enrollada sólida",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SuriyaCove Camiseta de manga corta con estampado de letras para mujer, blusas gráficas para mujer",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Tall Jeans ajustados y levantadores casuales para mujer",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "6 piezas Diademas de lujo con strass para mujeres, diseño elegante vintage, dientes antideslizantes,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Conjunto de pijamas de mujer PJS1 de seda de leche de 140g con impresión digital",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEGLAM True Stain Perfilador de Labios Líquido-008 Deep Caramel Lápiz Labial para Definir Labios Ti",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "DUSKBASE Camisón informal de mujer con estampado floral, cuello redondo y manga corta, ideal para el",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2596",
    "cliente": "Elva Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 11:38 PM",
    "itemsCount": 7,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Tint Lock Tattoo Gel de Cejas Despegable-Auburn Marca Belleza Maquillaje Maquullaje Cosmétic",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "INAWLY Camiseta casual de mujer con cuello redondo y manga corta con estampado floral",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Clasi Blusa de mujer de manga enrollada sólida",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SuriyaCove Camiseta de manga corta con estampado de letras para mujer, blusas gráficas para mujer",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Tall Jeans ajustados y levantadores casuales para mujer",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "6 piezas Diademas de lujo con strass para mujeres, diseño elegante vintage, dientes antideslizantes,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "DUSKBASE Camisón informal de mujer con estampado floral, cuello redondo y manga corta, ideal para el",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2595",
    "cliente": "Marcela hija de Sonia",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 11:13 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Top sin mangas ajustado con patchwork de colores para mujer, conjunto elegante de verano, uso",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2594",
    "cliente": "Paola Rivera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 11:10 PM",
    "itemsCount": 6,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Camiseta de mujer con cuello redondo, estampado digital y diseño de flor de perla con remache",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de cuello redondo con estampado de corazones y lunares para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de mujer de manga corta, cuello redondo y estampado de rayas, informal, para verano",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Sandalias de tacón grueso con punta redonda y correa para mujer, diapositivas de tacón bajo negro, p",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Nuevo bolso de hombro de moda clásico con estampado de payaso vintage, correa tejida, unicolor de ma",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "1 pieza Bolso bandolera de moda casual blanco estilo Y2K para mujer, bolso de hombro compacto de ver",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2593",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 11:03 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "5/10 pares de calcetines de barco con estampado floral para mujer, adecuados para todas las estacion",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2592",
    "cliente": "Iris Burgos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 11:02 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Camiseta de mujer con cuello redondo, estampado digital y diseño de flor de perla con remache",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2591",
    "cliente": "Karina tia de Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 11:00 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "12 piezas DUNUF Regalo exquisito y amigable para principiantes, con vaso mate resistente al agua y f",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "delineador de labios",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2590",
    "cliente": "Wendy Alvarez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 10:59 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "/4/5 Botellas de 40ml de Spray de Fragancia Brasileña, Diseñado para Refrescar el Aire Interior y Ex",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2589",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 10:57 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM [2 pcs]Lashlighter Up & Out Set de Máscara y Rizador de Pestañas Marca Belleza Maquillaje Ma",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2588",
    "cliente": "Cintia Rodriguez, hermana de Jeni Waleska",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 10:56 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM [2 pcs]Lashlighter Up & Out Set de Máscara y Removedor",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2587",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 10:54 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM [2 pcs]Lashlighter Up & Out Set de Máscara y Rizador de Pestañas Marca Belleza Maquillaje Ma",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2586",
    "cliente": "Kimberly Marroquín",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 10:51 PM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "/4/5 Botellas de 40ml de Spray de Fragancia Brasileña, Diseñado para Refrescar el Aire Interior y Ex",
        "cantidad": 2,
        "precioUnitario": 100.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEGLAM [2 pcs]So Glassy Set de Lápiz Labial y Brillo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2585",
    "cliente": "Martita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 10:45 PM",
    "itemsCount": 4,
    "subtotal": 535.71,
    "iva": 64.29,
    "total": 600.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias de mujer de moda casual con correa, cómodas sandalias planas de punta abierta para la play",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Sandalias planas para mujer: Chanclas de verano antideslizantes, hechas de cuero brillante, diseño d",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Sandalias planas para mujer 2026 nuevo estilo de moda diseño simple de una tira con hebilla de metal",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Sandalias planas de punta cuadrada de unicolor para mujer, con decoración de lazo, elegantes y versá",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2584",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "10/07/2026 10:41 PM",
    "itemsCount": 7,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "NostaNoir Camiseta gráfica de mujer de manga corta con cuello redondo, de moda con estampado de cora",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 pieza Bolso de hombro para mujer, bolso cruzado de moda casual, resistente al desgaste y . Con cre",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta casual para mujer, gris, nuevo diseño de verano, cuello redondo, estampado de cereza",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Blusa con estampado de flores, camiseta gráfica, ropa de verano, top para mujer, conjunto par",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "5 pares de calcetines invisibles de corte bajo con estampado gráfico de cerezas para mujeres, cómodo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1/5/10 pares de calcetines invisibles de mujer con diseño de corazón y cereza de unicolor, transpira",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "5 pares de calcetines tobilleros con estampado floral para mujer, calcetines invisibles cómodos, apt",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2583",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "04/07/2026 04:44 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Venta de Artículos Varios",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2582",
    "cliente": "Izi Fabiola",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "02/07/2026 03:47 AM",
    "itemsCount": 7,
    "subtotal": 955.36,
    "iva": 114.64,
    "total": 1070.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SpongeBob SquarePants | SHEIN Bata de felpa con cintura ajustable y cara de dibujo animado bordada p",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Nick 90s | SHEIN Conjunto informal de camiseta de cuello redondo con estampado de dibujos animados d",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "GARFIELD | SHEIN Pelele cómodo con estampado de gato de ojos grandes y diseño adorable para bebé niñ",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "LOONEY TUNES X SHEIN GraphicGems Conjunto de 2 piezas de camiseta con estampado de dibujos animados",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SCOOBY-DOO X SHEIN Conjunto de 2 piezas para bebé niño compuesto por camiseta de manga corta con ray",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SCOOBY-DOO X SHEIN Set de 2 piezas para bebé niño con body de estampado de perro de dibujos animados",
        "cantidad": 1,
        "precioUnitario": 160.0,
        "subtotal": 160.0
      },
      {
        "nombre": "TOM & JERRY X SHEIN Conjunto de camiseta de manga corta con estampado de letras de dibujos animados",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      }
    ]
  },
  {
    "id": "FAC-2581",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 10:14 PM",
    "itemsCount": 6,
    "subtotal": 531.25,
    "iva": 63.75,
    "total": 595.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "blusa negra",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "suéter azul  con bolsas",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "nombre": "SANRIO 2 piezas Conjunto de pijama de mujer con Hello Kitty, conjunto de ropa de casa de shorts de v",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEIN Franclia Top tubo asimétrico casual de verano de mujer con parches de punto de unicolor y raya",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Camiseta elegante, parte superior de moda con estampado de perlas y lazos para el verano",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2580",
    "cliente": "Yaneth C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 09:51 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "2 piezas Conjunto de pijama de satén con estampado de letras para hombres, que incluye pantalones co",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2579",
    "cliente": "Estrella Facebook",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 09:45 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 par de sandalias planas con lazo para mujer, estilo de verano, chanclas de moda con punta abierta",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2578",
    "cliente": "María Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 09:38 PM",
    "itemsCount": 4,
    "subtotal": 406.25,
    "iva": 48.75,
    "total": 455.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de camiseta de manga corta y pantalones cortos con estampado de araña de dibujos animados,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 pieza Ropa para mascotas, Camisa Polo para perros y gatos, Rayas azules - Rayas rojas - Rayas blan",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "BATMAN X SHEIN 1 Set de Arnés y Correa para Mascotas con Estampado de Dibujos Animados, Múltiples Op",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "1 pieza Nuevo chaleco con capucha y arnés, adecuado para perros pequeños como el caniche, el bichón",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2577",
    "cliente": "Debora N.",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 09:04 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "BATMAN X SHEIN Conjunto de camiseta de manga corta de cuello redondo y pantalones cortos con estampa",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2576",
    "cliente": "Ana Carin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 06:09 AM",
    "itemsCount": 3,
    "subtotal": 361.61,
    "iva": 43.39,
    "total": 405.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "GraphicGems Set de 2 piezas de ropa casual de otoño/invierno para niñas jóvenes, adecuado para adole",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SANRIO 1 par de sandalias de verano para niños con punta cerrada, sandalias transpirables antidesliz",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "1 pieza Collar personalizado para perro, collar de moda ajustable adecuado para perros pequeños, med",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2575",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 05:39 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Selianne Camiseta de mujer con manga recogida, hombro oblicuo y lazo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2574",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 05:28 AM",
    "itemsCount": 3,
    "subtotal": 254.46,
    "iva": 30.54,
    "total": 285.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 2 piezas Conjunto casual y cómodo versátil para niños pequeños, camiseta de manga corta suave",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Blusa de verano con parte superior corta de bandeau con efecto retorcido y bajo con abertur",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Conjunto de pijama de camiseta de tirantes y pantalones cortos con volantes con estampado de c",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2573",
    "cliente": "Miriam C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 05:19 AM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Playful Pals Conjunto informal de 2 piezas para niños pequeños: camiseta de cuello redondo de",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Conjunto de camiseta de manga corta y pantalones cortos con estampado de dibujo animado de araña, có",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2572",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 05:06 AM",
    "itemsCount": 2,
    "subtotal": 200.89,
    "iva": 24.11,
    "total": 225.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Disney 1 pieza Camiseta de mujer de manga corta, camiseta con estampado gráfico de puntada, cuello r",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "EMERY ROSE Camiseta de mujer de manga corta con cuello redondo, estampado floral y de uso versátil",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2571",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 04:52 AM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Camiseta de manga corta con cuello redondo y estampado de oso de dibujos animados, de estilo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Top ajustado y sexy con decoración metálica hueca en los hombros, elegante para ir al traba",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2570",
    "cliente": "Adriana Monterroso",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 04:43 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Camiseta casual de mujer de cuello redondo con parches, camiseta efecto denim, camiseta a r",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2569",
    "cliente": "Damaris De La Cruz (tiendas max distelsa)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 04:39 AM",
    "itemsCount": 1,
    "subtotal": 142.86,
    "iva": 17.14,
    "total": 160.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "10 piezas Diademas anchas de estilo africano para mujeres, turbantes extra grandes, diademas deporti",
        "cantidad": 1,
        "precioUnitario": 160.0,
        "subtotal": 160.0
      }
    ]
  },
  {
    "id": "FAC-2568",
    "cliente": "Jenifer campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 04:32 AM",
    "itemsCount": 2,
    "subtotal": 107.14,
    "iva": 12.86,
    "total": 120.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Paquete de 5 bragas tipo tanga sin costuras cómodas y suaves a la piel con decoración de diamantes L",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Set de 2 piezas Camiseta de manga corta con estampado de rayas y pantalones cortos con estampado de",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2567",
    "cliente": "Gaby hermana Paola",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 04:20 AM",
    "itemsCount": 2,
    "subtotal": 214.29,
    "iva": 25.71,
    "total": 240.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Seduluxe 1 Pieza De Bragas De Encaje Triangular Para Mujer De Talla Grande, Paquete Individual",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Crystal Vow 2 piezas Conjunto de lencería sexy con bordado floral romántico y malla",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2566",
    "cliente": "Fernanda amiga Maritza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "30/06/2026 01:08 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Camiseta casual de mujer de cuello redondo con parches, camiseta efecto denim, camiseta a r",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2565",
    "cliente": "Liseth Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 08:09 AM",
    "itemsCount": 2,
    "subtotal": 200.89,
    "iva": 24.11,
    "total": 225.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Set de 2 piezas Camiseta de unicolor + Pantalones cortos casuales para niño pequeño, adecuado",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "dúo pulseras",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2564",
    "cliente": "Fabiola Tahuite (funeraria)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 08:01 AM",
    "itemsCount": 2,
    "subtotal": 223.21,
    "iva": 26.79,
    "total": 250.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Essnce Ropa de mujer talla grande, nueva moda de primavera y verano para fotografía callejera,",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "SANRIO 2 piezas Conjunto de pijama de mujer con Hello Kitty, conjunto de ropa de casa de shorts de v",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2563",
    "cliente": "Graciela García",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 07:55 AM",
    "itemsCount": 2,
    "subtotal": 401.79,
    "iva": 48.21,
    "total": 450.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Placas de identificación grabadas para mascotas, placa de identificación personalizada con cualquier",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM HAIR Rizador One Touch Airflow Styler Pro de 25 mm, color plata-púrpura, rizador automático",
        "cantidad": 1,
        "precioUnitario": 350.0,
        "subtotal": 350.0
      }
    ]
  },
  {
    "id": "FAC-2562",
    "cliente": "Paola La Salvadora",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 07:41 AM",
    "itemsCount": 5,
    "subtotal": 446.43,
    "iva": 53.57,
    "total": 500.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Camiseta de manga corta con cuello asimétrico y estampado de teñido anudado de moda para muj",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Vestido para niñas (pequeño), diseño clásico de cuello redondo, mangas con volantes que aportan dulz",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Vestido de verano casual, cómodo y lindo con rayas amarillas para niña, uso versátil para el día a d",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Selianne Chaleco casual de mujer con efecto de dos piezas y ribete de volantes, para volver al coleg",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Souflis Souflis Vestido de tul sin mangas azul claro para niña, vestido de princesa con decoración d",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2561",
    "cliente": "Astrid Celeste",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 07:31 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 2 piezas: Camiseta de manga corta suave con gráfico 88 y pantalones cortos deportivos rojos p",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2560",
    "cliente": "Blanca comercial Eden",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 07:23 AM",
    "itemsCount": 5,
    "subtotal": 339.29,
    "iva": 40.71,
    "total": 380.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Blusa elegante de mujer de hombros descubiertos, sin mangas, con escote ajustado y bordados,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "blusa azul con naranja número 23",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "Rafferiza Blusa negra con lunares estilo retro francés de nueva llegada para el verano, camiseta con",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Siren Gaze Camiseta de moda con diseño hueco, cuello asimétrico y mangas cortas para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "envio",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2559",
    "cliente": "Alejandra amiga De Katerin",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 06:41 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Qadelle Blusa de verano de mujer con cuello halter de 2 en 1 de punto, camiseta de manga corta con t",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2558",
    "cliente": "Fernanda fam katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 06:14 AM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias planas de punta cuadrada para mujer, con decoración de cadena y rhinestones, ligeras y cóm",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2557",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 06:07 AM",
    "itemsCount": 2,
    "subtotal": 214.29,
    "iva": 25.71,
    "total": 240.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SANRIO 2 piezas Conjunto de pijama de mujer con Hello Kitty, conjunto de ropa de casa de shorts de v",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SUPERMAN X SHEIN 1 Set de correas y correas de viaje para mascotas con estampado de patrones de dibu",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2556",
    "cliente": "Rocsana / Mayra",
    "nit": "C F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 05:55 AM",
    "itemsCount": 4,
    "subtotal": 553.57,
    "iva": 66.43,
    "total": 620.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias planas con decoración de lazo para mujer, de estilo casual y elegante, antideslizantes, ad",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Sandalias planas de dedo tipo chanclas de moda 2026 para mujer, con decoración metálica minimalista,",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "MICCOM Sandalias planas de cuero con punta cuadrada para mujer, talla grande, sexy, tipo slip-on, ve",
        "cantidad": 2,
        "precioUnitario": 155.0,
        "subtotal": 310.0
      }
    ]
  },
  {
    "id": "FAC-2555",
    "cliente": "Alejandra amiga Yesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 03:30 AM",
    "itemsCount": 4,
    "subtotal": 558.04,
    "iva": 66.96,
    "total": 625.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "OutZeal Pantalones cortos de gimnasia para mujer, pantalones cortos deportivos de unicolor para vera",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "OutZeal Top de gimnasio para mujer Camiseta deportiva de unicolor Verano Primavera Yoga Casual Toque",
        "cantidad": 1,
        "precioUnitario": 160.0,
        "subtotal": 160.0
      },
      {
        "nombre": "UONNOU Mono de ropa deportiva, mono elástico de mezcla de algodón con espalda cruzada, que levanta y",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "OutZeal Pantalones cortos deportivos para mujer, unicolor, para verano, primavera, fitness, ciclismo",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2554",
    "cliente": "Karina López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 03:17 AM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SANRIO 2 piezas Conjunto de pijama de mujer con Hello Kitty, conjunto de ropa de casa de shorts de v",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2553",
    "cliente": "Sabrina Menéndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 12:39 AM",
    "itemsCount": 2,
    "subtotal": 209.82,
    "iva": 25.18,
    "total": 235.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "ventas grupo",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "Bolsa deportiva y de fitness para mujeres, con compartimento para separar lo húmedo y lo seco, bolsa",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2552",
    "cliente": "Verónica Cuque",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 12:32 AM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Set de 2 piezas de pijama informal con camiseta de tirantes con volantes y pantalón corto con",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2551",
    "cliente": "Paola Rivera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "29/06/2026 12:28 AM",
    "itemsCount": 7,
    "subtotal": 919.64,
    "iva": 110.36,
    "total": 1030.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 3 camisetas de mujer de manga corta, cuello redondo, unicolor, con detalle de volantes y esta",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      },
      {
        "nombre": "INAWLY Camiseta casual de mujer con diseño de manga raglán de color contrastante y cremallera",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de mujer de manga corta con cuello redondo y estampado de rayas casual",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Resyla Camiseta de mujer de manga corta y cuello redondo a rayas, casual de verano",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Resyla Camiseta de manga corta de cuello redondo a rayas, versátil y casual para uso diario de mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta casual de mujer de cuello redondo con parches, camiseta efecto denim, camiseta a r",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "DareSee Sandalias de verano 2025 nuevas, de moda y versátiles para mujeres, tallas del 36 al 43 plus",
        "cantidad": 1,
        "precioUnitario": 255.0,
        "subtotal": 255.0
      }
    ]
  },
  {
    "id": "FAC-2550",
    "cliente": "Melissa Central Depot",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "28/06/2026 10:44 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Soft Haze Lip Blur-Just Smooches De 6 Colores, Resistente Al Agua, Tint",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Resistente Al Agua Soft Haze Lip Blur-Text Me De 6 Colores, Tinte Labia",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2549",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "28/06/2026 10:27 PM",
    "itemsCount": 11,
    "subtotal": 1276.79,
    "iva": 153.21,
    "total": 1430.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pulsera con diseño de flor",
        "cantidad": 1,
        "precioUnitario": 65.0,
        "subtotal": 65.0
      },
      {
        "nombre": "CMAYOME 640 piezas Kit de extensión de pestañas con rizo D, Set de extensión de pestañas de gran cap",
        "cantidad": 3,
        "precioUnitario": 125.0,
        "subtotal": 375.0
      },
      {
        "nombre": "Disney Esta camiseta blanca para mujer presenta un diseño de hombros anchos, cuello redondo y mangas",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Camiseta de manga corta de cuello redondo con estampado de cerezas, casual de verano para muje",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Conjunto de pijama informal de niña con estampado de mariposas, camiseta de tirantes con volan",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta de mujer de manga corta con cuello redondo y estampado floral, para verano",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de manga corta con cuello redondo y estampado de oso de dibujos animados, de estilo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Franclia Camiseta de punto de manga corta a rayas con ajuste minimalista francés, diseño único, vers",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "pedido anterior",
        "cantidad": 1,
        "precioUnitario": 365.0,
        "subtotal": 365.0
      }
    ]
  },
  {
    "id": "FAC-2540",
    "cliente": "Damaris clinica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 11:26 PM",
    "itemsCount": 4,
    "subtotal": 245.54,
    "iva": 29.46,
    "total": 275.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Bolso de viaje grande con diseño de gato, nueva bolsa de hombro versátil y de moda, bolso ca",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "1 pieza Masajeador de mano LED - Dispositivo para eliminar arrugas y firmar la piel del cuello y el",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "Suero reductor de poros con ácido lactobiónico SlowSunday, mejora los puntos negros y los poros, exf",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "lip gloss",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2539",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 06:33 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Ventilador portátil plegable de mano 3 en 1, refrigeración de alta velocidad, batería recargable de",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2538",
    "cliente": "Flor amiga de Katerin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 06:28 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Attitoon Mono de cuello de polo con gráfico de logo pequeño de caballo en estilo minimalista casual,",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2537",
    "cliente": "Gaby vecina de Wendy Monzón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 06:22 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Mochila de gran capacidad para mujeres, bolso clásico de unicolor para damas",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2536",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 04:58 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "endless starry night",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2534",
    "cliente": "Fabiola Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 04:45 PM",
    "itemsCount": 4,
    "subtotal": 120.54,
    "iva": 14.46,
    "total": 135.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "limpiador facial",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "ropa interior",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "exfoliante",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2533",
    "cliente": "Darlyn Osoy",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 03:52 AM",
    "itemsCount": 7,
    "subtotal": 227.68,
    "iva": 27.32,
    "total": 255.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "crossbody stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "Afeitadora eléctrica para mujeres 2 en 1, con cuchillas de cerámica afiladas para una rápida elimina",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "lámpara stitch",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "moldeador de diseño gel",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "accesorios para uñas",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "molde de silicón",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "pegamento para uñas",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2532",
    "cliente": "Daysi Tercero",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 03:44 AM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "libro de colorear de stitch",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "cuaderno",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2530",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 03:40 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "endless starry night",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2529",
    "cliente": "Baneza González",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 01:19 AM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "crema para peinar",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2528",
    "cliente": "Karina tia de Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 01:18 AM",
    "itemsCount": 4,
    "subtotal": 250.0,
    "iva": 30.0,
    "total": 280.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "Siren Gaze Camiseta de mujer de manga corta con botones metálicos, parches de encaje negro y espalda",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "lentes",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "Franclia Camiseta de mujer de manga corta con cuello redondo y estampado floral, para verano",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2527",
    "cliente": "Tere C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 01:16 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "magic gloss",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2525",
    "cliente": "Mandy campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 01:13 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2524",
    "cliente": "Yamali C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 01:08 AM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lápiz para cejas",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2523",
    "cliente": "Vivi por la despensa",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 12:32 AM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2522",
    "cliente": "Fernanda fam katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 12:31 AM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2520",
    "cliente": "Andrea Valencia",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 12:26 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2519",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 12:24 AM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2518",
    "cliente": "Rocsana / Mayra",
    "nit": "C F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 12:20 AM",
    "itemsCount": 5,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "rubor check color",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "labial lipgloss",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "libreta la bubu",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2517",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 12:13 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2516",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "15/06/2026 12:07 AM",
    "itemsCount": 9,
    "subtotal": 227.68,
    "iva": 27.32,
    "total": 255.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "calcomanías la bubu",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "aretes dorados",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "hidratante de rostro",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "ropa interior",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "SHEIN MOD Vestido mini de línea A con cintura fruncida y hombros atados con estampado floral diminut",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2515",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 06:25 AM",
    "itemsCount": 5,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "borrador",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "calcomanías la bubu",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "sacapuntas stitch",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "jabón de arroz",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial lipgloss",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2513",
    "cliente": "Mónica prima de RC",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 01:28 AM",
    "itemsCount": 9,
    "subtotal": 232.14,
    "iva": 27.86,
    "total": 260.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "goma en barra stitch",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "crema para peinar",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "jabón intimo de limpieza",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "aretes plateados",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "sacapuntas capibara",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "libro de colorear de stitch",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2512",
    "cliente": "Imelda Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 01:26 AM",
    "itemsCount": 7,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "goma en barra stitch",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "sacapuntas stitch",
        "cantidad": 4,
        "precioUnitario": 5.0,
        "subtotal": 20.0
      },
      {
        "nombre": "calcomanías kuromi",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2511",
    "cliente": "Male Morales",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 01:25 AM",
    "itemsCount": 22,
    "subtotal": 213.39,
    "iva": 25.61,
    "total": 239.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "goma en barra stitch",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "labial langmanni",
        "cantidad": 6,
        "precioUnitario": 20.0,
        "subtotal": 120.0
      },
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "uñas postizas",
        "cantidad": 2,
        "precioUnitario": 18.0,
        "subtotal": 36.0
      },
      {
        "nombre": "borrador",
        "cantidad": 7,
        "precioUnitario": 5.0,
        "subtotal": 35.0
      },
      {
        "nombre": "cadena ojo Turco",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "bolígrafo kuromi",
        "cantidad": 1,
        "precioUnitario": 8.0,
        "subtotal": 8.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2510",
    "cliente": "Damaris clinica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 01:18 AM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lip gloss",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2509",
    "cliente": "Martita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 01:15 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2508",
    "cliente": "Jeni Waleska Urbina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 01:14 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2507",
    "cliente": "Darlyn Pinula",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 12:59 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lámpara stitch",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2506",
    "cliente": "Evelyn Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 12:58 AM",
    "itemsCount": 9,
    "subtotal": 156.25,
    "iva": 18.75,
    "total": 175.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lámpara stitch",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial langmanni",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "lápiz infinito",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "lápiz infinito",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "loción dos lunas",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "pulcera fresita",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "sacapuntas astronauta",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2505",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 12:56 AM",
    "itemsCount": 7,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lámpara stitch",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "goma en barra stitch",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "lápiz infinito",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "lápiz infinito",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "blanqueador de dientes",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "ropa interior",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2504",
    "cliente": "Gaby hermana Paola",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 12:53 AM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "prymer",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2502",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 12:50 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "magic gloss",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2501",
    "cliente": "Gabriela Colindres",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 12:48 AM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "magic gloss",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2500",
    "cliente": "Darcy Sánchez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 12:44 AM",
    "itemsCount": 6,
    "subtotal": 169.64,
    "iva": 20.36,
    "total": 190.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "jabón intimo de limpieza",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      },
      {
        "nombre": "cadena dorada",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "magic gloss",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "ropa de niña",
        "cantidad": 1,
        "precioUnitario": 105.0,
        "subtotal": 105.0
      }
    ]
  },
  {
    "id": "FAC-2498",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 12:42 AM",
    "itemsCount": 3,
    "subtotal": 169.64,
    "iva": 20.36,
    "total": 190.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "jabón intimo de limpieza",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "Soleia Conjunto de 2 piezas de top bandeau plisado de unicolor y shorts holgados con estampado flora",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2497",
    "cliente": "Fabiola Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "14/06/2026 12:40 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "exfoliante",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2496",
    "cliente": "Darlyn Pinula",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "02/06/2026 04:34 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SANRIO Conjunto de 3 piezas de lencería deportiva y sexy para mujer, con diseño de Hello Kitty en co",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2495",
    "cliente": "Yeimi Rodríguez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "02/06/2026 04:31 AM",
    "itemsCount": 5,
    "subtotal": 120.54,
    "iva": 14.46,
    "total": 135.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "suns creen",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "magic gloss",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      },
      {
        "nombre": "delineador",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "calcetas corazones",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2494",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "02/06/2026 04:15 AM",
    "itemsCount": 2,
    "subtotal": 174.11,
    "iva": 20.89,
    "total": 195.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Soleia Nuevo conjunto informal de vacaciones de primavera/verano para invitados a bodas en la playa,",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "beauty time",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2493",
    "cliente": "Blanca comercial Eden",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "02/06/2026 04:04 AM",
    "itemsCount": 12,
    "subtotal": 424.11,
    "iva": 50.89,
    "total": 475.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "beauty time",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "prymer",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "corrector",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "fantástico sparks rosada",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "charmer",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "huda beauty Aloe vera",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "love body",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "exfoliante",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Resyla Camiseta ajustada y fruncida con estampado de corazón y leopardo, versátil para el verano, vu",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta casual de mujer de manga corta y cuello redondo con estampado de cerezas",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2492",
    "cliente": "Leidy amiga Baneza",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "02/06/2026 03:53 AM",
    "itemsCount": 3,
    "subtotal": 254.46,
    "iva": 30.54,
    "total": 285.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Paquete de 5 bragas tipo tanga sin costuras cómodas y suaves a la piel con decoración de diamantes L",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "3 piezas Gafas de moda con marco grande y cadena cuadrada",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Eraneu Pijama de mono sin mangas con estampado de corazón de fresa y margarita, romántico para el ve",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2491",
    "cliente": "Fernanda amiga Maritza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "02/06/2026 03:47 AM",
    "itemsCount": 2,
    "subtotal": 276.79,
    "iva": 33.21,
    "total": 310.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias planas para mujer de talla grande, estilo vacacional, estilo casual de verano, versátiles",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Sandalias de tacón de aguja tipo tanga para mujeres, nuevos modelos de verano 2025 con punta cuadrad",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2490",
    "cliente": "Waleska Laguna Bermeja",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "02/06/2026 03:42 AM",
    "itemsCount": 2,
    "subtotal": 276.79,
    "iva": 33.21,
    "total": 310.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Soleia Conjunto de 2 piezas de top halter y shorts de moda para mujer de vacaciones",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Soleia Conjunto de top halter de cuello en V con textura de unicolor y shorts sueltos para mujer, se",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2489",
    "cliente": "Lili Ramírez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "01/06/2026 04:01 AM",
    "itemsCount": 9,
    "subtotal": 428.57,
    "iva": 51.43,
    "total": 480.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de pijama con camiseta y pantalones cortos con estampado de corazón",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Sandalias/pantuflas de tacón de gatito para mujer, zapatos de tacón alto de punta abierta elegantes",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Juego de 5 Tangas Sin Costuras para Mujer con Estampado Dulce y , Joyería de Diamantes LOVE, Cómodas",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "base líquida",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "prymer",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "exfoliante",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2485",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "01/06/2026 01:29 AM",
    "itemsCount": 3,
    "subtotal": 437.5,
    "iva": 52.5,
    "total": 490.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias planas de mujer con puntera abierta y esponjosas, de piel sintética súper suave y cómoda,",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "3 piezas Pantalones de salón cómodos de poliéster sólidos y estampados para mujeres, pantalones casu",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "shensongni Pantuflas de casa de felpa para mujer, pantuflas negras con lazo, pantuflas lindas, pantu",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2484",
    "cliente": "Paola Rivera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "01/06/2026 12:12 AM",
    "itemsCount": 5,
    "subtotal": 736.61,
    "iva": 88.39,
    "total": 825.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias Planas Zapatos De Mujer Casuales, De Moda Tejido Redondo Del Dedo Del Pie, Para Casa Y Ext",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Sandalias de plástico planas, casuales y versátiles con aplicaciones de rhinestones para mujer de ta",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Sandalias de mujer con hebilla de lazo, diapositivas planas negras, punta cuadrada, cómodas sandalia",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "Nuevas sandalias planas estilo romano de verano con decoración de pedrería y suela suave para vacaci",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      },
      {
        "nombre": "chaleco Charlotte Russe",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2483",
    "cliente": "Kyara Santa Barbara",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 11:44 PM",
    "itemsCount": 4,
    "subtotal": 415.18,
    "iva": 49.82,
    "total": 465.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Mono informal de mujer con bloques de color",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Flexra Vestido de mezclilla ajustado sin mangas con diseño de cordón y espalda descubierta para muje",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Hello Kitty Pulsera Elástica Estilo Y2K con Colgante de Corazón y Diseño de Cuentas - Joyería para M",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "hidratante de rostro",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2481",
    "cliente": "Abigail U",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 06:33 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Rafferiza Set de 2 piezas con top sin mangas de estampado gráfico y contraste de color con shorts",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2480",
    "cliente": "Flor amiga de Katerin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 06:24 PM",
    "itemsCount": 2,
    "subtotal": 227.68,
    "iva": 27.32,
    "total": 255.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Camiseta sin hombros con cuello asimétrico, cintura con retorcido y hebilla metálica, bajo a",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Soleia Nuevo conjunto informal de vacaciones de primavera/verano para invitados a bodas en la playa,",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2479",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 06:12 PM",
    "itemsCount": 7,
    "subtotal": 580.36,
    "iva": 69.64,
    "total": 650.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Paw Patrol 2 piezas Conjunto de para niños, incluye camiseta de manga corta con cuello redondo y est",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Soleia Mono de punto blanco de textura arrugada con cuello en V profundo y lazo delantero para mujer",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Soleia Nuevo conjunto casual de primavera/verano para vacaciones, boda en la playa, invitado de boda",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Gloray Vestido midi elegante y ajustado sin tirantes con pliegues para mujer",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      },
      {
        "nombre": "rubor",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2478",
    "cliente": "Paola La Salvadora",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 04:50 AM",
    "itemsCount": 2,
    "subtotal": 294.64,
    "iva": 35.36,
    "total": 330.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias/pantuflas de tacón de gatito para mujer, zapatos de tacón alto de punta abierta elegantes",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Airaco Blusa de mujer de manga larga ajustada con bolsillo y cuello casual en color blanco",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      }
    ]
  },
  {
    "id": "FAC-2477",
    "cliente": "Diana por los taxis",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 04:22 AM",
    "itemsCount": 7,
    "subtotal": 366.07,
    "iva": 43.93,
    "total": 410.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "corrector",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "prymer",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "base líquida",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "Slaydiva Conjunto de dos piezas para mujer, informal y elegante de verano, que incluye una camiseta",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "INAWLY 2 piezas Conjunto de camiseta de manga corta con estampado de letras y shorts de ciclismo de",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2476",
    "cliente": "Ash Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 12:56 AM",
    "itemsCount": 3,
    "subtotal": 290.18,
    "iva": 34.82,
    "total": 325.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "teclado y mouse",
        "cantidad": 1,
        "precioUnitario": 90.0,
        "subtotal": 90.0
      },
      {
        "nombre": "Set de pijama de 3 piezas para mujer de unicolor con ribete de contraste en seda sintética",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "pedido 2 blusas",
        "cantidad": 1,
        "precioUnitario": 80.0,
        "subtotal": 80.0
      }
    ]
  },
  {
    "id": "FAC-2475",
    "cliente": "Adriana Monterroso",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 12:52 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Camiseta de verano elegante y versátil para uso diario con cuello de canalé trenzado, manga",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2474",
    "cliente": "Aidé Sánchez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 12:47 AM",
    "itemsCount": 2,
    "subtotal": 276.79,
    "iva": 33.21,
    "total": 310.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Sandalias planas cómodas y versátiles para vacaciones en la playa, talla grande 41-43, elegantes y l",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Soleia Mono de punto con textura de patrón ondulado para mujer con decoración de estrella de mar hue",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2473",
    "cliente": "Fabiola Tahuite (funeraria)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 12:42 AM",
    "itemsCount": 2,
    "subtotal": 151.79,
    "iva": 18.21,
    "total": 170.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Set de pijama con camiseta de tirantes y pantalones cortos con volantes con estampado de labio",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEIN Camisón casual de mujer con tirantes finos y estampado de corazones en todo el diseño, bata de",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2472",
    "cliente": "Fabiola Tahuite (funeraria)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 12:38 AM",
    "itemsCount": 2,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Camisón casual de mujer con tirantes finos y estampado de corazones en todo el diseño, bata de",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "nombre": "SHEIN Set de pijama con camiseta de tirantes y pantalones cortos con volantes con estampado de labio",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2471",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/05/2026 12:01 AM",
    "itemsCount": 10,
    "subtotal": 321.43,
    "iva": 38.57,
    "total": 360.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "magic gloss",
        "cantidad": 5,
        "precioUnitario": 20.0,
        "subtotal": 100.0
      },
      {
        "nombre": "delineador",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "tónico para rostro",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "loción 2 lunas",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "cartera beige",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "calcetas corazones",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2470",
    "cliente": "Mandy campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:26 AM",
    "itemsCount": 1,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pestañas false eyelashes",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2469",
    "cliente": "Monica Barillas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:25 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "laVerne beauty",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2466",
    "cliente": "Meli Lainez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:21 AM",
    "itemsCount": 1,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pestañas DIY lash extensión kit",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2465",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:20 AM",
    "itemsCount": 2,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body philosophy",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "keratin",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2464",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:17 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "endless starry night",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2463",
    "cliente": "Lucía Méndez(Tienda Max)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:15 AM",
    "itemsCount": 1,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "keratin",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2462",
    "cliente": "Sandra Hernández (Pueblito)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:12 AM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Rainbow clear",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2461",
    "cliente": "Sandra Duarte",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:11 AM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Lucía future",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2460",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:10 AM",
    "itemsCount": 3,
    "subtotal": 214.29,
    "iva": 25.71,
    "total": 240.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "love body",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "Juego de 7 anillos de dedo del pie de moda con corazón, hoja y flor para mujer, joyería para pies es",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "Sandalias/pantuflas de tacón de gatito para mujer, zapatos de tacón alto de punta abierta elegantes",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2459",
    "cliente": "Ana Carin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:07 AM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pestañas Joe kou",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "keratin",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2458",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:04 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "laVerne beauty",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2457",
    "cliente": "Anita González",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 01:02 AM",
    "itemsCount": 1,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "my dear",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2455",
    "cliente": "Milvia De La Cruz (La Salvadora)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 12:58 AM",
    "itemsCount": 1,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lóvali fragances",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2454",
    "cliente": "Kyara Santa Barbara",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 12:49 AM",
    "itemsCount": 3,
    "subtotal": 129.46,
    "iva": 15.54,
    "total": 145.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "keratin",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "elite III",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2453",
    "cliente": "Carmen de García",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 12:45 AM",
    "itemsCount": 9,
    "subtotal": 290.18,
    "iva": 34.82,
    "total": 325.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "huda beauty cirrus vc",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "partiality pour femme",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "V.V. Love",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "exfoliante",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      },
      {
        "nombre": "magic gloss",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      },
      {
        "nombre": "5 piezas de tanga sin costuras de encaje para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "5 piezas de tanga sin costuras de encaje para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2452",
    "cliente": "Vivi por la despensa",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 12:37 AM",
    "itemsCount": 3,
    "subtotal": 125.0,
    "iva": 15.0,
    "total": 140.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "perfume osito",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "fama robot perfume",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2451",
    "cliente": "Blanca comercial Eden",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/05/2026 12:32 AM",
    "itemsCount": 4,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Crédito",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "huda beauty Aloe vera",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "fantástico sparks rosada",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "charmer",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "love body",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2450",
    "cliente": "Andrea Agustin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:34 AM",
    "itemsCount": 1,
    "subtotal": 147.32,
    "iva": 17.68,
    "total": 165.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Attitoon Mono de cuello de polo con gráfico de logo pequeño de caballo en estilo minimalista casual,",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      }
    ]
  },
  {
    "id": "FAC-2449",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:32 AM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Everyssa Camiseta de tirantes casual y versátil con cuello redondo y rayas para mujer",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2448",
    "cliente": "Zoilita Osoy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:29 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Camiseta estampada de mujer con cuello redondo y lazo con estampado de fresa",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2447",
    "cliente": "Merlín Barillas",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:27 AM",
    "itemsCount": 2,
    "subtotal": 366.07,
    "iva": 43.93,
    "total": 410.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Vestido midi con hombros descubiertos y cintura plisada para mujeres",
        "cantidad": 1,
        "precioUnitario": 285.0,
        "subtotal": 285.0
      },
      {
        "nombre": "Myrelith Top moldeador con cierre delantero de encaje y parches de mujer, de moda y sexy",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2446",
    "cliente": "Karina López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "6 piezas/paquete Tangas de encaje para mujer, ropa interior versátil de cintura media",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2445",
    "cliente": "Nancy Ruiz",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:20 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 4 relojes de pulsera de cuarzo elegantes para mujer con esfera cuadrada minimalista y pantall",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2444",
    "cliente": "Aury Salón San José",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:17 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Tall Body de unicolor con cuello alto y manga larga para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2443",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:12 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Franclia Camiseta casual romántica de unicolor y elegante estilo de ciudad para mujer",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2442",
    "cliente": "Rosita amiga Maritza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:10 AM",
    "itemsCount": 3,
    "subtotal": 406.25,
    "iva": 48.75,
    "total": 455.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Vestido largo con diseño de lazo minimalista y de moda",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEIN EZwear 2 piezas Cárdigan de punto con estampado de poni de manga larga para mujer, adecuado pa",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "6 piezas/paquete Tangas de encaje para mujer, ropa interior versátil de cintura media",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2441",
    "cliente": "Baneza González",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 08:03 AM",
    "itemsCount": 2,
    "subtotal": 388.39,
    "iva": 46.61,
    "total": 435.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Camisa informal cómoda de verano con panel de bloques de color y lazo",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEIN LUNE CURVE Set de 2 piezas casual y cómodo con diseño de amarre delantero para mujer de talla",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      }
    ]
  },
  {
    "id": "FAC-2440",
    "cliente": "Monica Herrera (el carmén)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:59 AM",
    "itemsCount": 1,
    "subtotal": 147.32,
    "iva": 17.68,
    "total": 165.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Selianne Vestido mini ajustado con estampado floral, elegante y sexy con volantes franceses, para ve",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      }
    ]
  },
  {
    "id": "FAC-2439",
    "cliente": "Andrea amiga Baneza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:55 AM",
    "itemsCount": 1,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Disney Conjunto de camiseta de manga corta y pantalones cortos de verano para bebé niño recién nacid",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2438",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:52 AM",
    "itemsCount": 2,
    "subtotal": 200.89,
    "iva": 24.11,
    "total": 225.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SpongeBob SquarePants | SHEIN Camiseta negra de manga corta, cuello redondo, de corte holgado con li",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Zapatillas de novia/dama de honor de 2 bandas blancas de felpa para otoño/invierno, zapatillas de ca",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2437",
    "cliente": "Fabiola Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:47 AM",
    "itemsCount": 2,
    "subtotal": 276.79,
    "iva": 33.21,
    "total": 310.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Conjunto de dos piezas para mujer, camiseta de cuello redondo de manga corta, pantalones cort",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "2 moldes de silicona para vasija de niña pequeña - Moldes DIY para macetas de concreto, suculentas,",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2436",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:39 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Nuevo bolso de hombro versátil y clásico de moda, bolso minimalista retro, bolso de mano, bolso band",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2435",
    "cliente": "Ivón C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:36 AM",
    "itemsCount": 2,
    "subtotal": 272.32,
    "iva": 32.68,
    "total": 305.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SpongeBob SquarePants | SHEIN Conjunto de 3 camisetas de manga corta de verano casuales y lindas con",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SpongeBob SquarePants | SHEIN Conjunto de pijama de otoño/invierno con top de manga larga de cuello",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2434",
    "cliente": "María Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:23 AM",
    "itemsCount": 4,
    "subtotal": 651.79,
    "iva": 78.21,
    "total": 730.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "TOM & JERRY X SHEIN Conjunto de camiseta de manga corta de cuello redondo y pantalones cortos con es",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "BATMAN X SHEIN Set de 2 piezas de camiseta y pantalones cortos con estampado de logo vintage moderno",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Conjunto de 2 piezas de shorts para mujer talla grande, que incluye 1 camiseta con gráfico de oso de",
        "cantidad": 1,
        "precioUnitario": 285.0,
        "subtotal": 285.0
      },
      {
        "nombre": "Paw Patrol 2 piezas Conjunto de para niños, incluye camiseta de manga corta con estampado de cachorr",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2433",
    "cliente": "Yanira Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:17 AM",
    "itemsCount": 2,
    "subtotal": 276.79,
    "iva": 33.21,
    "total": 310.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Mono de punto de cuello alto de manga larga, ajustado y de color negro sólido, de estilo minim",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEIN EZwear Vestido de punto ceñido informal de verano con rayas y espalda descubierta",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2432",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:15 AM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 3 piezas de ropa de moda para bebé niño, body de cuello redondo de manga corta holgado con li",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2431",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:11 AM",
    "itemsCount": 7,
    "subtotal": 522.32,
    "iva": 62.68,
    "total": 585.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Nuevo bolso de hombro versátil y clásico de moda, bolso minimalista retro, bolso de mano, bolso band",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "1 pieza Bolsa de almuerzo con estilo deportivo, aislada y portátil, a prueba de agua y fugas, con co",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "Bolso de mano de mujer de alta calidad y multifuncional con estampado de cerezas, bolso cruzado cuad",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "futuristic girl",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "Amazing gold",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "mystical",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "100 piezas de grupos de pestañas postizas esponjosas y autoadhesivas, set de longitudes mixtas de 11",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2430",
    "cliente": "Graciela García",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 07:03 AM",
    "itemsCount": 4,
    "subtotal": 571.43,
    "iva": 68.57,
    "total": 640.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "OBOVAY Ventilador de escritorio portátil multifuncional 4 en 1, ventilador de mano inalámbrico con 3",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Camera On Spray Fijador Difuminador Resistente al Agua Marca Belleza Maquillaje Maquullaje C",
        "cantidad": 1,
        "precioUnitario": 160.0,
        "subtotal": 160.0
      },
      {
        "nombre": "SHEGLAM Paleta De Sombras De Ojos Kyoto In Bloom De 12 Colores, Metalizada, Mate Y Brillante, Colore",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2429",
    "cliente": "Sofía vecina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 06:55 AM",
    "itemsCount": 2,
    "subtotal": 294.64,
    "iva": 35.36,
    "total": 330.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Disney Colaboración autorizada con \"Stitch\" | Conjunto de ropa para niñas de 4 a 10 años, ropa para",
        "cantidad": 2,
        "precioUnitario": 165.0,
        "subtotal": 330.0
      }
    ]
  },
  {
    "id": "FAC-2428",
    "cliente": "Pame Muxbal",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 06:47 AM",
    "itemsCount": 2,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN MOD Vestido de mezclilla para mujer, vestido azul casual con tirantes tipo espagueti vintage",
        "cantidad": 1,
        "precioUnitario": 300.0,
        "subtotal": 300.0
      },
      {
        "nombre": "Resyla Ropa de otoño, ropa de abrigo, otoño/invierno, chaqueta de otoño, vuelta al colegio, casual,",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2427",
    "cliente": "Adry Rosales",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 06:42 AM",
    "itemsCount": 5,
    "subtotal": 607.14,
    "iva": 72.86,
    "total": 680.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Easithlete Sudadera con capucha de manga larga con bolsillo, uso diario casual para mujer",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "CUCCOO EASI Botas de nieve minimalistas, cómodas y cálidas con suela gruesa para mujer, para otoño/i",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Resyla Vestido largo con diseño de lazo minimalista y de moda",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEGLAM Base De Maquillaje Mate Duradera Y Transpirable Complexion Pro-Buttercream Base De Maquillaj (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Soft Haze Lip Blur-Think Twice De 6 Colores, Resistente Al Agua, Tinte  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2426",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 06:01 AM",
    "itemsCount": 5,
    "subtotal": 517.86,
    "iva": 62.14,
    "total": 580.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "INAWLY Solva Vestido largo de manga larga holgado de un solo color y ajustado para mujer",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Zapatillas de novia/dama de honor de 2 bandas blancas de felpa para otoño/invierno, zapatillas de ca",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Conjunto de pijama con camiseta y shorts con estampado de corazón / Conjunto de pijama blanco",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta estampada de mujer con cuello redondo y lazo con estampado de fresa",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "LOONEY TUNES X SHEIN Camiseta corta de mujer de manga corta a rayas",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2425",
    "cliente": "Fabiola Tahuite (funeraria)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 05:40 AM",
    "itemsCount": 4,
    "subtotal": 500.0,
    "iva": 60.0,
    "total": 560.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN PETITE CURVE Falda lápiz con abertura lateral de estampado de leopardo talla grande, elegante",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Conjunto de pijama sexy para mujer con top de tirantes con nudo delantero de unicolor y shorts con e",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Charlaine Conjunto de lencería romántica francesa de encaje negro con detalles de puntilla, look de",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "vestido blanco",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      }
    ]
  },
  {
    "id": "FAC-2424",
    "cliente": "Alejandra amiga Yesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 05:32 AM",
    "itemsCount": 3,
    "subtotal": 504.46,
    "iva": 60.54,
    "total": 565.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN EZwear Vestido ajustado con abertura en color rosa claro, primavera/verano",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Camisa corta de mujer a la moda con rayas negras, con cuello de camisa, mangas de hombros caídos, de",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      },
      {
        "nombre": "Selianne Cárdigan corto minimalista de manga larga, de uso diario informal, blusas de manga larga",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2423",
    "cliente": "Darlyn Pinula",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 05:20 AM",
    "itemsCount": 8,
    "subtotal": 1169.64,
    "iva": 140.36,
    "total": 1310.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto de pantalón corto y camiseta de manga corta casual y deportivo para hombre en verano",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Attitoon Mono de cuello de polo con gráfico de logo pequeño de caballo en estilo minimalista casual,",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "KOVSEE Camiseta de manga corta con estampado de estrella numérica 24 para hombre, casual para deport",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "12 piezas Calzoncillos liso simple",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Funda de teléfono nueva con patrón de onda asimétrica rosa brillante, compatible con iPhone 17 Pro M",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "INAWLY Mono de manga larga con cuello alto y bordado de caballero en dos colores",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Bubblio Mono de punto de cuello redondo de manga larga de unicolor, de tela elástica y acanalada, de",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "Genkimix Kids Conjunto de 2 piezas para niñas jóvenes: Pantalón negro con decoración de perlas y cam",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      }
    ]
  },
  {
    "id": "FAC-2422",
    "cliente": "Kyara Santa Barbara",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 05:04 AM",
    "itemsCount": 4,
    "subtotal": 491.07,
    "iva": 58.93,
    "total": 550.0,
    "metodoPago": "Crédito",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Nueva camiseta de mujer de manga corta con cuello en V a rayas",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Selianne Vestido mini ajustado con estampado floral, elegante y sexy con volantes franceses, para ve",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "Resyla Blusa de uso diario versátil con bordado de limón para mujer",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Elenzga Camiseta de manga corta de mujer de color negro sólido, con diseño de empalme de malla, cuel",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2421",
    "cliente": "Kyara Santa Barbara",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/05/2026 04:55 AM",
    "itemsCount": 4,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Camiseta de manga corta de mujer de color negro sólido, con diseño de empalme de malla, cuel",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Blusa de uso diario versátil con bordado de limón para mujer",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Selianne Vestido mini ajustado con estampado floral, elegante y sexy con volantes franceses, para ve",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "Franclia Nueva camiseta de mujer de manga corta con cuello en V a rayas",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2420",
    "cliente": "Juanjo Casa B18 La Reserva",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "27/04/2026 07:44 PM",
    "itemsCount": 5,
    "subtotal": 156.25,
    "iva": 18.75,
    "total": 175.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "almuerzo milanesa de pollo",
        "cantidad": 5,
        "precioUnitario": 35.0,
        "subtotal": 175.0
      }
    ]
  },
  {
    "id": "FAC-2419",
    "cliente": "abogados y notarios",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "27/04/2026 05:16 PM",
    "itemsCount": 2,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "almuerzo de milanesa de cerdo",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "almuerzo milanesa de pollo",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2418",
    "cliente": "Lidubina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "27/04/2026 04:31 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "almuerzo milanesa de pollo",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2417",
    "cliente": "MB",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "27/04/2026 04:23 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "almuerzo milanesa de pollo",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2416",
    "cliente": "MB",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 07:04 AM",
    "itemsCount": 9,
    "subtotal": 223.25,
    "iva": 26.79,
    "total": 250.04,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "almuerzo chiles rellenos",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      },
      {
        "nombre": "enchiladas",
        "cantidad": 7,
        "precioUnitario": 25.72,
        "subtotal": 180.04
      }
    ]
  },
  {
    "id": "FAC-2415",
    "cliente": "Annie Amiel",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 06:58 AM",
    "itemsCount": 3,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "almuerzo chiles rellenos",
        "cantidad": 3,
        "precioUnitario": 35.0,
        "subtotal": 105.0
      }
    ]
  },
  {
    "id": "FAC-2414",
    "cliente": "Sofi Reyes",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 06:55 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "almuerzo chiles rellenos",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2413",
    "cliente": "DH",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 06:46 AM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "almuerzo chiles rellenos",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "chile relleno individuales",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2412",
    "cliente": "Katia",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 06:43 AM",
    "itemsCount": 2,
    "subtotal": 62.5,
    "iva": 7.5,
    "total": 70.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "almuerzo chiles rellenos",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      }
    ]
  },
  {
    "id": "FAC-2411",
    "cliente": "abogados y notarios",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 06:21 AM",
    "itemsCount": 3,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "porción curtido remolacha",
        "cantidad": 3,
        "precioUnitario": 10.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2410",
    "cliente": "DH",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 06:12 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "porción de arroz",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2409",
    "cliente": "Lidubina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 06:07 AM",
    "itemsCount": 6,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "porción curtido remolacha",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "porción arroz",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2408",
    "cliente": "casa 20 J altos de village",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 06:03 AM",
    "itemsCount": 6,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 4,
        "precioUnitario": 10.0,
        "subtotal": 40.0
      },
      {
        "nombre": "almuerzo chiles rellenos",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      }
    ]
  },
  {
    "id": "FAC-2407",
    "cliente": "casa 9k altos de village",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "24/04/2026 06:00 AM",
    "itemsCount": 4,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 4,
        "precioUnitario": 10.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2406",
    "cliente": "JC",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:57 AM",
    "itemsCount": 1,
    "subtotal": 8.93,
    "iva": 1.07,
    "total": 10.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2405",
    "cliente": "Jeovany",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:55 AM",
    "itemsCount": 3,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 3,
        "precioUnitario": 10.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2404",
    "cliente": "Rch",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:52 AM",
    "itemsCount": 2,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2403",
    "cliente": "casa C41 La Reserva",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:46 AM",
    "itemsCount": 3,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 3,
        "precioUnitario": 10.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2402",
    "cliente": "Gladys",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:39 AM",
    "itemsCount": 4,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 4,
        "precioUnitario": 10.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2401",
    "cliente": "Vero Duchez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:29 AM",
    "itemsCount": 3,
    "subtotal": 49.11,
    "iva": 5.89,
    "total": 55.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "almuerzo chiles rellenos",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2400",
    "cliente": "Vero Duchez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:27 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Venta de Artículos Varios",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2399",
    "cliente": "Nancy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:13 AM",
    "itemsCount": 4,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 4,
        "precioUnitario": 10.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2398",
    "cliente": "Nancy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:10 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Venta de Artículos Varios",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2397",
    "cliente": "Nancy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:05 AM",
    "itemsCount": 4,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 4,
        "precioUnitario": 10.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2396",
    "cliente": "Nancy",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 12:24 AM",
    "itemsCount": 8,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 4,
        "precioUnitario": 10.0,
        "subtotal": 40.0
      },
      {
        "nombre": "chile relleno individuales",
        "cantidad": 4,
        "precioUnitario": 10.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2395",
    "cliente": "Baneza González",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 12:17 AM",
    "itemsCount": 21,
    "subtotal": 187.5,
    "iva": 22.5,
    "total": 210.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chile relleno individuales",
        "cantidad": 21,
        "precioUnitario": 10.0,
        "subtotal": 210.0
      }
    ]
  },
  {
    "id": "FAC-2394",
    "cliente": "Baneza González",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 12:08 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Venta de Artículos Varios",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2393",
    "cliente": "panadería C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 11:00 PM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 90.0
      }
    ]
  },
  {
    "id": "FAC-2392",
    "cliente": "Vero Duchez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 07:59 PM",
    "itemsCount": 4,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 90.0
      },
      {
        "nombre": "chile relleno individuales",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2391",
    "cliente": "Juan Tejada",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 07:14 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2390",
    "cliente": "Paola H",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 06:00 PM",
    "itemsCount": 3,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 90.0
      },
      {
        "nombre": "porción de arroz",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2389",
    "cliente": "Baneza Barillas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:57 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2388",
    "cliente": "casa de los BM",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:53 PM",
    "itemsCount": 3,
    "subtotal": 120.54,
    "iva": 14.46,
    "total": 135.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 3,
        "precioUnitario": 45.0,
        "subtotal": 135.0
      }
    ]
  },
  {
    "id": "FAC-2387",
    "cliente": "altos de villate",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:44 PM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 90.0
      }
    ]
  },
  {
    "id": "FAC-2386",
    "cliente": "Jeovany",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:23 PM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 90.0
      }
    ]
  },
  {
    "id": "FAC-2385",
    "cliente": "DH",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:22 PM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 90.0
      }
    ]
  },
  {
    "id": "FAC-2384",
    "cliente": "JC",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:21 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2383",
    "cliente": "Rch",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 05:19 PM",
    "itemsCount": 3,
    "subtotal": 120.54,
    "iva": 14.46,
    "total": 135.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 3,
        "precioUnitario": 45.0,
        "subtotal": 135.0
      }
    ]
  },
  {
    "id": "FAC-2382",
    "cliente": "Adrick Delgado",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 04:39 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2381",
    "cliente": "EM",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 04:22 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2380",
    "cliente": "EM",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 04:11 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2379",
    "cliente": "EM",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 07:17 AM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2378",
    "cliente": "EM",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "25/04/2026 06:17 AM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2377",
    "cliente": "Analí C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 8,
    "subtotal": 205.36,
    "iva": 24.64,
    "total": 230.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lenceria",
        "cantidad": 2,
        "precioUnitario": 7.5,
        "subtotal": 15.0
      },
      {
        "nombre": "dispensador",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "blusas",
        "cantidad": 3,
        "precioUnitario": 50.0,
        "subtotal": 150.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      },
      {
        "nombre": "baolishi powder",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2376",
    "cliente": "Nohemí López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brochas",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2375",
    "cliente": "Ruth Iguardia",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 8.93,
    "iva": 1.07,
    "total": 10.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2374",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2373",
    "cliente": "Estefani Tejax",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2372",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2371",
    "cliente": "Angélica Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 2,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "faja negra L",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2370",
    "cliente": "Baneza González",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2369",
    "cliente": "Fernanda amiga Maritza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 2,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "traje de baño",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2367",
    "cliente": "Sonia Muxbal",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 3,
    "subtotal": 102.68,
    "iva": 12.32,
    "total": 115.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body lotion",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 85.0
      },
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2366",
    "cliente": "Gaby vecina de Wendy Monzón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 3,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "baolishi powder",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "mochila stitch",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2365",
    "cliente": "Jeni Waleska Urbina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "beauty time",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2364",
    "cliente": "Darlyn Osoy",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "beauty time",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2363",
    "cliente": "Yomara Cabrera",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 3,
    "subtotal": 209.82,
    "iva": 25.18,
    "total": 235.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lámpara stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "combo  maquillaje",
        "cantidad": 2,
        "precioUnitario": 100.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2362",
    "cliente": "Clemencia Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolso De Brazalete Para Correr Deportivos, Mini Bolsa De Teléfono Bandolera De Nylon, Bolsa De Crema",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2361",
    "cliente": "Astrid Celeste",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa blanca",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2360",
    "cliente": "Verónica Cuque",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 2,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "ropa interior dama",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2359",
    "cliente": "Andrea amiga Baneza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 3,
    "subtotal": 84.82,
    "iva": 10.18,
    "total": 95.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "estuche stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "body lotion",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2358",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 6,
    "subtotal": 116.07,
    "iva": 13.93,
    "total": 130.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "estuche stitch",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "iluminador liquido",
        "cantidad": 3,
        "precioUnitario": 20.0,
        "subtotal": 60.0
      },
      {
        "nombre": "palazzo",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2357",
    "cliente": "Kenia esposa Adin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2356",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pijama corta roja con rayas",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "la vida es bella",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2355",
    "cliente": "Sauli Estrada",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pijama corta roja con rayas",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2354",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:23 AM",
    "itemsCount": 15,
    "subtotal": 325.89,
    "iva": 39.11,
    "total": 365.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mochila stitch",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 20.0
      },
      {
        "nombre": "playera gris",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "pantalón de lona",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "calcetas nike",
        "cantidad": 5,
        "precioUnitario": 25.0,
        "subtotal": 110.0
      },
      {
        "nombre": "ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "Fantasy Paris",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      },
      {
        "nombre": "la vida es bella",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "baolishi powder",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2353",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:19 AM",
    "itemsCount": 15,
    "subtotal": 325.89,
    "iva": 39.11,
    "total": 365.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "mochila stitch",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 20.0
      },
      {
        "nombre": "playera gris",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "pantalón de lona",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "calcetas nike",
        "cantidad": 5,
        "precioUnitario": 25.0,
        "subtotal": 110.0
      },
      {
        "nombre": "ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "Fantasy Paris",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      },
      {
        "nombre": "la vida es bella",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "baolishi powder",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2352",
    "cliente": "Sauli Estrada",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:18 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pijama corta roja con rayas",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2351",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:18 AM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pijama corta roja con rayas",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "la vida es bella",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2350",
    "cliente": "Kenia esposa Adin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:17 AM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2349",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:17 AM",
    "itemsCount": 6,
    "subtotal": 116.07,
    "iva": 13.93,
    "total": 130.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "estuche stitch",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "iluminador liquido",
        "cantidad": 3,
        "precioUnitario": 20.0,
        "subtotal": 60.0
      },
      {
        "nombre": "palazzo",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2348",
    "cliente": "Andrea amiga Baneza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:17 AM",
    "itemsCount": 3,
    "subtotal": 84.82,
    "iva": 10.18,
    "total": 95.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "estuche stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "body lotion",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2347",
    "cliente": "Verónica Cuque",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:16 AM",
    "itemsCount": 2,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "ropa interior dama",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2346",
    "cliente": "Astrid Celeste",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:14 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa blanca",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2345",
    "cliente": "Clemencia Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:14 AM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolso De Brazalete Para Correr Deportivos, Mini Bolsa De Teléfono Bandolera De Nylon, Bolsa De Crema",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2344",
    "cliente": "Yomara Cabrera",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:14 AM",
    "itemsCount": 3,
    "subtotal": 209.82,
    "iva": 25.18,
    "total": 235.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lámpara stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "combo  maquillaje",
        "cantidad": 2,
        "precioUnitario": 100.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2343",
    "cliente": "Darlyn Osoy",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:14 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "beauty time",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2342",
    "cliente": "Jeni Waleska Urbina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:13 AM",
    "itemsCount": 1,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "beauty time",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2341",
    "cliente": "Gaby vecina de Wendy Monzón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:13 AM",
    "itemsCount": 3,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "baolishi powder",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "mochila stitch",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2340",
    "cliente": "Sonia Muxbal",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:13 AM",
    "itemsCount": 3,
    "subtotal": 102.68,
    "iva": 12.32,
    "total": 115.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "body lotion",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 85.0
      },
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2339",
    "cliente": "Lucía Méndez(Tienda Max)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:12 AM",
    "itemsCount": 10,
    "subtotal": 236.61,
    "iva": 28.39,
    "total": 265.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "iluminador liquido",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "super longwear foundation",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "Fantasy Paris",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "face primer",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "la vida es bella",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Nueva bolsa de mano minimalista de moda con estampado de fresa, diseño cuadrado, bolsillo exterior 3",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "brochas",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2338",
    "cliente": "Fernanda amiga Maritza",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:10 AM",
    "itemsCount": 2,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "traje de baño",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2337",
    "cliente": "Baneza González",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:10 AM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2336",
    "cliente": "Angélica Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:10 AM",
    "itemsCount": 2,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "faja negra L",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2335",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:09 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2334",
    "cliente": "Estefani Tejax",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:07 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2333",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:07 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2332",
    "cliente": "Ruth Iguardia",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:06 AM",
    "itemsCount": 1,
    "subtotal": 8.93,
    "iva": 1.07,
    "total": 10.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2331",
    "cliente": "Nohemí López",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:06 AM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brochas",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2330",
    "cliente": "Analí C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 08:06 AM",
    "itemsCount": 8,
    "subtotal": 205.36,
    "iva": 24.64,
    "total": 230.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lenceria",
        "cantidad": 2,
        "precioUnitario": 7.5,
        "subtotal": 15.0
      },
      {
        "nombre": "dispensador",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "blusas",
        "cantidad": 3,
        "precioUnitario": 50.0,
        "subtotal": 150.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      },
      {
        "nombre": "baolishi powder",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2329",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:44 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2328",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:42 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2327",
    "cliente": "Mandy campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:42 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2326",
    "cliente": "Fabiola Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:41 AM",
    "itemsCount": 6,
    "subtotal": 459.82,
    "iva": 55.18,
    "total": 515.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "suéter araña",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Micrófono inalámbrico profesional tipo lavalier, plug and play, con receptor USB-C y grabación con u",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "suéter osito",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "protector para cargador de stitch",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2325",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:37 AM",
    "itemsCount": 6,
    "subtotal": 732.14,
    "iva": 87.86,
    "total": 820.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Privé Camiseta para mujer con mangas abullonadas, escote asimétrico, calados y contraste de lu",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Siren Gaze Camiseta de tirantes sin espalda informal de verano para mujer, de moda para uso al aire",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN EZwear Blusa suelta de mujer de manga corta con cuello redondo en malla roja",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Crema BB bloqueador solar blanqueadora SPF50 PA+++, libre de aceite, hidratante, loción bloqueadora",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 185.0,
        "subtotal": 370.0
      }
    ]
  },
  {
    "id": "FAC-2324",
    "cliente": "Madelyn zona 14",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:35 AM",
    "itemsCount": 2,
    "subtotal": 151.79,
    "iva": 18.21,
    "total": 170.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "termo con filtro",
        "cantidad": 2,
        "precioUnitario": 85.0,
        "subtotal": 170.0
      }
    ]
  },
  {
    "id": "FAC-2323",
    "cliente": "Sandra Hernández (Pueblito)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:26 AM",
    "itemsCount": 4,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "brillo",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 20.0
      },
      {
        "nombre": "traje color blanco con negro",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2322",
    "cliente": "Yomara Cabrera",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:18 AM",
    "itemsCount": 6,
    "subtotal": 470.98,
    "iva": 56.52,
    "total": 527.5,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "loción",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 12.5
      },
      {
        "nombre": "cadena dorada de cruz",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 200.0,
        "subtotal": 400.0
      },
      {
        "nombre": "tenis negros",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2321",
    "cliente": "Flor Argueta",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:18 AM",
    "itemsCount": 5,
    "subtotal": 629.46,
    "iva": 75.54,
    "total": 705.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Firerie Vestido mini de malla con espalda abierta y flores para mujer, vestido de manga trompeta par",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Bolsa de maquillaje portátil y duradera, organizador de cosméticos de gran capacidad y múltiples com",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "YZIMENG Set de 4 piezas de brochas de maquillaje profesionales de doble uso - Brocha de base perfila",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 185.0,
        "subtotal": 370.0
      }
    ]
  },
  {
    "id": "FAC-2320",
    "cliente": "Verónica Cuque",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "22/03/2026 03:16 AM",
    "itemsCount": 2,
    "subtotal": 254.46,
    "iva": 30.54,
    "total": 285.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "CottageSlumber Conjunto de pijama con top tipo camiseta de unicolor y shorts con estampado de flores",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2319",
    "cliente": "Meli Lainez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM HAIR Locked in Barra de peinado fuerte con brillo brillante, 30 g, barra de cera suave para  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2318",
    "cliente": "Ivón Méndez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Gafas de moda poligonales para mujer, accesorio para salidas",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2317",
    "cliente": "Gaby vecina de Wendy Monzón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Go Go Glow Bruma iluminadora corporal-Fairy Twinkle Marca Belleza Maquillaje Maquullaje Cosm",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2316",
    "cliente": "Jerly C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 6,
    "subtotal": 937.5,
    "iva": 112.5,
    "total": 1050.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Un par de los talla grande vendidos del verano, las sandalias planas caladas con diseño de ganchos p",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEIN Juego De Ropa Informal Para Casa De Niña Joven Con Diseño Floral Y Cuello Redondo En Color Sól",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Conjunto casual de 2 piezas para niñas jóvenes en primavera/verano: top corto de punto calado y vest",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "LMoss Kids Conjunto de 2 piezas para niña joven LMoss: Blusa de punto de unicolor con cuello de vola",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "SHEIN Conjunto casual de 2 piezas de camiseta de manga corta con estampado de oso de dibujos animado",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "SHEIN Conjunto de 2 piezas de camiseta de manga corta con cuello redondo y gráfico de retrato casual",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      }
    ]
  },
  {
    "id": "FAC-2315",
    "cliente": "Iraida Contreras",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 4,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Franclia Vestido corto de línea A con cuello redondo sin mangas, de mujer, en color albaricoque, con",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "fragancia para el cabello",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "indian collection París Parfum",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "Desmaquillante de arroz",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2314",
    "cliente": "Jacky Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 2,
    "subtotal": 303.57,
    "iva": 36.43,
    "total": 340.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Conjunto de 2 piezas de tankini casual y entallado con estampado de baloncesto que brilla en l",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "Swim Lushoire Tankini con cordones a los lados y estampado floral para la playa en verano",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      }
    ]
  },
  {
    "id": "FAC-2313",
    "cliente": "Esmeralda familiar de Davis",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 2,
    "subtotal": 379.46,
    "iva": 45.54,
    "total": 425.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Conjunto informal de 2 piezas para niñas preadolescentes con top sin mangas con cuello Peter Pan y p",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Conjunto informal de 2 piezas para niñas preadolescentes con sudadera con estampado floral de otoño",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      }
    ]
  },
  {
    "id": "FAC-2312",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 7 piezas - Bragas triangulares sin costuras con estampado floral, con acabado ondulado, sexy",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2311",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 2,
    "subtotal": 303.57,
    "iva": 36.43,
    "total": 340.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Serisse Kids Vestido casual y dulce para niña preadolescente con escote cuadrado, cintura con",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Conjunto de bikini de 3 piezas con estampado de rayas rosa y blanco para mujer, estilo bohemio elega",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2310",
    "cliente": "Lupita Salón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:21 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Falda de satén de cintura alta, simple y elegante, de color negro, para fiestas, vuelta al colegio,",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2309",
    "cliente": "Gaby hermana Paola",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Snug Zone Conjunto de pijama de camiseta y pantalones cortos con parches de encaje, elástico y espal",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2308",
    "cliente": "Michelle Dávila",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Enterizo completo reductor de talla plus con faja de control de abdomen y entrenador de cint",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2307",
    "cliente": "Kyrian Aguirre",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 3,
    "subtotal": 375.0,
    "iva": 45.0,
    "total": 420.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pantalones largos ajustados de un solo color con cinturilla cruzada, atuendos para mujer para festiv",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "1 pieza Sujetador convertible de mujer invisible de 3 formas sin espalda para el verano",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEGLAM Matinée in L.A. Paleta de 15 colores Brillos Marca Belleza Maquillaje Maquullaje Cosmética p",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2306",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Vestido de mujer de cuello redondo ajustado sin mangas con estampado de rayas, primavera/vera",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2305",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 2,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN EZwear Vestido tipo camisola de verano con estampado completo y división para vacaciones de oc",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEGLAM Lip Link Mini Paleta de Brillo Labial Pulsera Marca Belleza Maquillaje Maquullaje Cosmética",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2304",
    "cliente": "Silvia Roldán",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 1,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Moldeador corporal para mujer con control de abdomen, body moldeador negro con cierre y aper",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2303",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 4,
    "subtotal": 388.39,
    "iva": 46.61,
    "total": 435.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Soleia Vestido midi de Body ceñido con cuello halter, nudo delantero y bajo asimétrico con estampado",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEGLAM Lashlighter Up & Out Máscara de pestañas Marca Belleza Maquillaje Maquullaje Cosmética para",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Lashlighter Tratamiento de pestañas de fácil eliminación Marca Belleza Maquillaje Maquullaje (Eliminador)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Conjunto de pijama de satén con estampado de labios",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2302",
    "cliente": "Fernanda fam katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 2,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Soleia Nuevo conjunto informal de vacaciones de primavera/verano para invitados a bodas en la playa,",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Soleia Vestido ajustado con estampado floral casual, de tirantes ajustables, adecuado para vacacione",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2301",
    "cliente": "Elva Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 4,
    "subtotal": 410.71,
    "iva": 49.29,
    "total": 460.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Resyla Camiseta gráfica de mujer con efecto de mezclilla y bordado de mariposa, decorada con lazo de",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Resyla Camiseta de mujer de cuello redondo con estampado de leopardo, gráfico de corazón y ribete de",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Resyla Camiseta de manga corta con cuello redondo y estampado de corazón, versátil y casual para uso",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "HEYXI Barra de coloración capilar 3 en 1 | Con dientes de peine, tinte de emergencia, ¡salvador del",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2300",
    "cliente": "Liria Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 4,
    "subtotal": 450.89,
    "iva": 54.11,
    "total": 505.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "EMERY ROSE Camiseta de manga corta con estampado de letra de eslogan ÁNGELES GRÁFICOS para mujer",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Franclia Camiseta sin mangas casual con botones de cuarto de mujer, elegante y de moda",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Camiseta casual de manga corta de seda de leche con forma de corazón para mujer, adecuada para el ve",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "INAWLY Camiseta de manga corta con estampado de mariposa en color vino tinto para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2299",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 4,
    "subtotal": 437.5,
    "iva": 52.5,
    "total": 490.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "5 piezas Bragas de bikini acanaladas con borde ondulado y decoración de moño para mujer",
        "cantidad": 1,
        "precioUnitario": 135.0,
        "subtotal": 135.0
      },
      {
        "nombre": "Crema para los ojos con retinol - Reduce las líneas finas, las ojeras, las bolsas y la hinchazón de",
        "cantidad": 2,
        "precioUnitario": 85.0,
        "subtotal": 170.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2298",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 3,
    "subtotal": 60.27,
    "iva": 7.23,
    "total": 67.5,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 12.5
      },
      {
        "nombre": "protector térmico",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2297",
    "cliente": "Maybelin Central Depot",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "traje de baño negro con blanco",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2296",
    "cliente": "Eyla Duarte",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "traje de baño colores",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2295",
    "cliente": "Marlen Ramírez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa blanca floriada",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2294",
    "cliente": "Jesica Galindo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 3,
    "subtotal": 102.68,
    "iva": 12.32,
    "total": 115.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa de corazon",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "mono animal print",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2293",
    "cliente": "Eli C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 6,
    "subtotal": 216.52,
    "iva": 25.98,
    "total": 242.5,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 15.0
      },
      {
        "nombre": "tenis blancos cinta gruesa",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      },
      {
        "nombre": "pulsera de fresita",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 15.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 12.5
      },
      {
        "nombre": "set de maquillaje",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2292",
    "cliente": "Eisy Cabrera",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 2,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "argollas doradas grandes",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "cadena de amistad",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2291",
    "cliente": "María Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 2,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa colores",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "gorra negra",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2290",
    "cliente": "Ash Hernández",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:20 PM",
    "itemsCount": 2,
    "subtotal": 129.46,
    "iva": 15.54,
    "total": 145.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa de encaje blanca",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "croptop negro",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2289",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "estuche varios",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2288",
    "cliente": "Ruth Iguardia",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 2,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cuaderno kuromi",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "cuaderno stitch 3d",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2287",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 5,
    "subtotal": 727.68,
    "iva": 87.32,
    "total": 815.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Zestiva Conjunto de bikini de 2 piezas para mujer con cinta de rayas onduladas, para el verano",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Bellisia Conjunto de tankini de playa con diseño de volantes con cuentas y espalda descubierta con l",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Porcelain Marca Belleza Maquillaje Maquullaje Cosmética  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "traje de baño rosa",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "pantunflas stitch",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2286",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 4,
    "subtotal": 535.71,
    "iva": 64.29,
    "total": 600.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN EZwear Set de 3 camisetas casuales de mujer de corte ajustado con cuello polo, bordado de caba",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEIN EZwear Tank Top Acanalado De Un Solo Color Para Mujer",
        "cantidad": 1,
        "precioUnitario": 190.0,
        "subtotal": 190.0
      },
      {
        "nombre": "Bolso bandolera de mujer con forma de concha marina, embellecido con perlas falsas. Elegante bolso d",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "marcadores 24 pzs",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2285",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 3,
    "subtotal": 263.39,
    "iva": 31.61,
    "total": 295.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "chumpa color negro",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      },
      {
        "nombre": "VaVaBold Camiseta de mujer de ajuste ceñido con cuello en V de unicolor, camiseta casual asimétrica,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Genkimix Kids 1 Set de Estilo Deportivo Casual de Moda Joven para Niños con Estampado de Letra Calif",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2284",
    "cliente": "Miriam C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Venta de Artículos Varios",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2283",
    "cliente": "Katy HERNÁNDEZ Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 2,
    "subtotal": 254.46,
    "iva": 30.54,
    "total": 285.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "PAORPEVM 1/2 piezas Gel exfoliante suave de 50g, limpia la piel, reduce los poros, hidrata y nutre,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEIN Girlism paquete de 4 camisetas de manga corta casuales de unicolor y ajuste ceñido para adoles",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2282",
    "cliente": "Fabiola Tahuite (funeraria)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 2,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Manfinity CasualCool Camisa de manga larga con estampado de paisley de estilo casual retro para homb",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEGLAM Rubor En Polvo Divine Flush Matte Blush-Tangerine Rubor En Polvo Altamente Pigmentado Que No",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2281",
    "cliente": "Jesica Garcia (yeye)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 2,
    "subtotal": 540.18,
    "iva": 64.82,
    "total": 605.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Pariaura Conjunto de chaleco con botones, blazer y pantalones cortos para ropa de Año Nuevo",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      },
      {
        "nombre": "Sandalias de plataforma de cuña para mujeres, suela gruesa, correa elástica, sandalias minimalistas",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2280",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 5,
    "subtotal": 254.46,
    "iva": 30.54,
    "total": 285.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 15.0
      },
      {
        "nombre": "set de aretes plateados",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "24 uñas acrílicas ovaladas con estampado de lunares al estilo francés, ajuste perfecto. El set inclu",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "Juego de 10 piezas de arte de uñas hecho a mano, en forma de trapecio corto de color rojo, con temas",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "termo con filtro",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2279",
    "cliente": "Iraida Contreras",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Cárdigan abierto tipo kimono ligero con cuello en forma de chal, mangas 3/4 relajadas, estampado de",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2278",
    "cliente": "Alejandra amiga De Katerin",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Privé Camiseta casual con estampado integral, cuello de strass, anudada por delante y calada",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2277",
    "cliente": "Monica Herrera (el carmén)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 3,
    "subtotal": 232.14,
    "iva": 27.86,
    "total": 260.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "falda de cuero",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "90ml Aceite humectante para después del afeitado con aroma a fresa, fórmula reafirmante, nutrición p",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "PAORPEVM 1/2 piezas Gel exfoliante suave de 50g, limpia la piel, reduce los poros, hidrata y nutre,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2276",
    "cliente": "Rosana Esquité",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Delineador De Ojos En áNgulo Pro-Flex, Negro, Delineador De Ojos Mate De Alta PigmentacióN P",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2275",
    "cliente": "Sofía vecina",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 3,
    "subtotal": 312.5,
    "iva": 37.5,
    "total": 350.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "traje de baño floral",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Conjunto de 2 piezas de gafas de sol con estampado de leopardo y camiseta y pantalones cortos para n",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Set de 2 piezas Top de camiseta de manga corta fina y pantalón corto inferior, estilo de vestimenta",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2274",
    "cliente": "Jacky Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Tops de tirantes y camisetas de mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN LUNE Camiseta casual de mujer de manga corta con cuello redondo, textura de jacquard de unicol",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Jeta Ari Camiseta Ajustada Con Cuello Asimétrico Fruncido De Color Sólido",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2273",
    "cliente": "Brenda Herrarte",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Tops de tirantes y camisetas de mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Frenchy Camiseta de manga larga de unicolor casual, versátil para el otoño",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2272",
    "cliente": "Delmy hermana de Ivón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 1,
    "subtotal": 0.0,
    "iva": 0.0,
    "total": 0.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Gloray Vestido midi elegante y ajustado sin tirantes con pliegues para mujer",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2271",
    "cliente": "Adry Rosales",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN EZwear Set de 3 camisetas de manga larga de cuello redondo con estampado gráfico, de ajuste ce",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2270",
    "cliente": "Andrea amiga de Flor",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 3,
    "subtotal": 276.79,
    "iva": 33.21,
    "total": 310.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 Set Camiseta de manga corta de cuello redondo con estampado de letras negras y pantalones cortos p",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Breezaya Vestido mini con tirantes de espagueti y estampado floral ditsy con lazo",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "boxer de caballero",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "FAC-2269",
    "cliente": "Jerly C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 2,
    "subtotal": 169.64,
    "iva": 20.36,
    "total": 190.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa blanca rayas celestes y rosadas",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "SHEIN Set de 2 piezas de conjunto informal para niña con camiseta de manga corta de cuello redondo c",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2268",
    "cliente": "Kimberly Marroquín",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:17 PM",
    "itemsCount": 3,
    "subtotal": 343.75,
    "iva": 41.25,
    "total": 385.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa negra con cuello blanco",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 pieza con patrón de corazón calculadora",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Hailicare Masajeador de pies portátil con vibración y calefacción, con protección para el tobillo. M",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2267",
    "cliente": "kimm Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:16 PM",
    "itemsCount": 3,
    "subtotal": 294.64,
    "iva": 35.36,
    "total": 330.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "blusa beige de manga larga kim",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "blusa blanca rayas celestes y rosadas",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "SHEIN MOD Vestido mini casual de mujer de jean con parches",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      }
    ]
  },
  {
    "id": "FAC-2266",
    "cliente": "Monica Herrera (el carmén)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:16 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Sand Marca Belleza Maquillaje Maquullaje Cosmética para  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2265",
    "cliente": "Any Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 5,
    "subtotal": 687.5,
    "iva": 82.5,
    "total": 770.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "traje de caballero",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "suéter zich",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Coolane Blusa casual de manga corta con cuello redondo y estampado de periódico en malla",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "345 Crema Hidratante, Capacidad grande de 150g, Proporciona efectos hidratantes y nutritivos para la",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Soleia Conjunto de 3 piezas con top corto de punto para vacaciones, con diseño ajustado, lazo decora",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2264",
    "cliente": "Any nueva Z2 SCP",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 3,
    "subtotal": 316.96,
    "iva": 38.04,
    "total": 355.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Camiseta de manga larga de mujer de moda elegante con hombro descubierto y dobladillo a raya",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Elenzga Tops de tirantes y camisetas de mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Conjunto de bikini con estampado floral elegante y lujoso para mujeres en invierno y verano, traje d",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2263",
    "cliente": "Nohemí Tahuite",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Soleia Vestido suéter para mujer con escote en V, tirantes finos, recortes y estrellas de mar metáli",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "LLavero de Acero Inoxidable Grabado en Español para Papá - Regalo del Día del Padre con Diseño \"Papá (1 PC)",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2262",
    "cliente": "Gaby amiga de Jessica",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 2,
    "subtotal": 223.21,
    "iva": 26.79,
    "total": 250.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Privé Blusa brillante de manga larga con parches de lentejuelas y malla, elegante para fiesta,",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Privé Blusa elegante de manga larga con lentejuelas y parches de malla brillante, adecuada par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2261",
    "cliente": "Karina tia de Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN Essnce Camiseta con estampado de rayas de hombros descubiertos",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN LUNE Camiseta casual de mujer de manga corta con cuello redondo, textura de jacquard de unicol",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2260",
    "cliente": "Jeny amiga de Flor",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Breezaya Vestido con volantes y espalda con lazo con estampado floral aleatorio todo sobre, vestimen",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2259",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Set de 2 piezas de conjunto casual de mujer de unicolor con nudo, para primavera/verano",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2258",
    "cliente": "Verónica Cuque",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 3,
    "subtotal": 513.39,
    "iva": 61.61,
    "total": 575.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Elenzga Vestido largo elegante de aspecto de mezclilla azul con hombros descubiertos y cinturón para",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEIN Clasi Vestido de vacaciones informal con estampado de plantas para tallas grandes",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "Manfinity Dauomo Conjunto de camisa de manga corta minimalista con color de contraste para hombres y",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2257",
    "cliente": "Ceci Delgado",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Save lt Gel laminador para cejas Marca Belleza Maquillaje Maquullaje Cosmética para Mujeres  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2256",
    "cliente": "Jesica Garcia (yeye)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Traje de baño de una pieza de unicolor, sexy, con escote en V y contraste de color para vacaciones e (S)",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2255",
    "cliente": "Jesica Paola",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 138.39,
    "iva": 16.61,
    "total": 155.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM HAIR Suero de protección sin enjuague Hot Streak, 150 ml/5 onzas líquidas, spray protector d (unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2254",
    "cliente": "Esposa Fernando",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 2,
    "subtotal": 187.5,
    "iva": 22.5,
    "total": 210.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Hydra jelly Pocket Bálsamo labial-Sugar Swirl lip combo Marca Belleza Maquillaje Maquullaje  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2253",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 4,
    "subtotal": 486.61,
    "iva": 58.39,
    "total": 545.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEIN PETITE Falda con estampado floral de muslo con abertura (Petite XS)",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEIN Lencería De Sujetador Con Aros Y Encaje Floral (S)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Panties De Triángulo Decoradas Con Borde De Concha Y Malla En El Medio (S)",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "Breezaya Falda con estampado floral ditsy, dobladillo asimétrico con volantes, cintura alta, ajuste  (XS)",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2252",
    "cliente": "Aby Hermana de Any",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Rubor En Polvo Divine Flush Matte Blush-Insta Flame Rubor En Polvo Altamente Pigmentado Que  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM LáPiz Corrector De Poros, Corrector De Oleosidad, Minimizador De Poros, Base De Maquillaje F (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "The Superman | SHEGLAM Good Grip Fresco Calmante Prebase Marca Belleza Maquillaje Maquullaje Cosméti (Reafirmante)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2251",
    "cliente": "Majo De Jirón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "20g Barra de protector solar SPF 50+PA+++, adecuado para protección solar, protección al aire libre, (1 Uds)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2250",
    "cliente": "Jacky Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 3,
    "subtotal": 352.68,
    "iva": 42.32,
    "total": 395.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Llavero de cuero personalizado con foto, llavero personalizado con foto, llavero de cuero personaliz",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Nuevas sandalias de mula sin espalda de moda 2025, versátiles sandalias sin cordones con suela bland (CN37)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Sandalias tipo mula con cierre deslizante para mujer ZPWZ2025 Nuevas, versátiles y elegantes, con su (CN37)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2249",
    "cliente": "Cintia Rodriguez, hermana de Jeni Waleska",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 4,
    "subtotal": 401.79,
    "iva": 48.21,
    "total": 450.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM HAIR Suero de protección sin enjuague Hot Streak, 150 ml/5 onzas líquidas, spray protector d (unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM HAIR Suero revitalizante para el cuero cabelludo, rollo refrescante de agua alpina, rollo de (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEGLAM HAIR Champú seco voluminizador Minty Fresh, polvo refrescante, volumen instantáneo, efecto e (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "1 pieza Billetera de moda personalizada para hombres - Grano de árbol de piel sintética personalizad",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2248",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Crema para los ojos con retinol - Reduce las líneas finas, las ojeras, las bolsas y la hinchazón de",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2247",
    "cliente": "Graciela García",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Amorya Camisa de mujer de manga larga con solapa de satén de acetato de unicolor elegante (M)",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2246",
    "cliente": "Gaby El campo por el proyecto",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Corrector En Crema Rapid Retouch-Linen Corrector En Crema Rapid Retouch-Linen Corrector En C (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2245",
    "cliente": "panadería la Cumbre",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "The Twilight Saga X SHEGLAM Soulmates Perfume Sólido Marca Belleza Maquillaje Maquullaje Cosmética p (5ml)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2244",
    "cliente": "Michelle Dávila",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolso cuadrado pequeño de diseño de onda de moda 2025 para mujeres, bolso de hombro y cruzado con bo (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2243",
    "cliente": "Karina Grajeda",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:12 PM",
    "itemsCount": 1,
    "subtotal": 133.93,
    "iva": 16.07,
    "total": 150.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Base De Maquillaje Mate Duradera Y Transpirable Complexion Pro-Buttercream Base De Maquillaj (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2242",
    "cliente": "Julissa Pumay",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:10 PM",
    "itemsCount": 8,
    "subtotal": 901.79,
    "iva": 108.21,
    "total": 1010.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolso bandolera con forma de corazón de encaje, bolso de hombro con bordado de estilo elegante",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Glass Lock Air Brillo Labial-Hard Candy lip combo Marca Belleza Maquillaje Maquullaje Cosmét (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Glass Lock Air Brillo Labial-That's My Jam lip combo Marca Belleza Maquillaje Maquullaje Cos (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Glass Lock Air Brillo Labial-Own It lip combo Marca Belleza Maquillaje Maquullaje Cosmética  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Soft Haze Lip Blur-Just Smooches De 6 Colores, Resistente Al Agua, Tint (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Iluminador Corporal Sunkissed-Iluminador LíQuido Eros Iluminador Corporal De Larga DuracióN  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Shell Marca Belleza Maquillaje Maquullaje Cosmética para (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Peach Marca Belleza Maquillaje Maquullaje Cosmética para (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "FAC-2241",
    "cliente": "Liseth Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 07:01 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolsa pequeña de estilo sencillo y tela de nailon con diseño de mariposa, nueva bolsa de moda cruzad (XG8857)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2240",
    "cliente": "Lupita Salón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:58 PM",
    "itemsCount": 1,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHAQINUO Set quitamascara, máscara voluminizadora y rizadora, color de larga duración, resistente al",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "FAC-2239",
    "cliente": "Alejandra sobrina de Ana Carín",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:58 PM",
    "itemsCount": 2,
    "subtotal": 209.82,
    "iva": 25.18,
    "total": 235.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Soft Haze Lip Blur-Think Twice De 6 Colores, Resistente Al Agua, Tinte  (Unitalla, Medium)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEGLAM Base De Maquillaje Mate Duradera Y Transpirable Complexion Pro-Bamboo Matte Base De Maquilla (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "FAC-2238",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:57 PM",
    "itemsCount": 3,
    "subtotal": 339.29,
    "iva": 40.71,
    "total": 380.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Fair Marca Belleza Maquillaje Maquullaje Cosmética para  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Soft Haze Lip Blur-Just Smooches De 6 Colores, Resistente Al Agua, Tint (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2237",
    "cliente": "Adry Rosales",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:57 PM",
    "itemsCount": 8,
    "subtotal": 852.68,
    "iva": 102.32,
    "total": 955.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Porcelain Marca Belleza Maquillaje Maquullaje Cosmética  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM Fall In Line Delineador de Labios Despegable con Tinte-Bare Blush lip combo Marca Belleza Ma (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Glass Glow Colorete en barra-Pink Lemonade rare,colorete Marca Belleza Maquillaje Maquullaje (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM LáPiz Iluminador Y Contorno De Nariz 2 En 1 Fine Line, LáPiz Iluminador De 2 Colores, No Gra (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "LáPiz Depilatorio Ez Control Y TóNico Calmante Sheglam Ez Control Cera Agradable Para La Piel FóRmul (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Corrector De Alta Cobertura Perfect Skin-Linen 20 Tonos Corrector LíQuido Brocha Hidratante  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "20g Barra de protector solar SPF 50+PA+++, adecuado para protección solar, protección al aire libre, (1 Uds)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Longwear Invisible Hold Pegamento para Pestañas-Clear Marca Belleza Maquillaje Maquullaje Co (Alargamiento)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2236",
    "cliente": "Kimberly Marroquín",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:57 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Mochila de nailon de unicolor y moda informal, con gran capacidad, compartimento para portátil, port (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2232",
    "cliente": "Any nueva Z2 SCP",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:44 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Mochila informal de estilo universitario para mujer de tela de nailon de unicolor",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2229",
    "cliente": "Glendy esposa Erick",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:39 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolso Bandolera para Mujer con Correas Ajustables y 3 Opciones de Color - Bolso de Hombro de Gran Ca (19,99 cm x 3,0 cm x 15,01 cm, Negro)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso de mujer de moda con pespunte, bolso bandolera, embrague, bolso sobre, decoración metálica rec",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2221",
    "cliente": "Celeste prima Jesica",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:36 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "1 pieza Bolso de hombro de gran capacidad con cierre de cremallera y decoración de ciervo de poliést (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2220",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:34 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2217",
    "cliente": "Irene C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:28 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Nueva bolsa de mano minimalista de moda con estampado de fresa, diseño cuadrado, bolsillo exterior 3",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2213",
    "cliente": "Ana Carin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:21 PM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Nuevo bolso de mujer de moda informal de piel de PU con diseño de un solo hombro, disponible en negr",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso en forma de media luna con pliegues, bufanda de seda y decoración de lazo para mujeres, bolso  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2207",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:08 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolsa organizadora de maquillaje con estampado vintage, nueva para el verano 2025. Bolso de mano, bo (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2205",
    "cliente": "Yanira Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 06:01 PM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Efectivo",
    "estado": "Crédito",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolso De Brazalete Para Correr Deportivos, Mini Bolsa De Teléfono Bandolera De Nylon, Bolsa De Crema",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso de pecho/riñonera de material de nailon de alta capacidad, unisex para uso diario, deportivo,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Mini bolso de hombro de verano plateado de PVC con impresión láser de letras, Bolso cruzado de moda  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2199",
    "cliente": "Viky ref Dayana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 05:46 PM",
    "itemsCount": 2,
    "subtotal": 178.57,
    "iva": 21.43,
    "total": 200.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Mini bolso de hombro de verano plateado de PVC con impresión láser de letras, Bolso cruzado de moda  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso De Brazalete Para Correr Deportivos, Mini Bolsa De Teléfono Bandolera De Nylon, Bolsa De Crema",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2194",
    "cliente": "hermana Irene",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 05:46 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2193",
    "cliente": "Valery Blanco",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 05:46 PM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2192",
    "cliente": "Claudia prima de Mónica",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 05:46 PM",
    "itemsCount": 4,
    "subtotal": 357.14,
    "iva": 42.86,
    "total": 400.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolsa pequeña de estilo sencillo y tela de nailon con diseño de mariposa, nueva bolsa de moda cruzad (XG8857)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso bandolera con forma de corazón de encaje, bolso de hombro con bordado de estilo elegante",
        "cantidad": 2,
        "precioUnitario": 100.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Bolsa organizadora de maquillaje con estampado vintage, nueva para el verano 2025. Bolso de mano, bo (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2190",
    "cliente": "Wendy Alvarez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 05:39 PM",
    "itemsCount": 5,
    "subtotal": 263.39,
    "iva": 31.61,
    "total": 295.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "tenis blancos",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      },
      {
        "nombre": "vestido animal print",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "pantalonera con estampado de flores",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "shampoo maionese capilar",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "termo con filtro",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2185",
    "cliente": "Wendy Alvarez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 05:31 PM",
    "itemsCount": 3,
    "subtotal": 267.86,
    "iva": 32.14,
    "total": 300.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Bolso de hombro versátil, casual, retro y minimalista de moda",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Nueva bolsa de mano minimalista de moda con estampado de fresa, diseño cuadrado, bolsillo exterior 3",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso en forma de media luna con pliegues, bufanda de seda y decoración de lazo para mujeres, bolso  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2183",
    "cliente": "Wendy amiga de Tania",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "21/03/2026 05:28 PM",
    "itemsCount": 3,
    "subtotal": 339.29,
    "iva": 40.71,
    "total": 380.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Sand Marca Belleza Maquillaje Maquullaje Cosmética para  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM LáPiz De Contorno Facial Multi-Glam, Mediano, De 6 Colores, No Graso, De Larga DuracióN, Iluminador Natural, De Doble Uso, Multiuso, Esculpe, Suaviza Las LíNeas Finas, Contorno Cremoso Marca Belleza Maquillaje Maquullaje CosméTica Para Mujeres NiñAs Perfecto Para Invierno Primavera Ideal Para Y2K Elegante Moda Adecuado Para CumpleañOs Regalo Fiesta Listo Mejor Color",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2175",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:59 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2174",
    "cliente": "Wendy Alvarez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:59 AM",
    "itemsCount": 2,
    "subtotal": 330.36,
    "iva": 39.64,
    "total": 370.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 185.0,
        "subtotal": 370.0
      }
    ]
  },
  {
    "id": "FAC-2172",
    "cliente": "Alejandra Beteta",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:59 AM",
    "itemsCount": 1,
    "subtotal": 111.61,
    "iva": 13.39,
    "total": 125.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "FAC-2167",
    "cliente": "Jesica Paola",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:58 AM",
    "itemsCount": 1,
    "subtotal": 75.89,
    "iva": 9.11,
    "total": 85.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "90ml Aceite humectante para después del afeitado con aroma a fresa, fórmula reafirmante, nutrición p",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "FAC-2165",
    "cliente": "Darlyn Pinula",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:58 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2164",
    "cliente": "Any nueva Z2 SCP",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:58 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2163",
    "cliente": "Monica Barillas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:58 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2162",
    "cliente": "Maybelin Central Depot",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:58 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2161",
    "cliente": "Waleska Laguna Bermeja",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:58 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2160",
    "cliente": "Melissa Central Depot",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:58 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2159",
    "cliente": "Andrea Agustin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:58 AM",
    "itemsCount": 2,
    "subtotal": 330.36,
    "iva": 39.64,
    "total": 370.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 185.0,
        "subtotal": 370.0
      }
    ]
  },
  {
    "id": "FAC-2157",
    "cliente": "Diana por los taxis",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "17/03/2026 03:57 AM",
    "itemsCount": 1,
    "subtotal": 165.18,
    "iva": 19.82,
    "total": 185.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "FAC-2150",
    "cliente": "Maybelin Central Depot",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 10:15 PM",
    "itemsCount": 7,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aceite labial",
        "cantidad": 6,
        "precioUnitario": 15.0,
        "subtotal": 90.0
      },
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2149",
    "cliente": "Gaby hermana Paola",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 10:12 PM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2148",
    "cliente": "Paola vecina Pupo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 10:10 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2147",
    "cliente": "Alejandra amiga De Katerin",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 10:08 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2146",
    "cliente": "Andrea Salón",
    "nit": "cf",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 10:03 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "estante de almacenamiento giratorio",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2145",
    "cliente": "Verónica Cuque",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 10:01 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "estante de almacenamiento giratorio",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2144",
    "cliente": "panadería la Cumbre",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 09:59 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "estante de almacenamiento giratorio",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2143",
    "cliente": "Yeimi Rodríguez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 09:57 PM",
    "itemsCount": 1,
    "subtotal": 31.25,
    "iva": 3.75,
    "total": 35.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "estante de almacenamiento giratorio",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "FAC-2142",
    "cliente": "Andrea Agustin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 09:55 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2141",
    "cliente": "Monica Ramírez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 09:43 PM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2140",
    "cliente": "Marcela hija de Sonia",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 09:42 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lipgloss",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2139",
    "cliente": "Monica Barillas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 09:41 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lipgloss",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2134",
    "cliente": "Sandra Hernández (Pueblito)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 09:21 PM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lipgloss",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2133",
    "cliente": "Katy Sánchez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 09:20 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2128",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 09:03 PM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Venta de Artículos Varios",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2124",
    "cliente": "Aby Velásquez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 08:51 PM",
    "itemsCount": 2,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "aceite labial",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2123",
    "cliente": "Becky San José Pinula",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 08:49 PM",
    "itemsCount": 1,
    "subtotal": 13.39,
    "iva": 1.61,
    "total": 15.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Venta de Artículos Varios",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "FAC-2122",
    "cliente": "Edna Don Justo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 08:39 PM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "lipgloss",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2121",
    "cliente": "Flor amiga de Katerin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "31/01/2026 08:37 PM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2115",
    "cliente": "Cindy Alcantara",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:45 AM",
    "itemsCount": 4,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "peine stitch encapsulado",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "brillo 3147",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 0.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2114",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:45 AM",
    "itemsCount": 1,
    "subtotal": 8.93,
    "iva": 1.07,
    "total": 10.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolígrafo kuromi",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2113",
    "cliente": "Nancy Castillo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:45 AM",
    "itemsCount": 1,
    "subtotal": 8.93,
    "iva": 1.07,
    "total": 10.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2112",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:45 AM",
    "itemsCount": 1,
    "subtotal": 8.93,
    "iva": 1.07,
    "total": 10.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "duo calcetas cortas",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2111",
    "cliente": "Aby Velásquez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:45 AM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "Venta de Artículos Varios",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2110",
    "cliente": "Sara Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:45 AM",
    "itemsCount": 2,
    "subtotal": 8.93,
    "iva": 1.07,
    "total": 10.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolígrafo 84",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "bolígrafo 079",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "FAC-2109",
    "cliente": "jessi C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:45 AM",
    "itemsCount": 1,
    "subtotal": 22.32,
    "iva": 2.68,
    "total": 25.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2108",
    "cliente": "Andrea Davila",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:45 AM",
    "itemsCount": 3,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "brillo 3147",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2107",
    "cliente": "Jenifer Cali",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:45 AM",
    "itemsCount": 3,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolígrafo 079",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2105",
    "cliente": "kimm Castellanos",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:44 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "peine stitch encapsulado",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2104",
    "cliente": "Clemencia Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:44 AM",
    "itemsCount": 3,
    "subtotal": 33.93,
    "iva": 4.07,
    "total": 38.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "bolígrafo kuromi",
        "cantidad": 1,
        "precioUnitario": 8.0,
        "subtotal": 8.0
      },
      {
        "nombre": "brillo",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2103",
    "cliente": "Yoshi C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:43 AM",
    "itemsCount": 5,
    "subtotal": 58.04,
    "iva": 6.96,
    "total": 65.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "brillo 3147",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 0.0
      },
      {
        "nombre": "cuaderno stitch",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2102",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:43 AM",
    "itemsCount": 4,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "brillo 3147",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 0.0
      },
      {
        "nombre": "carpeta para hojas transparente",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2101",
    "cliente": "Valery Blanco",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:43 AM",
    "itemsCount": 5,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cuaderno Stitch efecto agua",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "sacapuntas  stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "FAC-2098",
    "cliente": "Alejandra Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:40 AM",
    "itemsCount": 17,
    "subtotal": 226.79,
    "iva": 27.21,
    "total": 254.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "bolígrafo 079",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "protector para cargador de stitch",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "goma solido",
        "cantidad": 1,
        "precioUnitario": 6.0,
        "subtotal": 6.0
      },
      {
        "nombre": "marcadores 24 pzs",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "cuaderno stitch 3d",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "cuaderno kuromi",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 25.0
      },
      {
        "nombre": "tabla capibara para hojas",
        "cantidad": 1,
        "precioUnitario": 8.0,
        "subtotal": 8.0
      },
      {
        "nombre": "paquete stiker 3D",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "pulcera fresita",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 0.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "carpeta para hojas transparente",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2093",
    "cliente": "Sara Ramírez",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:37 AM",
    "itemsCount": 10,
    "subtotal": 116.07,
    "iva": 13.93,
    "total": 130.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "marcadores 24 pzs",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      },
      {
        "nombre": "bolígrafo 84",
        "cantidad": 3,
        "precioUnitario": 5.0,
        "subtotal": 15.0
      },
      {
        "nombre": "bolígrafo 079",
        "cantidad": 3,
        "precioUnitario": 5.0,
        "subtotal": 15.0
      },
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "FAC-2088",
    "cliente": "Angélica Pueblo Nuevo Viñas",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:33 AM",
    "itemsCount": 6,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "duo calcetas cortas",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      },
      {
        "nombre": "bolígrafo 84",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "FAC-2086",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:32 AM",
    "itemsCount": 6,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "sacapuntas  stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FAC-2085",
    "cliente": "Becky San José Pinula",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:32 AM",
    "itemsCount": 5,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "brillo",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      },
      {
        "nombre": "cuaderno kuromi",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "juego de joyería",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 0.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "sacapuntas la bubu",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2083",
    "cliente": "Blanca comercial Eden",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:30 AM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "peine stitch encapsulado",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "FAC-2082",
    "cliente": "Yanira Hernández",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:30 AM",
    "itemsCount": 2,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2081",
    "cliente": "Andrea Agustin",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 03:30 AM",
    "itemsCount": 6,
    "subtotal": 93.75,
    "iva": 11.25,
    "total": 105.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "cuaderno stitch 3d",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "sacapuntas  stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "protector para cargador de stitch",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2076",
    "cliente": "Rous Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 01:55 AM",
    "itemsCount": 9,
    "subtotal": 116.07,
    "iva": 13.93,
    "total": 130.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "calcetas",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "cuaderno stitch",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "ropa interior hello kity",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "carpeta para hojas transparente",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2071",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 01:51 AM",
    "itemsCount": 7,
    "subtotal": 116.96,
    "iva": 14.04,
    "total": 131.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sombra romántic bird",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 30.0
      },
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "libreta capibara",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "calcetas hello kity",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "goma solido",
        "cantidad": 1,
        "precioUnitario": 6.0,
        "subtotal": 6.0
      },
      {
        "nombre": "bolígrafo 84",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "FAC-2065",
    "cliente": "Andrea Valencia",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 01:46 AM",
    "itemsCount": 3,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "sombra stitch",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "sombra romántic bird",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 30.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "FAC-2063",
    "cliente": "Milvia De La Cruz (La Salvadora)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 01:44 AM",
    "itemsCount": 2,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "duo calcetas largas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2055",
    "cliente": "Andy Yat",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 01:40 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2053",
    "cliente": "Estela Galeano",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 01:39 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2051",
    "cliente": "Lucía Méndez(Tienda Max)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "20/01/2026 01:38 AM",
    "itemsCount": 2,
    "subtotal": 35.71,
    "iva": 4.29,
    "total": 40.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "libreta la bubu",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 15.0
      },
      {
        "nombre": "sombra stitch",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "FAC-2041",
    "cliente": "Cindy Barrera",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 10:56 PM",
    "itemsCount": 1,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 110.0,
        "subtotal": 110.0
      }
    ]
  },
  {
    "id": "FAC-2039",
    "cliente": "Alejandra Orellana",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 01:00 PM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2038",
    "cliente": "Milvia De La Cruz (La Salvadora)",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:58 AM",
    "itemsCount": 1,
    "subtotal": 8.93,
    "iva": 1.07,
    "total": 10.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2037",
    "cliente": "Ana Pérez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:55 AM",
    "itemsCount": 1,
    "subtotal": 44.64,
    "iva": 5.36,
    "total": 50.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "FAC-2036",
    "cliente": "Joselyn Barillas",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:53 AM",
    "itemsCount": 1,
    "subtotal": 132.14,
    "iva": 15.86,
    "total": 148.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 148.0,
        "subtotal": 148.0
      }
    ]
  },
  {
    "id": "FAC-2035",
    "cliente": "Julissa Hotel",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:51 AM",
    "itemsCount": 1,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "FAC-2034",
    "cliente": "Irene C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:49 AM",
    "itemsCount": 1,
    "subtotal": 8.93,
    "iva": 1.07,
    "total": 10.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2033",
    "cliente": "Yoshi C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:47 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "FAC-2032",
    "cliente": "Clemencia Orellana",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:42 AM",
    "itemsCount": 2,
    "subtotal": 80.36,
    "iva": 9.64,
    "total": 90.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 80.0,
        "subtotal": 80.0
      },
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2030",
    "cliente": "Rous Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:36 AM",
    "itemsCount": 1,
    "subtotal": 71.43,
    "iva": 8.57,
    "total": 80.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 80.0,
        "subtotal": 80.0
      }
    ]
  },
  {
    "id": "FAC-2029",
    "cliente": "Majo De Jirón",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:35 AM",
    "itemsCount": 1,
    "subtotal": 66.96,
    "iva": 8.04,
    "total": 75.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "FAC-2028",
    "cliente": "Elida Central Depot",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:32 AM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2027",
    "cliente": "Katerin López",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:30 AM",
    "itemsCount": 1,
    "subtotal": 92.86,
    "iva": 11.14,
    "total": 104.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 104.0,
        "subtotal": 104.0
      }
    ]
  },
  {
    "id": "FAC-2026",
    "cliente": "Arenita C/F",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:26 AM",
    "itemsCount": 1,
    "subtotal": 98.21,
    "iva": 11.79,
    "total": 110.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 110.0,
        "subtotal": 110.0
      }
    ]
  },
  {
    "id": "FAC-2025",
    "cliente": "Astrid Castellanos",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:23 AM",
    "itemsCount": 1,
    "subtotal": 53.57,
    "iva": 6.43,
    "total": 60.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2023",
    "cliente": "Alejandra Beteta",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:17 AM",
    "itemsCount": 1,
    "subtotal": 40.18,
    "iva": 4.82,
    "total": 45.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "FAC-2022",
    "cliente": "Valery Blanco",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:15 AM",
    "itemsCount": 1,
    "subtotal": 26.79,
    "iva": 3.21,
    "total": 30.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "FAC-2020",
    "cliente": "Marilú El Pueblito",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:12 AM",
    "itemsCount": 2,
    "subtotal": 102.68,
    "iva": 12.32,
    "total": 115.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 105.0,
        "subtotal": 105.0
      },
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "FAC-2019",
    "cliente": "Carol campo",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:10 AM",
    "itemsCount": 1,
    "subtotal": 74.11,
    "iva": 8.89,
    "total": 83.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 83.0,
        "subtotal": 83.0
      }
    ]
  },
  {
    "id": "FAC-2018",
    "cliente": "Eisy Cabrera",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:07 AM",
    "itemsCount": 1,
    "subtotal": 102.68,
    "iva": 12.32,
    "total": 115.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 115.0,
        "subtotal": 115.0
      }
    ]
  },
  {
    "id": "FAC-2017",
    "cliente": "Jenifer Lopez",
    "nit": "C/F",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:04 AM",
    "itemsCount": 2,
    "subtotal": 89.29,
    "iva": 10.71,
    "total": 100.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "libreta la bubu",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "set de aretes dorados 12 pzs",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "FAC-2016",
    "cliente": "Kimberly Marroquín",
    "nit": "CF",
    "sucursal": "Sucursal Principal",
    "fecha": "16/01/2026 06:02 AM",
    "itemsCount": 1,
    "subtotal": 17.86,
    "iva": 2.14,
    "total": 20.0,
    "metodoPago": "Efectivo",
    "estado": "Completada",
    "vendedor": "Caja Principal",
    "dte": null,
    "productos": [
      {
        "nombre": "productos comprados en live",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  }
];

export const REAL_COTIZACIONES: CotizacionItem[] = [
  {
    "id": "COT-353",
    "cliente": "Unicomer Guatemala",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-08-10",
    "vigencia": "2026-08-25",
    "total": 876.75,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Taza sublimada con caja",
        "cantidad": 20,
        "precioUnitario": 40.0,
        "subtotal": 800.0
      },
      {
        "nombre": "envío",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-324",
    "cliente": "Melissa Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-29",
    "vigencia": "2026-05-14",
    "total": 150.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Camiseta de mujer Vexica con bordado floral sexy y corset con ballenas, que da forma a la silueta",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-323",
    "cliente": "María Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-29",
    "vigencia": "2026-05-14",
    "total": 160.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN Playful Pals 1 pieza Mono de niña con cuello redondo, cintura elástica, sin mangas, con volant",
        "cantidad": 1,
        "precioUnitario": 160.0,
        "subtotal": 160.0
      }
    ]
  },
  {
    "id": "COT-322",
    "cliente": "Karina tia de Cali",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 170.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN Privé Camiseta De Malla Transparente Con Cuello De Corte Ajustado Para Mujer",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Almamuse Camiseta ajustada de manga corta con parches de malla transparente negra sexy para mujer, p",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-321",
    "cliente": "Milvia De La Cruz (La Salvadora)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 300.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN Set de 4 calzoncillos sin costuras (bóxer briefs)",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Falda mini asimétrica plisada negra para mujer EARO, falda-pantalón con decoración de botón metálico",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-320",
    "cliente": "Estefany Argueta",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 100.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Franclia Camiseta de mujer con cuello polo, parches y bordado de caballo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-319",
    "cliente": "Ana Pérez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 60.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Franclia Blusa de mujer de estilo francés minimalista con diseño irregular de falso efecto de dos pi",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 0.0
      },
      {
        "nombre": "cepillo de dientes",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-318",
    "cliente": "Sabrina Menéndez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 455.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Franclia Conjunto de 2 piezas de mujer con top de manga corta con cuello en V y detalle de lazo en n",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "pantalón de lona",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEIN Conjunto de 3 piezas de camisola de punto con estampado de corazón y lazo para mujer",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-317",
    "cliente": "panadería la Cumbre",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 185.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Elenzga Nuevo vestido de mujer con tirantes de espagueti, lazo en la cintura, dobladillo fruncido y",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-316",
    "cliente": "Aby Hermana de Any",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 285.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Nuevo bolso de mano de tela de unicolor, apariencia elegante, decoración con letras, diseño de asas",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Elenzga Camiseta de tirantes ajustada con estampado de lunares Y2K para mujer",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-315",
    "cliente": "Andrea amiga Baneza",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 85.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Bolso De Brazalete Para Correr Deportivos, Mini Bolsa De Teléfono Bandolera De Nylon, Bolsa De Crema",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-314",
    "cliente": "Lili Ramírez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 210.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "12 colores de lápiz labial mate de terciopelo, lápiz labial mate nude de color oscuro suave, lápiz l",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Set de 5 brillos de labios con aceite hidratante MAGIC CASA Water Gloss - Brillo de labios hidratant",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-313",
    "cliente": "Jeni Waleska Urbina",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 310.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Franclia Blusa sin mangas de bolsillo con perlas y bloques de color azul y blanco a rayas para mujer",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "COT-312",
    "cliente": "Luci Grajeda",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 570.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "GlowEve Blusa de satén elegante y sencilla con cuello en V, mangas de murciélago y cordón, fruncida,",
        "cantidad": 1,
        "precioUnitario": 135.0,
        "subtotal": 135.0
      },
      {
        "nombre": "1 pieza Parte superior sin mangas con estampado de hojas y flores de poliéster, adecuada para playa,",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Frenchy Camiseta de verano de mujer con textura de tela, manga corta y parches de encaje",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "EMERY ROSE Conjunto casual de 2 piezas de top de tirantes de cuello redondo y shorts de unicolor par",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-311",
    "cliente": "Any Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 490.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Nuevas pantuflas de pareja de moda para otoño/invierno, con forro de felpa, suela gruesa antidesliza",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEIN EZwear 2 piezas Blusa asimétrica con dobladillo asimétrico y cordón de mujer con ribete de lec",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "INAWLY Set de 2 piezas: Top corto de manga larga con hombros descubiertos y pantalones acampanados a",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-310",
    "cliente": "Mónica prima de RC",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 905.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "30ml Pegamento líquido de unión para cabello, herramienta de prótesis capilar, adhesivo para pestaña",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "2 piezas Juego de espátulas profesionales para maquillaje - Incluye cuchillo de paleta de acero inox",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "120 piezas de pestañas postizas rizadas, gruesas y suaves, con rizo C, de longitudes mixtas de 10-16",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "MAANGE Set de 7 piezas de brochas de maquillaje profesionales de doble uso, brochas de maquillaje mu",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "CMAYOME 800 piezas Kit de extensión de pestañas, Kit de extensión de pestañas DIY, 30D+40D+50D+60D (",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Ropa Interior Sin Costuras Para Mujeres (7 Piezas Ropa Interior Con Triángulo)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "10g Gel removedor de pestañas, elimina rápidamente las extensiones de pestañas, eliminación indolora",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "Set de aretes",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "SHEIN Essnce Conjunto de 4 piezas para mujer, camiseta de malla con patrón floral de girasol de prim",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-309",
    "cliente": "Julissa Pumay",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 325.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "MAANGE Set de 7 piezas de brochas de maquillaje profesionales de doble uso, brochas de maquillaje mu",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 pieza Pañuelo cuadrado de 70*70cm, Pañuelo de cabeza de satén estampado para mujer, Pañuelo de cue",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "1 pieza Pañuelo cuadrado de 70 cm de seda sintética con estampado de cachemira, protector solar para",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "1 pieza Pañuelo de seda cuadrado de 70*70cm, pañuelo de cabeza estampado de satén para mujer, pañuel",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "COT-308",
    "cliente": "Graciela García",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-28",
    "vigencia": "2026-05-13",
    "total": 85.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEGLAM DúO HíBrido De Iluminador Y Rubor Glam 101: Paleta De Rubor St. Tropez, Iluminador En Polvo,",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-307",
    "cliente": "EM",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-25",
    "vigencia": "2026-05-10",
    "total": 45.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Pepián de Res",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "COT-306",
    "cliente": "kimm Castellanos",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-15",
    "vigencia": "2026-04-30",
    "total": 30.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "labial mousse lipgloss",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "tabla para soporte de hojas capibara",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "COT-305",
    "cliente": "Debora N.",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-15",
    "vigencia": "2026-04-30",
    "total": 100.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Body moldeador para mujer con soporte de busto, levantamiento y escote bajo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-304",
    "cliente": "Jeni Waleska Urbina",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-15",
    "vigencia": "2026-04-30",
    "total": 100.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Faja reductora de cintura para mujer, moldeador abdominal, soporte de cintura deportivo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-303",
    "cliente": "Mónica prima de RC",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-15",
    "vigencia": "2026-04-30",
    "total": 35.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Espejo de maquillaje",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-302",
    "cliente": "Karina tia de Cali",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-15",
    "vigencia": "2026-04-30",
    "total": 100.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Selianne Camiseta gráfica de manga corta informal con bloques de color y rayas para mujeres",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-301",
    "cliente": "Milvia De La Cruz (La Salvadora)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-15",
    "vigencia": "2026-04-30",
    "total": 185.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN Conjunto de 2 piezas: Camisa blanca con mangas abullonadas y lazo colorido + Pantalones morado",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-300",
    "cliente": "Kimberly Marroquín",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-15",
    "vigencia": "2026-04-30",
    "total": 40.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "libro para colorear de stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "tijeras stitch",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "COT-299",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 55.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN Conjunto De Pijama Satén Con Tirantes Finos Y Pantalones Cortos Con Diseño De Corazones",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "COT-298",
    "cliente": "Mishel Beteta",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 155.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "gel de oliva",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "loción",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "COT-297",
    "cliente": "Alejandra Orellana",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 105.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "iluminadores",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Delineador ocular",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "crema máscara",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-296",
    "cliente": "Mónica Pérez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 200.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Franclia Conjunto de 2 piezas elegante con camisa a rayas y pantalón falda con volante asimétrico pa",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-295",
    "cliente": "Paola vecina Pupo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 65.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "crema máscara",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-294",
    "cliente": "Fernanda amiga Maritza",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 260.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "loción",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "COT-293",
    "cliente": "Wendy salón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 100.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Ropa interior de modelado sin costuras de seda de hielo transparente y control de abdomen de cintura",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-292",
    "cliente": "Glendy referida de zoylita",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 100.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Pantalones moldeadores de alta cintura con cierre trasero, shorts de mujer negros con control de vie",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-291",
    "cliente": "Eli C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 190.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Set de 4 relojes de mujer con reloj de cuarzo, reloj de pulsera casual, reloj de dama para regalo de",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "base líquida",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "COT-290",
    "cliente": "Andrea Agustin",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 280.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN Conjunto de 2 piezas de estilo de vacaciones con diseño de hojas azules para niños pequeños, q",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Body moldeador sin costuras para mujer con cincher de cintura y tanga, pieza única",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "crema máscara",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "delineador",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "COT-289",
    "cliente": "Esmeralda familiar de Davis",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 200.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Pantalones moldeadores de alta cintura con cierre trasero, shorts de mujer negros con control de vie",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Selianne Top sin mangas con cuello halter, tirantes con lazo y contraste de color",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-288",
    "cliente": "Monica Herrera (el carmén)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 135.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "VaVaBold Body de mujer asimétrico con hombros de malla y fruncido, color negro",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-287",
    "cliente": "Yanira Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 300.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Flirla Tall Mono de punto negro de tela súper suave y cómoda con cuello medio abierto y cremallera,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Set de 4 relojes de pulsera de cuarzo elegantes para mujer con esfera cuadrada minimalista y pantall",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHAPORA Body sin mangas de unicolor con tirantes finos, espalda descubierta y ajustado",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-286",
    "cliente": "Monica Amiga de Wendy",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 155.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN EZwear Vestido diario sencillo para mujer de unicolor sin mangas",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-285",
    "cliente": "Darlyn Osoy",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 485.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN EZwear Set de 3 camisetas casuales de mujer de corte ajustado con cuello polo, bordado de caba",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "mochila",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-284",
    "cliente": "Paola Rivera",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 430.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN Elenzya Body de mujer de talla estándar con costillas de felpa, otoño/invierno",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Everyssa Camiseta de manga corta de cuello redondo a rayas para mujer, versátil y casual para uso di",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta ajustada de cuello redondo versátil de ajuste ceñido con estampado de leopardo, nuev",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Resyla Camiseta de mujer de manga corta con cuello redondo y bloque de color, casual de verano",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "COT-283",
    "cliente": "Gaby El campo por el proyecto",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 225.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Elenzga Blusa casual de mujer con estampado floral, manga farol y lazo en la cintura",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "BamGleam Body De Cuello Alto De Red, Manga Larga Con Detalles Vacíos En El Pecho",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-282",
    "cliente": "Katerin López",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 300.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Flirla Body de manga larga con cuello con ribete, lazo y contraste de color, versátil para uso diari",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Pantalones moldeadores de alta cintura con cierre trasero, shorts de mujer negros con control de vie",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 pieza Body moldeador de cintura y cadera de mujer de tejido de alta resistencia",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-281",
    "cliente": "Flor Argueta",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 300.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "1 pieza Pantalones cortos de control de cintura alta, entrenador de cintura, moldeador corporal, fon",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Corsé entrenador de cintura con cremallera, cinturón de cintura transpirable, cinturón de recuperaci",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN PETITE Body de mujer de unicolor con cuello redondo, manga larga, sexy y con malla transparent",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-280",
    "cliente": "Flor amiga de Katerin",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 475.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Flirla Body de manga larga con cuello con ribete, lazo y contraste de color, versátil para uso diari",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Body moldeador sin costuras para mujer con cincher de cintura y tanga, pieza única",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "LuxeNights Conjunto de pijama de 3 piezas para mujer con recortes de color contrastante en un sólido",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Bolso de cadena para mujer, nuevo para el verano 2025, bolso de hombro diagonal en forma de media lu",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "COT-279",
    "cliente": "Martita C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 195.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "3 piezas Pantalones de pijama con estampado a cuadros y corazones, con lazo delantero, ropa de otoño",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "COT-278",
    "cliente": "Alejandra amiga De Katerin",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 710.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN Set de 3 camisetas básicas de manga corta y cuello redondo con estampados de anime/K-pop, viol",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "INAWLY Vestido ajustado de hombros descubiertos elegante de un solo color para mujer",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEIN GraphicGems 1 Set Moda casual para niños pequeños con estampado divertido de dinosaurio. Inclu",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Set de 4 piezas de relojes de cuarzo de silicona para mujer con esfera numérica cuadrada, clásico +",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Flirla Tall Mono de punto negro de tela súper suave y cómoda con cuello medio abierto y cremallera,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Set de 4 relojes de pulsera de cuarzo elegantes para mujer con esfera cuadrada minimalista y pantall",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-277",
    "cliente": "Lucía Méndez(Tienda Max)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 40.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "carnet de estudiante",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "Pegatinas de conveniencia",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "cuaderno",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-276",
    "cliente": "Carmen de García",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 185.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-275",
    "cliente": "Verónica Cuque",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 275.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "3 piezas \"Bebé León Valiente\" Parte superior de manga larga para niño pequeño, pantalones con estamp",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Conjunto de verano para niñas bebé con top de manga corta de cuello redondo blanco con estampado de",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "exfoliante de aloe vera",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-274",
    "cliente": "Yomara Cabrera",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 135.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "crema máscara",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "loción",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      }
    ]
  },
  {
    "id": "COT-273",
    "cliente": "Jenifer Cali",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 185.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Set de 6 piezas de pijama de manga corta y pantalón corto para niñas, con estampado de unicornio y c",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-272",
    "cliente": "Iraida Contreras",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 200.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Pantalón corto moldeador de un solo color de cintura alta con costuras invisibles y control del abdo",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHAPORA Mono de mujer de unicolor con tirantes elásticos ajustables y control de abdomen",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-271",
    "cliente": "Gaby hermana Paola",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 475.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "INAWLY Camiseta sexy de talla grande con tirantes cruzados en cadena",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Elenzga Camiseta de manga corta abombada de escote redondo con lazo decorativo para mujer de talla g",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Vibekara Top corto de 2 en 1 con cuello en V profundo, manga larga y parches de encaje, talla grande",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      }
    ]
  },
  {
    "id": "COT-270",
    "cliente": "Irene C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 65.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "mochila para niños",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "carnet de estudiante",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "COT-269",
    "cliente": "Liseth Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 355.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "3 piezas Pantalones de pijama con estampado a cuadros y corazones, con lazo delantero, ropa de otoño",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Set de 6 piezas con camiseta de manga corta con estampado de letra Los y pantalones cortos para niño",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-268",
    "cliente": "Francisco C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 450.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN Playful Pals Conjunto de 2 piezas para niñas jóvenes de primavera/otoño con camisa a rayas + p",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "1 par de zapatos planos casuales unisex para niños, zapatillas deportivas antideslizantes de suela b",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      }
    ]
  },
  {
    "id": "COT-267",
    "cliente": "Marilú El Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 285.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "calceta piecito",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "tabla para hojas",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      },
      {
        "nombre": "carnet de estudiante",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "silicone bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-266",
    "cliente": "Astrid Celeste",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 90.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "perfume",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "Miss Vinta Conjunto de pijama de camiseta de satén con estampado de mariposa y pantalones cortos / C",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "COT-265",
    "cliente": "Heidy C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 110.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "juego de fiambrera",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "gel de oliva",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-263",
    "cliente": "Male Morales",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 840.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "resaltadores",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "juego de fiambrera",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "colitas de colores",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      },
      {
        "nombre": "vaso para bebé",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      },
      {
        "nombre": "perfume",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "perfume",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "cuaderno",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "carnet de estudiante",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "cuaderno",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "cepillo de dientes",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "silicone bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "labial",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 50.0
      },
      {
        "nombre": "exfoliante de aloe vera",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "mochila",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "termo 800 ml",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "termo",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "calcetines Nike",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      },
      {
        "nombre": "calceta Nike dos colores",
        "cantidad": 2,
        "precioUnitario": 22.5,
        "subtotal": 45.0
      },
      {
        "nombre": "calcetas nike",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "COT-262",
    "cliente": "miss Silvia",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 185.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Oceva Bañador una pieza con estampado de rayas",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-261",
    "cliente": "Ana Pérez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 390.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "loción",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "gel de oliva",
        "cantidad": 2,
        "precioUnitario": 40.0,
        "subtotal": 60.0
      },
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "brown care",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      },
      {
        "nombre": "gorra dama Nike",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "soporte stitch",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "super longwear foundation",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-260",
    "cliente": "Ash Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 250.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "lip gloss",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "mochila",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Miss Vinta Conjunto de pijama de camiseta de satén con estampado de mariposa y pantalones cortos / C",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "calcetas puma",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "COT-259",
    "cliente": "Madelyn zona 14",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 245.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "termo",
        "cantidad": 2,
        "precioUnitario": 85.0,
        "subtotal": 170.0
      },
      {
        "nombre": "carnet de estudiante",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "gorra dama Nike",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-258",
    "cliente": "Andrea Salón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 430.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "1 pieza Calcomanía de uñas de arte 5D con perlas francesas en relieve plateadas, estrellas de 4 punt",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "CUCCOO LuxiPop Sandalias de tacón alto con plataforma impermeable y tacón grueso, de moda sexy para",
        "cantidad": 1,
        "precioUnitario": 385.0,
        "subtotal": 385.0
      }
    ]
  },
  {
    "id": "COT-257",
    "cliente": "Aidé Sánchez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 255.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN EZwear Vestido de punto para mujer sin mangas con estampado de leopardo y diseño ajustado al B",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Bolso De Hombro Minimalista Con Monedero, Bolso Para Mujeres Con Monedero Pequeño",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-256",
    "cliente": "Nohemí Tahuite",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 135.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Elenzga Top sin mangas con estampado de mariposas rosa con espalda descubierta para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "marcadores 24 pzs",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-255",
    "cliente": "Katy Sánchez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 600.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "calcetines altos Nike",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      },
      {
        "nombre": "calcetines Nike con color",
        "cantidad": 3,
        "precioUnitario": 20.0,
        "subtotal": 60.0
      },
      {
        "nombre": "brochas de maquillaje",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "iluminadores",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Botas de nieve de ante de oveja para mujer, nuevas botas de tobillo de invierno de moda con forro de",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "1 pieza Funda dura transparente simple con textura mate a prueba de golpes y diseño de capucha con p",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Funda de teléfono a prueba de golpes con cobertura total de TPU con gráfico de billete de dólar negr",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "neceser",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 40.0
      },
      {
        "nombre": "Delineador ocular",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "COT-254",
    "cliente": "Carol campo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 680.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Souflis Souflis Conjunto de 4 piezas en cuadros verdes para bebé niño, incluyendo top de manga corta",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEGLAM HAIR Cepillo alisador térmico 3D elegante y elegante, cepillo alisador de cabello dorado de",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      },
      {
        "nombre": "base líquida",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "gel de oliva",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 30.0
      },
      {
        "nombre": "vitamina B fragancia leche corporal",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "exfoliante de aloe vera",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "libro para colorear de stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "mochila",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-253",
    "cliente": "Any Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 500.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Sandalias planas de mujer con puntera abierta y esponjosas, de piel sintética súper suave y cómoda,",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Pantalones de pierna ancha a rayas blancas y azul marino, con rayas blancas y cierre de botones - Pa",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      },
      {
        "nombre": "Sombrero de cubo con dobladillo crudo, etiqueta con letra, sombreros de cubo ligeros y versátiles co",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "COT-252",
    "cliente": "Graciela García",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 585.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN PETITE Blazer de solapa con un solo botón para uso en la oficina, casual de negocios para muje",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      },
      {
        "nombre": "EMERY ROSE Blazer minimalista de mujer de manga larga con cuello de chal y falso bolsillo, unicolor",
        "cantidad": 1,
        "precioUnitario": 300.0,
        "subtotal": 300.0
      },
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-251",
    "cliente": "María Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 510.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Set de 3 gorras de béisbol ajustables con diseño de corazón para mujeres, adecuadas para la vida dia",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Set de 3 piezas de ropa de moda para bebé niño, body de cuello redondo de manga corta holgado con li",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SpongeBob SquarePants | SHEIN Conjunto de pijama de otoño/invierno con top de manga larga de cuello",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "labial",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-250",
    "cliente": "Eisy Cabrera",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-04-14",
    "vigencia": "2026-04-29",
    "total": 795.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "LuxeNights Conjunto de pijama de 3 piezas para mujer con recortes de color contrastante en un sólido",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "libro para colorear de stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "SHEIN Set de 2 piezas, blusa de manga corta con decoración de lazo 3D y pantalón vaquero largo para",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      },
      {
        "nombre": "Conjunto de 3 piezas para bebé niña: sudadera con capucha estampada con lazo en estilo casual americ",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "COT-241",
    "cliente": "Wendy Alvarez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 465.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "1 par de zapatos de plataforma con cuña y tira de tela de unicolor, adecuados para usar en casa en o",
        "cantidad": 3,
        "precioUnitario": 155.0,
        "subtotal": 465.0
      }
    ]
  },
  {
    "id": "COT-240",
    "cliente": "Jacky Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 405.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "LuxeNights Conjunto de pijama con top de tirantes y shorts estampados de imitación de seda",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 par de zapatos de plataforma con cuña y tira de tela de unicolor, adecuados para usar en casa en o",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Conjunto de 3 piezas: Camiseta de manga corta, pantalones cortos y pantalones para niños y niñas peq",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-239",
    "cliente": "Majo De Jirón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 155.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Kit de rizado y permanente de pestañas mejorado, set profesional de extensión de pestañas semi-perma",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-238",
    "cliente": "María Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 200.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Manfinity Homme Conjunto de camiseta de manga corta, cuello redondo, holgada y casual para el verano",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-237",
    "cliente": "Sarita zona 1 capital",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 225.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Sandalias de playa al aire libre de mujer de suela de cuerda de paja trenzada, cómodas y versátiles,",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      }
    ]
  },
  {
    "id": "COT-236",
    "cliente": "Claudia prima de Mónica",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 170.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SPONGEBOB 1 pieza Funda de teléfono a prueba de golpes con gráfico de personajes de dibujos animados",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Funda de teléfono suave con diseño magnético de telaraña y mariposa, compatible con iPhone 17/16 Pro",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-235",
    "cliente": "Karen zona 21",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 155.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Bolso bandolera minimalista liso, bolso de hombro de moda de PU, bolso casual y billetera para mujer",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-234",
    "cliente": "Merlín Barillas",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 450.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "1 pieza Faja moldeadora de Body completo, cierre con triple de ganchos y ojos de cintura alta, levan",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Conjunto de top y pantalones de traje con cuello de contraste, elegante y urbano para adolescentes y",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      }
    ]
  },
  {
    "id": "COT-233",
    "cliente": "Evelyn prima",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 100.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "2 piezas Gorra de béisbol bordada unisex para pareja, adecuada para todas las estaciones, ideal para",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-232",
    "cliente": "Katy Sánchez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 335.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "4 piezas Conjunto de accesorios de moda para hombre, que incluye 1 reloj de pulsera multifuncional y",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Set de 4 relojes de cuarzo minimalistas y casuales para hombres, incluye 1 reloj con correa de metal",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM LáPiz Delineador De Ojos Mate Ez Glide, Altamente Pigmentado, Negro, Para Ojos Ahumados, LáP",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-231",
    "cliente": "Aidé Sánchez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 125.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "280 piezas de pestañas postizas falsas con forma de D curvadas personalizadas, una bandeja de pestañ",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "COT-230",
    "cliente": "Kyara Santa Barbara",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 360.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Comfortcana Blusa básica de mujer de manga larga, ajustada, con botones delanteros, para uso casual",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "4 piezas Conjunto de accesorios de moda para hombre, que incluye 1 reloj de pulsera multifuncional y",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Regalo del Día del Padre: 1 reloj de escala colorido personalizado y 1 pulsera de cristal, también a",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-229",
    "cliente": "madrina de Lupe",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 185.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Attitoon Set de 3 camisetas cortas de cuello redondo de manga corta con estampado de lazo, corazón y",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-228",
    "cliente": "Aby Hermana de Any",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 335.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "2 piezas/Set Reloj de mujer con correa de acero inoxidable y pulsera, dial cuadrado con diseño minim",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Resyla Set de 2 piezas de camiseta de manga corta con cuello redondo y pantalones con estampado de c",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      }
    ]
  },
  {
    "id": "COT-227",
    "cliente": "Alejandra amiga De Katerin",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 155.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN EZwear 3 piezas de camisetas casuales de manga corta y cortas para mujer, adecuadas para el ve",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-226",
    "cliente": "Jenifer Cali",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 100.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN GraphicGems Conjunto de 2 piezas para niño pequeño, informal, creativo, personalizado, minimal",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-225",
    "cliente": "Fabiola Castellanos",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 310.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Pantuflas tipo botas de nieve con pelaje, nuevas botas de suela gruesa para exteriores/interiores pa",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Botas de nieve de ante de oveja para mujer, nuevas botas de tobillo de invierno de moda con forro de",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-223",
    "cliente": "Nancy Ruiz",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 155.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN EZwear Set de 3 camisetas casuales de manga corta y corte cropped para mujer, aptas para veran",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-222",
    "cliente": "Melany Rosales",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 1015.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "1 par de sandalias planas de mujer con punta cuadrada, sin deslizamiento, casuales y versátiles, san",
        "cantidad": 1,
        "precioUnitario": 160.0,
        "subtotal": 160.0
      },
      {
        "nombre": "DONICY Camiseta de manga larga con cuello en V profundo y espalda descubierta de unicolor para mujer",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "GalTyme Mono holgado de manga corta con escote de pico, borde de volantes y silueta evasé para mujer",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "EMERY ROSE Mono de talla grande con estampado floral abstracto vintage asimétrico",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "SHEIN Essnce Conjunto de top bandeau cruzado y shorts con estampado completo para mujer talla grande",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEIN Vestido de body con malla decorada con joyas, estilo princesa y corte azul para bebé niña",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-221",
    "cliente": "Wendy del campo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-26",
    "vigencia": "2026-04-10",
    "total": 63.28,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "1 pieza Bolso cruzado cuadrado de piel de PU con estampado floral marrón vintage para mujer (con acc",
        "cantidad": 1,
        "precioUnitario": 63.28,
        "subtotal": 63.28
      }
    ]
  },
  {
    "id": "COT-220",
    "cliente": "Adry Rosales",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-25",
    "vigencia": "2026-04-09",
    "total": 275.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN EZwear Sudadera holgada con hombros oblicuos y forro térmico para mujer, color blanco, para ot",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN EZwear Set de 3 camisetas de manga larga de cuello redondo, de ajuste ceñido, con rayas y unic",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      }
    ]
  },
  {
    "id": "COT-219",
    "cliente": "Debora N.",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-25",
    "vigencia": "2026-04-09",
    "total": 370.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "1 pieza Reloj de mujer con correa metálica, esfera redonda con patrón de corazón, reloj de cuarzo ca",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHUZIA Sandalia de diapositiva de serraje negro con plantilla de corcho y decoración de hebilla dobl",
        "cantidad": 1,
        "precioUnitario": 285.0,
        "subtotal": 285.0
      }
    ]
  },
  {
    "id": "COT-218",
    "cliente": "Any Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-25",
    "vigencia": "2026-04-09",
    "total": 455.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "SHEIN EZwear Set de 3 camisetas de manga larga de cuello redondo, de ajuste ceñido, con rayas y unic",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "Botas de nieve con forro térmico, sólido color, elegante, estilo universitario, para fiesta, resort,",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Zapatillas de casa de punta abierta de felpa beige para mujer de talla grande, cómodas y versátiles,",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "COT-217",
    "cliente": "Daniela Valdez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-25",
    "vigencia": "2026-04-09",
    "total": 185.0,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Comfortcana Cárdigan corto con tirantes de lazo",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-216",
    "cliente": "Jenifer campo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-25",
    "vigencia": "2026-04-09",
    "total": 328.84,
    "estado": "Pendiente",
    "productos": [
      {
        "nombre": "Franclia Vestido mini elegante y sexy para invitada de boda con cuello en V cruzado, sin mangas y si",
        "cantidad": 1,
        "precioUnitario": 109.07,
        "subtotal": 109.07
      },
      {
        "nombre": "BOARNSEORL Conjunto de 3 piezas de ropa de caballero para bebé niño - Camisa blanca con moño, chalec",
        "cantidad": 1,
        "precioUnitario": 120.69,
        "subtotal": 120.69
      },
      {
        "nombre": "Manfinity CasualCool Camisa polo casual de hombre con ribete de contraste, camisa polo texturizada d",
        "cantidad": 1,
        "precioUnitario": 99.08,
        "subtotal": 99.08
      }
    ]
  },
  {
    "id": "COT-215",
    "cliente": "Analí C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 230.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "lenceria",
        "cantidad": 2,
        "precioUnitario": 7.5,
        "subtotal": 15.0
      },
      {
        "nombre": "dispensador",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "blusas",
        "cantidad": 3,
        "precioUnitario": 50.0,
        "subtotal": 150.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      },
      {
        "nombre": "baolishi powder",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-214",
    "cliente": "Nohemí López",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 15.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "brochas",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "COT-213",
    "cliente": "Ruth Iguardia",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 10.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "COT-212",
    "cliente": "Katerin López",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 20.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-211",
    "cliente": "Estefani Tejax",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 20.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-210",
    "cliente": "Katerin López",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 20.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-209",
    "cliente": "Angélica Pueblo Nuevo Viñas",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 110.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Rimel",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "faja negra L",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-208",
    "cliente": "Baneza González",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 30.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "COT-207",
    "cliente": "Fernanda amiga Maritza",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 65.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "traje de baño",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-206",
    "cliente": "Lucía Méndez(Tienda Max)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-22",
    "vigencia": "2026-04-06",
    "total": 265.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "iluminador liquido",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "super longwear foundation",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "Fantasy Paris",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "face primer",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Rimel",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "la vida es bella",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Nueva bolsa de mano minimalista de moda con estampado de fresa, diseño cuadrado, bolsillo exterior 3",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 60.0
      },
      {
        "nombre": "brochas",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "COT-205",
    "cliente": "Sonia Muxbal",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 115.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "body lotion",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 85.0
      },
      {
        "nombre": "cielo celestial",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "COT-204",
    "cliente": "Gaby vecina de Wendy Monzón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "brown care",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "baolishi powder",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "mochila stitch",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "COT-203",
    "cliente": "Jeni Waleska Urbina",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 40.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "beauty time",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "COT-202",
    "cliente": "Darlyn Osoy",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 40.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "beauty time",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "COT-201",
    "cliente": "Yomara Cabrera",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 235.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "lámpara stitch",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "combo  maquillaje",
        "cantidad": 2,
        "precioUnitario": 100.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-200",
    "cliente": "Clemencia Orellana",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 60.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Bolso De Brazalete Para Correr Deportivos, Mini Bolsa De Teléfono Bandolera De Nylon, Bolsa De Crema",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "COT-199",
    "cliente": "Astrid Celeste",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 25.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "blusa blanca",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-198",
    "cliente": "Verónica Cuque",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 30.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "ropa interior dama",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "COT-197",
    "cliente": "Andrea amiga Baneza",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 95.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "estuche stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "body lotion",
        "cantidad": 2,
        "precioUnitario": 45.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-196",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 130.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "estuche stitch",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "iluminador liquido",
        "cantidad": 3,
        "precioUnitario": 20.0,
        "subtotal": 60.0
      },
      {
        "nombre": "palazzo",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "COT-195",
    "cliente": "Kenia esposa Adin",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 15.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "COT-194",
    "cliente": "Alejandra Orellana",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 45.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "pijama corta roja con rayas",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "la vida es bella",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-193",
    "cliente": "Sauli Estrada",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 20.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "pijama corta roja con rayas",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-192",
    "cliente": "Elida Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-21",
    "vigencia": "2026-04-05",
    "total": 315.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "mochila stitch",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 20.0
      },
      {
        "nombre": "playera gris",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "calcetas nike",
        "cantidad": 5,
        "precioUnitario": 25.0,
        "subtotal": 110.0
      },
      {
        "nombre": "ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "Fantasy Paris",
        "cantidad": 2,
        "precioUnitario": 25.0,
        "subtotal": 50.0
      },
      {
        "nombre": "la vida es bella",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "baolishi powder",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-191",
    "cliente": "Jesica Paola",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 85.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "90ml Aceite humectante para después del afeitado con aroma a fresa, fórmula reafirmante, nutrición p",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-190",
    "cliente": "Meli Lainez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM HAIR Locked in Barra de peinado fuerte con brillo brillante, 30 g, barra de cera suave para  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-189",
    "cliente": "Darlyn Pinula",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-188",
    "cliente": "Any nueva Z2 SCP",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-187",
    "cliente": "Monica Barillas",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-186",
    "cliente": "Maybelin Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-185",
    "cliente": "Waleska Laguna Bermeja",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-184",
    "cliente": "Melissa Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-183",
    "cliente": "Andrea Agustin",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 370.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 185.0,
        "subtotal": 370.0
      }
    ]
  },
  {
    "id": "COT-182",
    "cliente": "Diana por los taxis",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-181",
    "cliente": "Nohemí Tahuite",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-180",
    "cliente": "Celeste prima Jesica",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-179",
    "cliente": "Mandy campo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-178",
    "cliente": "Katy Sánchez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-177",
    "cliente": "Wendy Alvarez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 370.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 185.0,
        "subtotal": 370.0
      }
    ]
  },
  {
    "id": "COT-176",
    "cliente": "Ivón Méndez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 85.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "1 pieza Gafas de moda poligonales para mujer, accesorio para salidas",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-175",
    "cliente": "Alejandra Beteta",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 125.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "COT-174",
    "cliente": "Gaby vecina de Wendy Monzón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Go Go Glow Bruma iluminadora corporal-Fairy Twinkle Marca Belleza Maquillaje Maquullaje Cosm",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-173",
    "cliente": "Jerly C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 1050.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Un par de los talla grande vendidos del verano, las sandalias planas caladas con diseño de ganchos p",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEIN Juego De Ropa Informal Para Casa De Niña Joven Con Diseño Floral Y Cuello Redondo En Color Sól",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Conjunto casual de 2 piezas para niñas jóvenes en primavera/verano: top corto de punto calado y vest",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "LMoss Kids Conjunto de 2 piezas para niña joven LMoss: Blusa de punto de unicolor con cuello de vola",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "SHEIN Conjunto casual de 2 piezas de camiseta de manga corta con estampado de oso de dibujos animado",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "SHEIN Conjunto de 2 piezas de camiseta de manga corta con cuello redondo y gráfico de retrato casual",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      }
    ]
  },
  {
    "id": "COT-172",
    "cliente": "Iraida Contreras",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-11",
    "vigencia": "2026-03-26",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Franclia Vestido corto de línea A con cuello redondo sin mangas, de mujer, en color albaricoque, con",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-171",
    "cliente": "Jacky Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 340.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN Conjunto de 2 piezas de tankini casual y entallado con estampado de baloncesto que brilla en l",
        "cantidad": 1,
        "precioUnitario": 165.0,
        "subtotal": 165.0
      },
      {
        "nombre": "Swim Lushoire Tankini con cordones a los lados y estampado floral para la playa en verano",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      }
    ]
  },
  {
    "id": "COT-170",
    "cliente": "Esmeralda familiar de Davis",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 425.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Conjunto informal de 2 piezas para niñas preadolescentes con top sin mangas con cuello Peter Pan y p",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Conjunto informal de 2 piezas para niñas preadolescentes con sudadera con estampado floral de otoño",
        "cantidad": 1,
        "precioUnitario": 225.0,
        "subtotal": 225.0
      }
    ]
  },
  {
    "id": "COT-169",
    "cliente": "Julissa Pumay",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 155.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Set de 7 piezas - Bragas triangulares sin costuras con estampado floral, con acabado ondulado, sexy",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-168",
    "cliente": "Nohemí Tahuite",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 340.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN Serisse Kids Vestido casual y dulce para niña preadolescente con escote cuadrado, cintura con",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "Conjunto de bikini de 3 piezas con estampado de rayas rosa y blanco para mujer, estilo bohemio elega",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-167",
    "cliente": "Lupita Salón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 155.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Falda de satén de cintura alta, simple y elegante, de color negro, para fiestas, vuelta al colegio,",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-166",
    "cliente": "Flor Argueta",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 705.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Firerie Vestido mini de malla con espalda abierta y flores para mujer, vestido de manga trompeta par",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Bolsa de maquillaje portátil y duradera, organizador de cosméticos de gran capacidad y múltiples com",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "YZIMENG Set de 4 piezas de brochas de maquillaje profesionales de doble uso - Brocha de base perfila",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 185.0,
        "subtotal": 370.0
      }
    ]
  },
  {
    "id": "COT-165",
    "cliente": "Verónica Cuque",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 285.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "CottageSlumber Conjunto de pijama con top tipo camiseta de unicolor y shorts con estampado de flores",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-164",
    "cliente": "Gaby hermana Paola",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Snug Zone Conjunto de pijama de camiseta y pantalones cortos con parches de encaje, elástico y espal",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-163",
    "cliente": "Michelle Dávila",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "1 pieza Enterizo completo reductor de talla plus con faja de control de abdomen y entrenador de cint",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-162",
    "cliente": "Kyrian Aguirre",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 420.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Pantalones largos ajustados de un solo color con cinturilla cruzada, atuendos para mujer para festiv",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "1 pieza Sujetador convertible de mujer invisible de 3 formas sin espalda para el verano",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEGLAM Matinée in L.A. Paleta de 15 colores Brillos Marca Belleza Maquillaje Maquullaje Cosmética p",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-161",
    "cliente": "Carol campo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 150.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Resyla Vestido de mujer de cuello redondo ajustado sin mangas con estampado de rayas, primavera/vera",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-160",
    "cliente": "Andrea Salón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 150.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN EZwear Vestido tipo camisola de verano con estampado completo y división para vacaciones de oc",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEGLAM Lip Link Mini Paleta de Brillo Labial Pulsera Marca Belleza Maquillaje Maquullaje Cosmética",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "COT-159",
    "cliente": "Silvia Roldán",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "1 pieza Moldeador corporal para mujer con control de abdomen, body moldeador negro con cierre y aper",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-158",
    "cliente": "Marilú El Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 435.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Soleia Vestido midi de Body ceñido con cuello halter, nudo delantero y bajo asimétrico con estampado",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "SHEGLAM Lashlighter Up & Out Máscara de pestañas Marca Belleza Maquillaje Maquullaje Cosmética para",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Lashlighter Tratamiento de pestañas de fácil eliminación Marca Belleza Maquillaje Maquullaje (Eliminador)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Conjunto de pijama de satén con estampado de labios",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-157",
    "cliente": "Fernanda fam katerin López",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 300.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Soleia Nuevo conjunto informal de vacaciones de primavera/verano para invitados a bodas en la playa,",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Soleia Vestido ajustado con estampado floral casual, de tirantes ajustables, adecuado para vacacione",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-156",
    "cliente": "Elva Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 460.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Resyla Camiseta gráfica de mujer con efecto de mezclilla y bordado de mariposa, decorada con lazo de",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Resyla Camiseta de mujer de cuello redondo con estampado de leopardo, gráfico de corazón y ribete de",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "Resyla Camiseta de manga corta con cuello redondo y estampado de corazón, versátil y casual para uso",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "HEYXI Barra de coloración capilar 3 en 1 | Con dientes de peine, tinte de emergencia, ¡salvador del",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-155",
    "cliente": "Liria Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 505.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "EMERY ROSE Camiseta de manga corta con estampado de letra de eslogan ÁNGELES GRÁFICOS para mujer",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Franclia Camiseta sin mangas casual con botones de cuarto de mujer, elegante y de moda",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Camiseta casual de manga corta de seda de leche con forma de corazón para mujer, adecuada para el ve",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "INAWLY Camiseta de manga corta con estampado de mariposa en color vino tinto para mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-154",
    "cliente": "Edna Don Justo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-03-10",
    "vigencia": "2026-03-25",
    "total": 490.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "5 piezas Bragas de bikini acanaladas con borde ondulado y decoración de moño para mujer",
        "cantidad": 1,
        "precioUnitario": 135.0,
        "subtotal": 135.0
      },
      {
        "nombre": "Crema para los ojos con retinol - Reduce las líneas finas, las ojeras, las bolsas y la hinchazón de",
        "cantidad": 2,
        "precioUnitario": 85.0,
        "subtotal": 170.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-153",
    "cliente": "Paola vecina Pupo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-28",
    "vigencia": "2026-03-15",
    "total": 67.5,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 12.5
      },
      {
        "nombre": "protector térmico",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "COT-152",
    "cliente": "Maybelin Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-28",
    "vigencia": "2026-03-15",
    "total": 60.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "traje de baño negro con blanco",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "COT-151",
    "cliente": "Eyla Duarte",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-28",
    "vigencia": "2026-03-15",
    "total": 60.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "traje de baño colores",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      }
    ]
  },
  {
    "id": "COT-150",
    "cliente": "Marlen Ramírez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 35.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "blusa blanca floriada",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-149",
    "cliente": "Jesica Galindo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 115.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "blusa de corazon",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "mono animal print",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "COT-148",
    "cliente": "Eli C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 242.5,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 15.0
      },
      {
        "nombre": "tenis blancos cinta gruesa",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      },
      {
        "nombre": "pulsera de fresita",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "pencil contour",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 15.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 12.5
      },
      {
        "nombre": "set de maquillaje",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-147",
    "cliente": "Eisy Cabrera",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 60.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "argollas doradas grandes",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "cadena de amistad",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "COT-146",
    "cliente": "Madelyn zona 14",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 170.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "termo con filtro",
        "cantidad": 2,
        "precioUnitario": 85.0,
        "subtotal": 170.0
      }
    ]
  },
  {
    "id": "COT-145",
    "cliente": "Yomara Cabrera",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 527.5,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "loción",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "aceite labial",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 12.5
      },
      {
        "nombre": "cadena dorada de cruz",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 200.0,
        "subtotal": 400.0
      },
      {
        "nombre": "tenis negros",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      }
    ]
  },
  {
    "id": "COT-144",
    "cliente": "Sandra Hernández (Pueblito)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 125.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "brillo",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 20.0
      },
      {
        "nombre": "traje color blanco con negro",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-143",
    "cliente": "María Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 85.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "blusa colores",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "gorra negra",
        "cantidad": 1,
        "precioUnitario": 45.0,
        "subtotal": 45.0
      }
    ]
  },
  {
    "id": "COT-142",
    "cliente": "Ash Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 145.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "blusa de encaje blanca",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "croptop negro",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-141",
    "cliente": "Elida Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 20.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "estuche varios",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-140",
    "cliente": "Wendy Alvarez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 295.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "tenis blancos",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      },
      {
        "nombre": "vestido animal print",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "pantalonera con estampado de flores",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "shampoo maionese capilar",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "termo con filtro",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-139",
    "cliente": "Ruth Iguardia",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 50.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "cuaderno kuromi",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "cuaderno stitch 3d",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-138",
    "cliente": "Fabiola Castellanos",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 515.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "suéter araña",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Micrófono inalámbrico profesional tipo lavalier, plug and play, con receptor USB-C y grabación con u",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "suéter osito",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "protector para cargador de stitch",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "COT-137",
    "cliente": "Julissa Pumay",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 815.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Zestiva Conjunto de bikini de 2 piezas para mujer con cinta de rayas onduladas, para el verano",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Bellisia Conjunto de tankini de playa con diseño de volantes con cuentas y espalda descubierta con l",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Porcelain Marca Belleza Maquillaje Maquullaje Cosmética  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "traje de baño rosa",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "pantunflas stitch",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-136",
    "cliente": "Katy Sánchez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 600.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN EZwear Set de 3 camisetas casuales de mujer de corte ajustado con cuello polo, bordado de caba",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEIN EZwear Tank Top Acanalado De Un Solo Color Para Mujer",
        "cantidad": 1,
        "precioUnitario": 190.0,
        "subtotal": 190.0
      },
      {
        "nombre": "Bolso bandolera de mujer con forma de concha marina, embellecido con perlas falsas. Elegante bolso d",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "marcadores 24 pzs",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      }
    ]
  },
  {
    "id": "COT-135",
    "cliente": "Edna Don Justo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 295.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "chumpa color negro",
        "cantidad": 1,
        "precioUnitario": 95.0,
        "subtotal": 95.0
      },
      {
        "nombre": "VaVaBold Camiseta de mujer de ajuste ceñido con cuello en V de unicolor, camiseta casual asimétrica,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Genkimix Kids 1 Set de Estilo Deportivo Casual de Moda Joven para Niños con Estampado de Letra Calif",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-134",
    "cliente": "Miriam C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 155.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Producto #2897",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-133",
    "cliente": "Katy HERNÁNDEZ Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 285.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "PAORPEVM 1/2 piezas Gel exfoliante suave de 50g, limpia la piel, reduce los poros, hidrata y nutre,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEIN Girlism paquete de 4 camisetas de manga corta casuales de unicolor y ajuste ceñido para adoles",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-132",
    "cliente": "Fabiola Tahuite (funeraria)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 300.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Manfinity CasualCool Camisa de manga larga con estampado de paisley de estilo casual retro para homb",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEGLAM Rubor En Polvo Divine Flush Matte Blush-Tangerine Rubor En Polvo Altamente Pigmentado Que No",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-131",
    "cliente": "Jesica Garcia (yeye)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 605.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Pariaura Conjunto de chaleco con botones, blazer y pantalones cortos para ropa de Año Nuevo",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      },
      {
        "nombre": "Producto #2937",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Sandalias de plataforma de cuña para mujeres, suela gruesa, correa elástica, sandalias minimalistas",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-130",
    "cliente": "Marilú El Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 285.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "liquid foundation",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 15.0
      },
      {
        "nombre": "set de aretes plateados",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "24 uñas acrílicas ovaladas con estampado de lunares al estilo francés, ajuste perfecto. El set inclu",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "Juego de 10 piezas de arte de uñas hecho a mano, en forma de trapecio corto de color rojo, con temas",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      },
      {
        "nombre": "termo con filtro",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-129",
    "cliente": "Aby Hermana de Any",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 820.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN Privé Camiseta para mujer con mangas abullonadas, escote asimétrico, calados y contraste de lu",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Siren Gaze Camiseta de tirantes sin espalda informal de verano para mujer, de moda para uso al aire",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN EZwear Blusa suelta de mujer de manga corta con cuello redondo en malla roja",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Crema BB bloqueador solar blanqueadora SPF50 PA+++, libre de aceite, hidratante, loción bloqueadora",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Juego completo de afeitado y depilación, incluye 60g de exfoliante previo al afeitado, 90ml de aceit",
        "cantidad": 2,
        "precioUnitario": 185.0,
        "subtotal": 370.0
      }
    ]
  },
  {
    "id": "COT-128",
    "cliente": "Iraida Contreras",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 150.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Cárdigan abierto tipo kimono ligero con cuello en forma de chal, mangas 3/4 relajadas, estampado de",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-127",
    "cliente": "Alejandra amiga De Katerin",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN Privé Camiseta casual con estampado integral, cuello de strass, anudada por delante y calada",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-126",
    "cliente": "Monica Herrera (el carmén)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 260.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "falda de cuero",
        "cantidad": 1,
        "precioUnitario": 60.0,
        "subtotal": 60.0
      },
      {
        "nombre": "90ml Aceite humectante para después del afeitado con aroma a fresa, fórmula reafirmante, nutrición p",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "PAORPEVM 1/2 piezas Gel exfoliante suave de 50g, limpia la piel, reduce los poros, hidrata y nutre,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-125",
    "cliente": "Rosana Esquité",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 85.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Delineador De Ojos En áNgulo Pro-Flex, Negro, Delineador De Ojos Mate De Alta PigmentacióN P",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-124",
    "cliente": "Sofía vecina",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 350.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "traje de baño floral",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      },
      {
        "nombre": "Conjunto de 2 piezas de gafas de sol con estampado de leopardo y camiseta y pantalones cortos para n",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Set de 2 piezas Top de camiseta de manga corta fina y pantalón corto inferior, estilo de vestimenta",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-123",
    "cliente": "Jacky Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 300.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Elenzga Tops de tirantes y camisetas de mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN LUNE Camiseta casual de mujer de manga corta con cuello redondo, textura de jacquard de unicol",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Jeta Ari Camiseta Ajustada Con Cuello Asimétrico Fruncido De Color Sólido",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-122",
    "cliente": "Brenda Herrarte",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Elenzga Tops de tirantes y camisetas de mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN Frenchy Camiseta de manga larga de unicolor casual, versátil para el otoño",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-121",
    "cliente": "Delmy hermana de Ivón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Gloray Vestido midi elegante y ajustado sin tirantes con pliegues para mujer",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-120",
    "cliente": "Adry Rosales",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 185.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN EZwear Set de 3 camisetas de manga larga de cuello redondo con estampado gráfico, de ajuste ce",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-119",
    "cliente": "Andrea amiga de Flor",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 310.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "1 Set Camiseta de manga corta de cuello redondo con estampado de letras negras y pantalones cortos p",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Breezaya Vestido mini con tirantes de espagueti y estampado floral ditsy con lazo",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "boxer de caballero",
        "cantidad": 1,
        "precioUnitario": 55.0,
        "subtotal": 55.0
      }
    ]
  },
  {
    "id": "COT-118",
    "cliente": "Jerly C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 190.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "blusa blanca rayas celestes y rosadas",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "SHEIN Set de 2 piezas de conjunto informal para niña con camiseta de manga corta de cuello redondo c",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-117",
    "cliente": "Kimberly Marroquín",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 385.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "blusa negra con cuello blanco",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "1 pieza con patrón de corazón calculadora",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Hailicare Masajeador de pies portátil con vibración y calefacción, con protección para el tobillo. M",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-116",
    "cliente": "Any Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 770.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "traje de caballero",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "suéter zich",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Coolane Blusa casual de manga corta con cuello redondo y estampado de periódico en malla",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "345 Crema Hidratante, Capacidad grande de 150g, Proporciona efectos hidratantes y nutritivos para la",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Soleia Conjunto de 3 piezas con top corto de punto para vacaciones, con diseño ajustado, lazo decora",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-115",
    "cliente": "Any nueva Z2 SCP",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 355.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Elenzga Camiseta de manga larga de mujer de moda elegante con hombro descubierto y dobladillo a raya",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Elenzga Tops de tirantes y camisetas de mujer",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Conjunto de bikini con estampado floral elegante y lujoso para mujeres en invierno y verano, traje d",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-114",
    "cliente": "kimm Castellanos",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 330.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "blusa beige de manga larga kim",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "blusa blanca rayas celestes y rosadas",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 40.0
      },
      {
        "nombre": "SHEIN MOD Vestido mini casual de mujer de jean con parches",
        "cantidad": 1,
        "precioUnitario": 250.0,
        "subtotal": 250.0
      }
    ]
  },
  {
    "id": "COT-113",
    "cliente": "Nohemí Tahuite",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Soleia Vestido suéter para mujer con escote en V, tirantes finos, recortes y estrellas de mar metáli",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "LLavero de Acero Inoxidable Grabado en Español para Papá - Regalo del Día del Padre con Diseño \"Papá (1 PC)",
        "cantidad": 1,
        "precioUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "COT-112",
    "cliente": "Gaby amiga de Jessica",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-27",
    "vigencia": "2026-03-14",
    "total": 250.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN Privé Blusa brillante de manga larga con parches de lentejuelas y malla, elegante para fiesta,",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEIN Privé Blusa elegante de manga larga con lentejuelas y parches de malla brillante, adecuada par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "COT-111",
    "cliente": "Karina tia de Cali",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-26",
    "vigencia": "2026-03-13",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN Essnce Camiseta con estampado de rayas de hombros descubiertos",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEIN LUNE Camiseta casual de mujer de manga corta con cuello redondo, textura de jacquard de unicol",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-110",
    "cliente": "Jeny amiga de Flor",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-26",
    "vigencia": "2026-03-13",
    "total": 155.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Breezaya Vestido con volantes y espalda con lazo con estampado floral aleatorio todo sobre, vestimen",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-109",
    "cliente": "Celeste prima Jesica",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-26",
    "vigencia": "2026-03-13",
    "total": 155.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Set de 2 piezas de conjunto casual de mujer de unicolor con nudo, para primavera/verano",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-108",
    "cliente": "Verónica Cuque",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-02-26",
    "vigencia": "2026-03-13",
    "total": 575.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Elenzga Vestido largo elegante de aspecto de mezclilla azul con hombros descubiertos y cinturón para",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      },
      {
        "nombre": "SHEIN Clasi Vestido de vacaciones informal con estampado de plantas para tallas grandes",
        "cantidad": 1,
        "precioUnitario": 175.0,
        "subtotal": 175.0
      },
      {
        "nombre": "Manfinity Dauomo Conjunto de camisa de manga corta minimalista con color de contraste para hombres y",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-106",
    "cliente": "Ceci Delgado",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 85.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Save lt Gel laminador para cejas Marca Belleza Maquillaje Maquullaje Cosmética para Mujeres  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-105",
    "cliente": "Jesica Garcia (yeye)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Traje de baño de una pieza de unicolor, sexy, con escote en V y contraste de color para vacaciones e (S)",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-104",
    "cliente": "Jesica Paola",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 155.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM HAIR Suero de protección sin enjuague Hot Streak, 150 ml/5 onzas líquidas, spray protector d (unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-103",
    "cliente": "Esposa Fernando",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 210.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Hydra jelly Pocket Bálsamo labial-Sugar Swirl lip combo Marca Belleza Maquillaje Maquullaje  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-102",
    "cliente": "Andrea Salón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 545.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEIN PETITE Falda con estampado floral de muslo con abertura (Petite XS)",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      },
      {
        "nombre": "SHEIN Lencería De Sujetador Con Aros Y Encaje Floral (S)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Panties De Triángulo Decoradas Con Borde De Concha Y Malla En El Medio (S)",
        "cantidad": 1,
        "precioUnitario": 75.0,
        "subtotal": 75.0
      },
      {
        "nombre": "Breezaya Falda con estampado floral ditsy, dobladillo asimétrico con volantes, cintura alta, ajuste  (XS)",
        "cantidad": 1,
        "precioUnitario": 185.0,
        "subtotal": 185.0
      }
    ]
  },
  {
    "id": "COT-101",
    "cliente": "Aby Hermana de Any",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 300.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Rubor En Polvo Divine Flush Matte Blush-Insta Flame Rubor En Polvo Altamente Pigmentado Que  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM LáPiz Corrector De Poros, Corrector De Oleosidad, Minimizador De Poros, Base De Maquillaje F (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "The Superman | SHEGLAM Good Grip Fresco Calmante Prebase Marca Belleza Maquillaje Maquullaje Cosméti (Reafirmante)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-100",
    "cliente": "Majo De Jirón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 85.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "20g Barra de protector solar SPF 50+PA+++, adecuado para protección solar, protección al aire libre, (1 Uds)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-99",
    "cliente": "Jacky Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 395.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Llavero de cuero personalizado con foto, llavero personalizado con foto, llavero de cuero personaliz",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "Nuevas sandalias de mula sin espalda de moda 2025, versátiles sandalias sin cordones con suela bland (CN37)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "Sandalias tipo mula con cierre deslizante para mujer ZPWZ2025 Nuevas, versátiles y elegantes, con su (CN37)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-98",
    "cliente": "Cintia Rodriguez, hermana de Jeni Waleska",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 450.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM HAIR Suero de protección sin enjuague Hot Streak, 150 ml/5 onzas líquidas, spray protector d (unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM HAIR Suero revitalizante para el cuero cabelludo, rollo refrescante de agua alpina, rollo de (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEGLAM HAIR Champú seco voluminizador Minty Fresh, polvo refrescante, volumen instantáneo, efecto e (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "1 pieza Billetera de moda personalizada para hombres - Grano de árbol de piel sintética personalizad",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "COT-97",
    "cliente": "Monica Herrera (el carmén)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 155.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Sand Marca Belleza Maquillaje Maquullaje Cosmética para  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-96",
    "cliente": "Edna Don Justo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 85.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Crema para los ojos con retinol - Reduce las líneas finas, las ojeras, las bolsas y la hinchazón de",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-95",
    "cliente": "Graciela García",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Amorya Camisa de mujer de manga larga con solapa de satén de acetato de unicolor elegante (M)",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-94",
    "cliente": "Gaby El campo por el proyecto",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 85.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Corrector En Crema Rapid Retouch-Linen Corrector En Crema Rapid Retouch-Linen Corrector En C (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-93",
    "cliente": "panadería la Cumbre",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 85.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "The Twilight Saga X SHEGLAM Soulmates Perfume Sólido Marca Belleza Maquillaje Maquullaje Cosmética p (5ml)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      }
    ]
  },
  {
    "id": "COT-92",
    "cliente": "Michelle Dávila",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Bolso cuadrado pequeño de diseño de onda de moda 2025 para mujeres, bolso de hombro y cruzado con bo (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-91",
    "cliente": "Karina Grajeda",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 150.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Base De Maquillaje Mate Duradera Y Transpirable Complexion Pro-Buttercream Base De Maquillaj (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-90",
    "cliente": "Lupita Salón",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHAQINUO Set quitamascara, máscara voluminizadora y rizadora, color de larga duración, resistente al",
        "cantidad": 1,
        "precioUnitario": 200.0,
        "subtotal": 200.0
      }
    ]
  },
  {
    "id": "COT-89",
    "cliente": "Alejandra sobrina de Ana Carín",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-09",
    "total": 235.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Soft Haze Lip Blur-Think Twice De 6 Colores, Resistente Al Agua, Tinte  (Unitalla, Medium)",
        "cantidad": 1,
        "precioUnitario": 85.0,
        "subtotal": 85.0
      },
      {
        "nombre": "SHEGLAM Base De Maquillaje Mate Duradera Y Transpirable Complexion Pro-Bamboo Matte Base De Maquilla (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 150.0,
        "subtotal": 150.0
      }
    ]
  },
  {
    "id": "COT-88",
    "cliente": "Wendy amiga de Tania",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-08",
    "total": 380.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Sand Marca Belleza Maquillaje Maquullaje Cosmética para  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM LáPiz De Contorno Facial Multi-Glam, Mediano, De 6 Colores, No Graso, De Larga DuracióN, Iluminador Natural, De Doble Uso, Multiuso, Esculpe, Suaviza Las LíNeas Finas, Contorno Cremoso Marca Belleza Maquillaje Maquullaje CosméTica Para Mujeres NiñAs Perfecto Para Invierno Primavera Ideal Para Y2K Elegante Moda Adecuado Para CumpleañOs Regalo Fiesta Listo Mejor Color",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-87",
    "cliente": "Julissa Pumay",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-08",
    "total": 1010.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Bolso bandolera con forma de corazón de encaje, bolso de hombro con bordado de estilo elegante",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Glass Lock Air Brillo Labial-Hard Candy lip combo Marca Belleza Maquillaje Maquullaje Cosmét (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Glass Lock Air Brillo Labial-That's My Jam lip combo Marca Belleza Maquillaje Maquullaje Cos (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Glass Lock Air Brillo Labial-Own It lip combo Marca Belleza Maquillaje Maquullaje Cosmética  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Soft Haze Lip Blur-Just Smooches De 6 Colores, Resistente Al Agua, Tint (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Iluminador Corporal Sunkissed-Iluminador LíQuido Eros Iluminador Corporal De Larga DuracióN  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Shell Marca Belleza Maquillaje Maquullaje Cosmética para (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Peach Marca Belleza Maquillaje Maquullaje Cosmética para (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      }
    ]
  },
  {
    "id": "COT-86",
    "cliente": "Katy Sánchez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-08",
    "total": 380.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Fair Marca Belleza Maquillaje Maquullaje Cosmética para  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM LáPiz Labial LíQuido Soft Haze Lip Blur-Just Smooches De 6 Colores, Resistente Al Agua, Tint (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Camera On Suavizante & Difuminador Prebase Marca Belleza Maquillaje Maquullaje Cosmética par",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      }
    ]
  },
  {
    "id": "COT-85",
    "cliente": "Adry Rosales",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-08",
    "total": 955.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "SHEGLAM Lock & Go Long-Lasting Base Cushion-Porcelain Marca Belleza Maquillaje Maquullaje Cosmética  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 155.0,
        "subtotal": 155.0
      },
      {
        "nombre": "SHEGLAM Fall In Line Delineador de Labios Despegable con Tinte-Bare Blush lip combo Marca Belleza Ma (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Glass Glow Colorete en barra-Pink Lemonade rare,colorete Marca Belleza Maquillaje Maquullaje (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM LáPiz Iluminador Y Contorno De Nariz 2 En 1 Fine Line, LáPiz Iluminador De 2 Colores, No Gra (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "LáPiz Depilatorio Ez Control Y TóNico Calmante Sheglam Ez Control Cera Agradable Para La Piel FóRmul (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "SHEGLAM Corrector De Alta Cobertura Perfect Skin-Linen 20 Tonos Corrector LíQuido Brocha Hidratante  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 125.0,
        "subtotal": 125.0
      },
      {
        "nombre": "20g Barra de protector solar SPF 50+PA+++, adecuado para protección solar, protección al aire libre, (1 Uds)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "SHEGLAM Longwear Invisible Hold Pegamento para Pestañas-Clear Marca Belleza Maquillaje Maquullaje Co (Alargamiento)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-84",
    "cliente": "Liseth Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-08",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Bolsa pequeña de estilo sencillo y tela de nailon con diseño de mariposa, nueva bolsa de moda cruzad (XG8857)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-77",
    "cliente": "Kimberly Marroquín",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Mochila de nailon de unicolor y moda informal, con gran capacidad, compartimento para portátil, port (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-76",
    "cliente": "Any nueva Z2 SCP",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Mochila informal de estilo universitario para mujer de tela de nailon de unicolor",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-73",
    "cliente": "Glendy esposa Erick",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Bolso Bandolera para Mujer con Correas Ajustables y 3 Opciones de Color - Bolso de Hombro de Gran Ca (19,99 cm x 3,0 cm x 15,01 cm, Negro)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso de mujer de moda con pespunte, bolso bandolera, embrague, bolso sobre, decoración metálica rec",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-72",
    "cliente": "Wendy Alvarez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 300.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Bolso de hombro versátil, casual, retro y minimalista de moda",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Nueva bolsa de mano minimalista de moda con estampado de fresa, diseño cuadrado, bolsillo exterior 3",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso en forma de media luna con pliegues, bufanda de seda y decoración de lazo para mujeres, bolso  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-69",
    "cliente": "Viky ref Dayana",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 200.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Mini bolso de hombro de verano plateado de PVC con impresión láser de letras, Bolso cruzado de moda  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso De Brazalete Para Correr Deportivos, Mini Bolsa De Teléfono Bandolera De Nylon, Bolsa De Crema",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-68",
    "cliente": "Celeste prima Jesica",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "1 pieza Bolso de hombro de gran capacidad con cierre de cremallera y decoración de ciervo de poliést (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-67",
    "cliente": "Marilú El Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-66",
    "cliente": "Irene C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Nueva bolsa de mano minimalista de moda con estampado de fresa, diseño cuadrado, bolsillo exterior 3",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-65",
    "cliente": "Ana Carin",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 300.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Nuevo bolso de mujer de moda informal de piel de PU con diseño de un solo hombro, disponible en negr",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso en forma de media luna con pliegues, bufanda de seda y decoración de lazo para mujeres, bolso  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-61",
    "cliente": "Carol campo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Bolsa organizadora de maquillaje con estampado vintage, nueva para el verano 2025. Bolso de mano, bo (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-58",
    "cliente": "Yanira Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 300.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Bolso De Brazalete Para Correr Deportivos, Mini Bolsa De Teléfono Bandolera De Nylon, Bolsa De Crema",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso de pecho/riñonera de material de nailon de alta capacidad, unisex para uso diario, deportivo,",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Mini bolso de hombro de verano plateado de PVC con impresión láser de letras, Bolso cruzado de moda  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-57",
    "cliente": "hermana Irene",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-55",
    "cliente": "Valery Blanco",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-23",
    "vigencia": "2026-02-07",
    "total": 100.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Mochila de pana de unicolor de moda, mochila pequeña impermeable para campus para mujeres, adecuada  (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-53",
    "cliente": "Claudia prima de Mónica",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-24",
    "vigencia": "2026-02-07",
    "total": 400.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Bolsa pequeña de estilo sencillo y tela de nailon con diseño de mariposa, nueva bolsa de moda cruzad (XG8857)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      },
      {
        "nombre": "Bolso bandolera con forma de corazón de encaje, bolso de hombro con bordado de estilo elegante",
        "cantidad": 2,
        "precioUnitario": 100.0,
        "subtotal": 200.0
      },
      {
        "nombre": "Bolsa organizadora de maquillaje con estampado vintage, nueva para el verano 2025. Bolso de mano, bo (Unitalla)",
        "cantidad": 1,
        "precioUnitario": 100.0,
        "subtotal": 100.0
      }
    ]
  },
  {
    "id": "COT-42",
    "cliente": "Cindy Alcantara",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 65.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "peine stitch encapsulado",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "brillo 3147",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 0.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-41",
    "cliente": "Carol campo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 10.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "bolígrafo kuromi",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "COT-40",
    "cliente": "Nancy Castillo",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 10.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "COT-39",
    "cliente": "Katerin López",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 10.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "duo calcetas cortas",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "COT-38",
    "cliente": "Aby Velásquez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 30.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Producto #2797",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "COT-37",
    "cliente": "Sara Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 10.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "bolígrafo 84",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "bolígrafo 079",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "COT-36",
    "cliente": "jessi C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 25.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "Producto #2797",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      }
    ]
  },
  {
    "id": "COT-35",
    "cliente": "Andrea Davila",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 45.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "brillo 3147",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "COT-34",
    "cliente": "Jenifer Cali",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 30.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "bolígrafo 079",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-33",
    "cliente": "kimm Castellanos",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 20.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "peine stitch encapsulado",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-32",
    "cliente": "Clemencia Orellana",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 38.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "bolígrafo kuromi",
        "cantidad": 1,
        "precioUnitario": 8.0,
        "subtotal": 8.0
      },
      {
        "nombre": "brillo",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "COT-31",
    "cliente": "Yoshi C/F",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 65.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "brillo 3147",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 0.0
      },
      {
        "nombre": "cuaderno stitch",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-30",
    "cliente": "Paola Pueblo Nuevo Viñas",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 45.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "brillo 3147",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 0.0
      },
      {
        "nombre": "carpeta para hojas transparente",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "COT-29",
    "cliente": "Valery Blanco",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 45.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "cuaderno Stitch efecto agua",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "sacapuntas  stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "COT-28",
    "cliente": "Alejandra Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 254.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "bolígrafo 079",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "protector para cargador de stitch",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "goma solido",
        "cantidad": 1,
        "precioUnitario": 6.0,
        "subtotal": 6.0
      },
      {
        "nombre": "marcadores 24 pzs",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "cuaderno stitch 3d",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "cuaderno kuromi",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 25.0
      },
      {
        "nombre": "tabla capibara para hojas",
        "cantidad": 1,
        "precioUnitario": 8.0,
        "subtotal": 8.0
      },
      {
        "nombre": "paquete stiker 3D",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "pulcera fresita",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 0.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "carpeta para hojas transparente",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "COT-27",
    "cliente": "Sara Ramírez",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 130.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "marcadores 24 pzs",
        "cantidad": 2,
        "precioUnitario": 35.0,
        "subtotal": 70.0
      },
      {
        "nombre": "bolígrafo 84",
        "cantidad": 3,
        "precioUnitario": 5.0,
        "subtotal": 15.0
      },
      {
        "nombre": "bolígrafo 079",
        "cantidad": 3,
        "precioUnitario": 5.0,
        "subtotal": 15.0
      },
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "Producto #2797",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "COT-26",
    "cliente": "Angélica Pueblo Nuevo Viñas",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 45.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "duo calcetas cortas",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      },
      {
        "nombre": "Producto #2797",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "bolígrafo 84",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "COT-25",
    "cliente": "Elida Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 80.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "peine stitch 3d",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "Producto #2797",
        "cantidad": 2,
        "precioUnitario": 15.0,
        "subtotal": 30.0
      },
      {
        "nombre": "sacapuntas  stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "COT-24",
    "cliente": "Becky San José Pinula",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 90.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "Producto #2797",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "brillo",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 10.0
      },
      {
        "nombre": "cuaderno kuromi",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "juego de joyería",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 0.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "sacapuntas la bubu",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "COT-23",
    "cliente": "Blanca comercial Eden",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 40.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "peine stitch encapsulado",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 40.0
      }
    ]
  },
  {
    "id": "COT-22",
    "cliente": "Yanira Hernández",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-19",
    "vigencia": "2026-01-20",
    "total": 30.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 2,
        "precioUnitario": 20.0,
        "subtotal": 30.0
      }
    ]
  },
  {
    "id": "COT-21",
    "cliente": "Andrea Agustin",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-21",
    "total": 105.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "cuaderno stitch 3d",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 35.0
      },
      {
        "nombre": "sacapuntas  stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 10.0
      },
      {
        "nombre": "Producto #2797",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "protector para cargador de stitch",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "espejo stitch",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-20",
    "cliente": "Rous Central Depot",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 130.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "calcetas",
        "cantidad": 1,
        "precioUnitario": 50.0,
        "subtotal": 50.0
      },
      {
        "nombre": "cuaderno stitch",
        "cantidad": 2,
        "precioUnitario": 10.0,
        "subtotal": 20.0
      },
      {
        "nombre": "ropa interior hello kity",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "carpeta para hojas transparente",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 0.0
      },
      {
        "nombre": "borrador",
        "cantidad": 2,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      },
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      }
    ]
  },
  {
    "id": "COT-19",
    "cliente": "Marilú El Pueblito",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 131.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "sombra romántic bird",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 30.0
      },
      {
        "nombre": "candado",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 10.0
      },
      {
        "nombre": "Producto #2797",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "duo ropa interior dama",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "libreta capibara",
        "cantidad": 1,
        "precioUnitario": 30.0,
        "subtotal": 30.0
      },
      {
        "nombre": "calcetas hello kity",
        "cantidad": 1,
        "precioUnitario": 15.0,
        "subtotal": 15.0
      },
      {
        "nombre": "goma solido",
        "cantidad": 1,
        "precioUnitario": 6.0,
        "subtotal": 6.0
      },
      {
        "nombre": "bolígrafo 84",
        "cantidad": 1,
        "precioUnitario": 5.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "COT-17",
    "cliente": "Andy Yat",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-19",
    "total": 20.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-16",
    "cliente": "Andrea Valencia",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 60.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "sombra stitch",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      },
      {
        "nombre": "sombra romántic bird",
        "cantidad": 1,
        "precioUnitario": 35.0,
        "subtotal": 30.0
      },
      {
        "nombre": "estuche transparente stitch",
        "cantidad": 1,
        "precioUnitario": 10.0,
        "subtotal": 5.0
      }
    ]
  },
  {
    "id": "COT-15",
    "cliente": "Estela Galeano",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-19",
    "total": 20.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      }
    ]
  },
  {
    "id": "COT-14",
    "cliente": "Milvia De La Cruz (La Salvadora)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 45.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "bolsa lunch bag",
        "cantidad": 1,
        "precioUnitario": 20.0,
        "subtotal": 20.0
      },
      {
        "nombre": "duo calcetas largas",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  },
  {
    "id": "COT-13",
    "cliente": "Lucía Méndez(Tienda Max)",
    "empresa": "IntegraPro S.A.",
    "fecha": "2026-01-18",
    "vigencia": "2026-01-20",
    "total": 40.0,
    "estado": "Aprobada",
    "productos": [
      {
        "nombre": "libreta la bubu",
        "cantidad": 1,
        "precioUnitario": 40.0,
        "subtotal": 15.0
      },
      {
        "nombre": "sombra stitch",
        "cantidad": 1,
        "precioUnitario": 25.0,
        "subtotal": 25.0
      }
    ]
  }
];
