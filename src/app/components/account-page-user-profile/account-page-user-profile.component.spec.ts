import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageUserProfileComponent } from './account-page-user-profile.component';

describe('AccountPageUserProfileComponent', () => {
  let component: AccountPageUserProfileComponent;
  let fixture: ComponentFixture<AccountPageUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
