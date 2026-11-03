import { api } from "../lib/axios";
import type { ActualizarPaciente, CrearPacienteInput} from "../types/paciente";

export interface ApiResponse<T> {
  data: T;
}

export const getAll = async() => {
    return await api.get('/paciente');
}

export const getById = async(id:number) => {
    return await api.get(`/paciente/${id}`)
}

export const create = async(data: CrearPacienteInput) => {
    return await api.post('/paciente', data)
}

export const update = async(id:number, data: ActualizarPaciente) => {
    return await api.put(`/paciente/${id}`, data);
}

export const remove = async(id:number) => {
    return await api.delete(`/paciente/${id}`);
}