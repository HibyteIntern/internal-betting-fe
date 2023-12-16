import { Injectable } from '@angular/core';
import { EventTemplate } from '../entity/EventTemplate';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BetTemplate } from '../entity/BetTemplate';
import { multipleChoiceValidator } from '../shared/validator/multiple-choice.validator';
import { multipleChoiceOptionValidator } from '../shared/validator/multiple-choice-option.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private reactiveFormBuilder: FormBuilder) {}

  prepopulateEventTemplateForm(
    eventTemplate: EventTemplate,
    formGroup: FormGroup,
  ) {
    formGroup.patchValue({
      name: eventTemplate.name,
    });
    const betTemplates = formGroup.get('betTemplates') as FormArray;
    eventTemplate.betTemplates.forEach((betTemplate) => {
      betTemplates.push(this.createBetTemplateForm(betTemplate));
    });
  }

  //will be implemented once the Event creation form is done
  // prepopulateEventCreationFormWithEventTemplate(eventTemplate: EventTemplate, formGroup: FormGroup){
  // }

  private createBetTemplateForm(betTemplate: BetTemplate): FormGroup {
    return this.reactiveFormBuilder.group(
      {
        name: [
          betTemplate.name,
          [Validators.required, Validators.maxLength(50)],
        ],
        type: [betTemplate.type, Validators.required],
        multipleChoiceOptions: this.createMultipleChoiceOptionForm(betTemplate),
      },
      { validators: multipleChoiceValidator() },
    );
  }

  private createMultipleChoiceOptionForm(betTemplate: BetTemplate): FormArray {
    const multipleChoiceOptions = this.reactiveFormBuilder.array([]);
    if (
      betTemplate.type === 'MULTIPLE_CHOICE' &&
      betTemplate.multipleChoiceOptions
    ) {
      betTemplate.multipleChoiceOptions.forEach((option) => {
        multipleChoiceOptions.push(
          this.reactiveFormBuilder.control(
            option,
            multipleChoiceOptionValidator(),
          ),
        );
      });
    } else {
      multipleChoiceOptions.push(
        this.reactiveFormBuilder.control('', multipleChoiceOptionValidator()),
      );
      multipleChoiceOptions.push(
        this.reactiveFormBuilder.control('', multipleChoiceOptionValidator()),
      );
    }
    return multipleChoiceOptions;
  }
}
