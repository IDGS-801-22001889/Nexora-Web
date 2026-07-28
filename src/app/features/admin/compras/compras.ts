import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompraService } from '../../../core/compra.service';
import { Compra } from '../../../models/compra';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './compras.html',
  styleUrl: './compras.css'
})
export class Compras implements OnInit {
  compras = signal<Compra[]>([]);
  cargando = signal(true);

  constructor(private compraService: CompraService) {}

  ngOnInit() {
    this.compraService.getAll().subscribe({
      next: (data) => {
        this.compras.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }
}
