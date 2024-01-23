import { Component, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { AuthService } from 'src/app/service/auth.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-navbar-user-account',
  templateUrl: './navbar-user-account.component.html',
  styleUrls: ['./navbar-user-account.component.scss'],
})
export class NavbarUserAccountComponent implements OnInit, OnDestroy{
  userId: any;
  currentPath?: string;
  userProfile: UserProfile | null = null; 
  userProfile$?: Observable<UserProfile | null>;
  showAlertBox: boolean = false;
  isLoggedIn = false;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscriptions.add(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.fetchUserProfile();
        })
    );
    
    this.isLoggedIn = await this.authService.isLoggedIn();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchUserProfile(): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getUserProfile();
  
    this.userProfile$.subscribe(user => {
      this.userProfile = user;
    if(this.userProfile?.userId){
      this.fetchProfileImage(this.userProfile?.userId); 
    }
  });
  }

  fetchProfileImage(userId: number) {
    this.userProfileService.getPhoto().subscribe(blob => {
      this.displayProfileImage(blob);
    });
  }

  displayProfileImage(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const circle = document.querySelector('#account-image') as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      circle.style.backgroundSize = 'cover';
      circle.style.backgroundPosition = 'center';
    }
  }

  onLogin(){
    this.router.navigate(["/login"]);
  }

  onLogout(){
    this.authService.logout();
    this.closeAlertBox();
  }
  
  onUserProfileEdit() {
    this.router.navigate(['/user-profile/edit/', this.userProfile?.userId]);
    this.showAlertBox = false;
  }

  onCancel(){
    this.closeAlertBox();
  }

  openAlertBox() {
    this.showAlertBox = true;
  }

  closeAlertBox() {
    this.showAlertBox = false; 
  }

  
}
