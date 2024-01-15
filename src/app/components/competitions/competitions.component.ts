import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition } from 'src/app/entity/competitions.model';
import { CompetitionService } from 'src/app/service/competition.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {
  protected competition: Competition | undefined;

  constructor(protected competitionService: CompetitionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.competitionService.getCompetitionById(params['id']).subscribe(competition => {
        this.competition = competition;
        console.log(this.competition?.events)
      })
    })

    
  }
}
