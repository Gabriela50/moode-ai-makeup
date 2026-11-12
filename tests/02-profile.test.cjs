const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("MOODÉ contiene el perfil", () => {
  const source = fs.readFileSync("components/profile.js", "utf8");
  assert.match(source, /avatar-gabriela\.png/);
});
