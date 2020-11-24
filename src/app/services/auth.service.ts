import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginProveedor(
    email: string,
    password:string
  ):Promise<firebase.auth.UserCredential>{
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  
  resetPassword(email:string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logOutProveedor():Promise<void>{
    return firebase.auth().signOut();
  }
}
