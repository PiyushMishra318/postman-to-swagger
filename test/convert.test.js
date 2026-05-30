import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import os from "os";
import path from "path";
import { convertPostmanToSwagger, convertPostmanFileToSwagger } from "../lib/convert.js";

test("converts a minimal Postman collection", () => {
  const collection = {
    info: { name: "Example", schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json" },
    item: [],
  };
  const swagger = convertPostmanToSwagger(collection);
  assert.equal(typeof swagger, "object");
  assert.ok(swagger.swagger || swagger.openapi || swagger.info);
});

test("writes swagger file to disk", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pts-"));
  const input = path.join(dir, "in.json");
  const output = path.join(dir, "out.json");
  fs.writeFileSync(
    input,
    JSON.stringify({ info: { name: "Tmp" }, item: [] }),
    "utf8"
  );
  convertPostmanFileToSwagger(input, output, fs);
  assert.ok(fs.existsSync(output));
});
