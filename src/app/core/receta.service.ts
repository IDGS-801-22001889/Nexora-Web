import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RecetaResponse } from '../models/receta';

@Injectable({ providedIn: 'root' })
export class RecetaService {
  private apiUrl = `${environment.apiUrl}/receta`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<RecetaResponse>(this.apiUrl);
  }

  crear(idMateriaPrima: number, cantidadRequerida: number) {
    return this.http.post(this.apiUrl, { idMateriaPrima, cantidadRequerida });
  }

  actualizar(id: number, cantidadRequerida: number) {
    return this.http.put(`${this.apiUrl}/${id}`, JSON.stringify(cantidadRequerida), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
