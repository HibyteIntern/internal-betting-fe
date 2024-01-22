import { Injectable } from '@angular/core';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  loadedAvatar = false;

  constructor() { }

  generateAvatar(seed?: string): string {
    this.loadedAvatar = true;
    return createAvatar(style, {
      seed: seed,
    });
  }

  convertSvgToImageFile(svg: string, userId?: string): Promise<File> {
    return new Promise((resolve, reject) => {
      const svgElement = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgElement);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get 2D context from canvas'));
          return;
        }
      
        ctx.drawImage(img, 0, 0);
      
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], `avatar-${userId}.png`, { type: 'image/png' });
            resolve(file);
          } else {
            reject(new Error('Canvas toBlob returned null'));
          }
        }, 'image/png');
      };

      img.onerror = () => {
        reject(new Error('Failed to load SVG as image'));
      };

      img.src = url;
    });
  }
}
