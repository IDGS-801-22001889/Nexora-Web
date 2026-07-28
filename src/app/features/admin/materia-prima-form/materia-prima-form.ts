import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaPrimaService } from '../../../core/materia-prima.service';

@Component({
  selector: 'app-materia-prima-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './materia-prima-form.html',
  styleUrl: './materia-prima-form.css'
})
export class MateriaPrimaForm implements OnInit {
  form: FormGroup;
  esEdicion = signal(false);
  idMateriaPrima: number | null = null;
  error = signal<string | null>(null);
  cargando = signal(false);

  constructor(
    private fb: FormBuilder,
    private materiaPrimaService: MateriaPrimaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      costoUnitario: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion.set(true);
      this.idMateriaPrima = Number(idParam);

      this.materiaPrimaService.getById(this.idMateriaPrima).subscribe({
        next: (m) => {
          this.form.patchValue(m);
          // Costo y stock no se editan en modo edición, los bloqueamos visualmente
          this.form.get('costoUnitario')?.disable();
          this.form.get('stock')?.disable();
        }
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set(null);
    this.cargando.set(true);

    if (this.esEdicion() && this.idMateriaPrima) {
      const { nombre, unidadMedida } = this.form.getRawValue();
      this.materiaPrimaService.actualizar(this.idMateriaPrima, { nombre, unidadMedida }).subscribe({
        next: () => this.router.navigate(['/admin/materia-prima']),
        error: (err) => {
          this.error.set(err.error ?? 'No se pudo guardar.');
          this.cargando.set(false);
        }
      });
    } else {
      this.materiaPrimaService.crear(this.form.value).subscribe({
        next: () => this.router.navigate(['/admin/materia-prima']),
        error: (err) => {
          this.error.set(err.error ?? 'No se pudo guardar.');
          this.cargando.set(false);
        }
      });
    }
  }
}
