import { Inject, Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Observable, SubscribableOrPromise } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';
import Auth = firebase.auth.Auth;
import { User } from 'firebase/app';

@Injectable()
export class HsrAuthService implements CanActivate, OnDestroy {
  subscription: Subscription;
  user: Observable<firebase.User>;
  stateSnapshot: User;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, @Inject(FirebaseApp) private firebaseApp: FirebaseApp) {
    this.user = angularFireAuth.authState;
    this.subscription = this.user.subscribe((state) => this.stateSnapshot = state)
  }

  canActivate(): Observable<boolean> | boolean {
    return this.user.map((state) => {
      return !!state.email
    });
  }

  isAuthor(author): boolean {
    return this.stateSnapshot ? author === this.stateSnapshot.email : false;
  }

  get isLoggedIn(): boolean {
    return !!this.stateSnapshot;
  }

  logout() {
    this.stateSnapshot = null;
    this.router.navigate(['/login']).then(() => this.angularFireAuth.auth.signOut());
  }

  registerWithEmailAndPassword(email: string, password: string) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmailAndPassword(email: string, password: string): firebase.Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
