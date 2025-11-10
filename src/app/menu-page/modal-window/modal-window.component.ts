import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Signal } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  imports: [CommonModule],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss',
})
export class ModalWindowComponent implements OnInit {
  @Input() productIdSignal!: Signal<number | null>;

  ngOnInit(): void {
    console.log('Выбран продукт с id:', this.productIdSignal());
  }
}
