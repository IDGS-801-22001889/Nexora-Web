import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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

    // Por ahora solo confirmamos en pantalla; si más adelante quieren
    // enviarlo a un endpoint real, aquí se agregaría la llamada HTTP.
    console.log('Mensaje de contacto:', this.form.value);
    this.enviado.set(true);
    this.form.reset();
  }
}
