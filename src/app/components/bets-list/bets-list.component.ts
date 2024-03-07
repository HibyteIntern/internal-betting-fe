import { Component, OnInit } from '@angular/core';
import { BetService } from '../../service/bet.service';
import { CompleteBet } from "../../entity/complete-bet.model";
import {EventService} from "../../service/event.service";
import {Event} from "../../entity/event.model";

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss'],
})
export class BetsListComponent implements OnInit {
  bets: CompleteBet[] = [];
  events: { [key: number]: string } = {}
  constructor(private betService: BetService,
              private eventService: EventService) {}
  ngOnInit(): void {
    this.loadUserBets();
  }

  loadUserBets(): void {
    this.betService.getBets().subscribe(
      (bets) => {
        this.bets = bets;
        bets.forEach(bet => {
          this.loadEventName(bet.eventId);
        });
      },
      (error) => {
        console.error('Error fetching bets:', error);
      },
    );
  }

  loadEventName(eventId: number): void {
    this.eventService.getEventById(eventId.toString()).subscribe(
      (event) => {
        this.events[eventId] = event.name;
      },
      (error) => {
        console.error(`Error fetching event details for event ID ${eventId}:`, error);
      }
    );
  }
}
