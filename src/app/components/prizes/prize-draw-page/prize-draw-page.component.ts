import {Component, OnInit} from '@angular/core';
import {PrizeDrawService} from "../../../service/prize-draw.service";
import {PrizeDraw} from "../../../entity/PrizeDraw";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-prize-draw-page',
  templateUrl: './prize-draw-page.component.html',
  styleUrls: ['./prize-draw-page.component.scss']
})
export class PrizeDrawPageComponent implements OnInit {

  prizeDraw: PrizeDraw | undefined;
  isLoading = true;
  constructor(
    private prizeDrawService: PrizeDrawService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    let idString = this.route.snapshot.paramMap.get('id');
    if (idString === null) {
      this.router.navigate(["/"]);
      return;
    }

    let id = parseInt(idString, 10);
    if (isNaN(id)) {
      this.router.navigate(["/error"]);
      return;
    }

    this.prizeDrawService.getById(id).subscribe((data) => {
      this.isLoading = false;
      this.prizeDraw = data;
    });
  }
}
