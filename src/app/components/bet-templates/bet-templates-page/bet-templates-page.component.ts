import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../../service/theme.service";
import {BetTemplateService} from "../../../service/bet-template.service";
import {BetTemplate} from "../../../entity/BetTemplate";
import {MatDialog} from "@angular/material/dialog";
import {BetTemplatesAddFormComponent} from "../bet-templates-add-form/bet-templates-add-form.component";

@Component({
  selector: 'app-bet-templates-page',
  templateUrl: './bet-templates-page.component.html',
  styleUrls: ['./bet-templates-page.component.scss']
})
export class BetTemplatesPageComponent implements OnInit {

  betTemplates: BetTemplate[] = [];

  constructor(private themeService: ThemeService,
              private betTemplateService: BetTemplateService,
              private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.betTemplateService.getData().subscribe((data) => {
      this.betTemplates = data;
    })
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(BetTemplatesAddFormComponent, {
      width: '500px',
      maxHeight: 'calc(100vh - 100px)'
    });
  }
}
