import { PacienteRow } from "../componentes/PacienteRow";
import type { Paciente } from "../types/paciente"

export interface PacienteProps {
    pacientes:Paciente[];
}

export function PacienteTable({pacientes}:PacienteProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {/*--------------------------------------------------------------------------------------*/}
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 sm:pl-6">
                                Paciente
                            </th>
                            {/*--------------------------------------------------------------------------------------*/}
                            <th className="hidden px-3 py-3 text-xs font-semibold text-gray-500 sm:table-cell">
                                Telefono
                            </th>
                            {/*--------------------------------------------------------------------------------------*/}
                            <th className="px-3 py-3 text-xs font-semibold text-gray-500">
                                Estado
                            </th>
                            {/*--------------------------------------------------------------------------------------*/}
                            <th className="px-3 py-3 text-xs font-semibold text-gray-500">
                                Especialidad
                            </th>
                            {/*--------------------------------------------------------------------------------------*/}
                            <th className="hidden px-3 py-3 text-xs font-semibold text-gray-500 md:table-cell">
                                Ultima Cita
                            </th>
                            {/*--------------------------------------------------------------------------------------*/}
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 sm:pr-6">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {
                            pacientes.length === 0
                                ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-sm text-gray-400">
                                            No Hay Pacientes Para Mostrar
                                        </td>
                                    </tr>
                                )
                                : (
                                    pacientes.map((paciente) => (
                                        <PacienteRow 
                                            id={paciente.id}
                                            nombre={paciente.nombre}
                                            apellido={paciente.apellido}
                                            email={paciente.email}
                                            telefono={paciente.telefono}
                                            estado={paciente.estado}
                                            especialidadAsignada={paciente.especialidadAsignada}
                                            ultimaCita={paciente.ultimaCita}
                                        />
                                    ))
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}