/// <reference path="../../../typings/index.d.ts"/>
import { Component, AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';

let Dropzone = require('../../../node_modules/dropzone/dist/dropzone-amd-module');

@Component({
  selector: 'hsr-dropzone',
  templateUrl: 'dropzone.component.html',
  styleUrls: ['dropzone.component.scss']
})
export class DropzoneComponent implements AfterViewInit, OnDestroy {
  @Output() filesUploading: EventEmitter<File[]> = new EventEmitter<File[]>();
  // TODO: acceptedFiles option as input

  dropzone;

  constructor() {
  }

  get fileDropped(): boolean {
    if (this.dropzone) {
      return this.dropzone.files.length > 0;
    }
    return false;
  }

  ngAfterViewInit() {
    this.dropzone = new Dropzone('div#my_dropzone', {
      url: (files) => {
        this.filesUploading.emit(files);
      },
      autoProcessQueue: false,
      uploadMultiple: true,
      parallelUploads: 20,
      hiddenInputContainer: '#my_dropzone',
      dictDefaultMessage: '',
      maxFiles: 20,
      acceptedFiles: 'image/*',
      previewTemplate: `
<div class="dz-preview dz-file-preview">
  <div class="dz-details">
    <img data-dz-thumbnail/>
  </div>
</div>
`
    });
    this.dropzone.autoDiscover = false;

    this.dropzone.on('addedfile', (file) => {
      /*file.previewElement.addEventListener('click', () => {
       this.dropzone.removeFile(file);
       });*/
    });
    this.dropzone.on('completemultiple', (files) => {
      this.dropzone.removeAllFiles();
    });
    // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.dropzone.on('sendingmultiple', () => {
      console.log('sending!!!!!!!');
    });
  }

  ngOnDestroy() {
    this.dropzone.disable();
  }

  upload() {
    this.dropzone.processQueue();
  }
}
