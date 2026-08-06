import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComentarioService } from '../../../core/comentario.service';
import { Comentario } from '../../../models/comentario';

@Component({
  selector: 'app-comentarios-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.css'
})
export class ComentariosAdmin implements OnInit {
  comentarios = signal<Comentario[]>([]);
  cargando = signal(true);
  procesandoId = signal<number | null>(null);

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.comentarioService.getAllAdmin().subscribe({
      next: (data) => {
        this.comentarios.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  eliminar(c: Comentario) {
    if (!confirm(`¿Eliminar el comentario de ${c.nombreCliente}? Esta acción no se puede revertir.`)) return;

    this.procesandoId.set(c.idComentario);
    this.comentarioService.eliminar(c.idComentario).subscribe({
      next: () => {
        this.procesandoId.set(null);
        this.cargar();
      }
    });
  }
}
