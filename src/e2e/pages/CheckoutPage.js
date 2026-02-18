export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.placeOrderButton = 'a[href="/payment"]';
    this.commentField = 'textarea[name="message"]';
  }

  async validarEnderecoEProduto() {
    await this.page.waitForSelector('#address_delivery');
    await this.page.waitForSelector('#cart_info');
  }

  async clicarPlaceOrder() {
    await this.page.fill(this.commentField, 'Pedido automatizado');
    await this.page.click(this.placeOrderButton);
  }
}
