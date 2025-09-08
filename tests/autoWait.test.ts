import { test, expect } from "@playwright/test";


//spec.ts or test.ts

test.beforeEach(async ({page}) =>
{
  await page.goto("http://www.uitestingplayground.com/ajax");
  await page.locator('#ajaxButton').click();
})


test('auto wait', async ({page})=>
{
  const successButton = page.locator('.bg-success');
  //await successText.click();
  const text = await successButton.textContent();

  await expect(successButton).toBeVisible();

  expect(text).toContain('something');

  //ideally 15 secs required
  await expect(successButton).toHaveText('some condition', {timeout: 20_000})


  //click () 60 secs

})

