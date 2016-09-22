import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseDatabaseService {
  items: FirebaseListObservable<any>;

  constructor(private angularFire: AngularFire) {
  }

  getBlogEntries(): FirebaseListObservable<any> {
    return this.angularFire.database.list('blog', {
      query: {
        orderByChild: 'reverseDate'
      }
    });
  }

  getPlatten(): FirebaseListObservable<any> {
    return this.angularFire.database.list('platten');
  }

  getPlatte(key: number): FirebaseObjectObservable<any> {
    return this.angularFire.database.object('platten/' + key);
  }

  getFotos(): FirebaseListObservable<any> {
    return this.angularFire.database.list('fotos', {
      query: {
        orderByChild: 'reverseDate'
      }
    });
  }

  getManuals(): FirebaseListObservable<any> {
    return this.angularFire.database.list('manuals');
  }
}
