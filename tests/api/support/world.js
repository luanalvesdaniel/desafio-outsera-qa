import { setWorldConstructor, setDefaultTimeout } from '@cucumber/cucumber';
import { loadEnvByTarget } from '../../../src/config/envLoader.js';
const target = process.env.TARGET_ENV || 'qa';
loadEnvByTarget(target);

class ApiWorld {
  constructor() {
    this.baseUrl = process.env.API_BASE_URL || 'http://localhost:3001';
    this.response = null;
    this.requestPayload = null;
    this.headers = {};
  }
}

setWorldConstructor(ApiWorld);
setDefaultTimeout(30000);
