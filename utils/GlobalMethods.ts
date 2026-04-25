
import { Locator, expect } from '@playwright/test';
export class GlobalMethods {

// static async fillField(locator: Locator, value: string) {
//         await locator.waitFor({ state: 'visible' });
//         await locator.fill('');
//         await locator.fill(value);
//     }

//        // static async fillField(locator: Locator, value: string) {

//         //await locator.waitFor({ state: 'visible' });

//         await locator.fill('');

//         await locator.fill(value);

//     }

  static async fillField(locator: Locator, value: string, fieldName?: string) {

        const name = fieldName || 'unknown field';
 
        try {

            console.log(`[FILL] ${name}: "${value}"`);
 
            await locator.waitFor({ state: 'visible' });

            await locator.fill(value);

            await locator.fill(value);
 
            console.log(`[FILL SUCCESS] ${name}`);

        } catch (error) {

            console.error(` [FILL ERROR] ${name}`);

            throw new Error(`Failed to fill ${name}: ${error}`);

        }

    }
 
static async click(locator: Locator, elementName?: string) {

        const name = elementName || 'unknown element';
 
        try {

            console.log(`[CLICK] ${name}`);
 
            await locator.waitFor({ state: 'visible' });

            await locator.click();
 
            console.log(`[CLICK SUCCESS] ${name}`);

        } catch (error) {

            console.error(`[CLICK ERROR] ${name}`);

            throw new Error(`Failed to click ${name}: ${error}`);

        }

    }
 static async selectDropdown(locator: Locator, value: string, name?: string) {
        const field = name || 'dropdown';
 
        try {
            console.log(`[SELECT] ${field}: ${value}`);
 
            await locator.waitFor({ state: 'visible' });
            await locator.selectOption(value);
 
            console.log(`[SELECT SUCCESS] ${field}`);
        } catch (error) {
            console.error(`[SELECT ERROR] ${field}`);
            throw new Error(`Failed to select ${value} in ${field}: ${error}`);
        }
    }
    static async expectText(locator: Locator, text: string, name?: string) {
        const element = name || 'element';
 
        try {
            console.log(`[EXPECT TEXT] ${element}: "${text}"`);
            await expect(locator).toHaveText(text);
            console.log(`[TEXT MATCH] ${element}`);
        } catch (error) {
            console.error(`[TEXT MISMATCH] ${element}`);
            throw new Error(`Text mismatch in ${element}. Expected: "${text}"`);
        }
    }

    static async expectvisible(locator: Locator, name?: string) {
        const element = name || 'element';

        try {
            console.log('[eXPECT VISIBLE] ' + element);
            await expect(locator).toBeVisible();
            console.log('[VISIBLE] ' + element);
        }catch (error) {
            console.error('[NOT VISIBLE] ' + element);
            throw new Error(`Element ${element} is not visible`);
        }
    }
           static async expectHidden(Locator: Locator, name?: string) {
            const element  = name || 'element';

            try {
                console.log('[Expect Hidden] ' + element);
                await expect(Locator).toBeHidden();
                console.log('[Hidden] ' + element);
            } catch (error) {
                console.error('[Not Hidden] ' + element);
                throw new Error(`Element ${element} is not hidden`);
            }

        }
        static async checkCheckbox(locator: Locator, shouldBeChecked: boolean, name?: string) {
            const checkbox = name || 'checkbox';
            try {
                console.log(`[CHECK CHECKBOX] ${checkbox}: should be ${shouldBeChecked ? 'checked' : 'unchecked'}`);
                await locator.waitFor({ state: 'visible' });
                const isChecked = await locator.isChecked();
                if (isChecked !== shouldBeChecked) {
                    await locator.setChecked(shouldBeChecked);
                    console.log(`[CHECKBOX UPDATED] ${checkbox} is now ${shouldBeChecked ? 'checked' : 'unchecked'}`);
                } else {
                    console.log(`[CHECKBOX ALREADY] ${checkbox} is already ${shouldBeChecked ? 'checked' : 'unchecked'}`);
                }         } catch (error) { 
            console.error(`[CHECK CHECKBOX ERROR] ${checkbox}`);
            throw new Error(`Failed to check ${checkbox}: ${error}`);
        }
    }
}


//