import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Leaderboard } from 'src/app/entity/Leaderboard';
import { UserProfile } from 'src/app/entity/UserProfile';
import { LeaderboardService } from 'src/app/service/leaderboard.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-leaderboard-form',
  templateUrl: './leaderboard-form.component.html',
  styleUrls: ['./leaderboard-form.component.scss']
})
export class LeaderboardFormComponent {
  title = 'Leaderboards';
  showTable = false;
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  leaderboardForm: FormGroup;
  userOptions: string[] = [];
  selectedUsers: string[] = [];

  constructor(private userProfileService: UserProfileService, 
              private fb: FormBuilder,
              private leaderboardService: LeaderboardService) {
    this.leaderboardForm = this.fb.group({
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      users: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    this.userProfileService.getAll().subscribe((users) => {
      users.forEach((user) => {
        if (user.username && !this.selectedUsers.includes(user.username)) {
          this.userOptions.push(user.username);
        }
      });
    });

    this.resetForm();
  }

  resetForm(): void {
    this.leaderboardForm.reset({
      startDate: null,
      endDate: null,
    });
  }

  get usersFormArray() {
    return this.leaderboardForm.get('users') as FormArray;
  }

  handleUserSelect(users: string[]): void {
    this.selectedUsers = users;
    this.updateUsersFormArray();
  }

  updateUsersFormArray(): void {
    while (this.usersFormArray.length !== 0) {
      this.usersFormArray.removeAt(0);
    }
    
    this.selectedUsers.forEach(user => {
      this.usersFormArray.push(this.fb.control(user));
    });
  }

  onSubmit() {
    if (this.leaderboardForm.valid) {
      const formValue = this.leaderboardForm.value;

      const leaderboard = new Leaderboard();
      leaderboard.startDate = new Date(formValue.startDate); 
      leaderboard.endDate = new Date(formValue.endDate);
      leaderboard.usersInLeaderboard = formValue.users; 
      leaderboard.leaderboardSorted = [];

      console.log(leaderboard);
      
    }
  }


}
