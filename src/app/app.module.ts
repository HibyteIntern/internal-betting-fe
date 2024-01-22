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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarUserAccountComponent } from './components/navbar/navbar-user-account/navbar-user-account.component';
import { NgOptimizedImage } from '@angular/common';
import { EventTemplateBrowserComponent } from './components/event-templates/event-template-browser/event-template-browser.component';
import { EventTemplateAddComponent } from './components/event-templates/event-template-add/event-template-add.component';
import { EventTemplateCardComponent } from './components/event-templates/event-template-card/event-template-card.component';
import { EventTemplateListComponent } from './components/event-templates/event-template-browser/event-template-list/event-template-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MainframeComponent } from './shared/components/mainframe/mainframe.component';
import { UserTagBtnComponent } from './shared/components/user-tag-btn/user-tag-btn.component';
import { ViewCompetitionsComponent } from './components/competitions/view-competition/view-competition.component';
import { CompetitionCardComponent } from './components/competitions/competition-card/competition-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TagComponent } from './shared/components/tag/tag.component';
import { CreateCompetitionComponent } from './components/competitions/create-competition/create-competition.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { StopMousePropagationDirective } from './shared/directive/stop-mouse-propagation.directive';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LeftSidebarListComponent } from './components/sidebar/left-sidebar-list/left-sidebar-list.component';
import { HideScrollbarDirective } from './shared/directive/hide-scrollbar.directive';
import { RightSidebarComponent } from './components/sidebar/right-sidebar/right-sidebar.component';
import { AutocompleteComponent } from './shared/components/autocomplete/autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PrizeBrowserComponent } from './components/prizes/prize-browser/prize-browser.component';
import { PrizeCardComponent } from './components/prizes/prize-card/prize-card.component';
import { PrizeListComponent } from './components/prizes/prize-browser/prize-list/prize-list.component';
import { PrizeDrawAddComponent } from './components/prizes/prize-draw-add/prize-draw-add.component';
import { PrizeDrawPageComponent } from './components/prizes/prize-draw-page/prize-draw-page.component';
import { PrizeCategoryListComponent } from './components/prizes/prize-draw-add/prize-category-list/prize-category-list.component';
import { MatRadioModule } from '@angular/material/radio';
import { PrizeDrawLeaderComponent } from './components/prizes/prize-draw-page/prize-draw-leader/prize-draw-leader.component';
import { PrizeDrawExpiryComponent } from './components/prizes/prize-draw-page/prize-draw-expiry/prize-draw-expiry.component';
import { PrizeDrawPrizeComponent } from './components/prizes/prize-draw-page/prize-draw-prize/prize-draw-prize.component';
import { PrizeDrawUserListComponent } from './components/prizes/prize-draw-page/prize-draw-user-list/prize-draw-user-list.component';
import { PrizeDrawUserEntryComponent } from './components/prizes/prize-draw-page/prize-draw-user-list/prize-draw-user-entry/prize-draw-user-entry.component';
import { PrizeDrawEntryInputComponent } from './components/prizes/prize-draw-page/prize-draw-entry-input/prize-draw-entry-input.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { IndexComponent } from './components/index/index.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

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
    UserTagBtnComponent,
    ViewCompetitionsComponent,
    CompetitionCardComponent,
    TagComponent,
    StopMousePropagationDirective,
    SearchBarComponent,
    LeftSidebarListComponent,
    HideScrollbarDirective,
    RightSidebarComponent,
    AutocompleteComponent,
    CreateCompetitionComponent,
    EventCardComponent,
    IndexComponent,
    PrizeBrowserComponent,
    PrizeCardComponent,
    PrizeListComponent,
    PrizeDrawAddComponent,
    PrizeDrawPageComponent,
    PrizeCategoryListComponent,
    PrizeDrawLeaderComponent,
    PrizeDrawExpiryComponent,
    PrizeDrawPrizeComponent,
    PrizeDrawUserListComponent,
    PrizeDrawUserEntryComponent,
    PrizeDrawEntryInputComponent,
    ConfirmDialogComponent,
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
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
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
