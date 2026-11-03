import { NavLink } from 'react-router';
import type { Paciente } from '../../types/paciente';
import { BadgeEstado } from './BadgeEstado';

export interface PacienteProps {
    paciente:Paciente;
    onEliminar:(id:number) => void;
    onEditar:(paciente:Paciente) => void;
}

export function PacienteRow({paciente, onEliminar,onEditar}: PacienteProps) {
    const ultimaCita = paciente.cita?.length
        ? [...paciente.cita].sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0]
        : undefined;
    const fechaUltimaCita = ultimaCita
        ? new Date(ultimaCita.fecha).toLocaleDateString("es-MX")
        : 'Sin Citas';
    //Creamos las filas de la tabla con el <tr> de cada paciente y <td> para cada dato del paciente.
    return (
        <tr className="group border-b border-gray-100 transition-colors duration-150 hover:bg-blue-50/60">
        {/*--------------------------------------------------------------------------------------*/}
        <td className="py-4 pl-4 pr-3 sm:pl-6">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-semibold text-white">
                    {paciente.nombre.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                        {paciente.nombre} {paciente.apellido}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                        {paciente.email}
                    </p>
                </div>
            </div>
        </td>
        {/*--------------------------------------------------------------------------------------*/}
        <td className="hidden px-3 py-4 text-sm text-gray-600 sm:table-cell">
            {paciente.telefono}
        </td>
        {/*--------------------------------------------------------------------------------------*/}
        <td className="px-3 py-4">
            <BadgeEstado estado={paciente.estado} />
        </td>
        {/*--------------------------------------------------------------------------------------*/}
        <td className="hidden px-3 py-4 text-sm text-gray-600 md:table-cell">
            {fechaUltimaCita}
        </td>
        {/*--------------------------------------------------------------------------------------*/}
        <td className="py-4 pl-3 pr-4 text-right sm:pr-6">
            <div className="flex items-center justify-end gap-2">
                <NavLink to={`/pacientes/${paciente.id}`} className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                    <span className="hidden sm:inline">🔍</span>
                </NavLink>
                <button type="button" onClick={()=>onEliminar(paciente.id)} className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                    <span className="hidden sm:inline">❌ </span>
                </button>
                <button type="button" onClick={()=>onEditar(paciente)} className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                    <span className="hidden sm:inline">✏️</span>
                </button>
            </div>
        </td>
    </tr>
    )
}