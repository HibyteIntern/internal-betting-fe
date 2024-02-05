import { Component, Input, OnInit } from '@angular/core';
import { CompleteBetType } from '../../../entity/complete-bet-type.model';
import { Bet } from "../../../entity/Bet";
import { UserProfileService } from "../../../service/user-profile.service";
import { UserProfile } from "../../../entity/UserProfile";
import { EventService } from '../../../service/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-bet-to-event',
  templateUrl: './add-bet-to-event.component.html',
  styleUrls: ['./add-bet-to-event.component.scss'],
})
export class AddBetToEventComponent implements OnInit {
  @Input() betType: CompleteBetType | undefined;

  selectedOption = '';
  selectedBooleanOption = 'true';
  answer = '';
  betAmount = 0;

  userProfile: UserProfile | null = null;
  eventId: number | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userProfileService.userProfile$.subscribe(
      (userProfile) => {
        this.userProfile = userProfile;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );

    this.route.params.subscribe(params => {
      this.eventId = +params['eventId']; // '+' is used to convert the parameter to a number
    });
  }

  placeBet() {
    if (!this.eventId || isNaN(this.eventId)) {
      console.error('Invalid eventId');
      return;
    }

    const bet: Bet = {
      user: this.userProfile,
      amount: this.betAmount,
      odds: this.betType?.odds || 0,
      value: this.selectedOption || this.selectedBooleanOption || this.answer,
    };

    this.eventService.addBetToEvent(this.eventId, bet).subscribe(
      () => {
        console.log('Bet placed successfully.');
        this.resetForm();
      },
      (error) => {
        console.error('Error placing bet:', error);
      }
    );
  }

  resetForm() {
    this.selectedOption = '';
    this.selectedBooleanOption = 'true';
    this.answer = '';
    this.betAmount = 0;
  }
}
