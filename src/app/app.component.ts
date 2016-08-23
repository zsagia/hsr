import { Component } from '@angular/core';
import { FirebaseDatabaseService } from './firebase-database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [FirebaseDatabaseService]
})
export class AppComponent {

  constructor() {
  }
}
