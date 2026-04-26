# SCRUM-101 SauceDemo Checkout Test Plan

## Scope

This plan validates the SauceDemo checkout flow for a logged-in `standard_user` at `https://www.saucedemo.com`.
It covers cart review, checkout information entry, order overview, order completion, error handling, navigation, access control, and mobile usability.

## Test Data

| Data Type | Value |
| --- | --- |
| Username | `standard_user` |
| Password | `secret_sauce` |
| First name | `Ravi` |
| Last name | `Tester` |
| Postal code | `560001` |
| Invalid first name | `@@@` |
| Invalid last name | `###` |
| Invalid postal code | `abc!` |
| Products | `Sauce Labs Backpack`, `Sauce Labs Bike Light` |

## Stable Selectors Observed

| Element | Selector |
| --- | --- |
| Username input | `[data-test="username"]` |
| Password input | `[data-test="password"]` |
| Login button | `[data-test="login-button"]` |
| Cart link | `[data-test="shopping-cart-link"]` |
| Cart badge | `[data-test="shopping-cart-badge"]` |
| Backpack add/remove | `[data-test="add-to-cart-sauce-labs-backpack"]`, `[data-test="remove-sauce-labs-backpack"]` |
| Bike Light add/remove | `[data-test="add-to-cart-sauce-labs-bike-light"]`, `[data-test="remove-sauce-labs-bike-light"]` |
| Cart item | `[data-test="inventory-item"]` |
| Checkout button | `[data-test="checkout"]` |
| First name | `[data-test="firstName"]` |
| Last name | `[data-test="lastName"]` |
| Postal code | `[data-test="postalCode"]` |
| Continue button | `[data-test="continue"]` |
| Error message | `[data-test="error"]` |
| Finish button | `[data-test="finish"]` |
| Back Home button | `[data-test="back-to-products"]` |

## Scenarios

### TC-01 Complete checkout for two products

**Coverage:** AC1, AC2, AC3, AC4, Business Rule 4

**Steps:**
1. Navigate to the application URL.
2. Log in with `standard_user` and `secret_sauce`.
3. Add `Sauce Labs Backpack` and `Sauce Labs Bike Light` to the cart.
4. Verify the cart badge shows `2`.
5. Open the cart page.
6. Verify each cart item shows name, description, price, and quantity `1`.
7. Verify Continue Shopping and Checkout actions are visible.
8. Proceed to checkout.
9. Enter valid first name, last name, and postal code.
10. Continue to overview.
11. Verify both order items, payment information, shipping information, item subtotal, tax, and total.
12. Finish the order.
13. Verify the confirmation page displays a success message and Back Home button.
14. Verify the cart badge is cleared after order completion.

**Expected Results:**
The order completes successfully, the overview total is `$43.18` for the selected products, and the cart is cleared.

### TC-02 Required checkout fields show validation errors

**Coverage:** AC2

**Steps:**
1. Log in and add a product to the cart.
2. Proceed to checkout information.
3. Click Continue with all fields empty.
4. Enter only First Name and click Continue.
5. Enter First Name and Last Name but leave Postal Code empty, then click Continue.

**Expected Results:**
The page remains on checkout information and displays, in order, `Error: First Name is required`, `Error: Last Name is required`, and `Error: Postal Code is required`.

### TC-03 Cancel from checkout information returns to cart

**Coverage:** Business Rule 5, navigation flow

**Steps:**
1. Log in and add a product to the cart.
2. Open the cart and click Checkout.
3. Click Cancel on the checkout information page.

**Expected Results:**
The user returns to the cart page and the selected product remains in the cart.

### TC-04 Cancel from checkout overview returns to inventory

**Coverage:** Business Rule 5, navigation flow

**Steps:**
1. Log in and add a product to the cart.
2. Complete checkout information with valid values.
3. Click Cancel on the checkout overview page.

**Expected Results:**
The user returns to the inventory page and the cart badge still reflects the selected product.

### TC-05 Continue Shopping returns to products

**Coverage:** AC1, navigation flow

**Steps:**
1. Log in and add a product to the cart.
2. Open the cart.
3. Click Continue Shopping.

**Expected Results:**
The user returns to the inventory page and the cart state is preserved.

### TC-06 Direct checkout access requires login

**Coverage:** Business Rule 2

**Steps:**
1. Start a fresh unauthenticated browser context.
2. Navigate directly to `/checkout-step-one.html`.

**Expected Results:**
The user is redirected to the login page and sees an error explaining checkout requires login.

### TC-07 Invalid checkout data is rejected

**Coverage:** AC5

**Steps:**
1. Log in and add a product to the cart.
2. Proceed to checkout information.
3. Enter special characters in name fields and non-numeric postal code.
4. Click Continue.

**Expected Results:**
The user remains on checkout information and sees an appropriate validation error.

**Current Observation:**
SauceDemo currently accepts this data and proceeds to overview. This is tracked as `SCRUM-101-BUG-002`.

### TC-08 Empty cart cannot proceed to checkout

**Coverage:** Business Rule 3

**Steps:**
1. Log in without adding any products.
2. Open the cart page.
3. Click Checkout.

**Expected Results:**
The user remains on the cart page or sees an error that checkout requires at least one item.

**Current Observation:**
SauceDemo currently allows checkout with an empty cart and shows `Total: $0.00` on overview. This is tracked as `SCRUM-101-BUG-003`.

### TC-09 Cart review displays a cart total

**Coverage:** AC1

**Steps:**
1. Log in and add two products.
2. Open the cart page.
3. Review cart summary.

**Expected Results:**
The cart page displays a total price calculation before checkout.

**Current Observation:**
SauceDemo displays item prices in the cart, but subtotal, tax, and total only appear on checkout overview. This is tracked as `SCRUM-101-BUG-001`.

### TC-10 Checkout is usable on mobile viewport

**Coverage:** Technical Notes, mobile responsiveness

**Steps:**
1. Set viewport to a mobile size.
2. Log in and add one product.
3. Open the cart and proceed to checkout information.
4. Enter valid checkout information and continue to overview.

**Expected Results:**
Checkout controls remain visible and no horizontal overflow is introduced.
