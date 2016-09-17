import { browser, element, by } from 'protractor/globals';

export class HsrPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hsr-root h1')).getText();
  }
}
