import { Output, Directive, HostListener, Input } from '@angular/core/src/metadata/directives';
import { EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[hsrFileInput]'
})
export class FileInputDirective {
  private element: ElementRef;

  @Output() onSelected: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() hasReset: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() set reset(doReset: boolean) {
    if (doReset) {
      this.element.nativeElement.value = null;
      this.hasReset.emit(false);
    }
  }

  constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('change')
  onChange(): any {
    let files = this.element.nativeElement.files;
    console.log(files);
    this.onSelected.emit(files);
  }
}
