import { Proveedor, Compra } from '../types';

export const REAL_PROVEEDORES: Proveedor[] = [
  {
    "id_proveedor": 77,
    "nombre": "Plus Size GT",
    "nit": "CF",
    "telefono": "6638-2048",
    "email": "pedidos@plussize.gt",
    "direccion": "Villa Canales",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 76,
    "nombre": "Casual Friday",
    "nit": "CF",
    "telefono": "6636-2047",
    "email": "ventas@casualfriday.gt",
    "direccion": "Fraijanes",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 75,
    "nombre": "Fitness Pro",
    "nit": "CF",
    "telefono": "6635-2046",
    "email": "info@fitnesspro.gt",
    "direccion": "San Juan Sac.",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 74,
    "nombre": "Baby & Mom",
    "nit": "CF",
    "telefono": "6633-2045",
    "email": "pedidos@babymom.gt",
    "direccion": "Palencia",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 73,
    "nombre": "Comfort Home",
    "nit": "CF",
    "telefono": "6632-2044",
    "email": "ventas@comforthome.gt",
    "direccion": "Amatitlán",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 72,
    "nombre": "Urban Street",
    "nit": "CF",
    "telefono": "5555-2043",
    "email": "info@urbanstreet.gt",
    "direccion": "Online",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 71,
    "nombre": "Swim & Beach",
    "nit": "CF",
    "telefono": "2346-2042",
    "email": "ventas@swimbeach.gt",
    "direccion": "Puerto San José",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 70,
    "nombre": "Denim House",
    "nit": "CF",
    "telefono": "2345-2041",
    "email": "info@denimhouse.gt",
    "direccion": "Z1 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 69,
    "nombre": "All Season Wear",
    "nit": "CF",
    "telefono": "2344-2040",
    "email": "pedidos@allseason.gt",
    "direccion": "Z8 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 68,
    "nombre": "Camisetas Custom",
    "nit": "CF",
    "telefono": "2343-2039",
    "email": "ventas@camisetascustom.gt",
    "direccion": "Z11 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 67,
    "nombre": "Moda Curvy",
    "nit": "CF",
    "telefono": "2342-2038",
    "email": "info@modacurvy.gt",
    "direccion": "Z5 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 66,
    "nombre": "Seda Import",
    "nit": "CF",
    "telefono": "2341-2037",
    "email": "orders@sedaimport.gt",
    "direccion": "Z13 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 65,
    "nombre": "Ropa Ecológica",
    "nit": "CF",
    "telefono": "6631-2036",
    "email": "ventas@ropaeco.gt",
    "direccion": "Sta Catarina Pinula",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 64,
    "nombre": "Hilos y Agujas",
    "nit": "CF",
    "telefono": "2339-2035",
    "email": "info@hilosyagujas.gt",
    "direccion": "Mixco",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 63,
    "nombre": "Mayoreo Fashion",
    "nit": "CF",
    "telefono": "2338-2034",
    "email": "ventas@mayoreofashion.gt",
    "direccion": "Z7 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 62,
    "nombre": "Tienda Vintage",
    "nit": "CF",
    "telefono": "2364-2033",
    "email": "info@tiendavintage.gt",
    "direccion": "Cayalá",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 61,
    "nombre": "Uniformes Corp",
    "nit": "CF",
    "telefono": "2365-2032",
    "email": "pedidos@unicorp.gt",
    "direccion": "Z12 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 60,
    "nombre": "Kids Fashion",
    "nit": "CF",
    "telefono": "2369-2031",
    "email": "ventas@kidsfashion.gt",
    "direccion": "Z15 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 59,
    "nombre": "Bisutería Fina",
    "nit": "CF",
    "telefono": "2366-2030",
    "email": "info@bisufina.gt",
    "direccion": "Z14 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 58,
    "nombre": "Cinturones MX",
    "nit": "CF",
    "telefono": "5550-2029",
    "email": "ventas@cintmx.com",
    "direccion": "CDMX",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 57,
    "nombre": "Sombreros GT",
    "nit": "CF",
    "telefono": "6637-2028",
    "email": "info@sombrerosgt.gt",
    "direccion": "Villa Nueva",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 56,
    "nombre": "Gafas & Vision",
    "nit": "CF",
    "telefono": "7760-2027",
    "email": "pedidos@gafasvision.gt",
    "direccion": "San Marcos",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 55,
    "nombre": "Piel y Cuero",
    "nit": "CF",
    "telefono": "7766-2026",
    "email": "ventas@pielycuero.gt",
    "direccion": "Totonicapán",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 54,
    "nombre": "Bordados Artesanales",
    "nit": "CF",
    "telefono": "7762-2025",
    "email": "info@bordadosart.gt",
    "direccion": "Sololá",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 53,
    "nombre": "Gym Wear GT",
    "nit": "CF",
    "telefono": "7771-2024",
    "email": "ventas@gymwear.gt",
    "direccion": "Retalhuleu",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 52,
    "nombre": "Zapatos Comfort",
    "nit": "CF",
    "telefono": "7872-2023",
    "email": "info@zapatoscomfort.gt",
    "direccion": "Mazatenango",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 51,
    "nombre": "Telas y Confección",
    "nit": "CF",
    "telefono": "7942-2022",
    "email": "pedidos@telasyconf.gt",
    "direccion": "Chiquimula",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 50,
    "nombre": "Moda Express",
    "nit": "CF",
    "telefono": "7941-2021",
    "email": "ventas@modaexpress.gt",
    "direccion": "Zacapa",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 49,
    "nombre": "Electro Import",
    "nit": "CF",
    "telefono": "7922-2020",
    "email": "info@electroimport.gt",
    "direccion": "Jalapa",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 48,
    "nombre": "Sport Zone GT",
    "nit": "CF",
    "telefono": "7844-2019",
    "email": "orders@sportzone.gt",
    "direccion": "Jutiapa",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 47,
    "nombre": "Lencería Fine",
    "nit": "CF",
    "telefono": "7926-2018",
    "email": "ventas@lenceriafine.gt",
    "direccion": "Flores, Petén",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 46,
    "nombre": "Relojería Central",
    "nit": "CF",
    "telefono": "7764-2017",
    "email": "info@relojeriacentral.gt",
    "direccion": "Huehuetenango",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 45,
    "nombre": "Moda Infantil GT",
    "nit": "CF",
    "telefono": "7951-2016",
    "email": "pedidos@modainfantil.gt",
    "direccion": "Cobán",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 44,
    "nombre": "Fragancias Select",
    "nit": "CF",
    "telefono": "7761-2015",
    "email": "ventas@fragselect.gt",
    "direccion": "Quetzaltenango",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 43,
    "nombre": "Accesorios GL",
    "nit": "CF",
    "telefono": "7888-2014",
    "email": "info@accesoriosgl.gt",
    "direccion": "Escuintla",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 42,
    "nombre": "Import Asia Direct",
    "nit": "CF",
    "telefono": "5550-2013",
    "email": "sales@asiadirect.com",
    "direccion": "Shenzhen",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 41,
    "nombre": "Textil Maya",
    "nit": "CF",
    "telefono": "7839-2012",
    "email": "ventas@textilmaya.gt",
    "direccion": "Chimaltenango",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 40,
    "nombre": "Bolsos y Más",
    "nit": "CF",
    "telefono": "7832-2011",
    "email": "pedidos@bolsosymas.gt",
    "direccion": "Antigua Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 39,
    "nombre": "Hogar & Deco",
    "nit": "CF",
    "telefono": "6634-2010",
    "email": "info@hogardeco.gt",
    "direccion": "Villa Nueva",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 38,
    "nombre": "Deportes Total",
    "nit": "CF",
    "telefono": "2434-2009",
    "email": "ventas@deportestotal.gt",
    "direccion": "Z11 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 37,
    "nombre": "Calzado Premium",
    "nit": "CF",
    "telefono": "2440-2008",
    "email": "pedidos@calzadopremium.gt",
    "direccion": "Z7 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 36,
    "nombre": "TechGadgets Import",
    "nit": "CF",
    "telefono": "2368-2007",
    "email": "info@techgadgets.gt",
    "direccion": "Z4 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 35,
    "nombre": "CosméticaPro GT",
    "nit": "CF",
    "telefono": "2254-2006",
    "email": "ventas@cosmeticapro.gt",
    "direccion": "Z9 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 34,
    "nombre": "Joyería Elegance",
    "nit": "CF",
    "telefono": "2475-2005",
    "email": "orders@elegance.gt",
    "direccion": "Antigua Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 33,
    "nombre": "Distribuidora Bella",
    "nit": "CF",
    "telefono": "2421-2004",
    "email": "pedidos@disbella.gt",
    "direccion": "Mixco",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 32,
    "nombre": "Importadora Fashion",
    "nit": "CF",
    "telefono": "2332-2003",
    "email": "compras@importfashion.gt",
    "direccion": "Z10 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 31,
    "nombre": "Textiles del Sur",
    "nit": "CF",
    "telefono": "7771-2002",
    "email": "ventas@textilesdelsur.gt",
    "direccion": "Retalhuleu",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 30,
    "nombre": "Moda Centro S.A.",
    "nit": "CF",
    "telefono": "2251-2001",
    "email": "info@modacentro.gt",
    "direccion": "6a Av 3-20 Z1",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 29,
    "nombre": "Temu Importaciones",
    "nit": "CF",
    "telefono": "5550-1002",
    "email": "orders@temu-gt.com",
    "direccion": "Puerto Quetzal",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 28,
    "nombre": "SHEIN Guatemala",
    "nit": "CF",
    "telefono": "5550-1001",
    "email": "ventas@shein-gt.com",
    "direccion": "Zona Libre de Comercio",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 12,
    "nombre": "Proveedor Importado",
    "nit": "CF",
    "telefono": "N/A",
    "email": "N/A",
    "direccion": "Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 11,
    "nombre": "LOURDES",
    "nit": "CF",
    "telefono": "41831900",
    "email": "N/A",
    "direccion": "Guatemala",
    "regimen_tributario": "informal",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 10,
    "nombre": "Proveedor General",
    "nit": "CF",
    "telefono": "0",
    "email": "general@proveedor.com",
    "direccion": "-",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 9,
    "nombre": "Flor Areas",
    "nit": "CF",
    "telefono": "N/A",
    "email": "N/A",
    "direccion": "Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 8,
    "nombre": "LTH Guatemala",
    "nit": "CF",
    "telefono": "2233-4455",
    "email": "N/A",
    "direccion": "Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 7,
    "nombre": "Shell Guatemala",
    "nit": "CF",
    "telefono": "2200-1100",
    "email": "N/A",
    "direccion": "Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 6,
    "nombre": "Oriental City",
    "nit": "CF",
    "telefono": "N/A",
    "email": "N/A",
    "direccion": "calzada atanacio tzul 35-91 zona 12 Guatemala",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 5,
    "nombre": "Baneza Gonzalez",
    "nit": "CF",
    "telefono": "55577686",
    "email": "N/A",
    "direccion": "Santa Catarina Pinula, Guatemala",
    "regimen_tributario": "informal",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 4,
    "nombre": "Katy Gonzalez",
    "nit": "CF",
    "telefono": "59440491",
    "email": "katerinandreagonzalezorellana@gmail.com",
    "direccion": "10 Avenida 1-46 Zona 2 Santa Catarina Pinula",
    "regimen_tributario": "informal",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 3,
    "nombre": "TEMU",
    "nit": "CF",
    "telefono": "35692070",
    "email": "jahh21.jh@gmail.com",
    "direccion": "10 Avenida 1-46 Zona 2 Santa Catarina Pinula",
    "regimen_tributario": "general",
    "saldo_pendiente": 0.0
  },
  {
    "id_proveedor": 2,
    "nombre": "SHEIN",
    "nit": "CF",
    "telefono": "59440491",
    "email": "katerinandreagonzalezorellana@gmail.com",
    "direccion": "10 Avenida 1-46 Zona 2 Santa Catarina Pinula",
    "regimen_tributario": "informal",
    "saldo_pendiente": 0.0
  }
];

export const REAL_COMPRAS: Compra[] = [
  {
    "id_compra": 249,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-10-13",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH19333X000M09",
    "monto_total": 3030.27,
    "monto_exento": 0.0,
    "monto_iva": 324.67,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 3030.27,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 249,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 3030.27,
        "subtotal": 3030.27
      }
    ]
  },
  {
    "id_compra": 248,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-10-13",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH19333X000M09",
    "monto_total": 3030.27,
    "monto_exento": 0.0,
    "monto_iva": 324.67,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 3030.27,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 248,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 3030.27,
        "subtotal": 3030.27
      }
    ]
  },
  {
    "id_compra": 247,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-10-13",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH19333X000M09",
    "monto_total": 3030.27,
    "monto_exento": 0.0,
    "monto_iva": 324.67,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 3030.27,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 247,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 3030.27,
        "subtotal": 3030.27
      }
    ]
  },
  {
    "id_compra": 246,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-09-30",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1SV336000HE2",
    "monto_total": 1321.79,
    "monto_exento": 0.0,
    "monto_iva": 141.62,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1321.79,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 246,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1321.79,
        "subtotal": 1321.79
      }
    ]
  },
  {
    "id_compra": 245,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-09-29",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1SJ336000SQ8",
    "monto_total": 761.5,
    "monto_exento": 0.0,
    "monto_iva": 81.59,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 761.5,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 245,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 761.5,
        "subtotal": 761.5
      }
    ]
  },
  {
    "id_compra": 244,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-09-29",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1SJ33N001X27",
    "monto_total": 1780.92,
    "monto_exento": 0.0,
    "monto_iva": 190.81,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1780.92,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 244,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1780.92,
        "subtotal": 1780.92
      }
    ]
  },
  {
    "id_compra": 243,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-09-16",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1SY336002YD1",
    "monto_total": 1469.84,
    "monto_exento": 0.0,
    "monto_iva": 157.48,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1469.84,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 243,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1469.84,
        "subtotal": 1469.84
      }
    ]
  },
  {
    "id_compra": 242,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-09-13",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1S533W000S16",
    "monto_total": 981.55,
    "monto_exento": 0.0,
    "monto_iva": 105.17,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 981.55,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 242,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 981.55,
        "subtotal": 981.55
      }
    ]
  },
  {
    "id_compra": 241,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-09-11",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1SQ33M00135V",
    "monto_total": 1685.41,
    "monto_exento": 0.0,
    "monto_iva": 180.58,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1685.41,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 241,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1685.41,
        "subtotal": 1685.41
      }
    ]
  },
  {
    "id_compra": 240,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-08-29",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1RD33300N0C2",
    "monto_total": 1966.31,
    "monto_exento": 0.0,
    "monto_iva": 210.68,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1966.31,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 240,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1966.31,
        "subtotal": 1966.31
      }
    ]
  },
  {
    "id_compra": 239,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-08-25",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1RG336002C8B",
    "monto_total": 2396.64,
    "monto_exento": 0.0,
    "monto_iva": 256.78,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2396.64,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 239,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2396.64,
        "subtotal": 2396.64
      }
    ]
  },
  {
    "id_compra": 238,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-08-30",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1RG336002C8B",
    "monto_total": 2396.64,
    "monto_exento": 0.0,
    "monto_iva": 256.78,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2396.64,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 238,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2396.64,
        "subtotal": 2396.64
      }
    ]
  },
  {
    "id_compra": 237,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-08-16",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1R733X000TY0",
    "monto_total": 1017.43,
    "monto_exento": 0.0,
    "monto_iva": 109.01,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1017.43,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 237,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1017.43,
        "subtotal": 1017.43
      }
    ]
  },
  {
    "id_compra": 236,
    "id_proveedor": 1,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-08-12",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1R633600NR8U",
    "monto_total": 854.01,
    "monto_exento": 0.0,
    "monto_iva": 91.5,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 854.01,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 236,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 854.01,
        "subtotal": 854.01
      }
    ]
  },
  {
    "id_compra": 235,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-08-11",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1RT33A001VBL",
    "monto_total": 1523.64,
    "monto_exento": 0.0,
    "monto_iva": 163.25,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1523.64,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 235,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1523.64,
        "subtotal": 1523.64
      }
    ]
  },
  {
    "id_compra": 234,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-08-04",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1RU3360000M2",
    "monto_total": 670.8,
    "monto_exento": 0.0,
    "monto_iva": 71.87,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 670.8,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 234,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 670.8,
        "subtotal": 670.8
      }
    ]
  },
  {
    "id_compra": 233,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-08-02",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1R13350024JK",
    "monto_total": 1633.8,
    "monto_exento": 0.0,
    "monto_iva": 175.05,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1633.8,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 233,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1633.8,
        "subtotal": 1633.8
      }
    ]
  },
  {
    "id_compra": 232,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-08-03",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1R133B000GXR",
    "monto_total": 3154.37,
    "monto_exento": 0.0,
    "monto_iva": 337.97,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 3154.37,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 232,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 3154.37,
        "subtotal": 3154.37
      }
    ]
  },
  {
    "id_compra": 231,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-07-17",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH18933T000XHA",
    "monto_total": 107.09,
    "monto_exento": 0.0,
    "monto_iva": 11.47,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 107.09,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 231,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 107.09,
        "subtotal": 107.09
      }
    ]
  },
  {
    "id_compra": 230,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-07-17",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH18933T000XH9",
    "monto_total": 1388.72,
    "monto_exento": 0.0,
    "monto_iva": 148.79,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1388.72,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 230,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1388.72,
        "subtotal": 1388.72
      }
    ]
  },
  {
    "id_compra": 229,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-07-14",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH18833600MLJF",
    "monto_total": 2519.67,
    "monto_exento": 0.0,
    "monto_iva": 269.96,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2519.67,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 229,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2519.67,
        "subtotal": 2519.67
      }
    ]
  },
  {
    "id_compra": 228,
    "id_proveedor": 4,
    "nombre_proveedor": "Katy Gonzalez",
    "nit_proveedor": "CF",
    "fecha": "2026-07-23",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "3704311300",
    "monto_total": 405.2,
    "monto_exento": 0.0,
    "monto_iva": 43.41,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 405.2,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 228,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 405.2,
        "subtotal": 405.2
      }
    ]
  },
  {
    "id_compra": 227,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-07-03",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH18C3360019S5",
    "monto_total": 1741.5,
    "monto_exento": 0.0,
    "monto_iva": 186.59,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1741.5,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 227,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1741.5,
        "subtotal": 1741.5
      }
    ]
  },
  {
    "id_compra": 226,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-07-01",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH18233100N396",
    "monto_total": 1624.33,
    "monto_exento": 0.0,
    "monto_iva": 174.04,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1624.33,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 226,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1624.33,
        "subtotal": 1624.33
      }
    ]
  },
  {
    "id_compra": 225,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-07-01",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH18133X00M1GU",
    "monto_total": 1436.79,
    "monto_exento": 0.0,
    "monto_iva": 153.94,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1436.79,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 225,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1436.79,
        "subtotal": 1436.79
      }
    ]
  },
  {
    "id_compra": 224,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-06-30",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH18133600M24D",
    "monto_total": 1701.41,
    "monto_exento": 0.0,
    "monto_iva": 182.29,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1701.41,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 224,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1701.41,
        "subtotal": 1701.41
      }
    ]
  },
  {
    "id_compra": 223,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-06-26",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH17P33500016U",
    "monto_total": 1945.73,
    "monto_exento": 0.0,
    "monto_iva": 208.47,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1945.73,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 223,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1945.73,
        "subtotal": 1945.73
      }
    ]
  },
  {
    "id_compra": 222,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-06-23",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH17V33T00NMT1",
    "monto_total": 1492.45,
    "monto_exento": 0.0,
    "monto_iva": 159.91,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1492.45,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 222,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1492.45,
        "subtotal": 1492.45
      }
    ]
  },
  {
    "id_compra": 221,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-06-15",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH17A33M0004RB",
    "monto_total": 1274.96,
    "monto_exento": 0.0,
    "monto_iva": 136.6,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1274.96,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 221,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1274.96,
        "subtotal": 1274.96
      }
    ]
  },
  {
    "id_compra": 220,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-06-13",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH17S33500NMP5",
    "monto_total": 1101.43,
    "monto_exento": 0.0,
    "monto_iva": 118.01,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1101.43,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 220,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1101.43,
        "subtotal": 1101.43
      }
    ]
  },
  {
    "id_compra": 219,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-06-13",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH17S330001U5U",
    "monto_total": 927.79,
    "monto_exento": 0.0,
    "monto_iva": 99.41,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 927.79,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 219,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 927.79,
        "subtotal": 927.79
      }
    ]
  },
  {
    "id_compra": 218,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-06-13",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH17S3300000NM",
    "monto_total": 2639.48,
    "monto_exento": 0.0,
    "monto_iva": 282.8,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2639.48,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 218,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2639.48,
        "subtotal": 2639.48
      }
    ]
  },
  {
    "id_compra": 217,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-05-29",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1723360004F8",
    "monto_total": 1365.09,
    "monto_exento": 0.0,
    "monto_iva": 146.26,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1365.09,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 217,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1365.09,
        "subtotal": 1365.09
      }
    ]
  },
  {
    "id_compra": 216,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-05-27",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH17N33T00M097",
    "monto_total": 1465.68,
    "monto_exento": 0.0,
    "monto_iva": 157.04,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1465.68,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 216,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1465.68,
        "subtotal": 1465.68
      }
    ]
  },
  {
    "id_compra": 215,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-05-27",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH17N33300MPT6",
    "monto_total": 3176.22,
    "monto_exento": 0.0,
    "monto_iva": 340.31,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 3176.22,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 215,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 3176.22,
        "subtotal": 3176.22
      }
    ]
  },
  {
    "id_compra": 202,
    "id_proveedor": 3,
    "nombre_proveedor": "TEMU",
    "nit_proveedor": "CF",
    "fecha": "2026-05-15",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "PO-084-12742681093751326",
    "monto_total": 1201.46,
    "monto_exento": 0.0,
    "monto_iva": 128.73,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1201.46,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 202,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1201.46,
        "subtotal": 1201.46
      }
    ]
  },
  {
    "id_compra": 201,
    "id_proveedor": 1,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-05-16",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "12345678",
    "monto_total": 17.1,
    "monto_exento": 0.0,
    "monto_iva": 1.83,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": -37.27,
    "saldo_pendiente": 54.37,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 201,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 17.1,
        "subtotal": 17.1
      }
    ]
  },
  {
    "id_compra": 200,
    "id_proveedor": 1,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-05-13",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1YA33W00NKX6",
    "monto_total": 3723.91,
    "monto_exento": 0.0,
    "monto_iva": 398.99,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 3723.91,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 200,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 3723.91,
        "subtotal": 3723.91
      }
    ]
  },
  {
    "id_compra": 199,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-04-30",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1Y333500MGWC",
    "monto_total": 1212.18,
    "monto_exento": 0.0,
    "monto_iva": 129.88,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1212.18,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 199,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1212.18,
        "subtotal": 1212.18
      }
    ]
  },
  {
    "id_compra": 198,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-04-27",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1YU335000QPF",
    "monto_total": 1650.8,
    "monto_exento": 0.0,
    "monto_iva": 176.87,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1650.8,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 198,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1650.8,
        "subtotal": 1650.8
      }
    ]
  },
  {
    "id_compra": 197,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-04-26",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1Y2335000TYH",
    "monto_total": 839.45,
    "monto_exento": 0.0,
    "monto_iva": 89.94,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 839.45,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 197,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 839.45,
        "subtotal": 839.45
      }
    ]
  },
  {
    "id_compra": 196,
    "id_proveedor": 1,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-04-26",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1Y233C001WML",
    "monto_total": 757.12,
    "monto_exento": 0.0,
    "monto_iva": 81.12,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 757.12,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 196,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 757.12,
        "subtotal": 757.12
      }
    ]
  },
  {
    "id_compra": 195,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-04-26",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1Y233M000WLF",
    "monto_total": 1446.57,
    "monto_exento": 0.0,
    "monto_iva": 154.99,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1446.57,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 195,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1446.57,
        "subtotal": 1446.57
      }
    ]
  },
  {
    "id_compra": 194,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-04-11",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1XB332001Y1M",
    "monto_total": 3080.31,
    "monto_exento": 0.0,
    "monto_iva": 330.03,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 3080.31,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 194,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 3080.31,
        "subtotal": 3080.31
      }
    ]
  },
  {
    "id_compra": 193,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-04-16",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1XH33300NG1M",
    "monto_total": 2439.55,
    "monto_exento": 0.0,
    "monto_iva": 261.38,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2439.55,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 193,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2439.55,
        "subtotal": 2439.55
      }
    ]
  },
  {
    "id_compra": 192,
    "id_proveedor": 1,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-05-05",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "123456789",
    "monto_total": 232.3,
    "monto_exento": 0.0,
    "monto_iva": 24.89,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 208.46,
    "saldo_pendiente": 23.84,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 192,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 232.3,
        "subtotal": 232.3
      }
    ]
  },
  {
    "id_compra": 191,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-04-02",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1X63350016DH",
    "monto_total": 2408.02,
    "monto_exento": 0.0,
    "monto_iva": 258.0,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2408.02,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 191,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2408.02,
        "subtotal": 2408.02
      }
    ]
  },
  {
    "id_compra": 190,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-03-27",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1XC33B001D71",
    "monto_total": 1492.83,
    "monto_exento": 0.0,
    "monto_iva": 159.95,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1492.83,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 190,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1492.83,
        "subtotal": 1492.83
      }
    ]
  },
  {
    "id_compra": 189,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-03-26",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH1XU33F00MK09",
    "monto_total": 2072.94,
    "monto_exento": 0.0,
    "monto_iva": 222.1,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2072.94,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 189,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2072.94,
        "subtotal": 2072.94
      }
    ]
  },
  {
    "id_compra": 188,
    "id_proveedor": 11,
    "nombre_proveedor": "LOURDES",
    "nit_proveedor": "CF",
    "fecha": "2026-04-25",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "12345678",
    "monto_total": 430.0,
    "monto_exento": 0.0,
    "monto_iva": 46.07,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 430.0,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 188,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 430.0,
        "subtotal": 430.0
      }
    ]
  },
  {
    "id_compra": 187,
    "id_proveedor": 11,
    "nombre_proveedor": "LOURDES",
    "nit_proveedor": "CF",
    "fecha": "2026-04-24",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "12345678",
    "monto_total": 400.0,
    "monto_exento": 0.0,
    "monto_iva": 42.86,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 400.0,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 187,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 400.0,
        "subtotal": 400.0
      }
    ]
  },
  {
    "id_compra": 186,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-03-15",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH16J33600NH86",
    "monto_total": 1701.35,
    "monto_exento": 0.0,
    "monto_iva": 182.29,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1701.35,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 186,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1701.35,
        "subtotal": 1701.35
      }
    ]
  },
  {
    "id_compra": 185,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-03-12",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH16L336000JJ9",
    "monto_total": 2442.34,
    "monto_exento": 0.0,
    "monto_iva": 261.68,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2442.34,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 185,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2442.34,
        "subtotal": 2442.34
      }
    ]
  },
  {
    "id_compra": 184,
    "id_proveedor": 1,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-03-11",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH16F33F000YXW",
    "monto_total": 2788.67,
    "monto_exento": 0.0,
    "monto_iva": 298.79,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2788.67,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 184,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2788.67,
        "subtotal": 2788.67
      }
    ]
  },
  {
    "id_compra": 183,
    "id_proveedor": 1,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-03-03",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH167335002QYA",
    "monto_total": 1970.42,
    "monto_exento": 0.0,
    "monto_iva": 211.12,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1970.42,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 183,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1970.42,
        "subtotal": 1970.42
      }
    ]
  },
  {
    "id_compra": 181,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-03-02",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH16Y33000184C",
    "monto_total": 1641.4,
    "monto_exento": 0.0,
    "monto_iva": 175.86,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1641.4,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 181,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1641.4,
        "subtotal": 1641.4
      }
    ]
  },
  {
    "id_compra": 180,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-02-25",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH16Q33600M6L2",
    "monto_total": 2063.1,
    "monto_exento": 0.0,
    "monto_iva": 221.05,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2063.1,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 180,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2063.1,
        "subtotal": 2063.1
      }
    ]
  },
  {
    "id_compra": 178,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-02-16",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH16M3360011LC",
    "monto_total": 1661.15,
    "monto_exento": 0.0,
    "monto_iva": 177.98,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1661.15,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 178,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1661.15,
        "subtotal": 1661.15
      }
    ]
  },
  {
    "id_compra": 177,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-02-12",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH15D335000SH9",
    "monto_total": 2913.28,
    "monto_exento": 0.0,
    "monto_iva": 312.14,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2913.28,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 177,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2913.28,
        "subtotal": 2913.28
      }
    ]
  },
  {
    "id_compra": 176,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-02-12",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH15D335000SMG",
    "monto_total": 2318.38,
    "monto_exento": 0.0,
    "monto_iva": 248.4,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2318.38,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 176,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2318.38,
        "subtotal": 2318.38
      }
    ]
  },
  {
    "id_compra": 175,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-01-27",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH15X3350011J7",
    "monto_total": 2153.96,
    "monto_exento": 0.0,
    "monto_iva": 230.78,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2153.96,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 175,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2153.96,
        "subtotal": 2153.96
      }
    ]
  },
  {
    "id_compra": 173,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-01-26",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "GSH15633100NJHW",
    "monto_total": 2020.68,
    "monto_exento": 0.0,
    "monto_iva": 216.5,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 2020.68,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 173,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 2020.68,
        "subtotal": 2020.68
      }
    ]
  },
  {
    "id_compra": 168,
    "id_proveedor": 6,
    "nombre_proveedor": "Oriental City",
    "nit_proveedor": "CF",
    "fecha": "2026-01-30",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "4089505",
    "monto_total": 287.0,
    "monto_exento": 0.0,
    "monto_iva": 30.75,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 287.0,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 168,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 287.0,
        "subtotal": 287.0
      }
    ]
  },
  {
    "id_compra": 167,
    "id_proveedor": 3,
    "nombre_proveedor": "TEMU",
    "nit_proveedor": "CF",
    "fecha": "2026-01-18",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "s",
    "monto_total": 560.8,
    "monto_exento": 0.0,
    "monto_iva": 60.09,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 560.8,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 167,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 560.8,
        "subtotal": 560.8
      }
    ]
  },
  {
    "id_compra": 164,
    "id_proveedor": 6,
    "nombre_proveedor": "Oriental City",
    "nit_proveedor": "CF",
    "fecha": "2026-01-16",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "32045",
    "monto_total": 805.5,
    "monto_exento": 0.0,
    "monto_iva": 86.3,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "contado",
    "total_pagado": 805.5,
    "saldo_pendiente": 0.0,
    "estado_pago": "pagado",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 164,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 805.5,
        "subtotal": 805.5
      }
    ]
  },
  {
    "id_compra": 161,
    "id_proveedor": 3,
    "nombre_proveedor": "TEMU",
    "nit_proveedor": "CF",
    "fecha": "2026-01-15",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "PO-084-09416831765111326",
    "monto_total": 1692.32,
    "monto_exento": 0.0,
    "monto_iva": 181.32,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 1692.32,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 161,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 1692.32,
        "subtotal": 1692.32
      }
    ]
  },
  {
    "id_compra": 159,
    "id_proveedor": 2,
    "nombre_proveedor": "SHEIN",
    "nit_proveedor": "CF",
    "fecha": "2026-01-12",
    "tipo_documento": "Factura Electrónica FEL",
    "serie": "COM-01",
    "numero_documento": "INVMX20260112112000108927",
    "monto_total": 3839.92,
    "monto_exento": 0.0,
    "monto_iva": 411.42,
    "descripcion": "Compra de mercadería para stock",
    "tipo_compra": "credito",
    "total_pagado": 0.0,
    "saldo_pendiente": 3839.92,
    "estado_pago": "pendiente",
    "moneda_compra": "GTQ",
    "tipo_cambio": 1.0,
    "detalles": [
      {
        "id": 159,
        "descripcion": "Mercadería para Inventario",
        "cantidad": 1,
        "precio_unitario": 3839.92,
        "subtotal": 3839.92
      }
    ]
  }
];
