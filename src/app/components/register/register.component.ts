import { Component } from '@angular/core';
import { HsrAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'hsr-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  email: string;
  password: string;

  constructor(private hsrAuthService: HsrAuthService) {
  }

  get isAuthenticated(): boolean {
    return this.hsrAuthService.isAuthenticated;
  }

  onRegister() {
    this.hsrAuthService.registerWithEmailAndPassword(this.email, this.password);
  }

  // onGoogle() {
  //   this.auth.registerWithGoogle();
  // }
  //
  // onFacebook() {
  //   this.auth.registerWithFacebook();
  // }
}
