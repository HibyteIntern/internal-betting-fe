import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/entity/Competitions';
import { EventRequest } from 'src/app/entity/EventRequest';
import { CompetitionService } from 'src/app/service/competition.service';
import { EventService } from 'src/app/service/event.service';
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
  selectedCompetitions: Competition[] = [];

  events: EventRequest[] = [];
  selectedEvents: EventRequest[] = [];

  constructor(protected competitionService: CompetitionService, protected eventService: EventService, protected tagsService: TagsService) { }

  ngOnInit(): void {
    this.competitionService.getCompetitions().subscribe(competitions => {
      this.competitions = competitions;
      this.selectCompetitions();
    });
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.selectEvents();
    });
  }

  search(value: string) {
    this.competitionService.getCompetitionsSearch(value).subscribe(competitions => {
      this.competitions = competitions;
      this.selectCompetitions();
    });
    this.eventService.getEventsSearch(value).subscribe(events => 
    {
      this.events = events;
      this.selectEvents();
    })
  }

  selectCompetitions() {
    if(this.tagsService.isCompetitionsSelected()) {
      this.selectedCompetitions = this.competitions;
    } else {
      this.selectedCompetitions = [];
    }
  }

  selectEvents() {
    if(this.tagsService.isEventsSelected()) {
      if(this.isEventsSelectedWithNoTags()) {
        this.selectedEvents = this.events;
        return;
      } else {
        this.selectedEvents = [];
        this.events.filter(event =>
          this.tagsService.getSelectedTags().forEach(
            tag => {
              if(event.tags.includes(tag) && !this.selectedEvents.includes(event)) {
                this.selectedEvents.push(event);
                return;
              }
            }));
      }
    } else {
      this.selectedEvents = [];
    }
  }

  private isEventsSelectedWithNoTags() {
    return (this.tagsService.isEventsSelected() && this.tagsService.getSelectedTags().length === 1) 
      || (this.tagsService.isEventsSelected() && this.tagsService.isCompetitionsSelected() && this.tagsService.getSelectedTags().length === 2);
  }

  addTag(tagIndex: number) {
    this.tagsService.addTag(tagIndex);

    if(this.tagsService.isEventsSelected() 
      && this.tagsService.isCompetitionsSelected()
    ) {
      this.selectedCategory = 'Competitions & Events';
    }

    this.selectCompetitions();
    this.selectEvents();
  }

  removeTag(tagIndex: number) {
    this.tagsService.removeTag(tagIndex);

    if(!(this.tagsService.isEventsSelected() 
      && this.tagsService.isCompetitionsSelected())
    ) {
      this.selectedCategory = this.tagsService.getSelectedTags()[0];
    }

    this.selectCompetitions();
    this.selectEvents();
  }

  openTagSelector() {
    this.tagSelectorOpened = true;
  }

  closeTagSelector() {
    this.tagSelectorOpened = false;
  }
}
