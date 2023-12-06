import {Component, Input} from '@angular/core';
import {BetTemplate} from "../../../entity/BetTemplate";

@Component({
  selector: 'app-bet-template-list',
  templateUrl: './bet-template-list.component.html',
  styleUrls: ['./bet-template-list.component.scss']
})
export class BetTemplateListComponent {
  @Input() betTemplateList!: BetTemplate[] | null;



}
