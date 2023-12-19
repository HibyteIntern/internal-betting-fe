import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTagBtnComponent } from './user-tag-btn.component';

describe('UserTagBtnComponent', () => {
  let component: UserTagBtnComponent;
  let fixture: ComponentFixture<UserTagBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTagBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTagBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
