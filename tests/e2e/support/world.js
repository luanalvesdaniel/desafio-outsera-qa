import {
  setWorldConstructor,
  Before,
  AfterStep,
  setDefaultTimeout
} from '@cucumber/cucumber';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
setDefaultTimeout(60000);

class CustomWorld {
  constructor() {
    this.browser = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({
    headless: process.env.E2E_HEADLESS === 'true'
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});


AfterStep(async function ({ result }) {
  if (result?.status === 'FAILED') {
    const dir = 'reports/screenshots';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const fileName = `${Date.now()}-failed-step.png`;
    const filePath = path.join(dir, fileName);
    await this.page.screenshot({ path: filePath, fullPage: true });
    if (typeof this.attach === 'function') {
      const image = fs.readFileSync(filePath);
      await this.attach(image.toString('base64'), 'image/png');
    }
  }
});
