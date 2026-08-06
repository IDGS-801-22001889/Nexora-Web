import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Comentario, ComentariosResponse } from '../models/comentario';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  private apiUrl = `${environment.apiUrl}/comentario`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ComentariosResponse>(this.apiUrl);
  }

  crear(texto: string, calificacion: number) {
    return this.http.post<Comentario>(this.apiUrl, { texto, calificacion });
  }

  getAllAdmin() {
    return this.http.get<Comentario[]>(`${this.apiUrl}/admin`);
  }

  cambiarEstado(id: number, estado: string) {
    return this.http.put(`${this.apiUrl}/${id}/estado`, JSON.stringify(estado), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getDestacados() {
    return this.http.get<Comentario[]>(`${this.apiUrl}/destacados`);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
