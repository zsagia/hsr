import { Component } from '@angular/core';
import { FirebaseAuthService } from './firebase-auth.service';
import { Router } from '@angular/router';
import { ROUTES_CONFIG } from './routes.config.ts';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  routes = ROUTES_CONFIG;

  constructor(private firebaseAuthService: FirebaseAuthService, private af: AngularFire, private router: Router) {
  }

  onLogout() {
    this.firebaseAuthService.logout();
    this.router.navigate(['']);
  }
}
