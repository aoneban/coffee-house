import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsService } from '../all-products.service';
import { Product } from '../interfaces';
import { data } from '../../../public/assets/data/data';

@Component({
  selector: 'app-menu-page',
  imports: [CommonModule],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  products: Product[] = [];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private allProductsService: AllProductsService) {}

  ngOnInit(): void {
    this.allProductsService.getProducts().subscribe({
      next: (res) => {
        console.log('все товары', res.data);
        this.products = res.data;
        this.showProducts(res.data);
      },
      error: (err) => console.error('Error request:', err),
    });
  }

  showProducts(item: Product[] = []) {
    item.map((value) => {
      const id: number = value.id;
      data.filter((elem) => {
        if (elem.id === id) {
          value.image = elem.image;
        }
      });
    });
  }
}
