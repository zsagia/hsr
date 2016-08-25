import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../shared/firebase-auth.service';

@Component({
  selector: 'hsr-register',
  templateUrl: 'register.component.html',
  styles: [`
.ng-invalid {
border: 1px solid red;
}
`]
})
export class RegisterComponent implements OnInit {
  user = {email: undefined, password: undefined};

  constructor(private firebaseAuthService: FirebaseAuthService) {
  }

  ngOnInit() {
  }

  onRegister() {
    this.firebaseAuthService.registerWithEmailAndPassword(this.user);
  }

  onGoogle() {
    this.firebaseAuthService.registerWithGoogle();
  }

  onFacebook() {
    this.firebaseAuthService.registerWithFacebook();
  }
}
