import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {CompleteBetType} from "../../../entity/complete-bet-type.model";
import {multipleChoiceOptionValidator} from "../../../shared/validator/multiple-choice-option.validator";
import {multipleChoiceValidator} from "../../../shared/validator/multiple-choice.validator";

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

  getOptions(betIndex: number): FormArray {
    return this.betTypes
      .at(betIndex)
      .get('multipleChoiceOptions') as FormArray;
  }

  getOdds(betIndex: number): FormArray {
    return this.betTypes
      .at(betIndex)
      .get('odds') as FormArray;
  }

  private createBetTypeFormGroup(): FormGroup {
    return this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(50)]],
        type: ['', Validators.required],
        multipleChoiceOptions: this.fb.array([
          ['', multipleChoiceOptionValidator()],
          ['', multipleChoiceOptionValidator()],
        ]),
        odds: this.fb.array([
          ['', multipleChoiceOptionValidator()],
          ['', multipleChoiceOptionValidator()],
        ]),
      },
      {validators: multipleChoiceValidator()}
    );
  }

  addBetType(): void {
    this.betTypes.push(this.createBetTypeFormGroup());
  }

  removeBetType(index: number): void {
    this.betTypes.removeAt(index);
  }

  addMultipleChoiceOptions(betIndex: number) {
    this.getOptions(betIndex).push(
      this.fb.control('', multipleChoiceOptionValidator()),
    );
    this.getOdds(betIndex).push(
      this.fb.control('', multipleChoiceOptionValidator()),
    );
  }

  removeMultipleChoiceOption(
    betIndex: number,
    optionIndex: number,
  ): void {
    this.getOptions(betIndex).removeAt(optionIndex);
    this.getOdds(betIndex).removeAt(optionIndex);
  }
}
