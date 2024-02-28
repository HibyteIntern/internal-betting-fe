import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserProfileService} from "../../../service/user-profile.service";
import {GroupService} from "../../../service/group.service";

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit{

  @Input() file: File | null = null;
  @Output() imageChanged: EventEmitter<File> = new EventEmitter<File>();
  @Input() groupOrUser?: string;
  @Input() viewOrEdit?: string;
  @Input() id?: number | null;

  @ViewChild('profileCircle') profileCircle?: ElementRef;

  ngOnInit(): void {
    this.displayImage();
  }

  constructor(private userService: UserProfileService, private groupService: GroupService) { }

  getImageType(){
    if(this.viewOrEdit === 'view'){
      return 'profile-circle-view';
    } else {
      return 'profile-circle-edit';
    }
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.file = fileList[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const circle = document.querySelector('.profile-circle-edit') as HTMLElement;
        if (circle && e.target && e.target.result) {
          circle.style.backgroundImage = `url(${e.target.result})`;
        }
      };
      reader.readAsDataURL(this.file);
    }
    if (this.file) {
      this.imageChanged.emit(this.file);
    }
  }

  displayImage(){
    if(this.id && this.groupOrUser === 'group'){
      this.groupService.getPhoto(this.id).subscribe((blob) => {
        this.displayProfileImage(
          blob,
          this.profileCircle?.nativeElement as HTMLElement,
        );
      });
    }
    else if (this.groupOrUser === 'user'){
      this.userService.getPhoto().subscribe((blob) => {
        this.displayProfileImage(
          blob,
          this.profileCircle?.nativeElement as HTMLElement,
        );
      });
    }
  }

  displayProfileImageForSelector(blob: Blob, selector: string) {
    const circle = document.querySelector(selector) as HTMLElement;
    this.displayProfileImage(blob, circle);
  }

  displayProfileImage(blob: Blob, circle: HTMLElement) {
    const url = URL.createObjectURL(blob);
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      if(this.viewOrEdit === 'view') {
        circle.classList.add('.profile-circle-view');
      } else {
        circle.classList.add('.profile-circle-edit');
      }
    }
  }
}
