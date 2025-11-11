/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AllProductsService } from '../all-products.service';
import { data } from '../../../public/assets/data/data';
import { Product, Product2, ProductsResponse2 } from '../interfaces';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  private apiUrl = 'https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/';
  selectedId = signal<number | null>(null);
  productSignal = signal<Product2 | null>(null);
  products: Product[] = [];
  categories = [
    { name: 'coffee', image: '../assets/images/coffee-tab.png' },
    { name: 'tea', image: '../assets/images/tea-tab.png' },
    { name: 'dessert', image: '../assets/images/dessert-tab.png' },
  ];
  selected = new FormControl('coffee');

  constructor(
    private allProductsService: AllProductsService,
    private http: HttpClient,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.allProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.addImagesToProducts();
      },
      error: (err) => console.error('Error request:', err),
    });
  }

  addImagesToProducts(): void {
    this.products = this.products.map((product) => {
      const found = data.find((d: { id: number }) => d.id === product.id);
      return {
        ...product,
        image: found?.image || '',
      };
    });
  }

  get filteredProducts() {
    const cat = this.selected.value;
    return this.products.filter((p) => p.category === cat);
  }

  selectProduct(id: number) {
    this.selectedId.set(id);

    this.getProductData(id).subscribe({
      next: (res) => {
        this.productSignal.set(res.data);
        this.openDialog(res.data);
        console.log('Product data:', res.data);
      },
      error: (err) => {
        this.productSignal.set(null);
        this.openDialog(null);
        console.error('Error response:', err);
      },
    });
  }

  openDialog(product: Product2 | null): void {
    this.dialog.open(ModalWindowComponent, {
      data: product,
      width: '400px',
    });
  }

  getProductData(id: number): Observable<ProductsResponse2> {
    return this.http.get<ProductsResponse2>(`${this.apiUrl}${id}`, {
      headers: { accept: 'application/json' },
    });
  }
}
