/**
 * Módulo de Cálculo Fiscal y Tributario de Guatemala (SAT)
 * Cumplimiento con Decreto 27-92 (Ley del IVA) y Decreto 10-2012 (Ley de Actualización Tributaria)
 */

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
  if (clean.includes('pequeno') || clean.includes('pequeno contribuyente') || clean.includes('5%')) {
    return 'pequeno_contribuyente';
  }
  if (clean.includes('exento') || clean.includes('informal') || clean.includes('no factura') || clean.includes('0%')) {
    return 'exento';
  }
  return 'general';
}

/**
 * Retorna la etiqueta estándar del régimen para mostrar al usuario
 */
export function formatRegimenLabel(regimenStr: string = ''): string {
  const tipo = getTipoRegimenSAT(regimenStr);
  if (tipo === 'pequeno_contribuyente') return 'Pequeño Contribuyente (5%)';
  if (tipo === 'exento') return 'Informal / Exento (0% IVA)';
  return 'General (IVA 12%)';
}

/**
 * Retorna el badge y estilo del régimen para barras de navegación y tarjetas
 */
export function getRegimenBadge(regimenStr: string = '') {
  const tipo = getTipoRegimenSAT(regimenStr);
  if (tipo === 'pequeno_contribuyente') {
    return {
      tipo,
      label: 'Pequeño Contribuyente (5%)',
      badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
      shortLabel: '5% SAT'
    };
  }
  if (tipo === 'exento') {
    return {
      tipo,
      label: 'Informal / Exento (0% IVA)',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      shortLabel: '0% IVA'
    };
  }
  return {
    tipo,
    label: 'General (IVA 12%)',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    shortLabel: 'IVA 12%'
  };
}

/**
 * Calcula los impuestos para una venta según el régimen de la empresa emisora
 * 
 * Reglas SAT Guatemala:
 * - Régimen General: Precios al público incluyen 12% de IVA.
 *   Base Imponible = Total / 1.12
 *   IVA Débito Fiscal = Total - Base Imponible
 * 
 * - Régimen Pequeño Contribuyente: Tasa fija del 5% sobre ventas brutas.
 *   Por ley (Art. 47-50 Dto. 27-92), NO genera derecho a crédito fiscal.
 *   El IVA (12%) es Q0.00 para el comprador.
 *   El impuesto a pagar por el contribuyente a SAT es Total * 5%.
 */
export function calculateSaleTaxes(total: number, regimenStr: string = ''): TaxCalculationResult {
  const validTotal = Math.max(0, Number(total) || 0);
  const tipo = getTipoRegimenSAT(regimenStr);

  if (tipo === 'pequeno_contribuyente') {
    const impuesto5 = +(validTotal * 0.05).toFixed(2);
    return {
      tipoRegimen: 'pequeno_contribuyente',
      regimenLabel: 'Pequeño Contribuyente (5%)',
      total: validTotal,
      subtotalNeto: validTotal,
      ivaMonto: 0.00,
      porcentajeIva: 5,
      impuestoCalculadoSAT: impuesto5,
      tasaIvaTexto: '0% IVA (No genera Crédito Fiscal)',
      fraseFiscalFEL: 'Factura de Pequeño Contribuyente. No genera derecho a crédito fiscal.',
      codigoFormularioSAT: 'SAT-2047'
    };
  }

  if (tipo === 'exento') {
    return {
      tipoRegimen: 'exento',
      regimenLabel: 'Exento de Impuestos',
      total: validTotal,
      subtotalNeto: validTotal,
      ivaMonto: 0.00,
      porcentajeIva: 0,
      impuestoCalculadoSAT: 0.00,
      tasaIvaTexto: 'Exento de IVA',
      fraseFiscalFEL: 'Sujeto Exento de Impuestos según normativa legal vigente.',
      codigoFormularioSAT: 'SAT-EXENTO'
    };
  }

  // Régimen General (IVA 12%)
  const baseImponible = +(validTotal / 1.12).toFixed(2);
  const iva = +(validTotal - baseImponible).toFixed(2);
  return {
    tipoRegimen: 'general',
    regimenLabel: 'Régimen General (IVA 12%)',
    total: validTotal,
    subtotalNeto: baseImponible,
    ivaMonto: iva,
    porcentajeIva: 12,
    impuestoCalculadoSAT: iva,
    tasaIvaTexto: 'IVA 12% Incluido',
    fraseFiscalFEL: 'Sujeto a pagos trimestrales ISR según Decreto 10-2012 / IVA Débito Fiscal 12%',
    codigoFormularioSAT: 'SAT-2046'
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
    // En Pequeño Contribuyente:
    // Impuesto = 5% sobre ventas brutas.
    // Compras no generan crédito fiscal deducible.
    const impuestoBruto = +(ventasTotales * 0.05).toFixed(2);
    const impuestoAPagar = Math.max(0, +(impuestoBruto - retencionesIvaRecibidas).toFixed(2));

    return {
      tipoRegimen: tipo,
      codigoFormulario: 'SAT-2047 (Pequeño Contribuyente)',
      ventasBrutas: ventasTotales,
      baseImponibleVentas: ventasTotales,
      tasaEfectiva: '5%',
      debitoFiscal: 0,
      impuestoDeterminado: impuestoBruto,
      comprasBrutas: comprasTotales,
      baseImponibleCompras: comprasTotales,
      creditoFiscal: 0, // No deducible
      creditoFiscalExplicacion: 'Las compras no generan crédito fiscal en Pequeño Contribuyente (Art. 49 Dto. 27-92).',
      retencionesIvaRecibidas,
      totalAPagarSAT: impuestoAPagar,
      remanenteCredito: 0
    };
  }

  if (tipo === 'exento') {
    // En Régimen Informal / Exento:
    // No genera Débito Fiscal ni Crédito Fiscal a SAT (0% IVA).
    return {
      tipoRegimen: 'exento' as const,
      codigoFormulario: 'No Aplica (Régimen Informal / Exento)',
      ventasBrutas: ventasTotales,
      baseImponibleVentas: ventasTotales,
      tasaEfectiva: '0% (Exento)',
      debitoFiscal: 0,
      impuestoDeterminado: 0,
      comprasBrutas: comprasTotales,
      baseImponibleCompras: comprasTotales,
      creditoFiscal: 0,
      creditoFiscalExplicacion: 'Operación bajo régimen informal/exento: no genera crédito ni débito fiscal SAT.',
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
    codigoFormulario: 'SAT-2046 (IVA General)',
    ventasBrutas: ventasTotales,
    baseImponibleVentas: baseVentas,
    tasaEfectiva: '12%',
    debitoFiscal,
    impuestoDeterminado: debitoFiscal,
    comprasBrutas: comprasTotales,
    baseImponibleCompras: baseCompras,
    creditoFiscal,
    creditoFiscalExplicacion: 'Crédito fiscal deducible al 12% sobre compras y servicios afectos.',
    retencionesIvaRecibidas,
    totalAPagarSAT: saldoFinal > 0 ? +saldoFinal.toFixed(2) : 0,
    remanenteCredito: saldoFinal < 0 ? +Math.abs(saldoFinal).toFixed(2) : 0
  };
}
