import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Injectable({
    providedIn: "root",
 })
 export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
 
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
       if (await this.authService.isLoggedIn()) {
          return true;
       } else {
          this.router.navigate([""]);
          return false;
       }
    }
 }
