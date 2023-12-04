import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'competitions', component: CompetitionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
