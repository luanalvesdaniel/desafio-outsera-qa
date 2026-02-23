export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.productsLink = 'a[href="/products"]';
    this.firstProduct = '.single-products';
    this.modal = '.modal-content';
    this.modalViewCart = '.modal-content a[href="/view_cart"]';
  }

  async acessarProdutos() {
    await this.page.click(this.productsLink);
    await this.page.waitForSelector(this.firstProduct);
  }

  async adicionarPrimeiroProduto() {
    const produto = this.page.locator(this.firstProduct).first();

    await produto.hover();
    await produto.locator('.add-to-cart').first().click();

    await this.page.waitForSelector(this.modal, { state: 'visible' });
  }

  async irParaCarrinho() {
    const viewCart = this.page.locator(this.modalViewCart);

    await viewCart.waitFor({ state: 'visible' });
    await viewCart.click({ force: true });

    await this.page.waitForURL('**/view_cart');
    await this.page.waitForSelector('#cart_info');
  }
}
