import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { LoginPage } from '../../../src/e2e/pages/index.js';

Given('que eu estou na página de login', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.acessarPaginaLogin();
});

When('eu faço login com email {string} e senha {string}', async function (email, senha) {
  await this.loginPage.realizarLogin(email, senha);
});

Then('devo visualizar que estou logado com sucesso', async function () {
  await this.loginPage.validarLoginComSucesso();
});

Then('devo visualizar mensagem de erro', async function () {
  const mensagem = await this.loginPage.obterMensagemErro();
  assert.ok(mensagem.includes('incorrect'));
});

Then('devo permanecer na página de login', async function () {
  const urlAtual = this.page.url();
  assert.ok(urlAtual.includes('/login'));
});
