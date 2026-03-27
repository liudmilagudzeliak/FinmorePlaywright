import {
    test, expect
} from '@playwright/test';
import { generatePrime } from 'crypto';
test.describe('Check register test functions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL('/');
        await expect(page).toHaveTitle('Повнофункціональний фінансовий менеджер');
    });

    test('Check view password icon visability', async ({ page }) => {
        const viewPasswordIcon = page.locator('.lucide-eye').first();
        const registerPasswordInput = page.getByTestId('register-confirm-password-input');
        await expect(viewPasswordIcon).toBeVisible({ timeout: 5000 });
        await expect(registerPasswordInput).toHaveAttribute('type', 'password');
        await viewPasswordIcon.click();
        await expect(registerPasswordInput).toHaveAttribute('type', 'text');
        //nth(0) - перший елемент з класом .lucide-eye

    });

    test('Select value from Основна валюта dropdown', async ({ page }) => {
        const registercurrencyDropdown = page.getByTestId('register-currency-select');
        const options = page.getByTestId('register-currency-select')
            .locator('option');
        await expect(registercurrencyDropdown).toBeVisible({ timeout: 5000 });
        await expect(options).toHaveCount(4);
        await expect(registercurrencyDropdown).toBeEnabled();
        await registercurrencyDropdown.selectOption('USD');
    });
    //const emailInput = page.getByTestId('email-input');

    //const message = await emailInput.evaluate(el => el.validationMessage);

    //expect(message).not.toBe('');

    test('Check email input validation browser message', async ({ page }) => {
        const registerName = page.getByTestId('register-name-input');
        await expect(registerName).toBeVisible({ timeout: 5000 });
        await expect(registerName).toBeEnabled();
        await registerName.fill('');

        const

        const emailInput = page.getByTestId('register-email-input');
        await expect(emailInput).toBeVisible({ timeout: 5000 });
        await expect(emailInput).toBeEnabled();
        await emailInput.fill('inavalidemail');

        const registerPasswordInput = page.getByTestId('register-password-input');
        await expect(registerPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(registerPasswordInput).toBeEnabled();
        await registerPasswordInput.fill('test123');

        const registerConfirmPasswordInput = page.getByTestId('register-confirm-password-input');
        await expect(registerConfirmPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(registerPasswordInput).toBeEnabled();
        await registerName.fill('test123');


        const registerButton = page.getByTestId('register-submit-button');
        await expect(registerButton).toBeVisible({ timeout: 5000 });
        await expect(registerButton).toBeEnabled
        await registerButton.click();

        const emailInputErrormessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(emailInputErrormessage).toBe("Please include an '@' in the email address. 'fdvd' is missing an '@'.");


    });

    test('Check registration error messages for empty fields ', async ({ page }) => {
        const registerButton = page.getByTestId('register-submit-button');
        await expect(registerButton).toBeVisible({ timeout: 5000 });
        await registerButton.click();

        const nameErrorMessage = page.getByTestId('name-error');
        await expect(nameErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(nameErrorMessage).toHaveText("Ім'я обов'язкове");

        const emailErrorMessage = page.getByTestId('email-error');
        await expect(emailErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(emailErrorMessage).toHaveText('Email обов\'язковий');

        const passwordErrorMessage = page.getByTestId('password-error');
        await expect(passwordErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(passwordErrorMessage).toHaveText('Пароль обов\'язковий');

        const confirmPasswordErrorMessage = page.getByTestId('confirm-password-error');
        await expect(confirmPasswordErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(confirmPasswordErrorMessage).toHaveText('Підтвердження пароля обов\'язкове');
    });

    test('Check registration message for to short name and passworsd', async ({ page }) => {
        const registerName = page.getByTestId('register-name-input');
        await expect(registerName).toBeVisible({ timeout: 5000 });
        await expect(registerName).toBeEnabled();
        await registerName.fill('t');

        const passwordInput = page.getByTestId('register-password-input');
        await expect(passwordInput).toBeVisible({ timeout: 5000 });
        await expect(passwordInput).toBeEnabled();
        await passwordInput.fill('p');

        const nameErrorMessage = page.getByTestId('name-error');
        await expect(nameErrorMessage).toBeVisible({ timeout: 5000 });
        await expect(nameErrorMessage).toHaveText("Ім'я повинно містити мінімум 2 символи");


        test('Check registration error message for password mismatch', async ({ page }) => {
            const registerPasswordInput = page.getByTestId('register-password-input');
            await expect(registerPasswordInput).toBeVisible({ timeout: 5000 });
            await expect(registerPasswordInput).toBeEnabled();
            await registerPasswordInput.fill('test');

            const passwordErrorMessage = page.getByTestId('password-error');
            await expect(passwordErrorMessage).toHaveText(('Пароль повинен містити мінімум 6 символів'));
        });

        test('Check registerpage placeholders', async ({ page }) => {
            const registerName = page.getByTestId('register-name-input');
            await expect(registerName).toBeVisible({ timeout: 5000 });
            await expect(registerName).toBeEnabled();
            await expect(registerName).toHaveAttribute('placeholder', 'Іван Петренко');

            const emailInput = page.getByTestId('register-email-input');
            await expect(emailInput).toBeVisible({ timeout: 5000 });
            await expect(emailInput).toBeEnabled();
            await expect(emailInput).toHaveAttribute('placeholder', 'your@email.com');

            const registerPasswordInput = page.getByTestId('register-password-input');
            await expect(registerPasswordInput).toBeVisible({ timeout: 5000 });
            await expect(registerPasswordInput).toHaveAttribute('placeholder', 'Мінімум 6 символів');

            const registerConfirmPasswordInput = page.getByTestId('register-confirm-password-input');
            await expect(registerConfirmPasswordInput).toBeVisible({ timeout: 5000 });
            await expect(registerConfirmPasswordInput).toHaveAttribute('placeholder', 'Повторіть пароль');
        });

        test('Check curreccy drop-down default value', async ({ page }) => {
            const registercurrencyDropdown = page.getByTestId('register-currency-select');
            await expect(registercurrencyDropdown).toBeVisible({ timeout: 5000 });
            await expect(registercurrencyDropdown).toBeEnabled();
            await expect(registercurrencyDropdown).toHaveValue('UAH');
            await expect(registercurrencyDropdown.locator('option:checked')).toHaveText('Гривня UAH');
        });

    });