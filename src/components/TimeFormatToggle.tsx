import { Clock } from 'lucide-react';
import { useTimeFormat } from '../context/TimeFormatContext';
import { useLanguage } from '../context/LanguageContext';

interface TimeFormatToggleProps {
  variant?: 'badge' | 'button' | 'minimal' | 'pills';
  className?: string;
  showIcon?: boolean;
}

export default function TimeFormatToggle({
  variant = 'badge',
  className = '',
  showIcon = true
}: TimeFormatToggleProps) {
  const { timeFormat, setTimeFormat, toggleTimeFormat } = useTimeFormat();
  const { L } = useLanguage();

  if (variant === 'pills') {
    return (
      <div className={`inline-flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 ${className}`}>
        <button
          type="button"
          onClick={() => setTimeFormat('12h')}
          className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
            timeFormat === '12h'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          12H (AM/PM)
        </button>
        <button
          type="button"
          onClick={() => setTimeFormat('24h')}
          className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
            timeFormat === '24h'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          24H
        </button>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <button
        type="button"
        onClick={toggleTimeFormat}
        className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer ${className}`}
        title={L('Alternar formato de hora (12h / 24h)', 'Toggle time format (12h / 24h)')}
      >
        {showIcon && <Clock className="w-3 h-3" />}
        <span>{timeFormat.toUpperCase()}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTimeFormat}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shadow-sm cursor-pointer ${
        timeFormat === '12h'
          ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
      } ${className}`}
      title={L('Clic para cambiar formato de hora (12h AM/PM vs 24h Militar)', 'Click to switch time format (12h AM/PM vs 24h)')}
    >
      {showIcon && <Clock className="w-3.5 h-3.5 text-indigo-600" />}
      <span className="font-mono">{timeFormat.toUpperCase()}</span>
      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-md bg-white text-slate-700 border border-slate-200/80">
        {timeFormat === '12h' ? L('12 Horas', '12-Hour') : L('24 Horas', '24-Hour')}
      </span>
    </button>
  );
}
