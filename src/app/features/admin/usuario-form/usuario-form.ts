import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../core/usuarios.service';
import { SolicitudesService } from '../../../core/solicitudes.service';
import { passwordFuerteValidator } from '../../../core/password-validator';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css'
})
export class UsuarioForm implements OnInit {
  form: FormGroup;
  esEdicion = signal(false);
  idUsuario: number | null = null;
  idSolicitud: number | null = null;
  error = signal<string | null>(null);
  cargando = signal(false);

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private solicitudesService: SolicitudesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [passwordFuerteValidator()]],
      rol: ['Cliente', Validators.required],
      activo: [true]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const queryParams = this.route.snapshot.queryParamMap;

    if (idParam) {
      // Modo edición
      this.esEdicion.set(true);
      this.idUsuario = Number(idParam);
      this.form.get('password')?.clearValidators();

      this.usuariosService.getById(this.idUsuario).subscribe({
        next: (usuario) => {
          this.form.patchValue({
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            activo: usuario.activo
          });
        }
      });
    } else {
      // Modo creación — password obligatorio
      this.form.get('password')?.setValidators([Validators.required, passwordFuerteValidator()]);
      this.form.get('password')?.updateValueAndValidity();

      // Si viene desde una solicitud, precargamos los datos
      const nombre = queryParams.get('nombre');
      const email = queryParams.get('email');
      const idSolicitud = queryParams.get('idSolicitud');

      if (nombre) this.form.patchValue({ nombre });
      if (email) this.form.patchValue({ email });
      if (idSolicitud) this.idSolicitud = Number(idSolicitud);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set(null);
    this.cargando.set(true);

    const { nombre, email, password, rol, activo } = this.form.value;

    if (this.esEdicion() && this.idUsuario) {
      this.usuariosService.actualizar(this.idUsuario, { nombre, email, rol, activo }).subscribe({
        next: () => this.router.navigate(['/admin/usuarios']),
        error: (err) => {
          this.error.set(err.error ?? 'No se pudo actualizar el usuario.');
          this.cargando.set(false);
        }
      });
    } else {
      this.usuariosService.crear(nombre, email, password, rol).subscribe({
        next: () => {
          if (this.idSolicitud) {
            this.solicitudesService.cambiarEstado(this.idSolicitud, 'Procesada').subscribe();
          }
          this.router.navigate(['/admin/usuarios']);
        },
        error: (err) => {
          this.error.set(err.error ?? 'No se pudo crear el usuario.');
          this.cargando.set(false);
        }
      });
    }
  }
}
