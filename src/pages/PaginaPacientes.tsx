import { useState } from "react";
import { BuscadorPacientes } from "../componentes/BuscadorPacientes";
import { PacienteTable } from "../componentes/PacienteTable";
import { pacientesIniciales } from "../types/paciente";
import type {Paciente} from "../types/paciente";

export function PaginaPaciente (){
  const [query, setQuery] = useState('')
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesIniciales);
  const [estado, setEstado] = useState('todos')

  const filtrado = pacientes.filter((paciente) => {
    const nombre = paciente.nombre.toLowerCase().includes(query.toLowerCase().trim());
    const filtro = estado === 'todos' || paciente.estado === estado;
    return nombre && filtro;
  });

  const handleEliminar = (id:number) => {
    setPacientes((prev) => prev.filter((p) => p.id !== id));
  }
  
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="mt-1 text-sm text-gray-500">Listado de pacientes de la clínica médica</p>
        </header>
        <div className="mb-6">
          <BuscadorPacientes query={query} onQuery={setQuery} onFiltro={setEstado}/>
        </div>
        <PacienteTable pacientes={filtrado} onEliminar={handleEliminar} />
      </div>
    </div>
  )
}