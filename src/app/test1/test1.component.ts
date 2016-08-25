import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService } from '../shared/firebase-database.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'hsr-test1',
  template: `
 <md-card>
 <hi>Test1</hi>
      <md-list class="app-list">
        <md-list-item  *ngFor="let item of items | async" [routerLink]="['/test11', item.id]">
          <h3 md-line>{{item.firstName}} {{item.lastName}}</h3>
          <p md-line class="demo-secondary-text">{{item.id}} - {{item.photo}}</p>
        </md-list-item>
      </md-list>
    </md-card>
  `
})
export class Test1Component implements OnInit {
  items: FirebaseListObservable<any>;

  constructor(private firebaseDatabaseService: FirebaseDatabaseService) {
  }

  ngOnInit() {
    this.items = this.firebaseDatabaseService.getItems();
  }

  onClick(id: number) {
  }

}
