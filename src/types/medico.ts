export interface Medic {
    id:string;
    nombre:string;
    especialidad:string;
}
export const medicosClinica:Medic[] = [
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

export interface Medicos {
    id:number;
    nombre:string;
    email:string;
    telefono:string;
    especialidadId:number;
    especialidad:{
        id:number;
        nombre:string;
    }
}