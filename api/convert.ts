import type { VercelRequest, VercelResponse } from '@vercel/node';
import postman2swagger from 'postman-2-swagger';

const convert =
  (postman2swagger as unknown as { default?: typeof postman2swagger }).default ??
  postman2swagger;

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Postman collection must be a JSON object' });
    }
    const swagger = convert(body as Record<string, unknown>);
    return res.status(200).json(swagger);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Conversion failed';
    return res.status(400).json({ error: message });
  }
}
