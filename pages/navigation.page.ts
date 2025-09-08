import {Locator, Page} from '@playwright/test';
import { BasePage } from './base.page';

export class NavigationPage extends BasePage
  {
    readonly formLayoutsMenuItem: Locator;
    readonly datePickerMenuItem: Locator;
    readonly toolTipMenuItem: Locator;
    readonly smartTableMenuItem: Locator;

    constructor(page: Page) 
    {
      super(page);
      this.formLayoutsMenuItem = page.getByText('Form Layouts');
      this.datePickerMenuItem = page.getByText('Datepicker');
      this.toolTipMenuItem = page.getByText('Tooltip');
      this.smartTableMenuItem = page.getByText('Smart Table');

    }
    async formLayoutsPage()
    {
      await this.selectMenu('Forms');
      await this.formLayoutsMenuItem.click();
    }
    async DatePickerPage()
    {
      await this.selectMenu('Forms');
      await this.datePickerMenuItem.click();
    }
    async ToolTipPage()
    {
      await this.selectMenu('Modal & Overlays');
      await this.toolTipMenuItem.click();
    }
    async smartTablePage()
    {
      await this.selectMenu('Tables & Data');
      await this.smartTableMenuItem.click();
    }
//accessibility
    private async selectMenu(menuItem: string) //Forms
    {
      const menu = this.page.getByTitle(menuItem);
      const isExpanded = await menu.getAttribute('aria-expanded');
      if (isExpanded === 'false') 
      {
        await menu.click();
      }
    }
  }