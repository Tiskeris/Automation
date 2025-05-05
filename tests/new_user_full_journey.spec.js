import {test} from "@playwright/test"
import {ProductsPage} from "../page-objects/ProductsPage"
import {Navigation } from "../page-objects/Navigation"
import {Checkout} from "../page-objects/Checkout"
import { LoginPage } from "../page-objects/LoginPage"
import { RegisterPage } from "../page-objects/RegisterPage"
test("New user full end-to-end test journey", async ({page}) => {

    const productsPage = new ProductsPage(page)
    await productsPage.visit()

    await productsPage.sortByCheapest()

    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    
    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const login = new LoginPage(page)
    await login.goToSignUpPage()
    
    const registerPage = new RegisterPage(page)
    await registerPage.signUpAsNewUser()
})