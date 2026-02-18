import dotenv from 'dotenv';

dotenv.config();

export default {
  timeout: 30000,
  use: {
    ignoreHTTPSErrors: true,
    headless: process.env.E2E_HEADLESS === 'true'
  }
};
