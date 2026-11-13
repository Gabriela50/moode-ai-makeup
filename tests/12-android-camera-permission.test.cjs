const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('12-android-camera-permission.test.cjs', () => {
  const content = fs.readFileSync('mobile/app.json', "utf8");
  assert.ok(content.includes('android.permission.CAMERA'));
});
