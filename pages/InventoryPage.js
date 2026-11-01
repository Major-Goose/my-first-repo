export class InventoryPage{
    constructor(page){
        this.page = page;

        this.title = page.locator('[data-test="title"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.dropdown = page.locator('[data-test="product-sort-container"]');

        this.addToCartButtons = {
            "Sauce Labs Backpack": page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
            "Sauce Labs Bike Light": page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]'),
            "Sauce Labs Bolt T-Shirt": page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'),
            "Sauce Labs Fleece Jacket": page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]'),
            "Sauce Labs Onesie": page.locator('[data-test="add-to-cart-sauce-labs-onesie"]'),
            "Test.allTheThings() T-Shirt (Red)": page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
        }
    }

    async addItemToCart(itemName){
        await this.addToCartButtons[itemName].click();
    }

    async openCart(){
        await this.cartIcon.click();
    }

    async getPageTitle(){
        return await this.title.textContent();
    }

    async sortPriceHighToLow(){
        await this.dropdown.selectOption('hilo');
    }

    async getFirstItemName(){
        return await this.inventoryItems.first()
            .locator('[data-test="inventory-item-name"]')
            .textContent();
    }
}