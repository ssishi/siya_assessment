# Factorial App Testing & Automation

## 📌 Overview
This project contains manual and automated testing for the Factorial Calculator web application:
http://qainterview.pythonanywhere.com

The goal was to identify defects, create test cases, and implement automation using Playwright.


## 🧪 Testing Approach

### 1. Manual Testing
- Explored all UI elements
- Tested valid and invalid inputs
- Verified navigation and usability
- Identified multiple defects

### 2. Test Case Design
Test cases were created to cover:
- Functional behaviour (factorial calculation)
- Input validation
- Navigation links
- Edge cases (empty, negative, non-numeric input)


### 3. Automation Testing
Automation was implemented using:
- Playwright (TypeScript)
- Page interaction and assertions
- API/network validation


## 📂 Project Structure
tests/
├── validationTests.spec.ts
├── navigationTests.spec.ts
├── apiTests.spec.ts


## ✅ Test Coverage

### Functional Tests
- Factorial calculation (valid inputs)
- Factorial of 12

### Validation Tests
- Negative numbers
- Alphabet input
- Empty input

### Navigation Tests
- Privacy link
- Terms and Conditions link

### API Test
- Verify request contains correct parameters


## 🐞 Known Issues (Defects Found)

- Navigation links do not redirect correctly
- Negative numbers are not properly validated
- Alphabet input is not handled correctly
- Empty input lacks proper validation
- Pressing Enter does not submit the form (UX issue)


## ⚠️ Important Note

Some automated tests are intentionally failing.  
These failures represent actual defects in the application, not issues in the test scripts.


## ▶️ How to Run Tests

```bash
npm install
npx playwright test

To view Report:
npx playwright show-report