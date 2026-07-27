import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaqService } from '../../../core/faq.service';
import { Faq } from '../../../models/faq';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class FaqComponent implements OnInit {
  faqs = signal<Faq[]>([]);
  cargando = signal(true);
  abiertoId = signal<number | null>(null);
  busqueda = signal('');

  faqsFiltradas = computed(() => {
    const termino = this.busqueda().toLowerCase().trim();
    if (!termino) return this.faqs();
    return this.faqs().filter(f =>
      f.pregunta.toLowerCase().includes(termino) ||
      f.respuesta.toLowerCase().includes(termino)
    );
  });

  constructor(private faqService: FaqService) {}

  ngOnInit() {
    this.faqService.getAll().subscribe({
      next: (data) => {
        this.faqs.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  toggle(id: number) {
    this.abiertoId.set(this.abiertoId() === id ? null : id);
  }
}
