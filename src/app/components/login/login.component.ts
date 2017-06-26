import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HsrAuthService } from '../../shared/services/firebase-auth.service';

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
