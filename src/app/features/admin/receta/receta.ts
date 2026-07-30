import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecetaService } from '../../../core/receta.service';
import { MateriaPrimaService } from '../../../core/materia-prima.service';
import { RecetaItem } from '../../../models/receta';
import { MateriaPrima } from '../../../models/materia-prima';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './receta.html',
  styleUrl: './receta.css'
})
export class RecetaComponent implements OnInit {
  items = signal<RecetaItem[]>([]);
  costoTotal = signal(0);
  materiasPrimas = signal<MateriaPrima[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  form: FormGroup;
  editandoId = signal<number | null>(null);
  cantidadEditada = signal<number>(0);

  constructor(
    private fb: FormBuilder,
    private recetaService: RecetaService,
    private materiaPrimaService: MateriaPrimaService
  ) {
    this.form = this.fb.group({
      idMateriaPrima: ['', Validators.required],
      cantidadRequerida: [1, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.materiaPrimaService.getAll().subscribe(data => this.materiasPrimas.set(data));
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.recetaService.getAll().subscribe({
      next: (data) => {
        this.items.set(data.items);
        this.costoTotal.set(data.costoTotal);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  agregar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set(null);
    const { idMateriaPrima, cantidadRequerida } = this.form.value;

    this.recetaService.crear(idMateriaPrima, cantidadRequerida).subscribe({
      next: () => {
        this.form.reset({ idMateriaPrima: '', cantidadRequerida: 1 });
        this.cargar();
      },
      error: (err) => this.error.set(err.error ?? 'No se pudo agregar.')
    });
  }

  iniciarEdicion(item: RecetaItem) {
    this.editandoId.set(item.idReceta);
    this.cantidadEditada.set(item.cantidadRequerida);
  }

  guardarEdicion(item: RecetaItem) {
    this.recetaService.actualizar(item.idReceta, this.cantidadEditada()).subscribe({
      next: () => {
        this.editandoId.set(null);
        this.cargar();
      }
    });
  }

  cancelarEdicion() {
    this.editandoId.set(null);
  }

  eliminar(item: RecetaItem) {
    if (!confirm(`¿Quitar "${item.nombreMateriaPrima}" de la receta?`)) return;

    this.recetaService.eliminar(item.idReceta).subscribe({
      next: () => this.cargar()
    });
  }
}
