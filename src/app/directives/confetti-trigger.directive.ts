import { Directive, HostListener } from '@angular/core';
import {ConfettiService} from "../service/conffeti.service";

@Directive({
  selector: '[appConfettiTrigger]'
})
export class ConfettiTriggerDirective {
  constructor(private confettiService: ConfettiService) {}

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    this.confettiService.runConfettiFromElement(target);
  }
}


