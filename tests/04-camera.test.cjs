const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("La aplicación solicita acceso a la cámara", () => {
  const source = fs.readFileSync("src/main.js", "utf8");
  assert.match(source, /getUserMedia/);
});
