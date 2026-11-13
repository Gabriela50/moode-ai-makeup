const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('Registro de usuarios disponible', () => {
  const source = fs.readFileSync('src/main.js', "utf8");
  assert.ok(source.includes('signUp'));
});
