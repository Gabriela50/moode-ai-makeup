const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('20-avatar-profile.test.cjs', () => {
  const content = fs.readFileSync('components/profile.js', "utf8");
  assert.ok(content.includes('./assets/avatar-gabriela.png'));
});
