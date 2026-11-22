import React, { useState } from 'react';
import { User, UserRole, EmpresaSaaS } from '../types';
import { authApi } from '../api';
import { formatRegimenLabel } from '../utils/tax';
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Store,
  Clock,
  AlertCircle,
  Sparkles,
  User as UserIcon,
  Phone,
  Globe,
  CheckCircle2
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
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const regCurrency = regForm.pais === 'GT' ? 'GTQ' : 'USD';
  const regSymbol = regCurrency === 'GTQ' ? 'Q' : '$';
  const regBaseMonthly = regCurrency === 'GTQ'
    ? (PLAN_PRICES_GTQ[regForm.preset] ?? 299)
    : (PLAN_PRICES_USD[regForm.preset] ?? 39);
  const regPrice = regForm.billing_cycle === 'annual' ? regBaseMonthly * 10 : regBaseMonthly;

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
        'No se pudo conectar con el servidor o las credenciales son incorrectas.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setErrorMsg(String(firstErr || err?.response?.data?.message || 'No se pudo crear tu cuenta. Intenta de nuevo.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 relative overflow-hidden">
      {/* Luces y efectos de fondo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className={`${
          mode === 'register' ? 'max-w-lg' : 'max-w-md'
        } w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 border border-slate-800 relative z-10 text-white transition-all`}
      >
        {/* Barra superior de acento */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-t-3xl" />

        {/* Encabezado */}
        <div className="text-center mb-5 pt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white mb-2.5 shadow-lg shadow-indigo-500/25">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
            Integra<span className="text-indigo-400">Pro</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              ENTERPRISE
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Plataforma Cloud Multi-Empresa • Fortexa Technologies
          </p>
        </div>

        {/* Selector Iniciar Sesión / Crear Cuenta Gratis */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-800/80 border border-slate-700/80 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              mode === 'register'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prueba Gratis 14 Días</span>
          </button>
        </div>

        {/* Aviso de Inactividad */}
        {inactivityNotice && mode === 'login' && (
          <div className="mb-4 p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-amber-300">Sesión Cerrada por Inactividad</p>
              <p className="text-[11px] text-amber-200/90 leading-tight mt-0.5">{inactivityNotice}</p>
            </div>
          </div>
        )}

        {/* Mensaje de Error */}
        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-rose-300">{mode === 'login' ? 'Acceso Denegado' : 'No se pudo completar el registro'}</p>
              <p className="text-[11px] text-rose-200/90 leading-tight mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Correo Corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="autofill-dark w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="usuario@empresa.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="autofill-dark w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'Accediendo...' : 'Iniciar Sesión'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nombre de tu Negocio *</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regForm.nombre}
                    onChange={(e) => setRegForm({ ...regForm, nombre: e.target.value })}
                    placeholder="Ej. Mi Tienda / Empresa"
                    className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">País & Moneda *</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <select
                    value={regForm.pais}
                    onChange={(e) => setRegForm({ ...regForm, pais: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="GT">🇬🇹 Guatemala (Quetzales - Q)</option>
                    <option value="SV">🇸🇻 El Salvador (Dólares - $)</option>
                    <option value="HN">🇭🇳 Honduras (Dólares - $)</option>
                    <option value="CR">🇨🇷 Costa Rica (Dólares - $)</option>
                    <option value="PA">🇵🇦 Panamá (Dólares - $)</option>
                    <option value="MX">🇲🇽 México (Dólares - $)</option>
                    <option value="US">🇺🇸 Estados Unidos (Dólares - $)</option>
                    <option value="OT">🌎 Otro País (Dólares - $)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Perfil del Negocio */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">¿Cómo usarás IntegraPro?</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'retail', label: 'Tienda / POS', desc: 'Caja + Inventario + Ventas' },
                  { id: 'admin_only', label: 'Administrativo (Sin POS)', desc: 'ERP + Compras + Facturación' },
                  { id: 'standard', label: 'PyME Completa', desc: 'POS + Contabilidad + RRHH' },
                  { id: 'live_express', label: 'Solo TikTok Live', desc: 'Canastas + WhatsApp + Stock' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRegForm({ ...regForm, preset: opt.id as any })}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      regForm.preset === opt.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <p className="font-bold text-[11px] leading-tight">{opt.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Ciclo + Resumen Precio Trial */}
            <div className="p-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-black text-emerald-300 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Hoy pagas {regSymbol} 0.00 (14 días gratis)
                </p>
                <p className="text-[10px] text-emerald-200/80 mt-0.5">
                  Luego: <strong>{regSymbol} {regPrice}.00 {regCurrency} / {regForm.billing_cycle === 'annual' ? 'año' : 'mes'}</strong>
                </p>
              </div>
              <div className="flex gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700 shrink-0">
                <button
                  type="button"
                  onClick={() => setRegForm({ ...regForm, billing_cycle: 'monthly' })}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                    regForm.billing_cycle === 'monthly' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Mensual
                </button>
                <button
                  type="button"
                  onClick={() => setRegForm({ ...regForm, billing_cycle: 'annual' })}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                    regForm.billing_cycle === 'annual' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Anual (-2m)
                </button>
              </div>
            </div>

            {/* Datos de Acceso */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tu Nombre *</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regForm.admin_name}
                    onChange={(e) => setRegForm({ ...regForm, admin_name: e.target.value })}
                    placeholder="Nombre completo"
                    className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">WhatsApp / Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={regForm.telefono}
                    onChange={(e) => setRegForm({ ...regForm, telefono: e.target.value })}
                    placeholder={regForm.pais === 'GT' ? '5555-1234' : '+1 555-1234'}
                    className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Correo Electrónico *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={regForm.admin_email}
                    onChange={(e) => setRegForm({ ...regForm, admin_email: e.target.value })}
                    placeholder="tu@negocio.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Contraseña (mín. 6) *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={regForm.admin_password}
                    onChange={(e) => setRegForm({ ...regForm, admin_password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'Creando tu espacio privado...' : 'Crear Cuenta Gratis (14 Días)'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}

        {/* Badges de seguridad */}
        <div className="mt-5 flex items-center justify-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cifrado 256-bit
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Store className="w-3.5 h-3.5 text-indigo-400" /> Multi-Tenancy Aislado
          </span>
        </div>
      </div>
    </div>
  );
}
