import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Faq } from '../models/faq';

@Injectable({ providedIn: 'root' })
export class FaqService {
  private apiUrl = `${environment.apiUrl}/faq`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Faq[]>(this.apiUrl);
  }

  create(faq: Omit<Faq, 'idFaq'>) {
    return this.http.post<Faq>(this.apiUrl, faq);
  }

  update(id: number, faq: Omit<Faq, 'idFaq'>) {
    return this.http.put(`${this.apiUrl}/${id}`, faq);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
