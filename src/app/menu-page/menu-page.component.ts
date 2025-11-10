/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsService } from '../all-products.service';
import { Product } from '../interfaces';
import { data } from '../../../public/assets/data/data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalWindowComponent } from './modal-window/modal-window.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalWindowComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  selectedId = signal<number | null>(null);
  products: Product[] = [];
  categories = [
    { name: 'coffee', image: '../assets/images/coffee-tab.png' },
    { name: 'tea', image: '../assets/images/tea-tab.png' },
    { name: 'dessert', image: '../assets/images/dessert-tab.png' },
  ];
  selected = new FormControl('coffee');

  constructor(private allProductsService: AllProductsService) {}

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
  }
}
