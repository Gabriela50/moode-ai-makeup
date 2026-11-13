const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test('Ruta relativa de fotografía de perfil', () => {
  const source = fs.readFileSync('components/profile.js', "utf8");
  assert.ok(source.includes('./assets/avatar-gabriela.png'));
});
