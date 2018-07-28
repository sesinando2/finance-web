import {AppPage} from './app.po';
import {browser} from "protractor";
import {LoginPage} from "./login.po";
import {AuthorizePage} from "./authorize.po";

describe('finance-web App', () => {

  let appPage: AppPage;
  let loginPage: LoginPage;
  let authorizePage: AuthorizePage;

  beforeEach(() => {
    appPage = new AppPage();
    loginPage = new LoginPage();
    authorizePage = new AuthorizePage();
  });

  it('should navigate to login appPage', () => {
    browser.waitForAngularEnabled(false);
    appPage.navigateTo();
    loginPage.isCurrent();
  });

  it('should be able to login', () => {
    loginPage.username = 'admin';
    loginPage.password = 'Urub42q9bCyFBP7B';
    loginPage.loginButton.click();
    authorizePage.isCurrent();
    authorizePage.authorizeButton.click();
    browser.waitForAngularEnabled(false);
    appPage.isCurrent();
  });
});
