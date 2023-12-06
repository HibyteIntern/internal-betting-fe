import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../service/theme.service";
import {BetTemplateService} from "../../service/bet-template.service";
import {BetTemplate} from "../../entity/BetTemplate";

@Component({
  selector: 'app-bet-templates-page',
  templateUrl: './bet-templates-page.component.html',
  styleUrls: ['./bet-templates-page.component.scss']
})
export class BetTemplatesPageComponent implements OnInit {

  betTemplates: BetTemplate[] = [];

  constructor(private themeService: ThemeService, private betTemplateService: BetTemplateService) { }

  ngOnInit(): void {
    this.betTemplateService.getData().subscribe((data) => {
      this.betTemplates = data;
    })
  }
}
