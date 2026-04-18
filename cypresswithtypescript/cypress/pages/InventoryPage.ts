import { InventorySelectors, SortOption } from '../selectors/inventory.selectors';

/**
 * Page Object Model — Inventory (Product Listing) Page
 *
 * Encapsulates all interactions with the product listing, navigation menu,
 * cart badge, and product sort functionality.
 */
export class InventoryPage {

  /** Asserts the current URL and the inventory container are visible. */
  verifyOnInventoryPage(): void {
    cy.url().should('include', '/inventory');
    cy.get(InventorySelectors.inventoryContainer).should('be.visible');
  }

  /** Opens the hamburger navigation menu and waits for the close button to confirm it is open. */
  openMainMenu(): void {
    cy.get('body').then(($body) => {
      const menuAlreadyOpen = $body.find(InventorySelectors.allItemsLink).is(':visible');
      if (!menuAlreadyOpen) {
        cy.get(InventorySelectors.menuButton).click({ force: true });
      }
    });
    cy.get(InventorySelectors.allItemsLink).should('be.visible');
  }

  closeMainMenu(): void {
    cy.get('body').then(($body) => {
      if ($body.find(InventorySelectors.allItemsLink).is(':visible')) {
        cy.get(InventorySelectors.menuCloseButton).click({ force: true });
      }
    });
  }

  /** Reopens the main menu and clicks the "All Items" link. */
  clickAllItems(): void {
    this.openMainMenu();
    cy.get(InventorySelectors.allItemsLink).should('be.visible').click({ force: true });
  }

  resetAppState(): void {
    this.openMainMenu();
    cy.get(InventorySelectors.resetAppStateLink).should('be.visible').click({ force: true });
    this.closeMainMenu();
    cy.get(InventorySelectors.cartBadge).should('not.exist');
  }

  resetAppStateAndReturnToInventory(): void {
    this.openMainMenu();
    cy.get(InventorySelectors.resetAppStateLink).should('be.visible').click({ force: true });
    cy.get(InventorySelectors.allItemsLink).should('be.visible').click({ force: true });
    cy.get(InventorySelectors.cartBadge).should('not.exist');
    this.verifyOnInventoryPage();
  }

  /** Opens main menu and triggers logout. */
  clickLogout(): void {
    cy.get(InventorySelectors.logoutLink).should('be.visible').click({ force: true });
  }

  /**
   * Clicks "Add to cart" for the first N products on the inventory page.
   * Uses `.each()` with an index guard — no hardcoded item references required.
   *
   * @param count - Number of items to add (default: 4)
   */
  addFirstNItemsToCart(count = 4): void {
    cy.get(InventorySelectors.addToCartButtons).each(($btn, index) => {
      if (index < count) {
        cy.wrap($btn).click();
      }
    });
  }

  /** Asserts the cart badge shows the expected count string. */
  verifyCartBadgeCount(expected: string): void {
    cy.get(InventorySelectors.cartBadge).should('have.text', expected);
  }

  /**
   * Selects a sort option from the product sort dropdown.
   * Use the `SortOptions` constant to supply a valid value.
   */
  sortProductsBy(option: SortOption): void {
    cy.get(InventorySelectors.sortDropdown).select(option);
  }

  /** Returns all visible product names as a sorted array for assertion. */
  getProductNames(): Cypress.Chainable<string[]> {
    return cy.get(InventorySelectors.productNames).then(($els) =>
      $els.toArray().map((el) => el.innerText.trim())
    );
  }

  /** Returns all visible product prices as parsed float numbers for assertion. */
  getProductPrices(): Cypress.Chainable<number[]> {
    return cy.get(InventorySelectors.productPrices).then(($els) =>
      $els.toArray().map((el) => parseFloat(el.innerText.replace('$', '')))
    );
  }
}
