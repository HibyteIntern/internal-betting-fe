import { Component } from '@angular/core';
import { EventTemplateService } from '../../../service/event-template.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { multipleChoiceValidator } from '../../../shared/validator/multiple-choice.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../../service/form.service';
import { catchError, of } from 'rxjs';
import { EventTemplate } from '../../../entity/event-template.model';

@Component({
  selector: 'app-event-template-add',
  templateUrl: './event-template-add.component.html',
  styleUrls: ['./event-template-add.component.scss'],
})
export class EventTemplateAddComponent {
  templateFormGroup: FormGroup;
  isEditPage = false;
  editedTemplateId?: number;
  errorMessage = '';
  isLoading = false;

  constructor(
    private eventTemplateService: EventTemplateService,
    private formService: FormService,
    private reactiveFormBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.templateFormGroup = reactiveFormBuilder.group({
      name: ['', Validators.required],
      betTemplates: this.reactiveFormBuilder.array([]),
    });
    if (this.route.snapshot.url[1]?.path === 'edit') {
      this.isEditPage = true;
      this.editedTemplateId = parseInt(this.route.snapshot.params['id']);
      this.eventTemplateService
        .getById(this.editedTemplateId)
        .pipe(
          catchError((error) => {
            if (error.status === 404) router.navigate(['/event-templates']);
            return of(null);
          }),
        )
        .subscribe((response) => {
          if (response) {
            this.prepopulateEventTemplateForm(response);
          }
        });
    }
  }

  private prepopulateEventTemplateForm(eventTemplate: EventTemplate) {
    this.templateFormGroup.patchValue({
      name: eventTemplate.name,
    });
    const betTemplates = this.templateFormGroup.get(
      'betTemplates',
    ) as FormArray;
    eventTemplate.betTemplates.forEach((betTemplate) => {
      betTemplates.push(this.formService.createBetTemplateForm(betTemplate));
    });
  }

  get betTemplates() {
    return this.templateFormGroup.get('betTemplates') as FormArray;
  }

  addBetTemplate() {
    const betTemplateForm = this.reactiveFormBuilder.group(
      {
        name: ['', [Validators.required, Validators.maxLength(50)]],
        options: this.reactiveFormBuilder.array([
          ['', Validators.required],
          ['', Validators.required],
        ]),
      },
      { validators: multipleChoiceValidator() },
    );
    this.betTemplates.push(betTemplateForm);
  }

  removeBetTemplate(index: number) {
    this.betTemplates.removeAt(index);
  }

  getOptions(betTemplateIndex: number): FormArray {
    return this.betTemplates.at(betTemplateIndex).get('options') as FormArray;
  }

  addMultipleChoiceOptions(betTemplateIndex: number) {
    this.getOptions(betTemplateIndex).push(
      this.reactiveFormBuilder.control('', Validators.required),
    );
  }

  removeMultipleChoiceOption(
    betTemplateIndex: number,
    optionIndex: number,
  ): void {
    this.getOptions(betTemplateIndex).removeAt(optionIndex);
  }

  handleSubmitSuccess(success: boolean) {
    if (success) this.router.navigate(['/event-templates']);
    this.isLoading = false;
    this.errorMessage = 'Something went wrong. Please try again';
  }

  submit() {
    this.errorMessage = '';
    if (!this.templateFormGroup.valid) {
      return;
    }

    this.isLoading = true;
    if (this.isEditPage && this.editedTemplateId) {
      this.eventTemplateService
        .update(this.editedTemplateId, this.templateFormGroup.value)
        .subscribe((success: boolean) => this.handleSubmitSuccess(success));
    } else {
      this.eventTemplateService
        .add(this.templateFormGroup.value)
        .subscribe((success: boolean) => this.handleSubmitSuccess(success));
    }
  }
}
