import { Page } from '@playwright/test';
import { urls, loginData } from './config';

export async function login(page: Page) {
    await page.goto(urls.base);
    await page.getByRole('link',{name:'SIGN IN'}).first().click()
    await page.getByPlaceholder('Email address or mobile number').fill(loginData.username)
    await page.getByRole("button",{name:'Next'}).click()
    await page.getByPlaceholder('Enter password').fill(loginData.password)
    await page.getByRole("button",{name:'Sign in'}).click()
    await page.getByRole("button",{name:"Skip for now"}).click()

    await page.waitForURL(urls.leads);
}

