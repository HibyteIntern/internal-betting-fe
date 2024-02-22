import { Component } from '@angular/core';
import { Leaderboard } from 'src/app/entity/Leaderboard';
import { LeaderboardRequest } from 'src/app/entity/leaderboard-request';
import { LeaderboardService } from 'src/app/service/leaderboard.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

interface DisplayData {
  index: number;
  username: string | undefined; 
  metricValue: number | undefined;
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
  dataSource: DisplayData[] = [];
  filteredDataSource: DisplayData[] = []; 

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

  applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      const formattedFilterValue = filterValue.trim().toLowerCase();
      if (!formattedFilterValue) {
        this.filteredDataSource = [...this.dataSource]; 
      } else {
        this.filteredDataSource = this.dataSource.filter(item => item.username?.toLowerCase().includes(formattedFilterValue));
      }
    }
    

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
    console.log(userProfilesRequests);
    Promise.all(userProfilesRequests).then(userProfiles => {
      const mappedProfiles = userProfiles.map((profile, index) => {
        const leaderboardEntry = this.leaderboard?.entries.find(entry => entry.userId === profile?.userId);
        const metricValue = leaderboardEntry ? leaderboardEntry.metrics[this.selected] : 0; 
        let positionClass = '';
        if (index === 0) {
          positionClass = 'first-place';
        }
        if (metricValue) {
          return {
            index: index + 1,
            username: profile?.username,
            metricValue: metricValue,
            class: positionClass 
          };
        } else {
          return undefined;
        }
      });
      this.dataSource = mappedProfiles.filter(profile => profile !== undefined) as DisplayData[];
      this.filteredDataSource = [...this.dataSource];
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
