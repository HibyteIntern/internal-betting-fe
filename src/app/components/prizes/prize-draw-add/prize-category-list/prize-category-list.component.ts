import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-prize-category-list',
  templateUrl: './prize-category-list.component.html',
  styleUrls: ['./prize-category-list.component.scss'],
})
export class PrizeCategoryListComponent implements OnInit {
  @Output() categorySelected: EventEmitter<string> = new EventEmitter();
  selectedCategory: string = 'MOST_POINTS';

  ngOnInit() {
    this.categorySelected.emit('MOST_POINTS');
  }

  categories = [
    {
      categoryName: 'Most Points',
      description:
        'The user with the most coins gained in a certain interval wins.',
      imageName: 'top-score-icon.svg',
      value: 'MOST_POINTS',
    },
    {
      categoryName: 'Roulette',
      description:
        'Winning chance proportional to how many coins a user entered the draw with.',
      imageName: 'roulette-icon.svg',
      value: 'ROULETTE',
    },
  ];

  selectCategory(radioButton: MatRadioButton): void {
    this.categorySelected.emit(radioButton.value);
    radioButton.checked = true;
  }
}
