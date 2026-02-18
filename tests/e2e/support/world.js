import {
  setWorldConstructor,
  Before,
  After,
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

After(async function (scenario) {

  const dir = 'reports/screenshots';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(
    dir,
    `${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`
  );

  await this.page.screenshot({ path: filePath, fullPage: true });

  await this.browser.close();
});

