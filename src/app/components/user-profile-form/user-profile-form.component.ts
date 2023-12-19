import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/entity/UserProfile';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit{

  @Input() userProfile?: UserProfile | null;

  constructor(private formBuilder: FormBuilder) {}

  protected userProfileForm = this.formBuilder.group({
    username: ['', Validators.required],
    description: '',
  })

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.userProfile)
    console.log(this.userProfileForm.value);
  }
}
