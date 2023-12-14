import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

    userProfiles: UserProfile[] = [];

    constructor(private userProfileSerice: UserProfileService){}

    ngOnInit(): void {
      this.userProfileSerice.getAll().subscribe((respData) => {
        this.userProfiles = respData;
        console.log(this.userProfiles);
      });
 
      
    }

}
