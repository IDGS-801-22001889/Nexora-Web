export interface RecetaItem {
  idReceta: number;
  idMateriaPrima: number;
  nombreMateriaPrima: string;
  unidadMedida: string;
  costoUnitario: number;
  cantidadRequerida: number;
  subtotal: number;
}

export interface RecetaResponse {
  items: RecetaItem[];
  costoMateriales: number;
  porcentajeEnsamblaje: number;
  costoEnsamblaje: number;
  costoTotal: number;
}
