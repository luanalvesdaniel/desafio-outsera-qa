import { e2eConfig } from '../config/environment.js';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = '[data-qa="login-email"]';
    this.passwordInput = '[data-qa="login-password"]';
    this.loginButton = '[data-qa="login-button"]';

    this.loginError = 'form p[style="color: red;"]';
    this.loggedUserLabel = 'a:has(i.fa-user)';
  }

  async acessarPaginaLogin() {
    await this.page.goto(e2eConfig.loginURL);
  }

  async realizarLogin(email, senha) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, senha);
    await this.page.click(this.loginButton);
  }

  async validarLoginComSucesso() {
    await this.page.waitForSelector(this.loggedUserLabel);
  }

  async obterMensagemErro() {
    return await this.page.textContent(this.loginError);
  }
}
