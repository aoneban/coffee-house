import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsService } from '../all-products.service';
import { Product } from '../interfaces';
import { data } from '../../../public/assets/data/data'; // ✅ перенести в src/app/assets
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  products: Product[] = [];
  categories = ['coffee', 'tea', 'dessert'];
  selected = new FormControl('coffee');

  // eslint-disable-next-line @angular-eslint/prefer-inject
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
}
