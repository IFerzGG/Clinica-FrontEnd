import { useState, type Dispatch, type SetStateAction } from "react";
import { BuscadorPacientes } from "../componentes/BuscadorPacientes";
import { PacienteTable } from "../componentes/PacienteTable";
import type { Paciente } from "../types/paciente";
import { FormularioPaciente } from "../componentes/FormularioPaciente";

interface PaginaPacienteProps {
  pacientes: Paciente[];
  setPacientes: Dispatch<SetStateAction<Paciente[]>>;
}

export function PaginaPaciente ({pacientes, setPacientes}:PaginaPacienteProps){
  const [query, setQuery] = useState('');
  const [estado, setEstado] = useState('todos');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [pacienteEditar, setPacienteEditar] = useState<Paciente | null>(null);

  const handleAgregarPaciente = (nuevoPaciente:Paciente) => {
    setPacientes((prev) => [...prev, nuevoPaciente]);
    setMostrarForm(false);
  }

  const cerrar = () => {
    setMostrarForm(false);
    setPacienteEditar(null);
  }

  const abrirFormularioNuevo = () => {
    setPacienteEditar(null);
    setMostrarForm(true);
  }

  const handleActualizarPaciente = (pacienteActualizado: Paciente) => {
    setPacientes((prev) =>
        prev.map((paciente) =>
            paciente.id === pacienteActualizado.id
                ? pacienteActualizado
                : paciente
        )
    );

    setMostrarForm(false);
    setPacienteEditar(null);
};

  const handleEditarPaciente = (paciente:Paciente) => {
    setPacienteEditar(paciente);
    setMostrarForm(true);
  }

  const filtrado = pacientes.filter((paciente) => {
    const nombre = paciente.nombre.toLowerCase().includes(query.toLowerCase().trim());
    const filtro = estado === 'todos' || paciente.estado === estado;
    return nombre && filtro;
  });

  const handleEliminar = (id:number) => {
    const encontrar = pacientes.find(p=>p.id===id);
    const eliminar = window.confirm('Seguro que deseas Eliminar el Paciente: '+encontrar?.nombre+' '+encontrar?.apellido)
    if(!eliminar) return;
    setPacientes((prev) => prev.filter((p) => p.id !== id));
  }
  
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
            <p className="mt-1 text-sm text-gray-500">Listado de pacientes de la clínica médica</p>
            <p className="mt-1 text-sm text-gray-500">{filtrado.length}{' '} Paciente(s) encontrado(s)</p>
          </div>
          <button type="button" onClick={abrirFormularioNuevo} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500/30">
            + Agregar paciente
          </button>
        </header>
        {mostrarForm && (
          <div onClick={cerrar} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-labelledby="titulo-formulario" onClick={(e) => e.stopPropagation()} className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl" >
              <FormularioPaciente key={pacienteEditar?.id ?? 'nuevo'} pacienteEditar={pacienteEditar} onCancelar={cerrar} onAgregar={pacienteEditar ? handleActualizarPaciente : handleAgregarPaciente} />
            </div>
          </div>
        )}
        <div className="mb-6">
          <BuscadorPacientes query={query} onQuery={setQuery} onFiltro={setEstado}/>
        </div>
        <PacienteTable pacientes={filtrado} onEliminar={handleEliminar} onEditar={handleEditarPaciente}/>
      </div>
    </div>
  )
}