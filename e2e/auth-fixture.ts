import { test as base } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';
import { DashboardPage } from './page-objects/DashboardPage';

type AuthFixtures = {
  dashboardPage: DashboardPage;
};

export const test = base.extend<AuthFixtures>({
  dashboardPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    const dashboardPage = await loginPage.login('abishek3622@gmail.com', 'admin@1234');

    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';
