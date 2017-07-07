import { PPage } from './app.po';

describe('p App', () => {
  let page: PPage;

  beforeEach(() => {
    page = new PPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
