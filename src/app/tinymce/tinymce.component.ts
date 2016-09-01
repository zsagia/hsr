import { Component, ElementRef, EventEmitter, Inject, Output, Input, AfterViewInit, OnDestroy } from '@angular/core';

declare var tinymce: any;

@Component({
  selector: 'hsr-tinymce',
  template: `
<div id="tinyFormGroup" class="form-group">
    <div class="hidden">
        <textarea id="baseTextArea">{{htmlContent}}</textarea>
    </div>
</div>
`
})
export class TinyMceComponent implements AfterViewInit, OnDestroy {

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
        height: 500,
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        elements: this.elementId,
        setup: editor => {
          editor.on('keyup change', event => {
            this.contentChanged.emit(editor.getContent());
          });
        }
      }
    );
  }

  ngOnDestroy() {
    // destroy cloned elements
    tinymce.get(this.elementId).remove();
  }
}
