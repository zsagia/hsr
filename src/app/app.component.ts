import { Component } from '@angular/core';
import { HsrAuthService } from './services/firebase-auth.service';
import { ROUTES_CONFIG } from './config/routes.config';

@Component({
  selector: 'hsr-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  routes = ROUTES_CONFIG;

  constructor(private firebaseAuthService: HsrAuthService) {
  }

  get isAuthenticated(): boolean {
    return this.firebaseAuthService.isAuthenticated;
  }

  get isAnonymous(): boolean {
    return this.firebaseAuthService.isAnonymous;
  }

  get email():string {
    return this.firebaseAuthService.email;
  }

  onLogout() {
    this.firebaseAuthService.logout();
  }

  get routesDisplay() {
    return this.routes.filter((value, index, array) => value.text);
  }
}
