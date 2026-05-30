import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import postman2swagger from 'postman-2-swagger';

const convert =
  (postman2swagger as unknown as { default?: typeof postman2swagger }).default ??
  postman2swagger;

@Injectable()
export class ConvertService {
  convertPostmanToSwagger(postmanJson: Record<string, unknown>) {
    if (!postmanJson || typeof postmanJson !== 'object') {
      throw new Error('Postman collection must be a JSON object');
    }
    return convert(postmanJson);
  }

  convertPostmanFileToSwagger(inputPath: string, outputPath: string) {
    const raw = fs.readFileSync(inputPath, 'utf8');
    const collection = JSON.parse(raw) as Record<string, unknown>;
    const swagger = this.convertPostmanToSwagger(collection);
    fs.writeFileSync(outputPath, JSON.stringify(swagger, null, 2), 'utf8');
    return swagger;
  }
}
