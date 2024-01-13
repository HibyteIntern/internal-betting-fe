import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-prize-draw-prize',
  templateUrl: './prize-draw-prize.component.html',
  styleUrls: ['./prize-draw-prize.component.scss']
})
export class PrizeDrawPrizeComponent {
  @Input() prizeDescription: string | undefined
}
