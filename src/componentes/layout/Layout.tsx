import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function Layout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen">
                <Sidebar />

                <main className="min-w-0 flex-1">
                    <header className="border-b border-gray-200 bg-white px-6 py-4 sm:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Panel de Administracion
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    Bienvenido de Nuevo
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                                U
                            </div>
                        </div>
                    </header>

                    <div className="px-4 py-8 sm:px-6 lg:px-8">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    );
}