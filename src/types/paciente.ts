export type EstadoPaciente = 'activo' | 'inactivo' | 'en_espera';

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidadAsignada: string;
  ultimaCita: string;
  estado: EstadoPaciente;
}

export type FormPaciente = Omit<Paciente, "id" | "estado"> & {
  estado: EstadoPaciente | "";
};

export const estadoInicial:FormPaciente = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  estado: "",
  especialidadAsignada: "",
  ultimaCita: "",
}

export const pacientesIniciales:Paciente[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'usuario@example.com',
    telefono: '123-456-7890',
    especialidadAsignada: 'Cardiología',
    ultimaCita: '2023-10-15',
    estado: 'activo'
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'Gómez',
    email: 'usuario@example.com',
    telefono: '098-765-4321',
    especialidadAsignada: 'Neurología',
    ultimaCita: '2023-10-16',
    estado: 'inactivo'
  },
  {
    id: 3,
    nombre: 'Carlos',
    apellido: 'López',
    email: 'usuario@example.com',
    telefono: '555-555-5555',
    especialidadAsignada: 'Medicina General',
    ultimaCita: '2023-10-17',
    estado: 'en_espera'
  },
  {
    id: 4,
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'usuario@example.com',
    telefono: '111-222-3333',
    especialidadAsignada: 'Pediatría',
    ultimaCita: '2023-10-18',
    estado: 'activo'
  },
  {
    id: 5,
    nombre: 'Luis',
    apellido: 'Rodríguez',
    email: 'usuario@example.com',
    telefono: '444-444-4444',
    especialidadAsignada: 'Dermatología',
    ultimaCita: '2023-10-19',
    estado: 'inactivo'
  }
]