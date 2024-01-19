import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit{
  userId?: any;

  userProfile$?: Observable<UserProfile | null>;

  constructor(private userProfileService: UserProfileService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("id");
    console.log(this.userId);

    if(this.userId){
      return;
    }

    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getById(this.userId);
  }
}
