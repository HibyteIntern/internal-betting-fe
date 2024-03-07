import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {AvatarService} from '../../../service/avatar.service';

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
    private avatarService: AvatarService,
  ) {
  }

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
    if (this.avatarId) {
      const avatarSvg = this.avatarService.generateAvatar(this.avatarId);
      this.avatarImage = await this.avatarService.convertSvgToImageFile(
        avatarSvg,
        this.avatarId,
      );
      this.imageChanged.emit(this.avatarImage);
      this.displayProfileImage(
        this.avatarImage,
        this.profileCircle?.nativeElement as HTMLElement,
      );
    }
  }

}
