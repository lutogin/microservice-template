import { compareSync, hashSync } from 'bcryptjs';
import crypto from 'crypto';

class PasswordService {
  codeStore = {};

  generate = () => {
    const password = this.generatePassword();
    const passwordHash = this.encryptPassword(password);
    return { password, passwordHash };
  };

  generatePassword = () =>
    Math.random()
      .toString(36)
      .slice(2)
      .split('')
      .map(letter => (Math.random() > 0.5 ? letter.toUpperCase() : letter))
      .join('')
      .replace(/[lIo0O]/g, str => String.fromCharCode(str.charCodeAt(0) + 1));

  encryptPassword = password =>
    crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

  valid = (user, password) =>
    compareSync(password && password.toLowerCase(), user.auth.passwordHash);

  generateHash = password => hashSync(password, 10);
}

export default new PasswordService();
