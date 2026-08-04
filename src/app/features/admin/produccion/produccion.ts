import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService } from '../../../core/produccion.service';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produccion.html',
  styleUrl: './produccion.css'
})
export class Produccion implements OnInit {
  unidadesPosibles = signal(0);
  cantidad = signal(1);
  cargando = signal(true);
  procesando = signal(false);
  mensaje = signal<string | null>(null);
  error = signal<string | null>(null);
  faltantes = signal<string[]>([]);

  constructor(private produccionService: ProduccionService) {}

  ngOnInit() {
    this.cargarDisponible();
  }

  cargarDisponible() {
    this.cargando.set(true);
    this.produccionService.getDisponible().subscribe({
      next: (data) => {
        this.unidadesPosibles.set(data.unidadesPosibles);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  producir() {
    if (this.cantidad() <= 0) return;

    this.error.set(null);
    this.mensaje.set(null);
    this.faltantes.set([]);
    this.procesando.set(true);

    this.produccionService.producir(this.cantidad()).subscribe({
      next: (data) => {
        this.procesando.set(false);
        this.mensaje.set(data.mensaje);
        this.cantidad.set(1);
        this.cargarDisponible();
      },
      error: (err) => {
        this.procesando.set(false);
        if (err.error?.faltantes) {
          this.error.set(err.error.mensaje);
          this.faltantes.set(err.error.faltantes);
        } else {
          this.error.set(err.error ?? 'No se pudo completar la producción.');
        }
      }
    });
  }
}
