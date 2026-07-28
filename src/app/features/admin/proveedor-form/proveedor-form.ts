import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../../core/proveedor.service';

@Component({
  selector: 'app-proveedor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proveedor-form.html',
  styleUrl: './proveedor-form.css'
})
export class ProveedorForm implements OnInit {
  form: FormGroup;
  esEdicion = signal(false);
  idProveedor: number | null = null;
  error = signal<string | null>(null);
  cargando = signal(false);

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      razonSocial: ['', Validators.required],
      contacto: [''],
      telefono: [''],
      email: ['', Validators.email],
      direccion: ['']
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion.set(true);
      this.idProveedor = Number(idParam);

      this.proveedorService.getById(this.idProveedor).subscribe({
        next: (p) => this.form.patchValue(p)
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

    const operacion = this.esEdicion() && this.idProveedor
      ? this.proveedorService.actualizar(this.idProveedor, this.form.value)
      : this.proveedorService.crear(this.form.value);

    operacion.subscribe({
      next: () => this.router.navigate(['/admin/proveedores']),
      error: (err) => {
        this.error.set(err.error ?? 'No se pudo guardar.');
        this.cargando.set(false);
      }
    });
  }
}
