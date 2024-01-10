import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsListComponent } from './bets-list.component';

describe('BetsListComponent', () => {
  let component: BetsListComponent;
  let fixture: ComponentFixture<BetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
