import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './components/login/login.component';
import { BetTemplatesPageComponent } from './components/bet-templates/bet-templates-page/bet-templates-page.component';
import { BetTemplateListComponent } from './components/bet-templates/bet-template-list/bet-template-list.component';
import { BetTemplateCardComponent } from './components/bet-templates/bet-template-card/bet-template-card.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import { BetTemplatesAddFormComponent } from './components/bet-templates/bet-templates-add-form/bet-templates-add-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarUserAccountComponent } from './components/navbar/navbar-user-account/navbar-user-account.component';
import {NgOptimizedImage} from "@angular/common";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://quay.keycloak.hq-hydra.hibyte.ro',
        realm: 'internship',
        clientId: 'betting'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [AppComponent, LoginComponent, BetTemplatesPageComponent, BetTemplateListComponent, BetTemplateCardComponent, BetTemplatesAddFormComponent, NavbarComponent, NavbarUserAccountComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
