import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { HsrDatabaseService } from '../../shared/services/firebase-database.service';

@Component({
  selector: 'hsr-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  blogEntries: FirebaseListObservable<any>;

  constructor(private hsrDatabaseService: HsrDatabaseService) {
    this.blogEntries = hsrDatabaseService.getBlogEntries();
  }
}
