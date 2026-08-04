import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProduccionService {
  private apiUrl = `${environment.apiUrl}/produccion`;

  constructor(private http: HttpClient) {}

  getDisponible() {
    return this.http.get<{ unidadesPosibles: number }>(`${this.apiUrl}/disponible`);
  }

  producir(cantidad: number) {
    return this.http.post<{ mensaje: string; nuevoStockProducto: number }>(this.apiUrl, { cantidad });
  }
}
