import dotenv from 'dotenv';
import fs from 'fs';

export function loadEnvByTarget(target) {
  const envFile = `.env.${target}`;
  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
    console.log(`Ambiente carregado: ${envFile}`);
  } else {
    dotenv.config();
    console.log('Ambiente padrão carregado (.env)');
  }
}
