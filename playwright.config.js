// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    fullyParallel: true,
    reporter: [['list'], ['allure-playwright']],
    use: {
        baseURL: 'https://cloud.google.com',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        headless: false,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
