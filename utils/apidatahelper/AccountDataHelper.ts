
import { Page, Locator, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { generatePassword } from '../passwordFaker';
import { REGISTER_DATA } from '../../data/RegisterData';
import { RegisterPage } from '../../pages/Auth/RegisterPage';

export async function createAccount(page: Page, user: any) {
    const registerPage = new RegisterPage(page);
    await registerPage.registrationPageOpen();
    await registerPage.checkPageLoaded();
    await registerPage.registerName(user.name);
    await registerPage.registerEmail(user.email);
    await registerPage.registerPassword(user.password);
    await registerPage.registerConfirmPassword(user.password);
    await registerPage.selectCurrency(REGISTER_DATA.CURRENCY.UAH);
    await registerPage.clickRegisterButton();
    await expect(page).toHaveURL('/');
}
