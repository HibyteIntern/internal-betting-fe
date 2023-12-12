import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  isDarkMode = false;

  constructor() {
    let theme: string | null = localStorage.getItem('theme')
    if(theme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.toggle("dark");
    }
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if(this.isDarkMode) localStorage.setItem('theme', 'dark');
    else localStorage.setItem('theme', 'light');

    document.body.classList.toggle("dark");
  }
  
  getCurrentTheme() {
    if(this.isDarkMode) return "Dark"
    return "Light"
  }
}
