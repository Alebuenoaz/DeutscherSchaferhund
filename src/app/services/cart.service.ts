import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartsCollection: AngularFirestoreCollection<Cart>;
  carts: Observable<Cart[]>;
  cartDoc: AngularFirestoreDocument<Cart>;
  constructor(public afs: AngularFirestore) {
    // this.Carts = this.afs.collection('Proveedores').valueChanges();
  this.cartsCollection = this.afs.collection('Carritos');
  this.carts = this.cartsCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as any;
      data.id = a.payload.doc.id;
      return data;
    });
  }));
  }

  private data = [
    {
      Descripcion: 'descrpcion',
      Img: 'img',
      Insumo: 'insumo',
      Cantidad: 'cantidad'
    }
  ];

  private cart = [];
    /*{
      id: 'qwiyl7N4lo9JbCv1aDgn',
      data:
      {
        Descripcion: 'Carne Seseccionada de vaca',
        Img: 'https://firebasestorage.googleapis.com/v0/b/compras-module.appspot.com/o/Productos%2Fcarne.jpg?alt=media&token=6c656add-7034-41d6-b53b-4a642016d4fa',
        Insumo: 'Carne',
        Stock: '20',
        Unidad: 'Kg'
      }
    },
    {
      id: '0dHwkJreFyBuBs9Ei3tX',
      data:
      {
        Descripcion: 'Harina',
        Img: 'https://firebasestorage.googleapis.com/v0/b/compras-module.appspot.com/o/Productos%2Fharina.jpg?alt=media&token=b48ff594-be9e-4810-a556-5710696eff9b',
        Insumo: 'Harina',
        Stock: '10',
        Unidad: 'Kg'
      }
    },
  ];*/

  //constructor() { }

  getCart() {
    return this.cart;
  }

  addProduct(insumo) {
    return this.cart.push(insumo);
  }

  addProductDB(cart: Cart){
    this.cartsCollection.add(cart);
}
}
