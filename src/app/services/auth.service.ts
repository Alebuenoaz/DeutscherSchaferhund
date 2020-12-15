import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';

import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebase: FirebaseApp) { }

  loginProveedor(
    email: string,
    password:string
  ):Promise<firebase.auth.UserCredential>{
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  //firebase.auth().currentUser.displayName//
  resetPassword(email:string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  getCurrentUser():string{
    return firebase.auth().currentUser.displayName;
  }

  logOutProveedor():Promise<void>{
    return firebase.auth().signOut();
  }
}
