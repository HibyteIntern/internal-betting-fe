import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(err => {
      console.log(req)
      if(err.status === 401 && req.url !== environment.baseUrl + '/v1/user-profile/getMe') {
        authService.logout();
      } else if(err.status === 403) {
        router.navigate(['/denied']);
      }
      return throwError(() => err)
    })
  )
}
