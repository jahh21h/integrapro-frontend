import React, { useState, useRef } from 'react';
import { User, UserRole, EmpresaSaaS } from '../types';
import { authApi } from '../api';
import { formatRegimenLabel } from '../utils/tax';
import { useLanguage } from '../context/LanguageContext';
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Store,
  Clock,
  AlertCircle,
  Sparkles,
  User as UserIcon,
  Phone,
  Globe,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  CreditCard,
  Zap
} from 'lucide-react';

interface LoginProps {
  onLogin: (user: User, empresa?: EmpresaSaaS) => void;
  inactivityNotice?: string | null;
}

const PLAN_PRICES_GTQ: Record<string, number> = {
  live_express: 199,
  retail: 299,
  admin_only: 349,
  standard: 499,
  enterprise: 799,
};

const PLAN_PRICES_USD: Record<string, number> = {
  live_express: 25,
  retail: 39,
  admin_only: 45,
  standard: 65,
  enterprise: 99,
};

export default function Login({ onLogin, inactivityNotice }: LoginProps) {
  const { lang, setLang, isEn, L, money, currencySymbol } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [registerStep, setRegisterStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const presetOptions = [
    { id: 'retail' as const, label: L('Tienda / POS', 'Retail Store / POS'), desc: L('Caja + Inventario + Ventas', 'Register + Inventory + Sales') },
    { id: 'admin_only' as const, label: L('Admin (Sin POS)', 'Admin (No POS)'), desc: L('ERP + Compras + Facturas', 'ERP + Purchases + Invoices') },
    { id: 'standard' as const, label: L('PyME Completa', 'Full SMB Suite'), desc: L('POS + Contabilidad + RRHH', 'POS + Accounting + HR') },
    { id: 'live_express' as const, label: L('Solo TikTok Live', 'TikTok Live Only'), desc: L('Canastas + WhatsApp + Stock', 'Baskets + WhatsApp + Stock') },
  ];

  // Formulario Fase 2: Registro Self-Service (14 días gratis)
  const [regForm, setRegForm] = useState({
    nombre: '',
    pais: 'GT',
    preset: 'retail' as 'retail' | 'admin_only' | 'standard' | 'enterprise' | 'live_express',
    billing_cycle: 'monthly' as 'monthly' | 'annual',
    telefono: '',
    admin_name: '',
    admin_email: '',
    admin_password: '',
  });

  const regCurrency = !isEn && regForm.pais === 'GT' ? 'GTQ' : 'USD';
  const regSymbol = regCurrency === 'GTQ' ? 'Q' : '$';
  const regBaseMonthly =
    regCurrency === 'GTQ'
      ? (PLAN_PRICES_GTQ[regForm.preset] ?? 299)
      : (PLAN_PRICES_USD[regForm.preset] ?? 39);
  const regPrice = regForm.billing_cycle === 'annual' ? regBaseMonthly * 10 : regBaseMonthly;
  const selectedPresetMeta = presetOptions.find((p) => p.id === regForm.preset) || presetOptions[0];

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current || !spotlightRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(520px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.14), transparent 70%)`;
  };

  const mapBackendEmpresa = (empObj: any, fallbackId: number, fallbackNombre: string): EmpresaSaaS | undefined => {
    if (!empObj) return undefined;
    const id = Number(empObj.id_empresa || empObj.id || fallbackId);
    return {
      id: id === 2 ? 22 : id,
      nombre: empObj.nombre || fallbackNombre,
      razon_social: empObj.razon_social || empObj.nombre || fallbackNombre,
      nit: empObj.nit || 'CF',
      pais: empObj.pais || 'GT',
      regimen: formatRegimenLabel(empObj.regimen_tributario || empObj.regimen || ''),
      plan: empObj.plan_type || 'basic',
      activa: empObj.activa !== false,
      subscription_status: empObj.subscription_status || 'active',
      trial_ends_at: empObj.trial_ends_at || null,
      billing: empObj.billing || undefined,
      telefono: empObj.telefono || '',
      email: empObj.email || '',
      direccion: empObj.direccion || '',
      modules: empObj.modules || undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await authApi.login({
        email: email.trim(),
        password,
        device_name: 'IntegraPro Web App',
      });
      const userObj = res?.user || res?.data?.user;
      const empObj = res?.empresa || res?.data?.empresa || userObj?.empresa;
      const rawEmpId = Number(empObj?.id_empresa || empObj?.id || userObj?.id_empresa || 1);
      const effectiveEmpId = rawEmpId === 2 ? 22 : rawEmpId;
      const effectiveEmpNombre =
        empObj?.nombre ||
        userObj?.empresa?.nombre ||
        (effectiveEmpId === 22
          ? 'Fortexa Technologies'
          : effectiveEmpId === 25
          ? '[QA-EMPRESA] IntegraPro Test'
          : effectiveEmpId === 1
          ? 'Fashion Styles'
          : `Empresa #${effectiveEmpId}`);
      const rawReg = empObj?.regimen_tributario || empObj?.regimen || '';
      const effectiveEmpRegimen = formatRegimenLabel(rawReg);

      onLogin(
        {
          id: userObj?.id || 1,
          name: userObj?.name || email.split('@')[0].toUpperCase(),
          email: userObj?.email || email.trim(),
          role: (userObj?.role || 'Administrador de Empresa') as UserRole,
          empresa_id: effectiveEmpId,
          empresa_nombre: effectiveEmpNombre,
          empresa_regimen: effectiveEmpRegimen,
          sucursal_id: userObj?.id_sucursal || 1,
          sucursal_nombre:
            userObj?.sucursal?.nombre ||
            (effectiveEmpId === 22 ? 'Sede Central Fortexa Technologies' : 'Sucursal Principal'),
        },
        mapBackendEmpresa(empObj, effectiveEmpId, effectiveEmpNombre)
      );
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        L(
          'No se pudo conectar con el servidor o las credenciales son incorrectas.',
          'Could not connect to the server or your credentials are incorrect.'
        );
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleNextRegisterStep = () => {
    if (!regForm.nombre.trim()) {
      setErrorMsg(
        L(
          'Ingresa el nombre comercial de tu negocio para continuar.',
          'Enter your business trade name to continue.'
        )
      );
      return;
    }
    setErrorMsg(null);
    setRegisterStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerStep === 1) {
      handleNextRegisterStep();
      return;
    }
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await authApi.registerTenant({
        nombre: regForm.nombre.trim(),
        pais: regForm.pais,
        preset: regForm.preset,
        billing_cycle: regForm.billing_cycle,
        telefono: regForm.telefono.trim(),
        admin_name: regForm.admin_name.trim(),
        admin_email: regForm.admin_email.trim().toLowerCase(),
        admin_password: regForm.admin_password,
      });

      const userObj = res?.user;
      const empObj = res?.empresa;
      const empId = Number(empObj?.id_empresa || userObj?.id_empresa);
      const empNombre = empObj?.nombre || regForm.nombre.trim();

      onLogin(
        {
          id: userObj?.id || 1,
          name: userObj?.name || regForm.admin_name.trim(),
          email: userObj?.email || regForm.admin_email.trim().toLowerCase(),
          role: 'Administrador de Empresa' as UserRole,
          empresa_id: empId,
          empresa_nombre: empNombre,
          empresa_regimen: formatRegimenLabel(empObj?.regimen || 'general'),
          sucursal_id: userObj?.id_sucursal || 1,
          sucursal_nombre: userObj?.sucursal?.nombre || 'Sucursal Principal',
        },
        mapBackendEmpresa(empObj, empId, empNombre)
      );
    } catch (err: any) {
      console.error('Error en registro público:', err);
      const validationErrors = err?.response?.data?.errors;
      const firstErr = validationErrors ? Object.values(validationErrors).flat()[0] : null;
      setErrorMsg(
        String(
          firstErr ||
            err?.response?.data?.message ||
            L('No se pudo crear tu cuenta. Intenta de nuevo.', 'Could not create your account. Please try again.')
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleStageMouseMove}
      className="min-h-screen w-full bg-[#050816] text-white relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10"
    >
      {/* Orbes Aurora de movimiento muy lento y suave */}
      <div className="login-orb-1 absolute -top-28 -left-20 w-[440px] h-[440px] rounded-full bg-indigo-600/40 blur-[110px] pointer-events-none" />
      <div className="login-orb-2 absolute top-1/4 -right-24 w-[480px] h-[480px] rounded-full bg-cyan-500/25 blur-[120px] pointer-events-none" />
      <div className="login-orb-3 absolute -bottom-28 left-1/3 w-[420px] h-[420px] rounded-full bg-emerald-500/25 blur-[115px] pointer-events-none" />

      {/* Cuadrícula tecnológica radial */}
      <div className="login-grid-bg absolute inset-0 pointer-events-none" />

      {/* Spotlight interactivo siguiendo el cursor */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ background: 'radial-gradient(520px circle at 50% 40%, rgba(99, 102, 241, 0.14), transparent 70%)' }}
      />

      {/* Selector de Idioma ES | EN en la esquina superior derecha */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <div
          className="inline-flex items-center gap-1 p-1 rounded-full bg-slate-900/75 border border-white/15 backdrop-blur-md shadow-lg"
          role="group"
          aria-label={L('Cambiar idioma', 'Switch language')}
        >
          <Globe className="w-3.5 h-3.5 text-cyan-300 ml-2 mr-0.5 shrink-0" />
          <button
            type="button"
            onClick={() => setLang('es')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide transition-all cursor-pointer ${
              lang === 'es'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Español (Q / GTQ)"
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide transition-all cursor-pointer ${
              lang === 'en'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
            title="English ($ / USD)"
          >
            EN
          </button>
        </div>
      </div>

      {/* Contenedor Principal Split-Screen */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
        {/* COLUMNA IZQUIERDA: Marca + HUD de Tarjetas de Cristal Flotantes */}
        <div className="lg:col-span-6 hidden lg:flex flex-col space-y-7 pr-2">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full login-glass-chip text-[11px] font-bold text-cyan-200 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>{L('Fortexa Cloud OS • Plataforma Empresarial en Vivo', 'Fortexa Cloud OS • Live Business Platform')}</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.06]">
              Integra
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Pro
              </span>
              <span className="block text-2xl xl:text-[28px] text-slate-200 font-extrabold mt-2">
                {L('Tu negocio en tiempo real.', 'Your business in real time.')}
              </span>
            </h1>
            <p className="text-sm text-slate-300/90 max-w-lg leading-relaxed">
              {L(
                'Punto de Venta rápido, inventario multi-sucursal, cuentas por cobrar con abonos parciales y comprobantes PDF elegantes en un entorno 100% privado.',
                'Fast Point of Sale, multi-branch inventory, accounts receivable with partial payments, and sleek PDF receipts in a 100% private cloud.'
              )}
            </p>
          </div>

          {/* Tarjetas HUD de Cristal Flotando suavemente */}
          <div className="grid grid-cols-2 gap-4 max-w-lg pt-1">
            <div className="login-glass-chip rounded-2xl p-4 login-hud-float-1">
              <div className="flex items-center justify-between text-[10px] text-slate-300">
                <span className="font-bold tracking-wider">{L('VENTAS EN VIVO', 'LIVE SALES')}</span>
                <span className="text-emerald-300 font-black px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-400/25">
                  +28%
                </span>
              </div>
              <div className="text-xl font-black text-white mt-1.5 font-mono">
                {isEn ? `${currencySymbol}18,450` : `${currencySymbol} 18,450`}
              </div>
              <div className="flex items-end gap-1.5 h-10 mt-2.5">
                <div className="flex-1 h-full bg-indigo-400/75 rounded-t login-bar-1" />
                <div className="flex-1 h-full bg-cyan-400/80 rounded-t login-bar-2" />
                <div className="flex-1 h-full bg-indigo-300/80 rounded-t login-bar-3" />
                <div className="flex-1 h-full bg-emerald-400 rounded-t login-bar-4" />
                <div className="flex-1 h-full bg-cyan-300/90 rounded-t login-bar-5" />
                <div className="flex-1 h-full bg-gradient-to-t from-indigo-500 to-emerald-300 rounded-t login-bar-6" />
              </div>
            </div>

            <div className="login-glass-chip rounded-2xl p-4 login-hud-float-2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-cyan-200">
                  {L('ABONO PARCIAL CxC', 'PARTIAL A/R PAYMENT')}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>
              <div className="my-2">
                <div className="text-xs font-black text-white">{L('Comprobante #003217', 'Receipt #003217')}</div>
                <div className="text-xs text-emerald-300 font-mono font-bold mt-0.5">
                  + {money(350)} • {L('PDF 1 hoja', '1-Page PDF')}
                </div>
              </div>
              <div className="text-[10px] text-slate-300 flex items-center justify-between border-t border-white/10 pt-2">
                <span>{L('Saldo actualizado', 'Balance updated')}</span>
                <span className="text-emerald-300 font-bold">{L('En línea ✓', 'Online ✓')}</span>
              </div>
            </div>
          </div>

          {/* Cápsulas de capacidades clave */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[11px] font-bold text-slate-200">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-300" /> {L('POS Ultrarrápido', 'Ultra-Fast POS')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <FileText className="w-3.5 h-3.5 text-emerald-300" /> {L('Comprobante PDF', 'PDF Receipts')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <CreditCard className="w-3.5 h-3.5 text-cyan-300" /> {L('Abonos CxC', 'A/R Installments')}
            </span>
          </div>
        </div>

        {/* COLUMNA DERECHA: Tarjeta Liquid Glass con Borde de Luz Giratorio Muy Lento */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="relative w-full max-w-[470px] p-[1.5px] rounded-[28px] overflow-hidden shadow-2xl">
            {/* Haz de luz girando suavemente (20s por vuelta) */}
            <div className="login-border-beam absolute -inset-[130%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(99,102,241,0.85)_65deg,rgba(34,211,238,0.9)_115deg,rgba(16,185,129,0.85)_165deg,transparent_220deg)] pointer-events-none" />

            {/* Superficie de Vidrio Esmerilado */}
            <div className="relative login-glass-card rounded-[26.5px] p-6 sm:p-8 space-y-5">
              {/* Encabezado de marca */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-black text-lg tracking-tight text-white flex items-center gap-1.5 leading-none">
                      <span>
                        Integra<span className="text-cyan-300">Pro</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300/90 mt-1">
                      {L('Fortexa Technologies • Cloud Multi-Empresa', 'Fortexa Technologies • Multi-Company Cloud')}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-black tracking-wider text-cyan-200 shrink-0">
                  ENTERPRISE
                </span>
              </div>

              {/* Selector Iniciar Sesión / Prueba Gratis 14 Días */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-950/60 border border-white/15">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setRegisterStep(1);
                    setErrorMsg(null);
                  }}
                  className={`py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-white/15 text-white shadow-sm border border-white/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {L('Iniciar Sesión', 'Sign In')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setRegisterStep(1);
                    setErrorMsg(null);
                  }}
                  className={`py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    mode === 'register'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/25'
                      : 'text-emerald-300 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{L('Prueba Gratis 14 Días', '14-Day Free Trial')}</span>
                </button>
              </div>

              {/* Aviso de Inactividad */}
              {inactivityNotice && mode === 'login' && (
                <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/35 text-amber-100 text-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-amber-200">{L('Sesión Cerrada por Inactividad', 'Session Closed Due to Inactivity')}</p>
                    <p className="text-[11px] text-amber-100/85 leading-tight mt-0.5">{inactivityNotice}</p>
                  </div>
                </div>
              )}

              {/* Mensaje de Error */}
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/40 text-rose-100 text-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-rose-200">
                      {mode === 'login' ? L('Acceso Denegado', 'Access Denied') : L('No se pudo completar el registro', 'Registration Could Not Be Completed')}
                    </p>
                    <p className="text-[11px] text-rose-100/90 leading-tight mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              {mode === 'login' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      {L('Correo Corporativo', 'Work Email')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="username"
                        className="autofill-dark login-glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                        placeholder={L('usuario@empresa.com', 'user@company.com')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      {L('Contraseña', 'Password')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="autofill-dark login-glass-input w-full pl-10 pr-10 py-2.5 rounded-xl text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title={showPassword ? L('Ocultar contraseña', 'Hide password') : L('Ver contraseña', 'Show password')}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative overflow-hidden w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 hover:from-indigo-400 hover:via-blue-400 hover:to-cyan-400 text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
                  >
                    <span className="login-shimmer-slow absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                    <span className="relative">{loading ? L('Accediendo...', 'Signing in...') : L('Iniciar Sesión', 'Sign In')}</span>
                    <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
                  {/* Indicador de Paso (2 pasos limpios) */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-cyan-200">
                      {registerStep === 1
                        ? L('Paso 1 de 2 • Configura tu Negocio', 'Step 1 of 2 • Configure Your Business')
                        : L('Paso 2 de 2 • Credenciales de Dueño', 'Step 2 of 2 • Owner Credentials')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-6 rounded-full transition-all ${registerStep === 1 ? 'bg-emerald-400' : 'bg-emerald-400/50'}`} />
                      <span className={`h-1.5 w-6 rounded-full transition-all ${registerStep === 2 ? 'bg-emerald-400' : 'bg-white/15'}`} />
                    </div>
                  </div>

                  {registerStep === 1 ? (
                    <>
                      <div className="space-y-3">
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">{L('Nombre de tu Negocio *', 'Business Name *')}</label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={regForm.nombre}
                              onChange={(e) => setRegForm({ ...regForm, nombre: e.target.value })}
                              placeholder={L('Ej. Mi Tienda / Empresa', 'e.g. My Store / Company')}
                              className="autofill-dark login-glass-input w-full pl-9 pr-3 py-2.5 rounded-xl text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">{L('País & Moneda *', 'Country & Currency *')}</label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                            <select
                              value={regForm.pais}
                              onChange={(e) => setRegForm({ ...regForm, pais: e.target.value })}
                              className="login-glass-input w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold"
                            >
                              <option value="GT" className="bg-slate-900 text-white">{L('🇬🇹 Guatemala — Quetzales (Q / GTQ)', '🇬🇹 Guatemala — US Dollars ($ / USD)')}</option>
                              <option value="SV" className="bg-slate-900 text-white">{L('🇸🇻 El Salvador — Dólares ($ / USD)', '🇸🇻 El Salvador — US Dollars ($ / USD)')}</option>
                              <option value="HN" className="bg-slate-900 text-white">{L('🇭🇳 Honduras — Dólares ($ / USD)', '🇭🇳 Honduras — US Dollars ($ / USD)')}</option>
                              <option value="CR" className="bg-slate-900 text-white">{L('🇨🇷 Costa Rica — Dólares ($ / USD)', '🇨🇷 Costa Rica — US Dollars ($ / USD)')}</option>
                              <option value="PA" className="bg-slate-900 text-white">{L('🇵🇦 Panamá — Dólares ($ / USD)', '🇵🇦 Panama — US Dollars ($ / USD)')}</option>
                              <option value="MX" className="bg-slate-900 text-white">{L('🇲🇽 México — Dólares ($ / USD)', '🇲🇽 Mexico — US Dollars ($ / USD)')}</option>
                              <option value="US" className="bg-slate-900 text-white">{L('🇺🇸 Estados Unidos — Dólares ($ / USD)', '🇺🇸 United States — US Dollars ($ / USD)')}</option>
                              <option value="OT" className="bg-slate-900 text-white">{L('🌎 Otro País — Dólares ($ / USD)', '🌎 Other Country — US Dollars ($ / USD)')}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Perfil del Negocio */}
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">{L('¿Cómo usarás IntegraPro?', 'How will you use IntegraPro?')}</label>
                        <div className="grid grid-cols-2 gap-2">
                          {presetOptions.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setRegForm({ ...regForm, preset: opt.id })}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                regForm.preset === opt.id
                                  ? 'bg-emerald-500/20 border-emerald-400/80 text-white shadow-inner'
                                  : 'bg-white/5 border-white/15 text-slate-200 hover:bg-white/10'
                              }`}
                            >
                              <p className="font-bold text-[11px] leading-tight">{opt.label}</p>
                              <p className="text-[10px] text-slate-300/80 mt-0.5">{opt.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Ciclo + Resumen Precio Trial */}
                      <div className="p-3 rounded-2xl bg-emerald-500/12 border border-emerald-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="font-black text-emerald-300 text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {L(`Hoy pagas ${regSymbol} 0.00 (14 días gratis)`, `Pay ${regSymbol}0.00 today (14-day free trial)`)}
                            </span>
                          </p>
                          <p className="text-[10.5px] text-emerald-100/80 mt-0.5">
                            {L('Luego:', 'Then:')}{' '}
                            <strong>
                              {regSymbol} {regPrice}.00 {regCurrency} / {regForm.billing_cycle === 'annual' ? L('año', 'year') : L('mes', 'month')}
                            </strong>
                          </p>
                        </div>
                        <div className="flex gap-1 bg-slate-950/65 p-1 rounded-xl border border-white/15 shrink-0">
                          <button
                            type="button"
                            onClick={() => setRegForm({ ...regForm, billing_cycle: 'monthly' })}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              regForm.billing_cycle === 'monthly' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'
                            }`}
                          >
                            {L('Mensual', 'Monthly')}
                          </button>
                          <button
                            type="button"
                            onClick={() => setRegForm({ ...regForm, billing_cycle: 'annual' })}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              regForm.billing_cycle === 'annual' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'
                            }`}
                          >
                            {L('Anual (-2m)', 'Annual (-2mo)')}
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextRegisterStep}
                        className="relative overflow-hidden w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <span className="login-shimmer-slow absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                        <span className="relative">{L('Continuar: Tus Datos de Acceso', 'Continue: Your Login Details')}</span>
                        <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Resumen compacto del Paso 1 */}
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/15 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{regForm.nombre}</p>
                          <p className="text-[10.5px] text-emerald-300">
                            {selectedPresetMeta.label} •{' '}
                            {L(
                              `14 días gratis (luego ${regSymbol} ${regPrice}/${regForm.billing_cycle === 'annual' ? 'año' : 'mes'})`,
                              `14 days free (then ${regSymbol}${regPrice}/${regForm.billing_cycle === 'annual' ? 'yr' : 'mo'})`
                            )}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setRegisterStep(1);
                            setErrorMsg(null);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-cyan-200 font-bold text-[11px] shrink-0 cursor-pointer"
                        >
                          <ArrowLeft className="w-3 h-3" /> {L('Cambiar', 'Change')}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">{L('Tu Nombre *', 'Your Name *')}</label>
                          <div className="relative">
                            <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                              type="text"
                              required
                              autoFocus
                              value={regForm.admin_name}
                              onChange={(e) => setRegForm({ ...regForm, admin_name: e.target.value })}
                              placeholder={L('Nombre completo', 'Full name')}
                              className="autofill-dark login-glass-input w-full pl-9 pr-3 py-2.5 rounded-xl text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">{L('WhatsApp / Teléfono', 'WhatsApp / Phone')}</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                              type="text"
                              value={regForm.telefono}
                              onChange={(e) => setRegForm({ ...regForm, telefono: e.target.value })}
                              placeholder={!isEn && regForm.pais === 'GT' ? '5555-1234' : '+1 555-1234'}
                              className="autofill-dark login-glass-input w-full pl-9 pr-3 py-2.5 rounded-xl text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">{L('Correo Electrónico *', 'Email Address *')}</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                              type="email"
                              required
                              autoComplete="email"
                              value={regForm.admin_email}
                              onChange={(e) => setRegForm({ ...regForm, admin_email: e.target.value })}
                              placeholder={L('tu@negocio.com', 'you@business.com')}
                              className="autofill-dark login-glass-input w-full pl-9 pr-3 py-2.5 rounded-xl text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">{L('Contraseña (mín. 6) *', 'Password (min. 6) *')}</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                              type={showRegPassword ? 'text' : 'password'}
                              required
                              minLength={6}
                              autoComplete="new-password"
                              value={regForm.admin_password}
                              onChange={(e) => setRegForm({ ...regForm, admin_password: e.target.value })}
                              placeholder="••••••••"
                              className="autofill-dark login-glass-input w-full pl-9 pr-9 py-2.5 rounded-xl text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => setShowRegPassword((prev) => !prev)}
                              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                              title={showRegPassword ? L('Ocultar contraseña', 'Hide password') : L('Ver contraseña', 'Show password')}
                            >
                              {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="relative overflow-hidden w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
                      >
                        <span className="login-shimmer-slow absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />
                        <span className="relative">
                          {loading ? L('Creando tu espacio privado...', 'Creating your private workspace...') : L('Crear Cuenta Gratis (14 Días)', 'Create Free Account (14 Days)')}
                        </span>
                        <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* Badges de seguridad */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-3 text-[11px] text-slate-300/80">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {L('Cifrado 256-bit', '256-bit Encryption')}
                </span>
                <span className="text-white/25">•</span>
                <span className="flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-cyan-300" /> {L('Multi-Tenancy Aislado', 'Isolated Multi-Tenancy')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
