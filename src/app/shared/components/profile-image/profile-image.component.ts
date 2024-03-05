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
import { UserProfileService } from '../../../service/user-profile.service';
import { GroupService } from '../../../service/group.service';
import { FullUserProfile } from '../../../entity/full-user-profile';
import { AvatarService } from '../../../service/avatar.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
})
export class ProfileImageComponent implements OnInit, OnChanges {
  @Input() file: File | null = null;
  @Output() imageChanged: EventEmitter<File> = new EventEmitter<File>();
  @Input() groupOrUser?: string;
  @Input() viewOrEdit?: string;
  @Input() id?: number | null;
  @Input() bigPhoto?: boolean;
  @Input() navbarUser: FullUserProfile | null = null;
  @Input() keycloakId: string | undefined;

  @ViewChild('profileCircle') profileCircle?: ElementRef;

  avatarImage: File | null = null;

  ngOnInit(): void {
    this.displayImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['navbarUser'] && this.navbarUser) {
      this.displayImage();
    }
  }

  constructor(
    private userService: UserProfileService,
    private groupService: GroupService,
    private avatarService: AvatarService,
  ) {}

  getImageType() {
    return this.viewOrEdit === 'view'
      ? 'profile-circle-view'
      : 'profile-circle-edit';
  }

  onFileSelect(event: Event): void {
    if (this.viewOrEdit !== 'edit') {
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

  displayImage() {
    let photoService;
    if (this.groupOrUser === 'group' && this.id) {
      photoService = this.groupService.getPhoto(this.id);
    } else if (this.groupOrUser === 'user') {
      photoService = this.userService.getPhoto();
    }

    if (photoService) {
      photoService.subscribe((blob) => {
        this.displayProfileImage(
          blob,
          this.profileCircle?.nativeElement as HTMLElement,
        );
      });
    }
  }

  displayProfileImage(blobOrFile: Blob | File, circle: HTMLElement) {
    const url = URL.createObjectURL(blobOrFile);
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      if (this.viewOrEdit === 'view') {
        circle.classList.add('profile-circle-view');
        if (this.bigPhoto) {
          circle.classList.add('big');
        }
      } else {
        circle.classList.add('profile-circle-edit');
      }
    }
  }

  async onAddAvatar() {
    let avatarId: string | number | undefined = undefined;
    if (this.groupOrUser === 'group' && this.id) {
      avatarId = this.id.toString();
    } else if (this.groupOrUser === 'user') {
      avatarId = this.keycloakId;
    }

    if (avatarId) {
      const avatarSvg = this.avatarService.generateAvatar(avatarId);
      this.avatarImage = await this.avatarService.convertSvgToImageFile(
        avatarSvg,
        avatarId,
      );
      this.imageChanged.emit(this.avatarImage);
      this.displayProfileImage(
        this.avatarImage,
        this.profileCircle?.nativeElement as HTMLElement,
      );
    }
  }
}
