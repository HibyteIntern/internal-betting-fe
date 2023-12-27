import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/entity/Competitions';
import { CompetitionService } from 'src/app/service/competition.service';
import { TagsService } from 'src/app/service/tags.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss', '../../shared/styles/tag-container.scss']
})
export class IndexComponent implements OnInit {
  selectedCategory = 'Competitions & Events';

  tagSelectorOpened = false;

  competitions: Competition[] = [];

  constructor(protected competitionService: CompetitionService, protected tagsService: TagsService) { }

  ngOnInit(): void {
    this.competitionService.getCompetitions().subscribe(competitions => this.competitions = competitions);
  }

  search(value: string) {
    this.competitionService.getCompetitionsSearch(value).subscribe(competitions => this.competitions = competitions);
  }

  addTag(tagIndex: number) {
    this.tagsService.addTag(tagIndex);

    if(this.tagsService.getSelectedTags()[1] === 'Events' ||
      this.tagsService.getSelectedTags()[1] === 'Competitions'
    ) {
      this.selectedCategory = 'Competitions & Events';
    }
  }

  removeTag(tagIndex: number) {
    this.tagsService.removeTag(tagIndex);

    if(this.tagsService.getSelectedTags()[1] !== 'Events' &&
      this.tagsService.getSelectedTags()[1] !== 'Competitions'
    ) {
      this.selectedCategory = this.tagsService.getSelectedTags()[0];
    }
  }

  openTagSelector() {
    this.tagSelectorOpened = true;
  }

  closeTagSelector() {
    this.tagSelectorOpened = false;
  }
}
