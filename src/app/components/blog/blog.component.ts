import { Component, ViewChild } from '@angular/core';
import { TinyMceComponent } from '../../tinymce/tinymce.component';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../shared/firebase-database.service';
import { FirebaseAuthService } from '../../shared/firebase-auth.service';

@Component({
  selector: 'hsr-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss']
})
export class BlogComponent {
  @ViewChild(TinyMceComponent) tinyMce: TinyMceComponent;

  inContent: string;

  currentEntry: BlogEntry = {title: undefined, author: undefined, content: undefined};

  blogEntries: FirebaseListObservable<BlogEntry>;

  constructor(private firebaseDatabaseService: FirebaseDatabaseService, private firebaseAuthService: FirebaseAuthService) {
    this.blogEntries = firebaseDatabaseService.getBlogEntries();
  }

  saveEntry(entry: BlogEntry) {
    entry.author = this.firebaseAuthService.getCurrentUser().displayName || this.firebaseAuthService.getCurrentUser().email;
    entry.content = this.tinyMce.getContent();

    this.blogEntries.push(entry);
  }

  uploadImages() {
    this.tinyMce.uploadImages();
  }

}

export interface BlogEntry {
  title: string;
  author: string;
  content: string;
}
