import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import {PrizeBrowserComponent} from "./components/prizes/prize-browser/prize-browser.component";
import {PrizeDrawAddComponent} from "./components/prizes/prize-draw-add/prize-draw-add.component";
import {PrizeDrawPageComponent} from "./components/prizes/prize-draw-page/prize-draw-page.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'event-templates', component: EventTemplateBrowserComponent },
  { path: 'event-templates/create', component: EventTemplateAddComponent },
  { path: 'event-templates/edit/:id', component: EventTemplateAddComponent },
  { path: 'prizes', component: PrizeBrowserComponent },
  { path: 'prizes/create', component: PrizeDrawAddComponent },
  { path: 'prizes/:id', component: PrizeDrawPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
