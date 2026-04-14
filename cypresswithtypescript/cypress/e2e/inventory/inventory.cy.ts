/**
 * MODULE  : Inventory (Product Listing)
 * SPEC    : cypress/e2e/inventory/inventory.cy.ts
 * COVERS  : TC_INV_001 (P0) · TC_INV_002 (P0) · TC_INV_003 (P1)
 *           TC_INV_004 (P1) · TC_INV_005 (P1) · TC_INV_006 (P2)
 *
 * Prerequisites for all tests: authenticated session via cy.login().
 */

import { InventoryPage } from '../../pages/InventoryPage';
import { AuthBusiness } from '../../business/AuthBusiness';
import { LoginSelectors } from '../../selectors/login.selectors';
import { SortOptions } from '../../selectors/inventory.selectors';
import type { Users } from '../../types';

const inventoryPage = new InventoryPage();

describe('Inventory Module — SauceDemo', () => {
  let users: Users;

  before(() => {
    cy.fixture<Users>('login.data').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.login(users.standardUser.username, users.standardUser.password);
  });

  // ── Positive Scenarios ───────────────────────────────────────────────────

  context('Positive Scenarios', () => {

    /**
     * TC-ID        : TC_INV_001
     * Priority     : P0
     * Description  : Verify all products are visible after login
     * Expected     : At least 1 product item is rendered in the inventory container
     */
    it('TC_INV_001 [P0] — All products displayed on inventory page', () => {
      inventoryPage.verifyOnInventoryPage();
      cy.get('.inventory_item').should('have.length.greaterThan', 0);
    });

    /**
     * TC-ID        : TC_INV_002
     * Priority     : P0
     * Description  : Verify "All Items" link via hamburger menu reloads inventory
     * Expected     : Inventory URL and product list remain intact after navigation
     */
    it('TC_INV_002 [P0] — Navigate to All Items via hamburger Main Menu', () => {
      inventoryPage.clickAllItems();
      cy.url().should('include', '/inventory');
      inventoryPage.verifyOnInventoryPage();
    });

    /**
     * TC-ID        : TC_INV_003
     * Priority     : P1
     * Description  : Verify first 4 items can be added to cart; badge shows correct count
     * Expected     : Cart badge reads "4"
     */
    it('TC_INV_003 [P1] — Add first 4 items to cart; badge reflects count 4', () => {
      cy.addItemsToCart(4);
    });

    /**
     * TC-ID        : TC_INV_004
     * Priority     : P1
     * Description  : Verify product list sorts correctly by Name (Z → A)
     * Expected     : Product names array matches a reverse-alphabetical sort
     */
    it('TC_INV_004 [P1] — Products sorted by Name Z to A', () => {
      inventoryPage.sortProductsBy(SortOptions.nameZA);
      inventoryPage.getProductNames().then((names) => {
        const sorted = [...names].sort().reverse();
        expect(names).to.deep.equal(sorted);
      });
    });

    /**
     * TC-ID        : TC_INV_005
     * Priority     : P1
     * Description  : Verify product list sorts correctly by Price (Low → High)
     * Expected     : Product prices array is in ascending order
     */
    it('TC_INV_005 [P1] — Products sorted by Price Low to High', () => {
      inventoryPage.sortProductsBy(SortOptions.priceLowHigh);
      inventoryPage.getProductPrices().then((prices) => {
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sorted);
      });
    });

  });

  // ── Negative / Boundary Scenarios ───────────────────────────────────────

  context('Boundary Scenarios', () => {

    /**
     * TC-ID        : TC_INV_006
     * Priority     : P2
     * Description  : Verify logout via Main Menu redirects to login page
     * Expected     : URL is the app root; Login button is visible
     */
    it('TC_INV_006 [P2] — Logout via Main Menu redirects to login page', () => {
      AuthBusiness.logout();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
      cy.get(LoginSelectors.loginButton).should('be.visible');
    });

  });

});
