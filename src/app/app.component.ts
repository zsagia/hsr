import { Component } from '@angular/core';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { Router } from '@angular/router';
import { ROUTES_CONFIG } from './config/routes.config';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'hsr-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  routes = ROUTES_CONFIG;
  auth;

  constructor(private firebaseAuthService: FirebaseAuthService, private af: AngularFire, private router: Router) {
    af.auth.subscribe(auth => this.auth = auth);
  }

  onLogout() {
    this.firebaseAuthService.logout();
    this.router.navigate(['']);
  }
}
