import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, Signal, signal, effect } from '@angular/core';
import { ProductsResponse2, Product2 } from '../../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  private apiUrl = 'https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/';
  private currentSignal = signal<Signal<number | null> | null>(null);

  @Input()
  set productIdSignal(s: Signal<number | null> | null) {
    this.currentSignal.set(s ?? null);
  }

  product: Product2 | null = null;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) {
    effect((onCleanup) => {
      const s = this.currentSignal();
      if (!s) {
        this.product = null;
        return;
      }

      const id = s();
      if (id == null) {
        this.product = null;
        return;
      }

      const sub = this.getProductData(id).subscribe({
        next: (res) => {
          this.product = res.data;
          console.log('Product data:', this.product);
        },
        error: (err) => console.error('Error response:', err),
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  getProductData(id: number): Observable<ProductsResponse2> {
    return this.http.get<ProductsResponse2>(`${this.apiUrl}${id}`, {
      headers: { accept: 'application/json' },
    });
  }
}
