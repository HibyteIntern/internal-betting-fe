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
    const type = formGroup.get('type')?.value;
    const options = formGroup.get('multipleChoiceOptions') as FormArray;
    const odds = formGroup.get('odds') as FormArray;

    if (type === 'MULTIPLE_CHOICE' && (options.length < 2 || odds.length < 2)) {
      return { insufficientOptions: true };
    }
    return null;
  };
}
