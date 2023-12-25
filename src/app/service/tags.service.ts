import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class TagsService {
    private availableTags: string[] = [
        'Football',
        'Basketball',
        'Tennis',
        'Volleyball',
        'Hockey',
        'Baseball',
        'Golf',
        'Rugby',
        'Cricket',
        'Badminton',
        'Table tennis',
        'Handball',
        'Water polo',
    ];

    private selectedTags: string[] = [
      'Events',
      'Competitions'
    ];

    public getAvailableTags(): string[] {
        return this.availableTags;
    }

    public getSelectedTags(): string[] {
        return this.selectedTags;
    }

    public addTag(tagIndex: number): void {
      if(this.availableTags[tagIndex] === 'Events' || this.availableTags[tagIndex] === 'Competitions') {
        this.selectedTags = [this.availableTags[tagIndex], ...this.selectedTags];

        this.availableTags = this.availableTags.filter((_, i) => i !== tagIndex);
      } else {
        this.selectedTags = [...this.selectedTags, this.availableTags[tagIndex]];

        this.availableTags = this.availableTags.filter((_, i) => i !== tagIndex);
      }
    }

    public removeTag(tagIndex: number): void {
      if(this.selectedTags[tagIndex] === 'Events' || this.selectedTags[tagIndex] === 'Competitions') {
        if(this.selectedTags[1] === 'Events' || this.selectedTags[1] === 'Competitions') {
          this.availableTags = [this.selectedTags[tagIndex], ...this.availableTags, ];

          this.selectedTags = this.selectedTags.filter((_, i) => i !== tagIndex);
        } else {
          return;
        }
      } else {
        this.availableTags = [...this.availableTags, this.selectedTags[tagIndex]];

        this.selectedTags = this.selectedTags.filter((_, i) => i !== tagIndex);
      }
    }
}
