import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { BetType } from '../../../entity/bet-type.model';
import { multipleChoiceEventValidator } from '../../../shared/validator/multiple-choice-event.validator';

@Component({
  selector: 'app-bet-type-form',
  templateUrl: './bet-type-form.component.html',
  styleUrls: ['./bet-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BetTypeFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BetTypeFormComponent),
      multi: true,
    },
  ],
})
export class BetTypeFormComponent implements ControlValueAccessor, Validator {
  form: FormGroup;
  onTouched!: () => void;
  onValidationChange!: () => void;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      betTypes: this.fb.array([]),
    });
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (this.form?.invalid) {
      return { invalid: true };
    } else {
      return null;
    }
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  writeValue(betTypeDtoList: BetType[]): void {
    if (betTypeDtoList) {
      const betTypeFormGroups = betTypeDtoList.map((betType) =>
        this.createBetTypeFormGroupFromBetType(betType),
      );
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
    return this.betTypes.at(betIndex).get('options') as FormArray;
  }

  getOdds(betIndex: number): FormArray {
    return this.betTypes.at(betIndex).get('odds') as FormArray;
  }

  private createBetTypeFormGroup(): FormGroup {
    return this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(50)]],
        type: ['', Validators.required],
        options: this.fb.array([
          ['', Validators.required],
          ['', Validators.required],
        ]),
        odds: this.fb.array([
          ['', Validators.required],
          ['', Validators.required],
        ]),
      },
      { validators: multipleChoiceEventValidator() },
    );
  }

  private createBetTypeFormGroupFromBetType(betType: BetType): FormGroup {
    return this.fb.group(
      {
        name: [betType.name, [Validators.required, Validators.maxLength(50)]],
        options: this.fb.array(
          betType.options
            ? betType.options.map((option) =>
                this.fb.control(option, Validators.required),
              )
            : [],
        ),
        odds: this.fb.array(
          betType.options
            ? betType.options.map(() =>
                this.fb.control('', Validators.required),
              )
            : [],
        ),
      },
      { validators: multipleChoiceEventValidator() },
    );
  }

  addBetType(): void {
    this.betTypes.push(this.createBetTypeFormGroup());
  }

  removeBetType(index: number): void {
    this.betTypes.removeAt(index);
  }

  addMultipleChoiceOptions(betIndex: number) {
    this.getOptions(betIndex).push(this.fb.control('', Validators.required));
    this.getOdds(betIndex).push(this.fb.control('', Validators.required));
  }

  removeMultipleChoiceOption(betIndex: number, optionIndex: number): void {
    this.getOptions(betIndex).removeAt(optionIndex);
    this.getOdds(betIndex).removeAt(optionIndex);
  }
}
