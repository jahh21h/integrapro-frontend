import React, { createContext, useContext, useState, useEffect } from 'react';
import { LiveCustomerBag, LiveSession, LiveCartItem } from '../types';
import { useLanguage, getCurrentLang, tLang, getAppLocale } from './LanguageContext';

export interface BoutiqueLivePolicy {
  tipo: 'quincenal' | '24_horas' | 'horas' | 'dias';
  horas?: number;
  dias?: number;
  horaLimite?: string;
  vende_shein?: boolean;
}

export function getLiveDueDate(
  createdDateStr: string = new Date().toISOString(),
  policy?: BoutiqueLivePolicy,
  customDueDateStr?: string
): {
  dueDate: Date;
  formattedDate: string;
  daysRemaining: number;
  isExpired: boolean;
  cycleName: string;
} {
  let dueDate: Date;
  let cycleName: string;

  if (customDueDateStr) {
    dueDate = new Date(customDueDateStr);
    cycleName = tLang('Plazo Ajustado', 'Custom Deadline');
  } else if (policy?.tipo === '24_horas') {
    const created = new Date(createdDateStr);
    dueDate = new Date(created.getTime() + 24 * 60 * 60 * 1000);
    cycleName = tLang('Plazo 24 Horas', '24-Hour Window');
  } else if (policy?.tipo === 'horas') {
    const created = new Date(createdDateStr);
    const h = policy.horas && policy.horas > 0 ? policy.horas : 24;
    dueDate = new Date(created.getTime() + h * 60 * 60 * 1000);
    cycleName = tLang(`Plazo ${h} Horas`, `${h}-Hour Window`);
  } else if (policy?.tipo === 'dias') {
    const created = new Date(createdDateStr);
    const d = policy.dias && policy.dias > 0 ? policy.dias : 2;
    dueDate = new Date(created.getTime() + d * 24 * 60 * 60 * 1000);
    cycleName = tLang(`Plazo ${d} Días`, `${d}-Day Window`);
  } else {
    // Por defecto: Quincenal y Fin de Mes (+5 días de gracia)
    const created = new Date(createdDateStr);
    const year = created.getFullYear();
    const month = created.getMonth();
    const day = created.getDate();

    if (day <= 15) {
      dueDate = new Date(year, month, 20, 23, 59, 59);
      cycleName = tLang('Corte Quincena (Día 20)', 'Mid-Month Cutoff (Day 20)');
    } else {
      dueDate = new Date(year, month + 1, 5, 23, 59, 59);
      cycleName = tLang('Corte Fin de Mes (Día 5)', 'End-of-Month Cutoff (Day 5)');
    }
  }

  const now = new Date();
  const diffTime = dueDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isExpired = diffTime < 0;

  const lang = getCurrentLang();
  const monthNamesEs = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isShortTime = policy?.tipo === '24_horas' || policy?.tipo === 'horas';
  const hoursStr = dueDate.toLocaleTimeString(getAppLocale(lang), { hour: '2-digit', minute: '2-digit', hour12: true });
  const datePart = lang === 'en'
    ? `${monthNamesEn[dueDate.getMonth()]} ${dueDate.getDate()}`
    : `${dueDate.getDate()} de ${monthNamesEs[dueDate.getMonth()]}`;
  const formattedDate = isShortTime ? `${datePart} (${hoursStr})` : datePart;

  return { dueDate, formattedDate, daysRemaining, isExpired, cycleName };
}

interface LiveSalesContextType {
  isLiveActive: boolean;
  currentSession: LiveSession | null;
  bags: LiveCustomerBag[];
  startLiveSession: (titulo: string, empresaId: number) => void;
  endLiveSession: () => void;
  createBag: (
    cliente_nombre: string,
    usuario_tiktok: string,
    telefono_whatsapp: string,
    direccion_envio?: string,
    empresa_id?: number
  ) => LiveCustomerBag;
  addItemToBag: (
    bagId: string,
    product: { id: number; nombre: string; sku: string; precioVenta: number; imagen?: string },
    overridePrice?: number,
    talla?: string,
    color?: string
  ) => void;
  updateItemPrice: (bagId: string, itemId: string, newPrice: number) => void;
  removeItemFromBag: (bagId: string, itemId: string) => void;
  updateShippingCost: (bagId: string, cost: number, courier?: 'Guatex' | 'Forza Delivery' | 'Cargo Expreso' | 'Mensajero Local' | 'Recoge en Tienda' | 'Entrega Personal / Cercana') => void;
  updateShippingOptions: (bagId: string, incluyeEnvio: boolean, cost: number, courier?: any) => void;
  updateSheinUnification: (bagId: string, unificada: boolean, montoShein?: number, descripcion?: string) => void;
  updateBagDueDate: (bagId: string, newDueDate: string) => void;
  releaseExpiredBagsToStock: (policy?: BoutiqueLivePolicy) => number;
  updateBagStatus: (
    bagId: string,
    status: LiveCustomerBag['estado'],
    metodo_pago?: LiveCustomerBag['metodo_pago'],
    boleta?: string
  ) => void;
  cancelBag: (bagId: string) => void;
  deleteBag: (bagId: string) => void;
  findOpenBagByCustomer: (query: string, empresaId: number) => LiveCustomerBag | undefined;
  sendWhatsAppSummary: (bag: LiveCustomerBag) => void;
  getStockReservationCount: (productId: number, empresaId?: number) => number;
}

const LiveSalesContext = createContext<LiveSalesContextType | undefined>(undefined);

const DEFAULT_SESSION: LiveSession = {
  id: 'LIVE-SES-101',
  titulo: 'TikTok Live - Colección Moda & Remates',
  empresa_id: 1, // Fashion Styles
  iniciado_en: new Date().toISOString(),
  activa: true,
  total_canastas: 3,
  total_recaudado: 745.00,
  prendas_apartadas: 5
};

const DEFAULT_BAGS: LiveCustomerBag[] = [
  {
    id: 'BAG-001',
    cliente_nombre: 'Marielos Sandoval',
    usuario_tiktok: '@marielos_gt',
    telefono_whatsapp: '50255443322',
    direccion_envio: 'Colonia Las Charcas Zona 11, Ciudad de Guatemala',
    empresa_id: 1,
    items: [
      {
        id: 'ITEM-1',
        producto_id: 101,
        nombre: 'Blusa Satín Manga Larga Rosa Pastel',
        sku: 'BLU-SAT-01',
        imagen: 'https://images.unsplash.com/photo-1564257631407-4deb12c10493?w=400&auto=format&fit=crop&q=80',
        precio_original: 135.00,
        precio_final: 135.00,
        descuento: 0,
        es_remate: false,
        talla: 'M',
        color: 'Rosa Pastel',
        cantidad: 1,
        apartado_en: new Date(Date.now() - 35 * 60 * 1000).toISOString()
      },
      {
        id: 'ITEM-2',
        producto_id: 102,
        nombre: 'Vestido Midi Casual Floreado',
        sku: 'VES-MID-02',
        imagen: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&auto=format&fit=crop&q=80',
        precio_original: 195.00,
        precio_final: 150.00, // Remate en vivo
        descuento: 45.00,
        es_remate: true,
        talla: 'S',
        color: 'Negro Floral',
        cantidad: 1,
        apartado_en: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      }
    ],
    subtotal: 285.00,
    costo_envio: 35.00,
    total: 320.00,
    estado: 'abierta',
    metodo_pago: 'transferencia',
    empresa_envio: 'Guatex',
    notas: 'Solicitó agregar accesorio si sale en el Live',
    creado_en: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    actualizado_en: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: 'BAG-002',
    cliente_nombre: 'Karla Morales',
    usuario_tiktok: '@karla_moda',
    telefono_whatsapp: '50244332211',
    direccion_envio: 'Km 14.5 Carretera a El Salvador, Puerta Parada',
    empresa_id: 1,
    items: [
      {
        id: 'ITEM-3',
        producto_id: 103,
        nombre: 'Pantalón Palazo Cintura Alta Beige',
        sku: 'PAN-PAL-03',
        imagen: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&auto=format&fit=crop&q=80',
        precio_original: 175.00,
        precio_final: 175.00,
        descuento: 0,
        es_remate: false,
        talla: 'L',
        color: 'Beige',
        cantidad: 1,
        apartado_en: new Date(Date.now() - 25 * 60 * 1000).toISOString()
      }
    ],
    subtotal: 175.00,
    costo_envio: 35.00,
    total: 210.00,
    estado: 'pendiente_pago',
    metodo_pago: 'transferencia',
    empresa_envio: 'Forza Delivery',
    notas: 'Esperando boleta de Banco Industrial',
    creado_en: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    actualizado_en: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: 'BAG-003',
    cliente_nombre: 'Sofia Hernández',
    usuario_tiktok: '@sofi_outfits',
    telefono_whatsapp: '50259887766',
    direccion_envio: 'Zona 1, Quetzaltenango',
    empresa_id: 1,
    items: [
      {
        id: 'ITEM-4',
        producto_id: 104,
        nombre: 'Chaqueta Denim Oversized Desgastada',
        sku: 'CHQ-DEN-04',
        imagen: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&auto=format&fit=crop&q=80',
        precio_original: 245.00,
        precio_final: 180.00, // Remate relámpago
        descuento: 65.00,
        es_remate: true,
        talla: 'M',
        color: 'Azul Claro',
        cantidad: 1,
        apartado_en: new Date(Date.now() - 10 * 60 * 1000).toISOString()
      }
    ],
    subtotal: 180.00,
    costo_envio: 35.00,
    total: 215.00,
    estado: 'despachada',
    metodo_pago: 'contra_entrega',
    empresa_envio: 'Cargo Expreso',
    notas: 'Pago contra entrega en Quetzaltenango',
    creado_en: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    actualizado_en: new Date(Date.now() - 2 * 60 * 1000).toISOString()
  }
];

export const LiveSalesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { L, isEn, locale, money } = useLanguage();
  const [currentSession, setCurrentSession] = useState<LiveSession | null>(() => {
    const saved = localStorage.getItem('integrapro_live_session');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return DEFAULT_SESSION;
  });

  const [bags, setBags] = useState<LiveCustomerBag[]>(() => {
    const saved = localStorage.getItem('integrapro_live_bags');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return DEFAULT_BAGS;
  });

  // Guardar cambios en LocalStorage
  useEffect(() => {
    if (currentSession) {
      localStorage.setItem('integrapro_live_session', JSON.stringify(currentSession));
    } else {
      localStorage.removeItem('integrapro_live_session');
    }
  }, [currentSession]);

  useEffect(() => {
    localStorage.setItem('integrapro_live_bags', JSON.stringify(bags));
    
    // Sincronizar reservas de inventario para que el stock se descuente en el POS y en Inventario
    const reservations: Record<number, number> = {};
    bags
      .filter(b => b.estado === 'abierta' || b.estado === 'pendiente_pago' || b.estado === 'despachada')
      .forEach(b => {
        b.items.forEach(it => {
          reservations[it.producto_id] = (reservations[it.producto_id] || 0) + it.cantidad;
        });
      });
    localStorage.setItem('integrapro_live_stock_reservations', JSON.stringify(reservations));
  }, [bags]);

  const isLiveActive = Boolean(currentSession?.activa);

  const startLiveSession = (titulo: string, empresaId: number) => {
    const newSession: LiveSession = {
      id: 'LIVE-' + Date.now().toString().slice(-6),
      titulo: titulo || 'TikTok Live ' + new Date().toLocaleDateString(locale),
      empresa_id: empresaId,
      iniciado_en: new Date().toISOString(),
      activa: true,
      total_canastas: 0,
      total_recaudado: 0,
      prendas_apartadas: 0
    };
    setCurrentSession(newSession);
  };

  const endLiveSession = () => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        activa: false,
        finalizado_en: new Date().toISOString()
      });
    }
  };

  const createBag = (
    cliente_nombre: string,
    usuario_tiktok: string,
    telefono_whatsapp: string,
    direccion_envio?: string,
    empresa_id: number = 1
  ): LiveCustomerBag => {
    let policy: BoutiqueLivePolicy | undefined;
    try {
      const raw = localStorage.getItem('integrapro_boutique_config_' + empresa_id);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.live_policy) policy = parsed.live_policy;
      }
    } catch {}

    const newBag: LiveCustomerBag = {
      id: 'BAG-' + Date.now().toString().slice(-5),
      cliente_nombre: cliente_nombre.trim(),
      usuario_tiktok: usuario_tiktok.trim().startsWith('@') ? usuario_tiktok.trim() : '@' + usuario_tiktok.trim(),
      telefono_whatsapp: telefono_whatsapp.replace(/\D/g, ''),
      direccion_envio: direccion_envio || '',
      empresa_id,
      items: [],
      subtotal: 0,
      incluye_envio: true,
      costo_envio: 35.00, // Envío estándar Guatex
      total: 35.00,
      es_unificada_shein: false,
      monto_shein: 0,
      descripcion_shein: '',
      fecha_vencimiento: getLiveDueDate(new Date().toISOString(), policy).dueDate.toISOString(),
      estado: 'abierta',
      metodo_pago: 'transferencia',
      empresa_envio: 'Guatex',
      creado_en: new Date().toISOString(),
      actualizado_en: new Date().toISOString()
    };

    setBags(prev => [newBag, ...prev]);

    // Actualizar métricas de sesión
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, total_canastas: prev.total_canastas + 1 } : null);
    }

    return newBag;
  };

  // Descuento inmediato de stock al agregar prenda a la canasta
  const addItemToBag = (
    bagId: string,
    product: { id: number; nombre: string; sku: string; precioVenta: number; imagen?: string },
    overridePrice?: number,
    talla?: string,
    color?: string
  ) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;

      const precioOriginal = product.precioVenta;
      const precioFinal = overridePrice !== undefined ? overridePrice : precioOriginal;
      const descuento = Math.max(0, precioOriginal - precioFinal);
      const esRemate = precioFinal < precioOriginal;

      const newItem: LiveCartItem = {
        id: 'ITEM-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 100),
        producto_id: product.id,
        nombre: product.nombre,
        sku: product.sku,
        imagen: product.imagen,
        precio_original: precioOriginal,
        precio_final: precioFinal,
        descuento,
        es_remate: esRemate,
        talla: talla || L('Estándar', 'Standard'),
        color: color || '',
        cantidad: 1,
        apartado_en: new Date().toISOString()
      };

      const updatedItems = [...bag.items, newItem];
      const subtotal = updatedItems.reduce((acc, it) => acc + (it.precio_final * it.cantidad), 0);
      const shippingCost = bag.incluye_envio !== false ? bag.costo_envio : 0;
      const sheinMonto = (bag.es_unificada_shein && bag.monto_shein) ? Number(bag.monto_shein) : 0;
      const total = subtotal + shippingCost + sheinMonto;

      return {
        ...bag,
        items: updatedItems,
        subtotal,
        total,
        actualizado_en: new Date().toISOString()
      };
    }));

    if (currentSession) {
      setCurrentSession(prev => prev ? {
        ...prev,
        prendas_apartadas: prev.prendas_apartadas + 1,
        total_recaudado: prev.total_recaudado + (overridePrice !== undefined ? overridePrice : product.precioVenta)
      } : null);
    }
  };

  // Modificar precio de remate al vuelo durante la transmisión
  const updateItemPrice = (bagId: string, itemId: string, newPrice: number) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;

      const updatedItems = bag.items.map(it => {
        if (it.id !== itemId) return it;
        const descuento = Math.max(0, it.precio_original - newPrice);
        return {
          ...it,
          precio_final: newPrice,
          descuento,
          es_remate: newPrice < it.precio_original
        };
      });

      const subtotal = updatedItems.reduce((acc, it) => acc + (it.precio_final * it.cantidad), 0);
      const shippingCost = bag.incluye_envio !== false ? bag.costo_envio : 0;
      const sheinMonto = (bag.es_unificada_shein && bag.monto_shein) ? Number(bag.monto_shein) : 0;
      const total = subtotal + shippingCost + sheinMonto;

      return {
        ...bag,
        items: updatedItems,
        subtotal,
        total,
        actualizado_en: new Date().toISOString()
      };
    }));
  };

  // Quitar prenda de la canasta (devuelve stock de inmediato)
  const removeItemFromBag = (bagId: string, itemId: string) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;

      const updatedItems = bag.items.filter(it => it.id !== itemId);
      const subtotal = updatedItems.reduce((acc, it) => acc + (it.precio_final * it.cantidad), 0);
      const shippingCost = (updatedItems.length > 0 && bag.incluye_envio !== false) ? bag.costo_envio : 0;
      const sheinMonto = (bag.es_unificada_shein && bag.monto_shein) ? Number(bag.monto_shein) : 0;
      const total = subtotal + shippingCost + sheinMonto;

      return {
        ...bag,
        items: updatedItems,
        subtotal,
        total,
        actualizado_en: new Date().toISOString()
      };
    }));
  };

  const updateShippingCost = (
    bagId: string,
    cost: number,
    courier?: 'Guatex' | 'Forza Delivery' | 'Cargo Expreso' | 'Mensajero Local' | 'Recoge en Tienda' | 'Entrega Personal / Cercana'
  ) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;
      const incluyeEnvio = cost > 0;
      const sheinMonto = (bag.es_unificada_shein && bag.monto_shein) ? Number(bag.monto_shein) : 0;
      const total = bag.subtotal + cost + sheinMonto;
      return {
        ...bag,
        costo_envio: cost,
        incluye_envio: incluyeEnvio,
        empresa_envio: courier || bag.empresa_envio,
        total,
        actualizado_en: new Date().toISOString()
      };
    }));
  };

  // Actualizar si incluye o no envío (para entregas personales/vecinas a Q 0.00)
  const updateShippingOptions = (
    bagId: string,
    incluyeEnvio: boolean,
    cost: number,
    courier?: any
  ) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;
      const actualCost = incluyeEnvio ? (cost > 0 ? cost : 35.00) : 0;
      const sheinMonto = (bag.es_unificada_shein && bag.monto_shein) ? Number(bag.monto_shein) : 0;
      const total = bag.subtotal + actualCost + sheinMonto;
      return {
        ...bag,
        incluye_envio: incluyeEnvio,
        costo_envio: actualCost,
        empresa_envio: incluyeEnvio ? (courier || bag.empresa_envio || 'Guatex') : 'Entrega Personal / Cercana',
        total,
        actualizado_en: new Date().toISOString()
      };
    }));
  };

  // Unificar con pedido SHEIN
  const updateSheinUnification = (
    bagId: string,
    unificada: boolean,
    montoShein?: number,
    descripcion?: string
  ) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;
      const shippingCost = bag.incluye_envio !== false ? bag.costo_envio : 0;
      const shein = unificada ? (Number(montoShein) || 0) : 0;
      const total = bag.subtotal + shippingCost + shein;
      return {
        ...bag,
        es_unificada_shein: unificada,
        monto_shein: shein,
        descripcion_shein: descripcion !== undefined ? descripcion : bag.descripcion_shein,
        total,
        actualizado_en: new Date().toISOString()
      };
    }));
  };

  // Ajustar fecha límite de una canasta específica (excepción o prórroga)
  const updateBagDueDate = (bagId: string, newDueDate: string) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;
      return {
        ...bag,
        fecha_vencimiento: newDueDate,
        actualizado_en: new Date().toISOString()
      };
    }));
  };

  // Libera todas las canastas vencidas devolviendo el stock inmediatamente a inventario
  const releaseExpiredBagsToStock = (policy?: BoutiqueLivePolicy): number => {
    let releasedCount = 0;
    setBags(prev => prev.map(bag => {
      if (bag.estado === 'abierta' || bag.estado === 'pendiente_pago') {
        const { isExpired } = getLiveDueDate(bag.creado_en, policy, bag.fecha_vencimiento);
        if (isExpired && bag.items.length > 0) {
          releasedCount++;
          return {
            ...bag,
            estado: 'cancelada',
            items: [], // vacía las prendas para liberar el stock de inmediato
            subtotal: 0,
            total: 0,
            notas: (bag.notas ? bag.notas + ' | ' : '') + L('Vencida - Prendas devueltas al stock por corte de quincena/mes.', 'Expired - Items returned to stock due to billing cutoff.'),
            actualizado_en: new Date().toISOString()
          };
        }
      }
      return bag;
    }));
    return releasedCount;
  };

  const updateBagStatus = (
    bagId: string,
    status: LiveCustomerBag['estado'],
    metodo_pago?: LiveCustomerBag['metodo_pago'],
    boleta?: string
  ) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;
      return {
        ...bag,
        estado: status,
        metodo_pago: metodo_pago || bag.metodo_pago,
        boleta_comprobante: boleta || bag.boleta_comprobante,
        actualizado_en: new Date().toISOString()
      };
    }));
  };

  // BOTÓN SALVAVIDAS: Cancela canasta y devuelve inmediatamente todas las prendas a inventario disponible
  const cancelBag = (bagId: string) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;
      return {
        ...bag,
        estado: 'cancelada',
        items: [], // Vaciamos para que el stock se libere de inmediato
        subtotal: 0,
        total: 0,
        notas: (bag.notas ? bag.notas + ' | ' : '') + L('Canasta cancelada - Prendas devueltas al inventario.', 'Bag canceled - Items returned to inventory.'),
        actualizado_en: new Date().toISOString()
      };
    }));
  };

  // ELIMINAR CANASTA DEFINITIVAMENTE: Remueve la canasta de la sesión y libera stock
  const deleteBag = (bagId: string) => {
    setBags(prev => prev.filter(bag => bag.id !== bagId));
  };

  // Buscar canasta abierta para unificar con el Punto de Venta (POS)
  const findOpenBagByCustomer = (query: string, empresaId: number): LiveCustomerBag | undefined => {
    if (!query) return undefined;
    const cleanQuery = query.toLowerCase().replace(/\s+/g, '');
    return bags.find(b => 
      b.empresa_id === empresaId &&
      (b.estado === 'abierta' || b.estado === 'pendiente_pago') &&
      (
        b.cliente_nombre.toLowerCase().replace(/\s+/g, '').includes(cleanQuery) ||
        b.usuario_tiktok?.toLowerCase().replace(/\s+/g, '').includes(cleanQuery) ||
        b.telefono_whatsapp.includes(cleanQuery)
      )
    );
  };

  // Generador de Resumen Automático para enviar por WhatsApp
  const sendWhatsAppSummary = (bag: LiveCustomerBag) => {
    const phone = bag.telefono_whatsapp.startsWith('502') ? bag.telefono_whatsapp : '502' + bag.telefono_whatsapp;
    
    // Obtener configuración de tienda personalizada (cuentas bancarias, nombre de boutique) si fue guardada
    let boutiqueConfig: any = null;
    try {
      const raw = localStorage.getItem('integrapro_boutique_config_' + (bag.empresa_id || 1));
      if (raw) boutiqueConfig = JSON.parse(raw);
    } catch {}

    const storeName = boutiqueConfig?.nombre || (bag.empresa_id === 99 ? 'Boutique Chic Live' : bag.empresa_id === 1 ? 'Fashion Styles' : L('Mi Tienda', 'My Store'));
    const biAcc = boutiqueConfig?.bi_cuenta || '025-014829-1';
    const biHolder = boutiqueConfig?.bi_titular || storeName;
    const banruralAcc = boutiqueConfig?.banrural_cuenta || '3402-09812-4';
    const banruralHolder = boutiqueConfig?.banrural_titular || storeName;
    const bacAcc = boutiqueConfig?.bac_cuenta || '90-128472-0';
    const bacHolder = boutiqueConfig?.bac_titular || storeName;

    const policy = boutiqueConfig?.live_policy as BoutiqueLivePolicy | undefined;
    const dueDate = getLiveDueDate(bag.creado_en, policy, bag.fecha_vencimiento);
    const esUnificada = Boolean(bag.es_unificada_shein && (bag.monto_shein || 0) > 0);
    const incluyeEnvio = bag.incluye_envio !== false && bag.costo_envio > 0;
    const courierDisplay = !bag.empresa_envio
      ? L('Guatex / Mensajería', 'Courier / Shipping')
      : isEn
        ? (bag.empresa_envio === 'Mensajero Local'
            ? 'Local Courier'
            : bag.empresa_envio === 'Recoge en Tienda'
              ? 'Store Pickup'
              : bag.empresa_envio === 'Entrega Personal / Cercana'
                ? 'Local / Personal Delivery'
                : bag.empresa_envio)
        : bag.empresa_envio;

    let message = L(
      `*🌸 ¡HOLA ${bag.cliente_nombre.toUpperCase()}! GRACIAS POR TUS COMPRAS EN ${storeName.toUpperCase()} 🛍️*\n\n`,
      `*🌸 HI ${bag.cliente_nombre.toUpperCase()}! THANK YOU FOR SHOPPING AT ${storeName.toUpperCase()} 🛍️*\n\n`
    );

    if (esUnificada) {
      message += L(
        `Te compartimos tu *CUENTA UNIFICADA DE ENTREGA CONJUNTA (SHEIN + TIKTOK LIVE)*:\n`,
        `Here is your *COMBINED DELIVERY STATEMENT (SHEIN + TIKTOK LIVE)*:\n`
      );
      message += `━━━━━━━━━━━━━━━━━━━━━\n`;
      message += L(`📦 *1. PEDIDO SHEIN:*\n`, `📦 *1. SHEIN ORDER:*\n`);
      message += L(
        `   • Saldo / Total: *${money(bag.monto_shein || 0)}*\n`,
        `   • Balance / Total: *${money(bag.monto_shein || 0)}*\n`
      );
      if (bag.descripcion_shein) {
        message += `   • ${L('Detalle', 'Details')}: ${bag.descripcion_shein}\n`;
      }
      message += `\n`;
      message += L(
        `👗 *2. PRENDAS GANADAS EN TIKTOK LIVE (${bag.items.length} piezas):*\n`,
        `👗 *2. TIKTOK LIVE ITEMS WON (${bag.items.length} pcs):*\n`
      );
    } else {
      message += L(
        `Te compartimos el detalle oficial de tu canasta del *TIKTOK LIVE*:\n`,
        `Here is the official summary of your *TIKTOK LIVE* shopping bag:\n`
      );
      message += `━━━━━━━━━━━━━━━━━━━━━\n`;
      message += L(
        `👗 *PRENDAS GANADAS EN EL LIVE (${bag.items.length} piezas):*\n`,
        `👗 *ITEMS WON ON LIVE (${bag.items.length} pcs):*\n`
      );
    }

    bag.items.forEach((it, idx) => {
      message += `${idx + 1}. *${it.nombre}*\n`;
      if (it.talla) message += `   • ${L('Talla', 'Size')}: ${it.talla} ${it.color ? '• Color: ' + it.color : ''}\n`;
      if (it.es_remate) {
        message += `   • ${L('Precio Normal', 'Regular Price')}: ~${money(it.precio_original)}~\n`;
        message += L(
          `   • *🔥 PRECIO REMATE: ${money(it.precio_final)}* (¡Ahorraste ${money(it.descuento)}!)\n`,
          `   • *🔥 FLASH DEAL: ${money(it.precio_final)}* (You saved ${money(it.descuento)}!)\n`
        );
      } else {
        message += `   • ${L('Precio', 'Price')}: ${money(it.precio_final)}\n`;
      }
      message += `\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    if (esUnificada) {
      message += `*${L('Subtotal Pedido SHEIN', 'SHEIN Order Subtotal')}:* ${money(bag.monto_shein || 0)}\n`;
      message += `*${L('Subtotal Prendas Live', 'Live Items Subtotal')}:* ${money(bag.subtotal)}\n`;
    } else {
      message += `*${L('Subtotal Prendas', 'Items Subtotal')}:* ${money(bag.subtotal)}\n`;
    }

    if (incluyeEnvio) {
      message += `*${L('Envío', 'Shipping')} (${courierDisplay}):* ${money(bag.costo_envio)}\n`;
      if (esUnificada) {
        message += L(
          `✨ *(¡Todo se entrega en un solo paquete para que no pagues doble flete!)*\n`,
          `✨ *(Everything ships in a single package so you don't pay double shipping!)*\n`
        );
      }
    } else {
      message += L(
        `*Entrega:* *Entrega Personal / Sin Costo de Envío (¡${money(0)}!)* ✨\n`,
        `*Delivery:* *Personal / Local Delivery — Free Shipping (${money(0)}!)* ✨\n`
      );
    }

    message += `*💰 ${L('TOTAL A PAGAR', 'TOTAL DUE')}:* *${money(bag.total)}*\n`;
    const isMidMonth = dueDate.cycleName.includes('Quincena') || dueDate.cycleName.includes('Mid-Month');
    message += L(
      `📅 *Fecha Límite de Pago:* *${dueDate.formattedDate}* (Plazo de 5 días de ${isMidMonth ? 'quincena' : 'inicio de mes'})\n\n`,
      `📅 *Payment Due Date:* *${dueDate.formattedDate}* (5-day ${isMidMonth ? 'mid-month' : 'start-of-month'} window)\n\n`
    );

    if (bag.metodo_pago === 'contra_entrega') {
      message += L(
        `📍 *Método de Pago:* Contra Entrega (Pagas al recibir tu paquete).\n`,
        `📍 *Payment Method:* Cash on Delivery (Pay upon receiving your package).\n`
      );
      message += `🚚 *${L('Dirección de Entrega', 'Delivery Address')}:* ${bag.direccion_envio || L('Por confirmar', 'To be confirmed')}\n\n`;
      message += L(
        `¿Nos confirmas tu dirección para programar tu entrega conjunta? ✨`,
        `Could you please confirm your address so we can schedule your delivery? ✨`
      );
    } else {
      message += L(
        `💳 *Método de Pago:* Transferencia o Depósito Bancario.\n\n`,
        `💳 *Payment Method:* Bank Transfer or Deposit.\n\n`
      );
      message += L(`*Cuentas Monetarias Disponibles:*\n`, `*Available Bank Accounts:*\n`);
      message += `🏦 *Banco Industrial (BI):* ${biAcc} (${biHolder})\n`;
      message += `🏦 *BANRURAL:* ${banruralAcc} (${banruralHolder})\n`;
      message += `🏦 *BAC Credomatic:* ${bacAcc} (${bacHolder})\n\n`;
      message += L(
        `Por favor envíanos la foto de tu boleta o comprobante a este chat antes del *${dueDate.formattedDate}* para asegurar tu paquete. ¡Gracias por tu preferencia! 💖`,
        `Please send us a photo of your payment receipt in this chat before *${dueDate.formattedDate}* to secure your order. Thank you for your business! 💖`
      );
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`, '_blank');
  };

  const getStockReservationCount = (productId: number, empresaId?: number): number => {
    return bags
      .filter(b =>
        (empresaId === undefined || Number(b.empresa_id) === Number(empresaId)) &&
        (b.estado === 'abierta' || b.estado === 'pendiente_pago' || b.estado === 'despachada')
      )
      .reduce((acc, b) => {
        const matching = b.items.filter(it => it.producto_id === productId);
        return acc + matching.reduce((sub, it) => sub + it.cantidad, 0);
      }, 0);
  };

  return (
    <LiveSalesContext.Provider
      value={{
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
        updateShippingOptions,
        updateSheinUnification,
        updateBagDueDate,
        releaseExpiredBagsToStock,
        updateBagStatus,
        cancelBag,
        deleteBag,
        findOpenBagByCustomer,
        sendWhatsAppSummary,
        getStockReservationCount
      }}
    >
      {children}
    </LiveSalesContext.Provider>
  );
};

export const useLiveSales = () => {
  const context = useContext(LiveSalesContext);
  if (!context) {
    throw new Error('useLiveSales must be used within a LiveSalesProvider');
  }
  return context;
};
