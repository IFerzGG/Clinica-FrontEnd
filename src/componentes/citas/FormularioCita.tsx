import { useState, type Dispatch, type SetStateAction } from "react";
import { useMedicos } from "../../hooks/useMedicos";
import { citaSchema, obtenerFechaLocal, type CitaFormData } from "../../schemas/citaSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { citaInicial } from "../../types/medico"; 

interface FormularioCitasProps {
  setCitas: Dispatch<SetStateAction<CitaFormData[]>>;
}

export default function FormularioCita({setCitas}:FormularioCitasProps) {
    const {medicos, cargando} = useMedicos();
    const [confirmacion, setConfirmacion] = useState<CitaFormData | null>(null);

    const {register, handleSubmit, reset, formState:{errors, isSubmitting} } = useForm<CitaFormData>({
        resolver: zodResolver(citaSchema),
        defaultValues:citaInicial,
    });

    const onSubmit = async (datos:CitaFormData):Promise<void> => {
        await new Promise<void> ((resolve) => {
            setTimeout(resolve, 1500);
        });
        setConfirmacion(datos);
        setCitas((citasActuales) => [...citasActuales, datos]);
        reset();
    }

    const claseNombre = 'w-full rounded-lg border px-3 py-2 outline-none focus:ring-2';
    const campoClase = (tieneError:boolean):string => 
        `${claseNombre} ${
            tieneError
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
        }`;
    const errorClase = "mt-1 text-sm text-red-600";

    const agendarOtraCita = () => {
        reset();
        setConfirmacion(null);
    }

    if(confirmacion) {
        const medicoSeleccionado = medicos.find((medico) => medico.id === confirmacion.medicoId);

        return (
            <section className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 text-center">
                    <div className="mb-3 text-4xl text-green-600">
                        ✓
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Cita Agendada !
                        </h2>
                    <p className="mt-2 text-gray-600">
                        La Cita se registro correctamente en esta simulacion
                    </p>
                </div>

                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                    <p>
                        <strong>
                            Paciente:
                        </strong>{''}
                        {confirmacion?.pacienteNombre}
                    </p>
                    <p>
                        <strong>
                            Medico:
                        </strong>{''}
                        {medicoSeleccionado?.nombre ?? 'Medico Seleccionado'}
                    </p>
                    <p>
                        <strong>Fercha:</strong> {confirmacion.fecha}
                    </p>
                    <p>
                        <strong>Hora:</strong> {confirmacion.hora}
                    </p>
                    <p>
                        <strong>Motivo:</strong> {confirmacion.motivo}
                    </p>
                    <p>
                        <strong>Urgencia:</strong> {confirmacion.urgencia}
                    </p>
                </div>

                <button type='button' onClick={agendarOtraCita} className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">
                    Agendar otra Cita
                </button>
            </section>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-2xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Agendar Nueva Cita
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Completa los datos para programar una consulta medica.
                </p>
            </div>
            
            <div>
                <label htmlFor="pacienteNombre" className="mb-1 block font-medium text-gray-700">
                    Nombre del Paciente
                </label>
                <input 
                    id='pacienteNombre'
                    type='text'
                    {...register('pacienteNombre')}
                    aria-invalid={Boolean(errors.pacienteNombre)}
                    className={campoClase(Boolean(errors.pacienteNombre))}
                    placeholder="Nombre Completo"
                />
                {errors.pacienteNombre && (
                    <p className={errorClase}>
                        {errors.pacienteNombre.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="medicoId" className="mb-1 block font-medium text-gray-700">
                    Medico
                </label>
                <select
                    id='medicoId'
                    {...register('medicoId')}
                    disabled={cargando}
                    aria-invalid={Boolean(errors.medicoId)}
                    className={campoClase(Boolean(errors.medicoId))}
                >
                    <option value=''>
                        {cargando
                            ? 'Cargando Medicos...'
                            : 'Selecciona un Medico'}
                    </option>
                    {medicos.map((medico) => (
                        <option key={medico.id} value={medico.id}>
                            {medico.nombre}
                        </option>
                    ))}
                </select>
                {errors.medicoId && (
                    <p className={errorClase}>
                        {errors.medicoId.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="fecha" className="mb-1 block font-medium text-gray-700">
                        Fecha
                    </label>
                    <input 
                        id="fecha"
                        type="date"
                        min={obtenerFechaLocal()}
                        {...register('fecha')}
                        aria-invalid={Boolean(errors.fecha)}
                        className={campoClase(Boolean(errors.fecha))}
                    />
                    {errors.fecha && (
                        <p className={errorClase}>
                            {errors.fecha.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="hora" className="mb-1 block font-medium text-gray-700">
                        Hora
                    </label>
                    <input 
                        id="hora"
                        type="time"
                        {...register('hora')}
                        aria-invalid={Boolean(errors.hora)}
                        className={campoClase(Boolean(errors.hora))}
                    />
                    {errors.hora && (
                        <p className={errorClase}>
                            {errors.hora.message}
                        </p>
                    )}
                </div>
            </div>
            
            <div>
                <label htmlFor="motivo" className="mb-1 block font-medium text-gray-700">
                    Motivo de la consulta
                </label>
                <textarea 
                    id="motivo"
                    rows={4}
                    {...register('motivo')}
                    aria-invalid={Boolean(errors.motivo)}
                    className={campoClase(Boolean(errors.motivo))}
                    placeholder="Describe el motivo de la consulta..."
                />
                {errors.motivo && (
                    <p className={errorClase}>
                        {errors.motivo.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="urgencia" className="mb-1 block font-medium text-gray-700">
                    Nivel de urgencia
                </label>
                <select 
                    id="urgencia"
                    {...register('urgencia')}
                    disabled={cargando}
                    aria-invalid={Boolean(errors.urgencia)}
                    className={campoClase(Boolean(errors.urgencia))}
                >
                    <option value='baja'>Baja</option>
                    <option value='media'>Media</option>
                    <option value='alta'>Alta</option>
                    <option value='critica'>Critica</option>
                </select>
                {errors.urgencia && (
                    <p className={errorClase}>
                        {errors.urgencia.message}
                    </p>
                )}
            </div>

            <button type="submit" disabled={isSubmitting || cargando} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? 'Agendando...' : 'Agendar Cita'}
            </button>
        </form>
    );
}