import { test, expect } from '@playwright/test';

/**
 * navigationTests.spec.ts
 * Navigation & Browser History Tests — TC13, TC14, TC15, TC16
 *
 * TC13 PASSES  — About link works correctly
 * TC14 FAILS   — Defect D002: Terms link goes to /privacy instead of /terms
 * TC15 FAILS   — Defect D003: Privacy link goes to /terms instead of /privacy
 * TC16 FAILS   — Defect D006: Browser forward goes to wrong page
 */

test.describe('Navigation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
  });

  // TC13 — About link correctly navigates to /about
  test('TC13 - About link navigates to /about page', async ({ page }) => {
    await page.click('text=About');
    await expect(page).toHaveURL('https://qainterview.pythonanywhere.com/about');
  });

  // TC14 — DEFECT D002: "Terms and Conditions" href is swapped — navigates to /privacy
  // Expected: /terms | Actual: /privacy
  // test.fail() marks this as a known expected failure — will pass once D002 is fixed
  test('TC14 - Terms and Conditions link should navigate to /terms [Defect D002]', async ({ page }) => {
    test.fail(); // Expected failure: D002 — remove once defect is fixed
    await page.click('text=Terms and Conditions');
    await expect(page).toHaveURL('https://qainterview.pythonanywhere.com/terms');
  });

  // TC15 — DEFECT D003: "Privacy" href is swapped — navigates to /terms
  // Expected: /privacy | Actual: /terms
  // test.fail() marks this as a known expected failure — will pass once D003 is fixed
  test('TC15 - Privacy link should navigate to /privacy [Defect D003]', async ({ page }) => {
    test.fail(); // Expected failure: D003 — remove once defect is fixed
    await page.click('text=Privacy');
    await expect(page).toHaveURL('https://qainterview.pythonanywhere.com/privacy');
  });

  // TC16 — DEFECT D006: Browser forward after calculation lands on Terms page
  // Expected: returns to result page | Actual: navigates to Terms & Conditions
  // test.fail() marks this as a known expected failure — will pass once D006 is fixed
  test('TC16 - Browser forward should return to result page [Defect D006]', async ({ page }) => {
    test.fail(); // Expected failure: D006 — remove once defect is fixed
    await page.fill('#number', '5');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('120');
    await page.goBack();
    await page.goForward();
    await expect(page).toHaveURL('http://qainterview.pythonanywhere.com/');
  });

});