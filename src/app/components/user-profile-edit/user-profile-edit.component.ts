import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent {
  title = "User Profile" 

  userProfile$?: Observable<UserProfile | null>;
 
  constructor(private userProfileService: UserProfileService){}
  

  ngOnInit(): void {
  
  this.userProfile$ = this.userProfileService.userProfile$;
    
  this.userProfile$.subscribe(data => {
    console.log(data);
  })
}

}


