import reporter from 'multiple-cucumber-html-reporter';
import fs from 'fs';
import path from 'path';

// Filtra apenas arquivos de relatório Cucumber válidos
const reportsDir = 'reports';
const allowedFiles = ['e2e-report.json', 'api-report.json'];
const tempDir = 'reports/_cucumber_only';

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Copia apenas os arquivos permitidos
allowedFiles.forEach(file => {
  const src = path.join(reportsDir, file);
  const dest = path.join(tempDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
});

reporter.generate({
  jsonDir: tempDir,
  reportPath: 'reports/e2e-final-report',
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local machine',
    platform: {
      name: 'windows'
    }
  }
});
