import type {Metrica, Tendencia} from '../../types/index';

interface MetricCardProps {
    metrica: Metrica;
}

const colorPorTendencia: Record<Tendencia, string> = {
  positiva: 'text-emerald-600',
  negativa: 'text-rose-600',
  neutra: 'text-slate-600',
};
const fondoPorTendencia: Record<Tendencia, string> = {
  positiva: "bg-emerald-50",
  negativa: "bg-rose-50",
  neutra: "bg-blue-50",
};

export function MetricCard({ metrica }: MetricCardProps) {
  return (
    <article className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"> 
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-sm font-medium !text-gray-500">
            {metrica.titulo}
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {metrica.valor}
          </p>
        </div>

        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${fondoPorTendencia[metrica.tendencia]}`} aria-hidden="true">
          {metrica.icono}
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3">
        <p className={`text-sm font-medium ${colorPorTendencia[metrica.tendencia]}`}>
          {metrica.descripcion}
        </p>
      </div>
    </article>
  )
}