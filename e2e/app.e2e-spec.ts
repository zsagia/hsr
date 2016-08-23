import { HsrPage } from './app.po';

describe('hsr App', function() {
  let page: HsrPage;

  beforeEach(() => {
    page = new HsrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
