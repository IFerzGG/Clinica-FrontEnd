export function BuscadorPacientes(){
    return(
        <form className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                    <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ⌕
                    </span>
                    <input type="text" placeholder="Buscar por nombre o correo..." aria-label="Buscar paciente por nombre o correo"
                        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-300" />
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="mr-1 inline-flex items-center gap-2 text-sm font-medium text-gray-500">
                    <span aria-hidden="true">☷</span>
                    Filtrar:
                </span>

                <button type="button" className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
                    Todos
                </button>

                <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Activos
                </button>

                <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    En_espera
                </button>

                <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    Inactivos
                </button>
            </div>
        </form>
    )
}

//className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"