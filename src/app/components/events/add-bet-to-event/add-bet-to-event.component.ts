import { Component, Input, OnInit } from '@angular/core';
import { CompleteBetType } from '../../../entity/complete-bet-type.model';
import { Bet } from '../../../entity/Bet';
import { UserProfileService } from '../../../service/user-profile.service';
import { UserProfile } from '../../../entity/UserProfile';
import { EventService } from '../../../service/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-bet-to-event',
  templateUrl: './add-bet-to-event.component.html',
  styleUrls: ['./add-bet-to-event.component.scss'],
})
export class AddBetToEventComponent implements OnInit {
  @Input() betType: CompleteBetType | undefined;

  bet: Bet = { user: null, amount: 0, value: '', betType: undefined, odds: 0 };
  userProfile: UserProfile | null = null;
  eventId: number | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private eventService: EventService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.userProfileService.userProfile$.subscribe(
      (userProfile) => {
        this.userProfile = userProfile;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      },
    );

    this.route.params.subscribe((params) => {
      this.eventId = +params['eventId'];
    });
  }

  placeBet() {
    if (!this.eventId || isNaN(this.eventId)) {
      console.error('Invalid eventId');
      return;
    }

    let odds: number | number[] = 0;
    if (this.betType?.type === 'MULTIPLE_CHOICE') {
      const selectedChoiceIndex = this.betType.multipleChoiceOptions!.indexOf(
        this.bet.value,
      );
      odds = this.betType?.odds![selectedChoiceIndex];
    } else {
      odds = 0;
    }

    this.bet.user = this.userProfile;
    this.bet.betType = this.betType;
    this.bet.odds = odds;

    this.eventService.addBetToEvent(this.eventId, this.bet).subscribe(
      () => {
        this.resetForm();
      },
      (error) => {
        console.error('Error placing bet:', error);
      },
    );
  }

  resetForm() {
    this.bet = {
      user: null,
      amount: 0,
      value: '',
      betType: undefined,
      odds: 0,
    };
  }
}
