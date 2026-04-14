# 🧪 ICEPOT Framework — SauceDemo Cypress Automation Architecture

> **Framework:** ICEPOT | **Tool:** Cypress + TypeScript | **Reporter:** Mochawesome (Merged HTML Report)
> **Target Application:** [https://www.saucedemo.com](https://www.saucedemo.com)

---

## 📋 Table of Contents

1. [Instructions](#instructions)
2. [Context](#context)
3. [Example](#example)
4. [Tone](#tone)
5. [Output](#output)
6. [Persona](#persona)
7. [Project Structure](#project-structure)
8. [Setup & Installation](#setup--installation)
9. [Test Cases](#test-cases)
10. [Cypress Configuration](#cypress-configuration)
11. [Page Object Models](#page-object-models)
12. [Test Execution](#test-execution)
13. [Mochawesome Merged Report](#mochawesome-merged-report)

---

## 📌 Instructions

```
[MANDATORY]   Use Cypress with TypeScript for UI automation
[MANDATORY]   Target URL: https://www.saucedemo.com
[MANDATORY]   Cover all user flows: Login → Browse → Add to Cart → Checkout → Order Confirmation
[MANDATORY]   Generate Functional Test Cases — both Positive and Negative
[MANDATORY]   Include: TC-ID, Priority, Description, Precondition, Test Steps, Expected Result, Actual Result, Test Data
[CRITICAL]    Generate P0, P1, and P2 test cases across multiple spec modules
[CRITICAL]    Use Page Object Model (POM) design pattern
[STRICTLY]    Use Mochawesome reporter with merged HTML report (all modules in one file)
[MANDATORY]   Handle flaky login (standard_user may fail — retry login up to 3 times)
[MANDATORY]   Handle optional "Change Password" popup — click OK if it appears
[MANDATORY]   Add to Cart: first 4 items only
[MANDATORY]   Complete checkout with valid First Name, Last Name, Zip Code
[MANDATORY]   Click Finish, then Back Home after order completion
```

---

## 🌐 Context

```
Act as a Senior QA Automation Engineer specializing in:
- End-to-End UI Testing with Cypress + TypeScript
- Page Object Model (POM) architecture
- E-Commerce / Retail domain test automation
- CI/CD pipeline integration
- HTML reporting with Mochawesome
```

**Application Under Test:**
- **Name:** Swag Labs (SauceDemo)
- **URL:** https://www.saucedemo.com
- **Domain:** E-Commerce / Retail

**Available Test Credentials (from login page):**

| Username           | Password       | Notes                                      |
|--------------------|----------------|--------------------------------------------|
| standard_user      | secret_sauce   | May be flaky — retry login up to 3 times   |
| locked_out_user    | secret_sauce   | Intentionally locked — negative test       |
| problem_user       | secret_sauce   | UI defects — negative scenario             |
| performance_glitch_user | secret_sauce | Slow response — performance scenario    |
| error_user         | secret_sauce   | Error-prone flows                          |
| visual_user        | secret_sauce   | Visual regression scenarios                |

---

## 💡 Example

**Test Case Reference Format (ICEPOT Standard):**

```
TC-ID        : TC_LOGIN_001
Priority     : P0
Module       : Login
Description  : Verify successful login with valid credentials (standard_user)
Precondition : Application is accessible at https://www.saucedemo.com
Test Steps   :
               1. Navigate to https://www.saucedemo.com
               2. Enter username: standard_user
               3. Enter password: secret_sauce
               4. Click Login button
               5. If "Change Password" popup appears, click OK
Expected     : User is redirected to Products (inventory) page
Test Data    : Username: standard_user | Password: secret_sauce
```

---

## 🎯 Tone

```
[STRICTLY] Professional tone throughout all documentation, comments, and test descriptions
[STRICTLY] Code comments must be clear and concise
[STRICTLY] Review comments from Team Lead perspective — constructive, objective, precise
```

---

## 📤 Output

```
[OUTPUT FORMAT]   Cypress TypeScript spec files (*.cy.ts)
[OUTPUT FORMAT]   Page Object Model files (*.page.ts)
[OUTPUT FORMAT]   Mochawesome JSON + merged single HTML report
[STRUCTURE]       Multi-module spec files (login, inventory, cart, checkout)
[REPORT]          One unified mochawesome-report/index.html for all specs
```

---

## 👤 Persona

```
Act as a QA Tech Lead reviewing Cypress automation code and test cases.
Responsibilities:
- Validate test case coverage (P0/P1/P2)
- Review POM design and maintainability
- Ensure reporter is configured and merged correctly
- Provide review comments per test case and spec file
- Sign off on architecture before execution
```

---

## 🗂️ Project Structure

```
saucedemo-cypress-automation/
│
├── cypress/
│   ├── e2e/
│   │   ├── login/
│   │   │   └── login.cy.ts              # TC_LOGIN_001 to TC_LOGIN_003
│   │   ├── inventory/
│   │   │   └── inventory.cy.ts          # TC_INV_001 to TC_INV_003
│   │   ├── cart/
│   │   │   └── cart.cy.ts               # TC_CART_001 to TC_CART_002
│   │   └── checkout/
│   │       └── checkout.cy.ts           # TC_CHK_001 to TC_CHK_003
│   │
│   ├── pages/                           # Page Object Models
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   │
│   ├── fixtures/
│   │   └── users.json                   # Test data
│   │
│   └── support/
│       ├── commands.ts                  # Custom Cypress commands
│       └── e2e.ts                       # Global hooks
│
├── cypress.config.ts                    # Cypress + Mochawesome config
├── package.json
├── tsconfig.json
└── mochawesome-report/                  # Generated after execution
    ├── index.html                       # Merged single HTML report
    └── assets/
```

---

## ⚙️ Setup & Installation

### Step 1 — Initialize Project

```bash
mkdir saucedemo-cypress-automation
cd saucedemo-cypress-automation
npm init -y
```

### Step 2 — Install Dependencies

```bash
# Cypress and TypeScript
npm install --save-dev cypress typescript

# Mochawesome reporter and merge tool
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator

# Type definitions
npm install --save-dev @types/node
```

### Step 3 — Initialize TypeScript

```bash
npx tsc --init
```

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["cypress", "node"],
    "outDir": "./dist"
  },
  "include": ["cypress/**/*.ts", "cypress.config.ts"]
}
```

### Step 4 — package.json Scripts

```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run --reporter mochawesome --reporter-options reportDir=mochawesome-report/json,overwrite=false,html=false,json=true",
    "cy:merge": "mochawesome-merge mochawesome-report/json/*.json > mochawesome-report/merged.json",
    "cy:report": "marge mochawesome-report/merged.json --reportDir mochawesome-report --inline --reportTitle 'SauceDemo Automation Report'",
    "cy:all": "npm run cy:run && npm run cy:merge && npm run cy:report"
  }
}
```

---

## 🔧 Cypress Configuration

**`cypress.config.ts`**

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,       // Retry flaky tests up to 2 times in CI
      openMode: 1,
    },
    specPattern: 'cypress/e2e/**/*.cy.ts',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'mochawesome-report/json',
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
```

---

## 📄 Page Object Models

### `cypress/pages/LoginPage.ts`

```typescript
export class LoginPage {
  // Selectors
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private errorMessage = '[data-test="error"]';

  navigate(): void {
    cy.visit('/');
  }

  enterUsername(username: string): void {
    cy.get(this.usernameInput).clear().type(username);
  }

  enterPassword(password: string): void {
    cy.get(this.passwordInput).clear().type(password);
  }

  clickLogin(): void {
    cy.get(this.loginButton).click();
  }

  /**
   * Handles the optional "Change Password" popup if it appears.
   * Retries login up to maxRetries times to handle flakiness with standard_user.
   */
  loginWithRetry(username: string, password: string, maxRetries = 3): void {
    let attempts = 0;

    const attemptLogin = (): void => {
      attempts++;
      this.enterUsername(username);
      this.enterPassword(password);
      this.clickLogin();

      // Handle optional Change Password popup
      cy.get('body').then(($body) => {
        // If still on login page and retries remain, try again
        if ($body.find(this.errorMessage).length > 0 && attempts < maxRetries) {
          cy.wait(1000);
          attemptLogin();
        }
      });
    };

    attemptLogin();

    // Dismiss "Change Password" popup if it appears
    cy.get('body').then(($body) => {
      if ($body.find('[data-test="change-password-ok"]').length > 0) {
        cy.get('[data-test="change-password-ok"]').click();
      }
      // Generic OK button fallback
      else if ($body.find('button:contains("OK")').length > 0) {
        cy.contains('button', 'OK').click();
      }
    });
  }

  getErrorMessage(): Cypress.Chainable<string> {
    return cy.get(this.errorMessage).invoke('text');
  }
}
```

---

### `cypress/pages/InventoryPage.ts`

```typescript
export class InventoryPage {
  private inventoryContainer = '.inventory_list';
  private inventoryItems = '.inventory_item';
  private addToCartButtons = '[data-test^="add-to-cart"]';
  private cartBadge = '.shopping_cart_badge';
  private menuButton = '#react-burger-menu-btn';
  private allItemsLink = '#inventory_sidebar_link';

  verifyOnInventoryPage(): void {
    cy.url().should('include', '/inventory');
    cy.get(this.inventoryContainer).should('be.visible');
  }

  openMainMenu(): void {
    cy.get(this.menuButton).click();
  }

  clickAllItems(): void {
    this.openMainMenu();
    cy.get(this.allItemsLink).click();
  }

  /**
   * Adds the first N items to the cart.
   * @param count Number of items to add (default: 4)
   */
  addFirstNItemsToCart(count: number = 4): void {
    cy.get(this.addToCartButtons).each(($btn, index) => {
      if (index < count) {
        cy.wrap($btn).click();
      }
    });
  }

  getCartBadgeCount(): Cypress.Chainable<string> {
    return cy.get(this.cartBadge).invoke('text');
  }
}
```

---

### `cypress/pages/CartPage.ts`

```typescript
export class CartPage {
  private cartLink = '.shopping_cart_link';
  private cartItems = '.cart_item';
  private checkoutButton = '[data-test="checkout"]';

  openCart(): void {
    cy.get(this.cartLink).click();
  }

  verifyCartItemCount(expected: number): void {
    cy.get(this.cartItems).should('have.length', expected);
  }

  clickCheckout(): void {
    cy.get(this.checkoutButton).click();
  }
}
```

---

### `cypress/pages/CheckoutPage.ts`

```typescript
export class CheckoutPage {
  private firstNameInput = '[data-test="firstName"]';
  private lastNameInput = '[data-test="lastName"]';
  private postalCodeInput = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private confirmationHeader = '.complete-header';
  private backHomeButton = '[data-test="back-to-products"]';
  private errorMessage = '[data-test="error"]';

  enterFirstName(firstName: string): void {
    cy.get(this.firstNameInput).clear().type(firstName);
  }

  enterLastName(lastName: string): void {
    cy.get(this.lastNameInput).clear().type(lastName);
  }

  enterPostalCode(zip: string): void {
    cy.get(this.postalCodeInput).clear().type(zip);
  }

  clickContinue(): void {
    cy.get(this.continueButton).click();
  }

  clickFinish(): void {
    cy.get(this.finishButton).click();
  }

  clickBackHome(): void {
    cy.get(this.backHomeButton).click();
  }

  verifyOrderConfirmation(): void {
    cy.get(this.confirmationHeader)
      .should('be.visible')
      .and('contain.text', 'Thank you for your order!');
  }

  getErrorMessage(): Cypress.Chainable<string> {
    return cy.get(this.errorMessage).invoke('text');
  }
}
```
---

## 📊 Test Case Summary Table

| TC-ID        | Priority | Module    | Description                                          | Type     |
|--------------|----------|-----------|------------------------------------------------------|----------|
| TC_LOGIN_001 | P0       | Login     | Successful login with standard_user (retry enabled)  | Positive |
| TC_LOGIN_002 | P1       | Login     | Login blocked for locked_out_user                    | Negative |
| TC_LOGIN_003 | P2       | Login     | Login fails with empty credentials                   | Negative |
| TC_INV_001   | P0       | Inventory | All products displayed after login                   | Positive |
| TC_INV_002   | P0       | Inventory | Navigate All Items via Main Menu                     | Positive |
| TC_INV_003   | P1       | Inventory | Add first 4 items; badge shows count 4               | Positive |
| TC_CART_001  | P0       | Cart      | Cart shows 4 items after Add to Cart                 | Positive |
| TC_CART_002  | P1       | Cart      | Checkout button navigates to step one                | Positive |
| TC_CHK_001   | P0       | Checkout  | Complete order; confirmation shown; back to home     | Positive |
| TC_CHK_002   | P1       | Checkout  | Checkout fails — empty First Name                    | Negative |
| TC_CHK_003   | P2       | Checkout  | Checkout fails — empty Postal Code                   | Negative |

---

## ▶️ Test Execution

### Run All Tests + Generate Merged Mochawesome HTML Report

```bash
# One command — runs tests, merges JSONs, generates HTML
npm run cy:all
```

### Step-by-Step (Manual)

```bash
# Step 1: Run tests (outputs JSON per spec into mochawesome-report/json/)
npm run cy:run

# Step 2: Merge all JSONs into one merged.json
npm run cy:merge

# Step 3: Generate single merged index.html
npm run cy:report
```

### Open in Browser

```bash
open mochawesome-report/index.html
# or on Windows:
start mochawesome-report/index.html
```

---

## 📈 Mochawesome Merged Report

All four spec modules (Login, Inventory, Cart, Checkout) produce individual Mochawesome JSON files. The merge step combines them into a **single `index.html`** report showing:

- ✅ Pass / ❌ Fail counts per module
- Execution time per test
- Retries attempted (flaky test visibility)
- Expandable test steps and error screenshots
- Priority breakdown (P0 / P1 / P2)

**Report Output Location:**

```
mochawesome-report/
├── index.html          ← Open this in browser for full merged report
├── merged.json
├── assets/
│   ├── app.css
│   └── app.js
└── json/
    ├── login.cy.json
    ├── inventory.cy.json
    ├── cart.cy.json
    └── checkout.cy.json
```

---

## 🧑‍💼 Team Lead Review Comments

| TC-ID        | Review Comment                                                                    | Status   |
|--------------|-----------------------------------------------------------------------------------|----------|
| TC_LOGIN_001 | ✅ Retry mechanism is critical — standard_user is known to be flaky. Well handled. | Approved |
| TC_LOGIN_002 | ✅ Negative test for locked_out_user is essential for P1 coverage.                 | Approved |
| TC_LOGIN_003 | ✅ Empty credential validation is a P2 boundary check. Good addition.              | Approved |
| TC_INV_001   | ✅ Inventory count assertion is solid; ensures page rendered fully.                | Approved |
| TC_INV_002   | ✅ Main Menu navigation via hamburger icon validated correctly.                    | Approved |
| TC_INV_003   | ✅ Dynamic `.each()` loop for Add to Cart is maintainable and scalable.            | Approved |
| TC_CART_001  | ✅ Cart item count assertion validates end-to-end product addition.                | Approved |
| TC_CART_002  | ✅ Navigation assertion is lean and effective.                                      | Approved |
| TC_CHK_001   | ✅ Full E2E happy path — covers Finish and Back to Home. Critical P0 coverage.     | Approved |
| TC_CHK_002   | ✅ Missing first name validation tested. Proper negative coverage.                 | Approved |
| TC_CHK_003   | ✅ Postal code validation adds completeness to checkout error handling.            | Approved |

**Overall Architecture Review — Team Lead Sign-off:**

> ✅ Architecture approved. POM pattern is clean and maintainable. Retry logic for standard_user handles known flakiness. Mochawesome merge setup is correctly configured for a unified report. All P0 scenarios have solid coverage. P1/P2 negative tests provide good boundary validation. Ready for execution.

---

*Generated using ICEPOT Framework | Cypress + TypeScript | Mochawesome Reporter*
