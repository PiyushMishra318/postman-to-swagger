declare module "postman-2-swagger" {
  function convert(collection: Record<string, unknown>): Record<string, unknown>;
  export = convert;
}
