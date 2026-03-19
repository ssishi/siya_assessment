import { test, expect } from '@playwright/test';

/**
 * landing.spec.ts
 * Landing Page UI Tests — TC01, TC08, TC17
 * TC08 uses test.fail() — known defect D008 (page title typo).
 */

test.describe('Landing Page UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
  });

  // TC01 — Input field is visible on page load
  test('TC01 - Input box is visible on landing page', async ({ page }) => {
    await expect(page.locator('#number')).toBeVisible();
  });

  // TC01 — Calculate button is visible on page load
  test('TC01 - Calculate button is visible on landing page', async ({ page }) => {
    await expect(page.locator('#getFactorial')).toBeVisible();
  });

  // TC01 — All footer hyperlinks are present and visible
  test('TC01 - All footer hyperlinks are visible', async ({ page }) => {
    await expect(page.getByText('About')).toBeVisible();
    await expect(page.getByText('Terms and Conditions')).toBeVisible();
    await expect(page.getByText('Privacy')).toBeVisible();
  });

  // TC01 — Copyright notice is visible
  test('TC01 - Copyright message is visible', async ({ page }) => {
    await expect(page.locator('text=© Qxf2 Services')).toBeVisible();
  });

  // TC08 — DEFECT D008: Page title reads "Factoriall" (double 'l') instead of "Factorial"
  // test.fail() marks this as a known expected failure — it will pass once D008 is fixed
  test('TC08 - Page title should read "Factorial" [Defect D008 - typo "Factoriall"]', async ({ page }) => {
    test.fail(); // Expected failure: D008 — remove once defect is fixed
    await expect(page).toHaveTitle('Factorial');
  });

  // TC17 — Page resets to empty state after browser refresh
  test('TC17 - Page resets correctly after browser refresh', async ({ page }) => {
    await page.fill('#number', '5');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('120');
    await page.reload();
    await expect(page.locator('#number')).toHaveValue('');
  });

});