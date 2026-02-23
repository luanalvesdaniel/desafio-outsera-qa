import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { LoginPage, ProductsPage, CartPage, CheckoutPage, PaymentPage } from '../../../src/e2e/pages/index.js';
import { e2eConfig } from '../../../src/e2e/config/environment.js';

Given('que eu estou logado na aplicação', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.acessarPaginaLogin();
  await this.loginPage.realizarLogin(e2eConfig.user, e2eConfig.password);
  await this.loginPage.validarLoginComSucesso();
});

When('eu adiciono um produto ao carrinho', async function () {
  this.productsPage = new ProductsPage(this.page);

  await this.productsPage.acessarProdutos();
  await this.productsPage.adicionarPrimeiroProduto();
  await this.productsPage.irParaCarrinho();
});

When('eu prossigo para o checkout', async function () {
  this.cartPage = new CartPage(this.page);

  await this.cartPage.validarCarrinhoNaoVazio();
  await this.cartPage.prosseguirCheckout();

  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.validarEnderecoEProduto();
  await this.checkoutPage.clicarPlaceOrder();
});

When('eu finalizo o pagamento com dados válidos', async function () {
  this.paymentPage = new PaymentPage(this.page);
  await this.paymentPage.pagarComDadosValidos();
});

When('eu tento finalizar o pagamento com cartão inválido', async function () {
  this.paymentPage = new PaymentPage(this.page);
  await this.paymentPage.pagarComCartaoInvalido();
});

Then('devo visualizar a confirmação de pedido realizado', async function () {
  const mensagem = await this.paymentPage.obterMensagemSucesso();
  assert.ok(mensagem.toLowerCase().includes('success'));
});

Then('devo visualizar mensagem de erro no pagamento', async function () {
  const urlAtual = await this.paymentPage.paginaAtual();
  await this.page.waitForTimeout(1000);
  assert.ok(urlAtual.includes('/payment'), 'Ainda está na tela de pagamento, indicando erro.');
});
