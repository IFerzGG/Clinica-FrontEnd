import { useState, type Dispatch, type SetStateAction } from 'react';
import FormularioCita from '../componentes/citas/FormularioCita';
import type { ActualizarCitaInput, Cita, CitaFormulario, CrearCitaInput } from '../types/cita';
import type { Paciente } from '../types/paciente';
import { CitaTable } from '../componentes/citas/CitasTable';
import { BuscadorCitas } from '../componentes/citas/BuscadorCitas';
import * as citasService from '../services/citas';
import toast from 'react-hot-toast';
import { extraerMensajeError } from '../lib/errorHandler';
import type { Medicos } from '../types/medico';

interface PaginaCitasProps {
  citas: Cita[];
  medicos:Medicos[]
  pacientes: Paciente[];
  setCitas: Dispatch<SetStateAction<Cita[]>>;
}

export function PaginaNuevaCita({ citas, pacientes, medicos, setCitas }: PaginaCitasProps) {
  const [query, setQuery] = useState('');
  const [estado, setEstado] = useState('todos');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [citaEditar, setCitaEditar] = useState<Cita | null>(null);

  const cerrar = () => { setMostrarForm(false); setCitaEditar(null); };
  const filtrado = citas.filter((cita) => {
    const nombre = (cita.paciente?.nombre ?? '').toLowerCase().includes(query.toLowerCase().trim());
    return nombre && (estado === 'todos' || estado === cita.estado);
  });

  const handleGuardar = async (datos: CitaFormulario, id?: number) => {
    const fecha = new Date(datos.fechaHora);
    if (Number.isNaN(fecha.getTime())) {
      toast.error('La fecha y hora no son válidas');
      return;
    }
    const citaBackend: CrearCitaInput = {
      estado: datos.estado,
      fecha: fecha.toISOString(),
      motivo: datos.motivo.trim(),
      urgencia: datos.urgencia,
      pacienteId: Number(datos.pacienteId),
      medicoId: Number(datos.medicoId),
    };

    try {
      if (id !== undefined) {
        const updatePayload: ActualizarCitaInput = citaBackend;
        await citasService.updateCita(id, updatePayload);
        const response = await citasService.getAllCita();
        setCitas(response.data.data);
        toast.success('Cita actualizada');
      } else {
        await citasService.createCita(citaBackend);
        const response = await citasService.getAllCita();
        setCitas(response.data.data);
        toast.success('Cita agendada');
      }
      cerrar();
    } catch (error: unknown) {
      toast.error(extraerMensajeError(error));
    }
  };

  const handleEliminar = async (id: number) => {
    if (!citas.some((cita) => cita.id === id) || !window.confirm('¿Seguro que deseas eliminar esta cita?')) return;
    try {
      await citasService.removeCita(id);
      setCitas((prev) => prev.filter((cita) => cita.id !== id));
      toast.success('Cita eliminada');
    } catch (error: unknown) {
      toast.error(extraerMensajeError(error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h1 className="text-2xl font-bold text-gray-900">Agenda médica</h1><p className="mt-1 text-sm text-gray-500">Administra la programación de citas médicas.</p></div>
          <button type="button" onClick={() => { setCitaEditar(null); setMostrarForm(true); }} className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Agendar cita</button>
        </header>
        {mostrarForm && (
          <div onClick={cerrar} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()} className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl shadow-xl">
              <FormularioCita citaEditar={citaEditar} pacientes={pacientes} medicos={medicos} onCancelar={cerrar} onGuardar={handleGuardar} />
            </div>
          </div>
        )}
        <div className="mb-6"><BuscadorCitas query={query} onQuery={setQuery} onFiltro={setEstado} /></div>
        <CitaTable citas={filtrado} onEliminar={handleEliminar} onEditar={(cita) => { setCitaEditar(cita); setMostrarForm(true); }} />
      </div>
    </div>
  );
}
