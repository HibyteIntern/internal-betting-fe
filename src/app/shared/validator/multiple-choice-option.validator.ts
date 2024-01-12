import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function multipleChoiceOptionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent?.parent;
    if (!parent) {
      return null;
    }
    const type = parent.get('type')?.value;
    if (type === 'MULTIPLE_CHOICE' && !control.value) {
      return { required: true };
    }
    return null;
  };
}
