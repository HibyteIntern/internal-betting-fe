import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBetToEventComponent } from './add-bet-to-event.component';

describe('AddBetToEventComponent', () => {
  let component: AddBetToEventComponent;
  let fixture: ComponentFixture<AddBetToEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBetToEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBetToEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
