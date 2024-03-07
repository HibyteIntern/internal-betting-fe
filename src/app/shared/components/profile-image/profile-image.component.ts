import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {UserProfileService} from '../../../service/user-profile.service';
import {GroupService} from '../../../service/group.service';
import {FullUserProfile} from '../../../entity/full-user-profile';
import {AvatarService} from '../../../service/avatar.service';
import {ImageService} from "../../../service/image.service";

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
})
export class ProfileImageComponent implements OnChanges {
  @Input() file: File | null = null;
  @Output() imageChanged: EventEmitter<File> = new EventEmitter<File>();
  @Input() isEditable = false;
  @Input() isLargeImage?: boolean;

  @Input() image?: Blob;
  @Input() avatarId?: string;

  @ViewChild('profileCircle') profileCircle?: ElementRef;

  avatarImage: File | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['image'] && this.image) {
      this.displayProfileImage(this.image, this.profileCircle?.nativeElement as HTMLElement);
    }
  }

  constructor(
    private imageService: ImageService
  ) {}

  getImageType() {
    return this.isEditable
      ? 'profile-circle-edit'
      : 'profile-circle-view';
  }

  onFileSelect(event: Event): void {
    if (!this.isEditable) {
      return;
    } else {
      const element = event.target as HTMLInputElement;
      const fileList: FileList | null = element.files;
      if (fileList && fileList.length > 0) {
        this.file = fileList[0];
        this.readAndDisplayImage(this.file);
        this.imageChanged.emit(this.file);
      }
    }
  }

  readAndDisplayImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const circle = this.profileCircle?.nativeElement as HTMLElement;
      if (circle && e.target && e.target.result) {
        circle.style.backgroundImage = `url(${e.target.result})`;
      }
    };
    reader.readAsDataURL(file);
  }

  displayProfileImage(blobOrFile: Blob | File, circle: HTMLElement) {
    const url = URL.createObjectURL(blobOrFile);
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      if (!this.isEditable) {
        circle.classList.add('profile-circle-view');
        if (this.isLargeImage) {
          circle.classList.add('big');
        }
      } else {
        circle.classList.add('profile-circle-edit');
      }
    }
  }

  async onAddAvatar() {
    if (this.avatarId)
      this.imageService.onAddAvatar(this.avatarId).then((avatarImage) => {
        if (avatarImage) {
          this.avatarImage = avatarImage;
          this.imageChanged.emit(this.avatarImage);
          this.displayProfileImage(
            this.avatarImage,
            this.profileCircle?.nativeElement as HTMLElement,
          );
        }
      });
  }
}
