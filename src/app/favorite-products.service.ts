import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class FavoriteProductsService {
  private apiUrl =
    'https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/favorites';

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.apiUrl, {
      headers: { accept: 'application/json' },
    });
  }
}
