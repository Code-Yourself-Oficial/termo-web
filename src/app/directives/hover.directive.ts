import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private elemet: ElementRef) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.elemet.nativeElement.style.border = '2px solid white';
  }

  @HostListener('mouseleave')
  onMouseleave() {
    this.elemet.nativeElement.style.border = 'none';
  }
}
