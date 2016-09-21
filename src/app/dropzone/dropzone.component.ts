/// <reference path="../../../typings/index.d.ts"/>
import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';

let Dropzone = require('../../../node_modules/dropzone/dist/dropzone-amd-module');

@Component({
  selector: 'hsr-dropzone',
  template: `

 <md-card>
 <div class="file-drop" id="my_dropzone"></div>
  <button md-raised-button (click)="upload()">Hochladen!!!</button>
  </md-card>
`,
  styles: [`
.file-drop {
  width: 100%;
  min-height: 120px;
  border: dashed 2px black;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
flex-wrap: wrap;
}
`]
})
export class DropzoneComponent implements AfterViewInit {
  @Output() filesUploading: EventEmitter<File[]> = new EventEmitter<File[]>();
  // TODO: acceptedFiles option as input

  myDropzone;

  constructor() {
  }

  ngAfterViewInit() {
    this.myDropzone = new Dropzone('div#my_dropzone', {
      url: (files) => {
        this.filesUploading.emit(files);
      },
      autoProcessQueue: false,
      uploadMultiple: true,
      parallelUploads: 20,
      maxFiles: 20,
      previewTemplate: `
<div class="dz-preview dz-file-preview" style="border: solid 0.5px gray;">
  <div class="dz-details" style="position: relative">
    <div style="position:absolute; top: 0; left: 0; right: 0;">
        <div class="dz-filename"><span data-dz-name></span>
         <div class="dz-size" data-dz-size></div></div>
    </div>
    <img data-dz-thumbnail />
  </div>
  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
</div>
`
    });
    this.myDropzone.autoDiscover = false;

    /*   this.myDropzone.on('addedfile', (file) => {
     file.previewElement.addEventListener('click', () => {
     this.myDropzone.removeFile(file);
     });
     });
     */
  }

  upload() {
    this.myDropzone.processQueue();
  }
}
