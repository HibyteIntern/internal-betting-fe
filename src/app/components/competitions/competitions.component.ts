import { Component, OnInit } from '@angular/core';
import Competition from 'src/app/models/competition.module';
import { CompetitionService } from 'src/app/service/competition.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {
  constructor(private competitionsApi: CompetitionService) { }

  ngOnInit(): void {
     this.competitionsApi.getCompetitions().subscribe((data: Competition[]) => console.log(data))
    // this.competitionsApi.getCompetition(5).subscribe((data: Competition) => console.log(data))
    // const competition: Competition = {
    //   id: 53,
    //   name: 'Competition 234923',
    //   creator: 'Creator 1',
    //   userGroups: ['Group 1', 'Group 2'],
    //   userProfiles: ['Profile 1', 'Profile 2'],
    //   created: new Date(),
    //   lastModified: new Date(),
    //   status: 'Draft'
    // }

    // this.competitionsApi.createCompetition(competition)
    //   .subscribe((data: Competition) => {
    //     console.log(data)
    //   })

    // this.competitionsApi.updateCompetition(competition).subscribe((data: Competition) => console.log(data))

    // this.competitionsApi.deleteCompetition(53).subscribe(() => console.log('Competition deleted'))
  }
}
