const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('19-avatar-home.test.cjs', () => {
  const content = fs.readFileSync('components/home.js', "utf8");
  assert.ok(content.includes('./assets/avatar-gabriela.png'));
});
