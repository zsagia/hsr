import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuthState } from 'angularfire2';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/first';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseAuthService implements CanActivate {

  googleProvider;
  facebookProvider;

  authState;

  accessToken: string;

  constructor(private angularFire: AngularFire, private router: Router) {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();

    this.angularFire.auth.subscribe(auth => {
      this.authState = auth;
    });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.angularFire.auth.map(auth => {
      return !!auth;
    }).first();
  }

  logout() {
    this.angularFire.auth.logout();
    // TODO: make work without console error
    this.loginAnonymously().then(() => {
      this.router.navigate(['']);
    });
  }

  registerWithEmailAndPassword(user) {
    this.angularFire.auth.createUser({email: user.email, password: user.password});
  }

  loginAnonymously(): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.login({
      method: AuthMethods.Anonymous,
      provider: AuthProviders.Anonymous
    });
  }

  loginWithEmailAndPassword(user) {
    this.angularFire.auth.login(user, {
      method: AuthMethods.Password,
      provider: AuthProviders.Password
    });
  }

  loginWithGoogle() {
    this.angularFire.auth.login({
      method: AuthMethods.Popup,
      provider: AuthProviders.Google
    });
  }

  loginWithFacebook() {
    this.angularFire.auth.login({
      method: AuthMethods.Popup,
      provider: AuthProviders.Facebook
    });
  }

  registerWithGoogle() {
    firebase.auth().signInWithPopup(this.googleProvider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      this.accessToken = result.credential['accessToken'];
    }).catch(function (error) {
      console.log(error);
    });
  }

  linkWithGoogle() {
    firebase.auth().signInWithPopup(this.googleProvider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log(result.credential);
      console.log(result.user);
    }).catch(function (error) {
      console.log(error);
    });
  }

  registerWithFacebook() {
    firebase.auth().signInWithPopup(this.facebookProvider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      this.accessToken = result.credential['accessToken'];
    }).catch(function (error) {
      console.log(error);
    });
  }

  getUserData() {
    return this.authState.auth;
  }
}
