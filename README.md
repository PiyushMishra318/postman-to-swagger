# postman-to-swagger

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen?logo=node.js&logoColor=white)](package.json)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs&logoColor=white)](https://nestjs.com/)

NestJS + TypeScript service that converts Postman collections to OpenAPI (Swagger) 2.0 JSON.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
git clone git@github.com:PiyushMishra318/postman-to-swagger.git
cd postman-to-swagger
npm install
```

## Usage

### Web UI (local or Vercel)

Open the static UI at `/` after deploy, or run locally:

```bash
npm run start:dev   # API on :3000
npx serve public    # UI (point app.js fetch to http://localhost:3000/convert)
```

Paste or upload a Postman collection JSON; Swagger UI renders the converted OpenAPI 2.0 spec.

### HTTP API

```bash
npm run start:dev
curl -X POST http://localhost:3000/convert \
  -H "Content-Type: application/json" \
  -d @postman.json
```

### Deploy (Vercel)

```bash
npx vercel --prod
```

Set no extra env vars. The `/convert` route is served by `api/convert.ts`; static files live in `public/`.

### Programmatic

```typescript
import { ConvertService } from './src/convert/convert.service';

const service = new ConvertService();
const swagger = service.convertPostmanToSwagger(collection);
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Start NestJS in watch mode |
| `npm run build` | Compile TypeScript |
| `npm test` | Run Jest unit tests |

## Project layout

```text
api/convert.ts        # Vercel serverless handler
public/               # Upload UI + Swagger UI
src/
├── convert/          # NestJS conversion module
├── app.module.ts
└── main.ts
```

## License

MIT © 2026 [Piyush Mishra](https://github.com/PiyushMishra318)
