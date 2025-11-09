import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteProductsService } from '../../favorite-products.service';
import { Product } from '../../interfaces';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html' ,
  styleUrl: './favorites.component.scss',
})

export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];

  constructor(private favoriteProductsService: FavoriteProductsService) {}

  ngOnInit(): void {
    this.favoriteProductsService.getFavorites().subscribe({
      next: (res) => {
        console.log('Ответ от сервера:', res);
        console.log('Массив продуктов:', res.data);
        this.favorites = res.data;
      },
      error: (err) => console.error('Error request:', err),
    });
  }
}
