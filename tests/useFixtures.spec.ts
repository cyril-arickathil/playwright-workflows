import { test , expect } from '../fixtures/page.fixtures';

test('env check @TC01', async({ page })=>
{
  console.log(`${process.env.ENV}`);
  console.log(`${process.env.URL}`);
})

test('test using fixtures', async({ page, navigateTo, onFormLayoutsPage, onDatePickerPage })=>
{
  await navigateTo.smartTableMenuItem.click();

   await navigateTo.formLayoutsPage();
 await onFormLayoutsPage.submitUsingTheGridForm('randomEmail', 'randomPassword', 'Option 2');
 await onFormLayoutsPage.submitUsingInlineForm('firstname lastname', 'user@test.com', true);
 await page.screenshot({path: 'screenshots/formsubmit.png'});


 await navigateTo.DatePickerPage();
await onDatePickerPage.selectCommonDatePickerDateFromToday(3);
})


test('test using fixtures - date picker', async({ navigateTo, onDatePickerPage })=>
{
  await navigateTo.DatePickerPage();
await onDatePickerPage.selectCommonDatePickerDateFromToday(3);
})

test('test using fixtures - navigation', async({ page,navigateTo })=>
{
  await test.step('Navigate to form layout page', async () => {
    await page.goto('http://localhost:4200/pages/iot-dashboard');
  await navigateTo.formLayoutsPage();
  })
  await test.step('Navigate to date picker page', async () => {
      await navigateTo.DatePickerPage();
  })
  await test.step('Navigate to smart table page', async () => {
  await navigateTo.smartTablePage();
  await expect(page.locator('ngx-smart-table nb-card-header'), {message: 'check whether Smart Table text shown as heading'})
  .toHaveText('Smart Tables');
  })
})