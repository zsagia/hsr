import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuthState } from 'angularfire2';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

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
      console.log('AUTH STATE:');
      console.log(auth);
      console.log('CURRENT USER:');
      console.log(firebase.auth().currentUser);
    });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.loggedIn();
  }

  logout() {
    this.angularFire.auth.logout();
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

  loggedIn(): boolean {
    if (this.authState) {
      return !this.authState.auth.isAnonymous;
    } else {
      return false;
    }
  }

  getUserData() {
    return this.authState.auth;
  }
}
