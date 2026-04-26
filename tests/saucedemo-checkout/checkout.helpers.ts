import { expect, type Page } from '@playwright/test';

export const products = {
  backpack: {
    name: 'Sauce Labs Backpack',
    add: '[data-test="add-to-cart-sauce-labs-backpack"]',
    remove: '[data-test="remove-sauce-labs-backpack"]',
    price: '$29.99',
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    add: '[data-test="add-to-cart-sauce-labs-bike-light"]',
    remove: '[data-test="remove-sauce-labs-bike-light"]',
    price: '$9.99',
  },
};

export async function login(page: Page) {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
}

export async function addProduct(page: Page, product: { add: string; remove: string }) {
  await page.locator(product.add).click();
  await expect(page.locator(product.remove)).toBeVisible();
}

export async function openCart(page: Page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
}

export async function goToCheckoutInformation(page: Page) {
  await openCart(page);
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
}

export async function completeCheckoutInformation(page: Page) {
  await page.locator('[data-test="firstName"]').fill('Ravi');
  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="postalCode"]').fill('560001');
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
}
