import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronUp, ChevronDown, Check, Sun, Moon, Sparkles } from 'lucide-react';
import { useTimeFormat } from '../context/TimeFormatContext';
import { useLanguage } from '../context/LanguageContext';

export interface SpecificTimePickerProps {
  label: string;
  value: string; // Puede ser "08:00", "08:00 AM", "17:30", etc.
  onChange: (value: string) => void;
  required?: boolean;
  helperText?: string;
  placeholder?: string;
  className?: string;
  quickPresets?: { label: string; time: string }[];
}

/**
 * Parsea un string de hora a componentes numéricos: horas (0-23), minutos (0-59)
 */
export function parseTimeString(timeStr: string): { hour24: number; minutes: number } {
  if (!timeStr) return { hour24: 8, minutes: 0 };
  const trimmed = timeStr.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM|am|pm)?$/i);
  if (!match) return { hour24: 8, minutes: 0 };

  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const ampm = match[3] ? match[3].toUpperCase() : null;

  if (ampm === 'PM' && h < 12) {
    h += 12;
  } else if (ampm === 'AM' && h === 12) {
    h = 0;
  }

  return {
    hour24: Math.min(Math.max(h, 0), 23),
    minutes: Math.min(Math.max(m, 0), 59)
  };
}

/**
 * Calcula la duración exacta entre hora de entrada y hora de salida
 */
export function calculateTimeDifference(startTimeStr: string, endTimeStr: string): {
  hours: number;
  minutes: number;
  totalMinutes: number;
  formatted: string;
  isOvernight: boolean;
} {
  const start = parseTimeString(startTimeStr);
  const end = parseTimeString(endTimeStr);

  const startTotalMins = start.hour24 * 60 + start.minutes;
  let endTotalMins = end.hour24 * 60 + end.minutes;

  let isOvernight = false;
  if (endTotalMins < startTotalMins) {
    // Cruce de medianoche
    endTotalMins += 24 * 60;
    isOvernight = true;
  }

  const diffMinutes = endTotalMins - startTotalMins;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  let formatted = '';
  if (hours > 0 && minutes > 0) {
    formatted = `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    formatted = `${hours}h`;
  } else {
    formatted = `${minutes}m`;
  }

  return {
    hours,
    minutes,
    totalMinutes: diffMinutes,
    formatted,
    isOvernight
  };
}

export default function SpecificTimePicker({
  label,
  value,
  onChange,
  required = false,
  helperText,
  placeholder,
  className = '',
  quickPresets
}: SpecificTimePickerProps) {
  const { timeFormat } = useTimeFormat();
  const { L } = useLanguage();
  const effectivePlaceholder = placeholder ?? L('Seleccionar hora', 'Select time');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Formato local dentro del selector (permite alternar entre 12h y 24h para facilitar selección)
  const [pickerMode, setPickerMode] = useState<'12h' | '24h'>(timeFormat);

  // Parsear la hora actual
  const { hour24, minutes } = parseTimeString(value || '08:00');

  // Valores derivados para 12h
  const period: 'AM' | 'PM' = hour24 >= 12 ? 'PM' : 'AM';
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Actualiza la hora en formato 24h estándar HH:MM (que es compatible universalmente)
  const emitTime = (newH24: number, newMins: number) => {
    const safeH = Math.min(Math.max(newH24, 0), 23);
    const safeM = Math.min(Math.max(newMins, 0), 59);
    const hh = String(safeH).padStart(2, '0');
    const mm = String(safeM).padStart(2, '0');
    onChange(`${hh}:${mm}`);
  };

  // Manejar cambio de hora en 12h
  const handleSelectHour12 = (h: number) => {
    let newH24 = h;
    if (period === 'PM' && h < 12) {
      newH24 = h + 12;
    } else if (period === 'AM' && h === 12) {
      newH24 = 0;
    }
    emitTime(newH24, minutes);
  };

  // Manejar cambio de hora en 24h
  const handleSelectHour24 = (h: number) => {
    emitTime(h, minutes);
  };

  // Manejar cambio de minutos
  const handleSelectMinutes = (m: number) => {
    emitTime(hour24, m);
  };

  // Manejar cambio de AM/PM
  const handleTogglePeriod = (newPeriod: 'AM' | 'PM') => {
    if (newPeriod === period) return;
    if (newPeriod === 'PM') {
      emitTime((hour24 + 12) % 24, minutes);
    } else {
      emitTime((hour24 - 12 + 24) % 24, minutes);
    }
  };

  // Ajuste rápido con pasos de +/- 15 minutos
  const handleStepMinutes = (delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    let total = hour24 * 60 + minutes + delta;
    if (total < 0) total += 24 * 60;
    total = total % (24 * 60);
    const newH = Math.floor(total / 60);
    const newM = total % 60;
    emitTime(newH, newM);
  };

  // Asignar hora actual del sistema
  const handleSetCurrentTime = () => {
    const now = new Date();
    emitTime(now.getHours(), now.getMinutes());
  };

  // Formateo visual para el campo cerrado
  const displayFormatted12h = `${String(hour12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  const displayFormatted24h = `${String(hour24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const mainDisplay = timeFormat === '12h' ? displayFormatted12h : displayFormatted24h;
  const secondaryDisplay = timeFormat === '12h' ? `24h: ${displayFormatted24h}` : `12h: ${displayFormatted12h}`;

  // Lista de horas para 12h
  const hours12List = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Lista de minutos comunes (intervalos de 5 mins)
  const commonMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  // Presets predeterminados para turnos de trabajo
  const defaultPresets = quickPresets || [
    { label: L('06:00 AM (Bodega)', '06:00 AM (Warehouse)'), time: '06:00' },
    { label: L('08:00 AM (Oficina)', '08:00 AM (Office)'), time: '08:00' },
    { label: L('08:30 AM (Tienda)', '08:30 AM (Store)'), time: '08:30' },
    { label: L('12:00 PM (Medio Día)', '12:00 PM (Noon)'), time: '12:00' },
    { label: L('01:00 PM (Tarde)', '01:00 PM (Afternoon)'), time: '13:00' },
    { label: L('05:00 PM (Salida)', '05:00 PM (Clock Out)'), time: '17:00' },
    { label: L('06:30 PM (Cierre Tienda)', '06:30 PM (Store Close)'), time: '18:30' },
    { label: L('08:00 PM (Cierre Nocturno)', '08:00 PM (Night Close)'), time: '20:00' }
  ];

  return (
    <div className={`space-y-1 relative ${className}`} ref={containerRef}>
      {/* Etiqueta y accesos rápidos */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <span className="text-[10px] font-mono text-slate-400 font-medium">
          {secondaryDisplay}
        </span>
      </div>

      {/* Disparador / Input de Tiempo */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex-1 flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border rounded-xl text-left transition-all cursor-pointer shadow-inner ${
            isOpen 
              ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-white' 
              : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-100/60'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-black font-mono text-slate-900 tracking-wide">
                {value ? mainDisplay : effectivePlaceholder}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">
                {timeFormat === '12h' ? L('Formato 12 Horas', '12-Hour Format') : L('Formato 24 Horas', '24-Hour Format')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {timeFormat === '12h' ? period : '24H'}
            </span>
          </div>
        </button>

        {/* Micro-ajustes rápidos +/- 15 minutos */}
        <div className="flex flex-col gap-0.5">
          <button
            type="button"
            title={L('Adelantar 15 minutos', 'Forward 15 minutes')}
            onClick={(e) => handleStepMinutes(15, e)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 text-slate-500 transition-colors cursor-pointer"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title={L('Retrasar 15 minutos', 'Back 15 minutes')}
            onClick={(e) => handleStepMinutes(-15, e)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 text-slate-500 transition-colors cursor-pointer"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-400 font-medium">{helperText}</p>
      )}

      {/* POPUP / MODAL FLOTANTE ESPECÍFICO */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3.5 animate-in fade-in zoom-in-95 duration-150 min-w-[320px]">
          {/* Cabecera del selector con vista previa digital */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-indigo-700 tracking-tight">
                {pickerMode === '12h' ? displayFormatted12h : displayFormatted24h}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {pickerMode === '12h' ? L('12 Horas', '12-Hour') : L('24 Horas', '24-Hour')}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSetCurrentTime}
                className="text-[10px] font-bold px-2 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                title={L('Poner hora actual del sistema', 'Set current system time')}
              >
                <Sparkles className="w-3 h-3" />
                {L('Ahora', 'Now')}
              </button>

              <button
                type="button"
                onClick={() => setPickerMode(pickerMode === '12h' ? '24h' : '12h')}
                className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title={L('Cambiar formato en este selector', 'Switch format in this picker')}
              >
                {L('Modo:', 'Mode:')} {pickerMode.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Selector de Período AM / PM (Solo visible en 12h) */}
          {pickerMode === '12h' && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleTogglePeriod('AM')}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  period === 'AM'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                {L('AM (Mañana)', 'AM (Morning)')}
              </button>
              <button
                type="button"
                onClick={() => handleTogglePeriod('PM')}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  period === 'PM'
                    ? 'bg-indigo-900 text-white shadow-md shadow-indigo-900/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                {L('PM (Tarde / Noche)', 'PM (Afternoon / Night)')}
              </button>
            </div>
          )}

          {/* SECCIÓN 1: Cuadrícula Específica de Horas */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {L('1. Selecciona la Hora:', '1. Select Hour:')}
            </span>

            {pickerMode === '12h' ? (
              <div className="grid grid-cols-6 gap-1.5">
                {hours12List.map((h) => {
                  const isSelected = hour12 === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleSelectHour12(h)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                          : 'bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 border border-slate-200/80'
                      }`}
                    >
                      {String(h).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-1.5">
                {Array.from({ length: 24 }).map((_, h) => {
                  const isSelected = hour24 === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleSelectHour24(h)}
                      className={`py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                          : 'bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 border border-slate-200/80'
                      }`}
                    >
                      {String(h).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECCIÓN 2: Cuadrícula Específica de Minutos */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {L('2. Selecciona los Minutos:', '2. Select Minutes:')}
              </span>
              {/* Selector de Minuto Exacto manual */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400 font-medium">{L('Exacto:', 'Exact:')}</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) handleSelectMinutes(val);
                  }}
                  className="w-12 px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-center text-xs font-mono font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-1.5">
              {commonMinutes.map((m) => {
                const isSelected = minutes === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleSelectMinutes(m)}
                    className={`py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-105'
                        : 'bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200/80'
                    }`}
                  >
                    :{String(m).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECCIÓN 3: Turnos y Horarios Habituales (Presets Rápidos) */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {L('Horarios Habituales de Turno:', 'Common Shift Times:')}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {defaultPresets.map((preset) => {
                const isCurrent = (value || '').startsWith(preset.time);
                return (
                  <button
                    key={preset.time}
                    type="button"
                    onClick={() => {
                      onChange(preset.time);
                    }}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botón de Confirmación y Cierre */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">
              {L('Hora:', 'Time:')} <span className="text-slate-900 font-mono font-black">{mainDisplay}</span>
            </span>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              {L('Listo', 'Done')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
