import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarUserAccountComponent } from './components/navbar/navbar-user-account/navbar-user-account.component';
import { NgOptimizedImage } from '@angular/common';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateCardComponent } from './components/event-templates/event-template-card/event-template-card.component';
import { EventTemplateListComponent } from './components/event-templates/event-template-browser/event-template-list/event-template-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { MainframeComponent } from './shared/components/mainframe/mainframe.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import { UserTagBtnComponent } from './shared/components/user-tag-btn/user-tag-btn.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://quay.keycloak.hq-hydra.hibyte.ro',
        realm: 'internship',
        clientId: 'betting',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    NavbarUserAccountComponent,
    EventTemplateBrowserComponent,
    EventTemplateAddComponent,
    EventTemplateCardComponent,
    EventTemplateListComponent,
    MainframeComponent,
    CreateEventComponent,
    UserTagBtnComponent,
    CompetitionsComponent,
  ],
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
    NgOptimizedImage,
    MatLegacyChipsModule,
    FormsModule,
    MatExpansionModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
