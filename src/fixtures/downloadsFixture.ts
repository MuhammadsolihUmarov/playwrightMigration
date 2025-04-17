import { test as base, expect } from '@playwright/test';
import { DownloadHelper } from '../utils/downloadHelper';
import * as path from "path";

type DownloadsFixture = {
    downloadsPath: string;
};

export const test = base.extend<DownloadsFixture>({
    downloadsPath: async ({}, use) => {
        const downloadPath = path.resolve('./downloads');

        await DownloadHelper.cleanup(downloadPath); // Cleanup before test
        await use(downloadPath);
        await DownloadHelper.cleanup(downloadPath); // Cleanup after test
    }
});

export { expect };
