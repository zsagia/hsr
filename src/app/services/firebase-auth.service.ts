import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';

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
    if (!this.isAuthenticated && !this.isAnonymous) {
      this.loginAnonymously();
    }
    this.user = angularFireAuth.authState;

    angularFireAuth.authState.filter(state => !!state).subscribe(state => {
      this.isAnonymous = state.isAnonymous;
    });

    angularFireAuth.authState.filter(state => !!state).subscribe(state => {
      this.isAuthenticated = !!state.email;
    });

    angularFireAuth.authState.filter(state => !!state).subscribe(state => {
      this.email = state.email;
    });
  }

  // loginWithGoogle() {
  //   this.angularFireAuth.auth.signInWithPopup(new firebaseApp.auth.GoogleAuthProvider());
  // }

  getCurrentUser() {
    const user = this.firebaseApp.auth().currentUser;
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  canActivate(): Observable<boolean> | boolean {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  logout() {

    this.angularFireAuth.auth.signOut().then(() => {
      this.loginAnonymously().then(() => this.router.navigate(['/']));
    });
  }

  registerWithEmailAndPassword(user) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginAnonymously(): firebase.Promise<any> {
    return this.angularFireAuth.auth.signInAnonymously();
  }

  loginWithEmailAndPassword(email: string, password: string): firebase.Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  //
  // loginWithGoogle() {
  //   this.angularFireAuth.auth.login({
  //     method: AuthMethods.Popup,
  //     provider: AuthProviders.Google
  //   });
  // }
  //
  // loginWithFacebook() {
  //   this.angularFireAuth.auth.login({
  //     method: AuthMethods.Popup,
  //     provider: AuthProviders.Facebook
  //   });
  // }
  //
  // registerWithGoogle() {
  //   firebaseApp.auth().signInWithPopup(this.googleProvider).then(result => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     this.accessToken = result.credential['accessToken'];
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }
  //
  // linkWithGoogle() {
  //   firebaseApp.auth().signInWithPopup(this.googleProvider).then(result => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     console.log(result.credential);
  //     console.log(result.user);
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }
  //
  // registerWithFacebook() {
  //   firebaseApp.auth().signInWithPopup(this.facebookProvider).then(result => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     this.accessToken = result.credential['accessToken'];
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }
}
