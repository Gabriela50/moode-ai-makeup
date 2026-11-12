const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("MOODÉ contiene su pantalla de inicio", () => {
  const source = fs.readFileSync("components/home.js", "utf8");
  assert.match(source, /moode-avatar-image/);
});
