import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/producto`;

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Producto>(this.apiUrl);
  }

  crear(producto: Omit<Producto, 'idProducto'>) {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  actualizar(id: number, producto: Omit<Producto, 'idProducto'>) {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }
}
