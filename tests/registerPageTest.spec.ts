import {
    test, expect
} from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { generatePrime } from 'crypto';
import { LoginPage2 } from '../pages/LoginTest2';
import {REGISTER_DATA} from '../data/RegisterData';
test.describe('Check register test functions', () => {
    let registerPage: RegisterPage;
    let loginPage: LoginPage2;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage2(page);
        registerPage.open();
        registerPage.checkPageLoaded();
    });

        test('Check view password icon visability', async ({ page }) => {
        registerPage.checkViewPasswordIconVisibility();
        registerPage.checkConfirmViewPasswordIconVisibility();
    });

    test('Select value from Основна валюта dropdown', async ({ page }) => {
        registerPage.selectCurrency('USD');
    });
    
    //expect(message).not.toBe('');

    test('Check email input validation browser message', async ({ page }) => {
        registerPage.registerName('REGISTER_DATA.VALID_NAME');
        registerPage.registerEmail('REGISTER_DATA.INVALID_EMAIL');
        registerPage.registerPassword('REGISTER_DATA.VALID_PASSWORD');
        registerPage.registerConfirmPassword('REGISTER_DATA.VALID_PASSWORD');
        registerPage.clickRegisterButton();
        const emailInputErrormessage = await registerPage.registerEmailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
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
        registerPage.registerName('REGISTER_DATA.iNVALID_NAME');
        registerPage.registerPassword('REGISTER_DATA.VALID_PASSWORD');
        registerPage.clickRegisterButton();   
        await expect(registerPage.nameErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(registerPage.nameErrorMessage).toHaveText("Ім'я повинно містити мінімум 2 символи");
    });


    test('Check registration error message for password mismatch', async ({ page }) => {
        registerPage.registerPassword('REGISTER_DATA.VALID_PASSWORD');
        registerPage.registerConfirmPassword('REGISTER_DATA.VALID_PASSWORD'); 
        registerPage.clickRegisterButton();
        await expect(registerPage.passwordErrorMessage).toHaveText(('Пароль повинен містити мінімум 6 символів'));
    });

    test('Check registerpage placeholders', async ({ page }) => {
        registerPage.checkPlaceholders();
    });

    test('Check curreccy drop-down default value', async ({ page }) => {
        registerPage.checkCurrencyDropdownOptions('REGISTER_DATA.CURRENCY.USD');
    });
    test('Check successful registration with valid data', async ({ page }) => {
        registerPage.registerName('REGISTER_DATA.VALID_NAME');
        registerPage.registerEmail('REGISTER_DATA.VALID_EMAIL');
        registerPage.registerPassword('REGISTER_DATA.VALID_PASSWORD');
        registerPage.registerConfirmPassword('REGISTER_DATA.VALID_PASSWORD');
        registerPage.selectCurrency('REGISTER_DATA.CURRENCY.USD');
        registerPage.clickRegisterButton();
        await expect(page).toHaveURL('/');
    });

});