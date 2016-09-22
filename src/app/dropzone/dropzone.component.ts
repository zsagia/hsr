import { Component, AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { Output, Input } from '@angular/core/src/metadata/directives';

declare var require: any;

let Dropzone = require('../../../node_modules/dropzone/dist/dropzone-amd-module');

@Component({
  selector: 'hsr-dropzone',
  templateUrl: 'dropzone.component.html',
  styleUrls: ['dropzone.component.scss']
})
export class DropzoneComponent implements AfterViewInit, OnDestroy {
  @Output() filesUploading: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() fileAdded: EventEmitter<File> = new EventEmitter<File>();
  @Output() fileRemoved: EventEmitter<File> = new EventEmitter<File>();

  @Input() acceptedFiles: string;
  @Input() maxFiles: number;
  @Input() autoUpload: boolean;

  fileLimitReached: boolean = false;
  fileLimitExceeded: boolean = false;
  dropzone;

  constructor() {
  }

  get fileDropped(): boolean {
    if (this.dropzone) {
      return this.dropzone.files.length > 0;
    }
    return false;
  }

  get countFiles(): number {
    return this.dropzone.files.length;
  }

  ngAfterViewInit() {
    this.dropzone = new Dropzone('div#my_dropzone', {
      url: '/',
      autoProcessQueue: this.autoUpload || false,
      uploadMultiple: true,
      parallelUploads: 20,
      hiddenInputContainer: '#dropzone-drop-area',
      dictDefaultMessage: '',
      maxFiles: this.maxFiles || 100,
      acceptedFiles: this.acceptedFiles || 'image/*,application/pdf',
      clickable: '#dropzone-drop-area',
      previewsContainer: '#dropzone-drop-area',
      previewTemplate: `
<div class="dz-preview dz-file-preview" class="md-card">
  <div class="dz-details">
    <img data-dz-thumbnail/>
      <div class="dz-filename"><span data-dz-name></span></div>
  </div>
   <!--<div class="dz-error-message"><span data-dz-errormessage></span></div>-->
</div>
`
    });
    this.dropzone.autoDiscover = false;

    this.dropzone.on('addedfile', (file) => {
      console.log('file added:');
      console.log(file);
      this.fileAdded.emit(file);

      // TODO: removing with x button
      // file.previewElement.addEventListener('click', (e) => {
      //   e.stopPropagation();
      //   this.dropzone.removeFile(file);
      // });
    });
    this.dropzone.on('removedfile', (file) => {
      if (this.countFiles <= this.maxFiles) {
        this.fileLimitExceeded = false;
      }
      if (this.countFiles < this.maxFiles) {
        this.fileLimitReached = false;
      }
      this.fileRemoved.emit(file);
    });

    this.dropzone.on('maxfilesreached', () => {
      console.log('file limit reached!!!!')
      this.fileLimitReached = true;
    });
    this.dropzone.on('maxfilesexceeded', () => {
      console.log('file limit exceeded!!!!')
      this.fileLimitExceeded = true;
    });

    this.dropzone.on('processingmultiple', (files) => {
      console.log('processing!!!!!!!');
      this.filesUploading.emit(files);
    });
    this.dropzone.on('sendingmultiple', () => {
      console.log('sending!!!!!!!');
    });
    this.dropzone.on('completemultiple', (files) => {
      if (!this.fileLimitReached) {
        console.log('completed!!!!!!!');
        this.dropzone.removeAllFiles();
        console.log('removed all!!!!!!!');
      }
    });
  }

  ngOnDestroy() {
    this.dropzone.disable();
  }

  upload() {
    this.dropzone.processQueue();
  }
}
