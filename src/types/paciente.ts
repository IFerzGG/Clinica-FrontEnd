import type { Cita } from "./cita";

export const ESTADO_PACIENTE = ['ACTIVO', 'INACTIVO','EN_ESPERA'] as const;
export type EstadoPaciente = (typeof ESTADO_PACIENTE)[number]

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  estado: EstadoPaciente;
  fechaNacimiento: string;
  email: string;
  telefono: string;
  cita?:Cita[]
}

export type CrearPacienteInput = Omit<Paciente,'id'|'cita'>
export type ActualizarPaciente = Partial<CrearPacienteInput>

export type PacienteFormData = Omit<Paciente, "id" | "estado" | 'cita'> & {
  estado: EstadoPaciente | "";
};

export const pacienteInicial:PacienteFormData = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  estado: "",
  fechaNacimiento: "",
}