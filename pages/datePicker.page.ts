import {Page, expect} from '@playwright/test';
import { BasePage } from './base.page';

export class DatePickerPage extends BasePage
{

  constructor(page: Page) 
  {
    super(page);
  }

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number)
  {
    const calenderInputField = this.page.getByPlaceholder('Form Picker');
      await calenderInputField.click();
    
      let date = new Date(); //by js
      date.setDate(date.getDate() + numberOfDaysFromToday);
      const expectedDate = date.getDate().toString();
      const expectedMonth = date.toLocaleString('En-US', {month: 'short'});
      const expectedYear = date.getFullYear().toString();
    //Aug 1, 2025
    //25
      const dateAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`;
    
    
      //August
      //Aug
    
      await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click();
      await expect(calenderInputField).toHaveValue(dateAssert);
      //Aug 1, 2025
  }
}