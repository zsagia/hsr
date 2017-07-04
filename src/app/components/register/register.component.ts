import { Component } from '@angular/core';
import { HsrAuthService } from '../../shared/services/hsr-auth.service';

@Component({
  selector: 'hsr-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  email: string;
  password: string;

  constructor(public hsrAuthService: HsrAuthService) {
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
