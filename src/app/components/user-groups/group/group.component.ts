import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FullUserGroupModel } from '../../../entity/full-user-group.model';
import { GroupService } from '../../../service/group.service';
import {UserProfileService} from "../../../service/user-profile.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements AfterViewInit {
  @Input() group?: FullUserGroupModel;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  @ViewChild('profileCircle') profileCircle?: ElementRef;

  constructor(private groupService: GroupService, private userService: UserProfileService ) {}

  ngAfterViewInit(): void {
    if (
      this.group?.userGroupId &&
      this.group?.profilePicture &&
      this.profileCircle
    ) {
      this.groupService.getPhoto(this.group.userGroupId).subscribe((blob) => {
        this.userService.displayProfileImage(blob, this.profileCircle?.nativeElement as HTMLElement);
      });
    }
  }
}
