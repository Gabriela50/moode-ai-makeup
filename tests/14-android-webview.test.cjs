const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('14-android-webview.test.cjs', () => {
  const content = fs.readFileSync('mobile/App.js', "utf8");
  assert.ok(content.includes('react-native-webview'));
});
