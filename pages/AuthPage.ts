import { Page, Locator, expect } from "@playwright/test";

export class AuthPage {
    readonly page: Page;
    readonly viewPasswordIcon: Locator;
    readonly viewPasswordIconConfirm: Locator;

constructor(page: Page) {
    this.page = page;
    this.viewPasswordIcon = page.locator('.lucide-eye').first();
    this.viewPasswordIconConfirm = page.locator('button:has(svg.lucide-eye)');
}
async clickViewPasswordIcon() {
    await expect(this.viewPasswordIcon).toBeVisible({timeout: 5000});
    await expect(this.viewPasswordIcon).toBeEnabled();
    await this.viewPasswordIcon.click();
}
}