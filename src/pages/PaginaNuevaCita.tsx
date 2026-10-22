import FormularioCita from "../componentes/FormularioCita";

export default function PaginaNuevaCita(){
    return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Agenda médica
          </h1>
          <p className="mt-2 text-gray-600">
            Administra la programación de citas médicas.
          </p>
        </header>

        <FormularioCita />
      </div>
    </main>
  );
}