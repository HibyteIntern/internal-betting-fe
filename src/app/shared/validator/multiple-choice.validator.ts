import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function multipleChoiceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const options = formGroup.get('options') as FormArray;

    if (options.length < 2) {
      return { insufficientOptions: true };
    }
    return null;
  };
}
