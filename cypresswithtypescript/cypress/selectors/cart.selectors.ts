/**
 * Selector constants for the Shopping Cart page.
 */
export const CartSelectors = {
  cartLink:               '.shopping_cart_link',
  cartItems:              '.cart_item',
  cartItemName:           '.inventory_item_name',
  removeButton:           '[data-test^="remove"]',
  continueShoppingButton: '[data-test="continue-shopping"]',
  checkoutButton:         '[data-test="checkout"]',
  cartBadge:              '.shopping_cart_badge',
} as const;
