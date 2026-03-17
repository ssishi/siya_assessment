import { test, expect } from '@playwright/test';

test('Verify factorial API request parameters', async ({ page }) => {

  await page.goto('http://qainterview.pythonanywhere.com');

  const responsePromise = page.waitForResponse(response =>
    response.url().includes('factorial')
  );

  await page.fill('#number','5');
  await page.click('#getFactorial');

  const response = await responsePromise;

  expect(response.url()).toContain('number=5');

});