import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import { PrizeBrowserComponent } from './components/prizes/prize-browser/prize-browser.component';
import { PrizeDrawAddComponent } from './components/prizes/prize-draw-add/prize-draw-add.component';
import { PrizeDrawPageComponent } from './components/prizes/prize-draw-page/prize-draw-page.component';
import { NotFoundPageComponent } from './components/error-pages/not-found-page/not-found-page.component';
import { ViewCompetitionsComponent } from './components/competitions/view-competition/view-competition.component';
import { CreateCompetitionComponent } from './components/competitions/create-competition/create-competition.component';
import { IndexComponent } from './components/index/index.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { authGuard } from './guard/auth.guard';
import {AccessDeniedPageComponent} from "./components/error-pages/access-denied-page/access-denied-page.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'user-profile',
    canActivate: [authGuard],
    component: UserProfileComponent,
    children: [{ path: 'edit', component: UserProfileEditComponent }],
  },
  { path: 'event-templates', canActivate: [authGuard], component: EventTemplateBrowserComponent },
  { path: 'event-templates/create', canActivate: [authGuard], component: EventTemplateAddComponent },
  { path: 'event-templates/edit/:id', canActivate: [authGuard], component: EventTemplateAddComponent },
  { path: 'competitions/create', canActivate: [authGuard], component: CreateCompetitionComponent },
  { path: 'competitions/edit/:id', canActivate: [authGuard], component: CreateCompetitionComponent },
  { path: 'competitions/:id', component: ViewCompetitionsComponent },
  { path: 'prizes', component: PrizeBrowserComponent },
  { path: 'prizes/create', canActivate: [authGuard], component: PrizeDrawAddComponent },
  { path: 'prizes/edit/:id', canActivate: [authGuard], component: PrizeDrawAddComponent },
  { path: 'prizes/:id', component: PrizeDrawPageComponent },
  { path: '', component: IndexComponent },
  { path: 'denied', component: AccessDeniedPageComponent },
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
