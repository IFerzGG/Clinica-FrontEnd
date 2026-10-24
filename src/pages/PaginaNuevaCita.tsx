import type { Dispatch, SetStateAction } from "react";
import FormularioCita from "../componentes/citas/FormularioCita";
import type { CitaFormData } from "../schemas/citaSchema";

interface PaginaCitasProps {
  setCitas: Dispatch<SetStateAction<CitaFormData[]>>;
}

export default function PaginaNuevaCita({setCitas}:PaginaCitasProps){
    return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agenda médica</h1>
            <p className="mt-1 text-sm text-gray-500">Administra la programación de citas médicas.</p>
          </div>
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500/30">
            Agendar Cita
          </button>
        </header>
        <FormularioCita setCitas={setCitas}/>
      </div>
    </div>
  );
}