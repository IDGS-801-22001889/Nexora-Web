import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactoService } from '../../../core/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  form: FormGroup;
  enviado = signal(false);
  error = signal<string | null>(null);

  constructor(private fb: FormBuilder, private contactoService: ContactoService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set(null);
    const { nombre, email, telefono, asunto, mensaje } = this.form.value;

    this.contactoService.enviar(nombre, email, telefono, asunto, mensaje).subscribe({
      next: () => {
        this.enviado.set(true);
        this.form.reset();
      },
      error: (err) => {
        this.error.set(err.error ?? 'No se pudo enviar tu mensaje, intenta de nuevo.');
      }
    });
  }
}
