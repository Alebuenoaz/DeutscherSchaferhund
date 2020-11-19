import { Component, OnInit } from '@angular/core';

// Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  doc: any;

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

}
