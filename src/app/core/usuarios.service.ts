import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  getAll(rol?: string) {
    const url = rol ? `${this.apiUrl}?rol=${rol}` : this.apiUrl;
    return this.http.get<Usuario[]>(url);
  }

  getById(id: number) {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  crear(nombre: string, email: string, password: string, rol: string) {
    return this.http.post(`${this.authUrl}/register`, { nombre, email, password, rol });
  }

  actualizar(id: number, data: { nombre: string; email: string; rol: string; activo: boolean }) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  desactivar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  enviarCredenciales(id: number) {
  return this.http.post(`${this.apiUrl}/${id}/enviar-credenciales`, {});
  }
}
