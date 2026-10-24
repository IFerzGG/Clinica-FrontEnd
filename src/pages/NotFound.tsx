export function NotFound(){
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-lg text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-4xl text-blue-600">
                    ?
                </div>

                <p className="mt-8 text-sm font-bold uppercase tracking-widest text-blue-600">
                    Error 404
                </p>

                <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Pagina No Encontrada
                </h1>

                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-500">
                    Lo sentimos, la pagina que buscas no existe o la direccion que ingresaste no es correcta.
                </p>

                <div className="my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-6xl font-extrabold tracking-tight text-gray-200">
                        404
                    </p>
                    <p className="mt-3 text-sm text-gray-500">
                        No encontramos lo que buscabas
                    </p>
                </div>

                <div className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm">
                    Volver al Inicio
                </div>

                <p className="mt-6 text-xs text-gray-400">
                    Clinica: Sistema de Gestion de Pacientes
                </p>
            </div>
        </main>
    );
}