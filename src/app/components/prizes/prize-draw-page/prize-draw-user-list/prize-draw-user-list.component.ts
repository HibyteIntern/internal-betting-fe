import { Component, Input } from '@angular/core';
import { PrizeDrawEntry } from '../../../../entity/prize-draw-entry.model';

@Component({
  selector: 'app-prize-draw-user-list',
  templateUrl: './prize-draw-user-list.component.html',
  styleUrls: ['./prize-draw-user-list.component.scss'],
})
export class PrizeDrawUserListComponent {
  @Input() entries: PrizeDrawEntry[] | undefined;
}
