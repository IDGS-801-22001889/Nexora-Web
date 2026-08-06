import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { ComentarioService } from '../../../core/comentario.service';
import { Comentario } from '../../../models/comentario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  destacados = signal<Comentario[]>([]);

  constructor(public authService: AuthService, private comentarioService: ComentarioService) {}

  ngOnInit() {
    this.comentarioService.getDestacados().subscribe({
      next: (data) => this.destacados.set(data)
    });
  }

  esCliente(): boolean {
    return this.authService.usuarioActual()?.rol === 'Cliente';
  }

  imagenesCarrusel = [
  '/img/GORRA1.png',
  '/img/GORRA2.png',
  '/img/GORRA3.png'
];

indiceImagen = signal(0);

imagenSiguiente() {
  this.indiceImagen.update(i =>
    (i + 1) % this.imagenesCarrusel.length
  );
}

imagenAnterior() {
  this.indiceImagen.update(i =>
    (i - 1 + this.imagenesCarrusel.length) %
    this.imagenesCarrusel.length
  );
}
}
