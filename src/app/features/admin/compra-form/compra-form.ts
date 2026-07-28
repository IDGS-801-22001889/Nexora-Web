import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompraService } from '../../../core/compra.service';
import { ProveedorService } from '../../../core/proveedor.service';
import { MateriaPrimaService } from '../../../core/materia-prima.service';
import { Proveedor } from '../../../models/proveedor';
import { MateriaPrima } from '../../../models/materia-prima';

@Component({
  selector: 'app-compra-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compra-form.html',
  styleUrl: './compra-form.css'
})
export class CompraForm implements OnInit {
  form: FormGroup;
  proveedores = signal<Proveedor[]>([]);
  materiasPrimas = signal<MateriaPrima[]>([]);
  error = signal<string | null>(null);
  cargando = signal(false);

  constructor(
    private fb: FormBuilder,
    private compraService: CompraService,
    private proveedorService: ProveedorService,
    private materiaPrimaService: MateriaPrimaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      idProveedor: ['', Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit() {
    this.proveedorService.getAll().subscribe(data => this.proveedores.set(data));
    this.materiaPrimaService.getAll().subscribe(data => this.materiasPrimas.set(data));
    this.agregarDetalle();
  }

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  agregarDetalle() {
    const detalle = this.fb.group({
      idMateriaPrima: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(0.01)]],
      costoUnitario: [0, [Validators.required, Validators.min(0.01)]]
    });
    this.detalles.push(detalle);
  }

  quitarDetalle(index: number) {
    if (this.detalles.length > 1) {
      this.detalles.removeAt(index);
    }
  }

  get totalEstimado(): number {
    return this.detalles.controls.reduce((suma, ctrl) => {
      const cantidad = ctrl.get('cantidad')?.value || 0;
      const costo = ctrl.get('costoUnitario')?.value || 0;
      return suma + (cantidad * costo);
    }, 0);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set(null);
    this.cargando.set(true);

    const { idProveedor, detalles } = this.form.value;

    this.compraService.crear(idProveedor, detalles).subscribe({
      next: () => this.router.navigate(['/admin/compras']),
      error: (err) => {
        this.error.set(err.error ?? 'No se pudo registrar la compra.');
        this.cargando.set(false);
      }
    });
  }
}
