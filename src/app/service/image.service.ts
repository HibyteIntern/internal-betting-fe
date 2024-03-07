import {Injectable} from '@angular/core';
import {AvatarService} from "./avatar.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private avatarService: AvatarService) {}

  async onAddAvatar(avatarId: string): Promise<File | undefined> {
    const avatarSvg = this.avatarService.generateAvatar(avatarId);
    return await this.avatarService.convertSvgToImageFile(
      avatarSvg,
      avatarId,
    );
  }
}
