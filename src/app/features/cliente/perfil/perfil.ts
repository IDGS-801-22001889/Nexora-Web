import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  formDatos: FormGroup;
  formPassword: FormGroup;

  mensajeDatos = signal<string | null>(null);
  errorDatos = signal<string | null>(null);
  mensajePassword = signal<string | null>(null);
  errorPassword = signal<string | null>(null);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.formDatos = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.formPassword = this.fb.group({
      passwordActual: ['', Validators.required],
      passwordNueva: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    const usuario = this.authService.usuarioActual();
    if (usuario) {
      this.formDatos.patchValue({ nombre: usuario.nombre, email: usuario.email });
    }
  }

  guardarDatos() {
    if (this.formDatos.invalid) {
      this.formDatos.markAllAsTouched();
      return;
    }

    this.mensajeDatos.set(null);
    this.errorDatos.set(null);

    const { nombre, email } = this.formDatos.value;

    this.authService.actualizarPerfil(nombre, email).subscribe({
      next: () => {
        const usuario = this.authService.usuarioActual();
        if (usuario) {
          this.authService.actualizarUsuarioLocal({ ...usuario, nombre, email });
        }
        this.mensajeDatos.set('Datos actualizados correctamente.');
      },
      error: (err) => this.errorDatos.set(err.error ?? 'No se pudo actualizar.')
    });
  }

  cambiarPassword() {
    if (this.formPassword.invalid) {
      this.formPassword.markAllAsTouched();
      return;
    }

    this.mensajePassword.set(null);
    this.errorPassword.set(null);

    const { passwordActual, passwordNueva } = this.formPassword.value;

    this.authService.cambiarPassword(passwordActual, passwordNueva).subscribe({
      next: () => {
        this.mensajePassword.set('Contraseña actualizada correctamente.');
        this.formPassword.reset();
      },
      error: (err) => this.errorPassword.set(err.error ?? 'No se pudo cambiar la contraseña.')
    });
  }
}
