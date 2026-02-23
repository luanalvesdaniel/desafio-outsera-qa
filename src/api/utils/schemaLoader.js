import fs from 'fs';
import path from 'path';

export function loadSchema(schemaName) {
  try {
    const schemaPath = path.resolve('src/api/schemas', schemaName);
    return JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  } catch (err) {
    throw new Error('Erro ao carregar schema: ' + err.message);
  }
}
