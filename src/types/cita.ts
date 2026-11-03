export const ESTADOS_CITA = ['PROGRAMADA', 'COMPLETADA', 'CANCELADA'] as const;
export const URGENCIAS_CITA = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'] as const;
export type EstadoCita = (typeof ESTADOS_CITA)[number];
export type UrgenciaCita = (typeof URGENCIAS_CITA)[number];

export interface Cita {
  id: number;
  estado: EstadoCita;
  fecha: string;
  motivo: string;
  urgencia: UrgenciaCita;
  pacienteId: number;
  medicoId: number;
  paciente: { nombre: string; apellido?: string };
  medico: { nombre: string; especialidad: { nombre: string } };
}

export interface CitaFormulario {
  pacienteId: string;
  medicoId: string;
  fechaHora: string;
  estado: EstadoCita;
  motivo: string;
  urgencia: UrgenciaCita;
}

export interface CrearCitaInput {
  estado: EstadoCita;
  fecha: string;
  motivo: string;
  urgencia: UrgenciaCita;
  pacienteId: number;
  medicoId: number;
}

export type ActualizarCitaInput = Partial<CrearCitaInput>;

export const URGENCIA_CONFIG: Record<UrgenciaCita, { label: string; classes: string }> = {
  BAJA: { label: 'Baja', classes: 'bg-sky-50 text-sky-700 ring-sky-600/20' },
  MEDIA: { label: 'Media', classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  ALTA: { label: 'Alta', classes: 'bg-red-50 text-red-700 ring-red-600/20' },
  CRITICA: { label: 'Crítica', classes: 'bg-red-50 text-red-700 ring-red-600/20' },
};

export const ESTADO_CITA_CONFIG: Record<EstadoCita, { label: string; classes: string; dot: string }> = {
  PROGRAMADA: { label: 'Programada', classes: 'bg-blue-50 text-blue-700 ring-blue-600/20', dot: 'bg-blue-500' },
  COMPLETADA: { label: 'Completada', classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20', dot: 'bg-emerald-500' },
  CANCELADA: { label: 'Cancelada', classes: 'bg-red-50 text-red-700 ring-red-600/20', dot: 'bg-red-500' },
};

export function formatearFechaHora(iso: string): string {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return iso;
  return fecha.toLocaleString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
