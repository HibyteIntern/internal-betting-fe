import { Component, Input } from '@angular/core';
import { PrizeDrawEntry } from '../../../../entity/prize-draw-entry.model';

@Component({
  selector: 'app-prize-draw-leader',
  templateUrl: './prize-draw-leader.component.html',
  styleUrls: ['./prize-draw-leader.component.scss'],
})
export class PrizeDrawLeaderComponent {
  @Input() currentLeader: PrizeDrawEntry | null | undefined;
}
