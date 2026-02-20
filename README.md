# desafio-outsera-qa

Projeto de automação de testes completo, incluindo testes de API, E2E (end-to-end) e performance, com geração de relatórios automatizada.
Inclui:
- Testes de API com Mock (contrato e funcionalidade)
- Testes E2E com Playwright e Cucumber
- Testes de performance com K6 e Mock
- Mock de API para cenários controlados
- Geração de relatórios HTML/JSON para todos os tipos de teste

## Estrutura de Pastas

```
├── src/
│   ├── api/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── mock-api/
│   └── e2e/
│       ├── config/
│       ├── fixtures/
│       ├── pages/
│       └── utils/
├── tests/
│   ├── api/
│   │   ├── features/
│   │   ├── step-definitions/
│   │   └── support/
│   ├── e2e/
│   │   ├── features/
│   │   ├── step-definitions/
│   │   └── support/
│   └── performance/
│       ├── mock-api/
│       ├── k6-load-test.js
│       └── generate-k6-report.js
├── reports/
│   ├── api-report.html
│   ├── api-report.json
│   ├── e2e-report.html
│   ├── e2e-report.json
│   ├── k6-report.html
│   ├── k6-summary.json
│   └── ...
├── .env
├── package.json
├── playwright.config.js
├── cucumber.api.cjs
├── cucumber.e2e.cjs
├── generate-report.js
└── README.md
```

## Versões Utilizadas

- **Node.js**: Ambiente de execução JavaScript server-side (recomendado >= 18.x)
- **@cucumber/cucumber**: 10.0.0 — Framework para testes BDD (Behavior Driven Development) com Cucumber
- **@playwright/test**: 1.42.0 — Framework para automação de testes E2E em múltiplos navegadores
- **ajv**: 8.17.1 — Validador de schemas JSON, utilizado para validar payloads de API
- **ajv-formats**: 3.0.1 — Suporte a formatos adicionais para validação com ajv
- **concurrently**: 9.2.1 — Executa múltiplos comandos/scripts simultaneamente no terminal
- **dotenv**: 16.0.0 — Carrega variáveis de ambiente a partir de arquivos .env
- **express**: 5.2.1 — Framework web minimalista para Node.js, usado para mock de APIs
- **multiple-cucumber-html-reporter**: 3.5.0 — Gera relatórios HTML customizados a partir dos testes Cucumber
- **start-server-and-test**: 2.1.3 — Inicia servidores e executa testes em sequência, útil para E2E
- **node-fetch**: 3.3.2 — Requisições HTTP (utilitário)

## Instalação

1. Instale as dependências:
```bash
npm install
```
```bash
npm install playwright
```
2. Crie um arquivo `.env` na raiz (exemplo já incluso).
3. Instale o [k6](https://k6.io/) para testes de performance.

## Como Executar

### 1. Testes de API
Execute os testes com o comando abaixo (inicia e finaliza o mock server automaticamente):
```bash
npm run test:api
```
Por padrão, a API estará em `http://localhost:3001` (configurável via `.env`).

Relatórios gerados em `reports/api-report.html` e `reports/api-report.json`.

### 2. Testes E2E (End-to-End)
Os testes E2E simulam fluxos completos na aplicação web (exemplo: login, compra, checkout).

Execute:
```bash
npm run test:e2e
```
Relatórios gerados em `reports/e2e-report.html` e `reports/e2e-report.json`.
Ao fim dos testes de API e E2E a automação gera um html customizado contendo ambos em `reports/e2e-final-report`;

Exemplo de feature:
```gherkin
Funcionalidade: E2E - Login na aplicação Automation Exercise

  Cenário: Login com credenciais válidas
    Dado que eu estou na página de login
    Quando eu faço login com email "username@gmail.com" e senha "A3LcUWvZkxTV@ea"
    Então devo visualizar que estou logado com sucesso
```

### 3. Testes de Performance (K6)
Os testes de performance simulam carga e avaliam tempo de resposta, taxa de erro e throughput.

Execute os testes com o comando abaixo (inicia e finaliza o mock server automaticamente)
```bash
npm run test:performance
```

Relatórios:
- Resumo JSON: `reports/k6-summary.json`
- HTML customizado: `reports/k6-report.html`

Exemplo de teste K6:
```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
	vus: 500,
	duration: '5m',
	thresholds: {
		http_req_duration: ['avg<600', 'p(95)<800', 'p(99)<1200', 'max<1500'],
		http_req_failed: ['rate<0.20'],
		http_reqs: ['rate>1']
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
```

## Boas Práticas e Fluxo


- **API mockada**: Endpoints REST simulados para `/users`, `/health`, `/heavy` em `src/api/mock-api/server.js` e `tests/performance/mock-api/server.js`.
- **Schemas JSON**: Validação de contrato com Ajv/Ajv-formats em `src/api/schemas/`.
- **Dotenv**: Variáveis de ambiente centralizadas em `.env`.
- **BDD**: Features e steps Cucumber em `tests/api/features`, `tests/api/step-definitions`, `tests/e2e/- features`, `tests/e2e/step-definitions`.
- **Playwright**: Automação E2E com suporte a múltiplos navegadores e screenshots.
- **Relatórios**: HTML/JSON automáticos em `reports/` para API, E2E e performance.
- **Exemplo de feature**: Veja `tests/api/features/users.feature`, `tests/e2e/features/login.feature`, `tests/- e2e/features/checkout.feature`.
- **Validação de contrato**: Steps usam Ajv para garantir conformidade do payload.
- **Performance**: Testes K6 simulam carga e geram relatórios visuais.
