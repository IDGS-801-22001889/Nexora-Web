import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../core/pedido.service';
import { Pedido } from '../../../models/pedido';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-compras.html',
  styleUrl: './mis-compras.css'
})
export class MisCompras implements OnInit {
  pedidos = signal<Pedido[]>([]);
  cargando = signal(true);
  seleccionado = signal<Pedido | null>(null);

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.pedidoService.getMisCompras().subscribe({
      next: (data) => {
        this.pedidos.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  verDetalle(p: Pedido) {
    this.seleccionado.set(this.seleccionado() === p ? null : p);
  }

  claseEstado(estado: string): string {
    if (estado === 'Aceptado') return 'bg-green-100 text-green-700';
    if (estado === 'Rechazado por inventario') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  }
}
