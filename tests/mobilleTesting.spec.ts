import { test, expect } from "@playwright/test";

test('open url in mobile view', async ({page})=>
{
  await page.goto('https://www.amazon.com/');

})