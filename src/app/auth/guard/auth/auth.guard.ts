import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../service/auth/auth.service";
import {Observable} from "rxjs/Rx";
import {map, catchError} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let authorizationCode = next.queryParams['code'];

    if (this.authService.isAuthenticated) {
      this.navigateToStoredUrl();
      return true;
    } else if (authorizationCode) {
      return this.retrieveTokenFrom(authorizationCode);
    } else {
      localStorage.setItem('url', state.url);
      this.authService.authorizeUser();
      return false;
    }
  }

  private navigateToStoredUrl(): void {
    let url = localStorage.getItem('url');

    if (url) {
      this.router.navigate([url]);
      localStorage.removeItem('url');
    }
  }

  private retrieveTokenFrom(authorizationCode: string): Observable<boolean> {
    return this.authService.getAndStoreToken(authorizationCode)
      .pipe(
        map(() => {
          this.navigateToStoredUrl();
          return true;
        }),
        catchError((err) => {
          console.log('Error occurred when getting token');
          throw err;
        })
      );
  }
}
