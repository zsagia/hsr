import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[hsrSticky]'
})
export class StickyDirective {

  constructor(element: ElementRef) {
    window.addEventListener('scroll', (e) => {
      if (window.pageYOffset > 1) {
        element.nativeElement.classList.add('sticky');
      } else {
        element.nativeElement.classList.remove('sticky');
      }
    });
  }
}
