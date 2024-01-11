import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Input() label = '';

  myControl = new FormControl('');
  @Input() options: string[] = [];
  filteredOptions: Observable<string[]> = new Observable<string[]>();

  selectedOptions: string[] = [];
  @Output() selectedOptionsEmmiter: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

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

  addItem() {
    let optionsExist = false;

    this.filteredOptions.subscribe((elems) => {
      if (this.myControl.value)
        elems.indexOf(this.myControl.value) !== -1
          ? (optionsExist = true)
          : (optionsExist = false);
    });

    if (this.myControl.value && optionsExist) {
      this.selectedOptions.push(this.myControl.value);
      this.options = this.options.filter(
        (option) => option !== this.myControl.value,
      );
      this.myControl.setValue('');

      this.selectedOptionsEmmiter.emit(this.selectedOptions);
    }
  }

  removeItem(optionIndex: number) {
    this.options.push(this.selectedOptions[optionIndex]);
    this.selectedOptions = this.selectedOptions.filter(
      (_, index) => index !== optionIndex,
    );

    this.selectedOptionsEmmiter.emit(this.selectedOptions);
  }
}
