import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentacionService } from '../../../core/documentacion.service';
import { AuthService } from '../../../core/auth.service';
import { Documentacion } from '../../../models/documentacion';

@Component({
  selector: 'app-documentacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './documentacion.html',
  styleUrl: './documentacion.css'
})
export class DocumentacionComponent implements OnInit {
  documentos = signal<Documentacion[]>([]);
  cargando = signal(true);
  subiendo = signal(false);
  error = signal<string | null>(null);
  archivoSeleccionado: File | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private documentacionService: DocumentacionService,
    public authService: AuthService
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.documentacionService.getAll().subscribe({
      next: (data) => {
        this.documentos.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivoSeleccionado = input.files?.[0] ?? null;
  }

  onSubmit() {
    if (this.form.invalid || !this.archivoSeleccionado) {
      this.form.markAllAsTouched();
      this.error.set(!this.archivoSeleccionado ? 'Selecciona un archivo.' : null);
      return;
    }

    this.error.set(null);
    this.subiendo.set(true);

    const { titulo, descripcion } = this.form.value;

    this.documentacionService.subir(titulo, descripcion, this.archivoSeleccionado).subscribe({
      next: () => {
        this.subiendo.set(false);
        this.form.reset();
        this.archivoSeleccionado = null;
        this.cargar();
      },
      error: (err) => {
        this.subiendo.set(false);
        this.error.set(err.error ?? 'No se pudo subir el archivo.');
      }
    });
  }

  eliminar(doc: Documentacion) {
    if (!confirm(`¿Eliminar "${doc.titulo}"?`)) return;

    this.documentacionService.eliminar(doc.idDocumento).subscribe({
      next: () => this.cargar()
    });
  }

  urlArchivo(doc: Documentacion): string {
    return this.documentacionService.urlCompleta(doc.rutaArchivo);
  }

  esAdmin(): boolean {
    return this.authService.usuarioActual()?.rol === 'Administrador';
  }
}
