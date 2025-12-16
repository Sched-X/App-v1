// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, 'e2e.env') });

export default defineConfig({
  testDir: './tests',

  timeout: 30000,
  expect: { timeout: 5000 },

  // Global setup file
  // globalSetup: './global-setup.ts',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 2,

  reporter: [
    ['list'],

    [
      'html',
      {
        open: 'never',
        outputFolder: path.resolve(__dirname, 'test-results/html'),
      },
    ],

    [
      'monocart-reporter',
      {
        outputFile: path.resolve(__dirname, 'test-results/monocart/index.html'),
      },
    ],

    [
      'allure-playwright',
      {
        resultsDir: path.resolve(__dirname, 'test-results/allure-results'),
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://natours-abishek-9cbc3fa443ff.herokuapp.com/',
    trace: process.env.CI ? 'on-first-retry' : 'on',
    screenshot: 'on',
    video: 'on',
    headless: true,
    // Default storage state for ALL tests
    // storageState: 'e2e/.auth/user.json',
  },

  // Projects also implicitly use storageState
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 13'],
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
      },
    },
  ],

  outputDir: path.resolve(__dirname, 'test-results/artifacts'),
});
