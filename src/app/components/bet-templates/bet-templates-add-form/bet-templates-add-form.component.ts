import { Component } from '@angular/core';

@Component({
  selector: 'app-bet-templates-add-form',
  templateUrl: './bet-templates-add-form.component.html',
  styleUrls: ['./bet-templates-add-form.component.scss']
})
export class BetTemplatesAddFormComponent {

  selectedOption = "";
  categoryOptions: string[] = ["Numeric", "String", "Boolean", "Multiple choice"];
  multipleChoiceOptions: string[] = ["Option", "Option"]

  addChoice() {
    this.multipleChoiceOptions.push("Option")
  }

}
