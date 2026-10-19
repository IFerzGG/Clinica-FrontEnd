import type {Metrica, Tendencia} from '../types/index';

interface MetricCardProps {
    metrica: Metrica;
}

const colorPorTendencia: Record<Tendencia, string> = {
  positiva: 'text-emerald-600',
  negativa: 'text-rose-600',
  neutra: 'text-slate-600',
};

export function MetricCard({ metrica }: MetricCardProps) {
    return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{metrica.titulo}</h2>
        <span aria-hidden="true">{metrica.icono}</span>
      </div>

      <p className="mt-2 text-3xl font-bold">{metrica.valor}</p>
      <p className={colorPorTendencia[metrica.tendencia]}>
        {metrica.descripcion}
      </p>
    </article>
  );
}