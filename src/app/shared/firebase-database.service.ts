import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseDatabaseService {
  items: FirebaseListObservable<any>;

  constructor(private angularFire: AngularFire) {
  }

  getItems(): FirebaseListObservable<any> {
    return this.angularFire.database.list('employee');
  }

  getItem(id: number): FirebaseObjectObservable<any> {
    return this.angularFire.database.object('employee/' + (id - 1));
  }

}