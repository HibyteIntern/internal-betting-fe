import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BetTemplate } from '../entity/bet-template.model';
import { multipleChoiceValidator } from '../shared/validator/multiple-choice.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private reactiveFormBuilder: FormBuilder) {}

  createBetTemplateForm(betTemplate: BetTemplate): FormGroup {
    return this.reactiveFormBuilder.group(
      {
        name: [
          betTemplate.name,
          [Validators.required, Validators.maxLength(50)],
        ],
        options: this.createMultipleChoiceOptionForm(betTemplate),
      },
      { validators: multipleChoiceValidator() },
    );
  }

  private createMultipleChoiceOptionForm(betTemplate: BetTemplate): FormArray {
    const options = this.reactiveFormBuilder.array([]);
    if (betTemplate.options) {
      betTemplate.options.forEach((option) => {
        options.push(
          this.reactiveFormBuilder.control(option, Validators.required),
        );
      });
    } else {
      options.push(this.reactiveFormBuilder.control('', Validators.required));
      options.push(this.reactiveFormBuilder.control('', Validators.required));
    }
    return options;
  }
}
