import { Component } from '@angular/core';
import { FirebaseDatabaseService } from './firebase-database.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [FirebaseDatabaseService]
})
export class AppComponent {
  title: FirebaseListObservable<any>;

  constructor(private firebaseDatabseService: FirebaseDatabaseService) {
    this.title = firebaseDatabseService.getItems();
  }
}
