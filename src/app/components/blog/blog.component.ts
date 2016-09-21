import { Component, ViewChild } from '@angular/core';
import { TinyMceComponent } from '../../tinymce/tinymce.component';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'hsr-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss']
})
export class BlogComponent {
  @ViewChild(TinyMceComponent) tinyMce: TinyMceComponent;

  inContent: string;

  currentEntry: BlogEntry = {
    title: undefined,
    showPublic: false,
    author: undefined,
    content: undefined,
    date: undefined,
    reverseDate: undefined
  };

  blogEntries: FirebaseListObservable<any>;

  constructor(private database: FirebaseDatabaseService, private auth: FirebaseAuthService) {
    this.blogEntries = database.getBlogEntries();
  }

  saveEntry(content: BlogEntry) {
    let now = Date.now();

    content.author = this.auth.getCurrentUser().displayName || this.auth.getCurrentUser().email;
    content.content = this.tinyMce.getContent();
    content.date = now;
    content.reverseDate = 0 - now;

    this.blogEntries.push(content);
  }

  deleteEntry(key) {
    this.blogEntries.remove(key);
  }
}

export interface BlogEntry {
  title: string;
  showPublic: boolean;
  author: string;
  content: string;
  date: number;
  reverseDate: number;
}
