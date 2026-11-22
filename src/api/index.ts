import axios from 'axios';
import apiClient from './client';

export { apiClient };

// Subida de archivos (multipart): se usa axios directo para que el navegador
// fije el Content-Type con boundary (el cliente JSON por defecto lo rompería).
const API_BASE = (import.meta as any).env?.VITE_API_URL || 'https://app.integrapro.app/api';

const getActiveEmpresaHeader = (): Record<string, string> => {
  const activeId = localStorage.getItem('integrapro_active_empresa_id');
  return activeId ? { 'X-Empresa-ID': activeId } : {};
};

const withTenantParam = <T extends Record<string, any>>(params?: T): (T & { id_empresa?: number }) | undefined => {
  const explicit = params?.id_empresa ?? params?.empresa_id;
  if (explicit !== undefined && explicit !== null) {
    return { ...params, id_empresa: Number(explicit) } as T & { id_empresa?: number };
  }
  const stored = localStorage.getItem('integrapro_active_empresa_id');
  const parsed = stored ? Number(stored) : NaN;
  if (Number.isFinite(parsed) && parsed > 0) {
    return { ...(params || {}), id_empresa: parsed } as T & { id_empresa?: number };
  }
  return params;
};

const multipartConfig = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('integrapro_token') || ''}`,
    ...getActiveEmpresaHeader(),
    'Accept': 'application/json',
  },
  timeout: 60000,
});

// ==========================================
// 1. AUTENTICACIÓN (Sanctum)
// ==========================================
export const authApi = {
  login: async (credentials: { email: string; password: string; device_name?: string }) => {
    const payload = {
      device_name: credentials.device_name || 'IntegraPro Web POS',
      ...credentials
    };
    const res = await apiClient.post('/login', payload);
    if (res.data?.token) {
      localStorage.setItem('integrapro_token', res.data.token);
    }
    return res.data;
  },
  registerTenant: async (payload: {
    nombre: string;
    pais: string;
    regimen_tributario?: string;
    telefono?: string;
    preset: 'retail' | 'admin_only' | 'standard' | 'enterprise' | 'live_express';
    billing_cycle: 'monthly' | 'annual';
    admin_name: string;
    admin_email: string;
    admin_password: string;
    device_name?: string;
  }) => {
    const res = await apiClient.post('/register-tenant', {
      device_name: 'IntegraPro Self-Service Web',
      ...payload,
    });
    if (res.data?.token) {
      localStorage.setItem('integrapro_token', res.data.token);
    }
    return res.data;
  },
  getMe: async () => {
    const res = await apiClient.get('/me');
    return res.data;
  },
  logout: async () => {
    try {
      await apiClient.post('/logout');
    } finally {
      localStorage.removeItem('integrapro_token');
    }
  }
};

// ==========================================
// 2. DASHBOARD
// ==========================================
export const dashboardApi = {
  getKPIs: async () => {
    const res = await apiClient.get('/dashboard');
    return res.data;
  }
};

// ==========================================
// 3. INVENTARIO & PRODUCTOS
// ==========================================
export const inventoryApi = {
  getAll: async (params?: { search?: string; category?: string; page?: number; per_page?: number; id_empresa?: number; order_by_stock?: boolean; only_with_stock?: boolean }) => {
    const res = await apiClient.get('/inventory', { params: withTenantParam(params) });
    return res.data;
  },
  getById: async (id: number) => {
    const res = await apiClient.get(`/inventory/${id}`);
    return res.data;
  },
  create: async (productData: any) => {
    const res = await apiClient.post('/inventory', productData);
    return res.data;
  },
  createWithImage: async (formData: FormData) => {
    const res = await axios.post(`${API_BASE}/inventory`, formData, multipartConfig());
    return res.data;
  },
  updateWithImage: async (id: number | string, formData: FormData) => {
    // POST + _method=PUT: multipart sobre PUT puede fallar en algunos servidores
    const res = await axios.post(`${API_BASE}/inventory/${id}?_method=PUT`, formData, multipartConfig());
    return res.data;
  },
  update: async (id: number, productData: any) => {
    const res = await apiClient.put(`/inventory/${id}`, productData);
    return res.data;
  },
  delete: async (id: number | string) => {
    const res = await apiClient.delete(`/inventory/${id}`);
    return res.data;
  },
  checkSku: async (sku: string) => {
    const res = await apiClient.get(`/inventory/check-sku/${sku}`);
    return res.data;
  },
  getCategories: async () => {
    const res = await apiClient.get('/inventory/categories', { params: withTenantParam() });
    return res.data;
  },
  getSuppliers: async () => {
    const res = await apiClient.get('/inventory/suppliers', { params: withTenantParam() });
    return res.data;
  },
  search: async (query: string) => {
    const res = await apiClient.get('/productos/search', { params: withTenantParam({ q: query }) });
    return res.data;
  }
};

// ==========================================
// 4. VENTAS, CLIENTES & FACTURACIÓN FEL
// ==========================================
export const salesApi = {
  getAll: async (params?: { page?: number; search?: string; per_page?: number; id_empresa?: number }) => {
    const res = await apiClient.get('/sales', { params: withTenantParam(params) });
    return res.data;
  },
  getById: async (id: number) => {
    const res = await apiClient.get(`/sales/${id}`);
    return res.data;
  },
  createSale: async (saleData: any) => {
    const res = await apiClient.post('/sales', saleData);
    return res.data;
  },
  updateSale: async (id: number | string, saleData: any) => {
    const res = await apiClient.put(`/sales/${id}`, saleData);
    return res.data;
  },
  deleteSale: async (id: number | string) => {
    const res = await apiClient.delete(`/sales/${id}`);
    return res.data;
  },
  getClients: async (params?: { search?: string; per_page?: number; id_empresa?: number }) => {
    const res = await apiClient.get('/clients', { params: withTenantParam(params) });
    return res.data;
  },
  createClient: async (clientData: any) => {
    const res = await apiClient.post('/clients/store', clientData);
    return res.data;
  },
  getCredits: async () => {
    const res = await apiClient.get('/sales/credits', { params: withTenantParam() });
    return res.data;
  },
  addPayment: async (saleId: number, paymentData: { monto: number; metodo_pago: string; referencia?: string }) => {
    const res = await apiClient.post(`/sales/${saleId}/payment`, paymentData);
    return res.data;
  }
};

// ==========================================
// 5. COTIZACIONES
// ==========================================
export const quotationsApi = {
  getAll: async () => {
    const res = await apiClient.get('/quotations', { params: withTenantParam() });
    return res.data;
  },
  create: async (quotationData: any) => {
    const res = await apiClient.post('/quotations', quotationData);
    return res.data;
  },
  convertToSale: async (quotationId: number) => {
    const res = await apiClient.post(`/quotations/${quotationId}/convert-to-sale`);
    return res.data;
  }
};

// ==========================================
// 6. COMPRAS & PROVEEDORES
// ==========================================
export const purchasesApi = {
  getSuppliers: async (params?: { id_empresa?: number }) => {
    const res = await apiClient.get('/suppliers', { params: withTenantParam(params) });
    return res.data;
  },
  createSupplier: async (data: any) => {
    const res = await apiClient.post('/suppliers', data);
    return res.data;
  },
  getAll: async (params?: { search?: string; page?: number; all?: boolean; id_empresa?: number }) => {
    const res = await apiClient.get('/purchases', { params: withTenantParam(params) });
    return res.data;
  },
  getById: async (id: number | string) => {
    const res = await apiClient.get(`/purchases/${id}`);
    return res.data;
  },
  create: async (purchaseData: any) => {
    const res = await apiClient.post('/purchases', purchaseData);
    return res.data;
  },
  update: async (id: number | string, purchaseData: any) => {
    const res = await apiClient.put(`/purchases/${id}`, purchaseData);
    return res.data;
  },
  delete: async (id: number | string) => {
    const res = await apiClient.delete(`/purchases/${id}`);
    return res.data;
  }
};

// ==========================================
// 7. SCRAPER (Shein / Temu / AliExpress)
// ==========================================
export const scraperApi = {
  retrieveLatest: async () => {
    const res = await apiClient.get('/scraper/retrieve');
    return res.data;
  },
  extractFromUrl: async (url: string) => {
    const res = await apiClient.post('/scraper/extract', { url });
    return res.data;
  },
  getTokenInfo: async () => {
    const res = await apiClient.get('/scraper/token');
    return res.data;
  },
  generateToken: async () => {
    const res = await apiClient.post('/scraper/token');
    return res.data;
  },
  revokeTokens: async () => {
    const res = await apiClient.delete('/scraper/token');
    return res.data;
  }
};

// ==========================================
// 8. OCR & INTELIGENCIA ARTIFICIAL EN FACTURAS
// ==========================================
export const aiInvoiceApi = {
  scanOcr: async (file: File) => {
    const formData = new FormData();
    formData.append('document', file);
    const res = await apiClient.post('/ocr/scan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  processInvoiceAI: async (data: any) => {
    const res = await apiClient.post('/invoices/process', data);
    return res.data;
  }
};

// ==========================================
// 9. SUCURSALES
// ==========================================
export const branchesApi = {
  getAll: async () => {
    const res = await apiClient.get('/branches');
    return res.data;
  }
};

// ==========================================
// 10. CONTABILIDAD & SAT GUATEMALA
// ==========================================
export const accountingApi = {
  getCuentas: async () => {
    const res = await apiClient.get('/cuentas-contables');
    return res.data;
  },
  createCuenta: async (data: any) => {
    const res = await apiClient.post('/cuentas-contables', data);
    return res.data;
  },
  getPartidas: async (params?: { page?: number }) => {
    const res = await apiClient.get('/partidas', { params });
    return res.data;
  },
  createPartida: async (data: any) => {
    const res = await apiClient.post('/partidas', data);
    return res.data;
  },
  getLiquidacionSAT: async (mes?: number, anio?: number) => {
    const res = await apiClient.get('/sat/liquidacion', { params: { mes, anio } });
    return res.data;
  }
};

// ==========================================
// 11. RECURSOS HUMANOS & NÓMINA (Leyes de Guatemala)
// ==========================================
export const rrhhApi = {
  getEmpleados: async () => {
    const res = await apiClient.get('/empleados');
    return res.data;
  },
  createEmpleado: async (data: any) => {
    const res = await apiClient.post('/empleados', data);
    return res.data;
  },
  calcularNomina: async (mes?: number, anio?: number) => {
    const res = await apiClient.get('/rrhh/nomina', { params: { mes, anio } });
    return res.data;
  },
  calcularLiquidacion: async (data: { id_empleado: number; motivo: string; fecha_salida: string }) => {
    const res = await apiClient.post('/rrhh/liquidacion', data);
    return res.data;
  }
};

// ==========================================
// 12. KIOSCO DE ASISTENCIA BIOMÉTRICO / PIN
// ==========================================
export const attendanceApi = {
  getAsistencias: async (fecha?: string) => {
    const res = await apiClient.get('/asistencias', { params: { fecha } });
    return res.data;
  },
  verifyKiosk: async (dpi: string) => {
    const res = await apiClient.post('/asistencias/verify-kiosk', { dpi });
    return res.data;
  },
  marcar: async (data: { id_empleado?: number; dpi?: string; tipo?: string; latitud?: number; longitud?: number; foto_evidencia?: string; id_sucursal?: number }) => {
    const res = await apiClient.post('/asistencias/marcar', data);
    return res.data;
  }
};

// ==========================================
// 13. CONEXIONES EXTERNAS (MySQL, PostgreSQL, SQL Server)
// ==========================================
export const externalConnectionsApi = {
  getAll: async () => {
    const res = await apiClient.get('/conexiones-externas');
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/conexiones-externas', data);
    return res.data;
  },
  delete: async (id: number) => {
    const res = await apiClient.delete(`/conexiones-externas/${id}`);
    return res.data;
  },
  testConnection: async (id: number) => {
    const res = await apiClient.post(`/conexiones-externas/${id}/test`);
    return res.data;
  },
  sync: async (id: number) => {
    const res = await apiClient.post(`/conexiones-externas/${id}/sync`);
    return res.data;
  }
};

// ==========================================
// 14. TRASLADOS DE INVENTARIO
// ==========================================
export const inventoryTransferApi = {
  getAll: async () => {
    const res = await apiClient.get('/inventory/traslados');
    return res.data;
  },
  create: async (data: { id_sucursal_origen: number; id_sucursal_destino: number; id_producto: number; cantidad: number; motivo?: string }) => {
    const res = await apiClient.post('/inventory/traslados', data);
    return res.data;
  }
};

// ==========================================
// 15. EMPRESAS & CONFIGURACIÓN MULTI-TENANT
// ==========================================
export const empresaApi = {
  getAll: async () => {
    const res = await apiClient.get(`/empresas?_t=${Date.now()}`);
    return res.data;
  },
  getById: async (id: number | string) => {
    const res = await apiClient.get(`/empresas/${id}?_t=${Date.now()}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/empresas', data);
    return res.data;
  },
  update: async (id: number | string, data: any) => {
    const res = await apiClient.put(`/empresas/${id}`, data);
    return res.data;
  },
  delete: async (id: number | string) => {
    const res = await apiClient.delete(`/empresas/${id}`);
    return res.data;
  }
};

// ==========================================
// 16. SOFTWARE LICENSES & FORTEXA ECOSYSTEM
// ==========================================
export const softwareLicenseApi = {
  getAll: async () => {
    const res = await apiClient.get('/software-licenses');
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/software-licenses', data);
    return res.data;
  },
  update: async (id: number, data: any) => {
    const res = await apiClient.put(`/software-licenses/${id}`, data);
    return res.data;
  },
  getSignedLicenses: async () => {
    const res = await apiClient.get('/signed-licenses');
    return res.data;
  }
};
