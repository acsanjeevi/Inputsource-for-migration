import { LoginSelectors } from '../selectors/login.selectors';

/**
 * Page Object Model — Login Page
 *
 * Encapsulates all interactions with the SauceDemo login page.
 * Retry and popup-dismissal logic is colocated here to keep spec files clean.
 */
export class LoginPage {

  /** Navigate to the application root (login page). */
  navigate(): void {
    // Increase the per-call timeout above the global value for first cold load.
    cy.visit('/', { timeout: 120000 });
  }

  prepareForNewAttempt(): void {
    cy.clearLocalStorage();
    cy.get('body').then(($body) => {
      if ($body.find(LoginSelectors.errorButton).length > 0) {
        cy.get(LoginSelectors.errorButton).click();
      }
    });
    cy.get(LoginSelectors.usernameInput).clear();
    cy.get(LoginSelectors.passwordInput).clear();
  }

  enterUsername(username: string): void {
    cy.get(LoginSelectors.usernameInput).clear().type(username);
  }

  enterPassword(password: string): void {
    cy.get(LoginSelectors.passwordInput).clear().type(password);
  }

  clickLogin(): void {
    cy.get(LoginSelectors.loginButton).click();
  }

  /**
   * Dismisses the optional "Change Password" popup when it appears.
   * Falls back to a generic "OK" button if the specific selector is absent.
   */
  dismissChangePasswordPopup(): void {
    cy.get('body').then(($body) => {
      if ($body.find(LoginSelectors.changePasswordOk).length > 0) {
        cy.get(LoginSelectors.changePasswordOk).click();
      } else if ($body.find('button:contains("OK")').length > 0) {
        cy.contains('button', 'OK').click();
      }
    });
  }

  /**
   * Attempts login, retrying up to `maxRetries` times if an error banner appears.
   * Handles the optional "Change Password" popup after a successful login.
   *
   * @param username   - SauceDemo username
   * @param password   - SauceDemo password
   * @param maxRetries - Maximum login attempts (default: 3)
   */
  loginWithRetry(username: string, password: string, maxRetries = 3): void {
    const attemptLogin = (remainingRetries: number): void => {
      this.enterUsername(username);
      this.enterPassword(password);
      this.clickLogin();

      cy.get('body').then(($body) => {
        const hasError = $body.find(LoginSelectors.errorMessage).length > 0;
        if (hasError && remainingRetries > 1) {
          cy.wait(1000);
          attemptLogin(remainingRetries - 1);
        }
      });
    };

    attemptLogin(maxRetries);
    this.dismissChangePasswordPopup();
  }

  /** Returns the error message element for assertion chaining. */
  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(LoginSelectors.errorMessage);
  }
}
