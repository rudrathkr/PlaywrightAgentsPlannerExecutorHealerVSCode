import { expect, test } from '@playwright/test';
import { addProduct, login, openCart, products } from './checkout.helpers';

test.describe('SCRUM-101 checkout known defects', () => {
  test('TC-07 Invalid checkout data is rejected', async ({ page }) => {
    test.fail(true, 'SCRUM-101-BUG-002: current app accepts special characters and non-numeric postal code.');

    await login(page);
    await addProduct(page, products.backpack);
    await openCart(page);
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('@@@');
    await page.locator('[data-test="lastName"]').fill('###');
    await page.locator('[data-test="postalCode"]').fill('abc!');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('TC-08 Empty cart cannot proceed to checkout', async ({ page }) => {
    test.fail(true, 'SCRUM-101-BUG-003: current app allows checkout with an empty cart.');

    await login(page);
    await openCart(page);
    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.locator('[data-test="error"]')).toContainText(/cart|item/i);
  });

  test('TC-09 Cart review displays a cart total', async ({ page }) => {
    test.fail(true, 'SCRUM-101-BUG-001: current app shows totals only on checkout overview, not on the cart page.');

    await login(page);
    await addProduct(page, products.backpack);
    await addProduct(page, products.bikeLight);
    await openCart(page);

    await expect(page.locator('[data-test="subtotal-label"], [data-test="total-label"], .summary_total_label')).toBeVisible();
  });
});
