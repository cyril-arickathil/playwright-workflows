import { test, expect } from "@playwright/test";


test.beforeEach(async ({page}) =>
{
  //Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4200/pages/iot-dashboard Call log:  - navigating to "http://localhost:4200/pages/iot-dashboard", waiting until "load"
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
})

test('Locator syntaxes', async ({page}) =>
{

  //promises
  // promise outcome can be either fullfilled/dismissed

  //simple formula to handle promise

  //await 

  //by tag name
  await page.locator('input').click();

  //by ID #
  page.locator('#inputEmail1')

  //by class .
  page.locator('.size-medium')
  page.locator('[class="size-medium"]')

  //by attributes
  page.locator('[placeholder="Email"]')

  //by class value all values available
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  //by combination
  page.locator('input[placeholder="Email"]')

  //by xpath  -- not recommended
  page.locator('xpath=//*[@id="inputEmail1"]')

  //different
  page.getByPlaceholder
  page.getByRole
  page.getAttribute

})

//identify locator for password element in Using the Grid

test.skip('user facing locator', async ({page}) =>
{
 await page.getByRole('textbox', {name: "Email"}).first().click();
 await page.getByRole('button', {name:"Sign in"}).first().click();

 await page.getByLabel('Email').first().click();

 await page.getByPlaceholder('Jane Doe').click();

  await page.getByTitle('IoT Dashboard').click();

})

test('locating child elements', async ({page})=>
{
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

  await page.locator('nb-card').getByRole('button', {name: "Sign in"}).click();
})

test('locating parent elements', async ({page}) =>
{
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click();
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name:"Email"}).click();

  await page.locator('nb-card', {hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();

})

test('reusing the locators', async ({page}) =>
{
const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
const usingTheGrid = page.locator('nb-card').filter({hasText: "Using the Grid"});
const emailField = basicForm.getByRole('textbox', {name: "Email"});

    await emailField.fill('testuser@test.com');
    await basicForm.getByRole('textbox', {name: "Password"}).fill('secret123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click({force: true});

    //assertions
    await expect(emailField).toHaveValue('testuser@test.com')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
    console.log(allRadioButtonsLabels);
    expect(allRadioButtonsLabels).toContain('Option1');

})

test('assertions test', async ({page})=>
{
  //hard assertion 
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
  const basicFormButton =  basicForm.getByRole('button');
  //generic/general assertions
  const value = 21;
  expect(value).toEqual(21);
 // const text = basicFormButton.textContent();
  //expect(text).toEqual('submit');

//locator assertion
//sign in
  expect(basicFormButton).toHaveText('Submit');  //this pass
  //soft assertions
  await expect.soft(basicFormButton).toHaveText('something'); //this fail

  await expect.soft(basicFormButton).toHaveText('submit'); //this fail
})


test('extracting values', async({page}) =>
{
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
  const basicFormButton =  basicForm.getByRole('button');
  const buttonText = await basicFormButton.textContent();

  expect(buttonText).toEqual('Submit');


  expect(basicFormButton).toHaveText('')  //recommended way

})