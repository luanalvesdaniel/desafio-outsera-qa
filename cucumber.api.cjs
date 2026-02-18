module.exports = {
  default: [
    'tests/api/features/**/*.feature',
    '--require tests/api/support/world.js',
    '--require tests/api/step-definitions/**/*.js',
    '--require src/api/hooks/hooks.js',
    '--format progress',
    '--format json:reports/api-report.json',
    '--format html:reports/api-report.html'
  ].join(' ')
};
