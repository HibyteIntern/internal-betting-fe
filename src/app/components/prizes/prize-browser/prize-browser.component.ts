import { Component } from '@angular/core';
import {PrizeDraw} from "../../../entity/PrizeDraw";
import {PrizeDrawService} from "../../../service/prize-draw.service";
import EntityState from "../../../entity/EntityState";

@Component({
  selector: 'app-prize-browser',
  templateUrl: './prize-browser.component.html',
  styleUrls: ['./prize-browser.component.scss']
})
export class PrizeBrowserComponent {
  isActiveExtractionsSelected = true;
  prizeDraws: EntityState<PrizeDraw[]>;

  constructor(private prizeDrawService: PrizeDrawService) {
    this.prizeDraws = prizeDrawService.prizeDrawSubject.value
    this.prizeDrawService.getData().subscribe((data) => {
      this.prizeDraws = data;
    })
  }
}
