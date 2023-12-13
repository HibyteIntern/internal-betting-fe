import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent {

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  protected userProfileForm = this.formBuilder.group({
    username: '',
    description: ''
  })

  onSubmit(){
    console.log(this.userProfileForm.value);
  }
}
