import {expect} from "@playwright/test"
import { Navigation } from "./Navigation"
export class ProductsPage{
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }
    visit = async () => {
        await this.page.goto("/")
    }
    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBeforeSorting = this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfterSorting = this.productTitle.allInnerTexts()
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)
        //await this.page.pause()
    }
    addProductToBasket = async (index) => {
        const navigation = new Navigation(this.page)
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        expect(specificAddButton).toHaveText("Add to Basket")
        const basketCountBeforeAdding = await navigation.getBasketCount()
        await specificAddButton.click()
        expect(specificAddButton).toHaveText("Remove from Basket")
        const basketCountAfterAdding = await navigation.getBasketCount()
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        
    }
}