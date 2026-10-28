import type { CitaFormData } from "../schemas/citaSchema";

export interface Medico {
    id:string;
    nombre:string;
    especialidad:string;
}
export const medicosClinica:Medico[] = [
    {
        id:'1',
        nombre:'Ana Lopez',
        especialidad:'cardiologia'
    },
    {
        id:'2',
        nombre:'Carlos Perez',
        especialidad:'pediatria'
    },
    {
        id:'3',
        nombre:'Maria Torres',
        especialidad:'psicologia'
    }
];

export const citaInicial:CitaFormData = {
    pacienteNombre: "",
    medicoId: "",
    fecha: "",
    hora: "",
    estado:'PROGRAMADA',
    motivo: "",
    urgencia: "MEDIA",
};

export const citasAgregadas:CitaFormData[] = [];