import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComentarioService } from '../../../core/comentario.service';
import { AuthService } from '../../../core/auth.service';
import { Comentario } from '../../../models/comentario';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './testimonios.html',
  styleUrl: './testimonios.css'
})
export class Testimonios implements OnInit {
  comentarios = signal<Comentario[]>([]);
  promedio = signal(0);
  total = signal(0);
  cargando = signal(true);

  filtroEstrellas = signal<number | null>(null);

  calificacionSeleccionada = signal(0);
  calificacionHover = signal(0);
  textoNuevo = signal('');
  enviando = signal(false);
  mensajeExito = signal<string | null>(null);
  error = signal<string | null>(null);

  comentariosFiltrados = computed(() => {
    const filtro = this.filtroEstrellas();
    if (filtro === null) return this.comentarios();
    return this.comentarios().filter(c => c.calificacion === filtro);
  });

  constructor(
    private comentarioService: ComentarioService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.comentarioService.getAll().subscribe({
      next: (data) => {
        this.comentarios.set(data.comentarios);
        this.promedio.set(data.promedio);
        this.total.set(data.total);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  aplicarFiltro(estrellas: number | null) {
    this.filtroEstrellas.set(estrellas);
  }

  seleccionarCalificacion(valor: number) {
    this.calificacionSeleccionada.set(valor);
  }

  esCliente(): boolean {
    return this.authService.usuarioActual()?.rol === 'Cliente';
  }

  enviarComentario() {
    if (this.calificacionSeleccionada() === 0 || !this.textoNuevo().trim()) {
      this.error.set('Selecciona una calificación y escribe un comentario.');
      return;
    }

    this.error.set(null);
    this.enviando.set(true);

    this.comentarioService.crear(this.textoNuevo(), this.calificacionSeleccionada()).subscribe({
      next: () => {
        this.enviando.set(false);
        this.mensajeExito.set('¡Gracias! Tu opinión fue enviada y será publicada tras revisión.');
        this.textoNuevo.set('');
        this.calificacionSeleccionada.set(0);
      },
      error: (err) => {
        this.enviando.set(false);
        this.error.set(err.error ?? 'No se pudo enviar tu comentario.');
      }
    });
  }

  claseFiltro(valor: number | null): string {
  const base = 'px-3 py-1 rounded text-sm border';
  const activo = this.filtroEstrellas() === valor;

  return activo
    ? `${base} bg-[#2FA084] text-white border-[#2FA084]`
    : `${base} bg-white text-gray-700 border-gray-300 hover:bg-gray-100`;
  }
}
