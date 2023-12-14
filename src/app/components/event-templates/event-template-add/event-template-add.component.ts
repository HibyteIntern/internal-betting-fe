import {Component} from '@angular/core';
import {EventTemplateService} from "../../../service/event-template.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {multipleChoiceValidator} from "../../../shared/validator/multiple-choice.validator";
import {multipleChoiceOptionValidator} from "../../../shared/validator/multiple-choice-option.validator";

@Component({
  selector: 'app-event-template-add',
  templateUrl: './event-template-add.component.html',
  styleUrls: ['./event-template-add.component.scss'],
})
export class EventTemplateAddComponent {

  templateFormGroup: FormGroup;

  constructor(private eventTemplateService: EventTemplateService,
              private reactiveFormBuilder: FormBuilder
  ) {
    this.templateFormGroup = reactiveFormBuilder.group(
      {
        name: ['', Validators.required],
        betTemplates: this.reactiveFormBuilder.array([])
      })
  }

  get betTemplates() {
    return this.templateFormGroup.get('betTemplates') as FormArray;
  }

  addBetTemplate() {
    const betTemplateForm = this.reactiveFormBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      type: ['', Validators.required],
      multipleChoiceOptions: this.reactiveFormBuilder.array([
        ['', multipleChoiceOptionValidator()],
        ['', multipleChoiceOptionValidator()]])
    }, { validators: multipleChoiceValidator()});
    this.betTemplates.push(betTemplateForm);
  }

  removeBetTemplate(index: number) {
    this.betTemplates.removeAt(index);
  }

  getOptions(betTemplateIndex: number): FormArray {
    return this.betTemplates.at(betTemplateIndex).get('multipleChoiceOptions') as FormArray
  }

  addMultipleChoiceOptions(betTemplateIndex: number) {
    this.getOptions(betTemplateIndex).push(this.reactiveFormBuilder.control("", multipleChoiceOptionValidator()));
  }
  removeMultipleChoiceOption(betTemplateIndex: number, optionIndex: number): void {
    this.getOptions(betTemplateIndex).removeAt(optionIndex);
  }

  submit() {
    console.log(this.templateFormGroup.valid)
    console.log(this.templateFormGroup.value);
    this.eventTemplateService.addEventTemplate(this.templateFormGroup.value).subscribe((success: boolean) =>{
      console.log("Posting " + success);
    })
  }
}
