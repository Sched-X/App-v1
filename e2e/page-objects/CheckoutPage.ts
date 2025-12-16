import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Locators
  private header = () => this.page.locator('h1');
  private confirmButton = () => this.page.locator('#confirm');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/checkout');
  }

  async expectCheckoutVisible(): Promise<void> {
    await expect(this.header()).toHaveText('Checkout');
  }

  async confirmOrder(): Promise<void> {
    await this.confirmButton().click();
  }
}



