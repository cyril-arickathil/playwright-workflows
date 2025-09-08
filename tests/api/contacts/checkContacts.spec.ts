import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';

const email = 'testcyril@fake.com';
const password = 'myPassword';
const authFile = ".auth/authuser.json";

test('sample test', async ({page, context})=>
{
  const randomEmail = faker.internet.email();
  console.log(`The random email is ${randomEmail}`);
    await page.goto('/');

    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('#submit').click();

    await context.storageState({path: authFile});
})
test('check storage test', async ({page, context})=>
{
  //admin@practicesoftwaretesting.com	welcome01
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.locator('#email').fill('admin@practicesoftwaretesting.com');
    await page.locator('#password').fill('welcome01');
    await page.locator('.btnSubmit').click();

    await context.storageState({path: authFile});
});

test('sample test 2', async ({page})=>
{
    await page.goto('/');

    expect.soft(page.locator('text=Contact List')).toBeVisible();
    expect.soft(page.locator('#logout')).toBeVisible();
})