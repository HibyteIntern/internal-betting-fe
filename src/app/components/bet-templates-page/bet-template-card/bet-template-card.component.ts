import {Component, Input} from '@angular/core';
import {BetTemplate} from "../../../entity/BetTemplate";
import {BetTemplateType} from "../../../entity/BetTemplateType";

@Component({
  selector: 'app-bet-template-card',
  templateUrl: './bet-template-card.component.html',
  styleUrls: ['./bet-template-card.component.scss']
})
export class BetTemplateCardComponent {
  @Input() betTemplate?: BetTemplate;
  selectedOption?: string;
  protected readonly BetTemplateType = BetTemplateType;
}
