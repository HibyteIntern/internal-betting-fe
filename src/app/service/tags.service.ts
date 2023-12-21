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

    public getAvailableTags(): string[] {
        return this.availableTags;
    }
}
