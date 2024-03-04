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
import { Observable, map, startWith, BehaviorSubject, merge } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() label = '';

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

  addItem() {
    let optionsExist = false;

    this.filteredOptions.subscribe((elems) => {
      if (this.myControl.value)
        elems.indexOf(this.myControl.value) !== -1
          ? (optionsExist = true)
          : (optionsExist = false);
    });

    if (this.myControl.value && optionsExist) {
      this.chips.push(this.myControl.value);
      this.options = this.options.filter(
        (option) => option !== this.myControl.value,
      );
      this.myControl.setValue('');

      this.selectedOptionsEmmiter.emit(this.chips);
    }
  }

  removeItem(optionIndex: number) {
    this.options.push(this.chips[optionIndex]);
    this.chips = this.chips.filter((_, index) => index !== optionIndex);

    this.selectedOptionsEmmiter.emit(this.chips);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.filteredOptionsSubject.next(this.options);
    }
  }
}
