const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('16-face-model-path.test.cjs', () => {
  const content = fs.readFileSync('src/face-detection.js', "utf8");
  assert.ok(content.includes('face_landmarker.task'));
});
