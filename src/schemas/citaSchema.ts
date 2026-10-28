import {z} from 'zod';

export const URGENCIAS = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'] as const;
export const ESTADOCITA = ['PROGRAMADA', 'COMPLETADA', 'CANCELADA'] as const;

export function obtenerFechaLocal():string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2,'0');
    const day = String(today.getDay()).padStart(2,'0');

    return `${year}-${month}-${day}`;
}

function esFechaReal(fecha:string):boolean {
    const [year,month,day] = fecha.split("-").map(Number)
    const fechaComprobada = new Date(year, month - 1, day);
    
    return (
        fechaComprobada.getFullYear() === year &&
        fechaComprobada.getMonth() === month-1 &&
        fechaComprobada.getDate() === day
    );
}

export const citaSchema = z.object({
    pacienteNombre: z
        .string()
        .trim()
        .min(3, 'El nombre debe tener al menos 3 caracteres'),

    medicoId: z
        .string()
        .min(1, 'Debes Selecionar un medico'),

    fecha: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato YYYY-MM-DD")
        .refine(esFechaReal,'La Fecha no es Valida')
        .refine((fecha) => fecha >= obtenerFechaLocal(), 'La Fecha debe ser Futura'),

    hora: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "La hora debe estar entre 00:00 y 23:59"),
    
    estado: z
        .enum(ESTADOCITA, {error:'Debes seleccionar un nivel de estado'}), 

    motivo: z
        .string()
        .trim()
        .min(10, "El motivo debe tener al menos 10 caracteres")
        .max(500, "El motivo no puede superar los 500 caracteres"),

    urgencia: z
        .enum(URGENCIAS, { error: "Debes seleccionar un nivel de urgencia", }),
});

export type UrgenciaCita = (typeof URGENCIAS)[number];
export type CitaFormData = z.infer<typeof citaSchema>;