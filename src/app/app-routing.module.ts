import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import {GroupCreateComponent} from "./components/group-create/group-create.component";
import {GroupsComponent} from "./components/groups/groups.component";
import {GroupEditComponent} from "./components/group-edit/group-edit.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'user-groups', component: GroupsComponent},
  { path: 'user-groups/create', component: GroupCreateComponent },
  { path: 'user-groups/edit/:id', component: GroupEditComponent},

  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: 'event-templates/create', component: EventTemplateAddComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
