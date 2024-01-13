import { Component, Input } from '@angular/core';
import { PrizeDraw } from '../../../../entity/prize-draw.model';

@Component({
  selector: 'app-prize-list',
  templateUrl: './prize-list.component.html',
  styleUrls: ['./prize-list.component.scss'],
})
export class PrizeListComponent {
  @Input() prizeDrawList: PrizeDraw[] = [];
}
