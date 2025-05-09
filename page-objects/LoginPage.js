export class LoginPage{
    constructor(page){
        this.page = page
        this.signUpButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    goToSignUpPage = async () => {
        await this.signUpButton.waitFor()
        await this.signUpButton.click()
        this.page.waitForURL(/\/signup/,{timeout: 3000})

    }
}