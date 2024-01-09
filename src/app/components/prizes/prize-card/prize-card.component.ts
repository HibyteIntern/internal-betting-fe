import {Component, Input} from '@angular/core';
import {PrizeDraw} from "../../../entity/PrizeDraw";
import {DrawType} from "../../../entity/DrawType";

@Component({
  selector: 'app-prize-card',
  templateUrl: './prize-card.component.html',
  styleUrls: ['./prize-card.component.scss']
})
export class PrizeCardComponent {
  @Input() prizeDraw?: PrizeDraw

  getTimeRemaining(targetDate: Date | undefined): string {
    if(!targetDate){
      return '';
    }
    const now = new Date();
    const endsAt = new Date(targetDate);
    const diff = endsAt.getTime()- now.getTime();

    if(diff < 0) return 'Expired'

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);

    if (hours < 1) {
      return `${minutes} minutes`;
    }
    return  `${days} `
      + ((days === 1) ? 'day' : 'days')
      + ` ${hours % 24} `
      + ((hours === 1) ? 'hour' : 'hours');
  }
  getCurrentLeaderUsername(): String {
    if(this.prizeDraw?.currentLeader)
      return this.prizeDraw?.currentLeader.user.username ? this.prizeDraw.currentLeader.user.username : '-'
    return "-"
  }

  getCurrentLeaderPoints(): number {
    if(this.prizeDraw?.currentLeader)
      return this.prizeDraw?.currentLeader.user.coins ? this.prizeDraw.currentLeader.user.coins : 0
    return 0
  }

  protected readonly DrawType = DrawType;
}
