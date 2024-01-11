import { Component } from '@angular/core';
import { PrizeDrawService } from "../../../service/prize-draw.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-prize-draw-add',
  templateUrl: './prize-draw-add.component.html',
  styleUrls: ['./prize-draw-add.component.scss'],
})
export class PrizeDrawAddComponent {

  prizeDrawFormGroup: FormGroup;
  selectedCategory: string = ''
  constructor(
    private prizeDrawService: PrizeDrawService,
    private reactiveFormBuilder: FormBuilder
  ) {
    this.prizeDrawFormGroup = reactiveFormBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      prizeDescription: ['', Validators.required]
    })
  }

  handleCategoryChange(newCategory: string) {
    this.selectedCategory = newCategory;
  }

  submit() {
    console.log(this.selectedCategory);
    console.log(this.prizeDrawFormGroup.value)
  }

}
