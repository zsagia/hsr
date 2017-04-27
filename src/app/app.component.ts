import { Component, OnDestroy } from '@angular/core';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { ROUTES_CONFIG } from './config/routes.config';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'hsr-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
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

  get routesDisplay() {
    return this.routes.filter((value, index, array) => value.text);
  }

  ngOnDestroy(): void {
    this.af.auth.unsubscribe();
  }
}
