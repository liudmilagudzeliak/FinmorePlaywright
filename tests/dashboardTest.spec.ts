import { test, expect } from "@playwright/test";

test.describe('Check dashboard test functions', () => {
    test.beforeEach(async ({ page }) => {
        //Create new user and log in before each test
        await page.goto('/');
    });
    test('Check that User can log out from dashboard', async ({ page }) => {

        //Create new account
        //Click on register link
        const registerLink = page.getByTestId('switch-to-register-button');
        await expect(registerLink).toBeVisible({ timeout: 5000 });
        await registerLink.click();
        //Fill in the name       
        const registerName = page.getByTestId('register-name-input');
        await expect(registerName).toBeVisible({ timeout: 5000 });
        await expect(registerName).toBeEnabled();
        await registerName.fill('AUTOTEST');
        //Fill in the email
        const emailInput = page.getByTestId('register-email-input');
        await expect(emailInput).toBeVisible({ timeout: 5000 });
        await expect(emailInput).toBeEnabled();
        await emailInput.fill('email@email.com');
        //Fill in the password
        const registerPasswordInput = page.getByTestId('register-password-input');
        await expect(registerPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(registerPasswordInput).toBeEnabled();
        await registerPasswordInput.fill('test123');
        //Fill in the confirm password
        const registerConfirmPasswordInput = page.getByTestId('register-confirm-password-input');
        await expect(registerConfirmPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(registerPasswordInput).toBeEnabled();
        await registerConfirmPasswordInput.fill('test123');
        //Click on register button
        const registerButton = page.getByTestId('register-submit-button');
        await expect(registerButton).toBeVisible({ timeout: 5000 });
        await expect(registerButton).toBeEnabled
        await registerButton.click();
        //Log out from dashboard
        //CLick on user settings button
        const UserSettingsButton = page.getByTestId('user-menu-trigger');
        await expect(UserSettingsButton).toBeVisible({ timeout: 5000 });
        await expect(UserSettingsButton).toBeEnabled();
        await UserSettingsButton.click();
        //Click on log out button
        const logoutButton = page.getByTestId('logout-button');
        await expect(logoutButton).toBeVisible({ timeout: 5000 });
        await expect(logoutButton).toBeEnabled();
        await logoutButton.click();
        //Check that user is logged out and Register page is visible
        const pageH1 = page.getByTestId('register-title');
        await expect(pageH1).toBeVisible({ timeout: 6000 });
        await expect(pageH1).toHaveText('Реєстрація');
    });

    test('Check that User can enter dohid', async ({ page }) =>  {
        //Create new account
        //Click on register link
        const registerLink = page.getByTestId('switch-to-register-button');
        await expect(registerLink).toBeVisible({ timeout: 5000 });
        await registerLink.click();
        //Fill in the name       
        const registerName = page.getByTestId('register-name-input');
        await expect(registerName).toBeVisible({ timeout: 5000 });
        await expect(registerName).toBeEnabled();
        await registerName.fill('AUTOTEST');
        //Fill in the email
        const emailInput = page.getByTestId('register-email-input');
        await expect(emailInput).toBeVisible({ timeout: 5000 });
        await expect(emailInput).toBeEnabled();
        await emailInput.fill('email@email.com');
        //Fill in the password
        const registerPasswordInput = page.getByTestId('register-password-input');
        await expect(registerPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(registerPasswordInput).toBeEnabled();
        await registerPasswordInput.fill('test123');
        //Fill in the confirm password
        const registerConfirmPasswordInput = page.getByTestId('register-confirm-password-input');
        await expect(registerConfirmPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(registerPasswordInput).toBeEnabled();
        await registerConfirmPasswordInput.fill('test123');
        //Click on register button
        const registerButton = page.getByTestId('register-submit-button');
        await expect(registerButton).toBeVisible({ timeout: 5000 });
        await expect(registerButton).toBeEnabled
        await registerButton.click();
        //Open new transaction pop-up
        const addTransactionButton = page.getByTestId('add-transaction-button');
        await expect(addTransactionButton).toBeVisible({ timeout: 5000 });
        await expect(addTransactionButton).toBeEnabled();
        await addTransactionButton.click();
        //Click income button
        const incomeButton = page.getByTestId('income-type-button');
        await expect(incomeButton).toBeVisible({ timeout: 5000 });
        await expect(incomeButton).toBeEnabled();
        await incomeButton.click();
        //Fill in the amount
        const amountInput = page.getByTestId('transaction-amount-input');
        await expect(amountInput).toBeVisible({ timeout: 5000 });
        await expect(amountInput).toBeEnabled();
        await amountInput.fill('100');
        //Select category
        const categorySelect = page.getByTestId('transaction-category-select');
        const options = categorySelect.getByRole('option');
        await expect(categorySelect).toBeVisible({ timeout: 5000 });
        await expect(categorySelect).toBeEnabled();
        await expect(options).toHaveCount(4);
        await options.selectOption('Зарплата');
        //Enter description
        const descriptionInput = page.getByTestId('transaction-description-input');
        await expect(descriptionInput).toBeVisible({ timeout: 5000 });
        await expect(descriptionInput).toBeEnabled();
        await descriptionInput.fill('test');
        //Enter date
        const dateInput = page.getByTestId('transaction-date-input');
        await expect(dateInput).tobeVisible({ timeout: 5000 });
        await expect(dateInput).toBeEnabled();
        await dateInput.fill('2024-06-01');
        //Select account
        const accountDropdown = page.getByTestId('transaction-account-select');
        const accountOptions = accountDropdown.getByRole('option');
        await expect(accountDropdown).toBeVisible({ timeout: 5000 });
        await expect(accountDropdown).toBeEnabled();
        await expect(accountOptions).toHaveCount(4);
        await accountOptions.selectOption('Готівка');
        //Add tag
        const tagInput = page.getByTestId('transaction-tags-input');
        await expect(tagInput).toBeVisible({ timeout: 5000 });
        await expect(tagInput).toBeEnabled();
        await tagInput.fill('testtag');
        const addTagButton = page.getByTestId('add-tag-button');
        await expect(addTagButton).toBeVisible({ timeout: 5000 });
        await expect(addTagButton).toBeEnabled();
        await addTagButton.click();
        //Save transaction
        const saveButton = page.getByTestId('transaction-form-submit');
        await expect(saveButton).toBeVisible({ timeout: 5000 });
        await expect(saveButton).toBeEnabled();
        await saveButton.click();

    });
    //test
});