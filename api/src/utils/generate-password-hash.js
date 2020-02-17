const crypto = require('crypto');

const passwod = process.argv.reverse()[0];

const hashedPasswod = crypto
  .createHash('sha256')
  .update(passwod)
  .digest('hex');

console.log(`Encrypting of next password: "${passwod}"`);
console.log(`Sha256 in hex: "${hashedPasswod}"`);
