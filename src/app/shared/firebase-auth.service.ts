import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import User = firebase.User;
import Auth = firebase.auth.Auth;

@Injectable()
export class FirebaseAuthService implements CanActivate {

  googleProvider;
  facebookProvider;

  authState;

  currentUser: User;

  accessToken: string;

  constructor(private angularFire: AngularFire) {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();

    Auth.onAuthStateChanged(data => {
      this.authState = data;
      console.log('FIREBASE_AUTH_STATE:\n' + data);
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.loggedIn();
  }

  logout() {
    this.angularFire.auth.logout();
  }

  registerWithEmailAndPassword(user) {
    this.angularFire.auth.createUser({email: user.email, password: user.password});
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
      // The signed-in user info.
      this.currentUser = result.user;
    }).catch(function (error) {
      console.log(error);
    });
  }

  registerWithFacebook() {
    firebase.auth().signInWithPopup(this.facebookProvider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      this.accessToken = result.credential['accessToken'];
      // The signed-in user info.
      this.currentUser = result.user;
    }).catch(function (error) {
      console.log(error);
    });
  }

  loggedIn(): boolean {
    return this.authState !== null;
  }
}
