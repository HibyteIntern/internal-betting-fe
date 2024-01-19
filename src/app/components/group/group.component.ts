import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullUserGroupModel} from "../../entity/full-user-group.model";
import {GroupService} from "../../service/group.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit{
  @Input() group?: FullUserGroupModel;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>()

  constructor(private groupService: GroupService) {}
  ngOnInit(): void {
    if(this.group?.userGroupId && this.group?.profilePicture){
      this.groupService.getPhoto(this.group.userGroupId).subscribe(blob => {
        console.log()
        this.displayGroupImage(blob);
      });
    }
  }

  private displayGroupImage(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const circle = document.querySelector('.profile-circle') as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      circle.style.backgroundSize = 'cover';
      circle.style.backgroundPosition = 'center';
    }
  }
}
