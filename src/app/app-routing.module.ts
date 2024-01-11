import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'event-templates',
    component: EventTemplateBrowserComponent,
    children: [
      { path: 'create', component: EventTemplateAddComponent },
      { path: 'edit/:id', component: EventTemplateAddComponent },
    ],
  },
    
  { path: 'user-profile',
    canActivate: [AuthGuard], 
    component: UserProfileComponent, 
    children: [
      {path: 'edit/:id', component: UserProfileEditComponent},
    ]}, 
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  { path: 'competition', component: CompetitionsComponent },
  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: 'event-templates/create', component: EventTemplateAddComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
