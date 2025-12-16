import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Locators
  private header = () => this.page.locator('h1');
  private logoutButton = () => this.page.locator('#checkout');

  constructor(page: Page) {
    super(page);
  }

  async expectCartPageVisible(): Promise<void> {
    await expect(this.header()).toHaveText('Cart');
  }

  async checkout(): Promise<void> {
    await this.logoutButton().click();
  }
}
