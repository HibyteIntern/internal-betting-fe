import { Component, Input } from '@angular/core';
import { PrizeDraw } from '../../../entity/prize-draw.model';
import { DrawType } from '../../../entity/DrawType';
import { Router } from '@angular/router';
import { PrizeDrawService } from '../../../service/prize-draw.service';

@Component({
  selector: 'app-prize-card',
  templateUrl: './prize-card.component.html',
  styleUrls: ['./prize-card.component.scss'],
})
export class PrizeCardComponent {
  @Input() prizeDraw?: PrizeDraw;
  protected readonly DrawType = DrawType;

  constructor(
    private router: Router,
    private prizeDrawService: PrizeDrawService,
  ) {}

  getCurrentLeaderUsername(): String {
    if (this.prizeDraw?.currentLeader)
      return this.prizeDraw?.currentLeader.user.username
        ? this.prizeDraw.currentLeader.user.username
        : '-';
    return '-';
  }

  getCurrentLeaderPoints(): number {
    if (this.prizeDraw?.currentLeader)
      return this.prizeDraw?.currentLeader.amount
        ? this.prizeDraw.currentLeader.amount
        : 0;
    return 0;
  }

  handleNavigateToPrizeDrawPage() {
    this.router.navigate(['/prizes', this.prizeDraw?.id]);
  }

  getTimeRemaining(date: Date | undefined) {
    return this.prizeDrawService.getTimeRemaining(date);
  }
}
