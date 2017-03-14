import { Component, AfterViewInit, EventEmitter, OnDestroy, Output, Input } from '@angular/core';

declare var Dropzone: any;

@Component({
  selector: 'hsr-dropzone',
  templateUrl: 'dropzone.component.html',
  styleUrls: ['dropzone.component.scss']
})
export class DropzoneComponent implements AfterViewInit, OnDestroy {
  private fileLimitReached: boolean = false;
  private fileLimitExceeded: boolean = false;
  private hasError: boolean = false;
  private dropzone;

  @Output() filesUploading: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() fileAdded: EventEmitter<File> = new EventEmitter<File>();
  @Output() fileRemoved: EventEmitter<File> = new EventEmitter<File>();
  @Output() areFilesInList: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() acceptedFiles: string;
  @Input() maxFiles: number;
  @Input() autoUpload: boolean;

  constructor() {
  }

  countFiles(): number {
    return this.dropzone.getAcceptedFiles();
  }

  get fileDropped(): boolean {
    if (this.dropzone) {
      return this.dropzone.files.length > 0;
    }
    return false;
  }

  @Input() set fileToRemove(file: File) {
    if (file) {
      this.dropzone.removeFile(file);
    }
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
<div class="dz-preview dz-file-preview" class="card card-interactive">
 <div class="dz-preview-x-layer"><i class="fa fa-times fa-3x"></i></div>
  <div class="dz-details">
    <img data-dz-thumbnail/>
  </div>
    <!--<div class="dz-filename"><span data-dz-name></span></div>-->
     <!--<div class="dz-error-message"><span data-dz-errormessage></span></div>-->
</div>
`
    });
    this.dropzone.autoDiscover = false;

    this.dropzone.on('addedfile', (file) => {
      console.log('file added:');
      console.log(file);
      console.log(this.countFiles());
      this.fileAdded.emit(file);
      this.areFilesInList.emit(this.dropzone.files.length > 0);
      // Preview click-handler
      file.previewElement.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dropzone.removeFile(file);
      });

    });
    this.dropzone.on('removedfile', (file) => {
      this.areFilesInList.emit(this.dropzone.files.length > 0);
      if (this.fileLimitReached) {
        if (this.fileLimitExceeded) {
          if (this.countFiles() <= this.maxFiles) {
            this.fileLimitExceeded = false;
          }
        }
        if (this.countFiles() < this.maxFiles) {
          this.fileLimitReached = false;
        }
      }
      this.fileRemoved.emit(file);
    });

    this.dropzone.on('maxfilesreached', () => {
      console.log('file limit reached!!!!');
      this.fileLimitReached = true;
    });
    this.dropzone.on('maxfilesexceeded', () => {
      console.log('file limit exceeded!!!!');
      this.fileLimitExceeded = true;
    });

    this.dropzone.on('processingmultiple', (files) => {
      console.log('processing!!!!!!!');
      this.filesUploading.emit(files);
    });
    this.dropzone.on('sendingmultiple', () => {
      console.log('sending!!!!!!!');
    });
    this.dropzone.on('complete', (file) => {
      console.log('SINGLE COMPLETE');
    });
    this.dropzone.on('completemultiple', (files) => {
      if (!this.fileLimitReached && !this.hasError) {
        console.log('completed!!!!!!!');
        console.log(files);
        // TODO: make file removing intelligent with single removing from outside
        // this.dropzone.removeAllFiles();
        // console.log('cleared list!!!!!!!');
      }
    });

    this.dropzone.on('error', (file) => {
      console.log('ERROR:');
      console.log(file);
      console.log(this.countFiles());
      if (!file.processing) {
        // auto remove not accepted files
        this.dropzone.removeFile(file);
        this.hasError = true;
      }
      console.log(this.dropzone.files);
    });
  }

  ngOnDestroy() {
    this.dropzone.disable();
  }

  upload() {
    this.dropzone.processQueue();
  }
}
