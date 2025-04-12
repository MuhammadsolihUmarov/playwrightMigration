import { defineConfig, devices } from '@playwright/test';
import RPconfig from "./reportportal.config";

export default defineConfig({
    testDir: './src/tests',
    timeout: 30000,
    workers: 11,
    expect: {
        timeout: 5000,
        toMatchSnapshot: {
            maxDiffPixels: 50,
        },
    },
    fullyParallel: true,
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'results/junit-results.xml' }],
        ['@reportportal/agent-js-playwright', RPconfig],
    ],
    use: {
        baseURL: 'https://cloud.google.com',
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        headless: false
    },
    projects: [
        {
            name: 'Mobile Chrome',
            use: {
                ...devices['iPhone 13'],
                browserName: 'chromium',
            },
        },
        {
            name: 'Tablet Chrome',
            use: {
                ...devices['iPad (gen 7) landscape'],
                browserName: 'chromium',
            },
        },
        // {
        //     name: 'chromium',
        //     use: { ...devices['Desktop Chrome'] },
        // },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },
    ],
});
