import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import { CompleteBetType } from "../../../entity/complete-bet-type.model";

@Component({
  selector: 'app-bet-type-form',
  templateUrl: './bet-type-form.component.html',
  styleUrls: ['./bet-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BetTypeFormComponent),
      multi: true
    }
  ]

})
export class BetTypeFormComponent implements ControlValueAccessor {
  form: FormGroup;
  onChange!: (betTypes: CompleteBetType[]) => void;
  onTouched!: () => void;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      betTypes: this.fb.array([])
    });
  }

  writeValue(completeBetTypeDtoList: CompleteBetType[]): void {
    if (completeBetTypeDtoList) {
      const betTypeFormGroups = completeBetTypeDtoList.map(betType => this.createBetTypeFormGroup());
      const betTypeFormArray = this.fb.array(betTypeFormGroups);
      this.form.setControl('betTypes', betTypeFormArray);
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe((value) => {
      fn(value.betTypes);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  get betTypes(): FormArray {
    return this.form.get('betTypes') as FormArray;
  }

  private createBetTypeFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      type: ['NUMERIC', Validators.required],
      multipleChoiceOptions: [[]],
      odds: [[]]
    });
  }

  addBetType(): void {
    this.betTypes.push(this.createBetTypeFormGroup());
  }
  removeBetType(index: number): void {
    this.betTypes.removeAt(index);
  }
}
