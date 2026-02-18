export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.nameOnCard = '[data-qa="name-on-card"]';
    this.cardNumber = '[data-qa="card-number"]';
    this.cvc = '[data-qa="cvc"]';
    this.expiryMonth = '[data-qa="expiry-month"]';
    this.expiryYear = '[data-qa="expiry-year"]';
    this.payButton = '[data-qa="pay-button"]';
    this.successMessage = '.alert-success';
  }

  async pagarComDadosValidos() {
    await this.page.fill(this.nameOnCard, 'User Test');
    await this.page.fill(this.cardNumber, '4111111111111111');
    await this.page.fill(this.cvc, '123');
    await this.page.fill(this.expiryMonth, '12');
    await this.page.fill(this.expiryYear, '2030');
    await this.page.click(this.payButton);
  }

  async pagarComCartaoInvalido() {
    await this.page.fill(this.nameOnCard, 'User Test');
    await this.page.fill(this.cardNumber, '123');
    await this.page.fill(this.cvc, '12');
    await this.page.fill(this.expiryMonth, '01');
    await this.page.fill(this.expiryYear, '2020');
    await this.page.click(this.payButton);
  }

  async obterMensagemSucesso() {
    return await this.page.textContent(this.successMessage);
  }

  async paginaAtual() {
    return this.page.url();
  }
}
