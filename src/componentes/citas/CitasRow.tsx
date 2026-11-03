import { ESTADO_CITA_CONFIG, formatearFechaHora, URGENCIA_CONFIG, type Cita } from "../../types/cita";

export interface CitaProps {
    cita:Cita,
    onEditar: (cita:Cita) => void;
    onEliminar: (id:number) => void;
}

export function CitasRow ({cita, onEditar, onEliminar}:CitaProps) {
    const estado = ESTADO_CITA_CONFIG[cita.estado];
    const urgencia = URGENCIA_CONFIG[cita.urgencia];
    return (
    <tr className="group border-b border-gray-100 transition-colors duration-150 hover:bg-blue-50/60">
      <td className="py-4 pl-4 pr-3 sm:pl-6">
        <p className="truncate text-sm font-semibold text-gray-900">
          {cita.paciente.nombre}
        </p>
      </td>

      <td className="hidden px-3 py-4 text-sm text-gray-600 sm:table-cell">
        <p className="truncate">{cita.medico.nombre}</p>
        <p className="truncate text-xs text-gray-400">
          {cita.medico.especialidad.nombre}
        </p>
      </td>

      <td className="px-3 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${estado.classes}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${estado.dot}`} />
          {estado.label}
        </span>
      </td>

      <td className="hidden px-3 py-4 md:table-cell">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${urgencia.classes}`}
        >
          {urgencia.label}
        </span>
      </td>

      <td className="hidden px-3 py-4 text-sm text-gray-600 lg:table-cell">
        {formatearFechaHora(cita.fecha)}
      </td>

      <td className="py-4 pl-3 pr-4 text-right sm:pr-6">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <span className="hidden lg:inline">Ver detalle</span>
          </button>
          <button
            type="button"
            onClick={() => onEditar?.(cita)}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-150 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          >
            <span className="hidden lg:inline">Editar</span>
          </button>
          <button
            type="button"
            onClick={() => onEliminar?.(cita.id)}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-150 hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30"
          >
            <span className="hidden lg:inline">Eliminar</span>
          </button>
        </div>
      </td>
    </tr>
  );
}