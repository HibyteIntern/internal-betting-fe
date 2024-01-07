import {Component, Input} from '@angular/core';
import {PrizeDraw} from "../../../entity/PrizeDraw";

@Component({
  selector: 'app-prize-card',
  templateUrl: './prize-card.component.html',
  styleUrls: ['./prize-card.component.scss']
})
export class PrizeCardComponent {
  @Input() prizeDraw?: PrizeDraw
}
