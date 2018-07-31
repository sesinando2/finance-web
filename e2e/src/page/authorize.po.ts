import {LoginPage} from "./login.po";
import {BaseExternalPage} from "../base-external.po";
import {by, element, ElementFinder} from "protractor";
import {environment} from "../../../src/environments/environment.test";

export class AuthorizePage extends BaseExternalPage {

  navigateTo(): void {
    let loginPage = new LoginPage();
    loginPage.navigateTo();
    loginPage.username = 'admin';
    loginPage.password = environment.clientSecret;
    loginPage.loginButton.click();
  }

  get authorizeButton(): ElementFinder {
    return element(by.name('Authorize'));
  }

  get url() {
    return `${environment.authenticationServer}/oauth/authorize?response_type=code&client_id=${environment.clientId}`;
  }
}
