import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { FirebaseListObservable } from 'angularfire2/database';
import { HsrAuthService } from '../../shared/services/hsr-auth.service';
import { BlogService } from './blog.service';
import { BlogEntry } from './blog.types';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hsr-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit, OnDestroy {

  subscription: Subscription;

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

  constructor(private blogService: BlogService, public hsrAuthService: HsrAuthService, public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.currentEntry = {title: '', content: null, showPublic: false, editEveryone: false};
    this.blogEntries = this.blogService.getBlogEntries();
  }

  onSave(entry: BlogEntry) {
    const now = Date.now();

    if (!entry.$key) {
      this.currentEntry.author = this.hsrAuthService.stateSnapshot.email;
      this.currentEntry.date = now;
      this.currentEntry.reverseDate = 0 - now;
      this.blogEntries.push(entry);
    } else {
      const remoteEntry = this.blogService.getBlogEntry(entry.$key);
      delete(entry.$key);
      remoteEntry.update(entry).then(() => {
        this.resetEditor();
        this.snackBar.open('Blogeintrag gespeichert', 'OK', {
          duration: 3000
        });
      });
    }
  }

  resetEditor() {
    this.currentEntry = {title: null, content: '', showPublic: false, editEveryone: false};
    this.editorOpened = false;
  }

  deleteEntry(key) {
    this.blogEntries.remove(key).then(() => {
      this.snackBar.open('Blogeintrag gelöscht', 'OK', {
        duration: 3000
      });
    });
  }

  editEntry(key) {
    this.editorOpened = true;
    this.subscription = this.blogService.getBlogEntry(key).subscribe((entry) => {
      this.currentEntry = {
        $key: entry.$key,
        title: entry.title,
        content: entry.content,
        showPublic: entry.showPublic,
        editEveryone: entry.editEveryone,
        author: entry.author,
      };
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
