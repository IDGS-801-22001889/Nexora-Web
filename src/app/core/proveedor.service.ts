import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Proveedor } from '../models/proveedor';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private apiUrl = `${environment.apiUrl}/proveedor`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Proveedor>(`${this.apiUrl}/${id}`);
  }

  crear(data: Omit<Proveedor, 'idProveedor'>) {
    return this.http.post<Proveedor>(this.apiUrl, data);
  }

  actualizar(id: number, data: Omit<Proveedor, 'idProveedor'>) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
