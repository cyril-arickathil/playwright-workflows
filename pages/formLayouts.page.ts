import {Page} from '@playwright/test';
import { BasePage } from './base.page';

export class FormLayoutsPage extends BasePage
{
  constructor(page: Page) 
  {
    super(page);
  }
  /**
   * 
   * @param email - The email to fill in the grid form
   * @param password - The password to fill in the grid form
   * @param optionText - The text of the radio option to select in the grid form
   */

  async submitUsingTheGridForm(email: string, password: string, optionText?: string)
  {
          const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"});

          await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email);
         await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password);
          await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true});
          await this.waitForNumberOfSeconds(2);
          await usingTheGridForm.getByRole('button', {name: "Sign in"}).click();
          //.getByRole('textbox', {name: "Email"});

  }
  /**
   * 
   * @param name - The name of user to fill in the inline form
   * @param email - The email of user to fill in the inline form
   * @param rememberMe - Whether to check the "Remember me" checkbox
   */
  async submitUsingInlineForm(name: string, email: string, rememberMe: boolean)
  {
          const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"});

          await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name);
          await inlineForm.getByRole('textbox', {name: "Email"}).fill(email);
          if (rememberMe)
          {
            await inlineForm.getByRole('checkbox', {name: "Remember me"}).check({force: true});
          }
  }

}