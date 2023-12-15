import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-tag-btn',
  templateUrl: './user-tag-btn.component.html',
  styleUrls: ['./user-tag-btn.component.scss']
})
export class UserTagBtnComponent {
  @Output() clickEvent = new EventEmitter<void>();

  onClick(): void {
    this.clickEvent.emit();
  }
}