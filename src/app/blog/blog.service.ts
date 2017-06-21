import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { BlogEntry } from './blog.types';

@Injectable()
export class BlogService {

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  getBlogEntries(): FirebaseListObservable<any> {
    return this.angularFireDatabase.list('blog', {
      query: {
        orderByChild: 'reverseDate'
      }
    });
  }

  getBlogEntry(key: number): FirebaseObjectObservable<BlogEntry> {
    return this.angularFireDatabase.object('blog/' + key);
  }

}
