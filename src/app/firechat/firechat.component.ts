import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { FirebaseDatabaseService } from '../services/firebase-database.service';

let FirechatUI = require('../../../node_modules/firechat/dist/firechat');

@Component({
  selector: 'hsr-firechat',
  templateUrl: 'firechat.component.html',
  styleUrls: ['firechat.component.scss']
})
export class FirechatComponent implements AfterViewInit {
  @ViewChild('firechat_wrapper') el: ElementRef;
  myFirechat;

  constructor(private auth: FirebaseAuthService, private database: FirebaseDatabaseService) {
  }

  ngAfterViewInit() {
    firebase.auth().onAuthStateChanged((user) => {
      // Once authenticated, instantiate Firechat with the logged in user
      if (user) {
        this.initChat(user);
      }
    });
  }

  initChat(user) {
    // Get a Firebase Database ref
    let chatRef = firebase.database().ref('chat');

    console.log(chatRef);

    this.myFirechat = new FirechatUI(chatRef, this.el);

    console.log(this.myFirechat);

    // Set the Firechat user
    this.myFirechat.setUser();
  }

}
