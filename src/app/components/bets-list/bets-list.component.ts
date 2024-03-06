import { Component, OnInit } from '@angular/core';
import { Bet } from '../../entity/Bet';
import { BetService } from '../../service/bet.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss'],
})
export class BetsListComponent implements OnInit {
  bets: Bet[] = [];
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
