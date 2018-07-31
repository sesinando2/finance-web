import {browser} from "protractor";
import {AppPage} from "./page/app.po";
import {HomePage} from "./page/home.po";
import {LoginPage} from "./page/login.po";
import {AuthorizePage} from "./page/authorize.po";

describe('finance-web App', () => {

  let appPage: AppPage;
  let homePage: HomePage;

  let loginPage: LoginPage;
  let authorizePage: AuthorizePage;

  beforeEach(() => {
    appPage = new AppPage();
    homePage = new HomePage();
    loginPage = new LoginPage();
    authorizePage = new AuthorizePage();
  });

  it('should navigate to login appPage', () => {
    browser.waitForAngularEnabled(false);
    appPage.navigateTo();
    homePage.isCurrent();
    homePage.signInButton.click();
    loginPage.isCurrent();
  });

  it('should be able to login', () => {
    loginPage.username = 'admin';
    loginPage.password = 'Urub42q9bCyFBP7B';
    loginPage.loginButton.click();
    browser.waitForAngularEnabled(false);
    appPage.isCurrent();
  });
});
