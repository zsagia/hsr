import { Component } from '@angular/core';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { ROUTES_CONFIG } from './config/routes.config';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'hsr-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  routes = ROUTES_CONFIG;
  authState;

  constructor(private firebaseAuthService: FirebaseAuthService, private af: AngularFire) {
    af.auth.subscribe(auth => {
      this.authState = auth;
    });
  }

  onLogout() {
    this.firebaseAuthService.logout();
  }
}
