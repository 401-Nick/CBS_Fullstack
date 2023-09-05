const crypto = require('crypto');

const randomKey = crypto.randomBytes(32).toString('hex');

console.log(`Random 32-byte key: ${randomKey}`);
