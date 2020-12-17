import { Component, OnInit } from '@angular/core';

// Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Insumo } from '../models/insumo';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  doc: any;
  tasks: any = [];
  Insumos: any = [{
    id: '',
    data: {} as Insumo
   }];

   sliderConfig = {
     spaceBetween: 2,
     //centeredSlides: true,
     slidesPerView: 4
   };
   cart = [];

  constructor(
    private firestore: AngularFirestore,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(){
    this.getProducts();
    this.cart = this.cartService.getCart();
  }

  getProducts() {
    this.firestore.collection('/Insumos').snapshotChanges().subscribe(res => {
      this.Insumos = [];
      res.forEach(task => {
        this.Insumos.push({ id: task.payload.doc.id, data: task.payload.doc.data() });
      });
    });
  }

  cantidadInsumosRequeridos() {
    var cnt = 0;
    for (let index = 0; index < this.Insumos.length; index++) {
      const element = this.Insumos[index];
      if (element.data.stock <= element.data.stockMinimo) {
        cnt += 1;
      }
    }
    return cnt;
  }

  addToCart(product) {
      this.cartService.addProduct(product);
  }

  openCart() {
    this.router.navigate(['checkout']);
  }
  
  itemAdded(item){
    var myCart = this.cartService.getCart();
    var i;
    for (i = 0; i < myCart.length; i++) {
        if (myCart[i] === item) {
            return true;
        }
    }
    return false;
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['login']);
    });
  }

}
