import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = [
    {
      Descripcion: 'descrpcion',
      Img: 'img',
      Producto: 'producto',
      Cantidad: 'cantidad'
    }
  ];

  private cart = [];

  constructor() { }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    return this.cart.push(product);
  }
}
