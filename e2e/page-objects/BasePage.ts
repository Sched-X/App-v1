import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async type(locator: string | Locator, value: string): Promise<void> {
    await this.get(locator).fill(value);
  }

  async click(locator: string | Locator): Promise<void> {
    await this.get(locator).click();
  }

  async assertVisible(locator: string | Locator): Promise<void> {
    await expect(this.get(locator)).toBeVisible();
  }

  protected get(locator: string | Locator): Locator {
    return typeof locator === 'string' ? this.page.locator(locator) : locator;
  }

  getPage(): Page {
    return this.page;
  }
}
