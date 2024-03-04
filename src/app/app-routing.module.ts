import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import { GroupCreateComponent } from './components/user-groups/group-create/group-create.component';
import { GroupsComponent } from './components/user-groups/groups/groups.component';
import { GroupEditComponent } from './components/user-groups/group-edit/group-edit.component';
import { PrizeBrowserComponent } from './components/prizes/prize-browser/prize-browser.component';
import { PrizeDrawAddComponent } from './components/prizes/prize-draw-add/prize-draw-add.component';
import { PrizeDrawPageComponent } from './components/prizes/prize-draw-page/prize-draw-page.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { ViewEventComponent } from './components/events/view-event/view-event.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ViewCompetitionsComponent } from './components/competitions/view-competition/view-competition.component';
import { CreateCompetitionComponent } from './components/competitions/create-competition/create-competition.component';
import { IndexComponent } from './components/index/index.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { AuthGuard } from './guard/auth.guard';
import { LeaderboardsComponent } from './components/leaderboards/leaderboards.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: 'event-templates/create', component: EventTemplateAddComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },
  { path: 'view-event/:eventId', component: ViewEventComponent },
  { path: 'edit-event/:eventId', component: EditEventComponent },

  { path: 'user-groups', component: GroupsComponent },
  { path: 'user-groups/create', component: GroupCreateComponent },
  { path: 'user-groups/edit/:id', component: GroupEditComponent },

  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
    children: [{ path: 'edit', component: UserProfileEditComponent }],
  },
  { path: 'competition', component: CompetitionsComponent },
  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: 'event-templates/create', component: EventTemplateAddComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },
  { path: 'competitions/create', component: CreateCompetitionComponent },
  { path: 'competitions/edit/:id', component: CreateCompetitionComponent },
  { path: 'competitions/:id', component: ViewCompetitionsComponent },
  { path: '', component: IndexComponent },
  { path: 'prizes', component: PrizeBrowserComponent },
  { path: 'prizes/create', component: PrizeDrawAddComponent },
  { path: 'prizes/edit/:id', component: PrizeDrawAddComponent },
  { path: 'prizes/:id', component: PrizeDrawPageComponent },
  { path: 'leaderboards', component: LeaderboardsComponent },
  { path: '', component: IndexComponent },
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
