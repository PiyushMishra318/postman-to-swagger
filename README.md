# postman-to-swagger

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen?logo=node.js&logoColor=white)](package.json)

Convert a [Postman collection](https://learning.postman.com/docs/collections/collections-overview/) JSON file into **Swagger / OpenAPI 2.0** JSON.

Built on [`postman-2-swagger`](https://www.npmjs.com/package/postman-2-swagger).

## Requirements

- Node.js 18+

## Installation

```bash
git clone git@github.com:PiyushMishra318/postman-to-swagger.git
cd postman-to-swagger
npm install
```

## Usage

```bash
# default: postman.json -> swagger.json
npm run convert

# custom paths
node index.js ./my.postman.json ./openapi.json
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run convert` | Convert default `postman.json` to `swagger.json` |
| `npm test` | Run unit tests |

## Project layout

```text
.
├── index.js          # CLI entrypoint
├── lib/convert.js    # conversion helpers
├── postman.json      # sample input collection
└── test/             # node:test suite
```

## License

MIT © 2026 [Piyush Mishra](https://github.com/PiyushMishra318)
