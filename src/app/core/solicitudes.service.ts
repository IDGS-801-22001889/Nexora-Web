import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Solicitud } from '../models/solicitud';

@Injectable({ providedIn: 'root' })
export class SolicitudesService {
  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) {}

  crear(data: Omit<Solicitud, 'idSolicitud' | 'fecha' | 'estado'>) {
    return this.http.post<Solicitud>(this.apiUrl, data);
  }

  getAll() {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }

  cambiarEstado(id: number, estado: string) {
    return this.http.put(`${this.apiUrl}/${id}/estado`, JSON.stringify(estado), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
