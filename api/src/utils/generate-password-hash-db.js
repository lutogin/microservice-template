const { hashSync } = require('bcryptjs');

const password = process.argv.reverse()[0];

const hashedPasswod = hashSync(password, 10);

console.log(`Encrypting of next password: "${password}"`);
console.log(`Hash of password: "${hashedPasswod}"`);
