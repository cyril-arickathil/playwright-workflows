import {test, expect} from '@playwright/test';

const authFile = ".auth/authuser.json";

test.describe('check with storage state', ()=>
{
    test.use({ storageState: authFile });
    test.beforeEach(async ({page})=>
    {
        await page.goto('https://practicesoftwaretesting.com/admin/dashboard'); 
    })
    test('check storage test 1', async ({page})=>
    {
      expect.soft(page.locator('text=Contact List')).toBeVisible();
      expect.soft(page.locator('#logout')).toBeVisible();
    });

});