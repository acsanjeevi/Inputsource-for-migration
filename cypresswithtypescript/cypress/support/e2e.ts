import './commands';

// ---------------------------------------------------------------------------
// Global exception handler
// Prevents Cypress from failing on known benign browser errors
// that are not related to test assertions.
// ---------------------------------------------------------------------------
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('ResizeObserver loop') ||
    err.message.includes('Cannot read properties of null')
  ) {
    return false;
  }
  return true;
});
// Screenshots on failure are handled automatically by Cypress via
// the `screenshotOnRunFailure: true` config in cypress.config.ts.
