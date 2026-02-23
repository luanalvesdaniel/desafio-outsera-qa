// Centraliza lógica de fetch para API
import nodeFetch from 'node-fetch';

export default async function fetch({ url, method = 'GET', headers = {}, body }) {
  let response;
  let responseBody;
  try {
    response = await nodeFetch(url, {
      method,
      headers,
      body
    });
    responseBody = await response.json();
  } catch (err) {
    throw new Error('Erro na requisição: ' + err.message);
  }
  return { response, body: responseBody };
}
