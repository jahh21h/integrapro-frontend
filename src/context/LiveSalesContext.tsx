import React, { createContext, useContext, useState, useEffect } from 'react';
import { LiveCustomerBag, LiveSession, LiveCartItem } from '../types';

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
  updateShippingCost: (bagId: string, cost: number, courier?: 'Guatex' | 'Forza Delivery' | 'Cargo Expreso' | 'Mensajero Local' | 'Recoge en Tienda') => void;
  updateBagStatus: (
    bagId: string,
    status: LiveCustomerBag['estado'],
    metodo_pago?: LiveCustomerBag['metodo_pago'],
    boleta?: string
  ) => void;
  cancelBag: (bagId: string) => void;
  findOpenBagByCustomer: (query: string, empresaId: number) => LiveCustomerBag | undefined;
  sendWhatsAppSummary: (bag: LiveCustomerBag) => void;
  getStockReservationCount: (productId: number) => number;
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
      titulo: titulo || 'TikTok Live ' + new Date().toLocaleDateString('es-GT'),
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
    const newBag: LiveCustomerBag = {
      id: 'BAG-' + Date.now().toString().slice(-5),
      cliente_nombre: cliente_nombre.trim(),
      usuario_tiktok: usuario_tiktok.trim().startsWith('@') ? usuario_tiktok.trim() : '@' + usuario_tiktok.trim(),
      telefono_whatsapp: telefono_whatsapp.replace(/\D/g, ''),
      direccion_envio: direccion_envio || '',
      empresa_id,
      items: [],
      subtotal: 0,
      costo_envio: 35.00, // Envío estándar Guatex
      total: 35.00,
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
        talla: talla || 'Estándar',
        color: color || '',
        cantidad: 1,
        apartado_en: new Date().toISOString()
      };

      const updatedItems = [...bag.items, newItem];
      const subtotal = updatedItems.reduce((acc, it) => acc + (it.precio_final * it.cantidad), 0);
      const total = subtotal + bag.costo_envio;

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
      const total = subtotal + bag.costo_envio;

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
      const total = subtotal + (updatedItems.length > 0 ? bag.costo_envio : 0);

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
    courier?: 'Guatex' | 'Forza Delivery' | 'Cargo Expreso' | 'Mensajero Local' | 'Recoge en Tienda'
  ) => {
    setBags(prev => prev.map(bag => {
      if (bag.id !== bagId) return bag;
      const total = bag.subtotal + cost;
      return {
        ...bag,
        costo_envio: cost,
        empresa_envio: courier || bag.empresa_envio,
        total,
        actualizado_en: new Date().toISOString()
      };
    }));
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
        notas: (bag.notas ? bag.notas + ' | ' : '') + 'Canasta cancelada - Prendas devueltas al inventario.',
        actualizado_en: new Date().toISOString()
      };
    }));
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

    const storeName = boutiqueConfig?.nombre || (bag.empresa_id === 99 ? 'Boutique Chic Live' : 'Fashion Styles');
    const biAcc = boutiqueConfig?.bi_cuenta || '025-014829-1';
    const biHolder = boutiqueConfig?.bi_titular || storeName;
    const banruralAcc = boutiqueConfig?.banrural_cuenta || '3402-09812-4';
    const banruralHolder = boutiqueConfig?.banrural_titular || storeName;
    const bacAcc = boutiqueConfig?.bac_cuenta || '90-128472-0';
    const bacHolder = boutiqueConfig?.bac_titular || storeName;

    let message = `*🌸 ¡HOLA ${bag.cliente_nombre.toUpperCase()}! GRACIAS POR TUS COMPRAS EN ${storeName.toUpperCase()} 🛍️*\n\n`;
    message += `Te compartimos el detalle oficial y unificado de tu canasta:\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;

    bag.items.forEach((it, idx) => {
      message += `${idx + 1}. *${it.nombre}*\n`;
      if (it.talla) message += `   • Talla: ${it.talla} ${it.color ? '• Color: ' + it.color : ''}\n`;
      if (it.es_remate) {
        message += `   • Precio Normal: ~Q ${it.precio_original.toFixed(2)}~\n`;
        message += `   • *🔥 PRECIO REMATE LIVE: Q ${it.precio_final.toFixed(2)}* (¡Ahorraste Q ${it.descuento.toFixed(2)}!)\n`;
      } else {
        message += `   • Precio: Q ${it.precio_final.toFixed(2)}\n`;
      }
      message += `\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Subtotal Prendas:* Q ${bag.subtotal.toFixed(2)}\n`;
    message += `*Envío (${bag.empresa_envio || 'Guatex / Mensajería'}):* Q ${bag.costo_envio.toFixed(2)}\n`;
    message += `*💰 TOTAL A PAGAR:* *Q ${bag.total.toFixed(2)}*\n\n`;

    if (bag.metodo_pago === 'contra_entrega') {
      message += `📍 *Método de Pago:* Contra Entrega (Pagas en efectivo al recibir tu paquete).\n`;
      message += `🚚 *Dirección de Entrega:* ${bag.direccion_envio || 'Por confirmar'}\n\n`;
      message += `¿Nos confirmas tu dirección para empacar tu pedido hoy mismo? ✨`;
    } else {
      message += `💳 *Método de Pago:* Transferencia o Depósito Bancario.\n\n`;
      message += `*Cuentas Monetarias Disponibles:*\n`;
      message += `🏦 *Banco Industrial (BI):* ${biAcc} (${biHolder})\n`;
      message += `🏦 *BANRURAL:* ${banruralAcc} (${banruralHolder})\n`;
      message += `🏦 *BAC Credomatic:* ${bacAcc} (${bacHolder})\n\n`;
      message += `Por favor envíanos la foto de tu boleta o comprobante aquí mismo para programar tu despacho. ¡Gracias por apoyar nuestro negocio! 💖`;
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`, '_blank');
  };

  const getStockReservationCount = (productId: number): number => {
    return bags
      .filter(b => b.estado === 'abierta' || b.estado === 'pendiente_pago' || b.estado === 'despachada')
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
        updateBagStatus,
        cancelBag,
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
