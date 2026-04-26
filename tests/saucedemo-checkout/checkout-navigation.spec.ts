import { expect, test } from '@playwright/test';
import { addProduct, completeCheckoutInformation, goToCheckoutInformation, login, openCart, products } from './checkout.helpers';

test.describe('SCRUM-101 checkout navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC-03 Cancel from checkout information returns to cart', async ({ page }) => {
    await addProduct(page, products.backpack);
    await goToCheckoutInformation(page);

    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.getByText(products.backpack.name)).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('TC-04 Cancel from checkout overview returns to inventory', async ({ page }) => {
    await addProduct(page, products.backpack);
    await goToCheckoutInformation(page);
    await completeCheckoutInformation(page);

    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('TC-05 Continue Shopping returns to products and preserves cart', async ({ page }) => {
    await addProduct(page, products.backpack);
    await openCart(page);

    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.locator(products.backpack.remove)).toBeVisible();
  });
});
