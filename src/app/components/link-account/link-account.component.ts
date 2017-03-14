import { Component, AfterViewInit, NgZone } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
declare var gapi: any;

@Component({
  selector: 'hsr-link-account',
  templateUrl: 'link-account.component.html'
})
export class LinkAccountComponent implements AfterViewInit {
  // TODO: make it work for linking acounts

  googleLoginButtonId = 'google-login-button';
  userAuthToken = null;
  userDisplayName = 'empty';

  constructor(private firebaseAuthService: FirebaseAuthService, private _zone: NgZone) {
  }

  ngAfterViewInit() {
    // Converts the Google login button stub to an actual button.
    gapi.signin2.render(
      this.googleLoginButtonId,
      {
        'onSuccess': this.onSignIn,
        'scope': 'profile',
        'theme': 'dark',
        'height': 50,
        'longtitle': true,
        'onfailure': this.onGoogleFailure
      });
  }

  onSignIn = (loggedInUser) => {
    this._zone.run(() => {
      this.userAuthToken = loggedInUser.getAuthResponse().id_token;
      this.userDisplayName = loggedInUser.getBasicProfile().getName();
      console.log(this.userAuthToken);
      console.log(this.userDisplayName);
    });
  };

  onGoogleFailure(error) {
    console.log(error);
  }

}
