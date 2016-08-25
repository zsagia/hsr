import { Component } from '@angular/core';
import { FirebaseAuthService } from '../shared/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hsr-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  user = {email: undefined, password: undefined};

  constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) {
  }

  onLogin() {
    this.firebaseAuthService.loginWithEmailAndPassword(this.user);
    this.toHome();
  }

  onGoogle() {
    this.firebaseAuthService.loginWithGoogle();
    this.toHome();
  }

  onFacebook() {
    this.firebaseAuthService.loginWithFacebook();
    this.toHome();
  }

  toHome() {
    this.router.navigate(['']);
  }

}
