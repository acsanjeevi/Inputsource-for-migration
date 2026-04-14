/**
 * Global type definitions for the ICEPOT SauceDemo automation framework.
 * Used by fixture loaders, business functions, and spec files.
 */

export interface User {
  username: string;
  password: string;
}

export interface Users {
  standardUser: User;
  lockedOutUser: User;
  problemUser: User;
  performanceGlitchUser: User;
  errorUser: User;
  visualUser: User;
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface CheckoutFixtures {
  validCheckout: CheckoutData;
}
