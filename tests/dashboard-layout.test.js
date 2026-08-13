const fs = require("fs");
const path = require("path");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const styles = fs.readFileSync(
  path.join(__dirname, "../app/static/styles.css"),
  "utf8"
);

function getCssRule(selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = styles.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));
  return match ? match[1] : "";
}

test("transaction status badges remain in the table cell flow", () => {
  const statusBadgeRule = getCssRule(".status-badge");

  assert.match(statusBadgeRule, /display:\s*inline-flex/);
  assert.doesNotMatch(statusBadgeRule, /position\s*:\s*absolute\b/);
  assert.doesNotMatch(statusBadgeRule, /margin-left\s*:\s*-/);
  assert.doesNotMatch(statusBadgeRule, /z-index\s*:/);
});

test("transfer form actions stay aligned within the form card", () => {
  const formActionsRule = getCssRule(".form-actions");

  assert.doesNotMatch(formActionsRule, /margin-left\s*:\s*\d+px/);
});
