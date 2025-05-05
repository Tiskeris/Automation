export class RegisterPage{
    constructor(page){
        this.page = page
    }

    signUpAsNewUser = async () =>{
        await this.page.pause()

    }
}