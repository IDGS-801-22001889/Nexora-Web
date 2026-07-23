import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';

interface AuthResponse {
  token: string;
  idUsuario: number;
  nombre: string;
  email: string;
  rol: 'Administrador' | 'Cliente';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  usuarioActual = signal<Usuario | null>(this.cargarUsuarioGuardado());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password });
  }

  register(nombre: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { nombre, email, password });
  }

  guardarSesion(respuesta: AuthResponse) {
    const usuario: Usuario = {
      idUsuario: respuesta.idUsuario,
      nombre: respuesta.nombre,
      email: respuesta.email,
      rol: respuesta.rol,
      activo: true
    };
    localStorage.setItem('token', respuesta.token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioActual.set(usuario);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioActual.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.getToken();
  }

  private cargarUsuarioGuardado(): Usuario | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }
}
