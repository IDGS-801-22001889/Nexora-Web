export interface Documentacion {
  idDocumento: number;
  titulo: string;
  descripcion?: string;
  tipoArchivo: 'Documento' | 'Imagen' | 'Video';
  nombreArchivo: string;
  rutaArchivo: string;
  fechaSubida: string;
}
