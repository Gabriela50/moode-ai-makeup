const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('17-web-camera.test.cjs', () => {
  const content = fs.readFileSync('src/main.js', "utf8");
  assert.ok(content.includes('getUserMedia'));
});
