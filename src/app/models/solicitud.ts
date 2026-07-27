export interface Solicitud {
  idSolicitud: number;
  nombreEmpresa: string;
  nombreContacto: string;
  email: string;
  telefono: string;
  mensaje?: string;
  fecha: string;
  estado: 'Pendiente' | 'Procesada' | 'Rechazada';
}
