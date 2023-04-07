import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<Product[]>('http://localhost:3000/products')
      .toPromise();
  }

  createProduct(product: Product) {
    return this.http
      .post<Product>('http://localhost:3000/products', product)
      .toPromise();
  }

  updateProduct(product: Product) {
    return this.http
      .put<Product>(`http://localhost:3000/products/${product.id}`, product)
      .toPromise();
  }

  deleteProduct(id: number) {
    return this.http
      .delete<Product>(`http://localhost:3000/products/${id}`)
      .toPromise();
  }
}
