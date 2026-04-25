import { Page, Locator } from '@playwright/test';
import { GlobalMethods } from '../utils/GlobalMethods';

export class HeaderComponent {
    readonly page: Page;

    // Dashboard/Menu locators
    readonly userMenuTrigger: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Dashboard/Menu locators
        this.userMenuTrigger = page.getByTestId('user-menu-trigger');
        this.logoutButton = page.getByTestId('logout-button');
    }

    async openUserMenu() {
        await GlobalMethods.click(this.userMenuTrigger);
    }
    async clickLogoutButton() {
        await GlobalMethods.click(this.logoutButton);
    }
}
