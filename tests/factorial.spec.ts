import { test, expect } from '@playwright/test';

test.describe('Factorial App - Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
  });

  test('TC Factorial of 5', async ({ page }) => {
    await page.fill('#number', '5');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('120');
  });

  test('TC Factorial of 0', async ({ page }) => {
    await page.fill('#number', '0');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('1');
  });

  test('TC Negative number validation', async ({ page }) => {
    await page.fill('#number', '-5');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).not.toContainText('120');
  });

  test('TC Text input validation', async ({ page }) => {
    await page.fill('#number', 'abc');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).not.toBeEmpty();
  });

  test('TC Empty input validation', async ({ page }) => {
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).not.toBeEmpty();
  });

});