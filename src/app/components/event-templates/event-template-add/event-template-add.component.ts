import { Component } from '@angular/core';
import {EventTemplateService} from "../../../service/event-template.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

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
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.betTemplates.push(betTemplateForm);
  }

  removeBetTemplate(index: number) {
    this.betTemplates.removeAt(index);
  }
}
