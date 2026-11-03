import { api } from "../lib/axios";
import type { ActualizarCitaInput, CrearCitaInput } from "../types/cita";

export const getAllCita = async () => {
    return await api.get('/citas')
}

export const getByIdCita = async (id:number) => {
    return await api.get(`/citas/${id}`)
}

export const createCita = async (data: CrearCitaInput) => {
    return await api.post('/citas', data)
}

export const updateCita = async (id:number, data: ActualizarCitaInput) => {
    return await api.patch(`/citas/${id}`, data);
}

export const removeCita = async (id:number) => {
    return await api.delete(`/citas/${id}`);
}