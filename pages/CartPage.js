export class CartPage{
    constructor(page){
        this.page = page;

        this.cartItems = page.locator('.cart_item');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async goToCheckout(){
        await this.checkoutButton.click();
    }

    async continueShopping(){
        await this.continueShoppingButton.click();
    }

    async getItemName(){
        return await this.cartItems
            .locator('[data-test="inventory-item-name"]')
            .textContent();
    }
}