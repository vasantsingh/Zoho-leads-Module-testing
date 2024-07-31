import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',
    timeout: 1000000,
    use: {
        browserName: 'chromium',
        headless: true,
        baseURL: 'https://www.zoho.com/en-in/crm/',
        trace: 'on',
        actionTimeout: 70000, 
        screenshot: 'only-on-failure',
        navigationTimeout: 80000,
    },
    fullyParallel:false,
    reporter:[
        ['list'],['html',{open:'always'}]
    ],
    projects: [
        {
            name: 'Desktop Chrome',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});
