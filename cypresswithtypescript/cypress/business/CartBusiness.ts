import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

const inventoryPage = new InventoryPage();
const cartPage = new CartPage();

/**
 * CartBusiness — High-level cart management flows.
 *
 * Bridges InventoryPage and CartPage actions for common multi-step cart scenarios.
 */
export class CartBusiness {

  /**
   * Adds the first N items to cart from the inventory page.
   * Verifies the cart badge reflects the correct count.
   *
   * @param count - Number of items to add (default: 4)
   */
  static addItemsToCart(count = 4): void {
    inventoryPage.addFirstNItemsToCart(count);
    inventoryPage.verifyCartBadgeCount(String(count));
  }

  /**
   * Opens the cart and navigates to checkout step one.
   * Verifies the URL before returning to the caller.
   */
  static proceedToCheckout(): void {
    cartPage.openCart();
    cartPage.clickCheckout();
    cy.url().should('include', '/checkout-step-one');
  }
}
