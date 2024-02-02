import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {EventTemplateAddComponent} from './components/event-templates/event-template-add/event-template-add.component';
import {
  EventTemplateBrowserComponent
} from './components/event-templates/event-template-browser/event-template-browser.component';
import {CreateEventComponent} from "./components/events/create-event/create-event.component";
import {ViewEventComponent} from "./components/events/view-event/view-event.component";
import {EditEventComponent} from "./components/events/edit-event/edit-event.component";
import { ViewCompetitionsComponent } from './components/competitions/view-competition/view-competition.component';
import { CreateCompetitionComponent } from './components/competitions/create-competition/create-competition.component';
import { IndexComponent } from './components/index/index.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: "event-templates/create", component: EventTemplateAddComponent },
  { path: 'create-event',component: CreateEventComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },
  { path: 'view-event/:eventId' , component: ViewEventComponent },
  { path: 'edit-event/:eventId' , component: EditEventComponent },

  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
    children: [{ path: 'edit/:id', component: UserProfileEditComponent }],
  },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'competition', component: CompetitionsComponent },
  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: 'event-templates/create', component: EventTemplateAddComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },
  { path: 'competitions/create', component: CreateCompetitionComponent },
  { path: 'competitions/edit/:id', component: CreateCompetitionComponent },
  { path: 'competitions/:id', component: ViewCompetitionsComponent },
  { path: '', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
