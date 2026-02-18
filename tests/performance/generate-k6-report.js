import fs from 'fs';

const summary = JSON.parse(
  fs.readFileSync('reports/k6-summary.json', 'utf-8')
);

const duration = summary.metrics.http_req_duration;
const avg = duration.avg ?? 0;
const p95 = duration['p(95)'] ?? 0;
const p99 = duration['p(99)'] ?? 0;
const max = duration.max ?? 0;
const totalReqs = summary.metrics.http_reqs?.count ?? 0;
const failRate = summary.metrics.http_req_failed?.rate ?? 0;

function formatMs(value) {
  return `${value.toFixed(2)} ms`;
}

function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>K6 Performance Report</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #f4f6f9;
      padding: 40px;
      color: #2c3e50;
    }

    .container {
      max-width: 1000px;
      margin: auto;
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
    }

    .summary {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    .card {
      flex: 1;
      margin: 10px;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      background: #f8fafc;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .card h2 {
      margin: 0;
      font-size: 22px;
    }

    .card p {
      margin: 5px 0 0;
      font-size: 14px;
      color: #7f8c8d;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      padding: 12px;
      border-bottom: 1px solid #ecf0f1;
      text-align: left;
    }

    th {
      background-color: #f4f6f9;
      font-weight: 600;
    }

    .good {
      color: #27ae60;
      font-weight: bold;
    }

    .bad {
      color: #e74c3c;
      font-weight: bold;
    }

    .footer {
      margin-top: 30px;
      font-size: 13px;
      text-align: center;
      color: #95a5a6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>K6 Performance Test Report</h1>

    <div class="summary">
      <div class="card">
        <h2>${formatMs(avg)}</h2>
        <p>Average Response Time</p>
      </div>
      <div class="card">
        <h2>${formatMs(p95)}</h2>
        <p>P95 Response Time</p>
      </div>
      <div class="card">
        <h2>${formatPercent(failRate)}</h2>
        <p>Error Rate</p>
      </div>
      <div class="card">
        <h2>${totalReqs}</h2>
        <p>Total Requests</p>
      </div>
    </div>

    <table>
      <tr>
        <th>Métrica</th>
        <th>Valor</th>
        <th>Descrição</th>
      </tr>
      <tr>
        <td>Average Duration</td>
        <td>${formatMs(avg)}</td>
        <td>Tempo médio de resposta considerando todas as requisições.</td>
      </tr>
      <tr>
        <td>P95</td>
        <td>${formatMs(p95)}</td>
        <td>95% das requisições responderam abaixo desse tempo.</td>
      </tr>
      <tr>
        <td>P99</td>
        <td>${formatMs(p99)}</td>
        <td>99% das requisições responderam abaixo desse tempo (latência extrema).</td>
      </tr>
      <tr>
        <td>Max Duration</td>
        <td>${formatMs(max)}</td>
        <td>Maior tempo de resposta registrado durante o teste.</td>
      </tr>
      <tr>
        <td>Fail Rate</td>
        <td>${formatPercent(failRate)}</td>
        <td>Percentual de requisições que falharam.</td>
      </tr>
      <tr>
        <td>Total Requests</td>
        <td>${totalReqs}</td>
        <td>Total de requisições executadas no período do teste.</td>
      </tr>
    </table>

  </div>
</body>
</html>
`;

fs.writeFileSync('reports/k6-report.html', html);

console.log('K6 HTML report generated at reports/k6-report.html');
