import { Page, Locator, expect } from "@playwright/test";
import { GlobalMethods } from "../../utils/GlobalMethods";

export class RegisterPage {
    readonly page: Page;
    readonly registerTittle: Locator;
    readonly registerPasswordInput: Locator;
    readonly registerConfirmPasswordInput: Locator;
    readonly viewPasswordIcon: Locator;
    readonly viewPasswordIconConfirm: Locator;
    readonly currencyDropdown: Locator;
    readonly switchToRegisterButton: Locator;
    readonly registerButton: Locator;
    readonly registerLink: Locator;
    readonly registerNameInput: Locator;
    readonly registerEmailInput: Locator;
    readonly nameErrorMessage: Locator;
    readonly passwordErrorMessage: Locator;
    readonly emailErrorMessage: Locator;
    readonly confirmPasswordErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerTittle = page.getByTestId('register-title');
        this.registerPasswordInput = page.getByTestId('register-password-input');
        this.registerConfirmPasswordInput = page.getByTestId('register-confirm-password-input');
        this.viewPasswordIcon = page.locator('.lucide-eye').first();
        this.viewPasswordIconConfirm = page.locator('button:has(svg.lucide-eye)');
        this.currencyDropdown = page.getByTestId('register-currency-select');
        this.switchToRegisterButton = page.getByTestId('switch-to-register-button');
        this.registerButton = page.getByRole('button', { name: /register|реєстрацію/i });
        this.registerLink = page.getByTestId('switch-to-register-button');
        this.registerEmailInput = page.getByTestId('register-email-input');
        this.registerNameInput = page.getByTestId('register-name-input');
        this.nameErrorMessage = page.getByTestId('name-error');
        this.passwordErrorMessage = page.getByTestId('password-error');
        this.emailErrorMessage = page.getByTestId('email-error');
        this.confirmPasswordErrorMessage = page.getByTestId('confirm-password-error');
    }

    async registrationPageOpen() {
        await GlobalMethods.click(this.switchToRegisterButton);
    }

    async checkPageLoaded() {
        await expect(this.page).toHaveTitle('Повнофункціональний фінансовий менеджер');
        await expect(this.registerTittle).toBeVisible({ timeout: 5000 });
    }


    async checkViewPasswordIconVisibility() {
        await expect(this.viewPasswordIcon).toBeVisible({ timeout: 5000 });
        await expect(this.registerPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(this.registerPasswordInput).toBeEnabled();
        await expect(this.registerPasswordInput).toHaveAttribute('type', 'password');
        await (this.registerPasswordInput).fill('test123');
        await this.viewPasswordIcon.click();
        await expect(this.registerPasswordInput).toHaveAttribute('type', 'text');
        await expect(this.viewPasswordIconConfirm).toBeVisible({ timeout: 5000 });

    }
    async checkConfirmViewPasswordIconVisibility() {
         await expect(this.viewPasswordIconConfirm).toBeVisible({ timeout: 5000 });
        await expect(this.registerConfirmPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(this.registerConfirmPasswordInput).toBeEnabled();
        await expect(this.registerConfirmPasswordInput).toHaveAttribute('type', 'password');
        await (this.registerConfirmPasswordInput).fill('test123');
        await this.viewPasswordIconConfirm.click();
        await expect(this.registerPasswordInput).toHaveAttribute('type', 'text');
        await expect(this.viewPasswordIconConfirm).toBeVisible({ timeout: 5000 });
    }
    async registerName(name: string) {
        await expect(this.registerNameInput).toBeVisible({ timeout: 6000 });
        await expect(this.registerNameInput).toBeEnabled();
        await this.registerNameInput.fill(name);
        await expect(this.registerNameInput).toHaveValue(name);
    }
    async registerEmail(email: string) {
        await expect(this.registerEmailInput).toBeVisible({ timeout: 6000 });
        await expect(this.registerEmailInput).toBeEnabled();
        await this.registerEmailInput.fill(email);
        await expect(this.registerEmailInput).toHaveValue(email);
    }
    async registerPassword(password: string) {
        await expect(this.registerPasswordInput).toBeVisible({ timeout: 6000 });
        await expect(this.registerPasswordInput).toBeEnabled();
        await this.registerPasswordInput.fill(password);
        await expect(this.registerPasswordInput).toHaveValue(password);
    }
    async registerConfirmPassword(password: string) {
        await expect(this.registerConfirmPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(this.registerConfirmPasswordInput).toBeEnabled();  
        await this.registerConfirmPasswordInput.fill(password);
        await expect(this.registerConfirmPasswordInput).toHaveValue(password);
    }
    async selectCurrency(currency: string) {
        await expect(this.currencyDropdown).toBeVisible({ timeout: 5000 });
        await expect(this.currencyDropdown).toBeEnabled(); 
        await this.currencyDropdown.selectOption(currency);
    }       
    async clickRegisterButton() {
        console.log('Click register button');
        await expect(this.registerButton).toBeVisible({ timeout: 5000 });
        await expect(this.registerButton).toBeEnabled();
        //await this.registerButton.click();
        await GlobalMethods.click(this.registerButton, 'Register button');
    }
    async checkCurrencyDropdownOptions(currency: string) {
        await expect(this.currencyDropdown).toBeVisible({ timeout: 5000 });
        await expect(this.currencyDropdown).toHaveValue(currency);
        await expect(this.currencyDropdown.locator('option:checked')).toHaveText(currency);
    }
    async checkPlaceholders() {
        await expect(this.registerNameInput).toBeVisible({ timeout: 5000 });
        await expect(this.registerNameInput).toBeEnabled();
        await expect(this.registerNameInput).toHaveAttribute('placeholder', 'Іван Петренко');
        await expect(this.registerEmailInput).toBeVisible({ timeout: 5000 });
        await expect(this.registerEmailInput).toBeEnabled();
        await expect(this.registerEmailInput).toHaveAttribute('placeholder', 'your@email.com');
        await expect(this.registerPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(this.registerPasswordInput).toHaveAttribute('placeholder', 'Мінімум 6 символів');
        await expect(this.registerConfirmPasswordInput).toBeVisible({ timeout: 5000 });
        await expect(this.registerConfirmPasswordInput).toHaveAttribute('placeholder', 'Повторіть пароль');
}
}
