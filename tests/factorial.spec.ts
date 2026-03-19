import { test, expect } from '@playwright/test';

/**
 * factorial.spec.ts
 * Core Calculation Tests — TC02, TC03, TC04, TC05, TC11, TC20
 * All tests in this file PASS — these features work correctly.
 */

test.describe('Factorial App - Core Calculation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
  });

  // TC02 — App correctly calculates 5! = 120
  test('TC02 - Factorial of a positive integer (5 = 120)', async ({ page }) => {
    await page.fill('#number', '5');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('120');
  });

  // TC03 — App correctly returns 0! = 1
  test('TC03 - Factorial of zero (0 = 1)', async ({ page }) => {
    await page.fill('#number', '0');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('1');
  });

  // TC04 — App correctly returns 1! = 1
  test('TC04 - Factorial of one (1 = 1)', async ({ page }) => {
    await page.fill('#number', '1');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('1');
  });

  // TC05 — App correctly calculates 10! = 3628800
  test('TC05 - Factorial of 10 (= 3628800)', async ({ page }) => {
    await page.fill('#number', '10');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('3628800');
  });

  // TC11 — App produces a non-empty result for input 100
  test('TC11 - Factorial of 100 produces a non-empty result', async ({ page }) => {
    await page.fill('#number', '100');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).not.toBeEmpty();
  });

  // TC20 — App displays Infinity for inputs >= 171 (overflow handled)
  test('TC20 - Overflow: factorial of 171 displays Infinity', async ({ page }) => {
    await page.fill('#number', '171');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('Infinity');
  });

});