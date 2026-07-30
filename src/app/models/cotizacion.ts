export interface CotizacionRequest {
  nombreEmpresa: string;
  nombreContacto: string;
  email: string;
  telefono: string;
  numeroUnidades: number;
  tipoTransporte: 'Carga' | 'Pasajeros';
  ciudadRegion: string;
  instalacionIncluida: boolean;
  capacitacion: boolean;
}

export interface DesgloseCotizacion {
  costoUnitario: number;
  costoGorras: number;
  licenciaAnual: number;
  instalacion: number;
  capacitacion: number;
  subtotal: number;
  iva: number;
  total: number;
}

export interface CotizacionResponse {
  idCotizacion: number;
  desglose: DesgloseCotizacion;
}
