import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // configurado 10 usuários virtuais para simular carga para não gerar erros por limitação do mock
  duration: '10s', // Duração de 10 segundos para agilidade no teste

  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],

  thresholds: {
    http_req_duration: [
      'avg<600',
      'p(95)<800',
      'p(99)<1200',
      'max<1500'
    ],

    http_req_failed: [
      'rate<0.20'
    ],

    http_reqs: [
      'rate>1'
    ]
  }
};


export default function () {

  const response = http.get('http://localhost:3001/health');

  check(response, {
    'status 200': (r) => r.status === 200,
    'tempo < 800ms': (r) => r.timings.duration < 800
  });

  sleep(1);
}
