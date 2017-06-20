import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HsrAuthService implements CanActivate {

  // googleProvider;
  // facebookProvider;
  // accessToken: string;

  isAuthenticated = false;
  isAnonymous = false;
  email: string;
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, @Inject(FirebaseApp) private firebaseApp: FirebaseApp) {
    // this.googleProvider = new firebaseApp.auth.GoogleAuthProvider();
    // this.facebookProvider = new firebaseApp.auth.FacebookAuthProvider();
    this.user = angularFireAuth.authState;

    this.user.subscribe((state) => {
      if (!state) {
        this.loginAnonymously();
      } else {
        this.isAnonymous = state.isAnonymous;
        this.isAuthenticated = !!state.email;
        this.email = state.email;
      }
    });
  }

  canActivate(): Observable<boolean> | boolean {
    return this.user.map((state) => {
      return !!state.email
    });
  }

  logout() {
    this.router.navigate(['/login']).then(() => {
      this.angularFireAuth.auth.signOut().then(() => this.loginAnonymously())
    });
  }

  registerWithEmailAndPassword(email: string, password: string) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginAnonymously(): firebase.Promise<any> {
    return this.angularFireAuth.auth.signInAnonymously();
  }

  loginWithEmailAndPassword(email: string, password: string): firebase.Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
