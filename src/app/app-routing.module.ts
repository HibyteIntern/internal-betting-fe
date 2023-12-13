import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileNewComponent } from './components/user-profile-new/user-profile-new.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';

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
    component: UserProfileComponent, 
    children: [
      {path: 'new', component: UserProfileNewComponent},
      {path: 'edit', component: UserProfileEditComponent},
      {path: 'form', component: UserProfileFormComponent},
    ]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
