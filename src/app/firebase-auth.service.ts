import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, AuthMethods, AuthProviders } from 'angularfire2';
import User = firebase.User;

@Injectable()
export class FirebaseAuthService {

  googleProvider;
  facebookProvider;

  currentUser: User;
  accessToken: string;

  authState: FirebaseAuthState;

  constructor(private angularFire: AngularFire) {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();

    this.angularFire.auth.subscribe(authState => {
      this.authState = authState;
    });
  }

  logout() {
    this.angularFire.auth.logout();
  }

  register(user) {
    this.angularFire.auth.createUser({email: user.email, password: user.password}).then(result => {
      this.authState = result;
    });
  }

  login(user) {
    this.angularFire.auth.login(user, {
      method: AuthMethods.Password,
      provider: AuthProviders.Password
    }).then(result => {
      this.authState = result;
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
}
