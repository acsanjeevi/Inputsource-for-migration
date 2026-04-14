/**
 * Selector constants for the Checkout flow pages (step 1, step 2, and confirmation).
 */
export const CheckoutSelectors = {
  firstNameInput:     '[data-test="firstName"]',
  lastNameInput:      '[data-test="lastName"]',
  postalCodeInput:    '[data-test="postalCode"]',
  continueButton:     '[data-test="continue"]',
  cancelButton:       '[data-test="cancel"]',
  finishButton:       '[data-test="finish"]',
  confirmationHeader: '.complete-header',
  confirmationText:   '.complete-text',
  backHomeButton:     '[data-test="back-to-products"]',
  errorMessage:       '[data-test="error"]',
  summaryItems:       '.cart_item',
  summaryTotal:       '.summary_total_label',
} as const;
