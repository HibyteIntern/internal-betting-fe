import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import { PrizeBrowserComponent } from './components/prizes/prize-browser/prize-browser.component';
import { PrizeDrawAddComponent } from './components/prizes/prize-draw-add/prize-draw-add.component';
import { PrizeDrawPageComponent } from './components/prizes/prize-draw-page/prize-draw-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ViewCompetitionsComponent } from './components/competitions/view-competition/view-competition.component';
import { CreateCompetitionComponent } from './components/competitions/create-competition/create-competition.component';
import { IndexComponent } from './components/index/index.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
    children: [{ path: 'edit', component: UserProfileEditComponent }],
  },
  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: 'event-templates/create', component: EventTemplateAddComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },
  { path: 'competitions/create', component: CreateCompetitionComponent },
  { path: 'competitions/edit/:id', component: CreateCompetitionComponent },
  { path: 'competitions/:id', component: ViewCompetitionsComponent },
  { path: 'prizes', component: PrizeBrowserComponent },
  { path: 'prizes/create', component: PrizeDrawAddComponent },
  { path: 'prizes/edit/:id', component: PrizeDrawAddComponent },
  { path: 'prizes/:id', component: PrizeDrawPageComponent },
  { path: '', component: IndexComponent },
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
