import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CKEditor } from 'ng2-ckeditor';

@Component({
  selector: 'hsr-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
  directives: [REACTIVE_FORM_DIRECTIVES, CKEditor],
})
export class BlogComponent implements OnInit {

  modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmitModelForm(form) {
    console.log(form);
  }
}
