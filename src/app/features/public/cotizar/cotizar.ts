import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CotizacionService } from '../../../core/cotizacion.service';
import { DesgloseCotizacion } from '../../../models/cotizacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cotizar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cotizar.html',
  styleUrl: './cotizar.css'
})
export class Cotizar {
  form: FormGroup;
  enviando = signal(false);
  error = signal<string | null>(null);
  resultado = signal<DesgloseCotizacion | null>(null);

  constructor(private fb: FormBuilder, private cotizacionService: CotizacionService, private router: Router) {
    this.form = this.fb.group({
      nombreEmpresa: ['', Validators.required],
      nombreContacto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      numeroUnidades: [1, [Validators.required, Validators.min(1)]],
      tipoTransporte: ['Carga', Validators.required],
      ciudadRegion: ['', Validators.required],
      instalacionIncluida: [false],
      capacitacion: [false]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set(null);
    this.enviando.set(true);

    this.cotizacionService.crear(this.form.value).subscribe({
      next: (respuesta) => {
        this.enviando.set(false);
        this.resultado.set(respuesta.desglose);
      },
      error: (err) => {
        this.enviando.set(false);
        this.error.set(err.error ?? 'No se pudo generar la cotización.');
      }
    });
  }

  nuevaCotizacion() {
    this.resultado.set(null);
    this.form.reset({
      numeroUnidades: 1,
      tipoTransporte: 'Carga',
      instalacionIncluida: false,
      capacitacion: false
    });
  }

  irAComprar() {
  this.router.navigate(['/cliente/comprar']);
  }
}
