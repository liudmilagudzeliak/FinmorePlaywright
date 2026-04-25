import { test, expect } from "@playwright/test";
import { createAccount } from "../utils/apidatahelper/AccountDataHelper";
import { faker } from '@faker-js/faker';
import { RegisterPage } from "../pages/Auth/RegisterPage";
import { AccountDashboardPage } from "../pages/AccountDashboard/AccountDashboardPage";
import { LoginPage } from "../pages/Auth/LoginTest";
import { HeaderComponent } from "../components/HeaderComponent";
import { TransactionForm } from "../pages/TransactionsPages/TransactionForm";


test.describe('Check dashboard test functions', () => {
    let registerPage: RegisterPage;
    let accountDashboardPage: AccountDashboardPage;
    let loginPage: LoginPage;
    let headerComponent: HeaderComponent;
    let transactionsForm: TransactionForm;
    test.beforeEach(async ({ page }) => {
        accountDashboardPage = new AccountDashboardPage(page);
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage(page);
        headerComponent = new HeaderComponent(page);
        transactionsForm = new TransactionForm(page);
        //Create new user and log in before each test
        await createAccount(page, {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        });

        await page.goto('/');
    });
    test('Check that User can log out from dashboard', async ({ page }) => {
        
        await registerPage.checkPageLoaded();
        await headerComponent.openUserMenu();
        await headerComponent.clickLogoutButton();
        await loginPage.checkPageLoaded();
    });

    test('Check that User can enter dohid', async ({ page }) =>  {
       
            await transactionsForm.openTransactionForm();
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
        await expect(dateInput).toBeVisible({ timeout: 5000 });
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