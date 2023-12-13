import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addUserProfile() {

  }

  removeUserProfile(userProfileId: number) {
  }

  // Implement other methods as needed

  submitForm() {
    // Handle form submission here
  }
}
