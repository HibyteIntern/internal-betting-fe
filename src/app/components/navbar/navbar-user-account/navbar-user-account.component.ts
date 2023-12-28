import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { AuthService } from 'src/app/service/auth.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-navbar-user-account',
  templateUrl: './navbar-user-account.component.html',
  styleUrls: ['./navbar-user-account.component.scss'],
})
export class NavbarUserAccountComponent implements OnInit{

  userId: any;
  currentPath?: string;
  userProfile: UserProfile | null = null; 
  userProfile$?: Observable<UserProfile | null>;
  showAlertBox: boolean = false;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
   
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentPath = this.route.snapshot.firstChild?.routeConfig?.path || '';
      console.log('Current URL:', this.currentPath);

      let childRoute = this.route.firstChild;
      while (childRoute) {
        if (childRoute.snapshot.paramMap.get("id")) {
          this.userId = childRoute.snapshot.paramMap.get("id");
          this.fetchUserProfile(this.userId); 
          break;
        }
        childRoute = childRoute.firstChild;
      }
      console.log('userId:', this.userId);
      
      if(this.userId){
        this.userProfileService.getPhoto(this.userId).subscribe(blob => {
          console.log(blob);
          this.displayProfileImage(blob);
        });
      }

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

  fetchUserProfile(userId: number): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getById(userId);
  
    this.userProfile$.subscribe(user => {
      this.userProfile = user;
    console.log(this.userProfile);
  });

  }

  onLogout(){
    this.authService.logout();
    this.closeAlertBox();
  }
  
  onUserProfileEdit() {
  
    this.router.navigate(['/user-profile/edit/', this.userProfile?.userId]);
    this.showAlertBox = false;
  }

  openAlertBox() {

    this.showAlertBox = true;

  }

  closeAlertBox() {
  
    this.showAlertBox = false; 
  }

  
}
