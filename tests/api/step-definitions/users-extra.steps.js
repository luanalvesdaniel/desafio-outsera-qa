import { When, Then } from '@cucumber/cucumber';
import fetch from 'node-fetch';

When('faço uma requisição PUT para {string} com o payload:', async function (endpoint, dataTable) {
  let payload;
  const rows = dataTable.raw();
  if (rows.length === 2 && rows[0].length === rows[1].length) {
    payload = {};
    rows[0].forEach((key, idx) => {
      payload[key] = rows[1][idx];
    });
  } else {
    throw new Error('Formato de tabela não suportado');
  }
  this.requestPayload = payload;
  const res = await fetch(`${this.baseUrl}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...this.headers },
    body: JSON.stringify(payload)
  });
  this.response = res;
  try {
    this.responseBody = await res.json();
  } catch {
    this.responseBody = {};
  }
});

When('faço uma requisição DELETE para {string}', async function (endpoint) {
  const res = await fetch(`${this.baseUrl}${endpoint}`, {
    method: 'DELETE',
    headers: { ...this.headers }
  });
  this.response = res;
  try {
    this.responseBody = await res.json();
  } catch {
    this.responseBody = {};
  }
});

When('faço uma requisição PATCH para {string}', async function (endpoint) {
  const res = await fetch(`${this.baseUrl}${endpoint}`, {
    method: 'PATCH',
    headers: { ...this.headers }
  });
  this.response = res;
  try {
    this.responseBody = await res.json();
  } catch {
    this.responseBody = {};
  }
});

When('faço uma requisição POST para {string} com o corpo malformado', async function (endpoint) {
  const res = await fetch(`${this.baseUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...this.headers },
    body: '{ name: "sem aspas" email: 123 }'
  });
  this.response = res;
  try {
    this.responseBody = await res.json();
  } catch {
    this.responseBody = {};
  }
});

When('faço uma requisição GET para {string} com autenticação inválida', async function (endpoint) {
  const res = await fetch(`${this.baseUrl}${endpoint}`, {
    headers: { Authorization: 'Bearer token-invalido' }
  });
  this.response = res;
  try {
    this.responseBody = await res.json();
  } catch {
    this.responseBody = {};
  }
});

Then('o header {string} da resposta deve conter {string}', function (header, valor) {
  const value = this.response.headers.get(header);
  if (!value || !value.includes(valor)) {
    throw new Error(`Esperado header ${header} conter ${valor}, recebido: ${value}`);
  }
});
