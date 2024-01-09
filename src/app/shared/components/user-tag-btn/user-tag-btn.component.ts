import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-tag-btn',
  templateUrl: './user-tag-btn.component.html',
  styleUrls: ['./user-tag-btn.component.scss'],
})
export class UserTagBtnComponent {
  @Input() id = 0;
  @Input() functionality = 'remove';
  @Output() clickEvent = new EventEmitter<number>();

  onClick(): void {
    this.clickEvent.emit(this.id);
  }
}
