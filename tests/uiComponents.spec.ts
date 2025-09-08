import { test, expect } from "@playwright/test";


test.beforeEach(async ({page}) =>
{
  await page.goto("http://localhost:4200/pages/iot-dashboard");
 
})

test.describe('Suite 1', ()=>
{
  test.describe.configure({retries: 2, mode: "serial"}); //override the retries for this suite
  test.beforeEach( async({page})=>
  {
    //  await page.getByText('Forms').click();
    // await page.getByText('Form Layouts').click();

  })
  test('input fields', async ({page})=>
  {
      const emailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"});
      await emailInput.fill('user@test.com');
      // user@test.com
      await emailInput.clear();

      await emailInput.pressSequentially('user@test.com', {delay: 1000});

  })
  test('radio component', async ({page})=>
  {
    //type=radio
    const radioButton = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('radio', {name: "Option 1"});
    radioButton.click({force:true});
// <label>
        const radioButtonByLabel = page.locator('nb-card', {hasText: "Using the Grid"}).getByLabel('Option 2')
radioButtonByLabel.click();

// const radioStatus = await radioButton.isChecked();
// //true  --

// //false is not to true
// expect(radioStatus).toBeFalsy();

await expect(radioButton).toBeChecked();  //best way


  })
  test('checkbox', async ({page})=>
  {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    //await page.getByRole('checkbox', {name : "Hide on click"}).click({force:true});

    const hideCheck = page.getByRole('checkbox', {name : "Hide on click"});
    
    //.check --> will
    await page.getByRole('checkbox', {name : "Hide on click"}).check({force:true});

    await page.getByRole('checkbox', {name : "Hide on click"}).uncheck({force:true});

  })
test('list and dropdown handling', async ({page})=>
{
  const dropDownMenu =
  page.locator('ngx-header nb-select');
  await dropDownMenu.click();

  page.getByRole('list')   //<ul> this referes to list
  page.getByRole('listitem')  //<li> this referes to list items

const MyList = page.getByRole('list', {name: 'productList'}) ;
const item1 = MyList.getByRole('listitem', {name : 'item1'})

  const optionList = page.locator('nb-option-list nb-option');
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

  await optionList.filter({hasText:"Cosmic"}).click();

  const header = page.locator('nb-layout-header')
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

  const colors =
  {
    "Light": "rgb(255, 255, 255)",
    "Dark": "rgb(34, 43, 69)",
     "Cosmic": "rgb(50, 50, 89)", 
     "Corporate": "rgb(50, 50, 89)"

  }

  await dropDownMenu.click();
  for(const color in colors)
  {
    await optionList.filter({hasText:color}).click();
    await expect(header).toHaveCSS('background-color', colors[color]);
    await dropDownMenu.click();

  }


  //34,43,69 for dark
  //


})

test('handling tool tips', async ({page})=>
{
  await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    await page.getByRole('button', {name: 'Top'}).hover();
   // page.getByRole('tooltip')
const tooltip = await page.locator('nb-tooltip').textContent();
expect(tooltip).toEqual('This is a tooltip123')
    //nb-tooltip

})

test('dialog box', async ({page, context})=>
{
   await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table ').click();

    page.on('dialog', dialog =>
    {
      expect(dialog.message()).toEqual('Are you sure you want to delete?')
      dialog.accept()
    }
    )
    context.waitForEvent('page')

    //<table
    //<tr row
    await page.getByRole('table').locator('tr', {hasText: '@ann'}).locator('.nb-trash').click();
//await page.getByRole('table').locator('tr', {hasText: '@ann'}).locator('[class="nb-trash"]').click();
    //playwright in background would dismiss by default
})

test('web tables handle', async ({page}) =>
{
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();
//<tr
  const targetRow = page.getByRole('row', {name: "fat@yandex.ru"});
  await targetRow.locator('.nb-edit').click();

  //edit the age against selected row
  await page.locator('input-editor').getByPlaceholder('age').clear();
  await page.locator('input-editor').getByPlaceholder('age').fill('25');
  await page.locator('.nb-checkmark').click();

  //get row based on value in columns
  await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
  const targetRowById = page.getByRole('row', {name: "12"}).filter({has: page.locator('td').nth(1).getByText("12")});
  await targetRowById.click();

  //locate any row 
  //edit and update email 
  //verify email update is working

  //test filters for the table

  const ages = ["20", "30", "40", "200"]

  for(let age of ages)
  {
    if(age === "200")
      {
      await page.locator('input-filter').getByPlaceholder('age').clear();
      await page.locator('input-filter').getByPlaceholder('age').fill(age);
      await page.waitForTimeout(1_000); //1000ms is 1 sec
      const noData = page.getByText('No data found');
      await expect(noData).toBeVisible();
      continue;
      }
    await page.locator('input-filter').getByPlaceholder('age').clear();
    await page.locator('input-filter').getByPlaceholder('age').fill(age);
    await page.waitForTimeout(1_000); //1000ms is 1 sec
    const ageRows = page.locator('tbody tr')

    for (let row of await ageRows.all())
    {
      const cellValue = await row.locator('td').last().textContent();
      expect(cellValue).toEqual(age)
    }

  }



})
test('date picker', async ({page}) =>
{
 await page.getByText('Forms').click();
 await page.getByText('Datepicker').click();

 const calenderInputField = page.getByPlaceholder('Form Picker');
  await calenderInputField.click();

  let date = new Date(); //by js
  date.setDate(date.getDate() + 1);
  const expectedDate = date.getDate().toString();
  const expectedMonth = date.toLocaleString('En-US', {month: 'short'});
  const expectedYear = date.getFullYear().toString();
//Aug 1, 2025
//25
  const dateAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`;


  //August
  //Aug

  await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click();
  await expect(calenderInputField).toHaveValue(dateAssert);
  //Aug 1, 2025
}
)

test('sliders componenet ', async ({page}) =>
{ 
  const tempGuage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
  await tempGuage.evaluate(node =>
  {
    node.setAttribute('cx', '232.63098833543773');
    node.setAttribute('cy', '232.6309883354377');
  })
  await tempGuage.click();

  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
  await tempBox.scrollIntoViewIfNeeded();
const box = await tempBox.boundingBox();  //300x300 pixel
//finding midpoint of the box
const x =  box.width / 2;  //150  0
const y =  box.height / 2; //150  0

await page.mouse.move(x, y);
await page.mouse.down();

await page.mouse.move(x - 25, y);
await page.mouse.move(x - 25, y + 100);
await page.mouse.up();


})















})