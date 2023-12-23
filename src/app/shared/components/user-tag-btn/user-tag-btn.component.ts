import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-tag-btn',
  templateUrl: './user-tag-btn.component.html',
  styleUrls: ['./user-tag-btn.component.scss'],
})
export class UserTagBtnComponent {
  @Input() functionality = 'remove';
  @Output() clickEvent = new EventEmitter<void>();

  onClick(): void {
    this.clickEvent.emit();
  }
}
