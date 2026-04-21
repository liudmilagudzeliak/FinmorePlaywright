export type UserData = {
  name: string;
  email: string;
  password: string;
};

export class CreateAccountData {
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `AUTO_TEST${timestamp}@gmail.com`;
  }

  static generateRandomName(): string {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';

    const getRandomChar = (chars: string) =>
      chars[Math.floor(Math.random() * chars.length)];

    return (
      getRandomChar(upper) +
      getRandomChar(lower) +
      getRandomChar(lower) +
      getRandomChar(lower) +
      getRandomChar(lower) +
      getRandomChar(lower)
    );
  }

  static generatePassword(length = 6): string {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '!@#$%^&*';
    const all = upper + lower + digits + special;

    const getRandomChar = (chars: string) =>
      chars[Math.floor(Math.random() * chars.length)];

    let password =
      getRandomChar(upper) +
      getRandomChar(lower) +
      getRandomChar(digits) +
      getRandomChar(special);

    for (let i = 4; i < length; i++) {
      password += getRandomChar(all);
    }

    return password;
  }

  static generateUser(): UserData {
    return {
      name: this.generateRandomName(),
      email: this.generateRandomEmail(),
      password: this.generatePassword(),
    };
  }
}