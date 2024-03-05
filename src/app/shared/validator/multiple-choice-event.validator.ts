import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function multipleChoiceEventValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const options = formGroup.get('options') as FormArray;
    const odds = formGroup.get('odds') as FormArray;

    if (options.length < 2 || odds.length < 2) {
      return { insufficientOptions: true };
    }
    return null;
  };
}
