import { test, expect } from '@playwright/test';
import { LoginPage2 } from "../pages/Auth/LoginTest2";
import { USER } from '../data/LoginData';
import loginData from '../data/loginData.json';
import { CreateAccountData } from '../utils/CreateAccountData';
 
 

//const VALID_EMAIL = 'user@demo.com';
//const VALID_PASSWORD = 'user123';

//const INVALID_EMAIL = 'test@test.com';
//const INVALID_PASSWORD = 'wrongpassword';


test.describe('Check login test functions', () => {

    let loginPage: LoginPage2;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage2(page);
        await loginPage.open();
        await loginPage.checkPageLoaded();
    });

    test('Check  authorithation with valid credentials', async ({ page }) => {
        const user = CreateAccountData.generateUser();
        await loginPage.login(user.email, user.password);
        console.log(`Generated user: ${user.email} / ${user.password}`);
        await expect(page).toHaveURL('/');
    });

    test('Check  authorithation with ivalid credentials', async ({ page }) => {
        await loginPage.login(loginData.invalidUser.email, loginData.invalidUser.password);
        await expect(page).toHaveURL('/');
        await expect(loginPage.errorMessage).toHaveText('Невірний email або пароль');
    });
    test('Check login icon visability on the page', async ({page}) => {
        await loginPage.checkLoginIconVisible();        
    });
    
     test('Check info message visability on the page', async ({page}) => {
        await loginPage.checkAbsentAccountMessageVisibilyty();

    });
    test('Check registration link visability on the page', async ({page}) => {
        await loginPage.checkRegistrationLink();

    });

    });
    