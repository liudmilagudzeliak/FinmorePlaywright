import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Auth/LoginTest';
 
const VALID_EMAIL = 'user@demo.com';
const VALID_PASSWORD = 'user123';
 
const INVALID_EMAIL = 'test@test.com';
const INVALID_PASSWORD = 'wrongpassword';
 
test.describe('Login tests (POM)', () => {
 
  let loginPage: LoginPage;
 
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.checkPageLoaded();
  });
 
  test('Valid login', async ({ page }) => {
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    await expect(page).toHaveURL('/');
  });
 
  test('Invalid login', async () => {
    await loginPage.login(INVALID_EMAIL, INVALID_PASSWORD);
    await loginPage.checkErrorMessage('Невірний email або пароль');
  });
 
  test('UI elements visible', async () => {
    await loginPage.checkUIElements();
  });
 
  test('Go to registration page', async () => {
    await loginPage.goToRegister();
  });
 
});