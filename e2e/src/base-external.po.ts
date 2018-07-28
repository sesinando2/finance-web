import {BasePage} from "./base.po";
import {browser, ExpectedConditions} from "protractor";

export abstract class BaseExternalPage extends BasePage {

  isCurrent(): void {
    let urlConditionMatches = ExpectedConditions.urlIs(this.url);
    browser.wait(urlConditionMatches, 5000, 'URL should match ' + this.url);
  }
}
