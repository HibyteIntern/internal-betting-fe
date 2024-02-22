import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserProfileService } from 'src/app/service/user-profile.service';
import {
  Observable,
  Subscription,
  map,
  startWith,
  BehaviorSubject,
  merge,
} from 'rxjs';
import { UserProfile } from '../../../entity/user-profile';
import { FullUserProfile } from '../../../entity/full-user-profile';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() label = '';
  @Input() autocompleteType?: 'user' | 'userGroup';

  myControl = new FormControl('');
  @Input() options: string[] = [];
  filteredOptions: Observable<string[]> = new Observable<string[]>();

  filteredOptionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  filteredOptions2: Observable<string[]> =
    this.filteredOptionsSubject.asObservable();

  @Input() chips: string[] = [];
  @Output() selectedOptionsEmmiter: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();
  userProfile: UserProfile | undefined;
  userProfiles: { [key: string]: FullUserProfile } = {};

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.filteredOptions = merge(
      this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '')),
      ),
      this.filteredOptions2,
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

      this.chips.push(this.myControl.value);
      this.options = this.options.filter(
        (option) => option !== this.myControl.value,
      );
      this.myControl.setValue('');

      this.selectedOptionsEmmiter.emit(this.chips);
    }
  }

  removeItem(optionIndex: number) {
    const optionToRemove = this.chips[optionIndex];
    this.options.push(optionToRemove);
    delete this.userProfiles[optionToRemove];
    this.chips = this.chips.filter((_, index) => index !== optionIndex);
    this.selectedOptionsEmmiter.emit(this.chips);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.filteredOptionsSubject.next(this.options);
    }
  }
}
