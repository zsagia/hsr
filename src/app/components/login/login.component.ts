import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HsrAuthService } from '../../shared/services/hsr-auth.service';

@Component({
  selector: 'hsr-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(public hsrAuthService: HsrAuthService, private router: Router) {
  }

  onLogin() {
    this.hsrAuthService.loginWithEmailAndPassword(this.email, this.password);
  }
}
