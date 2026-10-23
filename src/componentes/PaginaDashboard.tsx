import {useState} from "react";
import {MetricCard} from "./MetricCard";
import {StatusBadge} from "./StatusBadge";
import type {Metrica} from '../types/index';

interface PaginaDashboardProps {
  totalPacientes: number;
  totalCitas:number;
  citasPendientes:number;
}

export function PaginaDashboard({totalPacientes, totalCitas, citasPendientes}:PaginaDashboardProps) {
    const [mantenimiento, setMantenimiento] = useState(false);

    const metricas: Metrica[] = [
        {
            id: 'pacientes',
            titulo: 'Pacientes',
            valor: totalPacientes,
            descripcion: 'Pacientes registrados',
            tendencia: 'positiva',
            icono: '👥',
        },
        {
            id: 'citas',
            titulo: 'Citas Hoy',
            valor: totalCitas,
            descripcion: 'Citas programadas para hoy',
            tendencia: 'neutra',
            icono: '📅',
        },
        {
            id: 'pendientes',
            titulo: 'Consultas Pendientes',
            valor: citasPendientes,
            descripcion: 'Consultas por atender',
            tendencia: 'negativa',
            icono: '⏳',
        },
        {
            id: 'disponibilidad',
            titulo: 'Disponibilidad',
            valor: '98%',
            descripcion: 'Sistema disponible',
            tendencia: 'positiva',
            icono: '✓',
        },
    ];

    return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      

        {mantenimiento && (
          <div role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
            El sistema está en mantenimiento.
          </div>
        )}

        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight !text-gray-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Resumen General del Sistema
            </p>
          </div>
          <StatusBadge activo={mantenimiento} />
        </header>

        <div className="mb-8">
          <button type="button" onClick={() => setMantenimiento((activo) => !activo)} className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
            {mantenimiento ? 'Desactivar' : 'Activar'} Mantenimiento
          </button>
        </div>

        <section aria-label="Métricas del sistema" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricas.map((metrica) => (
            <div key={metrica.id}>
              <MetricCard metrica={metrica} />
            </div>
          ))}
        </section>
      
    </main>
  );
}