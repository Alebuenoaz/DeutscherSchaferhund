import { Component, OnInit } from '@angular/core';

// Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';
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

  constructor(
    private firestore: AngularFirestore
  ) {}

  ngOnInit(){
    // CALL FIRESTORE DOCUMENT AND SAVE IT IN OUR DOC VARIABLE.
    this.firestore.doc('/Productos/Carne').valueChanges().subscribe(res => {
      this.doc = res;
      console.log('Doc retrieved', this.doc);
    });
  }

  fetch() {
    this.firestore.collection('/Productos').snapshotChanges().subscribe(res => {
      // console.log(res);
      const tmp = [];
      res.forEach(task => {
        tmp.push({ key: task.payload.doc.id, ...task.payload.doc.data });
      });
      console.log(tmp);
      this.tasks = tmp;
    });
  }

  fetch2() {
    this.firestore.collection('/Productos').snapshotChanges().subscribe(res => {
      // console.log(res);
      this.Tareas = [];
      res.forEach(task => {
        this.Tareas.push({ id: task.payload.doc.id, data: task.payload.doc.data() });
      });
      console.log(this.Tareas);
    });
  }

}
