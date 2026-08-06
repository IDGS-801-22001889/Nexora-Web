export interface Pedido {
  idPedido: number;
  idCotizacion: number;
  cantidad: number;
  metodoPago: string;
  total: number;
  estado: 'En espera' | 'Aceptado' | 'Rechazado por inventario';
  mensajeAdmin?: string;
  fecha: string;
  nombreCliente?: string;
  emailCliente?: string;
}
