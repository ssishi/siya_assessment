import { test, expect } from '@playwright/test';

test.describe('Additional Required Tests', () => {

  // This FAIL is expected (real bug)
  test('TC - Validation styling', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');

    await page.click('#getFactorial');

    const input = page.locator('#number');

    // This will Fail because app has no styling Class
    await expect(input).toHaveClass(/error|invalid/);
  });

  // This should PASS
  test('TC Factorial of 12', async ({ page }) => {
    await page.goto('http://qainterview.pythonanywhere.com');

    await page.fill('#number', '12');
    await page.click('#getFactorial');

    await expect(page.locator('#resultDiv'))
      .toContainText('479001600');
  });


  test('TC - Verify no API request exists', async ({ page }) => {
  await page.goto('http://qainterview.pythonanywhere.com');

  let requestMade = false;

  // Only listen for requests after this point
  page.on('request', (request) => {
    const url = request.url();
    // Ignore static assets (css, js, images, fonts)
    if (!url.endsWith('.js') && !url.endsWith('.css') && !url.endsWith('.png') && !url.endsWith('.ico') && !url.endsWith('.woff2')) {
      requestMade = true;
    }
  });

  await page.fill('#number', '5');
  await page.click('#getFactorial');

  await page.waitForTimeout(1000);

  expect(requestMade).toBeFalsy();
});

});