import {browser, by, element, ElementFinder} from "protractor";
import {BasePage} from "./base.po";
import {environment} from "../../src/environments/environment.test";

export class LoginPage extends BasePage {

  navigateTo() {
    browser.executeScript("window.localStorage.clear();");
    browser.get('/');
  }

  set username(value: string) {
    element(by.name('username')).sendKeys(value);
  }

  set password(value: string) {
    element(by.name('password')).sendKeys(value);
  }

  get loginButton(): ElementFinder {
    return element(by.buttonText('Sign in'))
  }

  isCurrent() {
    expect(browser.getCurrentUrl()).toEqual(this.url)
  }

  get url() {
    return `${environment.authenticationServer}/login`;
  }
}
