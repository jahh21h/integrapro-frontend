import apiClient from './client';

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
  getAll: async (params?: { search?: string; category?: string; page?: number; per_page?: number }) => {
    const res = await apiClient.get('/inventory', { params });
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
  update: async (id: number, productData: any) => {
    const res = await apiClient.put(`/inventory/${id}`, productData);
    return res.data;
  },
  checkSku: async (sku: string) => {
    const res = await apiClient.get(`/inventory/check-sku/${sku}`);
    return res.data;
  },
  getCategories: async () => {
    const res = await apiClient.get('/inventory/categories');
    return res.data;
  },
  getSuppliers: async () => {
    const res = await apiClient.get('/inventory/suppliers');
    return res.data;
  },
  search: async (query: string) => {
    const res = await apiClient.get('/productos/search', { params: { q: query } });
    return res.data;
  }
};

// ==========================================
// 4. VENTAS, CLIENTES & FACTURACIÓN FEL
// ==========================================
export const salesApi = {
  getAll: async (params?: { page?: number; search?: string; per_page?: number }) => {
    const res = await apiClient.get('/sales', { params });
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
  getClients: async () => {
    const res = await apiClient.get('/clients');
    return res.data;
  },
  createClient: async (clientData: any) => {
    const res = await apiClient.post('/clients/store', clientData);
    return res.data;
  },
  getCredits: async () => {
    const res = await apiClient.get('/sales/credits');
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
    const res = await apiClient.get('/quotations');
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
  getAll: async (params?: { search?: string; page?: number; all?: boolean }) => {
    const res = await apiClient.get('/purchases', { params });
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
    const res = await apiClient.get('/empresas');
    return res.data;
  },
  getById: async (id: number | string) => {
    const res = await apiClient.get(`/empresas/${id}`);
    return res.data;
  },
  update: async (id: number | string, data: any) => {
    const res = await apiClient.put(`/empresas/${id}`, data);
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
