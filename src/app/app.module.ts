import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
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
import { GroupListComponent } from './components/user-groups/group-list/group-list.component';
import { GroupComponent } from './components/user-groups/group/group.component';
import { GroupCreateComponent } from './components/user-groups/group-create/group-create.component';
import { GroupsComponent } from './components/user-groups/groups/groups.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { AccountPageUserProfileComponent } from './components/account-page-user-profile/account-page-user-profile.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { MatLegacyChipsModule } from '@angular/material/legacy-chips';
import { UserTagBtnComponent } from './shared/components/user-tag-btn/user-tag-btn.component';
import { ViewCompetitionsComponent } from './components/competitions/view-competition/view-competition.component';
import { CompetitionCardComponent } from './components/competitions/competition-card/competition-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TagComponent } from './shared/components/tag/tag.component';
import { CreateCompetitionComponent } from './components/competitions/create-competition/create-competition.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { GroupFormComponent } from './components/user-groups/group-form/group-form.component';
import { GroupEditComponent } from './components/user-groups/group-edit/group-edit.component';
import { StopMousePropagationDirective } from './shared/directive/stop-mouse-propagation.directive';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewEventComponent } from './components/events/view-event/view-event.component';
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
import { NotFoundPageComponent } from './components/error-pages/not-found-page/not-found-page.component';
import { BetsListComponent } from './components/bets-list/bets-list.component';
import { LoginAlertComponent } from './components/login-alert/login-alert.component';
import { MyGroupsComponent } from './components/sidebar/right-sidebar/my-groups/my-groups.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatListModule } from '@angular/material/list';
import { AddBetToEventComponent } from './components/events/add-bet-to-event/add-bet-to-event.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { IndexComponent } from './components/index/index.component';
import { BetsListComponent } from './components/bets-list/bets-list.component';
import { LoginAlertComponent } from './components/login-alert/login-alert.component';
import { ClickOutsideDirective } from './shared/directive/click-outside.directive';
import { AccessDeniedPageComponent } from './components/error-pages/access-denied-page/access-denied-page.component';
import { authInterceptor } from './interceptor/auth.interceptor';
import { BetTypeFormComponent } from './components/events/bet-type-form/bet-type-form.component';

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
    GroupListComponent,
    GroupComponent,
    GroupCreateComponent,
    GroupsComponent,
    CreateEventComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    UserProfileFormComponent,
    UserTagBtnComponent,
    CompetitionsComponent,
    AccountPageUserProfileComponent,
    UserTagBtnComponent,
    ViewCompetitionsComponent,
    CompetitionCardComponent,
    TagComponent,
    GroupFormComponent,
    GroupEditComponent,
    StopMousePropagationDirective,
    ViewEventComponent,
    SearchBarComponent,
    LeftSidebarListComponent,
    HideScrollbarDirective,
    RightSidebarComponent,
    AutocompleteComponent,
    AddBetToEventComponent,
    EditEventComponent,
    CreateCompetitionComponent,
    EventCardComponent,
    IndexComponent,
    BetsListComponent,
    LoginAlertComponent,
    LoginAlertComponent,
    MyGroupsComponent,
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
    CreateCompetitionComponent,
    EventCardComponent,
    IndexComponent,
    NotFoundPageComponent,
    BetsListComponent,
    LoginAlertComponent,
    ClickOutsideDirective,
    AccessDeniedPageComponent,
    BetTypeFormComponent,
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
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatAutocompleteModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
