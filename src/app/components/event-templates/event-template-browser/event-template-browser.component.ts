import { Component } from '@angular/core';
import { EventTemplateService } from '../../../service/event-template.service';
import { EventTemplate } from '../../../entity/event-template.model';

@Component({
  selector: 'app-event-template-browser',
  templateUrl: './event-template-browser.component.html',
  styleUrls: ['./event-template-browser.component.scss'],
})
export class EventTemplateBrowserComponent {
  eventTemplates: EventTemplate[];
  loading = true;

  constructor(private eventTemplateService: EventTemplateService) {
    this.eventTemplates = eventTemplateService.eventTemplateSubject.value;
    eventTemplateService.getData().subscribe((data) => {
      this.eventTemplates = data;
      this.loading = false;
    });
  }

  handleDelete(id: number) {
    this.eventTemplateService.delete(id);
  }

  search(name: string) {
    this.eventTemplateService.fetch(name);
  }
}
