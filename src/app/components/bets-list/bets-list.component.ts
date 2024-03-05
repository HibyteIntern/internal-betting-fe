import { Component, OnInit } from '@angular/core';
import { CompleteBet } from '../../entity/complete-bet.model';
import { BetService } from '../../service/bet.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss'],
})
export class BetsListComponent implements OnInit {
  bets: CompleteBet[] = [];
  constructor(private betService: BetService) {}
  ngOnInit(): void {
    this.loadUserBets();
  }
  loadUserBets(): void {
    this.betService.getBets().subscribe(
      (bets) => {
        this.bets = bets;
        console.log(bets);
      },
      (error) => {
        console.error('Error fetching bets:', error);
      },
    );
  }
}
