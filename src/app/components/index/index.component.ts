import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from 'src/app/entity/competitions.model';
import { EventRequest } from 'src/app/entity/event-request.model';
import { CompetitionService } from 'src/app/service/competition.service';
import { EventService } from 'src/app/service/event.service';
import { TagsService } from 'src/app/service/tags.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './index.component.scss',
    '../../shared/styles/tag-container.scss',
  ],
})
export class IndexComponent implements OnInit {
  selectedCategory = 'Competitions & Events';

  tagSelectorOpened = false;

  competitions: Competition[] = [];
  selectedCompetitions: Competition[] = [];

  events: EventRequest[] = [];
  selectedEvents: EventRequest[] = [];

  constructor(
    protected competitionService: CompetitionService,
    protected eventService: EventService,
    protected tagsService: TagsService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.competitionService.getCompetitions().subscribe((competitions) => {
      this.competitions = competitions;
      this.selectCompetitions();
    });
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.selectEvents();
    });
  }

  search(value: string) {
    this.competitionService
      .getCompetitionsSearch(value)
      .subscribe((competitions) => {
        this.competitions = competitions;
        this.selectCompetitions();
      });
    this.eventService.getEventsSearch(value).subscribe((events) => {
      this.events = events;
      this.selectEvents();
    });
  }

  selectCompetitions() {
    if (this.tagsService.isCompetitionsSelected()) {
      this.selectedCompetitions = this.competitions;
    } else {
      this.selectedCompetitions = [];
    }
  }

  selectEvents() {
    if (this.tagsService.isEventsSelected()) {
      if (this.isEventsSelectedWithNoTags()) {
        this.selectedEvents = this.events;
        return;
      } else {
        this.selectedEvents = [];
        this.events.filter((event) =>
          this.tagsService.getSelectedTags().forEach((tag) => {
            if (
              event.tags.includes(tag) &&
              !this.selectedEvents.includes(event)
            ) {
              this.selectedEvents.push(event);
              return;
            }
          }),
        );
      }
    } else {
      this.selectedEvents = [];
    }
  }

  private isEventsSelectedWithNoTags() {
    return (
      (this.tagsService.isEventsSelected() &&
        this.tagsService.getSelectedTags().length === 1) ||
      (this.tagsService.isEventsSelected() &&
        this.tagsService.isCompetitionsSelected() &&
        this.tagsService.getSelectedTags().length === 2)
    );
  }

  addTag(tagIndex: number) {
    this.tagsService.addTag(tagIndex);

    if (
      this.tagsService.isEventsSelected() &&
      this.tagsService.isCompetitionsSelected()
    ) {
      this.selectedCategory = 'Competitions & Events';
    }

    this.selectCompetitions();
    this.selectEvents();
    if (this.tagsService.getAvailableTags().length === 0)
      this.closeTagSelector();
  }

  removeTag(tagIndex: number) {
    this.tagsService.removeTag(tagIndex);

    if (
      !(
        this.tagsService.isEventsSelected() &&
        this.tagsService.isCompetitionsSelected()
      )
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

  handleEntityClick(entityId: number, route: string) {
    this.router.navigate([route, entityId]);
  }

  handleCompetitionDeleteClick(competitionId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete competition',
        content: 'Are you sure you want to delete this competition?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.competitionService
          .deleteCompetition(competitionId)
          .subscribe(() => {
            this.competitions = this.competitions.filter(
              (competition) => competition.id !== competitionId,
            );
            this.selectCompetitions();
          });
      }
    });
  }

  handleEventDeleteClick(eventId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete event',
        content: 'Are you sure you want to delete this event?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventService.deleteEvent(eventId).subscribe(() => {
          this.events = this.events.filter(
            (event) => eventId !== event.eventId,
          );
          this.selectEvents();
        });
      }
    });
  }
}
