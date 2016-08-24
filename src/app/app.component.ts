import { Component } from '@angular/core';
import { FirebaseAuthService } from './firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [FirebaseAuthService]
})
export class AppComponent {

  constructor(private firebaseAuthService: FirebaseAuthService) {
  }

  getAuthState() {
    return this.firebaseAuthService.authState;
  }

  onLogout() {
    this.firebaseAuthService.logout();
  }
}
