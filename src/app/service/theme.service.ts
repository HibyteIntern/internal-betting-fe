import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  toggleTheme() {
    document.body.classList.toggle('light');
  }
}
