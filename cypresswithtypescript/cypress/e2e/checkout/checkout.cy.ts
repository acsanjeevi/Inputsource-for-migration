/**
 * MODULE  : Checkout Flow
 * SPEC    : cypress/e2e/checkout/checkout.cy.ts
 * COVERS  : TC_CHK_001 (P0) · TC_CHK_002 (P1) · TC_CHK_003 (P2)
 *
 * beforeEach sets up: login → add 4 items → navigate to checkout step one.
 * Positive path uses CheckoutBusiness; negative paths use CheckoutPage directly
 * for precise field-level control.
 */

import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutBusiness } from '../../business/CheckoutBusiness';
import type { Users, CheckoutFixtures } from '../../types';

const checkoutPage = new CheckoutPage();

describe('Checkout Module — SauceDemo', () => {
  let users: Users;
  let checkoutData: CheckoutFixtures;

  before(() => {
    cy.fixture<Users>('login.data').then((data) => { users = data; });
    cy.fixture<CheckoutFixtures>('checkout.data').then((data) => { checkoutData = data; });
  });

  beforeEach(() => {
    cy.login(users.standardUser.username, users.standardUser.password);
    cy.addItemsToCart(4);
    cy.proceedToCheckout();
  });

  // ── Positive Scenarios ───────────────────────────────────────────────────

  context('Positive Scenarios', () => {

    /**
     * TC-ID        : TC_CHK_001
     * Priority     : P0
     * Description  : Verify complete end-to-end order placement with valid details
     * Test Data    : users.json (standardUser) · checkout.json (validCheckout)
     * Expected     : Order confirmation banner visible; user navigated back to inventory
     */
    it('TC_CHK_001 [P0] — Complete checkout with valid details and verify order confirmation', () => {
      CheckoutBusiness.fillAndCompleteCheckout(checkoutData.validCheckout);
    });

  });

  // ── Negative Scenarios ───────────────────────────────────────────────────

  context('Negative Scenarios', () => {

    /**
     * TC-ID        : TC_CHK_002
     * Priority     : P1
     * Description  : Verify error is shown when First Name is omitted on checkout step 1
     * Test Data    : Last Name: Doe | Zip: 560001 | First Name: (omitted)
     * Expected     : Error banner — "First Name is required"; URL stays on step one
     */
    it('TC_CHK_002 [P1] — Checkout fails when First Name is empty', () => {
      checkoutPage.enterLastName(checkoutData.validCheckout.lastName);
      checkoutPage.enterPostalCode(checkoutData.validCheckout.postalCode);
      checkoutPage.clickContinue();
      checkoutPage.getErrorMessage()
        .should('be.visible')
        .and('contain.text', 'First Name is required');
      cy.url().should('include', '/checkout-step-one');
    });

    /**
     * TC-ID        : TC_CHK_003
     * Priority     : P2
     * Description  : Verify error is shown when Postal Code is omitted on checkout step 1
     * Test Data    : First Name: John | Last Name: Doe | Zip: (omitted)
     * Expected     : Error banner — "Postal Code is required"; URL stays on step one
     */
    it('TC_CHK_003 [P2] — Checkout fails when Postal Code is empty', () => {
      checkoutPage.enterFirstName(checkoutData.validCheckout.firstName);
      checkoutPage.enterLastName(checkoutData.validCheckout.lastName);
      checkoutPage.clickContinue();
      checkoutPage.getErrorMessage()
        .should('be.visible')
        .and('contain.text', 'Postal Code is required');
      cy.url().should('include', '/checkout-step-one');
    });

  });

});
