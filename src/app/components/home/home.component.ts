import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';

@Component({
  selector: 'hsr-home',
  templateUrl: './home.component.html',
  styles: [`
  
  `]
})
export class HomeComponent {
  blogEntries: FirebaseListObservable<any>;

  constructor(private database: FirebaseDatabaseService) {
    this.blogEntries = database.getBlogEntries();
  }
}
