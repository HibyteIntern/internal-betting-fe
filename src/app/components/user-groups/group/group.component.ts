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

  constructor(private groupService: GroupService) {}

  ngAfterViewInit(): void {
    if (
      this.group?.userGroupId &&
      this.group?.profilePicture &&
      this.profileCircle
    ) {
      this.groupService.getPhoto(this.group.userGroupId).subscribe((blob) => {
        this.displayGroupImage(blob);
      });
    }
  }

  private displayGroupImage(blob: Blob) {
    const url = URL.createObjectURL(blob);
    if (this.profileCircle) {
      const circle = this.profileCircle.nativeElement as HTMLElement;
      circle.style.backgroundImage = `url(${url})`;
      circle.classList.add('profile-image');
    }
  }
}
