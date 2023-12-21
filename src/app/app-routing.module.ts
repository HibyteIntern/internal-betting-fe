import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { CreateCompetitionComponent } from './components/create-competition/create-competition.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: 'event-templates/create', component: EventTemplateAddComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },
  { path: "competitions", component: CompetitionsComponent },
  { path: "create-competition", component: CreateCompetitionComponent },
  { path: "", component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
