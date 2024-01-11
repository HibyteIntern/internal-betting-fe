import { Component } from '@angular/core';
import { PrizeDraw } from '../../../entity/PrizeDraw';
import { PrizeDrawService } from '../../../service/prize-draw.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-prize-browser',
  templateUrl: './prize-browser.component.html',
  styleUrls: ['./prize-browser.component.scss'],
})
export class PrizeBrowserComponent {
  isActiveExtractionsSelected = true;
  loading = true;
  prizeDraws: PrizeDraw[];

  constructor(private prizeDrawService: PrizeDrawService) {
    this.prizeDraws = prizeDrawService.prizeDrawSubject.value;
    this.prizeDrawService.fetchActive();
    this.prizeDrawService
      .getData()
      .pipe(skip(1))
      .subscribe((data) => {
        this.prizeDraws = data;
        this.loading = false;
      });
  }

  handleActiveDrawsFetch() {
    this.isActiveExtractionsSelected = true;
    this.loading = true;
    this.prizeDrawService.fetchActive();
  }

  handlePastDrawsFetch() {
    this.isActiveExtractionsSelected = false;
    this.loading = true;
    this.prizeDrawService.fetchPast();
  }
}
