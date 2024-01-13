import {Component, Input} from '@angular/core';
import {PrizeDrawService} from "../../../../service/prize-draw.service";

@Component({
  selector: 'app-prize-draw-expiry',
  templateUrl: './prize-draw-expiry.component.html',
  styleUrls: ['./prize-draw-expiry.component.scss']
})
export class PrizeDrawExpiryComponent {
  @Input() expiryDate: Date | undefined
  constructor(private prizeDrawService: PrizeDrawService) {}

  getTimeRemainingString() {
    return this.prizeDrawService.getTimeRemaining(this.expiryDate);
  }
}
