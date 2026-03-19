# Factorial App — Testing & Automation Portfolio

> **Tester:** Siya Sishi | **Environment:** IAT | **Date:** 18 March 2026  
> **Application:** http://qainterview.pythonanywhere.com

---

## 📌 Overview

This project contains a complete QA portfolio for the Factorial Calculator web application, covering manual test planning, defect reporting, and automated testing using Playwright (TypeScript).

The work is structured across three parts:

| Part | Deliverable | Description |
|------|-------------|-------------|
| 1 | Test Plan | 20 documented test cases covering all functional areas |
| 2 | Defect Report | 9 defects identified, logged with severity, priority and traceability |
| 3 | Automation Suite | Playwright tests aligned to all 20 test cases |
| 4 | Additional Tests | 3 advanced scenarios — form styling, factorial of 12, API header validation |

---

## 🗂️ Project Structure

```
tests/
├── factorial.spec.ts         # TC02–TC05, TC11, TC20 — Core calculation tests
├── landing.spec.ts           # TC01, TC08, TC17     — UI & page load tests
├── navigationTests.spec.ts   # TC13–TC16            — Navigation & browser history
├── validationTests.spec.ts   # TC06–TC10, TC12      — Input validation tests
├── extra.spec.ts             # TC11-EXT, TC09-EXT, TC18, TC19 — Edge cases & responsiveness
└── additional.spec.ts             # S1–S3                — Additional automation scenarios
```

---

## 🧪 Testing Approach

### Part 1 — Manual Test Planning
- Explored all UI elements, inputs, and navigation flows
- Designed 20 test cases mapped to functional areas
- Documented steps, expected results, actual results, severity and priority
- Identified 6 failing test cases linked directly to application defects

### Part 2 — Defect Reporting
- Logged 9 defects with full traceability back to test case IDs
- Each defect includes: steps to reproduce, expected vs actual behaviour, severity, priority and recommended fix
- Defects range from High severity (swapped navigation links, missing API call) to Low (page title typo)

### Part 3 — Automation Testing
- Implemented in **Playwright (TypeScript)** across **Chromium, Firefox and WebKit**
- Tests are named to match TC IDs for full traceability
- Known defects use Playwright's `test.fail()` annotation — marking them as **expected failures** rather than broken tests
- This means the suite is honest: working features pass cleanly, broken features are documented with precision

### Part 4 — Additional Automation
- **Scenario 1:** Form validation styling — asserts error state visibility and computed CSS colour
- **Scenario 2:** Factorial of 12 — asserts exact result of 479001600
- **Scenario 3:** API call validation — intercepts network requests and validates headers and parameters

---

## ✅ Test Coverage Summary

| Spec File | Test Cases | Pass | Expected Fail |
|-----------|-----------|------|---------------|
| `factorial.spec.ts` | TC02, TC03, TC04, TC05, TC11, TC20 | 6 | 0 |
| `landing.spec.ts` | TC01, TC08, TC17 | 5 | 1 (D008) |
| `navigationTests.spec.ts` | TC13, TC14, TC15, TC16 | 1 | 3 (D002, D003, D006) |
| `validationTests.spec.ts` | TC06, TC07, TC08, TC09, TC10, TC12 | 4 | 2 (D004, D001) |
| `extra.spec.ts` | TC18, TC11-EXT, TC09-EXT, TC19 | 1 | 3 (D007, D009, D0019) |
| `additional.spec.ts` | S1, S2, S3 | 2 | 1 (D0019) |
| **Total** | **28 tests** | **19** | **10** |

---

## 🐞 Known Defects

| ID | Summary | Severity | Linked TC |
|----|---------|----------|-----------|
| D001 | Whitespace input not trimmed — error shown instead of result | Medium | TC12 |
| D002 | Terms & Conditions link navigates to /privacy instead of /terms | High | TC14 |
| D003 | Privacy link navigates to /terms instead of /privacy | High | TC15 |
| D004 | Negative input shows no error — previous result remains | Medium | TC06 |
| D005 | Decimal input error message is vague | Medium | TC07 |
| D006 | Browser forward navigates to Terms page instead of result | High | TC16 |
| D007 | Input of 1000+ produces no result, no error, no feedback | High | TC11-EXT |
| D008 | Page title reads "Factoriall" — double 'l' typo | Low | TC08 |
| D009 | No maximum input length enforced | Medium | TC09-EXT |

---

## ⚠️ About Expected Failures

Tests covering known defects use Playwright's `test.fail()` annotation:

```typescript
test('TC06 - Negative input should show an error message [Defect D004]', async ({ page }) => {
  test.fail(); // Expected failure: D004 — remove this line once the defect is fixed
  await page.fill('#number', '-5');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});
```

This means:
- ✅ The test **passes** in the Playwright report as an **expected failure** — not a broken test
- 📋 The assertion documents exactly what the correct behaviour **should be**
- 🔁 Once the defect is fixed, the `test.fail()` line is removed and the test becomes a **passing regression guard** automatically

---

## ▶️ How to Run

### Install dependencies
```bash
npm install
npx playwright install
```

### Run all tests
```bash
npx playwright test
```

### Run a specific spec file
```bash
npx playwright test factorial.spec.ts
```

### Run on a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### View the HTML report
```bash
npx playwright show-report
```

---

## 📄 Documents

| Document | Description |
|----------|-------------|
| `Factorial_Test_Plan_Siya_Sishi.pdf` | Full test plan with 20 test cases |
| `Defect_Report_Siya_Sishi.pdf` | All 9 defects with traceability |
| `Automation_Results_Siya_Sishi.pdf` | Automation results with Playwright HTML report screenshots |

---

## 🛠️ Tech Stack

- **Framework:** Playwright v1.43
- **Language:** TypeScript
- **Browsers:** Chromium · Firefox · WebKit
- **Runner:** `npx playwright test`
- **Reporting:** Playwright HTML Report