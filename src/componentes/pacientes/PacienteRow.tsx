import { NavLink } from 'react-router';
import type { Paciente } from '../../types/paciente';
import { BadgeEstado } from './BadgeEstado';

export interface PacienteProps extends Paciente{
    onEliminar:(id:number) => void;
    onEditar:(paciente:Paciente) => void;
}

export function PacienteRow({id, nombre, apellido, email, telefono, estado, especialidadAsignada, fechaNacimiento, onEliminar,onEditar}: PacienteProps) {
    //Creamos las filas de la tabla con el <tr> de cada paciente y <td> para cada dato del paciente.
    return (
        <tr className="group border-b border-gray-100 transition-colors duration-150 hover:bg-blue-50/60">
        {/*--------------------------------------------------------------------------------------*/}
        <td className="py-4 pl-4 pr-3 sm:pl-6">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-semibold text-white">
                    {nombre.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                        {nombre} {apellido}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                        {email}
                    </p>
                </div>
            </div>
        </td>
        {/*--------------------------------------------------------------------------------------*/}
        <td className="hidden px-3 py-4 text-sm text-gray-600 sm:table-cell">
            {telefono}
        </td>
        {/*--------------------------------------------------------------------------------------*/}
        <td className="px-3 py-4">
            <BadgeEstado estado={estado} />
        </td>
        {/*--------------------------------------------------------------------------------------*/}
        <td className="hidden px-3 py-4 text-sm text-gray-600 md:table-cell">
            {especialidadAsignada}
        </td>
        {/*--------------------------------------------------------------------------------------*/}
        <td className="hidden px-3 py-4 text-sm text-gray-600 md:table-cell">
            {fechaNacimiento}
        </td>
        {/*--------------------------------------------------------------------------------------*/}
        <td className="py-4 pl-3 pr-4 text-right sm:pr-6">
            <div className="flex items-center justify-end gap-2">
                <NavLink to={`/pacientes/${id}`} className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                    <span className="hidden sm:inline">🔍</span>
                </NavLink>
                <button type="button" onClick={()=>onEliminar(id)} className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                    <span className="hidden sm:inline">❌ </span>
                </button>
                <button type="button" onClick={()=>onEditar({id,nombre,apellido,email,telefono,estado,especialidadAsignada,fechaNacimiento})} className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                    <span className="hidden sm:inline">✏️</span>
                </button>
            </div>
        </td>
    </tr>
    )
}