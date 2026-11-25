/**
 * Utilidades de Geolocalización y Geocerca (Geofencing) para Control de Asistencias
 * Sincronizado exactamente con App\Filament\Pages\MarcarAsistencia.php y App\Models\Sucursal.php de Laravel
 */
import { getCurrentLang, tLang } from '../context/LanguageContext';

export interface BranchLocation {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
  radioPermitidoMetros: number; // Radio permitido en metros (Laravel: radio_permitido)
  direccion: string;
}

export const BRANCH_LOCATIONS: Record<string, BranchLocation> = {
  'Sucursal Central': {
    id: 1,
    nombre: 'Sucursal Central - Ciudad',
    latitud: 14.5986,
    longitud: -90.5187,
    radioPermitidoMetros: 50,
    direccion: '7a Avenida 12-45 Zona 9, Ciudad de Guatemala'
  },
  'Sucursal Norte': {
    id: 2,
    nombre: 'Sucursal Norte - Carretera al Atlántico',
    latitud: 14.6542,
    longitud: -90.4612,
    radioPermitidoMetros: 50,
    direccion: 'Km 14.5 Carretera al Atlántico, Zona 18'
  },
  'Sucursal Sur': {
    id: 3,
    nombre: 'Sucursal Sur - Villa Nueva',
    latitud: 14.5263,
    longitud: -90.5891,
    radioPermitidoMetros: 50,
    direccion: 'Calzada Concepción 5-10, Villa Nueva'
  }
};

/**
 * Calcula la distancia en metros entre dos coordenadas geográficas utilizando la fórmula de Haversine.
 * Idéntico a calcularDistancia() en MarcarAsistencia.php de Laravel.
 */
export function calcularDistanciaHaversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadius = 6371000; // Radio de la Tierra en metros

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

export interface GeofenceValidationResult {
  permitido: boolean;
  distanciaMetros: number;
  radioPermitido: number;
  sucursalNombre: string;
  latitudUsuario: number;
  longitudUsuario: number;
  latitudSucursal: number;
  longitudSucursal: number;
  mensaje: string;
}

/**
 * Valida si el colaborador se encuentra dentro del radio permitido de sucursal.
 * Si está fuera, bloquea el marcaje hasta que esté en su lugar de trabajo.
 */
export function validarUbicacionMarcaje(
  userLat: number,
  userLng: number,
  sucursalNombre: string
): GeofenceValidationResult {
  const cleanName = sucursalNombre.replace(/^(Sucursal|Branch)\s+/i, '').trim();
  const aliasMap: Record<string, string> = {
    'Central Branch': 'Sucursal Central',
    'North Branch': 'Sucursal Norte',
    'South Branch': 'Sucursal Sur',
    'Central': 'Sucursal Central',
    'Norte': 'Sucursal Norte',
    'North': 'Sucursal Norte',
    'Sur': 'Sucursal Sur',
    'South': 'Sucursal Sur',
  };
  const sucursal =
    BRANCH_LOCATIONS[sucursalNombre] ||
    BRANCH_LOCATIONS[aliasMap[sucursalNombre] || ''] ||
    BRANCH_LOCATIONS[aliasMap[cleanName] || ''] ||
    BRANCH_LOCATIONS[`Sucursal ${cleanName}`] ||
    BRANCH_LOCATIONS['Sucursal Central'];

  const distancia = Math.round(
    calcularDistanciaHaversine(userLat, userLng, sucursal.latitud, sucursal.longitud)
  );

  const permitido = distancia <= sucursal.radioPermitidoMetros;

  const displayBranchName = getCurrentLang() === 'en'
    ? (sucursal.id === 1
        ? 'Central Branch - Downtown'
        : sucursal.id === 2
        ? 'North Branch - Atlantic Highway'
        : sucursal.id === 3
        ? 'South Branch - Villa Nueva'
        : sucursal.nombre.replace(/^Sucursal\b/i, 'Branch'))
    : sucursal.nombre;

  const mensaje = permitido
    ? tLang(
        `Ubicación autorizada: Te encuentras a ${distancia}m de ${displayBranchName} (dentro del perímetro de ${sucursal.radioPermitidoMetros}m).`,
        `Location authorized: You are ${distancia}m from ${displayBranchName} (within the ${sucursal.radioPermitidoMetros}m geofence).`
      )
    : tLang(
        `Acceso restringido: Te encuentras a ${distancia}m de tu lugar de trabajo (${displayBranchName}). El radio permitido es de ${sucursal.radioPermitidoMetros}m.`,
        `Access restricted: You are ${distancia}m from your workplace (${displayBranchName}). The allowed radius is ${sucursal.radioPermitidoMetros}m.`
      );

  return {
    permitido,
    distanciaMetros: distancia,
    radioPermitido: sucursal.radioPermitidoMetros,
    sucursalNombre: displayBranchName,
    latitudUsuario: userLat,
    longitudUsuario: userLng,
    latitudSucursal: sucursal.latitud,
    longitudSucursal: sucursal.longitud,
    mensaje
  };
}
