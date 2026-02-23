module.exports = {
  default: [
    'tests/e2e/features/**/*.feature',
    '--require tests/e2e/support/world.js',
    '--require tests/e2e/support/**/*.js',
    '--require tests/e2e/step-definitions/**/*.js',
    '--format progress',
    '--format json:reports/e2e-report.json',
    '--format html:reports/e2e-report.html',
    '--exit'
  ].join(' ')
};
