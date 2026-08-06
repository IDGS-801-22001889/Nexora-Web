import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pedido } from '../models/pedido';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/pedido`;

  constructor(private http: HttpClient) {}

  crear(idCotizacion: number, metodoPago: string) {
    return this.http.post<Pedido>(this.apiUrl, { idCotizacion, metodoPago });
  }

  getMisCompras() {
    return this.http.get<Pedido[]>(`${this.apiUrl}/mis-compras`);
  }

  getAll() {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  gestionar(id: number, estado: string, mensajeAdmin?: string) {
    return this.http.put(`${this.apiUrl}/${id}/gestionar`, { estado, mensajeAdmin });
  }
}
