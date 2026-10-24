import React, { useState } from "react";
import { estadoInicial, type FormPaciente, type Paciente } from "../../types/paciente";

type FormularioProps = {
    pacienteEditar:Paciente | null;
    onCancelar:() => void;
    onAgregar:(paciente:Paciente) => void;
}

export function FormularioPaciente({pacienteEditar, onCancelar, onAgregar}:FormularioProps) {
    const [formulario, setFormulario] = useState<FormPaciente|Paciente>(pacienteEditar??estadoInicial)

    const handleNombreChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormulario({...formulario, nombre: e.target.value})
    }
    const handleChangeDefinitivo = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormulario((prev) => ({...prev, [name]:value}))
    }

    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!formulario.nombre.trim() || !formulario.apellido.trim() || !formulario.email.trim() || !formulario.estado){
            return;
        }

        const nuevoPaciente:Paciente = {
            id: pacienteEditar?.id ?? Date.now(),
            ...formulario,
            estado:formulario.estado,
        }

        onAgregar(nuevoPaciente)
    }

    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <header className="mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
                        +
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {pacienteEditar ? 'Editar Paciente' : 'Agregar Paciente'}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Completa la información del Paciente.
                        </p>
                    </div>

                </div>
            </header>
            {/*=================================================================================================================*/}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-gray-700" >
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={formulario.nombre}
                            onChange={handleNombreChange}
                            placeholder="Ej. Juan"
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-300"
                        />
                    </div>

                    {/* Apellido */}
                    <div>
                        <label htmlFor="apellido" className="mb-1.5 block text-sm font-medium text-gray-700" >
                            Apellido
                        </label>
                        <input
                            id="apellido"
                            name="apellido"
                            type="text"
                            value={formulario.apellido}
                            onChange={(e) => setFormulario({...formulario,apellido:e.target.value})}
                            placeholder="Ej. Pérez"
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-300"
                        />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700" >
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formulario.email}
                            onChange={handleChangeDefinitivo}
                            placeholder="juan@ejemplo.com"
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-300"
                        />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium text-gray-700" >
                            Teléfono
                        </label>
                        <input
                            id="telefono"
                            name="telefono"
                            type="tel"
                            value={formulario.telefono}
                            onChange={handleChangeDefinitivo}
                            placeholder="Ej. 5512345678"
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-300"
                        />
                    </div>

                    {/* Estado */}
                    <div>
                        <label htmlFor="estado" className="mb-1.5 block text-sm font-medium text-gray-700" >
                            Estado
                        </label>
                        <select
                            id="estado"
                            name="estado"
                            value={formulario.estado}
                            onChange={handleChangeDefinitivo}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-300"
                        >
                            <option value="" disabled>
                                Seleccionar estado
                            </option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                            <option value="en_espera">En espera</option>
                        </select>
                    </div>

                    {/* Especialidad */}
                    <div className="sm:col-span-2">
                        <label htmlFor="especialidadAsignada" className="mb-1.5 block text-sm font-medium text-gray-700" >
                            Especialidad asignada
                        </label>
                        <select
                            id="especialidadAsignada"
                            name="especialidadAsignada"
                            value={formulario.especialidadAsignada}
                            onChange={handleChangeDefinitivo}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-300"
                        >
                            <option value="" disabled>
                                Seleccionar especialidad
                            </option>
                            <option value="medicina_general">
                                Medicina general
                            </option>
                            <option value="cardiologia">Cardiología</option>
                            <option value="dermatologia">Dermatología</option>
                            <option value="pediatria">Pediatría</option>
                            <option value="psicologia">Psicología</option>
                        </select>
                    </div>

                    {/* Última cita */}
                    <div className="sm:col-span-2">
                        <label htmlFor="ultimaCita" className="mb-1.5 block text-sm font-medium text-gray-700" >
                            Última cita
                        </label>
                        <input
                            id="ultimaCita"
                            name="ultimaCita"
                            type="date"
                            value={formulario.ultimaCita}
                            onChange={handleChangeDefinitivo }
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-300"
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onCancelar} className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50" >
                        Cancelar
                    </button>

                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700" >
                        <span aria-hidden="true">+</span>
                        {pacienteEditar ? 'Guardar Cambios' : ' Aceptar'}
                    </button>
                </div>
            </form>
        </section>
    );
}