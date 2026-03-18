import { test, expect } from '@playwright/test';

test.describe('Landing Page UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
  });

  test('Page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle(/Factoriall/);
  });

  test('Input box is present', async ({ page }) => {
    await expect(page.locator('#number')).toBeVisible();
  });

  test('Calculate! button is present', async ({ page }) => {
    await expect(page.locator('#getFactorial')).toBeVisible();
  });

  test('All hyperlinks are visible', async ({ page }) => {
    await expect(page.getByText('About')).toBeVisible();
    await expect(page.getByText('Terms and Conditions')).toBeVisible();
    await expect(page.getByText('Privacy')).toBeVisible();
  });

  test('Copyright message is visible', async ({ page }) => {
    await expect(page.locator('text=© Qxf2 Services')).toBeVisible();
  });


  test('Hyperlinks navigate correctly', async ({ page }) => {
  await page.click('text=About');
  await expect(page).not.toHaveURL('http://qainterview.pythonanywhere.com');

  await page.goto('http://qainterview.pythonanywhere.com'); // reset

  await page.click('text=Terms and Conditions');
  await expect(page).not.toHaveURL('http://qainterview.pythonanywhere.com');

  await page.goto('http://qainterview.pythonanywhere.com'); // reset

  await page.click('text=Privacy');
  await expect(page).not.toHaveURL('http://qainterview.pythonanywhere.com');
});

});