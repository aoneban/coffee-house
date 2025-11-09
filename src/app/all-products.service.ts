import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AllProductsService {
  private apiUrl = 'https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products';
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.apiUrl, {
      headers: { accept: 'application/json' },
    });
  }
}
