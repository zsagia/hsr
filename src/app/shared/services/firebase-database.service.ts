import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class HsrDatabaseService {

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  getChatMessages(): FirebaseListObservable<any> {
    return this.angularFireDatabase.list('chat');
  }

  getChatMessage(key: number): FirebaseObjectObservable<any> {
    return this.angularFireDatabase.object('chat/' + key);
  }

  getBlogEntries(): FirebaseListObservable<any> {
    return this.angularFireDatabase.list('blog', {
      query: {
        orderByChild: 'reverseDate'
      }
    });
  }

  getPlatten(): FirebaseListObservable<any> {
    return this.angularFireDatabase.list('platten');
  }

  getPlatte(key: number): FirebaseObjectObservable<any> {
    return this.angularFireDatabase.object('platten/' + key);
  }

  getFotos(): FirebaseListObservable<any> {
    return this.angularFireDatabase.list('fotos');
  }

  // TODO: remove and use BlogService
  getFotosReverse(): FirebaseListObservable<any> {
    return this.angularFireDatabase.list('fotos', {
      query: {
        orderByChild: 'reverseDate'
      }
    });
  }

  getManuals(): FirebaseListObservable<any> {
    return this.angularFireDatabase.list('manuals');
  }
}
