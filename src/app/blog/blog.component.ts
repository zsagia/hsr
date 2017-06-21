import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { FirebaseListObservable } from 'angularfire2/database';
import { HsrAuthService } from '../services/firebase-auth.service';
import { BlogService } from './blog.service';
import { BlogEntry } from './blog.types';

@Component({
  selector: 'hsr-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {

  OPTIONS = {
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
  blogEntries: FirebaseListObservable<BlogEntry[]>;
  currentEntry: BlogEntry;
  editorOpened = false;

  constructor(private blogService: BlogService, private hsrAuthService: HsrAuthService, public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.currentEntry = {title: '', content: null, showPublic: false, editEveryone: false};
    this.blogEntries = this.blogService.getBlogEntries();
  }

  isAuthor(author) {
    return author === this.hsrAuthService.email;
  }

  onSave() {
    const now = Date.now();

    if (!this.currentEntry.$key) {
      this.currentEntry.author = this.hsrAuthService.email;
      this.currentEntry.date = now;
      this.currentEntry.reverseDate = 0 - now;
      this.blogEntries.push(this.currentEntry);
    } else {
      this.blogService.getBlogEntry(this.currentEntry.$key).update(this.currentEntry);
    }

    this.snackBar.open('Blogeintrag gespeichert', 'OK', {
      duration: 3000
    });

    this.resetEditor();
  }

  resetEditor() {
    this.currentEntry = {title: null, content: '', showPublic: false, editEveryone: false};
    this.editorOpened = false;
  }

  deleteEntry(key) {
    this.blogEntries.remove(key);
    this.snackBar.open('Blogeintrag gelöscht', 'OK', {
      duration: 3000
    });
  }

  editEntry(key) {
    this.editorOpened = true;
    this.blogService.getBlogEntry(key).subscribe((entry) => {
      this.currentEntry.$key = entry.$key;
      this.currentEntry.title = entry.title;
      this.currentEntry.content = entry.content;
      this.currentEntry.showPublic = entry.showPublic;
      this.currentEntry.editEveryone = entry.editEveryone;
      this.currentEntry.author = entry.author;
    });
  }

}
