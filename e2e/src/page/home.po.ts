import {BasePage} from "./base.po";
import {by, element, ElementFinder} from "protractor";

export class HomePage extends BasePage {

  get url() {
    return '/home';
  }

  get signInButton(): ElementFinder {
    return element(by.buttonText('Sign in'))
  }
}
