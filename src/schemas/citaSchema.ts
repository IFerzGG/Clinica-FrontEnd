import { z } from 'zod';
import { ESTADOS_CITA, URGENCIAS_CITA } from '../types/cita';

export function obtenerFechaLocal(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export const citaSchema = z.object({
  pacienteId: z
    .string()
    .min(1, 'Selecciona un paciente')
    .refine((id) => Number.isInteger(Number(id)) && Number(id) > 0, 'Selecciona un paciente válido'),

  medicoId: z
    .string()
    .min(1, 'Selecciona un médico')
    .refine((id) => Number.isInteger(Number(id)) && Number(id) > 0, 'Selecciona un médico válido'),

  fechaHora: z
    .string()
    .min(1, 'Indica la fecha y hora')
    .refine((value) => !Number.isNaN(new Date(value).getTime()), 'Fecha y hora no válidas'),

  estado: z
    .enum(ESTADOS_CITA),

  motivo: z
    .string()
    .trim()
    .min(1, 'El motivo es obligatorio')
    .max(250, 'El motivo no puede superar 250 caracteres'),

  urgencia: z
    .enum(URGENCIAS_CITA),
});

export type CitaFormData = z.infer<typeof citaSchema>;
