export interface DetalleCompra {
  idMateriaPrima: number;
  cantidad: number;
  costoUnitario: number;
}

export interface Compra {
  idCompra: number;
  idProveedor: number;
  fecha: string;
  total: number;
  proveedor?: { razonSocial: string };
  detalles?: (DetalleCompra & { materiaPrima?: { nombre: string; unidadMedida: string } })[];
}
