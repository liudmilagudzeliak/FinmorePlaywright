import {
    test, expect
} from '@playwright/test';
test.describe('Check login test functions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL('/');
        await expect(page).toHaveTitle('Повнофункціональний фінансовий менеджер');
    });
    test('Check  authorithation with valid credentials', async ({ page }) => {
        const emailInput = page.getByTestId('login-email-input');
        await expect(emailInput).toBeVisible({timeout: 5000});
        await expect(emailInput).toBeEnabled();
        await expect(emailInput).toHaveAttribute('placeholder', 'your@email.com');
        
        await emailInput.fill('user@demo.com');
        await expect(emailInput).toHaveValue('user@demo.com');

        //homework: create conts and  checks for password
        const passwordInput = page.getByTestId('login-password-input');
        await expect(passwordInput).toBeVisible({timeout: 5000});
        await expect(passwordInput).toBeEnabled();
        await expect(passwordInput).toHaveAttribute('placeholder', 'Введіть пароль');
        await passwordInput.fill('user123');
        await expect(passwordInput).toHaveValue('user123');

        const loginButton = page.getByTestId('login-submit-button');
        await expect(loginButton).toBeVisible({timeout: 5000});
        await expect(loginButton).toBeEnabled();
        await loginButton.click();
        await expect(page).toHaveURL('/');

        

    });

    test('Check authorithation with invalid credentials', async ({page}) => {
        const emailInput = page.getByTestId('login-email-input');
        await expect(emailInput).toBeVisible({timeout: 5000});
        await expect(emailInput).toBeEnabled();
        await expect(emailInput).toHaveAttribute('placeholder', 'your@email.com');
        await emailInput.fill('test@test.com');

        const passwordInput = page.getByTestId('login-password-input');
        await expect(passwordInput).toBeVisible({timeout: 5000});
        await expect(passwordInput).toBeEnabled();
        await expect(passwordInput).toHaveAttribute('placeholder', 'Введіть пароль');
        await passwordInput.fill('wrongpassword');

        const loginButton = page.getByTestId('login-submit-button');
        await expect(loginButton).toBeVisible({timeout: 5000});
        await expect(loginButton).toBeEnabled();
        await loginButton.click();
        await expect(page).toHaveURL('/');

        const errorMessage = page.getByTestId('login-error');
        await expect(errorMessage).toBeVisible({timeout: 5000});
        await expect(errorMessage).toHaveText('Невірний email або пароль');

    });
    

    test('Check login icon visability on the page', async ({page}) => {
        const loginicon = page.getByRole('img').first();
        await expect(loginicon).toBeVisible({timeout: 5000});
    });

    test('Check info message visability on the page', async ({page}) => {
        const infoMessage = page.getByText('Немає облікового запису?');
        await expect(infoMessage).toBeVisible({timeout: 5000});

    });
    test('Check registration link visability on the page', async ({page}) => {
        const registrationLink = page.getByTestId('switch-to-register-button');
        await expect(registrationLink).toBeVisible({timeout: 5000});
        await expect(registrationLink).toHaveText('Зареєструватися');
        await registrationLink.click();
        
        const registerTittle = page.getByTestId("register-title");
        await expect(registerTittle).toBeVisible({timeout: 5000});
        await expect(registerTittle).toHaveText('Реєстрація');

});
});