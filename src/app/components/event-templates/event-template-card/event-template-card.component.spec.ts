import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTemplateCardComponent } from './event-template-card.component';

describe('EventTemplateCardComponent', () => {
  let component: EventTemplateCardComponent;
  let fixture: ComponentFixture<EventTemplateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTemplateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
