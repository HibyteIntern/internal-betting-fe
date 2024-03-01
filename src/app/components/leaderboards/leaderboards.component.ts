import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import { Leaderboard } from 'src/app/entity/Leaderboard';
import { LeaderboardRequest } from 'src/app/entity/leaderboard-request';
import { LeaderboardService } from 'src/app/service/leaderboard.service';
import { UserProfileService } from 'src/app/service/user-profile.service';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ConfettiService} from "../../service/conffeti.service";
import {first} from "rxjs";

interface DisplayData {
  index: number;
  username: string | undefined;
  metricValue: number | undefined;
  photoUrl?: SafeUrl;
}

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent{
  title = 'Leaderboards';
  selected = '';
  displayedColumns: string[] = ['index', 'username', 'coins'];
  showTable = false;
  userIds: number[] = [];
  dataSource: DisplayData[] = [];
  filteredDataSource: DisplayData[] = [];

  firstPlaceUsername: string | undefined;
  secondPlaceUsername: string | undefined;
  thirdPlaceUsername: string | undefined;

  leaderboardRequest: LeaderboardRequest = {
    leaderboardId: 1,
    metrics: ["numberOfBets", "mostWins", "fewestLosses",
      "highestEarner", "highestLoser", "largestSingleBet"
      , "largestSingleWin", "largestSingleLoss", "win/lossRatio",
      "highestAverageBet", "highestAverageWin", "longestWinningStreakStrategy"],
    sortedBy: this.selected
  };

  leaderboard: Leaderboard | undefined;
  @ViewChild('firstPlacePodium') firstPlacePodium?: ElementRef<HTMLElement>;

  constructor(private leaderboardService: LeaderboardService,
              private userProfileService: UserProfileService,
              private sanitizer: DomSanitizer,
              private confettiService: ConfettiService,
              private ngZone: NgZone,
              private cdr: ChangeDetectorRef,) {
  }

  private triggerConfetti() {
    this.cdr.detectChanges();
    setTimeout(() => {
      if (this.firstPlacePodium && this.firstPlacePodium.nativeElement) {
        this.confettiService.runConfettiFromElement(this.firstPlacePodium.nativeElement);
      }
    }, 800);
  }

  updatePodiumUsernames() {
    if (this.dataSource.length >= 3) {
      this.firstPlaceUsername = this.dataSource[0].username;
      this.secondPlaceUsername = this.dataSource[1].username;
      this.thirdPlaceUsername = this.dataSource[2].username;
    }
  }

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
        this.ngZone.onStable.asObservable().pipe(first()).subscribe(() => {
          this.triggerConfetti();
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  fetchUserProfiles(userIds: number[]): void {
    const userProfilesRequests = userIds.map(userId => this.userProfileService.getById(userId).toPromise());

    Promise.all(userProfilesRequests).then(userProfiles => {
      const mappedProfiles = userProfiles.map((profile, index) => {
        const leaderboardEntry = this.leaderboard?.entries.find(entry => entry.userId === profile?.userId);
        const metricValue = leaderboardEntry ? leaderboardEntry.metrics[this.selected] : 0;
        let positionClass = '';
        if (index === 0) {
          positionClass = 'first-place';
        }
        if(index === 1){
          positionClass = 'second-place';
        }
        if(index === 2){
          positionClass = 'third-place';
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
      userProfiles.slice(0, 3).forEach((profile, index) => { // Only for the first three
        if(profile?.userId){
          this.userProfileService.getPhotoById(profile?.userId).subscribe(blob => {
            const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            if (this.dataSource[index]) {
              this.dataSource[index].photoUrl = url; // Set the photo URL for the top three
            }
          });
        }
      });
      this.dataSource = mappedProfiles.filter(profile => profile !== undefined) as DisplayData[];
      this.filteredDataSource = [...this.dataSource];
      this.updatePodiumUsernames();
    }).catch(error => {
      console.error('Error fetching user profiles:', error);
    });

  }

  onSortChange(newSort: string): void {
    this.selected = newSort;
    this.leaderboardRequest.sortedBy = this.selected;
    if (this.selected !== 'none') {
      this.getLeaderboard();
      this.showTable = true;
    } else {
      this.showTable = false;
    }
  }


}
