import { Component, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, map, startWith } from "rxjs";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl('');
  @Input() options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> = new Observable<string[]>();

  @Output() selectedOptions: string[] = [];

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addItem() {
    if(this.myControl.value) {
      this.selectedOptions.push(this.myControl.value);
      this.options = this.options.filter(option => option !== this.myControl.value);
      this.myControl.setValue('');
    }
    console.log(this.options)
    console.log(this.selectedOptions);
  }

  removeItem(option: string) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    this.options.push(option);
  }
}
