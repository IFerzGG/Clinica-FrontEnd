interface StatusBadgeProps {
  activo: boolean;
}

export function StatusBadge({ activo }: StatusBadgeProps) {
    const color = activo
    ? 'bg-rose-100 text-rose-700'
    : 'bg-emerald-100 text-emerald-700';

    const texto = activo ? 'Modo Mantenimiento' : 'Sistema Operativo';

    return (
    <span className={`rounded-full px-3 py-1 text-sm ${color}`}>
      {texto}
    </span>
  );
}