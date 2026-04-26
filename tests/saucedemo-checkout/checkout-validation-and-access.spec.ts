import { expect, test } from '@playwright/test';
import { addProduct, goToCheckoutInformation, login, products } from './checkout.helpers';

test.describe('SCRUM-101 checkout validation and access control', () => {
  test('TC-02 Required checkout fields show validation errors', async ({ page }) => {
    await login(page);
    await addProduct(page, products.backpack);
    await goToCheckoutInformation(page);

    // 1. All fields are empty.
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

    // 2. Last name is empty.
    await page.locator('[data-test="firstName"]').fill('Ravi');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');

    // 3. Postal code is empty.
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
  });

  test('TC-06 Direct checkout access requires login', async ({ page }) => {
    await page.goto('/checkout-step-one.html');

    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.");
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
