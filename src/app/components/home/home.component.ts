import { Component } from '@angular/core';
import { HsrDatabaseService } from '../../services/firebase-database.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'hsr-home',
  templateUrl: './home.component.html',
  styles: [`
  
  `]
})
export class HomeComponent {
  blogEntries: FirebaseListObservable<any>;

  constructor(private database: HsrDatabaseService) {
    this.blogEntries = database.getBlogEntries();
  }
}
