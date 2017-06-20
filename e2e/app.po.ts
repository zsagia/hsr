import { browser, by, element } from 'protractor';

export class PageFrame {

  loginButton = element(by.xpath('//a[@href=\'/login\']'));
  logoutButton = element(by.id('logout_button'));
  submitButton = element(by.xpath('//button[@type=\'submit\']'));

  passwordField = element(by.id('password'));
  emailField = element(by.id('email'));

  navigateTo() {
    return browser.get('/');
  }
}
