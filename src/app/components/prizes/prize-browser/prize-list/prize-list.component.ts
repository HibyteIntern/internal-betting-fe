import {Component, Input} from '@angular/core';
import {PrizeExtraction} from "../../../../entity/PrizeExtraction";

@Component({
  selector: 'app-prize-list',
  templateUrl: './prize-list.component.html',
  styleUrls: ['./prize-list.component.scss']
})
export class PrizeListComponent {
  @Input() prizeExtractionList: PrizeExtraction[] = []
}
