import { useState, useEffect, useRef } from 'react';
import { User, EmpresaSaaS, NavigationTab } from '../types';
import { 
  Search, 
  Bell, 
  LogOut, 
  Store, 
  ShieldCheck, 
  ChevronDown, 
  Clock, 
  Building2,
  Video,
  CreditCard,
  AlertTriangle,
  CheckCheck,
  Sparkles,
  Send,
  Sun,
  Moon
} from 'lucide-react';
import { useTimeFormat } from '../context/TimeFormatContext';
import { getRegimenBadge } from '../utils/tax';
import { isPlatformAdminEmail } from '../utils/tenant';

interface NavbarNotification {
  id: string;
  title: string;
  body: string;
  severity: 'danger' | 'warning' | 'info' | 'success';
  actionLabel?: string;
  onAction?: () => void;
}

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onOpenCommandPalette?: () => void;
  empresas?: EmpresaSaaS[];
  allEmpresas?: EmpresaSaaS[];
  isPlatformAdmin?: boolean;
  selectedEmpresa?: EmpresaSaaS;
  selectedEmpresaId?: number;
  onSelectEmpresa?: (id: number) => void;
  activeTab?: NavigationTab;
  onTabChange?: (tab: NavigationTab) => void;
  onEnterLiveMode?: () => void;
  themeMode?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export default function Navbar({ 
  user, 
  onLogout, 
  onOpenCommandPalette,
  empresas,
  allEmpresas,
  isPlatformAdmin = false,
  selectedEmpresa,
  selectedEmpresaId,
  onSelectEmpresa,
  onTabChange,
  onEnterLiveMode,
  themeMode = 'light',
  onToggleTheme
}: NavbarProps) {
  const [navTime, setNavTime] = useState(new Date());
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const { timeFormat, toggleTimeFormat, formatTime } = useTimeFormat();

  const currentEmpId = Number(selectedEmpresaId ?? selectedEmpresa?.id ?? user.empresa_id);
  const currentEmpObj = empresas?.find(e => Number(e.id) === currentEmpId) || selectedEmpresa;
  const rawReg = currentEmpObj?.regimen || user.empresa_regimen || '';
  const { label: displayRegimenLabel, badgeClass: displayRegimenBadgeClass } = getRegimenBadge(rawReg);

  const [readNotifIds, setReadNotifIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('integrapro_read_notifs_' + currentEmpId);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setNotifOpen(false);
    try {
      const saved = localStorage.getItem('integrapro_read_notifs_' + currentEmpId);
      setReadNotifIds(saved ? JSON.parse(saved) : []);
    } catch {
      setReadNotifIds([]);
    }
  }, [currentEmpId]);

  // Construcción en vivo de notificaciones reales (Recordatorio de pago 5 días antes mensual/anual + Trials + Alertas Fortexa)
  const notifications: NavbarNotification[] = (() => {
    const list: NavbarNotification[] = [];
    const todayKey = new Date().toISOString().slice(0, 10);

    const calcDiffDays = (dateStr?: string | null): number | null => {
      if (!dateStr) return null;
      const clean = String(dateStr).slice(0, 10);
      const target = new Date(clean + 'T23:59:59');
      if (isNaN(target.getTime())) return null;
      return Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    };

    // 1. Notificaciones para el Dueño de Plataforma (solo visibles dentro de Fortexa #22 para no mezclar al cambiar a Fashion Styles o Demo QA)
    if (isPlatformAdmin && currentEmpId === 22 && Array.isArray(allEmpresas)) {
      allEmpresas
        .filter(e => e.id !== 1 && e.id !== 22 && e.id !== 99)
        .forEach(emp => {
          const dueStr = emp.billing?.next_billing_date || emp.trial_ends_at;
          const diff = calcDiffDays(dueStr);
          const cur = emp.billing?.currency || (emp.pais === 'GT' ? 'GTQ' : 'USD');
          const sym = cur === 'GTQ' ? 'Q' : '$';
          const amt = emp.billing?.amount ?? 0;
          const cyc = emp.billing?.cycle === 'annual' ? 'Anual' : 'Mensual';

          if (diff !== null && diff <= 5) {
            list.push({
              id: `admin-due-${emp.id}-${dueStr?.slice(0, 10)}`,
              title: diff < 0
                ? `Suscripción vencida: ${emp.nombre}`
                : `Cobro en ${diff === 0 ? 'HOY' : `${diff} día(s)`}: ${emp.nombre}`,
              body: `Plan ${(emp.plan || 'Estándar').toUpperCase()} (${cyc}) • ${amt > 0 ? `${sym} ${Number(amt).toFixed(2)} ${cur}` : 'Revisar cuota'} • Corte: ${String(dueStr).slice(0, 10)}`,
              severity: diff < 0 ? 'danger' : 'warning',
              actionLabel: 'Gestionar en Fortexa',
              onAction: () => {
                if (onSelectEmpresa) onSelectEmpresa(22);
                onTabChange?.('fortexa_apps');
                setNotifOpen(false);
              },
            });
          } else if (emp.subscription_status === 'trial') {
            list.push({
              id: `admin-trial-${emp.id}-${todayKey}`,
              title: `Cliente en Prueba Gratis: ${emp.nombre}`,
              body: `Inquilino #${emp.id} (${emp.pais || 'GT'})${dueStr ? ` • Vence: ${String(dueStr).slice(0, 10)}` : ''}`,
              severity: 'info',
              actionLabel: 'Ver en Fortexa',
              onAction: () => {
                if (onSelectEmpresa) onSelectEmpresa(22);
                onTabChange?.('fortexa_apps');
                setNotifOpen(false);
              },
            });
          }
        });
    }

    // 2. Notificaciones para la empresa cliente activa (Recordatorio 5 días antes de pago Mensual/Anual o Trial)
    if (currentEmpObj && currentEmpObj.id !== 1 && currentEmpObj.id !== 22) {
      const dueStr = currentEmpObj.billing?.next_billing_date || currentEmpObj.trial_ends_at;
      const diff = calcDiffDays(dueStr);
      const cur = currentEmpObj.billing?.currency || (currentEmpObj.pais === 'GT' ? 'GTQ' : 'USD');
      const sym = cur === 'GTQ' ? 'Q' : '$';
      const amt = currentEmpObj.billing?.amount ?? 0;
      const cyc = currentEmpObj.billing?.cycle === 'annual' ? 'Anual' : 'Mensual';

      const openFortexaWhatsApp = () => {
        const text = `Hola Fortexa Technologies, soy de *${currentEmpObj.nombre}* (ID #${currentEmpObj.id}). Quisiera activar/renovar mi suscripción ${cyc}${amt > 0 ? ` (${sym} ${Number(amt).toFixed(2)} ${cur})` : ''}.`;
        window.open(`https://api.whatsapp.com/send?phone=50235692070&text=${encodeURIComponent(text)}`, '_blank');
        setNotifOpen(false);
      };

      if (currentEmpObj.subscription_status === 'trial' && diff !== null) {
        list.push({
          id: `tenant-trial-${currentEmpObj.id}-${todayKey}`,
          title: diff <= 5
            ? `Tu prueba gratuita vence en ${Math.max(diff, 0)} día(s)`
            : `Prueba Gratuita Activa (${diff} días restantes)`,
          body: `Tu período de prueba termina el ${String(dueStr).slice(0, 10)}. Activa tu plan ${cyc}${amt > 0 ? ` (${sym} ${Number(amt).toFixed(2)} ${cur})` : ''} para no perder acceso.`,
          severity: diff <= 5 ? 'warning' : 'info',
          actionLabel: 'Activar por WhatsApp',
          onAction: openFortexaWhatsApp,
        });
      } else if (diff !== null && diff <= 5) {
        list.push({
          id: `tenant-due-${currentEmpObj.id}-${String(dueStr).slice(0, 10)}`,
          title: diff < 0
            ? `Recordatorio urgente: Suscripción ${cyc} vencida`
            : `Recordatorio de Pago (${diff === 0 ? 'Vence HOY' : `Faltan ${diff} día(s)`})`,
          body: `Tu cuota ${cyc}${amt > 0 ? ` de ${sym} ${Number(amt).toFixed(2)} ${cur}` : ''} tiene fecha de corte el ${String(dueStr).slice(0, 10)}. Envía tu comprobante para renovar.`,
          severity: diff < 0 ? 'danger' : 'warning',
          actionLabel: 'Reportar Pago (WhatsApp)',
          onAction: openFortexaWhatsApp,
        });
      }
    }

    return list;
  })();

  const unreadCount = notifications.filter(n => !readNotifIds.includes(n.id)).length;

  const markAllNotificationsRead = () => {
    const allIds = Array.from(new Set([...readNotifIds, ...notifications.map(n => n.id)]));
    setReadNotifIds(allIds);
    try {
      localStorage.setItem('integrapro_read_notifs_' + currentEmpId, JSON.stringify(allIds));
    } catch {}
  };

  useEffect(() => {
    const timer = setInterval(() => setNavTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cerrar popover de notificaciones al hacer clic afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 shrink-0 web-navbar-glass border-b border-slate-200/80 z-30 px-2.5 sm:px-4 flex items-center justify-between gap-2">
      {/* Izquierda: Brand minimalista IntegraPro (clic para volver al Hub) */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={() => onTabChange?.('hub')}
          className="flex flex-col text-left rounded-xl px-1.5 py-0.5 hover:opacity-85 transition-opacity cursor-pointer"
          title="Ir al Menú Principal (Módulos)"
        >
          <span className="text-sm font-black text-slate-900 tracking-tight leading-tight">IntegraPro</span>
          <span className="text-[10px] text-indigo-600 font-bold leading-tight">Cloud ERP</span>
        </button>
      </div>

      {/* Centro: Buscador / Paleta de Comandos Ctrl + K */}
      <div className="flex-1 max-w-xs sm:max-w-md hidden md:block">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/80 hover:bg-slate-100 text-slate-500 rounded-xl text-xs font-medium border border-slate-200/60 transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <span className="truncate">Buscar productos, clientes, folios...</span>
          </div>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 rounded shadow-xs">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Derecha: Empresa, Sucursal, Notificaciones, Perfil */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Selector de Empresa y Régimen Activo */}
        {empresas && onSelectEmpresa && empresas.length > 1 && (isPlatformAdmin || isPlatformAdminEmail(user.email)) ? (
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
            <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <select
              value={currentEmpId}
              onChange={(e) => onSelectEmpresa(Number(e.target.value))}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer max-w-[95px] xs:max-w-[130px] sm:max-w-[180px] truncate text-[11px] sm:text-xs"
              title="Cambiar empresa asignada (Multi-Tenancy)"
            >
              {empresas.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre}
                </option>
              ))}
            </select>
            <span className={`hidden sm:inline-block text-[10px] font-black px-2 py-0.5 rounded-full border shrink-0 ${displayRegimenBadgeClass}`}>
              {displayRegimenLabel}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
            <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span 
              className="font-bold text-slate-800 max-w-[95px] xs:max-w-[130px] sm:max-w-[180px] truncate text-[11px] sm:text-xs"
              title={currentEmpObj?.nombre || user.empresa_nombre}
            >
              {currentEmpObj?.nombre || user.empresa_nombre}
            </span>
            <span className={`hidden sm:inline-block text-[10px] font-black px-2 py-0.5 rounded-full border shrink-0 ${displayRegimenBadgeClass}`}>
              {displayRegimenLabel}
            </span>
          </div>
        )}

        {/* Botón para entrar al Modo Solo Live (Vendedora TikTok) */}
        {onEnterLiveMode && (
          <button
            type="button"
            onClick={onEnterLiveMode}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer animate-in fade-in"
            title="Alternar al entorno exclusivo de venta por TikTok Live (sin módulos del ERP)"
          >
            <Video className="w-3.5 h-3.5 animate-pulse text-white" />
            <span className="hidden sm:inline">Modo Solo Live</span>
            <span className="sm:hidden">Live</span>
          </button>
        )}

        {/* Selector de Sucursal Activa */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs font-semibold text-indigo-900">
          <Store className="w-3.5 h-3.5 text-indigo-600" />
          <span className="truncate max-w-[120px]">{user.sucursal_nombre}</span>
          <ChevronDown className="w-3 h-3 text-indigo-400" />
        </div>

        {/* Interruptor de Tema: Claro Neomórfico / Oscuro OLED Liquid Glass */}
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
              themeMode === 'dark'
                ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-400/35 shadow-[0_0_16px_rgba(16,185,129,0.2)]'
                : 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border-slate-700 shadow-xs'
            }`}
            title={themeMode === 'dark' ? 'Cambiar a Claro Neomórfico + Visores OLED' : 'Cambiar a Modo Oscuro OLED Liquid Glass'}
          >
            {themeMode === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden xl:inline text-[11px]">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden xl:inline text-[11px]">OLED</span>
              </>
            )}
          </button>
        )}

        {/* Reloj en Vivo del Sistema con Toggle 12h / 24h */}
        <button
          type="button"
          onClick={toggleTimeFormat}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-mono font-bold border border-slate-200 transition-all cursor-pointer group shadow-xs"
          title={`Hora del sistema: ${formatTime(navTime, true)}. Clic para alternar a formato ${timeFormat === '12h' ? '24 Horas' : '12 Horas (AM/PM)'}`}
        >
          <Clock className="w-3.5 h-3.5 text-indigo-600 group-hover:rotate-45 transition-transform" />
          <span>{formatTime(navTime, false)}</span>
          <span className="text-[9px] font-sans px-1.5 py-0.2 bg-indigo-50 text-indigo-700 font-extrabold rounded-md border border-indigo-200 uppercase">
            {timeFormat}
          </span>
        </button>

        {/* Campana de Notificaciones Funcional (Recordatorios de pago 5 días antes + Alertas SaaS) */}
        <div className="relative hidden sm:block" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen(prev => !prev)}
            className={`relative p-1.5 sm:p-2 rounded-xl transition-colors shrink-0 cursor-pointer ${
              notifOpen
                ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={unreadCount > 0 ? `${unreadCount} notificación(es) pendiente(s)` : 'Centro de Notificaciones'}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-black text-slate-900">Centro de Notificaciones</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-black">
                      {unreadCount} nueva(s)
                    </span>
                  )}
                </div>
                {notifications.length > 0 && unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Marcar leídas</span>
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center space-y-1.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">¡Todo al día!</p>
                    <p className="text-[11px] text-slate-400">
                      No tienes recordatorios de pago ni alertas pendientes en este momento.
                    </p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const isUnread = !readNotifIds.includes(n.id);
                    return (
                      <div
                        key={n.id}
                        className={`p-3.5 transition-colors ${isUnread ? 'bg-indigo-50/30' : 'bg-white'} hover:bg-slate-50`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                              n.severity === 'danger'
                                ? 'bg-rose-100 text-rose-600'
                                : n.severity === 'warning'
                                ? 'bg-amber-100 text-amber-600'
                                : 'bg-indigo-100 text-indigo-600'
                            }`}
                          >
                            {n.severity === 'danger' || n.severity === 'warning' ? (
                              <AlertTriangle className="w-4 h-4" />
                            ) : (
                              <Sparkles className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-extrabold text-slate-900 leading-snug flex items-center gap-1.5">
                              <span className="truncate">{n.title}</span>
                              {isUnread && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.body}</p>
                            {n.actionLabel && n.onAction && (
                              <button
                                type="button"
                                onClick={n.onAction}
                                className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold transition-colors cursor-pointer"
                              >
                                {n.actionLabel.includes('WhatsApp') ? (
                                  <Send className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <CreditCard className="w-3 h-3 text-indigo-300" />
                                )}
                                <span>{n.actionLabel}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Separador vertical */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* Usuario y Rol */}
        <div 
          onClick={onLogout}
          className="flex items-center gap-2 cursor-pointer shrink-0"
          title="Usuario actual. Toca para cerrar sesión"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-[11px] sm:text-xs shadow-xs">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
              {user.name.split(' ')[0]}
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
            </p>
            <p className="text-[10px] font-medium text-slate-400 leading-tight">
              {user.role}
            </p>
          </div>
        </div>

        {/* Botón Salir Destacado y Visible en cualquier ancho */}
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
          title="Cerrar Sesión"
        >
          <LogOut className="w-3.5 h-3.5 text-white" />
          <span className="text-[11px] sm:text-xs font-bold">Salir</span>
        </button>
      </div>
    </header>
  );
}
