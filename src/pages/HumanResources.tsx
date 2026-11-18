import React, { useState, useRef } from 'react';
import { 
  Search, 
  Calculator, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  X, 
  UserPlus,
  ZoomIn,
  Upload,
  Camera,
  Link as LinkIcon,
  FileSpreadsheet,
  AlertTriangle,
  Clock3,
  Printer,
  Plus,
  MapPin
} from 'lucide-react';
import { PagoSalarioNomina, SuspensionEmpleado, HorarioEmpleado } from '../types';
import { useTimeFormat } from '../context/TimeFormatContext';
import DateInputWithCalendar from '../components/DateInputWithCalendar';
import SpecificTimePicker, { calculateTimeDifference } from '../components/SpecificTimePicker';

interface EmpleadoItem {
  id: number;
  nombre: string;
  dpi: string;
  puesto: string;
  sucursal: string;
  salarioBase: number;
  fechaIngreso: string;
  fechaSalida?: string;
  estado: 'Activo' | 'Suspendido' | 'Vacaciones' | 'Baja' | 'Inactivo';
  telefono: string;
  email: string;
  avatar: string;
}

interface AsistenciaItem {
  id: number;
  empleado: string;
  puesto: string;
  sucursal: string;
  fecha: string;
  horaEntrada: string;
  horaSalida: string;
  horasTrabajadas: string;
  estado: 'Puntual' | 'Tarde' | 'Falta';
}

export default function HumanResources() {
  const { timeFormat, toggleTimeFormat, formatTime } = useTimeFormat();
  const [activeTab, setActiveTab] = useState<'empleados' | 'asistencias' | 'nomina' | 'liquidaciones' | 'suspensiones' | 'horarios'>('empleados');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Modales Administrativos de RRHH
  const [showNewEmployeeModal, setShowNewEmployeeModal] = useState(false);
  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [showNewSuspensionModal, setShowNewSuspensionModal] = useState(false);
  const [showNewHorarioModal, setShowNewHorarioModal] = useState(false);
  const [showManualAttendanceModal, setShowManualAttendanceModal] = useState(false);
  const [manualAttendance, setManualAttendance] = useState({
    id_empleado: 1,
    fecha: '16/11/2026',
    horaEntrada: '08:00',
    horaSalida: '17:00',
    tipoRegistro: 'ambos' as 'entrada' | 'salida' | 'ambos'
  });
  const [enlargedEmployee, setEnlargedEmployee] = useState<EmpleadoItem | null>(null);

  // Datos para calculadora de liquidación (Idéntico a GuatemalaStrategy en Laravel)
  const [calcEmpleadoId, setCalcEmpleadoId] = useState(1);
  const [calcMotivo, setCalcMotivo] = useState<'despido_injustificado' | 'despido_justificado' | 'renuncia'>('despido_injustificado');
  const [calcFechaSalida, setCalcFechaSalida] = useState('2026-11-16');

  // Planillas de Sueldos (sincronizado con PagoSalario en Laravel)
  const [nominas] = useState<PagoSalarioNomina[]>([
    {
      id_pago: 1,
      id_empleado: 1,
      empleado_nombre: 'Juan Carlos Morales',
      puesto: 'Cajero Principal / POS',
      periodo: 'Primera Quincena Noviembre 2026',
      mes: 11,
      anio: 2026,
      salario_base: 3650.00,
      bonificacion_incentivo: 250.00, // Dcto. 78-89
      comisiones_extras: 150.00,
      total_devengado: 4050.00,
      descuento_igss: 176.30, // 4.83% sobre 3650
      retencion_isr: 0.00,
      anticipos_otros: 0.00,
      total_deducciones: 176.30,
      liquido_a_recibir: 3873.70,
      estado: 'pagado',
      fecha_pago: '2026-11-15'
    },
    {
      id_pago: 2,
      id_empleado: 2,
      empleado_nombre: 'Sofía Andrea Castillo',
      puesto: 'Encargada de Bodega e Inventario',
      periodo: 'Primera Quincena Noviembre 2026',
      mes: 11,
      anio: 2026,
      salario_base: 4200.00,
      bonificacion_incentivo: 250.00,
      comisiones_extras: 0.00,
      total_devengado: 4450.00,
      descuento_igss: 202.86, // 4.83% sobre 4200
      retencion_isr: 0.00,
      anticipos_otros: 0.00,
      total_deducciones: 202.86,
      liquido_a_recibir: 4247.14,
      estado: 'pagado',
      fecha_pago: '2026-11-15'
    },
    {
      id_pago: 3,
      id_empleado: 4,
      empleado_nombre: 'Elena María Reyes',
      puesto: 'Gerente Comercial',
      periodo: 'Primera Quincena Noviembre 2026',
      mes: 11,
      anio: 2026,
      salario_base: 6500.00,
      bonificacion_incentivo: 250.00,
      comisiones_extras: 800.00,
      total_devengado: 7550.00,
      descuento_igss: 313.95, // 4.83%
      retencion_isr: 165.00, // Retención SAT dependiente
      anticipos_otros: 0.00,
      total_deducciones: 478.95,
      liquido_a_recibir: 7071.05,
      estado: 'pagado',
      fecha_pago: '2026-11-15'
    }
  ]);

  // Suspensiones (sincronizado con Suspension.php en Laravel)
  const [suspensiones, setSuspensiones] = useState<SuspensionEmpleado[]>([
    {
      id_suspension: 1,
      id_empleado: 3,
      empleado_nombre: 'Roberto Gómez Pérez',
      fecha_inicio: '2026-11-05',
      fecha_fin: '2026-11-18',
      dias_suspension: 14,
      motivo: 'IGSS Accidente',
      descripcion: 'Accidente en motocicleta en trayecto a laborar. Constancia médica IGSS #89451.',
      estado: 'activa'
    },
    {
      id_suspension: 2,
      id_empleado: 2,
      empleado_nombre: 'Sofía Andrea Castillo',
      fecha_inicio: '2026-08-01',
      fecha_fin: '2026-08-04',
      dias_suspension: 4,
      motivo: 'IGSS Enfermedad Común',
      descripcion: 'Reposo médico por cuadro gripal severo.',
      estado: 'finalizada'
    }
  ]);

  // Horarios de Trabajo (sincronizado con Horario.php y HorarioDia.php en Laravel)
  const [horarios, setHorarios] = useState<HorarioEmpleado[]>([
    {
      id_horario: 1,
      nombre_turno: 'Turno Diurno Completo (Administrativo)',
      hora_entrada: '08:00 AM',
      hora_salida: '05:00 PM',
      dias_laborales: 'Lunes a Viernes',
      horas_semanales: 40,
      tolerancia_minutos: 10,
      horas_diarias: '9h 00m',
      empleados_asignados: 8
    },
    {
      id_horario: 2,
      nombre_turno: 'Turno Tienda / POS Rotativo',
      hora_entrada: '08:30 AM',
      hora_salida: '06:30 PM',
      dias_laborales: 'Lunes a Sábado',
      horas_semanales: 44,
      tolerancia_minutos: 15,
      horas_diarias: '10h 00m',
      empleados_asignados: 12
    },
    {
      id_horario: 3,
      nombre_turno: 'Turno Bodega / Despacho Matutino',
      hora_entrada: '06:00 AM',
      hora_salida: '03:00 PM',
      dias_laborales: 'Lunes a Viernes',
      horas_semanales: 40,
      tolerancia_minutos: 5,
      horas_diarias: '9h 00m',
      empleados_asignados: 4
    }
  ]);

  // Formulario nueva suspensión
  const [newSuspension, setNewSuspension] = useState({
    id_empleado: 1,
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_fin: new Date().toISOString().split('T')[0],
    dias_suspension: 1,
    motivo: 'IGSS Enfermedad Común' as const,
    descripcion: ''
  });

  // Formulario nuevo horario con selector específico de horas y tolerancia (Laravel Horario.php)
  const [newHorario, setNewHorario] = useState({
    nombre_turno: '',
    hora_entrada: '08:00',
    hora_salida: '17:00',
    dias_laborales: 'Lunes a Viernes',
    horas_semanales: 40,
    tolerancia_minutos: 10
  });

  const [empleados, setEmpleados] = useState<EmpleadoItem[]>([
    {
      id: 1,
      nombre: 'Juan Carlos Morales',
      dpi: '2450 89124 0101',
      puesto: 'Cajero Principal / POS',
      sucursal: 'Sucursal Central',
      salarioBase: 3650.00,
      fechaIngreso: '15/01/2024',
      estado: 'Activo',
      telefono: '+502 5412-8920',
      email: 'juan.morales@integrapro.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      nombre: 'Sofía Andrea Castillo',
      dpi: '1890 44102 0101',
      puesto: 'Encargada de Bodega e Inventario',
      sucursal: 'Sucursal Central',
      salarioBase: 4200.00,
      fechaIngreso: '01/06/2023',
      estado: 'Activo',
      telefono: '+502 4120-7789',
      email: 'sofia.castillo@integrapro.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      nombre: 'Roberto Gómez Pérez',
      dpi: '3012 99420 0101',
      puesto: 'Vendedor de Mostrador',
      sucursal: 'Sucursal Norte',
      salarioBase: 3500.00,
      fechaIngreso: '10/03/2025',
      estado: 'Activo',
      telefono: '+502 5900-3341',
      email: 'roberto.gomez@integrapro.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      nombre: 'Elena María Reyes',
      dpi: '2210 11540 0101',
      puesto: 'Gerente de Sucursal',
      sucursal: 'Sucursal Sur',
      salarioBase: 6500.00,
      fechaIngreso: '01/02/2022',
      estado: 'Vacaciones',
      telefono: '+502 4432-1100',
      email: 'elena.reyes@integrapro.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  // Registro de asistencias y Kiosco (Laravel: Asistencia.php y MarcarAsistencia.php)
  const [asistenciasList, setAsistenciasList] = useState<AsistenciaItem[]>([
    { id: 1, empleado: 'Juan Carlos Morales', puesto: 'Cajero Principal', sucursal: 'Central', fecha: '16/11/2026', horaEntrada: '07:55 AM', horaSalida: '---', horasTrabajadas: 'En turno', estado: 'Puntual' },
    { id: 2, empleado: 'Sofía Andrea Castillo', puesto: 'Encargada de Bodega', sucursal: 'Central', fecha: '16/11/2026', horaEntrada: '08:00 AM', horaSalida: '---', horasTrabajadas: 'En turno', estado: 'Puntual' },
    { id: 3, empleado: 'Roberto Gómez Pérez', puesto: 'Vendedor Mostrador', sucursal: 'Norte', fecha: '16/11/2026', horaEntrada: '08:14 AM', horaSalida: '---', horasTrabajadas: 'En turno', estado: 'Tarde' },
    { id: 4, empleado: 'Elena María Reyes', puesto: 'Gerente Sucursal', sucursal: 'Sur', fecha: '16/11/2026', horaEntrada: '---', horaSalida: '---', horasTrabajadas: '0h', estado: 'Falta' },
  ]);

  const handleMarcarEntrada = (empId: number) => {
    const emp = empleados.find(e => e.id === empId);
    if (!emp) return;

    const now = new Date();
    const horaActualStr = formatTime(now);
    const isLate = now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 10);
    const estado = isLate ? 'Tarde' : 'Puntual';

    const existingIndex = asistenciasList.findIndex(a => a.empleado === emp.nombre && a.fecha === '16/11/2026');
    if (existingIndex >= 0) {
      if (asistenciasList[existingIndex].horaEntrada !== '---') {
        showToast(`El colaborador ${emp.nombre} ya tiene registrada su hora de entrada (${asistenciasList[existingIndex].horaEntrada}).`);
        return;
      }
      const updated = [...asistenciasList];
      updated[existingIndex] = {
        ...updated[existingIndex],
        horaEntrada: horaActualStr,
        horasTrabajadas: 'En turno',
        estado: estado
      };
      setAsistenciasList(updated);
    } else {
      const nuevo: AsistenciaItem = {
        id: Date.now(),
        empleado: emp.nombre,
        puesto: emp.puesto,
        sucursal: emp.sucursal.replace('Sucursal ', ''),
        fecha: '16/11/2026',
        horaEntrada: horaActualStr,
        horaSalida: '---',
        horasTrabajadas: 'En turno',
        estado: estado
      };
      setAsistenciasList([nuevo, ...asistenciasList]);
    }

    const msg = `✅ Entrada registrada a las ${horaActualStr} para ${emp.nombre} (${estado}).`;
    showToast(msg);
  };

  const handleMarcarSalida = (empId: number) => {
    const emp = empleados.find(e => e.id === empId);
    if (!emp) return;

    const now = new Date();
    const horaActualStr = formatTime(now);

    const existingIndex = asistenciasList.findIndex(a => a.empleado === emp.nombre && a.fecha === '16/11/2026');
    if (existingIndex >= 0) {
      const rec = asistenciasList[existingIndex];
      if (rec.horaEntrada === '---') {
        showToast(`No se puede marcar salida: ${emp.nombre} aún no tiene registrada su entrada.`);
        return;
      }
      if (rec.horaSalida !== '---') {
        showToast(`El colaborador ${emp.nombre} ya marcó salida hoy a las ${rec.horaSalida}.`);
        return;
      }
      const updated = [...asistenciasList];
      updated[existingIndex] = {
        ...rec,
        horaSalida: horaActualStr,
        horasTrabajadas: '8h 30m'
      };
      setAsistenciasList(updated);
      showToast(`🔴 Salida registrada a las ${horaActualStr} para ${emp.nombre}. ¡Feliz descanso!`);
    } else {
      showToast(`No se puede marcar salida sin registro previo de entrada.`);
    }
  };

  const handleSaveManualAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = empleados.find(e => e.id === Number(manualAttendance.id_empleado));
    if (!emp) return;

    const entradaFmt = manualAttendance.horaEntrada ? formatTime(manualAttendance.horaEntrada) : '---';
    const salidaFmt = manualAttendance.horaSalida ? formatTime(manualAttendance.horaSalida) : '---';
    const dur = calculateTimeDifference(manualAttendance.horaEntrada, manualAttendance.horaSalida);

    const existingIndex = asistenciasList.findIndex(a => a.empleado === emp.nombre && a.fecha === manualAttendance.fecha);
    if (existingIndex >= 0) {
      const updated = [...asistenciasList];
      updated[existingIndex] = {
        ...updated[existingIndex],
        horaEntrada: entradaFmt,
        horaSalida: salidaFmt,
        horasTrabajadas: dur.formatted || '8h 00m',
        estado: 'Puntual'
      };
      setAsistenciasList(updated);
    } else {
      const nuevo: AsistenciaItem = {
        id: Date.now(),
        empleado: emp.nombre,
        puesto: emp.puesto,
        sucursal: emp.sucursal.replace('Sucursal ', ''),
        fecha: manualAttendance.fecha,
        horaEntrada: entradaFmt,
        horaSalida: salidaFmt,
        horasTrabajadas: dur.formatted || '8h 00m',
        estado: 'Puntual'
      };
      setAsistenciasList([nuevo, ...asistenciasList]);
    }

    setShowManualAttendanceModal(false);
    showToast(`Asistencia registrada para ${emp.nombre}: Entrada ${entradaFmt} - Salida ${salidaFmt} (${dur.formatted}).`);
  };

  // Cálculo de liquidación en vivo (Sincronizado exactamente con GuatemalaStrategy.php de Laravel)
  const selectedEmpleado = empleados.find(e => e.id === calcEmpleadoId) || empleados[0];
  const salario = selectedEmpleado.salarioBase;
  const salarioDiario = salario / 30;

  // Cálculo de Tiempo Laborado entre Fecha de Ingreso y Fecha de Salida
  const parseFechaIngreso = (str: string) => {
    const parts = str.split('/');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(2024, 0, 15);
  };

  const dInicio = parseFechaIngreso(selectedEmpleado.fechaIngreso);
  const dFin = new Date(calcFechaSalida + 'T00:00:00');

  let anosLaborados = dFin.getFullYear() - dInicio.getFullYear();
  let mesesLaborados = dFin.getMonth() - dInicio.getMonth();
  let diasLaborados = dFin.getDate() - dInicio.getDate();
  if (diasLaborados < 0) {
    mesesLaborados--;
    diasLaborados += 30;
  }
  if (mesesLaborados < 0) {
    anosLaborados--;
    mesesLaborados += 12;
  }
  anosLaborados = Math.max(0, anosLaborados);
  mesesLaborados = Math.max(0, mesesLaborados);
  diasLaborados = Math.max(0, diasLaborados);
  const totalMeses = (anosLaborados * 12) + mesesLaborados;

  // 1. Indemnización (Art. 82 Código de Trabajo de GT: 1 mes de salario por año si es despido injustificado)
  let anosParaIndemnizacion = anosLaborados;
  if (mesesLaborados >= 6) {
    anosParaIndemnizacion++;
  }
  const indemnizacion = calcMotivo === 'despido_injustificado' ? (salario * anosParaIndemnizacion) : 0;

  // 2. Aguinaldo Proporcional (Decreto 76-78)
  const mesesAnoActual = dFin.getMonth() + 1;
  const aguinaldoProporcional = (salario / 12) * mesesAnoActual;

  // 3. Bono 14 Proporcional (Decreto 42-92)
  const bono14Proporcional = (salario / 12) * mesesAnoActual;

  // 4. Vacaciones Proporcionales (15 días anuales proporcionales)
  const diasVacacionesProporcionales = (15 * totalMeses) / 12;
  const vacacionesProporcionales = salarioDiario * diasVacacionesProporcionales;

  // 5. Salario proporcional del mes de salida
  const diasEnMesSalida = dFin.getDate();
  const salarioPendienteMes = salarioDiario * diasEnMesSalida;

  const totalLiquidacion = indemnizacion + aguinaldoProporcional + bono14Proporcional + vacacionesProporcionales + salarioPendienteMes;

  // Cálculo en vivo de la jornada laboral entre Entrada y Salida
  const horarioCalculado = calculateTimeDifference(newHorario.hora_entrada, newHorario.hora_salida);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Formulario nuevo colaborador con fotografía
  const [photoMode, setPhotoMode] = useState<'file' | 'url'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newEmployee, setNewEmployee] = useState({
    nombre: '',
    dpi: '',
    puesto: '',
    sucursal: 'Sucursal Central',
    salarioBase: '',
    fechaIngreso: '16/11/2026',
    fechaSalida: '',
    telefono: '',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEmployee(prev => ({ ...prev, avatar: reader.result as string }));
        showToast(`Fotografía "${file.name}" cargada correctamente.`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegisterEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = empleados.length + 1;
    const tieneBaja = newEmployee.fechaSalida && newEmployee.fechaSalida.trim().length >= 8;
    const nuevo: EmpleadoItem = {
      id: newId,
      nombre: newEmployee.nombre,
      dpi: newEmployee.dpi || `2900 ${Math.floor(10000 + Math.random() * 90000)} 0101`,
      puesto: newEmployee.puesto,
      sucursal: newEmployee.sucursal,
      salarioBase: parseFloat(newEmployee.salarioBase) || 3650.00,
      fechaIngreso: newEmployee.fechaIngreso,
      fechaSalida: newEmployee.fechaSalida || undefined,
      estado: tieneBaja ? 'Baja' : 'Activo',
      telefono: newEmployee.telefono || '+502 5555-0000',
      email: newEmployee.email || `${newEmployee.nombre.toLowerCase().replace(/\s+/g, '.')}@integrapro.com`,
      avatar: newEmployee.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    };
    setEmpleados([...empleados, nuevo]);
    setShowNewEmployeeModal(false);
    showToast(`Colaborador "${nuevo.nombre}" registrado exitosamente.`);
    setNewEmployee({
      nombre: '',
      dpi: '',
      puesto: '',
      sucursal: 'Sucursal Central',
      salarioBase: '',
      fechaIngreso: '16/11/2026',
      fechaSalida: '',
      telefono: '',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    });
  };

  const handleSaveSuspension = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = empleados.find(emp => emp.id === Number(newSuspension.id_empleado));
    if (!emp) return;

    const creada: SuspensionEmpleado = {
      id_suspension: Date.now(),
      id_empleado: emp.id,
      empleado_nombre: emp.nombre,
      fecha_inicio: newSuspension.fecha_inicio,
      fecha_fin: newSuspension.fecha_fin,
      dias_suspension: Number(newSuspension.dias_suspension),
      motivo: newSuspension.motivo,
      descripcion: newSuspension.descripcion || 'Registro de suspensión laboral',
      estado: 'activa'
    };

    setSuspensiones([creada, ...suspensiones]);
    // Actualizar estado del colaborador
    setEmpleados(empleados.map(e => e.id === emp.id ? { ...e, estado: 'Suspendido' } : e));
    setShowNewSuspensionModal(false);
    showToast(`Suspensión registrada para ${emp.nombre}.`);
    setNewSuspension({
      id_empleado: 1,
      fecha_inicio: new Date().toISOString().split('T')[0],
      fecha_fin: new Date().toISOString().split('T')[0],
      dias_suspension: 1,
      motivo: 'IGSS Enfermedad Común',
      descripcion: ''
    });
  };

  const handleSaveHorario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHorario.nombre_turno) return;
    const dur = calculateTimeDifference(newHorario.hora_entrada, newHorario.hora_salida);
    const creado: HorarioEmpleado = {
      id_horario: Date.now(),
      nombre_turno: newHorario.nombre_turno,
      hora_entrada: newHorario.hora_entrada,
      hora_salida: newHorario.hora_salida,
      dias_laborales: newHorario.dias_laborales,
      horas_semanales: Number(newHorario.horas_semanales) || 40,
      tolerancia_minutos: Number(newHorario.tolerancia_minutos) || 10,
      horas_diarias: dur.formatted,
      empleados_asignados: 0
    };
    setHorarios([...horarios, creado]);
    setShowNewHorarioModal(false);
    showToast(`Turno "${creado.nombre_turno}" registrado exitosamente (${dur.formatted}/día, ±${creado.tolerancia_minutos} min tolerancia).`);
    setNewHorario({
      nombre_turno: '',
      hora_entrada: '08:00',
      hora_salida: '17:00',
      dias_laborales: 'Lunes a Viernes',
      horas_semanales: 40,
      tolerancia_minutos: 10
    });
  };

  const filteredEmpleados = empleados.filter(e => 
    e.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.dpi.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      
      {/* Toast de Notificación */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{notificationToast}</span>
        </div>
      )}

      {/* Cabecera Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            Recursos Humanos & Planilla
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Control Laboral
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Gestión de personal, control de asistencias y simulador de liquidaciones laborales</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            type="button" 
            onClick={() => setShowSettlementModal(true)}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-purple-600" />
            <span>Calcular Liquidación</span>
          </button>

          <button 
            type="button" 
            onClick={() => setShowNewEmployeeModal(true)}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/25 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nuevo Colaborador</span>
          </button>
        </div>
      </div>

      {/* Métricas de RRHH */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Planilla Activa</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{empleados.length} Colaboradores</p>
            <span className="text-[11px] font-semibold text-emerald-600">3 sucursales cubiertas</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <UserPlus className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Costo Mensual Nómina</span>
            <p className="text-2xl font-black text-slate-900 mt-1">Q {empleados.reduce((a, b) => a + b.salarioBase, 0).toLocaleString('es-GT', { minimumFractionDigits: 2 })}</p>
            <span className="text-[11px] font-semibold text-slate-500">Salarios base fijos</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Puntualidad Hoy</span>
            <p className="text-2xl font-black text-slate-900 mt-1">75%</p>
            <span className="text-[11px] font-semibold text-amber-600">1 llegada tarde</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vacaciones / Permisos</span>
            <p className="text-2xl font-black text-purple-600 mt-1">1 en descanso</p>
            <span className="text-[11px] font-semibold text-purple-700">Elena Reyes (Suc. Sur)</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Selector de Pestañas & Buscador */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('empleados')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'empleados'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Directorio ({empleados.length})
            </button>
            <button
              onClick={() => setActiveTab('asistencias')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'asistencias'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Control de Asistencias</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-extrabold">
                Auditoría
              </span>
            </button>
            <button
              onClick={() => setActiveTab('nomina')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'nomina'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Nómina & Sueldos
            </button>
            <button
              onClick={() => setActiveTab('liquidaciones')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'liquidaciones'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Liquidaciones (Art. 82)
            </button>
            <button
              onClick={() => setActiveTab('suspensiones')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'suspensiones'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Suspensiones IGSS ({suspensiones.filter(s => s.estado === 'activa').length})
            </button>
            <button
              onClick={() => setActiveTab('horarios')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'horarios'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Horarios & Turnos
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar colaborador o puesto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* PESTAÑA 1: Directorio de Empleados */}
      {activeTab === 'empleados' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredEmpleados.map((emp) => (
            <div key={emp.id} className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div 
                    onClick={() => setEnlargedEmployee(emp)}
                    className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 cursor-zoom-in hover:ring-2 hover:ring-purple-500 hover:scale-105 transition-all relative group/img"
                    title="Clic para ampliar fotografía del colaborador"
                  >
                    <img src={emp.avatar} alt={emp.nombre} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-slate-900 truncate">{emp.nombre}</h3>
                    <p className="text-[11px] font-bold text-purple-600 truncate">{emp.puesto}</p>
                    <span className="text-[10px] text-slate-400 block">{emp.sucursal}</span>
                  </div>
                </div>

                <div className="py-3 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">DPI:</span>
                    <span className="font-semibold">{emp.dpi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ingreso:</span>
                    <span className="font-semibold">{emp.fechaIngreso}</span>
                  </div>
                  {emp.fechaSalida && (
                    <div className="flex justify-between text-rose-600 font-semibold">
                      <span className="text-slate-400">Salida / Baja:</span>
                      <span>{emp.fechaSalida}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Teléfono:</span>
                    <span className="font-semibold">{emp.telefono}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-100">
                    <span className="text-slate-400">Salario:</span>
                    <span className="font-black text-slate-900">Q {emp.salarioBase.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  emp.estado === 'Activo' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : emp.estado === 'Baja'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-purple-50 text-purple-700 border border-purple-200'
                }`}>
                  {emp.estado}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setCalcEmpleadoId(emp.id);
                    setShowSettlementModal(true);
                  }}
                  className="text-[11px] font-bold text-purple-600 hover:text-purple-800"
                >
                  Simular Finiquito →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PESTAÑA 2: Auditoría Central de Asistencias */}
      {activeTab === 'asistencias' && (
        <div className="space-y-4">
          {/* Banner Resumen de Asistencias Diarias (Auditoría Gerencial) */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Auditoría de Puntualidad & Jornada Laboral
              </span>
              <h2 className="text-base font-black tracking-tight">Bitácora Central de Asistencias del Personal</h2>
              <p className="text-xs text-slate-300">
                Consulta y fiscalización de entradas y salidas registradas desde la terminal autónoma del Reloj Checador.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Marcajes en Reloj Checador
              </span>
            </div>
          </div>

          {/* Tabla de Registros de Asistencia */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                Marcajes del Día • 16 de Noviembre de 2026
              </h3>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowManualAttendanceModal(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  title="Registrar o ajustar hora de marcaje con el selector específico"
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Ajuste / Marcaje Manual</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTimeFormat}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  title="Alternar formato de hora (12h / 24h)"
                >
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-[11px]">{timeFormat === '12h' ? '12H (AM/PM)' : '24H'}</span>
                </button>
                <span className="text-[11px] text-slate-400 font-medium">
                  {asistenciasList.filter(a => a.horaEntrada !== '---').length} presentes
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Colaborador</th>
                    <th className="py-3.5 px-4">Puesto / Sucursal</th>
                    <th className="py-3.5 px-4">Fecha</th>
                    <th className="py-3.5 px-4">Hora Entrada ({timeFormat.toUpperCase()})</th>
                    <th className="py-3.5 px-4">Hora Salida ({timeFormat.toUpperCase()})</th>
                    <th className="py-3.5 px-4">Horas Cumplidas</th>
                    <th className="py-3.5 px-4 text-center">Estado</th>
                    <th className="py-3.5 px-4 text-center">Geocerca GPS</th>
                    <th className="py-3.5 px-4 text-center">Marcaje Rápido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {asistenciasList.map((a) => {
                    const empObj = empleados.find(e => e.nombre === a.empleado);
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{a.empleado}</td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-slate-700">{a.puesto}</p>
                          <p className="text-[11px] text-slate-400">Sucursal {a.sucursal}</p>
                        </td>
                        <td className="py-3 px-4 text-slate-500">{a.fecha}</td>
                        <td className="py-3 px-4 font-bold text-slate-700">{formatTime(a.horaEntrada)}</td>
                        <td className="py-3 px-4 text-slate-500">{formatTime(a.horaSalida)}</td>
                        <td className="py-3 px-4 font-semibold text-slate-600">{a.horasTrabajadas}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            a.estado === 'Puntual' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            a.estado === 'Tarde' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {a.estado}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            <MapPin className="w-3 h-3 text-indigo-600" />
                            <span>En Sede (a 8m)</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {empObj && (
                            <div className="flex items-center justify-center gap-1.5">
                              {a.horaEntrada === '---' ? (
                                <button
                                  type="button"
                                  onClick={() => handleMarcarEntrada(empObj.id)}
                                  className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[10px] border border-emerald-200 transition-colors"
                                >
                                  Entrada
                                </button>
                              ) : a.horaSalida === '---' ? (
                                <button
                                  type="button"
                                  onClick={() => handleMarcarSalida(empObj.id)}
                                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-[10px] border border-rose-200 transition-colors"
                                >
                                  Salida
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-medium">Turno completado</span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: Simulador de Liquidación Laboral Integrado */}
      {activeTab === 'liquidaciones' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Calculadora Laboral de Liquidaciones (Leyes de Guatemala)</h2>
              <p className="text-xs text-slate-400">Cálculo exacto de Indemnización, Aguinaldo, Bono 14 y Vacaciones</p>
            </div>
          </div>

          {/* Formulario de Entrada Idéntico a Laravel Backend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Colaborador *</label>
              <select
                value={calcEmpleadoId}
                onChange={(e) => setCalcEmpleadoId(parseInt(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {empleados.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.nombre} (Q{emp.salarioBase})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Fecha de Ingreso</label>
              <input
                type="text"
                disabled
                value={selectedEmpleado.fechaIngreso}
                className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Fecha de Salida / Baja *</label>
              <input
                type="date"
                required
                value={calcFechaSalida}
                onChange={(e) => setCalcFechaSalida(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Motivo de Salida *</label>
              <select
                value={calcMotivo}
                onChange={(e) => setCalcMotivo(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="despido_injustificado">Despido Injustificado (Con Indemnización)</option>
                <option value="despido_justificado">Despido Justificado (Solo Prestaciones)</option>
                <option value="renuncia">Renuncia Voluntaria (Solo Prestaciones)</option>
              </select>
            </div>
          </div>

          {/* Banner de Tiempo de Servicio Oficial */}
          <div className="mb-6 p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                GT
              </div>
              <div>
                <p className="text-xs font-black text-purple-900">Tiempo de Servicio Computado:</p>
                <p className="text-sm font-extrabold text-purple-700">
                  {anosLaborados} años, {mesesLaborados} meses y {diasLaborados} días
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-purple-600 bg-white px-3 py-1 rounded-full border border-purple-200 shadow-sm">
              Código de Trabajo GT (Art. 82)
            </span>
          </div>

          {/* Desglose de Prestaciones de Ley */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
            <div className="flex justify-between py-1 text-slate-600">
              <span>Salario Base Mensual Registrado:</span>
              <span className="font-bold text-slate-900">Q {salario.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-600">
              <span>Salario Diario (Base / 30 días):</span>
              <span className="font-bold text-slate-900">Q {salarioDiario.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-t border-slate-200/60">
              <span className="text-slate-700 font-medium">1. Indemnización por Tiempo Servido:</span>
              <span className="font-bold text-slate-900">Q {indemnizacion.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-600">
              <span>2. Aguinaldo Proporcional (Decreto 76-78):</span>
              <span className="font-bold text-slate-900">Q {aguinaldoProporcional.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-600">
              <span>3. Bono 14 Proporcional (Decreto 42-92):</span>
              <span className="font-bold text-slate-900">Q {bono14Proporcional.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-600">
              <span>4. Vacaciones Proporcionales (15 días hábiles):</span>
              <span className="font-bold text-slate-900">Q {vacacionesProporcionales.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-600">
              <span>5. Salario Pendiente ({diasEnMesSalida} días trabajados en mes de salida):</span>
              <span className="font-bold text-slate-900">Q {salarioPendienteMes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t-2 border-slate-300 text-sm font-black text-slate-900">
              <span>TOTAL NETO DE LIQUIDACIÓN / FINIQUITO:</span>
              <span className="text-purple-700 text-lg">Q {totalLiquidacion.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA: Planilla de Sueldos & Nómina Legal */}
      {activeTab === 'nomina' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                Planilla de Sueldos Quincenal (Código de Trabajo & IGSS Guatemala)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Cálculo de Salario Base, Bonificación Incentivo legal (Dcto. 78-89 Q250), Retención Laboral IGSS (4.83%) y Retención ISR Asalariados.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Imprimir Planilla
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Colaborador / Puesto</th>
                  <th className="py-3 px-4 text-right">Sueldo Base</th>
                  <th className="py-3 px-4 text-right">Bono Incentivo (Q250)</th>
                  <th className="py-3 px-4 text-right">Comisiones / Extras</th>
                  <th className="py-3 px-4 text-right">Total Devengado</th>
                  <th className="py-3 px-4 text-right text-rose-600">IGSS (4.83%)</th>
                  <th className="py-3 px-4 text-right text-amber-600">Retención ISR</th>
                  <th className="py-3 px-4 text-right font-black text-purple-700">Líquido a Recibir</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {nominas.map((nom) => (
                  <tr key={nom.id_pago} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{nom.empleado_nombre}</div>
                      <div className="text-[10px] text-slate-400">{nom.puesto}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium">Q{nom.salario_base.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-emerald-600">Q{nom.bonificacion_incentivo.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-right text-slate-600">Q{nom.comisiones_extras.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-800">Q{nom.total_devengado.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-rose-600">(Q{nom.descuento_igss.toFixed(2)})</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-amber-600">
                      {nom.retencion_isr > 0 ? `(Q${nom.retencion_isr.toFixed(2)})` : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-purple-700 text-sm">
                      Q{nom.liquido_a_recibir.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        {nom.estado === 'pagado' ? 'Pagado Banco' : 'En Proceso'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-200 text-xs text-slate-900">
                <tr>
                  <td className="py-3 px-4">TOTAL PLANILLA:</td>
                  <td className="py-3 px-4 text-right">Q{nominas.reduce((a, b) => a + b.salario_base, 0).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-emerald-600">Q{nominas.reduce((a, b) => a + b.bonificacion_incentivo, 0).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">Q{nominas.reduce((a, b) => a + b.comisiones_extras, 0).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">Q{nominas.reduce((a, b) => a + b.total_devengado, 0).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-rose-600">(Q{nominas.reduce((a, b) => a + b.descuento_igss, 0).toFixed(2)})</td>
                  <td className="py-3 px-4 text-right text-amber-600">(Q{nominas.reduce((a, b) => a + b.retencion_isr, 0).toFixed(2)})</td>
                  <td className="py-3 px-4 text-right text-purple-700 font-black text-sm">
                    Q{nominas.reduce((a, b) => a + b.liquido_a_recibir, 0).toFixed(2)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* PESTAÑA: Suspensiones de Empleados (IGSS & Disciplinarias) */}
      {activeTab === 'suspensiones' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Control de Suspensiones Laborales & Subsidios IGSS
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Registro de incapacidades temporales emitidas por el IGSS (enfermedad común, maternidad, accidentes) y suspensiones disciplinarias.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowNewSuspensionModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Registrar Suspensión
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Colaborador</th>
                  <th className="py-3 px-4">Motivo Suspensión</th>
                  <th className="py-3 px-4">Fecha Inicio</th>
                  <th className="py-3 px-4">Fecha Fin</th>
                  <th className="py-3 px-4 text-center">Días de Baja</th>
                  <th className="py-3 px-4">Observaciones / Dictamen</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suspensiones.map((susp) => (
                  <tr key={susp.id_suspension} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{susp.empleado_nombre}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                        {susp.motivo}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{susp.fecha_inicio}</td>
                    <td className="py-3.5 px-4">{susp.fecha_fin}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">{susp.dias_suspension} días</td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs">{susp.descripcion}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        susp.estado === 'activa' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {susp.estado === 'activa' ? 'Activa / En Subsidio' : 'Finalizada'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PESTAÑA: Horarios & Turnos de Trabajo */}
      {activeTab === 'horarios' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock3 className="w-5 h-5 text-indigo-600" />
                Catálogo de Turnos & Horarios Laborales
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configuración de jornadas legales diurnas (44 hrs semanales) y turnos rotativos por sucursal.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTimeFormat}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                title="Cambiar formato de hora (12h AM/PM vs 24h)"
              >
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{timeFormat === '12h' ? 'Formato: 12H (AM/PM)' : 'Formato: 24 Horas'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNewHorarioModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Nuevo Turno
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {horarios.map((hor) => (
              <div key={hor.id_horario} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-100 text-indigo-700">
                      {hor.horas_semanales} hrs / semana
                    </span>
                    <span className="text-xs font-bold text-slate-500">{hor.empleados_asignados} asignados</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-2">{hor.nombre_turno}</h3>
                  <p className="text-xs text-slate-500 mt-1">{hor.dias_laborales}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold">Entrada ({timeFormat.toUpperCase()}):</span>
                      <span className="font-black text-slate-900 font-mono text-xs">{formatTime(hor.hora_entrada)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] font-semibold">Salida ({timeFormat.toUpperCase()}):</span>
                      <span className="font-black text-slate-900 font-mono text-xs">{formatTime(hor.hora_salida)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="font-medium">
                      ⏱️ Jornada: <strong className="font-bold text-slate-800">{hor.horas_diarias || calculateTimeDifference(hor.hora_entrada, hor.hora_salida).formatted}</strong>
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-[10px]">
                      ±{hor.tolerancia_minutos || 10}m tol.
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Nueva Suspensión */}
      {showNewSuspensionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Registrar Suspensión Laboral
              </h3>
              <button onClick={() => setShowNewSuspensionModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSuspension} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Colaborador:</label>
                <select
                  value={newSuspension.id_empleado}
                  onChange={(e) => setNewSuspension({ ...newSuspension, id_empleado: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  {empleados.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.nombre} - {emp.puesto}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Motivo:</label>
                <select
                  value={newSuspension.motivo}
                  onChange={(e) => setNewSuspension({ ...newSuspension, motivo: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="IGSS Enfermedad Común">IGSS Enfermedad Común</option>
                  <option value="IGSS Accidente">IGSS Accidente</option>
                  <option value="IGSS Maternidad">IGSS Maternidad</option>
                  <option value="Sanción Disciplinaria">Sanción Disciplinaria (Sin goce)</option>
                  <option value="Permiso sin goce de sueldo">Permiso sin goce de sueldo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fecha Inicio:</label>
                  <input
                    type="date"
                    required
                    value={newSuspension.fecha_inicio}
                    onChange={(e) => setNewSuspension({ ...newSuspension, fecha_inicio: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fecha Fin:</label>
                  <input
                    type="date"
                    required
                    value={newSuspension.fecha_fin}
                    onChange={(e) => setNewSuspension({ ...newSuspension, fecha_fin: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Días de Suspensión:</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newSuspension.dias_suspension}
                  onChange={(e) => setNewSuspension({ ...newSuspension, dias_suspension: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Observaciones / No. Boleta IGSS:</label>
                <input
                  type="text"
                  placeholder="Ej. Constancia de reposo IGSS #7841"
                  value={newSuspension.descripcion}
                  onChange={(e) => setNewSuspension({ ...newSuspension, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewSuspensionModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Guardar Suspensión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Nuevo Horario */}
      {showNewHorarioModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock3 className="w-5 h-5 text-indigo-600" />
                Registrar Nuevo Turno & Horario
              </h3>
              <button onClick={() => setShowNewHorarioModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHorario} className="p-5 space-y-4 text-xs">
              {/* Plantillas Rápidas de Horarios */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Plantillas Predefinidas:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setNewHorario({
                      nombre_turno: 'Turno Diurno Completo (Administrativo)',
                      hora_entrada: '08:00',
                      hora_salida: '17:00',
                      dias_laborales: 'Lunes a Viernes',
                      horas_semanales: 40,
                      tolerancia_minutos: 10
                    })}
                    className="p-2 text-left bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-xl text-[10px] transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-slate-800 block">Oficina / Administrativo</span>
                    <span className="text-slate-400">8:00 AM - 5:00 PM (40 hrs)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewHorario({
                      nombre_turno: 'Turno Tienda / POS Rotativo',
                      hora_entrada: '08:30',
                      hora_salida: '18:30',
                      dias_laborales: 'Lunes a Sábado',
                      horas_semanales: 44,
                      tolerancia_minutos: 15
                    })}
                    className="p-2 text-left bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-xl text-[10px] transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-slate-800 block">Tienda / POS Rotativo</span>
                    <span className="text-slate-400">8:30 AM - 6:30 PM (44 hrs)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewHorario({
                      nombre_turno: 'Turno Bodega / Despacho Matutino',
                      hora_entrada: '06:00',
                      hora_salida: '15:00',
                      dias_laborales: 'Lunes a Viernes',
                      horas_semanales: 40,
                      tolerancia_minutos: 5
                    })}
                    className="p-2 text-left bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-xl text-[10px] transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-slate-800 block">Bodega Matutina</span>
                    <span className="text-slate-400">6:00 AM - 3:00 PM (40 hrs)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewHorario({
                      nombre_turno: 'Turno Cierre Nocturno',
                      hora_entrada: '13:00',
                      hora_salida: '21:30',
                      dias_laborales: 'Lunes a Sábado',
                      horas_semanales: 44,
                      tolerancia_minutos: 10
                    })}
                    className="p-2 text-left bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-xl text-[10px] transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-slate-800 block">Cierre Nocturno</span>
                    <span className="text-slate-400">1:00 PM - 9:30 PM (44 hrs)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre del Turno:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Turno Vespertino Tienda"
                  value={newHorario.nombre_turno}
                  onChange={(e) => setNewHorario({ ...newHorario, nombre_turno: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Selectores Específicos de Entrada y Salida */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SpecificTimePicker
                  label="Hora de Entrada"
                  required
                  value={newHorario.hora_entrada}
                  onChange={(val) => setNewHorario({ ...newHorario, hora_entrada: val })}
                  helperText="Inicio exacto del turno"
                />

                <SpecificTimePicker
                  label="Hora de Salida"
                  required
                  value={newHorario.hora_salida}
                  onChange={(val) => setNewHorario({ ...newHorario, hora_salida: val })}
                  helperText="Fin exacto del turno"
                />
              </div>

              {/* Indicador de cálculo dinámico de jornada */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-indigo-900 font-semibold">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Jornada diaria estimada: <strong className="text-indigo-950 font-black">{horarioCalculado.formatted}</strong></span>
                </div>
                {horarioCalculado.isOvernight && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    Cruza medianoche
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Días Laborales:</label>
                  <input
                    type="text"
                    required
                    placeholder="Lunes a Sábado"
                    value={newHorario.dias_laborales}
                    onChange={(e) => setNewHorario({ ...newHorario, dias_laborales: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Horas Semanales:</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    required
                    value={newHorario.horas_semanales}
                    onChange={(e) => setNewHorario({ ...newHorario, horas_semanales: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tolerancia de Entrada (Laravel: tolerancia_entrada) */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tolerancia de Entrada (Cortesía de puntualidad):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setNewHorario({ ...newHorario, tolerancia_minutos: mins })}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        newHorario.tolerancia_minutos === mins
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Minutos después de la hora de entrada antes de calificar como "Tarde" en el reloj checador.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewHorarioModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  Guardar Horario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Ajuste / Marcaje Manual de Asistencia */}
      {showManualAttendanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Ajuste / Marcaje Manual de Asistencia
              </h3>
              <button onClick={() => setShowManualAttendanceModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveManualAttendance} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Colaborador:</label>
                <select
                  value={manualAttendance.id_empleado}
                  onChange={(e) => setManualAttendance({ ...manualAttendance, id_empleado: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 font-semibold"
                >
                  {empleados.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.nombre} — {emp.puesto}</option>
                  ))}
                </select>
              </div>

              <div>
                <DateInputWithCalendar
                  label="Fecha de la Asistencia"
                  required
                  value={manualAttendance.fecha}
                  onChange={(val) => setManualAttendance({ ...manualAttendance, fecha: val })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SpecificTimePicker
                  label="Hora de Entrada"
                  required
                  value={manualAttendance.horaEntrada}
                  onChange={(val) => setManualAttendance({ ...manualAttendance, horaEntrada: val })}
                  helperText="Hora exacta de ingreso"
                />

                <SpecificTimePicker
                  label="Hora de Salida"
                  required
                  value={manualAttendance.horaSalida}
                  onChange={(val) => setManualAttendance({ ...manualAttendance, horaSalida: val })}
                  helperText="Hora exacta de salida"
                />
              </div>

              {/* Cálculo en vivo de la jornada */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Tiempo computado:</span>
                <span className="font-bold text-indigo-700 font-mono">
                  {calculateTimeDifference(manualAttendance.horaEntrada, manualAttendance.horaSalida).formatted}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowManualAttendanceModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  Registrar Asistencia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showNewEmployeeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Registrar Nuevo Colaborador</h3>
              <button onClick={() => setShowNewEmployeeModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleRegisterEmployee} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Sección de Fotografía del Colaborador con Selector de Archivo Local */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Fotografía del Colaborador *
                  </label>
                  {/* Selector de modo */}
                  <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-lg text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setPhotoMode('file')}
                      className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
                        photoMode === 'file'
                          ? 'bg-white text-purple-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Upload className="w-3 h-3" />
                      <span>Subir de PC</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoMode('url')}
                      className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
                        photoMode === 'url'
                          ? 'bg-white text-purple-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>Enlace Web</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Avatar con botón de cámara */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-16 h-16 rounded-2xl bg-white border-2 border-purple-200 overflow-hidden shrink-0 shadow-sm cursor-pointer relative group/avatar"
                    title="Haz clic para seleccionar foto de tu equipo"
                  >
                    {newEmployee.avatar ? (
                      <img src={newEmployee.avatar} alt="Foto previa" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                        <Camera className="w-6 h-6" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-bold">
                      <Camera className="w-3.5 h-3.5 mb-0.5" />
                      Cambiar
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Input invisible para abrir explorador de Windows */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {photoMode === 'file' ? (
                      <div className="space-y-1.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-2.5 px-3 bg-white hover:bg-purple-50 hover:border-purple-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-purple-600" />
                          <span>Seleccionar Foto desde mi Computadora</span>
                        </button>
                        <p className="text-[10px] text-slate-400">Formatos soportados: JPG, PNG, WEBP de tu disco local</p>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="url"
                          placeholder="https://ejemplo.com/foto.jpg"
                          value={newEmployee.avatar}
                          onChange={(e) => setNewEmployee({ ...newEmployee, avatar: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <span className="text-[10px] text-slate-400 block mt-1">Pega el link directo a una imagen</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Nombre y DPI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Roberto Méndez"
                    value={newEmployee.nombre}
                    onChange={(e) => setNewEmployee({ ...newEmployee, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">DPI / CUI *</label>
                  <input
                    type="text"
                    required
                    placeholder="2900 12345 0101"
                    value={newEmployee.dpi}
                    onChange={(e) => setNewEmployee({ ...newEmployee, dpi: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Puesto Operativo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Vendedor / Cajero"
                    value={newEmployee.puesto}
                    onChange={(e) => setNewEmployee({ ...newEmployee, puesto: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Sucursal y Salario */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Sucursal Asignada *</label>
                  <select
                    value={newEmployee.sucursal}
                    onChange={(e) => setNewEmployee({ ...newEmployee, sucursal: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Sucursal Central">Sucursal Central</option>
                    <option value="Sucursal Norte">Sucursal Norte</option>
                    <option value="Sucursal Sur">Sucursal Sur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Salario Base Mensual (Q) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="3650.00"
                    value={newEmployee.salarioBase}
                    onChange={(e) => setNewEmployee({ ...newEmployee, salarioBase: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Teléfono y Correo Electrónico */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Teléfono de Contacto</label>
                  <input
                    type="text"
                    placeholder="+502 5555-1234"
                    value={newEmployee.telefono}
                    onChange={(e) => setNewEmployee({ ...newEmployee, telefono: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="ejemplo@integrapro.com"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Fechas Laborales: Ingreso y Salida con auto-formato de diagonal y calendario integrado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <DateInputWithCalendar
                  label="Fecha de Ingreso"
                  required
                  value={newEmployee.fechaIngreso}
                  onChange={(val) => setNewEmployee({ ...newEmployee, fechaIngreso: val })}
                  placeholder="DD/MM/AAAA"
                  helperText="Ingreso a la empresa"
                />

                <DateInputWithCalendar
                  label="Fecha de Salida / Baja"
                  value={newEmployee.fechaSalida}
                  onChange={(val) => setNewEmployee({ ...newEmployee, fechaSalida: val })}
                  placeholder="DD/MM/AAAA (Opcional)"
                  helperText="Opcional. Si se define, marcará estado Baja"
                  allowClear
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewEmployeeModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md shadow-purple-600/25 transition-all"
                >
                  Guardar y Emitir Carnet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Finiquito Express */}
      {showSettlementModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-black text-slate-900 mb-2">Simulación de Finiquito</h3>
            <p className="text-xs text-slate-500 mb-4">Colaborador: <span className="font-bold text-slate-800">{selectedEmpleado.nombre}</span></p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5 mb-4">
              <div className="flex justify-between"><span>Indemnización:</span><span className="font-bold">Q {indemnizacion.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Aguinaldo:</span><span className="font-bold">Q {aguinaldoProporcional.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Bono 14:</span><span className="font-bold">Q {bono14Proporcional.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Vacaciones:</span><span className="font-bold">Q {vacacionesProporcionales.toFixed(2)}</span></div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-black text-sm text-purple-700">
                <span>TOTAL A PAGAR:</span>
                <span>Q {totalLiquidacion.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => setShowSettlementModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Cerrar Simulación
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: Visor de Fotografía de Colaborador en Alta Resolución */}
      {enlargedEmployee && (
        <div 
          onClick={() => setEnlargedEmployee(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Cabecera del Visor */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{enlargedEmployee.nombre}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      {enlargedEmployee.puesto}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {enlargedEmployee.sucursal}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => setEnlargedEmployee(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
                title="Cerrar imagen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fotografía Ampliada Limpia */}
            <div className="p-6 bg-slate-900 flex items-center justify-center max-h-[60vh] overflow-hidden">
              <img 
                src={enlargedEmployee.avatar} 
                alt={enlargedEmployee.nombre} 
                className="max-h-[55vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Datos Clave del Colaborador */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="space-y-1 text-slate-600">
                <p>DPI: <strong className="text-slate-900">{enlargedEmployee.dpi}</strong> • Ingreso: <strong className="text-slate-900">{enlargedEmployee.fechaIngreso}</strong></p>
                <p>Salario Base: <strong className="text-purple-700">Q {enlargedEmployee.salarioBase.toFixed(2)}</strong> • Tel: <strong className="text-slate-800">{enlargedEmployee.telefono}</strong></p>
              </div>
              <button
                type="button"
                onClick={() => setEnlargedEmployee(null)}
                className="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
