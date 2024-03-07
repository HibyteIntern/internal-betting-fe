import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserProfileService } from '../../service/user-profile.service';

@Component({
  selector: 'app-account-page-user-profile',
  templateUrl: './account-page-user-profile.component.html',
  styleUrls: ['./account-page-user-profile.component.scss'],
})
export class AccountPageUserProfileComponent implements OnInit {
  @Input() username?: string;
  @Input() description?: string;
  @Input() profilePicture?: number;
  @Output() edit = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();

  blob: Blob | undefined;

  constructor(private userService: UserProfileService) {}

  ngOnInit(): void {
    this.userService.getPhoto().subscribe((blob) => {
      this.blob = blob;
    });
  }
}
