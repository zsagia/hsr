import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'hsr-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss']
})
export class BlogComponent implements OnInit {

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

  constructor(private database: FirebaseDatabaseService, private auth: FirebaseAuthService, public snackBar: MdSnackBar) {
    this.blogEntries = database.getBlogEntries();
  }

  ngOnInit() {
    this.currentEntry = {title: '', content: null, showPublic: false, editEveryone: false};
  }

  isAuthor(author) {
    return author === this.auth.getCurrentUser().email;
  }

  saveEntry() {
    const now = Date.now();

    if (!this.editingKey) {
      this.currentEntry.author = this.auth.getCurrentUser().email;
      this.currentEntry.date = now;
      this.currentEntry.reverseDate = 0 - now;
      this.blogEntries.push(this.currentEntry);
    } else {
      this.database.getBlogEntry(this.editingKey).update(this.currentEntry);
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
    this.database.getBlogEntry(key).subscribe((entry) => {
      this.editingKey = entry.$key;
      this.currentEntry.title = entry.title;
      this.currentEntry.content = entry.content;
      this.currentEntry.showPublic = entry.showPublic;
      this.currentEntry.editEveryone = entry.editEveryone;
      this.currentEntry.author = entry.author;
    });
  }
}

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
