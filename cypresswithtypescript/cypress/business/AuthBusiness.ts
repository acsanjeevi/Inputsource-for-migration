import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

/**
 * AuthBusiness — High-level authentication flows.
 *
 * Combines LoginPage and InventoryPage actions into full user journeys.
 * Used by custom Cypress commands and spec beforeEach hooks.
 */
export class AuthBusiness {

  /**
   * Full login flow: navigate → login with retry → verify inventory page.
   * This is the canonical setup step for all authenticated test scenarios.
   *
   * @param username   - SauceDemo username
   * @param password   - SauceDemo password
   * @param maxRetries - Retry attempts for flaky standard_user (default: 3)
   */
  static loginAndVerifyInventory(username: string, password: string, maxRetries = 3): void {
    loginPage.navigate();
    loginPage.loginWithRetry(username, password, maxRetries);
    inventoryPage.verifyOnInventoryPage();
  }

  /**
   * Logs out via the hamburger main menu and asserts the user
   * is redirected back to the login page root.
   */
  static logout(): void {
    inventoryPage.openMainMenu();
    inventoryPage.clickLogout();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  }
}
