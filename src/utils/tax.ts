/**
 * Módulo de Cálculo Fiscal y Tributario (SAT / Tax Compliance)
 * Cumplimiento con Decreto 27-92 (Ley del IVA) y Decreto 10-2012 (Ley de Actualización Tributaria)
 */
import { tLang } from '../context/LanguageContext';

export type TipoRegimenSAT = 'general' | 'pequeno_contribuyente' | 'exento';

export interface TaxCalculationResult {
  tipoRegimen: TipoRegimenSAT;
  regimenLabel: string;
  total: number;
  subtotalNeto: number; // Base imponible sin IVA
  ivaMonto: number;     // IVA Débito 12% (o 0 si pequeño contribuyente)
  porcentajeIva: number; // 12, 5 o 0
  impuestoCalculadoSAT: number; // 12% de IVA en General, o 5% directo en Pequeño Contribuyente
  tasaIvaTexto: string;
  fraseFiscalFEL: string; // Frase exigida por SAT para la factura electrónica DTE
  codigoFormularioSAT: string; // SAT-2046 para General, SAT-2047 para Pequeño Contribuyente
}

/**
 * Normaliza y clasifica el régimen tributario de la empresa
 */
export function getTipoRegimenSAT(regimenStr: string = ''): TipoRegimenSAT {
  const clean = (regimenStr || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (clean.includes('pequeno') || clean.includes('pequeno contribuyente') || clean.includes('5%') || clean.includes('small')) {
    return 'pequeno_contribuyente';
  }
  if (clean.includes('exento') || clean.includes('informal') || clean.includes('no factura') || clean.includes('0%') || clean.includes('exempt')) {
    return 'exento';
  }
  return 'general';
}

/**
 * Retorna la etiqueta estándar del régimen para mostrar al usuario
 */
export function formatRegimenLabel(regimenStr: string = ''): string {
  const tipo = getTipoRegimenSAT(regimenStr);
  if (tipo === 'pequeno_contribuyente') return tLang('Pequeño Contribuyente (5%)', 'Small Business (5% Flat)');
  if (tipo === 'exento') return tLang('Informal / Exento (0% IVA)', 'Tax-Exempt (0% VAT)');
  return tLang('General (IVA 12%)', 'Standard Tax (12% VAT)');
}

/**
 * Retorna el badge y estilo del régimen para barras de navegación y tarjetas
 */
export function getRegimenBadge(regimenStr: string = '') {
  const tipo = getTipoRegimenSAT(regimenStr);
  if (tipo === 'pequeno_contribuyente') {
    return {
      tipo,
      label: tLang('Pequeño Contribuyente (5%)', 'Small Business (5% Flat)'),
      badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
      shortLabel: tLang('5% SAT', '5% Flat Tax')
    };
  }
  if (tipo === 'exento') {
    return {
      tipo,
      label: tLang('Informal / Exento (0% IVA)', 'Tax-Exempt (0% VAT)'),
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      shortLabel: tLang('0% IVA', '0% VAT')
    };
  }
  return {
    tipo,
    label: tLang('General (IVA 12%)', 'Standard Tax (12% VAT)'),
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    shortLabel: tLang('IVA 12%', '12% VAT')
  };
}

/**
 * Calcula los impuestos para una venta según el régimen de la empresa emisora
 */
export function calculateSaleTaxes(total: number, regimenStr: string = ''): TaxCalculationResult {
  const validTotal = Math.max(0, Number(total) || 0);
  const tipo = getTipoRegimenSAT(regimenStr);

  if (tipo === 'pequeno_contribuyente') {
    const impuesto5 = +(validTotal * 0.05).toFixed(2);
    return {
      tipoRegimen: 'pequeno_contribuyente',
      regimenLabel: tLang('Pequeño Contribuyente (5%)', 'Small Business (5% Flat)'),
      total: validTotal,
      subtotalNeto: validTotal,
      ivaMonto: 0.00,
      porcentajeIva: 5,
      impuestoCalculadoSAT: impuesto5,
      tasaIvaTexto: tLang('0% IVA (No genera Crédito Fiscal)', '0% VAT (No Tax Credit Eligible)'),
      fraseFiscalFEL: tLang(
        'Factura de Pequeño Contribuyente. No genera derecho a crédito fiscal.',
        'Small Business Invoice. Does not generate VAT tax credit rights.'
      ),
      codigoFormularioSAT: tLang('SAT-2047', 'TAX-2047')
    };
  }

  if (tipo === 'exento') {
    return {
      tipoRegimen: 'exento',
      regimenLabel: tLang('Exento de Impuestos', 'Tax-Exempt'),
      total: validTotal,
      subtotalNeto: validTotal,
      ivaMonto: 0.00,
      porcentajeIva: 0,
      impuestoCalculadoSAT: 0.00,
      tasaIvaTexto: tLang('Exento de IVA', 'VAT Exempt'),
      fraseFiscalFEL: tLang(
        'Sujeto Exento de Impuestos según normativa legal vigente.',
        'Tax-Exempt entity under applicable tax regulations.'
      ),
      codigoFormularioSAT: tLang('SAT-EXENTO', 'TAX-EXEMPT')
    };
  }

  // Régimen General (IVA 12%)
  const baseImponible = +(validTotal / 1.12).toFixed(2);
  const iva = +(validTotal - baseImponible).toFixed(2);
  return {
    tipoRegimen: 'general',
    regimenLabel: tLang('Régimen General (IVA 12%)', 'Standard Tax Regime (12% VAT)'),
    total: validTotal,
    subtotalNeto: baseImponible,
    ivaMonto: iva,
    porcentajeIva: 12,
    impuestoCalculadoSAT: iva,
    tasaIvaTexto: tLang('IVA 12% Incluido', '12% VAT Included'),
    fraseFiscalFEL: tLang(
      'Sujeto a pagos trimestrales ISR según Decreto 10-2012 / IVA Débito Fiscal 12%',
      'Subject to quarterly income tax filings / 12% VAT Output Tax'
    ),
    codigoFormularioSAT: tLang('SAT-2046', 'TAX-2046')
  };
}

/**
 * Realiza la liquidación tributaria mensual según el régimen
 */
export function calculateMonthlyTaxSettlement(
  ventasTotales: number,
  comprasTotales: number,
  retencionesIvaRecibidas: number = 0,
  regimenStr: string = ''
) {
  const tipo = getTipoRegimenSAT(regimenStr);

  if (tipo === 'pequeno_contribuyente') {
    const impuestoBruto = +(ventasTotales * 0.05).toFixed(2);
    const impuestoAPagar = Math.max(0, +(impuestoBruto - retencionesIvaRecibidas).toFixed(2));

    return {
      tipoRegimen: tipo,
      codigoFormulario: tLang('SAT-2047 (Pequeño Contribuyente)', 'Form 2047 (Small Business 5%)'),
      ventasBrutas: ventasTotales,
      baseImponibleVentas: ventasTotales,
      tasaEfectiva: '5%',
      debitoFiscal: 0,
      impuestoDeterminado: impuestoBruto,
      comprasBrutas: comprasTotales,
      baseImponibleCompras: comprasTotales,
      creditoFiscal: 0, // No deducible
      creditoFiscalExplicacion: tLang(
        'Las compras no generan crédito fiscal en Pequeño Contribuyente (Art. 49 Dto. 27-92).',
        'Purchases do not generate deductible VAT tax credit under the Small Business 5% regime.'
      ),
      retencionesIvaRecibidas,
      totalAPagarSAT: impuestoAPagar,
      remanenteCredito: 0
    };
  }

  if (tipo === 'exento') {
    return {
      tipoRegimen: 'exento' as const,
      codigoFormulario: tLang('No Aplica (Régimen Informal / Exento)', 'N/A (Tax-Exempt Regime)'),
      ventasBrutas: ventasTotales,
      baseImponibleVentas: ventasTotales,
      tasaEfectiva: tLang('0% (Exento)', '0% (Exempt)'),
      debitoFiscal: 0,
      impuestoDeterminado: 0,
      comprasBrutas: comprasTotales,
      baseImponibleCompras: comprasTotales,
      creditoFiscal: 0,
      creditoFiscalExplicacion: tLang(
        'Operación bajo régimen informal/exento: no genera crédito ni débito fiscal SAT.',
        'Operating under Tax-Exempt regime: generates no VAT debit or tax credit.'
      ),
      retencionesIvaRecibidas: 0,
      totalAPagarSAT: 0,
      remanenteCredito: 0
    };
  }

  // Régimen General (SAT-2046)
  const baseVentas = +(ventasTotales / 1.12).toFixed(2);
  const debitoFiscal = +(ventasTotales - baseVentas).toFixed(2);

  const baseCompras = +(comprasTotales / 1.12).toFixed(2);
  const creditoFiscal = +(comprasTotales - baseCompras).toFixed(2);

  const saldoAntesRetenciones = debitoFiscal - creditoFiscal;
  const saldoFinal = saldoAntesRetenciones - retencionesIvaRecibidas;

  return {
    tipoRegimen: tipo,
    codigoFormulario: tLang('SAT-2046 (IVA General)', 'Form 2046 (Standard 12% VAT)'),
    ventasBrutas: ventasTotales,
    baseImponibleVentas: baseVentas,
    tasaEfectiva: '12%',
    debitoFiscal,
    impuestoDeterminado: debitoFiscal,
    comprasBrutas: comprasTotales,
    baseImponibleCompras: baseCompras,
    creditoFiscal,
    creditoFiscalExplicacion: tLang(
      'Crédito fiscal deducible al 12% sobre compras y servicios afectos.',
      'Deductible 12% VAT tax credit on eligible purchases and services.'
    ),
    retencionesIvaRecibidas,
    totalAPagarSAT: saldoFinal > 0 ? +saldoFinal.toFixed(2) : 0,
    remanenteCredito: saldoFinal < 0 ? +Math.abs(saldoFinal).toFixed(2) : 0
  };
}
