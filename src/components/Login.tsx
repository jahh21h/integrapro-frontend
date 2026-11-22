import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { authApi } from '../api';
import { formatRegimenLabel } from '../utils/tax';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, Store, Sparkles, Clock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  inactivityNotice?: string | null;
}

export default function Login({ onLogin, inactivityNotice }: LoginProps) {
  const [email, setEmail] = useState('admin@integrapro.com');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Administrador');
  const [sucursal, setSucursal] = useState('Sucursal Central - Ciudad');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    
    try {
      const res = await authApi.login({ 
        email: email.trim(), 
        password, 
        device_name: 'IntegraPro Web App' 
      });
      const userObj = res?.user || res?.data?.user;
      const empObj = res?.empresa || res?.data?.empresa || userObj?.empresa;
      const effectiveEmpId = empObj?.id_empresa || empObj?.id || userObj?.id_empresa || 1;
      const effectiveEmpNombre = empObj?.nombre || userObj?.empresa?.nombre || (effectiveEmpId === 22 ? 'Fortexa Technologies' : effectiveEmpId === 25 ? '[QA-EMPRESA] IntegraPro Test' : 'Fashion Styles');
      const rawReg = empObj?.regimen_tributario || empObj?.regimen || '';
      const effectiveEmpRegimen = formatRegimenLabel(rawReg);
      onLogin({
        id: userObj?.id || 1,
        name: userObj?.name || email.split('@')[0].toUpperCase(),
        email: userObj?.email || email.trim(),
        role: (userObj?.role || role) as UserRole,
        empresa_id: effectiveEmpId,
        empresa_nombre: effectiveEmpNombre,
        empresa_regimen: effectiveEmpRegimen,
        sucursal_id: userObj?.id_sucursal || 1,
        sucursal_nombre: userObj?.sucursal?.nombre || (effectiveEmpId === 22 ? 'Sede Central Fortexa Technologies' : sucursal)
      });
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      const msg = err.response?.data?.message 
        || err.response?.data?.errors?.email?.[0] 
        || 'Credenciales incorrectas. Verifique su correo y contraseña.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async (demoEmail: string, demoRole: UserRole, demoBranch: string) => {
    setEmail(demoEmail);
    setPassword('password');
    setRole(demoRole);
    const isFortexa = demoEmail === 'admin@integrapro.com';
    const effectiveBranch = isFortexa ? 'Sede Central Fortexa Technologies' : demoBranch;
    setSucursal(effectiveBranch);
    setLoading(true);
    setErrorMsg(null);
    
    try {
      const res = await authApi.login({ 
        email: demoEmail, 
        password: 'password', 
        device_name: 'IntegraPro Demo QuickLogin' 
      });
      const userObj = res?.user || res?.data?.user;
      onLogin({
        id: userObj?.id || (isFortexa ? 2 : 1),
        name: userObj?.name || (isFortexa ? 'SaaS Administrator' : demoEmail.split('@')[0].toUpperCase()),
        email: userObj?.email || demoEmail,
        role: demoRole,
        empresa_id: userObj?.id_empresa || (isFortexa ? 22 : 1),
        empresa_nombre: userObj?.empresa?.nombre || (isFortexa ? 'Fortexa Technologies' : 'Fashion Styles'),
        sucursal_id: userObj?.id_sucursal || (isFortexa ? 63 : 1),
        sucursal_nombre: effectiveBranch
      });
    } catch (err: any) {
      console.error('Error en acceso demo:', err);
      const msg = err.response?.data?.message || 'No se pudo acceder con la cuenta demo seleccionada.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 relative overflow-hidden">
      {/* Luces y efectos de fondo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 border border-slate-800 relative z-10 text-white">
        {/* Barra superior de acento */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-t-3xl" />

        {/* Encabezado */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white mb-3 shadow-lg shadow-indigo-500/25">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
            Integra<span className="text-indigo-400">Pro</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              ENTERPRISE
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Plataforma Integral de Gestión y Control Multi-Sucursal
          </p>
        </div>

        {/* Aviso de Inactividad */}
        {inactivityNotice && (
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-amber-300">Sesión Cerrada por Inactividad</p>
              <p className="text-[11px] text-amber-200/90 leading-tight mt-0.5">{inactivityNotice}</p>
            </div>
          </div>
        )}

        {/* Mensaje de Error de Autenticación */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-rose-300">Acceso Denegado</p>
              <p className="text-[11px] text-rose-200/90 leading-tight mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Formulario */}
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Rol Operativo
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Administrador">Administrador</option>
                <option value="Gerente de Sucursal">Gerente</option>
                <option value="Cajero / Ventas">Cajero / POS</option>
                <option value="Encargado de Bodega">Bodega</option>
                <option value="Recursos Humanos">RRHH</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Sucursal
              </label>
              <div className="relative">
                <select
                  value={sucursal}
                  onChange={(e) => setSucursal(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Sucursal Central - Ciudad">Central</option>
                  <option value="Sucursal Norte">Norte</option>
                  <option value="Sucursal Sur">Sur</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            <span>{loading ? 'Accediendo...' : 'Iniciar Sesión'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Accesos rápidos Demo */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Accesos Demo Comerciales:
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => handleDemo('admin@integrapro.com', 'Administrador', 'Sucursal Central - Ciudad')}
              className="py-1.5 px-2 text-[10px] font-semibold bg-slate-800 hover:bg-indigo-900/50 hover:text-indigo-300 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemo('cajero@integrapro.com', 'Cajero / Ventas', 'Sucursal Central - Ciudad')}
              className="py-1.5 px-2 text-[10px] font-semibold bg-slate-800 hover:bg-indigo-900/50 hover:text-indigo-300 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              Caja POS
            </button>
            <button
              type="button"
              onClick={() => handleDemo('bodega@integrapro.com', 'Encargado de Bodega', 'Sucursal Norte')}
              className="py-1.5 px-2 text-[10px] font-semibold bg-slate-800 hover:bg-indigo-900/50 hover:text-indigo-300 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              Bodega
            </button>
            <button
              type="button"
              onClick={() => handleDemo('rrhh@integrapro.com', 'Recursos Humanos', 'Sucursal Central - Ciudad')}
              className="py-1.5 px-2 text-[10px] font-semibold bg-slate-800 hover:bg-indigo-900/50 hover:text-indigo-300 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              RRHH
            </button>
          </div>
        </div>

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
