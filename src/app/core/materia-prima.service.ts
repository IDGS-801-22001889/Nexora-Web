import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MateriaPrima } from '../models/materia-prima';

@Injectable({ providedIn: 'root' })
export class MateriaPrimaService {
  private apiUrl = `${environment.apiUrl}/materiaprima`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<MateriaPrima[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<MateriaPrima>(`${this.apiUrl}/${id}`);
  }

  crear(data: Omit<MateriaPrima, 'idMateriaPrima'>) {
    return this.http.post<MateriaPrima>(this.apiUrl, data);
  }

  actualizar(id: number, data: { nombre: string; unidadMedida: string }) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
