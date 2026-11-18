import { useState, useEffect } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Layers, 
  ShoppingBag, 
  Sparkles
} from 'lucide-react';
import { scraperApi } from '../api';

interface TokenItem {
  id: number;
  name: string;
  created_at: string;
  last_used_at: string | null;
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export default function TokenExtensionScraper() {
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [plainToken, setPlainToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [connectionTestStatus, setConnectionTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const apiUrl = typeof window !== 'undefined' ? window.location.origin : 'https://app.integrapro.app';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadTokens = async () => {
    setLoading(true);
    try {
      const res = await scraperApi.getTokenInfo();
      if (res && res.success) {
        setTokens(res.tokens || []);
        if (res.user) setUserInfo(res.user);
      }
    } catch (err) {
      console.warn('Error loading scraper tokens:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  const handleGenerateToken = async () => {
    setIsGenerating(true);
    try {
      const res = await scraperApi.generateToken();
      if (res && res.success && res.token) {
        setPlainToken(res.token);
        showToast('¡Token generado con éxito! Cópialo de inmediato.');
        loadTokens();
      } else {
        showToast('Error al generar el token.');
      }
    } catch (err: any) {
      showToast('Error al generar token: ' + (err?.response?.data?.message || err?.message || 'Error desconocido'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRevokeTokens = async () => {
    if (!window.confirm('¿Revocar todos los tokens de la extensión? La extensión en Chrome dejará de funcionar hasta que generes uno nuevo.')) {
      return;
    }

    setIsRevoking(true);
    try {
      const res = await scraperApi.revokeTokens();
      if (res && res.success) {
        setPlainToken(null);
        showToast('Todos los tokens de la extensión fueron revocados.');
        loadTokens();
      }
    } catch (err: any) {
      showToast('Error al revocar tokens.');
    } finally {
      setIsRevoking(false);
    }
  };

  const handleCopyToken = () => {
    if (!plainToken) return;
    navigator.clipboard.writeText(plainToken);
    setCopied(true);
    showToast('Token copiado al portapapeles');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyApiUrl = () => {
    navigator.clipboard.writeText(apiUrl);
    setCopiedUrl(true);
    showToast('URL de API copiada');
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleTestConnection = async () => {
    setConnectionTestStatus('testing');
    try {
      const res = await scraperApi.getTokenInfo();
      if (res && res.success) {
        setConnectionTestStatus('success');
        showToast('✅ Conexión con el servidor API validada correctamente (200 OK)');
      } else {
        setConnectionTestStatus('error');
      }
    } catch {
      setConnectionTestStatus('error');
      showToast('❌ Error de conexión al validar el servidor.');
    }
    setTimeout(() => setConnectionTestStatus('idle'), 4000);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Nunca';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-GT', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-2xl border border-indigo-500/30">
                <Key className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                    Token para Extensión Scraper
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Chrome Extension API
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Genera credenciales seguras para autenticar la extensión de navegador que extrae productos desde Shein, Temu, AliExpress y Amazon.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={connectionTestStatus === 'testing'}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/10 flex items-center gap-2 cursor-pointer"
            >
              <Globe className={`w-3.5 h-3.5 text-cyan-300 ${connectionTestStatus === 'testing' ? 'animate-spin' : ''}`} />
              <span>{connectionTestStatus === 'testing' ? 'Probando...' : 'Probar Servidor'}</span>
            </button>

            <button
              type="button"
              onClick={loadTokens}
              disabled={loading}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 cursor-pointer"
              title="Refrescar tokens"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Server & User Info pill bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5">
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">URL de tu Servidor:</span>
              <span className="font-mono text-white text-[11px] font-bold">{apiUrl}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Usuario Asignado:</span>
              <span className="text-white font-bold">{userInfo?.name || 'Administrador'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5">
            <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tokens Activos:</span>
              <span className="text-white font-bold">{tokens.length} token(s) registrado(s)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Token Generation Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-600" />
              Gestión de Credencial de Acceso
            </h2>
            <p className="text-xs text-slate-500">
              Genera tu token Bearer único para conectar la extensión con tu base de datos de productos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleGenerateToken}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Key className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generando...' : 'Generar Token Nuevo'}</span>
            </button>

            {tokens.length > 0 && (
              <button
                type="button"
                onClick={handleRevokeTokens}
                disabled={isRevoking}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Revocar Existentes ({tokens.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Newly Generated Plain Token Notification Card */}
        {plainToken && (
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/80 p-5 space-y-3 shadow-inner">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-sm font-black">
                ¡Token generado con éxito! Cópialo ahora:
              </span>
            </div>

            <p className="text-xs text-emerald-700 leading-relaxed">
              ⚠️ <strong>Importante:</strong> Por motivos de cifrado y seguridad, este token solo se mostrará <strong>una sola vez</strong>. Pégalo de inmediato en la extensión de Chrome.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <input
                type="text"
                readOnly
                value={plainToken}
                className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-xl font-mono text-xs text-slate-900 font-bold tracking-wider select-all shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleCopyToken}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Token'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Tokens Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
              Tokens Activos en el Sistema
            </h3>
            <span className="text-[11px] text-slate-400">
              Nombre de clave: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">extension-chrome</code>
            </span>
          </div>

          {tokens.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl space-y-2">
              <Key className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-600">
                No tienes tokens activos para la extensión.
              </p>
              <p className="text-[11px] text-slate-400">
                Presiona el botón <strong className="text-indigo-600">"Generar Token Nuevo"</strong> para comenzar a extraer productos.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold text-[10px]">
                  <tr>
                    <th className="px-4 py-3">ID Token</th>
                    <th className="px-4 py-3">Identificador</th>
                    <th className="px-4 py-3">Fecha de Creación</th>
                    <th className="px-4 py-3">Último Uso</th>
                    <th className="px-4 py-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tokens.map((tok) => (
                    <tr key={tok.id} className="hover:bg-slate-50/60 transition-colors font-medium text-slate-700">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-600">#{tok.id}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 text-[11px] font-bold">
                          {tok.name}
                        </span>
                      </td>
                      <td className="px-4 py-3">{formatDate(tok.created_at)}</td>
                      <td className="px-4 py-3 font-semibold text-slate-500">{formatDate(tok.last_used_at || '')}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          ACTIVO
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Step by Step Configuration Guide */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-amber-500" />
            📖 Cómo Configurar la Extensión en Chrome (Paso a Paso)
          </h2>
          <p className="text-xs text-slate-500">
            Sigue estos 5 sencillos pasos para vincular tu navegador con IntegraPro:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Paso 1 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-indigo-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">1</span>
              <span>Abrir la Extensión</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              En tu navegador Google Chrome, haz clic en el ícono de la extensión <strong>"IntegraPro Scraper"</strong> en la barra superior.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-indigo-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">2</span>
              <span>Configuración de API</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              En la ventana emergente de la extensión, haz clic en el texto azul subrayado <strong>"Configuración de API"</strong>.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-indigo-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">3</span>
              <span>URL de tu Servidor</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              En el campo <strong>"URL de tu API"</strong>, escribe la dirección de tu sistema:
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <code className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-indigo-700 font-bold truncate">
                {apiUrl}
              </code>
              <button
                type="button"
                onClick={handleCopyApiUrl}
                className="p-1 text-slate-500 hover:text-slate-800 rounded bg-white border border-slate-200 cursor-pointer"
                title="Copiar URL"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-indigo-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">4</span>
              <span>Pegar el Token</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              En el campo <strong>"Token de Acceso"</strong>, pega el token personal generado arriba y presiona <strong>Guardar</strong>.
            </p>
          </div>

          {/* Paso 5 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2 lg:col-span-2">
            <div className="flex items-center gap-2 font-black text-xs text-emerald-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">5</span>
              <span>¡Listo para Extraer!</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Abre cualquier publicación de producto en <strong>Shein</strong>, <strong>Temu</strong>, <strong>AliExpress</strong> o <strong>Amazon</strong>. Abre la extensión y haz clic en <strong>"Extraer Producto 📦"</strong> o <strong>"Extraer Carrito Completo"</strong>. Aparecerá de inmediato en tus módulos de <strong>Compras</strong> e <strong>Inventario</strong> con fotos y variantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
