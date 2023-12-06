import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {BetTemplatesPageComponent} from "./components/bet-templates/bet-templates-page/bet-templates-page.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'bet-templates', component: BetTemplatesPageComponent,
    children: [
      { path: 'create', component: BetTemplatesPageComponent },
      { path: 'edit/:id', component: BetTemplatesPageComponent },
      { path: 'delete/:id', component: BetTemplatesPageComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
