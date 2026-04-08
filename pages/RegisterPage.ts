import { Page, Locator, expect } from "@playwright/test";

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
    }

    async open() {
        console.log('Opening register page');
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/');        
        await expect(this.switchToRegisterButton).toBeVisible({ timeout: 5000 });
        await this.switchToRegisterButton.click();
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
}
