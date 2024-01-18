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
import { MatExpansionModule } from '@angular/material/expansion';
import { MainframeComponent } from './shared/components/mainframe/mainframe.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import { UserTagBtnComponent } from './shared/components/user-tag-btn/user-tag-btn.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { MatIconModule } from '@angular/material/icon';
import { TagComponent } from './shared/components/tag/tag.component';
import { StopMousePropagationDirective } from './shared/directive/stop-mouse-propagation.directive';
import { ViewEventComponent } from './components/events/view-event/view-event.component';
import {MatChipsModule} from "@angular/material/chips";
import {SearchBarComponent} from "./shared/components/search-bar/search-bar.component";
import { LeftSidebarListComponent } from './components/sidebar/left-sidebar-list/left-sidebar-list.component';
import { HideScrollbarDirective } from './shared/directive/hide-scrollbar.directive';
import { RightSidebarComponent } from './components/sidebar/right-sidebar/right-sidebar.component';
import { AutocompleteComponent } from './shared/components/autocomplete/autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import {MatListModule} from "@angular/material/list";
import { AddBetToEventComponent } from './components/events/add-bet-to-event/add-bet-to-event.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';

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
    TagComponent,
    StopMousePropagationDirective,
    ViewEventComponent,
    SearchBarComponent,
    LeftSidebarListComponent,
    HideScrollbarDirective,
    RightSidebarComponent,
    AutocompleteComponent,
    AddBetToEventComponent,
    EditEventComponent,
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatListModule,
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
