import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PedidoService } from '../../../core/pedido.service';
import { CotizacionService } from '../../../core/cotizacion.service';
import { CotizacionGuardada } from '../../../models/cotizacion';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comprar.html',
  styleUrl: './comprar.css'
})
export class Comprar implements OnInit {
  cotizaciones = signal<CotizacionGuardada[]>([]);
  cargando = signal(true);
  seleccionada = signal<CotizacionGuardada | null>(null);
  metodoPago = signal('Tarjeta');
  enviando = signal(false);
  error = signal<string | null>(null);
  exito = signal(false);

  constructor(
    private cotizacionService: CotizacionService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit() {
    this.cotizacionService.getMisCotizaciones().subscribe({
      next: (data) => {
        this.cotizaciones.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  seleccionar(c: CotizacionGuardada) {
    this.seleccionada.set(c);
    this.error.set(null);
  }

  confirmarCompra() {
    const cotizacion = this.seleccionada();
    if (!cotizacion) return;

    this.error.set(null);
    this.enviando.set(true);

    this.pedidoService.crear(cotizacion.idCotizacion, this.metodoPago()).subscribe({
      next: () => {
        this.enviando.set(false);
        this.exito.set(true);
      },
      error: (err) => {
        this.enviando.set(false);
        this.error.set(err.error ?? 'No se pudo procesar la compra.');
      }
    });
  }
}
