import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../core/pedido.service';
import { Pedido } from '../../../models/pedido';

@Component({
  selector: 'app-pedidos-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosAdmin implements OnInit {
  pedidos = signal<Pedido[]>([]);
  cargando = signal(true);
  procesandoId = signal<number | null>(null);
  error = signal<string | null>(null);

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.pedidoService.getAll().subscribe({
      next: (data) => {
        this.pedidos.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  aceptar(p: Pedido) {
    this.error.set(null);
    this.procesandoId.set(p.idPedido);

    this.pedidoService.gestionar(p.idPedido, 'Aceptado').subscribe({
      next: () => {
        this.procesandoId.set(null);
        this.cargar();
      },
      error: (err) => {
        this.procesandoId.set(null);
        this.error.set(err.error ?? 'No se pudo aceptar el pedido.');
      }
    });
  }

  rechazar(p: Pedido) {
    const mensaje = prompt('Mensaje para el cliente:', 'Sin stock suficiente. Espera reabastecimiento.');
    if (mensaje === null) return;

    this.procesandoId.set(p.idPedido);
    this.pedidoService.gestionar(p.idPedido, 'Rechazado por inventario', mensaje).subscribe({
      next: () => {
        this.procesandoId.set(null);
        this.cargar();
      }
    });
  }

  claseEstado(estado: string): string {
    if (estado === 'Aceptado') return 'bg-green-100 text-green-700';
    if (estado === 'Rechazado por inventario') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  }
}
