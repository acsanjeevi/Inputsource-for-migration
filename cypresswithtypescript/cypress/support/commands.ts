import { LoginPage } from '../pages/LoginPage';
import { CartBusiness } from '../business/CartBusiness';
import type { CheckoutData } from '../types';

// ---------------------------------------------------------------------------
// Custom Cypress Command Type Declarations
// ---------------------------------------------------------------------------
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Navigates to the app, performs login with retry support,
       * and verifies the user lands on the inventory page.
       *
       * @example cy.login('standard_user', 'secret_sauce')
       */
      login(username: string, password: string, maxRetries?: number): Chainable<void>;

      /**
       * Adds the first N items to cart from the inventory page
       * and verifies the cart badge reflects the count.
       *
       * @example cy.addItemsToCart(4)
       */
      addItemsToCart(count?: number): Chainable<void>;

      /**
       * Opens the cart and clicks Checkout, verifying arrival
       * at checkout step one.
       *
       * @example cy.proceedToCheckout()
       */
      proceedToCheckout(): Chainable<void>;
    }
  }
}

// ---------------------------------------------------------------------------
// Command Implementations
// ---------------------------------------------------------------------------

Cypress.Commands.add('login', (username: string, password: string, maxRetries = 3) => {
  // With testIsolation:false the browser STAYS on saucedemo.com between tests,
  // keeping the TCP connection alive so cy.visit('/') reuses the existing connection.
  //
  // cy.clearLocalStorage() uses CDP for the CURRENT domain only — no intermediate
  // navigation, no closing of the TCP connection, and no JS 'storage' event
  // (avoids DOMException in React SPAs).
  //
  // After clearLocalStorage, cy.visit('/') reloads the page. Because session-username
  // was cleared, the React app shows the login form. With a warm TCP the reload is
  // fast (5–30s) vs a cold load (90–120s on the first test).
  cy.clearLocalStorage();
  cy.visit('/');
  const loginPage = new LoginPage();
  loginPage.loginWithRetry(username, password, maxRetries);
});

Cypress.Commands.add('addItemsToCart', (count = 4) => {
  CartBusiness.addItemsToCart(count);
});

Cypress.Commands.add('proceedToCheckout', () => {
  CartBusiness.proceedToCheckout();
});
