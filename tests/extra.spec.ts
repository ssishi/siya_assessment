import { test, expect, devices } from '@playwright/test';

/**
 * extra.spec.ts
 * Edge Case & Responsiveness Tests — TC18, TC11-EXT, TC09-EXT, TC19
 *
 * TC18     PASSES — Mobile UI works correctly
 * TC11-EXT FAILS  — Defect D007: large numbers produce no feedback
 * TC09-EXT FAILS  — Defect D009: no maximum input length enforced
 * TC19     FAILS  — Defect D0019: no POST request sent to API
 */

test.describe('Edge Case & Responsiveness Tests', () => {

  // TC18 — UI is fully functional on iPhone 12 mobile viewport
  test('TC18 - UI is responsive and functional on mobile (iPhone 12)', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['iPhone 12'] });
    const page = await context.newPage();
    await page.goto('http://qainterview.pythonanywhere.com');
    await expect(page.locator('#number')).toBeVisible();
    await expect(page.locator('#getFactorial')).toBeVisible();
    await page.fill('#number', '5');
    await page.click('#getFactorial');
    await expect(page.locator('#resultDiv')).toContainText('120');
    await context.close();
  });

  // TC11-EXT — DEFECT D007: Input of 1000+ silently produces no result or error
  // Expected: graceful message or result | Actual: result div remains completely empty
  // test.fail() marks this as a known expected failure — will pass once D007 is fixed
  test('TC11-EXT - Input of 1000 should produce feedback or a result [Defect D007]', async ({ page }) => {
    test.fail(); // Expected failure: D007 — remove once defect is fixed
    await page.goto('http://qainterview.pythonanywhere.com');
    await page.fill('#number', '1000');
    await page.click('#getFactorial');
    const resultText = await page.locator('#resultDiv').textContent();
    expect(resultText?.trim().length).toBeGreaterThan(0);
  });

  // TC09-EXT — DEFECT D009: No maximum input length enforced
  // Expected: clear validation or limit | Actual: accepted silently with no feedback
  // test.fail() marks this as a known expected failure — will pass once D009 is fixed
  test('TC09-EXT - Extremely large input should be rejected or limited [Defect D009]', async ({ page }) => {
    test.fail(); // Expected failure: D009 — remove once defect is fixed
    await page.goto('http://qainterview.pythonanywhere.com');
    await page.fill('#number', '99999999');
    await page.click('#getFactorial');
    const resultText = await page.locator('#resultDiv').textContent();
    expect(resultText?.trim().length).toBeGreaterThan(0);
  });

  // TC19 — DEFECT D0019: No POST request is fired to the API when Calculate is clicked
  // Expected: POST request sent with input value | Actual: no API call made at all
  // test.fail() marks this as a known expected failure — will pass once D0019 is fixed
  test('TC19 - A POST request should be sent to the API on Calculate click [Defect D0019]', async ({ page }) => {
    test.fail(); // Expected failure: D0019 — remove once defect is fixed
    await page.goto('http://qainterview.pythonanywhere.com');

    let postRequestMade = false;
    page.on('request', request => {
      if (request.method() === 'POST') {
        postRequestMade = true;
      }
    });

    await page.fill('#number', '5');
    await page.click('#getFactorial');
    await page.waitForTimeout(1000);

    expect(postRequestMade).toBe(true);
  });

});