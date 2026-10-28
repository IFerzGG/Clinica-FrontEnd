import type {EstadoPaciente} from '../../types/paciente';

export interface BadgeEstadoProps {
  estado: EstadoPaciente ;
}

const colorPorEstado: Record<EstadoPaciente, string> = {
  ACTIVO: 'bg-emerald-100 text-emerald-700',
  INACTIVO: 'bg-rose-100 text-rose-700',
  EN_ESPERA: 'bg-yellow-100 text-yellow-700',
};

const estilosEstado: Record<EstadoPaciente, string> = {
  ACTIVO: 'Activo',
  INACTIVO: 'Inactivo',
  EN_ESPERA: 'En Espera',
}

export function BadgeEstado({ estado }: BadgeEstadoProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-sm ${colorPorEstado[estado]}`}>
      {estilosEstado[estado]}
    </span>
  )
}