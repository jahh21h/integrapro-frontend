/**
 * Utilidades de Aislamiento Multi-Tenant Estricto
 * Garantiza que ninguna empresa pueda ver registros pertenecientes a otra empresa
 * (fail-closed: ante registros sin id_empresa en empresas distintas a 1, se bloquean).
 */

export function getStoredActiveEmpresaId(): number | null {
  try {
    const raw = localStorage.getItem('integrapro_active_empresa_id');
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export function extractRecordEmpresaId(record: any): number | null {
  if (!record || typeof record !== 'object') return null;

  const candidates = [
    record.id_empresa,
    record.empresa_id,
    record.empresa?.id_empresa,
    record.empresa?.id,
    record.sucursal?.id_empresa,
    record.sucursal?.empresa_id,
  ];

  for (const candidate of candidates) {
    if (candidate !== undefined && candidate !== null && candidate !== '') {
      const num = Number(candidate);
      if (Number.isFinite(num) && num > 0) {
        return num;
      }
    }
  }

  return null;
}

export interface TenantFilterResult<T> {
  items: T[];
  rejectedCount: number;
  hasUnscopedRecords: boolean;
}

/**
 * Filtra estrictamente una colección proveniente del API para una empresa específica.
 * - Si un registro trae `id_empresa` / `empresa_id`: solo pasa si coincide exactamente con `activeEmpresaId`.
 * - Si un registro NO trae `id_empresa` (respuesta sin scope del backend):
 *   - Solo se permite en empresa 1 (Fashion Styles, tenant base heredado).
 *   - En cualquier otra empresa (Fortexa 22, QA 25, Aceitera 18, nuevas, etc.) se rechaza (fail-closed)
 *     para impedir que el inventario/datos de Fashion Styles se filtren a otros tenants.
 */
export function filterRecordsByTenant<T>(
  records: T[],
  activeEmpresaId: number | null | undefined
): TenantFilterResult<T> {
  const targetId = Number(activeEmpresaId);
  if (!Array.isArray(records) || !Number.isFinite(targetId) || targetId <= 0) {
    return { items: [], rejectedCount: Array.isArray(records) ? records.length : 0, hasUnscopedRecords: false };
  }

  const items: T[] = [];
  let rejectedCount = 0;
  let hasUnscopedRecords = false;

  for (const record of records) {
    const recEmpresaId = extractRecordEmpresaId(record);
    if (recEmpresaId !== null) {
      if (recEmpresaId === targetId) {
        items.push(record);
      } else {
        rejectedCount++;
      }
    } else {
      hasUnscopedRecords = true;
      if (targetId === 1) {
        items.push(record);
      } else {
        rejectedCount++;
      }
    }
  }

  return { items, rejectedCount, hasUnscopedRecords };
}
