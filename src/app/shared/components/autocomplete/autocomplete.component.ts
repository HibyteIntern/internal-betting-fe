import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Input() label = '';
  @Input() autocompleteType?: 'user' | 'userGroup';

  myControl = new FormControl('');
  @Input() options: string[] = [];
  filteredOptions: Observable<string[]> = new Observable<string[]>();

  @Input() selectedOptions: string[] = [];
  @Output() selectedOptionsEmmiter: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();
  userProfile: UserProfile | undefined;
  userProfiles: { [key: string]: UserProfile } = {};

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue),
    );
  }

  async addItem() {
    let optionsExist = false;

    this.filteredOptions.subscribe((elems) => {
      if (this.myControl.value)
        elems.indexOf(this.myControl.value) !== -1
          ? (optionsExist = true)
          : (optionsExist = false);
    });

    if (this.myControl.value && optionsExist) {
      if (this.autocompleteType === 'user') {
        try {
          const userProfile = await this.userProfileService
            .getUserProfileByName(this.myControl.value)
            .toPromise();
          if (userProfile) {
            this.userProfiles[this.myControl.value] = userProfile;
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }

      this.selectedOptions.push(this.myControl.value);
      this.options = this.options.filter(
        (option) => option !== this.myControl.value,
      );
      this.myControl.setValue('');

      this.selectedOptionsEmmiter.emit(this.selectedOptions);
    }
  }

  removeItem(optionIndex: number) {
    const optionToRemove = this.selectedOptions[optionIndex];
    this.options.push(optionToRemove);
    delete this.userProfiles[optionToRemove];
    this.selectedOptions = this.selectedOptions.filter(
      (_, index) => index !== optionIndex,
    );
    this.selectedOptionsEmmiter.emit(this.selectedOptions);
  }
}
