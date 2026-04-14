/**
 * Selector constants for the Inventory (product listing) page.
 */
export const InventorySelectors = {
  inventoryContainer: '.inventory_list',
  inventoryItems:     '.inventory_item',
  addToCartButtons:   '[data-test^="add-to-cart"]',
  removeButtons:      '[data-test^="remove"]',
  cartBadge:          '.shopping_cart_badge',
  cartLink:           '.shopping_cart_link',
  menuButton:         '#react-burger-menu-btn',
  menuCloseButton:    '#react-burger-cross-btn',
  allItemsLink:       '#inventory_sidebar_link',
  logoutLink:         '#logout_sidebar_link',
  sortDropdown:       '[data-test="product-sort-container"]',
  productNames:       '.inventory_item_name',
  productPrices:      '.inventory_item_price',
} as const;

/** Valid option values for the product sort dropdown. */
export const SortOptions = {
  nameAZ:        'az',
  nameZA:        'za',
  priceLowHigh:  'lohi',
  priceHighLow:  'hilo',
} as const;

export type SortOption = typeof SortOptions[keyof typeof SortOptions];
