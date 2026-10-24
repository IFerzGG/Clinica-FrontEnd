import { NavLink } from "react-router";

const opcionesMenu = [
    { to:"/", icono: "▦", nombre: "Dashboard", activo: true },
    { to:"/pacientes", icono: "♙", nombre: "Pacientes", activo: false },
    { to:"/citas", icono: "▤", nombre: "Citas", activo: false },
    { to:"/notfound", icono: "▧", nombre: "Reportes", activo: false },
];

const baseClasses = "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium";
const activeClasses = "bg-blue-50 text-blue-700";
const inactiveClasses = "text-gray-600";

export function Sidebar() {

    return (
        <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                        +
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Clinica
                        </h2>
                        <p className="text-xs text-gray-500">
                            Gestion de Pacientes
                        </p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Menu Principal
                </p>
                <div className="space-y-2">
                    {opcionesMenu.map((opcion) => (
                        <NavLink key={opcion.to} to={opcion.to} end={opcion.activo} className={({isActive}) =>`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                            {({isActive}) => (
                                <>
                                    <span className="flex h-6 w-6 items-center justify-center text-lg">
                                        {opcion.icono}
                                    </span>
                                        <span>
                                        {opcion.nombre}
                                    </span>
                                    {isActive && (
                                        <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className="border-t border-gray-200 p-4">
                <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Sesion Iniciada
                </p>
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 font-semibold text-white">
                        U
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                            Usuario
                        </p>
                        <p className="truncate text-xs text-gray-500">
                            usuario@example.com
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span className="text-xs text-emerald-700">
                                En Linea
                            </span>
                        </div>
                    </div>
                </div>
                <p className="mt-3 px-2 text-xs text-gray-400">
                    Administrador
                </p>
            </div>
        </aside>
    );
}