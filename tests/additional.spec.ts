import { test, expect } from '@playwright/test';

/**
 * part4.spec.ts
 * Part 4 — Additional Automation Tests (Separate from main suite)
 *
 * Scenario 1: Form validation styling
 * Scenario 2: Factorial of 12 with expected result
 * Scenario 3: API call verification — correct headers and parameters
 */

test.describe('Part 4 - Additional Automation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');
  });

  // ─── Scenario 1: Form Validation Styling ──────────────────────────────────
  // Verifies that when invalid input is submitted, the result div reflects
  // a visible error state — checking both content and computed styling.
  test('Scenario 1 - Form validation error message is visible and correctly styled', async ({ page }) => {
    // Submit with empty input to trigger validation
    await page.click('#getFactorial');

    const resultDiv = page.locator('#resultDiv');

    // Assert error message is present
    await expect(resultDiv).toContainText('Please enter an integer');

    // Assert the result div is visible to the user
    await expect(resultDiv).toBeVisible();

    // Assert the error text is not empty and has meaningful content
    const text = await resultDiv.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);

    // Assert font styling indicates an error state (non-default colour applied)
    const color = await resultDiv.evaluate(el =>
      window.getComputedStyle(el).color
    );
    // Error text should be styled differently from default black (rgb(0, 0, 0))
    expect(color).not.toBe('rgb(0, 0, 0)');
  });

  // ─── Scenario 2: Factorial of 12 ─────────────────────────────────────────
  // Verifies the app correctly calculates 12! = 479001600
  test('Scenario 2 - Factorial of 12 returns the correct result (479001600)', async ({ page }) => {
    await page.fill('#number', '12');
    await page.click('#getFactorial');

    // 12! = 479001600
    await expect(page.locator('#resultDiv')).toContainText('479001600');
  });

  // ─── Scenario 3: API Call Verification ───────────────────────────────────
  // Intercepts all network requests made when Calculate is clicked.
  // Verifies that a request is made with the correct headers and parameters.
  //
  // DEFECT D0019: The API is currently not being called at all.
  // This test is marked test.fail() — it documents the expected API contract
  // so it can serve as the acceptance test once the defect is fixed.
  //
  // Expected API contract:
  //   Method:       POST (or GET with query param)
  //   Parameter:    number=5 (or equivalent in body)
  //   Content-Type: application/x-www-form-urlencoded or application/json
  //   Accept:       application/json
  test('Scenario 3 - API call is made with correct headers and parameters [Defect D0019]', async ({ page }) => {
    test.fail(); // Expected failure: D0019 — API is not called. Remove once fixed.

    let capturedRequest: any = null;

    // Intercept all requests to capture the API call
    page.on('request', request => {
      const url = request.url();
      const method = request.method();
      // Capture any non-page-load request triggered by the button click
      if (method === 'POST' || url.includes('factorial') || url.includes('calculate')) {
        capturedRequest = request;
      }
    });

    await page.fill('#number', '5');
    await page.click('#getFactorial');
    await page.waitForTimeout(1500);

    // Assert an API request was actually made
    expect(capturedRequest).not.toBeNull();

    // Assert the request carries the correct input parameter
    const postData = capturedRequest.postData();
    const requestUrl = capturedRequest.url();
    const hasParam = (postData && postData.includes('5')) ||
                     requestUrl.includes('5');
    expect(hasParam).toBe(true);

    // Assert correct Content-Type header is present
    const headers = capturedRequest.headers();
    const contentType = headers['content-type'] || '';
    const hasValidContentType =
      contentType.includes('application/json') ||
      contentType.includes('application/x-www-form-urlencoded');
    expect(hasValidContentType).toBe(true);

    // Assert Accept header requests JSON response
    const acceptHeader = headers['accept'] || '';
    expect(acceptHeader).toContain('application/json');
  });

});