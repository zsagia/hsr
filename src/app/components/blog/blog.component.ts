import { Component, ViewChild } from '@angular/core';
import { TinyMceComponent } from '../../tinymce/tinymce.component';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../shared/firebase-database.service';
import { FirebaseAuthService } from '../../shared/firebase-auth.service';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { DomSanitizationService, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'hsr-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
  pipes: [ReversePipe]
})
export class BlogComponent {
  @ViewChild(TinyMceComponent) tinyMce: TinyMceComponent;

  inContent: string;

  currentEntry: BlogEntry = {
    title: undefined,
    author: undefined,
    content: undefined,
    date: undefined,
    reverseDate: undefined
  };

  blogEntries: FirebaseListObservable<any>;

  constructor(private firebaseDatabaseService: FirebaseDatabaseService, private firebaseAuthService: FirebaseAuthService, private sanitizer: DomSanitizationService) {
    this.blogEntries = firebaseDatabaseService.getBlogEntries();
  }

  saveEntry(content: BlogEntry) {
    let now = Date.now();

    content.author = this.firebaseAuthService.getCurrentUser().displayName || this.firebaseAuthService.getCurrentUser().email;
    content.content = this.tinyMce.getContent();
    content.date = now;
    content.reverseDate = 0 - now;

    this.blogEntries.push(content);
  }

  uploadImages() {
    this.tinyMce.uploadImages();
  }

  // TODO: make unsafe html output work
  unsafe(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

}

export interface BlogEntry {
  title: string;
  author: string;
  content: string;
  date: number;
  reverseDate: number;
}
