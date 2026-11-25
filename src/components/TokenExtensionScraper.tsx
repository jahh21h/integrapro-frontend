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
import { useLanguage } from '../context/LanguageContext';

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
  const { L, locale } = useLanguage();
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
        showToast(L('¡Token generado con éxito! Cópialo de inmediato.', 'Token generated successfully! Copy it right away.'));
        loadTokens();
      } else {
        showToast(L('Error al generar el token.', 'Error generating token.'));
      }
    } catch (err: any) {
      showToast(
        L('Error al generar token: ', 'Error generating token: ') +
          (err?.response?.data?.message || err?.message || L('Error desconocido', 'Unknown error'))
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRevokeTokens = async () => {
    if (
      !window.confirm(
        L(
          '¿Revocar todos los tokens de la extensión? La extensión en Chrome dejará de funcionar hasta que generes uno nuevo.',
          'Revoke all extension tokens? The Chrome extension will stop working until you generate a new one.'
        )
      )
    ) {
      return;
    }

    setIsRevoking(true);
    try {
      const res = await scraperApi.revokeTokens();
      if (res && res.success) {
        setPlainToken(null);
        showToast(L('Todos los tokens de la extensión fueron revocados.', 'All extension tokens have been revoked.'));
        loadTokens();
      }
    } catch (err: any) {
      showToast(L('Error al revocar tokens.', 'Error revoking tokens.'));
    } finally {
      setIsRevoking(false);
    }
  };

  const handleCopyToken = () => {
    if (!plainToken) return;
    navigator.clipboard.writeText(plainToken);
    setCopied(true);
    showToast(L('Token copiado al portapapeles', 'Token copied to clipboard'));
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyApiUrl = () => {
    navigator.clipboard.writeText(apiUrl);
    setCopiedUrl(true);
    showToast(L('URL de API copiada', 'API URL copied'));
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleTestConnection = async () => {
    setConnectionTestStatus('testing');
    try {
      const res = await scraperApi.getTokenInfo();
      if (res && res.success) {
        setConnectionTestStatus('success');
        showToast(L('✅ Conexión con el servidor API validada correctamente (200 OK)', '✅ API server connection verified successfully (200 OK)'));
      } else {
        setConnectionTestStatus('error');
      }
    } catch {
      setConnectionTestStatus('error');
      showToast(L('❌ Error de conexión al validar el servidor.', '❌ Connection error while validating server.'));
    }
    setTimeout(() => setConnectionTestStatus('idle'), 4000);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return L('Nunca', 'Never');
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(locale, {
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
                    {L('Token para Extensión Scraper', 'Scraper Extension Token')}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Chrome Extension API
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {L(
                    'Genera credenciales seguras para autenticar la extensión de navegador que extrae productos desde Shein, Temu, AliExpress y Amazon.',
                    'Generate secure credentials to authenticate the browser extension that imports products from Shein, Temu, AliExpress, and Amazon.'
                  )}
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
              <span>{connectionTestStatus === 'testing' ? L('Probando...', 'Testing...') : L('Probar Servidor', 'Test Server')}</span>
            </button>

            <button
              type="button"
              onClick={loadTokens}
              disabled={loading}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 cursor-pointer"
              title={L('Refrescar tokens', 'Refresh tokens')}
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
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{L('URL de tu Servidor:', 'Your Server URL:')}</span>
              <span className="font-mono text-white text-[11px] font-bold">{apiUrl}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{L('Usuario Asignado:', 'Assigned User:')}</span>
              <span className="text-white font-bold">{userInfo?.name || L('Administrador', 'Administrator')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5">
            <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{L('Tokens Activos:', 'Active Tokens:')}</span>
              <span className="text-white font-bold">{tokens.length} {L('token(s) registrado(s)', 'registered token(s)')}</span>
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
              {L('Gestión de Credencial de Acceso', 'Access Credential Management')}
            </h2>
            <p className="text-xs text-slate-500">
              {L(
                'Genera tu token Bearer único para conectar la extensión con tu base de datos de productos.',
                'Generate your unique Bearer token to connect the extension to your product catalog.'
              )}
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
              <span>{isGenerating ? L('Generando...', 'Generating...') : L('Generar Token Nuevo', 'Generate New Token')}</span>
            </button>

            {tokens.length > 0 && (
              <button
                type="button"
                onClick={handleRevokeTokens}
                disabled={isRevoking}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{L('Revocar Existentes', 'Revoke Existing')} ({tokens.length})</span>
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
                {L('¡Token generado con éxito! Cópialo ahora:', 'Token generated successfully! Copy it now:')}
              </span>
            </div>

            <p className="text-xs text-emerald-700 leading-relaxed">
              ⚠️ <strong>{L('Importante:', 'Important:')}</strong>{' '}
              {L(
                'Por motivos de cifrado y seguridad, este token solo se mostrará ',
                'For encryption and security reasons, this token will only be shown '
              )}
              <strong>{L('una sola vez', 'once')}</strong>.{' '}
              {L('Pégalo de inmediato en la extensión de Chrome.', 'Paste it into the Chrome extension right away.')}
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
                <span>{copied ? L('¡Copiado!', 'Copied!') : L('Copiar Token', 'Copy Token')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Tokens Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
              {L('Tokens Activos en el Sistema', 'Active System Tokens')}
            </h3>
            <span className="text-[11px] text-slate-400">
              {L('Nombre de clave:', 'Key name:')}{' '}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">extension-chrome</code>
            </span>
          </div>

          {tokens.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl space-y-2">
              <Key className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-600">
                {L('No tienes tokens activos para la extensión.', 'You have no active tokens for the extension.')}
              </p>
              <p className="text-[11px] text-slate-400">
                {L('Presiona el botón ', 'Click ')}
                <strong className="text-indigo-600">"{L('Generar Token Nuevo', 'Generate New Token')}"</strong>
                {L(' para comenzar a extraer productos.', ' to start importing products.')}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold text-[10px]">
                  <tr>
                    <th className="px-4 py-3">{L('ID Token', 'Token ID')}</th>
                    <th className="px-4 py-3">{L('Identificador', 'Identifier')}</th>
                    <th className="px-4 py-3">{L('Fecha de Creación', 'Created At')}</th>
                    <th className="px-4 py-3">{L('Último Uso', 'Last Used')}</th>
                    <th className="px-4 py-3">{L('Estado', 'Status')}</th>
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
                          {L('ACTIVO', 'ACTIVE')}
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
            {L('📖 Cómo Configurar la Extensión en Chrome (Paso a Paso)', '📖 How to Set Up the Chrome Extension (Step by Step)')}
          </h2>
          <p className="text-xs text-slate-500">
            {L('Sigue estos 5 sencillos pasos para vincular tu navegador con IntegraPro:', 'Follow these 5 simple steps to link your browser with IntegraPro:')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Paso 1 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-indigo-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">1</span>
              <span>{L('Abrir la Extensión', 'Open the Extension')}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {L('En tu navegador Google Chrome, haz clic en el ícono de la extensión ', 'In your Google Chrome browser, click the ')}
              <strong>"IntegraPro Scraper"</strong>
              {L(' en la barra superior.', ' extension icon in the top toolbar.')}
            </p>
          </div>

          {/* Paso 2 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-indigo-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">2</span>
              <span>{L('Configuración de API', 'API Settings')}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {L('En la ventana emergente de la extensión, haz clic en el texto azul subrayado ', 'In the extension popup window, click the underlined blue link ')}
              <strong>"{L('Configuración de API', 'API Settings')}"</strong>.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-indigo-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">3</span>
              <span>{L('URL de tu Servidor', 'Your Server URL')}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {L('En el campo ', 'In the ')}
              <strong>"{L('URL de tu API', 'Your API URL')}"</strong>
              {L(', escribe la dirección de tu sistema:', ' field, enter your system address:')}
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <code className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-indigo-700 font-bold truncate">
                {apiUrl}
              </code>
              <button
                type="button"
                onClick={handleCopyApiUrl}
                className="p-1 text-slate-500 hover:text-slate-800 rounded bg-white border border-slate-200 cursor-pointer"
                title={L('Copiar URL', 'Copy URL')}
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-indigo-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">4</span>
              <span>{L('Pegar el Token', 'Paste the Token')}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {L('En el campo ', 'In the ')}
              <strong>"{L('Token de Acceso', 'Access Token')}"</strong>
              {L(', pega el token personal generado arriba y presiona ', ' field, paste the personal token generated above and click ')}
              <strong>{L('Guardar', 'Save')}</strong>.
            </p>
          </div>

          {/* Paso 5 */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2 lg:col-span-2">
            <div className="flex items-center gap-2 font-black text-xs text-emerald-600 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">5</span>
              <span>{L('¡Listo para Extraer!', 'Ready to Import!')}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {L('Abre cualquier publicación de producto en ', 'Open any product listing on ')}
              <strong>Shein</strong>, <strong>Temu</strong>, <strong>AliExpress</strong> {L('o', 'or')} <strong>Amazon</strong>.{' '}
              {L('Abre la extensión y haz clic en ', 'Open the extension and click ')}
              <strong>"{L('Extraer Producto 📦', 'Import Product 📦')}"</strong> {L('o', 'or')}{' '}
              <strong>"{L('Extraer Carrito Completo', 'Import Full Cart')}"</strong>.{' '}
              {L('Aparecerá de inmediato en tus módulos de ', 'It will immediately appear in your ')}
              <strong>{L('Compras', 'Purchases')}</strong> {L('e', 'and')} <strong>{L('Inventario', 'Inventory')}</strong>
              {L(' con fotos y variantes.', ' modules with photos and variants.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
