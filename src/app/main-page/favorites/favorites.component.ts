import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteProductsService } from '../../favorite-products.service';
import { Product } from '../../interfaces';
import { data } from '../../../../public/assets/data/data';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private favoriteProductsService: FavoriteProductsService) {}

  ngOnInit(): void {
    this.favoriteProductsService.getFavorites().subscribe({
      next: (res) => {
        this.favorites = res.data;
        this.showData(res.data);
      },
      error: (err) => console.error('Error request:', err),
    });
  }

  showData(item: Product[] = []) {
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
