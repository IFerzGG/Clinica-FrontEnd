import { useParams } from "react-router"
import { pacientesIniciales, type EstadoPaciente, type Paciente } from "../types/paciente";
import { NotFound } from "./NotFound";
import { BadgeEstado } from "../componentes/pacientes/BadgeEstado";

const colorPorEstado: Record<EstadoPaciente, string> = {
  ACTIVO: 'bg-emerald-500',
  INACTIVO: 'bg-rose-500',
  EN_ESPERA: 'bg-yellow-500',
};

interface DetalleProps {
    pacientes:Paciente[]
}

export function PaginaDetallePacientes ({pacientes}:DetalleProps) {
    const {id} = useParams();
    const paciente = pacientes.find((p) => String(p.id) === id)

    if(!paciente){
        return <NotFound/>
    }
    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <div>
                <p className="mb-2 text-sm text-gray-500">
                    Pacientes / Detalle del Paciente
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Detalle del Paciente
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Informacion general y medica del paciente
                        </p>
                    </div>

                    <span className="inline-flex w-fit items-center gap-2 rounded-full  px-3 py-1.5 text-sm font-medium ">
                        <span className={`h-2 w-2 rounded-full ${colorPorEstado[paciente.estado]}`} />
                        <BadgeEstado estado={paciente.estado} />
                    </span>
                </div>
            </div>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-2xl font-bold text-white">
                        P
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900">
                            {paciente.nombre} {paciente.apellido}
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Paciente registrado en la clinica
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                    Informacion Personal
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Datos generales de contacto
                </p>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-500">
                            Nombre Completo
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                            {paciente.nombre} {paciente.apellido}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Correo Electronico
                        </p>
                        <p className="mt-1 break-words font-medium text-gray-900">
                            {paciente.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Telefono
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                            {paciente.telefono}
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                    Informacion Medica
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Especialidad Asignada y Fecha de Nacimiento
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-sm font-medium text-blue-700">
                            Especialidad Asignada
                        </p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">
                            {paciente.especialidadAsignada}
                        </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm font-medium text-gray-500">
                            Fecha de Nacimiento
                        </p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">
                            {paciente.fechaNacimiento}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}