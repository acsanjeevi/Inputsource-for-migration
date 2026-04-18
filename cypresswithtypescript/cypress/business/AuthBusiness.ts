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

  static ensureLoginPage(): void {
    const baseUrl = String(Cypress.config('baseUrl') || '').replace(/\/$/, '');

    cy.url().then((currentUrl) => {
      if (currentUrl === 'about:blank') {
        loginPage.navigate();
        return;
      }

      const normalizedUrl = currentUrl.replace(/\/$/, '');
      if (normalizedUrl === baseUrl) {
        loginPage.prepareForNewAttempt();
        return;
      }

      this.logout();
      loginPage.prepareForNewAttempt();
    });

    cy.get('#login-button').should('be.visible');
  }

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

  static ensureAuthenticatedAtInventory(username: string, password: string, maxRetries = 3): void {
    const baseUrl = String(Cypress.config('baseUrl') || '').replace(/\/$/, '');

    cy.url().then((currentUrl) => {
      if (currentUrl === 'about:blank') {
        this.loginAndVerifyInventory(username, password, maxRetries);
        return;
      }

      const normalizedUrl = currentUrl.replace(/\/$/, '');
      if (normalizedUrl === baseUrl) {
        loginPage.prepareForNewAttempt();
        loginPage.loginWithRetry(username, password, maxRetries);
        return;
      }

      if (currentUrl.includes('/inventory')) {
        inventoryPage.resetAppState();
        return;
      }

      inventoryPage.resetAppStateAndReturnToInventory();
    });

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
