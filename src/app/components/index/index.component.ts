import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/entity/Competitions';
import { CompetitionService } from 'src/app/service/competition.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss', '../../shared/styles/tag-container.scss']
})
export class IndexComponent implements OnInit {
  selectedCategory = 'Competitions';
  pageTitle = `Current ${this.selectedCategory}`;

  tagSelectorOpened = false;

  competitions: Competition[] = [];

  constructor(protected competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.competitionService.getCompetitions().subscribe(competitions => this.competitions = competitions);
  }

  search(value: string) {
    this.competitionService.getCompetitionsSearch(value).subscribe(competitions => this.competitions = competitions);
  }

  addTag() {
    console.log('Add tag');
  }

  openTagSelector() {
    this.tagSelectorOpened = true;
  }

  closeTagSelector() {
    this.tagSelectorOpened = false;
  }
}
