import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CotizacionRequest, CotizacionResponse } from '../models/cotizacion';

@Injectable({ providedIn: 'root' })
export class CotizacionService {
  private apiUrl = `${environment.apiUrl}/cotizacion`;

  constructor(private http: HttpClient) {}

  crear(data: CotizacionRequest) {
    return this.http.post<CotizacionResponse>(this.apiUrl, data);
  }
}
