import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserProfileService } from 'src/app/service/user-profile.service';


@Component({
  selector: 'app-account-page-user-profile',
  templateUrl: './account-page-user-profile.component.html',
  styleUrls: ['./account-page-user-profile.component.scss']
})
export class AccountPageUserProfileComponent implements OnInit{
  @Input() username?: string ;
  @Input() userId?: number;
  @Input() profilePicture?: number;
  @Output() edit = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();

  constructor(private userProfileService: UserProfileService){}

  ngOnInit(): void {
    if(this.userId && this.profilePicture){
      this.userProfileService.getPhoto(this.userId).subscribe(blob => {
        console.log(blob);
        this.displayProfileImage(blob);
      });
    }
  }

  displayProfileImage(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const circle = document.querySelector('.profile-circle') as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      circle.style.backgroundSize = 'cover';
      circle.style.backgroundPosition = 'center';
    }
  }

  onHandleEdit(){
      this.edit.emit();
  }

  onLogout(){
      this.logout.emit();
  }

  onCancel(){
      this.cancel.emit();
  }

}
