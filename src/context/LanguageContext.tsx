import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export type AppLang = 'es' | 'en';

const STORAGE_KEY = 'integrapro_lang';

let activeLangMemory: AppLang = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
})();

export function getCurrentLang(): AppLang {
  return activeLangMemory;
}

export function tLang(es: string, en: string): string {
  return activeLangMemory === 'en' ? en : es;
}

export function getCurrencySymbol(lang: AppLang = activeLangMemory): string {
  return lang === 'en' ? '$' : 'Q';
}

export function getCurrencyCode(lang: AppLang = activeLangMemory): 'USD' | 'GTQ' {
  return lang === 'en' ? 'USD' : 'GTQ';
}

export function getAppLocale(lang: AppLang = activeLangMemory): 'en-US' | 'es-GT' {
  return lang === 'en' ? 'en-US' : 'es-GT';
}

export function formatMoney(amount: number, lang: AppLang = activeLangMemory): string {
  const safe = Number.isFinite(Number(amount)) ? Number(amount) : 0;
  const formatted = safe.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return lang === 'en' ? `$${formatted}` : `Q ${formatted}`;
}

export function translatePaymentMethod(raw?: string | null, lang: AppLang = activeLangMemory): string {
  const clean = String(raw || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  if (clean.includes('tarj') || clean.includes('card')) return lang === 'en' ? 'Card' : 'Tarjeta';
  if (clean.includes('transf') || clean.includes('bank') || clean.includes('wire')) return lang === 'en' ? 'Bank Transfer' : 'Transferencia';
  if (clean.includes('cred')) return lang === 'en' ? 'Credit' : 'Crédito';
  if (clean.includes('mixt')) return lang === 'en' ? 'Mixed' : 'Mixto';
  return lang === 'en' ? 'Cash' : 'Efectivo';
}

export function translateStatus(raw?: string | null, lang: AppLang = activeLangMemory): string {
  const clean = String(raw || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  if (clean === 'pagado' || clean === 'pagada' || clean === 'paid') return lang === 'en' ? 'Paid' : 'Pagado';
  if (clean === 'parcial' || clean === 'partial') return lang === 'en' ? 'Partial' : 'Parcial';
  if (clean === 'pendiente' || clean === 'pending') return lang === 'en' ? 'Pending' : 'Pendiente';
  if (clean === 'vencido' || clean === 'vencida' || clean === 'overdue') return lang === 'en' ? 'Overdue' : 'Vencido';
  if (clean === 'completado' || clean === 'completada' || clean === 'completed') return lang === 'en' ? 'Completed' : 'Completado';
  if (clean === 'anulado' || clean === 'anulada' || clean === 'void' || clean === 'cancelled') return lang === 'en' ? 'Voided' : 'Anulado';
  if (clean === 'recibida' || clean === 'recibido' || clean === 'received') return lang === 'en' ? 'Received' : 'Recibida';
  if (clean === 'en_transito' || clean === 'en transito' || clean === 'in_transit') return lang === 'en' ? 'In Transit' : 'En Tránsito';
  if (clean === 'activo' || clean === 'activa' || clean === 'active') return lang === 'en' ? 'Active' : 'Activo';
  if (clean === 'inactivo' || clean === 'inactiva' || clean === 'inactive') return lang === 'en' ? 'Inactive' : 'Inactivo';
  if (clean === 'en_linea' || clean === 'en linea' || clean === 'online') return lang === 'en' ? 'Online' : 'En línea';
  if (clean === 'aprobada' || clean === 'aprobado' || clean === 'approved') return lang === 'en' ? 'Approved' : 'Aprobada';
  if (clean === 'borrador' || clean === 'draft') return lang === 'en' ? 'Draft' : 'Borrador';
  return String(raw || '');
}

export function translateRegime(raw?: string | null, lang: AppLang = activeLangMemory): string {
  const clean = String(raw || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (clean.includes('pequeno') || clean.includes('5%') || clean.includes('small')) {
    return lang === 'en' ? 'Small Business (5% Flat)' : 'Pequeño Contribuyente (5%)';
  }
  if (clean.includes('informal') || clean.includes('exento') || clean.includes('0%') || clean.includes('exempt')) {
    return lang === 'en' ? 'Tax-Exempt (0% VAT)' : 'Informal / Exento (0% IVA)';
  }
  return lang === 'en' ? 'Standard Tax (12% VAT)' : 'General (IVA 12%)';
}

export function translateClientName(raw?: string | null, lang: AppLang = activeLangMemory): string {
  const txt = String(raw || '').trim();
  if (!txt) return lang === 'en' ? 'Walk-in Customer' : 'Consumidor Final';
  const low = txt.toLowerCase();
  if (low === 'consumidor final' || low === 'consumidor final (cf)' || low === 'c/f' || low === 'cf') {
    return lang === 'en' ? 'Walk-in Customer' : 'Consumidor Final';
  }
  if (low === 'cliente') {
    return lang === 'en' ? 'Customer' : 'Cliente';
  }
  return txt;
}

export function translateTaxId(raw?: string | null, lang: AppLang = activeLangMemory): string {
  const txt = String(raw || '').trim();
  if (!txt || txt.toUpperCase() === 'CF' || txt.toUpperCase() === 'C/F') {
    return lang === 'en' ? 'N/A' : 'CF';
  }
  return txt;
}

interface LanguageContextValue {
  lang: AppLang;
  isEn: boolean;
  setLang: (next: AppLang) => void;
  toggleLang: () => void;
  L: (es: string, en: string) => string;
  money: (amount: number) => string;
  currencySymbol: string;
  currencyCode: 'USD' | 'GTQ';
  locale: 'en-US' | 'es-GT';
  taxIdLabel: string;
  trPayment: (raw?: string | null) => string;
  trStatus: (raw?: string | null) => string;
  trRegime: (raw?: string | null) => string;
  trClient: (raw?: string | null) => string;
  trTaxId: (raw?: string | null) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  isEn: false,
  setLang: () => {},
  toggleLang: () => {},
  L: (es) => es,
  money: (a) => formatMoney(a, 'es'),
  currencySymbol: 'Q',
  currencyCode: 'GTQ',
  locale: 'es-GT',
  taxIdLabel: 'NIT',
  trPayment: (r) => translatePaymentMethod(r, 'es'),
  trStatus: (r) => translateStatus(r, 'es'),
  trRegime: (r) => translateRegime(r, 'es'),
  trClient: (r) => translateClientName(r, 'es'),
  trTaxId: (r) => translateTaxId(r, 'es'),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<AppLang>(activeLangMemory);

  const setLang = useCallback((next: AppLang) => {
    activeLangMemory = next;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(activeLangMemory === 'en' ? 'es' : 'en');
  }, [setLang]);

  useEffect(() => {
    activeLangMemory = lang;
    try {
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    isEn: lang === 'en',
    setLang,
    toggleLang,
    L: (es: string, en: string) => (lang === 'en' ? en : es),
    money: (amount: number) => formatMoney(amount, lang),
    currencySymbol: getCurrencySymbol(lang),
    currencyCode: getCurrencyCode(lang),
    locale: getAppLocale(lang),
    taxIdLabel: lang === 'en' ? 'Tax ID' : 'NIT',
    trPayment: (raw?: string | null) => translatePaymentMethod(raw, lang),
    trStatus: (raw?: string | null) => translateStatus(raw, lang),
    trRegime: (raw?: string | null) => translateRegime(raw, lang),
    trClient: (raw?: string | null) => translateClientName(raw, lang),
    trTaxId: (raw?: string | null) => translateTaxId(raw, lang),
  }), [lang, setLang, toggleLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
