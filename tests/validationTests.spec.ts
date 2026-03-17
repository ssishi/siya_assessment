import { test, expect } from '@playwright/test';

test.describe('Input Validation Tests', () => {

  test('Verify negative numbers are rejected', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
    await page.fill('#number','-5');
    await page.click('#getFactorial');

    await expect(page.locator('#resultDiv')).not.toContainText('120');
  });

  test('Verify alphabet characters are rejected', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
    await page.fill('#number','abc');
    await page.click('#getFactorial');

    await expect(page.locator('#resultDiv')).not.toContainText('Factorial');
  });

  test('Verify empty input validation', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
    await page.click('#getFactorial');

    await expect(page.locator('#resultDiv')).not.toBeEmpty();
  });

  test('Verify valid factorial calculation', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
    await page.fill('#number','5');
    await page.click('#getFactorial');

    await expect(page.locator('#resultDiv')).toContainText('120');
  });

  test('Verify factorial of 12', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
    await page.fill('#number','12');
    await page.click('#getFactorial');

    await expect(page.locator('#resultDiv')).toContainText('479001600');
  });

});