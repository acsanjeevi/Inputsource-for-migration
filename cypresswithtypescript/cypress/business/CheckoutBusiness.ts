import { CheckoutPage } from '../pages/CheckoutPage';
import type { CheckoutData } from '../types';

const checkoutPage = new CheckoutPage();

/**
 * CheckoutBusiness — High-level checkout flow.
 *
 * Orchestrates the full checkout sequence (step 1 → step 2 → confirmation).
 * Negative-path tests should call CheckoutPage methods directly for precision.
 */
export class CheckoutBusiness {

  /**
   * Fills the checkout step-1 form with valid data, completes the order,
   * verifies the confirmation screen, and returns to the inventory page.
   *
   * Prerequisites: User must already be on /checkout-step-one.html
   *
   * @param data - CheckoutData object (firstName, lastName, postalCode)
   */
  static fillAndCompleteCheckout(data: CheckoutData): void {
    checkoutPage.fillAndContinue(data);
    cy.url().should('include', '/checkout-step-two');
    checkoutPage.clickFinish();
    checkoutPage.verifyOrderConfirmation();
    checkoutPage.clickBackHome();
    cy.url().should('include', '/inventory');
  }
}
