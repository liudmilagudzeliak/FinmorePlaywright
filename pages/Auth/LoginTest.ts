import { Page, Locator, expect } from '@playwright/test';
 
export class LoginPage {

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

    await expect(this.page).toHaveURL('/');

  }
 
  async checkPageLoaded() {

    await expect(this.page).toHaveTitle('Повнофункціональний фінансовий менеджер');

  }
 
  async fillEmail(email: string) {

    console.log(`Filling email: ${email}`);

    await expect(this.emailInput).toBeVisible();

    await expect(this.emailInput).toBeEnabled();

    await this.emailInput.fill(email);

  }
 
  async fillPassword(password: string) {

    console.log(`Filling password`);

    await expect(this.passwordInput).toBeVisible();

    await expect(this.passwordInput).toBeEnabled();    

    await this.passwordInput.fill(password);
    
    await expect(this.passwordInput).toHaveValue(password);

  }
 
  async clickLogin() {

    console.log('Click login button');

    await expect(this.loginButton).toBeEnabled();

    await this.loginButton.click();

  }
 
  async login(email: string, password: string) {

    await this.fillEmail(email);

    await this.fillPassword(password);

    await this.clickLogin();

  }
 
  async checkErrorMessage(text: string) {

    await expect(this.errorMessage).toBeVisible();

    await expect(this.errorMessage).toHaveText(text);

  }
 
  async checkUIElements() {

    await expect(this.loginIcon).toBeVisible();

    await expect(this.infoMessage).toBeVisible();

    await expect(this.registrationLink).toBeVisible();

  }
 
  async goToRegister() {

    await this.registrationLink.click();

    await expect(this.registerTitle).toBeVisible();

  }
  

}

 