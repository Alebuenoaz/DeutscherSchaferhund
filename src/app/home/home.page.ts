import { Component, OnInit } from '@angular/core';

// Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Producto } from '../Producto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  doc: any;
  tasks: any = [];
  Tareas: any = [{
    id: '',
    data: {} as Producto
   }];

   sliderConfig = {
     spaceBetween: 2,
     // centeredSlides: true,
     slidesPerView: 1
   };
   cart = [];

  constructor(
    private firestore: AngularFirestore,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(){
    // CALL FIRESTORE DOCUMENT AND SAVE IT IN OUR DOC VARIABLE.
    /*this.firestore.doc('/Productos/Carne').valueChanges().subscribe(res => {
      this.doc = res;
      console.log('Doc retrieved', this.doc);
    });*/
    this.getProducts();
    this.cart = this.cartService.getCart();
  }

  getProducts() {
    this.firestore.collection('/Productos').snapshotChanges().subscribe(res => {
      this.Tareas = [];
      res.forEach(task => {
        this.Tareas.push({ id: task.payload.doc.id, data: task.payload.doc.data() });
      });
      console.log(this.Tareas);
    });
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  openCart() {
    this.router.navigate(['cart']);
  }

}
