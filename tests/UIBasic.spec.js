import {test, expect} from "@playwright/test"

test("Product Page Add To Basket", async ({page}) => {
    await page.goto("/")

    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')

    await addToBasketButton.waitFor()

    expect(addToBasketButton).toHaveText("Add to Basket")
    expect(basketCounter).toHaveText("0")

    await addToBasketButton.click()

    expect(basketCounter).toHaveText("1")
    expect(addToBasketButton).toHaveText("Remove from Basket")

    const checkoutLink = page.getByRole('link', { name: 'Checkout' })
    await checkoutLink.waitFor()
    await checkoutLink.click()
    await page.waitForURL("/basket")
});

