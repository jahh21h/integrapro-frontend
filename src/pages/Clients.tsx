import { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  CreditCard, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Cliente } from '../types';
import { REAL_CLIENTS } from '../data/realClients';

export default function Clients() {
  const [activeTab, setActiveTab] = useState<'directorio' | 'cxc'>('directorio');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewClienteModal, setShowNewClienteModal] = useState(false);
  const [showCobroModal, setShowCobroModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [montoCobro, setMontoCobro] = useState('');

  // Clientes reales sincronizados con el modelo Cliente y la base de datos de producción
  const [clientes, setClientes] = useState<Cliente[]>(REAL_CLIENTS);

  // Sincronización automática
  useEffect(() => {
    setClientes(REAL_CLIENTS);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  // Formulario nuevo cliente
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    apellido: '',
    nit: '',
    telefono: '',
    email: '',
    direccion: '',
    tipo_cliente: 'normal' as const,
    descuento_aplicable: 0,
    dias_credito: 0,
    limite_credito: 5000
  });

  const totalCarteraCredito = clientes.reduce((acc, c) => acc + c.saldo_actual, 0);
  const clientesConDeuda = clientes.filter(c => c.saldo_actual > 0);

  const filteredDirectorio = clientes.filter(c => 
    c.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefono.includes(searchTerm)
  );

  const filteredCxc = clientesConDeuda.filter(c => 
    c.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefono.includes(searchTerm)
  );

  const currentList = activeTab === 'directorio' ? filteredDirectorio : filteredCxc;
  const totalPages = Math.ceil(currentList.length / itemsPerPage) || 1;
  const paginatedClientes = currentList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSaveCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCliente.nombre || !newCliente.nit) return;
    const creado: Cliente = {
      id_cliente: Date.now(),
      nombre: newCliente.nombre,
      apellido: newCliente.apellido,
      nombre_completo: `${newCliente.nombre} ${newCliente.apellido}`.trim(),
      nit: newCliente.nit,
      telefono: newCliente.telefono || 'N/A',
      email: newCliente.email || 'N/A',
      direccion: newCliente.direccion || 'Ciudad',
      tipo_cliente: newCliente.tipo_cliente,
      descuento_aplicable: Number(newCliente.descuento_aplicable),
      dias_credito: Number(newCliente.dias_credito),
      saldo_actual: 0.00,
      limite_credito: Number(newCliente.limite_credito)
    };

    setClientes([...clientes, creado]);
    setShowNewClienteModal(false);
    setNewCliente({
      nombre: '',
      apellido: '',
      nit: '',
      telefono: '',
      email: '',
      direccion: '',
      tipo_cliente: 'normal',
      descuento_aplicable: 0,
      dias_credito: 0,
      limite_credito: 5000
    });
  };

  const handleApplyCobro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCliente) return;
    const abono = parseFloat(montoCobro);
    if (isNaN(abono) || abono <= 0 || abono > selectedCliente.saldo_actual) {
      alert('Ingresa un monto válido de cobro que no exceda el saldo pendiente.');
      return;
    }

    const nuevoSaldo = selectedCliente.saldo_actual - abono;
    setClientes(clientes.map(c => 
      c.id_cliente === selectedCliente.id_cliente ? { ...c, saldo_actual: nuevoSaldo } : c
    ));

    setSelectedCliente({ ...selectedCliente, saldo_actual: nuevoSaldo });
    setShowCobroModal(false);
    setMontoCobro('');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header con métricas de clientes y créditos */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Clientes & Cuentas por Cobrar (CXC)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gestión de cartera de clientes, límites y días de crédito comercial, y cobro de facturas pendientes.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => setShowNewClienteModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Registrar Nuevo Cliente
        </button>
      </div>

      {/* 2. Tarjetas de Resumen de Cartera */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Clientes Registrados</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{clientes.length}</p>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Clientes Activos
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Cartera de Crédito (CXC)</p>
            <p className="text-2xl font-black text-amber-600 mt-1">
              Q{totalCarteraCredito.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </p>
            <span className="text-[11px] text-amber-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" /> {clientesConDeuda.length} Clientes con saldo pendiente
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Límite Total Concedido</p>
            <p className="text-2xl font-black text-slate-800 mt-1">
              Q{clientes.reduce((a, b) => a + b.limite_credito, 0).toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </p>
            <span className="text-[11px] text-indigo-600 font-medium mt-1">
              Riesgo Crediticio Controlado
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Selector de Pestañas */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-2xl">
        <button
          type="button"
          onClick={() => setActiveTab('directorio')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'directorio'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Directorio de Clientes ({clientes.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('cxc')}
          className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'cxc'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          Cuentas por Cobrar / Cartera ({clientesConDeuda.length})
        </button>
      </div>

      {/* 4. Contenido de Directorio */}
      {activeTab === 'directorio' && (
        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar cliente por nombre o NIT..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Segmentación comercial por tipo de cliente
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Cliente / Razón Social</th>
                  <th className="py-3 px-4">NIT</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Contacto & Teléfono</th>
                  <th className="py-3 px-4">Crédito Concedido</th>
                  <th className="py-3 px-4 text-right">Saldo Actual</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedClientes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="font-semibold text-slate-600">No se encontraron clientes</p>
                      <p className="text-xs text-slate-400 mt-1">Prueba cambiando el término de búsqueda.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedClientes.map((cliente) => (
                    <tr key={cliente.id_cliente} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">{cliente.nombre_completo}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate max-w-xs">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          {cliente.direccion}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{cliente.nit}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          cliente.tipo_cliente === 'vip' ? 'bg-purple-100 text-purple-700' :
                          cliente.tipo_cliente === 'mayorista' ? 'bg-indigo-100 text-indigo-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {cliente.tipo_cliente} ({cliente.descuento_aplicable}% desc.)
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-slate-700"><Phone className="w-3 h-3 text-slate-400" /> {cliente.telefono}</div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5"><Mail className="w-3 h-3 text-slate-400" /> {cliente.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-700">Q{cliente.limite_credito.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</div>
                        <div className="text-[10px] text-slate-400">{cliente.dias_credito > 0 ? `${cliente.dias_credito} días de plazo` : 'Solo Contado'}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-sm">
                        {cliente.saldo_actual > 0 ? (
                          <span className="text-amber-600">Q{cliente.saldo_actual.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</span>
                        ) : (
                          <span className="text-emerald-600">Al Día (Q0.00)</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {cliente.saldo_actual > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCliente(cliente);
                              setMontoCobro(cliente.saldo_actual.toString());
                              setShowCobroModal(true);
                            }}
                            className="px-2.5 py-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer"
                          >
                            Cobrar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">
                Mostrando <strong className="text-slate-800">{currentList.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> a <strong className="text-slate-800">{Math.min(currentPage * itemsPerPage, currentList.length)}</strong> de <strong className="text-slate-800">{currentList.length.toLocaleString()}</strong> clientes
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Anterior
                </button>
                <span className="px-3 py-1.5 font-bold text-slate-700 bg-white border border-slate-200 rounded-lg">
                  Pág. {currentPage} de {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer flex items-center gap-1"
                >
                  Siguiente <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Contenido de CXC */}
      {activeTab === 'cxc' && (
        <div className="bg-white rounded-b-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Cuentas por Cobrar Activas</h2>
            <span className="text-xs font-bold text-amber-600">
              Total Cartera Adeudada: Q{totalCarteraCredito.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">NIT</th>
                  <th className="py-3 px-4">Plazo Concedido</th>
                  <th className="py-3 px-4 text-right">Límite Autorizado</th>
                  <th className="py-3 px-4 text-right">Saldo Deudor</th>
                  <th className="py-3 px-4 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedClientes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <Clock className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="font-semibold text-slate-600">No hay cuentas por cobrar con estos criterios</p>
                      <p className="text-xs text-slate-400 mt-1">Todos los clientes coinciden con sus pagos al día.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedClientes.map((cliente) => (
                    <tr key={cliente.id_cliente} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-800">{cliente.nombre_completo}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">{cliente.nit}</td>
                      <td className="py-3.5 px-4 text-slate-600">{cliente.dias_credito} días calendario</td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-600">Q{cliente.limite_credito.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-right font-black text-amber-600 text-sm">
                        Q{cliente.saldo_actual.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCliente(cliente);
                            setMontoCobro(cliente.saldo_actual.toString());
                            setShowCobroModal(true);
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer"
                        >
                          Registrar Recibo de Cobro
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">
                Mostrando <strong className="text-slate-800">{currentList.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> a <strong className="text-slate-800">{Math.min(currentPage * itemsPerPage, currentList.length)}</strong> de <strong className="text-slate-800">{currentList.length.toLocaleString()}</strong> clientes deudores
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Anterior
                </button>
                <span className="px-3 py-1.5 font-bold text-slate-700 bg-white border border-slate-200 rounded-lg">
                  Pág. {currentPage} de {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer flex items-center gap-1"
                >
                  Siguiente <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Modal Registrar Cobro */}
      {showCobroModal && selectedCliente && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                Registrar Recibo de Cobro / Abono
              </h3>
              <button
                type="button"
                onClick={() => setShowCobroModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyCobro} className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-800">{selectedCliente.nombre_completo}</div>
                <div className="text-slate-500">NIT: {selectedCliente.nit}</div>
                <div className="text-amber-600 font-extrabold text-sm mt-1">
                  Saldo Pendiente: Q{selectedCliente.saldo_actual.toFixed(2)}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Monto Cobrado (Q):</label>
                <input
                  type="number"
                  step="0.01"
                  max={selectedCliente.saldo_actual}
                  required
                  value={montoCobro}
                  onChange={(e) => setMontoCobro(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Forma de Pago:</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                  <option>Efectivo Recibido en Caja</option>
                  <option>Depósito / Transferencia Bancaria</option>
                  <option>Tarjeta de Crédito / Débito (POS Neonet/BAC)</option>
                  <option>Cheque Comercial</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">No. de Recibo de Caja:</label>
                <input
                  type="text"
                  placeholder="Ej. REC-2026-0891"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCobroModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Confirmar Cobro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Modal Nuevo Cliente */}
      {showNewClienteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Registrar Nuevo Cliente
              </h3>
              <button
                type="button"
                onClick={() => setShowNewClienteModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCliente} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nombre / Razón Social:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Comercial Los Ángeles"
                    value={newCliente.nombre}
                    onChange={(e) => setNewCliente({ ...newCliente, nombre: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Apellido / Tipo Sociedad:</label>
                  <input
                    type="text"
                    placeholder="Ej. S.A. o de Martínez"
                    value={newCliente.apellido}
                    onChange={(e) => setNewCliente({ ...newCliente, apellido: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIT Tributario:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 1234567-8 o C/F"
                    value={newCliente.nit}
                    onChange={(e) => setNewCliente({ ...newCliente, nit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Cliente:</label>
                  <select
                    value={newCliente.tipo_cliente}
                    onChange={(e) => setNewCliente({ ...newCliente, tipo_cliente: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="normal">Normal (Consumidor Final)</option>
                    <option value="mayorista">Mayorista (Descuento y Volumen)</option>
                    <option value="vip">Cliente VIP / Corporativo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teléfono:</label>
                  <input
                    type="text"
                    placeholder="+502 2000-0000"
                    value={newCliente.telefono}
                    onChange={(e) => setNewCliente({ ...newCliente, telefono: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Correo Electrónico:</label>
                  <input
                    type="email"
                    placeholder="cliente@correo.com"
                    value={newCliente.email}
                    onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Días de Crédito:</label>
                  <input
                    type="number"
                    min="0"
                    value={newCliente.dias_credito}
                    onChange={(e) => setNewCliente({ ...newCliente, dias_credito: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Descuento (%):</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="100"
                    value={newCliente.descuento_aplicable}
                    onChange={(e) => setNewCliente({ ...newCliente, descuento_aplicable: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Límite Crédito (Q):</label>
                  <input
                    type="number"
                    step="100"
                    min="0"
                    value={newCliente.limite_credito}
                    onChange={(e) => setNewCliente({ ...newCliente, limite_credito: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dirección de Entrega / Facturación:</label>
                <input
                  type="text"
                  placeholder="Zona, Dirección completa..."
                  value={newCliente.direccion}
                  onChange={(e) => setNewCliente({ ...newCliente, direccion: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewClienteModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
