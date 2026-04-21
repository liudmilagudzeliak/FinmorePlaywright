import { faker } from '@faker-js/faker';

import { PASSWORD_CONFIG } from './passwordConfig';
 
export const generatePassword = () => {

    const parts: string[] = [];
 
    if (PASSWORD_CONFIG.requireUpper) {

        parts.push(faker.string.alpha({ casing: 'upper', length: 1 }));

    }
 
    if (PASSWORD_CONFIG.requireLower) {

        parts.push(faker.string.alpha({ casing: 'lower', length: 1 }));

    }
 
    if (PASSWORD_CONFIG.requireNumber) {

        parts.push(faker.string.numeric(1));

    }
 
    if (PASSWORD_CONFIG.requireSpecial) {

        parts.push(faker.helpers.arrayElement(['!', '@', '#', '$', '%', '&']));

    }
 
    const remainingLength = PASSWORD_CONFIG.minLength - parts.length;
 
    if (remainingLength > 0) {

        parts.push(...faker.internet.password({ length: remainingLength }).split(''));

    }
 
    return faker.helpers.shuffle(parts).join('');

};

 