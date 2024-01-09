import { Component } from '@angular/core';
import {EventRequest} from "../../../entity/EventRequest";
import {Status} from "../../../entity/Status";
import {CompleteBetType} from "../../../entity/CompleteBetType";

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent {
// Creating a variable of type EventRequest
   eventRequestData = {
    name: "Event Name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    creator: "Creator Name",
    completeBetTypeDtoList: [    {
      id: 1,
      name: 'Team A vs Team B',
      type: 'Multiple choice',
      multipleChoiceOptions: ['Team A Wins', 'Team B Wins', 'Draw'],
      odds: [2.5, 3.0, 1.8],
    },
      {
        id: 2,
        name: 'Player of the Match',
        type: 'Multiple choice',
        multipleChoiceOptions: ['Player 1', 'Player 2', 'Player 3'],
        odds: [2.0, 2.5, 3.2],
      },
      {
        id: 3,
        name: 'Total Goals',
        type: 'numeric',
        odds: [1.5, 2.0, 3.0],
      },],
    tags: ["#curvefever", "#birou1", "#test"],
    userGroups: ["Group 1", "Group 2"],
    userProfiles: ["Profile 1", "Profile 2"],
    startsAt: new Date(),
    endsAt: new Date(),
    status: Status.DRAFT,
    selectedTemplate: "Template Name",
  };
   eventRequest = new EventRequest(this.eventRequestData);


}
