import { Component, ElementRef, EventEmitter, Inject, Output, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'hsr-tinymce',
  template: `
<div id="tinyFormGroup" class="form-group">
    <div hidden>
        <textarea id="baseTextArea">{{htmlContent}}</textarea>
    </div>
</div>
`
})
export class TinyMceComponent implements AfterViewInit, OnDestroy {

  // TODO: http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html

  elementId: string;
  @Input() htmlContent: string;
  @Output() contentChanged: EventEmitter<any>;

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
    this.elementId = 'tinymce';
    this.contentChanged = new EventEmitter();
  }

  ngAfterViewInit() {
    // clone base textarea
    let baseTextArea = this.elementRef.nativeElement.querySelector('#baseTextArea');
    let clonedTextArea = baseTextArea.cloneNode(true);
    clonedTextArea.id = this.elementId;

    let formGroup = this.elementRef.nativeElement.querySelector('#tinyFormGroup');
    formGroup.appendChild(clonedTextArea);

    // attach tinyMCE to cloned textarea
    tinymce.init(
      {
        mode: 'exact',
        schema: 'html5',
        height: 100,
        theme: 'modern',
        plugins: 'advlist autolink lists link image imagetools charmap preview code media table contextmenu paste code colorpicker emoticons tabfocus textcolor',
        toolbar: 'code | insertfile undo redo | styleselect | textcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | emoticons media link image',
        elements: this.elementId,
        images_upload_handler: (blobInfo, success, failure) => {
          let blogImageFolderRef = firebase.storage().ref('images/blog');
          let uploadTask = blogImageFolderRef.put(blobInfo.blob());

          uploadTask.on('state_changed', snapshot => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, error => {
            // Handle unsuccessful uploads
            failure('failure!!!!!!!');
            return;
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            let downloadURL = uploadTask.snapshot.downloadURL;

            success(downloadURL);
          });
        }
        /* setup: editor => {
         editor.on('keyup change', event => {
         this.contentChanged.emit(editor.getContent());
         });
         }*/
      }
    );
  }

  getContent(): string {
    return tinymce.get(this.elementId).getContent();
  }

  uploadImages() {
    tinymce.get(this.elementId).uploadImages(success => {
      console.log('images uploaded');
    });
  }

  ngOnDestroy() {
    // destroy cloned elements
    tinymce.get(this.elementId).remove();
  }

}
