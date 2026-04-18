/**
 * Selector constants for the Login page.
 * Centralises all CSS/attribute selectors — update here if the DOM changes.
 */
export const LoginSelectors = {
  usernameInput:      '#user-name',
  passwordInput:      '#password',
  loginButton:        '#login-button',
  errorMessage:       '[data-test="error"]',
  errorButton:        '[data-test="error-button"]',
  changePasswordOk:   '[data-test="change-password-ok"]',
} as const;
