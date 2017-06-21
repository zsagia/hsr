import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { BlogService } from '../../blog/blog.service';
import { BlogEntry } from '../../blog/blog.types';

@Component({
  selector: 'hsr-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  blogEntries: FirebaseListObservable<BlogEntry[]>;

  constructor(private blogService: BlogService) {
    this.blogEntries = blogService.getBlogEntries();
  }
}
