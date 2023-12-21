import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-account-page-user-profile',
  templateUrl: './account-page-user-profile.component.html',
  styleUrls: ['./account-page-user-profile.component.scss']
})
export class AccountPageUserProfileComponent{
  
  @Input() username?: string ;
  @Output() edit = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<boolean>();

    onHandleEdit(){
      this.edit.emit();
    }

    onLogout(){
      this.logout.emit();
    }

}
