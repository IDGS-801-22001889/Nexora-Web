import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Documentacion } from '../models/documentacion';

@Injectable({ providedIn: 'root' })
export class DocumentacionService {
  private apiUrl = `${environment.apiUrl}/documentacion`;
  apiBaseUrl = environment.apiUrl.replace('/api', ''); // para armar URLs de archivos

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Documentacion[]>(this.apiUrl);
  }

  subir(titulo: string, descripcion: string, archivo: File) {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion ?? '');
    formData.append('archivo', archivo);

    return this.http.post<Documentacion>(this.apiUrl, formData);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  urlCompleta(rutaArchivo: string): string {
    return `${this.apiBaseUrl}${rutaArchivo}`;
  }
}
