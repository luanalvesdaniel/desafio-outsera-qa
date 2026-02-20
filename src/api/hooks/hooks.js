import { AfterAll } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

AfterAll(function () {
  const dir = path.resolve('reports');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
