import {Component, OnInit} from '@angular/core';
import {PrizeDrawService} from '../../../service/prize-draw.service';
import {PrizeDraw} from '../../../entity/prize-draw.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PrizeDrawEntry} from "../../../entity/prize-draw-entry.model";
import PrizeDrawEntryRequest from "../../../entity/prize-draw-entry-request.model";
import {DrawType} from "../../../entity/DrawType";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-prize-draw-page',
  templateUrl: './prize-draw-page.component.html',
  styleUrls: ['./prize-draw-page.component.scss'],
})
export class PrizeDrawPageComponent implements OnInit {
  prizeDraw: PrizeDraw | undefined;
  isLoading = true;
  constructor(
    private prizeDrawService: PrizeDrawService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    let idString = this.route.snapshot.paramMap.get('id');
    if (idString === null) {
      this.router.navigate(['/']);
      return;
    }
    let id = parseInt(idString, 10);
    if (isNaN(id)) {
      this.router.navigate(['/']);
      return;
    }

    this.prizeDrawService.getById(id).subscribe((data) => {
      this.isLoading = false;
      this.prizeDraw = data;
    });
  }

  addEntry(amount: number) {
    if (this.prizeDraw === undefined) {
      return;
    }
    let body: PrizeDrawEntryRequest = {
      prizeDrawId: this.prizeDraw.id,
      amount: amount,
    };
    this.prizeDrawService.addEntryToDraw(body).subscribe((data) => {
      this.prizeDraw!.entries.push(data);
      this.recalculateLeader(this.prizeDraw!);
    });
  }

  deleteDraw() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete draw', content: 'Are you sure you want to delete this draw? This will not award anyone any prize.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && this.prizeDraw) {
        this.prizeDrawService.delete(this.prizeDraw.id).subscribe((success) => {
          if(success) this.router.navigate(['/prizes']);
        });
      }
    });
  }

  editDraw() {
    this.router.navigate(['/prizes', 'edit', this.prizeDraw?.id])
  }

  private recalculateLeader(prizeDraw: PrizeDraw) {
    let currentLeader: PrizeDrawEntry | null = null;
    for (let entry of prizeDraw.entries) {
      if (currentLeader === null || entry.amount > currentLeader.amount) {
        currentLeader = entry;
      }
    }
    prizeDraw.currentLeader = currentLeader;
  }

  showEntryInput(): boolean {
    if(this.prizeDraw?.type === DrawType.MOST_POINTS) return false;
    //once the user service will be finished, we will check if the logged-in user has already entered the draw
    return true;
  }
}
