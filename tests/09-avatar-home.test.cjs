const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('Ruta relativa de fotografía de inicio', () => {
  const source = fs.readFileSync('components/home.js', "utf8");
  assert.ok(source.includes('./assets/avatar-gabriela.png'));
});
