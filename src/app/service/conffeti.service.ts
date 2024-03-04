import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  runConfettiFromElement(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const confettiX = rect.left + rect.width / 2;
    const confettiY = rect.top + rect.height / 2;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: confettiX / window.innerWidth,
        y: confettiY / window.innerHeight,
      },
    });
  }
}
