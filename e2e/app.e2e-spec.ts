import { browser, by, element } from 'protractor';
import { PageFrame } from './app.po';

describe('check App', () => {
  let page: PageFrame;

  beforeEach(() => {
    // browser.waitForAngularEnabled(false);
    page = new PageFrame();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.loginButton.getText()).toEqual('Login');

     // expect(page.isLogoutButtonDisplayed()).toBe(false);
    page.loginButton.click();

    page.emailField.sendKeys('markus.mohoritsch@gmx.at');
    page.passwordField.sendKeys('0meinemail.');
    page.submitButton.click();

    expect(page.logoutButton).toBeDefined();
    expect(element(by.binding('notPresent')).isPresent()).toBe(false);
  });

  // afterEach(() => {
  //   browser.manage().logs().get('browser').then(browserLog => {
  //     // expect(browserLog.length).toEqual(0);
  //     if (browserLog.length) {
  //       console.error('log: ' + JSON.stringify(browserLog));
  //     }
  //   });
  // });
});
