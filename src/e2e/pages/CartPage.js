export class CartPage {
  constructor(page) {
    this.page = page;
    this.proceedToCheckoutButton = '.check_out';
  }

  async validarCarrinhoNaoVazio() {
    const vazio = await this.page.locator('#empty_cart').isVisible();
    if (vazio) {
      throw new Error('Carrinho está vazio');
    }
  }

  async prosseguirCheckout() {
    await this.validarCarrinhoNaoVazio();
    await this.page.click(this.proceedToCheckoutButton);
  }
}
