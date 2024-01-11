import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-prize-category-list',
  templateUrl: './prize-category-list.component.html',
  styleUrls: ['./prize-category-list.component.scss']
})
export class PrizeCategoryListComponent {
  @Output() categorySelected: EventEmitter<string> = new EventEmitter();
  selectedCategory: string = 'ROULETTE';

  categories = [
    {
      categoryName:"Most Points",
      description:"The user with the most coins gained in a certain interval wins.",
      imageName:"top-score-icon.svg",
      value:"MOST_POINTS"
    },
    {
      categoryName:"Roulette",
      description:"Winning chance proportional to how many coins a user entered the draw with.",
      imageName:"roulette-icon.svg",
      value:"ROULETTE"
    },
  ]
}
