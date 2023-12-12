import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
