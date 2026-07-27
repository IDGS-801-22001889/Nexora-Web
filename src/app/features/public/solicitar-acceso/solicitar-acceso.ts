import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudesService } from '../../../core/solicitudes.service';

@Component({
  selector: 'app-solicitar-acceso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitar-acceso.html',
  styleUrl: './solicitar-acceso.css'
})
export class SolicitarAcceso {
  form: FormGroup;
  enviado = signal(false);
  error = signal<string | null>(null);

  constructor(private fb: FormBuilder, private solicitudesService: SolicitudesService) {
    this.form = this.fb.group({
      nombreEmpresa: ['', Validators.required],
      nombreContacto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      mensaje: ['']
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set(null);

    this.solicitudesService.crear(this.form.value).subscribe({
      next: () => {
        this.enviado.set(true);
        this.form.reset();
      },
      error: () => this.error.set('No se pudo enviar tu solicitud, intenta de nuevo.')
    });
  }
}
