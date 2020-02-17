import crypto from 'crypto';

function encryptPassword(passwod) {
  return crypto
    .createHash('sha256')
    .update(passwod)
    .digest('hex');
}

export default encryptPassword;
