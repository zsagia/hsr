import { Component } from '@angular/core';
import { HsrAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hsr-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private firebaseAuthService: HsrAuthService, private router: Router) {
  }

  get isAuthenticated(): boolean {
    return this.firebaseAuthService.isAuthenticated;
  }

  onLogin() {
    this.firebaseAuthService.loginWithEmailAndPassword(this.email, this.password);
  }
}
