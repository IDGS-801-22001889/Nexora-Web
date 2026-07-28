import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MateriaPrimaService } from '../../../core/materia-prima.service';
import { MateriaPrima } from '../../../models/materia-prima';

@Component({
  selector: 'app-materia-prima',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './materia-prima.html',
  styleUrl: './materia-prima.css'
})
export class MateriaPrimaComponent implements OnInit {
  materias = signal<MateriaPrima[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  constructor(private materiaPrimaService: MateriaPrimaService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.materiaPrimaService.getAll().subscribe({
      next: (data) => {
        this.materias.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  eliminar(m: MateriaPrima) {
    if (!confirm(`¿Eliminar "${m.nombre}"?`)) return;

    this.error.set(null);
    this.materiaPrimaService.eliminar(m.idMateriaPrima).subscribe({
      next: () => this.cargar(),
      error: (err) => this.error.set(err.error ?? 'No se pudo eliminar.')
    });
  }
}
