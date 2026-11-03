import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { citaSchema, type CitaFormData } from '../../schemas/citaSchema';
import type { Cita, CitaFormulario } from '../../types/cita';
import type { Paciente } from '../../types/paciente';
import { useMedicos } from '../../hooks/useMedicos';
import type { Medicos } from '../../types/medico';

interface Props {
  citaEditar: Cita | null;
  medicos:Medicos[]
  pacientes: Paciente[];
  onCancelar: () => void;
  onGuardar: (datos: CitaFormulario, id?: number) => Promise<void>;
}

function aFechaHoraLocal(fecha: string): string {
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function FormularioCita({ citaEditar, pacientes, medicos, onCancelar, onGuardar }: Props) {
  //const { medicos, cargando } = useMedicos();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CitaFormData>({
    resolver: zodResolver(citaSchema),
    defaultValues: { pacienteId: '', medicoId: '', fechaHora: '', estado: 'PROGRAMADA', motivo: '', urgencia: 'MEDIA' },
  });

  useEffect(() => {
    if (!citaEditar) {
      reset({ pacienteId: '', medicoId: '', fechaHora: '', estado: 'PROGRAMADA', motivo: '', urgencia: 'MEDIA' });
      return;
    }
    reset({
      pacienteId: String(citaEditar.pacienteId),
      medicoId: String(citaEditar.medicoId),
      fechaHora: aFechaHoraLocal(citaEditar.fecha),
      estado: citaEditar.estado,
      motivo: citaEditar.motivo,
      urgencia: citaEditar.urgencia,
    });
  }, [citaEditar, reset]);

  const clase = 'w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';
  const error = 'mt-1 text-sm text-red-600';

  const submit = async (datos: CitaFormData) => {
    await onGuardar(datos, citaEditar?.id);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-6 border-b border-gray-100 pb-4">
        <h2 id="titulo-formulario" className="text-xl font-bold text-gray-900">{citaEditar ? 'Editar cita' : 'Agregar cita'}</h2>
        <p className="mt-1 text-sm text-gray-500">Completa los datos de la consulta.</p>
      </header>
{/*==========================================================================================================================================*/}
      <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
        <div>
          <label htmlFor="pacienteId" className="mb-1 block font-medium text-gray-700">
            Paciente
          </label>
          <select id="pacienteId" {...register('pacienteId')} className={clase} >
            <option value=""> Selecciona un paciente </option>
            {pacientes.map((paciente) => <option key={paciente.id} value={paciente.id}>{paciente.nombre} {paciente.apellido}</option>)}
          </select>
          {errors.pacienteId && <p className={error}>{errors.pacienteId.message}</p>}
        </div>
{/*==========================================================================================================================================*/}
        <div>
          <label htmlFor="medicoId" className="mb-1 block font-medium text-gray-700">
            Médico
          </label>
          <select id="medicoId" {...register('medicoId')} className={clase}>
            <option value=""> Selecciona un médico </option>
            {medicos.map((medico) => <option key={medico.id} value={medico.id}>{medico.nombre}--{medico.especialidad.nombre}</option>)}
          </select>
          {errors.medicoId && <p className={error}>{errors.medicoId.message}</p>}
        </div>
{/*==========================================================================================================================================*/}
        <div>
          <label htmlFor="fechaHora" className="mb-1 block font-medium text-gray-700">
            Fecha y hora
          </label>
          <input id="fechaHora" type="datetime-local" {...register('fechaHora')} className={clase} />
          {errors.fechaHora && <p className={error}>{errors.fechaHora.message}</p>}
        </div>
{/*==========================================================================================================================================*/}        
        <div>
          <label htmlFor="estado" className="mb-1 block font-medium text-gray-700">
            Estado
          </label>
          <select id="estado" {...register('estado')} className={clase}>
            <option value="PROGRAMADA">Programada</option>
            <option value="COMPLETADA">Completada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
          {errors.estado && <p className={error}>{errors.estado.message}</p>}
        </div>
{/*==========================================================================================================================================*/}        
        <div>
          <label htmlFor="motivo" className="mb-1 block font-medium text-gray-700">
            Motivo
          </label>
          <textarea id="motivo" rows={3} {...register('motivo')} className={clase} />
          {errors.motivo && <p className={error}>{errors.motivo.message}</p>}
        </div>
{/*==========================================================================================================================================*/}
        <div>
          <label htmlFor="urgencia" className="mb-1 block font-medium text-gray-700">
            Urgencia
          </label>
          <select id="urgencia" {...register('urgencia')} className={clase}>
            <option value="BAJA">Baja</option>
            <option value="MEDIA">Media</option>
            <option value="ALTA">Alta</option>
            <option value="CRITICA">Crítica</option>
          </select>
          {errors.urgencia && <p className={error}>{errors.urgencia.message}</p>}
        </div>
{/*==========================================================================================================================================*/}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancelar} className="rounded-lg border px-4 py-2 text-gray-700">
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60">
            {isSubmitting ? 'Guardando…' : citaEditar ? 'Guardar cambios' : 'Agendar cita'}
          </button>
        </div>
      </form>
    </section>
  );
}
