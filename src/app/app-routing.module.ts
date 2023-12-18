import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {EventTemplateAddComponent} from './components/event-templates/event-template-add/event-template-add.component';
import {
  EventTemplateBrowserComponent
} from './components/event-templates/event-template-browser/event-template-browser.component';
import {CreateEventComponent} from "./components/events/create-event/create-event.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: "event-templates/create", component: EventTemplateAddComponent },
  { path:'create-event',component: CreateEventComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
