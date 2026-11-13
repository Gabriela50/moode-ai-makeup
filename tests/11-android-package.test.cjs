const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('11-android-package.test.cjs', () => {
  const content = fs.readFileSync('mobile/app.json', "utf8");
  assert.ok(content.includes('"package": "com.gabriela.moode"'));
});
