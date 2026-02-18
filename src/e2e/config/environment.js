import dotenv from 'dotenv';

dotenv.config();

export const e2eConfig = {
  baseURL: process.env.E2E_BASE_URL,
  loginURL: process.env.E2E_LOGIN_URL,
  user: process.env.E2E_USER,
  password: process.env.E2E_PASSWORD,
  timeout: Number(process.env.E2E_TIMEOUT)
};
