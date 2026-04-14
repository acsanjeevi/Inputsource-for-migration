import { CheckoutSelectors } from '../selectors/checkout.selectors';
import type { CheckoutData } from '../types';

/**
 * Page Object Model — Checkout Flow (Step 1, Step 2, Confirmation)
 *
 * Provides fine-grained methods for each form field and action.
 * Happy-path orchestration is delegated to CheckoutBusiness.
 */
export class CheckoutPage {

  enterFirstName(firstName: string): void {
    cy.get(CheckoutSelectors.firstNameInput).clear().type(firstName);
  }

  enterLastName(lastName: string): void {
    cy.get(CheckoutSelectors.lastNameInput).clear().type(lastName);
  }

  enterPostalCode(postalCode: string): void {
    cy.get(CheckoutSelectors.postalCodeInput).clear().type(postalCode);
  }

  clickContinue(): void {
    cy.get(CheckoutSelectors.continueButton).click();
  }

  clickCancel(): void {
    cy.get(CheckoutSelectors.cancelButton).click();
  }

  clickFinish(): void {
    cy.get(CheckoutSelectors.finishButton).click();
  }

  clickBackHome(): void {
    cy.get(CheckoutSelectors.backHomeButton).click();
  }

  /**
   * Fills all three checkout step-1 fields from a CheckoutData object and submits.
   * Intended for reuse in positive-path helpers and business functions.
   */
  fillAndContinue(data: CheckoutData): void {
    this.enterFirstName(data.firstName);
    this.enterLastName(data.lastName);
    this.enterPostalCode(data.postalCode);
    this.clickContinue();
  }

  /** Asserts the order-complete confirmation banner. */
  verifyOrderConfirmation(): void {
    cy.get(CheckoutSelectors.confirmationHeader)
      .should('be.visible')
      .and('contain.text', 'Thank you for your order!');
    cy.url().should('include', '/checkout-complete');
  }

  /** Returns the error message element for assertion chaining. */
  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(CheckoutSelectors.errorMessage);
  }
}
