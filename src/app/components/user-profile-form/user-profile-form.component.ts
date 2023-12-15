import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/entity/UserProfile';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnChanges{

  @Input() userProfile?: UserProfile | null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.userProfile?.username);
  }

  protected userProfileForm = this.formBuilder.group({
    username: ['', Validators.required],
    description: '',
  })

  onSubmit(){
    console.log(this.userProfileForm.value);
  }
}
