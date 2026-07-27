import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SolicitudesService } from '../../../core/solicitudes.service';
import { Solicitud } from '../../../models/solicitud';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.css'
})
export class SolicitudesComponent implements OnInit {
  solicitudes = signal<Solicitud[]>([]);
  cargando = signal(true);

  constructor(private solicitudesService: SolicitudesService, private router: Router) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.solicitudesService.getAll().subscribe({
      next: (data) => {
        this.solicitudes.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  crearUsuarioDesde(solicitud: Solicitud) {
    // Navegamos al formulario de nuevo usuario, precargando nombre/email
    // vía query params, y guardamos el id de la solicitud para marcarla luego.
    this.router.navigate(['/admin/usuarios/nuevo'], {
      queryParams: {
        nombre: solicitud.nombreContacto,
        email: solicitud.email,
        idSolicitud: solicitud.idSolicitud
      }
    });
  }

  rechazar(solicitud: Solicitud) {
    this.solicitudesService.cambiarEstado(solicitud.idSolicitud, 'Rechazada').subscribe({
      next: () => this.cargar()
    });
  }
}
