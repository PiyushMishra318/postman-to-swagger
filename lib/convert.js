import postman2swagger from "postman-2-swagger";

const convert = postman2swagger.default ?? postman2swagger;

export function convertPostmanToSwagger(postmanJson) {
  if (!postmanJson || typeof postmanJson !== "object") {
    throw new Error("Postman collection must be a JSON object");
  }
  return convert(postmanJson);
}

export function convertPostmanFileToSwagger(input, output, fs = globalThis) {
  const raw = fs.readFileSync(input, "utf8");
  const collection = JSON.parse(raw);
  const swagger = convertPostmanToSwagger(collection);
  fs.writeFileSync(output, JSON.stringify(swagger, null, 2), "utf8");
  return swagger;
}
