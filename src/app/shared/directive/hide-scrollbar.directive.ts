import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHideScrollbar]',
})
export class HideScrollbarDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'scrollbar-width', 'none'); // For Firefox
    this.renderer.setStyle(this.el.nativeElement, '-ms-overflow-style', 'none'); // For IE and Edge
    // For Webkit (Chrome, Safari)
    const style = document.createElement('style');
    style.innerHTML = `::-webkit-scrollbar { display: none; }`;
    this.el.nativeElement.appendChild(style);
  }
}
