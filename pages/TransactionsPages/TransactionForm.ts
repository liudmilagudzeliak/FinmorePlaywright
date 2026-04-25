import { Page } from '@playwright/test';
import { GlobalMethods } from '../../utils/GlobalMethods';

export class TransactionForm {
    readonly page: Page;

    // Transaction form locators
    readonly addTransactionButton;
    readonly incomeTypeButton;
    readonly transactionAmountInput;
    readonly transactionCategorySelect;
    readonly transactionDescriptionInput;
    readonly transactionDateInput;
    readonly transactionAccountSelect;
    readonly transactionTagsInput;
    readonly addTagButton;
    readonly transactionFormSubmit;

    constructor(page: Page) {
        this.page = page;

        // Transaction form locators
        this.addTransactionButton = page.getByTestId('add-transaction-button');
        this.incomeTypeButton = page.getByTestId('income-type-button');
        this.transactionAmountInput = page.getByTestId('transaction-amount-input');
        this.transactionCategorySelect = page.getByTestId('transaction-category-select');
        this.transactionDescriptionInput = page.getByTestId('transaction-description-input');
        this.transactionDateInput = page.getByTestId('transaction-date-input');
        this.transactionAccountSelect = page.getByTestId('transaction-account-select');
        this.transactionTagsInput = page.getByTestId('transaction-tags-input');
        this.addTagButton = page.getByTestId('add-tag-button');
        this.transactionFormSubmit = page.getByTestId('transaction-form-submit');
    }
    async openTransactionForm() {
        await GlobalMethods.click(this.addTransactionButton);
    
    }
}
