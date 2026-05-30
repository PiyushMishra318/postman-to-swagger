import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ConvertService } from './convert.service';

describe('ConvertService', () => {
  let service: ConvertService;

  beforeEach(() => {
    service = new ConvertService();
  });

  it('converts a minimal Postman collection', () => {
    const collection = {
      info: {
        name: 'Example',
        schema:
          'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
      },
      item: [],
    };
    const swagger = service.convertPostmanToSwagger(collection);
    expect(typeof swagger).toBe('object');
    expect(swagger).toHaveProperty('info');
  });

  it('writes swagger file to disk', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pts-'));
    const input = path.join(dir, 'in.json');
    const output = path.join(dir, 'out.json');
    fs.writeFileSync(
      input,
      JSON.stringify({ info: { name: 'Tmp' }, item: [] }),
      'utf8',
    );
    service.convertPostmanFileToSwagger(input, output);
    expect(fs.existsSync(output)).toBe(true);
  });
});
