import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../service/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.authService.logout();
    return true;
  }
}
