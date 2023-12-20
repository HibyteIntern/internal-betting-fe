import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Status } from 'src/app/entity/Status';

@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.scss']
})
export class CreateCompetitionComponent {
  competitionForm: FormGroup;

  constructor () {
    this.competitionForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      users: new FormControl([]),
      userGroups: new FormControl([]),
      userProfiles: new FormControl([]),
      events: new FormControl([]),
      status: new FormControl(Status.DRAFT),
    });
  }

}
