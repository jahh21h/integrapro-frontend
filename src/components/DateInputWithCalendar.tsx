import React, { useRef } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DateInputWithCalendarProps {
  label: string;
  value: string; // Formato DD/MM/AAAA
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  allowClear?: boolean;
  className?: string;
}

/**
 * Convierte cualquier entrada de dígitos en formato de fecha DD/MM/AAAA insertando
 * automáticamente las diagonales '/' sin que el usuario tenga que escribirlas.
 */
export function formatDateMask(val: string): string {
  // Extrae únicamente los dígitos numéricos (máximo 8: DDMMAAAA)
  const digits = val.replace(/\D/g, '').slice(0, 8);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

/**
 * Convierte formato 'DD/MM/AAAA' a formato ISO 'AAAA-MM-DD' para el selector nativo de fecha.
 */
export function maskToIsoDate(mask: string): string {
  if (!mask) return '';
  const parts = mask.split('/');
  if (parts.length === 3 && parts[2]?.length === 4) {
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return '';
}

/**
 * Convierte formato ISO 'AAAA-MM-DD' a formato con diagonal 'DD/MM/AAAA'.
 */
export function isoDateToMask(iso: string): string {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return iso;
}

export default function DateInputWithCalendar({
  label,
  value,
  onChange,
  required = false,
  placeholder = 'DD/MM/AAAA',
  helperText,
  allowClear = false,
  className = ''
}: DateInputWithCalendarProps) {
  const hiddenDateInputRef = useRef<HTMLInputElement>(null);

  // Maneja la digitación del usuario insertando las diagonales automáticamente
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateMask(e.target.value);
    onChange(formatted);
  };

  // Maneja la selección desde el selector de calendario
  const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const masked = isoDateToMask(e.target.value);
      onChange(masked);
    }
  };

  const handleSetToday = () => {
    const today = new Date();
    const d = String(today.getDate()).padStart(2, '0');
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const y = today.getFullYear();
    onChange(`${d}/${m}/${y}`);
  };

  const handleClear = () => {
    onChange('');
  };

  const openCalendar = () => {
    if (hiddenDateInputRef.current) {
      if (typeof hiddenDateInputRef.current.showPicker === 'function') {
        hiddenDateInputRef.current.showPicker();
      } else {
        hiddenDateInputRef.current.focus();
      }
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <div className="flex items-center gap-1.5 text-[10px]">
          <button
            type="button"
            onClick={handleSetToday}
            className="text-purple-600 hover:text-purple-800 font-bold hover:underline cursor-pointer"
          >
            Hoy
          </button>
          {allowClear && value && (
            <>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-rose-600 font-medium cursor-pointer"
              >
                Limpiar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="relative flex items-center">
        {/* Campo de Texto con Formato Automático de Diagonal DD/MM/AAAA */}
        <input
          type="text"
          required={required}
          placeholder={placeholder}
          maxLength={10}
          value={value}
          onChange={handleTextChange}
          className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-inner"
        />

        {/* Botón e Icono de Calendario Integrado */}
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center">
          <button
            type="button"
            onClick={openCalendar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer relative"
            title="Abrir calendario para seleccionar fecha"
          >
            <CalendarIcon className="w-4 h-4 text-purple-600" />
            
            {/* Input nativo de tipo date superpuesto invisible para abrir el calendario en cualquier navegador */}
            <input
              ref={hiddenDateInputRef}
              type="date"
              tabIndex={-1}
              value={maskToIsoDate(value)}
              onChange={handleCalendarChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label={`Seleccionar ${label} en calendario`}
            />
          </button>
        </div>
      </div>

      {helperText ? (
        <p className="text-[11px] text-slate-400 font-medium">{helperText}</p>
      ) : (
        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
          <span>Escribe solo los números (las diagonales se insertan solas) o pulsa el icono</span>
          <CalendarIcon className="w-2.5 h-2.5 inline text-purple-500" />
        </p>
      )}
    </div>
  );
}
