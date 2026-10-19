import {useState} from "react";
import {MetricCard} from "./MetricCard";
import {StatusBadge} from "./StatusBadge";
import type {Metrica} from '../types/index';

export function PaginaDashboard() {
    const [pacientes, setPacientes] = useState(128);
    const [mantenimiento, setMantenimiento] = useState(false);

    const metricas: Metrica[] = [
        {
            id: 'pacientes',
            titulo: 'Pacientes',
            valor: pacientes,
            descripcion: 'Pacientes registrados',
            tendencia: 'positiva',
            icono: '👥',
        },
        {
            id: 'citas',
            titulo: 'Citas Hoy',
            valor: 24,
            descripcion: 'Citas programadas para hoy',
            tendencia: 'neutra',
            icono: '📅',
        },
        {
            id: 'pendientes',
            titulo: 'Consultas Pendientes',
            valor: 8,
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
    <main className="mx-auto max-w-5xl p-6">
      {mantenimiento && (
        <div className="mb-4 rounded bg-rose-100 p-3 text-rose-700">
          El sistema está en mantenimiento.
        </div>
      )}

      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <StatusBadge activo={mantenimiento} />
      </header>

      <button
        className="mb-6 rounded bg-slate-800 px-4 py-2 text-white"
        onClick={() => setMantenimiento((activo) => !activo)}
      >
        {mantenimiento ? 'Desactivar' : 'Activar'} mantenimiento
      </button>

      <section className="grid gap-4 sm:grid-cols-2">
        {metricas.map((metrica) => (
          <div key={metrica.id}>
            <MetricCard metrica={metrica} />

            {metrica.id === 'pacientes' && (
              <div className="mt-2 flex gap-2">
                <button
                  className="rounded border px-3 py-1"
                  onClick={() => setPacientes((valor) => valor - 1)}
                >
                  −
                </button>
                <button
                  className="rounded border px-3 py-1"
                  onClick={() => setPacientes((valor) => valor + 1)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}