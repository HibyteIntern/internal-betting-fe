import { Component } from '@angular/core';
import { Leaderboard } from 'src/app/entity/Leaderboard';
import { LeaderboardRequest } from 'src/app/entity/leaderboard-request';
import { LeaderboardService } from 'src/app/service/leaderboard.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

interface UserProfileDisplayData {
  index: number;
  username: string | undefined; // Assuming username can be undefined
  coins: number | undefined;    // Assuming coins can be undefined
}

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent {
  title = 'Leaderboards';
  selected = '';
  displayedColumns: string[] = ['index', 'username', 'coins'];
  showTable = false;
  userIds: number[] = []; 
  dataSource: UserProfileDisplayData[] = [];

  leaderboardRequest: LeaderboardRequest = {
    leaderboardId: 1,
    metrics: ["numberOfBets", "mostWins", "fewestLosses", 
    "highestEarner", "highestLoser", "largestSingleBet" 
    ,"largestSingleWin", "largestSingleLoss", "win/lossRatio", 
    "highestAverageBet", "highestAverageWin", "longestWinningStreakStrategy"],
    sortedBy: this.selected
  };

  leaderboard: Leaderboard | undefined;

  constructor(private leaderboardService: LeaderboardService,
    private userProfileService: UserProfileService) {}

  getLeaderboard(): void {
    this.leaderboardService.getLeaderboard(this.leaderboardRequest).subscribe({
      next: (data) => {
        this.leaderboard = data;
        this.userIds = data.entries.map(entry => entry.userId);
        this.fetchUserProfiles(this.userIds);
        this.showTable = true;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  fetchUserProfiles(userIds: number[]): void {
    const userProfilesRequests = userIds.map(userId => this.userProfileService.getById(userId).toPromise());
    Promise.all(userProfilesRequests).then(userProfiles => {
      this.dataSource = userProfiles.map((profile, index) => ({
        index: index + 1,
        username: profile?.username,
        coins: profile?.coins 
      }));
    }).catch(error => {
      console.error('Error fetching user profiles:', error);
    });
  }

  onSortChange(newSort: string): void {
    if(this.selected != 'none'){
      this.selected = newSort;
      this.leaderboardRequest.sortedBy = this.selected;
      this.getLeaderboard();
    }
    else{
      this.showTable=false;
    }
  }

}
