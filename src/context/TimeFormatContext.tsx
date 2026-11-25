import React, { createContext, useContext, useState } from 'react';
import { TimeFormat } from '../types';
import { useLanguage } from './LanguageContext';

interface TimeFormatContextType {
  timeFormat: TimeFormat;
  is12h: boolean;
  is24h: boolean;
  setTimeFormat: (format: TimeFormat) => void;
  toggleTimeFormat: () => void;
  formatTime: (time: Date | string | null | undefined, includeSeconds?: boolean) => string;
  formatSchedule: (text: string | null | undefined) => string;
}

const TimeFormatContext = createContext<TimeFormatContextType | undefined>(undefined);

export function TimeFormatProvider({ children }: { children: React.ReactNode }) {
  const { locale, isEn } = useLanguage();
  const [timeFormat, setTimeFormatState] = useState<TimeFormat>(() => {
    try {
      const saved = localStorage.getItem('integrapro_time_format');
      return saved === '24h' ? '24h' : '12h';
    } catch {
      return '12h';
    }
  });

  const setTimeFormat = (format: TimeFormat) => {
    setTimeFormatState(format);
    try {
      localStorage.setItem('integrapro_time_format', format);
    } catch {
      // ignore
    }
  };

  const toggleTimeFormat = () => {
    setTimeFormat(timeFormat === '12h' ? '24h' : '12h');
  };

  // Función universal para formatear cualquier Date o string de hora en 12h o 24h
  const formatTime = (time: Date | string | null | undefined, includeSeconds: boolean = false): string => {
    if (!time) return '---';
    if (typeof time === 'string') {
      const trimmed = time.trim();
      if (trimmed === '---' || trimmed === '') return '---';
      if (trimmed.startsWith('Hace ')) {
        if (isEn) {
          return trimmed
            .replace(/^Hace\s+(.+?)\s+minutos?$/i, '$1 min ago')
            .replace(/^Hace\s+(.+?)\s+min$/i, '$1 min ago')
            .replace(/^Hace\s+(.+?)\s+horas?$/i, '$1 hr ago')
            .replace(/^Hace\s+(.+?)\s+d[ií]as?$/i, '$1d ago')
            .replace(/^Hace\s+(.+?)\s+segundos?$/i, '$1s ago')
            .replace(/^Hace\s+(.+)$/i, '$1 ago');
        }
        return trimmed;
      }
      if (/\bago$/i.test(trimmed)) return trimmed;

      // Detectar formato HH:MM o HH:MM:SS con o sin AM/PM
      const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)?$/i);
      if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const seconds = match[3];
        const ampm = match[4] ? match[4].toUpperCase() : null;

        if (ampm === 'PM' && hours < 12) {
          hours += 12;
        } else if (ampm === 'AM' && hours === 12) {
          hours = 0;
        }

        if (timeFormat === '24h') {
          const hh = String(hours).padStart(2, '0');
          return seconds && includeSeconds ? `${hh}:${minutes}:${seconds}` : `${hh}:${minutes}`;
        } else {
          const period = hours >= 12 ? 'PM' : 'AM';
          let h12 = hours % 12;
          if (h12 === 0) h12 = 12;
          const hh = String(h12).padStart(2, '0');
          return seconds && includeSeconds ? `${hh}:${minutes}:${seconds} ${period}` : `${hh}:${minutes} ${period}`;
        }
      }

      return trimmed;
    }

    // Si es un objeto Date
    if (time instanceof Date) {
      if (isNaN(time.getTime())) return '---';
      return time.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: includeSeconds ? '2-digit' : undefined,
        hour12: timeFormat === '12h'
      });
    }

    return String(time);
  };

  // Función para formatear intervalos de horarios en texto (ej. "Lunes a Sábado: 7:00 AM - 8:00 PM")
  const formatSchedule = (text: string | null | undefined): string => {
    if (!text) return '';
    let result = text.replace(/(\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)/gi, (m) => {
      return formatTime(m.trim());
    });
    if (isEn) {
      const dayMap: [RegExp, string][] = [
        [/\bTodos los d[ií]as\b/gi, 'Every day'],
        [/\bLunes\b/gi, 'Monday'],
        [/\bMartes\b/gi, 'Tuesday'],
        [/\bMi[eé]rcoles\b/gi, 'Wednesday'],
        [/\bJueves\b/gi, 'Thursday'],
        [/\bViernes\b/gi, 'Friday'],
        [/\bS[aá]bado\b/gi, 'Saturday'],
        [/\bDomingo\b/gi, 'Sunday'],
        [/\bLun\b/gi, 'Mon'],
        [/\bMi[eé]\b/gi, 'Wed'],
        [/\bJue\b/gi, 'Thu'],
        [/\bVie\b/gi, 'Fri'],
        [/\bS[aá]b\b/gi, 'Sat'],
        [/\bDom\b/gi, 'Sun'],
        [/\bCerrado\b/gi, 'Closed'],
        [/\bAbierto\b/gi, 'Open'],
        [/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+a\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/gi, '$1 to $2'],
      ];
      for (const [pattern, replacement] of dayMap) {
        result = result.replace(pattern, replacement);
      }
    }
    return result;
  };

  return (
    <TimeFormatContext.Provider
      value={{
        timeFormat,
        is12h: timeFormat === '12h',
        is24h: timeFormat === '24h',
        setTimeFormat,
        toggleTimeFormat,
        formatTime,
        formatSchedule
      }}
    >
      {children}
    </TimeFormatContext.Provider>
  );
}

export function useTimeFormat() {
  const context = useContext(TimeFormatContext);
  if (!context) {
    throw new Error('useTimeFormat must be used within a TimeFormatProvider');
  }
  return context;
}
