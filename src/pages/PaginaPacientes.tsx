import { useState, type Dispatch, type SetStateAction } from "react";
import { BuscadorPacientes } from "../componentes/pacientes/BuscadorPacientes";
import { PacienteTable } from "../componentes/pacientes/PacienteTable";
import type { CrearPacienteInput, Paciente, PacienteFormData } from "../types/paciente";
import { FormularioPaciente } from "../componentes/pacientes/FormularioPaciente";
import * as pacienteService from '../services/pacientes';
import toast from "react-hot-toast";
import { extraerMensajeError } from "../lib/errorHandler";

interface PaginaPacienteProps {
  pacientes: Paciente[];
  setPacientes: Dispatch<SetStateAction<Paciente[]>>;
}

export function PaginaPaciente ({pacientes, setPacientes}:PaginaPacienteProps){
  const [query, setQuery] = useState('');
  const [estado, setEstado] = useState('todos');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [pacienteEditar, setPacienteEditar] = useState<Paciente | null>(null);

  const handleGuardarPaciente = async (datos:PacienteFormData, id?:number) => {
    try {
      if(!datos.estado) return;
      const datosBackend: CrearPacienteInput = {
        nombre: datos.nombre,
        apellido: datos.apellido,
        estado: datos.estado,
        fechaNacimiento: datos.fechaNacimiento,
        email: datos.email,
        telefono: datos.telefono,
      };
      if(id !== undefined){
        const respuesta = await pacienteService.update(id,datosBackend);
        setPacientes((prev) =>
          prev.map((paciente) =>
              paciente.id === id
                ? respuesta.data.data
                : paciente
          )
        );
        toast.success("Paciente Actualizado");
      } else {
        const respuesta = await pacienteService.create(datosBackend);
        setPacientes((prev) => [...prev, respuesta.data.data ]);
        toast.success("Paciente registrado");
      }
      setMostrarForm(false);
      setPacienteEditar(null);
      
    } catch (error:unknown) {
      toast.error(extraerMensajeError(error))
    }
  };

  const cerrar = () => {
    setMostrarForm(false);
    setPacienteEditar(null);
  }

  const abrirFormularioNuevo = () => {
    setPacienteEditar(null);
    setMostrarForm(true);
  }

  const handleEditarPaciente = (paciente:Paciente) => {
    setPacienteEditar(paciente);
    setMostrarForm(true);
  }

  const filtrado = pacientes.filter((paciente) => {
    const nombre = paciente.nombre.toLowerCase().includes(query.toLowerCase().trim());
    const filtro = estado === 'todos' || paciente.estado === estado;
    return nombre && filtro;
  });

  const handleEliminar = async (id:number) => {
    const encontrar = pacientes.find(p=>p.id===id);
    if (!encontrar) return;
    const eliminar = window.confirm('Seguro que deseas Eliminar el Paciente: '+encontrar?.nombre+' '+encontrar?.apellido)
    if(!eliminar) return;
    try {
      await pacienteService.remove(id);
      setPacientes((prev) => prev.filter((p) => p.id !== id));
      toast.success("Paciente Eliminado");
    } catch (error:unknown) {
      toast.error(extraerMensajeError(error))
    }
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
              <FormularioPaciente pacienteEditar={pacienteEditar} onCancelar={cerrar} onAgregar={handleGuardarPaciente} />
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