import { CartSelectors } from '../selectors/cart.selectors';

/**
 * Page Object Model — Shopping Cart Page
 *
 * Encapsulates all interactions with the cart page: opening, verifying contents,
 * removing items, and navigating forward/backward.
 */
export class CartPage {

  /** Clicks the cart icon in the global header and verifies navigation. */
  openCart(): void {
    cy.get(CartSelectors.cartLink).click();
    cy.url().should('include', '/cart');
  }

  /** Asserts the exact number of cart line items. */
  verifyCartItemCount(expected: number): void {
    cy.get(CartSelectors.cartItems).should('have.length', expected);
  }

  /**
   * Removes a specific item from the cart by its display name.
   * Traverses up to the parent `.cart_item` to click the correct Remove button.
   *
   * @param itemName - Exact visible text of the product to remove
   */
  removeItemByName(itemName: string): void {
    cy.contains(CartSelectors.cartItemName, itemName)
      .parents(CartSelectors.cartItems)
      .find(CartSelectors.removeButton)
      .click();
  }

  /** Returns all cart item names as an array for dynamic removal scenarios. */
  getCartItemNames(): Cypress.Chainable<string[]> {
    return cy.get(CartSelectors.cartItemName).then(($els) =>
      $els.toArray().map((el) => el.innerText.trim())
    );
  }

  clickContinueShopping(): void {
    cy.get(CartSelectors.continueShoppingButton).click();
  }

  clickCheckout(): void {
    cy.get(CartSelectors.checkoutButton).click();
  }
}
