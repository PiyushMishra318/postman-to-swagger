#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { convertPostmanFileToSwagger } from "./lib/convert.js";

const args = process.argv.slice(2);

function printHelp() {
  console.log(`postman-to-swagger — convert a Postman collection to Swagger 2.0 JSON

Usage:
  postman-to-swagger [input] [output]

Arguments:
  input   Postman collection JSON (default: ./postman.json)
  output  Swagger JSON output path (default: ./swagger.json)

Examples:
  postman-to-swagger
  postman-to-swagger ./my.postman.json ./openapi.json
  npm run convert -- ./postman.json ./swagger.json`);
}

if (args.includes("-h") || args.includes("--help")) {
  printHelp();
  process.exit(0);
}

const input = path.resolve(args[0] ?? "postman.json");
const output = path.resolve(args[1] ?? "swagger.json");

try {
  convertPostmanFileToSwagger(input, output, fs);
  console.log(`Wrote ${output}`);
} catch (error) {
  console.error(`postman-to-swagger: ${error.message}`);
  process.exit(1);
}
