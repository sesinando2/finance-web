import {environment} from "../../../../environments/environment"
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  get isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  get hasRefreshToken(): boolean {
    return Boolean(this.refreshToken);
  }

  get token(): string {
    return localStorage.getItem('access_token');
  }

  get refreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  get authorizationUrl(): string {
    let authorizationPath = `${environment.authenticationServer}/oauth/authorize`;

    let authParam = new URLSearchParams();
    authParam.set('response_type', 'code');
    authParam.set('client_id', environment.clientId);

    authorizationPath += `?${authParam}`;
    return authorizationPath;
  }

  authorizeUser(): void {
    window.location.href = this.authorizationUrl
  }

  logout(): void {
    localStorage.clear();
    localStorage.setItem('url', '/');
    window.location.href = `${environment.authenticationServer}/logout`;
  }

  getAndStoreToken(authorizationCode: string): Observable<Object> {
    let body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', authorizationCode);
    body.set('client_id', environment.clientId);

    return this.requestToken(body);
  }

  refreshExpiredToken(): Observable<Object> {
    if (!this.hasRefreshToken) return;

    let body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', this.refreshToken);

    localStorage.clear();
    return this.requestToken(body);
  }

  private requestToken(body: URLSearchParams): Observable<Object> {
    let headers = this.createHeaderForTokenRequest();

    return this.http
      .post(this.tokenPath, body.toString(), {headers: headers})
      .pipe(map(this.saveToken));
  }

  private saveToken(response: Object): Object {
    for (let key in response) {
      let value = response[key];
      localStorage.setItem(key, value);
    }

    return response;
  }

  private createHeaderForTokenRequest(): HttpHeaders {
    let username = environment.clientId;
    let password = environment.clientSecret;

    let headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return headers;
  }

  private get tokenPath(): string {
    return `${environment.authenticationServer}/oauth/token`;
  }
}
