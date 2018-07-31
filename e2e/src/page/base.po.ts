import {browser, ExpectedConditions} from "protractor";

export abstract class BasePage {

  navigateTo(): void {
    browser.get(this.url);
  }

  isCurrent(): void {
    let expectedUrl = this.baseUrl + this.url;
    let urlConditionMatches = ExpectedConditions.urlContains(expectedUrl);
    browser.wait(urlConditionMatches, 5000, 'URL should match ' + expectedUrl);
  }

  get baseUrl(): string {
    if (browser.baseUrl.endsWith('/')) {
      return browser.baseUrl.substr(browser.baseUrl.length - 2, 1);
    } else {
      return browser.baseUrl;
    }
  }

  abstract get url();
}
