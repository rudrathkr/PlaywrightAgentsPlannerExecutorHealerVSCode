# SCRUM-101 Manual Exploratory Test Results

## Environment

| Item | Value |
| --- | --- |
| Application | SauceDemo |
| URL | `https://www.saucedemo.com` |
| User | `standard_user` |
| Browser Tooling | Playwright MCP browser tools |
| Execution Date | 2026-04-26 |

## Execution Summary

| Scenario | Result | Notes |
| --- | --- | --- |
| TC-01 Complete checkout for two products | Pass with observation | Cart item details and order completion work. Cart total appears on overview, not on cart page. |
| TC-02 Required checkout fields | Pass | Empty fields produce required-field errors in first-name, last-name, postal-code order. |
| TC-03 Cancel from checkout information | Pass | Cancel returns to cart with cart contents retained. |
| TC-04 Cancel from checkout overview | Pass | Cancel returns to inventory with cart state retained. |
| TC-05 Continue Shopping | Pass | Continue Shopping returns to product listing with cart state retained. |
| TC-06 Direct checkout requires login | Pass | Direct checkout URL redirects to login with access-control error. |
| TC-07 Invalid checkout data | Fail | Special characters and non-numeric postal code are accepted. |
| TC-08 Empty cart checkout | Fail | Empty cart can proceed to checkout information and overview. |
| TC-09 Cart total on cart page | Fail | Cart page has item prices but no subtotal/tax/total calculation. |
| TC-10 Mobile checkout usability | Pass | Primary checkout controls remain visible at a mobile viewport. |

## Evidence

| Evidence | Description |
| --- | --- |
| `test-results/evidence/scrum-101-cart-review.png` | Cart review with two products. |
| `test-results/evidence/scrum-101-checkout-info-first-name-required.png` | Required-field validation error. |
| `test-results/evidence/scrum-101-checkout-overview.png` | Checkout overview totals and summary. |
| `test-results/evidence/scrum-101-order-complete.png` | Order confirmation and cleared cart badge. |

## Defects Found

| Bug ID | Severity | Area | Summary |
| --- | --- | --- | --- |
| SCRUM-101-BUG-001 | Medium | Cart Review | Cart page does not display subtotal, tax, or total calculation required by AC1. |
| SCRUM-101-BUG-002 | High | Checkout Validation | Invalid special-character names and non-numeric postal code are accepted, contrary to AC5. |
| SCRUM-101-BUG-003 | High | Checkout Business Rule | Empty cart can proceed to checkout, contrary to Business Rule 3. |

## Additional Observations

- The app exposes stable `data-test` attributes for all core checkout controls.
- Backtrace telemetry calls return unauthorized or disconnected errors in browser console; these did not block checkout functionality.
- In the MCP browser session, direct DOM activation was needed for some button clicks, while standard Playwright test execution with `locator.click()` worked normally in test runs.
