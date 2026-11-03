import type { Cita } from "../../types/cita";
import { CitasRow } from "./CitasRow"; 

interface CitaTableProps {
    citas:Cita[],
    onEditar: (cita:Cita) => void;
    onEliminar: (id:number) => void;
}

export function CitaTable({citas, onEditar, onEliminar, }: CitaTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 sm:pl-6" >
                            Paciente
                        </th>

                        <th className="hidden px-3 py-3 text-left text-xs font-semibold text-gray-500 sm:table-cell" >
                            Médico
                        </th>

                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 sm:pl-6" >
                            Estado
                        </th>

                        <th className="hidden px-3 py-3 text-left text-xs font-semibold text-gray-500 sm:table-cell" >
                            Urgencia
                        </th>

                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 sm:pl-6" >
                            Fecha y hora
                        </th>

                        <th className="hidden px-3 py-3 text-left text-xs font-semibold text-gray-500 sm:table-cell" >
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                    {
                        citas.length === 0
                                    ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center text-sm text-gray-400">
                                                No Hay Citas Para Mostrar
                                            </td>
                                        </tr>
                                    )
                                    : (
                                        citas.map((cita) => (
                                            <CitasRow
                                                key={cita.id}
                                                cita={cita}
                                                onEditar={onEditar}
                                                onEliminar={onEliminar}
                                            />
                                        ))
                                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}