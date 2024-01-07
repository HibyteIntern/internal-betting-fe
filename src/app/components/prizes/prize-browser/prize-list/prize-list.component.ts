import {Component, Input} from '@angular/core';
import {PrizeDraw} from "../../../../entity/PrizeDraw";

@Component({
  selector: 'app-prize-list',
  templateUrl: './prize-list.component.html',
  styleUrls: ['./prize-list.component.scss']
})
export class PrizeListComponent {
  @Input() prizeDrawList: PrizeDraw[] = []
}
