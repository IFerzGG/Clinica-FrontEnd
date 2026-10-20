import { BuscadorPacientes } from "../componentes/BuscadorPacientes";
import { PacienteTable } from "../componentes/PacienteTable";
import { pacientesIniciales } from "../types/paciente";

export function PaginaPaciente (){
    return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="mt-1 text-sm text-gray-500">Listado de pacientes de la clínica médica</p>
        </header>
        <div className="mb-6">
          <BuscadorPacientes/>
        </div>
        <PacienteTable pacientes={pacientesIniciales} />
      </div>
    </div>
  )
}