const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('13-android-https.test.cjs', () => {
  const content = fs.readFileSync('mobile/App.js', "utf8");
  assert.ok(content.includes('moode-ai-makeup-pw71.vercel.app'));
});
