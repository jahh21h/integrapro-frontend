// Patrones oficiales de codificación EAN-13
const L_CODES: Record<number, string> = {
  0: '0001101', 1: '0011001', 2: '0010011', 3: '0111101', 4: '0100011',
  5: '0110001', 6: '0101111', 7: '0111011', 8: '0110111', 9: '0001011'
};

const G_CODES: Record<number, string> = {
  0: '0100111', 1: '0110011', 2: '0011011', 3: '0100001', 4: '0011101',
  5: '0111001', 6: '0000101', 7: '0010001', 8: '0001001', 9: '0010111'
};

const R_CODES: Record<number, string> = {
  0: '1110010', 1: '1100110', 2: '1101100', 3: '1000010', 4: '1011100',
  5: '1001110', 6: '1010000', 7: '1000100', 8: '1001000', 9: '1110100'
};

// Paridad según el primer dígito
const PARITY_MAP: Record<number, string> = {
  0: 'LLLLLL', 1: 'LLGLGG', 2: 'LLGGLG', 3: 'LLGGGL', 4: 'LGLLGG',
  5: 'LGGLLG', 6: 'LGGGLL', 7: 'LGLGLG', 8: 'LGLGGL', 9: 'LGGLGL'
};

// Cálculo oficial del Dígito de Control EAN-13 (Check Digit)
export function calculateEanCheckDigit(digits12: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const d = parseInt(digits12[i] || '0', 10);
    sum += i % 2 === 0 ? d : d * 3;
  }
  const remainder = sum % 10;
  return remainder === 0 ? 0 : 10 - remainder;
}

// Genera un código EAN-13 único guatemalteco (Prefijo 740)
export function generateGuatemalaEan13(productIndex: number = 1): string {
  // 740 = Guatemala, 100 = Prefijo empresa
  const randomPart = Math.floor(10000 + Math.random() * 90000).toString();
  const indexStr = (productIndex % 10).toString();
  const first12 = `740100${randomPart.slice(0, 5)}${indexStr}`.slice(0, 12);
  const checkDigit = calculateEanCheckDigit(first12);
  return `${first12}${checkDigit}`;
}

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export default function BarcodeSVG({ 
  value, 
  width = 220, 
  height = 70, 
  showText = true 
}: BarcodeProps) {
  // Asegurar formato de 13 dígitos
  let cleanDigits = value.replace(/\D/g, '');
  if (cleanDigits.length < 12) {
    cleanDigits = cleanDigits.padEnd(12, '0');
  }
  if (cleanDigits.length === 12) {
    cleanDigits += calculateEanCheckDigit(cleanDigits);
  }
  const ean13 = cleanDigits.slice(0, 13);

  const firstDigit = parseInt(ean13[0], 10);
  const parity = PARITY_MAP[firstDigit] || 'LLLLLL';

  let modules = '101'; // Guardia de inicio

  // Primeros 6 dígitos
  for (let i = 1; i <= 6; i++) {
    const digit = parseInt(ean13[i], 10);
    const codeType = parity[i - 1];
    modules += codeType === 'L' ? L_CODES[digit] : G_CODES[digit];
  }

  modules += '01010'; // Guardia central

  // Últimos 6 dígitos
  for (let i = 7; i <= 12; i++) {
    const digit = parseInt(ean13[i], 10);
    modules += R_CODES[digit];
  }

  modules += '101'; // Guardia final

  // Renderizar barras en SVG
  const moduleWidth = width / modules.length;

  return (
    <div className="inline-flex flex-col items-center bg-white p-2 rounded-xl">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {modules.split('').map((bit, index) => {
          if (bit === '1') {
            // Guardias son un poco más largas
            const isGuard = index < 3 || (index >= 45 && index < 50) || index >= 92;
            const barHeight = isGuard ? height : height - 8;

            return (
              <rect
                key={index}
                x={index * moduleWidth}
                y={0}
                width={moduleWidth}
                height={barHeight}
                fill="#0f172a"
              />
            );
          }
          return null;
        })}
      </svg>
      {showText && (
        <span className="font-mono text-xs font-bold tracking-widest text-slate-800 mt-1 select-all">
          {ean13.slice(0, 1)} {ean13.slice(1, 7)} {ean13.slice(7, 13)}
        </span>
      )}
    </div>
  );
}
