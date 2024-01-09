import {Component, Input} from '@angular/core';
import {CompleteBetType} from "../../../entity/CompleteBetType";

@Component({
  selector: 'app-add-bet-to-event',
  templateUrl: './add-bet-to-event.component.html',
  styleUrls: ['./add-bet-to-event.component.scss']
})
export class AddBetToEventComponent {
  @Input() betType: CompleteBetType | undefined;

  selectedOption = '';
  selectedBooleanOption = 'true';
  answer = '';
  betAmount = 0;
}
