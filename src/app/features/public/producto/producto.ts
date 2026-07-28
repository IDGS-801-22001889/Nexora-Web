import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../core/producto.service';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class ProductoComponent implements OnInit {
  producto = signal<Producto | null>(null);
  cargando = signal(true);

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.get().subscribe({
      next: (data) => {
        this.producto.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }
}
