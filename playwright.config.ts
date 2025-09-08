import { defineConfig, devices } from '@playwright/test';
import path from 'path';
// import globalSetup from './global.setup';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';

// dotenv.config({ path: path.resolve(__dirname, '.env') });  //
// console.log(`The API Token is ${process.env.API_TOKEN}`);

// dotenv.config({ path: path.resolve(__dirname, `env/.env.${process.env.ENV}`) });  //
// console.log(`${process.env.URL}`);

const SERVER_PATH = path.resolve(__dirname, '../pw-practice-app');
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: './global.setup',
  globalTimeout: process.env.CI ? 1*60*60_000 : undefined, //(set for 1 hour)
  //by default 30secs is the timeout
  timeout: 30_000, //10000 or 1000*10
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI 2 times when running locally retry 1 time */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. and locally utilise 4 workers */
  workers: process.env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ["allure-playwright"]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    video: {
      mode : 'on',
      size: { width: 640, height: 480 }
    },
    // proxy:
    // {
    //   //server: 'http://username:password@ipaddress:port'
    //   username: '',
    //   password: '',
    //   server: ''
    // }

  },

  //1080p HD resolution

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] , video: 'on',},
      fullyParallel: true,
    },
    {
      name: 'auth:users',
      testMatch: /.*auth\.test\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'https://thinking-tester-contact-list.herokuapp.com' }

    },
     {
      name: 'API',

      use: { ...devices['Desktop Chrome'], baseURL: 'https://thinking-tester-contact-list.herokuapp.com',
        extraHTTPHeaders: 
        {
          'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
       },
       dependencies: ['auth:users'],
      testDir: './tests/api',
    },
    {
      name: 'QA',

      use: { ...devices['Desktop Chrome'], baseURL: 'https://qa.thinking-tester-contact-list.herokuapp.com',
        storageState: '.auth/authuser.json',
        extraHTTPHeaders: 
        {
          'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
       },
       dependencies: ['auth:users'],
      testDir: './tests/api',
    },
        {
      name: 'staging',

      use: { ...devices['Desktop Chrome'], baseURL: 'https://staging.thinking-tester-contact-list.herokuapp.com',
        extraHTTPHeaders: 
        {
          'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
       },
       dependencies: ['auth:users'],
      testDir: './tests/api',
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: `cd ${SERVER_PATH} && npm start`,
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    timeout: 5 * 60_1000   //5 minutes (1000ms = 1sec , 1000*60=60secs(1min))
  },
});
