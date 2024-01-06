import { Component } from '@angular/core';
import {PrizeExtraction} from "../../../entity/PrizeExtraction";

@Component({
  selector: 'app-prize-browser',
  templateUrl: './prize-browser.component.html',
  styleUrls: ['./prize-browser.component.scss']
})
export class PrizeBrowserComponent {
  isActiveExtractionsSelected = true;
  prizeExtractionList: PrizeExtraction[] = [{title: "This is a very title"}, {title: "Interesting title"}, {title: "Extra vacation days"}]
}
