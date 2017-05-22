import { Component } from '@angular/core';
import { HsrAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'hsr-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  user = {email: undefined, password: undefined};

  constructor(private auth: HsrAuthService) {
  }

  onRegister() {
    this.auth.registerWithEmailAndPassword(this.user);
  }

  // onGoogle() {
  //   this.auth.registerWithGoogle();
  // }
  //
  // onFacebook() {
  //   this.auth.registerWithFacebook();
  // }
}
