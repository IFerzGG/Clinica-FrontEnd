import axios from 'axios';

export function extraerMensajeError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    console.error(
      'Error del backend:',
      error.response?.status,
      error.response?.data
    );

    const mensaje = error.response?.data?.message;

    if (typeof mensaje === 'string') {
      return mensaje;
    }

    if (Array.isArray(mensaje)) {
      return mensaje
        .filter((item): item is string => typeof item === 'string')
        .join(', ');
    }

    if (error.message) {
      return error.message;
    }

    return 'Ocurrió un error al comunicarse con el servidor';
  }

  if (error instanceof Error) {
    console.error('Error inesperado:', error);
    return error.message;
  }

  console.error('Error desconocido:', error);

  return 'Error inesperado';
}