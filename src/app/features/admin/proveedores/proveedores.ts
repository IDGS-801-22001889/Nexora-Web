import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProveedorService } from '../../../core/proveedor.service';
import { Proveedor } from '../../../models/proveedor';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css'
})
export class Proveedores implements OnInit {
  proveedores = signal<Proveedor[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.proveedorService.getAll().subscribe({
      next: (data) => {
        this.proveedores.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  eliminar(p: Proveedor) {
    if (!confirm(`¿Eliminar a ${p.razonSocial}?`)) return;

    this.error.set(null);
    this.proveedorService.eliminar(p.idProveedor).subscribe({
      next: () => this.cargar(),
      error: (err) => this.error.set(err.error ?? 'No se pudo eliminar.')
    });
  }
}
