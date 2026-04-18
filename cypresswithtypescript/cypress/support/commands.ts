import { LoginPage } from '../pages/LoginPage';
import { AuthBusiness } from '../business/AuthBusiness';
import { CartBusiness } from '../business/CartBusiness';

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
  AuthBusiness.ensureAuthenticatedAtInventory(username, password, maxRetries);
});

Cypress.Commands.add('addItemsToCart', (count = 4) => {
  CartBusiness.addItemsToCart(count);
});

Cypress.Commands.add('proceedToCheckout', () => {
  CartBusiness.proceedToCheckout();
});
