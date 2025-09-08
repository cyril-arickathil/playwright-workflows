import {Page, expect} from '@playwright/test';

export class BasePage
{
  readonly page: Page;

  constructor(page: Page) 
  {
    this.page = page;
  }

  //set timeout
  async waitForNumberOfSeconds(timeInSeconds: number)
  {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }


}