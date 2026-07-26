import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqService } from '../../../core/faq.service';
import { Faq } from '../../../models/faq';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class FaqComponent implements OnInit {
  faqs = signal<Faq[]>([]);
  cargando = signal(true);
  abiertoId = signal<number | null>(null);

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
