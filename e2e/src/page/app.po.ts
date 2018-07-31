import {by, element} from 'protractor';
import {BasePage} from "./base.po";

export class AppPage extends BasePage {

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  get url() {
    return '/dashboard';
  }
}
