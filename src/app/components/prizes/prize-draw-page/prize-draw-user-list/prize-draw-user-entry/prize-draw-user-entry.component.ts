import {Component, Input} from '@angular/core';
import {PrizeDrawEntry} from "../../../../../entity/prize-draw-entry.model";

@Component({
  selector: 'app-prize-draw-user-entry',
  templateUrl: './prize-draw-user-entry.component.html',
  styleUrls: ['./prize-draw-user-entry.component.scss']
})
export class PrizeDrawUserEntryComponent {
  @Input() entry: PrizeDrawEntry | undefined
}
