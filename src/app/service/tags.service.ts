import { Injectable } from "@angular/core";
import { EventService } from "./event.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TagsService {
    private availableTags: string[] = [
      // '#fun',
      // '#football',
      // '#basketball',
    ];

    private selectedTags: string[] = [
      'Events',
      'Competitions'
    ];

    constructor(private eventService: EventService) {
      this.eventService.getAllTags().subscribe(tags => {
        this.availableTags = [...tags];
      });
    }

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
        if(this.isEventsSelected() && this.isCompetitionsSelected()) {
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

    public isEventsSelected() {
      return this.selectedTags[0] === 'Events' || this.selectedTags[1] === 'Events';
    }

    public isCompetitionsSelected() {
      return this.selectedTags[0] === 'Competitions' || this.selectedTags[1] === 'Competitions';
    }
}
