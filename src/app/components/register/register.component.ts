import { Component } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'hsr-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  user = {email: undefined, password: undefined};

  constructor(private auth: FirebaseAuthService) {
  }

  onRegister() {
    this.auth.registerWithEmailAndPassword(this.user);
  }

  onGoogle() {
    this.auth.registerWithGoogle();
  }

  onFacebook() {
    this.auth.registerWithFacebook();
  }
}
