import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'hsr-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {email: undefined, password: undefined};

  constructor(private firebaseAuthService: FirebaseAuthService) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.firebaseAuthService.login(this.user);
  }

}
