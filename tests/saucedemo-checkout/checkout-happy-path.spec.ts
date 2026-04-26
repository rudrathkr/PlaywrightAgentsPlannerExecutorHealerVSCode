import { expect, test } from '@playwright/test';
import { addProduct, completeCheckoutInformation, goToCheckoutInformation, login, openCart, products } from './checkout.helpers';

test.describe('SCRUM-101 checkout happy path', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC-01 Complete checkout for two products', async ({ page }) => {
    // 1. Add two products to the cart.
    await addProduct(page, products.backpack);
    await addProduct(page, products.bikeLight);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // 2. Review the cart item details and available actions.
    await openCart(page);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    await expect(page.getByText(products.backpack.name)).toBeVisible();
    await expect(page.getByText(products.bikeLight.name)).toBeVisible();
    await expect(page.getByText(products.backpack.price)).toBeVisible();
    await expect(page.getByText(products.bikeLight.price)).toBeVisible();
    await expect(page.locator('[data-test="item-quantity"]')).toHaveText(['1', '1']);
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    // 3. Complete checkout information and verify the overview.
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await completeCheckoutInformation(page);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    await expect(page.getByText('Payment Information:')).toBeVisible();
    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Shipping Information:')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $39.98');
    await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $3.20');
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $43.18');

    // 4. Finish the order and verify completion clears the cart badge.
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);

    // 5. Return home from the confirmation page.
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('TC-10 Checkout is usable on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await addProduct(page, products.backpack);
    await goToCheckoutInformation(page);
    await completeCheckoutInformation(page);

    await expect(page.locator('[data-test="finish"]')).toBeVisible();
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(horizontalOverflow).toBe(false);
  });
});
