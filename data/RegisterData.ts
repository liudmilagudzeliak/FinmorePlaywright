import { CreateAccountData } from "../utils/CreateAccountData";
export const REGISTER_DATA = {
    VALID_NAME: CreateAccountData.generateRandomName(),
    VALID_EMAIL: CreateAccountData.generateRandomEmail(),
    VALID_PASSWORD: CreateAccountData.generatePassword(),
    INVALID_NAME: 't',
    INVALID_EMAIL: 'inavalidemail', 
    INVALID_PASSWORD: '123',
    CURRENCY: {
        USD: 'USD',
        EUR: 'EUR',
        UAH: 'UAH'
    }
};