import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../core/usuarios.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  usuarios = signal<Usuario[]>([]);
  cargando = signal(true);

  administradores = computed(() => this.usuarios().filter(u => u.rol === 'Administrador'));
  clientes = computed(() => this.usuarios().filter(u => u.rol === 'Cliente'));

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.usuariosService.getAll().subscribe({
      next: (data) => {
        this.usuarios.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  desactivar(usuario: Usuario) {
    if (!confirm(`¿Desactivar a ${usuario.nombre}?`)) return;

    this.usuariosService.desactivar(usuario.idUsuario).subscribe({
      next: () => this.cargar()
    });
  }

  enviandoId = signal<number | null>(null);
errorEnvio = signal<string | null>(null);

enviarCredenciales(usuario: Usuario) {
  if (!confirm(`¿Enviar credenciales nuevas a ${usuario.email}?`)) return;

  this.errorEnvio.set(null);
  this.enviandoId.set(usuario.idUsuario);

  this.usuariosService.enviarCredenciales(usuario.idUsuario).subscribe({
    next: () => {
      this.enviandoId.set(null);
      this.cargar();
    },
    error: (err) => {
      this.enviandoId.set(null);
      this.errorEnvio.set(err.error ?? 'No se pudo enviar el correo.');
    }
  });
}
}
