import { Component } from '@angular/core';
import { CKEditor } from 'ng2-ckeditor';

@Component({
  selector: 'hsr-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
  directives: [CKEditor],
})
export class BlogComponent {

  inContent: string = '<h1>BLA</h1>';
  outContent: string = 'test';

  constructor() {
  }

  onCkEditorChange(content) {
    console.log(content);
    this.inContent = content;
  }

  onTinyMceChange(content) {
    console.log(content);
    this.outContent = content;
  }

  getContent() {
    return this.outContent;
  }

}
