import React, { useState, useEffect, useCallback } from 'react';
import { 
  Store, 
  MapPin, 
  Phone, 
  Users, 
  Boxes, 
  Plus, 
  CheckCircle2, 
  X, 
  Building2, 
  Edit3
} from 'lucide-react';
import { useTimeFormat } from '../context/TimeFormatContext';
import TimeFormatToggle from '../components/TimeFormatToggle';
import SpecificTimePicker from '../components/SpecificTimePicker';
import { EmpresaSaaS } from '../types';
import { branchesApi } from '../api';
import { useLanguage } from '../context/LanguageContext';

interface SucursalItem {
  id: number;
  nombre: string;
  codigo: string;
  direccion: string;
  telefono: string;
  encargado: string;
  empleadosCount: number;
  productosStockCount: number;
  estado: 'Operando' | 'En Inventario' | 'Cerrada';
  horario: string;
  latitud?: number;
  longitud?: number;
  radio_permitido?: number;
}

interface BranchesProps {
  currentEmpresa?: EmpresaSaaS;
}

export default function Branches({ currentEmpresa }: BranchesProps = {}) {
  const { L, isEn } = useLanguage();
  const { formatSchedule } = useTimeFormat();
  const [showNewBranchModal, setShowNewBranchModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const trBranchStatus = (estado: SucursalItem['estado']) => {
    if (estado === 'Operando') return L('Operando', 'Operating');
    if (estado === 'En Inventario') return L('En Inventario', 'In Inventory');
    return L('Cerrada', 'Closed');
  };

  const trScheduleText = (horario: string) => {
    if (!isEn) return horario;
    return horario
      .replace(/Lunes a Sábado/gi, 'Mon to Sat')
      .replace(/Lunes a Domingo/gi, 'Mon to Sun')
      .replace(/Lunes a Viernes/gi, 'Mon to Fri')
      .replace(/Martes a Domingo/gi, 'Tue to Sun');
  };

  const trFallbackField = (val: string, esDef: string, enDef: string) => {
    return val === esDef ? L(esDef, enDef) : val;
  };

  const [sucursales, setSucursales] = useState<SucursalItem[]>([]);

  const loadBranches = useCallback(async () => {
    try {
      const empId = Number(currentEmpresa?.id) || 1;
      const res = await branchesApi.getAll({ id_empresa: empId });
      const raw = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      setSucursales(
        raw.map((b: any, idx: number) => ({
          id: Number(b.id_sucursal ?? b.id ?? idx + 1),
          nombre: String(b.nombre || `Sucursal #${idx + 1}`),
          codigo: String(b.codigo || `SUC-${String(b.id_sucursal ?? b.id ?? idx + 1).padStart(3, '0')}`),
          direccion: String(b.direccion || 'Dirección no especificada'),
          telefono: String(b.telefono || 'Sin teléfono'),
          encargado: String(b.encargado || currentEmpresa?.nombre || 'Administración'),
          empleadosCount: Number(b.empleados_count ?? 0),
          productosStockCount: Number(b.productos_stock_count ?? 0),
          estado: b.activo === false || b.activa === false ? 'Cerrada' : 'Operando',
          horario: String(b.horario || 'Lunes a Sábado: 8:00 AM - 6:00 PM'),
          latitud: b.latitud ? Number(b.latitud) : 14.5986,
          longitud: b.longitud ? Number(b.longitud) : -90.5187,
          radio_permitido: Number(b.radio_permitido ?? 50),
        }))
      );
    } catch (err) {
      console.error('Error cargando sucursales reales:', err);
      setSucursales([]);
    }
  }, [currentEmpresa?.id, currentEmpresa?.nombre]);

  useEffect(() => {
    loadBranches();
  }, [loadBranches]);

  const [newBranch, setNewBranch] = useState({
    nombre: '',
    codigo: '',
    direccion: '',
    telefono: '',
    encargado: '',
    dias: 'Lunes a Sábado',
    horaApertura: '08:00',
    horaCierre: '19:00',
    latitud: '14.5986',
    longitud: '-90.5187',
    radio_permitido: 50
  });

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await branchesApi.create({
        nombre: newBranch.nombre,
        direccion: newBranch.direccion,
        telefono: newBranch.telefono,
        activo: true,
      });
      await loadBranches();
      setShowNewBranchModal(false);
      showToast(L(
        `Sucursal "${newBranch.nombre}" guardada y sincronizada en el servidor.`,
        `Branch "${newBranch.nombre}" saved and synced with server.`
      ));
    } catch (err: any) {
      showToast(err?.response?.data?.message || L('Error al crear la sucursal en el servidor.', 'Error creating branch on the server.'));
      return;
    }
    setNewBranch({
      nombre: '',
      codigo: '',
      direccion: '',
      telefono: '',
      encargado: '',
      dias: 'Lunes a Sábado',
      horaApertura: '08:00',
      horaCierre: '19:00',
      latitud: '14.5986',
      longitud: '-90.5187',
      radio_permitido: 50
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Toast de Notificación */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{notificationToast}</span>
        </div>
      )}

      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            {L('Red de Sucursales & Puntos de Venta', 'Branch Network & Points of Sale')}
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
              {L('Multi-Sucursal', 'Multi-Branch')}
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">{L('Control independiente de inventario, cajas y personal asignado por sucursal', 'Independent control of inventory, cash registers, and staff assigned per branch')}</p>
        </div>

        <div className="flex items-center gap-2">
          <TimeFormatToggle variant="badge" />
          <button 
            type="button" 
            onClick={() => setShowNewBranchModal(true)}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{L('Nueva Sucursal', 'New Branch')}</span>
          </button>
        </div>
      </div>

      {/* Tarjetas de Sucursales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sucursales.map((s) => (
          <div key={s.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-lg hover:border-cyan-400/50 transition-all">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{s.nombre}</h3>
                    <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md">
                      {s.codigo}
                    </span>
                  </div>
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {trBranchStatus(s.estado)}
                </span>
              </div>

              <div className="py-4 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight">{trFallbackField(s.direccion, 'Dirección no especificada', 'Address not specified')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-[11px]">{trFallbackField(s.telefono, 'Sin teléfono', 'No phone')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-[11px]">{L('Encargado:', 'Manager:')} <strong className="text-slate-800">{trFallbackField(s.encargado, 'Administración', 'Administration')}</strong></span>
                </div>
              </div>

              {/* Estadísticas de la Sucursal */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-semibold">
                    <Users className="w-3 h-3" /> {L('Colaboradores', 'Employees')}
                  </div>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{s.empleadosCount}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-semibold">
                    <Boxes className="w-3 h-3" /> {L('Unidades Stock', 'Stock Units')}
                  </div>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{s.productosStockCount}</p>
                </div>
              </div>
            </div>

            {/* Geocerca & Coordenadas */}
            <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1 font-bold text-slate-700">
                <MapPin className="w-3 h-3 text-cyan-600" />
                <span>{L(`Geocerca: Radio de ${s.radio_permitido || 50}m`, `Geofence: ${s.radio_permitido || 50}m radius`)}</span>
              </span>
              <span className="font-mono text-slate-400">
                {s.latitud?.toFixed(4)}, {s.longitud?.toFixed(4)}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
              <span className="text-[10px] text-slate-500 font-medium font-mono">{formatSchedule(trScheduleText(s.horario))}</span>
              <button className="text-cyan-600 hover:text-cyan-800 font-bold flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5" /> {L('Editar', 'Edit')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: Nueva Sucursal */}
      {showNewBranchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">{L('Añadir Nueva Sucursal a la Red', 'Add New Branch to Network')}</h3>
              <button onClick={() => setShowNewBranchModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBranch} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Nombre de Sucursal *', 'Branch Name *')}</label>
                <input
                  required
                  placeholder={L('Ej. Sucursal Carretera a El Salvador', 'e.g. Downtown Main Branch')}
                  value={newBranch.nombre}
                  onChange={(e) => setNewBranch({ ...newBranch, nombre: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Dirección Exacta *', 'Exact Address *')}</label>
                <input
                  required
                  placeholder={L('Ej. Km 18.5 Carretera a El Salvador', 'e.g. 123 Main St, Suite 200')}
                  value={newBranch.direccion}
                  onChange={(e) => setNewBranch({ ...newBranch, direccion: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Teléfono', 'Phone')}</label>
                  <input
                    placeholder={L('+502 2400-0000', '+1 (555) 240-0000')}
                    value={newBranch.telefono}
                    onChange={(e) => setNewBranch({ ...newBranch, telefono: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{L('Encargado', 'Manager')}</label>
                  <input
                    placeholder={L('Nombre del Gerente', 'Manager Name')}
                    value={newBranch.encargado}
                    onChange={(e) => setNewBranch({ ...newBranch, encargado: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Horario de Atención Específico */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {L('Horario de Atención de la Sucursal:', 'Branch Business Hours:')}
                </span>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">{L('Días Hábiles:', 'Business Days:')}</label>
                  <select
                    value={newBranch.dias}
                    onChange={(e) => setNewBranch({ ...newBranch, dias: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Lunes a Sábado">{L('Lunes a Sábado', 'Monday to Saturday')}</option>
                    <option value="Lunes a Domingo">{L('Lunes a Domingo', 'Monday to Sunday')}</option>
                    <option value="Lunes a Viernes">{L('Lunes a Viernes', 'Monday to Friday')}</option>
                    <option value="Martes a Domingo">{L('Martes a Domingo', 'Tuesday to Sunday')}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SpecificTimePicker
                    label={L('Hora de Apertura', 'Opening Time')}
                    required
                    value={newBranch.horaApertura}
                    onChange={(val) => setNewBranch({ ...newBranch, horaApertura: val })}
                    helperText={L('Apertura al público', 'Opens to public')}
                  />

                  <SpecificTimePicker
                    label={L('Hora de Cierre', 'Closing Time')}
                    required
                    value={newBranch.horaCierre}
                    onChange={(val) => setNewBranch({ ...newBranch, horaCierre: val })}
                    helperText={L('Cierre de sucursal', 'Branch closing time')}
                  />
                </div>
              </div>

              {/* Configuración de Geocerca GPS (Laravel: latitud, longitud, radio_permitido) */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {L('Geocerca & Ubicación Física (Para Reloj Checador):', 'Geofence & Physical Location (For Time Clock):')}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">{L('Latitud GPS', 'GPS Latitude')}</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={newBranch.latitud}
                      onChange={(e) => setNewBranch({ ...newBranch, latitud: e.target.value })}
                      placeholder="14.5986"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">{L('Longitud GPS', 'GPS Longitude')}</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={newBranch.longitud}
                      onChange={(e) => setNewBranch({ ...newBranch, longitud: e.target.value })}
                      placeholder="-90.5187"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">{L('Radio Permitido (m)', 'Allowed Radius (m)')}</label>
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      value={newBranch.radio_permitido}
                      onChange={(e) => setNewBranch({ ...newBranch, radio_permitido: Number(e.target.value) })}
                      placeholder="50"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  {L(
                    'Los colaboradores solo podrán checar entrada si su GPS se encuentra dentro de este radio de metros.',
                    'Employees can only clock in if their GPS is within this radius in meters.'
                  )}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setShowNewBranchModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">{L('Cancelar', 'Cancel')}</button>
                <button type="submit" className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl shadow-md shadow-cyan-600/20 transition-all cursor-pointer">{L('Registrar Sucursal', 'Register Branch')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
