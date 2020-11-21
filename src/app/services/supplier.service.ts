import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} 
from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Supplier} from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersCollection: AngularFirestoreCollection<Supplier>;
  suppliers: Observable<Supplier[]>;
  constructor(public afs: AngularFirestore) { 
    this.suppliers = this.afs.collection('Proveedores').valueChanges();
  }

  getSuppliers(){
    return this.suppliers;
  }
}


