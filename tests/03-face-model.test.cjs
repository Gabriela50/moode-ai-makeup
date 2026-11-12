const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("El modelo de detección facial está disponible", () => {
  assert.ok(fs.existsSync("public/models/face_landmarker.task"));
});
