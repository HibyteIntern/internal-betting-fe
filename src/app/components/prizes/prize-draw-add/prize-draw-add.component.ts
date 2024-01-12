import { Component } from '@angular/core';
import { PrizeDrawService } from '../../../service/prize-draw.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import PrizeDrawRequest from '../../../entity/prize-draw-request.model';
import { Router } from '@angular/router';
import { DrawType } from '../../../entity/DrawType';

@Component({
  selector: 'app-prize-draw-add',
  templateUrl: './prize-draw-add.component.html',
  styleUrls: ['./prize-draw-add.component.scss'],
})
export class PrizeDrawAddComponent {
  prizeDrawFormGroup: FormGroup;
  selectedCategory = '';
  isLoading = false;
  errorMessage = '';
  minEndsAtDate = new Date();
  constructor(
    private prizeDrawService: PrizeDrawService,
    private reactiveFormBuilder: FormBuilder,
    private router: Router,
  ) {
    this.prizeDrawFormGroup = reactiveFormBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      prizeDescription: ['', Validators.required],
    });
  }

  handleCategoryChange(newCategory: string) {
    this.selectedCategory = newCategory;
  }

  submit() {
    if (!this.prizeDrawFormGroup.valid) return;
    let prizeDrawRequest: PrizeDrawRequest = {
      title: this.prizeDrawFormGroup.get('title')?.value,
      description: this.prizeDrawFormGroup.get('description')?.value,
      endsAt: this.prizeDrawFormGroup.get('endDate')?.value,
      prizeDescription: this.prizeDrawFormGroup.get('prizeDescription')?.value,
      type: DrawType[this.selectedCategory as keyof typeof DrawType],
    };
    this.isLoading = true;
    this.prizeDrawService.add(prizeDrawRequest).subscribe((success) => {
      this.isLoading = false;
      if (success) this.router.navigate(['/prizes']);
      else this.errorMessage = 'Something went wrong';
    });
  }
}
