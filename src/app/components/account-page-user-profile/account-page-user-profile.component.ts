import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-account-page-user-profile',
  templateUrl: './account-page-user-profile.component.html',
  styleUrls: ['./account-page-user-profile.component.scss'],
})
export class AccountPageUserProfileComponent{
  @Input() username?: string;
  @Input() description?: string;
  @Input() profilePicture?: number;
  @Output() edit = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();
}
