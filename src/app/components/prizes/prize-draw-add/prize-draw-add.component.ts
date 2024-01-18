import { Component } from '@angular/core';
import { PrizeDrawService } from '../../../service/prize-draw.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import PrizeDrawRequest from '../../../entity/prize-draw-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawType } from '../../../entity/DrawType';
import { catchError, of } from 'rxjs';
import { PrizeDraw } from '../../../entity/prize-draw.model';

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

  isEditPage = false;
  editedPrizeDraw?: PrizeDraw;

  constructor(
    private prizeDrawService: PrizeDrawService,
    private reactiveFormBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.prizeDrawFormGroup = reactiveFormBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      prizeDescription: ['', Validators.required],
    });

    if (this.route.snapshot.url[1]?.path === 'edit') {
      this.isEditPage = true;
      let id = parseInt(this.route.snapshot.params['id']);
      this.prizeDrawService
        .getById(id)
        .pipe(
          catchError((error) => {
            if (error.status === 404) router.navigate(['/prize-draws']);
            return of(null);
          }),
        )
        .subscribe((response) => {
          if (response) {
            this.editedPrizeDraw = response;
            this.prepopulatePrizeDrawForm(response);
          }
        });
    }
  }

  private prepopulatePrizeDrawForm(prizeDraw: PrizeDraw) {
    this.prizeDrawFormGroup.patchValue({
      title: prizeDraw.title,
      description: prizeDraw.description,
      endDate: prizeDraw.endsAt,
      prizeDescription: prizeDraw.prizeDescription,
    });
  }

  handleCategoryChange(newCategory: string) {
    this.selectedCategory = newCategory;
  }

  private createPrizeDrawRequestFromForm(): PrizeDrawRequest {
    let drawType = DrawType[this.selectedCategory as keyof typeof DrawType];
    if (this.isEditPage && this.editedPrizeDraw)
      drawType = this.editedPrizeDraw.type;
    return {
      title: this.prizeDrawFormGroup.get('title')?.value,
      description: this.prizeDrawFormGroup.get('description')?.value,
      endsAt: this.prizeDrawFormGroup.get('endDate')?.value,
      prizeDescription: this.prizeDrawFormGroup.get('prizeDescription')?.value,
      type: drawType,
    };
  }

  private handleSubmitSuccess(success: boolean) {
    if (success && this.editedPrizeDraw)
      this.router.navigate(['/prizes', this.editedPrizeDraw?.id]);
    else if (success) this.router.navigate(['/prizes']);
    else {
      this.isLoading = false;
      this.errorMessage = 'Something went wrong. Please try again.';
    }
  }

  submit() {
    this.errorMessage = '';
    if (!this.prizeDrawFormGroup.valid) return;
    let prizeDrawRequest: PrizeDrawRequest =
      this.createPrizeDrawRequestFromForm();
    this.isLoading = true;

    if (this.isEditPage && this.editedPrizeDraw) {
      this.prizeDrawService
        .update(this.editedPrizeDraw.id, prizeDrawRequest)
        .subscribe((success: boolean) => this.handleSubmitSuccess(success));
    } else {
      this.prizeDrawService
        .add(prizeDrawRequest)
        .subscribe((success: boolean) => this.handleSubmitSuccess(success));
    }
  }
}
