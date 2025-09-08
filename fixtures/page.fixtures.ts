import { test as base } from '@playwright/test';
import { NavigationPage } from '../pages/navigation.page';
import { FormLayoutsPage } from '../pages/formLayouts.page';
import { DatePickerPage } from '../pages/datePicker.page';

//declare the type of your fixtures
type MyFixtures =
{
  navigateTo: NavigationPage;
  onFormLayoutsPage: FormLayoutsPage;
  onDatePickerPage: DatePickerPage;

}

//car --> extend exhaust 


export const test = base.extend<MyFixtures>({
  navigateTo: async ({page}, use) =>
  {
    await use(new NavigationPage(page))
  },
  onFormLayoutsPage: async ({page}, use) =>
  {
    await use(new FormLayoutsPage(page))
  },  onDatePickerPage: async ({page}, use) =>
  {
    await use(new DatePickerPage(page))
  }

})
export { expect } from '@playwright/test';