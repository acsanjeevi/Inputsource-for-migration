/**
 * MODULE  : Login
 * SPEC    : cypress/e2e/login/login.cy.ts
 * COVERS  : TC_LOGIN_001 (P0) · TC_LOGIN_002 (P1) · TC_LOGIN_003 (P2)
 *
 * All test data is loaded from cypress/fixtures/users.json.
 * Login interactions use LoginPage directly — no credential hard-coding in specs.
 */

import { LoginPage } from '../../pages/LoginPage';
import type { Users } from '../../types';

const loginPage = new LoginPage();

describe('Login Module — SauceDemo', () => {
  let users: Users;

  before(() => {
    cy.fixture<Users>('login.data').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    loginPage.navigate();
  });

  // ── Positive Scenarios ──────────────────────────────────────────────────

  context('Positive Scenarios', () => {

    /**
     * TC-ID        : TC_LOGIN_001
     * Priority     : P0
     * Description  : Verify successful login with standard_user (retry enabled)
     * Precondition : App is accessible at https://www.saucedemo.com
     * Expected     : User lands on /inventory.html with products visible
     */
    it('TC_LOGIN_001 [P0] — Successful login with standard_user (retry enabled)', () => {
      loginPage.loginWithRetry(users.standardUser.username, users.standardUser.password, 3);
      cy.url().should('include', '/inventory');
      cy.get('.inventory_list').should('be.visible');
    });

  });

  // ── Negative Scenarios ───────────────────────────────────────────────────

  context('Negative Scenarios', () => {

    /**
     * TC-ID        : TC_LOGIN_002
     * Priority     : P1
     * Description  : Verify login is blocked for locked_out_user
     * Precondition : App is accessible
     * Expected     : Error banner — "Epic sadface: Sorry, this user has been locked out."
     */
    it('TC_LOGIN_002 [P1] — Login blocked for locked_out_user', () => {
      loginPage.enterUsername(users.lockedOutUser.username);
      loginPage.enterPassword(users.lockedOutUser.password);
      loginPage.clickLogin();
      loginPage.getErrorMessage()
        .should('be.visible')
        .and('contain.text', 'locked out');
      cy.url().should('not.include', '/inventory');
    });

    /**
     * TC-ID        : TC_LOGIN_003
     * Priority     : P2
     * Description  : Verify login fails when both username and password are empty
     * Precondition : App is accessible
     * Expected     : Error banner — "Epic sadface: Username is required"
     */
    it('TC_LOGIN_003 [P2] — Login fails with empty credentials', () => {
      loginPage.clickLogin();
      loginPage.getErrorMessage()
        .should('be.visible')
        .and('contain.text', 'Username is required');
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    });

  });

});
