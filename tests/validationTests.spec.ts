import { test, expect } from '@playwright/test';

/**
 * validationTests.spec.ts
 * Input Validation Tests — TC06, TC07, TC08, TC09, TC10, TC12
 *
 * TC07 PASSES  — Decimal input triggers an error (app handles this correctly)
 *                NOTE: Defect D005 is about the error message being vague, not
 *                about the error being absent. The test PASSES because an error
 *                IS shown. D005 is a UX improvement, not a functional blocker.
 * TC08 PASSES  — Non-numeric input triggers correct error
 * TC09 PASSES  — Empty input triggers correct error
 * TC10 PASSES  — Special characters trigger correct error
 * TC06 FAILS   — Defect D004: Negative input shows no error
 * TC12 FAILS   — Defect D001: Whitespace input not trimmed
 */

test.describe('Input Validation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
  });

  // TC06 — DEFECT D004: Negative input is not validated — no error shown
  // Expected: error message displayed | Actual: previous result remains, no error
  // test.fail() marks this as a known expected failure — will pass once D004 is fixed
  test('TC06 - Negative input should show an error message [Defect D004]', async ({ page }) => {
    test.fail(); // Expected failure: D004 — remove once defect is fixed
    await page.fill('#number', '-5');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  // TC07 — PASS: Decimal input correctly triggers an error message
  // NOTE: Defect D005 is about the error message being vague — it says
  // "Please enter an integer" instead of something more specific like
  // "Please enter a whole number". However, an error IS shown, so this
  // test correctly PASSES. D005 is a UX improvement defect, not a blocker.
  test('TC07 - Decimal input (5.5) triggers an error message', async ({ page }) => {
    await page.fill('#number', '5.5');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  // TC08 — Non-numeric input correctly triggers error message
  test('TC08 - Non-numeric input (abc) shows error message', async ({ page }) => {
    await page.fill('#number', 'abc');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  // TC09 — Empty input correctly triggers error message
  test('TC09 - Empty input shows error message', async ({ page }) => {
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  // TC10 — Special characters correctly trigger error message
  test('TC10 - Special characters (@#$) show error message', async ({ page }) => {
    await page.fill('#number', '@#$');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  // TC12 — DEFECT D001: Whitespace-padded input " 5 " is not trimmed
  // Expected: trims whitespace and returns 120 | Actual: shows error message
  // test.fail() marks this as a known expected failure — will pass once D001 is fixed
  test('TC12 - Whitespace input " 5 " should be trimmed and return 120 [Defect D001]', async ({ page }) => {
    test.fail(); // Expected failure: D001 — remove once defect is fixed
    await page.fill('#number', ' 5 ');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('120');
  });

});