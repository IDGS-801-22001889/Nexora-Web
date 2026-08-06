import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactoService {
  private apiUrl = `${environment.apiUrl}/contacto`;

  constructor(private http: HttpClient) {}

  enviar(nombre: string, email: string, telefono: string, asunto: string, mensaje: string) {
    return this.http.post<{ mensaje: string }>(this.apiUrl, { nombre, email, telefono, asunto, mensaje });
  }
}
