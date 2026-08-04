import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MateriaPrimaService } from '../../../core/materia-prima.service';
import { ProductoService } from '../../../core/producto.service';
import { MateriaPrima } from '../../../models/materia-prima';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class Inventario implements OnInit {
  materiasPrimas = signal<MateriaPrima[]>([]);
  producto = signal<Producto | null>(null);
  cargando = signal(true);

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.materiaPrimaService.getAll().subscribe(data => this.materiasPrimas.set(data));
    this.productoService.get().subscribe({
      next: (data) => {
        this.producto.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }
}
