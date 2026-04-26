# SCRUM-101 Checkout Test Report

## 1. Executive Summary

| Metric | Count |
| --- | ---: |
| Test cases planned | 10 |
| Manual test cases executed | 10 |
| Automated test cases implemented | 10 |
| Browser project executions | 30 |
| Manual passed | 7 |
| Manual failed | 3 |
| Automated strict passes | 21 |
| Automated expected-fail defect checks | 9 |
| Automated unexpected failures | 0 |

Overall status: PASS with three open product defects. The Playwright suite is stable across Chromium, Firefox, and WebKit.

## 2. Manual Test Results

Manual exploratory testing was completed with Playwright MCP browser tools.

| Scenario | Result |
| --- | --- |
| TC-01 Complete checkout for two products | Pass with observation |
| TC-02 Required checkout fields show validation errors | Pass |
| TC-03 Cancel from checkout information returns to cart | Pass |
| TC-04 Cancel from checkout overview returns to inventory | Pass |
| TC-05 Continue Shopping returns to products | Pass |
| TC-06 Direct checkout access requires login | Pass |
| TC-07 Invalid checkout data is rejected | Fail |
| TC-08 Empty cart cannot proceed to checkout | Fail |
| TC-09 Cart review displays a cart total | Fail |
| TC-10 Checkout is usable on mobile viewport | Pass |

Evidence screenshots are stored under `test-results/evidence/`.

## 3. Automated Test Results

Initial automation run: `npx playwright test tests/saucedemo-checkout --reporter=line`

Final automation run after artifact-output healing: `npx playwright test tests/saucedemo-checkout --reporter=line`

| Browser | Strict Pass | Expected-Fail Defect Checks | Unexpected Failures |
| --- | ---: | ---: | ---: |
| Chromium | 7 | 3 | 0 |
| Firefox | 7 | 3 | 0 |
| WebKit | 7 | 3 | 0 |
| Total | 21 | 9 | 0 |

Final CLI summary: `30 passed (20.9s)`.

## 4. Healing Activities

| Activity | Result |
| --- | --- |
| Moved Playwright raw output away from `test-results/` | Prevented automated runs from deleting final reports and evidence screenshots. |
| Modeled confirmed application defects with `test.fail()` | Keeps the suite stable while still executing defect checks and detecting unexpected fixes. |
| Re-ran checkout suite across configured projects | Final execution completed with no unexpected failures. |

## 5. Defects Log

| Bug ID | Severity | Status | Summary |
| --- | --- | --- | --- |
| SCRUM-101-BUG-001 | Medium | Open | Cart page does not display subtotal, tax, or total calculation required by AC1. |
| SCRUM-101-BUG-002 | High | Open | Invalid special-character names and non-numeric postal code are accepted, contrary to AC5. |
| SCRUM-101-BUG-003 | High | Open | Empty cart can proceed to checkout, contrary to Business Rule 3. |

## 6. Summary and Recommendations

The checkout happy path, required-field validation, access control, navigation, order completion, cart clearing, and mobile usability are working across supported browsers.

Recommended next steps:
1. Add real format validation for checkout names and postal code, or clarify accepted data rules.
2. Block checkout when the cart is empty.
3. Add cart-page subtotal or revise AC1 to state totals are only required on checkout overview.
