import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  // Locators
  private header = () => this.page.locator('h1');
  private logoutButton = () => this.page.locator('#logout');

  constructor(page: Page) {
    super(page);
  }

  async expectDashboardVisible(): Promise<void> {
    await expect(this.header()).toHaveText('Dashboard');
  }

  async logout(): Promise<void> {
    await this.logoutButton().click();
  }
}
