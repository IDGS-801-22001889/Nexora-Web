import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Compra, DetalleCompra } from '../models/compra';

@Injectable({ providedIn: 'root' })
export class CompraService {
  private apiUrl = `${environment.apiUrl}/compra`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Compra[]>(this.apiUrl);
  }

  crear(idProveedor: number, detalles: DetalleCompra[]) {
    return this.http.post<Compra>(this.apiUrl, { idProveedor, detalles });
  }
}
