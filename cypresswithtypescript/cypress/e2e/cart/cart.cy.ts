/**
 * MODULE  : Shopping Cart
 * SPEC    : cypress/e2e/cart/cart.cy.ts
 * COVERS  : TC_CART_001 (P0) · TC_CART_002 (P1) · TC_CART_003 (P1) · TC_CART_004 (P2)
 *
 * Prerequisites: authenticated session + 4 items in cart (via beforeEach).
 */

import { CartPage } from '../../pages/CartPage';
import type { Users } from '../../types';

const cartPage = new CartPage();

describe('Cart Module — SauceDemo', () => {
  let users: Users;

  before(() => {
    cy.fixture<Users>('login.data').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.login(users.standardUser.username, users.standardUser.password);
    cy.addItemsToCart(4);
  });

  // ── Positive Scenarios ───────────────────────────────────────────────────

  context('Positive Scenarios', () => {

    /**
     * TC-ID        : TC_CART_001
     * Priority     : P0
     * Description  : Verify cart page displays exactly 4 items after Add to Cart
     * Expected     : Cart item count is 4
     */
    it('TC_CART_001 [P0] — Cart displays 4 items after adding first 4 products', () => {
      cartPage.openCart();
      cartPage.verifyCartItemCount(4);
    });

    /**
     * TC-ID        : TC_CART_002
     * Priority     : P1
     * Description  : Verify Checkout button navigates to checkout step one
     * Expected     : URL includes /checkout-step-one
     */
    it('TC_CART_002 [P1] — Checkout button navigates to Checkout Step 1', () => {
      cartPage.openCart();
      cartPage.clickCheckout();
      cy.url().should('include', '/checkout-step-one');
    });

    /**
     * TC-ID        : TC_CART_003
     * Priority     : P1
     * Description  : Verify removing an item reduces cart count from 4 to 3
     * Expected     : Cart item count decreases to 3 after removal
     */
    it('TC_CART_003 [P1] — Remove one item from cart reduces count to 3', () => {
      cartPage.openCart();
      cartPage.verifyCartItemCount(4);
      cartPage.getCartItemNames().then((names) => {
        cartPage.removeItemByName(names[0]);
        cartPage.verifyCartItemCount(3);
      });
    });

  });

  // ── Boundary Scenarios ───────────────────────────────────────────────────

  context('Boundary Scenarios', () => {

    /**
     * TC-ID        : TC_CART_004
     * Priority     : P2
     * Description  : Verify "Continue Shopping" button returns user to inventory
     * Expected     : URL includes /inventory; product listing is visible
     */
    it('TC_CART_004 [P2] — Continue Shopping returns to inventory page', () => {
      cartPage.openCart();
      cartPage.clickContinueShopping();
      cy.url().should('include', '/inventory');
      cy.get('.inventory_list').should('be.visible');
    });

  });

});
