import { Page, Locator, Expect, expect } from '@playwright/test';
import { GlobalMethods } from "../../utils/GlobalMethods";


export class LoginPage2 {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly loginIcon: Locator;
    readonly infoMessage: Locator;
    readonly registrationLink: Locator;
    readonly registerTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('login-email-input');
        this.passwordInput = page.getByTestId('login-password-input');
        this.loginButton = page.getByTestId('login-submit-button');
        this.errorMessage = page.getByTestId('login-error');
        this.loginIcon = page.getByRole('img').first();
        this.infoMessage = page.getByText('Немає облікового запису?');
        this.registrationLink = page.getByTestId('switch-to-register-button');
        this.registerTitle = page.getByTestId('register-title');
}
async open() {
    console.log('Opening login page');
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL('/');
}
async checkPageLoaded() {
    await GlobalMethods.expectvisible(this.loginIcon);
}

async checkLoginIconVisible() {
    await expect(this.loginIcon).toBeVisible({timeout: 5000});
    await expect(this.loginIcon).toBeEnabled();
}
async fillEmail(email: string ) {
    await expect(this.emailInput).toBeVisible;
    await expect(this.emailInput).toBeEnabled;
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
}
async fillPassword(password: string) {
    await expect(this.passwordInput).toBeVisible;
    await expect(this.passwordInput).toBeEnabled;
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
}
async clicklLoginButton() {
    console.log('Click login button');
    await expect(this.loginButton).toBeVisible({timeout: 5000});
        await expect(this.loginButton).toBeEnabled();
        await this.loginButton.click();        
}
async checkAbsentAccountMessageVisibilyty() {
    await expect(this.infoMessage).toBeVisible({timeout: 5000});
}

async checkEmailInputPlaceHolder() {
    await expect(this.emailInput).toBeVisible({timeout: 5000});
            await expect(this.emailInput).toBeEnabled();
            await expect(this.emailInput).toHaveAttribute('placeholder', 'your@email.com');
}


async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clicklLoginButton();

}
async checkRegistrationLink() {
    await expect(this.registrationLink).toBeVisible();
    await expect(this.registrationLink).toHaveText('Зареєструватися');
    await this.registrationLink.click();
    await expect(this.registerTitle).toBeVisible();
  }

}