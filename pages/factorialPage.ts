import { Page, Locator } from '@playwright/test';

export class FactorialPage {

  readonly page: Page;
  readonly inputBox: Locator;
  readonly calculateButton: Locator;
  readonly resultDiv: Locator;
  readonly privacyLink: Locator;
  readonly termsLink: Locator;

  constructor(page: Page) {

    this.page = page;

    this.inputBox = page.locator('#number');
    this.calculateButton = page.locator('#getFactorial');
    this.resultDiv = page.locator('#resultDiv');

    this.privacyLink = page.locator('text=Privacy');
    this.termsLink = page.locator('text=Terms and Conditions');
  }

  async navigate() {
    await this.page.goto('http://qainterview.pythonanywhere.com');
  }

  async enterNumber(number: string) {
    await this.inputBox.fill(number);
  }

  async clickCalculate() {
    await this.calculateButton.click();
  }

  async getResult() {
    return await this.resultDiv.textContent();
  }
}