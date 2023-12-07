import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {BetTemplateService} from "../../../service/bet-template.service";
import {BetTemplate} from "../../../entity/BetTemplate";

@Component({
  selector: 'app-bet-templates-add-form',
  templateUrl: './bet-templates-add-form.component.html',
  styleUrls: ['./bet-templates-add-form.component.scss']
})
export class BetTemplatesAddFormComponent {

  selectedOption = "";
  categoryOptions: string[] = ["Numeric", "String", "Boolean", "Multiple choice"];
  errorMessage: string = "";
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<BetTemplatesAddFormComponent>,
              private betTemplateService: BetTemplateService
  ) {
  }

  addBetTemplateForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    multipleChoiceOptions: this.formBuilder.array([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required)
    ])
  });

  get choices(): FormArray {
    return this.addBetTemplateForm.get('multipleChoiceOptions') as FormArray;
  }

  addChoice() {
    let newFormControl: FormControl = new FormControl('', Validators.required);
    this.addBetTemplateForm.addControl('choice', newFormControl);
    this.choices.push(newFormControl);
  }
  submitForm() {
    let type = this.addBetTemplateForm.get("type")?.value.toUpperCase().replace(" ", "_");
    if(!this.addBetTemplateForm.valid && type == "MULTIPLE_CHOICE") return;
    if(type == "MULTIPLE_CHOICE" && this.choices.length < 2) return;
    let betTemplate: BetTemplate = {
      name: this.addBetTemplateForm.get("name")?.value,
      type: type,
      multipleChoiceOptions: this.addBetTemplateForm.get("multipleChoiceOptions")?.value
    }
    this.betTemplateService.addBetTemplate(betTemplate).subscribe((success) => {
      if (success) {
        this.dialogRef.close();
      }
    });
  }

  protected readonly FormControl = FormControl;
}
