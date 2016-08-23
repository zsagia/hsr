import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService } from '../firebase-database.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'hsr-test1',
  template: `
 <md-card>
      <md-list class="app-list">
        <md-list-item  *ngFor="let item of items | async">
          <h3 md-line>{{item.firstName}} {{item.lastName}}</h3>
          <p md-line class="demo-secondary-text">{{item.photo}}</p>
        </md-list-item>
      </md-list>
    </md-card>
  `,
  styles: []
})
export class Test1Component implements OnInit {
  items: FirebaseListObservable<any>;

  constructor(private firebaseDatabseService: FirebaseDatabaseService) {
  }

  ngOnInit() {
    this.items = this.firebaseDatabseService.getItems();
  }

}
