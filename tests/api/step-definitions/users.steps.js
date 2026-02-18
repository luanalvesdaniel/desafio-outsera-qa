import { When, Then } from '@cucumber/cucumber';
import fetch from 'node-fetch';
import ajv from '../../../src/api/utils/ajv.js';
import fs from 'fs';
import path from 'path';
const userSchema = JSON.parse(fs.readFileSync(path.resolve('src/api/schemas/user.schema.json'), 'utf-8'));

When('faço uma requisição GET para {string}', async function (endpoint) {
  const res = await fetch(`${this.baseUrl}${endpoint}`);
  this.response = res;
  this.responseBody = await res.json();
});

When('faço uma requisição POST para {string} com o payload:', async function (endpoint, dataTable) {
  let payload;
  const rows = dataTable.raw();
  if (rows.length === 2 && rows[0].length === rows[1].length) {
    // Tabela com cabeçalho e uma linha de dados
    payload = {};
    rows[0].forEach((key, idx) => {
      payload[key] = rows[1][idx];
    });
  } else if (typeof dataTable.rowsHash === 'function') {
    // Tabela de chave-valor
    payload = dataTable.rowsHash();
  } else if (typeof dataTable.hashes === 'function') {
    // Tabela de múltiplas linhas
    const hashes = dataTable.hashes();
    payload = hashes.length === 1 ? hashes[0] : hashes;
  } else {
    throw new Error('Formato de tabela não suportado');
  }
  this.requestPayload = payload;
  const res = await fetch(`${this.baseUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...this.headers },
    body: JSON.stringify(payload)
  });
  this.response = res;
  this.responseBody = await res.json();
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
