import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseDatabaseService {
  items: FirebaseListObservable<any>;

  constructor(private angularFire: AngularFire) {
    this.items = angularFire.database.list('employee');
  }

  getItems(): FirebaseListObservable<any> {
    return this.items;
  }

}
