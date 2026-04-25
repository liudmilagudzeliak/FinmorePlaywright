import {
    test, expect
} from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { generatePrime } from 'crypto';
import { LoginPage2 } from '../pages/Auth/LoginTest2';
import { REGISTER_DATA } from '../data/RegisterData';
import { faker } from '@faker-js/faker';
import { generatePassword } from '../utils/passwordFaker';

test.describe('Check register test functions', () => {
    let registerPage: RegisterPage;
    let loginPage: LoginPage2;

    const user = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: generatePassword(),
    };


    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage2(page);
        await loginPage.open();
        await registerPage.registrationPageOpen();
        await registerPage.checkPageLoaded();
    });

    test('Check view password icon visability', async ({ page }) => {
        registerPage.checkViewPasswordIconVisibility();
        registerPage.checkConfirmViewPasswordIconVisibility();
    });

    test('Select value from Основна валюта dropdown', async () => {
        registerPage.selectCurrency('USD');
    });

    //expect(message).not.toBe('');

    test('Check email input validation browser message', async () => {
       await registerPage.registerName(user.name);
        await registerPage.registerEmail(user.email);
        await registerPage.registerPassword(user.password);
        await registerPage.registerConfirmPassword(user.password);
        await registerPage.clickRegisterButton();        
        const emailInputErrormessage = await registerPage.registerEmailInput.evaluate((el: HTMLInputElement) => el.validationMessage
        expect(emailInputErrormessage).toBe("Please include an '@' in the email address. 'inavalidemail' is missing an '@'.");


 

 
    });

    test('Check registration error messages for empty fields ', async ({ page }) => {
        registerPage.clickRegisterButton();
        await expect(registerPage.nameErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(registerPage.nameErrorMessage).toHaveText("Ім'я обов'язкове");
        await expect(registerPage.emailErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(registerPage.emailErrorMessage).toHaveText('Email обов\'язковий');
        await expect(registerPage.passwordErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(registerPage.passwordErrorMessage).toHaveText('Пароль обов\'язковий');
        await expect(registerPage.confirmPasswordErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(registerPage.confirmPasswordErrorMessage).toHaveText('Підтвердження паролю обов\'язкове');
    });

    test('Check registration message for to short name and passworsd', async ({ page }) => {
        registerPage.registerName(REGISTER_DATA.INVALID_NAME);
        registerPage.registerPassword(REGISTER_DATA.VALID_PASSWORD);
        registerPage.clickRegisterButton();
        await expect(registerPage.nameErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(registerPage.nameErrorMessage).toHaveText("Ім'я повинно містити мінімум 2 символи");
    });


    test('Check registration error message for password mismatch', async ({ page }) => {
        registerPage.registerPassword(REGISTER_DATA.VALID_PASSWORD);
        registerPage.registerConfirmPassword(REGISTER_DATA.VALID_PASSWORD);
        registerPage.clickRegisterButton();
        await expect(registerPage.passwordErrorMessage).toHaveText(('Пароль повинен містити мінімум 6 символів'));
    });

    test('Check registerpage placeholders', async ({ page }) => {
        registerPage.checkPlaceholders();
    });

    test('Check curreccy drop-down default value', async ({ page }) => {
        registerPage.checkCurrencyDropdownOptions(REGISTER_DATA.CURRENCY.USD);
    });
    test('Check successful registration with valid data', async ({ page }) => {
        registerPage.registerName(user.name);
        registerPage.registerEmail(user.email);
        registerPage.registerPassword(user.password);
        registerPage.registerConfirmPassword(user.password);
        registerPage.selectCurrency(REGISTER_DATA.CURRENCY.UAH);
        registerPage.clickRegisterButton();
        await expect(page).toHaveURL('/');
    });


    async registerName(name: string) {
        await Actions.fillField(this.nameInput, name, 'Name input');
    }

    async clickRegisterButton() {

        await Actions.click(this.registerButton, 'Register button');

    }
 
  async getEmailValidity() {

        return await Actions.getValidity(this.emailInput, 'Email field');

    }

}
 

});