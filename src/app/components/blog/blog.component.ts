import { Component, OnDestroy, OnInit } from '@angular/core';
import { HsrDatabaseService } from '../../services/firebase-database.service';
import { HsrAuthService } from '../../services/firebase-auth.service';
import { MdSnackBar } from '@angular/material';
import { FirebaseListObservable } from 'angularfire2/database';


export interface BlogEntry {
  title: string;
  showPublic: boolean;
  editEveryone: boolean;
  author?: string;
  content: string;
  date?: number;
  reverseDate?: number;
  $key?: number;
}


@Component({
  selector: 'hsr-blog',
  templateUrl: 'blog.component.html'})
export class BlogComponent implements OnInit, OnDestroy {
  options: any = {
    height: 400,
    language: 'de',
    codeMirror: true,
    codeMirrorOptions: {
      indentWithTabs: true,
      lineNumbers: true,
      lineWrapping: true,
      mode: 'text/html',
      tabMode: 'indent',
      tabSize: 2
    },
    dragInline: false,
    emoticonsUseImage: true,
    emoticonsStep: 8,
    videoDefaultAlign: 'center',
    videoDefaultDisplay: 'block',
    linkAlwaysBlank: true,
    imageDefaultAlign: 'center',
    theme: 'dark',
    placeholderText: 'Schreib was...'
  };

  currentEntry: BlogEntry;
  editingKey: number;

  editorOpened = false;

  blogEntries: FirebaseListObservable<any>;

  constructor(private hsrDatabaseService: HsrDatabaseService, private hsrAuthService: HsrAuthService, public snackBar: MdSnackBar) {
    this.blogEntries = hsrDatabaseService.getBlogEntries();
  }

  ngOnInit() {
    this.currentEntry = {title: '', content: null, showPublic: false, editEveryone: false};
  }

  isAuthor(author) {
    return author === this.hsrAuthService.getCurrentUser().email;
  }

  saveEntry() {
    const now = Date.now();

    if (!this.editingKey) {
      this.currentEntry.author = this.hsrAuthService.getCurrentUser().email;
      this.currentEntry.date = now;
      this.currentEntry.reverseDate = 0 - now;
      this.blogEntries.push(this.currentEntry);
    } else {
      this.hsrDatabaseService.getBlogEntry(this.editingKey).update(this.currentEntry);
    }
    this.currentEntry = {title: null, content: '', showPublic: false, editEveryone: false};
    this.editingKey = null;
    this.editorOpened = false;
    this.snackBar.open('Blogeintrag gespeichert', 'OK', {
      duration: 3000
    });
  }

  deleteEntry(key) {
    this.blogEntries.remove(key);
    this.snackBar.open('Blogeintrag gelöscht', 'OK', {
      duration: 3000
    });
  }

  editEntry(key) {
    this.editorOpened = true;
    this.hsrDatabaseService.getBlogEntry(key).subscribe((entry) => {
      this.editingKey = entry.$key;
      this.currentEntry.title = entry.title;
      this.currentEntry.content = entry.content;
      this.currentEntry.showPublic = entry.showPublic;
      this.currentEntry.editEveryone = entry.editEveryone;
      this.currentEntry.author = entry.author;
    });
  }

  ngOnDestroy(): void {
  }

}
