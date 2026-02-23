import { When, Then } from '@cucumber/cucumber';
import fetch from '../../../src/api/utils/fetch.js';
import ajv from '../../../src/api/utils/ajv.js';
import { loadSchema } from '../../../src/api/utils/schemaLoader.js';

When('faço uma requisição GET para {string}', async function (endpoint) {
  const { response, body } = await fetch({
    url: `${this.baseUrl}${endpoint}`,
    method: 'GET',
    headers: this.headers
  });
  this.response = response;
  this.responseBody = body;
});

When('faço uma requisição POST para {string} com o payload válido:', async function (endpoint, dataTable) {
  const rows = dataTable.raw();
  const payload = {
    name: rows[1][0],
    email: rows[1][1]
  };
  this.requestPayload = payload;
  const { response, body } = await fetch({
    url: `${this.baseUrl}${endpoint}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...this.headers },
    body: JSON.stringify(payload)
  });
  this.response = response;
  this.responseBody = body;
});

When('faço uma requisição POST para {string} com o payload inválido:', async function (endpoint, dataTable) {
  const rows = dataTable.raw();
  const payload = {
    name: rows[1][0],
    email: rows[1][1]
  };
  this.requestPayload = payload;
  const { response, body } = await fetch({
    url: `${this.baseUrl}${endpoint}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...this.headers },
    body: JSON.stringify(payload)
  });
  this.response = response;
  this.responseBody = body;
});

Then('o status da resposta deve ser {int}', function (status) {
  if (this.response.status !== status) {
    throw new Error(`Esperado status ${status}, recebido ${this.response.status}`);
  }
});

Then('o corpo da resposta deve ser uma lista de usuários', function () {
  if (!Array.isArray(this.responseBody.users)) {
    throw new Error('Corpo da resposta não contém lista de usuários');
  }
});

Then('o corpo da resposta deve conter o usuário criado', function () {
  let userSchema;
  try {
    userSchema = loadSchema('user.schema.json');
  } catch (e) {
    throw new Error('Erro ao carregar schema: ' + e.message);
  }
  const valid = ajv.validate(userSchema, this.responseBody);
  if (!valid) {
    throw new Error('Resposta não está de acordo com o schema: ' + ajv.errorsText());
  }
});

Then('o corpo da resposta deve conter o erro {string}', function (msg) {
  if (!this.responseBody.error || this.responseBody.error !== msg) {
    throw new Error(`Esperado erro "${msg}", recebido: ${this.responseBody.error}`);
  }
});
