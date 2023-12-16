import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[clickStopPropagation]',
})
export class StopMousePropagationDirective {
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
