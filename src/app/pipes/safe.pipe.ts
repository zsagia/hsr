import { Pipe } from '@angular/core/src/metadata/directives';
import { PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(htmlString) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
}
