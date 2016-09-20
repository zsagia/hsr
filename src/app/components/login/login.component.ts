import { Component } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hsr-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  user = {email: undefined, password: undefined};

  constructor(private auth: FirebaseAuthService, private router: Router) {
  }

  onLogin() {
    this.auth.loginWithEmailAndPassword(this.user);
    this.toHome();
  }

  onGoogle() {
    this.auth.loginWithGoogle();
    this.toHome();
  }

  onFacebook() {
    this.auth.loginWithFacebook();
    this.toHome();
  }

  toHome() {
    this.router.navigate(['']);
  }

}
