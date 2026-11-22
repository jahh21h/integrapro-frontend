import React, { useState } from 'react';
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
  const { formatSchedule, formatTime } = useTimeFormat();
  const [showNewBranchModal, setShowNewBranchModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const [sucursales, setSucursales] = useState<SucursalItem[]>(() => {
    if (currentEmpresa?.id === 25) {
      return [
        {
          id: 101,
          nombre: 'Sucursal Demo Principal',
          codigo: 'SUC-DEMO-01',
          direccion: '10 Avenida 1-46 Zona 2, Ciudad de Guatemala',
          telefono: '+502 3569-2079',
          encargado: 'Administrador Demo',
          empleadosCount: 2,
          productosStockCount: 350,
          estado: 'Operando',
          horario: 'Lunes a Sábado: 8:00 AM - 6:00 PM',
          latitud: 14.6400,
          longitud: -90.5100,
          radio_permitido: 50
        }
      ];
    }
    return [
      {
        id: 1,
        nombre: 'Sucursal Central - Ciudad',
        codigo: 'SUC-001',
        direccion: '7a Avenida 12-45 Zona 9, Ciudad de Guatemala',
        telefono: '+502 2334-9000',
        encargado: 'Juan Carlos Morales',
        empleadosCount: 12,
        productosStockCount: 1240,
        estado: 'Operando',
        horario: 'Lunes a Sábado: 7:00 AM - 8:00 PM',
        latitud: 14.5986,
        longitud: -90.5187,
        radio_permitido: 50
      },
      {
        id: 2,
        nombre: 'Sucursal Norte - Carretera al Atlántico',
        codigo: 'SUC-002',
        direccion: 'Km 14.5 Carretera al Atlántico, Zona 18',
        telefono: '+502 2256-4100',
        encargado: 'Roberto Gómez Pérez',
        empleadosCount: 6,
        productosStockCount: 680,
        estado: 'Operando',
        horario: 'Lunes a Domingo: 8:00 AM - 7:00 PM',
        latitud: 14.6542,
        longitud: -90.4612,
        radio_permitido: 50
      },
      {
        id: 3,
        nombre: 'Sucursal Sur - Villa Nueva',
        codigo: 'SUC-003',
        direccion: 'Calzada Concepción 5-10, Villa Nueva',
        telefono: '+502 6630-1820',
        encargado: 'Elena María Reyes',
        empleadosCount: 8,
        productosStockCount: 820,
        estado: 'Operando',
        horario: 'Lunes a Sábado: 8:00 AM - 6:00 PM',
        latitud: 14.5263,
        longitud: -90.5891,
        radio_permitido: 50
      }
    ];
  });

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

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    const horarioGenerado = `${newBranch.dias}: ${formatTime(newBranch.horaApertura)} - ${formatTime(newBranch.horaCierre)}`;
    const nueva: SucursalItem = {
      id: sucursales.length + 1,
      nombre: newBranch.nombre,
      codigo: newBranch.codigo || `SUC-${(sucursales.length + 1).toString().padStart(3, '0')}`,
      direccion: newBranch.direccion,
      telefono: newBranch.telefono,
      encargado: newBranch.encargado,
      empleadosCount: 0,
      productosStockCount: 0,
      estado: 'Operando',
      horario: horarioGenerado,
      latitud: parseFloat(newBranch.latitud) || 14.5986,
      longitud: parseFloat(newBranch.longitud) || -90.5187,
      radio_permitido: Number(newBranch.radio_permitido) || 50
    };
    setSucursales([...sucursales, nueva]);
    setShowNewBranchModal(false);
    showToast(`Sucursal "${nueva.nombre}" dada de alta exitosamente con radio de geocerca de ${nueva.radio_permitido}m.`);
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
            Red de Sucursales & Puntos de Venta
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
              Multi-Branch
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Control independiente de inventario, cajas y personal asignado por sucursal</p>
        </div>

        <div className="flex items-center gap-2">
          <TimeFormatToggle variant="badge" />
          <button 
            type="button" 
            onClick={() => setShowNewBranchModal(true)}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Sucursal</span>
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
                  {s.estado}
                </span>
              </div>

              <div className="py-4 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight">{s.direccion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-[11px]">{s.telefono}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-[11px]">Encargado: <strong className="text-slate-800">{s.encargado}</strong></span>
                </div>
              </div>

              {/* Estadísticas de la Sucursal */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-semibold">
                    <Users className="w-3 h-3" /> Colaboradores
                  </div>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{s.empleadosCount}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-semibold">
                    <Boxes className="w-3 h-3" /> Unidades Stock
                  </div>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{s.productosStockCount}</p>
                </div>
              </div>
            </div>

            {/* Geocerca & Coordenadas */}
            <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1 font-bold text-slate-700">
                <MapPin className="w-3 h-3 text-cyan-600" />
                <span>Geocerca: Radio de {s.radio_permitido || 50}m</span>
              </span>
              <span className="font-mono text-slate-400">
                {s.latitud?.toFixed(4)}, {s.longitud?.toFixed(4)}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
              <span className="text-[10px] text-slate-500 font-medium font-mono">{formatSchedule(s.horario)}</span>
              <button className="text-cyan-600 hover:text-cyan-800 font-bold flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5" /> Editar
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
              <h3 className="text-base font-black text-slate-900">Añadir Nueva Sucursal a la Red</h3>
              <button onClick={() => setShowNewBranchModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBranch} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nombre de Sucursal *</label>
                <input
                  required
                  placeholder="Ej. Sucursal Carretera a El Salvador"
                  value={newBranch.nombre}
                  onChange={(e) => setNewBranch({ ...newBranch, nombre: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Dirección Exacta *</label>
                <input
                  required
                  placeholder="Ej. Km 18.5 Carretera a El Salvador"
                  value={newBranch.direccion}
                  onChange={(e) => setNewBranch({ ...newBranch, direccion: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Teléfono</label>
                  <input
                    placeholder="+502 2400-0000"
                    value={newBranch.telefono}
                    onChange={(e) => setNewBranch({ ...newBranch, telefono: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Encargado</label>
                  <input
                    placeholder="Nombre del Gerente"
                    value={newBranch.encargado}
                    onChange={(e) => setNewBranch({ ...newBranch, encargado: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Horario de Atención Específico */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Horario de Atención de la Sucursal:
                </span>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Días Hábiles:</label>
                  <select
                    value={newBranch.dias}
                    onChange={(e) => setNewBranch({ ...newBranch, dias: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Lunes a Sábado">Lunes a Sábado</option>
                    <option value="Lunes a Domingo">Lunes a Domingo</option>
                    <option value="Lunes a Viernes">Lunes a Viernes</option>
                    <option value="Martes a Domingo">Martes a Domingo</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SpecificTimePicker
                    label="Hora de Apertura"
                    required
                    value={newBranch.horaApertura}
                    onChange={(val) => setNewBranch({ ...newBranch, horaApertura: val })}
                    helperText="Apertura al público"
                  />

                  <SpecificTimePicker
                    label="Hora de Cierre"
                    required
                    value={newBranch.horaCierre}
                    onChange={(val) => setNewBranch({ ...newBranch, horaCierre: val })}
                    helperText="Cierre de sucursal"
                  />
                </div>
              </div>

              {/* Configuración de Geocerca GPS (Laravel: latitud, longitud, radio_permitido) */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Geocerca & Ubicación Física (Para Reloj Checador):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Latitud GPS</label>
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
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Longitud GPS</label>
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
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Radio Permitido (m)</label>
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
                  Los colaboradores solo podrán checar entrada si su GPS se encuentra dentro de este radio de metros.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setShowNewBranchModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl shadow-md shadow-cyan-600/20 transition-all cursor-pointer">Registrar Sucursal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
