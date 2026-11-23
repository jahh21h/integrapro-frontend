/**
 * Caché en memoria estrictamente aislada por empresa (id_empresa)
 * Evita que los módulos conectados a MySQL (POS, Inventario, Ventas, Clientes/CxC, Compras)
 * muestren datos estáticos/vacíos y luego salten al llegar la respuesta del servidor al cambiar de pestaña.
 * Se limpia completamente al cerrar sesión.
 */

const cacheStore = new Map<string, unknown>();

function buildKey(empresaId: number, namespace: string): string {
  return `${Number(empresaId) || 0}:${namespace}`;
}

export function getLiveCache<T>(empresaId: number, namespace: string): T | null {
  const key = buildKey(empresaId, namespace);
  if (!cacheStore.has(key)) return null;
  return cacheStore.get(key) as T;
}

export function setLiveCache<T>(empresaId: number, namespace: string, value: T): void {
  const key = buildKey(empresaId, namespace);
  cacheStore.set(key, value);
}

export function clearLiveCache(empresaId?: number): void {
  if (empresaId === undefined) {
    cacheStore.clear();
    return;
  }
  const prefix = `${Number(empresaId) || 0}:`;
  Array.from(cacheStore.keys()).forEach((key) => {
    if (key.startsWith(prefix)) {
      cacheStore.delete(key);
    }
  });
}
