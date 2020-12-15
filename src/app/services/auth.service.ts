import { Injectable, Provider } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';
import 'firebase/auth';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Cart } from '../models/cart';
import { Supplier } from '../models/supplier';
import { SupplierService } from './supplier.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<Supplier>;
  private supplierID: string;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.supplierID = user.uid;
          return this.afs.doc<Supplier>(`Proveedores/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async register(supplier: Supplier): Promise<User> {
    try {
      const newSupplier = {...supplier};
      console.log('Supplier0' , supplier);
      const { user } = await this.afAuth.createUserWithEmailAndPassword(supplier.correo, supplier.password);
      this.registerSupplierData(user, newSupplier);
      console.log('N Supplier' , newSupplier);
      // await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.supplierID = user.uid;
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async logOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private registerSupplierData(user: User, supplier: Supplier) {
    const supplierRef: AngularFirestoreDocument<Supplier> = this.afs.doc(`Proveedores/${user.uid}`);

    const data: Supplier = {
      correo: supplier.correo,
      nombre: supplier.nombre,
      numero: supplier.numero,
      NIT: supplier.NIT,
      direccion: supplier.direccion,
      password: null
    };

    return supplierRef.set(data, { merge: true });
  }

  getSupplierId() {
    console.log(this.supplierID);
    return this.supplierID;
  }

  loginProveedor(
    email: string,
    password:string
  ):Promise<firebase.auth.UserCredential>{
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  RegisterProveedor(
    email: string,
    password:string
  ):Promise<firebase.auth.UserCredential>{
    return firebase.auth().createUserWithEmailAndPassword(email,password);
  }
  
  resetPassword(email:string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logOutProveedor():Promise<void>{
    return firebase.auth().signOut();
  }


}
