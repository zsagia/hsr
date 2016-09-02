import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseDatabaseService {
  items: FirebaseListObservable<any>;

  constructor(private angularFire: AngularFire) {
  }

  getBlogEntries(): FirebaseListObservable<any> {
    return this.angularFire.database.list('blog');
  }

  getBlogEntry(id: number) {
    return this.angularFire.database.object('blog/' + (id - 1));
  }

  getItems(): FirebaseListObservable<any> {
    return this.angularFire.database.list('employee');
  }

  getItem(id: number): FirebaseObjectObservable<any> {
    return this.angularFire.database.object('employee/' + (id - 1));
  }

}
