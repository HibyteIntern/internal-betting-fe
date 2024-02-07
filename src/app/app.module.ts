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
import { GroupListComponent } from './components/user-groups/group-list/group-list.component';
import { GroupComponent } from './components/user-groups/group/group.component';
import { GroupCreateComponent } from './components/user-groups/group-create/group-create.component';
import { GroupsComponent } from './components/user-groups/groups/groups.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { HomeComponent } from './components/home/home.component';
import { AccountPageUserProfileComponent } from './components/account-page-user-profile/account-page-user-profile.component';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { LeftSidebarListComponent } from './components/sidebar/left-sidebar-list/left-sidebar-list.component';
import { HideScrollbarDirective } from './shared/directive/hide-scrollbar.directive';
import { RightSidebarComponent } from './components/sidebar/right-sidebar/right-sidebar.component';
import { AutocompleteComponent } from './shared/components/autocomplete/autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BetsListComponent } from './components/bets-list/bets-list.component';
import { LoginAlertComponent } from './components/login-alert/login-alert.component';
import { MyGroupsComponent } from './components/sidebar/right-sidebar/my-groups/my-groups.component';
import { IndexComponent } from './components/index/index.component';

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
    UserProfileComponent,
    UserProfileEditComponent,
    UserProfileFormComponent,
    UserTagBtnComponent,
    CompetitionsComponent,
    HomeComponent,
    AccountPageUserProfileComponent,
    UserTagBtnComponent,
    ViewCompetitionsComponent,
    CompetitionCardComponent,
    TagComponent,
    GroupFormComponent,
    GroupEditComponent,
    StopMousePropagationDirective,
    SearchBarComponent,
    LeftSidebarListComponent,
    HideScrollbarDirective,
    RightSidebarComponent,
    AutocompleteComponent,
    CreateCompetitionComponent,
    EventCardComponent,
    IndexComponent,
    BetsListComponent,
    LoginAlertComponent,
    LoginAlertComponent,
    MyGroupsComponent,
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
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
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
