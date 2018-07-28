import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {AuthService} from "../../service/auth/auth.service";
import {Observable} from "rxjs/Observable";
import {catchError, concatMap} from "rxjs/operators";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.cloneWithAuthHeaders(req)).pipe(
      catchError((err, caught) => {
          if (this.shouldRefreshToken(err)) {
            return this.refreshToken(req, next);
          }

          return caught;
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  private shouldRefreshToken(err): boolean {
    return err instanceof HttpErrorResponse && err.status == 401 && this.authService.hasRefreshToken;
  }

  private refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService
      .refreshExpiredToken()
      .pipe(concatMap((res) => next.handle(this.cloneWithAuthHeaders(req))));
  }

  private cloneWithAuthHeaders(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({ headers: this.getHeaders(req.headers) });
  }

  private getHeaders(headers: HttpHeaders): HttpHeaders {
    if (this.authService.isAuthenticated) {
      return headers.set('Authorization', `Bearer ${this.authService.token}`);
    }

    return headers;
  }
}
