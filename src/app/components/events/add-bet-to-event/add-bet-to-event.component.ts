import { Component, Input } from '@angular/core';
import { BetType } from '../../../entity/bet-type.model';

@Component({
  selector: 'app-add-bet-to-event',
  templateUrl: './add-bet-to-event.component.html',
  styleUrls: ['./add-bet-to-event.component.scss'],
})
export class AddBetToEventComponent {
  @Input() betType: BetType | undefined;

  selectedOption = '';
  selectedBooleanOption = 'true';
  answer = '';
  betAmount = 0;
}
