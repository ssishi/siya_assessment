import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {

  test('TC About link', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
    const currentUrl = page.url();
    await page.click('text=About');
    await expect(page).not.toHaveURL(currentUrl);
  });

  test('TC Terms link', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
    const currentUrl = page.url();
    await page.click('text=Terms and Conditions');
    await expect(page).not.toHaveURL(currentUrl);
  });

  test('TC Privacy link', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
    const currentUrl = page.url();
    await page.click('text=Privacy');
    await expect(page).not.toHaveURL(currentUrl);
  });

});