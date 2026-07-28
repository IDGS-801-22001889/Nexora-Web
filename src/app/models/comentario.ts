export interface Comentario {
  idComentario: number;
  texto: string;
  calificacion: number;
  fecha: string;
  nombreCliente: string;
  estado?: string;
  emailCliente?: string;
}

export interface ComentariosResponse {
  promedio: number;
  total: number;
  comentarios: Comentario[];
}
