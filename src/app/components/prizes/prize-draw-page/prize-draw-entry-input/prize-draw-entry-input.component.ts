import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-prize-draw-entry-input',
  templateUrl: './prize-draw-entry-input.component.html',
  styleUrls: ['./prize-draw-entry-input.component.scss']
})
export class PrizeDrawEntryInputComponent {
  @Output() amount = new EventEmitter<number>();
  amountNumber = 0;

  handleSubmitNumber() {
    if(this.amountNumber <= 0) return;
    this.amount.emit(this.amountNumber);
  }
}
