import type {EstadoPaciente} from '../../types/paciente';

export interface BadgeEstadoProps {
  estado: EstadoPaciente ;
}

const colorPorEstado: Record<EstadoPaciente, string> = {
  activo: 'bg-emerald-100 text-emerald-700',
  inactivo: 'bg-rose-100 text-rose-700',
  en_espera: 'bg-yellow-100 text-yellow-700',
};

const estilosEstado: Record<EstadoPaciente, string> = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  en_espera: 'En Espera',
}

export function BadgeEstado({ estado }: BadgeEstadoProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-sm ${colorPorEstado[estado]}`}>
      {estilosEstado[estado]}
    </span>
  )
}