import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {

  test('Verify Privacy link functionality', async ({ page }) => {

    await page.goto('http://qainterview.pythonanywhere.com');

    const currentUrl = page.url();

    await page.click('text=Privacy');

    // Check if URL changed
    await expect(page).not.toHaveURL(currentUrl);

  });

  test('Verify Terms link functionality', async ({ page }) => {

    await page.goto('http://qainterview.pythonanywhere.com');

    const currentUrl = page.url();

    await page.click('text=Terms and Conditions');

    await expect(page).not.toHaveURL(currentUrl);

  });

});